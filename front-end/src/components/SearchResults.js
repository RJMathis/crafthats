import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import SearchSelector from './SearchSelector';
import PageSelector from './PageSelector';

class SearchResults extends Component {
    constructor (props) {
        super (props);
        this.state = {
            results: this.props.location.state.results,
            page: 0,
            numPages: 5,
            pgSize: 10,
            searchTerm: this.props.location.state.searchTerm,
            pathname: "/SearchResults"
        }
        this.contextTypes = {
            router: () => true, // replace with PropTypes.object if you use them
        }
    }

    /* Mounting
     These methods are called when an instance of a component is being created and inserted into the DOM:
     * constructor()
     * componentWillMount()
     * render()
     * componentDidMount()
     */

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

    /* Updating
     An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:
     * componentWillReceiveProps()
     * shouldComponentUpdate()
     * componentWillUpdate()
     * render()
     * componentDidUpdate()
     */

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.state.searchTerm !== this.props.location.state.searchTerm) {
            console.log("props weren't equal")
            this.setState({
                searchTerm: nextProps.location.state.searchTerm,
                results: nextProps.location.state.results
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchTerm !== this.state.searchTerm) {
            this.forceUpdate();
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

    /* More information about the React.Component lifecycle here: https://reactjs.org/docs/react-component.html */

    render() {
        // Create an array of X components with 1 for each result gathered from Search
        if (this.state.results.length === 0) {
            return (<div className="container" style={{height: 100}}>
                        <div className="mh-50">
                            <div className="col-12">
                                <h3>No results were found</h3>
                            </div>
                            <div className="row align-items-center">
                                <button className="btn btn-link"
                                        onClick={this.props.history.goBack}>Go Back</button>
                            </div>
                        </div>
                    </div>);
        }
        let searchTerm = this.state.searchTerm
        let resultRows = this.state.results.map(function(result) {
            return (
                <SearchSelector key={result.id} item={result} searchTerm={searchTerm} navigateTo="/Result"/>
            );
        })

        return (
            <div className="container">
                <div className="col-xs-12">
                    <h2 className="sub-header">Search Results</h2>
                    <h4>Found: {this.state.results.length} results</h4>
                    <table className="table table-responsive table-hover">
                        <tbody>
                        {resultRows}
                        </tbody>
                    </table>
                </div>
                <PageSelector handlePageChange={this.handlePageChange}
                              handlePrev={this.handlePrev}
                              handleNext={this.handleNext}
                              numPages={this.state.numPages}
                              navigateTo="/SearchResults"/>
            </div>
        );
    }
}

export default withRouter(SearchResults);