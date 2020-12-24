const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const path = require('path');
const request = require('request'); // "Request" library
const querystring = require('querystring');
const SpotifyWebApi = require('spotify-web-api-node');
const dotenv = require('dotenv'); // for acquiring env variables both dev and prod
dotenv.config();
app.use(cors());

// Cookie Handling
var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/setuser', (req, res)=>{ 
  // TODO Append data to this.
  res.cookie("userData", 'req.data'); 
  res.send('user data added to cookie'); 
}); 

app.get('/getuser', (req, res)=>{ 
  //shows all the cookies 
  res.send(req.cookies); 
}); 

app.get('/logout', (req, res)=>{ 
  //it will clear the userData cookie 
  res.clearCookie('userData'); 
  res.send('user logout successfully'); 
});


// MIX ASSIST

var sqlite3 = require('sqlite3').verbose();
var file = 'drinks.db';
var db = new sqlite3.Database(file);

// CONSTS
var scope = 'user-top-read user-read-private user-read-email user-read-playback-state';
const client_id = process.env.client_id;
const client_secret = process.env.client_secret;
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

/**
 * SPOTIFY ENDPOINTS
 */

app.get('/api/spotifyRedirectUri', (request, response) => {
  response.json(authUri)
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

app.get('/api/personal-token', (req, res) => {
    const tokens = {'access_token': personal_access_token, 'refresh_token': personal_refresh_token};
    res.json(tokens)
});

/**
 * DRINKS DB ENDPOINTS
 */

app.get('/api/all-drinks', (req, res) => {
  // console.log('HITTTTTT')
  db.all('SELECT * FROM drinks LIMIT 20', (err, rows)=> {
    if (err) {
      console.log(err);
    }
    res.json(rows);
  });
});

app.post('/api/make', (req, res) => {
  // TODO
});

app.get('/api/search/:name', (req, res) => {
  db.all('SELECT * FROM drinks WHERE d_name LIKE \'' + req.params.name + '%\' LIMIT 20', (err, rows) => {
    if (err) {
      console.log(err);
    }
    res.json(rows);
  })
});
// app.get('/api/search/contains/:value', (req, res) => {
//   // let sqlQuery = 'SELECT * FROM drinks WHERE instr(d_ingredients, \''+ req.params.value + '%\') > 0 LIMIT 20';
//   let sqlQuery = 'SELECT * FROM drinks WHERE d_ingredients LIKE\''+ req.params.value + '%\') > 0 LIMIT 20';
//   db.all(sqlQuery, (err, rows) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(sqlQuery, rows.length);
//     res.json(rows);
//   })
// });

app.get('/api/search/:filter/:value', (req, res) => {
  let sqlQuery = 'SELECT * FROM drinks WHERE '+ req.params.filter +' LIKE \'' + req.params.value + '%\' LIMIT 20'
  db.all(sqlQuery, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.log(sqlQuery, rows.length);
    res.json(rows);
  })
});

app.delete('/api/delete/:name', (req, res) => {
  // TODO
});

// PRODUCTION
// https://daveceddia.com/unexpected-token-in-json-at-position-0/ Lesson Learned lol
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

app.listen(PORT, 
  // () => console.log(`Server started on port ${PORT}`)
  );

console.log('CLOSING DB CONNECTION');
// db.close();