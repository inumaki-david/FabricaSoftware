import axios from 'axios';

// Instância centralizada do Axios apontando para a porta do json-server
const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

// --- SERVIÇOS DE PRODUTOS ---

/**
 * Obtém todos os produtos cadastrados no almoxarifado.
 */
export const getProdutos = async () => {
  const response = await api.get('/produtos');
  return response.data;
};

/**
 * Obtém um produto específico pelo ID.
 */
export const getProdutoPorId = async (id) => {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
};

/**
 * Cadastra um novo produto no estoque.
 */
export const criarProduto = async (produto) => {
  const response = await api.post('/produtos', {
    ...produto,
    quantidade_estoque: Number(produto.quantidade_estoque) || 0,
  });
  return response.data;
};

/**
 * Atualiza o saldo de estoque de um produto existente (via PATCH).
 * @param {number|string} id - ID do produto
 * @param {number} novaQuantidade - Nova quantidade calculada
 */
export const atualizarEstoqueProduto = async (id, novaQuantidade) => {
  const response = await api.patch(`/produtos/${id}`, {
    quantidade_estoque: novaQuantidade,
  });
  return response.data;
};

// --- SERVIÇOS DE USUÁRIOS ---

/**
 * Obtém a lista de usuários/operadores cadastrados.
 */
export const getUsuarios = async () => {
  const response = await api.get('/usuarios');
  return response.data;
};

/**
 * Cadastra um novo usuário no sistema.
 */
export const criarUsuario = async (usuario) => {
  const response = await api.post('/usuarios', usuario);
  return response.data;
};

// --- SERVIÇOS DE MOVIMENTAÇÕES ---

/**
 * Obtém o histórico de movimentações ordenado por data decrescente.
 */
export const getMovimentacoes = async () => {
  const response = await api.get('/movimentacoes');
  // Ordena por data decrescente (mais recente primeiro)
  return response.data.sort((a, b) => new Date(b.data) - new Date(a.data));
};

/**
 * Registra uma nova movimentação (Entrada ou Saída) para auditoria.
 * @param {Object} movimentacao - { produto_id, usuario_id, tipo, quantidade_movimentada, data }
 */
export const registrarMovimentacao = async (movimentacao) => {
  const response = await api.post('/movimentacoes', {
    ...movimentacao,
    data: movimentacao.data || new Date().toISOString(),
  });
  return response.data;
};

export default api;
