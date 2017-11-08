import React, { Component } from 'react';

export default class Style extends Component {
    constructor (props) {
        super (props);
        this.state = {
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
                        <h2 className="sub-header">{this.state.name}</h2>
                        <table className="table table-responsive table-striped">
                            <tbody>
                            <tr>
                                <td>Type:</td>
                                <td>North American Origin Ales</td>
                            </tr>
                            <tr>
                                <td>Description:</td>
                                <td>Golden or Blonde ales are straw to golden blonde in color. They have a crisp, dry palate, light to medium body, and light malt sweetness. Low to medium hop aroma may be present but does not dominate. Bitterness is low to medium. Fruity esters may be perceived but do not predominate. Diacetyl should not be perceived. Chill haze should be absent.</td>
                            </tr>
                            <tr>
                                <td>IBU(min - max):</td>
                                <td>15 - 25</td>
                            </tr>

                            <tr>
                                <td>ABV(min - max):</td>
                                <td>4 - 5</td>
                            </tr>

                            <tr>
                                <td>Beers:</td>
                                <td><a href="CrownLight.html">Crown Light</a></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}