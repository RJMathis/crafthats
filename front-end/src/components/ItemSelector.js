/**
 * Created by travisreed7 on 10/19/17.
 */
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

export default class ItemSelector extends Component {
    constructor (props) {
        super (props);
            this.state = {
                image: this.props.image,
                title: this.props.title,
                alt: this.props.alt,
                overlayText: this.props.overlayText,
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

    render() {

        if (this.state.navigate) {
            return <Redirect to={{pathname: this.state.navigateTo}} push={true} />
        }
        return (
            <div className="col-md-4 container-thumbnail">
                <div className="text-center">
                    <div onClick={() => this.setState({navigate: true})}>
                        <img className="img-thumbnail" src={this.state.image} alt={this.state.alt} title={this.state.title} />
                        <div className="overlay">
                            <div className="text">{this.state.overlayText}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}