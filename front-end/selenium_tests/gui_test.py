#!/usr/bin/env python

import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class TestSuite(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        driver = self.driver
        driver.get("https://www.brewtiful.world")

    ##################
    # Test Nav Links #
    ##################
    def test_beers_link(self):
        driver = self.driver
        beers_link = driver.find_element_by_xpath("//*[@id='root']/div/div[1]/div/div[2]/ul/li[2]/a")
        beers_link.click()
        assert "Organic" in driver.page_source
        assert "Style" in driver.page_source

    def test_breweries_link(self):
        driver = self.driver
        breweries_link = driver.find_element_by_xpath("//*[@id='root']/div/div[1]/div/div[2]/ul/li[3]/a")
        breweries_link.click()
        assert "Country" in driver.page_source
        assert "State" in driver.page_source

    def test_styles_link(self):
        driver = self.driver
        styles_link = driver.find_element_by_xpath("//*[@id='root']/div/div[1]/div/div[2]/ul/li[4]/a")
        styles_link.click()
        assert "ABV Range" in driver.page_source
        assert "SRM Range" in driver.page_source

    def test_reviews_link(self):
        driver = self.driver
        reviews_link = driver.find_element_by_xpath("//*[@id='root']/div/div[1]/div/div[2]/ul/li[5]/a")
        reviews_link.click()
        assert "Rating" in driver.page_source
        assert "Beer" in driver.page_source

    def test_about_link(self):
        driver = self.driver
        breweries_link = driver.find_element_by_xpath("//*[@id='root']/div/div[1]/div/div[2]/ul/li[6]/a")
        breweries_link.click()
        assert "The Team" in driver.page_source

    ##################
    #  Test Search   #
    ##################
    def test_search_with_results(self):
        driver = self.driver
        search = driver.find_element_by_xpath("//*[@id='root']/div/div[1]/div/div[2]/ul/form/div[2]/div/input")
        search.send_keys("beer")
        search.send_keys(Keys.RETURN)
        driver.implicitly_wait(2)  # seconds
        assert "No results were found" not in driver.page_source
        assert "Search Results" in driver.page_source

    def test_search_without_results(self):
        driver = self.driver
        search = driver.find_element_by_xpath("//*[@id='root']/div/div[1]/div/div[2]/ul/form/div[2]/div/input")
        search.send_keys("chow")
        search.send_keys(Keys.RETURN)
        driver.implicitly_wait(2)  # seconds
        assert "No results were found" in driver.page_source
        assert "Search Results" not in driver.page_source

    ###################
    # Test Pagination #
    ###################
    def test_beers_pagination(self):
        driver = self.driver
        beers_link = driver.find_element_by_xpath('//*[@id="root"]/div/div[1]/div/div[2]/ul/li[2]/a')
        beers_link.click()
        driver.implicitly_wait(2)  # seconds
        assert "Page <!-- /react-text --><!-- react-text: 85 -->1<!-- /react-text --><!-- react-text: 86 --> of " in driver.page_source
        beers_page2_link = driver.find_element_by_xpath("//*[@id='root']/div/div[2]/div/div[6]/div/div/ul/li[3]/a")
        beers_page2_link.click()
        assert "Page <!-- /react-text --><!-- react-text: 85 -->2<!-- /react-text --><!-- react-text: 86 --> of " in driver.page_source
        beers_next_link = driver.find_element_by_xpath('//*[@id="root"]/div/div[2]/div/div[6]/div/div/ul/li[8]/a')
        beers_next_link.click()
        assert "Page <!-- /react-text --><!-- react-text: 85 -->3<!-- /react-text --><!-- react-text: 86 --> of " in driver.page_source
        driver.implicitly_wait(2)  # seconds
        beers_prev_link = driver.find_element_by_xpath('//*[@id="root"]/div/div[2]/div/div[6]/div/div/ul/li[1]/a')
        beers_prev_link.click()
        assert "Page <!-- /react-text --><!-- react-text: 85 -->2<!-- /react-text --><!-- react-text: 86 --> of " in driver.page_source

    def tearDown(self):
        self.driver.close()

suite = unittest.TestLoader().loadTestsFromTestCase(TestSuite)
unittest.TextTestRunner(verbosity=2).run(suite)