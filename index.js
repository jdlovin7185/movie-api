const express = require("express");
  morgan = require("morgan");

const app = express();

app.use(morgan('common'));


let topMovies = [
  {
    title: 'Inception',
    director: 'Christopher Nolan',
    genre: ['Action','Sci-fi'],
    description: `Dom Cobb (Leonardo DiCaprio) is a thief with the rare ability to enter people's dreams and steal their secrets from their subconscious. His skill has made him a hot commodity in the world of corporate espionage but has also cost him everything he loves. Cobb gets a chance at redemption when he is offered a seemingly impossible task- Plant an idea in someones mind. If he succeeds, it will be the perfect crime, but a dangerous enemy anticipates Cobb's every move.`,
    imageurl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ1wNJi3WBo8wjZ-lxg4xPbg6-X7tQ1w6ZFI5L-RH1rUiOOGxLO'
  },
  {
    title: 'Interstellar',
    director: 'Christopher Nolan',
    genre: ['Sci-fi','Adventure'],
    description: `In Earth's future, a global crop blight and second Dust Bowl are slowly rendering the planet uninhabitable. Professor Brand (Michael Caine), a brilliant NASA physicist, is working on plans to save mankind by transporting Earth's population to a new home via a wormhole. But first, Brand must send former NASA pilot Cooper (Matthew McConaughey) and a team of researchers through the wormhole and across the galaxy to find out which of three planets could be mankind's new home.`,
    imageurl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ftwitter.com%2Finterstellar&psig=AOvVaw0df02skQTiLtaDdxAKCdCI&ust=1614214268148000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIDWhomnge8CFQAAAAAdAAAAABAN'
  },
  {
    title: 'Pulp Fiction',
    director: 'Quentin Tarantino',
    genre: ['Crime','Drama'],
    description: `Vincent Vega (John Travolta) and Jules Winnfield (Samuel L. Jackson) are hitmen with a penchant for philosophical discussions. In this ultra-hip, multi-strand crime movie, their storyline is interwoven with those of their boss, gangster Marsellus Wallace (Ving Rhames) ; his actress wife, Mia (Uma Thurman) ; struggling boxer Butch Coolidge (Bruce Willis) ; master fixer Winston Wolfe (Harvey Keitel) and a nervous pair of armed robbers, "Pumpkin" (Tim Roth) and "Honey Bunny" (Amanda Plummer).`,
    imageurl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ftime.com%2F3505849%2Fpulp-fiction-20-years%2F&psig=AOvVaw3l1zZWX7QgtAvSo3cS_rMw&ust=1614214351843000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPjA-bSnge8CFQAAAAAdAAAAABAD'
  },
  {
    title: 'Once Upon a Time in Hollywood',
    director: 'Quentin Tarantino',
    genre: 'Comedy',
    description: `Actor Rick Dalton gained fame and fortune by starring in a 1950s television Western, but is now struggling to find meaningful work in a Hollywood that he doesn't recognize anymore. He spends most of his time drinking and palling around with Cliff Booth, his easygoing best friend and longtime stunt double. Rick also happens to live next door to Roman Polanski and Sharon Tate -- the filmmaker and budding actress whose futures will forever be altered by members of the Manson Family.`,
    imageurl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fvoicesfilm.com%2Fonce-upon-a-time-in-hollywood-review-tarantinos-best-film-since-pulp-fiction%2F&psig=AOvVaw2tiQVbGcS5D9hbsLNVDkyd&ust=1614214500706000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi5yPunge8CFQAAAAAdAAAAABAJ'
  },
  {
    title: 'Inglorious Basterds',
    director: 'Quentin Tarantino',
    genre: ['War','Action'],
    description: `It is the first year of Germany's occupation of France. Allied officer Lt. Aldo Raine (Brad Pitt) assembles a team of Jewish soldiers to commit violent acts of retribution against the Nazis, including the taking of their scalps. He and his men join forces with Bridget von Hammersmark, a German actress and undercover agent, to bring down the leaders of the Third Reich. Their fates converge with theater owner Shosanna Dreyfus, who seeks to avenge the Nazis' execution of her family.`,
    imageurl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.nme.com%2Fnews%2Fquentin-tarantino-fired-an-inglourious-basterds-extra-for-not-knowing-character-backstory-2561001&psig=AOvVaw0JpUJJpV3PyGFRA789lBHR&ust=1614214669676000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMiXxMmoge8CFQAAAAAdAAAAABAD'
  },
  {
    title: 'The Lincoln Lawyer',
    director: 'Brad Furman',
    genre: ['Thriller','Crime'],
    description: `Mick Haller (Matthew McConaughey) is a charismatic defense attorney who does business out of his Lincoln Continental sedan. Mick spends most of his time defending petty crooks and other bottom-feeders, so it comes as quite a surprise when he lands the case of a lifetime: defending a Beverly Hills playboy (Ryan Phillippe) who is accused of attempted murder. However, what Mick initially thinks is an open-and-shut case with a big monetary reward develops into something more sinister.`,
    imageurl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fuk.newonnetflix.info%2Finfo%2F70167077&psig=AOvVaw1s9wEHUpKZ6y-kFAr5d6Mv&ust=1614214794855000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPCt1vKoge8CFQAAAAAdAAAAABAD'
  },
  {
    title: 'L.A. Confidential',
    director: 'Curtis Hanson',
    genre: ['Crime','Mystery'],
    description: `Three policemen, each with his own motives and obsessions, tackle the corruption surrounding an unsolved murder at a downtown Los Angeles coffee shop in the early 1950s. Detective Lieutenant Exley (Guy Pearce), the son of a murdered detective, is out to avenge his father's killing. The ex-partner of Officer White (Russell Crowe), implicated in a scandal rooted out by Exley, was one of the victims. Sergeant Vincennes (Kevin Spacey) feeds classified information to a tabloid magnate (Danny DeVito).`,
    imageurl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rottentomatoes.com%2Fm%2Fla_confidential&psig=AOvVaw1UDe491Wgv4CJ_JYN2i5Rc&ust=1614214869451000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMi5opapge8CFQAAAAAdAAAAABAD'
  },
  {
    title: 'No Country for Old Men',
    director: 'Ethan Coen',
    genre: ['Thriller','Western'],
    description: `While out hunting, Llewelyn Moss (Josh Brolin) finds the grisly aftermath of a drug deal. Though he knows better, he cannot resist the cash left behind and takes it with him. The hunter becomes the hunted when a merciless killer named Chigurh (Javier Bardem) picks up his trail. Also looking for Moss is Sheriff Bell (Tommy Lee Jones), an aging lawman who reflects on a changing world and a dark secret of his own, as he tries to find and protect Moss.`,
    imageurl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT1REkY81hkRwYDGVTefIMxmWkQWCpk_UwIgS08ozZxYEG4klZr'
  },
  {
    title: 'Ford v Ferrari',
    director: 'James Mangold',
    genre: ['Sport','Drama'],
    description: `American automotive designer Carroll Shelby and fearless British race car driver Ken Miles battle corporate interference, the laws of physics and their own personal demons to build a revolutionary vehicle for the Ford Motor Co. Together, they plan to compete against the race cars of Enzo Ferrari at the 24 Hours of Le Mans in France in 1966.`,
    imageurl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.20thcenturystudios.com%2Fmovies%2Fford-v-ferrari&psig=AOvVaw2VlbLsXS5rk0G6Xlt1Syh-&ust=1614214979461000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLiQ08epge8CFQAAAAAdAAAAABAD'
  },
  {
    title: 'The Departed',
    director: 'Martin Scorsese',
    genre: ['Thriller','Crime'],
    description: `South Boston cop Billy Costigan (Leonardo DiCaprio) goes under cover to infiltrate the organization of gangland chief Frank Costello (Jack Nicholson). As Billy gains the mobster's trust, a career criminal named Colin Sullivan (Matt Damon) infiltrates the police department and reports on its activities to his syndicate bosses. When both organizations learn they have a mole in their midst, Billy and Colin must figure out each other's identities to save their own lives.`,
    imageurl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fboston.curbed.com%2Fmaps%2Fa-dozen-boston-spots-where-the-departed-was-filmed&psig=AOvVaw2JM2IR4sii2Q28Qj0PQwOW&ust=1614215092340000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIjqhpCqge8CFQAAAAAdAAAAABAD'
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