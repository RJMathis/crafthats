import unittest
from main import db
from models import Beer, Brewery, Style, Review
from views import *

class DBASE(unittest.TestCase):

    def testBreweryStyle(self):
        brw = Brewery(name="Brewery1", city="Austin", state="Texas", country="USA", established=1982,
                      description="Brew1 description",
                      images="http://www.drinkbritain.com/sites/default/files/Brewery_wood_vessels_small.jpg")
        db.session.add(brw)
        db.session.commit()

        self.assertEqual(brw.established, 1982)
        self.assertEqual(brw.name, "Brewery1")
        self.assertEqual(brw.id, 1)

        st = Style(name="Style1", description="Style1 description", ibu_min=10, ibu_max=11, abv_min=20, 
                      abv_max=21, srm=21)
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

    def testBeerById(self):
        b = Beer(name="Beer1", organic="Y", abv=10, ibu=15, brewery_id=None, style_id=None,
                      images="thisisalink.html")
        db.session.add(b)
        db.session.commit()
        beer = getBeerInfo(1)
        self.assertEqual(beer.abv, 15)
        self.assertEqual(beer.name, "Brewery1")
        self.assertEqual(beer.id, 1)


    def testReview(self):
        rev = Review(date="1982-08-09", rating=5, comment="Review1 was great!", beer_name=None, brewery_name=None)
        db.session.add(rev)
        db.session.commit()

        self.assertEqual(rev.rating, 5)
        self.assertEqual(rev.comment, "Review1 was great!")
        self.assertEqual(rev.id, 1)

    def testReviewById(self):
        rev = Review(date="1982-08-09", rating=5, comment="Review1 was great!", beer_name=None, brewery_name=None)
        db.session.add(rev)
        db.session.commit()
        review = getReviewInfo(1)
        self.assertEqual(review.rating, 5)
        self.assertEqual(review.comment, "Review1 was great!")
        self.assertEqual(review.id, 1)


    def Update(self):
        b = Beer(name="Beer1", organic="Y", abv=10, ibu=15, brewery_id=None, style_id=None,
                      images="thisisalink.html")
        rev = Review(date="1982-08-09", rating=5, comment="Review1 was great!", beer_name=None, brewery_name=None)
        brw = Brewery(name="Trell", city="Miami", state="Florida", country="USA", established=1984,
                      description="Trell is a hip local brewery.", 
                      images="https://www.placeholder.com/image.jpg")
        
        db.session.add(brw)
        db.session.add(b)
        db.session.add(rev)
        db.session.commit()

        db.session.query(Beer).update({Beer.brewery_id: 1, Beer.style_id: 1})
        db.session.query(Review).update({Review.beer_name: 1, Review.brewery_name: 1})
        db.session.commit()

        self.assertEqual(b.style_id, 1)
        self.assertEqual(b.brewery_id, 1)
        self.assertEqual(rev.beer_name, 1)

    def testTriple(self):
        brw = Brewery(name="Coor", city="Austin", state="Texas", country="USA", established=1996,
                      description="Coor is an easy to drink beer.", 
                      images="https://www.coor.com/image.jpg")
        db.session.add(brw)
        db.session.commit()

        st = Style(name="Amber Ale", description="Amber Ale is red!", ibu_min=5.4, ibu_max=10.2, abv_min=7.6, 
                      abv_max=15, srm=21)
        db.session.add(st)
        db.session.commit()

        b = Beer(name="Lite Beer", organic="N", abv=9.6, ibu=14.2, brewery_id=brw.id, style_id=st.id,
                      images="https://www.litebeer.com/litebeer.jpg")

        self.assertEqual(b.brewery_id, brw.id)
        self.assertEqual(b.style_id, st.id)
        self.assertEqual(b.id, 1)

    def updateStyleName(self):
        st = Style(name="IPA", description="IPA is bitter.", ibu_min=13, ibu_max=21.4, abv_min=8.2, 
                      abv_max=16.7, srm=19)
        db.session.add(st)
        db.session.commit()
        self.assertEqual(st.name, "IPA")

        db.session.query().filter(Style.name == "IPA").update({"name": "Stout"})
        db.session.commit()
        self.assertNotEqual(st.name, "IPA")

    def createReviewFK(self):
        b = Beer(name="Miller", organic="Y", abv=9.2, ibu=10.0, brewery_id=None, style_id=None,
                      images="http://www.placeholder.com/image.jpg")
        brw = Brewery(name="BrewMe", city="Dallas", state="Texas", country="USA", established=2009,
                      description="BrewMe is a IPA brewer.",
                      images="https://www.drinkbritain.com/sites/default/files/image.png")
        db.session.add(b)
        db.session.add(brw)
        db.session.commit()

        rev = Review(date="2009-08-09", rating=3.2, comment="Miller was meh.", beer_name=b.id, brewery_name=brw.id)
        db.session.add(rev)
        db.session.commit()

        self.assertEqual(rev.beer_name, b.id)
        self.assertEqual(rev.brewery_name, brw.id)

    def createMultiple(self):
        b = Beer(name="Trough", organic="Y", abv=11.2, ibu=9.0, brewery_id=None, style_id=None,
                      images="http://www.placeholder.com/image.jpg")
        b2 = Beer(name="Kipp", organic="N", abv=13.1, ibu=9.1, brewery_id=None, style_id=None,
                      images="http://www.placeholder.com/image.jpg")
        db.session.add(b)
        db.session.add(b2)
        db.session.commit()

        rev = Review(date="1996-11-11", rating=2.2, comment="Kipp was nasty.", beer_name=b2.id, brewery_name=None)

        db.session.add(rev)
        db.session.commit()
        self.assertNotEqual(rev.id, b.id)
        self.assertEqual(rev.id, b2.id)







