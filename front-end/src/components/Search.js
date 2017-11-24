import React, { Component } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
import {Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import { RingLoader } from 'react-spinners';


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: this.props.allData,
            results: [],
            searchKeys: [],
            searchTerm: "",
            totalCount: 0,
            numPages: 0,
            pgSize: 9,
            loading: false,
            navigate: false
        }
        this.apiUrl = 'https://backend-staging-183303.appspot.com/';
        let beerKeys = ["abv", "ibu", "brewery", "name", "style", "organic"]
        let breweryKeys = ["beers", "city", "country", "description", "established", "name", "state", "styles"]
        let reviewKeys = ["beer_name", "brewery_name", "comment", "date", "rating"]
        let styleKeys = ["abv_max", "abv_min", "breweries", "beers", "description", "ibu_max", "ibu_min", "name", "srm"]
        this.allKeys = beerKeys.concat(breweryKeys).concat(styleKeys).concat(reviewKeys)
    }

    handleSearch = (e) => {
        e.preventDefault()
        this.setState({ searchTerm: this.input.value });
        //this.callAPI()
        this.searchData(this.input.value)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.allData !== this.props.allData) {
            this.setState({
                allData: nextProps.allData
            });
        }
    }

    searchData = (searchTerm) => {
        let options = {
            shouldSort: true,
            threshold: 0.2,
            maxPatternLength: 16,
            minMatchCharLength: 1,
            keys: this.allKeys
        };
        let fuse = new Fuse(this.state.allData, options);
        let result = fuse.search(searchTerm);
        this.setState({ results: result, navigate: true, loading: false });
    }

    render() {

        if (this.state.navigate) {
            this.setState({navigate: false})
            return <Redirect to={{pathname: '/SearchResults', state: {results: this.state.results, searchTerm: this.state.searchTerm}}} push={true} />;
        }
        return (
            <form className="navbar-form navbar-right" onSubmit={this.handleSearch}>
                <div>
                    <div className='sweet-loading'>
                        <RingLoader
                            color={'#003b6f'}
                            loading={this.state.loading}
                        />
                    </div>
                    {this.state.loading ? "Loading..." : ""}
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <input type="text"
                               className="form-control"
                               placeholder="Search"
                               aria-label="Search"
                               ref={(element) => { this.input = element }} />
                            <div className="input-group-btn">
                                <button className="btn btn-default" type="submit">
                                    <i className="glyphicon glyphicon-search"/>
                                </button>
                            </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default withRouter(Search);