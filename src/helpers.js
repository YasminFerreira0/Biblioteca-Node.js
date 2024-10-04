function filtaOcorrencias(paragrafo) {
    return Object.keys(paragrafo).filter(chave => paragrafo[chave] > 1);//pega um objeto e retorna um array com todas as chaves do objeto
}

function montaSaidaArquivo(listaPalavras){
    let textoFinal = '';
    listaPalavras.forEach((paragrafo, indice) => {
        const duplicadas = filtaOcorrencias(paragrafo).join(', ');
        if(duplicadas != 0) textoFinal += `palavras dublicadas do paragrafo ${indice+1}: ${duplicadas} \n`
    });
    return textoFinal;
}
export {  montaSaidaArquivo };
