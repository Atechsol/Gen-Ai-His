from config.connection import get_db
import logging
from bson import ObjectId
from config.collections import Collection


def addnewitemHelpers(data):
    db_connection = get_db()
    if db_connection["status"] == "error":
        return {"status": False, "message": "Database Connection Error"}
    
    db = db_connection["db"]

    try:
        collection_name = Collection["STOCK"]
        if collection_name not in db.list_collection_names():
            db.create_collection(collection_name)
            
        collection = db[collection_name]
    
        if collection.find_one({"itemName": data["itemName"]}):
            return {"status": False, "message": "item Name already exisit"}
        
        if collection.find_one({"itemId": data["itemId"]}):
            return {"status": False, "message": "item ID already exisit"}
        data['quantity'] = int(data['quantity'])
        logging.debug(type(data['quantity']))
        if data['quantity'] <= 50:
            data['status'] = True
        else:
            data['status'] = False 
        # Insert the data into the collection
        result = collection.insert_one(data)
        
        return {"status": True, "message": "Item added successfully"}
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"status": False, "message": f"An error occurred: {e}"}

def getstock(data):
    db_connection = get_db()
    if db_connection["status"] == "error":
        return {"status": False, "response_message": "Database Connection Error"}
    
    db = db_connection["db"]

    parameters = data.get('parameters',{})
    logging.debug(f"\n\n {parameters["itemname"]}")
    try:
        item = db.stock.find_one({"itemName" : parameters["itemname"]})
        logging.debug(f"\n\n Test 9 \n\n {item}")
        if item:
            return {"status": True, "itemstock": item}
        else:
            return {"status" : False, "response_message" : "Item not found"}
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"status": False, "response_message": f"An error occurred: {e}"}
    

def getstocklistHelpers():
    db_connection = get_db()
    if db_connection["status"] == "error":
        return {"status": False, "message": "Database Connection Error"}
    
    db = db_connection["db"]

    try:
        patient_list = list(db.stock.find())
        for patient in patient_list:
            patient['_id'] = str(patient['_id'])
        return patient_list
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"status": False, "message": f"An error occurred: {e}"}
    
def orderstockHelpers(itemID):
    db_connection = get_db()
    if db_connection["status"] == "error":
        return {"status": False, "message": "Database Connection Error"}
    
    db = db_connection["db"]

    try:
        itemdetails = db.stock.find_one({"_id" : ObjectId(itemID["itemId"])})
        return itemdetails
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"status": False, "message": f"An error occurred: {e}"}