//exibir_load(true);

function renderiza_foto(foto) {
    const img_foto = document.getElementById('foto');
    img_foto.src=`${foto}`;
}

fetch('https://api.github.com/users/GHenrk')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        renderiza_foto(data.avatar_url);
    })
    .catch( error => { // Para status de Erro;
        console.error("Algo deu errado na requisição", error);
    }).finally((finaliar) => {
        //exibir_load(false);
        console.warn('Sempre cai aqui');
    }); 