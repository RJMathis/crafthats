import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';


export default class Beer extends Component {
    constructor (props) {
        super (props);
        let item;
        if ('location' in this.props) {
            item = this.props.location.state.item
        } else {
            item = this.props.item
        }
        this.state = {
            item: item,
            reviews: [],
            totalCount: 0,
            selectedReview: "",
            navigate: false
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

    componentDidMount () {
        this.getReviews()
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

    getReviews = () => {
        let url = "https://backend-staging-183303.appspot.com/reviews/beer/" + this.state.item.name
        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with result
                self.setState({reviews: res.data.records, totalCount: res.data.length});
            })
            .catch((error) => {
                console.log(error)
            });
    }

    handleNavigation = (review, e) => {
        e.preventDefault()
        this.setState({
            navigate: true,
            selectedReview: review
        })
    }

    /* More information about the React.Component lifecycle here: https://reactjs.org/docs/react-component.html */

    render() {

        if (this.state.navigate) {
            return <Redirect to={{pathname: "/Review", state: {item: this.state.selectedReview}}} push={true} />;
        }

        let beerReviews
        if (this.state.totalCount > 0) {
            let self = this
             beerReviews = this.state.reviews.map(function(review) {
                 review.image = self.state.item.image
                return (
                    <tr className="clickable-row" onClick={(e) => self.handleNavigation(review, e)}>
                        <td><strong>{review.rating}</strong></td>
                        <td>{truncate(review.comment)}</td>
                    </tr>
                );
            })
        } else {
            beerReviews = "No reviews are currently available for this beer"
        }

        return (
            <div className="container sub-container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="text-center">
                            <img   className="img-thumbnail" src={this.state.item.image} alt={this.state.item.name} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h2 className="sub-header">{this.state.item.name}</h2>
                        <table className="table table-responsive table-striped">
                            <tbody>
                            <tr>
                                <td>ABV:</td>
                                <td>{this.state.item.abv}</td>
                            </tr>
                            <tr>
                                <td>IBU:</td>
                                <td>{this.state.item.ibu}</td>
                            </tr>
                            <tr>
                                <td>Brewery:</td>
                                <td>{this.state.item.brewery}</td>
                            </tr>
                            <tr>
                                <td>Style:</td>
                                <td>{this.state.item.style}</td>
                            </tr>
                            </tbody>
                        </table>
                        <h3 className="sub-header">Reviews</h3>
                        <table className="table table-responsive table-hover">
                            <thead>
                            <tr>
                                <th>Rating</th>
                                <th>Comment</th>
                            </tr>
                            </thead>
                            <tbody>
                            {beerReviews}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export const truncate = (str, length = 100, ending = '...') => {
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
    }
    return str;
};