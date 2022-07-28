//exibir_load(true);

function renderiza_foto(foto) {
    const img_foto = document.getElementById('foto');
    img_foto.src=`${foto}`;
}

function mostraNome (nome) {
    const elementoH1 = document.getElementById("nome");
    elementoH1.innerText = nome;
}

function mostraFollowers (followers) {
    const listaSeguidores = document.getElementById("followers");
    let maximo5 = followers.length > 5 ? 5 : followers.length;
    for ( let i = 0;i<maximo5; i++){
        let listItem = `<li>`;
        let seguidorNome = `<p class="name--seguidor">${followers[i].login}</p>`;
        let seguidorFoto = `<a href="${followers[i].html_url}" target="_blank"><img class="foto--seguidor" src="${followers[i].avatar_url}"></a>`
        listItem += seguidorNome + seguidorFoto + `</li>`;
        listaSeguidores.innerHTML += listItem;
    }
   
    
}

function mostraFollowing (following) {
    const listaSeguindo = document.getElementById("following");
    let maximo5 = following.length > 5 ? 5 : following.length;
    for ( let i = 0;i<maximo5; i++){
        let listItem = `<li>`;
        let seguindoNome = `<p class="name--seguidor">${following[i].login}</p>`;
        let seguindoFoto = `<a href="${following[i].html_url}" target="_blank"><img class="foto--seguidor" src="${following[i].avatar_url}"></a>`
        listItem += seguindoNome + seguindoFoto + `</li>`;
        listaSeguindo.innerHTML += listItem;
       
    }


}



fetch('https://api.github.com/users/GHenrk')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        renderiza_foto(data.avatar_url);
        mostraNome(data.name);
        
    })
    .catch( error => { // Para status de Erro;
        console.error("Algo deu errado na requisição", error);
    }).finally((finalizar) => {
        //exibir_load(false);
        console.warn('Sempre cai aqui');
    }); 

fetch ("https://api.github.com/users/GHenrk/followers")
    .then(response => response.json())
    .then (followers => {
        //console.log(followers)
        mostraFollowers(followers);
    })
    .catch (error => {
        console.error("Algo deu errado na requisição", error);
    }).finally((finalizar) => {
    });

    
fetch ("https://api.github.com/users/GHenrk/following")
    .then(response => response.json())
    .then (following => {
         mostraFollowing(following);
    })
    .catch (error => {
        console.error("Algo deu errado na requisição", error);
    }).finally((finalizar) => {
    });