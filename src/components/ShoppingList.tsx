'use client'

import React from 'react';
import { X, Check, Trash2, Download, Share2, CheckCircle2, Circle } from 'lucide-react';

interface ShoppingListProps {
  categorizedList: any[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleItem: (id: string) => void;
  toggleAll: (checked: boolean) => void;
  clearChecked: () => void;
  clearAll: () => void;
  stats: {
    total: number;
    checked: number;
    unchecked: number;
    progress: number;
  };
}

const ShoppingList: React.FC<ShoppingListProps> = ({ 
  categorizedList,
  isOpen,
  setIsOpen,
  toggleItem,
  toggleAll,
  clearChecked,
  clearAll,
  stats
}) => {

  if (!isOpen) return null;

  // Generar texto para compartir
  const generateShareText = () => {
    let text = '🛒 *Mi Lista de Compras - NutriPlan*\n\n';
    
    categorizedList.forEach(category => {
      text += `${category.icon} *${category.name}*\n`;
      category.items.forEach(item => {
        const checkbox = item.checked ? '✓' : '○';
        text += `${checkbox} ${item.name} - ${item.quantity}\n`;
      });
      text += '\n';
    });
    
    text += `Total: ${stats.total} items\n`;
    text += `Completado: ${stats.checked}/${stats.total} (${stats.progress}%)\n\n`;
    text += '_Generado con NutriPlan_';
    
    return text;
  };

  // Compartir por WhatsApp
  const shareWhatsApp = () => {
    const text = generateShareText();
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Exportar a texto (simula PDF)
  const exportToText = () => {
    const text = generateShareText();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lista-compra-nutriplan-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 animate-fadeIn"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="fixed inset-4 sm:inset-6 md:inset-8 lg:inset-auto lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-full lg:max-w-2xl lg:h-[90vh] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl z-50 flex flex-col animate-slideUp">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              🛒 Lista de la Compra
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              {stats.total} items • {stats.progress}% completado
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 dark:text-slate-300" />
          </button>
        </div>

        {/* Progress Bar */}
        {stats.total > 0 && (
          <div className="px-4 sm:px-6 pt-4">
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-teal-500 dark:bg-teal-400 transition-all duration-500"
                style={{ width: `${stats.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-2 p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
          <button
            onClick={() => toggleAll(false)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            <Circle className="w-4 h-4" />
            Desmarcar Todo
          </button>
          <button
            onClick={() => toggleAll(true)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            <Check className="w-4 h-4" />
            Marcar Todo
          </button>
          <button
            onClick={clearChecked}
            disabled={stats.checked === 0}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4" />
            Limpiar Marcados
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {categorizedList.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                No hay items en la lista
              </p>
            </div>
          ) : (
            categorizedList.map((category, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 uppercase tracking-wide">
                  <span className="text-xl sm:text-2xl">{category.icon}</span>
                  {category.name}
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                    ({category.items.length})
                  </span>
                </h3>
                <div className="space-y-1">
                  {category.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl transition-all text-left ${
                        item.checked
                          ? 'bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800'
                          : 'bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {item.checked ? (
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm sm:text-base font-medium ${
                          item.checked
                            ? 'text-slate-500 dark:text-slate-400 line-through'
                            : 'text-slate-800 dark:text-slate-200'
                        }`}>
                          {item.name}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                          {item.quantity}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-700 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <button
              onClick={exportToText}
              disabled={stats.total === 0}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 dark:bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-700 dark:hover:bg-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              Descargar Lista
            </button>
            <button
              onClick={shareWhatsApp}
              disabled={stats.total === 0}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 dark:bg-green-500 text-white font-medium rounded-xl hover:bg-green-700 dark:hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              Compartir
            </button>
          </div>
          
          {stats.total > 0 && (
            <button
              onClick={() => {
                if (confirm('¿Estás seguro de que quieres eliminar toda la lista?')) {
                  clearAll();
                  setIsOpen(false);
                }
              }}
              className="w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              Eliminar toda la lista
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default ShoppingList;
