import type { Tache } from "@/store/types";

export const TACHES: Tache[] = [
  // Quêtes de base (10 XP, 0 Crédit)
  { id: "faire-son-lit", titre: "Faire son lit", type: "base", xpValeur: 10, creditsValeur: 0, icone: "🛏️" },
  { id: "ranger-jouets", titre: "Ranger les jouets", type: "base", xpValeur: 10, creditsValeur: 0, icone: "🧸" },
  { id: "brosser-dents-matin", titre: "Brosser les dents matin", type: "base", xpValeur: 10, creditsValeur: 0, icone: "🪥" },
  { id: "brosser-dents-soir", titre: "Brosser les dents soir", type: "base", xpValeur: 10, creditsValeur: 0, icone: "🌙" },
  { id: "se-doucher", titre: "Se doucher", type: "base", xpValeur: 10, creditsValeur: 0, icone: "🚿" },
  { id: "shabiller-seul", titre: "S'habiller seul", type: "base", xpValeur: 10, creditsValeur: 0, icone: "👕" },
  { id: "debarrasser-table", titre: "Débarrasser la table", type: "base", xpValeur: 10, creditsValeur: 0, icone: "🍽️" },
  { id: "mettre-table", titre: "Mettre la table", type: "base", xpValeur: 10, creditsValeur: 0, icone: "🥄" },
  { id: "ranger-cartable", titre: "Ranger son cartable", type: "base", xpValeur: 10, creditsValeur: 0, icone: "🎒" },
  { id: "faire-devoirs", titre: "Faire ses devoirs", type: "base", xpValeur: 10, creditsValeur: 0, icone: "📚" },
  // Quêtes épiques (20 XP, 5 Crédits)
  { id: "passer-aspirateur", titre: "Passer l'aspirateur", type: "epique", xpValeur: 20, creditsValeur: 5, icone: "🌀" },
  { id: "nettoyer-toilettes", titre: "Nettoyer les toilettes", type: "epique", xpValeur: 20, creditsValeur: 5, icone: "🚽" },
  { id: "faire-vaisselle", titre: "Faire la vaisselle", type: "epique", xpValeur: 20, creditsValeur: 5, icone: "🫧" },
  { id: "sortir-poubelle", titre: "Sortir la poubelle", type: "epique", xpValeur: 20, creditsValeur: 5, icone: "🗑️" },
  { id: "ranger-salon", titre: "Ranger le salon", type: "epique", xpValeur: 20, creditsValeur: 5, icone: "🛋️" },
  { id: "aider-cuisiner", titre: "Aider à cuisiner", type: "epique", xpValeur: 20, creditsValeur: 5, icone: "👨‍🍳" },
  { id: "arroser-plantes", titre: "Arroser les plantes", type: "epique", xpValeur: 20, creditsValeur: 5, icone: "🌿" },
  { id: "nourrir-animaux", titre: "Nourrir les animaux", type: "epique", xpValeur: 20, creditsValeur: 5, icone: "🐾" },
  { id: "ranger-linge", titre: "Ranger le linge", type: "epique", xpValeur: 20, creditsValeur: 5, icone: "👚" },
  { id: "aider-frere-soeur", titre: "Aider un frère/sœur", type: "epique", xpValeur: 20, creditsValeur: 5, icone: "🤝" },
];

export const getTacheById = (id: string): Tache | undefined =>
  TACHES.find((t) => t.id === id);
