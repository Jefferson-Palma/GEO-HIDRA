
var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(rua,cep,numero,cidade,estado, fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", rua, cep,numero,cidade,estado,fkEmpresa);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO obra (rua,cep,numero,cidade,estado,fkEmpresa) VALUES ('${rua}', '${cep}', '${numero}', '${cidade}', '${estado}', '${fkEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function dashboard(fkEmpresa){

    var instrucaoSql = `SELECT area, umidade, dtRegistro
FROM registroSensor
  JOIN sensor ON idSensor=fkSensor
  JOIN obra ON idObra=fkObra
 JOIN empresa ON idEmpresa=fkEmpresa
 WHERE idEmpresa = ${fkEmpresa};`
 console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}


module.exports = {
    cadastrar,
    dashboard
};