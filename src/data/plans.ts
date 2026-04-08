export interface Plan {
  id: string;
  name: string;
  price: number;
  annualPrice: number;
  trial: number;
  description: string;
  features: PlanFeature[];
  color: string;
  borderColor: string;
  badge?: string;
  popular?: boolean;
}

export interface PlanFeature {
  name: string;
  included: boolean;
}

// OFERTA SAN VALENTÍN: 50% DE DESCUENTO HASTA EL 17 DE FEBRERO
const VALENTINE_DISCOUNT = 0.50;

// Precios Base Originales
export const ultraBase = 5.50;
export const masterchefBase = 9.99;

// Aplicamos el 50% de descuento tanto mensual como anualmente
const ultraMonthly = parseFloat((ultraBase * (1 - VALENTINE_DISCOUNT)).toFixed(2));
const masterchefMonthly = parseFloat((masterchefBase * (1 - VALENTINE_DISCOUNT)).toFixed(2));

export const getPrices = () => ({
  ultraMonthly, masterchefMonthly
});

const ultraAnnual = parseFloat((ultraMonthly * 12).toFixed(2));
const masterchefAnnual = parseFloat((masterchefMonthly * 12).toFixed(2));

export const ANNUAL_DISCOUNT_PERCENT = 50; // Para mantener la variable, aunque ahora es un descuento global del 50%

export const plans: Plan[] = [
  {
    id: 'free',
    name: 'Basico',
    price: 0,
    annualPrice: 0,
    trial: 0,
    description: 'Perfecto para empezar a cocinar',
    color: 'from-gray-400 to-gray-600',
    borderColor: 'border-gray-200',
    features: [
      { name: 'Acceso a 500 recetas', included: true },
      { name: 'Busqueda simple', included: true },
      { name: 'Favoritos (limitado a 10)', included: true },
      { name: 'Crear recetas propias (Gratis)', included: true },
      { name: 'Reseñas de recetas', included: true },
      { name: '125 logros disponibles', included: true },
      { name: 'Modo Thermomix', included: false },
      { name: 'Filtros Pro (Populares/Cooksnaps)', included: false },
      { name: 'Calculadora nutricional', included: false },
      { name: 'Asistente de voz (Beta)', included: false },
      { name: 'Con publicidad (500 banners/videos)', included: true },
      { name: 'Acceso anticipado a funciones', included: false },
      { name: 'Recetario Social (Beta)', included: true }
    ]
  },
  {
    id: 'ultra',
    name: 'Ultra',
    price: ultraMonthly,
    annualPrice: ultraAnnual,
    trial: 7,
    description: 'Para cocineros entusiastas',
    color: 'from-orange-400 to-orange-600',
    borderColor: 'border-orange-300',
    badge: 'POPULAR',
    popular: true,
    features: [
      { name: 'Acceso a 800 recetas', included: true },
      { name: 'Busqueda avanzada con filtros', included: true },
      { name: 'Guardado y Favoritos Ilimitados', included: true },
      { name: 'Crear recetas propias', included: true },
      { name: 'Reseñas verificadas', included: true },
      { name: 'Filtros Pro (Populares/Cooksnaps)', included: true },
      { name: '175 logros disponibles', included: true },
      { name: 'Modo Thermomix completo', included: true },
      { name: 'Planificador semanal', included: true },
      { name: 'Calculadora nutricional', included: true },
      { name: 'Sin publicidad', included: true },
      { name: 'Acceso anticipado a funciones', included: true },
      { name: 'Exportar recetas', included: true }
    ]
  },
  {
    id: 'masterchef',
    name: 'Master Chef',
    price: masterchefMonthly,
    annualPrice: masterchefAnnual,
    trial: 7,
    description: 'La experiencia culinaria completa',
    color: 'from-purple-500 to-red-500',
    borderColor: 'border-purple-300',
    badge: 'PREMIUM',
    popular: false,
    features: [
      { name: 'Acceso a 1.000+ recetas completas', included: true },
      { name: 'Filtros IA y Pro', included: true },
      { name: 'Guardado y Favoritos Ilimitados', included: true },
      { name: 'Crear recetas propias', included: true },
      { name: 'Reseñas verificadas', included: true },
      { name: '250 logros disponibles', included: true },
      { name: 'Modo Thermomix completo', included: true },
      { name: 'Planificador semanal avanzado', included: true },
      { name: 'Calculadora nutricional avanzada', included: true },
      { name: 'Asistente de voz (Beta)', included: true },
      { name: 'Sin publicidad', included: true },
      { name: 'Soporte prioritario 24/7', included: true },
      { name: 'Sincronizacion en la nube', included: true }
    ]
  }
];

export const comparisonFeatures = [
  'Numero de recetas',
  'Busqueda avanzada',
  'Filtros Pro (Populares)',
  'Crear recetas propias',
  'Resenas verificadas',
  'Guardado Ilimitado',
  'Logros disponibles',
  'Modo Thermomix',
  'Calculadora nutricional',
  'Temporizador multiple',
  'Asistente de voz',
  'Sin publicidad',
  'Soporte prioritario',
  'Sincronizacion nube'
];
