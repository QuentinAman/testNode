const mongoose = require('mongoose');
const Bottle = require('../models/bottle');

//Affichage de toutes les bouteilles
exports.display_all_bottles = (req, res, next) => {
    Bottle.find()
        .then(bottles => {
            res.status(200).json({
                message: "Affichage des données.",
                bottles: bottles.map(bottle => ({
                    bottle: bottle,
                    url: "http://localhost:8000/bottles/" + bottle._id
                }))
            })
        })
};

//Affichage d'une bouteille
exports.display_one_bottle = (req, res, next) => {
    Bottle.findById(req.params.idBottle)
        .then( doc => {
            console.log(doc);
            res.status(200).json({
                bottle: doc
            })
        })
        .catch( err => {
            console.log("Une erreur est survenue.");
            res.status(500).json({
                error: err
            })
        })
};

//Ajout d'une bouteille dans la bdd
exports.add_bottle = (req, res, next) => {
    const bottle = new Bottle({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        domain: req.body.domain,
        vintage: req.body.vintage,
        description: req.body.description
    });

    bottle.save().then(message => console.log(message)).catch(err => console.log(err));

    res.status(200).json({
        message: "Ajout de la bouteille.",
        newBottle: bottle
    })
};

//Modification d'une bouteille dans la bdd
exports.update_bottle = (req, res, next) => {
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propsName] = ops.value;
    }

    Bottle.update({ _id: req.params.idBottle}, { $set: updateOps })
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

//Suppression d'une bouteille dans la bdd
exports.delete_bottle = (req, res, next) => {
    Bottle.remove({ _id: req.params.idBottle })
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