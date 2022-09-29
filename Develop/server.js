// Reference: These stuff are from our Mini Project
//28-Stu_Mini-Project
const express = require('express');
// Import Express Session
const session = require('express-session');
// Routes in the Controller file
const routes = require('./controllers');
// Import Sequelize in Config folder, connection.js file
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
// Sequelize sync then Port 3001
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
