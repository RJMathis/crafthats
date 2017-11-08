import React, { Component } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
import {Redirect} from 'react-router-dom';


export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: [],
            results: [],
            searchTerm: "",
            totalCount: 0,
            numPages: 0,
            pgSize: 9,
            navigate: false
        }
        this.apiUrl = 'https://backend-staging-183303.appspot.com/';
    }

    handleSearch = (e) => {
        if (e) {
            e.preventDefault()
        }
        this.setState({ searchTerm: this.input.value });
        console.log("in handle search")
        this.callAPI()
    }

    callAPI = () => {
        let self = this

        axios.get(self.apiUrl+"/beers?limit=500")
            .then((res) => {
                // Set state with result
                console.log(res.data.records)
                self.searchData(res.data.records)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    searchData = (records) => {
        let options = {
            shouldSort: true,
            threshold: 0.2,
            maxPatternLength: 16,
            minMatchCharLength: 1,
            keys: [
                "abv",
                "brewery",
                "name",
                "style",
                "ibu"
            ]
        };
        console.log("records")
        console.log(records)
        let fuse = new Fuse(records, options);
        let result = fuse.search(this.state.searchTerm);
        console.log("result")
        console.log(result)
        this.setState({ results: result, navigate: true });
    }


    render() {

        if (this.state.navigate) {
            console.log("navigating")
            console.log(this.state.results)
            return <Redirect to={{pathname: '/SearchResults', state: {results: this.state.results}}} push={true} />;
        }
        return (
            <form onSubmit={this.handleSearch} className="form-inline ml-auto">
                <input className="form-control mr-sm-2"
                       type="text"
                       placeholder="Search"
                       aria-label="Search"
                       ref={(element) => { this.input = element }}
                />
                <button className="btn btn-primary btn-sm my-0" type="submit">Search</button>
            </form>
        );
    }
}