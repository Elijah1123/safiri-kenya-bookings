import os
from dotenv import load_dotenv

load_dotenv()
class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv ('DATABASE_URL', 'sqlite:///app.db') 
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'your-secret-key'

    
    MPESA_CONSUMER_KEY = 'your_key'
    MPESA_CONSUMER_SECRET = 'your_secret'
    MPESA_SHORTCODE = '174379'
    MPESA_PASSKEY = 'your_lipa_na_mpesa_passkey'
    MPESA_CALLBACK_URL = 'https://yourdomain.com/api/confirm-payment'
