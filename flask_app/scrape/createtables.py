from main import db
from models import Beer, Brewery, Style, Review

if __name__ == '__main__':
	print('Creating all database tables...')
	"""
	Does not work, foreign key constraint
	Beer.__table__.drop(engine)
	Brewery.__table__.drop(engine)
	Style.__table__.drop(engine)
	Review.__table__.drop(engine)
	"""

	# db.Mode.metadata.drop_all(engine)
	# meta = MetaData(engine)
	# meta.bind = engine
	# meta.drop_all(bind=None, tables=[Beer, Style, Review, Brewery], checkfirst=True)
	db.drop_all()
	db.create_all()
	# brw = Brewery(name="Brewery1", city="Austin", state="Texas", country="USA", established="1982", description="Brew1 description", images="http://www.drinkbritain.com/sites/default/files/Brewery_wood_vessels_small.jpg")
	# db.session.add(brw)
	# db.session.commit()

	# st = Style(name="Style1", description="Style1 description", ibu_min=10, ibu_max=11, abv_min=20, abv_max=21)
	# db.session.add(st)
	# # brw.styles.append(st)
	# db.session.commit()

	# b = Beer(name="Beer1", organic="Y", abv=10, ibu=15, brewery_id=None, style_id=None, images="https://battleforliberty.com/wp-content/uploads/2017/06/beer-793x526.jpg")
	# db.session.add(b)
	# db.session.commit()

	# rev = Review(date="08/1982", rating=5, comment="Review1 was great!", beer_name=None, brewery_name=None)
	# db.session.add(rev)
	# db.session.commit()

	# brw.styles.append(st)

	# db.session.query(Beer).update({Beer.brewery_id: 1, Beer.style_id: 1})
	# db.session.query(Review).update({Review.beer_name: 1, Review.brewery_name: 1})
	db.session.commit()
	print('Done!')
# [END all]