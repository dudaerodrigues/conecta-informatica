import { connectDB as banco } from './config/connectDB.js'

function configurarRotas(app) {
  // Cadastrar produto
  app.post("/produtos/novo", async (req, res) => {
    const { nome, descricao, categoria, preco, quantidade } = req.body;

    try {
      await banco.query(
        `INSERT INTO produto
                (nome, descricao, categoria, preco, quantidade)
                VALUES (?, ?, ?, ?, ?)`,
        [nome, descricao || null, categoria, preco, quantidade],
      );

      res.redirect(
        "/produtos?msgSucesso=" +
          encodeURIComponent("Produto cadastrado com sucesso!"),
      );
    } catch (erro) {
      console.error(erro);
      res.status(500).send("Erro ao cadastrar produto.");
    }
  });

  // Salvar edição
  app.post("/produtos/editar/:id", async (req, res) => {
    const { nome, descricao, categoria, preco, quantidade } = req.body;

    try {
      await banco.query(
        `UPDATE produto
                SET nome = ?, descricao = ?, categoria = ?,
                    preco = ?, quantidade = ?
                WHERE idProduto = ?`,
        [nome, descricao || null, categoria, preco, quantidade, req.params.id],
      );

      res.redirect(
        "/produtos?msgSucesso=" +
          encodeURIComponent("Produto atualizado com sucesso!"),
      );
    } catch (erro) {
      console.error(erro);
      res.status(500).send("Erro ao atualizar produto.");
    }
  });

  // Excluir produto
  app.post("/produtos/excluir/:id", async (req, res) => {
    try {
      await banco.query("DELETE FROM produto WHERE idProduto = ?", [
        req.params.id,
      ]);

      res.redirect(
        "/produtos?msgSucesso=" +
          encodeURIComponent("Produto excluído com sucesso!"),
      );
    } catch (erro) {
      console.error(erro);
      res.status(500).send("Erro ao excluir produto.");
    }
  });

  // Testar a conexão com o banco
  app.get("/teste-banco", async (req, res) => {
    try {
      const [resultado] = await banco.query("SELECT DATABASE() AS BancoAtual");

      res.json({
        mensagem: "Conexão com o MySQL realizada com sucesso!",
        banco: resultado[0].BancoAtual,
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({
        mensagem: "Não foi possível conectar ao banco de dados.",
      });
    }
  });
}

export default configurarRotas;
