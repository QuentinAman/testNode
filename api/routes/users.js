const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const checkAuth = require('../middlewares/check-auth');

//Affichage des données d'un utilisateur
router.get('/', checkAuth, usersController.get_user_data);

//Connexion d'un utilisateur
router.post('/signup', usersController.signup_user);

//Enregistrement d'un utilisateur dans la bdd
router.post('/signin', usersController.signin_user);

//Suppression d'un utilisateur de la bdd
router.delete('/', checkAuth, usersController.delete_user);

//Update d'un utilisateur dans la bdd
router.patch('/', checkAuth, usersController.update_user);

module.exports = router;