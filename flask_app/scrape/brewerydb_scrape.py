"""
A script that queries brewerydb for most of the beer info
"""

import json
import requests
from main import db
from models import Beer, Brewery, Style, Review

#variables to keep track of duplilcates
beer_names = []
styles_dic = {}
style_obj = {}
brew_dic = {}
brew_obj = {}

beer_to_brew = {}
def parse_this(payload):
	# serialize brewery db payload
	for key,values in payload.items():

		if "data" in key:

			data = json.dumps(values)
			data = json.loads(data)
			for x in data: #initialize bc many db model attributes can't handle Null values
				b_description = ""
				established = ""
				country = ""
				state = ""
				city = ""
				website = ""
				images = ""
				abv = ""
				ibu = ""
				nameDisplay = ""
				organic = ""
				pic = ""
				shortName = ""
				description = ""
				ibuMin = ""
				ibuMax = ""
				abvMin = ""
				abvMax = ""
				srm = ""

				if "breweries" in x:
					brewery = x['breweries'][0]["name"]
					try:
						if 'description' in x['breweries'][0]:
							b_description = x['breweries'][0]['description']
						if len(b_description) > 200:
							b_description = ""
					except KeyError:
						# b_description = "Description Unavailable"
						continue

					try:
						if 'established' in x['breweries'][0]:
							established = x['breweries'][0]['established']
							# print(established)
					except KeyError:
						# established = "Unavailable"
						continue
					if established == "":
						continue
					try:
						if x['breweries'][0]['locations'][0]['country']['displayName'] != None:
							country = x['breweries'][0]['locations'][0]['country']['displayName']
					except KeyError:
						# country = "Country Name Unavailable"
						continue

					try:
						if x['breweries'][0]['locations'][0]['region'] != None:
							state = x['breweries'][0]['locations'][0]['region']
					except KeyError:
						state = "State Name Unavailable"
						# continue

					try:
						if x['breweries'][0]['locations'][0]['region']:
							city = x['breweries'][0]['locations'][0]['locality']
					except KeyError:
						# city = "City Name Unavailable"
						continue
					
					try:
						if x['breweries'][0]['locations'][0]['website']:
							website = x['breweries'][0]['locations'][0]['website']
					except KeyError:
						# website = "www.empty.com"
						continue

					try:
						if 'images' in x['breweries'][0]:
							images = x['breweries'][0]['images']['squareLarge']
					except KeyError:
						# images = "https://i2.wp.com/www.worldbeersguide.com/wp-content/uploads/2017/01/slide6.jpg"
						continue

					# print(brewery, b_description, established, country, state, city, website, images)

				try:
					if x['abv']:
						abv = x['abv']
				except KeyError:
					# abv = "ABV Unavailable"
					continue

				try:
					if x['ibu']:
						ibu = x['ibu']
				except KeyError:
					# ibu = "IBU Unavailable"
					continue

				try:
					if x['nameDisplay']:
						nameDisplay = x['nameDisplay']
						if nameDisplay in beer_names:
							continue
						# beer_names.append(u''.join(nameDisplay).encode('utf-8'))
						# print(nameDisplay)
				except KeyError:
					# nameDisplay = "Name Unavailable"
					continue		
				
				try:
					if x['isOrganic']:
						organic = x['isOrganic']
				except KeyError:
					# organic = "Organic-ness Unavailable!"
					continue

				try:
					if x['labels']['large']:
						pic = x['labels']['large']
				except:
					# pic = "www.empty.com"
					continue

				if 'style' in x:

					try:
						if x['style']['shortName']:
							shortName = x['style']['shortName']
					except KeyError:
						# shortName = "Style Name Unavailable"
						continue

					try:
						if x['style']['description']:
							description = x['style']['description']
					except KeyError:
						# description = "Description Unavailable"
						continue

					try:
						if x['style']['srmMin'] and x['style']['srmMax']:
							srm = (float(x['style']['srmMin']) + float(x['style']['srmMax'])) / 2
					except KeyError:
						# ibuMin = "IBU Minimum Unavailable"
						# assert(False)
						continue

					try:
						if x['style']['ibuMin']:
							ibuMin = x['style']['ibuMin']
					except KeyError:
						# ibuMin = "IBU Minimum Unavailable"
						continue

					try:
						if x['style']['ibuMax']:
							ibuMax = x['style']['ibuMax']
					except KeyError:
						# ibuMax = "IBU Maximum Unavailable"
						continue

					try:
						if x['style']['abvMin']:
							abvMin = x['style']['abvMin']
					except KeyError:
						# abvMin = "ABV Minimum Unavailable"
						continue

					try:
						if x['style']['abvMax']:
							abvMax = x['style']['abvMax']
					except KeyError:
						# abvMax = "ABV Maximum Unavailable"
						continue

				st_id = -1
				if not styles_dic.get(shortName):
					st = Style(name=shortName, description=description, ibu_min=float(ibuMin), ibu_max=float(ibuMax), abv_min=float(abvMin), abv_max=float(abvMax), srm=srm)
					db.session.add(st)
					db.session.commit()
					styles_dic[shortName] = st.id
					style_obj[shortName] = st
					st_id = st.id
				else:
					st_id = styles_dic[shortName]
					st = style_obj[shortName]


				brw_id = -1
				if not brew_dic.get(brewery):
					brw = Brewery(name=brewery, city=city, state=state, country=country, established=int(established), description=b_description, images=images, website=website)
					db.session.add(brw)
					db.session.commit()
					brew_dic[brewery] = brw.id
					brew_obj[brewery] = brw
					brw_id = brw.id
				else:
					brw_id = brew_dic[brewery]
					brw = brew_obj[brewery]


				b = Beer(name=nameDisplay, organic=organic, abv=float(abv), ibu=float(ibu), brewery_id=brw_id, style_id=st_id, images=pic)
				db.session.add(b)
				db.session.commit()
				brw.styles.append(st)

				brew_ind = brewery.lower().find("brew")
				if brew_ind == -1:
					brew_ind == ""
					beer_names.append(u''.join(nameDisplay).encode('utf-8'))
				else:
					brew_ind = u''.join(brewery[0:(brew_ind)-1]).encode('utf-8')
					temp = brew_ind + " " + u''.join(nameDisplay).encode('utf-8')
					beer_names.append(temp)

	return beer_names

count = 1
for page_num in range(1, 250):
	url = 'http://api.brewerydb.com/v2/beers?p=%d&order=random&randomCount=10&withBreweries=Y' % (page_num)
	headers = {'content-type': 'application/json', 'Authorization': '0a7e4bd6d2fc7e0dd1e9ca1067608af0'}

	response = requests.request("GET", url, headers=headers)
	if response.status_code is not 200 :
		print(response.status_code)

	print(count)
	raw_data = (response.json())
	payload = json.dumps(raw_data, sort_keys=True, indent=4, separators=(',',': ') )

	json_payload = json.loads(payload)
	parse_this(json_payload)
	count+= 1				

# print(len(beer_names))
print(beer_names)


