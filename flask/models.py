from flask_sqlalchemy import SQLAlchemy 

db = SQLAlchemy()


class Beer (db.Model):
    __tablename__ = "Beer"
    name = db.Column('name', db.Unicode, primary_key = True)
    brewery = db.Column('brewery', db.Unicode, db.ForeignKey('Brewery.name'))
    style_id = db.Column('style_id', db.Integer, db.ForeignKey('Style.id'))
    organic = db.Column('organic', db.Boolean)
    abv = db.Column('abv', db.Integer)

    style = db.relationship('Style', foreign_keys=style_id)
    brewery = db.relationship('Brewery', foreign_keys=brewery)

class Style (db.Model):
    __tablename__ = "Style"
    id = db.Column('id', db.Integer, primary_key = True)
    description = deferred(Column('description', db.Text))
    ibu = db.Column('ibu', db.Unicode)
    abv = db.Column('abv', db.Integer)

class Brewery (db.Model):
    __tablename__ = "Brewery"
    name = db.Column('name', db.Unicode, primary_key = True)
    review_id = db.Column('review_id', db.Integer, db.ForeignKey('Review.id'))
    city = db.Column('city', db.Unicode)
    state = db.Column('state', db.Unicode)
    established = db.Column('established', db.Integer)

    review = db.relationship('Review', foreign_keys=review_id)

class Review (db.Model):
    __tablename__ = "Review"
    id = db.Column('id', db.Integer, primary_key = True)
    brewery_name = db.Column('brewery_name', db.Unicode, db.ForeignKey('Beer.name'))
    # Unknown SQL type: 'double(1,1)' 
    rating = db.Column('rating', db.String)
    # Unknown SQL type: 'double(1,1)' 
    flavor = db.Column('flavor', db.String)
    comment = deferred(Column('comment', db.Text))

    beer = db.relationship('Beer', foreign_keys=brewery_name)

class Stylebreweryassoc (db.Model):
    __tablename__ = "StyleBreweryAssoc"
    id = db.Column('id', db.Integer, primary_key = True)
    style_id = db.Column('style_id', db.Integer, db.ForeignKey('Style.id'))
    brewery_name = db.Column('brewery_name', db.Unicode, db.ForeignKey('Brewery.name'))

    style = db.relationship('Style', foreign_keys=style_id)
    brewery = db.relationship('Brewery', foreign_keys=brewery_name)
