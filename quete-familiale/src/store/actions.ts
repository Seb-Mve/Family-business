import type { AppState, CreateEnfantInput, ValidationResult } from "@/store/types";
import { getTacheById } from "@/data/taches";
import { getRecompenseById } from "@/data/recompenses";
import { getSeuilProchainNiveau } from "@/data/progression";
import { getTodayDate, isDoubleValidation } from "@/lib/completion";
import { calculerMonteeNiveau } from "@/lib/niveau";
import { TROPHEES } from "@/data/trophees";

type SetState = (fn: (state: AppState) => Partial<AppState>) => void;
type GetState = () => AppState;

const genId = () => crypto.randomUUID();

export const creerFamille = (set: SetState) => (nom: string) => {
  set(() => ({
    famille: {
      id: genId(),
      nom,
      dateCreation: getTodayDate(),
      enfants: [],
    },
  }));
};

export const creerEnfant = (set: SetState, get: GetState) => (data: CreateEnfantInput): string => {
  const id = genId();
  const nouvelEnfant = {
    id,
    prenom: data.prenom,
    genre: data.genre,
    age: data.age,
    avatarId: data.avatarId,
    niveau: 1,
    xp: 0,
    xpPourProchainNiveau: 200,
    credits: 0,
    streaks: {},
    trophees: [],
  };

  set((state) => ({
    famille: state.famille
      ? { ...state.famille, enfants: [...state.famille.enfants, nouvelEnfant] }
      : state.famille,
  }));

  return id;
};

const verifierTrophees = (enfant: Parameters<typeof calculerMonteeNiveau>[0], completions: AppState["completions"], rachats: AppState["rachats"]): string[] => {
  const nouveauxTrophees: string[] = [];
  const dejaDebloques = new Set(enfant.trophees);

  for (const t of TROPHEES) {
    if (dejaDebloques.has(t.id)) continue;

    if (t.critereType === "niveau" && typeof t.critereValeur === "number") {
      if (enfant.niveau >= t.critereValeur) nouveauxTrophees.push(t.id);
    } else if (t.critereType === "type_tache" && typeof t.critereValeur === "number") {
      const count = completions.filter((c) => c.enfantId === enfant.id && c.statut === "complete").length;
      if (count >= t.critereValeur) nouveauxTrophees.push(t.id);
    } else if (t.critereType === "special" && t.id === "collectionneur-butins" && typeof t.critereValeur === "number") {
      const count = rachats.filter((r) => r.enfantId === enfant.id).length;
      if (count >= t.critereValeur) nouveauxTrophees.push(t.id);
    }
  }

  return nouveauxTrophees;
};

export const validerTache = (set: SetState, get: GetState) => (enfantId: string, tacheId: string): ValidationResult => {
  const state = get();
  const tache = getTacheById(tacheId);
  if (!tache) throw new Error("TACHE_INTROUVABLE");
  if (isDoubleValidation(state.completions, enfantId, tacheId)) {
    throw new Error("DEJA_VALIDE");
  }

  const today = getTodayDate();
  const now = new Date().toISOString();
  const completionId = genId();

  // Find enfant
  const famille = state.famille!;
  const enfantIndex = famille.enfants.findIndex((e) => e.id === enfantId);
  if (enfantIndex === -1) throw new Error("ENFANT_INTROUVABLE");

  const enfant = { ...famille.enfants[enfantIndex] };
  enfant.xp += tache.xpValeur;
  enfant.credits += tache.creditsValeur;

  // Niveau
  const monteResult = calculerMonteeNiveau({ ...enfant });
  let levelUp = false;
  let nouveauNiveau: number | undefined;

  if (monteResult.levelUp) {
    enfant.niveau = monteResult.nouveauNiveau;
    enfant.xpPourProchainNiveau = getSeuilProchainNiveau(enfant.niveau);
    levelUp = true;
    nouveauNiveau = enfant.niveau;
  }

  // Trophées
  const newCompletions = [
    ...state.completions,
    {
      id: completionId,
      enfantId,
      tacheId,
      date: today,
      statut: "complete" as const,
      dateValidation: now,
    },
  ];
  const tropheesDebloques = verifierTrophees(enfant, newCompletions, state.rachats);
  enfant.trophees = [...enfant.trophees, ...tropheesDebloques];

  const nouvellesEnfants = [...famille.enfants];
  nouvellesEnfants[enfantIndex] = enfant;

  set(() => ({
    famille: { ...famille, enfants: nouvellesEnfants },
    completions: newCompletions,
  }));

  return {
    xpGagne: tache.xpValeur,
    creditsGagnes: tache.creditsValeur,
    levelUp,
    nouveauNiveau,
    tropheesDebloques,
  };
};

export const rachatRecompense = (set: SetState, get: GetState) => (enfantId: string, recompenseId: string): void => {
  const state = get();
  const recompense = getRecompenseById(recompenseId);
  if (!recompense) throw new Error("RECOMPENSE_INTROUVABLE");

  const famille = state.famille!;
  const enfantIndex = famille.enfants.findIndex((e) => e.id === enfantId);
  if (enfantIndex === -1) throw new Error("ENFANT_INTROUVABLE");

  const enfant = famille.enfants[enfantIndex];
  if (enfant.credits < recompense.cout) throw new Error("SOLDE_INSUFFISANT");

  const updatedEnfant = { ...enfant, credits: enfant.credits - recompense.cout };
  const nouvellesEnfants = [...famille.enfants];
  nouvellesEnfants[enfantIndex] = updatedEnfant;

  set((state) => ({
    famille: { ...famille, enfants: nouvellesEnfants },
    rachats: [
      ...state.rachats,
      {
        id: genId(),
        enfantId,
        recompenseId,
        dateRachat: new Date().toISOString(),
        creditsDebites: recompense.cout,
      },
    ],
  }));
};

export const validerStreak = (set: SetState, get: GetState) => (enfantId: string, tacheId: string): void => {
  const state = get();
  const famille = state.famille!;
  const enfantIndex = famille.enfants.findIndex((e) => e.id === enfantId);
  if (enfantIndex === -1) return;

  const enfant = famille.enfants[enfantIndex];
  const currentStreak = enfant.streaks[tacheId] ?? 0;
  const updatedEnfant = {
    ...enfant,
    streaks: { ...enfant.streaks, [tacheId]: currentStreak + 1 },
  };

  // Check trophées streak
  const tropheesDebloques: string[] = [];
  for (const t of TROPHEES) {
    if (t.critereType === "serie" && !updatedEnfant.trophees.includes(t.id)) {
      const maxStreak = Math.max(...Object.values(updatedEnfant.streaks));
      if (typeof t.critereValeur === "number" && maxStreak >= t.critereValeur) {
        tropheesDebloques.push(t.id);
      }
    }
  }
  updatedEnfant.trophees = [...updatedEnfant.trophees, ...tropheesDebloques];

  const nouvellesEnfants = [...famille.enfants];
  nouvellesEnfants[enfantIndex] = updatedEnfant;
  set(() => ({ famille: { ...famille, enfants: nouvellesEnfants } }));
};
