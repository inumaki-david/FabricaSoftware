import React from 'react';
import { 
  Boxes, 
  LayoutDashboard, 
  Package, 
  ArrowLeftRight, 
  History, 
  PlusCircle, 
  Wifi, 
  WifiOff 
} from 'lucide-react';

export function Navbar({ abaAtiva, setAbaAtiva, onAbrirModalNovoProduto, servidorOnline }) {
  const itensNav = [
    { id: 'dashboard', label: 'Dashboard', icone: LayoutDashboard },
    { id: 'produtos', label: 'Estoque de Produtos', icone: Package },
    { id: 'movimentacao', label: 'Nova Movimentação', icone: ArrowLeftRight },
    { id: 'historico', label: 'Histórico & Auditoria', icone: History },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logotipo e Identidade Visual */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Boxes className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg font-bold bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 bg-clip-text text-transparent">
                SGAlmoxarifado
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-semibold bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                v1.0 Pro
              </span>
            </div>
          </div>

          {/* Abas de Navegação */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/80">
            {itensNav.map((item) => {
              const Icone = item.icone;
              const ativo = abaAtiva === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setAbaAtiva(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    ativo
                      ? 'bg-white text-indigo-600 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icone className={`w-4 h-4 ${ativo ? 'text-indigo-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Ações Rápidas da Direita */}
          <div className="flex items-center gap-3">
            {/* Status do Backend json-server */}
            <div 
              title={servidorOnline ? 'Conectado à API (porta 3001)' : 'Sem conexão com json-server'}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                servidorOnline
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
            >
              {servidorOnline ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>API Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-rose-500" />
                  <span>API Offline</span>
                </>
              )}
            </div>

            {/* Botão Novo Produto */}
            <button
              onClick={onAbrirModalNovoProduto}
              className="flex items-center gap-2 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-semibold rounded-lg shadow-sm shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Novo Produto</span>
            </button>
          </div>

        </div>

        {/* Menu Mobile */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100">
          {itensNav.map((item) => {
            const Icone = item.icone;
            const ativo = abaAtiva === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setAbaAtiva(item.id)}
                className={`flex flex-col items-center gap-1 py-1 px-2 text-xs font-medium transition-colors ${
                  ativo ? 'text-indigo-600 font-bold' : 'text-slate-500'
                }`}
              >
                <Icone className="w-4 h-4" />
                {item.label.split(' ')[0]}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
