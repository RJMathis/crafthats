#!/usr/bin/env bash

#cd flask_app
#python brewery_unit_tests.py
coverage run flask_app/brewery_unit_tests.py
coverage report flask_app/views/brewery.py
coverage run flask_app/beer_unit_tests.py
coverage report flask_app/views/beer.py
coverage run flask_app/style_unit_tests.py
coverage report flask_app/views/style.py
coverage run flask_app/review_unit_tests.py
coverage report -m flask_app/views/review.py
