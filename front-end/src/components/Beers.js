import React, { Component } from 'react';
import lodash from 'lodash';
import axios from 'axios';

import ItemSelector from './ItemSelector';
import PageSelector from './PageSelector';

export default class Beers extends Component {
    constructor (props) {
        super (props);
        this.state = {
            beers: []
        }
        this.apiUrl = 'http://59ef8ec3684745001253e842.mockapi.io/api/v1/beers';
    }

    /* Mounting
        These methods are called when an instance of a component is being created and inserted into the DOM:
            * constructor()
            * componentWillMount()
            * render()
            * componentDidMount()
     */

    componentDidMount() {
        axios.get(this.apiUrl)
            .then((res) => {
                // Set state with result
                this.setState({beers: res.data});
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

    /* Unmounting
        This method is called when a component is being removed from the DOM:
            * componentWillUnmount()
     */

    /* More information about the React.Component lifecycle here: https://reactjs.org/docs/react-component.html */

    render() {

        // Create an array of 9 components with 1 for each beer gathered from API call
        let beerComponents = this.state.beers.map(function(beer) {
            return (
                <ItemSelector title={beer.name}
                              image={beer.image}
                              alt={beer.name}
                              overlayText={beer.name}/>
            );
        })

        return (
          <div className="container">
              {/* Break beerComponents array into 3 separate arrays and wrap each array containing 3 components in a row div */}
              { lodash.chunk(beerComponents, 3).map(function(row) {
                  return (
                      <div className="row">
                          { row }
                      </div>
                  )
              })}
              <PageSelector />
          </div>
      );
    }
}