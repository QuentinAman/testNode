const mongoose = require('mongoose');
const Cellar = require('../models/cellar');

//Affichage des caves d'un utilisateur
exports.display_all_cellars = (req, res, next) => {
    Cellar.find({userId: req.userData.userId})
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
};

//Création d'une cave liéée à un utilisateur
exports.create_cellar = (req, res, next) => {
    const cellar = new Cellar({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        userId: req.userData.userId,
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
};

//Suppression d'une cave d'un utilisateur
exports.delete_cellar = (req, res, next) => {
    Cellar.remove({ _id: req.params.idCellar, userId: req.userData.userId })
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
};

//Modification d'une cave d'un utilsateur
exports.update_cellar = (req, res, next) => {
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propsName] = ops.value;
    }
    Cellar.update({ _id: req.params.idCellar, userId: req.userData.userId }, { $set: updateOps })
        .then(result => {
            console.log(result);
            res.status(200).json({
                result: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};