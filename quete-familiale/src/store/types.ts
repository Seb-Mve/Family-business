export type Genre = "garcon" | "fille";
export type AvatarId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type TacheType = "base" | "epique";
export type CompletionStatut = "a_faire" | "complete";
export type RecompenseCategorie = "privilege" | "butin";
export type TropheeCritereType = "serie" | "type_tache" | "niveau" | "special";

export interface Famille {
  id: string;
  nom: string;
  dateCreation: string; // YYYY-MM-DD
  enfants: Enfant[];
}

export interface Enfant {
  id: string;
  prenom: string;
  genre: Genre;
  age: number; // 4-15
  avatarId: AvatarId;
  niveau: number; // 1-10
  xp: number;
  xpPourProchainNiveau: number;
  credits: number;
  streaks: Record<string, number>; // { [tacheId]: nb semaines }
  trophees: string[]; // IDs
}

export interface Tache {
  id: string;
  titre: string;
  type: TacheType;
  xpValeur: number;
  creditsValeur: number;
  icone: string; // emoji
}

export interface CompletionTache {
  id: string;
  enfantId: string;
  tacheId: string;
  date: string; // YYYY-MM-DD
  statut: CompletionStatut;
  dateValidation: string | null; // ISO datetime
}

export interface Recompense {
  id: string;
  titre: string;
  categorie: RecompenseCategorie;
  cout: number;
  icone: string;
}

export interface RecompenseAvecEtat extends Recompense {
  accessible: boolean;
}

export interface Rachat {
  id: string;
  enfantId: string;
  recompenseId: string;
  dateRachat: string; // ISO datetime
  creditsDebites: number;
}

export interface Trophee {
  id: string;
  titre: string;
  description: string;
  icone: string;
  critereType: TropheeCritereType;
  critereValeur: number | string;
}

export interface TropheeAvecProgression extends Trophee {
  debloque: boolean;
  progressionActuelle: number;
  progressionMax: number;
}

export interface ValidationResult {
  xpGagne: number;
  creditsGagnes: number;
  levelUp: boolean;
  nouveauNiveau?: number;
  tropheesDebloques: string[];
}

export interface CreateEnfantInput {
  prenom: string;
  genre: Genre;
  age: number;
  avatarId: AvatarId;
}

export interface AppState {
  famille: Famille | null;
  completions: CompletionTache[];
  rachats: Rachat[];
  activeEnfantId: string | null;
  activeTacheId: string | null;
  // Actions
  creerFamille: (nom: string) => void;
  creerEnfant: (data: CreateEnfantInput) => string;
  validerTache: (enfantId: string, tacheId: string) => ValidationResult;
  rachatRecompense: (enfantId: string, recompenseId: string) => void;
  validerStreak: (enfantId: string, tacheId: string) => void;
  setActiveEnfant: (id: string) => void;
  setActiveTache: (id: string | null) => void;
}
