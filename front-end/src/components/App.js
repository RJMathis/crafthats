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

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
          <BrowserRouter>
              <div className="App">
                  <Switch>
                      <Route exact path="/" component={Home} />
                      <Route exact path="/Home" component={Home} />
                      <Route exact path="/Beers" component={Beers} />
                      <Route exact path="/Beer" component={Beer} />
                      <Route exact path="/Breweries" component={Breweries} />
                      <Route exact path="/Styles" component={Styles} />
                      <Route exact path="/Reviews" component={Reviews} />
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