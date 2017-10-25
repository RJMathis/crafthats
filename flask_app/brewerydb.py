import json
import requests
from pprint import pprint
url = 'http://api.brewerydb.com/v2/beers'
headers = {'p': '1','availabilityId': '1', 'content-type': 'application/json', 'key': '9a55c9a82cfe2e8ae6ec46d13543ec46'}


querystring = {"availableId":"1","key":"9a55c9a82cfe2e8ae6ec46d13543ec46"}


response = requests.request("GET", url, headers=headers, params=querystring)

print(response.text)