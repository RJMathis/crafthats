import os
import socket
import logging
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy

beerapp = Flask(__name__)
beerapp.config['SQLALCHEMY_DATABASE_URI'] = os.environ['SQLALCHEMY_DATABASE_URI']
beerapp.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# from beerapp import models

db = SQLAlchemy(beerapp)

@beerapp.route('/')
def home():
	return "hello world"

@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500

if __name__ == '__main__':
    # This is used when running locally. Gunicorn is used to run the
    # application on Google App Engine. See entrypoint in app.yaml.
    beerapp.run(host='127.0.0.1', port=5000, debug=True)

