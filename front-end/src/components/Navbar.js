import React, { Component } from 'react';
import Search from './Search';

export default class Navbar extends Component {
  render() {
    return (
        <div className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="icon-bar"/>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
              </button>
              <h1 className="title-nav text-white">Brewtiful World</h1>
            </div>
            <div className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                  <li><a href="/">Home</a></li>
                  <li><a href="/Beers">Beers</a></li>
                  <li><a href="/Breweries">Breweries</a></li>
                  <li><a href="/Styles">Styles</a></li>
                  <li><a href="/Reviews">Reviews</a></li>
                  <li><a href="/#about">About</a></li>
                  <Search allData={this.props.allData}/>
                </ul>
            </div>
          </div>
        </div>
    );
  }
}