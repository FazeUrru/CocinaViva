import { useState } from 'react';
import { features } from '../data/features';
import {
  Search, Calendar, ShoppingCart, Gauge, Calculator, Heart,
  Timer, ArrowLeftRight, ListOrdered, Share2, Mic, ScanLine,
  CheckCircle2, Clock, Sparkles, BrainCircuit, RotateCw, Hand,
  Users, Video, AlertTriangle, MessageCircle, GraduationCap, Wine, Save, Box, Leaf, Camera
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Search, Calendar, ShoppingCart, Gauge, Calculator, Heart,
  Timer, ArrowLeftRight, ListOrdered, Share2, Mic, ScanLine,
  BrainCircuit, Replay: RotateCw, Hand, Users, Video, AlertTriangle, MessageCircle,
  GraduationCap, Wine, Save, Box, Leaf, Camera
};

export function FeaturesPage({ devMode }: { devMode?: boolean }) {
  const [searchQuery, setSearchQuery] = useState('');
  const searchLower = searchQuery.toLowerCase();

  const filteredFeatures = features.filter(f => {
    if (f.devOnly && !devMode) return false;
    return f.name.toLowerCase().includes(searchLower) ||
           f.description.toLowerCase().includes(searchLower);
  });

  const activeFeatures = filteredFeatures.filter(f => f.status === 'activa');
  const betaFeatures = filteredFeatures.filter(f => f.status === 'beta');
  const earlyAccessFeatures = filteredFeatures.filter(f => f.status === 'acceso_anticipado');

  return (
    <div className="max-w-7xl mx-auto px-3 py-6">
      {/* Open Source Banner */}
      <div className="mb-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </div>
          <div>
            <h3 className="text-white font-bold text-sm flex items-center gap-2">
              Proyecto de Codigo Abierto
              <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-[9px] font-bold">OPEN SOURCE</span>
            </h3>
            <p className="text-gray-400 text-xs">CocinaViva es software libre bajo licencia MIT. Contribuye en GitHub.</p>
          </div>
        </div>
        <a href="https://github.com/cocinaviva" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-100 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          Ver en GitHub
        </a>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium mb-3">
          <Sparkles className="w-3 h-3" />
          {features.length} Funciones Disponibles
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Funciones de CocinaViva</h1>
        <p className="text-gray-500 max-w-xl mx-auto text-sm mb-6">
          Herramientas que hacen de CocinaViva tu companero perfecto en la cocina. Proyecto de codigo abierto con funciones en desarrollo.
        </p>

        {/* Buscador Global */}
        <div className="max-w-xl mx-auto relative text-left">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar funciones (ej. autoguardado, lista...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-11 pr-10 py-3.5 border border-gray-200 rounded-2xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {filteredFeatures.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm mb-10">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-gray-900">No se encontraron funciones</h3>
          <p className="text-gray-500 mt-2">Prueba usando otros terminos o palabras clave.</p>
          <button onClick={() => setSearchQuery('')} className="mt-4 bg-orange-100 text-orange-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-orange-200 transition-colors">
            Limpiar Busqueda
          </button>
        </div>
      )}

      {/* Active Features */}
      {activeFeatures.length > 0 && (
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <h2 className="text-lg font-bold text-gray-900">Funciones Activas</h2>
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">{activeFeatures.length}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {activeFeatures.map(feature => {
            const Icon = iconMap[feature.icon] || Search;
            return (
              <div key={feature.id} className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-lg hover:border-orange-200 transition-all group">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-0.5">
                      <h3 className="font-bold text-gray-900 text-sm">{feature.name}</h3>
                      <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full text-[9px] font-medium">Activa</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      )}

      {/* Acceso Anticipado */}
      {earlyAccessFeatures.length > 0 && (
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <BrainCircuit className="w-5 h-5 text-orange-500" />
          <h2 className="text-lg font-bold text-gray-900">Acceso Anticipado (Solo Admin)</h2>
          <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-medium">{earlyAccessFeatures.length}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {earlyAccessFeatures.map(feature => {
            const Icon = iconMap[feature.icon] || Search;
            return (
              <div key={feature.id} className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4 hover:shadow-lg transition-all group relative overflow-hidden">
                <div className="absolute top-2 right-2 flex gap-1">
                  <span className="bg-orange-500 text-white px-1.5 py-0.5 rounded-full text-[8px] font-bold animate-pulse">EN DESARROLLO</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-0.5">{feature.name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-1">{feature.description}</p>
                    {feature.scheduledDate && (
                      <p className="text-[10px] bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded border border-orange-200 inline-flex items-center gap-1 font-semibold mt-1">
                        <Calendar className="w-3 h-3" /> Programado: {feature.scheduledDate}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      )}

      {/* Beta Features */}
      {betaFeatures.length > 0 && (
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-bold text-gray-900">Funciones Beta</h2>
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">{betaFeatures.length}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {betaFeatures.map(feature => {
            const Icon = iconMap[feature.icon] || Search;
            const isTester = feature.id === 20 || feature.id === 22;
            const isFreeNew = feature.id === 19 || feature.id === 21;
            return (
              <div key={feature.id} className={`rounded-xl p-4 hover:shadow-lg transition-all group relative overflow-hidden border ${
                isTester
                  ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300'
                  : isFreeNew
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
                    : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
              }`}>
                <div className="absolute top-2 right-2 flex gap-1">
                  {isTester && (
                    <span className="bg-gradient-to-r from-purple-500 to-red-500 text-white px-1.5 py-0.5 rounded-full text-[8px] font-bold">TESTER</span>
                  )}
                  {isFreeNew && (
                    <span className="bg-green-500 text-white px-1.5 py-0.5 rounded-full text-[8px] font-bold">GRATIS</span>
                  )}
                  <span className={`text-white px-1.5 py-0.5 rounded-full text-[8px] font-bold animate-pulse ${
                    isTester ? 'bg-purple-500' : isFreeNew ? 'bg-emerald-500' : 'bg-blue-500'
                  }`}>BETA</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform ${
                    isTester
                      ? 'bg-gradient-to-br from-purple-400 to-red-500 shadow-purple-200'
                      : isFreeNew
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500 shadow-green-200'
                        : 'bg-gradient-to-br from-blue-400 to-indigo-500 shadow-blue-200'
                  }`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-0.5">{feature.name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
                    {isTester && (
                      <p className="text-[10px] text-purple-600 font-semibold mt-1 flex items-center gap-1">
                        Exclusivo Ultra y Master Chef
                      </p>
                    )}
                    {isFreeNew && (
                      <p className="text-[10px] text-green-600 font-semibold mt-1">
                        Disponible para todos los planes
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      )}

      {/* Feature Comparison Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 bg-gray-50 border-b">
          <h2 className="text-base font-bold text-gray-900">Resumen de Funciones</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-2 text-[10px] font-semibold text-gray-500 uppercase">#</th>
                <th className="px-4 py-2 text-[10px] font-semibold text-gray-500 uppercase">Función</th>
                <th className="px-4 py-2 text-[10px] font-semibold text-gray-500 uppercase">Estado</th>
                <th className="px-4 py-2 text-[10px] font-semibold text-gray-500 uppercase hidden md:table-cell">Descripción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {features.map((feature, i) => (
                <tr key={feature.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-500">{i + 1}</td>
                  <td className="px-4 py-2 font-semibold text-gray-900">{feature.name}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      feature.status === 'activa' ? 'bg-green-100 text-green-700' :
                      feature.status === 'beta' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {feature.status === 'activa' ? '✅ Activa' : feature.status === 'beta' ? '🧪 Beta' : '🔜 Próximamente'}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-500 hidden md:table-cell max-w-xs truncate">{feature.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
