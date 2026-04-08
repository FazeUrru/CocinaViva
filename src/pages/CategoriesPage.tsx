import { allRecipes, allCategories } from '../data/recipes';
import type { Recipe } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CategoriesPageProps {
  onSelectRecipe: (recipe: Recipe) => void;
  favorites: Set<number>;
  onToggleFavorite: (id: number) => void;
}

const emojis = ['🥗', '🍲', '🥬', '🍚', '🍝', '🥩', '🐟', '🦐', '🥦', '🫘', '🍖', '🍰', '🧁', '🍞', '🫙', '🍹', '🍢', '🥞', '🥗', '🎉'];

export function CategoriesPage({ onSelectRecipe, favorites, onToggleFavorite }: CategoriesPageProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-3 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Categorías</h1>
        <p className="text-gray-500 text-xs mt-1">20 categorías con más de 1.000 recetas</p>
      </div>

      <div className="space-y-2">
        {allCategories.map((category, i) => {
          const recipesInCategory = allRecipes.filter(r => r.category === category);
          const isExpanded = expandedCategory === category;
          const displayRecipes = isExpanded ? recipesInCategory.slice(0, 8) : recipesInCategory.slice(0, 4);
          const thermomixCount = recipesInCategory.filter(r => r.type === 'thermomix').length;
          const traditionalCount = recipesInCategory.filter(r => r.type === 'tradicional').length;

          return (
            <div key={category} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => setExpandedCategory(isExpanded ? null : category)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{emojis[i]}</span>
                  <div className="text-left">
                    <h2 className="text-sm font-bold text-gray-900">{category}</h2>
                    <p className="text-[10px] text-gray-500">{recipesInCategory.length} recetas</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex gap-1">
                    <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded-full text-[10px] font-medium">
                      👨‍🍳 {traditionalCount}
                    </span>
                    <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[10px] font-medium">
                      🤖 {thermomixCount}
                    </span>
                  </div>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-100 pt-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {displayRecipes.map(recipe => (
                      <RecipeCard key={recipe.id} recipe={recipe} onClick={onSelectRecipe} isFavorite={favorites.has(recipe.id)} onToggleFavorite={onToggleFavorite} />
                    ))}
                  </div>
                  {recipesInCategory.length > 8 && (
                    <p className="text-center text-[10px] text-gray-500 mt-3">
                      Mostrando 8 de {recipesInCategory.length} recetas. Usa la página de Recetas para ver todas.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
