from flask_sqlalchemy import SQLAlchemy 

db = SQLAlchemy()


class Beer (db.Model):
    __tablename__ = "Beer"
    name = db.Column('name', db.String(64), primary_key = True)
    brewery = db.Column('brewery', db.String(64), db.ForeignKey('Brewery.name'))
    style_id = db.Column('style_id', db.Integer, db.ForeignKey('Style.id'))
    organic = db.Column('organic', db.Boolean)
    abv = db.Column('abv', db.Integer)

    style = db.relationship('Style', foreign_keys=style_id)
    brewery = db.relationship('Brewery', foreign_keys=brewery)

class Style (db.Model):
    __tablename__ = "Style"
    id = db.Column('id', db.Integer, primary_key = True, autoincrement=True)
    description = db.Column('description',db.Text)
    ibu = db.Column('ibu', db.String(64))
    abv = db.Column('abv', db.Integer)

class Brewery (db.Model):
    __tablename__ = "Brewery"
    name = db.Column('name', db.String(64), primary_key = True)
    city = db.Column('city', db.String(64))
    state = db.Column('state', db.String(64))
    established = db.Column('established', db.Integer)

    

class Review (db.Model):
    __tablename__ = "Review"
    id = db.Column('id', db.Integer, primary_key = True, autoincrement=True)
    brewery_name = db.Column('brewery_name', db.String(64), db.ForeignKey('Brewery.name')) 
    beer_name = db.column('beer_name', db.String(64),db.ForeignKey('Beer.name'))
    rating = db.Column('rating', db.Numeric(1,1))
    flavor = db.Column('flavor', db.Numeric(1,1))
    comment = db.Column('comment', db.Text)

    # beer = db.relationship('Beer', foreign_keys=beer_name)
    # brewery = db.relationship('Brewery',foreign_keys=brewery_name)

class Stylebreweryassoc (db.Model):
    __tablename__ = "StyleBreweryAssoc"
    id = db.Column('id', db.Integer, primary_key = True)
    style_id = db.Column('style_id', db.Integer, db.ForeignKey('Style.id'))
    brewery_name = db.Column('brewery_name', db.String(64), db.ForeignKey('Brewery.name'))

    style = db.relationship('Style', foreign_keys=style_id)
    brewery = db.relationship('Brewery', foreign_keys=brewery_name)
