import React, { Component } from 'react';

export default class Beers extends Component {
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
                    <img className="img-thumbnail" src="http://via.placeholder.com/266x266" alt="Crown Light"/>
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