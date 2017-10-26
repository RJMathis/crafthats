import os
import socket
import logging
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['SQLALCHEMY_DATABASE_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

 
from models import db 

@app.route('/')
def home():
	return "hello world"

@app.route('/breweries', methods=['GET'])
def getBreweries():
    
    allBreweries = []

    breweries = db.session.query(Brewery).all()

    for brewery in breweries:
        for beer in brewery.beers.all():
            beersOfBrewery = []
            beersOfBrewery.append(beer.name)

        for review in brewery.reviews.all():
            reviewsofBrewery = []
            reviewsofBrewery.append(review.serialize())

        #to do styles!
        
        b = {
            'name' : brewery.name,
            'city' : brewery.city,
            'state':brewery.state,
            'established': brewery.established,
            'beers' : beersOfBrewery,
            'reviews' : reviewsofBrewery,
            'images' : brewery.images

            }
        allBreweries.append(b)
    
    response = jsonify(allBreweries)
    response.status_code = 200

    return response

@app.route('/beers', methods=['GET'])
def getBeers():
    
    allBeers = []

    beers = db.session.query(Beer).all()


    for beer in beers:
        
        b = {
         'name' : beer.name,
         'organic' : beer.organic,
         'abv'  : beer.abv,
         'brewery' : beer.brewery_name,
         'style' : beer.style_name,
        }
        allBeers.append(b)

    response = jsonify(allBeers)
    response.status_code = 200

    return response
@app.route('/styles',methods=['GET'])
def getStyles():
    allStyles = []

    styles = db.session.query(Style).all

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

