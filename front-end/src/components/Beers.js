import React, { Component } from 'react';

export default class Beers extends Component {
  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col-md-4 container-thumbnail">
              <div className="text-center">
                <a href="BronxRyePaleAle.html">
                  <img className="img-thumbnail" src="https://s3.amazonaws.com/brewerydbapi/beer/wSybgO/upload_YO6evM-medium.png" alt="Bronx Rye Pale Ale" title="Bronx Rye Pale Ale"/>
                  <div className="overlay">
                    <div className="text">Bronx Rye Pale Ale</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-md-4 container-thumbnail">
              <div className="text-center">
                <a href="CrownLight.html">
                  <img className="img-thumbnail" src="http://via.placeholder.com/200x200" alt="Crown Light"/>
                  <div className="overlay">
                    <div className="text">Crown Light</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-md-4 container-thumbnail">
              <div className="text-center">
                <a href="BrooklynEastIndiaPaleAle.html">
                  <img className="img-thumbnail" src="https://s3.amazonaws.com/brewerydbapi/beer/Wrh3tC/upload_otteRK-medium.png" alt="Brooklyn East India Pale Ale"/>
                  <div className="overlay">
                    <div className="text">Brooklyn East India Pale Ale</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
    );
  }
}