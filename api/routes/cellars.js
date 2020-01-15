const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Cellar = require('../models/cellar');

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "Affichage de la liste des caves"
    })
});

router.post('/content', (req, res, next) => {
    res.status(200).json({
        message: "Affichage du contenu d'une cave"
    });
})

router.post('/create', (req, res, next) => {
    const cellar = new Cellar({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        maxContent: 46
    });

    cellar.save().then(message => console.log(message)).catch(err => console.log(err));

    res.status(200).json({
        message: "Creation de la cave réussie",
        newCellar: cellar
    })
})

module.exports = router;
