#!/usr/bin/env python

import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class PythonOrgSearch(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_search_in_python_org(self):
        driver = self.driver
        driver.get("https://www.brewtiful.world")
        print(driver.title)
        #self.assertIn("Python", driver.title)
        elem = driver.find_element_by_class_name("title-nav")
        beer_link = driver.find_element_by_link_text("Beers")
        print(beer_link)
        #beer_link.click()
        #self.assertIn("Brewtiful World", elem)
        #elem.send_keys("pycon")
        #elem.send_keys(Keys.RETURN)
        assert "No results found." not in driver.page_source


    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()