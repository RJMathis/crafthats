import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';


export default class Review extends Component {
    constructor (props) {
        super (props);
        let item;
        if ('location' in this.props) {
            item = this.props.location.state.item
        } else {
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

    componentDidMount () {
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

    // callAPI = () => {
    //     let url
    //     if (this.props.location.state.selectedId !== undefined) {
    //         url = "https://backend-staging-183303.appspot.com/beers/"+this.props.location.state.selectedId
    //     } else {
    //         url = "https://backend-staging-183303.appspot.com/beers/"+this.state.item.id
    //     }
    //
    //     console.log(url)
    //
    //     let self = this
    //     axios.get(url)
    //         .then((res) => {
    //             // Set state with result
    //             console.log(res.data)
    //             self.setState({item: res.data});
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         });
    // }

    handleBeerNavigation = (e) => {
        e.preventDefault()
        this.setState({
            navigate: true,
            navigateTo: "/Beer",
            selectedId: this.state.item.beer_id
        })
    }
    handleBreweryNavigation = (e) => {
        e.preventDefault()
        this.setState({
            navigate: true,
            navigateTo: "/Brewery",
            selectedId: this.state.item.brewery_id
        })
    }

    render() {
        if (this.state.navigate) {
            return <Redirect to={{pathname: this.state.navigateTo, state: {selectedId: this.state.selectedId}}} push={true} />;
        }

        return (
            <div className="container sub-container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="text-center">
                            <img className="img-thumbnail" src={this.state.item.image} alt={this.state.item.name} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h2 className="sub-header">{this.state.item.beer_name}</h2>
                        <table className="table table-responsive table-striped">
                            <tbody>
                            <tr>
                                <td>Rating:</td>
                                <td>{this.state.item.rating}</td>
                            </tr>
                            <tr>
                                <td>Beer:</td>
                                <td><button type="button" className="btn btn-link" onClick={this.handleBeerNavigation}>{this.state.item.beer_name}</button></td>
                            </tr>
                            <tr>
                                <td>Brewery:</td>
                                <td><button type="button" className="btn btn-link" onClick={this.handleBreweryNavigation}>{this.state.item.brewery_name}</button></td>
                            </tr>
                            <tr>
                                <td>Review:</td>
                                <td>{this.state.item.comment}</td>
                            </tr>
                            <tr>
                                <td>Review Date:</td>
                                <td>{this.state.item.date}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}