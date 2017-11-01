import json
import requests
from pprint import pprint
import ast
from main import app, db
from models import Style, Beer, Review, Brewery

beer_names = []
def parse_this(payload):

	for key,values in payload.items():

		if "data" in key:

			data = json.dumps(values)
			data = json.loads(data)
			for x in data:
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

				# print("heill")

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
					except KeyError:
						# established = "Unavailable"
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

				st = Style(name=shortName, description=description, ibu_min=ibuMin, ibu_max=ibuMax, abv_min=abvMin, abv_max=abvMax)
				db.session.add(st)
				db.session.commit()


				b = Beer(name=nameDisplay, organic=organic, abv=abv, ibu=ibu, brewery_id=1, style_id=1, images=pic)
				db.session.add(b)
				db.session.commit()	


				brw = Brewery(name=brewery, city=city, state=state, country=country, established=established, description=b_description, images=images, website=website)
				db.session.add(brw)
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
for page_num in range(50, 70):
	url = 'http://api.brewerydb.com/v2/beers?p=%d&withBreweries=Y' % (page_num * count)
	headers = {'content-type': 'application/json', 'Authorization': '0a7e4bd6d2fc7e0dd1e9ca1067608af0'}

	response = requests.request("GET", url, headers=headers)
	if response.status_code is not 200 :
		print(response.status_code)


	raw_data = (response.json())
	payload = json.dumps(raw_data, sort_keys=True, indent=4, separators=(',',': ') )

	json_payload = json.loads(payload)
	parse_this(json_payload)
	count+= 1				

# print(len(beer_names))
print(beer_names)


