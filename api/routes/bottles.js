const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Bottle = require('../models/bottle');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Affichage de toutes les bouteilles de la bdd."
    })
})

router.post('/', (req, res, next) => {

    const bottle = new Bottle({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        domain: req.body.domain,
        vintage: req.body.vintage,
        description: req.body.description
    });

    bottle.save().then(message => console.log(message)).catch(err => console.log(err));

    res.status(200).json({
        message: "Affichage de toutes les bouteilles de la bdd.",
        newBottle: bottle
    })
});

module.exports = router;