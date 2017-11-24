/**
 * Created by travisreed7 on 10/19/17.
 */
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

export default class StyleSelector extends Component {
    constructor (props) {
         var srmArray = [ '#FDE69D', '#FCD87F', '#FCCA63', '#FBC050',
                '#F5B238', '#F3A728', '#EC9D26', '#E48F23', 
                '#E18822', '#D87E1F', '#D1741D', '#C96C1B', 
                '#C4641A', '#BD5C18', '#B45315', '#AE4F14', 
                '#AA4713', '#A04011', '#9A390F', '#94350E', 
                '#8F2F0D', '#8A2D0D', '#82260B', '#7D200A', 
                '#761D09', '#711C07', '#6B1607', '#661006', 
                '#611006', '#5A0E05', '#540D05', '#5C0B06', 
                '#4E0B0B', '#490708', '#430808', '#410909', 
                '#3B0A0A', '#380809', '#38080C', '#34090B'];

        super (props);
            this.state = {
                item: this.props.item,
                srmHex: srmArray[Math.round(this.props.item.srm) - 1],
                srmColors: srmArray,
                navigate: false,
                navigateTo: this.props.navigateTo
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
        this.setState({item: this.props.item})
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
        if (this.props !== nextProps) {
            this.setState({item: nextProps.item, srmHex: this.state.srmColors[Math.round(this.props.item.srm) - 1]})
        }
    }

    /* Unmounting
     This method is called when a component is being removed from the DOM:
     * componentWillUnmount()
     */

    /* More information about the React.Component lifecycle here: https://reactjs.org/docs/react-component.html */

    render() {

        if (this.state.navigate) {
            return <Redirect to={{pathname: this.state.navigateTo, state: {item: this.state.item}}} push={true} />;
        }

        return (
            <div className="col-md-4 container-thumbnail">
                <div className="text-center">
                    <div onClick={() => this.setState({navigate: true})}>
                        <div className="img-thumbnail" alt={this.state.item.name} title={this.state.item.name}>
                            <div className="overlay"/>
                            <div className="text style-text">{this.state.item.name}</div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="175" height="333" viewBox="0 0 264 504.7" className="beerGlass js-beerGlass">
                                <path className="foam" d="M231.7 49.3c-4.3 0-8.3 1.2-11.7 3.2-1.4-17.1-15.7-30.5-33.1-30.5-11.3 0-21.2 5.6-27.2 14.2C150.2 16.6 130.2 3 107 3 81.2 3 59.3 19.8 51.7 43c-3.5-1.5-7.3-2.3-11.3-2.3-16 0-29 13-29 29h243.2c-1.3-11.5-11.1-20.4-22.9-20.4z"/>
                                <path className="glass" d="M43 501.7h178l40-432H3z"/>
                                <path className="head" d="M7.1 112.4H257l4-42.7H3z"/>
                                <path className="beer" fill={this.state.srmHex} d="M38.3 450.6c1.1 11.4 10.6 20.1 22.1 20.1h143.4c11.4 0 21-8.7 22.1-20.1L257 112.4H7.1l31.2 338.2"/>
                                <path className="shadow" d="M107.3 501.7c-11.3 0-20.7-8.7-21.7-19.9l-35-412.1H3l40 432h64.3z"/>
                                <path className="rim-accent" d="M4.3 83.7h255.4"/>
                                <path className="highlight" d="M168 501.7c13 0 23.9-9.9 25.1-22.9L231 69.7h-18l-37.9 409.1c-1.2 13-12.1 22.9-25.1 22.9h18z"/>
                                <path className="pint-outline" d="M221 501.7H43L3 69.7h258z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}