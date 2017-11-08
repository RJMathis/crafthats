import json
import requests
import re
from main import db
from models import Beer, Brewery, Style, Review
from beer_names import beer_names

url = "https://api.ratebeer.com/v1/api/graphql"
fk = 1

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
			# try:
			while (count < 5 and count < len(data["beerReviews"]["items"])):
				score = ""
				comment = ""
				comment_date = ""
				comment = (data["beerReviews"]["items"][count]['comment'])
				score = (data["beerReviews"]["items"][count]['score'])
				# print(comment)
				# Only grab the first portion of the date.
				comment_date = (data["beerReviews"]["items"][count]['createdAt'])[0:10]
				# beer_name = (data["beerReviews"]["items"][count]['beer']["name"])
				if "The honey really comes out nicely." in comment or "A very nice BIPA" in comment:
					count += 1
					continue

				t = re.match(r'\\x[0-9a-fA-F]+', comment)
				first = re.findall(r'[\x80-\xff]', comment)
				second = re.findall('[\\x80-\\xff]', comment)
				if first or second or t:
					# if t:
						# print("hi t")
					# if first:
						# print("hello1")
					# if second:
					# 	print("hello2")
					# print(comment)
					count += 1
					continue
				# print(fk)
				# brewer_name = (data["beerReviews"]["items"][count]['beer']["brewer"]["name"])
				count += 1
				# print(score)
				# print(comment)
				# print(comment_date)
				# print(beer_name)
				# print(brewer)
				brew_id = db.session.query(Beer).get(fk).brewery_id
				rev = Review(date=comment_date, rating=float(score), comment=comment, beer_name=fk, brewery_name=brew_id)
				db.session.add(rev)
				db.session.commit()
			# except IndexError:
			# 	print("fk IE", fk)
			# 	return
			# else:
			# 	print("fk SI", fk)
			return 1

# for beer in range(1):
# print(beer_names)
# beer_names = ['Widmer Brothers Altbitter']
for beer in beer_names:
# beer_name = beer_names[0:2]
# for beer in beer_name:
	headers = {
	    'accept': 'application/json',
	    'content-type': 'application/json',
	    'x-api-auth': 'Basic bnVsbA==',
	    'x-api-key': 'OgsnJG7Hev1GabHNfLmgGzTvM6HiCHiaiRASmme0'
	}
	# print(fk)
	payload = "{\"query\":\"query {\\n  beerSearch(query: \\\"%s\\\")\\n  {\\n    items\\n    {\\n      name\\n      id\\n    }\\n  }\\n   beerReviews(beerId: 183510)\\n   {\\n     items\\n     {\\n       score\\n       beer\\n       {\\n         name\\n   brewer\\n {\\n name \\n}\\n     } \\n       comment\\n       createdAt\\n     }\\n   }\\n}\",\"variables\":\"{}\"}" % (beer)
	response = requests.request("POST", url, data=payload, headers=headers)
	raw_data = (response.json())
	payload = json.dumps(raw_data, sort_keys=True, indent=4, separators=(',',': ') )
	data = json.loads(payload)
	b_id = parse_r8_id(data, beer)
	# print(beer)
	# print(str(fk))
	if not b_id:
		# print(beer)
		# print("fk in not findable beer id " + str(fk))
		brew_id = db.session.query(Beer).get(fk).brewery_id
		rev = Review(date="N/A", rating=0.0, comment="Unavailable", beer_name=fk, brewery_name=brew_id)
		db.session.add(rev)
		db.session.commit()
		fk += 1
		continue
	# print(beer)
	# print(beer)
	# print(b_id)


	payload = "{\"query\":\"query {\\n  beerSearch(query: \\\"%s\\\")\\n  {\\n    items\\n    {\\n      name\\n      id\\n    }\\n  }\\n   beerReviews(beerId: %d)\\n   {\\n     items\\n     {\\n       score\\n       beer\\n       {\\n         name\\n   brewer\\n {\\n name \\n}\\n     } \\n       comment\\n       createdAt\\n     }\\n   }\\n}\",\"variables\":\"{}\"}" % (beer, b_id)
	response = requests.request("POST", url, data=payload, headers=headers)
	raw_data = response.json()
	payload = json.dumps(raw_data, sort_keys=True, indent=4, separators=(',',': ') )
	data = json.loads(payload)
	parse_r8_rev(data,fk)
	fk += 1


