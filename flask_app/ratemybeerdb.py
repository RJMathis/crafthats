import requests

url = "https://api.ratebeer.com/v1/api/graphql"

payload = "{\"query\":\"query {beer(id:4444){name id}}\",\"variables\":\"{}\",\"operationName\":null}"
headers = {
    'content-type': "application/json",
    'accept': "application/json",
    'x-api-key': "OgsnJG7Hev1GabHNfLmgGzTvM6HiCHiaiRASmme0"
    }

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)