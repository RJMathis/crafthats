import json
import requests
import re
from main import db
from models import Beer, Brewery, Style, Review
from beer_names import beer_names

url = "https://api.ratebeer.com/v1/api/graphql"
fk = 1

"""
We are returned a list of ids that we need to then look for the reviews to that beer. First
item is most closely associated to what we are looking for
"""
def parse_r8_id(payload, name):
	for key,values in payload.items():
		if key == "data":
			data = json.dumps(values)
			data = json.loads(data)
			for item in range(len(data["beerSearch"]["items"])):
					return int(data["beerSearch"]["items"][0]["id"])
	return 0

"""
We are given a list of reviews, with each we are grabbing comment, score, and comment_date. We are using regex
to sanitize data to not include obscure characters. We only grab up to 5 reviews for a beer
"""
def parse_r8_rev(payload, fk):
	for key,values in payload.items():
		if key == "data":
			data = json.dumps(values)
			data = json.loads(data)
			count = 0
			while (count < 5 and count < len(data["beerReviews"]["items"])):
				score = ""
				comment = ""
				comment_date = ""
				comment = (data["beerReviews"]["items"][count]['comment'])
				score = (data["beerReviews"]["items"][count]['score'])
				# Only grab the first portion of the date.
				comment_date = (data["beerReviews"]["items"][count]['createdAt'])[0:10]
				if "The honey really comes out nicely." in comment or "A very nice BIPA" in comment:
					count += 1
					continue

				# Regex to find hex characters that would break database population.
				t = re.match(r'\\x[0-9a-fA-F]+', comment)
				first = re.findall(r'[\x80-\xff]', comment)
				second = re.findall('[\\x80-\\xff]', comment)
				if first or second or t:
					count += 1
					continue
				count += 1

				# Creating the actual review in the database.
				brew_id = db.session.query(Beer).get(fk).brewery_id
				rev = Review(date=comment_date, rating=float(score), comment=comment, beer_name=fk, brewery_name=brew_id)
				db.session.add(rev)
				db.session.commit()

			return 1

"""
We grab beer names from when we scrape brewerydb. We loop through this list and append reviews and attach
appropriate fk's to each instance creation
"""
for beer in beer_names:
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

	# Find the id of a beer to search for a review. Returns 0 if it cannot find that beer.
	b_id = parse_r8_id(data, beer)

	# If a beer id is not found, put an empty review, but still point back to that beer instance.
	if not b_id:
		brew_id = db.session.query(Beer).get(fk).brewery_id
		rev = Review(date="N/A", rating=0.0, comment="Unavailable", beer_name=fk, brewery_name=brew_id)
		db.session.add(rev)
		db.session.commit()
		fk += 1
		continue


	payload = "{\"query\":\"query {\\n  beerSearch(query: \\\"%s\\\")\\n  {\\n    items\\n    {\\n      name\\n      id\\n    }\\n  }\\n   beerReviews(beerId: %d)\\n   {\\n     items\\n     {\\n       score\\n       beer\\n       {\\n         name\\n   brewer\\n {\\n name \\n}\\n     } \\n       comment\\n       createdAt\\n     }\\n   }\\n}\",\"variables\":\"{}\"}" % (beer, b_id)
	response = requests.request("POST", url, data=payload, headers=headers)
	raw_data = response.json()
	payload = json.dumps(raw_data, sort_keys=True, indent=4, separators=(',',': ') )
	data = json.loads(payload)
	
	# Call to loop through list of reviews to create our model instances.
	parse_r8_rev(data,fk)
	fk += 1


