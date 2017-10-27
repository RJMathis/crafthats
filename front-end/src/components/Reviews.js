import React, { Component } from 'react';
import axios from 'axios';

import ReviewSelector from './ReviewSelector';

export default class Reviews extends Component {
    constructor (props) {
        super (props);
        this.state = {
            reviews: [],
            navigate: false,
            navigateTo: '/Review'
        }
        this.apiUrl = 'https://59ef8ec3684745001253e842.mockapi.io/api/v1/reviews';
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

    componentDidMount() {
        axios.get(this.apiUrl)
            .then((res) => {
                // Set state with result
                this.setState({reviews: res.data});
            });
    }

    /* Unmounting
     This method is called when a component is being removed from the DOM:
     * componentWillUnmount()
     */

    /* More information about the React.Component lifecyle here: https://reactjs.org/docs/react-component.html */

    render() {

        // Create an array of X components with 1 for each Review gathered from API call
        let reviewRows = this.state.reviews.map((review) => {
            return (
                <ReviewSelector item={review} navigateTo="/Review"/>
            );
        })

        return (
            <div className="container">
                <div className="col-xs-12">
                    <h2 className="sub-header">Beers</h2>
                    <table className="table table-responsive table-striped">
                        <thead>
                        <tr>
                            <th>Beer</th>
                            <th>Number of Reviews</th>
                            <th>Rating</th>
                        </tr>
                        </thead>
                        <tbody>
                        {reviewRows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}