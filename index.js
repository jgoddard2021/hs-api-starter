// Require necessary node modules
require( 'dotenv' ).config();
const express = require( 'express' );
const axios = require( 'axios' );

// Create new Express app
const app = express();

// Set pug as the templating engine
app.set( 'view engine', 'pug' );

// Get info from env file
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const SCOPE = process.env.SCOPE;

// Generate OAuth url
const authUrl = 'https://app.hubspot.com/oauth/authorize?' + CLIENT_ID + 'redirect_uri=' + REDIRECT_URI + '&scope' + SCOPE;

/***** Replace with DB *****/
const tokenStore = {};

// 
const isAuthorized = (userId) => {
    return tokenStore[userId] ? true : false;
};

// Create route for home
app.get( '/', async( req, res ) => {

    // If the user is already authorized
    if( isAuthorized( req.sessionID ) ) {

    } else {
        // Display home screen with auth URL link
        res.render('home', { authUrl } );
    }

});

// Tell the app where to listen
app.listen(5000, () => console.log('App running here: http://localhost:5000'));