const express = require("express");
  morgan = require("morgan");

const mongoose = require('mongoose');
const Models = require('./modal.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/moviedb', {
useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(morgan('common'));


let topMovies = [
  {
    title: 'Inception',
    description: `Dom Cobb (Leonardo DiCaprio) is a thief with the rare ability to enter people's dreams and steal their secrets from their subconscious. His skill has made him a hot commodity in the world of corporate espionage but has also cost him everything he loves. Cobb gets a chance at redemption when he is offered a seemingly impossible task- Plant an idea in someones mind. If he succeeds, it will be the perfect crime, but a dangerous enemy anticipates Cobb's every move.`,
    genre: {
      Name: 'Action',
      Description: `Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, rescues and frantic chases.`
    },
    director: {
      Name: 'Christopher Nolan',
      Bio: `Christopher Edward Nolan CBE is a British-American film director, producer, and screenwriter. His directorial efforts have grossed more than US$5.1 billion worldwide, garnered 34 Oscar nominations and ten wins. Born and raised in London, Nolan developed an interest in filmmaking from a young age.`,
      Birth: `July 30, 1970`
    },
    imageurl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ1wNJi3WBo8wjZ-lxg4xPbg6-X7tQ1w6ZFI5L-RH1rUiOOGxLO',
    Featured: true
  },
  {
    title: 'Interstellar',
    description: `In Earth's future, a global crop blight and second Dust Bowl are slowly rendering the planet uninhabitable. Professor Brand (Michael Caine), a brilliant NASA physicist, is working on plans to save mankind by transporting Earth's population to a new home via a wormhole. But first, Brand must send former NASA pilot Cooper (Matthew McConaughey) and a team of researchers through the wormhole and across the galaxy to find out which of three planets could be mankind's new home.`,
    genre: {
      Name: 'Sci-fi',
      Description: `Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, alien worlds, extrasensory perception and time travel, along with futuristic elements such as spacecraft, robots, cyborgs, interstellar travel or other technologies.`
    },
    director: {
      Name: 'Christopher Nolan',
      Bio: `Christopher Edward Nolan CBE is a British-American film director, producer, and screenwriter. His directorial efforts have grossed more than US$5.1 billion worldwide, garnered 34 Oscar nominations and ten wins. Born and raised in London, Nolan developed an interest in filmmaking from a young age.`,
      Birth: `July 30, 1970`
    },
    imageurl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ftwitter.com%2Finterstellar&psig=AOvVaw0df02skQTiLtaDdxAKCdCI&ust=1614214268148000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIDWhomnge8CFQAAAAAdAAAAABAN'
  },
  {
    title: 'Pulp Fiction',
    description: `Vincent Vega (John Travolta) and Jules Winnfield (Samuel L. Jackson) are hitmen with a penchant for philosophical discussions. In this ultra-hip, multi-strand crime movie, their storyline is interwoven with those of their boss, gangster Marsellus Wallace (Ving Rhames) ; his actress wife, Mia (Uma Thurman) ; struggling boxer Butch Coolidge (Bruce Willis) ; master fixer Winston Wolfe (Harvey Keitel) and a nervous pair of armed robbers, "Pumpkin" (Tim Roth) and "Honey Bunny" (Amanda Plummer).`,
    genre: {
      Name: 'Drama',
      Description: `In film and television, drama is a category of narrative fiction intended to be more serious than humorous in tone.`
    },
    director: {
      Name: 'Quentin Tarantino',
      Bio: 'Quentin Jerome Tarantino is an American film director, screenwriter, producer, and actor. His films are characterized by nonlinear storylines, dark humor, aestheticization of violence, extended scenes of dialogue, ensemble casts, references to popular culture and a wide variety of other films, eclectic soundtracks primarily containing songs and score pieces from the 1960s to the 1980s, alternate history, and features of neo-noir film.',
      Birth: 'March 27, 1963'
    },
    imageurl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ftime.com%2F3505849%2Fpulp-fiction-20-years%2F&psig=AOvVaw3l1zZWX7QgtAvSo3cS_rMw&ust=1614214351843000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPjA-bSnge8CFQAAAAAdAAAAABAD',
    Featured: true
  },
  {
    title: 'Once Upon a Time in Hollywood',
    description: 'Actor Rick Dalton gained fame and fortune by starring in a 1950s television Western, but is now struggling to find meaningful work in a Hollywood that he doesn\'t recognize anymore. He spends most of his time drinking and palling around with Cliff Booth, his easygoing best friend and longtime stunt double. Rick also happens to live next door to Roman Polanski and Sharon Tate -- the filmmaker and budding actress whose futures will forever be altered by members of the Manson Family.',
    genre: {
      Name: "Comedy",
      description: "A comedy film is a category of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect. Films in this style traditionally have a happy ending."
    },
    director: {
      Name: 'Quentin Tarantino',
      Bio: 'Quentin Jerome Tarantino is an American film director, screenwriter, producer, and actor. His films are characterized by nonlinear storylines, dark humor, aestheticization of violence, extended scenes of dialogue, ensemble casts, references to popular culture and a wide variety of other films, eclectic soundtracks primarily containing songs and score pieces from the 1960s to the 1980s, alternate history, and features of neo-noir film.',
      Birth: 'March 27, 1963'
    },
    imageurl: 'picture.png',
    Featured: true
  },
  {
    title: 'Inglorious Basterds',
    description: `It is the first year of Germany's occupation of France. Allied officer Lt. Aldo Raine (Brad Pitt) assembles a team of Jewish soldiers to commit violent acts of retribution against the Nazis, including the taking of their scalps. He and his men join forces with Bridget von Hammersmark, a German actress and undercover agent, to bring down the leaders of the Third Reich. Their fates converge with theater owner Shosanna Dreyfus, who seeks to avenge the Nazis' execution of her family.`,
    genre: {
      Name: 'Action',
      Description: `Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, rescues and frantic chases.`
    },
    director: {
      Name: 'Quentin Tarantino',
      Bio: 'Quentin Jerome Tarantino is an American film director, screenwriter, producer, and actor. His films are characterized by nonlinear storylines, dark humor, aestheticization of violence, extended scenes of dialogue, ensemble casts, references to popular culture and a wide variety of other films, eclectic soundtracks primarily containing songs and score pieces from the 1960s to the 1980s, alternate history, and features of neo-noir film.',
      Birth: 'March 27, 1963'
    },
    imageurl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.nme.com%2Fnews%2Fquentin-tarantino-fired-an-inglourious-basterds-extra-for-not-knowing-character-backstory-2561001&psig=AOvVaw0JpUJJpV3PyGFRA789lBHR&ust=1614214669676000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMiXxMmoge8CFQAAAAAdAAAAABAD'
  },
  {
    title: 'The Lincoln Lawyer',
    description: `Mick Haller (Matthew McConaughey) is a charismatic defense attorney who does business out of his Lincoln Continental sedan. Mick spends most of his time defending petty crooks and other bottom-feeders, so it comes as quite a surprise when he lands the case of a lifetime: defending a Beverly Hills playboy (Ryan Phillippe) who is accused of attempted murder. However, what Mick initially thinks is an open-and-shut case with a big monetary reward develops into something more sinister.`,
    genre: {
      Name: 'Thriller',
      Description: 'Thriller is a genre of fiction, having numerous, often overlapping subgenres. Thrillers are characterized and defined by the moods they elicit, giving viewers heightened feelings of suspense, excitement, surprise, anticipation and anxiety.'
    },
    director: {
      Name: 'Brad Furman',
      Bio: 'Brad Furman is an American film and music video director, producer, and writer.'
    },
    imageurl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fuk.newonnetflix.info%2Finfo%2F70167077&psig=AOvVaw1s9wEHUpKZ6y-kFAr5d6Mv&ust=1614214794855000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPCt1vKoge8CFQAAAAAdAAAAABAD'
  },
  {
    title: 'L.A. Confidential',
    description: `Three policemen, each with his own motives and obsessions, tackle the corruption surrounding an unsolved murder at a downtown Los Angeles coffee shop in the early 1950s. Detective Lieutenant Exley (Guy Pearce), the son of a murdered detective, is out to avenge his father's killing. The ex-partner of Officer White (Russell Crowe), implicated in a scandal rooted out by Exley, was one of the victims. Sergeant Vincennes (Kevin Spacey) feeds classified information to a tabloid magnate (Danny DeVito).`,
    genre: {
      Name: 'Crime',
      Description: 'Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection.'
    },
    director: {
      Name: 'Curtis Hanson',
      Bio: 'Curtis Lee Hanson was an American film director, screenwriter, and producer. His directing work included the psychological thriller The Hand That Rocks the Cradle (1992), the neo-noir crime film L.A. Confidential (1997), the comedy Wonder Boys (2000), the hip-hop biopic 8 Mile (2002), the romantic comedy-drama In Her Shoes (2005), and the made-for-television docudrama Too Big to Fail (2011).',
      Birth: 'March 24, 1945',
      Death: 'September 20, 2016'
    },
    imageurl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rottentomatoes.com%2Fm%2Fla_confidential&psig=AOvVaw1UDe491Wgv4CJ_JYN2i5Rc&ust=1614214869451000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMi5opapge8CFQAAAAAdAAAAABAD',
    Featured: true
  },
  {
    title: 'No Country for Old Men',
    description: `While out hunting, Llewelyn Moss (Josh Brolin) finds the grisly aftermath of a drug deal. Though he knows better, he cannot resist the cash left behind and takes it with him. The hunter becomes the hunted when a merciless killer named Chigurh (Javier Bardem) picks up his trail. Also looking for Moss is Sheriff Bell (Tommy Lee Jones), an aging lawman who reflects on a changing world and a dark secret of his own, as he tries to find and protect Moss.`,
    genre: {
      Name: 'Western',
      Description: 'Western is a genre of fiction set primarily in the latter half of the 19th and early 20th century in the Western United States, which is styled the "Old West". Its stories commonly center on the life of a nomadic cowboy or gunfighter armed with a revolver and a rifle who rides a horse.'
    },
    director: {
      Name: 'Ethan Coen',
      Bio: 'Ethan Coen was born on September 21, 1957 in Minneapolis, Minnesota, USA as Ethan Jesse Coen. He is a producer and writer, known for The Ballad of Buster Scruggs (2018), Inside Llewyn Davis (2013) and A Serious Man (2009). He has been married to Tricia Cooke since October 2, 1990. They have two children.',
      Birth: 'September 21, 1957'
    },
    imageurl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT1REkY81hkRwYDGVTefIMxmWkQWCpk_UwIgS08ozZxYEG4klZr',
    Featured: true
  },
  {
    title: 'Ford v Ferrari',
    description: `American automotive designer Carroll Shelby and fearless British race car driver Ken Miles battle corporate interference, the laws of physics and their own personal demons to build a revolutionary vehicle for the Ford Motor Co. Together, they plan to compete against the race cars of Enzo Ferrari at the 24 Hours of Le Mans in France in 1966.`,
    genre: {
      Name: 'Sport',
      Description: 'A sports film is a film genre that uses sport as the theme of the film. It is a production in which a sport, sporting event, athlete, or follower of sport are prominently featured, and which depend on sport to a significant degree for their plot motivation or resolution.'
    },
    director: {
      Name: 'James Mangold',
      Bio: 'James Mangold is an American film and television director, screenwriter and producer. He is best known for the films Cop Land, Girl, Interrupted, Walk the Line, The Wolverine and Logan, the last of which earned him a nomination for the Academy Award for Best Adapted Screenplay.',
      Birth: 'December 16, 1963'
    },
    imageurl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.20thcenturystudios.com%2Fmovies%2Fford-v-ferrari&psig=AOvVaw2VlbLsXS5rk0G6Xlt1Syh-&ust=1614214979461000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLiQ08epge8CFQAAAAAdAAAAABAD'
  },
  {
    title: 'The Departed',
    description: `South Boston cop Billy Costigan (Leonardo DiCaprio) goes under cover to infiltrate the organization of gangland chief Frank Costello (Jack Nicholson). As Billy gains the mobster's trust, a career criminal named Colin Sullivan (Matt Damon) infiltrates the police department and reports on its activities to his syndicate bosses. When both organizations learn they have a mole in their midst, Billy and Colin must figure out each other's identities to save their own lives.`,
    genre: {
      Name: 'Crime',
      Description: 'Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection.'
    },
    director: {
      Name: 'Martin Scorsese',
      Bio: 'Martin Charles Scorsese (born November 17, 1942) is an American film director, producer, screenwriter, and actor. One of the major figures of the New Hollywood era, he is widely regarded as one of the most significant and influential directors in film history.',
      Birth: 'November 17,1942'
    },
    imageurl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fboston.curbed.com%2Fmaps%2Fa-dozen-boston-spots-where-the-departed-was-filmed&psig=AOvVaw2JM2IR4sii2Q28Qj0PQwOW&ust=1614215092340000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIjqhpCqge8CFQAAAAAdAAAAABAD',
    Featured: true
  }
];

app.get('/', (req, res) => {
  res.send('Welcome to my movie collection!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html',{root: __dirname});
});

app.get('/movies', (req, res) => {
  Movies.find()
  .then((moviedb) => {
    res.status(201).json(moviedb);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
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