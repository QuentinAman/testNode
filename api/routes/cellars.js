const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Cellar = require('../models/cellar');

router.get('/', (req, res, next) => {
    Cellar.find()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Toutes vos caves",
                listCellar: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

router.post('/create', (req, res, next) => {
    const cellar = new Cellar({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        maxContent: 46
    });

    cellar.save()
        .then(message => {
            console.log(message);
            res.status(201).json({
                message: "Creation de la cave réussie",
                newCellar: message
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Une erreur est survenue",
                error: err
            })
        });
})

router.delete('/:idCellar', (req, res, next) => {
    Cellar.remove({ _id: req.params.idCellar })
        .then(result => {
            console.log(result);
            res.status(202).json({
                message: "La cave a été supprimée.",
                result: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Une erreur est survenue.",
                err: err
            })
        })
})

module.exports = router;
