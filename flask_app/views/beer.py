#This is where the beer routes are defined.

from flask import Flask, request, jsonify, Response, json
from main import app
from models import db, Beer, Style
from werkzeug.contrib.cache import SimpleCache

cache = SimpleCache()

#GET ALL BEERS
"""
/beers endpoint
?params:
    +style - string
    +organic - string 'Y' or 'N'
    +offset - int, default 0
    +limit - int, default 25
    +sort_by - string 'asc' or 'desc'
"""
@app.route('/beers', methods=['GET'])
def getBeers():
    # beers to return
    allBeers = []

    # get optional params
    organic = request.args.get('organic', 'None').encode('utf-8')
    style = request.args.get('style', 'None').encode('utf-8')
    order = request.args.get('sort_by','default').encode('utf-8')
    lim = request.args.get('limit', '25').encode('utf-8')
    off = request.args.get('offset','0').encode('utf-8')

    #cast
    lim = int(lim)
    off = int(off)

    #cachestr
    cachestr = organic+style+order+str(lim)+str(off)
    rv = cache.get(cachestr)
    if rv is not None:
        return rv

    if style != 'None':
        style = db.session.query(Style).filter_by(name=style).first()
        style = style.id

    filtersDict = {
       'organic'    : organic,
       'style_id'   : style
    }

    query = db.session.query(Beer)
    for attr,value in filtersDict.iteritems():
        if value != 'None':
            query = query.filter(getattr(Beer,attr)==value)

    if order == "asc":
        beers = query.order_by(Beer.name).limit(lim).offset(off).all()
    elif order == "desc":
        beers = query.order_by(Beer.name.desc()).limit(lim).offset(off).all()
    else:
        beers = query.limit(lim).offset(off).all()
        
    totalCount = query.count()


    for beer in beers:
        b = {
            'type' : "beer",
            'id': beer.id,
            'name': beer.name,
            'organic': beer.organic,
            'abv': beer.abv,
            'ibu': beer.ibu,
            'image': beer.images,
            'brewery': beer.brewery.name,
            'brewery_id':beer.brewery.id,
            'style': beer.style.name,
            'style_id':beer.style.id
        }
        allBeers.append(b)

    payload = {'totalCount': totalCount, 'records': allBeers}
    response = Response(json.dumps(payload), mimetype='application/json')
    response.status_code = 200
    cache.set(cachestr,Response(json.dumps(payload), mimetype='application/json'), timeout= 5*60)
    return response
#
# GET BEER BY ID
@app.route('/beers/<beer_id>', methods = ['GET'])
def getBeerInfo(beer_id):
    try:
        beer = db.session.query(Beer).filter_by(id=beer_id).first()

        b = {
            'type' : "beer",
            'id' : beer.id,
            'name' : beer.name,
            'organic' : beer.organic,
            'abv'  : beer.abv,
            'ibu'  : beer.ibu,
            'image' :beer.images,
            'brewery' : beer.brewery.name,
            'brewery_id':beer.brewery.id,
            'style' : beer.style.name,
            'style_id':beer.style.id,
            'reviews': [review.serialize for review in beer.reviews]
        }
        response = Response(json.dumps(b), mimetype='application/json')
    except AttributeError:
        response = "Server Error 500: Invalid beer_id"

    return response
