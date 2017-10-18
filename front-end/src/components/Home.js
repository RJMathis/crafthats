import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
        <div className="container">
            <div id="carousel" className="carousel slide" data-ride="carousel">
                {/* Indicators */}
                <ol className="carousel-indicators">
                    <li data-target="#carousel" data-slide-to="0" className="active"/>
                    <li data-target="#carousel" data-slide-to="1"/>
                    <li data-target="#carousel" data-slide-to="2"/>
                </ol>
                {/* Wrapper for slides */}
                <div className="carousel-inner" role="listbox">
                    <div className="item active">
                        <div className="carousel-item-container">
                            <img className="d-block w-100" src="../images/beer.jpg" alt="..." />
                            <div className="carousel-caption"/>
                        </div>
                    </div>
                    <div className="item">
                        <div className="carousel-item-container">
                            <img className="d-block w-100" src="../images/beer_samples.jpg" alt="..." />
                            <div className="carousel-caption"/>
                        </div>
                    </div>
                    <div className="item">
                        <div className="carousel-item-container">
                            <img className="d-block w-100" src="../images/craft_beer.jpg" alt="..." />
                            <div className="carousel-caption"/>
                        </div>
                    </div>
                </div>
                {/* Controls */}
                <a className="left carousel-control" href="#carousel" role="button" data-slide="prev">
                    <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"/>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control" href="#carousel" role="button" data-slide="next">
                    <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"/>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    );
  }
}