const express = require('express');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:' + process.env.MONGO_ATLAS_PW + '@cluster0-e0vot.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log('Connexion à la db réussie'))
.catch(() => console.log('Connexion à la db échouée'));

const body_parser = require('body-parser');
const morgan = require('morgan');

app.use(body_parser.json());
app.use(morgan('dev'));
app.use(cors());
console.log('bla');

// Handling routes
const users_routes = require('./api/routes/users');
const cellars_routes = require('./api/routes/cellars');
const bottles_routes = require('./api/routes/bottles');

//Définition de toutes les routes
app.use('/users', users_routes);
app.use('/cellars', cellars_routes);
app.use('/bottles', bottles_routes);


//Route par défaut
app.use((req, res, next) => {
    const error = new Error('Page not found.');
    error.status = 404;
    next(error);
})

//Gestion de la callback next
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
            statusCode: error.status
        }
    })

})

module.exports = app;
