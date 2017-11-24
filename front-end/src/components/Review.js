import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';


export default class Review extends Component {
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
            navigate: false,
            navigateTo: ''
        }
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
        if (this.state.navigate) {
            return <Redirect to={{pathname: this.state.navigateTo}} push={true} />
        }
        return (
            <div className="container sub-container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="text-center">
                            <img className="img-thumbnail" src={this.state.item.image} alt={this.state.item.name} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h2 className="sub-header">{this.state.item.beer_name}</h2>
                        <table className="table table-responsive table-striped">
                            <tbody>
                            <tr>
                                <td>Rating:</td>
                                <td>{this.state.item.rating}</td>
                            </tr>
                            <tr>
                                <td>Beer:</td>
                                <td>{this.state.item.beer_name}</td>
                            </tr>
                            <tr>
                                <td>Brewery:</td>
                                <td>{this.state.item.brewery_name}</td>
                            </tr>
                            <tr>
                                <td>Comment:</td>
                                <td>{this.state.item.comment}</td>
                            </tr>
                            <tr>
                                <td>Date of Comment:</td>
                                <td>{this.state.item.date}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}