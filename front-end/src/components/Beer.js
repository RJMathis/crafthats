import React, { Component } from 'react';

export default class Beer extends Component {
    constructor (props) {
        super (props);
        this.state = {
            name: this.props.location.state.name,
            item: this.props.location.state.item
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
        console.log(this.state.item);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="text-center">
                            <img  src={this.state.item.image} alt={this.state.item.name} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h2 className="sub-header">{this.state.item.name}</h2>
                        <table className="table table-responsive table-striped">
                            <tbody>
                            <tr>
                                <td>ABV:</td>
                                <td>{this.state.item.abvMax}</td>
                            </tr>
                            <tr>
                                <td>IBU:</td>
                                <td>{this.state.item.ibuMax}</td>
                            </tr>
                            <tr>
                                <td>Brewery:</td>
                                <td><button type="button" className="btn btn-link" onClick={() => console.log('clicked link')}>Brewery Link</button></td>
                            </tr>

                            <tr>
                                <td>Style:</td>
                                <td>Rye Ale</td>
                            </tr>

                            <tr>
                                <td>Review:</td>
                                <td><button type="button" className="btn btn-link" onClick={() => console.log('clicked link')}>Review Link</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}