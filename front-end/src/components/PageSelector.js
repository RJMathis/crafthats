/**
 * Created by travisreed7 on 10/19/17.
 */
import React, { Component } from 'react';


export default class PageSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentId: 0
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
        let pageNumbers = [];

        for (let i = 0; i < this.props.numPages; i++) {
            pageNumbers.push(
                <li>
                    <a key={i}
                       className={i === this.state.activeId ? "active" : ""}
                       href={this.props.navigateTo}
                       onClick={(e) => this.props.handlePageChange(i, e)}>{i+1}</a>
                </li>);
        }

        return (
            <div className="row">
                <div className="col-md-12 container-thumbnail">
                    <div className="text-center">
                        <ul className="pagination pagination-lg">
                            <li><a href={this.props.navigateTo} onClick={(e) => this.props.handlePrev(e)}>Prev</a></li>
                            {pageNumbers}
                            <li><a href={this.props.navigateTo} onClick={(e) => this.props.handleNext(e)}>Next</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
