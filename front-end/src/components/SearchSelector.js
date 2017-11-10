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
        this.setState({
            navigate: true
        })
    }

    render() {

        if (this.state.navigate) {
            return <Redirect to={{pathname: this.state.navigateTo, state: {item: this.state.item}}} push={true} />;
        }

        let attributes = {}
        let name

        if (this.state.item.type === "beer") {             // This is a beer item
            name = this.state.item.name
            attributes = {
                name: this.state.item.name,
                style: this.state.item.style,
                brewery: this.state.item.brewery,
                abv: this.state.item.abv,
                ibu: this.state.item.ibu,
                organic: this.state.item.organic
            }

        } else if (this.state.item.type === "brewery") {    // This is a brewery item
            name = this.state.item.name
            attributes = {
                name: this.state.item.name,
                state: this.state.item.state,
                styles: this.state.item.styles,
                beers: this.state.item.beers,
                city: this.state.item.city,
                country: this.state.item.country,
                established: this.state.item.established,
                description: this.state.item.description ? truncate(this.state.item.description, 300) : "No description available"
            }

        } else if (this.state.item.type === "review") {    // This is a review item
            name = this.state.item.beer_name
            attributes = {
                beer_name: this.state.item.beer_name,
                brewery_name: this.state.item.brewery_name,
                date: this.state.item.date,
                rating: this.state.item.rating,
                comment: this.state.item.comment ? truncate(this.state.item.comment, 300) : "No comment available"
            }

        } else if (this.state.item.type === "style") {    // This is a style item
            name = this.state.item.name
            attributes = {
                name: this.state.item.name,
                srm: this.state.item.srm,
                beers: this.state.item.beers,
                breweries: this.state.item.breweries,
                abv_min: this.state.item.abv_min,
                abv_max: this.state.item.abv_max,
                ibu_min: this.state.item.ibu_min,
                ibu_max: this.state.item.ibu_max,
                description: this.state.item.description ? truncate(this.state.item.description, 300) : "No description available"
            }
        }

        let self = this
        let searchRows = Object.keys(attributes).map(function(key) {
            return (
                <tr>
                    <td className="col-md-2"><strong>{key + ":  "}</strong><Highlighter searchWords={[self.state.searchTerm]} textToHighlight={attributes[key].toString()} /></td>
                </tr>
            );
        })

        return (
            <tr className="clickable-row" onClick={this.handleNavigation}>
                <tr>
                    <td><button type="button" className="btn btn-link" onClick={this.handleNavigation}><h3><strong>{this.state.item.type} - {name}</strong></h3></button></td>
                </tr>
                {searchRows}
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
