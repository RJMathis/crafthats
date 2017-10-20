import React, { Component } from 'react';
import ItemSelector from './ItemSelector';
import PageSelector from './PageSelector';

export default class Beers extends Component {
    constructor (props) {
        super (props);
        this.state = {
            image: 'Default',
            title: 'Default',
            alt: 'Default',
            overlayText: 'Default'
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

    /* More information about the React.Component lifecycle here: https://reactjs.org/docs/react-component.html */

    render() {
      return (
          <div className="container">
              <div className="row">
                  <ItemSelector title="Bronx Rye Pale Ale" image="https://s3.amazonaws.com/brewerydbapi/beer/wSybgO/upload_YO6evM-medium.png" alt="Bronx Rye Pale Ale" overlayText="Bronx Rye Pale Ale"/>
                  <ItemSelector title="Crown Light" image="http://via.placeholder.com/266x266" alt="Crown Light" overlayText="Crown Light"/>
                  <ItemSelector title="Brooklyn East India Pale Ale" image="https://s3.amazonaws.com/brewerydbapi/beer/Wrh3tC/upload_otteRK-medium.png" alt="Brooklyn East India Pale Ale" overlayText="Brooklyn East India Pale Ale"/>
              </div>
              <div className="row">
                  <ItemSelector title="Bronx Rye Pale Ale" image="https://s3.amazonaws.com/brewerydbapi/beer/wSybgO/upload_YO6evM-medium.png" alt="Bronx Rye Pale Ale" overlayText="Bronx Rye Pale Ale"/>
                  <ItemSelector title="Crown Light" image="http://via.placeholder.com/266x266" alt="Crown Light" overlayText="Crown Light"/>
                  <ItemSelector title="Brooklyn East India Pale Ale" image="https://s3.amazonaws.com/brewerydbapi/beer/Wrh3tC/upload_otteRK-medium.png" alt="Brooklyn East India Pale Ale" overlayText="Brooklyn East India Pale Ale"/>
              </div>
              <div className="row">
                  <ItemSelector title="Bronx Rye Pale Ale" image="https://s3.amazonaws.com/brewerydbapi/beer/wSybgO/upload_YO6evM-medium.png" alt="Bronx Rye Pale Ale" overlayText="Bronx Rye Pale Ale"/>
                  <ItemSelector title="Crown Light" image="http://via.placeholder.com/266x266" alt="Crown Light" overlayText="Crown Light"/>
                  <ItemSelector title="Brooklyn East India Pale Ale" image="https://s3.amazonaws.com/brewerydbapi/beer/Wrh3tC/upload_otteRK-medium.png" alt="Brooklyn East India Pale Ale" overlayText="Brooklyn East India Pale Ale"/>
              </div>
              <PageSelector />
          </div>
      );
    }
}