import React, { Component } from 'react';
import lodash from 'lodash';
import axios from 'axios';

import ItemSelector from './ItemSelector';
import PageSelector from './PageSelector';

export default class Breweries extends Component {
    constructor (props) {
        super (props);
        this.state = {
            breweries: [],
            page: 0,
            prevPage: 0,
            nextPage: 0
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

    componentDidMount () {
        this.callAPI()
    }

    handlePageChange = (page) => {
        console.log("in handlePageChange")
        this.setState({page: page})
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

    }

    callAPI = () => {
        let limit = 9
        let offset = this.state.page * 9
        let self = this

        axios.get(self.apiUrl+"?limit="+limit+"&offset="+offset)
            .then((res) => {
                // Set state with result
                self.setState({breweries: res.data});
            })
            .catch((error) => {
                console.log(error)
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

    componentWillUpdate() {
        this.callAPI()
    }

    /* Unmounting
        This method is called when a component is being removed from the DOM:
            * componentWillUnmount()
     */

    /* More information about the React.Component lifecyle here: https://reactjs.org/docs/react-component.html */
    render () {
        // Create an array of X components with 1 for each brewery gathered from API call
        let breweryComponents = this.state.breweries.map(function(brewery) {
            return (
                <ItemSelector item={brewery}
                              navigateTo="/Brewery"/>
            );
        })

        return (
            <div className="container">
                {/* Break array into separate arrays and wrap each array containing 3 components in a row div */}
                { lodash.chunk(breweryComponents, 3).map(function(row) {
                    return (
                        <div className="row">
                            { row }
                        </div>
                    )
                })}
                <PageSelector handlePageChange={this.handlePageChange}/>
            </div>
        );
    }
}