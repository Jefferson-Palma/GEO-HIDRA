
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

    var instrucaoSql = `SELECT fkSensor,area, umidade, DATE_FORMAT(dtRegistro,'%H:%i:%s') AS dtRegistro
FROM registroSensor
  JOIN sensor ON idSensor=fkSensor
  JOIN obra ON idObra=fkObra
 JOIN empresa ON idEmpresa=fkEmpresa
 WHERE idEmpresa = ${fkEmpresa};`
 console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function historico(fkEmpresa){

    var instrucaoSql = `SELECT * FROM kpis_alertas
WHERE area='LESTE' AND idEmpresa=${fkEmpresa} AND idObra=1;`
 console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}
function buscarRegioesAcima(fkEmpresa){

    var instrucaoSql = `SELECT area, umidade FROM registroSensor join sensor on idSensor = fkSensor WHERE dtRegistro = (SELECT MAX(dtRegistro) from registroSensor) AND fkObra = 1 AND umidade > 30 order by dtRegistro desc; `
 console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}
function buscarRegioesAbaixo(fkEmpresa){

    var instrucaoSql = `SELECT area, umidade FROM registroSensor join sensor on idSensor = fkSensor WHERE dtRegistro = (SELECT MAX(dtRegistro) from registroSensor) AND fkObra = 1 AND umidade < 21 order by dtRegistro desc; `
 console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}
function saturacao(fkEmpresa){

    var instrucaoSql = `SELECT area, TRUNCATE(umidade,2) AS umidade FROM registroSensor join sensor on idSensor = fkSensor  
where dtRegistro = (SELECT MAX(dtRegistro) from registroSensor) AND fkObra = 1 order by area; `
 console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function tempoReal(fkEmpresa) {

     var instrucaoSql = `SELECT fkSensor,area, umidade, DATE_FORMAT(dtRegistro, '%H:%i:%s') AS dtRegistro
FROM registroSensor
  JOIN sensor ON idSensor=fkSensor
  JOIN obra ON idObra=fkObra
 JOIN empresa ON idEmpresa=fkEmpresa
 WHERE idEmpresa = ${fkEmpresa}
 ORDER BY dtRegistro DESC;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function dashboardGeral(fkEmpresa){

    var instrucaoSql = `SELECT 
    idObra,
    CONCAT(rua, ', ', numero, ' - ', cidade) AS endereco,
    DATE_FORMAT(dtRegistro, '%d/%m %H:%i') AS ultimoRegistro,
    CASE 
    WHEN umidade <= 20 OR umidade >=31 THEN "Alerta"
    ELSE "Normal"
    END AS status
    FROM obra
    JOIN sensor ON fkObra = idObra
    JOIN registroSensor ON fkSensor = idSensor
    WHERE fkEmpresa = ${fkEmpresa}
    AND idRegistro = (
    SELECT r2.idRegistro
    FROM registroSensor r2
    JOIN sensor s2 ON s2.idSensor = r2.fkSensor
    WHERE s2.fkObra = idObra
    ORDER BY r2.dtRegistro DESC
    LIMIT 1)
    ORDER BY idObra DESC;`

 console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    dashboard,
    tempoReal,
    historico,
    saturacao,
    buscarRegioesAcima,
    buscarRegioesAbaixo,
    dashboardGeral
};