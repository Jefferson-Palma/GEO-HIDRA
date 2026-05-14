var obraModel = require("../models/obraModel");
/* var aquarioModel = require("../models/aquarioModel"); */

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var rua = req.body.ruaServer;
    var cep = req.body.cepServer;
    var numero = req.body.numeroServer;    
    var cidade = req.body.cidadeServer;
    var estado = req.body.estadoServer;
   
    

    // Faça as validações dos valores
    if (rua == undefined) {
        res.status(400).send("Sua rua está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    }else if (numero == undefined) {
        res.status(400).send("Seu número está undefined!");     
    }else if (cidade == undefined) {
        res.status(400).send("Sua cidade está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!");
    } 
    else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        obraModel.cadastrar(rua,cep,numero,cidade,estado)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    // autenticar,
    cadastrar
}