import { Github, Mail, Heart, Star, BookOpen, Zap, Settings, Users, Award, Coffee, Trophy } from 'lucide-react';
import { Logo } from '../components/Logo';
import { recipeStats } from '../data/recipes';

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Logo size={64} />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">CocinaViva</h1>
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">v2.1.0 ESTABLE</span>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Nueva Versión Élite</span>
        </div>
                  <p className="text-sm text-gray-500 max-w-xl mx-auto">
          La plataforma definitiva de recetas españolas y de Thermomix. Más de {recipeStats.total} recetas,
          {recipeStats.thermomix} para Thermomix, 24+ funciones avanzadas, 115+ ajustes y 380 logros.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {[
          { icon: BookOpen, value: `${recipeStats.total}`, label: 'Recetas', color: 'from-orange-400 to-red-500' },
          { icon: Zap, value: recipeStats.thermomix, label: 'Thermomix', color: 'from-blue-400 to-indigo-500' },
          { icon: Settings, value: '115+', label: 'Ajustes', color: 'from-green-400 to-emerald-500' },
          { icon: Trophy, value: '380', label: 'Logros', color: 'from-yellow-400 to-orange-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all">
            <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-black text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Version Info */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-green-500" />
          Notas de la Version 2.1.0 Élite
        </h2>
        <div className="bg-white rounded-lg p-4 border border-green-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">v2.1.0 ESTABLE</span>
            <span className="text-xs text-gray-500">Versión actual — Innovación y Control</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600">
            <div className="space-y-1">
              <p>✅ {recipeStats.total} recetas tradicionales y Thermomix</p>
              <p>✅ {recipeStats.thermomix} recetas Thermomix ({recipeStats.thermomixPostres} postres)</p>
              <p>✅ 20 categorías de cocina</p>
              <p>✅ 24+ funciones (Inventario, Zero Waste, AR)</p>
              <p>✅ 85+ ajustes de personalización + 30 perfil</p>
              <p>✅ 380 logros desbloqueables (+100 nuevos)</p>
              <p>✅ Sistema de favoritos mejorado</p>
              <p>✅ 4 Nuevos Botones de acceso rápido</p>
            </div>
            <div className="space-y-1">
              <p>✅ Filtro de dificultad en barra lateral</p>
              <p>✅ Busqueda y filtros avanzados</p>
              <p>✅ Modo Thermomix con instrucciones detalladas</p>
              <p>✅ Diseno responsive y compacto</p>
              <p>✅ Modo Administrador (solo autorizado)</p>
              <p>✅ 2 planes premium (Ultra y Master Chef)</p>
              <p>✅ Politica de privacidad</p>
              <p>✅ Botones de acceso rapido</p>
            </div>
          </div>
        </div>

        {/* Changelog */}
        <div className="mt-4 bg-white rounded-lg p-4 border border-green-100">
          <h3 className="font-bold text-sm text-gray-900 mb-2">Historial de Versiones</h3>
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex items-start gap-2">
              <span className="bg-purple-600 text-white px-1.5 py-0.5 rounded text-[9px] font-bold mt-0.5">v2.1.0</span>
              <span>Actualización Élite. Inventario inteligente, Modo Zero Waste, Realidad Aumentada. +200 recetas, +100 logros.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded text-[9px] font-bold mt-0.5">v2.0.0</span>
              <span>Gran actualización 2.0. +450 recetas (total 2250), +5 ajustes de accesibilidad, +7 ajustes generales, mejoras de UI.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="bg-green-600 text-white px-1.5 py-0.5 rounded text-[9px] font-bold mt-0.5">v1.0.4</span>
              <span>Actualización de contenido. 1800 recetas, nuevos ajustes beta.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="bg-green-500 text-white px-1.5 py-0.5 rounded text-[9px] font-bold mt-0.5">v1.0.0</span>
              <span>Lanzamiento estable. 170 logros, modo administrador, tipografia ajustable, 53+ ajustes.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="bg-orange-500 text-white px-1.5 py-0.5 rounded text-[9px] font-bold mt-0.5">v0.9</span>
              <span>Beta. 100 logros, modo desarrollador, 52 ajustes, planes premium.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="bg-gray-400 text-white px-1.5 py-0.5 rounded text-[9px] font-bold mt-0.5">v0.5</span>
              <span>Alpha. Sistema base de recetas y navegacion.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            Caracteristicas Principales
          </h3>
          <ul className="space-y-2 text-xs text-gray-600">
            <li className="flex items-start gap-2">🍳 <span>Recetas tradicionales de todas las regiones</span></li>
            <li className="flex items-start gap-2">🤖 <span>Instrucciones especificas para Thermomix</span></li>
            <li className="flex items-start gap-2">🔍 <span>Busqueda avanzada con filtro de dificultad</span></li>
            <li className="flex items-start gap-2">❤️ <span>Sistema de favoritos</span></li>
            <li className="flex items-start gap-2">📊 <span>Informacion nutricional</span></li>
            <li className="flex items-start gap-2">🏆 <span>150 logros para desbloquear</span></li>
            <li className="flex items-start gap-2">🔤 <span>Tipografia ajustable (4 tamanos)</span></li>
            <li className="flex items-start gap-2">🛡️ <span>Modo Administrador exclusivo</span></li>
          </ul>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-500" />
            Tipos de Cocina
          </h3>
          <ul className="space-y-2 text-xs text-gray-600">
            <li className="flex items-start gap-2">🇪🇸 <span>Cocina espanola regional (20 regiones)</span></li>
            <li className="flex items-start gap-2">🌍 <span>Cocina internacional adaptada</span></li>
            <li className="flex items-start gap-2">🥗 <span>Opciones vegetarianas y veganas</span></li>
            <li className="flex items-start gap-2">🌾 <span>Recetas sin gluten</span></li>
            <li className="flex items-start gap-2">⚡ <span>Recetas rapidas (menos de 30 min)</span></li>
            <li className="flex items-start gap-2">🎉 <span>Recetas especiales para fiestas</span></li>
          </ul>
        </div>
      </div>

      {/* Team / Contact */}
      <div className="text-center bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
        <Coffee className="w-8 h-8 text-orange-500 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-gray-900 mb-2">Hecho con amor para amantes de la cocina</h2>
        <p className="text-gray-500 text-xs mb-4 max-w-md mx-auto">
          CocinaViva nace de la pasion por la gastronomia espanola y la tecnologia.
        </p>
        <div className="bg-white rounded-lg p-4 inline-block border border-gray-100 shadow-sm mb-4">
          <p className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">¿Dudas o sugerencias?</p>
          <a href="mailto:iiiribasu2010@gmail.com" className="text-orange-600 font-bold hover:underline flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" /> iiiribasu2010@gmail.com
          </a>
        </div>
        <div className="flex justify-center gap-3 mt-2">
          <a href="https://github.com/cocinaviva" className="p-2 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all">
            <Github className="w-4 h-4 text-gray-700" />
          </a>
          <a href="mailto:iiiribasu2010@gmail.com" className="p-2 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all">
            <Mail className="w-4 h-4 text-gray-700" />
          </a>
          <div className="p-2 bg-white rounded-lg border border-gray-200">
            <Heart className="w-4 h-4 text-red-500" />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-gray-400">
        <p>© 2026 CocinaViva — Todos los derechos reservados</p>
        <p className="mt-1">Version 2.1.0 Estable — Innovación Élite</p>
      </div>
    </div>
  );
}
