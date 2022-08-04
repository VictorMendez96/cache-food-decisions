const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
// const helpers = require("./utils/helpers");

// const hbs = exphbs.create({ helpers });

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;


// Sets up session authentication and connect to our Sequelize db
// const sess = {
//   secret: 'Super secret secret',
//   // Express session will use cookies by default, but we can specify options for those cookies by adding a cookies property to our session options.
//   cookie: {
//     // maxAge sets the maximum age for the session to be active. Listed in milliseconds. if not set, then the session will expire when browser closed...want for a week?
//     maxAge: 3600, //1000 1hr * 60sec * 60min * 2hr (this would then be 2 hours)
//     // httpOnly tells express-session to only store session cookies when the protocol being used to connect to the server is HTTP.
//     httpOnly: true,
//     // secure tells express-session to only initialize session cookies when the protocol being used is HTTPS. Having this set to true, and running a server without encryption will result in the cookies not showing up in your developer console.
//     secure: false,
//     // sameSite tells express-session to only initialize session cookies when the referrer provided by the client matches the domain out server is hosted from.
//     sameSite: 'strict',
//   },
//   //don't need to save session if didn't change
//   resave: false,
//   //don't save a session if haven't logged in
//   saveUninitialized: true,
//   // Sets up session store

const oneDay = 100 * 60 * 60 * 24;
const sess = {
  secret: "the biggest secret of them all",
  cookie: { maxAge: oneDay },
  resave: false,
  saveUninitialized: true,

  store: new SequelizeStore({
    db: sequelize,
  }),
};


app.use(session(sess));

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
 
    console.log(`Now listening on http://localhost:${PORT}`)
  );
});

