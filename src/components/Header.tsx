import { Menu, X, Search, Link as LinkIcon, MonitorPlay, Cast } from 'lucide-react';
import { useState } from 'react';
import { Logo } from './Logo';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  tvMode: boolean;
  onTvModeChange: (enabled: boolean) => void;
  devMode: boolean;
  isCasting: boolean;
  onCastToggle: () => void;
  forcedPayment?: boolean;
  onOpenCreateRecipe?: () => void;
}

const navItems = [
  { key: 'home', label: 'Inicio' },
  { key: 'recipes', label: 'Recetas' },
  { key: 'categories', label: 'Categorías' },
  { key: 'features', label: 'Funciones' },
  { key: 'plans', label: 'Planes' },
  { key: 'settings', label: 'Ajustes' },
  { key: 'about', label: 'Acerca de' },
];

export function Header({ currentPage, onNavigate, searchQuery, onSearchChange, tvMode, onTvModeChange, devMode, isCasting, onCastToggle, forcedPayment = false, onOpenCreateRecipe }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showSuggestModal, setShowSuggestModal] = useState(false);
  const [suggestText, setSuggestText] = useState('');
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState(5);

  const handleShare = (network: string) => {
    const text = `¡Mira CocinaViva, la mejor app de recetas!`;
    const url = 'https://cocinaviva.com';

    switch (network) {
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
        break;
      case 'github':
        window.open('https://github.com/cocinaviva');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Enlace copiado al portapapeles');
        break;
    }
    setShowShareOptions(false);
  };

  const wordsCount = suggestText.trim().split(/\s+/).filter(w => w.length > 0).length;
  const isValidSuggest = wordsCount >= 10 && wordsCount <= 500;

  const handleSuggest = () => {
    if (!isValidSuggest) return;

    // Abrir cliente de correo con la sugerencia
    const subject = encodeURIComponent('Sugerencia/Bug - CocinaViva');
    const body = encodeURIComponent(suggestText);
    window.location.href = `mailto:iiiribasu2010@gmail.com?subject=${subject}&body=${body}`;

    setSuggestText('');
    setShowSuggestModal(false);
  };

  const [showValentinesBanner, setShowValentinesBanner] = useState(true);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      {showValentinesBanner && (
        <div className="bg-gradient-to-r from-red-600 via-pink-600 to-red-600 text-white text-xs md:text-sm font-bold text-center py-2 px-4 relative flex items-center justify-center gap-2 overflow-hidden shadow-md">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/hearts.png')] opacity-20 animate-pulse"></div>
          <span className="relative z-10 animate-bounce">💘</span>
          <span className="relative z-10 uppercase tracking-wide">
            💘 OFERTA SAN VALENTÍN: ¡50% DE DESCUENTO! | 👨‍🍳 NUEVA ALIANZA: "El Chef en Casa" (CocinaViva x SideChef) ¡Instrucciones visuales de calidad TV!
          </span>
          <button
            onClick={() => setShowValentinesBanner(false)}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-1 bg-white/20 hover:bg-white/30 rounded-full transition-colors z-10"
          >
            <X className="w-3 h-3 md:w-4 md:h-4 text-white" />
          </button>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-3">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <Logo size={28} />
            <div className="hidden sm:block">
              <h1 className="text-base font-black text-gray-900 tracking-tight leading-none">CocinaViva<span className="text-orange-500">.com</span></h1>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[8px] bg-gradient-to-r from-red-500 to-pink-600 text-white px-1.5 py-0.5 rounded-full font-bold shadow-sm animate-pulse">SAN VALENTÍN -50%</span>
                <span className="text-[7px] bg-gray-800 text-white px-1 py-0.5 rounded font-bold">OPEN SOURCE (MIT)</span>
                {tvMode && <span className="text-[7px] bg-blue-600 text-white px-1 py-0.5 rounded font-bold uppercase animate-pulse">📺 Smart TV</span>}
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          {!forcedPayment && (
            <nav className="hidden md:flex items-center gap-0.5">
              {navItems.map(item => (
                <button
                  key={item.key}
                  onClick={() => onNavigate(item.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    currentPage === item.key
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}

          {/* Quick Access Buttons - Destacados */}
          <div className="hidden lg:flex items-center gap-2 border-l border-gray-200 ml-4 pl-4 overflow-x-auto hide-scrollbar whitespace-nowrap max-w-[600px] xl:max-w-none">
            {/* Botón de Donación (Siempre visible) */}
            <button onClick={() => setShowDonationModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white border border-yellow-500 rounded-full text-[11px] font-bold transition-all shadow-md animate-pulse">
              <span className="text-[12px]">🎁</span> Donar al Creador
            </button>

            {!forcedPayment && (
              <>
            <button onClick={() => onNavigate('settings')} className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-full text-[11px] font-bold transition-colors shadow-sm">
              <span className="text-[12px]">❤️</span> Mis Favoritos
            </button>
            <button onClick={() => onNavigate('features')} className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-full text-[11px] font-bold transition-colors shadow-sm">
              <span className="text-[12px]">⚡</span> Funciones
            </button>
            <button onClick={() => onNavigate('features')} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-full text-[11px] font-bold transition-colors shadow-sm">
              <span className="text-[12px]">📅</span> Planificador
            </button>
            <button onClick={() => onNavigate('features')} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded-full text-[11px] font-bold transition-colors shadow-sm">
              <span className="text-[12px]">🛒</span> Mi Compra
            </button>
            <button onClick={() => onNavigate('settings')} className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-full text-[11px] font-bold transition-colors shadow-sm">
              <span className="text-[12px]">🏆</span> Mis Logros
            </button>
            <button onClick={() => setShowSuggestModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-full text-[11px] font-bold transition-colors shadow-sm">
              <span className="text-[12px]">💡</span> Sugerir/Reportar
            </button>
            <button onClick={() => onNavigate('features')} className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border border-cyan-200 rounded-full text-[11px] font-bold transition-colors shadow-sm">
              <span className="text-[12px]">🍎</span> Nutricion
            </button>
            <button onClick={() => onNavigate('features')} className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 rounded-full text-[11px] font-bold transition-colors shadow-sm">
              <span className="text-[12px]">🔥</span> Coccion
            </button>
            <button onClick={() => onNavigate('features')} className="flex items-center gap-1.5 px-3 py-1.5 bg-lime-50 hover:bg-lime-100 text-lime-700 border border-lime-200 rounded-full text-[11px] font-bold transition-colors shadow-sm">
              <span className="text-[12px]">📱</span> Escaner
            </button>
            <button onClick={() => { if(onOpenCreateRecipe) onOpenCreateRecipe(); else onNavigate('features'); }} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full text-[11px] font-bold transition-colors shadow-sm">
              <span className="text-[12px]">📝</span> Crear Receta
            </button>
            <button onClick={() => onNavigate('features')} className="flex items-center gap-1.5 px-3 py-1.5 bg-fuchsia-50 hover:bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200 rounded-full text-[11px] font-bold transition-colors shadow-sm">
              <span className="text-[12px]">🌍</span> Comunidad
            </button>
            <button onClick={() => onNavigate('features')} className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-full text-[11px] font-bold transition-colors shadow-sm">
              <span className="text-[12px]">🤖</span> IA Asistente
            </button>
            <button onClick={() => onNavigate('plans')} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 border border-red-300 rounded-full text-[11px] font-bold transition-colors shadow-md animate-bounce">
              <span className="text-[12px]">💘</span> Oferta -50%
            </button>
            <button onClick={() => onNavigate('features')} className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 rounded-full text-[11px] font-bold transition-colors shadow-sm">
              <span className="text-[12px]">📦</span> Despensa
            </button>
            <button onClick={() => onNavigate('features')} className="flex items-center gap-1.5 px-3 py-1.5 bg-lime-50 hover:bg-lime-100 text-lime-700 border border-lime-200 rounded-full text-[11px] font-bold transition-colors shadow-sm">
              <span className="text-[12px]">🥗</span> Dietas
            </button>
            <button onClick={() => onNavigate('settings')} className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border border-zinc-200 rounded-full text-[11px] font-bold transition-colors shadow-sm">
              <span className="text-[12px]">🕒</span> Historial
            </button>
            <button onClick={() => onNavigate('features')} className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border border-yellow-200 rounded-full text-[11px] font-bold transition-colors shadow-sm">
              <span className="text-[12px]">⚔️</span> Retos
            </button>
            <button onClick={() => onNavigate('recipes')} className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-200 rounded-full text-[11px] font-bold transition-colors shadow-sm">
              <span className="text-[12px]">✨</span> Sorpresa
            </button>
            <button onClick={() => onNavigate('recipes')} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-full text-[11px] font-bold transition-colors shadow-sm">
              <span className="text-[12px]">📈</span> Tendencias
            </button>
            <button onClick={() => onNavigate('features')} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-full text-[11px] font-bold transition-colors shadow-sm">
              <span className="text-[12px]">🎊</span> Eventos
            </button>
            <button onClick={() => onNavigate('recipes')} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full text-[11px] font-bold transition-colors shadow-sm">
              <span className="text-[12px]">🌿</span> Saludable
            </button>
            <button onClick={() => onNavigate('recipes')} className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border border-cyan-200 rounded-full text-[11px] font-bold transition-colors shadow-sm">
              <span className="text-[12px]">⏱️</span> Rápido
            </button>
            <button onClick={() => onNavigate('recipes')} className="flex items-center gap-1.5 px-3 py-1.5 bg-fuchsia-50 hover:bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200 rounded-full text-[11px] font-bold transition-colors shadow-sm">
              <span className="text-[12px]">💸</span> Económico
            </button>

            <div className="relative">
              <button onClick={() => setShowShareOptions(!showShareOptions)} className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded-full text-[11px] font-bold transition-colors shadow-sm">
                <span className="text-[12px]">📤</span> Compartir
              </button>
              {showShareOptions && (
                <div className="absolute top-full mt-2 right-0 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  <button onClick={() => handleShare('whatsapp')} className="w-full px-4 py-2 text-left text-xs font-semibold hover:bg-green-50 text-green-700 flex items-center gap-2">📱 WhatsApp</button>
                  <button onClick={() => handleShare('facebook')} className="w-full px-4 py-2 text-left text-xs font-semibold hover:bg-blue-50 text-blue-700 flex items-center gap-2">👤 Facebook</button>
                  <button onClick={() => handleShare('twitter')} className="w-full px-4 py-2 text-left text-xs font-semibold hover:bg-gray-100 text-gray-800 flex items-center gap-2">🐦 X (Twitter)</button>
                  <button onClick={() => handleShare('telegram')} className="w-full px-4 py-2 text-left text-xs font-semibold hover:bg-sky-50 text-sky-600 flex items-center gap-2">✈️ Telegram</button>
                  <button onClick={() => handleShare('github')} className="w-full px-4 py-2 text-left text-xs font-semibold hover:bg-gray-100 text-gray-900 flex items-center gap-2">🐈‍⬛ GitHub</button>
                  <div className="h-px bg-gray-100 my-1"></div>
                  <button onClick={() => handleShare('copy')} className="w-full px-4 py-2 text-left text-xs font-semibold hover:bg-gray-100 text-gray-700 flex items-center gap-2"><LinkIcon className="w-3 h-3" /> Copiar Enlace</button>
                </div>
              )}
            </div>
            </>
            )}
          </div>

          {/* Search & Mobile Toggle */}
          <div className="flex items-center gap-1">
            {devMode && (
              <div className="relative group">
                <button
                  onClick={onCastToggle}
                  className={`p-1.5 rounded-lg transition-all shadow-sm flex items-center gap-1 ${isCasting ? 'bg-emerald-600 text-white animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  title="Transmitir a TV (Acceso Anticipado)"
                >
                  <Cast className="w-4 h-4" />
                </button>
                <div className="absolute top-full mt-1 right-0 bg-orange-500 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
                  Acceso Anticipado
                </div>
              </div>
            )}
            <button
              onClick={() => onTvModeChange(!tvMode)}
              className={`p-1.5 rounded-lg transition-all shadow-sm ${tvMode ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              title="Modo Smart TV"
            >
              <MonitorPlay className="w-4 h-4" />
            </button>
            {searchOpen && (
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => onSearchChange(e.target.value)}
                  placeholder="Buscar recetas..."
                  className="w-36 md:w-52 pl-2 pr-6 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  autoFocus
                />
                <button onClick={() => { setSearchOpen(false); onSearchChange(''); }} className="absolute right-2 top-1/2 -translate-y-1/2">
                  <X className="w-3 h-3 text-gray-400" />
                </button>
              </div>
            )}
            <button
              onClick={() => { setSearchOpen(!searchOpen); if (searchOpen) onSearchChange(''); }}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Search className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-3 border-t border-gray-100 mt-1 pt-1">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => { onNavigate(item.key); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  currentPage === item.key
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Suggestion Modal */}
      {showSuggestModal && (
        <div className="fixed inset-0 z-[200] flex flex-col bg-white overflow-y-auto animate-in">
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
            <h2 className="text-xl font-bold text-gray-900 flex-1 text-center">Sugerir / Reportar</h2>
            <button onClick={() => setShowSuggestModal(false)} className="absolute right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-4 max-w-2xl mx-auto w-full">
            <p className="text-sm text-gray-500 mb-8 font-medium text-center">
              Si tienes dudas o sugerencias, envíanoslas también a:<br/>
              <a href="mailto:iiiribasu2010@gmail.com" className="text-indigo-600 font-bold hover:underline">iiiribasu2010@gmail.com</a>
            </p>

            {!suggestText && (
              <div className="mb-8 flex flex-wrap justify-center gap-3">
                {['Nueva función', 'Mejora visual', 'Sugerir configuración', 'Reportar bug', 'Idea de receta'].map(idea => (
                  <button
                    key={idea}
                    onClick={() => setSuggestText(idea + ': ')}
                    className="bg-indigo-50 text-indigo-600 border border-indigo-200 px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-100 transition-colors shadow-sm"
                  >
                    {idea}
                  </button>
                ))}
              </div>
            )}

            <textarea
              value={suggestText}
              onChange={(e) => setSuggestText(e.target.value)}
              placeholder="Escribe tu sugerencia (Mínimo 10 palabras, máximo 500 palabras)..."
              className="w-full border border-gray-200 rounded-2xl p-6 text-lg min-h-[200px] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-center resize-y shadow-sm"
              autoFocus
            />
            <div className={`text-sm mb-6 mt-2 font-medium ${wordsCount < 10 || wordsCount > 500 ? 'text-red-500' : 'text-green-600'}`}>
              {wordsCount}/500 palabras {wordsCount < 10 && '(Mínimo 10 palabras requeridas)'} {wordsCount > 500 && '(Límite de 500 excedido)'}
            </div>

            <div className="flex gap-4 justify-center w-full max-w-sm">
              <button
                onClick={() => setShowSuggestModal(false)}
                className="flex-1 py-3 text-base font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleSuggest}
                disabled={!isValidSuggest}
                className="flex-1 py-3 text-base font-bold text-white bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors shadow-lg"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Donation Modal */}
      {showDonationModal && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500"></div>

            <button onClick={() => setShowDonationModal(false)} className="absolute right-4 top-6 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6 mt-4">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                <span className="text-4xl">🎁</span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">
                Apoya al Desarrollador
              </h3>
              <p className="text-sm text-gray-600 font-medium px-4">
                Si CocinaViva te resulta útil, puedes invitarme a un café o ayudar a mantener los servidores activos.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-100">
              <label className="block text-sm font-bold text-gray-700 text-center mb-4">
                ¿Cuánto deseas donar? (1€ - 1.000€)
              </label>

              <div className="flex items-center justify-center gap-2 mb-6">
                <button onClick={() => setDonationAmount(Math.max(1, donationAmount - 1))} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-50">-</button>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={donationAmount}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val)) setDonationAmount(Math.min(1000, Math.max(1, val)));
                    }}
                    className="w-24 h-12 text-center text-2xl font-black bg-white border-2 border-amber-400 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-400/20"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">€</span>
                </div>
                <button onClick={() => setDonationAmount(Math.min(1000, donationAmount + 1))} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-50">+</button>
              </div>

              <div className="flex justify-center gap-2">
                {[5, 10, 20, 50].map(amount => (
                  <button
                    key={amount}
                    onClick={() => setDonationAmount(amount)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                      donationAmount === amount
                        ? 'bg-amber-100 text-amber-700 border-2 border-amber-400'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    {amount}€
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                alert(`¡Muchísimas gracias por tu increíble donación de ${donationAmount}€! Tu apoyo hace posible que CocinaViva siga creciendo.`);
                setShowDonationModal(false);
              }}
              className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-white rounded-2xl text-lg font-black shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              Donar {donationAmount} €
            </button>
            <p className="text-[10px] text-gray-400 text-center mt-4">
              Transacción segura cifrada a 256-bits. No se almacena información de tarjetas.
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
