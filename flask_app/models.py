from flask_sqlalchemy import SQLAlchemy 
from flask import jsonify

from main import app

db = SQLAlchemy(app)


association_table = db.Table('association',
    db.Column('brewery_id',db.Integer,db.ForeignKey('brewery.id')),
    db.Column('style_id',db.Integer, db.ForeignKey('style.id'),)
)

class Beer (db.Model):
    __tablename__ = "beer"
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(200))
    organic = db.Column(db.String(8))
    abv = db.Column(db.Float(5))
    ibu = db.Column(db.Float(5))
    brewery_id = db.Column(db.Integer, db.ForeignKey('brewery.id'))
    style_id = db.Column(db.Integer, db.ForeignKey('style.id'))
    images = db.Column(db.String(2000))

    reviews = db.relationship("Review", backref='beer', lazy='dynamic')

    @property
    def serializeName(self):
       return self.name


class Brewery (db.Model):
    __tablename__ = "brewery"
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(200))
    city = db.Column(db.String(64))
    state = db.Column(db.String(64))
    country = db.Column(db.String(64))
    established = db.Column(db.Integer)

    description = db.Column(db.String(200))
    website = db.Column(db.String(2000))
    beers = db.relationship("Beer", backref="brewery", lazy="dynamic")
    images = db.Column(db.String(2000))
    # reviews = db.relationship("Review", backref="reviews", lazy='dynamic')
    styles = db.relationship("Style", secondary=association_table, backref=db.backref('breweries', lazy='dynamic'))

    @property
    def serializeName(self):
        return self.name

class Style (db.Model):
    __tablename__ = "style"
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(200))
    description = db.Column(db.Text)
    ibu_min = db.Column(db.Float(5))
    ibu_max = db.Column(db.Float(5))
    abv_min = db.Column(db.Float(5))
    abv_max = db.Column(db.Float(5))
    srm = db.Column(db.Float(5))
    beers = db.relationship("Beer", backref="style", lazy='dynamic')

    @property
    def serializeName(self):
        return self.name


class Review (db.Model):
    __tablename__ = "review"
    id = db.Column(db.Integer, primary_key = True)
    date = db.Column(db.String(10))
    rating = db.Column(db.Float(5))
    comment = db.Column(db.Text)
    beer_name = db.Column(db.Integer, db.ForeignKey('beer.id'))
    brewery_name = db.Column(db.Integer, db.ForeignKey('brewery.id'))
    # 
    @property
    def serialize(self):
        return {
        'id' : self.id,
        'date': self.date,
        'rating' : self.rating,
        'comment' : self.comment
        }
        
"""
create table review (id INTEGER NOT NULL AUTO_INCREMENT, date varchar(10) NOT NULL, rating FLOAT, comment TEXT NOT NULL, beer_name INTEGER, FOREIGN KEY (beer_name) REFERENCES beer(id), brewery_name INTEGER, FOREIGN KEY (brewery_name) REFERENCES brewery(id), PRIMARY KEY (id));
"""






