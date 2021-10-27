// Require necessary node modules
require( 'dotenv' ).config();
const express = require( 'express' );
const { Client } = require( 'pg' );
const axios = require( 'axios' );

// Create new Express app
const app = express();

// Set pug as the templating engine
app.set( 'view engine', 'pug' );

// Generate OAuth url
const authUrl = 'https://app.hubspot.com/oauth/authorize?' +
                'client_id=' + process.env.CLIENT_ID +
                '&redirect_uri=' + process.env.REDIRECT_URI +
                '&scope=' + process.env.SCOPE;

// Create new database connection
const client = new Client( {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
} );

// Create route for home
app.get( '/', async( req, res ) => {

    // Display authorization link
    res.render( 'home', { authUrl } );

} );

// Create route for oauth-callback
app.get( '/oauth-callback', async( req, res ) => {
    
    const authCodeProof = {
        grant_type: 'authorization_code',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        code: req.query.code
    };

    try {

        const params = new URLSearchParams( authCodeProof );

        // Send info to HubSpot
        const responseBody = await axios.post( 'https://api.hubapi.com/oauth/v1/token', params );

        // res.json( responseBody.data );

        const refreshToken = responseBody.data.refresh_token;
        const accessToken = responseBody.data.access_token;

        // Get account ID
        const tokenData = await axios.get( `https://api.hubapi.com/oauth/v1/access-tokens/${ accessToken }` );

        // res.json( tokenData.data );

        const hubID = tokenData.data.hub_id;

        // Connect to database
        client.connect();

        // Check database for account ID
        await client.query( `SELECT hs_account_id FROM users WHERE hs_account_id IN (${ hubID });`, ( err, res ) => {

            if( err ) throw err;

            for( let row of res.rows ) {

                console.log( JSON.stringify( row ) );

            }

            client.end();

        } );

        // client.query( 'SELECT table_schema,table_name FROM information_schema.tables;', ( err, res ) => {
        //     if( err ) throw err;
        //     for( let row of res.rows ) {
        //         console.log( JSON.stringify( row ) );
        //     }
        //     client.end();
        // } );


        // If account is already authorized
        // if() {
        // Display confirmation message
        // res.redirect( '/' );
        // } else {
        // Get account ID
        // Store account ID, refresh token, and access token in database
        // await client.query( `INSERT INTO users ( hs_account_id, hs_auth_token, hs_refresh_token ) VALUES ( ${ hubID }, '${ accessToken }', '${ refreshToken }' )`, ( err, res ) => {

        //     if( err ) throw err;

        //     for( let row of res.rows ) {

        //         console.log( JSON.stringify( row ) );

        //     }

        //     client.end();

        // } );
        // Display confirmation message
        // res.redirect( '/' );
        // }

        
        // Try to access API
        // If token doesn't work, refresh
        // const refreshToken = () => {

        //     try {

        //         const refreshTokenProof = {
        //             grant_type: 'refresh_token',
        //             client_id: process.env.CLIENT_ID,
        //             client_secret: process.env.CLIENT_SECRET,
        //             redirect_uri: process.env.REDIRECT_URI,
        //             code: req.query.code
        //         };

        //         const params = new URLSearchParams( authCodeProof );

        //         // Send info to HubSpot
        //         const responseBody = await axios.post( 'https://api.hubapi.com/oauth/v1/token', params );

        //         // Add new refresh token to DB

        //     } catch (e) {

        //         console.error(e);

        //     }

        // }

    } catch (e) {

        console.error(e);

    }

} );

// Tell the app where to listen
app.set( 'port', ( process.env.PORT || 5000 ) );

app.listen( app.get( 'port' ), () => { console.log( 'Node app is running on port', app.get( 'port' ) ) } );