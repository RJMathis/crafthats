#This is where the style routes are defined.
from flask import Flask, request, jsonify,Response,json
from main import app
from models import db, Style
import math
from werkzeug.contrib.cache import SimpleCache
cache = SimpleCache()

#GET ALL STYLES
"""
/styles endpoint
?params:
    +abv_min - int
    +abv_max - int
    +srm_min - int
    +srm_max - int
    +offset - int, default 0
    +limit - int, default 12
    +order - int
"""
@app.route('/styles',methods=['GET'])
def getStyles():
    # styles to return
    allStyles = []

    # get optional params
    abv_min = request.args.get('abv_min','None').encode('utf-8')
    abv_max = request.args.get('abv_max','None').encode('utf-8')
    srm_min = request.args.get('srm_min','None').encode('utf-8')
    srm_max = request.args.get('srm_max',"None").encode('utf-8')
    order = request.args.get('sort_by','default').encode('utf-8')
    lim = request.args.get('limit', '9').encode('utf-8')
    off = request.args.get('offset', '0').encode('utf-8')

    #cast
    lim = int(lim)
    off = int(off)

    #caching
    cachestr = abv_min+abv_max+srm_min+srm_max+order+str(lim)+str(off)
    rv = cache.get(cachestr)
    if rv is not None:
        return rv

    #build up the query with filters and store resulting list in styles array
    query = db.session.query(Style)
    if abv_min != 'None' and abv_max != 'None':
        query = query.filter(Style.abv_min>=abv_min).filter(Style.abv_max<=abv_max) 
    if srm_min != 'None' and srm_max != 'None':
        query = query.filter(Style.srm>=srm_min).filter(Style.srm<=srm_max)
    if order == "asc":
        styles = query.order_by(Style.name).limit(lim).offset(off).all()
    elif order == "desc":
        styles = query.order_by(Style.name.desc()).limit(lim).offset(off).all()
    else:
        styles = query.limit(lim).offset(off).all()

    totalCount = query.count()

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
        'beer_ids':[beer.id for beer in style.beers],
        'breweries':[brewery.serializeName for brewery in style.breweries],
        'brewery_ids':[brewery.id for brewery in style.breweries]
        }
        allStyles.append(s)

    payload = {'totalCount': totalCount, 'records': allStyles}
    response = Response(json.dumps(payload), mimetype='application/json')
    response.status_code = 200
    cache.set(cachestr,response, timeout= 5*60)
    return response

#GET STYLE BY STYLE_ID
"""
/styles/<style_id> endpoint
style_id - integer
"""
@app.route('/styles/<style_id>', methods = ['GET'])
def getStyleInfo(style_id):
    try:
        style = db.session.query(Style).filter_by(id=style_id).first()
        s = {
            'type' : "style",
            'id' : style.id,
            'name' : style.name,
            'description' : style.description,
            'ibu_min' : style.ibu_min,
            'ibu_max' : style.ibu_max,
            'abv_min' : style.abv_min,
            'abv_max' : style.abv_max,
            'srm': style.srm,
            'beers' : [beer.serializeName for beer in style.beers],
            'beer_ids':[beer.id for beer in style.beers],
            'breweries':[brewery.serializeName for brewery in style.breweries],
            'brewery_ids':[brewery.id for brewery in style.breweries]
            }
    except AttributeError:
        return "Server Error 500: Invalid style_id"
    return Response(json.dumps(s), mimetype='application/json')

