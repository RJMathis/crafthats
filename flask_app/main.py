import os
import socket
import logging
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:downing@127.0.0.1/stagingdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

from models import db


@app.route('/')
def home():
	return "hello world"

@app.route('/breweries', methods=['GET'])
def getBreweries():
    
    allBreweries = []

    breweries = Brewery.query.all()

    for brewery in breweries:
        b = {
            'name' : brewery.name,
            'city' : brewery.city,
            'state':brewery.state,
            'established': brewery.established
        }
        allBreweries.append(b)
    
    response = jsonify(allBreweries)
    response.status_code = 200

    return response

@app.route('/beers', methods=['GET'])
def getBeers():
    
    allBeers = []

    beers = Beer.query.all()

    for beer in beers:
        
        b = {
         'name' : beer.name,
         'organic' : beer.organic,
         'abv'  : beer.abv,
         'brewery' : beer.brewery_name,
         'style' : beer.style_name,
         'brewery' : beer.brewery_name

        }
        allBeers.append(b)

    response = jsonify(allBeers)
    response.status_code = 200

    return response
@app.route('/styles',methods=['GET'])
def getStyles():
    allStyles = []

    styles = Style.query.all()

    for style in styles:
        s = {
        'name' : style.name,
        'desicription' : style.description,
        'ibu' : style.ibu,
        'abv' :style.abv
        }
        allStyles.append(s)

    response = jsonify(allStyles)
    response.status_code = 200

    return response

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
    app.run(host='127.0.0.1', port=5000, debug=True)

