from flask_sqlalchemy import SQLAlchemy 
# from app import app

db = SQLAlchemy()

from flask_sqlalchemy import SQLAlchemy 

db = SQLAlchemy()


BreweryStyleAssocTable = db.Table('BreweryStyleAssocTable', 
    db.Column('style_id',db.Integer, db.ForeignKey('Style.id')),
    db.Column('brewery_name',db.String(64), db.ForeignKey('Brewery.name'))
    ) 

class Beer (db.Model):
    __tablename__ = "Beer"
    name = db.Column(db.String(64), primary_key = True)
    organic = db.Column(db.Boolean)
    abv = db.Column(db.Integer)
    
    brewery_name = db.Column(db.String(64), db.ForeignKey('Brewery.name'))
    style_id = db.Column(db.Integer, db.ForeignKey('Style.id'))

    reviews = db.relationship("Review", backref='beer', lazy='dynamic')

class Brewery (db.Model):
    __tablename__ = "Brewery"
    name = db.Column(db.String(64), primary_key = True)
    city = db.Column(db.String(64))
    state = db.Column(db.String(64))
    established = db.Column(db.Integer)

    beers = db.relationship("Beer", backref ="brewery", lazy='dynamic')
    reviews = db.relationship("Review", backref="brewery", lazy='dynamic')

    styles = db.relationship ('Style', secondary=BreweryStyleAssocTable, backref=db.backref('brewery',lazy='dynamic'))

class Style (db.Model):
    __tablename__ = "Style"
    id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    description = db.Column(db.Text)
    ibu = db.Column(db.String(64))
    abv = db.Column(db.Integer)

    beers = db.relationship("Beer", backref="style", lazy='dynamic')

class Review (db.Model):
    __tablename__ = "Review"
    id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    rating = db.Column(db.Numeric(1,1))
    flavor = db.Column(db.Numeric(1,1))
    comment = db.Column(db.Text)
    beer_name = db.column(db.String(64),db.ForeignKey('Beer.name'))    
    brewery_name = db.Column(db.String(64), db.ForeignKey('Brewery.name')) 

 
