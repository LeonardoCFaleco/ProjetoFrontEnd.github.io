//Adiciona evento para expandir o formulario de cadastrar
const add = document.querySelector ('.add');
add.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('.user-cad').classList.toggle('ativo');
});

//Adiciona evento para expandir o formulario de deletar
const del = document.querySelector ('.del');
del.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('.user-del').classList.toggle('ativo');
});

//Adiciona evento para expandir o formulario de consultar
const con = document.querySelector ('.con');
con.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('.user-con').classList.toggle('ativo');
});

//função que adiciona um usuario ao localstorage
function addUsuario() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();

    if (nome && email) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const novoUsuario = { nome, email, data: new Date().toLocaleString() };
        usuarios.push(novoUsuario);
        const jsonArray = JSON.stringify(usuarios);
        localStorage.setItem('usuarios', jsonArray);

        exiUsuarios();
        limparFormulario();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

//Adiciona evento para cadastrar no localstorage
const cadBt = document.getElementById('cadBt');
cadBt.addEventListener('click', (event) => {
    event.preventDefault();
    addUsuario();

})

//função que insere os usuarios a uma lista
function exiUsuarios() {
    const lista = document.getElementById('lista');
    const listaUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    lista.innerHTML = '';

    listaUsuarios.forEach((usuario) => {
        const li = document.createElement('li');
        li.innerHTML = `${usuario.data} - Nome: ${usuario.nome}, Email: ${usuario.email}`;
        lista.appendChild(li);
    });
}

//função que deleta um usuario do localstorage
function delUsuario() {
    const nome = document.getElementById('nomeDel').value.toLowerCase();
    if (nome) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios = usuarios.filter(usuario => usuario.nome.toLowerCase() !== nome);
        const jsonArray = JSON.stringify(usuarios)
        localStorage.setItem('usuarios', jsonArray);
        exiUsuarios();
        document.getElementById('nomeDel').value = '';
    } else {
        alert('Por favor, insira o nome do usuário para excluir.');
    }
}

//Adiciona evento para deletar um usuario do localstorage
const delBt = document.getElementById('delBt');
delBt.addEventListener('click', (event) => {
    event.preventDefault();
    delUsuario()
})

//função que deleta todos usuario do localstorage
function allUsuarios() {
    localStorage.removeItem('usuarios');
    exiUsuarios();
}

//Adiciona evento para deletar todos usuario do localstorage
const allBt= document.getElementById('allBt');
allBt.addEventListener('click', (event)=> {
    event.preventDefault();
    allUsuarios();
})

//função que limpa os campos de email e nome do formulario
function limparFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
}

//função que pesquisa um usuario do localstorage
function pesqUsuario() {
    const pesquisa = document.getElementById('pesq').value.toLowerCase();
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const resultados = usuarios.filter(usuario => 
        usuario.nome.toLowerCase().includes(pesquisa) || usuario.email.toLowerCase().includes(pesquisa)
    );

    const lista = document.getElementById('lista');
    lista.innerHTML = '';

    resultados.forEach(usuario => {
        const li = document.createElement('li');
        li.innerHTML = `${usuario.data} - Nome: ${usuario.nome}, Email: ${usuario.email}`;
        lista.appendChild(li);
    });
}

//Adiciona evento para pesquisar um usuario no localstorage
const conBt = document.getElementById('conBt');
conBt.addEventListener('click', (event) => {
    event.preventDefault();
    pesqUsuario();
    document.getElementById('pesq').value = '';
})

//Preenche a lista com os dados do localstore ao entrar na janela 
window.onload = exiUsuarios;