const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());

const access_token ='BQD7brPt2c3ENXb-WkF0X1a0IlM7HeFUrIRiay7TPRAd-2ekyVjltCLNLJTiS_eU6RBYFhCxZWq7qRwVMPWWLwYu-fEbE1A9HQeqzzqwQUHbFGG_OU3iF2Gkrt8B6jLb-mYIxtCKlKjXLD5DlRnQyVDSvIZ9L83VMm30TuZcDeU'
const refresh_token = 'AQAoiRmHjuYjbQz51gEUXjL98e_PlSwPcGonvYfxS6oOs7tHhakvYvWhohZNwrNMx1k4OnIdyeKBg77UL9w9xpmQC0MpAZ92uHpzobO0pFNaADhU9eKHzeg8OtmNatvoY84';
        
// const mysql = require('mysql');
// const SELECT_ALL = "SELECT * FROM customer";
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: ' ',
//     database: 'mydb',
// })
// connection.connect(err => {
//     if(err) {
//         return err;
//     }
// })
// console.log(connection);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}


app.get('/api/customer', (req, res) => {
    const customers = [
        {id: 0, firstName: 'John', lastName: 'Doe'},
        {id: 1, firstName: 'SD', lastName: 'SD'},
        {id: 2, firstName: 'JoDGDGhn', lastName: 'DSDoe'},
        {id: 3, firstName: 'JoDGDGDhn', lastName: 'DoDGDGe'},
    ];
    res.json(customers);
});

app.get('/api/education', (req, res) => {
    const schools = [
        {name: 'Northeastern University', location: 'Boston, MA' , gpa: '3.433', concetration: 'Computer Science, Class of 2022', activities: 'FFffff'},
        {name: 'Harvard-Westlake High School', location: 'Studio City, CA' , gpa: '3.433', concetration: 'Computer Science, Class of 2022', activities: 'FFffff'}
    ]
    res.json(schools);
});

app.get('/api/contact', (req, res) => {
    const contacts = [
        {id: 0, name: 'LinkedIn', img_src: '/images/linkedin.png', link: 'https://www.linkedin.com/in/gabriel-peter/', content: '/in/gabriel-peter/'},
        {id: 1, name: 'Email', img_src: '/images/email.jpg', link: 'mailto:peter.g@husky.neu.edu', content: 'peter.g@husky.neu.edu'},
        {id: 2, name: 'Address', img_src: '/images/house.jpg', link: 'https://www.google.com/search?q=hollywood+google+maps&oq=hollywood+googl&aqs=chrome.0.0j69i57j0l6.5496j0j7&sourceid=chrome&ie=UTF-8#', content: '225 North Gramercy Place Los Angeles, CA 90004'},
        {id: 3, name: 'Phone', img_src: '/images/phone.png', link: '', content: '(323)-533-1894' },
        {id: 4, name: 'Github', img_src: '/images/github.png', link: 'https://github.com/gabriel-peter', content: '/gabriel-peter' },
    ];
    res.json(contacts);
});

app.get('/api/personal-token', (req, res) => {
    res.json({'access_token': access_token, 'refresh_token': refresh_token})
});

app.get('/api/map-key', (req, res) => {
  res.json({'key': 'AIzaSyB4ZrcYecpeQwsvLaRxrnM4IFbI09P4jPA'});
});

// SPOTIFY COMPONENT
// https://developer.spotify.com/dashboard/applications/1bb626d08698445daef7e4dee1970679

var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = '1bb626d08698445daef7e4dee1970679'; // Your client id
var client_secret = '61b1bbfe4c094b6ba3fcb264b02c514c'; // Your secret
var redirect_uri = `http://www.gabrielpeter.net/callback`; // Or Your redirect uri

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
        res.redirect('/spotify/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('http://www.gabrielpeter.net/spotify/#' +
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

app.listen(port, () => console.log(`Server started on port ${port}`));