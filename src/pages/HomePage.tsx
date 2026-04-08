import { Star, Clock, TrendingUp, Sparkles, ArrowRight, BookOpen, Zap, Heart, Trophy } from 'lucide-react';
import { allRecipes, allCategories, recipeStats } from '../data/recipes';
import type { Recipe } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';
import { Logo } from '../components/Logo';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  favorites: Set<number>;
  onToggleFavorite: (id: number) => void;
  activePlan?: string;
}

export function HomePage({ onNavigate, onSelectRecipe, favorites, onToggleFavorite }: HomePageProps) {
  const featuredRecipes = allRecipes.filter(r => r.rating >= 4.5).slice(0, 8);
  const thermomixRecipes = allRecipes.filter(r => r.type === 'thermomix').slice(0, 4);
  const traditionalRecipes = allRecipes.filter(r => r.type === 'tradicional').slice(0, 4);
  const quickRecipes = allRecipes.filter(r => parseInt(r.time) <= 30).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex justify-center mb-4">
              <Logo size={56} />
            </div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium mb-4">
              <Sparkles className="w-3 h-3" />
              <span>v2.1.0 ESTABLE — ¡+700 nuevas recetas!</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black mb-4 leading-tight">
              Descubre el placer de <span className="text-yellow-300">cocinar</span>
            </h1>
            <p className="text-sm md:text-base text-white/90 mb-6 max-w-xl mx-auto">
              Más de {recipeStats.total} recetas tradicionales y {recipeStats.thermomix} para Thermomix.
              Tu compañero perfecto — código abierto — con 21+ funciones, 85+ ajustes, 30 de perfil y 380 logros.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => onNavigate('recipes')}
                className="px-5 py-2.5 bg-white text-orange-600 rounded-xl font-bold text-sm hover:bg-yellow-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
              >
                Explorar Recetas
                <ArrowRight className="w-4 h-4 inline ml-1" />
              </button>
              <button
                onClick={() => onNavigate('features')}
                className="px-5 py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold text-sm hover:bg-white/30 transition-all border border-white/30"
              >
                Ver Funciones
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-10 max-w-3xl mx-auto">
            {[
              { icon: BookOpen, value: `${recipeStats.total}`, label: 'Recetas' },
              { icon: Zap, value: `${recipeStats.thermomix}`, label: 'Thermomix' },
              { icon: Heart, value: '85+', label: 'Ajustes' },
              { icon: Trophy, value: '380', label: 'Logros' },
              { icon: Star, value: '21', label: 'Funciones' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
                <stat.icon className="w-4 h-4 mx-auto mb-1 text-yellow-300" />
                <p className="text-lg font-black">{stat.value}</p>
                <p className="text-[10px] text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Quick Access */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Categorías</h2>
            <p className="text-gray-500 text-xs">20 categorías de recetas</p>
          </div>
          <button onClick={() => onNavigate('categories')} className="text-orange-600 hover:text-orange-700 font-semibold text-xs flex items-center gap-1">
            Ver todas <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-2">
          {allCategories.map((cat, i) => {
            const emojis = ['🥗', '🍲', '🥬', '🍚', '🍝', '🥩', '🐟', '🦐', '🥦', '🫘', '🍖', '🍰', '🧁', '🍞', '🫙', '🍹', '🍢', '🥞', '🥗', '🎉'];
            return (
              <button
                key={cat}
                onClick={() => onNavigate('recipes')}
                className="bg-white border border-gray-100 rounded-xl p-2 text-center hover:border-orange-300 hover:shadow-md transition-all group"
              >
                <span className="text-lg block mb-0.5">{emojis[i]}</span>
                <span className="text-[9px] font-medium text-gray-700 group-hover:text-orange-600 line-clamp-1">{cat}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                Recetas Destacadas
              </h2>
              <p className="text-gray-500 text-xs">Las mejor valoradas</p>
            </div>
            <button onClick={() => onNavigate('recipes')} className="text-orange-600 hover:text-orange-700 font-semibold text-xs flex items-center gap-1">
              Ver todas <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {featuredRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} onClick={onSelectRecipe} isFavorite={favorites.has(recipe.id)} onToggleFavorite={onToggleFavorite} />
            ))}
          </div>
        </div>
      </section>

      {/* Thermomix Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <span className="bg-blue-400/30 text-xs px-2 py-0.5 rounded-full font-medium">🤖 Modo Thermomix</span>
              <h2 className="text-xl font-bold mt-2 mb-2">{recipeStats.thermomix} Recetas para Thermomix</h2>
              <p className="text-blue-100 text-sm mb-4">Instrucciones detalladas con velocidad, temperatura y tiempo exactos. Incluye 50 postres exclusivos.</p>
              <button onClick={() => onNavigate('recipes')} className="px-4 py-2 bg-white text-blue-600 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors">
                Ver recetas Thermomix
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 flex-shrink-0">
              {thermomixRecipes.map(r => (
                <div key={r.id} onClick={() => onSelectRecipe(r)}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-2 cursor-pointer hover:bg-white/20 transition-colors border border-white/20 w-32">
                  <p className="text-xs font-semibold line-clamp-2">{r.name}</p>
                  <p className="text-[10px] text-blue-200 mt-1">{r.time} • {r.difficulty}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Recipes */}
      <section className="bg-orange-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" />
                Recetas Rápidas
              </h2>
              <p className="text-gray-500 text-xs">Listas en menos de 30 minutos</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {quickRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} onClick={onSelectRecipe} isFavorite={favorites.has(recipe.id)} onToggleFavorite={onToggleFavorite} />
            ))}
          </div>
        </div>
      </section>

      {/* Traditional Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              Recetas Tradicionales
            </h2>
            <p className="text-gray-500 text-xs">La cocina de toda la vida</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {traditionalRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} onClick={onSelectRecipe} isFavorite={favorites.has(recipe.id)} onToggleFavorite={onToggleFavorite} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold mb-3">¿Listo para empezar a cocinar?</h2>
          <p className="text-gray-400 text-sm mb-6">{recipeStats.total} recetas | {recipeStats.thermomix} Thermomix | 21+ funciones | 85+ ajustes | 30 perfil | 380 logros</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={() => onNavigate('recipes')} className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 rounded-xl font-bold text-sm transition-colors">
              Explorar Recetas
            </button>
            <button onClick={() => onNavigate('settings')} className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-colors border border-white/20">
              Ver Logros
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
