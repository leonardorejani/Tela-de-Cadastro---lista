const botao = document.getElementById("btnCadastrar");
const listaUsuariosCadastrados = [];

// Cadastrar Usuário
botao.addEventListener('click', function () {
  const objUsuario = {
    usuario: document.getElementById("usuario").value,
    senha: document.getElementById("senha").value
  };
  listaUsuariosCadastrados.push(objUsuario);
  const listaJson = JSON.stringify(
    (JSON.parse(localStorage.getItem("usuarios")) || []).concat(objUsuario)
  );
  localStorage.setItem("usuarios", listaJson);
  listar();
  document.getElementById("usuario").value = '';
  document.getElementById("senha").value = '';
});

// Listar Usuários
function listar() {
  const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  let tabela = document.getElementById("listaUsuariosCadastrados");
  tabela.innerHTML = '';

  listaUsuarios.forEach((user, index) => {
    let linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${user.usuario}</td>
      <td>${user.senha}</td>
      <td>
        <button onclick="editarUsuario(${index})">Editar</button>
        <button onclick="removerUsuario(${index})">Remover</button>
      </td>
    `;
    tabela.appendChild(linha);
  });
}

// Editar Usuário
window.editarUsuario = function (index) {
  const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const novoUsuario = prompt("Novo usuário:", listaUsuarios[index].usuario);
  const novaSenha = prompt("Nova senha:", listaUsuarios[index].senha);
  if (novoUsuario !== null && novaSenha !== null) {
    listaUsuarios[index].usuario = novoUsuario;
    listaUsuarios[index].senha = novaSenha;
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
    listar();
  }
};

// Remover Usuário
window.removerUsuario = function (index) {
  const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  if (confirm("Deseja remover este usuário?")) {
    listaUsuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
    listar();
  }
};

listar();