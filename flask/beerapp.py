from flask import Flask

beerapp = Flask(__name__)

@beerapp.route('/')
def home():
	return "hello world"

if __name__ == '__main__':
	beerapp.run()

