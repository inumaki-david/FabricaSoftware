import React, { useState } from 'react';
import { 
  History, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Search, 
  Filter, 
  User, 
  Calendar, 
  Boxes
} from 'lucide-react';

export function HistoricoMovimentacoes({ movimentacoes, produtos, usuarios }) {
  const [filtroTipo, setFiltroTipo] = useState('todas'); // 'todas' | 'entrada' | 'saida'
  const [termoBusca, setTermoBusca] = useState('');

  // Cruzamento dos dados (Join manual de produto e usuário)
  const movimentacoesEnriquecidas = movimentacoes.map((mov) => {
    const produto = produtos.find((p) => p.id === Number(mov.produto_id)) || {
      nome: `Produto #${mov.produto_id}`,
      sku: 'N/A',
    };
    const usuario = usuarios.find((u) => u.id === Number(mov.usuario_id)) || {
      nome: `Usuário #${mov.usuario_id}`,
      cargo: 'Geral',
    };
    return {
      ...mov,
      produtoNome: produto.nome,
      produtoSku: produto.sku,
      usuarioNome: usuario.nome,
      usuarioCargo: usuario.cargo,
    };
  });

  // Filtros combinados
  const movimentacoesFiltradas = movimentacoesEnriquecidas.filter((mov) => {
    const matchTipo = filtroTipo === 'todas' || mov.tipo === filtroTipo;
    const matchBusca = 
      mov.produtoNome.toLowerCase().includes(termoBusca.toLowerCase()) ||
      mov.produtoSku.toLowerCase().includes(termoBusca.toLowerCase()) ||
      mov.usuarioNome.toLowerCase().includes(termoBusca.toLowerCase());

    return matchTipo && matchBusca;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <History className="w-6 h-6 text-indigo-600" />
          Histórico e Auditoria de Movimentações
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Rastreabilidade completa de todas as entradas e saídas realizadas no almoxarifado.
        </p>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Campo de Pesquisa */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Pesquisar por produto, SKU ou responsável..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-2xs"
          />
        </div>

        {/* Filtro por Tipo */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-slate-400 uppercase shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Tipo:
          </span>
          {[
            { id: 'todas', label: 'Todas as Operações' },
            { id: 'entrada', label: '⬇️ Apenas Entradas' },
            { id: 'saida', label: '⬆️ Apenas Saídas' },
          ].map((filtro) => (
            <button
              key={filtro.id}
              onClick={() => setFiltroTipo(filtro.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                filtroTipo === filtro.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {filtro.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabela de Histórico */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {movimentacoesFiltradas.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
              <Boxes className="w-6 h-6" />
            </div>
            <p className="text-base font-semibold text-slate-700">Nenhum registro encontrado</p>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Nenhuma movimentação corresponde aos critérios de filtro aplicados.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-5">Reg. ID</th>
                  <th className="py-3.5 px-5">Data e Hora</th>
                  <th className="py-3.5 px-5">Tipo</th>
                  <th className="py-3.5 px-5">Produto & SKU</th>
                  <th className="py-3.5 px-5 text-center">Quantidade</th>
                  <th className="py-3.5 px-5">Responsável</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {movimentacoesFiltradas.map((mov) => {
                  const isEntrada = mov.tipo === 'entrada';
                  const dataFormatada = new Date(mov.data).toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  });

                  return (
                    <tr key={mov.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-5 font-mono text-xs text-slate-400">
                        #{mov.id}
                      </td>
                      <td className="py-4 px-5 text-xs text-slate-600">
                        <div className="flex items-center gap-1.5 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {dataFormatada}
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                          isEntrada
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {isEntrada ? (
                            <>
                              <ArrowDownCircle className="w-3.5 h-3.5 text-emerald-600" />
                              Entrada
                            </>
                          ) : (
                            <>
                              <ArrowUpCircle className="w-3.5 h-3.5 text-rose-600" />
                              Saída
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-4 px-5">
                        <div className="font-semibold text-slate-900">{mov.produtoNome}</div>
                        <div className="font-mono text-xs text-slate-400">SKU: {mov.produtoSku}</div>
                      </td>
                      <td className="py-4 px-5 text-center">
                        <span className={`text-base font-extrabold ${
                          isEntrada ? 'text-emerald-600' : 'text-rose-600'
                        }`}>
                          {isEntrada ? `+${mov.quantidade_movimentada}` : `-${mov.quantidade_movimentada}`}
                        </span>
                        <span className="text-xs text-slate-400 ml-1">un.</span>
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                            <User className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{mov.usuarioNome}</div>
                            <div className="text-xs text-slate-400">{mov.usuarioCargo}</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
