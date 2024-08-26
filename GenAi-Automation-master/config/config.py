import os
GROQ_API = "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"

class Config:
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY', 'default_secret_key')