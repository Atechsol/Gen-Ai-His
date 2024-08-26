from flask import session
from helpers.index_helpers import authenticate_user

import logging

class functons_background:
    def log_in(username,password):
        response = authenticate_user(username,password)
        return response
    
    def getStock(data):
        from helpers.inventory_helpers import getstock
        if session:
            if session["user"] == "admin" or session["user"] == "inventory":
                itemstock = getstock(data)
                logging.debug("\n\n 10 \n\n")
                if itemstock["status"] == True:
                    print(f"\n\n {itemstock}")
                    itemstock["itemstock"] = str(itemstock["itemstock"])
                return itemstock
            else:
                return {"status" : False, "response_message" : "You dont have access!!"}
        else :
            return {"status" : False, "response_message" : "Please log In!!"}
            