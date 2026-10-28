var partesDoEndereco = window.location.pathname.split("/");
var idProduto = partesDoEndereco[partesDoEndereco.length - 1];

var formulario = document.getElementById("form-editar");
var titulo = document.getElementById("titulo");
var mensagem = document.getElementById("mensagem");

function carregarProduto() {
    fetch("/api/produtos/" + idProduto)
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error("Produto não encontrado.");
            }
            return resposta.json();
        })
        .then(function (produto) {
            titulo.textContent = "Editar Produto #" + produto.idProduto;
            formulario.action = "/produtos/editar/" + produto.idProduto;

            document.getElementById("nome").value = produto.nome;
            document.getElementById("descricao").value = produto.descricao || "";
            document.getElementById("categoria").value = produto.categoria;
            document.getElementById("preco").value = produto.preco;
            document.getElementById("quantidade").value = produto.quantidade;
        })
        .catch(function (erro) {
            mensagem.textContent = erro.message;
            formulario.hidden = true;
        });
}

carregarProduto();
