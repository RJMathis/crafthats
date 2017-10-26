import React, { Component } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import NotFound from './NotFound';
import Beers from './Beers';
import Breweries from './Breweries';
import Styles from './Styles';
import Reviews from './Reviews';
import About from './About';
import Beer from './Beer';
import Brewery from './Brewery';
import Style from './Style';
import Review from './Review';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
          <BrowserRouter>
              <div className="App">
                  <Switch>
                      <Route exact path="/" component={Home} />
                      <Route exact path="/Beers" component={Beers} />
                      <Route exact path="/Beer" component={Beer} />
                      <Route exact path="/Breweries" component={Breweries} />
                      <Route exact path="/Brewery" component={Brewery} />
                      <Route exact path="/Styles" component={Styles} />
                      <Route exact path="/Style" component={Style} />
                      <Route exact path="/Reviews" component={Reviews} />
                      <Route exact path="/Review" component={Review} />
                      <Route exact path="/About" component={About} />
                      <Route component={NotFound} />
                  </Switch>
              </div>
          </BrowserRouter>
        <Footer />
      </div>
    );
  }
}