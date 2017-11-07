/**
 * Created by travisreed7 on 10/19/17.
 */
import React, { Component } from 'react';


export default class PageSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        return (
            <div className="row">
                <div className="col-md-12 container-thumbnail">
                    <div className="text-center">
                        <ul className="pagination pagination-lg">
                            <li><a href={this.state.navigateTo} onClick={(e) => this.props.handlePageChange(0, e)}>1</a></li>
                            <li><a href={this.state.navigateTo} onClick={(e) => this.props.handlePageChange(1, e)}>2</a></li>
                            <li><a href={this.state.navigateTo} onClick={(e) => this.props.handlePageChange(2, e)}>3</a></li>
                            <li><a href={this.state.navigateTo} onClick={(e) => this.props.handlePageChange(3, e)}>4</a></li>
                            <li><a href={this.state.navigateTo} onClick={(e) => this.props.handlePageChange(4, e)}>5</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
