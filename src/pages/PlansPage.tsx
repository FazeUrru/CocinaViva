import { useState, useEffect } from 'react';
import { Check, X, Zap, Calendar, Gift, Crown, Shield, Star, Sparkles, Code, ChevronDown, ChevronUp, Lock, Heart } from 'lucide-react';
import { plans, ANNUAL_DISCOUNT_PERCENT } from '../data/plans';

interface PlansPageProps {
  devMode?: boolean;
  activePlan: string;
  setActivePlan: (plan: string) => void;
  trackPurchaseIntent?: (plan: string) => void;
  onStartTrial?: (planId: string) => void;
  trialActive?: boolean;
  trialDaysLeft?: number;
}

export function PlansPage({ devMode = false, activePlan, setActivePlan, trackPurchaseIntent, onStartTrial, trialActive = false, trialDaysLeft = 0 }: PlansPageProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [showConfirm, setShowConfirm] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const getPrice = (planId: string) => {
    const plan = plans.find(p => p.id === planId)!;
    let basePrice = billingPeriod === 'monthly' ? plan.price : plan.annualPrice;
    if (trialActive && planId !== 'free') basePrice *= 0.8; // 20% discount
    return basePrice;
  };

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Valentine's Timer Setup
  useEffect(() => {
    const targetDate = new Date('2026-02-17T23:59:59').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getMonthlyEquivalent = (planId: string) => {
    const plan = plans.find(p => p.id === planId)!;
    let basePrice = plan.price;
    let annualPrice = plan.annualPrice;
    if (trialActive && planId !== 'free') {
      basePrice *= 0.8;
      annualPrice *= 0.8;
    }
    if (billingPeriod === 'annual') {
      return (annualPrice / 12).toFixed(2);
    }
    return basePrice.toFixed(2);
  };

  const getAnnualSavings = (planId: string) => {
    const plan = plans.find(p => p.id === planId)!;
    let basePrice = plan.price;
    let annualPrice = plan.annualPrice;
    if (trialActive && planId !== 'free') {
      basePrice *= 0.8;
      annualPrice *= 0.8;
    }
    // We compare to what the regular monthly base price (without Valentine's 50% discount) would be over 12 months.
    // Assuming original base prices were 5.50 and 9.99
    const originalMonthlyPrice = planId === 'ultra' ? 5.50 : 9.99;
    const monthlyTotal = originalMonthlyPrice * 12;
    const annualTotal = annualPrice;
    return (monthlyTotal - annualTotal).toFixed(2);
  };

  const handleSelectPlan = (planId: string) => {
    if (planId === activePlan) return;
    if (trackPurchaseIntent && planId !== 'free') trackPurchaseIntent(planId);
    setShowConfirm(planId);
  };

  const confirmPlan = (planId: string) => {
    if (planId !== 'free') {
      if (onStartTrial) onStartTrial(planId);
      else setActivePlan(planId);
    } else {
      setActivePlan('free');
    }
    setShowConfirm(null);
  };

  const faqs = [
    {
      q: '¿Puedo cancelar en cualquier momento?',
      a: 'Si, puedes cancelar tu suscripcion en cualquier momento sin penalizaciones. No hay contratos ni permanencia. Si cancelas, mantendras el acceso hasta el final del periodo pagado.'
    },
    {
      q: '¿Cuándo se me cobra la suscripción?',
      a: 'Deberás introducir tu tarjeta de crédito para iniciar, pero NO se te cobrará nada hoy. El cobro automático del mes solo se realizará al finalizar tus 7 días de prueba.'
    },
    {
      q: '¿Cual es el descuento anual exacto?',
      a: `Un ${ANNUAL_DISCOUNT_PERCENT}% de descuento al pagar anualmente (¡Oferta válida hasta el 15 de febrero!). Por ejemplo, Ultra pasa de ${(5.99 * 12).toFixed(2)}EUR/ano a ${plans.find(p => p.id === 'ultra')!.annualPrice.toFixed(2)}EUR/ano (ahorras ${getAnnualSavings('ultra')}EUR). Master Chef pasa de ${(10.99 * 12).toFixed(2)}EUR/ano a ${plans.find(p => p.id === 'masterchef')!.annualPrice.toFixed(2)}EUR/ano (ahorras ${getAnnualSavings('masterchef')}EUR).`
    },
    {
      q: '¿Que diferencia hay entre Ultra y Master Chef?',
      a: 'Ultra incluye 800 recetas, 50 logros, Thermomix completo y exportacion de recetas. Master Chef anade 1000+ recetas, 100 logros, asistente de voz, soporte prioritario 24/7 y sincronizacion en la nube.'
    },
    {
      q: '¿Puedo cambiar de plan en cualquier momento?',
      a: 'Si, puedes subir o bajar de plan cuando quieras. Si subes, se te cobrara la diferencia prorrateada. Si bajas, el cambio se aplicara al final del periodo actual.'
    },
    {
      q: '¿Los precios incluyen IVA?',
      a: 'Si, todos los precios mostrados incluyen IVA. No hay cargos ocultos ni sorpresas en la facturacion.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 py-8">
      {/* Admin Banner */}
      {devMode && (
        <div className="mb-6 bg-gradient-to-r from-green-900 to-emerald-800 border border-green-500/40 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
              <Code className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="text-green-300 font-bold text-sm flex items-center gap-2">
                Modo Administrador Activo
                <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-[10px]">ADMIN</span>
              </h3>
              <p className="text-green-400/70 text-xs">Prueba gratuita del plan Ultra activada automaticamente</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">ULTRA</span>
              <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-bold">
                {trialDaysLeft} dias restantes
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Active Plan Status */}
      {trialActive && activePlan !== 'free' && (
        <div className={`mb-6 rounded-2xl p-4 border ${
          activePlan === 'ultra'
            ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200'
            : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'
        }`}>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                activePlan === 'ultra' ? 'bg-orange-500' : 'bg-gradient-to-br from-purple-500 to-red-500'
              }`}>
                {activePlan === 'ultra' ? <Zap className="w-5 h-5 text-white" /> : <Crown className="w-5 h-5 text-white" />}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                  Prueba Activa: Plan {activePlan === 'ultra' ? 'Ultra' : 'Master Chef'}
                  <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-[10px] animate-pulse">ACTIVO</span>
                </h3>
                <p className="text-xs text-gray-600">
                  Te quedan <strong className="text-orange-600">{trialDaysLeft} dias</strong> de prueba gratuita.
                  {devMode && ' (Activado como administrador)'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-white rounded-lg px-3 py-2 border border-gray-200">
                <p className="text-[10px] text-gray-500 uppercase font-bold">Precio tras prueba</p>
                <p className="text-lg font-black text-gray-900">
                  {billingPeriod === 'monthly'
                    ? `${plans.find(p => p.id === activePlan)!.price.toFixed(2)}EUR/mes`
                    : `${getMonthlyEquivalent(activePlan)}EUR/mes`
                  }
                </p>
              </div>
              {activePlan !== 'masterchef' && (
                <button
                  onClick={() => handleSelectPlan('masterchef')}
                  className="bg-gradient-to-r from-purple-500 to-red-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:shadow-lg transition-all"
                >
                  Subir a Master Chef
                </button>
              )}
            </div>
          </div>
          {/* Trial progress bar */}
          <div className="mt-3 bg-white/60 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                activePlan === 'ultra' ? 'bg-orange-500' : 'bg-purple-500'
              }`}
              style={{ width: `${((14 - trialDaysLeft) / 14) * 100}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-gray-500 mt-1 text-right">Dia {14 - trialDaysLeft + 1} de 14</p>
        </div>
      )}

      {/* Special Offer Banner */}
      {trialActive && activePlan !== 'free' && (
        <div className="mb-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6 shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Gift className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-black mb-1 flex items-center gap-2">
                ¡Oferta Especial Exclusiva!
                <span className="bg-white text-red-500 px-2 py-0.5 rounded text-xs font-bold animate-pulse">20% DTO</span>
              </h3>
              <p className="text-red-100 text-sm">
                Suscribete antes de que termine tu periodo de prueba de 3 dias y obten un 20% de descuento en cualquier plan premium.
              </p>
            </div>
          </div>
          <div className="text-right flex flex-col items-end">
            <p className="text-xs text-red-100 uppercase font-bold tracking-wider mb-1">Termina en</p>
            <div className="text-3xl font-black bg-white text-red-500 px-4 py-1 rounded-xl shadow-inner">
              {trialDaysLeft} dias
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium mb-4">
          <Sparkles className="w-3 h-3" />
          Planes de Suscripcion
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">Elige tu Plan Perfecto</h1>
                  <p className="text-gray-500 max-w-xl mx-auto text-sm mb-6">
          Acceso a 1000+ recetas con 7 dias de prueba gratuita. Sin contrato, cancela cuando quieras.
        </p>

        {/* Valentine's Day Special Offer Timer */}
        <div className="bg-red-600 text-white p-4 rounded-2xl mb-6 flex flex-col items-center justify-center shadow-xl shadow-red-200 border-2 border-red-400 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-600 opacity-50"></div>
          <Heart className="absolute -left-4 -top-4 w-24 h-24 text-red-500 opacity-50" />
          <Heart className="absolute -right-4 -bottom-4 w-24 h-24 text-pink-500 opacity-50" />

          <div className="relative z-10 text-center">
            <h2 className="text-2xl md:text-3xl font-black mb-2 flex items-center justify-center gap-2">
              <Heart className="w-8 h-8 fill-white animate-pulse" />
              OFERTA SAN VALENTÍN: 50% DTO
              <Heart className="w-8 h-8 fill-white animate-pulse" />
            </h2>
            <p className="text-red-100 font-bold mb-4 uppercase tracking-widest text-xs md:text-sm">En todos los planes (Mensual y Anual)</p>

            <div className="flex items-center justify-center gap-2 md:gap-4 font-mono">
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-2 md:p-3 min-w-[60px] md:min-w-[80px]">
                <div className="text-2xl md:text-4xl font-black">{timeLeft.days}</div>
                <div className="text-[9px] md:text-xs font-bold uppercase">Días</div>
              </div>
              <span className="text-2xl font-black">:</span>
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-2 md:p-3 min-w-[60px] md:min-w-[80px]">
                <div className="text-2xl md:text-4xl font-black">{timeLeft.hours}</div>
                <div className="text-[9px] md:text-xs font-bold uppercase">Horas</div>
              </div>
              <span className="text-2xl font-black">:</span>
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-2 md:p-3 min-w-[60px] md:min-w-[80px]">
                <div className="text-2xl md:text-4xl font-black">{timeLeft.minutes}</div>
                <div className="text-[9px] md:text-xs font-bold uppercase">Mins</div>
              </div>
              <span className="text-2xl font-black">:</span>
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-2 md:p-3 min-w-[60px] md:min-w-[80px]">
                <div className="text-2xl md:text-4xl font-black">{timeLeft.seconds}</div>
                <div className="text-[9px] md:text-xs font-bold uppercase">Segs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Toggle */}
        <div className="inline-flex flex-col items-center gap-2">
          <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full p-1.5">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${
                billingPeriod === 'monthly' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Mensual
              <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold animate-pulse">
                -50% DTO
              </span>
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${
                billingPeriod === 'annual' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Anual
              <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold animate-pulse">
                -50% DTO
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
        {plans.map((plan) => {
          const price = getPrice(plan.id);
          const isFree = plan.id === 'free';
          const isActive = activePlan === plan.id;
          const isUltra = plan.id === 'ultra';
          const isMaster = plan.id === 'masterchef';

          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                isActive
                  ? 'border-2 border-green-400 shadow-xl shadow-green-100 ring-2 ring-green-200'
                  : isUltra
                    ? 'border-2 border-orange-400 shadow-xl shadow-orange-100'
                    : isMaster
                      ? 'border-2 border-purple-400 shadow-xl shadow-purple-100'
                      : 'border border-gray-200 shadow-sm hover:shadow-md hover:border-orange-200'
              }`}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-[0.03]`}></div>

              {/* Badge */}
              {(plan.badge || isActive) && (
                <div className="absolute top-4 right-4 flex gap-1.5">
                  {isActive && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white bg-green-500 flex items-center gap-1">
                      <Check className="w-3 h-3" /> ACTIVO
                    </span>
                  )}
                  {plan.badge && !isActive && (
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold text-white ${
                      isMaster ? 'bg-gradient-to-r from-purple-500 to-red-500' : 'bg-gradient-to-r from-orange-500 to-red-500'
                    }`}>
                      {plan.badge}
                    </span>
                  )}
                </div>
              )}

              <div className="relative p-6 bg-white h-full flex flex-col">
                {/* Plan icon */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                  isFree ? 'bg-gray-100' : isUltra ? 'bg-orange-100' : 'bg-purple-100'
                }`}>
                  {isFree ? <Shield className="w-6 h-6 text-gray-500" /> :
                   isUltra ? <Zap className="w-6 h-6 text-orange-500" /> :
                   <Crown className="w-6 h-6 text-purple-500" />}
                </div>

                <h2 className="text-xl font-black text-gray-900 mb-1">{plan.name}</h2>
                <p className="text-xs text-gray-500 mb-5">{plan.description}</p>

                {/* Pricing */}
                <div className="mb-6">
                  {isFree ? (
                    <div className="text-4xl font-black text-gray-900">Gratis</div>
                  ) : (
                    <>
                      {billingPeriod === 'annual' ? (
                        <div className="text-sm text-gray-400 line-through mb-1 flex items-center gap-2">
                          {((plan.price * 2) * 12).toFixed(2)}EUR/año
                          <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-bold">50% DTO</span>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-400 line-through mb-1 flex items-center gap-2">
                          {(plan.price * 2).toFixed(2)}EUR/mes
                          <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-bold">50% DTO</span>
                        </div>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-red-600">{price.toFixed(2)}</span>
                        <span className="text-lg font-bold text-gray-900">EUR</span>
                        <span className="text-gray-500 text-sm">/{billingPeriod === 'monthly' ? 'mes' : 'año'}</span>
                      </div>
                      {billingPeriod === 'annual' && (
                        <p className="text-xs text-gray-500 mt-1">
                          Equivale a <strong className="text-gray-900">{getMonthlyEquivalent(plan.id)}EUR/mes</strong>
                        </p>
                      )}
                      {plan.trial > 0 && (
                        <p className="text-xs text-green-600 font-semibold mt-2 flex items-center gap-1">
                          <Gift className="w-3 h-3" />
                          7 dias de prueba gratis
                        </p>
                      )}
                      {billingPeriod === 'annual' && (
                        <div className="mt-2 inline-block">
                          <span className="text-[10px] font-bold text-white bg-green-500 px-2 py-1 rounded-full">
                            Ahorras {getAnnualSavings(plan.id)}EUR al ano (-{ANNUAL_DISCOUNT_PERCENT}%)
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* CTA Button */}
                {isFree ? (
                  <button
                    onClick={() => window.open('https://github.com/tu-usuario/cocinaviva', '_blank')}
                    className="w-full py-3 rounded-xl font-bold text-sm transition-all mb-6 bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Code className="w-4 h-4" /> Ver Código en GitHub
                  </button>
                ) : (
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    disabled={isActive}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all mb-6 ${
                      isActive
                        ? 'bg-green-100 text-green-700 cursor-default'
                        : isUltra
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-200 animate-pulse'
                            : 'bg-gradient-to-r from-purple-500 to-red-500 text-white hover:shadow-lg hover:shadow-purple-200'
                    }`}
                  >
                    {isActive
                        ? (trialActive ? `Probando (${trialDaysLeft} dias)` : 'Plan Actual')
                        : 'Comenzar prueba gratis'
                    }
                  </button>
                )}

                {plan.trial > 0 && !isFree && !isActive && (
                  <p className="text-center text-[10px] text-gray-400 mb-4 -mt-4 font-bold uppercase tracking-wider text-orange-500">
                    7 dias de prueba - Cancela sin coste
                  </p>
                )}

                {/* Features */}
                <div className="space-y-2.5 flex-1">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      {feature.included ? (
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isFree ? 'bg-gray-100' : isUltra ? 'bg-orange-100' : 'bg-purple-100'
                        }`}>
                          <Check className={`w-3 h-3 ${
                            isFree ? 'text-gray-600' : isUltra ? 'text-orange-600' : 'text-purple-600'
                          }`} />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X className="w-3 h-3 text-gray-300" />
                        </div>
                      )}
                      <span className={`text-xs leading-relaxed ${
                        feature.included ? 'text-gray-700 font-medium' : 'text-gray-400'
                      }`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-12">
        <div className="p-6 bg-gray-50 border-b">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-500" />
            Tabla Comparativa Completa
          </h2>
          <p className="text-xs text-gray-500 mt-1">Compara todos los planes lado a lado</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-5 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wide w-1/4">
                  Caracteristica
                </th>
                <th className="px-5 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wide">
                  <div className="flex flex-col items-center gap-1">
                    <Shield className="w-4 h-4" />
                    Basico
                  </div>
                </th>
                <th className="px-5 py-4 text-center text-xs font-bold text-orange-600 uppercase tracking-wide">
                  <div className="flex flex-col items-center gap-1">
                    <Zap className="w-4 h-4" />
                    Ultra
                    {activePlan === 'ultra' && <span className="text-[9px] bg-green-500 text-white px-1.5 py-0.5 rounded-full">ACTIVO</span>}
                  </div>
                </th>
                <th className="px-5 py-4 text-center text-xs font-bold text-purple-600 uppercase tracking-wide">
                  <div className="flex flex-col items-center gap-1">
                    <Crown className="w-4 h-4" />
                    Master Chef
                    {activePlan === 'masterchef' && <span className="text-[9px] bg-green-500 text-white px-1.5 py-0.5 rounded-full">ACTIVO</span>}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Pricing rows */}
              <tr className="hover:bg-gray-50 bg-red-50/30">
                <td className="px-5 py-4 font-semibold text-gray-900">
                  Precio Mensual <span className="bg-red-500 text-white px-1.5 py-0.5 rounded-full text-[10px] ml-2 animate-pulse">-50% DTO</span>
                </td>
                <td className="px-5 py-4 text-center text-gray-700 font-bold">Gratis</td>
                <td className="px-5 py-4 text-center text-red-600 font-bold text-lg">
                  <span className="line-through text-gray-400 text-xs mr-2">{(plans.find(p => p.id === 'ultra')!.price * 2).toFixed(2)}€</span>
                  {plans.find(p => p.id === 'ultra')!.price.toFixed(2)}€/mes
                </td>
                <td className="px-5 py-4 text-center text-red-600 font-bold text-lg">
                  <span className="line-through text-gray-400 text-xs mr-2">{(plans.find(p => p.id === 'masterchef')!.price * 2).toFixed(2)}€</span>
                  {plans.find(p => p.id === 'masterchef')!.price.toFixed(2)}€/mes
                </td>
              </tr>
              <tr className="hover:bg-gray-50 bg-pink-50/50">
                <td className="px-5 py-4 font-semibold text-gray-900">
                  Precio Anual <span className="bg-red-500 text-white px-1.5 py-0.5 rounded-full text-[10px] ml-2 animate-pulse">-50% DTO</span>
                </td>
                <td className="px-5 py-4 text-center text-gray-700">Gratis</td>
                <td className="px-5 py-4 text-center">
                  <div className="text-red-600 font-bold text-lg">
                    <span className="line-through text-gray-400 text-xs mr-2">{((plans.find(p => p.id === 'ultra')!.price * 2) * 12).toFixed(2)}€</span>
                    {plans.find(p => p.id === 'ultra')!.annualPrice.toFixed(2)}€/año
                  </div>
                  <div className="text-[10px] text-red-500 font-medium font-bold uppercase tracking-wider">
                    Ahorras {getAnnualSavings('ultra')}€ frente al precio original
                  </div>
                </td>
                <td className="px-5 py-4 text-center">
                  <div className="text-red-600 font-bold text-lg">
                    <span className="line-through text-gray-400 text-xs mr-2">{((plans.find(p => p.id === 'masterchef')!.price * 2) * 12).toFixed(2)}€</span>
                    {plans.find(p => p.id === 'masterchef')!.annualPrice.toFixed(2)}€/año
                  </div>
                  <div className="text-[10px] text-red-500 font-medium font-bold uppercase tracking-wider">
                    Ahorras {getAnnualSavings('masterchef')}€ frente al precio original
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-5 py-4 font-semibold text-gray-900">Periodo de Prueba</td>
                <td className="px-5 py-4 text-center text-gray-400">-</td>
                <td className="px-5 py-4 text-center"><span className="font-bold text-green-600">3 dias gratis</span></td>
                <td className="px-5 py-4 text-center"><span className="font-bold text-green-600">3 dias gratis</span></td>
              </tr>

              {/* Feature comparison rows */}
              {[
                { name: 'Numero de recetas', free: '500', ultra: '800', master: '1.000+' },
                { name: 'Crear recetas propias', free: true, ultra: true, master: true },
                { name: 'Reseñas y valoraciones', free: 'Básico', ultra: 'Verificadas', master: 'Verificadas' },
                { name: 'Filtros Pro (Populares/Cooksnaps)', free: false, ultra: true, master: true },
                { name: 'Busqueda avanzada con filtros', free: false, ultra: true, master: true },
                { name: 'Favoritos y Guardado', free: 'Max. 10', ultra: 'Ilimitados', master: 'Ilimitados' },
                { name: 'Logros disponibles', free: '75', ultra: '125', master: '160' },
                { name: 'Modo Thermomix', free: false, ultra: true, master: true },
                { name: 'Calculadora nutricional', free: false, ultra: true, master: 'Avanzada' },
                { name: 'Temporizador multiple', free: false, ultra: true, master: 'Sincronizado' },
                { name: 'Asistente de voz', free: false, ultra: false, master: 'Beta' },
                { name: 'Sin publicidad', free: false, ultra: true, master: true },
                { name: 'Acceso anticipado', free: false, ultra: true, master: true },
                { name: 'Sincronizacion nube', free: false, ultra: false, master: true },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-900 text-xs">{row.name}</td>
                  {(['free', 'ultra', 'master'] as const).map(col => {
                    const val = row[col];
                    return (
                      <td key={col} className="px-5 py-3 text-center">
                        {val === true ? (
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                            <Check className="w-3 h-3 text-green-600" />
                          </div>
                        ) : val === false ? (
                          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                            <X className="w-3 h-3 text-gray-400" />
                          </div>
                        ) : (
                          <span className={`text-xs font-semibold ${
                            col === 'master' ? 'text-purple-600' : col === 'ultra' ? 'text-orange-600' : 'text-gray-600'
                          }`}>
                            {val}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Annual savings highlight */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6 mb-12 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-inner">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg text-red-700">Ahorro Extremo del 50% por San Valentín</h3>
              <p className="text-xs text-red-500 font-medium">Mitad de precio en pagos mensuales y anuales</p>
            </div>
          </div>
          <div className="bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-black animate-bounce shadow-md shadow-red-200">
            ⏳ TERMINA EL 17 DE FEBRERO
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 border-2 border-red-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-orange-500" />
              <span className="font-bold text-gray-900 text-sm">Ultra Anual</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-gray-400 line-through text-sm">{((plans.find(p => p.id === 'ultra')!.price * 2) * 12).toFixed(2)}EUR</span>
              <span className="text-2xl font-black text-red-600">{plans.find(p => p.id === 'ultra')!.annualPrice.toFixed(2)}EUR</span>
            </div>
            <p className="text-xs text-red-500 font-bold mt-1 bg-red-50 px-2 py-1 rounded inline-block">
              Ahorras {getAnnualSavings('ultra')}EUR/año frente a su precio original
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 border-2 border-red-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-4 h-4 text-purple-500" />
              <span className="font-bold text-gray-900 text-sm">Master Chef Anual</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-gray-400 line-through text-sm">{((plans.find(p => p.id === 'masterchef')!.price * 2) * 12).toFixed(2)}EUR</span>
              <span className="text-2xl font-black text-red-600">{plans.find(p => p.id === 'masterchef')!.annualPrice.toFixed(2)}EUR</span>
            </div>
            <p className="text-xs text-red-500 font-bold mt-1 bg-red-50 px-2 py-1 rounded inline-block">
              Ahorras {getAnnualSavings('masterchef')}EUR/año frente a su precio original
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto mb-10">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Preguntas Frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <h3 className="font-bold text-gray-900 text-sm">{faq.q}</h3>
                {expandedFaq === i
                  ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                }
              </button>
              {expandedFaq === i && (
                <div className="px-4 pb-4">
                  <p className="text-gray-600 text-xs leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal (Credit Card) */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl relative overflow-hidden">
            <div className={`absolute top-0 inset-x-0 h-1 ${showConfirm === 'ultra' ? 'bg-orange-500' : showConfirm === 'masterchef' ? 'bg-purple-500' : 'bg-gray-500'}`}></div>

            <div className="text-center mb-5">
              {showConfirm === 'free' ? (
                <Shield className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              ) : showConfirm === 'ultra' ? (
                <Zap className="w-10 h-10 text-orange-500 mx-auto mb-2" />
              ) : (
                <Crown className="w-10 h-10 text-purple-500 mx-auto mb-2" />
              )}
              <h3 className="text-xl font-black text-gray-900">
                {showConfirm === 'free' ? 'Plan Básico' : `Activar 7 días gratis de ${plans.find(p => p.id === showConfirm)!.name}`}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {showConfirm === 'free'
                  ? 'Perderás el acceso a las funciones premium'
                  : 'Introduce tu tarjeta. No se te cobrará nada hasta después de los 7 días de prueba.'}
              </p>
            </div>

            {showConfirm !== 'free' && (
              <div className="space-y-4 mb-6 text-left">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-gray-700">Total Hoy:</span>
                    <span className="text-lg font-black text-green-600">0,00 €</span>
                  </div>
                  <p className="text-[10px] text-gray-500">
                    A partir del día 8 se te cobrarán {plans.find(p => p.id === showConfirm)!.price.toFixed(2)} € / mes. Cancela en cualquier momento.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Titular de la tarjeta</label>
                  <input type="text" placeholder="Nombre completo" className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Número de tarjeta</label>
                  <div className="relative">
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-2 pl-10 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 tracking-widest" />
                    <div className="absolute left-3 top-2.5">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Caducidad (MM/AA)</label>
                    <input type="text" placeholder="MM/AA" className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">CVC</label>
                    <input type="text" placeholder="123" className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setShowConfirm(null)}
                className="flex-1 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  alert(showConfirm === 'free' ? 'Plan modificado con éxito.' : 'Tarjeta verificada. ¡Bienvenido a tu prueba gratuita!');
                  confirmPlan(showConfirm);
                }}
                className={`flex-1 py-3 text-white rounded-xl text-sm font-bold shadow-md transition-all hover:-translate-y-0.5 ${
                  showConfirm === 'free'
                    ? 'bg-gray-800 hover:bg-gray-900'
                    : 'bg-green-600 hover:bg-green-500 shadow-green-200'
                }`}
              >
                {showConfirm === 'free' ? 'Cambiar a Básico' : 'Iniciar 7 Días Gratis'}
              </button>
            </div>

            {showConfirm !== 'free' && (
              <p className="text-center text-[9px] text-gray-400 mt-4 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> Transacción encriptada y segura (SSL)
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
