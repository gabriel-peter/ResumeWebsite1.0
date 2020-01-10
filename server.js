const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const path = require('path');
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const dotenv = require('dotenv');
dotenv.config();
app.use(cors());

// PRODUCTION
 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

// CONSTS
var scope = 'user-top-read user-read-private user-read-email user-read-playback-state';
var client_id = '1bb626d08698445daef7e4dee1970679'; // Your client id
var client_secret = '61b1bbfe4c094b6ba3fcb264b02c514c'; // Your secret
// const client_id = process.env.client_id;
// const client_secret = process.env.client_secret;
const redirect_uri = process.env.PORT? 'http://gabrielpeter.net/spotify/':'http://localhost:3000/spotify/';
const redirectUriParameters = {
  client_id: client_id,
  response_type: 'token',
  scope: scope,
  redirect_uri: redirect_uri,
  show_dialog: true,
}
const authUri = 'https://accounts.spotify.com/authorize?' + querystring.stringify(redirectUriParameters);
const personal_access_token = process.env.personal_access_token;
const personal_refresh_token = process.env.personal_refresh_token;
// NEW SPOTIFY CODE from Inspiration: https://glitch.com/edit/#!/spotify-audio-analysis?path=server.js:12:0
// https://developer.spotify.com/dashboard/applications/1bb626d08698445daef7e4dee1970679

var spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
});

console.log(typeof (personal_access_token), personal_refresh_token, client_id, client_secret) 

function authenticate(callback) {
  spotifyApi.clientCredentialsGrant()
    .then(function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
    
      callback instanceof Function && callback();

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    }, function(err) {
      console.log('Something went wrong when retrieving an access token', err.message);
    });
}
authenticate();


app.get("/spotifyRedirectUri", function (request, response) {
  // response.send(JSON.stringify({
  //   authUri
  // }, null, 2))
  response.json(authUri)
});

const reAuthenticateOnFailure = (action) => {
  action(() => {
    authenticate(action);
  })
}

app.get("/search", function (request, response) {
  reAuthenticateOnFailure((failure) => {
    spotifyApi.searchTracks(request.query.query, { limit: 2 })
    .then(function(data) {
      response.send(data.body);
    }, failure);
  })
});

// ABOUT ME PAGE ENDPOINTS

app.get('/api/education', (req, res) => {
    const schools = [
        {name: 'Northeastern University', location: 'Boston, MA' , gpa: '3.433', concetration: 'Computer Science, Class of 2022', activities: 'FFffff'},
        {name: 'Harvard-Westlake High School', location: 'Studio City, CA' , gpa: '3.433', concetration: 'Computer Science, Class of 2022', activities: 'FFffff'}
    ]
    res.json(schools);
});

app.get('/api/personal-token', (req, res) => {
    const tokens = {'access_token': personal_access_token, 'refresh_token': personal_refresh_token};
    res.json(tokens)
});

app.get('/api/map-key', (req, res) => {
  res.json({'key': 'AIzaSyB4ZrcYecpeQwsvLaRxrnM4IFbI09P4jPA'});
});

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

app.use(express.static(__dirname + '/public'))
   .use(cookieParser());

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-top-read user-read-private user-read-email user-read-playback-state';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
      show_dialog: true,
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter
  
  var code = req.query.code || null;
  console.log(code, "HITTTT");
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code',
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('http://localhost:3000/spotify/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('http://localhost:3000/spotify/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});


app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));