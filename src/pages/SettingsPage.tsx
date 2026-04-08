import { useState, useEffect, useCallback } from 'react';
import { settings, settingCategories, achievements, achievementCategories, profileSettings, profileSettingGroups } from '../data/features';
import { Settings, Palette, Bell, Shield, Eye, RotateCcw, Save, CheckCircle, ChefHat, Trophy, Star, Lock, FlaskConical, ShieldCheck, UserCircle, User, Heart, Users, Sparkles, Type, Github, Facebook, Linkedin, Instagram, Send, MessageCircle, Search, Cast } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Settings, Palette, Bell, Shield, Eye, ChefHat, FlaskConical, ShieldCheck, UserCircle, User, Heart, Users, Lock, Sparkles, Type, Cast,
};

const ADMIN_CODE = 'cocinaviva2026#';

interface SettingsPageProps {
  devMode: boolean;
  onDevModeChange: (enabled: boolean) => void;
  fontSize: string;
  onFontSizeChange: (size: string) => void;
  analytics?: {
    users: { id: number; name: string; email: string; method: string; date: string; plan: string; isBot?: boolean }[];
    purchaseIntents: { plan: string; clicks: number; lastClick: string; }[];
  };
}

export function SettingsPage({ devMode, onDevModeChange, fontSize, onFontSizeChange, analytics }: SettingsPageProps) {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'settings' | 'achievements' | 'profile'>('settings');
  const [settingsState, setSettingsState] = useState<Record<number, boolean | string | number>>(() => {
    const initial = Object.fromEntries(settings.map(s => [s.id, s.defaultValue]));
    initial[230] = fontSize;
    return initial;
  });
  const [profileState, setProfileState] = useState<Record<number, boolean | string | number>>(
    Object.fromEntries(profileSettings.map(s => [s.id, s.defaultValue]))
  );
  const [saved, setSaved] = useState(false);
  const [achievementCategory, setAchievementCategory] = useState('recetas');
  const [adminCodeInput, setAdminCodeInput] = useState('');
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [adminClickCount, setAdminClickCount] = useState(0);
  const [activeProfileGroup, setActiveProfileGroup] = useState('personal');

  const handleVersionClick = useCallback(() => {
    setAdminClickCount(prev => {
      const next = prev + 1;
      if (next >= 7) {
        setShowAdminPrompt(true);
        return 0;
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (adminClickCount > 0 && adminClickCount < 7) {
      const timer = setTimeout(() => setAdminClickCount(0), 3000);
      return () => clearTimeout(timer);
    }
  }, [adminClickCount]);

  const handleAdminCodeSubmit = () => {
    if (adminCodeInput.toLowerCase() === ADMIN_CODE) {
      onDevModeChange(true);
      setShowAdminPrompt(false);
      setAdminCodeInput('');
    } else {
      setAdminCodeInput('');
    }
  };

  const filteredSettings = settings.filter(s => {
    if (s.category === 'administrador' && !devMode) return false;
    return s.category === activeCategory;
  });

  const filteredAchievements = achievements.filter(a => a.category === achievementCategory);
  const filteredProfileSettings = profileSettings.filter(s => s.group === activeProfileGroup);

  const handleToggle = (id: number) => {
    setSettingsState(prev => ({ ...prev, [id]: !prev[id] }));
    setSaved(false);
  };

  const handleSelect = (id: number, value: string) => {
    setSettingsState(prev => ({ ...prev, [id]: value }));
    if (id === 230) {
      onFontSizeChange(value);
    }
    setSaved(false);
  };

  const handleSlider = (id: number, value: number) => {
    setSettingsState(prev => ({ ...prev, [id]: value }));
    setSaved(false);
  };

  const handleProfileToggle = (id: number) => {
    setProfileState(prev => ({ ...prev, [id]: !prev[id] }));
    setSaved(false);
  };

  const handleProfileText = (id: number, value: string) => {
    setProfileState(prev => ({ ...prev, [id]: value }));
    setSaved(false);
  };

  const handleProfileSlider = (id: number, value: number) => {
    setProfileState(prev => ({ ...prev, [id]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setSettingsState(() => {
      const initial = Object.fromEntries(settings.map(s => [s.id, s.defaultValue]));
      initial[230] = 'mediano';
      return initial;
    });
    setProfileState(Object.fromEntries(profileSettings.map(s => [s.id, s.defaultValue])));
    onFontSizeChange('mediano');
    setSaved(false);
  };

  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalAchievements = achievements.length;
  const searchLower = searchQuery.toLowerCase();
  const searchResultsSettings = settings.filter(s =>
    (s.name.toLowerCase().includes(searchLower) || s.description.toLowerCase().includes(searchLower)) &&
    (s.category !== 'administrador' || devMode)
  );
  const searchResultsProfile = profileSettings.filter(s =>
    s.name.toLowerCase().includes(searchLower) || s.description.toLowerCase().includes(searchLower)
  );
  const isSearching = searchLower.length > 0;

  const totalSettingsCount = settings.filter(s => !s.devOnly || devMode).length;
  const betaSettingsCount = settings.filter(s => s.category === 'beta').length;
  const adminSettingsCount = settings.filter(s => s.category === 'administrador').length;

  const visibleCategories = settingCategories.filter(c => {
    if (c.key === 'administrador' && !devMode) return false;
    if (c.key === 'perfil') return false;
    return true;
  });

  const fontSizeLabel: Record<string, string> = {
    'pequeno': '12px',
    'mediano': '14px',
    'grande': '16px',
    'enorme': '20px',
  };

  return (
    <div className="max-w-5xl mx-auto px-3 py-6">
      {/* Header con version */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center">
            <Settings className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ajustes</h1>
            <p className="text-gray-500 text-xs">
              {totalSettingsCount} ajustes + {profileSettings.length} perfil + {totalAchievements} logros
              {devMode && <span className="ml-1 text-green-600 font-bold">+ ADMIN</span>}
            </p>
          </div>
        </div>
        <div className="text-right">
          <button
            onClick={handleVersionClick}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold cursor-default select-none"
          >
            v2.1.0 ESTABLE
          </button>
          {devMode && (
            <p className="text-[10px] text-green-600 font-bold mt-1 flex items-center gap-1 justify-end">
              <ShieldCheck className="w-3 h-3" /> Modo Administrador
            </p>
          )}
          {adminClickCount > 0 && adminClickCount < 7 && (
            <p className="text-[10px] text-gray-400 mt-1">{7 - adminClickCount} clics restantes...</p>
          )}
        </div>
      </div>

      {/* Admin Code Prompt Modal */}
      {showAdminPrompt && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-sm w-full border border-green-500/30 shadow-2xl">
            <div className="text-center mb-4">
              <ShieldCheck className="w-10 h-10 text-green-400 mx-auto mb-2" />
              <h3 className="text-lg font-bold text-white">Modo Administrador</h3>
              <p className="text-gray-400 text-xs mt-1">Introduce el codigo de acceso de administrador</p>
            </div>
            <input
              type="password"
              value={adminCodeInput}
              onChange={e => setAdminCodeInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdminCodeSubmit()}
              placeholder="Codigo de admin..."
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={() => { setShowAdminPrompt(false); setAdminCodeInput(''); }}
                className="flex-1 py-2 bg-gray-800 text-gray-400 rounded-lg text-sm font-medium hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={handleAdminCodeSubmit}
                className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-500"
              >
                Acceder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Font Size Preview Banner */}
      <div className="mb-4 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-semibold text-gray-800">Tipografia actual:</span>
          <span className="bg-indigo-500 text-white px-2 py-0.5 rounded-full text-xs font-bold capitalize">{fontSize} ({fontSizeLabel[fontSize] || '14px'})</span>
        </div>
        <div className="flex gap-1">
          {['pequeno', 'mediano', 'grande', 'enorme'].map(size => (
            <button
              key={size}
              onClick={() => { handleSelect(230, size); }}
              className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                fontSize === size ? 'bg-indigo-500 text-white' : 'bg-white text-gray-600 hover:bg-indigo-100 border border-gray-200'
              }`}
            >
              {size === 'pequeno' ? 'Aa' : size === 'mediano' ? 'Aa' : size === 'grande' ? 'Aa' : 'Aa'}
              <span className="ml-1 text-[10px]">({fontSizeLabel[size]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Buscador de Ajustes */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar ajustes, opciones o logros..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm shadow-sm transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        )}
      </div>

      {/* Tabs */}
      {!isSearching && (
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'settings' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Settings className="w-4 h-4" />
          Ajustes ({totalSettingsCount})
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'profile' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <UserCircle className="w-4 h-4" />
          Perfil ({profileSettings.length})
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'achievements' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Trophy className="w-4 h-4" />
          Logros ({totalAchievements})
        </button>
      </div>
      )}

      {isSearching ? (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Resultados de Busqueda ({searchResultsSettings.length + searchResultsProfile.length})</h2>

          {searchResultsSettings.length > 0 && (
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><Settings className="w-4 h-4" /> Ajustes del Sistema ({searchResultsSettings.length})</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {searchResultsSettings.map(setting => (
                  <div key={`s-${setting.id}`} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-semibold text-gray-900 text-sm">{setting.name}</h3>
                          <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded uppercase">{setting.category}</span>
                        </div>
                        <p className="text-xs text-gray-500">{setting.description}</p>
                      </div>
                      <div className="flex-shrink-0">
                        {setting.type === 'toggle' && (
                          <button onClick={() => handleToggle(setting.id)}
                            className={`relative w-11 h-6 rounded-full transition-colors ${
                              settingsState[setting.id] ? 'bg-orange-500' : 'bg-gray-300'
                            }`}>
                            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                              settingsState[setting.id] ? 'translate-x-5' : 'translate-x-0.5'
                            }`}></div>
                          </button>
                        )}
                        {setting.type === 'select' && (
                          <select value={settingsState[setting.id] as string} onChange={e => handleSelect(setting.id, e.target.value)}
                            className="px-2 py-1 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
                            {setting.id === 230 && ['pequeno', 'mediano', 'grande', 'enorme'].map(v => <option key={v} value={v}>{v}</option>)}
                            {setting.name.includes('Medida') && ['metrico', 'imperial'].map(v => <option key={v}>{v}</option>)}
                            {setting.name.includes('Idioma') && ['espanol', 'english', 'francais'].map(v => <option key={v}>{v}</option>)}
                            {setting.name === 'Color de Acento' && ['naranja', 'rojo', 'azul', 'verde', 'morado'].map(v => <option key={v}>{v}</option>)}
                          </select>
                        )}
                        {setting.type === 'slider' && (
                          <div className="flex items-center gap-2">
                            <input type="range" min={1} max={12} value={settingsState[setting.id] as number}
                              onChange={e => handleSlider(setting.id, parseInt(e.target.value))}
                              className="w-20 accent-orange-500" />
                            <span className="text-xs font-semibold w-6 text-center text-gray-700">{settingsState[setting.id]}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchResultsProfile.length > 0 && (
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 bg-purple-50 border-b border-purple-100">
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><UserCircle className="w-4 h-4 text-purple-600" /> Ajustes de Perfil ({searchResultsProfile.length})</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {searchResultsProfile.map(setting => (
                  <div key={`p-${setting.id}`} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-semibold text-gray-900 text-sm">{setting.name}</h3>
                          <span className="text-[10px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded uppercase">{setting.group}</span>
                        </div>
                        <p className="text-xs text-gray-500">{setting.description}</p>
                      </div>
                      <div className="flex-shrink-0">
                        {setting.type === 'text' && (
                          <input type="text" value={String(profileState[setting.id])}
                            onChange={e => handleProfileText(setting.id, e.target.value)}
                            className="px-2 py-1 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-purple-400 w-40" />
                        )}
                        {setting.type === 'toggle' && (
                          <button onClick={() => handleProfileToggle(setting.id)}
                            className={`relative w-11 h-6 rounded-full transition-colors ${profileState[setting.id] ? 'bg-purple-500' : 'bg-gray-300'}`}>
                            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${profileState[setting.id] ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchResultsSettings.length === 0 && searchResultsProfile.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-900">No se encontraron resultados</h3>
              <p className="text-gray-500 text-sm mt-1">Prueba con otros terminos de busqueda.</p>
            </div>
          )}
        </div>
      ) : activeTab === 'settings' ? (
        <div className="flex flex-col md:flex-row gap-4">
          {/* Sidebar */}
          <div className="md:w-48 flex-shrink-0">
            <div className="bg-white border border-gray-100 rounded-xl p-1.5 shadow-sm sticky top-20">
              {visibleCategories.map(cat => {
                const Icon = iconMap[cat.icon] || Settings;
                const count = settings.filter(s => s.category === cat.key && (!s.devOnly || devMode)).length;
                const isBeta = cat.key === 'beta';
                const isAdmin = cat.key === 'administrador';
                const isChromecast = cat.key === 'chromecast';
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      activeCategory === cat.key
                        ? isAdmin ? 'bg-green-100 text-green-700' : isBeta ? 'bg-blue-100 text-blue-700' : isChromecast ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                        : isAdmin ? 'text-green-600 hover:bg-green-50' : isChromecast ? 'text-emerald-600 hover:bg-emerald-50' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span className="truncate">{cat.label}</span>
                    <span className={`ml-auto text-[10px] rounded-full px-1.5 py-0.5 ${
                      isAdmin ? 'bg-green-200 text-green-700' : isBeta ? 'bg-blue-200 text-blue-700' : isChromecast ? 'bg-emerald-200 text-emerald-700' : 'bg-gray-200 text-gray-600'
                    }`}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1">
            {activeCategory === 'administrador' && analytics && (
              <div className="mb-6 bg-gray-900 border border-green-500/30 rounded-xl p-4 shadow-sm">
                <h3 className="text-green-400 font-bold mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Panel de Analiticas en Tiempo Real
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                    <p className="text-gray-400 text-[10px] uppercase font-bold mb-1">Usuarios Registrados</p>
                    <p className="text-2xl font-black text-blue-400">{analytics.users.length}</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                    <p className="text-gray-400 text-[10px] uppercase font-bold mb-1">Intentos de Compra</p>
                    <p className="text-2xl font-black text-green-400">{analytics.purchaseIntents.reduce((acc, curr) => acc + curr.clicks, 0)}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-green-500/70 text-xs font-bold">MONITOR DE USUARIOS</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg overflow-hidden text-xs">
                      <table className="w-full">
                        <thead className="bg-gray-700 text-gray-400 text-[10px]">
                          <tr>
                            <th className="px-2 py-1 text-left">Usuario</th>
                            <th className="px-2 py-1 text-left">Email</th>
                            <th className="px-2 py-1 text-left">Metodo</th>
                            <th className="px-2 py-1 text-left">Plan</th>
                            <th className="px-2 py-1 text-right">Fecha</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700 text-gray-300">
                          {analytics.users.map(u => (
                            <tr key={u.id} className="hover:bg-gray-700/50">
                              <td className="px-2 py-1.5 font-bold text-blue-300">{u.name}</td>
                              <td className="px-2 py-1.5 opacity-70">{u.email}</td>
                              <td className="px-2 py-1.5">{u.method}</td>
                              <td className="px-2 py-1.5">
                                <span className={`px-1.5 py-0.5 rounded-full text-[9px] ${
                                  u.plan === 'masterchef' ? 'bg-purple-500/20 text-purple-400' :
                                  u.plan === 'ultra' ? 'bg-orange-500/20 text-orange-400' :
                                  'bg-gray-600 text-gray-300'
                                }`}>{u.plan}</span>
                              </td>
                              <td className="px-2 py-1.5 text-right opacity-50">{u.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <p className="text-green-500/70 text-xs font-bold mb-2">INTENTOS DE COMPRA (Quienes desean pagar)</p>
                    <div className="bg-gray-800 rounded-lg overflow-hidden text-xs">
                      <table className="w-full">
                        <thead className="bg-gray-700 text-gray-400 text-[10px]">
                          <tr>
                            <th className="px-2 py-1 text-left">Plan Demandado</th>
                            <th className="px-2 py-1 text-center">Clics</th>
                            <th className="px-2 py-1 text-right">Ultimo Clic</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700 text-gray-300">
                          {analytics.purchaseIntents.map(p => (
                            <tr key={p.plan} className="hover:bg-gray-700/50">
                              <td className="px-2 py-1.5 uppercase font-bold">{p.plan}</td>
                              <td className="px-2 py-1.5 text-center text-green-400 font-bold">{p.clicks}</td>
                              <td className="px-2 py-1.5 text-right opacity-50">{p.lastClick}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className={`border rounded-xl shadow-sm overflow-hidden ${
              activeCategory === 'administrador' ? 'bg-gray-900 border-green-500/30' : 'bg-white border-gray-100'
            }`}>
              <div className={`p-4 border-b flex items-center justify-between ${
                activeCategory === 'administrador' ? 'bg-gray-800 border-green-500/30' : 'bg-gray-50 border-gray-100'
              }`}>
                <div>
                  <h2 className={`text-base font-bold ${activeCategory === 'administrador' ? 'text-green-400' : 'text-gray-900'}`}>
                    {activeCategory === 'administrador' && '🛡️ '}{visibleCategories.find(c => c.key === activeCategory)?.label}
                    {activeCategory === 'beta' && <span className="ml-2 text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-full animate-pulse">BETA</span>}
                    {activeCategory === 'administrador' && <span className="ml-2 text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full">ADMIN</span>}
                  </h2>
                  <p className={`text-xs ${activeCategory === 'administrador' ? 'text-green-500/60' : 'text-gray-500'}`}>{filteredSettings.length} ajustes</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleReset} className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <RotateCcw className="w-3 h-3" /> Restablecer
                  </button>
                  <button onClick={handleSave} className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    saved ? 'bg-green-500 text-white' : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}>
                    {saved ? <CheckCircle className="w-3 h-3" /> : <Save className="w-3 h-3" />}
                    {saved ? 'Guardado' : 'Guardar'}
                  </button>
                </div>
              </div>

              <div className={`divide-y ${activeCategory === 'administrador' ? 'divide-green-500/20' : 'divide-gray-100'}`}>
                {filteredSettings.map(setting => (
                  <div key={setting.id} className={`p-4 transition-colors ${
                    activeCategory === 'administrador' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className={`font-semibold text-sm mb-0.5 ${activeCategory === 'administrador' ? 'text-green-300' : 'text-gray-900'}`}>
                          {setting.name}
                          {setting.id === 230 && <span className="ml-2 text-[10px] bg-indigo-500 text-white px-1.5 py-0.5 rounded-full">NUEVO</span>}
                        </h3>
                        <p className={`text-xs ${activeCategory === 'administrador' ? 'text-green-500/60' : 'text-gray-500'}`}>{setting.description}</p>
                      </div>
                      <div className="flex-shrink-0">
                        {setting.type === 'toggle' && (
                          <button onClick={() => handleToggle(setting.id)}
                            className={`relative w-11 h-6 rounded-full transition-colors ${
                              settingsState[setting.id]
                                ? activeCategory === 'administrador' ? 'bg-green-500' : 'bg-orange-500'
                                : 'bg-gray-300'
                            }`}>
                            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                              settingsState[setting.id] ? 'translate-x-5' : 'translate-x-0.5'
                            }`}></div>
                          </button>
                        )}
                        {setting.type === 'select' && (
                          <select value={settingsState[setting.id] as string} onChange={e => handleSelect(setting.id, e.target.value)}
                            className={`px-2 py-1 border rounded-lg text-xs focus:outline-none focus:ring-2 ${
                              activeCategory === 'administrador'
                                ? 'bg-gray-800 border-green-500/30 text-green-300 focus:ring-green-500'
                                : 'border-gray-200 bg-white focus:ring-orange-400'
                            }`}>
                            {setting.id === 230 && ['pequeno', 'mediano', 'grande', 'enorme'].map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)} ({fontSizeLabel[v]})</option>)}
                            {setting.name.includes('Medida') && ['metrico', 'imperial'].map(v => <option key={v}>{v}</option>)}
                            {setting.name.includes('Idioma') && ['espanol', 'english', 'francais'].map(v => <option key={v}>{v}</option>)}
                            {setting.name === 'Color de Acento' && ['naranja', 'rojo', 'azul', 'verde', 'morado'].map(v => <option key={v}>{v}</option>)}
                            {setting.name.includes('Densidad') && ['compacto', 'normal', 'espaciado'].map(v => <option key={v}>{v}</option>)}
                            {setting.id === 23 && ['pequeno', 'mediano', 'grande'].map(v => <option key={v}>{v}</option>)}
                            {setting.name.includes('Daltonico') && ['desactivado', 'protanopia', 'deuteranopia'].map(v => <option key={v}>{v}</option>)}
                            {setting.name === 'Nivel de Cocina' && ['principiante', 'intermedio', 'avanzado', 'experto'].map(v => <option key={v}>{v}</option>)}
                            {setting.name.includes('Dieteticas') && ['ninguna', 'vegetariano', 'vegano', 'sin gluten'].map(v => <option key={v}>{v}</option>)}
                            {setting.name.includes('Calidad') && ['baja', 'media', 'alta', 'ultra'].map(v => <option key={v}>{v}</option>)}
                            {setting.name.includes('Endpoint') && ['produccion', 'staging', 'desarrollo', 'local'].map(v => <option key={v}>{v}</option>)}
                          </select>
                        )}
                        {setting.type === 'slider' && (
                          <div className="flex items-center gap-2">
                            <input type="range" min={1} max={12} value={settingsState[setting.id] as number}
                              onChange={e => handleSlider(setting.id, parseInt(e.target.value))}
                              className={`w-20 ${activeCategory === 'administrador' ? 'accent-green-500' : 'accent-orange-500'}`} />
                            <span className={`text-xs font-semibold w-6 text-center ${activeCategory === 'administrador' ? 'text-green-300' : 'text-gray-700'}`}>
                              {settingsState[setting.id]}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary table */}
            <div className="mt-6 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
                <h2 className="text-base font-bold text-gray-900">
                  Todos los Ajustes ({totalSettingsCount})
                  {devMode && <span className="ml-2 text-xs text-green-600">+{adminSettingsCount} admin</span>}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[10px] font-bold">{betaSettingsCount} Beta</span>
                  <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">v2.0.0</span>
                </div>
              </div>
              <div className="overflow-x-auto max-h-64 overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="sticky top-0 bg-gray-50">
                    <tr className="text-left">
                      <th className="px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase">#</th>
                      <th className="px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase">Ajuste</th>
                      <th className="px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase">Categoria</th>
                      <th className="px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {settings.filter(s => !s.devOnly || devMode).map((setting, i) => (
                      <tr key={setting.id} className={`hover:bg-gray-50 ${setting.category === 'administrador' ? 'bg-green-50/50' : setting.category === 'beta' ? 'bg-blue-50/50' : ''}`}>
                        <td className="px-3 py-2 text-gray-500">{i + 1}</td>
                        <td className="px-3 py-2 font-medium text-gray-900">{setting.name}</td>
                        <td className="px-3 py-2">
                          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium capitalize ${
                            setting.category === 'administrador' ? 'bg-green-100 text-green-700' :
                            setting.category === 'beta' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                          }`}>{setting.category}</span>
                        </td>
                        <td className="px-3 py-2">
                          {setting.type === 'toggle' ? (
                            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${settingsState[setting.id] ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                              {settingsState[setting.id] ? 'Activo' : 'Inactivo'}
                            </span>
                          ) : (
                            <span className="text-gray-700 font-medium">{String(settingsState[setting.id])}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      ) : activeTab === 'profile' ? (
        /* Profile Tab */
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-48 flex-shrink-0">
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm sticky top-20 overflow-hidden">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-4 text-center">
                <div className="relative w-20 h-20 mx-auto rounded-full border-4 border-white/40 shadow-xl overflow-hidden flex items-center justify-center bg-white/20 text-3xl">
                  {profileState[31] && String(profileState[31]).length > 0 ? (
                    <img src={String(profileState[31])} alt="Avatar" className="absolute inset-0 w-full h-full object-cover z-10" onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }} onLoad={(e) => { (e.target as HTMLImageElement).style.opacity = '1'; }} />
                  ) : null}
                  <span className="absolute z-0">{devMode ? '🛡️' : '👨‍🍳'}</span>
                </div>
                <p className="text-white font-bold text-sm mt-2">{String(profileState[1]) || 'Chef Anonimo'}</p>
                <p className="text-purple-200 text-[10px]">{String(profileState[7]) || 'Intermedio'}</p>
                {devMode && <span className="inline-block mt-1 bg-green-500 text-white px-2 py-0.5 rounded-full text-[9px] font-bold">ADMIN</span>}
              </div>
              <div className="p-1.5">
                {profileSettingGroups.map(group => {
                  const Icon = iconMap[group.icon] || User;
                  const count = profileSettings.filter(s => s.group === group.key).length;
                  return (
                    <button
                      key={group.key}
                      onClick={() => setActiveProfileGroup(group.key)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        activeProfileGroup === group.key ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span className="truncate">{group.label}</span>
                      <span className="ml-auto text-[10px] bg-gray-200 text-gray-600 rounded-full px-1.5 py-0.5">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 bg-purple-50 border-b border-purple-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-gray-900">
                    {profileSettingGroups.find(g => g.key === activeProfileGroup)?.label}
                  </h2>
                  <p className="text-xs text-gray-500">{filteredProfileSettings.length} ajustes de perfil</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleReset} className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <RotateCcw className="w-3 h-3" /> Restablecer
                  </button>
                  <button onClick={handleSave} className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    saved ? 'bg-green-500 text-white' : 'bg-purple-500 text-white hover:bg-purple-600'
                  }`}>
                    {saved ? <CheckCircle className="w-3 h-3" /> : <Save className="w-3 h-3" />}
                    {saved ? 'Guardado' : 'Guardar'}
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {filteredProfileSettings.map(setting => (
                  <div key={setting.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{setting.name}</h3>
                        <p className="text-xs text-gray-500">{setting.description}</p>
                      </div>
                      <div className="flex-shrink-0">
                        {setting.type === 'text' && (
                          <input type="text" value={String(profileState[setting.id])}
                            onChange={e => handleProfileText(setting.id, e.target.value)}
                            className="px-2 py-1 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-purple-400 w-40"
                            placeholder={setting.name} />
                        )}
                        {setting.type === 'toggle' && (
                          <button onClick={() => handleProfileToggle(setting.id)}
                            className={`relative w-11 h-6 rounded-full transition-colors ${profileState[setting.id] ? 'bg-purple-500' : 'bg-gray-300'}`}>
                            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${profileState[setting.id] ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                          </button>
                        )}
                        {setting.type === 'select' && (
                          <select value={String(profileState[setting.id])} onChange={e => handleProfileText(setting.id, e.target.value)}
                            className="px-2 py-1 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white">
                            {setting.name.includes('Pais') && ['Espana', 'Mexico', 'Argentina', 'Colombia', 'Chile', 'Peru', 'Otro'].map(v => <option key={v}>{v}</option>)}
                            {setting.name.includes('Experiencia') && ['Principiante', 'Intermedio', 'Avanzado', 'Experto', 'Chef Profesional'].map(v => <option key={v}>{v}</option>)}
                            {setting.name.includes('Cocina Favorita') && ['Espanola', 'Italiana', 'Mexicana', 'Japonesa', 'Francesa', 'Mediterranea', 'Internacional'].map(v => <option key={v}>{v}</option>)}
                            {setting.name.includes('Dificultad') && ['Facil', 'Media', 'Dificil', 'Cualquiera'].map(v => <option key={v}>{v}</option>)}
                            {setting.name.includes('Tipo de Cocina') && ['Tradicional', 'Thermomix', 'Ambos'].map(v => <option key={v}>{v}</option>)}
                            {setting.name.includes('Dieta Principal') && ['Omnivoro', 'Vegetariano', 'Vegano', 'Pescetariano', 'Flexitariano', 'Cetogenico', 'Paleo'].map(v => <option key={v}>{v}</option>)}
                          </select>
                        )}
                        {setting.type === 'slider' && (
                          <div className="flex items-center gap-2">
                            <input type="range"
                              min={setting.name.includes('Calorico') ? 1000 : 1}
                              max={setting.name.includes('Calorico') ? 4000 : setting.name.includes('Tiempo') ? 180 : 12}
                              step={setting.name.includes('Calorico') ? 100 : 1}
                              value={profileState[setting.id] as number}
                              onChange={e => handleProfileSlider(setting.id, parseInt(e.target.value))}
                              className="w-20 accent-purple-500" />
                            <span className="text-xs font-semibold text-gray-700 w-12 text-center">
                              {setting.name.includes('Calorico') ? `${profileState[setting.id]} kcal` :
                               setting.name.includes('Tiempo') ? `${profileState[setting.id]} min` :
                               profileState[setting.id]}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 bg-purple-50 border-b border-purple-100">
                <h2 className="text-base font-bold text-gray-900">Resumen del Perfil ({profileSettings.length} ajustes)</h2>
              </div>
              <div className="overflow-x-auto max-h-64 overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="sticky top-0 bg-gray-50">
                    <tr className="text-left">
                      <th className="px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase">#</th>
                      <th className="px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase">Ajuste</th>
                      <th className="px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase">Grupo</th>
                      <th className="px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase">Valor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {profileSettings.map((s, i) => (
                      <tr key={s.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2 text-gray-500">{i + 1}</td>
                        <td className="px-3 py-2 font-medium text-gray-900">{s.name}</td>
                        <td className="px-3 py-2">
                          <span className="px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded-full text-[10px] font-medium capitalize">
                            {s.group.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          {s.type === 'toggle' ? (
                            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${profileState[s.id] ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                              {profileState[s.id] ? 'Si' : 'No'}
                            </span>
                          ) : (
                            <span className="text-gray-700">{String(profileState[s.id]) || '-'}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      ) : (
        /* Achievements Tab */
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-4 text-white">
              <Trophy className="w-6 h-6 mb-2" />
              <p className="text-2xl font-black">{unlockedCount}/{totalAchievements}</p>
              <p className="text-xs opacity-80">Desbloqueados</p>
            </div>
            <div className="bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl p-4 text-white">
              <Star className="w-6 h-6 mb-2" />
              <p className="text-2xl font-black">{totalPoints}</p>
              <p className="text-xs opacity-80">Puntos Totales</p>
            </div>
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl p-4 text-white">
              <CheckCircle className="w-6 h-6 mb-2" />
              <p className="text-2xl font-black">{Math.round((unlockedCount / totalAchievements) * 100)}%</p>
              <p className="text-xs opacity-80">Completado</p>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl p-4 text-white">
              <Lock className="w-6 h-6 mb-2" />
              <p className="text-2xl font-black">{totalAchievements - unlockedCount}</p>
              <p className="text-xs opacity-80">Por Desbloquear</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {achievementCategories.map(cat => (
              <button key={cat.key} onClick={() => setAchievementCategory(cat.key)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  achievementCategory === cat.key ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className="ml-1 bg-white/20 px-1 rounded text-[10px]">{achievements.filter(a => a.category === cat.key).length}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredAchievements.map(achievement => (
              <div key={achievement.id} className={`relative rounded-xl p-4 border transition-all ${
                achievement.unlocked ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' : 'bg-gray-50 border-gray-200 opacity-60'
              }`}>
                {!achievement.unlocked && <div className="absolute top-2 right-2"><Lock className="w-3 h-3 text-gray-400" /></div>}
                <div className="flex items-start gap-3">
                  <div className={`text-2xl ${achievement.unlocked ? '' : 'grayscale'}`}>{achievement.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-sm ${achievement.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>{achievement.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{achievement.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        achievement.unlocked ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-600'
                      }`}>+{achievement.points} pts</span>
                      {achievement.unlocked && <span className="text-[10px] text-green-600 font-medium">Desbloqueado</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="text-base font-bold text-gray-900">Todos los Logros ({totalAchievements})</h2>
            </div>
            <div className="overflow-x-auto max-h-64 overflow-y-auto">
              <table className="w-full text-xs">
                <thead className="sticky top-0 bg-gray-50">
                  <tr className="text-left">
                    <th className="px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase">#</th>
                    <th className="px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase">Icono</th>
                    <th className="px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase">Logro</th>
                    <th className="px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase">Puntos</th>
                    <th className="px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {achievements.map((a, i) => (
                    <tr key={a.id} className={`hover:bg-gray-50 ${!a.unlocked ? 'opacity-50' : ''}`}>
                      <td className="px-3 py-2 text-gray-500">{i + 1}</td>
                      <td className="px-3 py-2">{a.icon}</td>
                      <td className="px-3 py-2 font-medium text-gray-900">{a.name}</td>
                      <td className="px-3 py-2 font-bold text-orange-600">+{a.points}</td>
                      <td className="px-3 py-2">
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
                          a.unlocked ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>{a.unlocked ? 'Desbloqueado' : 'Bloqueado'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Contacto y Soporte */}
      <div className="mt-8 mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6 text-center shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-2">¿Tienes dudas o sugerencias?</h3>
        <p className="text-gray-600 text-sm mb-4 max-w-md mx-auto">
          Nos encanta escuchar a nuestra comunidad. Si tienes alguna duda, has encontrado un error o quieres sugerir una nueva funcionalidad, escríbenos directamente.
        </p>
        <a
          href="mailto:iiiribasu2010@gmail.com"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-md"
        >
          <Send className="w-4 h-4" /> iiiribasu2010@gmail.com
        </a>
      </div>

      {/* Compartir App */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6 text-center shadow-sm">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
          <Heart className="w-6 h-6 text-orange-500" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">¿Te gusta CocinaViva?</h3>
        <p className="text-gray-600 text-sm mb-4 max-w-md mx-auto">
          Comparte la aplicación con tus amigos y familiares para que ellos también disfruten de las mejores recetas.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent('¡Descubre CocinaViva! La mejor app de recetas https://cocinaviva.com')}`)} className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#20bd5a] transition-all shadow-sm">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </button>
          <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://cocinaviva.com')}`)} className="flex items-center gap-2 bg-[#1877F2] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#166fe5] transition-all shadow-sm">
            <Facebook className="w-4 h-4" /> Facebook
          </button>
          <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('¡Descubre CocinaViva! La mejor app de recetas')}&url=${encodeURIComponent('https://cocinaviva.com')}`)} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 transition-all shadow-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            X (Twitter)
          </button>
          <button onClick={() => window.open('https://github.com/cocinaviva')} className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-black transition-all shadow-sm">
            <Github className="w-4 h-4" /> GitHub
          </button>
          <button onClick={() => window.open('https://google.com')} className="flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#EA4335" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg> Google
          </button>
          <button onClick={() => window.open('https://instagram.com')} className="flex items-center gap-2 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-sm">
            <Instagram className="w-4 h-4" /> Instagram
          </button>
          <button onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://cocinaviva.com')}`)} className="flex items-center gap-2 bg-[#0077b5] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#006097] transition-all shadow-sm">
            <Linkedin className="w-4 h-4" /> LinkedIn
          </button>
          <button onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent('https://cocinaviva.com')}&text=${encodeURIComponent('¡Descubre CocinaViva!')}`)} className="flex items-center gap-2 bg-[#0088cc] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#0070a8] transition-all shadow-sm">
            <Send className="w-4 h-4" /> Telegram
          </button>
          <button className="flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm" onClick={() => { navigator.clipboard.writeText('https://cocinaviva.com'); alert('Enlace copiado al portapapeles'); }}>
            <span className="text-lg">🔗</span> Copiar Enlace
          </button>
        </div>
      </div>

      {/* Version info footer */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
          <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">v2.1.0</span>
          <span className="text-xs text-gray-600">
            CocinaViva — {totalSettingsCount} Ajustes + {profileSettings.length} Perfil + {totalAchievements} Logros
          </span>
        </div>
        {devMode && (
          <p className="text-[10px] text-green-500 mt-2 font-mono">
            ADMIN MODE ACTIVE | {adminSettingsCount} admin settings | Build: 2024.12.stable
          </p>
        )}
      </div>
    </div>
  );
}
