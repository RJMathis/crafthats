import React, { Component } from 'react';
import chunk from 'lodash.chunk';
import axios from 'axios';

import ItemSelector from './ItemSelector';
import PageSelector from './PageSelector';

export default class Breweries extends Component {
    constructor (props) {
        super (props);
        this.state = {
            breweries: [],
        }
        this.apiUrl = 'https://backend-staging-183303.appspot.com/breweries';
    }

    /* Mounting
        These methods are called when an instance of a component is being created and inserted into the DOM:
            * constructor()
            * componentWillMount()
            * render()
            * componentDidMount()
     */

    componentDidMount() {
        axios.get(this.apiUrl)
            .then((res) => {
                // Set state with result
                this.setState({breweries: res.data});
            });
    }

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

        // Create an array of X components with 1 for each brewery gathered from API call
        let breweryComponents = this.state.breweries.map(function(brewery) {
            return (
                <ItemSelector title={brewery.name}
                              image={brewery.image}
                              alt={brewery.name}
                              overlayText={brewery.name}
                              item={brewery}
                              navigateTo="/Brewery"/>
            );
        })

        return (
            <div className="container">
                {/* Break array into separate arrays and wrap each array containing 3 components in a row div */}
                { chunk(breweryComponents, 3).map(function(row) {
                    return (
                        <div className="row">
                            { row }
                        </div>
                    )
                })}
                <PageSelector />
            </div>
        );
    }
}