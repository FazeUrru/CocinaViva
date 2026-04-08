export interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Recipe {
  id: number;
  name: string;
  category: string;
  type: 'tradicional' | 'thermomix';
  difficulty: 'Fácil' | 'Media' | 'Difícil';
  time: string;
  servings: number;
  ingredients: string[];
  steps: string[];
  image: string;
  rating: number;
  calories: number;
  region?: string;
  tags: string[];
  cooksnaps: number;
  isDetailed: boolean;
  reviewsNum: number;
  reviews: Review[];
}

export const categories = [
  'Entrantes', 'Sopas y Cremas', 'Ensaladas', 'Arroces', 'Pastas',
  'Carnes', 'Pescados', 'Mariscos', 'Verduras', 'Legumbres',
  'Guisos', 'Postres', 'Repostería', 'Pan y Masas', 'Salsas',
  'Bebidas', 'Tapas', 'Desayunos', 'Cenas Ligeras', 'Especial Fiestas'
];

const regions = [
  'Andalucía', 'Cataluña', 'País Vasco', 'Galicia', 'Castilla y León',
  'Valencia', 'Asturias', 'Aragón', 'Extremadura', 'Murcia',
  'Navarra', 'La Rioja', 'Cantabria', 'Canarias', 'Baleares',
  'Madrid', 'Castilla-La Mancha', 'Internacional', 'Mediterránea', 'Latinoamérica'
];

const tagOptions = [
  'sin gluten', 'vegano', 'vegetariano', 'bajo en calorías', 'alto en proteínas',
  'rápido', 'económico', 'festivo', 'infantil', 'gourmet',
  'picante', 'dulce', 'salado', 'frío', 'caliente',
  'horno', 'fritura', 'vapor', 'plancha', 'crudo'
];

import { getRecipeImage } from './recipeImages';

const recipeNames: Record<string, string[]> = {
  'Entrantes': [
    // Nuevas Cookidoo
    'Paté de Salmón Ahumado Thermomix', 'Hummus de Pimiento Asado Cookidoo', 'Croquetas de Jamón Thermomix', 'Dip de Alcachofas Thermomix', 'Mousse de Espárragos Cookidoo', 'Tartar de Salmón Thermomix', 'Gazpacho Suave Cookidoo', 'Crema de Queso y Nueces Thermomix', 'Ceviche de Mango Thermomix', 'Pimientos Rellenos Cookidoo',
    'Croquetas de Jamón Ibérico', 'Patatas Bravas Madrileñas', 'Gambas al Ajillo', 'Pimientos de Padrón',
    'Tortilla Española Clásica', 'Gazpacho Andaluz', 'Salmorejo Cordobés', 'Empanadas Gallegas',
    'Montaditos de Solomillo', 'Boquerones en Vinagre', 'Pulpo a la Gallega', 'Mejillones en Escabeche',
    'Huevos Rotos con Jamón', 'Pinchos Morunos', 'Calamares a la Romana', 'Champiñones al Ajillo',
    'Tostas de Tomate y Jamón', 'Banderillas Picantes', 'Chopitos Fritos', 'Alcachofas Fritas',
    'Croquetas de Bacalao', 'Empanadillas de Atún', 'Rollitos de Primavera', 'Bruschettas Mediterráneas',
    'Hummus Casero', 'Guacamole Tradicional', 'Nachos con Queso', 'Tabla de Quesos Españoles',
    'Jamón Ibérico con Pan Tomaca', 'Anchoas del Cantábrico',
    'Tartar de Atún Rojo', 'Ceviche de Langostinos', 'Carpaccio de Ternera', 'Milhojas de Foie y Manzana',
    'Buñuelos de Bacalao', 'Dátiles con Bacon', 'Coca de Recapte', 'Volovanes de Marisco',
    'Paté de Higado Casero', 'Tostada de Escalivada', 'Rollitos de Salmón Ahumado', 'Humus de Remolacha',
    'Tempura de Langostinos', 'Brochetas de Pollo Satay', 'Tapenade de Aceitunas',
    'Croquetas de Setas y Trufa', 'Fingers de Pollo Caseros', 'Tosta de Sardina Ahumada',
    'Ceviche de Mango y Gambas', 'Patatas Deluxe con Salsa Brava', 'Albondigillas de Bacalao',
    'Mini Quiches de Verduras', 'Rollitos de Berenjena con Queso', 'Tartar de Salmón con Aguacate',
    'Huevos Rellenos Tradicionales',
    'Croquetas de Cochinillo', 'Tataki de Ternera con Sésamo', 'Gyozas de Cerdo Caseras',
    'Samosas de Verduras', 'Blinis con Salmón y Eneldo', 'Arancini de Risotto',
    'Dim Sum de Gambas', 'Mini Hamburguesas Gourmet', 'Bastoncitos de Mozzarella',
    'Rollitos de Pato Crujiente', 'Croquetas de Pulpo', 'Tartaletas de Queso de Cabra',
    'Tostas de Sardina y Pimiento', 'Brochetas Caprese', 'Mini Tortillas de Patata',
    'Nachos Supremos', 'Jalapeños Rellenos', 'Bolas de Queso Crujientes', 'Carpaccio de Salmón',
    'Tiradito de Pulpo', 'Edamame Picante', 'Cestitas de Plátano Rellenas', 'Focaccia con Romero'
  ],
  'Sopas y Cremas': [
    // Nuevas Cookidoo
    'Crema de Calabacín Thermomix', 'Vichyssoise Clásica Cookidoo', 'Crema de Champiñones Cookidoo', 'Sopa de Pescado Thermomix', 'Crema de Calabaza Asada Cookidoo', 'Sopa de Cebolla Thermomix', 'Crema de Mariscos Thermomix', 'Sopa Juliana Cookidoo', 'Puré de Zanahoria Thermomix', 'Sopa de Tomate y Albahaca Cookidoo',
    'Sopa Castellana', 'Crema de Calabaza', 'Sopa de Cebolla Gratinada', 'Crema de Espárragos',
    'Caldo Gallego', 'Sopa de Ajo', 'Crema de Zanahoria y Jengibre', 'Vichyssoise',
    'Sopa de Pescado', 'Crema de Champiñones', 'Sopa Juliana', 'Crema de Puerros',
    'Sopa de Tomate', 'Crema de Calabacín', 'Consomé al Jerez', 'Sopa de Marisco',
    'Crema de Lentejas', 'Sopa Minestrone', 'Crema de Guisantes', 'Sopa de Fideos',
    'Ajoblanco Malagueño', 'Crema de Brócoli', 'Sopa Thai de Coco', 'Crema de Remolacha',
    'Sopa de Pollo con Verduras', 'Crema de Alcachofas', 'Gazpacho de Sandía', 'Sopa Miso',
    'Crema de Coliflor', 'Sopa de Garbanzos',
    'Crema de Boniato y Curry', 'Sopa de Rape y Almejas', 'Crema de Pimiento Rojo', 'Sopa Harira',
    'Crema de Espinacas', 'Sopa de Cebada', 'Gazpacho de Mango', 'Crema de Berenjenas',
    'Sopa de Tortilla Mexicana', 'Crema de Apio Nabo', 'Sopa Tom Yum', 'Crema de Trufa',
    'Sopa de Castañas', 'Crema de Aguacate Fría', 'Sopa Pho Vietnamita',
    'Crema de Patata y Puerro', 'Sopa de Almejas al Azafrán', 'Crema de Habas con Menta',
    'Sopa de Melón con Jamón', 'Crema Fría de Pepino y Yogur', 'Caldo de Cocido Reconstituyente',
    'Sopa de Ajo con Huevo Escalfado', 'Crema de Calabaza y Naranja', 'Sopa de Lentejas Especiada',
    'Consomé de Buey con Verduras'
  ],
  'Ensaladas': [
    // Nuevas Cookidoo
    'Ensaladilla Rusa Thermomix', 'Ensalada de Quinoa Cookidoo', 'Tabulé Fresco Thermomix', 'Ensalada de Lentejas Cookidoo', 'Ensalada de Arroz Salvaje Thermomix', 'Coleslaw Thermomix', 'Ensalada de Pollo y Manzana Cookidoo', 'Ensalada de Pasta Tricolor Thermomix', 'Ensalada Templada de Setas Cookidoo', 'Ensalada Caprese Thermomix',
    'Ensalada Mixta Española', 'Ensalada César', 'Ensaladilla Rusa', 'Ensalada de Pulpo',
    'Ensalada Caprese', 'Ensalada Waldorf', 'Ensalada Griega', 'Ensalada de Pasta',
    'Ensalada Templada de Salmón', 'Ensalada de Quinoa', 'Ensalada de Garbanzos',
    'Ensalada Tropical', 'Pipirrana Jaenera', 'Ensalada de Tomate Rosa', 'Ensalada Nórdica',
    'Xató Catalán', 'Ensalada de Burrata', 'Ensalada de Espinacas y Frutos Secos',
    'Esqueixada de Bacalao', 'Ensalada Murciana', 'Ensalada de Ventresca',
    'Ensalada de Canónigos y Queso de Cabra', 'Ensalada de Arroz', 'Ensalada de Lentejas',
    'Ensalada Campera', 'Ensalada de Mango y Aguacate', 'Tabulé',
    'Ensalada de Remolacha y Nueces', 'Ensalada de Endivias', 'Poke Bowl Mediterráneo',
    'Ensalada Niçoise', 'Ensalada de Cous Cous y Menta', 'Ensalada de Pera y Gorgonzola',
    'Ensalada Tailandesa de Ternera', 'Ensalada de Hinojo y Naranja', 'Ensalada de Patata Alemana',
    'Fattoush Libanesa', 'Ensalada de Judías Verdes Templada', 'Ensalada de Higos y Jamón',
    'Ensalada de Algas Wakame', 'Ensalada de Bogavante', 'Ensalada de Trucha Ahumada',
    'Ensalada de Codorniz', 'Ensalada Thai de Papaya', 'Ensalada de Escarola con Granada',
    'Ensalada de Calabacín Marinado', 'Ensalada de Pollo y Mango', 'Ensalada César con Langostinos',
    'Ensalada de Tomate Raf y Ventresca', 'Ensalada Tibia de Pulpo y Patata', 'Ensalada Detox Verde',
    'Ensalada Mediterránea de Cous Cous', 'Ensalada de Espárragos Trigueros', 'Ensalada de Naranja y Bacalao',
    'Ensalada de Alcachofas y Jamón'
  ],
  'Arroces': [
    // Nuevas Cookidoo
    'Arroz Caldoso con Bogavante Thermomix', 'Risotto de Setas Cookidoo', 'Arroz a Banda Thermomix', 'Risotto de Parmesano Cookidoo', 'Arroz Negro Thermomix', 'Arroz Frito Tres Delicias Cookidoo', 'Risotto de Calabaza Thermomix', 'Arroz con Pollo Cookidoo', 'Paella Mixta Thermomix', 'Arroz al Curry Thermomix',
    'Paella Valenciana', 'Arroz Negro', 'Arroz al Horno', 'Arroz con Bogavante',
    'Arroz a Banda', 'Arroz Caldoso de Marisco', 'Arroz con Pollo', 'Risotto de Setas',
    'Arroz con Leche Asturiano', 'Arroz a la Cubana', 'Fideuá', 'Arroz con Verduras',
    'Arroz Meloso de Gambas', 'Paella de Mariscos', 'Arroz con Costillas', 'Risotto de Calabaza',
    'Arroz Tres Delicias', 'Arroz con Bacalao', 'Arroz Brut Mallorquín', 'Arroz con Rape',
    'Paella Mixta', 'Arroz con Conejo', 'Risotto de Espárragos', 'Arroz del Senyoret',
    'Arroz con Pato', 'Arroz con Almejas', 'Arroz Empedrado', 'Arroz con Setas',
    'Arroz con Costra Alicantino', 'Arroz Caldoso de Pulpo',
    'Risotto de Trufa Negra', 'Arroz con Pollo al Curry', 'Arroz Jazmín con Langostinos',
    'Paella de Verduras', 'Arroz Basmati con Cordero', 'Arroz con Azafrán y Pollo',
    'Risotto de Remolacha', 'Arroz Frito Indonesio', 'Arroz con Sepia y Alcachofas',
    'Arroz con Habas y Butifarra', 'Paella de Montaña', 'Arroz Pegao Dominicano',
    'Risotto al Champagne', 'Arroz con Bogavante y Trufa', 'Arroz Caldoso de Bogavante',
    'Arroz con Magro y Verduras', 'Paella de Montaña con Setas', 'Arroz con Carabineros',
    'Risotto de Gorgonzola y Pera', 'Arroz Caldoso de Rape y Gambas', 'Arroz con Alcachofas y Habas',
    'Paella Negra de Sepia', 'Arroz con Pollo al Azafrán', 'Risotto de Champiñones y Trufa',
    'Arroz Integral con Verduras',
    'Risotto de Langostinos y Azafrán', 'Arroz con Pollo y Verduras al Curry', 'Paella de Verduras y Setas',
    'Arroz Caldoso con Nécoras', 'Risotto de Espárragos y Parmesano', 'Arroz con Bogavante y Carabineros',
    'Paella de Marisco y Pescado', 'Arroz con Sepia y Habas', 'Risotto de Calabacín y Menta',
    'Arroz con Costillas y Garbanzos', 'Paella de Montaña con Conejo', 'Arroz Caldoso de Bogavante Premium',
    'Risotto Negro de Calamar', 'Arroz al Horno con Morcilla', 'Arroz con Bacalao y Coliflor'
  ],
  'Pastas': [
    // Nuevas Cookidoo
    'Macarrones con Tomate Thermomix', 'Espaguetis Boloñesa Cookidoo', 'Lasaña de Carne Thermomix', 'Pasta al Pesto Cookidoo', 'Raviolis de Espinacas Thermomix', 'Canelones Rellenos Cookidoo', 'Pasta a la Carbonara Auténtica Thermomix', 'Ñoquis de Patata Cookidoo', 'Tallarines con Gambas Thermomix', 'Pasta Arrabiata Cookidoo',
    'Espaguetis a la Carbonara', 'Macarrones con Chorizo', 'Lasaña de Carne',
    'Canelones de Espinacas', 'Pasta Boloñesa', 'Fetuccini Alfredo', 'Penne al Pesto',
    'Ravioli de Ricotta', 'Espaguetis con Almejas', 'Pasta Putanesca',
    'Tallarines con Gambas', 'Macarrones con Tomate', 'Lasaña de Verduras',
    'Pasta al Salmón', 'Ñoquis de Patata', 'Tortellini en Caldo', 'Pasta Aglio e Olio',
    'Canelones de Carne', 'Pasta con Atún', 'Espaguetis con Mejillones',
    'Pasta Arrabiata', 'Macarrones Gratinados', 'Pasta Primavera', 'Fideos a la Cazuela',
    'Pasta con Setas y Trufa', 'Lasaña de Marisco', 'Pasta con Pesto Rojo',
    'Espaguetis a la Marinera', 'Pasta con Berenjena', 'Rigatoni al Ragú',
    'Orecchiette con Brócoli', 'Pappardelle con Ragú de Jabalí', 'Linguine al Nero di Seppia',
    'Tagliatelle con Boletus', 'Paccheri alla Norma', 'Bucatini all Amatriciana',
    'Cacio e Pepe', 'Pasta alla Norma', 'Fusilli con Pesto de Pistachos',
    'Spaghetti alle Vongole', 'Penne alla Vodka', 'Ravioli de Calabaza',
    'Tortellini en Crema de Parmesano', 'Lasaña de Setas y Trufa', 'Pasta con Sardinas',
    'Espaguetis con Calabacín y Limón', 'Macarrones con Chorizo y Pimientos', 'Lasaña de Espinacas y Ricotta',
    'Tallarines con Pollo al Curry', 'Pasta con Brócoli y Anchoas', 'Ñoquis de Calabaza con Salvia',
    'Cannelloni de Carne a la Catalana', 'Pasta con Pesto de Rúcula', 'Rigatoni con Ragú de Ternera',
    'Espaguetis con Tomate Cherry y Burrata',
    'Tagliatelle con Ragú de Pato', 'Linguine con Gambas y Limón', 'Tortellini de Calabaza y Salvia',
    'Gnocchi a la Sorrentina', 'Pasta con Nduja y Burrata', 'Rigatoni con Salchicha y Brócoli',
    'Spaghetti Cacio e Pepe Premium', 'Lasaña de Berenjena y Mozzarella', 'Pappardelle con Setas Silvestres',
    'Fettuccine con Trufa y Parmesano', 'Pasta con Bottarga', 'Ravioli de Langostinos',
    'Cannelloni de Espinacas y Piñones', 'Pasta alla Gricia', 'Bucatini con Sardinas y Hinojo'
  ],
  'Carnes': [
    // Nuevas Cookidoo
    'Albóndigas en Salsa Thermomix', 'Pollo al Chilindrón Cookidoo', 'Carrilleras al Vino Tinto Thermomix', 'Lomo a la Sal Cookidoo', 'Estofado de Ternera Thermomix', 'Pollo al Curry con Piña Cookidoo', 'Costillas BBQ Thermomix', 'Pechuga Rellena Cookidoo', 'Solomillo Wellington Thermomix', 'Ragú de Jabalí Cookidoo',
    'Cochinillo Asado Segoviano', 'Rabo de Toro', 'Chuletón a la Brasa', 'Pollo al Ajillo',
    'Cordero Asado al Horno', 'Carrilleras de Cerdo', 'Escalope Milanesa', 'Albóndigas en Salsa',
    'Solomillo al Pedro Ximénez', 'Pollo a la Pepitoria', 'Estofado de Ternera',
    'Chuletas de Cordero a la Plancha', 'Magret de Pato', 'Costillas BBQ', 'Secreto Ibérico',
    'Redondo de Ternera', 'Pollo al Curry', 'Carne Guisada', 'Escalopines al Marsala',
    'Cerdo a la Naranja', 'Hamburguesa Gourmet', 'Codillo Asado', 'Ternera en Salsa',
    'Pollo Tikka Masala', 'Filete de Ternera al Roquefort', 'Pechuga Rellena',
    'Costillas al Horno con Miel', 'Entrecot con Salsa Pimienta', 'Callos a la Madrileña',
    'Manitas de Cerdo',     'Conejo al Romero', 'Perdiz en Escabeche', 'Venado en Salsa',
    'Jabalí Estofado', 'Codornices con Uvas',
    'Osobuco a la Milanesa', 'Ternera Stroganoff', 'Pollo al Limón Griego',
    'Chuletas de Cerdo con Mostaza', 'Pechuga de Pato al Oporto', 'Confit de Pato',
    'Costillar de Cerdo Lacado', 'Medallones de Solomillo con Foie', 'Pollo Teriyaki',
    'Albóndigas Suecas', 'Tajine de Cordero', 'Asado Argentino',
    'Anticuchos Peruanos', 'Kebab de Cordero Casero', 'Wellington de Solomillo',
    'Chuletas de Cerdo al Horno con Manzana', 'Pollo Asado con Hierbas Provenzales', 'Ternera Guisada con Setas',
    'Conejo Guisado con Caracoles', 'Pechuga de Pollo Rellena de Espinacas', 'Cordero al Chilindrón',
    'Solomillo de Cerdo a la Pimienta', 'Costillas de Cerdo Glaseadas', 'Ternera al Vino Tinto con Patatas',
    'Pollo Rustido a la Catalana',
    'Ternera con Salsa de Trufa', 'Codornices en Escabeche de Miel', 'Pierna de Cordero al Romero',
    'Cerdo Agridulce Casero', 'Pollo al Pimentón de la Vera', 'Solomillo de Cerdo con Setas',
    'Magret de Pato con Cerezas', 'Hamburguesa de Wagyu', 'Carrilleras al Vino Blanco',
    'Costillas de Cordero al Horno', 'Osobuco con Gremolata', 'Ternera a la Jardinera',
    'Pollo al Horno con 40 Dientes de Ajo', 'Cochinita Pibil', 'Lomo de Cerdo en Leche'
  ],
  'Pescados': [
    // Nuevas Cookidoo
    'Salmón al Vapor Thermomix', 'Bacalao con Tomate Cookidoo', 'Merluza en Salsa Verde Thermomix', 'Lubina a la Sal Cookidoo', 'Dorada al Papillote Thermomix', 'Atún Encebollado Cookidoo', 'Rape en Salsa Marinera Thermomix', 'Rodaballo al Cava Cookidoo', 'Trucha a la Navarra Thermomix', 'Mero al Horno Cookidoo',
    'Bacalao al Pil-Pil', 'Merluza a la Vasca', 'Lubina a la Sal', 'Dorada al Horno',
    'Atún Encebollado', 'Rape a la Marinera', 'Salmón al Horno con Limón', 'Trucha a la Navarra',
    'Bacalao a la Vizcaína', 'Sardinas Asadas', 'Besugo al Horno', 'Rodaballo a la Plancha',
    'Merluza en Salsa Verde', 'Lenguado a la Meunière', 'Pez Espada a la Plancha',
    'Bacalao con Tomate', 'Salmón en Papillote', 'Corvina al Horno', 'Mero a la Gallega',
    'Bonito con Tomate', 'Pescadilla en Salsa', 'Rape Alangostado', 'Bacalao Dorado',
    'Emperador al Ajillo', 'Pescado Frito Andaluz', 'Salmón Teriyaki', 'Lomo de Bacalao Confitado',
    'Brochetas de Pez Espada', 'Papillote de Lubina', 'Ceviche de Corvina',
    'Tiradito de Lubina', 'Tataki de Atún', 'Merluza en Salsa Kokotxas',
    'Bacalao Skrei al Horno', 'Caballa en Escabeche', 'Pargo Rojo a la Plancha',
    'Rape al Azafrán', 'Rodaballo al Champagne', 'Jurel con Tomate y Pimientos',
    'Boquerones en Tempura', 'Salmón Gravlax Casero', 'Trucha con Almendras',
    'Lubina al Cava', 'Mero en Salsa de Azafrán', 'Corvina a la Espalda',
    'Dorada a la Sal con Patatas', 'Merluza Rebozada de la Abuela', 'Salmón con Salsa de Mostaza y Miel',
    'Rape al Horno con Verduras', 'Bacalao con Costra de Pistachos', 'Trucha Rellena de Jamón',
    'Sardinas en Papillote con Limón', 'Lubina al Horno con Hinojo', 'Pez Espada con Salsa de Alcaparras',
    'Merluza en Salsa de Almendras',
    'Corvina al Azafrán con Almejas', 'Rodaballo al Horno con Patatas', 'Pez Espada con Mojo Verde',
    'Salmón Glaseado con Soja y Miel', 'Lenguado al Cava', 'Bacalao con Samfaina',
    'Mero al Horno con Verduras', 'Dorada a la Espalda', 'Rape con Salsa de Marisco',
    'Atún a la Plancha con Sésamo', 'Besugo a la Donostiarra', 'Lubina con Hinojo y Naranja',
    'Caballa al Horno con Limón', 'Pargo al Horno con Especias', 'Bacalao Confitado a Baja Temperatura'
  ],
  'Mariscos': [
    // Nuevas Cookidoo
    'Gambas al Ajillo Thermomix', 'Mejillones al Vapor Cookidoo', 'Zamburiñas a la Plancha Thermomix', 'Pulpo a la Gallega Cookidoo', 'Almejas a la Marinera Thermomix', 'Ceviche de Langostinos Cookidoo', 'Tartar de Atún y Gambas Thermomix', 'Bogavante Cocido Cookidoo', 'Navajas al Ajillo Thermomix', 'Chipirones en su Tinta Cookidoo',
    'Langostinos a la Plancha', 'Gambas al Pil-Pil', 'Mejillones al Vapor', 'Almejas a la Marinera',
    'Navajas a la Plancha', 'Cigalas al Horno', 'Bogavante a la Plancha', 'Percebes al Natural',
    'Zamburiñas Gratinadas', 'Vieiras a la Gallega', 'Centollo al Horno', 'Nécoras Cocidas',
    'Langosta a la Americana', 'Buey de Mar Cocido', 'Carabineros al Ajillo',
    'Gambas Rojas de Huelva', 'Berberechos al Vapor', 'Ostras al Natural',
    'Cangrejos de Río', 'Pulpo a la Brasa', 'Sepia a la Plancha', 'Chipirón en su Tinta',
    'Calamares Rellenos', 'Salpicón de Marisco', 'Zarzuela de Marisco',
    'Mariscada Gallega', 'Parrillada de Marisco', 'Cóctel de Gambas',
    'Brochetas de Langostinos', 'Tartar de Gamba Roja',
    'Arroz de Bogavante y Carabineros', 'Langostinos al Whisky', 'Mejillones Tigre',
    'Gambas con Gabardina', 'Navajas al Albariño', 'Bogavante Thermidor',
    'Cigalas a la Plancha con Sal Gruesa', 'Coquinas al Ajillo', 'Centollo Relleno',
    'Zamburiñas al Cava', 'Pulpo Braseado con Patata', 'Carpaccio de Vieira',
    'Chipirones Encebollados', 'Kokotxas de Merluza al Pil-Pil', 'Txangurro a la Donostiarra',
    'Gambas al Cava con Ajo', 'Navajas con Salsa de Limón', 'Almejas con Vino Blanco y Perejil',
    'Mejillones en Salsa de Tomate', 'Langostinos al Horno con Sal Gruesa', 'Cigalas con Vinagreta',
    'Sepia a la Brasa con Alioli', 'Pulpo con Puré de Patata', 'Calamares Rellenos de Marisco',
    'Berberechos a la Marinera',
    'Bogavante al Horno con Mantequilla', 'Langostinos en Tempura', 'Mejillones a la Provenzal',
    'Gambas Rojas al Horno', 'Navajas al Limón y Ajo', 'Cigalas con Vinagreta de Cítricos',
    'Centollo al Txakoli', 'Vieiras Gratinadas con Cava', 'Carabineros al Horno con Sal',
    'Bogavante con Arroz Cremoso', 'Langostinos al Whisky', 'Percebes al Vapor de Laurel',
    'Zamburiñas con Jamón Ibérico', 'Salpicón de Bogavante', 'Cóctel de Langostinos Premium'
  ],
  'Verduras': [
    // Nuevas Cookidoo
    'Pisto Manchego Thermomix', 'Verduras al Vapor Cookidoo', 'Espinacas a la Catalana Thermomix', 'Calabacines Rellenos Cookidoo', 'Berenjenas Parmesana Thermomix', 'Coliflor Gratinada Cookidoo', 'Puré de Patatas Thermomix', 'Guisantes con Jamón Cookidoo', 'Alcachofas al Limón Thermomix', 'Ratatouille Cookidoo',
    'Pisto Manchego', 'Tumbet Mallorquín', 'Escalivada Catalana', 'Espárragos a la Plancha',
    'Menestra de Verduras', 'Samfaina', 'Pimientos Rellenos', 'Berenjenas Rellenas',
    'Calabacines Rellenos', 'Alcachofas a la Plancha', 'Judías Verdes con Jamón',
    'Espinacas a la Catalana', 'Coliflor Gratinada', 'Champiñones Rellenos', 'Borraja con Patatas',
    'Cardos con Almendras', 'Acelgas Rehogadas', 'Cardo en Salsa de Almendras',
    'Brócoli al Vapor con Alioli', 'Verduras al Horno', 'Ratatouille', 'Tempura de Verduras',
    'Wok de Verduras', 'Parrillada de Verduras', 'Verduras en Escabeche',
    'Pimientos Asados', 'Tomates Rellenos', 'Patatas Revolconas', 'Patatas a la Importancia',
    'Patatas a lo Pobre',
    'Berenjena al Miso', 'Calabacín Relleno de Quinoa', 'Coliflor al Tandoori',
    'Brócoli al Wok con Sésamo', 'Judías Verdes Salteadas con Almendras', 'Pimientos del Piquillo Rellenos',
    'Coles de Bruselas al Horno', 'Boniato Asado con Especias', 'Hojas de Parra Rellenas',
    'Pencas de Acelga Rebozadas', 'Guisantes con Jamón', 'Habas Baby con Menta',
    'Espárragos Blancos con Vinagreta', 'Chips de Kale al Horno', 'Champiñones Portobello Rellenos',
    'Alcachofas Confitadas al Limón', 'Calabacín Gratinado con Queso', 'Pimientos Asados con Anchoas',
    'Revuelto de Espárragos Trigueros', 'Ensalada Tibia de Verduras al Horno', 'Boniato al Horno con Romero',
    'Tomates Provenzales al Horno', 'Crema de Verduras Asadas', 'Judías Verdes con Tomate Casero',
    'Menestra Navarra Tradicional',
    'Verduras Gratinadas con Parmesano', 'Timbal de Verduras Asadas', 'Mousse de Espárragos Verdes',
    'Flores de Calabacín Rellenas', 'Chips de Remolacha al Horno', 'Cardo con Bechamel Gratinado',
    'Setas al Ajillo con Jamón', 'Coles Rellenas de Carne', 'Patatas Hasselback con Romero',
    'Endivias Braseadas al Caramelo', 'Calabaza Asada con Tahini', 'Espárragos Blancos con Mahonesa',
    'Puerros Gratinados al Horno', 'Ajo Asado con Tostadas', 'Berenjenas a la Parmesana'
  ],
  'Legumbres': [
    // Nuevas Cookidoo
    'Lentejas con Chorizo Thermomix', 'Fabada Asturiana Cookidoo', 'Garbanzos con Espinacas Thermomix', 'Hummus de Garbanzos Cookidoo', 'Potaje de Vigilia Thermomix', 'Alubias Pintas Cookidoo', 'Cocido Madrileño Thermomix', 'Lentejas al Curry Cookidoo', 'Frijoles Refritos Thermomix', 'Garbanzos al Horno Cookidoo',
    'Cocido Madrileño', 'Fabada Asturiana', 'Lentejas con Chorizo', 'Garbanzos con Espinacas',
    'Alubias de Tolosa', 'Potaje de Vigilia', 'Judiones de la Granja', 'Pochas con Almejas',
    'Lentejas Estofadas', 'Garbanzos con Bacalao', 'Marmitako', 'Potaje de Garbanzos',
    'Fabes con Almejas', 'Lentejas con Verduras', 'Garbanzos con Callos',
    'Alubias con Oreja', 'Habas a la Catalana', 'Pote Asturiano', 'Olla Podrida',
    'Michirones Murcianos', 'Rancho Canario', 'Garbanzos Fritos', 'Lentejas Pardinas',
    'Judías con Chorizo', 'Escudella i Carn d\'Olla', 'Potaje Canario',
    'Fabada de Marisco', 'Lentejas al Curry',     'Hummus de Garbanzos', 'Dal de Lentejas Rojas',
    'Alubias con Verduras', 'Potaje de Habichuelas', 'Garbanzos al Curry',
    'Lentejas con Setas', 'Frijoles Refritos', 'Alubias Pintas con Arroz',
    'Garbanzos con Langostinos', 'Potaje de Cuaresma', 'Lentejas con Arroz y Cebolla',
    'Fabes con Almejas Premium', 'Garbanzos Estofados con Verduras', 'Judiones con Chorizo',
    'Lentejas Beluga con Salmón', 'Cassoulet Francés', 'Chili con Carne de Judías',
    'Garbanzos con Espinacas y Huevo', 'Lentejas con Arroz Basmati', 'Alubias Blancas con Almejas',
    'Fabada de Verduras', 'Potaje de Vigilia Tradicional', 'Garbanzos Fritos con Especias',
    'Estofado de Judiones con Chorizo', 'Lentejas con Verduras de Temporada', 'Garbanzos al Horno Crujientes',
    'Potaje de Habas con Jamón',
    'Garbanzos con Bacalao y Espinacas', 'Lentejas Rojas al Curry Thai', 'Alubias con Perdiz',
    'Judías Pintas con Chorizo y Morcilla', 'Garbanzos Estofados con Calabaza', 'Fabada de Marisco Premium',
    'Cocido Maragato', 'Lentejas con Cordero', 'Potaje de Vigilia con Espinacas',
    'Alubias Negras con Cerdo', 'Hummus de Alubias Blancas', 'Garbanzos con Pulpo',
    'Lentejas Caviar con Salmón Ahumado', 'Feijoada Brasileña', 'Garbanzos con Chorizo y Huevo'
  ],
  'Guisos': [
    'Estofado de Ternera con Patatas', 'Guiso de Pollo con Verduras', 'Suquet de Peix',
    'Caldereta de Cordero', 'Guiso Marinero', 'Fricandó Catalán', 'Caldereta Extremeña',
    'Guiso de Patatas con Costillas', 'Caldereta de Langosta', 'Guiso de Judías con Chorizo',
    'Estofado de Cerdo', 'Guiso de Sepia con Patatas', 'Caldereta de Cabrito',
    'Guiso de Garbanzos con Bacalao', 'Marmitako Vasco', 'Guiso de Rape con Almejas',
    'Caldereta de Verduras', 'Estofado de Buey', 'Guiso de Pollo al Chilindrón',
    'Chanfaina Salmantina', 'Pepitoria de Gallina', 'Guiso Castellano',
    'Caldereta Menorquina', 'Ragú de Jabalí', 'Estofado Irlandés',
    'Guiso de Lentejas con Perdiz', 'Guisado de Rabo', 'Caldereta de Pescador',
    'Estofado Provenzal', 'Cazuela de Patatas a la Riojana',
    'Guiso de Ternera al Vino Tinto', 'Estofado de Cerdo con Castañas', 'Caldereta de Cabra',
    'Guiso de Albóndigas de Sepia', 'Estofado Marroquí de Cordero', 'Cocido Montañés',
    'Rancho Canario Premium', 'Guiso de Pulpo con Garbanzos', 'Caldereta de Bogavante Menorquina',
    'Estofado de Carrillera al PX', 'Guiso de Setas y Castañas', 'Olla Gitana Murciana',
    'Caldereta de Toro', 'Guiso de Pavo con Ciruelas', 'Potaje de Berros Canario',
    'Estofado de Ternera con Cerveza', 'Guiso de Pollo con Pimientos', 'Caldereta de Marisco Gallega',
    'Guiso de Patatas con Sepia', 'Estofado de Cerdo con Manzana', 'Caldereta de Verduras de Temporada',
    'Guiso de Conejo con Romero', 'Estofado de Rabo de Toro al PX', 'Guiso de Garbanzos con Costillas',
    'Cazuela de Fideos con Almejas',
    'Caldereta de Langosta Premium', 'Estofado de Venado al Vino', 'Guiso de Albóndigas con Sepia',
    'Cocido Montañés Cántabro', 'Caldereta Extremeña de Cabrito', 'Guiso de Pato con Nabos',
    'Estofado de Cerdo al Curry', 'Ragú de Jabalí con Polenta', 'Guiso de Pulpo con Patatas',
    'Caldereta de Buey a la Cerveza', 'Estofado de Ternera con Ciruelas', 'Guiso de Cordero al Romero',
    'Cazuela de Pollo con Champiñones', 'Estofado de Conejo al Tomillo', 'Caldereta de Pescador del Norte'
  ],
  'Postres': [
    // 100 Postres nuevos
    'Tarta de Queso La Viña Thermomix', 'Flan de Huevo Cookidoo', 'Natillas de Vainilla Thermomix', 'Arroz con Leche Cremoso Cookidoo', 'Brownie de Chocolate Thermomix', 'Tarta de Manzana Fácil Cookidoo', 'Bizcocho de Yogur Esponjoso Thermomix', 'Mousse de Limón Cookidoo', 'Tiramisú Auténtico Thermomix', 'Coulant de Chocolate Cookidoo',
    'Crema Catalana Thermomix', 'Tarta de Santiago Cookidoo', 'Helado de Fresa Thermomix', 'Sorbete de Mango Cookidoo', 'Cheesecake de Frutos Rojos Thermomix', 'Magdalenas Clásicas Cookidoo', 'Donuts Caseros Thermomix', 'Panna Cotta de Frambuesa Cookidoo', 'Tarta Tres Chocolates Thermomix', 'Profiteroles Rellenos Cookidoo',
    'Tarta de Zanahoria Thermomix', 'Galletas de Mantequilla Cookidoo', 'Bizcocho de Limón Thermomix', 'Flan de Queso Cookidoo', 'Mousse de Chocolate Blanco Thermomix', 'Tarta de Fresa y Nata Cookidoo', 'Cupcakes de Vainilla Thermomix', 'Tarta Sacher Cookidoo', 'Panacotta de Café Thermomix', 'Tarta de Limón Merengada Cookidoo',
    'Bizcocho de Naranja Thermomix', 'Red Velvet Cake Cookidoo', 'Tarta de Almendra Thermomix', 'Natillas de Chocolate Cookidoo', 'Pudding de Pan Thermomix', 'Tarta de Queso sin Horno Cookidoo', 'Bizcocho de Mármol Thermomix', 'Tarta de Frutas Frescas Cookidoo', 'Crumble de Manzana Thermomix', 'Flan de Café Cookidoo',
    'Tarta de Galletas de la Abuela Thermomix', 'Mousse de Mango Cookidoo', 'Cheesecake Japonés Thermomix', 'Bizcocho de Plátano Cookidoo', 'Galletas de Chocolate Crinkles Thermomix', 'Tarta de Pera y Almendras Cookidoo', 'Helado de Vainilla Casero Thermomix', 'Sorbete de Limón y Cava Cookidoo', 'Bavarois de Fresa Thermomix', 'Tarta de Turrón Cookidoo',
    'Bizcocho de Zanahoria y Nueces Thermomix', 'Tarta de Queso y Arándanos Cookidoo', 'Flan de Turrón Thermomix', 'Mousse de Turrón Cookidoo', 'Cheesecake de Dulce de Leche Thermomix', 'Bizcocho de Manzana y Canela Cookidoo', 'Galletas de Avena y Pasas Thermomix', 'Tarta de Coco y Piña Cookidoo', 'Helado de Chocolate y Avellanas Thermomix', 'Sorbete de Mandarina Cookidoo',
    'Brazo de Gitano Relleno Thermomix', 'Tarta de Yema Tostada Cookidoo', 'Flan de Leche Condensada Thermomix', 'Mousse de Queso y Frambuesa Cookidoo', 'Cheesecake de Oreo Thermomix', 'Bizcocho de Chocolate Blanco Cookidoo', 'Galletas de Jengibre Thermomix', 'Tarta de Melocotón en Almíbar Cookidoo', 'Helado de Pistacho Thermomix', 'Sorbete de Frambuesa Cookidoo',
    'Tarta de Queso y Mango Thermomix', 'Bizcocho de Calabaza Cookidoo', 'Flan de Coco y Piña Thermomix', 'Mousse de Maracuyá Cookidoo', 'Cheesecake de Limón Thermomix', 'Bizcocho de Almendras Cookidoo', 'Galletas de Coco Thermomix', 'Tarta de Piña Invertida Cookidoo', 'Helado de Stracciatella Thermomix', 'Sorbete de Sandía Cookidoo',
    'Tarta de Queso y Chocolate Thermomix', 'Bizcocho de Coco Cookidoo', 'Flan de Naranja Thermomix', 'Mousse de Naranja Cookidoo', 'Cheesecake de Frambuesa Thermomix', 'Bizcocho de Nueces Cookidoo', 'Galletas de Nuez Thermomix', 'Tarta de Cerezas Cookidoo', 'Helado de Turrón Thermomix', 'Sorbete de Melón Cookidoo',
    'Tarta de Queso y Caramelo Thermomix', 'Bizcocho de Café Cookidoo', 'Flan de Caramelo Thermomix', 'Mousse de Caramelo Cookidoo', 'Cheesecake de Vainilla Thermomix', 'Bizcocho de Vainilla Cookidoo', 'Galletas de Vainilla Thermomix', 'Tarta de Moras Cookidoo', 'Helado de Café Thermomix', 'Sorbete de Piña Cookidoo',
    // Fin Postres Nuevos
    'Crema Catalana', 'Flan de Huevo', 'Natillas Caseras', 'Arroz con Leche',
    'Tarta de Santiago', 'Leche Frita', 'Torrijas', 'Churros con Chocolate',
    'Filloas Gallegas', 'Buñuelos de Viento', 'Pestiños Andaluces', 'Rosquillas de San Isidro',
    'Quesada Pasiega', 'Pantxineta Vasca', 'Tocinillo de Cielo', 'Bienmesabe Canario',
    'Miguelitos de la Roda', 'Sobaos Pasiegos', 'Ensaimada Mallorquina', 'Tarta de Queso Vasca',
    'Coulant de Chocolate', 'Tiramisú', 'Panna Cotta', 'Mousse de Chocolate',
    'Tarta de Manzana', 'Profiteroles', 'Crème Brûlée', 'Helado de Vainilla Casero',
    'Sorbete de Limón', 'Fresas con Nata', 'Tarta de Tres Chocolates', 'Flan de Coco',
    'Arroz con Leche Cremoso', 'Bizcocho de Chocolate Fundido', 'Mousse de Limón',
    'Tarta de Almendras', 'Crema Pastelera', 'Natillas de Chocolate', 'Flan de Café',
    'Postre de Queso con Frutos Rojos', 'Pannacotta de Vainilla', 'Coulant de Caramelo',
    'Tarta Helada de Turrón', 'Cremoso de Mango', 'Mousse de Maracuyá', 'Sorbete de Fresa',
    'Helado de Dulce de Leche', 'Parfait de Café',     'Semifrío de Chocolate Blanco',
    'Tarta de Frutas del Bosque',
    'Crème Brûlée de Vainilla', 'Pannacotta de Frutos Rojos', 'Tiramisú de Matcha',
    'Mousse de Frambuesa', 'Cheesecake Japonés', 'Tarta de Limón Merengada',
    'Brownie de Chocolate Blanco', 'Goxua Vasca', 'Torrija Caramelizada',
    'Crumble de Manzana', 'Bizcocho de Zanahoria', 'Helado de Pistacho Casero',
    'Sorbete de Maracuyá', 'Postre de Arroz con Chocolate', 'Delicias de Turrón',
    'Tarta de Pistacho y Frambuesa', 'Fondant de Chocolate Negro', 'Semifrío de Turrón y Almendras',
    'Mousse de Yogur con Mango', 'Panna Cotta de Café', 'Crema de Vainilla con Caramelo',
    'Tarta Fina de Pera y Almendra',     'Helado de Stracciatella Casero', 'Pastel de Tres Leches',
    'Flan de Queso Philadelphia', 'Volcán de Dulce de Leche', 'Mousse de Coco y Lima',
    'Tarta de Zanahoria y Nueces', 'Crumble de Frutas del Bosque', 'Bavarois de Fresa',
    'Carlota de Limón', 'Profiteroles con Chocolate Caliente', 'Tarta de Chocolate Blanco y Frambuesas',
    'Sorbete de Mandarina con Cava', 'Bizcocho de Naranja y Almendra',
    'Cheesecake de Dulce de Leche', 'Bomba de Chocolate', 'Macadamia Nut Cookies',
    'Pavlova de Frutos Rojos', 'Mousse de Turrón', 'Tarta de Queso con Arándanos',
    'Tarta de Limón y Merengue', 'Soufflé de Vainilla', 'Macedonia Tropical'
  ],
  'Repostería': [
    'Bizcocho de Yogur', 'Tarta de Chocolate', 'Galletas de Mantequilla', 'Magdalenas Caseras',
    'Brownie de Chocolate', 'Cheesecake New York', 'Carrot Cake', 'Red Velvet',
    'Cupcakes de Vainilla', 'Donuts Caseros', 'Palmeras de Hojaldre', 'Rosquillas Tontas y Listas',
    'Polvorones Caseros', 'Mantecados de Estepa', 'Alfajores', 'Macarons Franceses',
    'Tarta Tatín', 'Milhojas', 'Tarta de Fresas', 'Bizcocho de Limón',
    'Cookies de Chocolate', 'Muffins de Arándanos', 'Tartaletas de Frutas', 'Brazo de Gitano',
    'Roscón de Reyes', 'Panettone Casero', 'Strudel de Manzana', 'Eclairs de Chocolate',
    'Crêpes Suzette', 'Baklava',
    'Tarta Ópera', 'Canelés de Burdeos', 'Pavlova de Frutas', 'Mochi Japonés',
    'Dacquoise de Almendras', 'Financiers de Mantequilla', 'Tarta Sacher',
    'Bizcocho de Plátano y Nueces', 'Galletas Linzer', 'Shortbread Escocés',
    'Kouign-Amann', 'Pastel de Zanahoria y Jengibre', 'Cinnamon Rolls',
    'Palmeras de Chocolate', 'Roscos de Anís'
  ],
  'Pan y Masas': [
    'Pan de Pueblo', 'Coca de San Juan', 'Empanada Gallega de Atún', 'Pan de Cristal',
    'Hogaza Castellana', 'Chapata Italiana', 'Pan de Centeno', 'Focaccia de Romero',
    'Baguette Francesa', 'Pan de Semillas', 'Pan de Molde Casero', 'Pan de Espelta',
    'Bollos Preñados', 'Pan de Ajo', 'Pita Casera', 'Naan Bread',
    'Pan de Maíz', 'Torta de Aceite', 'Pan Integral', 'Panecillos de Leche',
    'Masa de Pizza Casera', 'Masa de Empanada', 'Masa Quebrada', 'Hojaldre Casero',
    'Masa de Croissant', 'Pan Brioche', 'Bagels Caseros', 'Blinis',
    'Pan de Nueces', 'Tortas de Anís',
    'Pan de Aceitunas', 'Chapata de Tomates Secos', 'Pan de Cerveza',
    'Trenzas de Pan Dulce', 'Pretzels Caseros', 'Pan de Centeno con Semillas',
    'Grissini Italianos', 'Pan de Molde Integral', 'Bollos de Leche con Pasas',
    'Coca de Llanda', 'Pan de Queso Brasileño', 'Tortillas de Harina Caseras',
    'Pan de Espelta y Miel', 'Ciabatta de Aceitunas', 'Rolls de Canela Salados'
  ],
  'Salsas': [
    'Salsa de Tomate Casera', 'Alioli', 'Salsa Romesco', 'Salsa Brava',
    'Mojo Picón', 'Mojo Verde', 'Salsa Española', 'Salsa Bechamel',
    'Vinagreta Clásica', 'Pesto Genovés', 'Salsa Chimichurri', 'Salsa Barbacoa',
    'Salsa Vizcaína', 'Salsa Verde', 'Salsa de Pimientos del Piquillo',
    'Salsa de Cabrales', 'Salsa al Pedro Ximénez', 'Salsa de Setas',
    'Salsa de Almendras', 'Salsa Agridulce', 'Mayonesa Casera', 'Salsa Tártara',
    'Salsa César', 'Salsa Holandesa', 'Pesto Rojo', 'Salsa de Yogur',
    'Salsa Teriyaki Casera', 'Chutney de Mango',     'Salsa Sriracha Casera', 'Sofrito Base',
    'Salsa Mornay', 'Salsa de Mostaza y Miel', 'Salsa Worcestershire Casera',
    'Salsa de Ostras', 'Gremolata', 'Salsa de Tomate Seco',
    'Chimichurri Rojo', 'Salsa Ponzu', 'Salsa de Soja y Jengibre',
    'Aliño de Limón y Hierbas', 'Salsa de Yogur y Pepino', 'Mojo de Cilantro',
    'Salsa Harissa', 'Vinagreta de Frambuesa', 'Sofrito de Verduras Premium'
  ],
  'Bebidas': [
    'Sangría Española', 'Tinto de Verano', 'Agua de Valencia', 'Horchata Valenciana',
    'Granizado de Limón', 'Chocolate a la Taza', 'Café Bombón', 'Queimada Gallega',
    'Rebujito', 'Calimocho', 'Mojito Clásico', 'Piña Colada',
    'Smoothie de Frutas', 'Zumo de Naranja Natural', 'Limonada Casera', 'Batido de Chocolate',
    'Té Chai Latte', 'Café Irlandés', 'Gin Tonic Especial', 'Margarita',
    'Cóctel de Cava', 'Ponche Navideño', 'Sidra Caliente', 'Leche Merengada',
    'Granizado de Café', 'Batido de Fresas', 'Zumo Detox Verde', 'Infusión de Jengibre',
    'Chocolate Caliente con Especias', 'Limonada de Frutos Rojos',
    'Agua Fresca de Pepino y Limón', 'Kombucha Casera', 'Golden Milk de Cúrcuma',
    'Café Dalgona', 'Frappe de Café', 'Batido de Proteínas Natural',
    'Cóctel de Frutas sin Alcohol', 'Ponche de Frutas', 'Licuado de Papaya y Mango',
    'Zumo de Zanahoria y Manzana', 'Chai Masala Casero', 'Mate Argentino con Hierbas',
    'Aperol Spritz Casero', 'Tinto de Verano Premium', 'Horchata de Chufa Artesanal'
  ],
  'Tapas': [
    'Patatas Alioli', 'Jamón Serrano con Pan', 'Queso Manchego con Membrillo',
    'Tortillitas de Camarones', 'Chipirones a la Andaluza', 'Puntillitas Fritas',
    'Migas Extremeñas', 'Gildas Vascas', 'Tigres (Mejillones Rellenos)', 'Oreja a la Plancha',
    'Morcilla de Burgos', 'Chorizo a la Sidra', 'Habas con Jamón', 'Revuelto de Ajetes',
    'Torreznos de Soria', 'Zarajos Conquenses', 'Flamenquines Cordobeses',
    'Berenjenas con Miel', 'Espetos de Sardinas', 'Mollejas al Ajillo',
    'Pintxo de Txistorra', 'Pintxo de Tortilla', 'Chistorra al Vino', 'Morcilla con Pimientos',
    'Sardinas en Aceite', 'Boquerones Fritos', 'Albóndigas de Sepia', 'Pimientos Rellenos de Bacalao',
    'Calamar a la Plancha', 'Pulpitos en Salsa',
    'Patatas con Mojo Picón', 'Cogollos con Anchoas', 'Montadito de Lomo con Pimientos',
    'Pincho de Pulpo', 'Chistorra Frita', 'Bocadillo de Calamares',
    'Zamburiñas a la Plancha', 'Huevos de Codorniz con Jamón', 'Ahumados con Tostadas',
    'Mini Empanadas de Atún', 'Patatas a la Riojana', 'Revuelto de Morcilla',
    'Mollete de Antequera', 'Tostas de Anchoa y Pimiento', 'Pinchos de Solomillo'
  ],
  'Desayunos': [
    'Tostada con Tomate y Aceite', 'Churros con Chocolate', 'Porras Madrileñas',
    'Tortitas Americanas', 'Gachas Manchegas', 'Huevos Revueltos con Jamón',
    'Croissant de Mantequilla', 'Bowl de Açaí', 'Tostada de Aguacate',
    'Huevos Benedictinos', 'Tortilla Francesa', 'Pan con Tumaca',
    'Granola Casera', 'Overnight Oats', 'Smoothie Bowl', 'Crepes de Nutella',
    'Gofres Belgas', 'Muffins de Plátano', 'Bizcocho para Desayuno',
    'Tostada de Salmón Ahumado', 'Bocadillo de Tortilla', 'Huevos a la Flamenca',
    'Migas con Uvas', 'Pan con Chocolate', 'Bocadillo de Calamares',
    'Mollete con Manteca Colorá', 'Pincho de Tortilla', 'Tostada con Sobrasada y Miel',
    'Yogur con Frutas y Miel', 'Batido Energético de Avena',
    'Shakshuka', 'Huevos Turcos con Yogur', 'Avena Horneada con Frutas',
    'Chia Pudding con Mango', 'Bagels con Cream Cheese', 'Brioche Tostado con Mermelada',
    'Egg Muffins de Verduras', 'Porridge de Avena con Canela', 'Tostada Francesa',
    'Hot Cakes de Plátano', 'Bowl de Smoothie Verde', 'Panqueques de Ricotta',
    'Croque Monsieur', 'Huevos en Nube', 'Desayuno Inglés Completo'
  ],
  'Cenas Ligeras': [
    'Sopa de Verduras', 'Tortilla de Calabacín', 'Ensalada Templada', 'Revuelto de Setas',
    'Crema de Verduras', 'Merluza al Vapor', 'Pollo a la Plancha', 'Salmón con Verduras',
    'Wrap de Pollo', 'Bowl de Quinoa', 'Tosta de Hummus', 'Gazpacho Ligero',
    'Verduras Salteadas', 'Omelette Francesa', 'Sopa Miso con Tofu', 'Cuscús con Verduras',
    'Ensalada de Pollo', 'Rollitos de Pavo', 'Brochetas de Pollo', 'Hamburguesa de Pollo',
    'Pasta Integral con Verduras', 'Pescado al Papillote', 'Ensalada de Atún',
    'Crema de Calabacín Light', 'Pollo al Limón', 'Tortilla de Espárragos',
    'Revuelto de Espinacas', 'Sopa de Miso',     'Verduras al Wok', 'Pechugas de Pollo al Curry Ligero',
    'Sopa de Calabacín y Menta', 'Rollitos de Lechuga con Pollo', 'Tataki de Atún Ligero',
    'Ensalada de Garbanzos Light', 'Salmón al Vapor con Limón', 'Tortilla de Claras con Espárragos',
    'Ceviche Ligero de Corvina', 'Poke Bowl de Salmón', 'Noodles de Calabacín',
    'Berenjenas al Horno Rellenas Light', 'Tacos de Lechuga con Pollo', 'Carpaccio de Calabacín',
    'Gazpacho de Pepino', 'Brochetas de Verduras a la Plancha', 'Copa de Yogur y Frutas'
  ],
  'Especial Fiestas': [
    'Turrón de Jijona', 'Turrón de Alicante', 'Polvorones Navideños', 'Roscón de Reyes',
    'Cordero Asado Navideño', 'Besugo de Nochebuena', 'Sopa de Almendras', 'Lombarda Navideña',
    'Cochinillo de Nochevieja', 'Langostinos de Navidad', 'Canapés Festivos',
    'Hojaldre de Salmón', 'Corona de Navidad', 'Pavo Relleno', 'Compota de Manzana Navideña',
    'Mazapán Casero', 'Mantecados Artesanos', 'Panellets Catalanes', 'Huesos de Santo',
    'Buñuelos de Todos los Santos', 'Pestiños de Semana Santa', 'Monas de Pascua',
    'Torrijas de Semana Santa', 'Hornazo Salmantino', 'Mona de Chocolate',
    'Coca de Sant Joan', 'Roscos de Vino', 'Flores de Carnaval',     'Filloas de Carnaval',
    'Leche Frita de Semana Santa',
    'Roscón de Reyes Relleno de Nata', 'Turrón de Yema', 'Cochinillo de Segovia Navideño',
    'Sopa de Mariscos Navideña', 'Canapés de Foie y Reducción', 'Croquetas de Puchero',
    'Hojaldre de Champiñones y Trufa', 'Regalos Comestibles Navideños', 'Cóctel de Nochevieja',
    'Panettone de Chocolate', 'Biscotti de Almendras', 'Stollen Alemán',
    'Coulant de Turrón', 'Sorbete de Cava', 'Bombones Caseros de Navidad'
  ]
};

const ingredientSets: string[][] = [
  ['200g jamón ibérico', '500ml leche', '50g mantequilla', '50g harina', '2 huevos', 'pan rallado', 'aceite de oliva'],
  ['1kg patatas', 'aceite de oliva', '2 dientes de ajo', '1 cucharada pimentón', 'salsa brava', 'sal'],
  ['500g gambas', '6 dientes de ajo', 'guindilla', 'aceite de oliva virgen extra', 'perejil', 'sal'],
  ['400g pimientos de padrón', 'aceite de oliva', 'sal gruesa'],
  ['1 cochinillo de 4-5kg', 'manteca de cerdo', 'laurel', 'tomillo', 'sal', 'agua'],
  ['1kg rabo de toro', '2 zanahorias', '1 cebolla', 'vino tinto', 'tomate', 'pimentón'],
  ['6 yemas de huevo', '200g azúcar', '500ml leche', 'canela en rama', 'piel de limón', 'maizena'],
  ['6 huevos', '200g azúcar', '1L leche', 'vainilla', 'caramelo líquido'],
];

const stepSets = [
  ['Preparar todos los ingredientes y cortarlos según se indica.', 'Calentar aceite en una sartén a fuego medio-alto.', 'Sofreír los ingredientes principales hasta que estén dorados.', 'Añadir las especias y el condimento, remover bien.', 'Cocinar a fuego lento durante el tiempo indicado.', 'Rectificar de sal y pimienta.', 'Servir caliente con la guarnición elegida.'],
  ['Precalentar el horno a 180°C.', 'Mezclar los ingredientes secos en un bol grande.', 'Incorporar los ingredientes húmedos y mezclar hasta obtener una masa homogénea.', 'Verter en el molde previamente engrasado.', 'Hornear durante el tiempo indicado o hasta que un palillo salga limpio.', 'Dejar enfriar antes de desmoldar.', 'Decorar al gusto y servir.'],
  ['Lavar y pelar todas las verduras necesarias.', 'Cortar en trozos uniformes para una cocción pareja.', 'Rehogar la cebolla y el ajo hasta que estén transparentes.', 'Incorporar el resto de verduras y cocinar 10 minutos.', 'Añadir el caldo y dejar cocinar a fuego medio.', 'Triturar si se desea una textura más fina.', 'Servir con un chorrito de aceite de oliva virgen extra.'],
  ['Preparar la mise en place con todos los ingredientes medidos.', 'Marinar la proteína principal con las especias durante al menos 30 minutos.', 'Calentar el aceite en una cazuela amplia.', 'Sellar la carne/pescado a fuego fuerte.', 'Incorporar las verduras y el líquido de cocción.', 'Tapar y cocinar a fuego lento hasta que esté tierno.', 'Emplatar con cuidado y decorar con hierbas frescas.'],
];

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function generateRecipes(): Recipe[] {
  const recipes: Recipe[] = [];
  let id = 1;
  let thermomixCount = 0;
  let thermomixPostresCount = 0;
  const TOTAL_THERMOMIX = 450;
  const THERMOMIX_POSTRES = 150;

  for (const category of categories) {
    const names = recipeNames[category] || [];

    for (let i = 0; i < names.length; i++) {
      const seed = id * 13 + i * 7;
      const rand = seededRandom(seed);

      // Determinar el tipo basado en las cuotas y en el nombre
      let type: 'tradicional' | 'thermomix';
      const isThermomixName = names[i].includes('Thermomix') || names[i].includes('Cookidoo');

      if (isThermomixName) {
        type = 'thermomix';
        thermomixCount++;
        if (category === 'Postres') thermomixPostresCount++;
      } else if (category === 'Postres' && thermomixPostresCount < THERMOMIX_POSTRES) {
        type = 'thermomix';
        thermomixPostresCount++;
        thermomixCount++;
      } else if (category !== 'Postres' && thermomixCount < TOTAL_THERMOMIX - THERMOMIX_POSTRES && rand > 0.45) {
        type = 'thermomix';
        thermomixCount++;
      } else {
        type = 'tradicional';
      }

      const difficulties: ('Fácil' | 'Media' | 'Difícil')[] = ['Fácil', 'Media', 'Difícil'];
      const difficulty = difficulties[Math.floor(seededRandom(seed + 1) * 3)];
      const time = `${Math.floor(seededRandom(seed + 2) * 120) + 10} min`;
      const servings = Math.floor(seededRandom(seed + 3) * 8) + 1;
      const ingredientSet = ingredientSets[i % ingredientSets.length];
      const stepsSet = stepSets[Math.floor(seededRandom(seed + 4) * stepSets.length)];
      const rating = Math.round((seededRandom(seed + 5) * 2 + 3) * 10) / 10;
      const calories = Math.floor(seededRandom(seed + 6) * 800) + 100;
      const region = regions[Math.floor(seededRandom(seed + 7) * regions.length)];
      const image = getRecipeImage(names[i], category, id);
      const numTags = Math.floor(seededRandom(seed + 9) * 4) + 1;
      const recipeTags: string[] = [];
      for (let t = 0; t < numTags; t++) {
        const tag = tagOptions[Math.floor(seededRandom(seed + 10 + t) * tagOptions.length)];
        if (!recipeTags.includes(tag)) recipeTags.push(tag);
      }

      const isDetailed = seededRandom(seed + 11) > 0.4;
      const cooksnaps = Math.floor(seededRandom(seed + 12) * 300);
      const reviewsNum = Math.floor(seededRandom(seed + 13) * 150) + 5;

      const numSimulatedReviews = Math.floor(seededRandom(seed + 14) * 3) + 2;
      const recipeReviews: Review[] = [];
      const reviewNames = ['MariaG', 'ChefCarlos', 'Ana.Cocina', 'Pedro_88', 'LuciaFoodie', 'JuanCook', 'Laura_M', 'MiguelT'];
      const reviewComments = [
        '¡Me encantó! Muy fácil de seguir.',
        'La receta sale perfecta, aunque le añadí un poco más de sal.',
        'Impresionante, a toda la familia le gustó.',
        'Buena receta, pero el tiempo de cocción me llevó 10 minutos más.',
        '¡Un éxito total! Queda guardada en mis favoritos para siempre.',
        'Es mi primera vez haciendo esto y me quedó riquísimo.',
        'Excelente paso a paso, muy bien explicado.'
      ];

      for(let r=0; r<numSimulatedReviews; r++) {
        const reviewRating = rating > 4 ? 4 + (seededRandom(seed + 20 + r)) : 3 + (seededRandom(seed + 20 + r)*2);
        recipeReviews.push({
          id: id * 100 + r,
          userName: reviewNames[Math.floor(seededRandom(seed + 21 + r) * reviewNames.length)],
          rating: Math.round(reviewRating * 2) / 2, // 3.5, 4.0, 4.5, etc.
          comment: reviewComments[Math.floor(seededRandom(seed + 22 + r) * reviewComments.length)],
          date: `Hace ${Math.floor(seededRandom(seed + 23 + r) * 30) + 1} días`,
          verified: seededRandom(seed + 24 + r) > 0.2
        });
      }

      recipes.push({
        id,
        name: names[i],
        category,
        type,
        difficulty,
        time,
        servings,
        ingredients: ingredientSet,
        steps: stepsSet,
        image,
        rating,
        calories,
        region,
        tags: recipeTags,
        cooksnaps,
        isDetailed,
        reviewsNum,
        reviews: recipeReviews
      });
      id++;
    }
  }

  // Generar recetas adicionales hasta 2450 (200 nuevas fáciles añadidas)
  while (recipes.length < 2450) {
    const catIndex = recipes.length % categories.length;
    const category = categories[catIndex];
    const baseNames = recipeNames[category];
    const variation = Math.floor(recipes.length / categories.length) - Math.floor(baseNames.length / categories.length);
    const baseName = baseNames[recipes.length % baseNames.length];
    const suffix = variation > 0 ? ` (Variante ${Math.ceil(variation)})` : '';
    const name = `${baseName}${suffix}`;
    const seed = recipes.length * 17 + 31;
    const rand = seededRandom(seed);

    const isThermomixName = name.includes('Thermomix') || name.includes('Cookidoo');
    let type: 'tradicional' | 'thermomix';
    if (isThermomixName) {
      type = 'thermomix';
      thermomixCount++;
    } else if (thermomixCount < TOTAL_THERMOMIX && rand > 0.6) {
      type = 'thermomix';
      thermomixCount++;
    } else {
      type = 'tradicional';
    }

    const difficulties: ('Fácil' | 'Media' | 'Difícil')[] = ['Fácil', 'Media', 'Difícil'];
    const difficulty = recipes.length >= 2250 ? 'Fácil' : difficulties[Math.floor(seededRandom(seed + 1) * 3)];
    const time = `${Math.floor(seededRandom(seed + 2) * 120) + 10} min`;
    const servings = Math.floor(seededRandom(seed + 3) * 8) + 1;
    const ingredientSet = ingredientSets[recipes.length % ingredientSets.length];
    const stepsSet = stepSets[Math.floor(seededRandom(seed + 4) * stepSets.length)];
    const rating = Math.round((seededRandom(seed + 5) * 2 + 3) * 10) / 10;
    const calories = Math.floor(seededRandom(seed + 6) * 800) + 100;
    const region = regions[Math.floor(seededRandom(seed + 7) * regions.length)];
    const image = getRecipeImage(name, category, recipes.length + 1);
    const numTags = Math.floor(seededRandom(seed + 9) * 4) + 1;
    const recipeTags: string[] = [];
    for (let t = 0; t < numTags; t++) {
      const tag = tagOptions[Math.floor(seededRandom(seed + 10 + t) * tagOptions.length)];
      if (!recipeTags.includes(tag)) recipeTags.push(tag);
    }

    const isDetailed = seededRandom(seed + 11) > 0.4;
    const cooksnaps = Math.floor(seededRandom(seed + 12) * 300);
    const reviewsNum = Math.floor(seededRandom(seed + 13) * 150) + 5;

    const numSimulatedReviews = Math.floor(seededRandom(seed + 14) * 3) + 2;
    const recipeReviews: Review[] = [];
    const reviewNames = ['MariaG', 'ChefCarlos', 'Ana.Cocina', 'Pedro_88', 'LuciaFoodie', 'JuanCook', 'Laura_M', 'MiguelT'];
    const reviewComments = [
      '¡Me encantó! Muy fácil de seguir.',
      'La receta sale perfecta, aunque le añadí un poco más de sal.',
      'Impresionante, a toda la familia le gustó.',
      'Buena receta, pero el tiempo de cocción me llevó 10 minutos más.',
      '¡Un éxito total! Queda guardada en mis favoritos para siempre.',
      'Es mi primera vez haciendo esto y me quedó riquísimo.',
      'Excelente paso a paso, muy bien explicado.'
    ];

    for(let r=0; r<numSimulatedReviews; r++) {
      const reviewRating = rating > 4 ? 4 + (seededRandom(seed + 20 + r)) : 3 + (seededRandom(seed + 20 + r)*2);
      recipeReviews.push({
        id: recipes.length * 100 + r,
        userName: reviewNames[Math.floor(seededRandom(seed + 21 + r) * reviewNames.length)],
        rating: Math.round(reviewRating * 2) / 2, // 3.5, 4.0, 4.5, etc.
        comment: reviewComments[Math.floor(seededRandom(seed + 22 + r) * reviewComments.length)],
        date: `Hace ${Math.floor(seededRandom(seed + 23 + r) * 30) + 1} días`,
        verified: seededRandom(seed + 24 + r) > 0.2
      });
    }

    recipes.push({
      id: recipes.length + 1,
      name,
      category,
      type,
      difficulty,
      time,
      servings,
      ingredients: ingredientSet,
      steps: stepsSet,
      image,
      rating,
      calories,
      region,
      tags: recipeTags,
      cooksnaps,
      isDetailed,
      reviewsNum,
      reviews: recipeReviews
    });
  }

  return recipes;
}

export const allRecipes = generateRecipes();
export const allCategories = categories;
export const allRegions = regions;
export const allTags = tagOptions;

// Estadísticas
export const recipeStats = {
  total: allRecipes.length,
  thermomix: allRecipes.filter(r => r.type === 'thermomix').length,
  tradicional: allRecipes.filter(r => r.type === 'tradicional').length,
  thermomixPostres: allRecipes.filter(r => r.type === 'thermomix' && r.category === 'Postres').length,
};
