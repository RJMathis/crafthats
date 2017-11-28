#!/usr/bin/env bash

#cd flask_app
#python brewery_unit_tests.py
coverage run flask_app/brewery_unit_tests.py
coverage run flask_app/beer_unit_tests.py
coverage report flask_app/views/*.py