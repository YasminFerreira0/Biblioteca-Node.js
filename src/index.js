export function contaPalavras(texto){
    const paragrafos = extrairParagrafos(texto);
    const contagem = paragrafos.flatMap((paragrafo) => {//O método flatMap() primeiro mapeia cada elemento usando uma função de mapeamento e, em seguida, nivela o resultado em um novo array.
        if (!paragrafo) return [];
        return verificapalavrasDublicadas(paragrafo);
    });

    return contagem;
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