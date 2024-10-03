import fs from 'fs';
import path from 'path';//biblioteca nativa do node, faz o gerenciamento de caminho relativos e absolutos de todos os arquivos que são referenciados no programa

import trataErros from './erros/funcoesErro.js';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from './helpers.js';

import chalk from 'chalk';

import { Command } from 'commander';
const program = new Command();//criação de uma nova instancia de Command

program
    .version('0.0.1')
    .option('-t, --texto <string>', 'caminho do texto a ser acessado')
    .option('-d, --destino <string>', 'caminho da pasta onde salvar o arquivo de resultados')// flags que identifica os argumentos q estão chegando 
    .action((options) => {
        const { texto, destino } = options;//desestruturação - envolver duas variaveis em chaves

        if(!texto || !destino){
            console.error(chalk.red('erro: favor inserir caminho de origem e destino'));
            program.help();
            return;
        }

        const caminhoTexto = path.resolve(texto);
        const caminhoDestinho = path.resolve(destino);

        try{
            processaArquivo(caminhoTexto, caminhoDestinho);
            console.log(chalk.green('texto processado com sucesso'));
        }catch(erro){
            console.log('ocorreu um erro no processamento', erro);
        }
    })

    program.parse();


//const fs = require('fs'); //file system
//const trataErros = require('./erros/funcoesErro');

//const caminhoArquivo = require('./arquivos/texto-web.txt') // referencia a um arquivo externo. So funciona modulos js, como arquivos json.

//const caminhoArquivo = process.argv; //vetor de argumentos, pega os valores que são passados pelo terminal e os coloca em um array, são passados na orgem em que sao executados
// O process.argv possibilita que enviemos comandos para o terminal, os quais são inseridos em um array. Dessa forma, ao estarem dentro de um array, podemos utilizá-los em nosso código.

//const link = caminhoArquivo[2];
//const endereco = caminhoArquivo[3];

function processaArquivo(texto, destino){
    fs.readFile(texto, 'utf-8', (erro, texto) => {
        try{ 
            if(erro) throw erro;
            const resultado = contaPalavras(texto);
            criaESalvaArquivos(resultado, destino);
        }catch(erro){
            trataErros(erro);
        }
    }); 
}

/*fs.readFile(link, 'utf-8', (erro, texto) => {
    //try, codigo em que é possiver dar erro, monitora o codigo e se acontecer agum erro ele capitura. No bloco catch fica o tratamento do erro capiturado. O throw 'pega' o erro da função assincrona do readFile e 'lança pra frente'
    try{ 
        if(erro) throw erro;
        const resultado = contaPalavras(texto);
        criaESalvaArquivos(resultado, endereco);
    }catch(erro){
        trataErros(erro);
    }
}); //recebe 2 parameltro, o primeiro e o caminho do arquivo, o segundo e uma função assincrona
*/

async function criaESalvaArquivos (listaPalavras, endereco){
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = montaSaidaArquivo(listaPalavras);
    //JSON.stringify(listaPalavras);//converte arrays e objetos para string
    try{
        await fs.promises.writeFile(arquivoNovo, textoPalavras);//precisa de dois parametros, o endereco do arquivo e o que ee vai colocar no arquivo
        console.log('arquivo criado');
    }catch(erro){
        throw erro;
    }
}

//codigo sincrono - os processos ocorrem um apos o outro em sequencia, bloqueia a execução do restante do codigo ate que o processo seja finalizado
//codigo assincrono - os processos correm cada um no seu tempo, sem bloquear a execução do restante do codigo

/*
Usos comuns de codigo assincrono:
    >Leitura/manipulação de arquivos em disco
    >Comunicação entre cliente e servisor
    >Operações em banco de dados
*/ 

//Promessas - encapsula e lido com operações assincronas, representa os possiveis estados de uma promessa, podem estar pendentes, resolvidas ou rejeitadas 
//async - e adicionado na declaração da função para indicar ao interpretador que aquele trecho de codigo é assincrono
//await - adicionado na linha onde é executado a metodo assincrono em si.

/*
 .then

 function criaESalvaArquivos (listaPalavras, endereco){
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = JSON.stringify(listaPalavras);
    
    fs.promises.writeFile(arquivoNovo, textoPalavras)
        .then(()=>{
            console.log('arquivo criado');
        }).catch((erro)=>{
            throw erro;
        }).finally(()=>{ console.log('operação fianalizada')})
}
            
then - é uma função callback
O objeto promise representa a eventual conclusão ou falha de uma operação assincrona e seu valor resultante
funções assincronas retornam objetos promise
O them é a função responsavel por fazer a conclusão da promessa, contem o processamento feito com o resultado da promessa.
o catch lida com a rejeição da promessa
finally - o codigo que vai ser executado independente de falha, sempre acontece. util pra fechar conecções com banco de dados

*/
