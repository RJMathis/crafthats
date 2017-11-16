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
            allStates: [],
            allCountries: [],
            selectedState: "",
            selectedCountry: "",
            page: 0,
            numPages: 0,
            totalCount: 0,
            pageLimit: 12,
            sortBy: "",
            pathname: "/Breweries"
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
        this.getStatesCountries()
    }

    handlePageChange = (page, e) => {
        e.preventDefault()
        //return <Redirect to={{pathname: this.state.pathname, state: {page: page}}} push={true} />;
        this.setState({page: page})
    }

    handlePrev = (e) => {
        e.preventDefault()
        if (this.state.page > 0) {
            this.setState({page: this.state.page - 1})
        }
    }

    handleNext = (e) => {
        e.preventDefault()
        if (this.state.page < this.state.numPages - 1) {
            this.setState({page: this.state.page + 1})
        }
    }

    handleCountry = (e) => {
        this.setState({selectedCountry: e.target.value})
    }

    handleState = (e) => {
        this.setState({selectedState: e.target.value})
    }

    sort = (order) => {
        this.setState({sortBy: order})
    }

    callAPI = () => {

        let limit = this.state.pageLimit
        let offset = this.state.page * this.state.pageLimit
        let limOff = "?limit="+limit+"&offset="+offset
        let url = "https://backend-staging-183303.appspot.com/breweries"+limOff

        if (this.state.selectedState !== "All" && this.state.selectedState !== "") {
            url += "&state="+this.state.selectedState
        }
        if (this.state.selectedCountry !== "All" && this.state.selectedCountry !== "") {
            url += "&country="+this.state.selectedCountry
        }
        if (this.state.sortBy !== "") {
            url += "&sortBy="+this.state.sortBy
        }

        console.log(url)

        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with result
                self.setState({breweries: res.data.records, totalCount: res.data.totalCount, numPages: Math.ceil(res.data.totalCount/self.state.pageLimit)});
            })
            .catch((error) => {
                console.log(error)
            });
    }

    getStatesCountries = () => {
        let url = 'https://backend-staging-183303.appspot.com/breweries?limit=1000';
        let states = new Set(["All"])
        let countries = new Set(["All"])

        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with names of styles
                res.data.records.forEach((brewery) => {
                    states.add(brewery.state);
                    countries.add(brewery.country)
                })
                self.setState({allStates: Array.from(states), allCountries: Array.from(countries)});
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

    componentDidUpdate(prevProps, prevState) {

        if (prevState.selectedState !== this.state.selectedState ||
            prevState.selectedCountry !== this.state.selectedCountry ||
            prevState.sortBy !== this.state.sortBy ||
            prevState.page !== this.state.page)
        {
            this.callAPI()
        }

        if (prevState.page !== this.state.page) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        }
    }

    /* Unmounting
        This method is called when a component is being removed from the DOM:
            * componentWillUnmount()
     */

    /* More information about the React.Component lifecyle here: https://reactjs.org/docs/react-component.html */
    render () {
        let stateMenu = []
        let countryMenu = []

        // Create an array of X components with 1 for each brewery gathered from API call
        let breweryComponents = this.state.breweries.map(function(brewery) {
            return (
                <ItemSelector item={brewery} navigateTo="/Brewery"/>
            );
        })

        if (this.state.allCountries !== undefined) {
            stateMenu = this.state.allStates.map((country) => {
                return (
                    <option value={country}>{country}</option>
                );
            })
        }

        if (this.state.allStates !== undefined) {
            countryMenu = this.state.allCountries.map((state) => {
                return (
                    <option value={state}>{state}</option>
                );
            })
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <label>
                            <strong>Sort By: </strong>
                            <div className="button btn-group">
                                <button type="button"
                                        className={this.state.sortBy === "asc" ? "btn btn-sm btn-default active" : "btn btn-sm btn-default"}
                                        onClick={() => this.sort("asc")}>Ascending</button>
                                <button type="button"
                                        className={this.state.sortBy === "desc" ? "btn btn-sm btn-default active" : "btn btn-sm btn-default"}
                                        onClick={() => this.sort("desc")}>Descending</button>
                            </div>
                        </label>
                    </div>
                    <div className="col-md-4">
                        <label>
                            <strong>Country:  </strong>
                        </label>
                        <select value={this.state.selectedCountry} onChange={this.handleCountry}>
                                {countryMenu}
                            </select>
                    </div>
                    <div className="col-md-4">
                        <label>
                            <strong>State:  </strong>
                        </label>
                        <select value={this.state.selectedState} onChange={this.handleState}>
                                {stateMenu}
                            </select>
                    </div>
                </div>
                {/* Break array into separate arrays and wrap each array containing 3 components in a row div */}
                { chunk(breweryComponents, 3).map(function(row) {
                    return (
                        <div className="row">
                            { row }
                        </div>
                    )
                })}
                <PageSelector handlePageChange={this.handlePageChange}
                              handlePrev={this.handlePrev}
                              handleNext={this.handleNext}
                              numPages={this.state.numPages}
                              currentPage={this.state.page}
                              navigateTo="/Breweries"/>
            </div>
        );
    }
}