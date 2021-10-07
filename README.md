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

## File Explanations ##

### app.json ###
### package.json ###
### Procfile ###
### /project/ ###
### /project/start.js ###
### /project/html/helpers/head.ejs ###
### /project/html/pages/index.ejs ###
