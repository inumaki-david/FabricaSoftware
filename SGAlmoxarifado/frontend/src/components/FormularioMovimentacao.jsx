import React, { useState, useEffect } from 'react';
import { 
  ArrowLeftRight, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  AlertCircle, 
  CheckCircle2, 
  Package, 
  User, 
  Calculator,
  Loader2
} from 'lucide-react';
import { 
  getProdutos, 
  getUsuarios, 
  registrarMovimentacao, 
  atualizarEstoqueProduto 
} from '../services/api';

export function FormularioMovimentacao({ onMovimentacaoSucesso, produtoPreSelecionadoId = null }) {
  // Estados para listas de dados
  const [produtos, setProdutos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  // Estados dos campos do formulário
  const [produtoId, setProdutoId] = useState(produtoPreSelecionadoId || '');
  const [usuarioId, setUsuarioId] = useState('');
  const [tipo, setTipo] = useState('entrada'); // 'entrada' | 'saida'
  const [quantidade, setQuantidade] = useState('');

  // Estados de feedback e controle de loading
  const [carregandoDados, setCarregandoDados] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  // Carrega produtos e operadores da API
  useEffect(() => {
    carregarDados();
  }, []);

  // Atualiza se receber prop de produto pré-selecionado (ex: clicado direto na tabela)
  useEffect(() => {
    if (produtoPreSelecionadoId) {
      setProdutoId(produtoPreSelecionadoId);
    }
  }, [produtoPreSelecionadoId]);

  const carregarDados = async () => {
    try {
      setCarregandoDados(true);
      const [dadosProdutos, dadosUsuarios] = await Promise.all([
        getProdutos(),
        getUsuarios(),
      ]);
      setProdutos(dadosProdutos);
      setUsuarios(dadosUsuarios);

      // Pré-seleciona o primeiro usuário se existir
      if (dadosUsuarios.length > 0 && !usuarioId) {
        setUsuarioId(dadosUsuarios[0].id);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setMensagemErro('Não foi possível conectar ao servidor json-server (porta 3001).');
    } finally {
      setCarregandoDados(false);
    }
  };

  // Identifica o produto atualmente selecionado
  const produtoSelecionado = produtos.find((p) => String(p.id) === String(produtoId));
  const estoqueAtual = produtoSelecionado ? Number(produtoSelecionado.quantidade_estoque) : 0;
  const qtdNumerica = parseInt(quantidade, 10) || 0;

  // Cálculo da simulação de estoque
  const estoqueInsuficiente = tipo === 'saida' && qtdNumerica > estoqueAtual;
  const novoEstoqueProjetado = tipo === 'entrada' 
    ? estoqueAtual + qtdNumerica 
    : Math.max(0, estoqueAtual - qtdNumerica);

  /**
   * Função Principal: Executa a Regra de Negócio de Atualização de Estoque
   * 1. Valida campos e integridade dos dados.
   * 2. Garante que saídas não ultrapassem o estoque atual.
   * 3. Executa POST em /movimentacoes para auditoria.
   * 4. Executa PATCH em /produtos/:id para atualizar o saldo.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagemErro('');
    setMensagemSucesso('');

    if (!produtoId || !usuarioId) {
      setMensagemErro('Selecione um produto e um responsável pela movimentação.');
      return;
    }

    if (qtdNumerica <= 0) {
      setMensagemErro('A quantidade movimentada deve ser maior que zero.');
      return;
    }

    // REGRA DE NEGÓCIO: Bloquear saída maior que estoque
    if (estoqueInsuficiente) {
      setMensagemErro(
        `Operação bloqueada! Saldo em estoque (${estoqueAtual} unid.) é inferior à quantidade solicitada (${qtdNumerica} unid.).`
      );
      return;
    }

    try {
      setSalvando(true);

      // 1. Dados da movimentação
      const dadosMovimentacao = {
        produto_id: Number(produtoId),
        usuario_id: Number(usuarioId),
        tipo,
        quantidade_movimentada: qtdNumerica,
        data: new Date().toISOString(),
      };

      // 2. Dispara POST em /movimentacoes
      await registrarMovimentacao(dadosMovimentacao);

      // 3. Dispara PATCH em /produtos/:id com o novo saldo calculado
      await atualizarEstoqueProduto(produtoId, novoEstoqueProjetado);

      // 4. Feedback visual e limpeza
      setMensagemSucesso(
        `Movimentação de ${tipo.toUpperCase()} confirmada! Novo saldo de "${produtoSelecionado.nome}": ${novoEstoqueProjetado} unidades.`
      );
      setQuantidade('');

      // Recarrega os dados e avisa o componente pai
      await carregarDados();
      if (onMovimentacaoSucesso) {
        onMovimentacaoSucesso();
      }
    } catch (error) {
      console.error('Erro ao processar movimentação:', error);
      setMensagemErro('Falha ao registrar a movimentação no servidor. Verifique a conexão.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 sm:p-8">
        
        {/* Cabeçalho do Card */}
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            tipo === 'entrada' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
          }`}>
            <ArrowLeftRight className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Registrar Movimentação</h2>
            <p className="text-sm text-slate-500">
              Controle de entrada de reposição ou saída de material do almoxarifado
            </p>
          </div>
        </div>

        {/* Mensagens de Feedback */}
        {mensagemErro && (
          <div className="mt-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-sm">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Atenção na Operação</p>
              <p className="text-rose-700 mt-0.5">{mensagemErro}</p>
            </div>
          </div>
        )}

        {mensagemSucesso && (
          <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-800 text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Sucesso!</p>
              <p className="text-emerald-700 mt-0.5">{mensagemSucesso}</p>
            </div>
          </div>
        )}

        {carregandoDados ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            <span className="text-sm">Carregando catálogo e operadores...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            
            {/* Seletor do Tipo de Movimentação (Toggle Estilizado) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Tipo de Operação
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => { setTipo('entrada'); setMensagemErro(''); }}
                  className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border-2 font-semibold text-sm transition-all cursor-pointer ${
                    tipo === 'entrada'
                      ? 'border-emerald-500 bg-emerald-50/70 text-emerald-800 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50/50'
                  }`}
                >
                  <ArrowDownCircle className={`w-5 h-5 ${tipo === 'entrada' ? 'text-emerald-600' : 'text-slate-400'}`} />
                  Entrada (Reposição)
                </button>

                <button
                  type="button"
                  onClick={() => { setTipo('saida'); setMensagemErro(''); }}
                  className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border-2 font-semibold text-sm transition-all cursor-pointer ${
                    tipo === 'saida'
                      ? 'border-rose-500 bg-rose-50/70 text-rose-800 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50/50'
                  }`}
                >
                  <ArrowUpCircle className={`w-5 h-5 ${tipo === 'saida' ? 'text-rose-600' : 'text-slate-400'}`} />
                  Saída (Retirada)
                </button>
              </div>
            </div>

            {/* Seleção do Produto */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Produto / Item do Almoxarifado
              </label>
              <div className="relative">
                <select
                  value={produtoId}
                  onChange={(e) => {
                    setProdutoId(e.target.value);
                    setMensagemErro('');
                  }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  required
                >
                  <option value="">Selecione um produto cadastrado...</option>
                  {produtos.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      [{prod.sku}] {prod.nome} — (Estoque atual: {prod.quantidade_estoque} un.)
                    </option>
                  ))}
                </select>
                <Package className="w-5 h-5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Seleção do Responsável */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Usuário Responsável / Solicitante
              </label>
              <div className="relative">
                <select
                  value={usuarioId}
                  onChange={(e) => setUsuarioId(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  required
                >
                  <option value="">Selecione o operador/responsável...</option>
                  {usuarios.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.nome} • {user.cargo}
                    </option>
                  ))}
                </select>
                <User className="w-5 h-5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Quantidade a Movimentar */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Quantidade a Movimentar (Unidades)
              </label>
              <input
                type="number"
                min="1"
                placeholder="Informe a quantidade (ex: 5)"
                value={quantidade}
                onChange={(e) => {
                  setQuantidade(e.target.value);
                  setMensagemErro('');
                }}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                  estoqueInsuficiente
                    ? 'border-rose-400 bg-rose-50/30 text-rose-900 focus:ring-2 focus:ring-rose-500'
                    : 'border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
                required
              />
              {estoqueInsuficiente && (
                <p className="mt-1.5 text-xs font-semibold text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Quantidade excede o estoque disponível ({estoqueAtual} unid.).
                </p>
              )}
            </div>

            {/* Card de Simulação do Impacto no Estoque */}
            {produtoSelecionado && qtdNumerica > 0 && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  <Calculator className="w-4 h-4 text-indigo-600" />
                  Simulação de Atualização de Estoque
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <span className="block text-[11px] text-slate-400 font-medium">Estoque Atual</span>
                    <span className="text-base font-bold text-slate-800">{estoqueAtual}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <span className="block text-[11px] text-slate-400 font-medium">
                      {tipo === 'entrada' ? 'Adicionar' : 'Subtrair'}
                    </span>
                    <span className={`text-base font-bold ${tipo === 'entrada' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {tipo === 'entrada' ? `+${qtdNumerica}` : `-${qtdNumerica}`}
                    </span>
                  </div>
                  <div className={`p-2.5 rounded-lg border ${
                    estoqueInsuficiente 
                      ? 'bg-rose-50 border-rose-300 text-rose-700' 
                      : 'bg-indigo-50 border-indigo-200 text-indigo-900'
                  }`}>
                    <span className="block text-[11px] font-medium opacity-80">Saldo Final</span>
                    <span className="text-base font-extrabold">
                      {estoqueInsuficiente ? 'INVÁLIDO' : novoEstoqueProjetado}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Botão de Confirmação */}
            <button
              type="submit"
              disabled={salvando || estoqueInsuficiente}
              className={`w-full py-3.5 rounded-xl font-bold text-sm text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                estoqueInsuficiente
                  ? 'bg-slate-400 cursor-not-allowed shadow-none'
                  : tipo === 'entrada'
                  ? 'bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] shadow-emerald-600/20'
                  : 'bg-rose-600 hover:bg-rose-700 active:scale-[0.99] shadow-rose-600/20'
              }`}
            >
              {salvando ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sincronizando com Servidor...
                </>
              ) : estoqueInsuficiente ? (
                'Bloqueado: Saldo Insuficiente'
              ) : (
                `Confirmar Registro de ${tipo === 'entrada' ? 'Entrada' : 'Saída'}`
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
