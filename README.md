# hs-api-starter #

## Setup Local Environment ##
0. Install Heroku CLI https://devcenter.heroku.com/articles/heroku-cli
1. Initialize Heroku: heroku login
2. Create Heroku app: heroku create
3. Install app dependencies: npm install
4. Start local server: heroku local
5. Navigate to https://localhost:5000

## Setup Deployment ##
1. Go to https://dashboard.heroku.com/apps
2. Select current app
3. Go to "Deploy" tab
4. Choose "GitHub" in Deployment method
5. Connect to GitHub and add repository name
6. Connect to appropriate repository
7. Confirm details and click "Enable Automatic Deploys"
8. Commit changes to GitHub and confirm integration
9. View live app: heroku open

## Setup HubSpot Developer Account ##
1. Create HS Developer account https://developers.hubspot.com
2. Click "Create a test account" and follow instructions
3. Change account names for developer account and test account for easier management

## Setup HubSpot Integration ##
1. Log into Developer account
2. Confirm test account is set up
3. Create a new app
4. Set name
5. In Auth tab, add a required scope
6. Fill in redirect URL: http://localhost:5000/oauth-callback
7. Copy Client ID Client Secret, Redirect URI, and Scope to .env file
8. Add environment variables to Heroku: heroku config:set VARIABLE=variable

## Setup PostgreSQL Database ##
0. Install PostgreSQL locally: https://devcenter.heroku.com/articles/heroku-postgresql#local-setup
0. Check if PostgreSQL is already provisioned: heroku addons
1. Provision Postgres database: heroku addons:create heroku-postgresql:hobby-dev
2. Add Database URL to .env file
3. Access database: heroku pg:psql
4. Create table: CREATE TABLE <table_name> ( <column_name> <data_type>, <column_name> <data_type> );

***
5. Add columns as necessary: 

HubSpot OAuth tutorial: https://app.hubspot.com/academy/2883648/lessons/593/2969

## TO DO ##
- Set up local PostgreSQL database

## File Explanations ##

### package.json ###
Specifies necessary node modules.

### Procfile ###
Points node to appropriate file when running app.

### /views/ ###
Provides view files. Currently using PUG templating engine.