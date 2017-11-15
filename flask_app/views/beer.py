#This is where the brewery routes are defined.

from flask import Flask, request, jsonify, Response, json
from main import app
from models import db, Beer, Style

#GET ALL BEERS
@app.route('/beers', methods=['GET'])
def getBeers():
    allBeers = []
    totalCount = db.session.query(Beer.id).count()

    order = request.args.get('order')
    lim = request.args.get('limit', '9').encode('utf-8')
    off = request.args.get('offset','0').encode('utf-8')
    lim = int(lim)
    off = int(off)
    if order == "asc":
        beers = db.session.query(Beer).order_by(Beer.name).limit(lim).offset(off).all()
    elif order == "desc":
        beers = db.session.query(Beer).order_by(Beer.name.desc()).limit(lim).offset(off).all()
    else:
        beers = db.session.query(Beer).limit(lim).offset(off).all()


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
@app.route('/beers/organic/<organic_bool>', methods = ['GET'])
def filterByOrganic(organic_bool):
    allBeers = []
    lim = request.args.get('limit', 9)
    off = request.args.get('offset',0)
    beers = db.session.query(Beer).filter_by(organic=organic_bool).limit(lim).offset(off).all()

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

    return Response(json.dumps(allBeers), mimetype='application/json')

@app.route('/beers/style/<style_name>', methods = ['GET'])
def filterByStyle(style_name):
    allBeers = []
    lim = request.args.get('limit', 9)
    off = request.args.get('offset',0)
    style = db.session.query(Style).filter_by(name=style_name).first()
    style_id = style.id
    beers = db.session.query(Beer).filter_by(style_id=style_id).limit(lim).offset(off).all()

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

    return Response(json.dumps(allBeers), mimetype='application/json')



