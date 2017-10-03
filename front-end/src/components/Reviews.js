import React, { Component } from 'react';

export default class Reviews extends Component {
    constructor (props) {
        super (props);
        this.state = {
            attribute1: '',
            attribute2: ''
        }
    }

    /* Mounting
        These methods are called when an instance of a component is being created and inserted into the DOM:
            * constructor()
            * componentWillMount()
            * render()
            * componentDidMount()
     */

    /* Updating
        An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:
            * componentWillReceiveProps()
            * shouldComponentUpdate()
            * componentWillUpdate()
            * render()
            * componentDidUpdate()
     */

    /* Unmounting
        This method is called when a component is being removed from the DOM:
            * componentWillUnmount()
     */

    /* More information about the React.Component lifecyle here: https://reactjs.org/docs/react-component.html */

    render() {
      return (
          <div className="page-container">
              <div className="col-xs-6">
                  <h2 className="sub-header">Beers</h2>
                  <table className="table table-responsive table-striped">
                      <thead>
                      <tr>
                          <th>Beer</th>
                          <th>Number of Reviews</th>
                          <th>Rating</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                          <td><a href="BronxRyePaleAleReview.html">Bronx Rye Pale Ale</a></td>
                          <td>#</td>
                          <th>star rating 1</th>
                      </tr>
                      <tr>
                          <td><a href="CrownLightReview.html">Crown Light</a></td>
                          <td>#</td>
                          <th>star rating 2</th>
                      </tr>
                      <tr>
                          <td><a href="BrooklynEastIndiaPaleAleReview.html">Brooklyn East India Pale Ale</a></td>
                          <td>#</td>
                          <th>star rating 3</th>
                      </tr>
                      </tbody>
                  </table>
              </div>

              <div className="col-xs-6">
                  <h2 className="sub-header">Breweries</h2>
                  <table className="table table-responsive table-striped">
                      <thead>
                      <tr>
                          <th>Brewery</th>
                          <th>Number of Reviews</th>
                          <th>Rating</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                          <td><a href="TheBronxBreweryReview.html">The Bronx Brewery</a></td>
                          <td>#</td>
                          <th>star rating 1</th>
                      </tr>
                      <tr>
                          <td><a href="CrownBrewingReview.html">Crown Brewing</a></td>
                          <td>#</td>
                          <th>star rating 2</th>
                      </tr>
                      <tr>
                          <td><a href="BrooklynBreweryReview.html">Brooklyn Brewery</a></td>
                          <td>#</td>
                          <th>star rating 3</th>
                      </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      );
    }
}