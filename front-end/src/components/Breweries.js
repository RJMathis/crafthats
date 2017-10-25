import React, { Component } from 'react';
import ItemSelector from './ItemSelector';
import PageSelector from './PageSelector';

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
          <div className="container">
              <div className="row">
                  <ItemSelector title="Bronx Brewery" image="https://s3.amazonaws.com/brewerydbapi/brewery/V0wvf7/upload_j82fbp-squareMedium.png" alt="Bronx Brewery" overlayText="The Bronx Brewery"/>
                  <ItemSelector title="Crown Brewing" image="https://s3.amazonaws.com/brewerydbapi/brewery/h88zok/upload_EOwvDQ-squareMedium.png" alt="Crown Brewing" overlayText="Crown Brewing"/>
                  <ItemSelector title="Brooklyn Brewery" image="https://s3.amazonaws.com/brewerydbapi/brewery/4OBVPn/upload_gBsb8n-squareMedium.png" alt="Brooklyn Brewery" overlayText="Brooklyn Brewery"/>
              </div>
              <div className="row">
                  <ItemSelector title="Bronx Brewery" image="https://s3.amazonaws.com/brewerydbapi/brewery/V0wvf7/upload_j82fbp-squareMedium.png" alt="Bronx Brewery" overlayText="The Bronx Brewery"/>
                  <ItemSelector title="Crown Brewing" image="https://s3.amazonaws.com/brewerydbapi/brewery/h88zok/upload_EOwvDQ-squareMedium.png" alt="Crown Brewing" overlayText="Crown Brewing"/>
                  <ItemSelector title="Brooklyn Brewery" image="https://s3.amazonaws.com/brewerydbapi/brewery/4OBVPn/upload_gBsb8n-squareMedium.png" alt="Brooklyn Brewery" overlayText="Brooklyn Brewery"/>
              </div>
              <div className="row">
                  <ItemSelector title="Bronx Brewery" image="https://s3.amazonaws.com/brewerydbapi/brewery/V0wvf7/upload_j82fbp-squareMedium.png" alt="Bronx Brewery" overlayText="The Bronx Brewery"/>
                  <ItemSelector title="Crown Brewing" image="https://s3.amazonaws.com/brewerydbapi/brewery/h88zok/upload_EOwvDQ-squareMedium.png" alt="Crown Brewing" overlayText="Crown Brewing"/>
                  <ItemSelector title="Brooklyn Brewery" image="https://s3.amazonaws.com/brewerydbapi/brewery/4OBVPn/upload_gBsb8n-squareMedium.png" alt="Brooklyn Brewery" overlayText="Brooklyn Brewery"/>
              </div>
              <PageSelector />
          </div>
      );
    }
}