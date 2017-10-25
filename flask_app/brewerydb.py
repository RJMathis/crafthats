import json
import requests
from pprint import pprint
import ast
url = 'http://api.brewerydb.com/v2/beers'
headers = {'p': '1','availabilityId': '1', 'content-type': 'application/json', 'key': '9a55c9a82cfe2e8ae6ec46d13543ec46'}

count = 1
querystring = {"availableId":"%d" % (count),"key":"9a55c9a82cfe2e8ae6ec46d13543ec46"}

response = requests.request("GET", url, headers=headers, params=querystring)

print(json.dumps(response.json(), indent=2))