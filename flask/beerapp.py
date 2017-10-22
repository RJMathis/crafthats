from flask import Flask
from models import db


beerapp = Flask(__name__)
beerapp.config.from_object('config')

db.init_app(beerapp)
db.create_all(app=beerapp)

@beerapp.route('/')
def home():
	return "hello world"

if __name__ == '__main__':
	beerapp.run()

