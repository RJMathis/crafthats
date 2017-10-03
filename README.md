# craftHats

## Developing Locally

### Cloning the Repo

* Clone the repository to get a local copy <br />
`$ git clone git@github.com:RJMathis/crafthats.git`

* Ensure you have the most up-to-date code <br />
`$ git pull`

* (If you want to inspect a feature branch: follow step 2, otherwise continue to step 3) <br />
`$ git checkout <featureBranch>`

### Install Dependencies

* Install dependencies using NPM ([This requires NPM to be installed locally](https://www.npmjs.com/get-npm)) <br />
`$ npm install`

### Deploy the app to a local server

* Create an optimized production build of the app <br />
`$ npm run build`

* ### Google Cloud SDK (Preferred Method)
  The web application, [brewtiful.world](https://www.brewtiful.world/) is hosted through Google App Engine. 

  The Google Cloud SDK provides a set of tools and a CLI in order to manage applications and resources hosted on Google Cloud   Platform. An overview of the tools is available here: [Cloud SDK Overview](https://cloud.google.com/sdk/docs/overview).

  In order to begin working with the Google Cloud SDK, download the latest tools [here](https://cloud.google.com/sdk/docs/).

  The Google Cloud SDK provides a local development server that can be used to simulate running the application in App Engine.
  * Once Google Cloud SDK is installed and setup: <br />
  `$ dev_appserver.py app.yaml` will deploy the app to a local development server.
  
  * Then simply go to http://localhost:8080/ in a web browser to see the app in action.
