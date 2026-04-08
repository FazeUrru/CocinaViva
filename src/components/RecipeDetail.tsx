import { X, Clock, Users, Star, Flame, ChefHat, ArrowLeft, Printer, Share2, Plus, Minus, Mail, Link, Camera, CheckCircle2, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import type { Recipe, Review } from '../data/recipes';

interface RecipeDetailProps {
  recipe: Recipe;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        if (rating >= star) {
          return <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />;
        }
        if (rating >= star - 0.5) {
          return (
            <div key={star} className="relative w-4 h-4">
              <Star className="w-4 h-4 text-gray-300 absolute" />
              <div className="overflow-hidden w-[50%] absolute h-full">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              </div>
            </div>
          );
        }
        return <Star key={star} className="w-4 h-4 text-gray-300" />;
      })}
    </div>
  );
};

export function RecipeDetail({ recipe, onClose, isFavorite, onToggleFavorite }: RecipeDetailProps) {
  const [servings, setServings] = useState(recipe.servings);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Calcular ingredientes dinamicamente
  const calculateIngredient = (ingredient: string) => {
    // Si no empieza con numero (por ejemplo: "sal y pimienta al gusto")
    if (!/^\d/.test(ingredient)) return ingredient;

    // Buscar numero decimal, entero o fraccion al principio
    const match = ingredient.match(/^(\d+(?:[.,]\d+)?|\d+\/\d+)\s*(.*)/);
    if (!match) return ingredient;

    let num = parseFloat(match[1].replace(',', '.'));
    if (isNaN(num)) {
      if (match[1].includes('/')) {
        const [numStr, denStr] = match[1].split('/');
        num = parseInt(numStr) / parseInt(denStr);
      } else {
        return ingredient;
      }
    }

    const ratio = servings / recipe.servings;
    const newValue = num * ratio;

    // Formatear: si es entero sin decimales, sino 1 decimal maximo
    const formattedValue = Number.isInteger(newValue) ? newValue.toString() : newValue.toFixed(1);

    return `${formattedValue} ${match[2]}`;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = (network: string) => {
    const text = `¡Mira esta increible receta de ${recipe.name} en CocinaViva!`;
    const url = window.location.href;

    switch (network) {
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`);
        break;
      case 'gmail':
        window.open(`mailto:?subject=${encodeURIComponent(recipe.name)}&body=${encodeURIComponent(text + '\n\n' + url)}`);
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

  // Asignar dificultad al azar a cada paso basado en el ID y el index
  const getStepDifficulty = (stepIndex: number) => {
    const difficulties = ['Facil', 'Media', 'Dificil'];
    const random = (recipe.id + stepIndex) % 3;
    return difficulties[random];
  };

  const stepDifficultyColors: Record<string, string> = {
    'Facil': 'bg-green-100 text-green-700 border-green-200',
    'Media': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Dificil': 'bg-red-100 text-red-700 border-red-200'
  };

  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col overflow-y-auto w-full h-full m-0 p-0 print:bg-white print:overflow-visible animate-in">
      <div className="w-full min-h-screen flex flex-col pb-20 print:pb-0 max-w-5xl mx-auto">

        {/* Header Image */}
        <div className="relative h-64 md:h-80 w-full flex-shrink-0 print:hidden"
          style={{ background: `linear-gradient(135deg, #EA580C, #DC2626)` }}>
          <img src={recipe.image} alt={recipe.name} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />

          <div className="absolute inset-0 flex items-center justify-center text-white p-4">
            <div className="text-center bg-black/40 p-6 rounded-3xl backdrop-blur-sm max-w-3xl">
              <ChefHat className="w-12 h-12 mx-auto mb-2 opacity-90 text-orange-300" />
              <h2 className="text-3xl md:text-5xl font-black mb-2">{recipe.name}</h2>
              <p className="text-orange-100 font-medium">{recipe.category} • {recipe.region}</p>
            </div>
          </div>

          <div className="absolute top-4 left-4 flex gap-2">
            <button onClick={onClose} className="bg-white/90 backdrop-blur-sm rounded-full p-2.5 hover:bg-white transition-colors shadow-lg">
              <ArrowLeft className="w-6 h-6 text-gray-800" />
            </button>
          </div>

          <div className="absolute top-4 right-4 flex gap-2">
            <button onClick={() => onToggleFavorite(recipe.id)} className={`rounded-full p-2.5 transition-colors shadow-lg ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>

            <div className="relative">
              <button onClick={() => setShowShareOptions(!showShareOptions)} className="bg-white/90 backdrop-blur-sm rounded-full p-2.5 hover:bg-white transition-colors shadow-lg text-gray-800">
                <Share2 className="w-6 h-6" />
              </button>
              {showShareOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in">
                  <button onClick={() => handleShare('whatsapp')} className="w-full px-4 py-2 text-left text-sm hover:bg-green-50 text-green-700 flex items-center gap-2">📱 WhatsApp</button>
                  <button onClick={() => handleShare('gmail')} className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"><Mail className="w-4 h-4" /> Gmail</button>
                  <button onClick={() => handleShare('facebook')} className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 text-blue-700 flex items-center gap-2">👤 Facebook</button>
                  <button onClick={() => handleShare('twitter')} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-gray-800 flex items-center gap-2">🐦 X (Twitter)</button>
                  <button onClick={() => handleShare('telegram')} className="w-full px-4 py-2 text-left text-sm hover:bg-sky-50 text-sky-600 flex items-center gap-2">✈️ Telegram</button>
                  <button onClick={() => handleShare('linkedin')} className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 text-blue-800 flex items-center gap-2">💼 LinkedIn</button>
                  <div className="h-px bg-gray-100 my-1"></div>
                  <button onClick={() => handleShare('copy')} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-gray-700 flex items-center gap-2"><Link className="w-4 h-4" /> Copiar Enlace</button>
                </div>
              )}
            </div>

            <button onClick={handlePrint} className="bg-white/90 backdrop-blur-sm rounded-full p-2.5 hover:bg-white transition-colors shadow-lg text-gray-800 hidden md:block">
              <Printer className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute bottom-4 left-4 flex gap-2">
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-md ${recipe.type === 'thermomix' ? 'bg-blue-500 text-white' : 'bg-orange-500 text-white'}`}>
              {recipe.type === 'thermomix' ? '🤖 Modo Thermomix' : '👨‍🍳 Receta Tradicional'}
            </span>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="p-6 md:p-10 bg-white flex-1">

          {/* Info Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-gray-50 rounded-2xl p-6 border border-gray-100 print:grid-cols-4 print:border-none print:bg-transparent">
            <div className="text-center">
              <Clock className="w-6 h-6 mx-auto text-orange-500 mb-2" />
              <p className="text-lg font-black text-gray-900">{recipe.time}</p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Tiempo</p>
            </div>

            {/* Control de Comensales Dinamico */}
            <div className="text-center">
              <Users className="w-6 h-6 mx-auto text-orange-500 mb-2" />
              <div className="flex items-center justify-center gap-2 mb-0.5 print:hidden">
                <button
                  onClick={() => setServings(Math.max(1, servings - 1))}
                  className="p-1 bg-white border border-gray-200 rounded-full hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <p className="text-lg font-black text-gray-900 w-6">{servings}</p>
                <button
                  onClick={() => setServings(servings + 1)}
                  className="p-1 bg-white border border-gray-200 rounded-full hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <p className="text-lg font-black text-gray-900 hidden print:block">{servings}</p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Comensales</p>
            </div>

            <div className="text-center">
              <Star className="w-6 h-6 mx-auto text-yellow-400 fill-yellow-400 mb-2" />
              <p className="text-lg font-black text-gray-900">{recipe.rating}/5</p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Valoracion</p>
            </div>
            <div className="text-center">
              <Flame className="w-6 h-6 mx-auto text-red-500 mb-2" />
              <p className="text-lg font-black text-gray-900">{recipe.calories}</p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Calorias (Kcal)</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-10 print:block">
            {/* Ingredients Col */}
            <div className="md:w-1/3 print:w-full print:mb-8">
              <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">🧂</span>
                Ingredientes
              </h3>

              {servings !== recipe.servings && (
                <div className="mb-4 bg-orange-50 border border-orange-200 text-orange-800 px-3 py-2 rounded-lg text-xs font-medium print:hidden">
                  Cantidades ajustadas para {servings} comensales.
                </div>
              )}

              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors cursor-pointer group">
                    <input type="checkbox" className="mt-1 w-5 h-5 text-orange-500 rounded border-gray-300 focus:ring-orange-500 cursor-pointer print:hidden" />
                    <span className="text-base text-gray-700 group-hover:text-gray-900 font-medium">
                      {calculateIngredient(ingredient)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps Col */}
            <div className="md:w-2/3 print:w-full">
              <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">📝</span>
                Preparacion
              </h3>

              <div className="space-y-6">
                {recipe.steps.map((step, i) => {
                  const stepDiff = getStepDifficulty(i);
                  const colorClass = stepDifficultyColors[stepDiff];

                  return (
                    <div key={i} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 print:border-b print:rounded-none print:bg-transparent">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-orange-500 text-white rounded-xl flex items-center justify-center text-lg font-black shadow-md shadow-orange-200">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-gray-900 uppercase tracking-wide text-xs">Paso {i + 1}</h4>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${colorClass}`}>
                              Nivel: {stepDiff}
                            </span>
                          </div>

                          <p className="text-base text-gray-700 leading-relaxed font-medium mb-3">{step}</p>

                          {recipe.type === 'thermomix' && (
                            <div className="bg-white border border-blue-100 rounded-lg p-3 inline-flex items-center gap-4 text-sm font-semibold shadow-sm">
                              <span className="flex items-center gap-1.5 text-blue-700">
                                ⚙️ Vel. {((recipe.id + i) % 10) + 1}
                              </span>
                              <span className="w-px h-4 bg-blue-200"></span>
                              <span className="flex items-center gap-1.5 text-red-600">
                                🌡️ {((recipe.id + i) % 90) + 37}°C
                              </span>
                              <span className="w-px h-4 bg-blue-200"></span>
                              <span className="flex items-center gap-1.5 text-green-700">
                                ⏳ {((recipe.id + i) % 15) + 1} min
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Reviews & Cooksnaps Section (Comunidad) */}
          <div className="mt-12 pt-10 border-t border-gray-100 print:hidden">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div>
                <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                  <span className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                    <MessageSquare className="w-5 h-5" />
                  </span>
                  Reseñas de la Comunidad
                </h3>
                <p className="text-sm text-gray-500 mt-2 font-medium">
                  {recipe.reviewsNum} valoraciones con un promedio de {recipe.rating} sobre 5 estrellas
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-orange-50 border border-orange-100 px-4 py-2 rounded-xl flex flex-col items-center">
                  <span className="text-xl font-black text-orange-600">{recipe.rating}</span>
                  <StarRating rating={recipe.rating} />
                </div>
                {recipe.cooksnaps > 0 && (
                  <div className="bg-blue-50 border border-blue-100 px-4 py-2 rounded-xl flex flex-col items-center">
                    <span className="text-xl font-black text-blue-600">{recipe.cooksnaps}</span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-blue-700 uppercase tracking-wide">
                      <Camera className="w-3 h-3" /> Cooksnaps
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recipe.reviews.map((review: Review, i) => (
                <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:bg-gray-100 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold uppercase overflow-hidden">
                        {review.userName.slice(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">{review.userName}</span>
                          {review.verified && (
                            <span className="flex items-center gap-0.5 text-[9px] font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full" title="Usuario verificó haber preparado esta receta">
                              <CheckCircle2 className="w-3 h-3" /> Verificado
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-sm text-gray-700 font-medium leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer print hidden */}
        <div className="p-6 border-t border-gray-100 bg-white print:hidden">
          <button onClick={onClose} className="w-full md:w-auto mx-auto px-8 py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
            <X className="w-5 h-5" /> Volver a las Recetas
          </button>
        </div>
      </div>
    </div>
  );
}
