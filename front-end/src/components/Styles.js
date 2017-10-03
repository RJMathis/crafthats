import React, { Component } from 'react';

export default class Styles extends Component {
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
          <div class="page-container">
              <div class="row">
                  <div class="col-md-4 container-thumbnail">
                      <div class="text-center">
                          <a href="RyeAle.html">
                              <img class="img-thumbnail" src="http://via.placeholder.com/200x200" alt="Bronx Rye Pale Ale" title="style 1"/>
                              <div class="overlay">
                                  <div class="text">Rye Ale</div>
                              </div>
                          </a>
                      </div>
                  </div>
                  <div class="col-md-4 container-thumbnail">
                      <div class="text-center">
                          <a href="AmericanIpa.html">
                              <img class="img-thumbnail" src="http://via.placeholder.com/200x200" alt="Style 2"/>
                              <div class="overlay">
                                  <div class="text">American IPA</div>
                              </div>
                          </a>
                      </div>
                  </div>
                  <div class="col-md-4 container-thumbnail">
                      <div class="text-center">
                          <a href="Blonde.html">
                              <img class="img-thumbnail" src="http://via.placeholder.com/200x200" alt="style 3"/>
                              <div class="overlay">
                                  <div class="text">Blonde</div>
                              </div>
                          </a>
                      </div>
                  </div>
              </div>
          </div>
      );
    }
}