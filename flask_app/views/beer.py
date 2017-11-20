#This is where the brewery routes are defined.

from flask import Flask, request, jsonify, Response, json
from main import app
from models import db, Beer, Style

#GET ALL BEERS
@app.route('/beers', methods=['GET'])
def getBeers():
    allBeers = []
    totalCount = db.session.query(Beer.id).count()
    organic = request.args.get('organic', 'None').encode('utf-8')
    style = request.args.get('style', 'None').encode('utf-8')
    order = request.args.get('sort_by','default').encode('utf-8')
    lim = request.args.get('limit', '9').encode('utf-8')
    off = request.args.get('offset','0').encode('utf-8')
    lim = int(lim)
    off = int(off)

    if style != 'None':
        style = db.session.query(Style).filter_by(name=style).first()
        style = style.id
    filtersDict = {
       'organic' : organic,
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
            'style': beer.style.name
        }
        allBeers.append(b)

    payload = {'totalCount': totalCount, 'records': allBeers}
    # response = jsonify(payload)
    # response.status_code = 200

    return Response(json.dumps(payload), mimetype='application/json')
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
            'images' :beer.images,
            'brewery' : beer.brewery.name,
            'style' : beer.style.name,
            'reviews': [review.serialize for review in beer.reviews]
        }
        response = Response(json.dumps(b), mimetype='application/json')
    except AttributeError:
        response = "Server Error 500: Invalid beer_id"

    return response
