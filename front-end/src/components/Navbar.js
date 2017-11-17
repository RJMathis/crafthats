import React, { Component } from 'react';
import Search from './Search';

export default class Navbar extends Component {
  render() {
    return (
        <div className="navbar navbar-home navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="icon-bar"/>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
              </button>
              <h1 className="title-nav">Brewtiful World</h1>
              <div className="title-logo">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="46" viewBox="0 0 264 504.7" className="beerGlass js-beerGlass">
                  <path className="foam" d="M231.7 49.3c-4.3 0-8.3 1.2-11.7 3.2-1.4-17.1-15.7-30.5-33.1-30.5-11.3 0-21.2 5.6-27.2 14.2C150.2 16.6 130.2 3 107 3 81.2 3 59.3 19.8 51.7 43c-3.5-1.5-7.3-2.3-11.3-2.3-16 0-29 13-29 29h243.2c-1.3-11.5-11.1-20.4-22.9-20.4z"/>
                  <path className="glass" d="M43 501.7h178l40-432H3z"/>
                  <path className="head" d="M7.1 112.4H257l4-42.7H3z"/>
                  <path className="beer" fill="#82260B" d="M38.3 450.6c1.1 11.4 10.6 20.1 22.1 20.1h143.4c11.4 0 21-8.7 22.1-20.1L257 112.4H7.1l31.2 338.2"/>
                  <path className="shadow" d="M107.3 501.7c-11.3 0-20.7-8.7-21.7-19.9l-35-412.1H3l40 432h64.3z"/>
                  <path className="rim-accent" d="M4.3 83.7h255.4"/>
                  <path className="highlight" d="M168 501.7c13 0 23.9-9.9 25.1-22.9L231 69.7h-18l-37.9 409.1c-1.2 13-12.1 22.9-25.1 22.9h18z"/>
                  <path className="pint-outline" d="M221 501.7H43L3 69.7h258z"/>
                 </svg>
               </div>
            </div>
            <div className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                  <li><a href="/">Home</a></li>
                  <li><a href="/Beers">Beers</a></li>
                  <li><a href="/Breweries">Breweries</a></li>
                  <li><a href="/Styles">Styles</a></li>
                  <li><a href="/Reviews">Reviews</a></li>
                  <li><a href="/#about">About</a></li>
                  <Search />
                </ul>
            </div>
          </div>
        </div>
    );
  }
}