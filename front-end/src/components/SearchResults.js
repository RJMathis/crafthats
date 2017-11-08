import React, { Component } from 'react';
import chunk from 'lodash.chunk';

import ItemSelector from './ItemSelector';
import PageSelector from './PageSelector';

export default class SearchResults extends Component {
    constructor (props) {
        super (props);
        console.log(this.props.location.state.results)
        this.state = {
            results: this.props.location.state.results,
            page: 0,
            numPages: 5,
            pgSize: 10,
            pathname: "/Beers"
        }
        this.apiUrl = 'https://backend-staging-183303.appspot.com/beers';
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

        // Create an array of X components with 1 for each result gathered from Search
        let resultComponents = this.state.results.map(function(result) {
            return (
                <ItemSelector item={result} navigateTo="/Beer"/>
            );
        })

        return (
            <div className="container">
                {/* Break array into separate arrays and wrap each array containing 3 components in a row div */}
                { chunk(resultComponents, 3).map(function(row) {
                    return (
                        <div className="row">
                            { row }
                        </div>
                    )
                })}
                <PageSelector numPages={this.state.numPages} navigateTo="/SearchResults"/>
            </div>
        );
    }
}