const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');
const cellarsController = require('../controllers/cellars');

//Affichage de la liste des cave d'un utilsateur
router.get('/', checkAuth, cellarsController.display_all_cellars);

//Création d'une cave dans la bdd
router.post('/create', checkAuth, cellarsController.create_cellar);

//Suppression d'une cave de la bdd
router.delete('/:idCellar', checkAuth, cellarsController.delete_cellar);

//Modification d'une cave dans la base de données.
router.patch('/:idCellar', checkAuth, cellarsController.update_cellar);

module.exports = router;
