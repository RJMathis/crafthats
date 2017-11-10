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
            page: 0,
            numPages: 5,
            pgSize: 9,
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

    callAPI = () => {
        let limit = this.state.pgSize
        let offset = this.state.page * this.state.pgSize
        let self = this

        axios.get(self.apiUrl+"?limit="+limit+"&offset="+offset)
            .then((res) => {
                // Set state with result
                self.setState({styles: res.data.records, totalCount: res.data.totalCount, numPages: res.data.totalCount/self.state.pgSize});
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

    componentDidUpdate(prevState, nextState) {
        if (nextState.page !== this.state.page) {
            this.callAPI()
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

        return (
            <div className="container">
                {/* Break array into separate arrays and wrap each array containing 3 components in a row div */}
                { chunk(styleComponents, 3).map(function(row) {
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
                              navigateTo="/Styles"/>
            </div>
        );
    }
}