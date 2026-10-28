//Importa a conexão com o banco 
import { connectDB as banco } from '../config/connectDB.js'

//Consulta todos os produtos
async function listarProdutos(req, res) {
    try {
        const [produto] = await banco.query(
            `SELECT idProduto, nome, descricao, categoria, preco, quantidade
             FROM produto
             ORDER BY idProduto`
        );

        res.status(200).json(produto);
    } catch (erro) {
        console.error('Erro ao listar produtos:  ', erro);

        return res.status(500).json({
            mensagem: 'Erro ao consultar os produtos.'
        });
    }
}

export async function buscarProduto(req, res) {
    try {
        const [produtos] = await banco.query(
            "SELECT idProduto, nome, descricao, categoria, preco, quantidade FROM produto WHERE idProduto = ?",
            [req.params.id]
        );

        if (produtos.length === 0) {
            return res.status(404).json({ mensagem: "Produto não encontrado." });
        }

        return res.status(200).json(produtos[0]);
    } catch (erro) {
        console.error("Erro ao buscar produto: ", erro);
        return res.status(500).json({ mensagem: "Erro ao consultar o produto." });
    }
}

export default listarProdutos;
