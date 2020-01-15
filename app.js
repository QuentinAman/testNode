const express = require('express');
const app = express();

const body_parser = require('body-parser');

app.use(body_parser.json());

// Handling routes
const user_routes = require('./api/routes/user');
const cellars_routes = require('./api/routes/cellars');
const login_routes = require('./api/routes/login');
const register_routes = require('./api/routes/register');
const bottles_routes = require('./api/routes/bottles');

app.use('/user', user_routes);
app.use('/cellars', cellars_routes);
app.use('/login', login_routes);
app.use('/register', register_routes);
app.use('/bottles', bottles_routes);

module.exports = app;
