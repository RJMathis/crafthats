
from flask import Flask, request, jsonify, Response, json
from main import app
from models import db, Brewery
from werkzeug.contrib.cache import SimpleCache

cache = SimpleCache()
# GET ALL BREWERIES
@app.route('/breweries', methods=['GET'])
def getBreweries():
    allBreweries = []
     
    state = request.args.get('state','None').encode('utf-8')
    country = request.args.get('country','None').encode('utf-8')
    order = request.args.get('sort_by','default').encode('utf-8')
    lim = request.args.get('limit', '9').encode('utf-8')
    off = request.args.get('offset', '0').encode('utf-8')
    lim = int(lim)
    off = int(off)
    cachestr = state+country+order+str(lim)+str(off)
    rv = cache.get(cachestr)
    if rv is not None:
        return rv
    filtersDict = {
        'state':state,
        'country':country
    }
    query = db.session.query(Brewery)
    for attr,value in filtersDict.iteritems():
        if value != 'None':
            query = query.filter(getattr(Brewery,attr)==value)

    if order == "asc":
        breweries = query.order_by(Brewery.name).limit(lim).offset(off).all()
    elif order == "desc":
        breweries = query.order_by(Brewery.name.desc()).limit(lim).offset(off).all()
    else:
        breweries = query.limit(lim).offset(off).all()

    totalCount = query.count()

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
            'styles': [style.serializeName for style in brewery.styles],
            'style_ids':[style.id for style in brewery.styles]
        }
        allBreweries.append(b)

    
    payload = {'totalCount': totalCount, 'records': allBreweries}
    response = Response(json.dumps(payload), mimetype='application/json')
    response.status_code = 200
    cache.set(cachestr,response, timeout= 5*60)
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

