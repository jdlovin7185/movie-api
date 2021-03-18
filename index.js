const express = require("express"),
      bodyParser = require('body-parser'),
      morgan = require("morgan"),
      mongoose = require('mongoose'),
      passport = require('passport'),
      cors = require('cors');
const {check, validationResult} = require('express-validator');



const app = express();
const Models = require('./model.js');
const Movie = Models.Movie;
const Users = Models.User;


app.use(express.json());
app.use(morgan('common'));
app.use(express.static('public'));
check('Username', 'Username contains non-alphanumeric characters - not allowed.').isAlphanumeric()

// mongoose.connect('mongodb://localhost:27017/myFlixDB', 
mongoose.connect( process.env.CONNECTION_URI,
  { useNewUrlParser: true, useUnifiedTopology: true });
  

  require('./passport');
  
  const allowedOrigins = ['http://localhost:8080', 'https://myflix1-0.herokuapp.com/', 'http://localhost:1234'];
  app.use(cors({
    origin: (origin, callback) => {
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1) {
        // if a specific origin isn't found on the list of allowed origins
        let message = `The CORS policy for this application doesn't allow access from origin` + origin;
        return callback(new Error(message ), false);
      }
      return callback(null, true);
    }
  }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:1234");
  next();
});

let auth = require('./auth')(app);

app.get('/', (req, res) => {
  res.send('Welcome to my movie collection!');
});

// get documentation
app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html',{root: __dirname});
});

// get all movies
app.get('/movies', 
passport.authenticate('jwt', {session: false}),
 (req, res) => {
  Movie.find()
  .then((movie) => {
    res.status(201).json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// get movie by title
app.get('/movies/:Title', 
// passport.authenticate('jwt', {session: false}),
 (req, res) => {
  Movie.findOne({ Title: req.params.Title})
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get the genre of the movie
app.get('/movies/genre/:Title', 
// passport.authenticate('jwt', {session: false}), 
(req, res) => {
  Movie.findOne({ Title: req.params.Title})
    .then((movie) => {
      res.json(movie.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// About a director
app.get('/movies/director/:Name', 
// passport.authenticate('jwt', {session: false}), 
(req, res) => {
  Movie.findOne({ 'Director.Name': req.params.Name})
  .then((director) => {
    res.status(201).json(director.Director);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//  Update user info
app.put('/users/:Username', 
// passport.authenticate('jwt', {session: false}),
 (req, res) => {
  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOneAndUpdate({ Username: req.params.Username}, 
    { $set: 
      {
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true },
    (err, updatedUser) => {
      if(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

// Gets a list of users
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
  .then((user) => {
    res.json(user);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Become a user
app.post('/users', 
// passport.authenticate('jwt', {session: false}),
[
  check('Username', 'Username is required').isLength({min: 5}),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()
], (req, res) => {

  // check the validation object for errors
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array() });
  }
  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
        .create({
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
        .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Add a movie to the user
app.post('/users/:Username/Movies/:FavoriteMovies', 
// passport.authenticate('jwt', {session: false}),
 (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username},
    { $push: {FavoriteMovies: req.params.FavoriteMovies}},
    {new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.status(200).json(updatedUser);
      }
    });
});

app.get('/users/movies/:Username', 
// passport.authenticate('jwt', {session: false}),
 (req, res) => {
  Users.findOne({ Username: req.params.Username},
    { $pull: { FavoriteMovies: req.params.FavoriteMovies}},
     {new: true },
     (err, updatedUser) => {
       if(err) {
         console.error(err);
         res.status(500).send('Error: ' + err);
       } else {
         res.json(updatedUser);
       }
     });
});

// Delete a movie from the user list
app.delete('/users/:Username/Movies/:FavoriteMovies', 
// passport.authenticate('jwt', {session: false}),
 (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username},
    { $pull: { FavoriteMovies: req.params.FavoriteMovies}},
     {new: true },
     (err, updatedUser) => {
       if(err) {
         console.error(err);
         res.status(500).send('Error: ' + err);
       } else {
         res.json(updatedUser);
       }
     });
});

// Delete a user
app.delete('/users/:Username', 
// passport.authenticate('jwt', {session: false}),
 (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then((user) => {
    if (!user) {
      res.status(400).send(req.params.Username + ' was not found');
    } else {
      res.status(200).send(req.params.Username + ' was deleted.');
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});



const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
  console.log('Listening on Port ' + port);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('What did you break this time? ' + err);
});