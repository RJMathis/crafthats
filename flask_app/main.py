import os
import socket
import logging
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy
from sqlalchemy.orm import lazyload
from flask_cors import CORS
from werkzeug.contrib.cache import SimpleCache

app = Flask(__name__)
CORS(app)
cache = SimpleCache()

# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqldb://root:downing@127.0.0.1/stagingdb'
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['SQLALCHEMY_DATABASE_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

from models import db
from views import views, beer, brewery, style, review

if __name__ == '__main__':
    # This is used when running locally. Gunicorn is used to run the
    # application on Google App Engine. See entrypoint in app.yaml.
    app.run(host='127.0.0.1', port=5000,config = None, debug=True)

