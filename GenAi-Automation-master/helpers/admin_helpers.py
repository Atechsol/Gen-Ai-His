from config.connection import get_db
import logging
from config.collections import Collection

def insert_inventory_user(data):
    db_connection = get_db()
    if db_connection["status"] == "error":
        return {"status": False, "message": "Database Connection Error"}
    
    db = db_connection["db"]

    try:
        collection_name = Collection["INVENTORY_USER"]
        if collection_name not in db.list_collection_names():
            db.create_collection(collection_name)
            
        collection = db[collection_name]
    
        if collection.find_one({"username": data["username"]}):
            return {"status": False, "message": "User already exisit"}
        
        del data["confirmpassword"]
        # Insert the data into the collection
        result = collection.insert_one(data)
        return {"status": True, "message": "Inventory user added successfully","_id" :str(result.inserted_id),"name" : data["name"]}
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"status": False, "message": f"An error occurred: {e}"}

def insert_doctor_user(data):
    db_connection = get_db()
    print(Collection["INVENTORY_USER"])
    if db_connection["status"] == "error":
        return {"status": False, "message": "Database Connection Error"}
    
    db = db_connection["db"]

    try:
        
        collection_name = Collection["DOCTOR_USER"]
        logging.debug(f"Collection name from Collection: {collection_name}")
        print(collection_name)
        if collection_name not in db.list_collection_names():
            db.create_collection(collection_name)

        collection = db[collection_name]
        del data["confirmpassword"]
        # Insert the data into the collection
        result = collection.insert_one(data)
        return {"status": True, "message": "Inventory user added successfully","_id" :str(result.inserted_id),"name" : data["name"]}
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"status": False, "message": f"An error occurred: {e}"}

def insert_op_user(data):
    db_connection = get_db()
    if db_connection["status"] == "error":
        return {"status": False, "message": "Database Connection Error"}
    
    db = db_connection["db"]

    try:
        
        collection_name = Collection["OP_USER"]
        logging.debug(f"Collection name from Collection: {collection_name}")
        print(collection_name)
        if collection_name not in db.list_collection_names():
            db.create_collection(collection_name)

        collection = db[collection_name]
        del data["confirmpassword"]
        # Insert the data into the collection
        result = collection.insert_one(data)
        return {"status": True, "message": "Inventory user added successfully","_id" :str(result.inserted_id),"name" : data["name"]}
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"status": False, "message": f"An error occurred: {e}"}
    
def insert_nurse_user(data):
    db_connection = get_db()
    if db_connection["status"] == "error":
        return {"status": False, "message": "Database Connection Error"}
    
    db = db_connection["db"]
    try:
        collection_name = Collection["NURSE_USER"]
        print(collection_name)
        if collection_name not in db.list_collection_names():
            db.create_collection(collection_name)

        collection = db[collection_name]
        del data["confirmpassword"]
        # Insert the data into the collection
        result = collection.insert_one(data)
        return {"status": True, "message": "Inventory user added successfully","_id" :str(result.inserted_id),"name" : data["name"]}
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"status": False, "message": f"An error occurred: {e}"}