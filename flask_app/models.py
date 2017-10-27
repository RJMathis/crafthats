from flask_sqlalchemy import SQLAlchemy 
from main import app

''' make a database object that represents db in cloud'''
db = SQLAlchemy(app)

''' a table for the many2many relationship of breweries and styles'''
association_table = db.Table('association',
    db.Column('brewery_id',db.Integer,db.ForeignKey('brewery.id')),
    db.Column('style_id',db.Integer, db.ForeignKey('style.id'),)
)

''' a beer model that has a           '''
''' one2one relationship with brewery '''
''' one2many relationship with reviews'''
class Beer (db.Model):
    __tablename__ = "beer"
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(64))                                         #beer name
    organic = db.Column(db.String(8))
    abv = db.Column(db.String(8))
    ibu = db.Column(db.String(8))
    brewery_id = db.Column(db.Integer, db.ForeignKey('brewery.id'))         #the brewery that brews this beer
    style_id = db.Column(db.Integer, db.ForeignKey('style.id'))             #foriegn key to style type of beer
    images = db.Column(db.String(80))                                       #http link to label image if available
    reviews = db.relationship("Review", backref='beer', lazy='dynamic')

''' a breweries model that has a           '''
''' one2many relationship with beer '''
''' many2many relationship with styles'''
class Brewery (db.Model):
    __tablename__ = "brewery"
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(64))
    city = db.Column(db.String(64))
    state = db.Column(db.String(64))
    country = db.Column(db.String(64))
    established = db.Column(db.String(64))
    description = db.Column(db.String(200))                         # a short blurb about the brewery

    beers = db.relationship("Beer", backref="brewery", lazy="dynamic") # a list of beers brewery makes
    images = db.Column(db.String(80))
    styles = db.relationship("Style", secondary=association_table, backref=db.backref('breweries', lazy='dynamic'))

''' a style model that has information about the kind of beer e.g. ipa, stout..         '''
''' one2many relationship with beer '''
''' one2many relationship with breweries via beer'''
class Style (db.Model):
    __tablename__ = "style"
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(40))
    description = db.Column(db.Text)
    ibu_min = db.Column(db.String(8))
    ibu_max = db.Column(db.String(8))
    abv_min = db.Column(db.String(8))
    abv_max = db.Column(db.String(8))
    beers = db.relationship("Beer", backref="style", lazy='dynamic')

''' a review model that has a           '''
''' one2many relationship with beer '''
''' oney2many relationship with breweries via beer'''
class Review (db.Model):
    __tablename__ = "review"
    id = db.Column(db.Integer, primary_key = True)
    date = db.Column(db.String(24))
    rating = db.Column(db.String(64))
    comment = db.Column(db.Text)
    beer_name = db.Column(db.Integer, db.ForeignKey('beer.id'))
    # brewery_name = db.Column(db.Integer, db.ForeignKey('brewery.id'))






