import React, { Component } from 'react';
import lodash from 'lodash';
import axios from 'axios';

import ItemSelector from './ItemSelector';
import PageSelector from './PageSelector';

export default class Beers extends Component {
    constructor (props) {
        super (props);
        this.state = {
            beers: [],
            page: 0,
            numPages: 5,
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
    }

    handlePageChange = (page, e) => {
        e.preventDefault()
        console.log("in handlePageChange")
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
        console.log("in callAPI")
        let limit = 9
        let offset = this.state.page * 9
        let self = this

        axios.get(self.apiUrl+"?limit="+limit+"&offset="+offset)
            .then((res) => {
                // Set state with result
                self.setState({beers: res.data});
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
        console.log("updated component")
        console.log(this.state.page, nextState.page)
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

    /* More information about the React.Component lifecycle here: https://reactjs.org/docs/react-component.html */

    render() {

        // Create an array of X components with 1 for each beer gathered from API call
        let beerComponents = this.state.beers.map(function(beer) {
            return (
                <ItemSelector item={beer} navigateTo="/Beer"/>
            );
        })

        return (
          <div className="container">
              {/* Break array into separate arrays and wrap each array containing 3 components in a row div */}
              { lodash.chunk(beerComponents, 3).map(function(row) {
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
                            navigateTo="/Beers"/>
          </div>
      );
    }
}