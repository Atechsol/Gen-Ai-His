from flask import session
from config.connection import get_db
from datetime import datetime
import logging
from config.collections import Collection
from bson import ObjectId


def getappointmentsHelpers():
    db_connection = get_db()
    if db_connection["status"] == "error":
        return {"status": False, "response_message": "Database Connection Error"}
    
    db = db_connection["db"]
    # Assume the doctor's ID is stored in the session
    doctor_id = session.get('userID')
    # Get today's date in the correct format
    today_date = datetime.now().strftime('%Y-%m-%d')
    # Query to find all appointments for the doctor today
    logging.debug(f"\n\n {doctor_id} \n\n")
    logging.debug(f"\n\n {today_date} \n\n")
    logging.debug(f"\n\n {type(today_date)} \n\n")
    appointments = list(db.appointments.find(
        {'doc_id': doctor_id, 'date' : today_date}
    ))
    logging.debug(f" todays \n\n {appointments} \n\n")
    # Retrieve patient details for each appointment
    
    results = []
    for appointment in appointments:
        patient_id = appointment['patientId']
        patient = db.patients.find_one({'_id': ObjectId(patient_id)})
        if patient:
            results.append({
                'appointmenttime': appointment['appt'],
                'patient': patient
            })

    logging.debug(f"\n\n {results} \n\n")
    # Print the results
    for result in results:
        print(f"Patient: {result['patient']}")
       
   
    return results


def getPatient(ID):
    db_connection = get_db()
    if db_connection["status"] == "error":
        return {"status": False, "message": "Database Connection Error"}
    
    db = db_connection["db"]

    try:
        logging.debug(f"\n\n {ID}\n\n")
        patient = db.patients.find_one({"_id" : ObjectId(ID)})
        del patient["_id"]
        logging.debug(f"\n\n {patient}\n\n")
        return patient
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"status": False, "message": f"An error occurred: {e}"}