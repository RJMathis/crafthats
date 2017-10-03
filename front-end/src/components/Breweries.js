import React, { Component } from 'react';

export default class Breweries extends Component {
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
              <div className="row">
                  <div className="col-md-4 container-thumbnail">
                      <div className="text-center">
                          <a href="TheBronxBrewery.html">
                              <img className="img-thumbnail" src="https://s3.amazonaws.com/brewerydbapi/brewery/V0wvf7/upload_j82fbp-squareMedium.png" alt="Beer1 Name" />
                                  <div className="overlay">
                                      <div className="text">The Bronx Brewery</div>
                                  </div>
                          </a>
                      </div>
                  </div>
                  <div className="col-md-4 container-thumbnail">
                      <div className="text-center">
                          <a href="CrownBrewing.html">
                              <img className="img-thumbnail" src="https://s3.amazonaws.com/brewerydbapi/brewery/h88zok/upload_EOwvDQ-squareMedium.png" alt="Beer2 Name" />
                                  <div className="overlay">
                                      <div className="text">Crown Brewing</div>
                                  </div>
                          </a>
                      </div>
                  </div>
                  <div className="col-md-4 container-thumbnail">
                      <div className="text-center">
                          <a href="BrooklynBrewery.html">
                              <img className="img-thumbnail" src="https://s3.amazonaws.com/brewerydbapi/brewery/4OBVPn/upload_gBsb8n-squareMedium.png" alt="Beer3 Name"/>
                                  <div className="overlay">
                                      <div className="text">Brooklyn Brewery</div>
                                  </div>
                          </a>
                      </div>
                  </div>
              </div>
          </div>
      );
    }
}