//exibir_load(true);
fetch('../json/hobbies.json')
    .then(response => response.json())
    .then(data => {
        produtos = data;
        mostraProdutos(produtos);
        
    })
    .catch( error => { // Para status de Erro;
        console.error("Algo deu errado na requisição", error);
    }).finally((finaliar) => {
        //exibir_load(false);
        console.warn('Sempre cai aqui');
    }); 