import { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { RecipeDetail } from './components/RecipeDetail';
import { HomePage } from './pages/HomePage';
import { AdBanner } from './components/AdBanner';
import { RecipesPage } from './pages/RecipesPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { SettingsPage } from './pages/SettingsPage';
import { AboutPage } from './pages/AboutPage';
import { PlansPage } from './pages/PlansPage';
import { AuthPage } from './pages/AuthPage';
import type { Recipe } from './data/recipes';
import { recipeStats } from './data/recipes';
import { Logo } from './components/Logo';
import { Heart, Github, Mail, Info } from 'lucide-react';

const fontSizeMap: Record<string, string> = {
  'pequeno': '12px',
  'mediano': '14px',
  'grande': '16px',
  'enorme': '20px',
};

export function App() {
  const [user, setUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [devMode, setDevMode] = useState(false);
  const [fontSize, setFontSize] = useState('mediano');
  const [activePlan, setActivePlan] = useState<string>('free');
  const [tvMode, setTvMode] = useState(() => localStorage.getItem('cocinaviva_tvmode') === 'true');
  const [isCasting, setIsCasting] = useState(false);

  useEffect(() => {
    localStorage.setItem('cocinaviva_tvmode', tvMode.toString());
    if (tvMode) {
      document.body.classList.add('tv-mode');
    } else {
      document.body.classList.remove('tv-mode');
    }
  }, [tvMode]);

  // Real Time Trial Logic
  const [trialStart, setTrialStart] = useState<number | null>(() => {
    const saved = localStorage.getItem('cocinaviva_trial_start');
    return saved ? parseInt(saved, 10) : null;
  });
  const [trialMigrated, setTrialMigrated] = useState<boolean>(() => {
    return localStorage.getItem('cocinaviva_trial_migrated') === 'true';
  });
  const [showMigrationModal, setShowMigrationModal] = useState(false);
  const [trialDaysLeft, setTrialDaysLeft] = useState(0);
  const [trialActive, setTrialActive] = useState(false);

  const [showCreateRecipe, setShowCreateRecipe] = useState(false);

  useEffect(() => {
    if (!trialStart || devMode || activePlan === 'free') {
      if (devMode) {
        setTrialActive(true);
        setTrialDaysLeft(3);
      } else {
        setTrialActive(false);
      }
      return;
    }

    const now = Date.now();
    let currentStart = trialStart;

    // SISTEMA ANTI-HACKEO: Bloquear manipulación de tiempo
    if (isNaN(currentStart) || currentStart > now) {
      localStorage.removeItem('cocinaviva_trial_start');
      localStorage.removeItem('cocinaviva_trial_migrated');
      setTrialStart(null);
      setTrialActive(false);
      setTrialDaysLeft(0);
      if (activePlan !== 'free') setActivePlan('free');
      return; // Abortar trial
    }

    const updateRemaining = () => {
      // Verificación en vivo (Anti-Hack in-memory)
      const currentNow = Date.now();
      if (currentStart > currentNow) {
        setTrialActive(false);
        setTrialDaysLeft(0);
        if (activePlan !== 'free') setActivePlan('free');
        return;
      }

      const msElapsed = currentNow - currentStart;
      const msTotal = 7 * 24 * 60 * 60 * 1000; // 7 días exactos
      const msRemaining = msTotal - msElapsed;

      if (msRemaining <= 0) {
        setTrialActive(false);
        setTrialDaysLeft(0);
        if (activePlan !== 'free') setActivePlan('free');
      } else {
        setTrialActive(true);
        setTrialDaysLeft(Math.ceil(msRemaining / (24 * 60 * 60 * 1000)));
      }
    };

    updateRemaining();
    const interval = setInterval(updateRemaining, 60000);
    return () => clearInterval(interval);
  }, [trialStart, devMode, activePlan, trialMigrated]);

  const handleStartTrial = useCallback((planId: string) => {
    const now = Date.now();
    localStorage.setItem('cocinaviva_trial_start', now.toString());
    localStorage.setItem('cocinaviva_trial_migrated', 'true'); // New trials are already 3d
    setTrialStart(now);
    setTrialMigrated(true);
    setActivePlan(planId);
  }, []);

  // Mock Analytics for Admin - Base de datos purgada de bots
  const [analytics, setAnalytics] = useState({
    users: [], // Tabla vacía para asegurar 0 bots
    purchaseIntents: [
      { plan: 'ultra', clicks: 0, lastClick: '-' },
      { plan: 'masterchef', clicks: 0, lastClick: '-' }
    ]
  });

  const trackPurchaseIntent = useCallback((plan: string) => {
    setAnalytics(prev => {
      const newIntents = prev.purchaseIntents.map(p =>
        p.plan === plan ? { ...p, clicks: p.clicks + 1, lastClick: new Date().toLocaleString() } : p
      );
      return { ...prev, purchaseIntents: newIntents };
    });
  }, []);

  // Apply font size to document
  useEffect(() => {
    document.documentElement.style.fontSize = fontSizeMap[fontSize] || '14px';
  }, [fontSize]);

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectRecipe = useCallback((recipe: Recipe) => {
    setSelectedRecipe(recipe);
  }, []);

  const handleToggleFavorite = useCallback((id: number) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleSearchChange = useCallback((q: string) => {
    setSearchQuery(q);
    if (q && currentPage !== 'recipes') {
      setCurrentPage('recipes');
    }
  }, [currentPage]);

  const handleDevModeChange = useCallback((enabled: boolean) => {
    setDevMode(enabled);
  }, []);

  const handleFontSizeChange = useCallback((size: string) => {
    setFontSize(size);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} onSelectRecipe={handleSelectRecipe} favorites={favorites} onToggleFavorite={handleToggleFavorite} activePlan={activePlan} />;
      case 'recipes':
        return <RecipesPage activePlan={activePlan} devMode={devMode} onSelectRecipe={handleSelectRecipe} favorites={favorites} onToggleFavorite={handleToggleFavorite} searchQuery={searchQuery} />;
      case 'categories':
        return <CategoriesPage onSelectRecipe={handleSelectRecipe} favorites={favorites} onToggleFavorite={handleToggleFavorite} />;
      case 'features':
        return <FeaturesPage devMode={devMode} />;
      case 'settings':
        return <SettingsPage devMode={devMode} onDevModeChange={handleDevModeChange} fontSize={fontSize} onFontSizeChange={handleFontSizeChange} analytics={analytics} />;
      case 'plans':
        return <PlansPage devMode={devMode} activePlan={activePlan} setActivePlan={setActivePlan} trackPurchaseIntent={trackPurchaseIntent} onStartTrial={handleStartTrial} trialActive={trialActive} trialDaysLeft={trialDaysLeft} />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage onNavigate={handleNavigate} onSelectRecipe={handleSelectRecipe} favorites={favorites} onToggleFavorite={handleToggleFavorite} />;
    }
  };

  if (!user) {
    return <AuthPage onLogin={setUser} />;
  }

  const forcedPayment = false; // Paywall eliminado, plan gratuito restaurado

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        tvMode={tvMode}
        onTvModeChange={setTvMode}
        devMode={devMode}
        isCasting={isCasting}
        onCastToggle={() => setIsCasting(!isCasting)}
        forcedPayment={forcedPayment}
        onOpenCreateRecipe={() => setShowCreateRecipe(true)}
      />

      {/* Create Recipe Modal */}
      {showCreateRecipe && !forcedPayment && (
        <div className="fixed inset-0 bg-black/60 z-[150] flex flex-col overflow-y-auto animate-in p-4 sm:p-8 backdrop-blur-sm">
          <div className="bg-white max-w-3xl mx-auto w-full rounded-3xl shadow-2xl relative flex flex-col my-auto border border-gray-100 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>

            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                <span className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">📝</span>
                Crear Nueva Receta
              </h2>
              <button onClick={() => setShowCreateRecipe(false)} className="p-2 bg-white border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto" style={{ maxHeight: '70vh' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nombre de la Receta</label>
                  <input type="text" placeholder="Ej. Paella de Verduras" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Categoría</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                    <option>Arroces</option>
                    <option>Carnes</option>
                    <option>Postres</option>
                    <option>Ensaladas</option>
                    <option>Sopas y Cremas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tiempo estimado (min)</label>
                  <input type="number" placeholder="45" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Dificultad</label>
                  <div className="flex gap-2">
                    <button className="flex-1 py-3 bg-green-50 text-green-700 border border-green-200 rounded-xl text-sm font-bold">Fácil</button>
                    <button className="flex-1 py-3 bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 rounded-xl text-sm font-bold">Media</button>
                    <button className="flex-1 py-3 bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 rounded-xl text-sm font-bold">Difícil</button>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Ingredientes (uno por línea)</label>
                <textarea rows={4} placeholder="Ej. 200g de arroz bomba&#10;1 pimiento rojo..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Preparación (paso a paso)</label>
                <textarea rows={4} placeholder="1. Picar la cebolla...&#10;2. Sofreír en la sartén..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"></textarea>
              </div>

              <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="text-sm text-emerald-800 font-medium leading-relaxed">
                  Tu receta será revisada por nuestro equipo y estará disponible para toda la comunidad muy pronto.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3 justify-end">
              <button onClick={() => setShowCreateRecipe(false)} className="px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                Cancelar
              </button>
              <button
                onClick={() => {
                  alert('¡Receta enviada a revisión con éxito! Pronto estará disponible en la comunidad.');
                  setShowCreateRecipe(false);
                }}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-emerald-200 transition-all hover:-translate-y-0.5"
              >
                Publicar Receta
              </button>
            </div>
          </div>
        </div>
      )}

      {isCasting && !forcedPayment && (
        <div className="bg-emerald-600 text-white px-4 py-2 flex items-center justify-between shadow-md z-30 sticky top-12">
          <div className="flex items-center gap-2">
            <span className="animate-pulse">📺</span>
            <span className="font-medium text-sm">Transmitiendo pantalla a Chromecast del Salón...</span>
          </div>
          <button
            onClick={() => setIsCasting(false)}
            className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-colors"
          >
            Detener Transmisión
          </button>
        </div>
      )}

      {/* MULTI-COLLAB BANNER */}
      <div className="bg-gradient-to-r from-orange-400 to-amber-500 text-white px-4 py-2 flex items-center justify-center gap-3 shadow-md relative z-40">
        <span className="text-xl">🍳</span>
        <p className="font-bold text-sm text-center">
          ¡Nuevas alianzas oficiales con Cookpad, Cookidoo y Holycook! Funciones exclusivas ya disponibles.
        </p>
        <button
          onClick={() => handleNavigate('features')}
          className="bg-white text-orange-600 px-3 py-1 rounded-full text-xs font-black shadow-sm hover:shadow-md transition-all ml-2"
        >
          Saber más
        </button>
      </div>

      {activePlan === 'free' && !forcedPayment && <AdBanner activePlan={activePlan} />}

      <main>
        {renderPage()}
      </main>

      {/* Trial Migration Modal */}
      {showMigrationModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
            <div className="text-center mb-5">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">
                Actualizacion de Politicas
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Te hemos enviado un email con los detalles. A partir de hoy, el periodo de prueba de los planes premium ha vuelto a ser de <strong>7 dias</strong>.
              </p>
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 text-left">
                <div className="flex gap-2 text-sm text-orange-800">
                  <Info className="w-5 h-5 flex-shrink-0" />
                  <p>
                    <strong>¿Que significa esto para ti?</strong><br/>
                    Disfrutas de más tiempo para explorar todas las funciones avanzadas.
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowMigrationModal(false)}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <Logo size={32} />
                <div>
                  <h3 className="text-sm font-black">CocinaViva</h3>
                                  <span className="text-[8px] bg-gradient-to-r from-green-500 to-emerald-600 px-1.5 py-0.5 rounded-full font-bold text-white">v2.1.0 ESTABLE</span>
              </div>
            </div>
            <p className="text-gray-400 text-xs">
              Tu compañero perfecto en la cocina con más de {recipeStats.total} recetas tradicionales y de Thermomix.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-3 text-gray-300 text-sm">Navegacion</h4>
            <ul className="space-y-1">
              {[
                { key: 'home', label: 'Inicio' },
                { key: 'recipes', label: 'Recetas' },
                { key: 'categories', label: 'Categorias' },
                { key: 'features', label: 'Funciones' },
                { key: 'plans', label: 'Planes' },
                { key: 'settings', label: 'Ajustes' },
                { key: 'about', label: 'Acerca de' },
              ].map(page => (
                <li key={page.key}>
                  <button onClick={() => handleNavigate(page.key)} className="text-gray-400 hover:text-orange-400 text-xs transition-colors">
                    {page.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Plans */}
          <div>
            <h4 className="font-bold mb-3 text-gray-300 text-sm">Planes</h4>
            <ul className="space-y-1.5">
              <li className="text-gray-400 text-xs">Basico — Gratis (con ads)</li>
              <li>
                <button onClick={() => handleNavigate('plans')} className="text-orange-400 hover:text-orange-300 text-xs transition-colors font-medium">
                  Ultra — 6,07EUR/mes
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('plans')} className="text-purple-400 hover:text-purple-300 text-xs transition-colors font-medium">
                  Master Chef — 11,13EUR/mes
                </button>
              </li>
              <li className="text-green-400 text-xs font-medium">Ahorro anual: -5,65%</li>
            </ul>
              <div className="mt-3">
                <h4 className="font-bold mb-2 text-gray-300 text-sm">Categorias Populares</h4>
                <div className="flex flex-wrap gap-1">
                  {['Entrantes', 'Carnes', 'Pescados', 'Postres', 'Arroces', 'Tapas'].map(cat => (
                    <button key={cat} onClick={() => handleNavigate('recipes')} className="text-gray-500 hover:text-orange-400 text-[10px] bg-gray-800 px-2 py-0.5 rounded-full transition-colors">
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Info */}
            <div>
              <h4 className="font-bold mb-3 text-gray-300 text-sm">Informacion</h4>
              <div className="space-y-1 text-xs text-gray-400">
                <p>📖 {recipeStats.total} recetas</p>
                <p>🤖 {recipeStats.thermomix} Thermomix</p>
                <p>⚡ 24+ funciones</p>
                <p>⚙️ 85+ ajustes</p>
                <p>🏆 380 logros</p>
                <p>👤 45+ ajustes perfil</p>
                              <p>💰 2 planes premium</p>
              <p>✅ Version 2.1.0 Estable</p>
            </div>
            <div className="mt-4 border-t border-gray-800 pt-3">
                <p className="text-[10px] text-gray-500 font-bold mb-1">DUDAS O SUGERENCIAS:</p>
                <a href="mailto:iiiribasu2010@gmail.com" className="text-orange-400 hover:text-orange-300 text-xs font-medium transition-colors">
                  iiiribasu2010@gmail.com
                </a>
              </div>
              {devMode && (
                <div className="mt-2 bg-green-900/30 border border-green-500/30 rounded-lg p-2">
                  <p className="text-green-400 text-[10px] font-bold">🛡️ ADMIN MODE ACTIVO</p>
                  <p className="text-green-500/60 text-[10px]">Plan Master Chef activado</p>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-800 mt-6 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-gray-500 text-xs">
              © 2026 CocinaViva — Todos los derechos reservados — v2.1.0
            </p>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-xs flex items-center gap-1">
                Hecho con <Heart className="w-3 h-3 text-red-500 fill-red-500" /> en Espana
              </span>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          isFavorite={favorites.has(selectedRecipe.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </div>
  );
}
