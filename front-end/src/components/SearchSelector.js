/**
 * Created by travisreed7 on 10/19/17.
 */
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import Highlighter from 'react-highlight-words';

export default class SearchSelector extends Component {
    constructor (props) {
        super (props);
        this.state = {
            item: this.props.item,
            searchTerm: this.props.searchTerm,
            navigate: false,
            navigateTo: this.props.navigateTo
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

    handleNavigation = (e) => {
        e.preventDefault()
        console.log("in handle navigation")
        this.setState({
            navigate: true
        })
    }

    render() {

        if (this.state.navigate) {
            return <Redirect to={{pathname: this.state.navigateTo, state: {item: this.state.item}}} push={true} />;
        }

        let attr1;
        let attr2;
        let attr3;

        if ('organic' in this.state.item) {               // This is a beer item
            attr1 = this.state.item.name
            attr2 = this.state.item.style
            attr3 = this.state.item.brewery

        } else if ('established' in this.state.item) {    // This is a brewery item
            attr1 = this.state.item.name
            attr2 = this.state.item.state
            attr3 = this.state.item.styles

        } else if ('comment' in this.state.item) {    // This is a review item
            attr1 = this.state.item.beer_name
            attr2 = this.state.item.brewery_name
            attr3 = this.state.item.comment

        } else if ('abv_max' in this.state.item) {    // This is a style item
            attr1 = this.state.item.name
            attr2 = ''
            attr3 = truncate(this.state.item.description, 300)

        }

        return (
            <tr className="clickable-row" onClick={this.handleNavigation}>
                <tr>
                    <td><button type="button" className="btn btn-link" onClick={this.handleNavigation}><h3><strong>{attr1}</strong></h3></button></td>
                </tr>
                <tr>
                    <strong>
                        <td className="col-md-2"><Highlighter searchWords={[this.state.searchTerm]} textToHighlight={attr1.toString()} /></td>
                        <td className="col-md-2"><Highlighter searchWords={[this.state.searchTerm]} textToHighlight={attr2.toString()} /></td>
                    </strong>
                </tr>
                <tr>
                    <td className="col-md-10"><Highlighter searchWords={[this.state.searchTerm]} textToHighlight={attr3.toString()} /></td>
                </tr>
            </tr>
        );
    }
}

export const truncate = (str, length = 100, ending = '...') => {
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
    }
    return str;
};
