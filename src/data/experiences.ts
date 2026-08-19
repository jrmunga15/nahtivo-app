import type { LocalizedList, LocalizedText } from "./guides";

export type Difficulty = "easy" | "moderate" | "challenging";

export type BrandColor = "bosque" | "verde" | "rios" | "sol" | "tronco";

export type Experience = {
  slug: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  description: LocalizedText;
  category: LocalizedText;
  emoji: string;
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
    emoji: "🥾",
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
    emoji: "🌋",
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
    emoji: "🖼️",
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
    emoji: "♨️",
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
    emoji: "☕",
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
];

export const getExperienceBySlug = (slug: string) =>
  experiences.find((experience) => experience.slug === slug);

export const getExperiencesByGuide = (guideSlug: string) =>
  experiences.filter((experience) => experience.guideSlug === guideSlug);
