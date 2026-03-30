import type { Enfant } from "@/store/types";
import { SEUILS_XP } from "@/data/progression";

export interface MonteeNiveauResult {
  levelUp: boolean;
  nouveauNiveau: number;
  nouvelleXPSeuil: number;
}

export const calculerMonteeNiveau = (enfant: Enfant): MonteeNiveauResult => {
  let niveau = enfant.niveau;
  let xp = enfant.xp;

  if (niveau >= 10) {
    return { levelUp: false, nouveauNiveau: 10, nouvelleXPSeuil: 999999 };
  }

  const seuil = SEUILS_XP[niveau];
  if (xp >= seuil) {
    const nouveauNiveau = Math.min(niveau + 1, 10);
    const nouvelleXPSeuil = nouveauNiveau < 10 ? (SEUILS_XP[nouveauNiveau] ?? 999999) : 999999;
    return { levelUp: true, nouveauNiveau, nouvelleXPSeuil };
  }

  return { levelUp: false, nouveauNiveau: niveau, nouvelleXPSeuil: SEUILS_XP[niveau] ?? 999999 };
};
