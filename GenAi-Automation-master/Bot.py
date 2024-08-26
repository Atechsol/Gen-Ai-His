from flask import jsonify
import requests
import logging
from function_calling import functons_background
from config.config import GROQ_API
from config.prompt_template import SYSTEM_PROMPT,SYSTEM_PROMPT_FUNCTION_REASPONSE,SYSTEM_PROMPT_EMAIL_QUOTATION
from groq import Groq
import json

# Configure logging
logging.basicConfig(level=logging.DEBUG)

client = Groq(
    api_key=GROQ_API,
)

functions_instance = functons_background()



functions_name = ("Sign_in")
functions = {
    "Sign_in" : (functons_background.log_in,("value1","value2"))
}

model_name="llama3-70b-8192"
system_prompt = {
    "role": "system",
    "content":
    "You are a helpful assistant for a hospital management system your name is LIFEbot. You reply with very precise small answers."
    }
chat_history = [system_prompt]

class chat:
    
    def chat_with_message(self, message):
        try:

            chat_history.append({"role": "user", "content": message})

            chat_completion = client.chat.completions.create(model=model_name,
                                            messages=chat_history,
                                            max_tokens=100,
                                            temperature=1.2
        )
            print(f"\n\n{chat_completion}\n\n")
            print(f"\n\n{chat_completion.choices[0].message.content}\n\n")
            return ({"response_message" : chat_completion.choices[0].message.content})
        
        except requests.exceptions.HTTPError as http_err:
            logging.error(f"HTTP error occurred: {http_err}")
            return {"status": "error", "response_message": "HTTP error occurred"}
        except requests.exceptions.RequestException as req_err:
            logging.error(f"Request failed: {req_err}")
            return {"status": "error", "response_message": "Request failed"}


    def chat_for_function(self,user_input):
       
        # Initialize the chat history
        chat_history = [SYSTEM_PROMPT]

        chat_history.append({"role": "user", "content": user_input})
        logging.debug("\n\n 1 \n\n")
        response = client.chat.completions.create(
            model="llama3-70b-8192",
            messages=chat_history,
            max_tokens=100,
            temperature=1.2
        )
        logging.debug("\n\n 2 \n\n")
        # Append the response to the chat history
        chat_history.append({
            "role": "assistant",
            "content": response.choices[0].message.content
        })
        logging.debug("\n\n 3 \n\n")
        # Print the assistant's response
        logging.debug(f" \n\n Assistant:{response.choices[0].message.content}")
        logging.debug(type(response.choices[0].message.content))
        response_json = json.loads(response.choices[0].message.content)
        logging.debug("\n\n 4 \n\n")
        return (response_json)
    
    def check_function(self,data):
        if data["name"] == "getstock":
            logging.debug("\n\n Test 7 \n\n")
            response = functons_background.getStock(data)
            logging.debug("\n\n 11 \n\n")
            if response["status"]:
                try:
                    chat_history = [SYSTEM_PROMPT_FUNCTION_REASPONSE]
                    chat_history.append({"role": "user", "content": response["itemstock"]})
                    logging.debug("\n\n 12 \n\n")
                    response = client.chat.completions.create(
                            model="llama3-70b-8192",
                            messages=chat_history,
                            max_tokens=100,
                            temperature=1.2
                        )
                    logging.debug("\n\n 13 \n\n")
                        # Append the response to the chat history
                    chat_history.append({
                            "role": "assistant",
                            "content": response.choices[0].message.content
                        })
                    logging.debug("\n\n 14 \n\n")
                        # Print the assistant's response
                    logging.debug(f" \n\n Assistant:{response.choices[0].message.content}")
                    logging.debug(type(response.choices[0].message.content))
                    return ({"response_message" : response.choices[0].message.content})
            
                except requests.exceptions.HTTPError as http_err:
                    logging.error(f"HTTP error occurred: {http_err}")
                    return {"status": "error", "message": "HTTP error occurred"}
            else :
                
                return response
            

    def draft_mail_for_oder(self,data):
        # Initialize the chat history
        chat_history_for_mail = [SYSTEM_PROMPT_EMAIL_QUOTATION]

        chat_history_for_mail.append({"role": "user", "content": str(data)})
        logging.debug(f"\n\n 1{chat_history_for_mail} \n\n")
        response = client.chat.completions.create(
                model="llama3-70b-8192",
                messages=chat_history_for_mail,
                max_tokens=500,
                temperature=1.2
        )
        logging.debug("\n\n 2 \n\n")
        # Append the response to the chat history
        del chat_history_for_mail
        logging.debug("\n\n 3 \n\n")
        # Print the assistant's response
        logging.debug(f" \n\n Assistant:{response.choices[0].message.content}")
        logging.debug(type(response.choices[0].message.content))
        response_json = json.loads(response.choices[0].message.content)
        logging.debug(f"\n\n  {response_json} \n\n")
        logging.debug(type(response_json))
        return response_json           