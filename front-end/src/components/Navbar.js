import React, { Component } from 'react';
import Search from './Search';

export default class Navbar extends Component {
  render() {
    return (
        <div className="navbar navbar-home navbar-default navbar-static-top">
          <div className="container">
            <h1 className="title">Brewtiful World</h1>
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="icon-bar"/>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
              </button>
            </div>
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li><a href="/">Home</a></li>
                <li><a href="/Beers">Beers</a></li>
                <li><a href="/Breweries">Breweries</a></li>
                <li><a href="/Styles">Styles</a></li>
                <li><a href="/Reviews">Reviews</a></li>
                <li><a href="/About">About</a></li>
                <li><Search /></li>
              </ul>
            </div>
          </div>
        </div>
    );
  }
}