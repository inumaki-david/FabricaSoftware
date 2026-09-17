import React from 'react';
import { 
  Package, 
  Layers, 
  AlertTriangle, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  TrendingUp,
  Activity
} from 'lucide-react';

export function DashboardStats({ produtos, movimentacoes, onNavegar }) {
  // Cálculos dinâmicos
  const totalProdutos = produtos.length;
  const totalUnidadesEstoque = produtos.reduce((acc, p) => acc + (Number(p.quantidade_estoque) || 0), 0);
  
  const produtosCriticos = produtos.filter((p) => (Number(p.quantidade_estoque) || 0) < 5);
  const produtosAtencao = produtos.filter((p) => {
    const qtd = Number(p.quantidade_estoque) || 0;
    return qtd >= 5 && qtd <= 10;
  });

  const totalEntradas = movimentacoes
    .filter((m) => m.tipo === 'entrada')
    .reduce((acc, m) => acc + (Number(m.quantidade_movimentada) || 0), 0);

  const totalSaidas = movimentacoes
    .filter((m) => m.tipo === 'saida')
    .reduce((acc, m) => acc + (Number(m.quantidade_movimentada) || 0), 0);

  const ultimasMovimentacoes = movimentacoes.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top Banner de Boas-Vindas */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-950/10">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-indigo-200 mb-3 border border-white/10">
            <Activity className="w-3.5 h-3.5 text-indigo-300" />
            Painel Geral de Controle
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Gestão de Almoxarifado em Tempo Real
          </h1>
          <p className="mt-2 text-sm sm:text-base text-indigo-100/80 leading-relaxed">
            Monitore o inventário, registre transferências e garanta a integridade física e lógica do estoque com auditoria contínua.
          </p>
        </div>

        {/* Efeito decorativo de fundo */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Grid de Cards de Estatísticas Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Card: Total de Produtos */}
        <div 
          onClick={() => onNavegar('produtos')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Produtos Únicos
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold text-slate-900">{totalProdutos}</span>
            <span className="text-xs text-slate-500 ml-1.5">SKUs ativos</span>
          </div>
          <div className="mt-3 text-xs text-indigo-600 font-medium flex items-center gap-1 group-hover:underline">
            Ver catálogo completo &rarr;
          </div>
        </div>

        {/* Card: Saldo Total de Unidades */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Volume em Estoque
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold text-slate-900">{totalUnidadesEstoque}</span>
            <span className="text-xs text-slate-500 ml-1.5">unidades totais</span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Inventário balanceado
          </div>
        </div>

        {/* Card: Estoque Crítico / Baixo */}
        <div 
          onClick={() => onNavegar('produtos')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer group ${
            produtosCriticos.length > 0
              ? 'bg-rose-50/50 border-rose-200 hover:border-rose-300 shadow-xs hover:shadow-md'
              : 'bg-white border-slate-200/80 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold uppercase tracking-wider ${
              produtosCriticos.length > 0 ? 'text-rose-700' : 'text-slate-500'
            }`}>
              Estoque Crítico
            </span>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
              produtosCriticos.length > 0 ? 'bg-rose-100 text-rose-600' : 'bg-emerald-50 text-emerald-600'
            }`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className={`text-3xl font-bold ${produtosCriticos.length > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
              {produtosCriticos.length}
            </span>
            <span className="text-xs text-slate-500 ml-1.5">itens com &lt; 5 unid.</span>
          </div>
          <div className="mt-3 text-xs font-medium text-rose-600 flex items-center gap-1">
            {produtosCriticos.length > 0 ? 'Requer reposição urgente &rarr;' : 'Nenhum item crítico!'}
          </div>
        </div>

        {/* Card: Total Movimentado */}
        <div 
          onClick={() => onNavegar('historico')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Operações Totais
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{movimentacoes.length}</span>
            <span className="text-xs text-slate-500">registros</span>
          </div>
          <div className="mt-3 flex items-center gap-3 text-xs">
            <span className="text-emerald-700 font-medium flex items-center gap-0.5">
              +{totalEntradas} entradas
            </span>
            <span className="text-rose-700 font-medium flex items-center gap-0.5">
              -{totalSaidas} saídas
            </span>
          </div>
        </div>

      </div>

      {/* Seção Inferior: Grid com Itens Críticos e Últimas Movimentações */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Bloco 1: Itens que precisam de atenção */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Itens para Reposição Prioritária
            </h3>
            <button 
              onClick={() => onNavegar('produtos')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              Ver todos
            </button>
          </div>

          {produtosCriticos.length === 0 && produtosAtencao.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              🎉 Todos os produtos possuem estoque saudável no momento!
            </div>
          ) : (
            <div className="space-y-3">
              {[...produtosCriticos, ...produtosAtencao].slice(0, 4).map((p) => {
                const isCritico = Number(p.quantidade_estoque) < 5;
                return (
                  <div 
                    key={p.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/70 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{p.nome}</p>
                      <p className="text-xs text-slate-500 font-mono">SKU: {p.sku}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        isCritico 
                          ? 'bg-rose-100 text-rose-700 border border-rose-200' 
                          : 'bg-amber-100 text-amber-700 border border-amber-200'
                      }`}>
                        {p.quantidade_estoque} un. restando
                      </span>
                      <button
                        onClick={() => onNavegar('movimentacao')}
                        className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-all"
                      >
                        Repor
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bloco 2: Atividades Recentes */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600" />
              Atividade Recente do Almoxarifado
            </h3>
            <button 
              onClick={() => onNavegar('historico')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              Ver histórico completo
            </button>
          </div>

          {ultimasMovimentacoes.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              Nenhuma movimentação registrada até o momento.
            </div>
          ) : (
            <div className="space-y-3">
              {ultimasMovimentacoes.map((m) => {
                const prod = produtos.find((p) => p.id === m.produto_id);
                const isEntrada = m.tipo === 'entrada';
                const dataFormatada = new Date(m.data).toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div 
                    key={m.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isEntrada ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                      }`}>
                        {isEntrada ? <ArrowDownCircle className="w-4 h-4" /> : <ArrowUpCircle className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {prod ? prod.nome : `Produto #${m.produto_id}`}
                        </p>
                        <p className="text-xs text-slate-400">
                          {dataFormatada} • {isEntrada ? 'Entrada' : 'Saída'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-bold ${isEntrada ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {isEntrada ? `+${m.quantidade_movimentada}` : `-${m.quantidade_movimentada}`} un.
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
