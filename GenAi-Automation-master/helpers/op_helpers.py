
from config.connection import get_db
from config.collections import Collection
from datetime import datetime
from bson import ObjectId
import logging

def addpatientHelpers(data):
    db_connection = get_db()
    if db_connection["status"] == "error":
        return {"status": False, "message": "Database Connection Error"}
    
    db = db_connection["db"]

    try:
        collection_name = Collection["PATIENTS"]
        if collection_name not in db.list_collection_names():
            db.create_collection(collection_name)
        collection = db[collection_name]
        data["date"] = str(datetime.today().date())
        data["time"] = str(datetime.now().time())
        logging.debug(f"\n\n {data} \n\n")
        # Insert the data into the collection
        result = collection.insert_one(data)
        return {"status": True, "message": "Patient added successfully", "name": data["firstname"], "user_id":str(result.inserted_id)}
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"status": False, "message": f"An error occurred: {e}"}


def getpatientlistHelpers():
    db_connection = get_db()
    if db_connection["status"] == "error":
        return {"status": False, "message": "Database Connection Error"}
    
    db = db_connection["db"]

    try:
        logging.debug(f"\n\n1\n\n")
        patient_list = list(db.patients.find())
        for patient in patient_list:
            patient['_id'] = str(patient['_id'])
        return patient_list
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"status": False, "message": f"An error occurred: {e}"}


def getdoctorHelpers():
    db_connection = get_db()
    if db_connection["status"] == "error":
        return {"status": False, "message": "Database Connection Error"}
    
    db = db_connection["db"]

    try:
        logging.debug(f"\n\n1\n\n")
        docs = list(db.doctor_user.find())
        for doc in docs:
            doc['_id'] = str(doc['_id'])
        return docs
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"status": False, "message": f"An error occurred: {e}"}

def getPatient(ID):
    db_connection = get_db()
    if db_connection["status"] == "error":
        return {"status": False, "message": "Database Connection Error"}
    
    db = db_connection["db"]

    try:
        logging.debug(f"\n\n {ID["ID"]}\n\n")
        patient = db.patients.find_one({"_id" : ObjectId(ID["ID"])})
        del patient["_id"]
        logging.debug(f"\n\n {patient}\n\n")
        return patient
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"status": False, "message": f"An error occurred: {e}"}
    


def addappointmentHelpers(data):
    db_connection = get_db()
    if db_connection["status"] == "error":
        return {"status": False, "message": "Database Connection Error"}
    
    db = db_connection["db"]

    try:
        collection_name = Collection["APPOINTMENTS"]
        if collection_name not in db.list_collection_names():
            db.create_collection(collection_name)
        collection = db[collection_name]
       
        logging.debug(f"\n\n {data} \n\n")
        logging.debug(f"\n\n {data['date']} \n\n")
        logging.debug(f"\n\n {type(data['date'])} \n\n")
        # Insert the data into the collection
        collection.insert_one(data)
        return {"status": True, "message": "appointment registerd successfully"}
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"status": False, "message": f"An error occurred: {e}"}
