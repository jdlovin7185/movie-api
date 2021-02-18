const express = require("express"),

const app = express();

let topMovies = [
  {
    title: 'Inception',
    director: 'Christopher Nolan'
  },
  {
    title: 'Interstellar',
    director: 'Christopher Nolan'
  },
  {
    title: 'Pulp Fiction',
    director: 'Quentin Tarantino'
  },
  {
    title: 'Once Upon a Time in Hollywood',
    director: 'Quentin Tarantino'
  },
  {
    title: 'Inglorious Basterds',
    director: 'Quentin Tarantino'
  },
  {
    title: 'The Lincoln Lawyer',
    director: 'Brad Furman'
  },
  {
    title: 'L.A. Confidential',
    director: 'Curtis Hanson'
  },
  {
    title: 'No Country for Old Men',
    director: 'Ethan Coen'
  },
  {
    title: 'Ford v Ferrari',
    director: 'James Mangold'
  },
  {
    title: 'The Departed',
    director: 'Martin Scorsese'
  }
];

app.get('/', (req, res) => {
  res.send('Welcome to my movie collection!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: _dirname });
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});