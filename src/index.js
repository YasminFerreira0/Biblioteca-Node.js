export function contaPalavras(texto){
    const paragrafos = extrairParagrafos(texto);
    const contagem = paragrafos.flatMap((paragrafo) => {
        if (!paragrafo) return [];
        return verificapalavrasDublicadas(paragrafo);
    });

    return contagem;
}// Primeiro separa o texto em paragrafos com a função extrairparagrafos(), depois ela percorre mapeando e pra cada paragrafo conta as palavras duplicadas, quardando o resultado em um novo array.

function extrairParagrafos(texto){
    return texto.toLowerCase().split('\n');
}//separa o texto em paragrafos

function limpaPalavras(palavra){
    return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
}

function verificapalavrasDublicadas(texto){
    const listaPalavras = texto.split(' ');
    const resultado = {};

    listaPalavras.forEach(palavra =>{
        if(palavra.length >= 3){
            const palavraLimpa = limpaPalavras(palavra)
            resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1;
        }
});// primeiro separa o texto por palavras com o parametro separador, depois percorro a array e faz a contagem de ocorrencias de cada palavra.
return resultado;
}
