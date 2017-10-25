
import json
import requests
from pprint import pprint
  
i = "Bronx Rye Pale Ale"
url = "https://api.ratebeer.com/v1/api/graphql/"

payload = "{\"query\":\"query {\\n  beerSearch(query: \\\"%s\\\")\\n  {\\n    items\\n    {\\n      name\\n      id\\n    }\\n  }\\n  # beerReviews(beerId: 183510)\\n  # {\\n  #   items\\n  #   {\\n  #     score\\n  #     beer\\n  #     {\\n  #       name\\n  #     }\\n  #     comment\\n  #     createdAt\\n  #   }\\n  # }\\n}\",\"variables\":\"{}\"}" % (i)
headers = {
    'content-type': "application/json",
    'accept': "application/json",
    'x-api-key': "OgsnJG7Hev1GabHNfLmgGzTvM6HiCHiaiRASmme0",
    }

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)
