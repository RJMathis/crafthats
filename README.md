# craftHats

## Developing Locally

### Google Cloud SDK (Preferred Method)

The web application, [brewtiful.world](https://www.brewtiful.world/) is hosted through Google App Engine. 

The Google Cloud SDK provides a set of tools and a CLI in order to manage applications and resources hosted on Google Cloud Platform. An overview of the tools is available here: [Cloud SDK Overview](https://cloud.google.com/sdk/docs/overview).

In order to begin working with the Google Cloud SDK, download the latest tools [here](https://cloud.google.com/sdk/docs/).

The Google Cloud SDK provides a local development server that can be used to simulate running the application in App Engine. 

With the `app.yaml` file properly configured, from the "front-end" directory execute `$ npm run build` and then the command `$ dev_appserver.py app.yaml` can be used to run the app locally. Then simply go to http://localhost:8080/ in your web browser to see the app in action.

For more information regarding the Google cloud SDK and gcloud commands view the documentation [here](https://cloud.google.com/sdk/gcloud/reference/).
