import { useState, useEffect } from 'react';

const AD_BRANDS = [
  { name: 'Nike', slogan: 'Just Do It. Supera tus límites.', url: 'https://cdn.pixabay.com/vimeo/328225575/corredor-22687.mp4?width=1280&hash=8b5b62b32f1430f81d898555ee0cd44f227b23cf' },
  { name: 'Adidas', slogan: 'Impossible is Nothing.', url: 'https://cdn.pixabay.com/vimeo/305270273/entrenamiento-20224.mp4?width=1280&hash=856a90ab0507a2c5a0df1240c5fce067d51c098d' },
  { name: 'Coca-Cola', slogan: 'Destapa la felicidad.', url: 'https://cdn.pixabay.com/vimeo/459635091/bebida-49339.mp4?width=1280&hash=792a6c116c93fde0db04b2b1130d21e06d96d246' },
  { name: 'Burger King', slogan: 'A la parrilla sabe mejor.', url: 'https://cdn.pixabay.com/vimeo/152342371/hamburguesa-1950.mp4?width=1280&hash=d8a7a0081d09dfb175440f36f6d525281ea78f4b' },
  { name: 'Red Bull', slogan: 'Te da alas.', url: 'https://cdn.pixabay.com/vimeo/281316654/deporte-extremo-17409.mp4?width=1280&hash=385c49ea078d10ed7df015b6b158564da137a1f5' }
];

// Generar 1000 anuncios mockeados (Mezcla de vídeos reales y banners, priorizando vídeos de 30s)
const MOCK_ADS = Array.from({ length: 1000 }, (_, i) => {
  const isVideo = Math.random() > 0.2; // 80% vídeos de 30 segundos, 20% banners inamovibles
  const brand = AD_BRANDS[Math.floor(Math.random() * AD_BRANDS.length)];
  return {
    id: i + 1,
    type: isVideo ? 'video' : 'image',
    brand: brand.name,
    slogan: brand.slogan,
    url: isVideo
      ? brand.url
      : `https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80&sig=${i}`,
    lockTime: isVideo ? [5, 10, 15][Math.floor(Math.random() * 3)] : 0,
    duration: 30 // 30 segundos reales
  };
});

interface AdBannerProps {
  activePlan: string;
}

export function AdBanner({ activePlan }: AdBannerProps) {
  const [currentAd, setCurrentAd] = useState(MOCK_ADS[0]);
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(currentAd.lockTime);

  useEffect(() => {
    // Solo se aplica al plan gratuito
    if (activePlan !== 'free') return;

    // Cambiar de anuncio cada 45 segundos para mantener la agresividad publicitaria
    const interval = setInterval(() => {
      const randomAd = MOCK_ADS[Math.floor(Math.random() * MOCK_ADS.length)];
      setCurrentAd(randomAd);
      setIsVisible(true);
      setTimeLeft(randomAd.lockTime);
    }, 45000);

    return () => clearInterval(interval);
  }, [activePlan]);

  // Temporizador de cuenta regresiva para los vídeos (5, 10 o 15 segundos)
  useEffect(() => {
    if (activePlan !== 'free' || !isVisible || currentAd.type !== 'video' || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [activePlan, isVisible, currentAd.type, timeLeft]);

  if (activePlan !== 'free' || !isVisible) return null;

  return (
    <div className="w-full max-w-5xl mx-auto my-4 bg-gray-900 border-2 border-gray-800 rounded-2xl overflow-hidden shadow-2xl relative group">
      <div className="absolute top-3 right-3 z-30 flex gap-2">
        <span className="bg-yellow-400 text-black text-[10px] px-2 py-1 rounded font-black uppercase tracking-widest shadow-md">
          Publicidad
        </span>
      </div>

      {currentAd.type === 'video' ? (
        <>
          {/* Lógica de Bloqueo de 5, 10, 15 segundos */}
          {timeLeft > 0 ? (
            <div className="absolute top-3 left-3 z-30 bg-black/80 text-white text-xs px-4 py-2 rounded-xl font-bold backdrop-blur-md border border-white/20">
              Podrás saltar en <span className="text-yellow-400 font-black text-sm">{timeLeft}</span> s
            </div>
          ) : (
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-3 left-3 z-30 bg-white hover:bg-gray-100 text-gray-900 text-xs px-4 py-2 rounded-xl font-black shadow-xl transition-all flex items-center gap-2 transform hover:scale-105"
            >
              Saltar Anuncio ⏭️
            </button>
          )}

          <div className="h-48 md:h-72 w-full bg-black flex items-center justify-center relative overflow-hidden">
            {/* Reproducción forzosa del anuncio en vídeo */}
            <video
              src={currentAd.url}
              className="absolute inset-0 w-full h-full object-cover opacity-70 pointer-events-none"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white z-20">
              <div className="text-center p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10">
                <span className="text-xs md:text-sm font-black uppercase tracking-widest text-yellow-400 drop-shadow-md mb-2 block">
                  Vídeo Patrocinado (30s)
                </span>
                <p className="text-2xl md:text-4xl font-black mt-1 drop-shadow-xl text-white">{currentAd.brand}</p>
                <p className="text-yellow-400 text-sm font-bold mt-2 drop-shadow-md">"{currentAd.slogan}"</p>
                <p className="text-gray-300 text-xs mt-3 font-medium max-w-sm mx-auto">
                  Mejora a Ultra o Master Chef para eliminar todas las interrupciones y disfrutar de la cocina sin límites.
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        // BANNERS: Sin botón de cierre intencionalmente
        <div className="h-32 md:h-40 w-full bg-gray-200 flex items-center justify-center relative overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
          <img
            src={currentAd.url}
            alt="Banner Publicitario"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent flex items-center p-6 z-20">
             <div className="max-w-md">
               <span className="bg-yellow-400 text-black text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-widest mb-3 inline-block">
                 Promoción Especial
               </span>
               <h3 className="text-white font-black text-xl md:text-2xl drop-shadow-lg leading-tight">
                 Descubre la nueva campaña de {currentAd.brand}
               </h3>
               <p className="text-yellow-400 text-xs font-bold mt-2 flex items-center gap-1">
                 Haz clic para descubrir más ofertas <span className="text-lg">👉</span>
               </p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
