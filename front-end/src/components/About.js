import React, { Component } from 'react';

export default class About extends Component {

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
                          <p className="text-center about-description">
                              I am a senior at UT Austin in my final semester pursuing a degree in Computer Science.
                              My technological interests include autonomous vehicles and augmented reality.
                              In my free time, I enjoy playing guitar, rock climbing, and just about everything outdoors.
                          </p>
                          <table className="table table-responsive">
                              <tbody>
                              <tr>
                                  <td>
                                      <strong>Responsibilities:</strong> Front-End, Technical Documentation
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Commits:</strong> 5
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Issues Closed:</strong> 10
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Unit Tests:</strong> 10
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
                          <p className="text-center about-description">
                              I am a senior at the University of Texas at Austin.
                              I enjoy craft beer, drumming, and playing with my dogs.
                          </p>
                          <table className="table table-responsive">
                              <tbody>
                              <tr>
                                  <td>
                                      <strong>Responsibilities:</strong> API, Database
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Commits:</strong> 44
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Issues Closed:</strong> 17
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Unit Tests:</strong> 4
                                  </td>
                              </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
                  <div className="col-md-4">
                      <div className="text-center">
                          <img className="img-about" src="images/sam_bitmoji.png" alt="Sam Bitmoji" />
                          <h2>Samuil Borisov</h2>
                          <p className="text-center about-description">
                              I'm a CS Major at UT Austin. I enjoy traveling, reading, and weightlifting.
                          </p>
                          <table className="table table-responsive">
                              <tbody>
                              <tr>
                                  <td>
                                      <strong>Responsibilities:</strong> API, Back-End, DB
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Commits:</strong> 14
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Issues Closed:</strong> 12
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Unit Tests:</strong> 2
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
                          <p className="text-center about-description">
                              I am a Senior Computer Science Student at UT Austin.
                              My tech interests include Full-Stack Development as well as Mobile Development.
                              In my spare time I like to ride and work on vintage motorcycles.
                          </p>
                          <table className="table table-responsive ">
                              <tbody>
                              <tr>
                                  <td>
                                      <strong>Responsibilities:</strong> Front-End, API's
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Commits:</strong> 34
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Issues Closed:</strong> 10
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Unit Tests:</strong> 72
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
                          <p className="text-center about-description">
                              I am a senior computer science student at UT Austin.
                              I enjoy programming, weightlifting, and gaming.</p>
                          <table className="table table-responsive">
                              <tbody>
                              <tr>
                                  <td>
                                      <strong>Responsibilities:</strong> Back-End, Database, Front-End
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Commits:</strong> 26
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Issues Closed:</strong> 7
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>Unit Tests:</strong> 4
                                  </td>
                              </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
              <div className="row border">
                  <div className="col-md-3 border-right">
                      <div className="text-center">
                          <h1><u>Stats</u></h1>
                          <ul>
                              <li className="text-left"><h4><strong>total no. of commits:</strong> 260</h4></li>
                              <li className="text-left"><h4><strong>total no. of issues:</strong> 73</h4></li>
                              <li className="text-left"><h4><strong>total no. of unit tests:</strong> 91</h4></li>
                              <li className="text-left"><a href="http://docs.crafthats.apiary.io/"><h4>Apiary API</h4></a></li>
                              <li className="text-left"><a href="https://github.com/RJMathis/crafthats"><h4>GitHub Repo</h4></a></li>
                              <li className="text-left"><a href="https://trello.com/b/gV83PBgA/swe-project-1"><h4>Trello</h4></a></li>
                          </ul>
                      </div>
                  </div>
                  <div className="col-md-3 border-right">
                      <div className="text-center">
                          <h1><u>Tools</u></h1>
                          <ul>
                              <li className="text-left"><h4>PlanIt Poker</h4></li>
                              <li className="text-left"><h4>Slack</h4></li>
                              <li className="text-left"><h4>Facebook</h4></li>
                              <li className="text-left"><h4>Google Hangouts</h4></li>
                          </ul>
                      </div>
                  </div>
                  <div className="col-md-3 border-right">
                      <div className="text-center">
                          <h1><u>Data</u></h1>
                          <p><strong>Brewery DB:</strong> Used API to collect data via HTTP GET requests</p>
                          <p><strong>RateBeer:</strong>   Used API to collect data via HTTP POST requests</p>
                      </div>
                  </div>
                  <div className="col-md-3 ">
                      <div className="text-center">
                          <h1><u>Technical</u></h1>
                              <a href="https://utexas.app.box.com/s/zw7p11doplzjvv2ozdlamqgiaieknboj"><h4>Technical Report</h4></a>
                              <a href="https://yuml.me/12ee86c4.pdf"><h4>UML Diagram</h4></a>
                      </div>
                  </div>
              </div>
          </div>
      );
    }
}