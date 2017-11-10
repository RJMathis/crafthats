#This is where the review routes are defined.
from flask import Flask, request, jsonify
from main import app
from models import db, Review

#GET ALL REVIEWS
@app.route('/reviews', methods = ['GET'])
def getReviews():
    allReviews = []
    totalCount = db.session.query(Review.id).count()

    order = request.args.get('order')
    if order == "asc" or order == "desc":
        lim = totalCount
    else:
        lim = request.args.get('limit', 9)
    off = request.args.get('offset',0)

    reviews = db.session.query(Review).limit(lim).offset(off).all()

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

    if order == "asc":
        allReviews = sorted(allReviews, key=lambda review: review['rating'])
    elif order == "desc":
        allReviews = sorted(allReviews, key=lambda review: review['rating'])[::-1]

    payload = {'totalCount': totalCount, 'records': allReviews}
    response = jsonify(payload)
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
            'brewery_name': review.beer.brewery.name
            }
    except AttributeError:
        return "Server Error 500: Invalid review_id"
    return jsonify(r)

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

    return jsonify(allReviews)


