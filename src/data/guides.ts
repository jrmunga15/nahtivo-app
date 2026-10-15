export type LocalizedText = {
  es: string;
  en: string;
};

export type LocalizedList = {
  es: string[];
  en: string[];
};

export type Guide = {
  slug: string;
  name: string;
  emoji: string;
  location: LocalizedText;
  certifiedSince: number;
  yearsExperience: number;
  languages: string[];
  bio: LocalizedText;
  specialties: LocalizedList;
};

export const guides: Guide[] = [
  {
    slug: "reina-perez",
    name: "Reina Pérez",
    emoji: "🎨",
    location: { es: "Concepción de Ataco", en: "Concepción de Ataco" },
    certifiedSince: 2022,
    yearsExperience: 9,
    languages: ["Español", "English"],
    bio: {
      es: "Nací y crecí en Ataco. Soy hija de una familia cafetalera y llevo casi una década enseñándole a los visitantes el arte, los murales y la cultura cafetera de mi pueblo. Me certifiqué con Nahtivo porque creo que el turismo debe dejar algo bueno en la comunidad, no solo en el bolsillo del intermediario.",
      en: "I was born and raised in Ataco. I come from a coffee-growing family and have spent almost a decade showing visitors the art, murals, and coffee culture of my town. I got certified with Nahtivo because I believe tourism should leave something good in the community, not just in a middleman's pocket.",
    },
    specialties: {
      es: ["Arte y murales", "Cultura cafetera", "Gastronomía local"],
      en: ["Art and murals", "Coffee culture", "Local gastronomy"],
    },
  },
  {
    slug: "willy-ramirez",
    name: 'Wilfredo "Willy" Ramírez',
    emoji: "🌋",
    location: { es: "Apaneca", en: "Apaneca" },
    certifiedSince: 2021,
    yearsExperience: 12,
    languages: ["Español", "English"],
    bio: {
      es: "Soy guardaparques de formación y guía de montaña por vocación. Conozco cada sendero de la Ruta de Las Flores y los volcanes que la rodean como la palma de mi mano. Mi trabajo es que subás seguro y bajés con ganas de volver.",
      en: "I trained as a park ranger and became a mountain guide by calling. I know every trail on the Flower Route and the surrounding volcanoes like the back of my hand. My job is to get you up safely and bring you back down wanting to return.",
    },
    specialties: {
      es: ["Senderismo", "Volcanes y ausoles", "Observación de aves"],
      en: ["Hiking", "Volcanoes and hot springs", "Bird watching"],
    },
  },
  {
    slug: "marta-coreas",
    name: "Marta Elena Coreas",
    emoji: "🌿",
    location: { es: "Tacuba", en: "Tacuba" },
    certifiedSince: 2023,
    yearsExperience: 6,
    languages: ["Español"],
    bio: {
      es: "Soy de Tacuba, a un paso del Parque Nacional El Imposible. Empecé como voluntaria en proyectos de reforestación y hoy comparto ese amor por el bosque con cada grupo que llevo. Camino despacio, explico mucho y siempre llevo café de la zona.",
      en: "I'm from Tacuba, right next to El Imposible National Park. I started as a volunteer in reforestation projects and today I share that love for the forest with every group I lead. I walk slowly, explain a lot, and always bring local coffee.",
    },
    specialties: {
      es: ["Naturaleza y bosque nuboso", "Cascadas", "Turismo comunitario"],
      en: ["Nature and cloud forest", "Waterfalls", "Community tourism"],
    },
  },
  {
    slug: "douglas-pineda",
    name: "Douglas Pineda",
    emoji: "🐢",
    location: { es: "Barra de Santiago", en: "Barra de Santiago" },
    certifiedSince: 2023,
    yearsExperience: 11,
    languages: ["Español"],
    bio: {
      es: "Nací en Barra de Santiago y desde joven trabajo en los proyectos de conservación de tortugas marinas de la zona. Conozco el manglar como la palma de mi mano: sus canales, sus aves, y las familias de pescadores que viven de él. Me certifiqué con Nahtivo para compartir ese conocimiento con más gente, sin dejar de cuidar lo que nos da de comer.",
      en: "I was born in Barra de Santiago and have worked in the area's sea turtle conservation projects since I was young. I know the mangrove like the back of my hand: its channels, its birds, and the fishing families who depend on it. I got certified with Nahtivo to share that knowledge with more people, without losing sight of protecting what feeds us.",
    },
    specialties: {
      es: ["Conservación marina", "Manglares", "Pesca artesanal"],
      en: ["Marine conservation", "Mangroves", "Artisanal fishing"],
    },
  },
];

export const getGuideBySlug = (slug: string) =>
  guides.find((guide) => guide.slug === slug);
