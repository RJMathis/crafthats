import React, { Component } from 'react';
import ItemSelector from './ItemSelector';
import PageSelector from './PageSelector';

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
          <div className="container">
              <div className="row">
                  <ItemSelector title="Rye Ale" image="http://via.placeholder.com/266x266" alt="Rye Ale" overlayText="Rye Ale"/>
                  <ItemSelector title="American IPA" image="http://via.placeholder.com/266x266" alt="American IPA" overlayText="American IPA"/>
                  <ItemSelector title="Blonde" image="http://via.placeholder.com/266x266" alt="Blonde" overlayText="Blonde"/>
              </div>
              <div className="row">
                  <ItemSelector title="Rye Ale" image="http://via.placeholder.com/266x266" alt="Rye Ale" overlayText="Rye Ale"/>
                  <ItemSelector title="American IPA" image="http://via.placeholder.com/266x266" alt="American IPA" overlayText="American IPA"/>
                  <ItemSelector title="Blonde" image="http://via.placeholder.com/266x266" alt="Blonde" overlayText="Blonde"/>
              </div>
              <div className="row">
                  <ItemSelector title="Rye Ale" image="http://via.placeholder.com/266x266" alt="Rye Ale" overlayText="Rye Ale"/>
                  <ItemSelector title="American IPA" image="http://via.placeholder.com/266x266" alt="American IPA" overlayText="American IPA"/>
                  <ItemSelector title="Blonde" image="http://via.placeholder.com/266x266" alt="Blonde" overlayText="Blonde"/>
              </div>
              <PageSelector/>
          </div>
      );
    }
}