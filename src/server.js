import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import configurarRotas from './index.js';
import produtoRoutes from './routes/produtoRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Permite receber dados dos formulários
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Os arquivos HTML, CSS e JavaScript ficam em src/public.
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

// Página inicial
app.get('/', (req, res) => {
    res.redirect('/produtos');
});

// Entrega os HTML estáticos. Os dados são carregados pelas páginas via /api.
app.get('/produtos', (req, res) => {
    res.sendFile(path.join(publicDir, 'listar.html'));
});

app.get('/produtos/novo', (req, res) => {
    res.sendFile(path.join(publicDir, 'cadastrar.html'));
});

app.get('/produtos/editar/:id', (req, res) => {
    res.sendFile(path.join(publicDir, 'editar.html'));
});

// Registra as rotas
configurarRotas(app);
app.use('/api/produtos', produtoRoutes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado em http://localhost:${PORT}`);
});
