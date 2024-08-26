from flask import session
from config.connection import get_db
from config.collections import Collection
import logging

def authenticate_user(username,password):
    db_connection = get_db()
    if db_connection["status"] == "error":
        return {"status": False, "message": "Database Connection Error"}
    
    db = db_connection["db"]

    try:    
        #authenticating doctor
        user = db.doctor_user.find_one({"username" : username})
        if user:
            if user["password"] == password:
                session["userID"] = str(user["_id"])
                session["user"] = "doctor"
                print(f"Session : {session} \n User : {Collection["DOCTOR_USER"]}")
                return {"status": True, "message": "Login Sucessfull","_id" :str(session["userID"]),"name" : user["name"],"User" : Collection["DOCTOR_USER"],"render" : "doctor/home"}
            else:
                return {"status": False, "message": "Wrong Password"}
        else:
             #authenticating op    
            user = db.op_user.find_one({"username" : username})
            if user:
                if user["password"] == password:
                    session["userID"] = str(user["_id"])
                    session["user"] = "op"
                    print(f"Session : {session} \n User : {Collection["OP_USER"]}")
                    return {"status": True, "message": "Login Sucessfull","_id" :str(session["userID"]),"name" : user["name"], "User" : Collection["OP_USER"],"render" : "op/home"}
                else:
                    return {"status": False, "message": "Wrong Password"}
            else:
                #authenticating nurse    
                user = db.nurse_user.find_one({"username" : username})
                if user:
                    if user["password"] == password:
                        session["userID"] = str(user["_id"])
                        session["user"] = "nurse"
                        print(f"Session : {session} \n User : {Collection["NURSE_USER"]}")
                        return {"status": True, "message": "Login Sucessfull","_id" :str(session["userID"]),"name" : user["name"],"User" : Collection["NURSE_USER"],"render" : "nurse/home"}
                    else:
                        return {"status": False, "message": "Wrong Password"}
                else:
                    #authenticating invetory    
                    user = db.inventory_user.find_one({"username" : username})
                    if user:
                        if user["password"] == password:
                            session["userID"] = str(user["_id"])
                            session["user"] = "inventory"
                            print(f"Session : {session} \n User : {Collection["INVENTORY_USER"]}")
                            return {"status": True, "message": "Login Sucessfull","_id" :str(session["userID"]),"name" : user["name"],"User" : Collection["INVENTORY_USER"], "render" : "inventory/home"}
                        else:
                            return {"status": False, "message": "Wrong Password"}
                    else:
                        #authenticating admin    
                        user = db.admin.find_one({"username" : username})
                        if user:
                            if user["password"] == password:
                                session["userID"] =str(user["_id"])
                                session["user"] = "admin"
                                print(f"Session : {session} \n User : {Collection["ADMIN_USER"]}")
                                return {"status": True, "message": "Login Sucessfull","_id" :str(session["userID"]),"name" : user["name"],"User" : Collection["ADMIN_USER"], "render" : "admin/home"}
                            else:
                                return {"status": False, "message": "Wrong Password"}
                        else:
                            return {"status" : False, "message" : "Wrong Username"}


    except Exception as e:
        print(f"An error occurred: {e}")
        return {"status": False, "message": f"An error occurred: {e}"}