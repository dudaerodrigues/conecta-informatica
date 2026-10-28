import express from 'express';
//Importa a função responsável pela consulta
import listarProdutos, { buscarProduto } from '../controllers/produtoController.js'

//Cria um agrupamento de rotas
const router = express.Router();

//Define a rota de listagem
router.get("/", listarProdutos);
router.get("/:id", buscarProduto);

export default router;
