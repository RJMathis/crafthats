import React, { Component } from 'react';
import Beer from './Beer';
import Brewery from './Brewery';
import Style from './Style';
import Review from './Review';


export default class Result extends Component {
    constructor (props) {
        super (props);
        this.state = {
            item: this.props.location.state.item
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

        if ('organic' in this.state.item) {               // This is a beer item
            return <Beer item={this.state.item} />
        } else if ('established' in this.state.item) {    // This is a brewery item
            return <Brewery item={this.state.item} />
        } else if ('comment' in this.state.item) {        // This is a review item
            return <Review item={this.state.item} />
        } else if ('abv_max' in this.state.item) {        // This is a style item
            return <Style item={this.state.item} />
        }
    }
}