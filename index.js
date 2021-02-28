const express = require("express"),
      bodyParser = require('body-parser'),
      morgan = require("morgan"),
      mongoose = require('mongoose');

const Models = require('./model.js');

const app = express();
app.use(bodyParser.json());
const Movie = Models.Movie;
const Users = Models.User;



app.use(morgan('common'));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/myFlix', {
useNewUrlParser: true, useUnifiedTopology: true });


app.get('/', (req, res) => {
  res.send('Welcome to my movie collection!');
});

// get documentation
app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html',{root: __dirname});
});

// get all movies
app.get('/movies', (req, res) => {
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
app.get('/movies/:Title',(req, res) => {
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
app.get('/movies/genre/:Title',(req, res) => {
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
app.get('/movies/director/:Name', (req, res) => {
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
app.put('/users/:Username', (req, res) => {
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
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
        .create({
          Username: req.body.Username,
          Password: req.body.Password,
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
app.put('/users/:Username/Movies/:FavoriteMovies', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username},
    { $pull: {FavoriteMovies: req.params.FavoriteMovies}},
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
app.delete('/users/:Username/Movies/:FavoriteMovies', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username},
    { $pull: { FavoriteMovies: req.params.MovieID}},
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
app.delete('/users/:Username', (req, res) => {
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



app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('What did you break this time? ' + err);
});