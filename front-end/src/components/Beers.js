import React, { Component } from 'react';

export default class Beers extends Component {
  render() {
    return (
        <div class="container">
          <div class="row">
            <div class="col-md-4 container-thumbnail">
              <div class="text-center">
                <a href="BronxRyePaleAle.html">
                  <img class="img-thumbnail" src="https://s3.amazonaws.com/brewerydbapi/beer/wSybgO/upload_YO6evM-medium.png" alt="Bronx Rye Pale Ale" title="Bronx Rye Pale Ale"/>
                  <div class="overlay">
                    <div class="text">Bronx Rye Pale Ale</div>
                  </div>
                </a>
              </div>
            </div>
            <div class="col-md-4 container-thumbnail">
              <div class="text-center">
                <a href="CrownLight.html">
                  <img class="img-thumbnail" src="http://via.placeholder.com/200x200" alt="Crown Light"/>
                  <div class="overlay">
                    <div class="text">Crown Light</div>
                  </div>
                </a>
              </div>
            </div>
            <div class="col-md-4 container-thumbnail">
              <div class="text-center">
                <a href="BrooklynEastIndiaPaleAle.html">
                  <img class="img-thumbnail" src="https://s3.amazonaws.com/brewerydbapi/beer/Wrh3tC/upload_otteRK-medium.png" alt="Brooklyn East India Pale Ale"/>
                  <div class="overlay">
                    <div class="text">Brooklyn East India Pale Ale</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
    );
  }
}