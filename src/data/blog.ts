import type { LocalizedList, LocalizedText } from "./guides";

export type BlogPost = {
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  tag: LocalizedText;
  coverImage: string;
  publishedAt: string;
  comingSoon: boolean;
  content: LocalizedList;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "hoteles-ahuachapan-ciudad",
    title: {
      es: "Dónde alojarse en Ahuachapán ciudad",
      en: "Where to stay in Ahuachapán city",
    },
    excerpt: {
      es: "Las mejores opciones de hospedaje en el centro de Ahuachapán, para todos los presupuestos.",
      en: "The best lodging options in downtown Ahuachapán, for every budget.",
    },
    tag: { es: "Alojamiento", en: "Lodging" },
    coverImage: "/experiences/patrimonio-ahuachapan.jpg",
    publishedAt: "2026-10-14",
    comingSoon: true,
    content: {
      es: [],
      en: [],
    },
  },
  {
    slug: "experiencias-culinarias-ruta-de-las-flores",
    title: {
      es: "Las mejores experiencias culinarias en la Ruta de Las Flores",
      en: "The best culinary experiences on the Flower Route",
    },
    excerpt: {
      es: "De cafetales a cocinas locales: dónde comer y qué probar en la Ruta de Las Flores.",
      en: "From coffee farms to local kitchens: where to eat and what to try on the Flower Route.",
    },
    tag: { es: "Gastronomía", en: "Food" },
    coverImage: "/experiences/ruta-del-cafe-apaneca.jpg",
    publishedAt: "2026-10-14",
    comingSoon: true,
    content: {
      es: [],
      en: [],
    },
  },
  {
    slug: "aventura-extrema-ahuachapan",
    title: {
      es: "5 opciones de aventura extrema en Ahuachapán",
      en: "5 extreme adventure options in Ahuachapán",
    },
    excerpt: {
      es: "Cuatrimotos, rappel, tirolesa y más: la cara más adrenalínica de Ahuachapán.",
      en: "ATVs, rappelling, zip-lining and more: Ahuachapán's most adrenaline-filled side.",
    },
    tag: { es: "Aventura", en: "Adventure" },
    coverImage: "/experiences/cuatrimoto-laguna-verde-apaneca.jpg",
    publishedAt: "2026-10-14",
    comingSoon: true,
    content: {
      es: [],
      en: [],
    },
  },
];

export const getBlogPostBySlug = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);
