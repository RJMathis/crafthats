import json
import requests
from main import db
from models import Beer, Brewery, Style, Review

from beer_names import beer_names

url = "https://api.ratebeer.com/v1/api/graphql"

# with open('output.json') as data_file:    
# 	data = json.load(data_file)

def parse_r8_id(payload, name):
	for key,values in payload.items():
		if key == "data":
			data = json.dumps(values)
			data = json.loads(data)
			for item in range(len(data["beerSearch"]["items"])):
					return int(data["beerSearch"]["items"][0]["id"])
			return 0
def parse_r8_rev(payload, fk):
	score = ""
	comment = ""
	comment_date = ""
	# beer_name = ""
	# brewer = ""
	for key,values in payload.items():
		if key == "data":
			# print(typeof(key))
			data = json.dumps(values)
			data = json.loads(data)
			count = 0
			try:
				while (data["beerReviews"]["items"][count] != None):
					score = ""
					comment = ""
					comment_date = ""
					comment = (data["beerReviews"]["items"][count]['comment'])
					score = (data["beerReviews"]["items"][count]['score'])
					comment_date = (data["beerReviews"]["items"][count]['createdAt'])
					# beer_name = (data["beerReviews"]["items"][count]['beer']["name"])
					# brewer_name = (data["beerReviews"]["items"][count]['beer']["brewer"]["name"])
					count += 1
					# print(score)
					# print(comment)
					# print(comment_date)
					# print(beer_name)
					# print(brewer)
					rev = Review(date=comment_date, rating=score, comment=comment, beer_name=fk, brewery_name=fk)
					db.session.add(rev)
					db.session.commit()
			except IndexError:
				pass


# for beer in range(1):
# print(beer_names)
# beer_names = ['Widmer Brothers Altbitter']
fk = 2
for beer in beer_names:
# beer_name = beer_names[0:2]
# for beer in beer_name:
	headers = {
	    'accept': 'application/json',
	    'content-type': 'application/json',
	    'x-api-auth': 'Basic bnVsbA==',
	    'x-api-key': 'OgsnJG7Hev1GabHNfLmgGzTvM6HiCHiaiRASmme0'
	}

	payload = "{\"query\":\"query {\\n  beerSearch(query: \\\"%s\\\")\\n  {\\n    items\\n    {\\n      name\\n      id\\n    }\\n  }\\n   beerReviews(beerId: 183510)\\n   {\\n     items\\n     {\\n       score\\n       beer\\n       {\\n         name\\n   brewer\\n {\\n name \\n}\\n     } \\n       comment\\n       createdAt\\n     }\\n   }\\n}\",\"variables\":\"{}\"}" % (beer)
	response = requests.request("POST", url, data=payload, headers=headers)
	raw_data = (response.json())
	payload = json.dumps(raw_data, sort_keys=True, indent=4, separators=(',',': ') )

	data = json.loads(payload)
	b_id = parse_r8_id(data, beer)
	if not b_id:
		rev = Review(date="N/A", rating="N/A", comment="Unavailable", beer_name=1, brewery_name=1)
		db.session.add(rev)
		db.session.commit()
		continue

	# print(beer)
	# print(b_id)


	payload = "{\"query\":\"query {\\n  beerSearch(query: \\\"%s\\\")\\n  {\\n    items\\n    {\\n      name\\n      id\\n    }\\n  }\\n   beerReviews(beerId: %d)\\n   {\\n     items\\n     {\\n       score\\n       beer\\n       {\\n         name\\n   brewer\\n {\\n name \\n}\\n     } \\n       comment\\n       createdAt\\n     }\\n   }\\n}\",\"variables\":\"{}\"}" % (beer, b_id)
	response = requests.request("POST", url, data=payload, headers=headers)
	raw_data = response.json()
	payload = json.dumps(raw_data, sort_keys=True, indent=4, separators=(',',': ') )
	data = json.loads(payload)

	parse_r8_rev(data,fk)
	fk += 1