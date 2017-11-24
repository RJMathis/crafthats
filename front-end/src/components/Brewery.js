import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

export default class Brewery extends Component {
    constructor (props) {
        super (props);
        console.log(this.props)
        let item = "";
        if ('location' in this.props  && this.props.location.state.item !== undefined) {
            item = this.props.location.state.item
        } else if (this.props.item !== undefined) {
            item = this.props.item
        }
        this.state = {
            item: item,
            selectedId: "",
            navigate: false,
            navigateTo: ""
        }
    }

    /* Mounting
     These methods are called when an instance of a component is being created and inserted into the DOM:
     * constructor()
     * componentWillMount()
     * render()
     * componentDidMount()
     */

    componentDidMount() {
        this.callAPI()
    }

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

    handleBeerNavigation = (beerId, e) => {
        console.log(beerId)
        e.preventDefault()
        this.setState({
            navigate: true,
            selectedId: beerId,
            navigateTo: "/Beer"
        })
    }

    handleStyleNavigation = (styleId, e) => {
        console.log(styleId)
        e.preventDefault()
        this.setState({
            navigate: true,
            selectedId: styleId,
            navigateTo: "/Style"
        })
    }

    callAPI = () => {
        console.log(this.state)
        let url
        if (this.props.location.state.selectedId !== undefined) {
            url = "https://backend-staging-183303.appspot.com/breweries/"+this.props.location.state.selectedId
        } else {
            url = "https://backend-staging-183303.appspot.com/breweries/"+this.state.item.id
        }

        console.log(url)

        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with result
                console.log(res.data)
                self.setState({item: res.data});
            })
            .catch((error) => {
                console.log(error)
            });
    }

    render() {

       if (this.state.navigate) {
            return <Redirect to={{pathname: this.state.navigateTo, state: {selectedId: this.state.selectedId}}} push={true} />;
        }

        console.log(this.state.item)
        let beerLinks, styleLinks
        if (this.state.item !== "") {
            beerLinks = this.state.item.beers.map((beer, index) => {
                return (
                    <div>
                        <button type="button" className="btn btn-link" onClick={(e) => this.handleBeerNavigation(this.state.item.beer_ids[index], e)}>{beer}, </button>
                    </div>
                );
            })

            styleLinks = this.state.item.styles.map((style, index) => {
                return (
                    <div>
                        <button type="button" className="btn btn-link" onClick={(e) => this.handleStyleNavigation(this.state.item.style_ids[index], e)}>{style}, </button>
                    </div>
                );
            })

            return (
                <div className="container sub-container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="text-center">
                                <img className="img-thumbnail" src={this.state.item.image === undefined ? this.state.item.images : this.state.item.image} alt={this.state.item.name}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h2 className="sub-header">{this.state.item.name}</h2>
                            <table className="table table-responsive table-striped">
                                <tbody>
                                <tr>
                                    <td>State:</td>
                                    <td>{this.state.item.state}</td>
                                </tr>
                                <tr>
                                    <td>City:</td>
                                    <td>{this.state.item.city}</td>
                                </tr>
                                <tr>
                                    <td>Description:</td>
                                    <td>{this.state.item.description ? this.state.item.description : "No Description Available"}</td>
                                </tr>
                                <tr>
                                    <td>Established:</td>
                                    <td>{this.state.item.established}</td>
                                </tr>
                                <tr>
                                    <td>Website:</td>
                                    <td><a href={this.state.item.website}>{this.state.item.website}</a></td>
                                </tr>
                                <tr>
                                    <td>Beers:</td>
                                    <td>{beerLinks}</td>
                                </tr>
                                <tr>
                                    <td>Styles:</td>
                                    <td>{styleLinks}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>loading...</div>
            )
        }
    }
}
