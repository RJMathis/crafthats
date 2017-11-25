#This is where the review routes are defined.
from flask import Flask, request, jsonify, Response, json
from main import app
from models import db, Review,Beer
from werkzeug.contrib.cache import SimpleCache

cache = SimpleCache()

#GET ALL REVIEWS
"""
/reviews endpoint
?params:
    +beer_name - string
    +rating - float
    +offset - int, default 0
    +limit - int, default 12
    +order - int
"""
@app.route('/reviews', methods = ['GET'])
def getReviews():
    # reviews to return
    allReviews = []

    # get optional params
    rating = request.args.get('rating','None').encode('utf-8')
    beer_name = request.args.get('beer_name','None').encode('utf-8')
    order = request.args.get('sort_by','default').encode('utf-8')
    lim = request.args.get('limit', '12').encode('utf-8')
    off = request.args.get('offset', '0').encode('utf-8')

    #cast
    lim = int(lim)
    off = int(off)

    #caching
    cachestr = str(rating)+beer_name+order+str(lim)+str(off)
    rv = cache.get(cachestr)
    if rv is not None:
        return rv

    #build up the query with filters and store resulting list in styles array
    query = db.session.query(Review)
    if beer_name != 'None':
        beer = db.session.query(Beer).filter_by(name=beer_name).first()
        beer_name= beer.id
        query = query.filter(Review.beer_name == beer_name)
    if rating != 'None':
        query = query.filter(Review.rating >= rating)
    
    if order == "asc":
        reviews = query.order_by(Review.rating).limit(lim).offset(off).all()
    elif order == "desc":
        reviews = query.order_by(Review.rating.desc()).limit(lim).offset(off).all()
    else:
        reviews = query.limit(lim).offset(off).all()

    totalCount =query.count()

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
"""
/reviews/<review_id> endpoint
review_id - integer
"""
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
