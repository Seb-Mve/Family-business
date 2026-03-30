import type { Recompense } from "@/store/types";

export const RECOMPENSES: Recompense[] = [
  // Privilèges
  { id: "15min-ecran", titre: "15 min d'écran", categorie: "privilege", cout: 5, icone: "📱" },
  { id: "30min-ecran", titre: "30 min d'écran", categorie: "privilege", cout: 10, icone: "🎮" },
  { id: "choix-film", titre: "Choix du film", categorie: "privilege", cout: 15, icone: "🎬" },
  { id: "cabane-salon", titre: "Cabane salon", categorie: "privilege", cout: 20, icone: "🏕️" },
  { id: "coucher-tardif", titre: "Coucher tardif", categorie: "privilege", cout: 25, icone: "🌟" },
  { id: "jeu-video-coop", titre: "Jeu vidéo coop", categorie: "privilege", cout: 30, icone: "🕹️" },
  // Butins
  { id: "friandise-boulangerie", titre: "Friandise boulangerie", categorie: "butin", cout: 15, icone: "🍰" },
  { id: "un-livre", titre: "Un livre", categorie: "butin", cout: 25, icone: "📖" },
  { id: "cartes-collection", titre: "Cartes à collectionner", categorie: "butin", cout: 30, icone: "🃏" },
  { id: "petite-figurine", titre: "Petite figurine", categorie: "butin", cout: 40, icone: "🏆" },
];

export const getRecompenseById = (id: string): Recompense | undefined =>
  RECOMPENSES.find((r) => r.id === id);
