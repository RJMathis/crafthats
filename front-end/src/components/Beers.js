import React, { Component } from 'react';
import chunk from 'lodash.chunk';
import axios from 'axios';


import ItemSelector from './ItemSelector';
import PageSelector from './PageSelector';

export default class Beers extends Component {
    constructor (props) {
        super (props);
        this.state = {
            beers: [],
            allStyles: [],
            page: 0,
            numPages: 0,
            totalCount: 0,
            pgSize: 9,
            order: "",
            organic: false,
            selectedStyle: "",
            pathname: "/Beers"
        }
        this.apiUrl = 'https://backend-staging-183303.appspot.com/beers';
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
        this.getStyles()
    }

    handlePageChange = (page, e) => {
        e.preventDefault()
        //return <Redirect to={{pathname: this.state.pathname, state: {page: page}}} push={true} />;
        this.setState({page: page})
    }

    handlePrev = (e) => {
        e.preventDefault()
        if (this.state.page > 0) {
            this.setState({page: this.state.page - 1})
        }
    }

    handleNext = (e) => {
        e.preventDefault()
        if (this.state.page < this.state.numPages - 1) {
            this.setState({page: this.state.page + 1})
        }
    }

    handleOrganic = (e) => {
        this.setState({organic: e.target.value})
    }

    handleStyle = (e) => {
        this.setState({selectedStyle: e.target.value})
    }

    sort = (order, e) => {
        if (e) {
            e.preventDefault()
        }
        this.setState({order: order})

        let limit = this.state.pgSize
        let offset = this.state.page * this.state.pgSize
        let self = this
        let url = self.apiUrl+"?order="+order+"&limit="+limit+"&offset="+offset
        axios.get(url)
            .then((res) => {
                // Set state with result
                self.setState({ beers: res.data.records, totalCount: res.data.totalCount, numPages: Math.ceil(res.data.totalCount/self.state.pgSize)});
            })
            .catch((error) => {
                console.log(error)
            });
    }

    callAPI = (organic) => {
        if (organic === undefined) {
            organic = false
        }
        let limit = this.state.pgSize
        let offset = this.state.page * this.state.pgSize
        let limOff = "?limit="+limit+"&offset="+offset
        let url = ""

        console.log(organic)
        if (organic) {
            console.log("organic api call")
            url = "https://backend-staging-183303.appspot.com/beers/organic/Y"+limOff
        } else {
            console.log("not organic call")
            url = this.apiUrl+limOff
        }

        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with result
                self.setState({beers: res.data.records, totalCount: res.data.totalCount, numPages: Math.ceil(res.data.totalCount/self.state.pgSize)});
            })
            .catch((error) => {
                console.log(error)
            });
    }

    getStyles = () => {
        let url = 'https://backend-staging-183303.appspot.com/styles?limit=100';
        let styles = []

        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with names of styles
                res.data.records.map((style) => {
                    return styles.push(style.name)
                })
                self.setState({allStyles: styles});
            })
            .catch((error) => {
                console.log(error)
            });
    }

    /* Updating
        An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:
            * componentWillReceiveProps()
            * shouldComponentUpdate()
            * componentWillUpdate()
            * render()
            * componentDidUpdate()
     */

    componentDidUpdate(prevProps, prevState) {
        if (prevState.organic !== this.state.organic) {
            this.callAPI(this.state.organic)
        }

        if (prevState.page !== this.state.page) {
            this.sort(this.state.order)
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        }
    }


    /* Unmounting
        This method is called when a component is being removed from the DOM:
            * componentWillUnmount()
     */

    /* More information about the React.Component lifecycle here: https://reactjs.org/docs/react-component.html */

    render() {

        let beerComponents = []
        let styleMenu = []
        if (this.state.beers !== undefined) {
            // Create an array of X components with 1 for each beer gathered from API call
            beerComponents = this.state.beers.map((beer) => {
                return (
                    <ItemSelector item={beer} navigateTo="/Beer"/>
                );
            })
        }

        if (this.state.allStyles !== undefined) {
            // Create an array of X components with 1 for each beer gathered from API call
            styleMenu = this.state.allStyles.map((style) => {
                return (
                    <option value={style}>{style}</option>
                );
            })
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <label>
                            <strong>Sort By: </strong>
                            <div className="button btn-group">
                                <button type="button"
                                        className={this.state.order === "asc" ? "btn btn-sm btn-default active" : "btn btn-sm btn-default"}
                                        onClick={(e) => this.sort("asc", e)}>Ascending</button>
                                <button type="button"
                                        className={this.state.order === "desc" ? "btn btn-sm btn-default active" : "btn btn-sm btn-default"}
                                        onClick={(e) => this.sort("desc", e)}>Descending</button>
                            </div>
                        </label>
                    </div>
                    <div className="col-md-3">
                        <label>
                            <strong>Organic:  </strong>
                            <select value={this.state.organic} onChange={this.handleOrganic}>
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>
                            </select>
                        </label>
                    </div>
                    <div className="col-md-4">
                        <label>
                            <strong>Style:  </strong>
                            <select value={this.state.style} onChange={this.handleStyle}>
                                {styleMenu}
                            </select>
                        </label>
                    </div>
                </div>
                {/* Break array into separate arrays and wrap each array containing 3 components in a row div */}
                { chunk(beerComponents, 3).map((row) => {
                    return (
                        <div className="row">
                            { row }
                        </div>
                    )
                })}
                <PageSelector handlePageChange={this.handlePageChange}
                              handlePrev={this.handlePrev}
                              handleNext={this.handleNext}
                              numPages={this.state.numPages}
                              currentPage={this.state.page}
                              navigateTo="/Beers"/>
            </div>
      );
    }
}