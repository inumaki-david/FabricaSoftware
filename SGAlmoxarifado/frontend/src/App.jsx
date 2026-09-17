import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardStats } from './components/DashboardStats';
import { ListaProdutos } from './components/ListaProdutos';
import { FormularioMovimentacao } from './components/FormularioMovimentacao';
import { HistoricoMovimentacoes } from './components/HistoricoMovimentacoes';
import { ModalNovoProduto } from './components/ModalNovoProduto';
import { getProdutos, getUsuarios, getMovimentacoes } from './services/api';
import { Loader2, RefreshCw, AlertCircle, Terminal } from 'lucide-react';

export default function App() {
  // Controle de Navegação
  const [abaAtiva, setAbaAtiva] = useState('dashboard'); // 'dashboard' | 'produtos' | 'movimentacao' | 'historico'

  // Estados Globais de Dados
  const [produtos, setProdutos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [movimentacoes, setMovimentacoes] = useState([]);

  // Estados de Controle de UI
  const [carregando, setCarregando] = useState(true);
  const [servidorOnline, setServidorOnline] = useState(true);
  const [modalNovoProdutoAberto, setModalNovoProdutoAberto] = useState(false);
  const [produtoPreSelecionadoId, setProdutoPreSelecionadoId] = useState(null);

  // Carrega todos os dados ao inicializar a aplicação
  useEffect(() => {
    carregarTodosDados();
  }, []);

  const carregarTodosDados = async () => {
    try {
      setCarregando(true);
      const [dadosProdutos, dadosUsuarios, dadosMovimentacoes] = await Promise.all([
        getProdutos(),
        getUsuarios(),
        getMovimentacoes(),
      ]);

      setProdutos(dadosProdutos);
      setUsuarios(dadosUsuarios);
      setMovimentacoes(dadosMovimentacoes);
      setServidorOnline(true);
    } catch (error) {
      console.error('Erro ao conectar à API do json-server:', error);
      setServidorOnline(false);
    } finally {
      setCarregando(false);
    }
  };

  /**
   * Acionado quando o usuário clica em Entrada/Saída direta na tabela de produtos
   */
  const handleAcaoRapidaProduto = (idProduto, tipoAcao) => {
    setProdutoPreSelecionadoId(idProduto);
    setAbaAtiva('movimentacao');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Barra de Navegação Superior */}
      <Navbar
        abaAtiva={abaAtiva}
        setAbaAtiva={(novaAba) => {
          setAbaAtiva(novaAba);
          if (novaAba !== 'movimentacao') {
            setProdutoPreSelecionadoId(null);
          }
        }}
        onAbrirModalNovoProduto={() => setModalNovoProdutoAberto(true)}
        servidorOnline={servidorOnline}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Banner de Erro caso a API do json-server esteja desligada */}
        {!servidorOnline && (
          <div className="mb-8 p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 shadow-xs">
            <div className="flex items-start gap-3.5">
              <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-bold text-base text-rose-900">
                  Conexão com a API json-server não detectada
                </h3>
                <p className="text-sm text-rose-700 mt-1">
                  Não foi possível conectar em <code>http://localhost:3001</code>. Verifique se o servidor mock está rodando no terminal.
                </p>
                <div className="mt-3 flex items-center gap-2 bg-rose-100/80 p-2.5 rounded-lg font-mono text-xs text-rose-950">
                  <Terminal className="w-4 h-4 text-rose-700" />
                  <span>npx json-server --watch Backend/db.json --port 3001</span>
                </div>
                <button
                  onClick={carregarTodosDados}
                  className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold cursor-pointer transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Tentar Conectar Novamente
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading Inicial */}
        {carregando && produtos.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
            <p className="text-sm font-medium text-slate-600">
              Sincronizando inventário do Almoxarifado...
            </p>
          </div>
        ) : (
          <div>
            {/* Aba 1: Dashboard */}
            {abaAtiva === 'dashboard' && (
              <DashboardStats
                produtos={produtos}
                movimentacoes={movimentacoes}
                onNavegar={(destino) => {
                  setAbaAtiva(destino);
                  if (destino !== 'movimentacao') setProdutoPreSelecionadoId(null);
                }}
              />
            )}

            {/* Aba 2: Lista de Produtos */}
            {abaAtiva === 'produtos' && (
              <ListaProdutos
                produtos={produtos}
                onAbrirModalNovoProduto={() => setModalNovoProdutoAberto(true)}
                onMovimentarProduto={handleAcaoRapidaProduto}
              />
            )}

            {/* Aba 3: Formulário de Movimentação */}
            {abaAtiva === 'movimentacao' && (
              <FormularioMovimentacao
                produtoPreSelecionadoId={produtoPreSelecionadoId}
                onMovimentacaoSucesso={() => {
                  carregarTodosDados();
                }}
              />
            )}

            {/* Aba 4: Histórico de Auditoria */}
            {abaAtiva === 'historico' && (
              <HistoricoMovimentacoes
                movimentacoes={movimentacoes}
                produtos={produtos}
                usuarios={usuarios}
              />
            )}
          </div>
        )}

      </main>

      {/* Modal de Criação de Novo Produto */}
      <ModalNovoProduto
        aberto={modalNovoProdutoAberto}
        onFechar={() => setModalNovoProdutoAberto(false)}
        onProdutoCriado={() => {
          carregarTodosDados();
          setAbaAtiva('produtos');
        }}
      />

      {/* Rodapé da Aplicação */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} SGAlmoxarifado — Sistema de Gestão de Estoque e Suprimentos.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              React + Vite
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              json-server REST API
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
