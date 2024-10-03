export default function trataErros(erro){
    if(erro.code === 'ENOENT'){
        throw new Error('Arquivo nao encontrado');
    }else{
        return 'Erro na aplicacao';
    }
}

//module.exports = trataErros; //forma 'nativa' de lidar com exportacoes no node
//package.json  - arquivo manifesto, contem as infomcoes que a aplicacao precisa para executar
