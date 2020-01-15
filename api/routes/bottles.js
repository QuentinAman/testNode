const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Affichage de toutes les bouteilles de la bdd."
    })
})

module.exports = router;