import type { LocalizedList, LocalizedText } from "./guides";

export type Difficulty = "easy" | "moderate" | "challenging";

export type BrandColor = "bosque" | "verde" | "rios" | "sol" | "tronco";

export type Experience = {
  slug: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  description: LocalizedText;
  category: LocalizedText;
  categorySlug: string;
  city: LocalizedText;
  citySlug: string;
  emoji: string;
  image: string;
  color: BrandColor;
  priceUSD: number;
  durationHours: number;
  groupSizeMax: number;
  difficulty: Difficulty;
  location: LocalizedText;
  meetingPoint: LocalizedText;
  highlights: LocalizedList;
  includes: LocalizedList;
  guideSlug: string;
};

export const experiences: Experience[] = [
  {
    slug: "sendero-el-imposible",
    title: {
      es: "Caminata al Parque Nacional El Imposible",
      en: "Hike through El Imposible National Park",
    },
    shortDescription: {
      es: "Bosque nuboso, cascadas escondidas y la biodiversidad más rica de El Salvador.",
      en: "Cloud forest, hidden waterfalls, and El Salvador's richest biodiversity.",
    },
    description: {
      es: "Entramos al Parque Nacional El Imposible por senderos poco transitados, con paradas en miradores y una cascada donde podés refrescarte. Marta conoce los nombres de casi todas las aves y plantas que vamos a encontrar, y comparte historias de las familias que viven alrededor del parque.",
      en: "We enter El Imposible National Park along quiet trails, with stops at viewpoints and a waterfall where you can cool off. Marta knows the names of almost every bird and plant we'll encounter, and shares stories from the families living around the park.",
    },
    category: { es: "Naturaleza", en: "Nature" },
    categorySlug: "naturaleza",
    city: { es: "Tacuba", en: "Tacuba" },
    citySlug: "tacuba",
    emoji: "🥾",
    image: "/experiences/sendero-el-imposible.jpg",
    color: "verde",
    priceUSD: 35,
    durationHours: 5,
    groupSizeMax: 8,
    difficulty: "moderate",
    location: { es: "Tacuba, Ahuachapán", en: "Tacuba, Ahuachapán" },
    meetingPoint: {
      es: "Entrada del Parque Nacional El Imposible, sector San Benito",
      en: "El Imposible National Park entrance, San Benito sector",
    },
    highlights: {
      es: [
        "Cascada Los Enganches",
        "Miradores sobre el bosque nuboso",
        "Observación de aves endémicas",
      ],
      en: [
        "Los Enganches waterfall",
        "Cloud forest viewpoints",
        "Endemic bird watching",
      ],
    },
    includes: {
      es: ["Guía certificado", "Ingreso al parque", "Agua embotellada"],
      en: ["Certified guide", "Park entrance fee", "Bottled water"],
    },
    guideSlug: "marta-coreas",
  },
  {
    slug: "laguna-verde-trek",
    title: {
      es: "Trekking al cráter de Laguna Verde",
      en: "Trek to the Laguna Verde crater",
    },
    shortDescription: {
      es: "Subida a un cráter volcánico con una laguna de color verde esmeralda.",
      en: "A climb to a volcanic crater with an emerald-green lagoon.",
    },
    description: {
      es: "Laguna Verde es uno de los secretos mejor guardados de la Ruta de Las Flores. Willy te lleva por el sendero de ascenso explicando la actividad volcánica de la zona, hasta llegar al borde del cráter donde vas a ver la laguna desde arriba.",
      en: "Laguna Verde is one of the best-kept secrets of the Flower Route. Willy takes you up the ascent trail explaining the area's volcanic activity, all the way to the crater rim where you'll see the lagoon from above.",
    },
    category: { es: "Volcanes", en: "Volcanoes" },
    categorySlug: "volcanes",
    city: { es: "Apaneca", en: "Apaneca" },
    citySlug: "apaneca",
    emoji: "🌋",
    image: "/experiences/laguna-verde-trek.jpg",
    color: "bosque",
    priceUSD: 40,
    durationHours: 4,
    groupSizeMax: 6,
    difficulty: "challenging",
    location: { es: "Apaneca, Ahuachapán", en: "Apaneca, Ahuachapán" },
    meetingPoint: {
      es: "Parque central de Apaneca",
      en: "Apaneca central park",
    },
    highlights: {
      es: [
        "Vista panorámica del cráter",
        "Explicación de geología volcánica",
        "Bosque de pino-roble en la subida",
      ],
      en: [
        "Panoramic crater view",
        "Volcanic geology explanations",
        "Pine-oak forest on the way up",
      ],
    },
    includes: {
      es: ["Guía certificado", "Bastón de senderismo", "Snack energético"],
      en: ["Certified guide", "Trekking pole", "Energy snack"],
    },
    guideSlug: "willy-ramirez",
  },
  {
    slug: "murales-arte-ataco",
    title: {
      es: "Recorrido de murales y arte en Ataco",
      en: "Ataco murals and art walk",
    },
    shortDescription: {
      es: "Caminata por los murales y talleres de artesanos de Concepción de Ataco.",
      en: "A walking tour through the murals and artisan workshops of Concepción de Ataco.",
    },
    description: {
      es: "Ataco es famoso por sus murales de colores y su comunidad de artistas. Reina te lleva calle por calle contando la historia detrás de cada mural y te presenta a artesanos que trabajan el barro, la madera y el textil en sus propios talleres.",
      en: "Ataco is famous for its colorful murals and artist community. Reina takes you street by street, telling the story behind each mural and introducing you to artisans working with clay, wood, and textiles in their own workshops.",
    },
    category: { es: "Cultura", en: "Culture" },
    categorySlug: "cultura",
    city: { es: "Concepción de Ataco", en: "Concepción de Ataco" },
    citySlug: "ataco",
    emoji: "🖼️",
    image: "/experiences/murales-arte-ataco.jpg",
    color: "sol",
    priceUSD: 20,
    durationHours: 2.5,
    groupSizeMax: 10,
    difficulty: "easy",
    location: {
      es: "Concepción de Ataco, Ahuachapán",
      en: "Concepción de Ataco, Ahuachapán",
    },
    meetingPoint: {
      es: "Parque central de Concepción de Ataco",
      en: "Concepción de Ataco central park",
    },
    highlights: {
      es: [
        "Más de 15 murales explicados",
        "Visita a un taller de artesanía",
        "Historia del pueblo cafetero",
      ],
      en: [
        "15+ murals explained",
        "Visit to an artisan workshop",
        "History of the coffee town",
      ],
    },
    includes: {
      es: ["Guía certificado", "Degustación de café local"],
      en: ["Certified guide", "Local coffee tasting"],
    },
    guideSlug: "reina-perez",
  },
  {
    slug: "ausoles-santa-teresa",
    title: {
      es: "Ausoles y aguas termales de Santa Teresa",
      en: "Santa Teresa hot springs and fumaroles",
    },
    shortDescription: {
      es: "Fumarolas volcánicas activas y baño en aguas termales naturales.",
      en: "Active volcanic fumaroles and a soak in natural hot springs.",
    },
    description: {
      es: "Ahuachapán es la tierra de los ausoles: fumarolas de vapor volcánico que salen directo de la tierra. Willy te explica cómo se forman y por qué son la base de la energía geotérmica del país, y cerramos el recorrido con un baño relajante en aguas termales naturales.",
      en: "Ahuachapán is the land of ausoles: volcanic steam fumaroles that rise straight from the ground. Willy explains how they form and why they're the basis of the country's geothermal energy, and we close the tour with a relaxing soak in natural hot springs.",
    },
    category: { es: "Aguas termales", en: "Hot springs" },
    categorySlug: "aguas-termales",
    city: { es: "Ahuachapán", en: "Ahuachapán" },
    citySlug: "ahuachapan",
    emoji: "♨️",
    image: "/experiences/ausoles-santa-teresa.jpg",
    color: "rios",
    priceUSD: 30,
    durationHours: 3,
    groupSizeMax: 8,
    difficulty: "easy",
    location: { es: "Ahuachapán", en: "Ahuachapán" },
    meetingPoint: {
      es: "Parque Concordia, Ahuachapán centro",
      en: "Parque Concordia, downtown Ahuachapán",
    },
    highlights: {
      es: [
        "Fumarolas volcánicas activas",
        "Baño en aguas termales",
        "Explicación de energía geotérmica",
      ],
      en: [
        "Active volcanic fumaroles",
        "Natural hot spring soak",
        "Geothermal energy explained",
      ],
    },
    includes: {
      es: ["Guía certificado", "Acceso a aguas termales", "Toalla"],
      en: ["Certified guide", "Hot springs access", "Towel"],
    },
    guideSlug: "willy-ramirez",
  },
  {
    slug: "ruta-del-cafe-apaneca",
    title: {
      es: "Ruta del café en Apaneca",
      en: "Apaneca coffee route",
    },
    shortDescription: {
      es: "De la mata a la taza en una finca cafetera de altura.",
      en: "From the plant to the cup on a high-altitude coffee farm.",
    },
    description: {
      es: "Recorremos una finca de café de altura en Apaneca, desde la planta hasta el tueste. Reina, que viene de familia cafetera, te enseña a catar el café y explica por qué esta zona produce algunos de los mejores granos de Centroamérica.",
      en: "We tour a high-altitude coffee farm in Apaneca, from the plant to the roast. Reina, who comes from a coffee-growing family, teaches you how to cup coffee and explains why this region produces some of the best beans in Central America.",
    },
    category: { es: "Café", en: "Coffee" },
    categorySlug: "cafe",
    city: { es: "Apaneca", en: "Apaneca" },
    citySlug: "apaneca",
    emoji: "☕",
    image: "/experiences/ruta-del-cafe-apaneca.jpg",
    color: "tronco",
    priceUSD: 25,
    durationHours: 3,
    groupSizeMax: 10,
    difficulty: "easy",
    location: { es: "Apaneca, Ahuachapán", en: "Apaneca, Ahuachapán" },
    meetingPoint: {
      es: "Entrada de finca cafetera, salida de Apaneca",
      en: "Coffee farm entrance, on the way out of Apaneca",
    },
    highlights: {
      es: [
        "Recorrido por el cafetal",
        "Proceso de tueste en vivo",
        "Cata guiada de café",
      ],
      en: [
        "Coffee plantation walk",
        "Live roasting process",
        "Guided coffee cupping",
      ],
    },
    includes: {
      es: ["Guía certificado", "Cata de café", "Bolsa de café de regalo"],
      en: ["Certified guide", "Coffee tasting", "Coffee bag to take home"],
    },
    guideSlug: "reina-perez",
  },
  {
    slug: "siete-cascadas-tacuba",
    title: {
      es: "Ruta de las Siete Cascadas",
      en: "Seven Waterfalls Route",
    },
    shortDescription: {
      es: "Un recorrido de cascada en cascada por el río Guayapa, cerca de El Imposible.",
      en: "A waterfall-to-waterfall trek along the Guayapa river, near El Imposible.",
    },
    description: {
      es: "Caminamos y nadamos de cascada en cascada por un tramo del río Guayapa, en los alrededores de Tacuba. Es una de las rutas más queridas de la zona: hay saltos de agua para refrescarte, pozas naturales y tramos cortos de rappel opcional en las caídas más altas. Marta conoce cada poza y cada roca del camino.",
      en: "We walk and swim from waterfall to waterfall along a stretch of the Guayapa river, around Tacuba. It's one of the area's best-loved routes: there are falls to cool off in, natural pools, and short optional rappels at the taller drops. Marta knows every pool and rock along the way.",
    },
    category: { es: "Cascadas", en: "Waterfalls" },
    categorySlug: "cascadas",
    city: { es: "Tacuba", en: "Tacuba" },
    citySlug: "tacuba",
    emoji: "💦",
    image: "/experiences/siete-cascadas-tacuba.jpg",
    color: "verde",
    priceUSD: 30,
    durationHours: 4,
    groupSizeMax: 8,
    difficulty: "moderate",
    location: { es: "Tacuba, Ahuachapán", en: "Tacuba, Ahuachapán" },
    meetingPoint: {
      es: "Centro de visitantes, cantón San José Miramar, Tacuba",
      en: "Visitor center, San José Miramar canton, Tacuba",
    },
    highlights: {
      es: [
        "Siete caídas de agua en un solo recorrido",
        "Pozas naturales para nadar",
        "Rappel opcional en la cascada más alta",
      ],
      en: [
        "Seven waterfalls in a single route",
        "Natural pools for swimming",
        "Optional rappel at the tallest fall",
      ],
    },
    includes: {
      es: [
        "Guía certificado",
        "Chaleco salvavidas",
        "Equipo de rappel (tramo opcional)",
      ],
      en: ["Certified guide", "Life vest", "Rappel gear (optional section)"],
    },
    guideSlug: "marta-coreas",
  },
  {
    slug: "tirolesa-apaneca",
    title: {
      es: "Tirolesa y canopy en Apaneca",
      en: "Zip-line canopy in Apaneca",
    },
    shortDescription: {
      es: "Una serie de cables de tirolesa sobre el bosque de pino-roble de Apaneca.",
      en: "A series of zip-lines over Apaneca's pine-oak forest.",
    },
    description: {
      es: "Cruzamos el bosque de Apaneca por una serie de cables de tirolesa, con vistas a los cerros y cafetales de la Ruta de Las Flores desde las alturas. Willy te da la inducción de seguridad completa antes de subir, y te acompaña en cada tramo. Ideal para quienes quieren algo de adrenalina sin ser expertos.",
      en: "We cross the Apaneca forest on a series of zip-lines, with views of the hills and coffee fields of the Flower Route from above. Willy gives you the full safety briefing before you go up, and stays with you on every stretch. Great for anyone who wants some adrenaline without being an expert.",
    },
    category: { es: "Aventura", en: "Adventure" },
    categorySlug: "aventura",
    city: { es: "Apaneca", en: "Apaneca" },
    citySlug: "apaneca",
    emoji: "🚡",
    image: "/experiences/tirolesa-apaneca.jpg",
    color: "bosque",
    priceUSD: 25,
    durationHours: 1.5,
    groupSizeMax: 10,
    difficulty: "easy",
    location: { es: "Apaneca, Ahuachapán", en: "Apaneca, Ahuachapán" },
    meetingPoint: {
      es: "Parque central de Apaneca",
      en: "Apaneca central park",
    },
    highlights: {
      es: [
        "8 cables sobre el bosque de Apaneca",
        "Vistas panorámicas de la Ruta de Las Flores",
        "Inducción de seguridad incluida",
      ],
      en: [
        "8 cables over the Apaneca forest",
        "Panoramic views of the Flower Route",
        "Safety briefing included",
      ],
    },
    includes: {
      es: ["Guía certificado", "Equipo de seguridad completo", "Casco y arnés"],
      en: ["Certified guide", "Full safety gear", "Helmet and harness"],
    },
    guideSlug: "willy-ramirez",
  },
  {
    slug: "manglares-barra-de-santiago",
    title: {
      es: "Manglares y playa de Barra de Santiago",
      en: "Barra de Santiago mangroves and beach",
    },
    shortDescription: {
      es: "Recorrido en lancha por los manglares y conservación de tortugas marinas en la costa de Ahuachapán.",
      en: "A boat tour through the mangroves and sea turtle conservation on the Ahuachapán coast.",
    },
    description: {
      es: "Barra de Santiago es un pueblo de pescadores entre el mar y uno de los manglares mejor conservados de El Salvador. Navegamos en lancha por los canales del manglar, paramos en el vivero de tortugas donde se protegen los nidos de la zona, y cerramos el día en la playa. Douglas lleva más de diez años trabajando en conservación marina ahí mismo.",
      en: "Barra de Santiago is a fishing village between the ocean and one of El Salvador's best-preserved mangrove forests. We take a boat through the mangrove channels, stop at the turtle hatchery that protects the area's nests, and end the day at the beach. Douglas has spent over ten years doing marine conservation work right there.",
    },
    category: { es: "Naturaleza", en: "Nature" },
    categorySlug: "naturaleza",
    city: { es: "Barra de Santiago", en: "Barra de Santiago" },
    citySlug: "barra-de-santiago",
    emoji: "🐢",
    image: "/experiences/manglares-barra-de-santiago.jpg",
    color: "rios",
    priceUSD: 30,
    durationHours: 4,
    groupSizeMax: 10,
    difficulty: "easy",
    location: {
      es: "Barra de Santiago, San Francisco Menéndez",
      en: "Barra de Santiago, San Francisco Menéndez",
    },
    meetingPoint: {
      es: "Muelle de lanchas de Barra de Santiago",
      en: "Barra de Santiago boat dock",
    },
    highlights: {
      es: [
        "Recorrido en lancha por el manglar",
        "Visita al vivero de tortugas marinas",
        "Tiempo libre en la playa",
      ],
      en: [
        "Boat tour through the mangroves",
        "Visit to the sea turtle hatchery",
        "Free time at the beach",
      ],
    },
    includes: {
      es: ["Guía certificado", "Recorrido en lancha", "Chaleco salvavidas"],
      en: ["Certified guide", "Boat tour", "Life vest"],
    },
    guideSlug: "douglas-pineda",
  },
  {
    slug: "cabalgata-cafetales-apaneca",
    title: {
      es: "Cabalgata por los cafetales de Apaneca",
      en: "Horseback ride through the Apaneca coffee fields",
    },
    shortDescription: {
      es: "Paseo a caballo entre fincas de café de altura, con parada en un mirador.",
      en: "A horseback ride through high-altitude coffee farms, with a stop at a lookout.",
    },
    description: {
      es: "Recorremos a caballo los caminos entre fincas cafetaleras de Apaneca, subiendo hasta un mirador con vista a los volcanes de la zona. No necesitás experiencia previa: Reina te enseña lo básico antes de salir y elige caballos tranquilos para el grupo.",
      en: "We ride on horseback through the paths between Apaneca's coffee farms, climbing up to a lookout with views of the area's volcanoes. No previous experience needed: Reina teaches you the basics before you set out and picks calm horses for the group.",
    },
    category: { es: "Aventura", en: "Adventure" },
    categorySlug: "aventura",
    city: { es: "Apaneca", en: "Apaneca" },
    citySlug: "apaneca",
    emoji: "🐴",
    image: "/experiences/cabalgata-cafetales-apaneca.jpg",
    color: "tronco",
    priceUSD: 28,
    durationHours: 2.5,
    groupSizeMax: 6,
    difficulty: "easy",
    location: { es: "Apaneca, Ahuachapán", en: "Apaneca, Ahuachapán" },
    meetingPoint: {
      es: "Establo a la entrada de Apaneca, sobre la Ruta de Las Flores",
      en: "Stable at the entrance to Apaneca, on the Flower Route",
    },
    highlights: {
      es: [
        "Cabalgata por fincas de café de altura",
        "Mirador con vista a los volcanes",
        "Caballos mansos, apto para principiantes",
      ],
      en: [
        "Horseback ride through high-altitude coffee farms",
        "Lookout with volcano views",
        "Gentle horses, beginner-friendly",
      ],
    },
    includes: {
      es: ["Guía certificado", "Caballo y equipo", "Agua embotellada"],
      en: ["Certified guide", "Horse and gear", "Bottled water"],
    },
    guideSlug: "reina-perez",
  },
];

export const getExperienceBySlug = (slug: string) =>
  experiences.find((experience) => experience.slug === slug);

export const getExperiencesByGuide = (guideSlug: string) =>
  experiences.filter((experience) => experience.guideSlug === guideSlug);

export const categories = experiences.reduce<
  {
    slug: string;
    category: LocalizedText;
    emoji: string;
    image: string;
    color: BrandColor;
  }[]
>((acc, experience) => {
  if (!acc.some((c) => c.slug === experience.categorySlug)) {
    acc.push({
      slug: experience.categorySlug,
      category: experience.category,
      emoji: experience.emoji,
      image: experience.image,
      color: experience.color,
    });
  }
  return acc;
}, []);

export const cities = experiences.reduce<
  { slug: string; city: LocalizedText }[]
>((acc, experience) => {
  if (!acc.some((c) => c.slug === experience.citySlug)) {
    acc.push({ slug: experience.citySlug, city: experience.city });
  }
  return acc;
}, []);
