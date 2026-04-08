export interface Ad {
  id: number;
  type: 'image' | 'video';
  url: string;
  brand: string;
  title: string;
}

const brands = ['IKEA', 'El Corte Inglés', 'Carrefour', 'Mercadona', 'Lidl', 'Bosh', 'Samsung', 'LG', 'Nespresso', 'Moulinex', 'Tefal', 'Braun'];
const products = ['Horno Multifunción', 'Sartén Antiadherente', 'Cafetera Superautomática', 'Robot de Cocina', 'Batidora de Mano', 'Frigorífico Combi', 'Vajilla de Diseño', 'Cuchillos Profesionales', 'Freidora de Aire', 'Microondas Integrable'];

const imagePool = [
  'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1584269600519-112d071b4d16?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80'
];

// Placeholder for a generic cooking/appliance ad video (Big Buck Bunny as a reliable fallback, or a pexels cooking video)
const videoPool = [
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  'https://www.w3schools.com/html/mov_bbb.mp4'
];

export const ads: Ad[] = Array.from({ length: 100 }, (_, i) => {
  const isVideo = Math.random() > 0.8; // 20% videos, 80% images
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const product = products[Math.floor(Math.random() * products.length)];

  return {
    id: i + 1,
    type: isVideo ? 'video' : 'image',
    url: isVideo
      ? videoPool[Math.floor(Math.random() * videoPool.length)]
      : imagePool[Math.floor(Math.random() * imagePool.length)],
    brand,
    title: `Oferta exclusiva: ${product} de ${brand}`,
  };
});
