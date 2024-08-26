import logging
from flask import Blueprint, render_template,request
from helpers.doctor_helpers import getappointmentsHelpers,getPatient
from lstm_model import getNextWord
from LSTM import make_prediction

doctor_routes = Blueprint('doctor_routes', __name__, template_folder='templates')

@doctor_routes.route('/home')
def home():
    appointmentsoTaday = getappointmentsHelpers()
    
    logging.debug(f"\n\n\nAppointments data: {appointmentsoTaday}")
    logging.debug(f"\n\n\nLength of data: {len(appointmentsoTaday)}")
    logging.debug(f"\n\n\nType of data: {type(appointmentsoTaday)}")
    
    return render_template('doctor/home.html', appointments=appointmentsoTaday)


@doctor_routes.route('/diagnosis/<patient_id>')
def diagnosis(patient_id):
    logging.debug(f"\n\n {patient_id} \n\n")

    response = getPatient(patient_id)
    
    logging.debug(f"\n\n {response} \n\n")
    # if not patient:
    #     return {"status": False, "response_message": "Patient not found"}
    
    # Render a template for diagnosis or handle the diagnosis logic
    return render_template('doctor/doc_diagnosis.html',patient=response)


@doctor_routes.route('/fetch_next_words', methods=['POST'])
def fetch_next_words():
    data = request.get_json()
    logging.debug(f"\n\n {data} \n\n")

    #response = getNextWord(data['word'])
    response = make_prediction(data['word'])
    
    logging.debug(f"\n\n {response} \n\n")
    # if not patient:
    #     return {"status": False, "response_message": "Patient not found"}
    
    # Render a template for diagnosis or handle the diagnosis logic
    return {'next_sentace' : response }
