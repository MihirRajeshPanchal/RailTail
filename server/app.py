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
from roboflow import Roboflow


load_dotenv()

app = Flask(__name__)
CORS(app)
passw = os.getenv("MONGO_PASS")
ROBOFLOW_API_KEY = os.getenv("ROBOFLOW_API_KEY")
connection_string = f"mongodb+srv://codeomega:{passw}@cluster0.hnyk6mi.mongodb.net/?retryWrites=true&w=majority"
def MongoDB(collection_name):
    client = MongoClient(connection_string)
    db = client.get_database('TSEC')
    collection = db.get_collection(collection_name)
    return collection



def apply_machine_learning_model(model_path,frame):
    model = YOLO(model_path)
    results=model(frame)
    height, width, _ = (cv2.imread(frame)).shape
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
        print(saved_data)

    def calculate_cleanliness_percentage(data):
        total_objects = len(data)  # Removed ['predictions'] as it's not a dictionary anymore
        trash_count = 0
        if total_objects>0:
            for prediction in data:
                x1, y1, x2, y2, confidence = (
                    prediction['box']['x1'],
                    prediction['box']['y1'],
                    prediction['box']['x2'],
                    prediction['box']['y2'],
                    prediction['confidence']
                )

                # Calculate dynamic object size based on position
                normalized_area = ((x2 - x1) * (y2 - y1)) / (height * width)  # Assuming frame size is 640 x 640
                trash_count += 1 - normalized_area  # Subtract normalized area from 1

            # Calculate cleanliness percentage
            cleanliness_percentage = (1 - (trash_count / total_objects)) * 100
            return cleanliness_percentage
        else:
            return 100

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
                "platform": line,
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


def apply_machine_learning_model(model_path,frame,t):
    
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

@app.route("/upload-garbage-image",methods=['GET'])
def garbage_detector_image():
    image_file = 'garbage.jpg'
    model_path = 'garbage_detector_1.pt'
    model = YOLO(model_path)
    results = model(image_file, stream=True, save=True)
    proc_frame, t, cleanliness_percentage = apply_machine_learning_model(model_path=model_path, frame=image_file)

@app.route("/upload-garbage-video",methods=['POST'])
def garbage_detector_video():
    video_file = request.files['file']
    print("Tpe of file",type(video_file))
    model_path = 'garbage_detector_1.pt'
    cnt=0
    c1=0
    cap = cv2.VideoCapture(video_file)
    
    t=False
    frame_width = int(cap.get(3))
    frame_height = int(cap.get(4))
    fps = int(cap.get(5))
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    output_video = cv2.VideoWriter('output_video.mp4', fourcc, 15, (frame_width, frame_height))
    while cap.isOpened():
        success, frame = cap.read()
        if c1%5==0:
            print(c1)
            if success:
                # frame=cv2.resize(frame,(320,320))
                cv2.imwrite('frame.jpg',frame)
                ann_frame, clean_per = apply_machine_learning_model('server\garbage_detector_1.pt','frame.jpg') 
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
    video_save()        
    cap.release()
    output_video.release()
    cv2.destroyAllWindows()

    if t:
        complaint = {
                "type": "cleanliness",
                "station": "Dadar",
                "platform": "2",
                "description": "Urgent assistance needed in Cleanliness",
            }
        complaints_collection = MongoDB('complaints')
        result = complaints_collection.insert_one(complaint)
    return {{"message": "success"}}

@app.route("/upload-threat-image", methods=['GET'])
def threat_detector_image():
    image_file = request.files['file']
    file_path = os.path.join('img', image_file.filename)
    image_file.save(file_path)
    rf = Roboflow(api_key=ROBOFLOW_API_KEY)
    project = rf.workspace().project("fire-smoke-detection-eozii")
    model = project.version(1).model
    model.predict(file_path, confidence=40, overlap=30).save('../CodeOmega/src/components/CrowdDetection/threat_prediction.jpg')
    response = {"image": "success"}
    print("Response",response)
    return jsonify(response)

@app.route("/upload-threat-video", methods=['GET'])
def threat_detector_video():
    video_file = "garbage4.mp4"
    cnt = 0
    c1 = 0
    rf = Roboflow(api_key=ROBOFLOW_API_KEY)
    project = rf.workspace().project("fire-smoke-detection-eozii")
    model = project.version(1).model
    cap = cv2.VideoCapture(video_file)
    
    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            # If success is False, there are no more frames to read, so break out of the loop
            break
        
        if c1 % 20 == 0:
            print("Frame:", c1)
            resized_frame = cv2.resize(frame, (320, 320))  # Resize the frame to a smaller size
            jpeg_quality = 95
            success, jpeg_image = cv2.imencode('.jpg', resized_frame, [int(cv2.IMWRITE_JPEG_QUALITY), jpeg_quality])

            if success:
                print(model.predict(jpeg_image, confidence=40, overlap=30).json())
                cnt += 1
        c1 += 1
    cap.release()
    return "done"

@app.route("/upload-crowd-image", methods=['POST'])
def crowd_detector_image():
    image_file = request.files['file']
    file_path = os.path.join('img', image_file.filename)
    image_file.save(file_path)
    # Check if the file has a name
    rf = Roboflow(api_key=ROBOFLOW_API_KEY)
    project = rf.workspace().project("crowd_count_v2")
    model = project.version(2).model
    model.predict(file_path, confidence=40, overlap=30).save('../CodeOmega/src/components/CrowdDetection/crowd_prediction.jpg')
    response = {"image": "success"}
    print("Response",response)
    return jsonify(response)

@app.route("/upload-crowd-video", methods=['POST'])
def crowd_detector_video():
    video_file = request.files['file']
    file_path = os.path.join('video', video_file.filename)
    video_file.save(file_path)
    cnt = 0
    c1 = 0
    rf = Roboflow(api_key=ROBOFLOW_API_KEY)
    project = rf.workspace().project("crowd_count_v2")
    model = project.version(2).model
    cap = cv2.VideoCapture(file_path)
    
    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            break
        
        if c1 % 20 == 0:
            print("Frame:", c1)
            resized_frame = cv2.resize(frame, (320, 320))  # Resize the frame to a smaller size
            jpeg_quality = 95
            success, jpeg_image = cv2.imencode('.jpg', resized_frame, [int(cv2.IMWRITE_JPEG_QUALITY), jpeg_quality])

            if success:
                print(model.predict(jpeg_image, confidence=40, overlap=30).json())
                cnt += 1
        c1 += 1
    cap.release()
    return "done"

@app.route("/upload-crime-image", methods=['POST'])
def crime_detector_image():
    image_file = request.files['file']
    file_path = os.path.join('img', image_file.filename)
    image_file.save(file_path)
    # Check if the file has a name
    rf = Roboflow(api_key=ROBOFLOW_API_KEY)
    project = rf.workspace().project("dbss_smoking")
    model = project.version(1).model
    model.predict(file_path, confidence=40, overlap=30).save('../CodeOmega/src/components/CrimeDetection/crime_prediction.jpg')
    response = {"image": "success"}
    print("Response",response)
    return jsonify(response)

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


@app.route("/get_crime_complaints", methods=["GET"])
def get_crime_complaints():
    # Fetch all documents from the "complaints" collection
    complaints_collection = MongoDB('complaints')
    complaints = list(complaints_collection.find({"type": "crime"}))
    for complaint in complaints:
        complaint['_id'] = str(complaint['_id'])
    print(complaints)
    # Serialize the data to JSON and send it as a response
    return jsonify(complaints) 

@app.route("/get_clean_complaints", methods=["GET"])
def get_clean_complaints():
    # Fetch all documents from the "complaints" collection
    complaints_collection = MongoDB('complaints')
    complaints = list(complaints_collection.find({"type": "cleanliness"}))
    for complaint in complaints:
        complaint['_id'] = str(complaint['_id'])
    print(complaints)
    # Serialize the data to JSON and send it as a response
    return jsonify(complaints)    

@app.route("/get_tc", methods=["GET"])
def get_tc():
    # Fetch all documents from the "complaints" collection
    complaints_collection = MongoDB('tc')
    complaints = list(complaints_collection.find({}))
    for complaint in complaints:
        complaint['_id'] = str(complaint['_id'])
    print(complaints)
    # Serialize the data to JSON and send it as a response
    return jsonify(complaints) 

if __name__ == "__main__":
    app.run(debug=True, port=5000)