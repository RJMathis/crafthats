import React, { Component } from 'react';
import axios from 'axios';

import ReviewSelector from './ReviewSelector';
import PageSelector from './PageSelector';


export default class Reviews extends Component {
    constructor (props) {
        super (props);
        this.state = {
            reviews: [],
            page: 0,
            numPages: 5,
            pgSize: 10,
            navigate: false,
            sort: "",
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

    sort = (order, e) => {
        if (e) {
            e.preventDefault()
        }
        let limit = this.state.pgSize
        let offset = this.state.page * this.state.pgSize
        let self = this
        this.setState({sort: order})
        axios.get(self.apiUrl+"?order="+order+"&limit="+limit+"&offset="+offset)
            .then((res) => {
                // Set state with result
                self.setState({reviews: res.data.records, totalCount: res.data.totalCount, numPages: res.data.totalCount/self.state.pgSize});
            })
            .catch((error) => {
                console.log(error)
            });
    }

    callAPI = () => {
        let limit = this.state.pgSize
        let offset = this.state.page * this.state.pgSize
        let self = this

        axios.get(self.apiUrl+"?limit="+limit+"&offset="+offset)
            .then((res) => {
                // Set state with result
                self.setState({reviews: res.data.records, totalCount: res.data.totalCount, numPages: res.data.totalCount/self.state.pgSize});

            })
            .catch((error) => {
                console.log(error)
            });
    }

    /* Unmounting
     This method is called when a component is being removed from the DOM:
     * componentWillUnmount()
     */

    componentDidUpdate(prevState, nextState) {
        if (nextState.page !== this.state.page) {
            if (this.state.order !== "") {
                this.sort(this.state.order)
            } else {
                this.callAPI()
            }
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
        // Add column for Brewery
        return (
            <div className="container">
                <strong>{"Sort By: "}</strong>
                <div className="button btn-group">
                    <button type="button" className="btn btn-default" onClick={(e) => this.sort("asc", e)} >Ascending</button>
                    <button type="button" className="btn btn-default" onClick={(e) => this.sort("desc", e)} >Descending</button>
                </div>
                <div className="col-xs-12">
                    <h2 className="sub-header">Beers</h2>
                    <table className="table table-responsive table-striped">
                        <thead>
                        <tr>
                            <th>Beer</th>
                            <th>Date</th>
                            <th>Rating</th>
                        </tr>
                        </thead>
                        <tbody>
                        {reviewRows}
                        </tbody>
                    </table>
                </div>
                <PageSelector handlePageChange={this.handlePageChange}
                              handlePrev={this.handlePrev}
                              handleNext={this.handleNext}
                              numPages={this.state.numPages}
                              navigateTo="/Reviews"/>
            </div>
        );
    }
}
