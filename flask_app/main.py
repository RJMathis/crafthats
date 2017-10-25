import os
import socket
import logging
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy

app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['SQLALCHEMY_DATABASE_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:downing@127.0.0.1/stagingdb'

db = SQLAlchemy(app)

# BreweryStyleAssocTable = db.Table('BreweryStyleAssocTable',
#     db.Column('style_id',db.Integer, db.ForeignKey('Style.id')),
#     db.Column('brewery_name',db.String(64), db.ForeignKey('Brewery.name'))
#     )
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
    # beer_id = db.Column(db.Integer, db.ForeignKey('beer.id'))
    # beer = db.relationship("Beer", backref="brewery", lazy="dynamic")
    beers = db.relationship("Beer", backref="beers", lazy="dynamic")
    images = db.Column(db.String(80))
    # beer = db.relationship("Beer", backref ="brewery", lazy='dynamic')
    reviews = db.relationship("Review", backref="reviews", lazy='dynamic')
    styles = db.relationship("Style",secondary=association_table, backref="breweries")
    # styles = db.relationship ('Style', secondary=BreweryStyleAssocTable, backref=db.backref('brewery',lazy='dynamic'))
    # styles = db.relationship ('Style', backref="brewery",lazy='dynamic')


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

