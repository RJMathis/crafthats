import os
import socket
import logging
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy
from sqlalchemy.orm import lazyload
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqldb://root:downing@127.0.0.1/stagingdb'
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['SQLALCHEMY_DATABASE_URI']

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# from sqlalchemy import create_engine
# engine = create_engine('mysql+mysqldb://root:downing@/stagingdb?unix_socket=/cloudsql/backend-staging-183303:us-central1:stagingdb')
 
# from models import db
db = SQLAlchemy(app)
# db.init_app(app)

from models import db, Beer, Review, Style, Brewery


@app.route('/')
def home():
    # x = db.session.query(Beer).all()
    return "hello world"


@app.route('/breweries', methods=['GET'])
def getBreweries():
    allBreweries = []
    
    lim = request.args.get('limit', 9)
    off = request.args.get('offset',0)
    breweries = db.session.query(Brewery).limit(lim).offset(off).all()

    for brewery in breweries:
        b = {
            'id': brewery.id,
            'name': brewery.name,
            'city': brewery.city,
            'state': brewery.state,
            'country': brewery.country,
            'established': brewery.established,
            'description': brewery.description,
            'website' : brewery.website,
            'beers': [beer.serializeName for beer in brewery.beers],
            'image': brewery.images,
            'styles': [style.serializeName for style in brewery.styles]
        }
        allBreweries.append(b)

    response = jsonify(allBreweries)
    response.status_code = 200

    return response

@app.route('/beers', methods=['GET'])
def getBeers():
    
    allBeers = []
    lim = request.args.get('limit', 9)
    off = request.args.get('offset',0)

    beers = db.session.query(Beer).limit(lim).offset(off).all()


    for beer in beers:
        b = {
            'id': beer.id,
            'name': beer.name,
            'organic': beer.organic,
            'abv': beer.abv,
            'ibu': beer.ibu,
            'image': beer.images,
            'brewery': beer.brewery.name,
            'style': beer.style.name
        }
        allBeers.append(b)

    response = jsonify(allBeers)
    response.status_code = 200

    return response

@app.route('/styles',methods=['GET'])
def getStyles():
    allStyles = []

    lim = request.args.get('limit', 9)
    off = request.args.get('offset',0)

    styles = db.session.query(Style).limit(lim).offset(off).all()
    for style in styles:
        s = {
        'id' : style.id,
        'name' : style.name,
        'description' : style.description,
        'ibu_min' : style.ibu_min,
        'ibu_max' : style.ibu_max,
        'abv_min' : style.abv_min,
        'abv_max' : style.abv_max,
        'beers' : [beer.serializeName for beer in style.beers],
        'breweries':[brewery.serializeName for brewery in style.breweries]
        }
        allStyles.append(s)

    response = jsonify(allStyles)
    response.status_code = 200

    assert isinstance(response, object)
    return response


@app.route('/reviews', methods = ['GET'])
def getReviews():
    allReviews = []

    lim = request.args.get('limit', 9)
    off = request.args.get('offset',0)

    reviews = db.session.query(Review).limit(lim).offset(off).all()

    for review in reviews:
        r = {
        'id' : review.id,
        'date': review.date,
        'rating' : review.rating,
        'comment' : review.comment,
        'beer_name' : review.beer.name,
        'brewery_name' : review.beer.brewery.name
        }
        allReviews.append(r)

    response = jsonify(allReviews)
    response.status_code = 200

    return response

@app.route('/beers/<beer_id>', methods = ['GET'])
def getBeerInfo(beer_id):
    try:
        beer = db.session.query(Beer).filter_by(id=beer_id).first()

        b = {
            'name' : beer.name,
            'organic' : beer.organic,
            'abv'  : beer.abv,
            'ibu'  : beer.ibu,
            'images' :beer.images,
            'brewery' : beer.brewery.name,
            'style' : beer.style.name,
            'reviews': [review.serialize for review in beer.reviews]
        }
        response = jsonify(b)
    except AttributeError:
        response = "Server Error 500: Invalid beer_id"

    return response

@app.route('/reviews/<review_id>', methods = ['GET'])
def getReviewInfo(review_id):
    try:
        review = db.session.query(Review).filter_by(id=review_id).first()
        r = {
            'id' : review.id,
            'date': review.date,
            'rating' : review.rating,
            'comment' : review.comment,
            'beer_name' : review.beer.name,
            'brewery_name': review.beer.brewery.name
            }
    except AttributeError:
        return "Server Error 500: Invalid review_id"
    return jsonify(r)

@app.route('/breweries/<brewery_id>', methods = ['GET'])
def getBreweryInfo(brewery_id):
    try:
        brewery = db.session.query(Brewery).filter_by(id=brewery_id).first()
        b = {
                'id': brewery.id,
                'name': brewery.name,
                'city': brewery.city,
                'state': brewery.state,
                'country': brewery.country,
                'established': brewery.established,
                'website': brewery.website,
                'description': brewery.description,
                'beers':  [beer.name for beer in brewery.beers],
                'images': brewery.images,
                'styles': [style.serializeName for style in brewery.styles]
            }
    except AttributeError:
        return "Server Error 500: Invalid brewery_id"
    return jsonify(b)

@app.route('/styles/<style_id>', methods = ['GET'])
def getStyleInfo(style_id):
    try:
        style = db.session.query(Style).filter_by(id=style_id).first()
        s = {
            'id' : style.id,
            'name' : style.name,
            'desicription' : style.description,
            'ibu_min' : style.ibu_min,
            'ibu_max' : style.ibu_max,
            'abv_min' : style.abv_min,
            'abv_max' : style.abv_max,
            'beers' : [beer.serializeName for beer in style.beers],
            'breweries':[brewery.serializeName for brewery in style.breweries]
            }
    except AttributeError:
        return "Server Error 500: Invalid style_id"
    return jsonify(s)

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
    app.run(host='127.0.0.1', port=5000,debug=True)

