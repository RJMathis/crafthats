import React, { Component } from 'react';

export default class Beers extends Component {
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
                            <img  src="https://s3.amazonaws.com/brewerydbapi/beer/wSybgO/upload_YO6evM-large.png" alt="..." />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h2 className="sub-header">Bronx Rye Pale Ale</h2>
                        <table className="table table-responsive table-striped">
                            <tbody>
                            <tr>
                                <td>ABV:</td>
                                <td>6.3</td>
                            </tr>
                            <tr>
                                <td>IBU:</td>
                                <td>58</td>
                            </tr>
                            <tr>
                                <td>Brewery:</td>
                                <td><a href="">The Bronx Brewery</a></td>
                            </tr>

                            <tr>
                                <td>Style:</td>
                                <td>Rye Ale</td>
                            </tr>

                            <tr>
                                <td><a href="">Review:</a></td>
                                <td>Star Rating</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}