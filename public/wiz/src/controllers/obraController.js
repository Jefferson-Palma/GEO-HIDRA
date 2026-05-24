var obraModel = require("../models/obraModel");
/* var aquarioModel = require("../models/aquarioModel"); */

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var rua = req.body.ruaServer;
    var cep = req.body.cepServer;
    var numero = req.body.numeroServer;    
    var cidade = req.body.cidadeServer;
    var estado = req.body.estadoServer;
    var fkEmpresa = req.body.fkEmpresaServer;
   
    

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
    } else if (estado == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } 
    else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        obraModel.cadastrar(rua,cep,numero,cidade,estado,fkEmpresa)
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
function dashboard(req, res){
    
    var fkEmpresa = req.params.fkEmpresa;

    
    obraModel.dashboard(fkEmpresa).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);

        }else{
            res.status(204).send("Nenhum resultado encontado")
        }
    }).catch(function (erro){
        console.log(erro);
        console.log("House um erro ao buscar as ultimas medidas", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    
    });

}

function historico(req, res){
    
    var fkEmpresa = req.params.fkEmpresa;

    
    obraModel.historico(fkEmpresa).then(function (resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);

        }else{
            res.status(204).send("Nenhum resultado encontado")
        }
    }).catch(function (erro){
        console.log(erro);
        console.log("House um erro ao buscar as ultimas medidas", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    
    });

}
function tempoReal(req, res) {

    var fkEmpresa = req.params.fkEmpresa;

    console.log(`Recuperando medidas em tempo real`);

    obraModel.tempoReal(fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    // autenticar,
    cadastrar,
    dashboard,
    tempoReal,
    historico
}