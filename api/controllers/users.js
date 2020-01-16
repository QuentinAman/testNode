const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Affichage des données de l'utilisateur
exports.get_user_data = (req, res, next) => {
    User.find({_id: req.userData.userId})
        .then(doc => {
            res.status(200).json({
                message: "Affichage des données du compte loggé",
                userData: doc
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "Une erreur est survenue.",
                error: err
            })
        })
};

//Connexion de l'utilisateur
exports.signup_user = (req, res, next) => {
    User.findOne({ mail: req.body.mail })
        .then(user => {
            if(!user) {
                return res.status(409).json({
                    error: "Le compte lié à ce mail n'existe pas."
                })
            }
            return bcrypt.compare(req.body.password, user.password, (err, isValid) => {
                if(err) {
                    return res.status(500).json({
                        error: "Problème.",
                        err: err
                })};
                if(isValid) {
                    res.status(200).json({
                        message: "La connexion a réussie.",
                        token: jwt.sign(
                            {
                                userId: user._id,
                                mail: user.mail
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "10h"
                            }
                        )
                    });
                } else {
                    res.status(401).json({
                        message: "Mot de passe invalide."
                    });
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Une erreur est survenue.",
                error: err
            })
        })
};

//Inscription de l'utilisateur
exports.signin_user = (req, res, next) => {
    User.find({mail: req.body.mail})
        .then(users => {
            if(users.length >= 1) {
                return res.status(409).json({
                    error: "Le mail est déjà utilisé."
                })
            }
            return bcrypt.hash(req.body.password, 10)
        })
        .then(hash => {
            const user = new User({
                _id: mongoose.Types.ObjectId(),
                username: req.body.username,
                mail: req.body.mail,
                password: hash
            });
            return user.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Le user a été créer"
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "Une erreur est survenue.",
                error: err
            })
        })
};

//Suppresion de l'utilisateur
exports.delete_user = (req, res, next) => {
    User.remove({ _id: req.userData.userId })
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
};

//Modification de l'utilisateur
exports.update_user = (req, res, next) => {
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propsName] = ops.value;
    }
    User.update({ _id: req.userData.userId}, { $set: updateOps })
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