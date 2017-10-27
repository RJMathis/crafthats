/**
 * Created by travisreed7 on 10/19/17.
 */
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

export default class ReviewSelector extends Component {
    constructor (props) {
        super (props);
        this.state = {
            item: this.props.item,
            navigate: false,
            navigateTo: this.props.navigateTo
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

    handleNavigation = (e) => {
        e.preventDefault()
        this.setState({
            navigate: true
        })
    }

    render() {

        if (this.state.navigate) {
            return <Redirect to={{pathname: this.state.navigateTo, state: {item: this.state.item}}} push={true} />;
        }

        return (
            <tr>
                <td><button type="button" className="btn btn-link" onClick={this.handleNavigation}>{this.state.item.name}</button></td>
                <td>#</td>
                <th>star rating 1</th>
            </tr>
        );
    }
}