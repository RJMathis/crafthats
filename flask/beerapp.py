from flask import Flask,request,jsonify
from models import db,Beer,Brewery,Style,Review

beerapp = Flask(__name__)
beerapp.config.from_object('config')

db.init_app(beerapp)
db.create_all(app=beerapp)

@beerapp.route('/breweries', methods=['GET'])
def getBreweries():
	
	allBreweries = []

	breweries = Brewery.query.all()

	for brewery in breweries:
		b = {
			'name' : brewery.name,
			'city' : brewery.city,
			'state':brewery.state,
			'established': brewery.established
		}
		allBreweries.append(b)
	
	response = jsonify(allBreweries)
	response.status_code = 200

	return response

@beerapp.route('/beers', methods=['GET'])
def getBeers():
	
	allBeers = []

	beers = Beer.query.all()

	for beer in beers:
		
		b = {
		 'name' : beer.name,
		 'organic' : beer.organic,
		 'abv'	: beer.abv,
		 'brewery' : beer.brewery_name,
		 'style' : beer.style_name,
		 'brewery' : beer.brewery_name

		}
		allBeers.append(b)

	response = jsonify(allBeers)
	response.status_code = 200

	return response
@beerapp.route('/styles',methods=['GET'])
def getStyles():
	allStyles = []

	styles = Style.query.all()

	for style in styles:
		s = {
		'name' : style.name,
		'desicription' : style.description,
		'ibu' : style.ibu,
		'abv' :style.abv
		}
		allStyles.append(s)

	response = jsonify(allStyles)
	response.status_code = 200

	return response



if __name__ == '__main__':
	beerapp.run()

