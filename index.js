const express = require("express");
  morgan = require("morgan");

const app = express();

app.use(morgan('common'));


let topMovies = [
  {
    title: 'Inception',
    director: 'Christopher Nolan',
    genre: ['Action','Sci-fi']
  },
  {
    title: 'Interstellar',
    director: 'Christopher Nolan',
    genre: ['Sci-fi','Adventure']
  },
  {
    title: 'Pulp Fiction',
    director: 'Quentin Tarantino',
    genre: ['Crime','Drama']
  },
  {
    title: 'Once Upon a Time in Hollywood',
    director: 'Quentin Tarantino',
    genre: 'Comedy'
  },
  {
    title: 'Inglorious Basterds',
    director: 'Quentin Tarantino',
    genre: ['War','Action']
  },
  {
    title: 'The Lincoln Lawyer',
    director: 'Brad Furman',
    genre: ['Thriller','Crime']
  },
  {
    title: 'L.A. Confidential',
    director: 'Curtis Hanson',
    genre: ['Crime','Mystery']
  },
  {
    title: 'No Country for Old Men',
    director: 'Ethan Coen',
    genre: ['Thriller','Western']
  },
  {
    title: 'Ford v Ferrari',
    director: 'James Mangold',
    genre: ['Sport','Drama']
  },
  {
    title: 'The Departed',
    director: 'Martin Scorsese',
    genre: ['Thriller','Crime']
  }
];



app.get('/', (req, res) => {
  res.send('Welcome to my movie collection!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html',{root: __dirname});
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.get('/movies/all',(req, res) => {
  res.send('This GET request was successful');
});

app.get('/movies/title/:genre',(req, res) => {
  res.json(topMovies.find((style) =>
    {return style.genre === req.params.genre}));
});

app.get('/movies/:director', (req, res) => {
  res.json(topMovies.find((person) =>
    {return person.director === req.params.director}));
});

app.post('/user/registration', (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = 'Missing "name" in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    user.push(newUser);
    res.status(201).send(newUser);
  }
});

app.post('/users', (req, res) => {
  res.send('You need to update your profile');
});

app.put('/users/movies', (req, res) => {
  res.send('Whats your favorite movie?');
});

app.delete('/users/title', (req, res) => {
  res.send('But it was rated 89 on Metacritic. Do not delete!');
});

app.delete('/users/email', (req, res) => {
  res.send('Alright we shall see you later then');
});



app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('What did you break this time?');
});