
from flask import Flask, request, jsonify
from main import app
from models import db, Brewery

# GET ALL BREWERIES
@app.route('/breweries', methods=['GET'])
def getBreweries():
    allBreweries = []
    
    lim = request.args.get('limit', 9)
    off = request.args.get('offset',0)
    breweries = db.session.query(Brewery).limit(lim).offset(off).all()

    totalCount = db.session.query(Brewery.id).count()

    for brewery in breweries:
        b = {
            'id': brewery.id,
            'name': brewery.name,
            'city': brewery.city,
            'state': brewery.state,
            'country': brewery.country,
            'established': brewery.established,
            'description': brewery.description,
            'website' : brewery.website,
            'beers': [beer.serializeName for beer in brewery.beers],
            'image': brewery.images,
            'styles': [style.serializeName for style in brewery.styles]
        }
        allBreweries.append(b)

    payload = {'totalCount': totalCount, 'records': allBreweries}
    response = jsonify(payload)
    response.status_code = 200

    return response

# GET BREWERY BY ID
@app.route('/breweries/<brewery_id>', methods = ['GET'])
def getBreweryInfo(brewery_id):
    try:
        brewery = db.session.query(Brewery).filter_by(id=brewery_id).first()
        b = {
                'id': brewery.id,
                'name': brewery.name,
                'city': brewery.city,
                'state': brewery.state,
                'country': brewery.country,
                'established': brewery.established,
                'website': brewery.website,
                'description': brewery.description,
                'beers':  [beer.name for beer in brewery.beers],
                'images': brewery.images,
                'styles': [style.serializeName for style in brewery.styles]
            }
    except AttributeError:
        return "Server Error 500: Invalid brewery_id"
    return jsonify(b)
