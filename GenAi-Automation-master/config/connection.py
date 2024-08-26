# config/connection.py
import pymongo

class Database:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Database, cls).__new__(cls)
            cls._instance.connection = cls._connect()
        return cls._instance
    
    @staticmethod
    def _connect():
        try:
            # Create a MongoClient instance to connect to MongoDB
            myclient = pymongo.MongoClient("mongodb://localhost:27017/", serverSelectionTimeoutMS=5000)
            db = myclient["GenAi_automation"]
            return {
                "status": "success",
                "message": "Successfully connected to MongoDB and selected database",
                "db": db
            }
        except ConnectionError as e:
            return {
                "status": "error",
                "message": f"MongoDB connection error: {str(e)}"
            }

def get_db():
    db_instance = Database()
    return db_instance.connection
