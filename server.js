// IMPORT DEPENDENCIES
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// CUSTOM HELPERS TO SET UP HANDLEBARS.JS ENGINE
const hbs = exphbs.create({ helpers });

// PROPERTY TO SET UP SESSION AND COOKIES
const sess = {
  secret: "IT'S A SECRET TO EVERYBODY",
  cookie: {
    maxAge: 1200000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// HANDLEBARS.JS ENGINE SETUP AND MIDDLEWARE
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// MIDDLEWARE TO PARSE JSON AND STRING DATA
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// TURN ON CONNECTION TO DB AND SERVER
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});