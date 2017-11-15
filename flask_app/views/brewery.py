
from flask import Flask, request, jsonify, Response, json
from main import app
from models import db, Brewery

# GET ALL BREWERIES
@app.route('/breweries', methods=['GET'])
def getBreweries():
    allBreweries = []
    totalCount = db.session.query(Brewery.id).count()

    order = request.args.get('order')
    lim = request.args.get('limit', '9').encode('utf-8')
    off = request.args.get('offset', '0').encode('utf-8')
    lim = int(lim)
    off = int(off)
    if order == "asc":
        breweries = db.session.query(Brewery).order_by(Brewery.name).limit(lim).offset(off).all()
    elif order == "desc":
        breweries = db.session.query(Brewery).order_by(Brewery.name.desc()).limit(lim).offset(off).all()
    else:
        breweries = db.session.query(Brewery).limit(lim).offset(off).all()

    for brewery in breweries:
        b = {
            'type' : "brewery",
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
    response = Response(json.dumps(payload), mimetype='application/json')
    response.status_code = 200

    return response

# GET BREWERY BY ID
@app.route('/breweries/<brewery_id>', methods = ['GET'])
def getBreweryInfo(brewery_id):
    try:
        brewery = db.session.query(Brewery).filter_by(id=brewery_id).first()
        b = {
                'type' : "brewery",
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
    return Response(json.dumps(b), mimetype='application/json')

@app.route('/breweries/state/<state_name>', methods = ['GET'])
def filterByState(state_name):
    allBreweries = []
    lim = request.args.get('limit', 9)
    off = request.args.get('offset',0)
    breweries = db.session.query(Brewery).filter_by(state=state_name).limit(lim).offset(off).all()
    totalCount = db.session.query(Brewery).filter_by(state=state_name).count()
    for brewery in breweries:
        b = {
            'type' : "brewery",
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
    return Response(json.dumps(payload), mimetype='application/json')
@app.route('/breweries/country/<country_name>', methods = ['GET'])
def filterByCountry(country_name):
    allBreweries = []
    lim = request.args.get('limit', 9)
    off = request.args.get('offset',0)
    breweries = db.session.query(Brewery).filter_by(country=country_name).limit(lim).offset(off).all()
    totalCount = db.session.query(Brewery).filter_by(country=country_name).count()
    for brewery in breweries:
        b = {
            'type' : "brewery",
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
    return Response(json.dumps(payload), mimetype='application/json')