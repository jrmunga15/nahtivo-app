import type { BrandColor } from "@/data/experiences";

export const brandColorClasses: Record<
  BrandColor,
  { bg: string; bgSoft: string; text: string; border: string }
> = {
  bosque: {
    bg: "bg-bosque",
    bgSoft: "bg-bosque/10",
    text: "text-bosque",
    border: "border-bosque",
  },
  verde: {
    bg: "bg-verde",
    bgSoft: "bg-verde/10",
    text: "text-verde",
    border: "border-verde",
  },
  rios: {
    bg: "bg-rios",
    bgSoft: "bg-rios/10",
    text: "text-rios",
    border: "border-rios",
  },
  sol: {
    bg: "bg-sol",
    bgSoft: "bg-sol/10",
    text: "text-sol",
    border: "border-sol",
  },
  tronco: {
    bg: "bg-tronco",
    bgSoft: "bg-tronco/10",
    text: "text-tronco",
    border: "border-tronco",
  },
};
