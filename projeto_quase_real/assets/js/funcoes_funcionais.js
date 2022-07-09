const vetorProduto = [
    {
        "produto": "Abridor de Garrafas",
        "preco": 65,
        "descricao": "Lorem ipusum",
        "em_stoque": true,
        "img": "../assets/imgs/produto01.jpg"
    },
    {
        "produto": "Tabua de Corte",
        "preco": 110.00,
        "descricao": "Lorem ipusum! Not ipusum",
        "em_stoque": false,
        "img": "../assets/imgs/produto02.jpg"
    },
    {
        "produto": "Tabua de Cozinha",
        "preco": 102,
        "descricao": "Lorem ipusum! Not ipusum",
        "em_stoque": true,
        "img": "../assets/imgs/produto03.jpg"
    },
    {
        "produto": "Abridor com Ima",
        "preco": 75,
        "descricao": "Lorem ipusum! Not ipusum",
        "em_stoque": true,
        "img": "../assets/imgs/produto04.jpg"
    } 
];

//Filter, map, reduce.

//Filtra e extrai elemento dos vetores
//Map, faz uma conversao, manipula um elemento de vetore.
//Reduce pega todos os elementos e deixa iguais.

//Exemplo prático, filter cria novo vetor somente cmo que tem estoque true.
//Reduce faz uma média de preço de todos os elementos.
let cotacaoDolar = 5.43;
let cotacaoEuro = 5.53;
let valorReferencia = 100;

let vetorConvertido = vetorProduto;

const filtroMaiorQue100 = (elemento)  => {
   return elemento.preco > valorReferencia;
}

const filtroMenorQue100 = (elemento)  => {
    return elemento.preco < valorReferencia;
 }


const emEstoque = (elemento) => {
    return elemento.em_stoque === true;
}

const mostraTodos = (elemento) => {
    return elemento;
}

const maiorQue100 = vetorProduto.filter(filtroMaiorQue100);

console.log("filter ", maiorQue100);

const produtoEmEstoque = vetorProduto.filter(emEstoque);

console.log("filter", produtoEmEstoque);
//Map utilizado para transformar um valor em outro de todos os itens;

const converterDolar = (elemento) => {
    const newElemento = {...elemento};
    newElemento.preco = newElemento.preco / cotacaoDolar;
    //newElemento.preco = newElemento.preco.toFixed(2);
    return newElemento;
}

const converterEuro = (elemento) => {
    const newElemento = {...elemento};
    newElemento.preco = newElemento.preco / cotacaoEuro;
    //newElemento.preco = newElemento.preco.toFixed(2);
    return newElemento;
}

const converterReal = (elemento) => {
    const newElemento = {...elemento};
    newElemento.preco = newElemento.preco
    //newElemento.preco = newElemento.preco.toFixed(2);
    return newElemento;

}

const produtosEmDolar = vetorProduto.map(converterDolar);

console.log("map" , produtosEmDolar);

const retornaNome = (elemento) => {
    let nomePreco = "O Nome do produto é " + elemento.produto + " e seu valor é R$" + elemento.preco; 
    return nomePreco;
}

const nomeComPreco = vetorProduto.map(retornaNome);

console.log("map", nomeComPreco);

//REDUCE - Faz um calcula com todos os elementos retorna um unico valor;


const somaPrecos = (totalizador, elemento) => {
    return totalizador + elemento.preco;
}

const soma_preco = vetorProduto.reduce(somaPrecos, 0);

const media_preco = soma_preco / vetorProduto.length;

console.log('reduce somando: ', soma_preco.toFixed(2));
console.log('reduce somando e dividindo pelo length:', media_preco.toFixed(2));



//for (valor of vetor)
//for (indice in vetor)

//Elementos
const listaItens = document.getElementById('lista-produtos');
const btn_filtrar = document.getElementById('btn_filtrar');
const listaOpcoes = document.getElementById('opcoes');
const mediaPrecos = document.getElementById('media-precos');
const opcoesDeMoeda = document.getElementById('opcoesDeMoeda');
const btn_converter = document.getElementById('btn_converter');
let siglaDaMoeda = "R$";

const mostraProdutos = (vetor) => {
    mediaPrecos.innerText= "";
    listaItens.innerText = "";
    let mediaDosValores = vetor.reduce(somaPrecos, 0) / vetor.length;
    mediaPrecos.innerText = `A Média dos valores é ${siglaDaMoeda}${mediaDosValores.toFixed(2)}`;
    for (let elemento of vetor) {
        const liProduto = `
        <li class="item--list">
        <h1>${elemento.produto}</h1>
        <img class="img--produto" src="${elemento.img}">
        <p class="descricao">${elemento.descricao}</p>
        <p class="preco">${siglaDaMoeda}${elemento.preco.toFixed(2)}</p></li>`
        listaItens.innerHTML += liProduto;
    }
}

mostraProdutos(vetorProduto);

const filtros = {
    "filtroMaiorQue100": filtroMaiorQue100, 
    "filtroMenorQue100": filtroMenorQue100,
    "emEstoque":emEstoque,
    "mostrarTodos": mostraTodos
}


let estadoBotaoFiltro = false;

btn_filtrar.onclick = () => {
    estadoBotaoFiltro = !estadoBotaoFiltro;
    if (estadoBotaoFiltro) {
    const vetorFiltrado = vetorConvertido.filter(filtros[listaOpcoes.value]);
    mostraProdutos(vetorFiltrado);
    btn_filtrar.classList.add("btn__filtro--ativo");
    btn_filtrar.innerText = "Remover Filtro";
    listaOpcoes.disabled = true;
    } else {
        listaOpcoes.disabled = false;
        btn_filtrar.innerText= "Filtrar";
        btn_filtrar.classList.remove("btn__filtro--ativo");
        mostraProdutos(vetorConvertido);
    }
}



const filtrosDeConversao = {
    "real": converterReal,
    "dolar": converterDolar,
    "euro": converterEuro
}


const transformaMostrador = () => {
    const sigla = opcoesDeMoeda.value;
    if (sigla == "real") {
        siglaDaMoeda = "R$";
        valorReferencia = 100;
    } else if (sigla == "dolar") {
        siglaDaMoeda = "$";
        valorReferencia = 100 / cotacaoDolar;
    } else if(sigla == "euro") {
        siglaDaMoeda = "€";
        valorReferencia = 100 / cotacaoEuro;
    }
}


btn_converter.onclick = () => {
    vetorConvertido = vetorProduto.map(filtrosDeConversao[opcoesDeMoeda.value]);
    transformaMostrador();
    mostraProdutos(vetorConvertido);
    }; 