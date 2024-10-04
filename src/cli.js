import fs from 'fs';
import path from 'path';
import trataErros from './erros/funcoesErro.js';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from './helpers.js';
import chalk from 'chalk';
import { Command } from 'commander';

const program = new Command();

program
    .version('0.0.1')
    .option('-t, --texto <string>', 'caminho do texto a ser acessado')
    .option('-d, --destino <string>', 'caminho da pasta onde salvar o arquivo de resultados')// flags que identifica os argumentos q estão chegando 
    .action((options) => {
        const { texto, destino } = options;

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

async function criaESalvaArquivos (listaPalavras, endereco){
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = montaSaidaArquivo(listaPalavras);
    try{
        await fs.promises.writeFile(arquivoNovo, textoPalavras);
        console.log('arquivo criado');
    }catch(erro){
        throw erro;
    }
}
