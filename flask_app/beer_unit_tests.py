import unittest
import os
import json
from main import app
from models import db, Beer, Brewery, Style, Review, association_table

TEST_DB = 'test.db'

class Test_API_Beer(unittest.TestCase):
	def setUp(self):
		app.config['TESTING'] = True
		app.config['WTF_CSRF_ENABLED'] = False
		app.config['BASEDIR'] = app.root_path
		app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
			os.path.join(app.config['BASEDIR'],TEST_DB)
		os.path.join
		self.app = app.test_client()
		 
		db.create_all()
		populate_dummy_database()

	def tearDown(self):
		db.drop_all()
		pass
    
	def testBeerBasic(self):
		response = self.app.get('/beers').data		 
		response = json.loads(response)
		self.assertEqual(len(response['records']),3)
	
	def testPagination(self):
		response = self.app.get('/beers?limit=2').data		 
		response = json.loads(response)
		self.assertEqual(len(response['records']),2)
		response = self.app.get('/beers?limit=2&offset=1').data		 
		response = json.loads(response)		
		self.assertEqual(len(response['records']),2)
		self.assertEqual(response['records'][0]['name'],'beer2')
		self.assertEqual(response['records'][1]['name'],'beer3')
	
	def testOrganicParam(self):
		response = self.app.get('/beers?organic=Y').data		 
		response = json.loads(response)
		self.assertEqual(len(response['records']),2)
		response = self.app.get('/beers?organic=N').data		 
		response = json.loads(response)
		self.assertEqual(len(response['records']),1)

	def testStyleParam(self):
		response = self.app.get('/beers?style=style1').data		 
		response = json.loads(response)
		self.assertEqual(len(response['records']),1)
		response = self.app.get('/beers?style=style2').data		 
		response = json.loads(response)
		self.assertEqual(len(response['records']),2)

	def testSortByAsc(self):
		response = self.app.get('/beers?sort_by=asc').data		 
		response = json.loads(response)
		self.assertEqual(response['records'][0]['name'],'beer1')
		self.assertEqual(response['records'][1]['name'],'beer2')
		self.assertEqual(response['records'][2]['name'],'beer3')

	def testSortByDesc(self):
		response = self.app.get('/beers?sort_by=desc').data		 
		response = json.loads(response)
		self.assertEqual(response['records'][0]['name'],'beer3')
		self.assertEqual(response['records'][1]['name'],'beer2')
		self.assertEqual(response['records'][2]['name'],'beer1')

	def testOrganicAndStyle(self):
		response = self.app.get('/beers?organic=Y&style=style1').data		 
		response = json.loads(response)
		self.assertEqual(len(response['records']),1)
		self.assertEqual(response['records'][0]['name'],'beer1')

	def testTotalCount(self):
		response = self.app.get('/beers').data		 
		response = json.loads(response)
		self.assertEqual(response['totalCount'],3)
		response = self.app.get('/beers?organic=Y&style=style1').data		 
		response = json.loads(response)
		self.assertEqual(response['totalCount'],1)

	def testBeerById(self):
		response = self.app.get('/beers/1').data		 
		response = json.loads(response)
		self.assertEqual(response['name'],'beer1')
		response = self.app.get('/beers/2').data		 
		response = json.loads(response)
		self.assertEqual(response['name'],'beer2')
		response = self.app.get('/beers/100').data		 
		self.assertEqual(response,'Server Error 500: Invalid beer_id')

















	

def populate_dummy_database():
	
	#breweries
	brw1 = Brewery(id=1,name="Brewery1",city='city1',state='state1',country='country1',
		established=1776,description='description',website='website1',images='images')
	
	brw2 = Brewery(id=2,name="Brewery2",city='city2',state='state2',country='country1',
		established=1776,description='description',website='website1',images='images')
	
	

	db.session.add(brw1)
	db.session.add(brw2)

	# Styles 
	s1 = Style(id=1,name='style1',description='desc',ibu_min=1.0,ibu_max=5.0,abv_min=4.0,abv_max=9.0,srm=10.0)
	s2 = Style(id=2,name='style2',description='desc',ibu_min=6.0,ibu_max=10.0,abv_min=10.0,abv_max=12.0,srm=15.0)
	

	db.session.add(s1)
	db.session.add(s2)

	 
	#beers
	b1 = Beer(id=1,name='beer1',organic='Y',abv=7.5,ibu=4.5,brewery_id=1,style_id=1,images='images')
	b2 = Beer(id=2,name='beer2',organic='Y',abv=11.5,ibu=6.5,brewery_id=1,style_id=2,images='images')
	b3 = Beer(id=3,name='beer3',organic='N',abv=14.5,ibu=9.0,brewery_id=2,style_id=2,images='images')

	db.session.add(b1)
	db.session.add(b2)
	db.session.add(b3)
	#Reviews
	r1 = Review(id=1,date='07041776',rating=3.5,comment='comment',beer_name=1,brewery_name=1)
	r2 = Review(id=2,date='07041776',rating=1.0,comment='comment',beer_name=1,brewery_name=1)
	r3 = Review(id=3,date='07041776',rating=5.0,comment='comment',beer_name=3,brewery_name=2)

	db.session.add(r1)
	db.session.add(r2)
	db.session.add(r3)

	#association
	assoc1 = association_table.insert().values(brewery_id=brw1.id,style_id=s1.id)
	assoc2 = association_table.insert().values(brewery_id=brw1.id,style_id=s2.id)
	assoc3 = association_table.insert().values(brewery_id=brw2.id,style_id=s2.id)

	db.session.execute(assoc1)
	db.session.execute(assoc2)
	db.session.execute(assoc3)

	db.session.commit()

  
        

if __name__ == "__main__":
    unittest.main()