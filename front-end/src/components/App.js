import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import NotFound from './NotFound';
import Beers from './Beers';
import Breweries from './Breweries';
import Styles from './Styles';
import Reviews from './Reviews';
import Beer from './Beer';
import Brewery from './Brewery';
import Style from './Style';
import Review from './Review';
import SearchResults from './SearchResults';
import Result from './Result';

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allData: [],
            apiUrl: "https://backend-staging-183303.appspot.com"
        }
    }

    componentDidMount() {
        this.callAPI()
    }

    callAPI = () => {
        let self = this

        //this.setState({loading: true})
        axios.all([
            axios.get(self.state.apiUrl+"/beers?limit=500"),
            axios.get(self.state.apiUrl+"/breweries?limit=500"),
            axios.get(self.state.apiUrl+"/styles?limit=500"),
            axios.get(self.state.apiUrl+"/reviews?limit=500")
        ])
            .then(axios.spread((beers, breweries, styles, reviews) => {
                // Set state with result
                //this.setState({loading: false})
                let allRecords = beers.data.records.concat(breweries.data.records).concat(styles.data.records).concat(reviews.data.records)
                this.setState({allData: allRecords})
                //self.searchData(allRecords, allKeys)
            }))
            .catch((error) => {
                console.log(error)
            });
    }

  render() {
    return (
      <div className="App">
        <Navbar allData={this.state.allData}/>
              <div className="App">
                  <Switch>
                      <Route exact path="/" component={Home} />
                      <Route exact path="/Beers" component={Beers} />
                      <Route exact path="/Beer" component={Beer} />
                      <Route exact path="/Breweries" component={Breweries} />
                      <Route exact path="/Brewery" component={Brewery} />
                      <Route exact path="/Styles" component={Styles} />
                      <Route exact path="/Style" component={Style} />
                      <Route exact path="/Reviews" component={Reviews} />
                      <Route exact path="/Review" component={Review} />
                      <Route exact path="/SearchResults" component={SearchResults} />
                      <Route exact path="/Result" component={Result} />
                      <Route component={NotFound} />
                  </Switch>
              </div>
        <Footer />
      </div>
    );
  }
}