import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

export default class Reviews extends Component {
    constructor (props) {
        super (props);
        this.state = {
            attribute1: '',
            attribute2: '',
            navigate: false,
            navigateTo: '/Review'
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

    /* More information about the React.Component lifecyle here: https://reactjs.org/docs/react-component.html */

    render() {
        if (this.state.navigate) {
            return <Redirect to={{pathname: this.state.navigateTo}} push={true} />
        }
        return (
            <div className="container">
                <div className="col-xs-6">
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
                        <tr>
                            <td><button type="button" className="btn btn-link" onClick={() => this.setState({navigate: true})}>Bronx Rye Pale Ale</button></td>
                            <td>#</td>
                            <th>star rating 1</th>
                        </tr>
                        <tr>
                            <td><button type="button" className="btn btn-link" onClick={() => this.setState({navigate: true})}>Crown Light</button></td>
                            <td>#</td>
                            <th>star rating 2</th>
                        </tr>
                        <tr>
                            <td><button type="button" className="btn btn-link" onClick={() => this.setState({navigate: true})}>Brooklyn East India Pale Ale</button></td>
                            <td>#</td>
                            <th>star rating 3</th>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="col-xs-6">
                    <h2 className="sub-header">Breweries</h2>
                    <table className="table table-responsive table-striped">
                        <thead>
                        <tr>
                            <th>Brewery</th>
                            <th>Number of Reviews</th>
                            <th>Rating</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><button type="button" className="btn btn-link" onClick={() => this.setState({navigate: true})}>The Bronx Brewery</button></td>
                            <td>#</td>
                            <th>star rating 1</th>
                        </tr>
                        <tr>
                            <td><button type="button" className="btn btn-link" onClick={() => this.setState({navigate: true})}>Crown Brewing</button></td>
                            <td>#</td>
                            <th>star rating 2</th>
                        </tr>
                        <tr>
                            <td><button type="button" className="btn btn-link" onClick={() => this.setState({navigate: true})}>Brooklyn Brewery</button></td>
                            <td>#</td>
                            <th>star rating 3</th>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}