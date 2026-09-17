import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  PlusCircle, 
  ArrowDownCircle, 
  ArrowUpCircle,
  AlertTriangle,
  CheckCircle2,
  Boxes
} from 'lucide-react';

export function ListaProdutos({ 
  produtos, 
  onAbrirModalNovoProduto, 
  onMovimentarProduto 
}) {
  const [termoBusca, setTermoBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos'); // 'todos' | 'critico' | 'atencao' | 'normal'

  // Filtragem combinada por busca textual e status de estoque
  const produtosFiltrados = produtos.filter((prod) => {
    const correspondeBusca = 
      prod.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
      prod.sku.toLowerCase().includes(termoBusca.toLowerCase());

    const qtd = Number(prod.quantidade_estoque) || 0;

    let correspondeStatus = true;
    if (filtroStatus === 'critico') correspondeStatus = qtd < 5;
    else if (filtroStatus === 'atencao') correspondeStatus = qtd >= 5 && qtd <= 10;
    else if (filtroStatus === 'normal') correspondeStatus = qtd > 10;

    return correspondeBusca && correspondeStatus;
  });

  const getStatusBadge = (quantidade) => {
    const qtd = Number(quantidade) || 0;
    if (qtd < 5) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
          Crítico (&lt; 5)
        </span>
      );
    }
    if (qtd <= 10) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          Atenção (5 a 10)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        Normal (&gt; 10)
      </span>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header da Lista */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Package className="w-6 h-6 text-indigo-600" />
            Catálogo e Estoque de Produtos
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Controle analítico de SKUs, níveis de suprimentos e ações de abastecimento.
          </p>
        </div>

        <button
          onClick={onAbrirModalNovoProduto}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          Adicionar Novo Item
        </button>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Campo de Pesquisa */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar por nome do produto ou código SKU..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-2xs"
          />
        </div>

        {/* Filtro por Nível de Estoque */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-slate-400 uppercase shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filtro:
          </span>
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'critico', label: '🚨 Crítico (< 5)' },
            { id: 'atencao', label: '⚠️ Atenção (5-10)' },
            { id: 'normal', label: '✅ Normal (> 10)' },
          ].map((filtro) => (
            <button
              key={filtro.id}
              onClick={() => setFiltroStatus(filtro.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                filtroStatus === filtro.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {filtro.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabela de Produtos */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {produtosFiltrados.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
              <Boxes className="w-6 h-6" />
            </div>
            <p className="text-base font-semibold text-slate-700">Nenhum produto encontrado</p>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Tente alterar os termos de busca ou filtros de status de estoque acima.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-5">ID</th>
                  <th className="py-3.5 px-5">Código SKU</th>
                  <th className="py-3.5 px-5">Nome do Produto</th>
                  <th className="py-3.5 px-5 text-center">Estoque Atual</th>
                  <th className="py-3.5 px-5">Status do Estoque</th>
                  <th className="py-3.5 px-5 text-right">Ações Rápidas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {produtosFiltrados.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-5 font-mono text-xs text-slate-400">
                      #{prod.id}
                    </td>
                    <td className="py-4 px-5">
                      <span className="font-mono text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-700 rounded-md border border-slate-200">
                        {prod.sku}
                      </span>
                    </td>
                    <td className="py-4 px-5 font-medium text-slate-900">
                      {prod.nome}
                    </td>
                    <td className="py-4 px-5 text-center">
                      <span className="text-base font-extrabold text-slate-900">
                        {prod.quantidade_estoque}
                      </span>
                      <span className="text-xs text-slate-400 ml-1">unid.</span>
                    </td>
                    <td className="py-4 px-5">
                      {getStatusBadge(prod.quantidade_estoque)}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onMovimentarProduto(prod.id, 'entrada')}
                          title="Registrar Entrada"
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold border border-emerald-200 transition-all cursor-pointer"
                        >
                          <ArrowDownCircle className="w-3.5 h-3.5" />
                          Entrada
                        </button>
                        <button
                          onClick={() => onMovimentarProduto(prod.id, 'saida')}
                          title="Registrar Saída"
                          disabled={Number(prod.quantidade_estoque) === 0}
                          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            Number(prod.quantidade_estoque) === 0
                              ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60'
                              : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                          }`}
                        >
                          <ArrowUpCircle className="w-3.5 h-3.5" />
                          Saída
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
