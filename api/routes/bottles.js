const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');
const bottlesController = require('../controllers/bottles');

//Affichage de toutes les bouteilles de la bdd
router.get('/', checkAuth, bottlesController.display_all_bottles);

//Affichage d'une bouteille en fonction de son id
router.get('/:idBottle', checkAuth, bottlesController.display_one_bottle);

//Ajout d'une bouteille dans la bdd
router.post('/', checkAuth, bottlesController.add_bottle);

//Modification d'une bouteille dans la bdd
router.patch('/:idBottle', checkAuth, bottlesController.update_bottle);

//Suppresion d'une bouteille dans la bdd
router.delete('/:idBottle', checkAuth, bottlesController.delete_bottle);

module.exports = router;