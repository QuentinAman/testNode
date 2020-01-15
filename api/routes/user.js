const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "Affichage des données d'un utilisateur"
    });
})

module.exports = router;