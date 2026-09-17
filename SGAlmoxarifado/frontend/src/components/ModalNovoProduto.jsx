import React, { useState } from 'react';
import { X, PackagePlus, Loader2, AlertCircle } from 'lucide-react';
import { criarProduto } from '../services/api';

export function ModalNovoProduto({ aberto, onFechar, onProdutoCriado }) {
  const [nome, setNome] = useState('');
  const [sku, setSku] = useState('');
  const [quantidadeEstoque, setQuantidadeEstoque] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  if (!aberto) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!nome.trim() || !sku.trim()) {
      setErro('Nome do produto e código SKU são obrigatórios.');
      return;
    }

    const qtd = parseInt(quantidadeEstoque, 10);
    if (isNaN(qtd) || qtd < 0) {
      setErro('A quantidade inicial em estoque deve ser igual ou superior a zero.');
      return;
    }

    try {
      setSalvando(true);
      await criarProduto({
        nome: nome.trim(),
        sku: sku.trim().toUpperCase(),
        quantidade_estoque: qtd,
      });

      setNome('');
      setSku('');
      setQuantidadeEstoque('');
      onProdutoCriado();
      onFechar();
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      setErro('Erro ao salvar produto no servidor.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <PackagePlus className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Novo Produto</h3>
          </div>
          <button
            onClick={onFechar}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo do Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {erro && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{erro}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Nome do Item / Material
            </label>
            <input
              type="text"
              placeholder="Ex: Alicate de Pressão 10 Polegadas"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Código SKU (Identificador Único)
            </label>
            <input
              type="text"
              placeholder="Ex: FER-ALIC-009"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono uppercase focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Estoque Inicial (Unidades)
            </label>
            <input
              type="number"
              min="0"
              placeholder="Ex: 20"
              value={quantidadeEstoque}
              onChange={(e) => setQuantidadeEstoque(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              required
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onFechar}
              className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={salvando}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              {salvando ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Cadastrando...
                </>
              ) : (
                'Salvar Produto'
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
