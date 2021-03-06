import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

export default class Style extends Component {
    constructor (props) {
        let srmArray = [ '#FDE69D', '#FCD87F', '#FCCA63', '#FBC050',
                '#F5B238', '#F3A728', '#EC9D26', '#E48F23', 
                '#E18822', '#D87E1F', '#D1741D', '#C96C1B', 
                '#C4641A', '#BD5C18', '#B45315', '#AE4F14', 
                '#AA4713', '#A04011', '#9A390F', '#94350E', 
                '#8F2F0D', '#8A2D0D', '#82260B', '#7D200A', 
                '#761D09', '#711C07', '#6B1607', '#661006', 
                '#611006', '#5A0E05', '#540D05', '#5C0B06', 
                '#4E0B0B', '#490708', '#430808', '#410909', 
                '#3B0A0A', '#380809', '#38080C', '#34090B'];
        let srmVal;

        super (props);
        let item = "";
        if ('location' in this.props && this.props.location.state.item !== undefined) {
            item = this.props.location.state.item
            srmVal = this.props.location.state.item.srm
        } else if (this.props.item !== undefined) {
            item = this.props.item
            srmVal = this.props.item.srm
        }
        this.state = {
            item: item,
            srmHex: srmArray[Math.round(srmVal) - 1],
            srmColors: srmArray,
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
        e.preventDefault()
        this.setState({
            navigate: true,
            selectedId: beerId,
            navigateTo: "/Beer"
        })
    }

    handleBreweryNavigation = (breweryId, e) => {
        e.preventDefault()
        this.setState({
            navigate: true,
            selectedId: breweryId,
            navigateTo: "/Brewery"
        })
    }

    callAPI = () => {
        let url = "https://backend-staging-183303.appspot.com/styles/"+this.props.location.state.selectedId

        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with result
                self.setState({item: res.data, srmHex: this.state.srmColors[Math.round(res.data.srm) - 1],});
            })
            .catch((error) => {
                console.log(error)
            });
    }

    render() {

        if (this.state.navigate) {
            return <Redirect to={{pathname: this.state.navigateTo, state: {selectedId: this.state.selectedId}}} push={true} />;
        }

        let beerLinks, breweryLinks
        if (this.state.item !== "") {
            beerLinks = this.state.item.beers.map((beer, index) => {
                return (
                    <div className="text-center">
                        <button type="button" className="btn btn-link"
                                onClick={(e) => this.handleBeerNavigation(this.state.item.beer_ids[index], e)}>{beer}
                        </button>
                    </div>
                );
            })

            breweryLinks = this.state.item.breweries.map((brewery, index) => {
                return (
                    <div className="text-center">
                        <button type="button" className="btn btn-link"
                                onClick={(e) => this.handleBreweryNavigation(this.state.item.brewery_ids[index], e)}>{brewery}
                        </button>
                    </div>
                );
            })

            return (
                <div className="container sub-container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="text-center">
                                <div className="img-thumbnail img-thumbnail-sm style-image" alt={this.state.item.name}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="175" height="333"
                                         viewBox="0 0 264 504.7" className="beerGlass js-beerGlass">
                                        <path className="foam"
                                              d="M231.7 49.3c-4.3 0-8.3 1.2-11.7 3.2-1.4-17.1-15.7-30.5-33.1-30.5-11.3 0-21.2 5.6-27.2 14.2C150.2 16.6 130.2 3 107 3 81.2 3 59.3 19.8 51.7 43c-3.5-1.5-7.3-2.3-11.3-2.3-16 0-29 13-29 29h243.2c-1.3-11.5-11.1-20.4-22.9-20.4z"/>
                                        <path className="glass" d="M43 501.7h178l40-432H3z"/>
                                        <path className="head" d="M7.1 112.4H257l4-42.7H3z"/>
                                        <path className="beer" fill={this.state.srmHex}
                                              d="M38.3 450.6c1.1 11.4 10.6 20.1 22.1 20.1h143.4c11.4 0 21-8.7 22.1-20.1L257 112.4H7.1l31.2 338.2"/>
                                        <path className="shadow"
                                              d="M107.3 501.7c-11.3 0-20.7-8.7-21.7-19.9l-35-412.1H3l40 432h64.3z"/>
                                        <path className="rim-accent" d="M4.3 83.7h255.4"/>
                                        <path className="highlight"
                                              d="M168 501.7c13 0 23.9-9.9 25.1-22.9L231 69.7h-18l-37.9 409.1c-1.2 13-12.1 22.9-25.1 22.9h18z"/>
                                        <path className="pint-outline" d="M221 501.7H43L3 69.7h258z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <h2 className="sub-header text-center">{this.state.item.name}</h2>
                            <table className="table table-responsive table-striped style-image">
                                <tbody>
                                <tr>
                                    <td><strong>Description:</strong></td>
                                    <td>{this.state.item.description ? this.state.item.description : "No Description Available"}</td>
                                </tr>
                                <tr>
                                    <td><strong>IBU Min:</strong></td>
                                    <td>{this.state.item.ibu_min}</td>
                                </tr>
                                <tr>
                                    <td><strong>IBU Max:</strong></td>
                                    <td>{this.state.item.ibu_max}</td>
                                </tr>
                                <tr>
                                    <td><strong>ABV Min:</strong></td>
                                    <td>{this.state.item.abv_min}</td>
                                </tr>
                                <tr>
                                    <td><strong>ABV Max:</strong></td>
                                    <td>{this.state.item.abv_max}</td>
                                </tr>
                                <tr>
                                    <td><strong>SRM:</strong></td>
                                    <td>{this.state.item.srm}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <h4 className="sub-header text-center">Check out some {this.state.item.name} beers</h4>
                            <table className="table table-responsive">
                                <tbody>
                                <tr>
                                    <td>{beerLinks}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-6">
                            <h4 className="sub-header text-center">Breweries offering {this.state.item.name} beers</h4>
                            <table className="table table-responsive">
                                <tbody>
                                <tr>
                                    <td>{breweryLinks}</td>
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
