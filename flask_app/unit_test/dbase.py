import unittest
from main import db
from models import Beer, Brewery, Style, Review
from views import *

class DBASE(unittest.TestCase):

    def testBreweryStyle(self):
        brw = Brewery(name="Brewery1", city="Austin", state="Texas", country="USA", established="1982",
                      description="Brew1 description",
                      images="http://www.drinkbritain.com/sites/default/files/Brewery_wood_vessels_small.jpg")
        db.session.add(brw)
        db.session.commit()

        self.assertEqual(brw.established, 1982)
        self.assertEqual(brw.name, "Brewery1")
        self.assertEqual(brw.id, 1)

        st = Style(name="Style1", description="Style1 description", ibu_min=10, ibu_max=11, abv_min=20, abv_max=21, sru=21)
        db.session.add(st)
        brw.styles.append(st)
        db.session.commit()

        self.assertEqual(st.name, "Style1")
        self.assertEqual(st.sru, "21")
        self.assertEqual(st in brw.styles)

    def testBeer(self):
        b = Beer(name="Beer1", organic="Y", abv=10, ibu=15, brewery_id=None, style_id=None,
                 images="thisisalink.html")
        db.session.add(b)
        db.session.commit()
        self.assertEqual(b.abv, 15)
        self.assertEqual(b.name, "Brewery1")
        self.assertEqual(b.id, 1)

    def testReview(self):
        rev = Review(date="08/1982", rating=5, comment="Review1 was great!", beer_name=None, brewery_name=None)
        db.session.add(rev)
        db.session.commit()

        self.assertEqual(rev.rating, 5)
        self.assertEqual(rev.comment, "Review1 was great!")
        self.assertEqual(rev.id, 1)

    def Update(self):
        a = db.session.query(Beer).update({Beer.brewery_id: 1, Beer.style_id: 1})
        b = db.session.query(Review).update({Review.beer_name: 1, Review.brewery_name: 1})
        db.session.commit()

        self.assertEqual(a.style_id, 1)
        self.assertEqual(b.rev.comment, "Review1 was great!")
        self.assertEqual(rev.beer_name.id, 1)