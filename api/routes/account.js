const express = require('express');
const router = express.Router();

router.post('/login', (req, res, next) => {
    res.status(200).json({
        message: "Vous allez vous connecter"
    })
})

router.post('/register', (req, res, next) => {
    res.status(200).json({
        message: "Vous allez vous inscrire."
    })
})

module.exports = router;