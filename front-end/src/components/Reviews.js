import React, { Component } from 'react';
import axios from 'axios';

import ReviewSelector from './ReviewSelector';
import PageSelector from './PageSelector';


export default class Reviews extends Component {
    constructor (props) {
        super (props);
        this.state = {
            reviews: [],
            ratingMenu: ["All", "0+", "1+", "2+", "3+", "4+", "5+"],
            beerMenu: ["All"],
            selectedRating: "",
            selectedBeer: "",
            page: 0,
            numPages: 0,
            totalCount: 0,
            pageLimit: 9,
            sortBy: "",
            navigate: false,
            navigateTo: '/Review'
        }
        this.apiUrl = 'https://backend-staging-183303.appspot.com/reviews';
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

    componentDidMount () {
        this.callAPI()
        this.getBeers()
    }

    handlePageChange = (page) => {
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

    handleRating = (e) => {
        if (e.target.value === "All") {
            this.setState({selectedRating: "All"})
        } else {
            this.setState({selectedRating: e.target.value})
        }
    }

    handleBeer = (e) => {
        this.setState({selectedBeer: e.target.value})
    }

    sort = (order) => {
        this.setState({sortBy: order})
    }

    callAPI = () => {

        let limit = this.state.pageLimit
        let offset = this.state.page * this.state.pageLimit
        let limOff = "?limit="+limit+"&offset="+offset
        let url = "https://backend-staging-183303.appspot.com/reviews"+limOff

        if (this.state.selectedRating !== "All" && this.state.selectedRating !== "") {
            url += "&rating="+this.state.selectedRating
        }
        if (this.state.selectedBeer !== "All" && this.state.selectedBeer !== "") {
            url += "&beer_name="+this.state.selectedBeer
        }
        if (this.state.sortBy !== "") {
            url += "&sort_by="+this.state.sortBy
        }

        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with result
                self.setState({reviews: res.data.records, totalCount: res.data.totalCount, numPages: Math.ceil(res.data.totalCount/self.state.pageLimit)});
            })
            .catch((error) => {
                console.log(error)
            });
    }

    getBeers = () => {
        let url = 'https://backend-staging-183303.appspot.com/beers?limit=500';
        let beers = ["All"]

        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with names of styles
                res.data.records.map((beer) => {
                    return beers.push(beer.name)
                })
                self.setState({beerMenu: beers});
            })
            .catch((error) => {
                console.log(error)
            });
    }

    /* Unmounting
     This method is called when a component is being removed from the DOM:
     * componentWillUnmount()
     */

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedRating !== this.state.selectedRating ||
            prevState.selectedBeer !== this.state.selectedBeer ||
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

    /* More information about the React.Component lifecyle here: https://reactjs.org/docs/react-component.html */

    render() {

        // Create an array of X components with 1 for each Review gathered from API call
        let reviewRows = this.state.reviews.map((review) => {
            return (
                <ReviewSelector item={review} navigateTo="/Review"/>
            );
        })

        let ratingMenu = this.state.ratingMenu.map((rating) => {
            return (
                <option value={rating}>{rating}</option>
            );
        })

        let beerMenu = this.state.beerMenu.map((beer) => {
            return (
                <option value={beer}>{beer}</option>
            );
        })

        // Add column for Brewery
        return (
            <div className="container sub-container">
                <div className="row">
                    <div className="col-md-4">
                        <label>
                            <strong>Rating:  </strong>
                        </label><span> </span>
                        <select value={this.state.selectedRating} onChange={this.handleRating}>
                             {ratingMenu}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label>
                            <strong>Beer:  </strong>
                        </label><span> </span>
                        <select value={this.state.selectedBeer} onChange={this.handleBeer}>
                            {beerMenu}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <h2 className="sub-header">Reviews</h2>
                        <table className="table table-responsive table-striped">
                            <thead>
                            <tr>
                                <th>Beer</th>
                                <th>Image</th>
                                <th>Date</th>
                                <th>Rating
                                    <div className="button btn-table-group btn-group">
                                        <button type="button"
                                                className={this.state.order === "asc" ? "btn btn-default active" : "btn btn-table btn-default"}
                                                onClick={(e) => this.sort("desc", e)}><i className="fa fa-arrow-up" aria-hidden="true"/></button>
                                        <button type="button"
                                                className={this.state.order === "desc" ? "btn btn-default active" : "btn btn-table btn-default"}
                                                onClick={(e) => this.sort("asc", e)}><i className="fa fa-arrow-down" aria-hidden="true"/></button>
                                    </div>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {reviewRows}
                            </tbody>
                        </table>
                    </div>
                </div>
                <PageSelector handlePageChange={this.handlePageChange}
                              handlePrev={this.handlePrev}
                              handleNext={this.handleNext}
                              numPages={this.state.numPages}
                              currentPage={this.state.page}
                              navigateTo="/Reviews"/>
            </div>
        );
    }
}
