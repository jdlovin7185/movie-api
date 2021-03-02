const express = require("express"),
      bodyParser = require('body-parser'),
      morgan = require("morgan"),
      mongoose = require('mongoose'),
      passport = require('passport'),
      cors = require('cors');
const { check } = require("express-validator");
const {check, validationResult} = require('express-validator');
require('./passport');

const app = express();
const Models = require('./model.js');
const Movie = Models.Movie;
const Users = Models.User;


app.use(bodyParser.json());
app.use(morgan('common'));
app.use(express.static('public'));
check('Username', 'Username contains non-alphanumeric characters - not allowed.').isAlphanumeric()


// mongoose.connect('mongodb://localhost:27017/myFlix', 
mongoose.connect( process.env.CONNECTION_URI,
{ useNewUrlParser: true, useUnifiedTopology: true });
  
  let auth = require('./auth')(app);
  
  let allowedOrigins = ['http://locaolhost:8080', 'http://testsite.com'];
  app.use(cors({
    origin: (origin, callback) => {
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1) {
        // if a specific origin isn't found on the list of allowed origins
        let message = `The CORS policy for this application doesn't allow access from ${origin}`;
        return callback(new Error(message ), false);
      }
      return callback(null, true);
    }
  }));



app.get('/', (req, res) => {
  res.send('Welcome to my movie collection!');
});

// get documentation
app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html',{root: __dirname});
});

// get all movies
app.get('/movies', passport.authenticate('jwt', {session: false}), (req, res) => {
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
app.get('/movies/:Title', passport.authenticate('jwt', {session: false}), (req, res) => {
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
app.get('/movies/genre/:Title', passport.authenticate('jwt', {session: false}), (req, res) => {
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
app.get('/movies/director/:Name', passport.authenticate('jwt', {session: false}), (req, res) => {
  Movie.findOne({ 'Director.Name': req.params.Name})
  .then((director) => {
    res.status(201).json(director.Director);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Update user info
app.put('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username}, 
    { $set: 
      {
        Username: req.body.Username,
        Password: req.body.Password,
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

// Get user info
app.post('/users', 
[
  check('Username', 'Username is required').isLength({min: 5}),
  check('Username', 'Username contians non alphanumeric characters - not allowed.').isAlphanumeric(),
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
app.post('/users/:Username/Movies/:FavoriteMovies', passport.authenticate('jwt', {session: false}), (req, res) => {
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

// Delete a movie from the user list
app.delete('/users/:Username/Movies/:FavoriteMovies', passport.authenticate('jwt', {session: false}), (req, res) => {
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
app.delete('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
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