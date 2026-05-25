var express = require("express");
var router = express.Router();

var obraController = require("../controllers/obraController");

//Recebendo os dados do html e direcionando para a função cadastrar de obraController.js
router.post("/cadastrar", function (req, res) {
    obraController.cadastrar(req, res);
})
router.get("/dashboard/:fkEmpresa", function (req, res){
    obraController.dashboard(req, res);

});
router.get("/tempoReal/:fkEmpresa", function (req, res) {
    obraController.tempoReal(req, res);
})
router.get("/saturacao/:fkEmpresa", function (req, res) {
    obraController.saturacao(req, res);
})

router.get("/historico/:fkEmpresa", function (req, res){
    obraController.historico(req, res);

});




module.exports = router;