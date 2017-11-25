import React, { Component } from 'react';
import chunk from 'lodash.chunk';
import axios from 'axios';

import StyleSelector from './StyleSelector';
import PageSelector from './PageSelector';

export default class Styles extends Component {
    constructor (props) {
        super (props);
        this.state = {
            styles: [],
            abvMenu: ["All", "0-2", "3-4", "4-6", "7-10", "11-30", "31-60", "60+"],
            srmMenu: ["All", "0-5", "6-10", "11-15", "16-20", "20-25", "25-30", "30-35", "35-40", "40+"],
            selectedAbvMin: "",
            selectedAbvMax: "",
            selectedSrmMin: "",
            selectedSrmMax: "",
            selectedAbv: "",
            selectedSrm: "",
            page: 0,
            numPages: 0,
            totalCount: 0,
            pageLimit: 16,
            sortBy: "",
            pathname: "/Styles"
        }
        this.apiUrl = 'https://backend-staging-183303.appspot.com/styles';
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

    handlePageChange = (page, e) => {
        e.preventDefault()
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

    handleAbv = (e) => {
        let abvRange

        if (e.target.value === "All") {
            this.setState({selectedAbvMin: "All"})
        } else {
            if (e.target.value[2] === "+") {
                e.target.value.replace("+", "-100")
            }
            abvRange = e.target.value.split("-")

            this.setState({selectedAbv: e.target.value ,selectedAbvMin: abvRange[0], selectedAbvMax: abvRange[1]})
        }
    }

    handleSrm = (e) => {
        let srmRange

        if (e.target.value === "All") {
            this.setState({selectedSrmMin: "All"})
        } else {
            if (e.target.value[2] === "+") {
                e.target.value.replace("+", "-100")
            }
            srmRange = e.target.value.split("-")

            this.setState({selectedSrm: e.target.value ,selectedSrmMin: srmRange[0], selectedSrmMax: srmRange[1]})
        }
    }

    sort = (order) => {
        this.setState({sortBy: order})
    }

    callAPI = () => {

        let limit = this.state.pageLimit
        let offset = this.state.page * this.state.pageLimit
        let limOff = "?limit="+limit+"&offset="+offset
        let url = "https://backend-staging-183303.appspot.com/styles"+limOff

        if (this.state.selectedAbvMin !== "All" && this.state.selectedAbvMin !== "") {
            url += "&abv_min="+this.state.selectedAbvMin+"&abv_max="+this.state.selectedAbvMax
        }
        if (this.state.selectedSrmMin !== "All" && this.state.selectedSrmMax !== "") {
            url += "&srm_min="+this.state.selectedSrmMin+"&srm_max="+this.state.selectedSrmMax
        }
        if (this.state.sortBy !== "") {
            url += "&sort_by="+this.state.sortBy
        }

        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with result
                self.setState({styles: res.data.records, totalCount: res.data.totalCount, numPages: Math.ceil(res.data.totalCount/self.state.pageLimit)});
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
        if (prevState.selectedAbv !== this.state.selectedAbv ||
            prevState.selectedSrm !== this.state.selectedSrm ||
            prevState.sortBy !== this.state.sortBy ||
            prevState.page !== this.state.page)
        {
            this.callAPI()
        }

        if (prevState.page !== this.state.page) {
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

    /* More information about the React.Component lifecyle here: https://reactjs.org/docs/react-component.html */

    render() {

        // Create an array of X components with 1 for each Style gathered from API call
        let styleComponents = this.state.styles.map(function(style) {
            return (
                <StyleSelector item={style} navigateTo="/Style"/>
            );
        })

        let abvMenu = this.state.abvMenu.map((range) => {
            return (
                <option value={range}>{range}</option>
            );
        })

        let srmMenu = this.state.srmMenu.map((range) => {
            return (
                <option value={range}>{range}</option>
            );
        })

        return (
            <div className="container sub-container">
                <div className="row">
                    <div className="col-md-3">
                        <div className="button btn-group">
                            <button type="button"
                                    className={this.state.order === "asc" ? "btn btn-default active" : "btn btn-default"}
                                    onClick={(e) => this.sort("asc", e)}><i className="fa fa-sort-alpha-asc" aria-hidden="true"/></button>
                            <button type="button"
                                    className={this.state.order === "desc" ? "btn btn-default active" : "btn btn-default"}
                                    onClick={(e) => this.sort("desc", e)}><i className="fa fa-sort-alpha-desc" aria-hidden="true"/></button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label>
                            <strong>ABV Range:  </strong>
                        </label><span> </span>
                        <select value={this.state.selectedAbv} onChange={this.handleAbv}>
                                {abvMenu}
                            </select>
                    </div>
                    <div className="col-md-4">
                        <label>
                            <strong>SRM Range:  </strong>
                        </label><span> </span>
                        <select value={this.state.selectedSrm} onChange={this.handleSrm}>
                                {srmMenu}
                            </select>
                    </div>
                </div>
                {/* Break array into separate arrays and wrap each array containing 3 components in a row div */}
                { chunk(styleComponents, 4).map(function(row) {
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
                              navigateTo="/Styles"/>
            </div>
        );
    }
}