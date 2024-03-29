const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const path = require('path');
const request = require('request'); // "Request" library
var forceSsl = require('express-force-ssl');
const querystring = require('querystring');
const SpotifyWebApi = require('spotify-web-api-node');
const dotenv = require('dotenv'); // for acquiring env variables both dev and prod
dotenv.config();
app.use(cors());

// POST body parsing
const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded());

app.use(bodyParser.json());


// Cookie Handling
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// Redirects non-SSL connections aka HTTP
// Doesnt work :( TODO
// if (process.env.NODE_ENV === 'production') {
//   app.use(forceSsl);
// }

// MIX ASSIST

var sqlite3 = require('sqlite3').verbose();
var file = 'drinks.db';
var db = new sqlite3.Database(file);

// CONSTS
var scope = 'user-top-read user-read-private user-read-email user-read-playback-state';
const client_id = process.env.client_id;
const client_secret = process.env.client_secret;
const redirect_uri = process.env.PORT? 'https://gabrielpeter.net/spotify':'https://localhost:3000/spotify';
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

app.post('/api/signup', (req, res) => {
  console.log(req.body);
  // INSERT USER TODO
  res.send(req.body);
});

app.get('/api/user/id/:id', (req, res) => {
  db.all('SELECT * FROM users WHERE id==\''+ req.params.id + '\'', (err, rows) => {
    if (err) {
      console.log(err);
    }
    res.json(rows);
  })
});

app.get('/api/user/google-id/:id', (req, res) => {
  db.all('SELECT * FROM users WHERE google_id==\''+ req.params.id + '\'', (err, rows) => {
    if (err) {
      console.log(err);
    }
    res.json(rows);
  })
});

app.get('/api/user/facebook-id/:id', (req, res) => {
  db.all('SELECT * FROM users WHERE facebook_id==\''+ req.params.id + '\'', (err, rows) => {
    if (err) {
      console.log(err);
    }
    res.json(rows);
  })
});


app.get('/api/all-drinks', (req, res) => {
  // console.log('HITTTTTT')
  db.all('SELECT * FROM drinks LIMIT 20', (err, rows)=> {
    if (err) {
      console.log(err);
    }
    res.json(rows);
  });
});

// https://www.w3schools.com/nodejs/nodejs_mysql_insert.asp
app.post('/api/make-drink', (req, res) => {
  console.log('Received Submission Request for:', req.body);
  // res.send(req.body);
  var sql = "INSERT INTO drinks (id, d_name, d_cat, d_alcohol, d_glass, d_instructions, d_img_url, d_ingredients, d_creator) VALUES (";
  var parsed_ingredients = '';
  // var ingredients = req.body.d_ingredients
  for(var i = 0; i < req.body.d_ingredients.length; i++) {
    parsed_ingredients += req.body.d_ingredients[i].item+','+req.body.d_ingredients[i].measurement + ' ' + req.body.d_ingredients[i].unit + '|';
  }
    sql += '\'' + Math.floor((Math.random() * 100) + 1) + '\', ',
    sql += '\'' + req.body.d_name + '\', '
    sql += '\'' + req.body.d_cat + '\', '
    sql += '\'' + req.body.d_alcohol + '\', '
    sql += '\'' + req.body.d_glass + '\', '
    sql += '\'' + req.body.d_instructions + '\', '
    // req.body.d_img_url, 
    sql += '\'' + req.body.d_img_url +  '\', '
    sql += '\'' + parsed_ingredients + '\', '
    sql += '\'' + req.body.d_creator  + '\')'
  // ];
    console.log(sql);
  db.run(sql, (err, data, fields) => {
    if (err) throw err;
    res.json({
      status: 200,
      message: "New user added successfully"
    })
  })
});

app.get('/setuser', (req, res)=>{ 
  // TODO Append data to this.
  res.cookie('savedDrinks', []); 
  res.send('user data added to cookie'); 
}); 

// Makes these post req and have body params of user-id, and drink-id
app.get('/addDrink/:id', (req, res)=>{ 
  // TODO Append data to this.
  let newSavedDrinks = req.cookies['savedDrinks'];
  console.log('New Drink Added', req.params.id);
  newSavedDrinks.push(req.params.id);
  res.cookie('savedDrinks', newSavedDrinks); 
  res.send(req.params.id + ' drink added to cookie'); 
}); 

app.get('/removeDrink/:id', (req, res)=>{ 
  // TODO Append data to this.
  let newSavedDrinks = req.cookies['savedDrinks'];
  newSavedDrinks = newSavedDrinks.filter(item => item !== req.params.id);
  console.log('SAVED DRINKS', newSavedDrinks);
  res.cookie('savedDrinks', newSavedDrinks); 
  res.send(req.params.id + ' drink removed from cookie'); 
}); 

app.get('/getuser', (req, res)=>{ 
  //shows all the cookies 
  console.log(req);
  res.send(req.cookies); 
}); 

app.get('/clearCookie', (req, res)=>{ 
  //it will clear the userData cookie 
  res.clearCookie('savedDrinks'); 
  res.send('user logout successfully'); 
});

app.get('/api/saved-drinks/:user_id', (req, res) => {
  let drinkNames = '';
  if(req.params.user_id === 'none') {
    drinkNames = req.cookies.savedDrinks;
  } else {
    // TODO find saved-Drinks of certain user-id
  }
  
  console.log(drinkNames);
  var results = [];
  var querystring = 'SELECT * FROM drinks WHERE ';
  for(var i = 0; i < drinkNames.length; i++) {
    
    querystring += 'd_name=\'' + drinkNames[i] + '\'';
    if(i !== drinkNames.length-1) {
      querystring += ' OR ';
    }
    console.log(querystring);
  }
  db.all(querystring, (err, rows)=> {
    if (err) {
      console.log(err);
    }
    console.log(rows);
    res.json(rows);
    });
});

app.get('/api/search/:name', (req, res) => {
  db.all('SELECT * FROM drinks WHERE d_name LIKE \'' + req.params.name + '%\' LIMIT 20', (err, rows) => {
    if (err) {
      console.log(err);
    }
    res.json(rows);
  })
});

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

// app.use((req,resp,next) => {
//   if (!req.secure) {
//       return res.redirect('https://' + req.headers.host + req.url);
//   }
//     next();
// });

// PRODUCTION
// https://daveceddia.com/unexpected-token-in-json-at-position-0/ Lesson Learned lol
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

app.listen(PORT, 
  () => console.log(`Server started on port ${PORT}`)
  );

console.log('CLOSING DB CONNECTION');
// db.close();