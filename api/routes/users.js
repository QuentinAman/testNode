const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/user');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Affichage des données d'un utilisateur"
    });
})

router.post('/login', (req, res, next) => {
    res.status(200).json({
        message: "Vous allez vous connecter"
    })
})

router.post('/register', (req, res, next) => {
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        username: req.body.username,
        mail: req.body.mail,
        password: req.body.password
    })

    user.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Le compte à été crée avec succès",
                result: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Une erreur est survenue",
                err: err
            })
        })
})

router.delete('/:idUser', (req, res, next) => {
    User.remove({ _id: req.params.idUser })
        .then(result => {
            console.log(result);
            res.status(202).json({
                message: "Le compte a été supprimé avec succès.",
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