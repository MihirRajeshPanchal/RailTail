from flask import Flask,jsonify,request
from dotenv import load_dotenv
import os
from pymongo import MongoClient

load_dotenv()

app = Flask(__name__)
passw = os.getenv("MONGO_PASS")
connection_string = f"mongodb+srv://codeomega:{passw}@cluster0.hnyk6mi.mongodb.net/?retryWrites=true&w=majority"
def MongoDB(collection_name):
    client = MongoClient(connection_string)
    db = client.get_database('TSEC')
    collection = db.get_collection(collection_name)
    return collection

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


@app.route("/add_complaint", methods=["POST"])
def add_complaint():
    if request.method == "POST":
        try:
            # Parse the JSON data from the request
            data = request.json

            # Extract the required fields from the JSON data
            complaint_type = data["type"]
            station = data["station"]
            line = data["line"]
            description=data["description"]
            
            # Extract the "location" field with x and y coordinates
            location = data.get("location", {})
            x_coordinate = location.get("x", None)
            y_coordinate = location.get("y", None)

            # Create the complaint document
            complaint = {
                "type": complaint_type,
                "station": station,
                "line": line,
                "description": description,
                "location": {
                    "x": x_coordinate,
                    "y": y_coordinate
                }
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

if __name__ == "__main__":
    app.run(debug=True, port=5000)