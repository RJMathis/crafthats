import React, { Component } from 'react';

export default class Brewery extends Component {
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
                            <img  src="https://s3.amazonaws.com/brewerydbapi/brewery/V0wvf7/upload_j82fbp-squareLarge.png" alt="..." />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h2 className="sub-header">The Bronx Brewery</h2>
                        <table className="table table-responsive table-striped">
                            <tbody>
                            <tr>
                                <td>State:</td>
                                <td>New York</td>
                            </tr>
                            <tr>
                                <td>City:</td>
                                <td>Bronx</td>
                            </tr>
                            <tr>
                                <td>Description:</td>
                                <td>Were a small craft brewery in the South Bronx, New York and have a maniacal love for two things in this world: beer and the Bronx. Cheers! The Bronx Brewery is a craft brewer and distributor based in the South Bronx. It launched in 2011 by a small team with two things in common: a maniacal focus on creating high-quality beer and a passion for the Bronx. Its traditionally-crafted ales use only premium and minimally-processed materials to create fresh, bold beer from a borough known for its own uniquely bold character. The team is enthused to bring a rich brewing tradition back to the Bronx and craft a beer that the people of the Bronx and New York City can be proud to call their own.</td>
                            </tr>
                            <tr>
                                <td>Established:</td>
                                <td>2011</td>
                            </tr>
                            <tr>
                                <td>Website:</td>
                                <td><a href="http://www.thebronxbrewery.com">http://www.thebronxbrewery.com</a></td>
                            </tr>

                            <tr>
                                <td>Styles:</td>
                                <td><a href="RyeAle.html">Rye Ale</a></td>
                            </tr>

                            <tr>
                                <td><a href="TheBronxBreweryReview.html">Review:</a></td>
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
