#This is where the style routes are defined.
from flask import Flask, request, jsonify
from main import app
from models import db, Style


#GET ALL STYLES
@app.route('/styles',methods=['GET'])
def getStyles():
    allStyles = []
    totalCount = db.session.query(Style.id).count()

    order = request.args.get('order')
    lim = request.args.get('limit', '9').encode('utf-8')
    off = request.args.get('offset', '0').encode('utf-8')
    lim = int(lim)
    off = int(off)
    if order == "asc":
        styles = db.session.query(Style).order_by(Style.name).limit(lim).offset(off).all()
    elif order == "desc":
        styles = db.session.query(Style).order_by(Style.name.desc()).limit(lim).offset(off).all()
    else:
        styles = db.session.query(Style).limit(lim).offset(off).all()


    for style in styles:
        s = {
        'type' : "style",
        'id' : style.id,
        'name' : style.name,
        'description' : style.description,
        'ibu_min' : style.ibu_min,
        'ibu_max' : style.ibu_max,
        'abv_min' : style.abv_min,
        'abv_max' : style.abv_max,
        'srm'     : style.srm,
        'beers' : [beer.serializeName for beer in style.beers],
        'breweries':[brewery.serializeName for brewery in style.breweries]
        }
        allStyles.append(s)

    payload = {'totalCount': totalCount, 'records': allStyles}
    response = jsonify(payload)
    response.status_code = 200

    return response


@app.route('/styles/<style_id>', methods = ['GET'])
def getStyleInfo(style_id):
    try:
        style = db.session.query(Style).filter_by(id=style_id).first()
        s = {
            'type' : "style",
            'id' : style.id,
            'name' : style.name,
            'desicription' : style.description,
            'ibu_min' : style.ibu_min,
            'ibu_max' : style.ibu_max,
            'abv_min' : style.abv_min,
            'abv_max' : style.abv_max,
            'srm': style.srm,
            'beers' : [beer.serializeName for beer in style.beers],
            'breweries':[brewery.serializeName for brewery in style.breweries]
            }
    except AttributeError:
        return "Server Error 500: Invalid style_id"
    return jsonify(s)