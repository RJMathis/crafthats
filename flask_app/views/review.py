#This is where the review routes are defined.
from flask import Flask, request, jsonify, Response, json
from main import app
from models import db, Review,Beer
from werkzeug.contrib.cache import SimpleCache

cache = SimpleCache()

#GET ALL REVIEWS
@app.route('/reviews', methods = ['GET'])
def getReviews():
    allReviews = []
     

    rating = request.args.get('rating','None').encode('utf-8')
    beer_name = request.args.get('beer_name','None').encode('utf-8')
    order = request.args.get('sort_by','default').encode('utf-8')
    lim = request.args.get('limit', '9').encode('utf-8')
    off = request.args.get('offset', '0').encode('utf-8')
    lim = int(lim)
    off = int(off)
    cachestr = str(rating)+beer_name+order+str(lim)+str(off)
    rv = cache.get(cachestr)
    if rv is not None:
        return rv
    
    if beer_name != 'None':
        beer = db.session.query(Beer).filter_by(name=beer_name).first()
        beer_name= beer.id
    filtersDict ={
        'rating':rating,
        'beer_name':beer_name
    }
    query = db.session.query(Review)
    for attr,value in filtersDict.iteritems():
        if value != 'None':
            query = query.filter(getattr(Review,attr)==value)
    
    totalCount =query.count()
    if order == "asc":
        reviews = query.order_by(Review.rating).limit(lim).offset(off).all()
    elif order == "desc":
        reviews = query.order_by(Review.rating.desc()).limit(lim).offset(off).all()
    else:
        reviews = query.limit(lim).offset(off).all()

    for review in reviews:
        r = {
        'type' : "review",
        'id' : review.id,
        'date': review.date,
        'rating' : review.rating,
        'comment' : review.comment,
        'beer_name' : review.beer.name,
        'brewery_name' : review.beer.brewery.name,
        'image': review.beer.images
        }
        allReviews.append(r)

    payload = {'totalCount': totalCount, 'records': allReviews}
    response = Response(json.dumps(payload), mimetype='application/json')
    response.status_code = 200
    cache.set(cachestr,response, timeout= 5*60)
    return response

# GET REVIEW BY ID
@app.route('/reviews/<review_id>', methods = ['GET'])
def getReviewInfo(review_id):
    try:
        review = db.session.query(Review).filter_by(id=review_id).first()
        r = {
            'type' : "review",
            'id' : review.id,
            'date': review.date,
            'rating' : review.rating,
            'comment' : review.comment,
            'beer_name' : review.beer.name,
            'brewery_name': review.beer.brewery.name,
            'image' : review.beer.images
            }
    except AttributeError:
        return "Server Error 500: Invalid review_id"
    return Response(json.dumps(r), mimetype='application/json')

@app.route('/reviews/rating/<float:rating>', methods = ['GET'])
def filterReviewByRating(rating):
    allReviews = []
    lim = request.args.get('limit', 9)
    off = request.args.get('offset',0)
    reviews = db.session.query(Review).filter_by(rating=rating).limit(lim).offset(off).all()
    totalCount = db.session.query(Review).filter_by(rating=rating).count()
    for review in reviews:
        r = {
        'type' : "review",
        'id' : review.id,
        'date': review.date,
        'rating' : review.rating,
        'comment' : review.comment,
        'beer_name' : review.beer.name,
        'brewery_name' : review.beer.brewery.name
        }
        allReviews.append(r)

    payload = {'totalCount': totalCount, 'records': allReviews}
    response = Response(json.dumps(payload), mimetype='application/json')
    return response
@app.route('/reviews/beer/<beer_name>', methods = ['GET'])
def filterReviewByBeer(beer_name):
    allReviews = []
    lim = request.args.get('limit', 9)
    off = request.args.get('offset',0)
    beer = db.session.query(Beer).filter_by(name=beer_name).first()
    beer_id = beer.id
    reviews = db.session.query(Review).filter_by(beer_name=beer_id).limit(lim).offset(off).all()
    totalCount = db.session.query(Review).filter_by(beer_name=beer.id).count()
    
    for review in reviews:
        r = {
        'type' : "review",
        'id' : review.id,
        'date': review.date,
        'rating' : review.rating,
        'comment' : review.comment,
        'beer_name' : review.beer.name,
        'brewery_name' : review.beer.brewery.name
        }
        allReviews.append(r)

    payload = {'totalCount': totalCount, 'records': allReviews}
    response = Response(json.dumps(payload), mimetype='application/json')
    return response
