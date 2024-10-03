const fs = require('fs'); //file system
const trataErros = require('./erros/funcoesErro');


//const caminhoArquivo = require('./arquivos/texto-web.txt') // referencia a um arquivo externo. So funciona modulos js, como arquivos json.

const caminhoArquivo = process.argv; //vetor de argumentos, pega os valores que são passados pelo terminal e os coloca em um array, são passados na orgem em que sao executados
// O process.argv possibilita que enviemos comandos para o terminal, os quais são inseridos em um array. Dessa forma, ao estarem dentro de um array, podemos utilizá-los em nosso código.

const link = caminhoArquivo[2];

fs.readFile(link, 'utf-8', (erro, texto) => {
    //try, codigo em que é possiver dar erro, monitora o codigo e se acontecer agum erro ele capitura. No bloco catch fica o tratamento do erro capiturado. O throw 'pega' o erro da função assincrona do readFile e 'lança pra frente'
    try{ if(erro) throw erro;
        contaPalavras(texto);
    }catch(erro){
        trataErros(erro);
    }
    if(erro){
        console.log(erro);
        return;
    }
    
   
}); //recebe 2 parameltro, o primeiro e o caminho do arquivo, o segundo e uma função assincrona


function contaPalavras(texto){
    const paragrafos = extrairParagrafos(texto);
    const contagem = paragrafos.flatMap((paragrafo) => {//O método flatMap() primeiro mapeia cada elemento usando uma função de mapeamento e, em seguida, nivela o resultado em um novo array.
        if (!paragrafo) return [];
        return verificapalavrasDublicadas(paragrafo);
    });

    console.log(contagem);
}

function extrairParagrafos(texto){
    return texto.toLowerCase().split('\n');//transforma as letras maiusculas em menusculas e inclui um separador de quebra de linha
}

/*function quebraEmParagrafos(texto){
    .filter((paragrafo) => paragrafo).map((paragrafo) =>{
        return verificapalavrasDublicadas(paragrafo);
    });
}*/

function limpaPalavras(palavra){
    return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');//expressão regular
}


function verificapalavrasDublicadas(texto){
    const listaPalavras = texto.split(' '); // parametro separador
    const resultado = {};

    listaPalavras.forEach(palavra =>{
        if(palavra.length >= 3){
            const palavraLimpa = limpaPalavras(palavra)
            resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1;
        }
});
return resultado;

}