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

@app.route("/")
def hello_world():
    response = {"message": "i am here!!"}
    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True, port=5000)