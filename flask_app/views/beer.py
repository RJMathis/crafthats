#This is where the brewery routes are defined.

from flask import Flask, request, jsonify
from main import app
from models import db, Beer

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
    response = jsonify(payload)
    response.status_code = 200

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
            'abv'  : float("{0:.2f}".format(beer.abv)),
            'ibu'  : beer.ibu,
            'images' :beer.images,
            'brewery' : beer.brewery.name,
            'style' : beer.style.name,
            'reviews': [review.serialize for review in beer.reviews]
        }
        response = jsonify(b)
    except AttributeError:
        response = "Server Error 500: Invalid beer_id"

    return response