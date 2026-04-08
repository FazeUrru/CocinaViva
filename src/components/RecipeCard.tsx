import { useState } from 'react';
import { Clock, Users, Star, ChefHat } from 'lucide-react';
import type { Recipe } from '../data/recipes';
import { getRecipeImage } from '../data/recipeImages';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export function RecipeCard({ recipe, onClick, isFavorite, onToggleFavorite }: RecipeCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const resolvedImage = recipe.image || getRecipeImage(recipe.name, recipe.category);

  const difficultyColor = {
    'Fácil': 'bg-green-100 text-green-700',
    'Media': 'bg-yellow-100 text-yellow-700',
    'Difícil': 'bg-red-100 text-red-700',
  }[recipe.difficulty];

  const gradientColors = [
    'from-orange-400 to-red-500',
    'from-blue-400 to-indigo-500',
    'from-green-400 to-emerald-500',
    'from-purple-400 to-pink-500',
    'from-yellow-400 to-orange-500',
    'from-teal-400 to-cyan-500',
  ];

  const gradientIndex = recipe.id % gradientColors.length;

  return (
    <div
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 hover:border-orange-200 hover:-translate-y-0.5"
      onClick={() => onClick(recipe)}
      onKeyDown={(e) => e.key === 'Enter' && onClick(recipe)}
      tabIndex={0}
      role="button"
    >
      <div className="relative h-32 overflow-hidden">
        {/* Imagen real o fallback */}
        {!imageError ? (
          <>
            <img
              src={resolvedImage}
              alt={recipe.name}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onError={() => setImageError(true)}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
            {!imageLoaded && (
              <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors[gradientIndex]} flex items-center justify-center`}>
                <ChefHat className="w-8 h-8 text-white/80 animate-pulse" />
              </div>
            )}
          </>
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradientColors[gradientIndex]} flex items-center justify-center`}>
            <div className="text-center px-3">
              <ChefHat className="w-7 h-7 mx-auto mb-1 text-white/80" />
              <span className="text-white text-[10px] font-medium line-clamp-2 opacity-90">{recipe.name}</span>
            </div>
          </div>
        )}

        {/* Badges superiores */}
        <div className="absolute top-2 left-2 flex gap-1">
          <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-semibold ${difficultyColor}`}>
            {recipe.difficulty}
          </span>
          <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-semibold ${recipe.type === 'thermomix' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
            {recipe.type === 'thermomix' ? '🤖 TM' : '👨‍🍳'}
          </span>
        </div>

        {/* Favorito */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(recipe.id); }}
          className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center transition-all ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-500 hover:bg-red-50 hover:text-red-500'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      </div>

      <div className="p-3">
        <h3 className="font-bold text-gray-800 text-xs mb-1 line-clamp-1 group-hover:text-orange-600 transition-colors">{recipe.name}</h3>
        <p className="text-[10px] text-gray-500 mb-2">{recipe.category} • {recipe.region}</p>
        <div className="flex items-center justify-between text-[10px] text-gray-500 mb-2">
          <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{recipe.time}</span>
          <span className="flex items-center gap-0.5"><Users className="w-3 h-3" />{recipe.servings}</span>
          <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />{recipe.rating} ({recipe.reviewsNum})</span>
        </div>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2 text-[10px] font-medium text-gray-500">
            {recipe.cooksnaps > 0 && (
               <span className="flex items-center gap-1">
                 <svg className="w-3 h-3 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                 {recipe.cooksnaps} Cooksnaps
               </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1 justify-end">
            {recipe.isDetailed && (
              <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-full text-[9px] font-bold">Detallada</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
