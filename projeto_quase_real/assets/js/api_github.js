//mostraFoto
function renderiza_foto(foto) {
  const img_foto = document.getElementById("foto");
  img_foto.src = `${foto}`;
}

//mostraNome
function mostraNome(nome) {
  const elementoH1 = document.getElementById("nome");
  elementoH1.innerText = nome;
}

function mostraBioLocal(bio, local) {
  const userBio = document.getElementById("userBio");
  const userLocation = document.getElementById("userLocation");

  let elementoBio = `${bio}`;
  if (elementoBio != "null" && elementoBio != " ") {
    userBio.innerText = elementoBio;
  }

  let elementoLocal = `Location: ${local}`;
  if (local != null && local != " ") {
    //console.log(elementoLocal);
    userLocation.innerText = elementoLocal;
  }
}

function mostraFollowers(followers) {
  const listaSeguidores = document.getElementById("followers");
  let maximo5 = followers.length > 5 ? 5 : followers.length;
  for (let i = 0; i < maximo5; i++) {
    let listItem = `<li>`;
    //let seguidorNome = `<p class="name--seguidor">${followers[i].login}</p>`;
    let seguidorFoto = `<a href="${followers[i].html_url}" target="_blank"><img class="foto--seguidor" src="${followers[i].avatar_url}"></a>`;
    listItem += seguidorFoto + `</li>`;
    listaSeguidores.innerHTML += listItem;
  }
}

function mostraFollowing(following) {
  const listaSeguindo = document.getElementById("following");
  let maximo5 = following.length > 5 ? 5 : following.length;
  for (let i = 0; i < maximo5; i++) {
    let listItem = `<li>`;
    //let seguindoNome = `<p class="name--seguidor">${following[i].login}</p>`;
    let seguindoFoto = `<a href="${following[i].html_url}" target="_blank"><img class="foto--seguidor" src="${following[i].avatar_url}"></a>`;
    listItem += seguindoFoto + `</li>`;
    listaSeguindo.innerHTML += listItem;
  }
}

// const verificaResponse = () => {
//   console.log(recebePerfil.status);
// };

function mostraProjects(repos) {
  const listaProjetos = document.getElementById("projects");
  //Mostra somente itens que tem HomePage;
  const listaFiltrada = repos.filter((item) => {
    if (item.homepage != null && item.homepage != " ") {
      return item;
    }
  });
  for (i in listaFiltrada) {
    let elemento = listaFiltrada[i];
    let nomeDev = elemento.owner;
    console.log(nomeDev);
    //verificaSeDescricaoVazio
    let verificaDescription =
      elemento.description == null ? " " : elemento.description;
    let elementoNome = `<li class="projetoCard"><a href="${elemento.html_url}" target="_blank"<p class="projectName">${elemento.name}</p></a>`;
    let elementoNomeOwner = `<a href="${nomeDev.html_url}"><p class="projectNameDev">Desenvolvido por: ${nomeDev.login}</p></a>`;
    let elementoDescription = `<p class="projectDescription">${verificaDescription}</p><p class="projectLanguage">Linguagem mais utilizada:${elemento.language}</p>`;
    let elementoProjeto = `<a href="${elemento.homepage}" class="linkDeploy" target="_blank"><p class="projectDeploy">Vizualize o Projeto Online</p></a>`;
    let elementoIframe = `<iframe src="${elemento.homepage}" class="windowProject"></li>`;

    let elementoTotal =
      elementoNome +
      elementoNomeOwner +
      elementoDescription +
      elementoProjeto +
      elementoIframe;
    listaProjetos.innerHTML += elementoTotal;
  }
}

const verificaStatus = (status, ok) => {
  let elementoLoad = document.getElementById("loadingDiv");
  let pageToda = document.getElementById("conteudo-page");
  if (status == 200) {
    elementoLoad.style.display = "none";
    pageToda.style.display = "block";
    //clearInterval(verificaResponse);
  }
  if (ok == false) {
    elementoLoad.style.display = "block";
    elementoLoad.innerHTML = `<h1>Algo de errado aconteceu!!! ERROR-CODE: ${status} </h1>`;
    pageToda.style.display = "none";
    //clearInterval(verificaResponse);
  }
};
const verificaResponse = (response) => {
  //setInterval(verificaStatus(response.status, response.ok), 100);
  verificaStatus(response.status, response.ok);
};

const apresentaErro = () => {
  let elementoErro = document.getElementById("loadingText");
  elementoErro.innerHTML = `<h1>Algo deu errado na requisição, por favor tente novamente!!!</h1>`;
};

const recebePerfil = fetch("https://api.github.com/users/GHenrk")
  .then((response) => {
    console.log(response.ok);
    console.log(response.status);
    verificaResponse(response);
    return response.json();
  })
  .then((data) => {
    //console.log(data);
    renderiza_foto(data.avatar_url);
    mostraNome(data.name);
    mostraBioLocal(data.bio, data.location);
  })
  .catch((error) => {
    apresentaErro();
    console.error("ERROR: " + error);
  })
  .finally((finalizar) => {});

const recebeSeguidor = fetch("https://api.github.com/users/GHenrk/followers")
  .then((response) => {
    verificaResponse(response);
    return response.json();
  })
  .then((followers) => {
    //console.log(followers)
    mostraFollowers(followers);
  })
  .catch((error) => {
    apresentaErro();
    console.error("ERROR: " + error);
  })
  .finally((finalizar) => {});

const recebeSeguindo = fetch("https://api.github.com/users/GHenrk/following")
  .then((response) => {
    verificaResponse(response);
    return response.json();
  })
  .then((following) => {
    mostraFollowing(following);
  })
  .catch((error) => {
    apresentaErro();
    console.error("ERROR: " + error);
  })
  .finally((finalizar) => {});

const recebeRepos = fetch("https://api.github.com/users/GHenrk/repos")
  .then((response) => {
    verificaResponse(response);
    return response.json();
  })
  .then((repos) => {
    //console.log(repos);
    mostraProjects(repos);
  })
  .catch((error) => {
    apresentaErro();
    console.error("ERROR: " + error);
  })
  .finally();
// clearInterval(verificaResponse);
