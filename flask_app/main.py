import os
import socket
import logging
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['SQLALCHEMY_DATABASE_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

association_table = db.Table('association', db.Model.metadata,
    db.Column('brewery_id', db.Integer, db.ForeignKey('brewery.id')),
    db.Column('style_id', db.Integer, db.ForeignKey('style.id'))
)

class Beer (db.Model):
    __tablename__ = "beer"
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(64))
    organic = db.Column(db.String(8))
    abv = db.Column(db.String(8))
    ibu = db.Column(db.String(8))
    brewery_id = db.Column(db.Integer, db.ForeignKey('brewery.id'))
    style_id = db.Column(db.Integer, db.ForeignKey('style.id'))
    images = db.Column(db.String(80))
    reviews = db.relationship("Review", backref='reviews', lazy='dynamic')

class Brewery (db.Model):
    __tablename__ = "brewery"
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(64))
    city = db.Column(db.String(64))
    state = db.Column(db.String(64))
    established = db.Column(db.String(64))
    beers = db.relationship("Beer", backref="beers", lazy="dynamic")
    images = db.Column(db.String(80))
    reviews = db.relationship("Review", backref="reviews", lazy='dynamic')
    styles = db.relationship("Style",secondary=association_table, backref="breweries")


class Style (db.Model):
    __tablename__ = "style"
    id = db.Column(db.Integer, primary_key = True)
    description = db.Column(db.Text)
    ibu_min = db.Column(db.String(8))
    ibu_max = db.Column(db.String(8))
    abv_min = db.Column(db.String(8))
    abv_max = db.Column(db.String(8))
    beers = db.relationship("Beer", backref="beers", lazy='dynamic')


class Review (db.Model):
    __tablename__ = "review"
    id = db.Column(db.Integer, primary_key = True)
    date = db.Column(db.String(24))
    rating = db.Column(db.String(64))
    flavor = db.Column(db.String(8))
    comment = db.Column(db.Text)
    beer_name = db.Column(db.Integer, db.ForeignKey('beer.id'))
    brewery_name = db.Column(db.Integer, db.ForeignKey('brewery.id'))



@app.route('/')
def home():
	return "hello world"

@beerapp.route('/breweries', methods=['GET'])
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

@beerapp.route('/beers', methods=['GET'])
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
@beerapp.route('/styles',methods=['GET'])
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

