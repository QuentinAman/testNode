const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "Affichage de la liste des caves"
    })
});

router.post('/content', (req, res, next) => {
    res.status(200).json({
        message: "Affichage du contenu d'une cave"
    });
})

module.exports = router;
