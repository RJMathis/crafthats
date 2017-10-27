import React, { Component } from 'react';
import lodash from 'lodash';
import axios from 'axios';

import ItemSelector from './ItemSelector';
import PageSelector from './PageSelector';

export default class Styles extends Component {
    constructor (props) {
        super (props);
        this.state = {
            styles: [],
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

    componentDidMount() {
        axios.get(this.apiUrl)
            .then((res) => {
                // Set state with result
                this.setState({styles: res.data});
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

    /* More information about the React.Component lifecyle here: https://reactjs.org/docs/react-component.html */

    render() {

        // Create an array of X components with 1 for each Style gathered from API call
        let styleComponents = this.state.styles.map(function(style) {
            return (
                <ItemSelector title={style.name}
                              image={style.image}
                              alt={style.name}
                              overlayText={style.name}
                              item={style}
                              navigateTo="/Style"/>
            );
        })

        return (
            <div className="container">
                {/* Break array into separate arrays and wrap each array containing 3 components in a row div */}
                { lodash.chunk(styleComponents, 3).map(function(row) {
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