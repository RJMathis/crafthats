import React, { Component } from 'react';

export default class About extends Component {
    constructor (props) {
        super (props);
        this.state = {
            attribute1: '',
            attribute2: ''
        }
    }

    /* Mounting
        These methods are called when an instance of a component is being created and inserted into the DOM:
            * constructor()
            * componentWillMount()
            * render()
            * componentDidMount()
     */

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
      return (
          <div className="container">
              <div className="row">
                  <div className="col-md-4">
                      <div className="text-center">
                          <img className="img-about" src="images/travis_bitmoji.png" alt="Travis Bitmoji" />
                          <h2>Travis Reed</h2>
                          <p className="text-left about-description">
                              I am a senior at UT Austin in my final semester pursuing a degree in Computer Science.
                              My technological interests include autonomous vehicles and augmented reality.
                              In my free time, I enjoy playing guitar, rock climbing, and just about everything outdoors.
                          </p>
                          <table className="table table-responsive">
                              <thead>
                              <tr></tr>
                              </thead>
                              <tbody>
                              <tr>
                                  <td>
                                      <strong>Responsibilities:</strong>
                                      Front-End, Technical Documentation
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Commits:</strong>
                                      10
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Issues Closed:</strong>
                                      3
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Unit Tests:</strong>
                                      0
                                  </td>
                              </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
                  <div className="col-md-4">
                      <div className="text-center">
                          <img className="img-about" src="images/rita_bitmoji.png" alt="Rita Bitmoji" />
                          <h2>Rita Mathis</h2>
                          <p className="text-left about-description">
                              I am a senior at the University of Texas at Austin.
                              I enjoy craft beer, drumming, and playing with my dogs.
                          </p>
                          <table className="table table-responsive">
                              <thead>
                              <tr></tr>
                              </thead>
                              <tbody>
                              <tr>
                                  <td>
                                      <strong>Responsibilities:</strong>
                                      API, Database
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Commits:</strong>
                                      7
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Issues Closed:</strong>
                                      2
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Unit Tests:</strong>
                                      0
                                  </td>
                              </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
                  <div className="col-md-4">
                      <div className="text-center">
                          <img className="img-about" src="images/sam_bitmoji.png" alt="Sam Bitmoji" />
                          <h2>Samuel Borisov</h2>
                          <p className="text-left about-description">
                              I'm a CS Major at UT Austin. I enjoy traveling, reading, and weightlifting.
                          </p>
                          <table className="table table-responsive">
                              <thead>
                              <tr></tr>
                              </thead>
                              <tbody>
                              <tr>
                                  <td>
                                      <strong>Responsibilities:</strong>
                                      API, Back-End, DB
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Commits:</strong>
                                      6
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Issues Closed:</strong>
                                      0
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Unit Tests:</strong>
                                      0
                                  </td>
                              </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-6">
                      <div className="text-center">
                          <img className="img-about" src="images/audric_bitmoji2.png" alt="Audric Bitmoji" />
                          <h2>Audric Ganser</h2>
                          <p className="text-left about-description">
                              I am a Senior Computer Science Student at UT Austin.
                              My tech interests include Full-Stack Development as well as Mobile Development.
                              In my spare time I like to ride and work on vintage motorcycles.
                          </p>
                          <table className="table table-responsive ">
                              <thead>
                              <tr></tr>
                              </thead>
                              <tbody>
                              <tr>
                                  <td>
                                      <strong>Responsibilities:</strong>
                                      Front-End, API's
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Commits:</strong>
                                      10
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Issues Closed:</strong>
                                      0
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Unit Tests:</strong>
                                      0
                                  </td>
                              </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
                  <div className="col-md-6">
                      <div className="text-center">
                          <img className="img-about" src="images/pablo_bitmoji2.png" alt="Pablo Bitmoji" />
                          <h2>Pablo Velasco</h2>
                          <p className="text-left about-description">
                              I am a senior computer science student at UT Austin.
                              I enjoy programming, weightlifting, and gaming.</p>
                          <table className="table table-responsive">
                              <thead>
                              <tr></tr>
                              </thead>
                              <tbody>
                              <tr>
                                  <td>
                                      <strong>Responsibilities:</strong>
                                      Back-End, Database, Front-End
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Commits:</strong>
                                      9
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Issues Closed:</strong>
                                      0
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Unit Tests:</strong>
                                      0
                                  </td>
                              </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col">
                      <div className="text-center">
                          <u><h1>Stats</h1></u>
                          <h2>Apiary API</h2>
                          <a href="http://docs.crafthats.apiary.io/"><h4>http://docs.crafthats.apiary.io//</h4></a>
                          <h2>GitHub Repo</h2>
                          <a href="https://github.com/RJMathis/crafthats"><h4>https://github.com/RJMathis/crafthats</h4></a>
                          <h2>Trello</h2>
                          <a href="https://trello.com/b/gV83PBgA/swe-project-1"><h4>trello.com/swe-project-1</h4></a>
                          <u><h1>Data</h1></u>
                          <h4>Brewery DB: Used API GET call to get data</h4>
                          <u><h1>tools</h1></u>
                          <h4>Trello</h4>
                          <h4>PlanIt Poker</h4>
                          <h4>Slack</h4>
                          <h4>Facebook</h4>
                          <h4>Google Hangouts</h4>
                          <u><h1>Report</h1></u>
                          <a href="https://utexas.app.box.com/s/s9iv2im949pci0cp5xmraw6k2mr6tc76"><h4>SWE Technical Report</h4></a>
                      </div>
                  </div>
              </div>
          </div>
      );
    }
}