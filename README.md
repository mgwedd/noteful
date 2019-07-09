# noteful (it's for notetaking)

This react app is the client of a full-stack CRUD project called "Noteful" — a final project for the Node & Postgres module of Thinkful's Full-Stack Flex program. It's written in React and Node (Express), with a Postgres database, which are hosted on Zeit and Heroku respectively. 

Here's a link to the hosted Noteful application: [https://noteful-app.mgwedd.now.sh/](https://noteful-app.mgwedd.now.sh/)

## Dev Setup
Complete the following steps to get the project ready for further development. 

1. Fork this repo to your GitHub, then after adjusting the clone url, run the chain of commands in step 2 to get the app running on your localhost (port 3000).  
2. `git clone https://github.com/YOUR-USER-NAME/noteful && cd $_ && npm i && npm start`

## Scripts
Start the app: `npm start`
Build the app: `npm run build`
Run all tests: `npm test`
Deploy the app: `now`
Eject the app: `npm eject`

Note: Deploying with `now` assumes you've set up [Zeit's now-cli](https://github.com/zeit/now-cli) and have configred the now.json file according to [their instructions](https://zeit.co/guides/deploying-react-with-now-cra)

# Full-Stack Setup

You'll either need to configure the Noteful API on your local machine, setting up the postgres database etc., or you can point this react client to a managed instance of the API and database on Heroku. 

To connect this react client to either of those API options, you'll need the following environment variables set on the `process.env` object in order for this client to be able to reach the API.

* `REACT_APP_API_BASE=some_api_server_url_with_/api_postfix`
* `REACT_APP_API_TOKEN=some_uuid_that_matches_the_server_configs_API_KEY

Set those variables in an `env.local` file so that Zeit can pull them into the hosted client's environment during deployment. 
