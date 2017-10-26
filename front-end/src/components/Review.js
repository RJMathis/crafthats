import React, { Component } from 'react';

export default class Review extends Component {
    constructor (props) {
        super (props);
        this.state = {
            abv: 'Default',
            ibu: 'Default',
            brewery: 'Default',
            style: 'Default',
            review: 'Default'
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
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="text-center">
                            <img  src="http://via.placeholder.com/300x300" alt="..." />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h2 className="sub-header">The Bronx Brewery Review</h2>
                        <table className="table table-responsive table-striped">
                            <tbody>
                            <tr>
                                <td>Reviewer:</td>
                                <td>Sample</td>
                            </tr>
                            <tr>
                                <td>Location:</td>
                                <td>Sample</td>
                            </tr>
                            <tr>
                                <td><a href="BronxRyePaleAle.html">Beer:</a></td>
                                <td>Sample</td>
                            </tr>
                            <tr>
                                <td><a href="TheBronxBrewery.html">Brewery:</a></td>
                                <td>Sample</td>
                            </tr>

                            <tr>
                                <td>Review:</td>
                                <td>Sample</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}