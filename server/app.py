from flask import Flask,jsonify,request,Response
from flask_cors import CORS
from dotenv import load_dotenv
import os
from pymongo import MongoClient
import cv2
import mail
import ultralytics
from ultralytics import YOLO
import json
import glob
from transformers import pipeline

load_dotenv()

app = Flask(__name__)
CORS(app)
passw = os.getenv("MONGO_PASS")
connection_string = f"mongodb+srv://codeomega:{passw}@cluster0.hnyk6mi.mongodb.net/?retryWrites=true&w=majority"
def MongoDB(collection_name):
    client = MongoClient(connection_string)
    db = client.get_database('TSEC')
    collection = db.get_collection(collection_name)
    return collection



def apply_machine_learning_model(model,frame):
    from ultralytics import YOLO
    # model = YOLO('yolov8l.pt')
    results=model(frame)
    l=[]
    for result in results:
        l.append(result.tojson())

    import json

    # Your list of dictionaries as a string within a list
    data_str = l 
    # Parse the string into a Python list
    data_list = json.loads(data_str[0])
    # Save the list to a JSON file
    with open('output.json', 'w') as json_file:
        json.dump(data_list, json_file, indent=4)
    # Optionally, you can print the saved JSON data
    with open('output.json', 'r') as json_file:
        saved_data = json.load(json_file)
        print(saved_data)        #HATIM CHECK YEH JSON KO SHAYD SAVE kar RAHA HAI

    def calculate_cleanliness_percentage(data):
        total_objects = len(data)  # Removed ['predictions'] as it's not a dictionary anymore
        trash_count = 0

        for prediction in data:
            x1, y1, x2, y2, confidence = (
                prediction['box']['x1'],
                prediction['box']['y1'],
                prediction['box']['x2'],
                prediction['box']['y2'],
                prediction['confidence']
            )

            # Calculate dynamic object size based on position
            normalized_area = ((x2 - x1) * (y2 - y1)) / (1920 * 1080)  # Assuming frame size is 1920x1080
            trash_count += 1 - normalized_area  # Subtract normalized area from 1

        # Calculate cleanliness percentage
        cleanliness_percentage = (1 - (trash_count / total_objects)) * 100
        return cleanliness_percentage

    # Example usage with saved_data
    cleanliness_percentage = calculate_cleanliness_percentage(saved_data)
    print(f'Cleanliness Percentage: {cleanliness_percentage:.2f}%')
    proc_frame=results[0].plot()
    return proc_frame, cleanliness_percentage




def generate_video():
    # Create a VideoCapture object to capture the screen
    screen_capture = cv2.VideoCapture(0)  # Change the index to capture a specific screen if necessary

    while True:
        success, frame = screen_capture.read()
        if not success:
            break

        # Here, you can apply your machine learning model to process each frame
        # Replace the following line with your model processing logic
        processed_frame, cleanliness = apply_machine_learning_model(model,frame)

        # Encode the processed frame as JPEG
    #     _, buffer = cv2.imencode('.jpg', processed_frame)
    #     frame_bytes = buffer.tobytes()

    #     yield (b'--frame\r\n'
    #            b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

    # screen_capture.release()
    cv2.destroyAllWindows()

class CrowdSchema:
    def __init__(self, collection_name):
        self.client = MongoClient(connection_string)
        self.db = self.client.get_database('TSEC')
        self.collection = self.db.get_collection(collection_name)

    def create_crowd_entry(self, station, line, platform, crowd_perc):
        crowd_entry = {
            "station": station,
            "line": line,
            "platform": platform,
            "crowd_perc": crowd_perc
        }
        result = self.collection.insert_one(crowd_entry)
        return result.inserted_id

    def get_all_crowd_entries(self):
        crowd_entries = list(self.collection.find({}))
        return crowd_entries

    def get_crowd_entry_by_id(self, entry_id):
        crowd_entry = self.collection.find_one({"_id": entry_id})
        return crowd_entry

    def update_crowd_entry(self, entry_id, station, line, platform, crowd_perc):
        update_data = {
            "station": station,
            "line": line,
            "platform": platform,
            "crowd_perc": crowd_perc
        }
        result = self.collection.update_one({"_id": entry_id}, {"$set": update_data})
        return result.modified_count

    def delete_crowd_entry(self, entry_id):
        result = self.collection.delete_one({"_id": entry_id})
        return result.deleted_count
    
crowd_collection = CrowdSchema("crowd")


class StaffMemberSchema:
    def __init__(self, collection_name):
        self.client = MongoClient(connection_string)
        self.db = self.client.get_database('TSEC')
        self.collection = self.db.get_collection(collection_name)

    def create_staff_member(self, id, name, email, mob, station, line, assigned=False):
        staff_member = {
            "id": id,
            "name": name,
            "email": email,
            "mob": mob,
            "station": station,
            "line": line,
            "assigned": assigned  # Add the "assigned" field here
        }
        result = self.collection.insert_one(staff_member)
        return result.inserted_id

    def get_all_staff_members(self):
        staff_members = list(self.collection.find({}))
        return staff_members

    def get_staff_member_by_id(self, member_id):
        staff_member = self.collection.find_one({"id": member_id})
        return staff_member

    def update_staff_member(self, member_id, name, email, mob, station, line, assigned=False):
        update_data = {
            "name": name,
            "email": email,
            "mob": mob,
            "station": station,
            "line": line,
            "assigned": assigned  # Update the "assigned" field here
        }
        result = self.collection.update_one({"id": member_id}, {"$set": update_data})
        return result.modified_count

    def delete_staff_member(self, member_id):
        result = self.collection.delete_one({"id": member_id})
        return result.deleted_count

# Initialize the "staff_member" schema
staff_member_collection = StaffMemberSchema("staff_member")

class PoliceSchema:
    def __init__(self, collection_name):
        self.client = MongoClient(connection_string)
        self.db = self.client.get_database('TSEC')
        self.collection = self.db.get_collection(collection_name)

    def create_police_member(self, id, name, email, mob, station, line):
        police_member = {
            "id": id,
            "name": name,
            "email": email,
            "mob": mob,
            "station": station,
            "line": line
        }
        result = self.collection.insert_one(police_member)
        return result.inserted_id

    def get_all_police_members(self):
        police_members = list(self.collection.find({}))
        return police_members

    def get_police_member_by_id(self, member_id):
        police_member = self.collection.find_one({"id": member_id})
        return police_member

    def update_police_member(self, member_id, name, email, mob, station, line):
        update_data = {
            "name": name,
            "email": email,
            "mob": mob,
            "station": station,
            "line": line
        }
        result = self.collection.update_one({"id": member_id}, {"$set": update_data})
        return result.modified_count

    def delete_police_member(self, member_id):
        result = self.collection.delete_one({"id": member_id})
        return result.deleted_count

# Initialize the "police" schema
police_collection = PoliceSchema("police")

class TCClerkSchema:
    def __init__(self, collection_name):
        self.client = MongoClient(connection_string)
        self.db = self.client.get_database('TSEC')
        self.collection = self.db.get_collection(collection_name)

    def create_tc_clerk(self, id, name, email, mob, station, line):
        tc_clerk = {
            "id": id,
            "name": name,
            "email": email,
            "mob": mob,
            "station": station,
            "line": line,
        }
        result = self.collection.insert_one(tc_clerk)
        return result.inserted_id

    def get_all_tc_clerks(self):
        tc_clerks = list(self.collection.find({}))
        return tc_clerks

    def get_tc_clerk_by_id(self, member_id):
        tc_clerk = self.collection.find_one({"id": member_id})
        return tc_clerk

    def update_tc_clerk(self, member_id, name, email, mob, station, line):
        update_data = {
            "name": name,
            "email": email,
            "mob": mob,
            "station": station,
            "line": line,
        }
        result = self.collection.update_one({"id": member_id}, {"$set": update_data})
        return result.modified_count

    def delete_tc_clerk(self, member_id):
        result = self.collection.delete_one({"id": member_id})
        return result.deleted_count

tc_collection = TCClerkSchema("tc")

@app.route("/")
def hello_world():
    response = {"message": "i am here!!"}
    return jsonify(response)

@app.route("/upload")
def upload_csv():
    csv_path = 'stations.csv'
    if csv_path:
        import pandas as pd
        try:
            df = pd.read_csv(csv_path)
            collection = MongoDB('stations')
            collection.insert_many(df.to_dict('records'))
            return "CSV data successfully uploaded to MongoDB!"
        except Exception as e:
            return f"Error: {str(e)}"  
    return "succesfull pls check"

@app.route("/report/crowd_detection")
def crowd_detetcion():

    return "crowd detetion Done!!"

@app.route("/report/crime_detection")
def crime_detetcion():

    return "crime detetion Done!!"

@app.route("/create_staff_member", methods=["POST"])
def create_staff_member():
    if request.method == "POST":
        try:
            data = request.json

            # Extract the required fields from the JSON data
            id = data["id"]
            name = data["name"]
            email = data["email"]
            mob = data["mob"]
            station = data["station"]
            line = data["line"]
            # Extract the "assigned" field (defaults to False if not provided)
            assigned = data.get("assigned", False)

            # Create the staff member using the schema
            result = staff_member_collection.create_staff_member(id, name, email, mob, station, line, assigned)

            if result:
                response = {"message": "Staff member created successfully"}
                return jsonify(response), 201  # HTTP status code 201 for created
            else:
                return jsonify({"message": "Failed to create staff member"}), 500  # Internal Server Error

        except Exception as e:
            return jsonify({"error": str(e)}), 400  # Bad Request


@app.route("/create_police_member", methods=["POST"])
def create_police_member():
    if request.method == "POST":
        try:
            # Parse the JSON data from the request
            data = request.json

            # Extract the required fields from the JSON data
            id = data["id"]
            name = data["name"]
            email = data["email"]
            mob = data["mob"]
            station = data["station"]
            line = data["line"]

            # Create the police member using the schema
            result = police_collection.create_police_member(id, name, email, mob, station, line)

            if result:
                response = {"message": "Police member created successfully"}
                return jsonify(response), 201  # HTTP status code 201 for created
            else:
                return jsonify({"message": "Failed to create police member"}), 500  # Internal Server Error

        except Exception as e:
            return jsonify({"error": str(e)}), 400


@app.route("/add_complaint/<type>", methods=["POST"])
def add_complaint(type):
    if request.method == "POST":
        try:
            # Parse the JSON data from the request
            data = request.json

            # Extract the required fields from the JSON data
            complaint_type = type
            station = data["station"]
            line = data["line"]
            description=data["description"]
            
            # Create the complaint document
            complaint = {
                "type": complaint_type,
                "station": station,
                "line": line,
                "description": description,
            }
            complaints_collection = MongoDB('complaints')
            # Insert the complaint document into MongoDB
            result = complaints_collection.insert_one(complaint)

            if result:
                response = {"message": "Complaint added successfully"}
                return jsonify(response), 201  # HTTP status code 201 for created
            else:
                return jsonify({"message": "Failed to add complaint"}), 500  # Internal Server Error

        except Exception as e:
            return jsonify({"error": str(e)}), 400  # Bad Request

@app.route("/insert_tc_clerk", methods=["POST"])
def insert_tc_clerk():
    if request.method == "POST":
        try:
            data = request.json
            id = data["id"]
            name = data["name"]
            email = data["email"]
            mob = data["mob"]
            station = data["station"]
            line = data["line"]

            # Insert the TC clerk using the schema
            result = tc_collection.create_tc_clerk(id, name, email, mob, station, line)

            if result:
                response = {"message": "TC clerk inserted successfully"}
                return jsonify(response), 201  # HTTP status code 201 for created
            else:
                return jsonify({"message": "Failed to insert TC clerk"}), 500  # Internal Server Error

        except Exception as e:
            return jsonify({"error": str(e)}), 400  # Bad Request

@app.route("/getstaffs", methods=["GET"])
def get_staff_members():
    try:
        # Retrieve all staff members from the "staff_member" collection
        staff_members = staff_member_collection.get_all_staff_members()

        # Convert ObjectId to string for each staff member
        staff_members_serializable = []
        for staff_member in staff_members:
            staff_member['_id'] = str(staff_member['_id'])  # Convert ObjectId to string
            staff_members_serializable.append(staff_member)

        # Convert the list of staff members to a JSON response
        response = {"staff_members": staff_members_serializable}
        return jsonify(response), 200  # HTTP status code 200 for OK
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Internal Server Error

@app.route("/getpolice", methods=["GET"])
def get_police():
    try:
        # Retrieve all staff members from the "staff_member" collection
        police = police_collection.get_all_police_members()

        # Convert ObjectId to string for each staff member
        police_serializable = []
        for police in police:
            police['_id'] = str(police['_id'])  # Convert ObjectId to string
            police_serializable.append(police)

        # Convert the list of staff members to a JSON response
        response = {"police": police_serializable}
        return jsonify(response), 200  # HTTP status code 200 for OK
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Internal Server Error


def video_save():
    img_array = []
    file_list=[]
    for file_n in glob.glob('frames/*jpg'):
        print(file_n)
        file_n=file_n.replace('frames/','')
        file_n = file_n.replace('.jpg', '')
        file_list.append(file_n)

    file_list.sort(key=int)
    for filename in file_list:
        img = cv2.imread('frames/'+filename+'.jpg')
        height, width, layers = img.shape
        size = (width, height)
        img_array.append(img)
        print('appending',filename)
    print("BEFORE OUT")
    out = cv2.VideoWriter('videos/project.mp4', cv2.VideoWriter_fourcc(*'H264'), 15, size)

    for i in range(len(img_array)):
        out.write(img_array[i])
        print('Frame:',i)
    out.release()


def apply_machine_learning_model(model_path,frame):
    t=False
    model = YOLO(model_path)
    results=model(frame)
    l=[]
    for result in results:
        l.append(result.tojson())

    # Your list of dictionaries as a string within a list
    data_str = l 
    # Parse the string into a Python list
    data_list = json.loads(data_str[0])
    # Save the list to a JSON file
    with open('output.json', 'w') as json_file:
        json.dump(data_list, json_file, indent=4)
    # Optionally, you can print the saved JSON data
    with open('output.json', 'r') as json_file:
        saved_data = json.load(json_file)
        print(saved_data)        #HATIM CHECK YEH JSON KO SHAYD SAVE kar RAHA HAI

    def calculate_cleanliness_percentage(data):
        total_objects = len(data)  # Removed ['predictions'] as it's not a dictionary anymore
        trash_count = 0

        for prediction in data:
            x1, y1, x2, y2, confidence = (
                prediction['box']['x1'],
                prediction['box']['y1'],
                prediction['box']['x2'],
                prediction['box']['y2'],
                prediction['confidence']
            )
            if confidence > 70:
                t=True
            # Calculate dynamic object size based on position
            normalized_area = ((x2 - x1) * (y2 - y1)) / (320 * 320)  # Assuming frame size is 1920x1080
            trash_count += normalized_area  # Subtract normalized area from 1

        # Calculate cleanliness percentage
        if total_objects>0 :
            cleanliness_percentage = (trash_count / total_objects) * 100
            return cleanliness_percentage
        else:
            return 0
    # Example usage with saved_data
    cleanliness_percentage = calculate_cleanliness_percentage(saved_data)
    print(f'Garbage Percentage: {cleanliness_percentage:.2f}%')
    # print(cleanliness_percentage)
    proc_frame=results[0].plot()
    return proc_frame,t,cleanliness_percentage


@app.route("/video-trash",methods=['GET'])
def video_trash():
    # video_file = request.files['file']
    video_file = "garbage4.mp4"
    model_path = 'garbage_detector_1.pt'
    cnt=0
    c1=0
    cap = cv2.VideoCapture(video_file)

    frame_width = int(cap.get(3))
    frame_height = int(cap.get(4))
    fps = int(cap.get(5))
    print("FPPPSSSSS:::::::::::::::::::::::::::",fps)
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    output_video = cv2.VideoWriter('output_video.mp4', fourcc, 15, (frame_width, frame_height))


    while cap.isOpened():
        success, frame = cap.read()
        if c1%5==0:
            print(c1)
            if success:
                # frame=cv2.resize(frame,(320,320))
                ann_frame,t,score = apply_machine_learning_model(model_path=model_path,frame=frame)
                cv2.imshow("YOLOv8 Inference", ann_frame)
                # cv2.imwrite('frames/'+str(cnt)+'.jpg',ann_frame)
                output_video.write(ann_frame)
                cnt+=1
                if cv2.waitKey(1) & 0xFF == ord("q"):
                    break
            else:
                break
        else:
            pass
        c1 += 1
    # video_save()        
    cap.release()

    output_video.release()
    cv2.destroyAllWindows()
    
    
    return "done"


@app.route("/live-video")
def live_video():
    return Response(generate_video(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route("/assign/<member_id>", methods=["POST"])
def toggle_assignment(member_id):
    try:
        data = request.get_json()
        platform = data.get('platformNumber', '')
        staff_member = staff_member_collection.get_staff_member_by_id(int(member_id))
        staff_name = staff_member.get("name", "")
        staff_email = staff_member.get("email", "")
        if not staff_member:
            return jsonify({"error": "Staff member not found"}), 404
        current_assigned = staff_member.get("assigned", False)
        new_assigned = not current_assigned
        print(new_assigned)
        staff_collec = MongoDB("staff_member")
        result=staff_collec.update_one({"id": int(member_id)}, {"$set": {"assigned": new_assigned}})
        mail.send_mail(staff_email,1,staff_name,platform)
        if result:
            return jsonify({"message": "Assignment toggled successfully"})
        else:
            return jsonify({"error": "Assignment toggle failed"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/feedback", methods=["GET"])
def perform_sentiment_analysis():
    # Get the text from the client request
    # data = request.get_json()
    # text = data.get("text","")
    text= "THis movie was not great"
    classifier = pipeline('sentiment-analysis', model = 'finiteautomata/bertweet-base-sentiment-analysis')

    if text:
        return f"Sentiment Analysis Result: {classifier([text])}"
    else:
        return "Please provide text in the 'text' query parameter."

    

if __name__ == "__main__":
    app.run(debug=True, port=5000)