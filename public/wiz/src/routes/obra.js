var express = require("express");
var router = express.Router();

var obraController = require("../controllers/obraController");

//Recebendo os dados do html e direcionando para a função cadastrar de obraController.js
router.post("/cadastrar", function (req, res) {
    obraController.cadastrar(req, res);
})


module.exports = router;