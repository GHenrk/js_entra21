let elementoLogin = document.getElementById('login');
let elementoSenha = document.getElementById('senha');

const verificarLogin = (login, senha) => {
    if (login == "ghd" && senha == "123") {
        localStorage.setItem('usuarioLogado', "Gustavo");
        localStorage.setItem('usuarioSobrenome', "Henrique");
        return true;
    }
    return false;
}

const apresentaMensagemErro = () => {
    alert("Não foi possível realizar o login!!!")
}

const realizarLogin = () => {
    console.log("clicou");
    const login = elementoLogin.value;
    const senha = elementoSenha.value;
    console.log(login)
    console.log(senha)
    if (verificarLogin(login, senha)) {
        window.location.assign("./views/home.html");
    } else {
        apresentaMensagemErro();
    }
}