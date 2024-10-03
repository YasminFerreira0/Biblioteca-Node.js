//helper functions sao funções mais simple que fazem coisas expecificas que nao estao relacionadas com a funcionalidade principal

function filtaOcorrencias(paragrafo) {//cada paragrafo e um objeto
    return Object.keys(paragrafo).filter(chave => paragrafo[chave] > 1);//pega um objeto e retorna um array com todas as chaves do objeto
}

function montaSaidaArquivo(listaPalavras){
    let textoFinal = '';
    listaPalavras.forEach((paragrafo, indice) => {//todo metodo callback de array tem o parametro principal que e o elemento, e um parametro opcional que e o indice
        const duplicadas = filtaOcorrencias(paragrafo).join(', ');//metodo para transformar arrays em string
        textoFinal += `palavras dublicadas do paragrafo ${indice+1}: ${duplicadas} \n`
    });
    return textoFinal;
}

export {  montaSaidaArquivo };
