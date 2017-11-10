#This is where the style routes are defined.
from flask import Flask, request, jsonify
from main import app
from models import db, Style
import math


#GET ALL STYLES
@app.route('/styles',methods=['GET'])
def getStyles():
    allStyles = []
    totalCount = db.session.query(Style.id).count()


    order = request.args.get('order')
    if order == "asc" or order == "desc":
        lim = totalCount
    else:
        lim = request.args.get('limit', 9)
        
    off = request.args.get('offset',0)

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

    if order == "asc":
        allStyles = sorted(allStyles, key=lambda style: style['name'])
    elif order == "desc":
        allStyles = sorted(allStyles, key=lambda style: style['name'])[::-1]

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

@app.route('/styles/srm/<float:srm_val>', methods = ['GET'])
def filterStyleBySRM(srm_val):
    allStyles = []
    lim = request.args.get('limit', 9)
    off = request.args.get('offset',0)
    srm_val = math.floor(srm_val)
    mod = 1.0 - (srm_val % 1)
    styles = Style.query.filter(Style.srm >= srm_val).filter(Style.srm < (srm_val + mod)).limit(lim).offset(off).all()
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

    return jsonify(allStyles)
@app.route('/styles/abv/<float:abv>', methods = ['GET'])
def filterStyleByAbv(abv):
    allStyles = []
    lim = request.args.get('limit', 9)
    off = request.args.get('offset',0)
    styles = Style.query.filter(Style.abv_min <= abv).filter(Style.abv_max >= abv).limit(lim).offset(off).all()
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
    
    return jsonify(allStyles)



