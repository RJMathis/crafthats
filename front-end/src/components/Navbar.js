import React, { Component } from 'react';

export default class Navbar extends Component {
  render() {
    return (
        <div className="navbar navbar-home navbar-default navbar-static-top">
          <div className="container">
            <h1>Brewtiful World</h1>
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="icon-bar"/>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
              </button>
            </div>
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li><a href="../index.html">Home</a></li>
                <li><a href="../htmlPages/beers.html">Beers</a></li>
                <li><a href="breweries.html">Breweries</a></li>
                <li><a href="styles.html">Styles</a></li>
                <li><a href="reviews.html">Reviews</a></li>
                <li><a href="about.html">About</a></li>
              </ul>
            </div>
          </div>
        </div>
    );
  }
}