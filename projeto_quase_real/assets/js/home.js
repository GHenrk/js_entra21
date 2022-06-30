//Elementos
let elementoUsuarioLogado = document.getElementById('usuario-logado');
const sobrenomeUsuario = localStorage.getItem('usuarioSobrenome');
const nome_usuario_logado = localStorage.getItem('usuarioLogado');
const btnSair = document.getElementById('btn_deslogar');


elementoUsuarioLogado.innerText = `Olá, ${nome_usuario_logado} ${sobrenomeUsuario}!`;


btnSair.onclick = () => {
    window.location.assign("../index.html");
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('usuarioSobrenome');
    //localStorage.clear();
}