import type { AppState, Enfant, RecompenseAvecEtat, TropheeAvecProgression, CompletionTache, Rachat } from "@/store/types";
import { getTitreNiveau as getTitreNiveauData } from "@/data/progression";
import { RECOMPENSES } from "@/data/recompenses";
import { TROPHEES } from "@/data/trophees";
import { getTodayDate } from "@/lib/completion";

export const getTitreNiveau = (enfant: Enfant): string =>
  getTitreNiveauData(enfant.genre, enfant.niveau);

export const getXPPourcentage = (enfant: Enfant): number => {
  if (enfant.niveau >= 10) return 100;
  return Math.min(100, Math.round((enfant.xp / enfant.xpPourProchainNiveau) * 100));
};

export const getCompletionsAujourdhui = (
  state: Pick<AppState, "completions">,
  enfantId: string
): CompletionTache[] => {
  const today = getTodayDate();
  return state.completions.filter(
    (c) => c.enfantId === enfantId && c.date === today
  );
};

export const isTacheCompleteAujourdhui = (
  state: Pick<AppState, "completions">,
  enfantId: string,
  tacheId: string
): boolean => {
  const today = getTodayDate();
  return state.completions.some(
    (c) =>
      c.enfantId === enfantId &&
      c.tacheId === tacheId &&
      c.date === today &&
      c.statut === "complete"
  );
};

export const getRecompensesAvecEtat = (enfant: Enfant): RecompenseAvecEtat[] =>
  RECOMPENSES.map((r) => ({ ...r, accessible: enfant.credits >= r.cout }));

export const getTropheesAvecProgression = (
  state: Pick<AppState, "completions" | "rachats">,
  enfant: Enfant
): TropheeAvecProgression[] => {
  const debloque = new Set(enfant.trophees);

  return TROPHEES.map((t) => {
    const isDebloque = debloque.has(t.id);
    let progressionActuelle = 0;
    const progressionMax = typeof t.critereValeur === "number" ? t.critereValeur : 1;

    if (t.critereType === "niveau") {
      progressionActuelle = Math.min(enfant.niveau, progressionMax);
    } else if (t.critereType === "serie") {
      const maxStreak = Object.values(enfant.streaks).reduce((a, b) => Math.max(a, b), 0);
      progressionActuelle = Math.min(maxStreak, progressionMax);
    } else if (t.critereType === "special" && t.id === "collectionneur-butins") {
      progressionActuelle = Math.min(
        state.rachats.filter((r) => {
          const rec = RECOMPENSES.find((re) => re.id === r.recompenseId);
          return r.enfantId === enfant.id && rec?.categorie === "butin";
        }).length,
        progressionMax
      );
    } else if (t.critereType === "type_tache") {
      progressionActuelle = Math.min(
        state.completions.filter(
          (c) => c.enfantId === enfant.id && c.statut === "complete"
        ).length,
        progressionMax
      );
    }

    return {
      ...t,
      debloque: isDebloque,
      progressionActuelle,
      progressionMax,
    };
  });
};

export const getRachatsEnfant = (
  state: Pick<AppState, "rachats">,
  enfantId: string
): Rachat[] => state.rachats.filter((r) => r.enfantId === enfantId);
