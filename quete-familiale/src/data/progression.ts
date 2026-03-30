import type { Genre } from "@/store/types";

export const SEUILS_XP: Record<number, number> = {
  1: 200,
  2: 500,
  3: 1000,
  4: 2000,
  5: 4000,
  6: 8000,
  7: 16000,
  8: 32000,
  9: 64000,
};

export const XP_NIVEAU_MAX = 9; // niveau 10 = max, pas de seuil suivant

export const TITRES_NIVEAU: Record<Genre, Record<number, string>> = {
  garcon: {
    1: "Apprenti",
    2: "Écuyer Courageux",
    3: "Chevalier Vaillant",
    4: "Gardien du Royaume",
    5: "Champion des Royaumes",
    6: "Héros Indestructible",
    7: "Paladin de Lumière",
    8: "Seigneur des Légendes",
    9: "Titan de l'Univers",
    10: "Légende Suprême et Éternelle",
  },
  fille: {
    1: "Apprentie",
    2: "Exploratrice Audacieuse",
    3: "Guerrière de Lumière",
    4: "Gardienne du Royaume",
    5: "Championne Étoilée",
    6: "Héroïne Indestructible",
    7: "Enchanteresse Sacrée",
    8: "Reine des Légendes",
    9: "Impératrice Cosmique",
    10: "Légende Suprême et Éternelle",
  },
};

export const getTitreNiveau = (genre: Genre, niveau: number): string =>
  TITRES_NIVEAU[genre][niveau] ?? "Légende";

export const getSeuilProchainNiveau = (niveau: number): number =>
  SEUILS_XP[niveau] ?? 999999;
