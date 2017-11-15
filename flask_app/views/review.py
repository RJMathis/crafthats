#This is where the review routes are defined.
from flask import Flask, request, jsonify, Response, json
from main import app
from models import db, Review,Beer

#GET ALL REVIEWS
@app.route('/reviews', methods = ['GET'])
def getReviews():
    allReviews = []
    totalCount = db.session.query(Review.id).count()

    order = request.args.get('order')
    lim = request.args.get('limit', '9').encode('utf-8')
    off = request.args.get('offset', '0').encode('utf-8')
    lim = int(lim)
    off = int(off)
    if order == "asc":
        reviews = db.session.query(Review).order_by(Review.rating).limit(lim).offset(off).all()
    elif order == "desc":
        reviews = db.session.query(Review).order_by(Review.rating.desc()).limit(lim).offset(off).all()
    else:
        reviews = db.session.query(Review).limit(lim).offset(off).all()

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

    return Response(json.dumps(allReviews), mimetype='application/json')
@app.route('/reviews/beer/<beer_name>', methods = ['GET'])
def filterReviewByBeer(beer_name):
    allReviews = []
    lim = request.args.get('limit', 9)
    off = request.args.get('offset',0)
    beer = db.session.query(Beer).filter_by(name=beer_name).first()
    beer_id = beer.id
    reviews = db.session.query(Review).filter_by(beer_name=beer_id).limit(lim).offset(off).all()

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

    return Response(json.dumps(allReviews), mimetype='application/json')
