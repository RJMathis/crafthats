import unittest
from main import db
from models import Beer, Brewery, Style, Review
from views import *

class API(unittest.TestCase):
    """ A Test suite for initial setup"""
