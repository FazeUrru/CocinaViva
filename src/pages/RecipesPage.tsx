import { useState, useMemo } from 'react';
import { Search, Filter, X, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { allRecipes, allCategories, allRegions, allTags } from '../data/recipes';
import type { Recipe } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';

import { Lock, Crown, Camera, ListPlus } from 'lucide-react';

interface RecipesPageProps {
  activePlan: string;
  devMode?: boolean;
  onSelectRecipe: (recipe: Recipe) => void;
  favorites: Set<number>;
  onToggleFavorite: (id: number) => void;
  searchQuery: string;
}

const ITEMS_PER_PAGE = 24;

export function RecipesPage({ activePlan, devMode = false, onSelectRecipe, favorites, onToggleFavorite, searchQuery }: RecipesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Advanced Filters
  const [filterPopular, setFilterPopular] = useState(false);
  const [filterCooksnaps, setFilterCooksnaps] = useState(false);
  const [filterDetailed, setFilterDetailed] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const hasProAccess = activePlan !== 'free' || devMode;

  const filteredRecipes = useMemo(() => {
    const query = (localSearch || searchQuery).toLowerCase();
    let filtered = allRecipes.filter(r => {
      if (query && !r.name.toLowerCase().includes(query) && !r.category.toLowerCase().includes(query) && !r.region?.toLowerCase().includes(query)) return false;
      if (selectedCategory && r.category !== selectedCategory) return false;
      if (selectedType && r.type !== selectedType) return false;
      if (selectedDifficulty && r.difficulty !== selectedDifficulty) return false;
      if (selectedRegion && r.region !== selectedRegion) return false;
      if (selectedTag && !r.tags.includes(selectedTag)) return false;
      if (showFavoritesOnly && !favorites.has(r.id)) return false;

      if (hasProAccess) {
        if (filterPopular && (r.rating < 4.8 || r.reviewsNum < 100)) return false;
        if (filterCooksnaps && r.cooksnaps < 50) return false;
        if (filterDetailed && !r.isDetailed) return false;
      }

      return true;
    });

    switch (sortBy) {
      case 'name': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      case 'time': filtered.sort((a, b) => parseInt(a.time) - parseInt(b.time)); break;
      case 'calories': filtered.sort((a, b) => a.calories - b.calories); break;
      case 'difficulty':
        filtered.sort((a, b) => {
          const order = { 'Fácil': 1, 'Media': 2, 'Difícil': 3 };
          return order[a.difficulty] - order[b.difficulty];
        });
        break;
    }
    return filtered;
  }, [localSearch, searchQuery, selectedCategory, selectedType, selectedDifficulty, selectedRegion, selectedTag, sortBy, showFavoritesOnly, favorites]);

  const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE);
  const paginatedRecipes = filteredRecipes.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedType('');
    setSelectedDifficulty('');
    setSelectedRegion('');
    setSelectedTag('');
    setLocalSearch('');
    setShowFavoritesOnly(false);
    setFilterPopular(false);
    setFilterCooksnaps(false);
    setFilterDetailed(false);
    setCurrentPage(1);
  };

  const hasActiveFilters = selectedCategory || selectedType || selectedDifficulty || selectedRegion || selectedTag || showFavoritesOnly || localSearch || filterPopular || filterCooksnaps || filterDetailed;

  // Estadísticas de dificultad
  const difficultyStats = {
    'Fácil': allRecipes.filter(r => r.difficulty === 'Fácil').length,
    'Media': allRecipes.filter(r => r.difficulty === 'Media').length,
    'Difícil': allRecipes.filter(r => r.difficulty === 'Difícil').length,
  };

  return (
    <div className="max-w-7xl mx-auto px-3 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Todas las Recetas</h1>
        <p className="text-gray-500 mt-1 text-sm">{filteredRecipes.length} recetas encontradas de {allRecipes.length} totales</p>
      </div>

      <div className="flex gap-4">
        {/* Sidebar con filtros */}
        <aside className={`${sidebarOpen ? 'w-56' : 'w-12'} flex-shrink-0 transition-all duration-300`}>
          <div className="sticky top-20 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
            {/* Toggle sidebar */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full p-2 bg-gray-50 border-b border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <Filter className="w-4 h-4 text-gray-600" />
              {sidebarOpen && <span className="ml-2 text-xs font-semibold text-gray-600">Filtros</span>}
            </button>

            {sidebarOpen && (
              <div className="p-3 space-y-4">
                {/* Filtro de Dificultad */}
                <div>
                  <h3 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Nivel de Dificultad</h3>
                  <div className="space-y-1">
                    {(['Fácil', 'Media', 'Difícil'] as const).map((difficulty) => (
                      <button
                        key={difficulty}
                        onClick={() => {
                          setSelectedDifficulty(selectedDifficulty === difficulty ? '' : difficulty);
                          setCurrentPage(1);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          selectedDifficulty === difficulty
                            ? difficulty === 'Fácil' ? 'bg-green-100 text-green-700 border-green-300'
                              : difficulty === 'Media' ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                              : 'bg-red-100 text-red-700 border-red-300'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        } border`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{difficulty === 'Fácil' ? '😊' : difficulty === 'Media' ? '💪' : '🔥'}</span>
                          {difficulty}
                        </span>
                        <span className="text-[10px] bg-white/50 px-1.5 py-0.5 rounded-full">
                          {difficultyStats[difficulty]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tipo de Receta */}
                <div>
                  <h3 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Tipo</h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => { setSelectedType(selectedType === 'tradicional' ? '' : 'tradicional'); setCurrentPage(1); }}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                        selectedType === 'tradicional' ? 'bg-orange-100 text-orange-700 border-orange-300' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-100'
                      }`}
                    >
                      👨‍🍳 Tradicional
                    </button>
                    <button
                      onClick={() => { setSelectedType(selectedType === 'thermomix' ? '' : 'thermomix'); setCurrentPage(1); }}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                        selectedType === 'thermomix' ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-100'
                      }`}
                    >
                      🤖 Thermomix
                    </button>
                  </div>
                </div>

                {/* Categoría */}
                <div>
                  <h3 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Categoría</h3>
                  <select
                    value={selectedCategory}
                    onChange={e => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                    className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="">Todas</option>
                    {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Región */}
                <div>
                  <h3 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Región</h3>
                  <select
                    value={selectedRegion}
                    onChange={e => { setSelectedRegion(e.target.value); setCurrentPage(1); }}
                    className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="">Todas</option>
                    {allRegions.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                {/* Etiqueta */}
                <div>
                  <h3 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Etiqueta</h3>
                  <select
                    value={selectedTag}
                    onChange={e => { setSelectedTag(e.target.value); setCurrentPage(1); }}
                    className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="">Todas</option>
                    {allTags.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                {/* Filtros Pro (Ultra/MasterChef) */}
                <div className="pt-2 border-t border-gray-100">
                  <h3 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide flex items-center gap-1">
                    <Crown className="w-3 h-3 text-orange-500" /> Filtros Pro
                  </h3>
                  <div className="space-y-1 relative">
                    {!hasProAccess && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/70 backdrop-blur-[1px] rounded-lg">
                        <Lock className="w-4 h-4 text-orange-500 mb-1" />
                        <span className="text-[9px] font-bold text-gray-800">Solo planes Premium</span>
                      </div>
                    )}
                    <button
                      onClick={() => { if (hasProAccess) { setFilterPopular(!filterPopular); setCurrentPage(1); } }}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                        filterPopular ? 'bg-orange-100 text-orange-700 border-orange-300' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-100'
                      }`}
                    >
                      ⭐ Más Populares
                    </button>
                    <button
                      onClick={() => { if (hasProAccess) { setFilterCooksnaps(!filterCooksnaps); setCurrentPage(1); } }}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                        filterCooksnaps ? 'bg-orange-100 text-orange-700 border-orange-300' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-100'
                      }`}
                    >
                      <Camera className="w-3 h-3 text-orange-500" /> Con Cooksnaps
                    </button>
                    <button
                      onClick={() => { if (hasProAccess) { setFilterDetailed(!filterDetailed); setCurrentPage(1); } }}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                        filterDetailed ? 'bg-orange-100 text-orange-700 border-orange-300' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-100'
                      }`}
                    >
                      <ListPlus className="w-3 h-3 text-orange-500" /> Muy Detalladas
                    </button>
                  </div>
                </div>

                {/* Limpiar filtros */}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full py-2 text-xs font-medium text-orange-600 hover:text-orange-700 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 min-w-0">
          {/* Search & Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={localSearch}
                onChange={e => { setLocalSearch(e.target.value); setCurrentPage(1); }}
                placeholder="Buscar por nombre, categoría o región..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs"
              />
              {localSearch && (
                <button onClick={() => setLocalSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-3 h-3 text-gray-400" />
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setShowFavoritesOnly(!showFavoritesOnly); setCurrentPage(1); }}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl font-medium text-xs transition-all ${
                  showFavoritesOnly ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ❤️ Favoritos
              </button>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="appearance-none px-3 py-2 pr-8 bg-gray-100 rounded-xl font-medium text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="name">Nombre</option>
                  <option value="rating">Valoración</option>
                  <option value="time">Tiempo</option>
                  <option value="calories">Calorías</option>
                  <option value="difficulty">Dificultad</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active filters tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-1 mb-4">
              {selectedDifficulty && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1 ${
                  selectedDifficulty === 'Fácil' ? 'bg-green-100 text-green-700' :
                  selectedDifficulty === 'Media' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {selectedDifficulty} <button onClick={() => setSelectedDifficulty('')}><X className="w-2 h-2" /></button>
                </span>
              )}
              {selectedCategory && <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1">{selectedCategory} <button onClick={() => setSelectedCategory('')}><X className="w-2 h-2" /></button></span>}
              {selectedType && <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1">{selectedType} <button onClick={() => setSelectedType('')}><X className="w-2 h-2" /></button></span>}
              {selectedRegion && <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1">{selectedRegion} <button onClick={() => setSelectedRegion('')}><X className="w-2 h-2" /></button></span>}
              {selectedTag && <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1">{selectedTag} <button onClick={() => setSelectedTag('')}><X className="w-2 h-2" /></button></span>}
            </div>
          )}

          {/* Results */}
          {paginatedRecipes.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-3">🍽️</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">No se encontraron recetas</h3>
              <p className="text-gray-500 text-sm mb-4">Prueba a cambiar los filtros o busca algo diferente</p>
              <button onClick={clearFilters} className="px-4 py-2 bg-orange-500 text-white rounded-xl font-semibold text-sm hover:bg-orange-600 transition-colors">
                Limpiar filtros
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginatedRecipes.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} onClick={onSelectRecipe} isFavorite={favorites.has(recipe.id)} onToggleFavorite={onToggleFavorite} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1 mt-8">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let page: number;
                    if (totalPages <= 5) {
                      page = i + 1;
                    } else if (currentPage <= 3) {
                      page = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      page = totalPages - 4 + i;
                    } else {
                      page = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg font-medium text-xs transition-all ${
                          currentPage === page
                            ? 'bg-orange-500 text-white shadow-lg shadow-orange-200'
                            : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-gray-500 ml-2">
                    {currentPage}/{totalPages}
                  </span>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
