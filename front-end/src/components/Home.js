import React, { Component } from 'react';

export default class Home extends Component {

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
        <div>

          <div className="banner">
            <img id="home-banner" src="../images/brewtiful.png" alt="Brewtiful Banner" />
            <div className="home-banner-text">
              <p>Welcome to</p>
              <p>Brewtiful World</p>
            </div>
          </div>
                
          <div className="container">

            <div id="about">
              <div class="row">
                <div className="col-md-12">
                  <div className="text-center">
                    <h1 className="title">The Team</h1>
                    <h3 className="title-sub">We Drink, We Code, We Work</h3>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="text-center">
                    <img className="img-about img-thumbnail" src="images/travis_bitmoji.png" alt="Travis Bitmoji" data-toggle="modal" data-target="#travisModal" />
                    <h2>Travis Reed</h2>
                    <p>Front-end/Technical Documentation</p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="text-center">
                    <img className="img-about img-thumbnail" src="images/rita_bitmoji.png" alt="Rita Bitmoji" data-toggle="modal" data-target="#ritaModal"/>
                    <h2>Rita Mathis</h2>
                    <p>API/Database</p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="text-center">
                    <img className="img-about img-thumbnail" src="images/sam_bitmoji.png" alt="Sam Bitmoji" data-toggle="modal" data-target="#samModal"/>
                    <h2>Samuil Borisov</h2>
                    <p>API/Database/Backend</p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="text-center">
                    <img className="img-about img-thumbnail" src="images/audric_bitmoji2.png" alt="Audric Bitmoji" data-toggle="modal" data-target="#audricModal"/>
                    <h2>Audric Ganser</h2>
                    <p>Front-end design/Database/API Scraping</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="text-center">
                    <img className="img-about img-thumbnail" src="images/pablo_bitmoji2.png" alt="Pablo Bitmoji" data-toggle="modal" data-target="#pabloModal"/>
                    <h2>Pablo Velasco</h2>
                    <p>API/Database/Backend</p>
                  </div>
                </div>
              </div>

              <div className="modal fade" id="travisModal" role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content">

                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                      <h4 className="modal-title">Travis Reed</h4>
                    </div>
                    <div className="modal-body">
                        
                      <div className="row">
                        <div className="col-md-6">
                          <img className="img-about" src="images/travis_bitmoji.png" alt="Travis Reed" />
                        </div>
                        <div className="col-md-6">
                          <p className="about-description">
                            I am a senior at UT Austin in my final semester pursuing a degree in Computer Science.
                            My technological interests include autonomous vehicles and augmented reality.
                            In my free time, I enjoy playing guitar, rock climbing, and just about everything outdoors.
                          </p>
                          <table className="table table-responsive">
                            <tbody>
                              <tr>
                                <td>
                                  <strong>Commits:</strong>
                                  <p>5</p>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Issues Closed:</strong>
                                  <p>10</p>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Unit Tests:</strong>
                                  <p>10</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              <div className="modal fade" id="ritaModal" role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content">

                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                      <h4 className="modal-title">Rita Mathis</h4>
                    </div>
                    <div className="modal-body">
                      
                      <div className="row">
                        <div className="col-md-6">
                          <img className="img-about" src="images/rita_bitmoji.png" alt="Travis Reed" />
                        </div>
                        <div className="col-md-6">
                          <p className="about-description">
                            I am a senior at the University of Texas at Austin.
                            I enjoy craft beer, drumming, and playing with my dogs.
                          </p>
                          <table className="table table-responsive">
                            <tbody>
                              <tr>
                                <td>
                                  <strong>Commits:</strong>
                                  <p>44</p>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Issues Closed:</strong>
                                  <p>17</p>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Unit Tests:</strong>
                                  <p>4</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              <div className="modal fade" id="samModal" role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content">

                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                      <h4 className="modal-title">Samuil Borisov</h4>
                    </div>
                    <div className="modal-body">
                       
                      <div className="row">
                        <div className="col-md-6">
                          <img className="img-about" src="images/sam_bitmoji.png" alt="Travis Reed" />
                        </div>
                        <div className="col-md-6">
                          <p className="about-description">
                            I'm a CS Major at UT Austin. I enjoy traveling, reading, and weightlifting.
                          </p>
                          <table className="table table-responsive">
                            <tbody>
                              <tr>
                                <td>
                                  <strong>Commits:</strong>
                                  <p>14</p>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Issues Closed:</strong>
                                  <p>12</p>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Unit Tests:</strong>
                                  <p>2</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              <div className="modal fade" id="audricModal" role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content">

                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                      <h4 className="modal-title">Audric Ganser</h4>
                    </div>
                    <div className="modal-body">
                      
                      <div className="row">
                        <div className="col-md-6">
                          <img className="img-about" src="images/audric_bitmoji2.png" alt="Travis Reed" />
                        </div>
                        <div className="col-md-6">
                          <p className="about-description">
                            I am a Senior Computer Science Student at UT Austin.
                            My tech interests include Full-Stack Development as well as Mobile Development.
                            In my spare time I like to ride and work on vintage motorcycles.
                          </p>
                          <table className="table table-responsive">
                            <tbody>
                              <tr>
                                <td>
                                  <strong>Commits:</strong>
                                  <p>34</p>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Issues Closed:</strong>
                                  <p>10</p>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Unit Tests:</strong>
                                  <p>72</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              <div className="modal fade" id="pabloModal" role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content">

                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                      <h4 className="modal-title">Pablo Velasco</h4>
                    </div>
                    <div className="modal-body">
              
                      <div className="row">
                        <div className="col-md-6">
                          <img className="img-about" src="images/pablo_bitmoji2.png" alt="Travis Reed" />
                        </div>
                        <div className="col-md-6">
                          <p className="about-description">
                            I am a senior computer science student at UT Austin.
                            I enjoy programming, weightlifting, and gaming.
                          </p>
                          <table className="table table-responsive">
                            <tbody>
                              <tr>
                                <td>
                                  <strong>Commits:</strong>
                                  <p>26</p>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Issues Closed:</strong>
                                  <p>7</p>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Unit Tests:</strong>
                                  <p>4</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                  </div>
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
          </div>
          </div>
        </div>
    );
  }
}