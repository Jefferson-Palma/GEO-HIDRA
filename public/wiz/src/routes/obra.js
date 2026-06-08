var express = require("express");
var router = express.Router();

var obraController = require("../controllers/obraController");

//Recebendo os dados do html e direcionando para a função cadastrar de obraController.js
router.post("/cadastrar", function (req, res) {
    obraController.cadastrar(req, res);
})
router.get("/dashboard/:idObra", function (req, res){
    obraController.dashboard(req, res);

});
router.get("/tempoReal/:idObra", function (req, res) {
    obraController.tempoReal(req, res);
})
router.get("/saturacao/:idObra", function (req, res) {
    obraController.saturacao(req, res);
})

router.get("/historico/:idObra", function (req, res){
    obraController.historico(req, res);

});

router.get("/regioesAcima/:idObra", function (req, res){
    obraController.buscarRegioesAcima(req, res);

});

router.get("/regioesAbaixo/:idObra", function (req, res){
    obraController.buscarRegioesAbaixo(req, res);

});
router.get("/dashboardGeral/:fkEmpresa", function(req, res){
    obraController.dashboardGeral(req, res);
});

router.get("/dashboardGeralTempoReal/:fkEmpresa", function(req, res){
    obraController.dashboardGeralTempoReal(req, res);
})

module.exports = router;