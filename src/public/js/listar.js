var tabela = document.getElementById("tabela-produtos");
var formularioBusca = document.getElementById("form-busca");
var campoBusca = document.getElementById("idProduto");
var mensagem = document.getElementById("mensagem");

function limparTabela() {
    while (tabela.firstChild) {
        tabela.removeChild(tabela.firstChild);
    }
}

function criarCelula(valor) {
    var celula = document.createElement("td");
    celula.textContent = valor || "";
    return celula;
}

function mostrarProdutos(produtos) {
    limparTabela();

    if (produtos.length === 0) {
        var linhaVazia = document.createElement("tr");
        var celulaVazia = document.createElement("td");
        celulaVazia.textContent = "Nenhum produto encontrado.";
        celulaVazia.colSpan = 7;
        linhaVazia.appendChild(celulaVazia);
        tabela.appendChild(linhaVazia);
        return;
    }

    for (var i = 0; i < produtos.length; i++) {
        var produto = produtos[i];
        var linha = document.createElement("tr");

        linha.appendChild(criarCelula(produto.idProduto));
        linha.appendChild(criarCelula(produto.nome));
        linha.appendChild(criarCelula(produto.descricao));
        linha.appendChild(criarCelula(produto.categoria));
        linha.appendChild(criarCelula("R$ " + Number(produto.preco).toFixed(2)));
        linha.appendChild(criarCelula(produto.quantidade));

        var celulaAcoes = document.createElement("td");
        var linkEditar = document.createElement("a");
        linkEditar.href = "/produtos/editar/" + produto.idProduto;
        linkEditar.className = "botao botao-editar";
        linkEditar.textContent = "Editar";
        celulaAcoes.appendChild(linkEditar);

        var formularioExcluir = document.createElement("form");
        formularioExcluir.action = "/produtos/excluir/" + produto.idProduto;
        formularioExcluir.method = "POST";
        formularioExcluir.style.display = "inline";

        var botaoExcluir = document.createElement("button");
        botaoExcluir.type = "submit";
        botaoExcluir.className = "botao botao-excluir";
        botaoExcluir.textContent = "Excluir";
        formularioExcluir.appendChild(botaoExcluir);

        formularioExcluir.onsubmit = function () {
            return confirm("Tem certeza que deseja excluir este produto?");
        };

        celulaAcoes.appendChild(formularioExcluir);
        linha.appendChild(celulaAcoes);
        tabela.appendChild(linha);
    }
}

function carregarProdutos(id) {
    var endereco = "/api/produtos";

    if (id) {
        endereco = "/api/produtos/" + id;
    }

    fetch(endereco)
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error("Produto não encontrado ou erro ao carregar dados.");
            }
            return resposta.json();
        })
        .then(function (dados) {
            if (Array.isArray(dados)) {
                mostrarProdutos(dados);
            } else {
                mostrarProdutos([dados]);
            }
            mensagem.textContent = "";
        })
        .catch(function (erro) {
            limparTabela();
            mensagem.textContent = erro.message;
        });
}

formularioBusca.onsubmit = function (evento) {
    evento.preventDefault();
    carregarProdutos(campoBusca.value);
};

var parametros = new URLSearchParams(window.location.search);
var msgSucesso = parametros.get("msgSucesso");
if (msgSucesso) {
    mensagem.textContent = msgSucesso;
}

carregarProdutos("");
