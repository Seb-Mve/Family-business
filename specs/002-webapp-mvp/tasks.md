# Tasks: La Quête Familiale — Web App MVP

**Input**: Design documents from `/specs/002-webapp-mvp/`
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, contracts/ ✓, quickstart.md ✓

**Organization**: Tasks groupées par user story pour permettre implémentation et test indépendants.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Peut tourner en parallèle (fichiers différents, pas de dépendances)
- **[Story]**: User story associée (US1–US6)
- Chemins exacts basés sur `plan.md` → projet `quete-familiale/`

---

## Phase 1: Setup (Infrastructure partagée)

**Purpose**: Initialisation du projet Next.js 14, configuration Tailwind, outils

- [ ] T001 Initialiser le projet Next.js 14 + TypeScript + Tailwind via `create-next-app@14 quete-familiale --typescript --tailwind --app --src-dir` et installer les dépendances : `zustand framer-motion` + devDeps `vitest @testing-library/react @vitejs/plugin-react jsdom`
- [ ] T002 Configurer les tokens couleur Tailwind et la font Nunito dans `tailwind.config.ts` (couleurs : primary #4A90E2, success #27AE60, energy #F5A623, prestige #9B59B6, gold #FFD700, warm #FFF8F0, danger #E74C3C, app-text #2C3E50 ; fontFamily nunito ; maxWidth mobile 430px)
- [ ] T003 [P] Configurer `vitest.config.ts` avec plugin React, jsdom environment et alias `@/*`
- [ ] T004 [P] Configurer `next.config.ts` (reactStrictMode, swcMinify) et créer `vercel.json` vide pour deploy automatique via GitHub push
- [ ] T005 [P] Créer la structure de dossiers vide du projet : `src/app/`, `src/components/ui/`, `src/components/screens/`, `src/store/`, `src/data/`, `src/lib/`, `public/avatars/`

---

## Phase 2: Fondations (Prérequis bloquants)

**Purpose**: Types TypeScript, données statiques, store Zustand, composants UI réutilisables — TOUT doit être complet avant les user stories

**⚠️ CRITIQUE** : Aucune user story ne peut démarrer avant la fin de cette phase

- [ ] T006 Définir tous les types TypeScript dans `src/store/types.ts` : interfaces `AppState`, `Famille`, `Enfant`, `Tache`, `CompletionTache`, `Recompense`, `Rachat`, `Trophee`, `TropheeAvecProgression`, `RecompenseAvecEtat`, `ValidationResult`, `CreateEnfantInput`, type `AvatarId = 1|2|3|4|5|6|7|8`, union `Genre = 'garcon'|'fille'`
- [ ] T007 [P] Implémenter les 20 tâches statiques dans `src/data/taches.ts` : 10 tâches base (10 XP, 0C) + 10 tâches épiques (20 XP, 5C) avec id kebab-case, titre, type, icone emoji — liste complète dans spec.md §Données pré-définies
- [ ] T008 [P] Implémenter les 10 récompenses statiques dans `src/data/recompenses.ts` : 6 privilèges (5C–30C) + 4 butins (15C–40C) avec id, titre, catégorie, cout, icone emoji
- [ ] T009 [P] Implémenter les 10 trophées statiques dans `src/data/trophees.ts` : Constance d'Acier, Flamme Éternelle, Nettoyeur Agile, Maître du Matin, Collectionneur de Butins, Généreux Chevalier, Étoile de la Semaine, Champion Constant, Completion d'Effort, Légende Familiale — avec critereType et critereValeur
- [ ] T010 [P] Implémenter les seuils XP et titres de niveau dans `src/data/progression.ts` : `SEUILS_XP` (N1→N2: 200, N2→N3: 500, N3→N4: 1000, N4→N5: 2000, doublement progressif jusqu'à N10) + `TITRES_NIVEAU` par genre garçon/fille (10 titres chacun, voir research.md Décision 5)
- [ ] T011 [P] Implémenter `src/lib/storage.ts` : fonction `isLocalStorageAvailable()` (try/catch setItem), export pour utilisation dans layout
- [ ] T012 [P] Implémenter `src/lib/completion.ts` : `getTodayDate(): string` (ISO YYYY-MM-DD local), `isDoubleValidation(completions: CompletionTache[], enfantId: string, tacheId: string): boolean`
- [ ] T013 [P] Implémenter `src/lib/niveau.ts` : `calculerMonteeNiveau(enfant: Enfant): { levelUp: boolean, nouveauNiveau: number, nouvelleXPSeuil: number }` en utilisant SEUILS_XP
- [ ] T014 Implémenter `src/store/selectors.ts` : `getTitreNiveau(enfant)`, `getXPPourcentage(enfant): number`, `getCompletionsAujourdhui(state, enfantId)`, `isTacheCompleteAujourdhui(state, enfantId, tacheId): boolean`, `getRecompensesAvecEtat(enfant): RecompenseAvecEtat[]`, `getTropheesAvecProgression(state, enfant): TropheeAvecProgression[]`, `getRachatsEnfant(state, enfantId): Rachat[]`
- [ ] T015 Implémenter `src/store/actions.ts` : `creerFamille(nom)`, `creerEnfant(data): string`, `validerTache(enfantId, tacheId): ValidationResult` (avec guard double-validation + montée niveau + vérif trophées + persist avant retour), `rachatRecompense(enfantId, recompenseId)` (guard solde insuffisant), `validerStreak(enfantId, tacheId)`
- [ ] T016 Implémenter `src/store/index.ts` : store Zustand avec `persist` middleware (`name: 'quete-familiale-v1'`, `skipHydration: true`, `version: 1`), intégrant toutes les actions et le state initial (`famille: null`, `completions: []`, `rachats: []`)
- [ ] T017 [P] Implémenter `src/components/ui/MobileFrame.tsx` : wrapper `max-w-[430px]` centré, fond `warm` (#FFF8F0), `min-h-screen`, `font-nunito`
- [ ] T018 [P] Implémenter `src/components/ui/TabBar.tsx` : 4 onglets pill-style (🏠 Accueil, ⚔️ Quêtes, 🎁 Catalogue, 👤 Profil), onglet actif coloré (`primary`), navigation via `useRouter`, props `activeTab: 'home'|'quetes'|'catalogue'|'profil'`
- [ ] T019 [P] Implémenter `src/components/ui/XPBar.tsx` : barre dégradé bleu→violet, props `xp: number, xpMax: number`, affichage texte `"{xp} / {xpMax} XP"`, largeur en % calculée, animation `transition-all`
- [ ] T020 [P] Implémenter `src/components/ui/CreditJar.tsx` : bocal avec solde en or, props `credits: number`, emoji 🏺 ou illustration, affichage solde `{credits} C`
- [ ] T021 [P] Implémenter `src/components/ui/TaskCard.tsx` : props `tache: Tache, complete: boolean, streak: number`, carte avec icone emoji, titre, flamme streak (orange), overlay vert ✓ si complete, `onClick` handler, grisée si complete
- [ ] T022 [P] Implémenter `src/components/ui/RewardCard.tsx` : props `recompense: Recompense, accessible: boolean`, couleur si accessible (coche verte), grisée + cadenas si non accessible, affichage coût en crédits
- [ ] T023 [P] Implémenter `src/components/ui/TrophyBadge.tsx` : props `trophee: TropheeAvecProgression`, badge hexagonal illuminé si débloqué, silhouette grisée avec texte progression `"{progressionActuelle}/{progressionMax}"` si non débloqué
- [ ] T024 [P] Implémenter `src/components/ui/AvatarCircle.tsx` : props `avatarId: AvatarId, niveau: number, size?: 'sm'|'md'|'lg'`, image circulaire `public/avatars/{avatarId}.png`, badge niveau en bas à droite
- [ ] T025 Implémenter `src/app/layout.tsx` : root layout avec Nunito via `next/font/google` (weights 400/600/700), viewport `device-width` + `viewportFit: 'cover'`, `useEffect(() => useStore.persist.rehydrate(), [])`, vérification `isLocalStorageAvailable()` → afficher `<ErrorScreen>` si indisponible
- [ ] T026 Implémenter `src/app/page.tsx` : redirect client-side selon état store — si `famille === null` → `/onboarding` ; si `famille.enfants.length === 1` → `/enfant/{id}` ; sinon → `/famille`

**Checkpoint** : Fondations complètes — user stories peuvent démarrer

---

## Phase 3: User Story 1 — Création profil famille + premier enfant (Priority: P1) 🎯 MVP

**Goal**: Le parent crée le profil famille et son premier enfant depuis zéro

**Independent Test**: Ouvrir l'app à froid (localStorage vide) → créer "Famille Mauve" + "Hugo, garçon, 7 ans, avatar 1" → dashboard famille visible ; fermer/rouvrir → données conservées

- [ ] T027 [US1] Implémenter `src/app/onboarding/page.tsx` : étape 1 = Splash (logo + titre "La Quête Familiale", bouton "Commencer"), étape 2 = formulaire Nom Famille (champ texte, bouton "Suivant" → `creerFamille(nom)` + navigate `/onboarding/enfant`) ; logique multi-étapes dans un seul composant avec state local
- [ ] T028 [US1] Implémenter `src/app/onboarding/enfant/page.tsx` : sélecteur genre (bouton Garçon/Fille, couleur active), grille 4 avatars du genre sélectionné (images `public/avatars/`), champ prénom, sélecteur âge +/- (4–15 ans, boutons ronds), bouton "Créer le Héros" → `creerEnfant(data)` + navigate `/famille`

**Checkpoint** : US1 fonctionnelle — onboarding complet et persisté

---

## Phase 4: User Story 2 — Dashboard Famille et sélection d'un enfant (Priority: P1)

**Goal**: Le parent voit tous les profils enfants et peut naviguer entre eux

**Independent Test**: Avec 2 profils créés, taper l'un puis l'autre → dashboards distincts affichés

- [ ] T029 [US2] Implémenter `src/app/famille/page.tsx` : afficher nom famille en header, grille d'avatars enfants cliquables (`AvatarCircle` avec prénom + niveau), tap → navigate `/enfant/{id}`, bouton "+ Ajouter un Héros" → navigate `/onboarding/enfant`

**Checkpoint** : US2 fonctionnelle — navigation multi-enfants opérationnelle

---

## Phase 5: User Story 3 — Dashboard Enfant — état du héros (Priority: P1)

**Goal**: L'enfant voit son avatar, niveau, titre, XP, crédits et ses quêtes du jour

**Independent Test**: Enfant niveau 3, 450 XP, 150 Crédits → toutes les infos affichées correctement avec quêtes du jour

- [ ] T030 [US3] Implémenter `src/app/enfant/[id]/layout.tsx` : layout partagé pour les 4 sous-pages de l'enfant, inclut `<TabBar activeTab={...} />` en bas, `params.id` passé au contexte
- [ ] T031 [US3] Implémenter `src/app/enfant/[id]/page.tsx` : header avec `AvatarCircle` (grand), prénom, titre de niveau adapté au genre (`getTitreNiveau`), `XPBar` avec texte `"{xp} / {xpMax} XP"`, `CreditJar` avec solde, grille `TaskCard` pour les 20 tâches (état complété via `isTacheCompleteAujourdhui`), tap sur carte → navigate `/enfant/{id}/validation/{tacheId}`

**Checkpoint** : US3 fonctionnelle — hub quotidien opérationnel

---

## Phase 6: User Story 4 — Validation d'une tâche par le parent (Priority: P1)

**Goal**: Le parent valide ou rejette une tâche, XP/Crédits attribués avec animation

**Independent Test**: Valider "Faire son lit" (10 XP) → dashboard affiche +10 XP ; tenter une 2ème validation → bloquée

- [ ] T032 [US4] Implémenter `src/components/screens/ValidationSuccess.tsx` : overlay plein écran avec animation Framer Motion — 15 billes dorées (motion.div) tombant vers le bas depuis positions aléatoires, texte "+{xp} XP" et "+{credits} C" en vert, `onComplete` callback après 1.5s ; sauvegarder données avant démarrage animation
- [ ] T033 [US4] Implémenter `src/components/screens/LevelUpOverlay.tsx` : overlay montée de niveau avec nouveau titre de niveau, animation scale-in, bouton "Continuer"
- [ ] T034 [US4] Implémenter `src/app/enfant/[id]/validation/[tacheId]/page.tsx` : afficher tâche (icone grande, titre, gains XP + Crédits), bouton VALIDER (vert, `#27AE60`) → `validerTache()` → show `ValidationSuccess` → si levelUp show `LevelUpOverlay` → navigate retour ; bouton RÉESSAYER (rouge, `#E74C3C`) → navigate retour sans modification ; si tâche déjà complète → redirect immédiat

**Checkpoint** : US4 fonctionnelle — mécanique de validation complète

---

## Phase 7: User Story 5 — Catalogue des récompenses (Priority: P2)

**Goal**: L'enfant peut échanger ses crédits contre des récompenses

**Independent Test**: Solde 15C → récompenses ≤15C accessibles ; >15C verrouillées ; échanger "15 min d'écran" (5C) → solde passe à 10C

- [ ] T035 [US5] Implémenter `src/app/enfant/[id]/catalogue/page.tsx` : 2 onglets (Privilèges / Butins) avec state local, grille de `RewardCard` via `getRecompensesAvecEtat(enfant)`, tap récompense accessible → dialog de confirmation ("Échanger contre {X} Crédits ?") → `rachatRecompense()` → solde mis à jour ; bouton désactivé si `!accessible`

**Checkpoint** : US5 fonctionnelle — catalogue et échanges opérationnels

---

## Phase 8: User Story 6 — Profil et Trophées (Priority: P2)

**Goal**: L'enfant voit sa progression 10 niveaux et ses trophées débloqués/en cours

**Independent Test**: Enfant niveau 3 → niveaux 1-2 complétés (✓ vert), niveau 3 actif (en cours), niveaux 4-10 verrouillés (gris)

- [ ] T036 [US6] Implémenter `src/app/enfant/[id]/profil/page.tsx` : timeline horizontale scrollable de 10 niveaux (complété = vert ✓, actuel = primary animé, verrouillé = gris 🔒 + titre masqué), `XPBar` avec texte progression, grille `TrophyBadge` via `getTropheesAvecProgression(state, enfant)` (3 colonnes, illuminé ou silhouette avec progression texte)

**Checkpoint** : US6 fonctionnelle — profil et trophées opérationnels

---

## Phase 9: Polish & Concerns transverses

**Purpose**: Edge cases, tests logique métier, assets avatars, PWA optionnel, validation finale

- [ ] T037 [P] Exporter les 8 avatars du fichier `family_business.pen` via Pencil → sauvegarder en PNG dans `public/avatars/` nommés `1.png` à `8.png` (1-4 garçon, 5-8 fille)
- [ ] T038 [P] Écrire tests Vitest pour `src/lib/niveau.ts` dans `src/lib/niveau.test.ts` : tester montée de niveau à chaque seuil, xp exactement égal au seuil (edge case), niveau max 10 non dépassé
- [ ] T039 [P] Écrire tests Vitest pour `src/lib/completion.ts` dans `src/lib/completion.test.ts` : tester `getTodayDate()` format YYYY-MM-DD, `isDoubleValidation()` true/false selon completions existantes
- [ ] T040 [P] Écrire tests Vitest pour `src/store/actions.ts` dans `src/store/actions.test.ts` : tester `validerTache` (XP +, crédits +, montée niveau), guard double-validation, `rachatRecompense` (solde -), guard solde insuffisant
- [ ] T041 Intégrer vérification `isLocalStorageAvailable()` dans `src/app/layout.tsx` et créer `src/components/screens/ErrorScreen.tsx` : message "Le stockage local est désactivé. Activez-le dans les paramètres de votre navigateur." affiché si localStorage indisponible
- [ ] T042 [P] Configurer PWA optionnel : installer `@ducanh2912/next-pwa`, mettre à jour `next.config.ts`, créer `public/manifest.json` (name, display:standalone, orientation:portrait-primary, icons 192+512px), créer `public/icon-192x192.png` et `public/icon-512x512.png`
- [ ] T043 Validation finale : tester les 2 scénarios indépendants de `quickstart.md` (US1 onboarding complet + US4 validation tâche) sur viewport 375px (iPhone SE) — vérifier absence scroll horizontal, transitions < 300ms, données persistées après reload

---

## Dépendances & Ordre d'exécution

### Dépendances de phase

- **Phase 1 (Setup)** : Aucune dépendance — démarrer immédiatement
- **Phase 2 (Fondations)** : Dépend de Phase 1 — **bloque toutes les user stories**
  - T006 (types) doit être fait en premier dans Phase 2
  - T007–T013 peuvent tourner en parallèle après T006
  - T014–T015 dépendent de T012, T013
  - T016 dépend de T015
  - T017–T024 peuvent tourner en parallèle après T006
  - T025–T026 dépendent de T016
- **US Phases (3–8)** : Dépendent toutes de Phase 2 complète ; peuvent tourner en parallèle entre elles
- **Polish (Phase 9)** : Dépend de toutes les US phases ; T037–T042 peuvent tourner en parallèle

### Dépendances inter-user stories

- **US1 (P1)** : Aucune dépendance sur autres US
- **US2 (P1)** : Indépendante (lit store déjà créé)
- **US3 (P1)** : Indépendante (affichage uniquement)
- **US4 (P1)** : Dépend de US3 (navigate depuis dashboard enfant)
- **US5 (P2)** : Indépendante (onglet Catalogue séparé)
- **US6 (P2)** : Indépendante (onglet Profil séparé)

### Parallélisation dans Phase 2

```
T006 (types) — séquentiel en premier
  ↓
T007 [P] taches.ts       T008 [P] recompenses.ts    T009 [P] trophees.ts
T010 [P] progression.ts  T011 [P] storage.ts         T012 [P] completion.ts
T013 [P] niveau.ts
  ↓ (tous T007-T013 terminés)
T014 selectors.ts → T015 actions.ts → T016 store/index.ts
T017-T024 composants UI [P tous en parallèle]
  ↓
T025 layout.tsx → T026 page.tsx
```

---

## Exemples parallèles : Phase 2 composants UI

```
# Lancer en parallèle (fichiers distincts, aucune dépendance) :
Task T017: MobileFrame.tsx
Task T018: TabBar.tsx
Task T019: XPBar.tsx
Task T020: CreditJar.tsx
Task T021: TaskCard.tsx
Task T022: RewardCard.tsx
Task T023: TrophyBadge.tsx
Task T024: AvatarCircle.tsx
```

---

## Stratégie d'implémentation

### MVP Minimal (US1 uniquement — livrable en 1 session)

1. Phase 1 : Setup projet
2. Phase 2 : Fondations complètes
3. Phase 3 : US1 — Onboarding
4. **STOP & VALIDER** : tester scénario US1 de quickstart.md
5. Push Vercel → démo

### Livraison incrémentale (recommandé)

1. Setup + Fondations → base prête
2. US1 Onboarding → test indépendant → démo
3. US2 Dashboard Famille → test → démo
4. US3 Dashboard Enfant → test → démo
5. US4 Validation → test → **v1.0 utilisable au quotidien**
6. US5 Catalogue → test → démo
7. US6 Profil & Trophées → test → **v1.0 complète**
8. Polish → production

### MVP Quotidien (US1 + US2 + US3 + US4 = 4 user stories P1)

Après Phase 6 (US4), l'app est **utilisable au quotidien** par la famille — les US5 et US6 sont des bonus motivationnels ajoutés en v2.

---

## Notes

- `[P]` = fichiers distincts, aucune dépendance entre les tâches marquées
- `[USn]` = traçabilité vers la user story correspondante
- Chaque US est testable indépendamment via les scénarios `quickstart.md`
- Committer après chaque tâche ou groupe logique
- S'arrêter à chaque Checkpoint pour valider l'US indépendamment
- Les données statiques (taches, recompenses, trophees) ne changent jamais — pas de CRUD nécessaire en MVP
