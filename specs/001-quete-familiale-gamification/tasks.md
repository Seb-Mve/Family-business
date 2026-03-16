# Tasks: La Quête Familiale — Maquettes Pencil

**Input**: Design documents from `/specs/001-quete-familiale-gamification/`
**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅ | data-model.md ✅ | quickstart.md ✅

**Organisation**: Tâches groupées par user story pour permettre l'implémentation et la validation indépendante de chaque écran dans `family_business.pen`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Peut s'exécuter en parallèle (composants indépendants)
- **[Story]**: User story correspondante (US1 à US5)
- Les "chemins de fichiers" désignent les nœuds dans `family_business.pen`

---

## Phase 1: Setup — Système de design & tokens

**Purpose**: Poser les fondations visuelles communes à tous les écrans

- [x] T001 Configurer les variables de couleur dans `family_business.pen` : bleu `#4A90E2`, vert `#27AE60`, orange `#F5A623`, violet `#9B59B6`, or `#FFD700`, fond `#FFF8F0`, rouge `#E74C3C`, texte `#2C3E50`
- [x] T002 [P] Configurer les variables de typographie : police Nunito, tailles (32px titre, 18px sous-titre, 14px corps, 12px caption), weights (Bold, SemiBold, Regular)
- [x] T003 [P] Configurer les variables d'espacement : gap-sm=8, gap-md=16, gap-lg=24, padding-screen=20, corner-card=16, corner-btn=32

**Checkpoint**: Tokens prêts — tous les composants peuvent référencer les variables

---

## Phase 2: Fondations — Composants réutilisables

**Purpose**: Créer les briques de base utilisées dans tous les écrans

**⚠️ CRITIQUE**: Aucun écran ne peut commencer avant la fin de cette phase

- [x] T004 Créer composant `comp/status-bar` dans `family_business.pen` : barre OS simulée 390×62px, fond transparent, heure "9:41" centré, icônes batterie/signal droite
- [x] T005 [P] Créer composant `comp/tab-bar` dans `family_business.pen` : pill-style 62px hauteur, 4 onglets (Accueil ⚔️, Quêtes 📋, Catalogue 🎁, Profil 👤), onglet actif fond bleu `#4A90E2`, inactif gris `#BDC3C7`
- [x] T006 [P] Créer composant `comp/xp-bar` dans `family_business.pen` : barre de progression dégradé bleu→violet, label "Énergie de l'Expérience", texte progression "450/1000 XP", hauteur 24px, corners arrondis
- [x] T007 [P] Créer composant `comp/credit-jar` dans `family_business.pen` : bocal illustré avec billes dorées remplissant proportionnellement au solde, label "Pots de Crédits", compteur numérique "150 C"
- [x] T008 [P] Créer composant `comp/task-card` dans `family_business.pen` : carte 160×180px, fond blanc, corner 16px, ombre douce, zone illustration 100×100px, titre 14px Bold en bas, badge flamme 🔥+compteur en haut-droite, état "complété" overlay vert avec ✓
- [x] T009 [P] Créer composant `comp/reward-card` dans `family_business.pen` : carte 160×180px, zone illustration, titre, badge coût "X C" or, deux états — disponible (couleur pleine) / verrouillé (grisé + 🔒)
- [x] T010 [P] Créer composant `comp/trophy-badge` dans `family_business.pen` : forme hexagonale 80×80px, deux états — illuminé (couleur + illustration) / silhouette (gris foncé + progression "X/Y")
- [x] T011 [P] Créer composant `comp/avatar-frame` dans `family_business.pen` : cadre circulaire 120px avec bordure colorée selon niveau, nom en dessous, niveau badge en bas-droite

**Checkpoint**: Composants prêts — les 6 écrans peuvent être construits

---

## Phase 3: US1 — Onboarding & Création de profils (P1) 🎯 MVP

**Goal**: Premier lancement — le parent crée le profil famille et le premier enfant

**Independent Test**: Vérifier que les écrans d'onboarding présentent clairement le flux création famille → création enfant (avatar + prénom) → accès au dashboard famille

### Implémentation US1

- [x] T012 [US1] Créer frame `[Écran 0a] Splash / Accueil` dans `family_business.pen` (390×844px) : fond dégradé bleu→violet, logo "La Quête Familiale" centré avec illustration chevalier, bouton "Commencer l'aventure" vert en bas
- [x] T013 [US1] Créer frame `[Écran 0b] Création Famille` dans `family_business.pen` (390×844px) : titre "Votre Famille", champ prénom famille illustré, illustration maison/château en haut, bouton "Suivant" en bas
- [x] T014 [US1] Créer frame `[Écran 0c] Création Profil Enfant` dans `family_business.pen` (390×844px) : titre "Ajouter un Héros", grille de sélection d'avatars (6 options illustrées), champ prénom, bouton "Créer le Héros" vert
- [x] T015 [US1] Générer illustrations IA pour les avatars Niveau 1 "Apprenti" et Niveau 3 "Chevalier" utilisés dans l'onboarding (`family_business.pen` → nœuds avatar)
- [x] T016 [US1] Prendre screenshot et vérifier la cohérence visuelle du flux onboarding (T012→T013→T014)

**Checkpoint**: Onboarding complet — flux création profil validé visuellement

---

## Phase 4: US1 — Dashboard Famille (P1) 🎯 MVP

**Goal**: Écran d'accueil principal — sélection du profil enfant actif

**Independent Test**: Vérifier que le dashboard famille affiche clairement les avatars enfants et permet la navigation vers un profil

### Implémentation Dashboard Famille

- [x] T017 [US1] Créer frame `[Écran 1] Dashboard Famille` dans `family_business.pen` (390×844px) : en-tête "Famille [Nom]" avec icône engrenage paramètres, grille d'avatars enfants (comp/avatar-frame × N), bouton "+ Ajouter un Héros" en bas
- [x] T018 [P] [US1] Ajouter état "famille vide" au frame Dashboard Famille : illustration château vide, texte encourageant "Créez votre premier Héros !", bouton "Ajouter un Héros" centré
- [x] T019 [US1] Prendre screenshot Dashboard Famille et valider layout (avatars bien dimensionnés, lisible par enfant 4 ans)

**Checkpoint**: Dashboard Famille complet — point d'entrée MVP fonctionnel

---

## Phase 5: US2 — Dashboard Enfant (P1) 🎯 MVP

**Goal**: Hub principal de l'enfant — avatar, XP, crédits, quêtes du jour

**Independent Test**: Vérifier que le dashboard enfant affiche l'avatar au niveau 3 (Chevalier), la barre XP à 450/1000, le bocal à 150 C, et au moins 3 cartes de quêtes

### Implémentation Dashboard Enfant

- [x] T020 [US2] Créer frame `[Écran 2] Dashboard Enfant` dans `family_business.pen` (390×844px) : status bar + contenu scrollable + tab bar
- [x] T021 [US2] Ajouter section Hero en haut du Dashboard Enfant : illustration avatar Chevalier niveau 3 centrée (180×180px), titre prénom enfant, badge "Niv. 3 — Chevalier" violet
- [x] T022 [US2] Ajouter comp/xp-bar sous l'avatar : "Énergie de l'Expérience — 450/1000 XP", dégradé bleu→violet, 45% rempli
- [x] T023 [US2] Ajouter comp/credit-jar à droite de la barre XP (ou en ligne) : bocal 150 C avec billes dorées ~15% rempli
- [x] T024 [US2] Ajouter section "Quêtes du Jour" : titre section, grille 2 colonnes de comp/task-card (Faire son lit 🛏️ — 3🔥, Ranger les jouets 🧸 — 1🔥, Devoirs 📚 — 0🔥, Brosser dents 🦷 — 7🔥)
- [x] T025 [P] [US2] Générer illustrations IA pour les 4 cartes de tâches exemples dans `family_business.pen` (lit fait, boîte à jouets, livre scolaire, brosse à dents)
- [x] T026 [P] [US2] Générer illustration IA avatar Chevalier niveau 3 style chibi gaming pour la section hero du Dashboard Enfant
- [x] T027 [US2] Ajouter tab bar (comp/tab-bar) en bas du Dashboard Enfant, onglet "Accueil" actif
- [x] T028 [US2] Prendre screenshot Dashboard Enfant et valider hiérarchie visuelle (avatar dominant, XP lisible, cartes engageantes)

**Checkpoint**: Dashboard Enfant complet — cœur de l'expérience quotidienne validé

---

## Phase 6: US3 — Validation de Tâche (P2)

**Goal**: Écran parent pour valider ou rejeter une tâche — avec feedback visuel fort

**Independent Test**: Vérifier que l'écran présente clairement la tâche, deux actions distinctes VALIDER/RÉESSAYER, et un état post-validation avec indication des billes

### Implémentation Validation

- [x] T029 [US3] Créer frame `[Écran 3a] Validation — En attente` dans `family_business.pen` (390×844px) : illustration tâche "Faire son lit" grand format centré (200×200px), titre tâche 28px Bold, récompense "+5 C / +10 XP" visible
- [x] T030 [US3] Ajouter bouton VALIDER : fond vert `#27AE60`, 100% largeur, hauteur 64px, icône ✓ + texte "VALIDER" 20px Bold blanc, corner 32px
- [x] T031 [US3] Ajouter bouton RÉESSAYER : fond rouge `#E74C3C` secondaire (plus petit — 50% largeur centré), icône ↩️ + texte "RÉESSAYER" 16px Bold blanc, corner 32px
- [x] T032 [US3] Créer frame `[Écran 3b] Validation — Succès (état post-VALIDER)` dans `family_business.pen` : même layout + overlay célébration — billes dorées animées (représentées par trajectoire statique de 5 billes 🟡 → bocal), compteurs incrémentés "+5 C" "+10 XP" en vert, confettis
- [x] T033 [US3] Prendre screenshot des deux états de validation et valider la clarté des actions (VALIDER doit être l'élément le plus visible)

**Checkpoint**: Validation complète — mécanique de récompense principale représentée

---

## Phase 7: US4 — Catalogue de Récompenses (P2)

**Goal**: Shop visuel — Privilèges et Butins avec états accessibles/verrouillés

**Independent Test**: Vérifier que les 2 onglets fonctionnent, au moins 6 cartes par onglet, états accessibles/verrouillés visuellement distincts, solde affiché

### Implémentation Catalogue

- [x] T034 [US4] Créer frame `[Écran 4] Catalogue` dans `family_business.pen` (390×844px) : en-tête "Le Catalogue" avec bocal miniature + "150 C" visible, onglets pill "Privilèges / Butins", grille récompenses scrollable, tab bar bas
- [x] T035 [US4] Ajouter onglet Privilèges actif : grille 2 colonnes de comp/reward-card — "15 min d'écran" (5 C, disponible ✅), "30 min d'écran" (10 C, disponible ✅), "Choix du film" (15 C, disponible ✅), "Cabane salon" (20 C, verrouillé 🔒), "Coucher tardif" (25 C, verrouillé 🔒), "Jeu vidéo coop" (30 C, verrouillé 🔒)
- [x] T036 [US4] Ajouter onglet Butins : grille 2 colonnes de comp/reward-card — "Un livre" (25 C, verrouillé 🔒), "Cartes à collectionner" (30 C, verrouillé 🔒), "Petite figurine" (40 C, verrouillé 🔒), "Friandise boulangerie" (15 C, disponible ✅)
- [x] T037 [P] [US4] Générer illustrations IA pour les 6 cartes Privilèges prioritaires (écran, film, etc.) dans `family_business.pen`
- [x] T038 [P] [US4] Générer illustrations IA pour les 4 cartes Butins prioritaires (livre, cartes, figurine, friandise)
- [x] T039 [US4] Prendre screenshot Catalogue (onglet Privilèges) et valider distinction visuelle disponible/verrouillé

**Checkpoint**: Catalogue complet — motivations à long terme représentées

---

## Phase 8: US5 — Profil & Trophées (P3)

**Goal**: Écran de progression long terme — timeline niveaux + grille badges

**Independent Test**: Vérifier que la timeline affiche les 10 niveaux avec le niveau 3 mis en évidence, et que la grille montre au moins 6 trophées (illuminés + silhouettes)

### Implémentation Profil & Trophées

- [x] T040 [US5] Créer frame `[Écran 5] Profil & Trophées` dans `family_business.pen` (390×844px) : en-tête avatar enfant + prénom + "Chevalier — Niv. 3", section timeline, section trophées, tab bar bas
- [x] T041 [US5] Ajouter timeline de progression horizontale : 10 nœuds de niveau (cercles + avatar miniature), niveau 1-2 complétés (gris foncé ✓), niveau 3 actuel (cercle bleu pulsé, surligné), niveaux 4-10 verrouillés (gris clair 🔒), étiquettes "Apprenti / Écuyer / Chevalier / Gardien…" sous chaque nœud
- [x] T042 [US5] Ajouter section "Trophées" : titre section, grille 3 colonnes de comp/trophy-badge — "Constance d'Acier" illuminé (violet, 4 sem. streak), "Nettoyeur Agile" illuminé (vert, 20 quêtes épiques), "Étoile de la Semaine" illuminé (or), 3 autres en silhouette sombre avec progression (ex. "18/30 jours")
- [x] T043 [P] [US5] Générer illustrations IA pour les 3 trophées débloqués (bouclier acier, balai agile, étoile) dans `family_business.pen`
- [x] T044 [US5] Prendre screenshot Profil & Trophées et valider sentiment de progression et fierté (niveau actuel bien visible, trophées engageants)

**Checkpoint**: Profil complet — progression long terme représentée

---

## Phase 9: Polish & Cohérence globale

**Purpose**: Vérification finale de cohérence visuelle cross-écrans

- [x] T045 [P] Vérifier la cohérence de la tab bar sur tous les écrans (Écrans 2-5) : même composant comp/tab-bar référencé
- [x] T046 [P] Vérifier la cohérence typographique cross-écrans : mêmes tailles de titres, même police Nunito
- [x] T047 [P] Vérifier la cohérence de la palette : aucune couleur non définie dans les tokens utilisée
- [x] T048 Prendre screenshot panoramique de tous les écrans côte à côte et valider la cohérence visuelle globale
- [x] T049 Exporter les écrans principaux en PNG 2x dans `specs/001-quete-familiale-gamification/exports/` pour présentation

---

## Dépendances & Ordre d'exécution

### Dépendances entre phases

- **Phase 1 (Tokens)** : Aucune dépendance — commencer immédiatement
- **Phase 2 (Composants)** : Dépend de Phase 1 — bloque tous les écrans
- **Phases 3-8 (Écrans)** : Dépendent de Phase 2 — peuvent s'exécuter en parallèle une fois Phase 2 complète
- **Phase 9 (Polish)** : Dépend de toutes les phases précédentes

### Dépendances entre User Stories

- **US1 — Onboarding + Dashboard Famille (P1)** : Peut commencer après Phase 2
- **US2 — Dashboard Enfant (P1)** : Peut commencer après Phase 2, parallèle à US1
- **US3 — Validation (P2)** : Peut commencer après Phase 2, références US2 pour contexte
- **US4 — Catalogue (P2)** : Peut commencer après Phase 2, parallèle à US3
- **US5 — Profil (P3)** : Peut commencer après Phase 2, parallèle aux autres

### Opportunités parallèles

- T005, T006, T007, T008, T009, T010, T011 → tous parallèles (Phase 2)
- T025, T026 → parallèles (illustrations IA Dashboard Enfant)
- T037, T038 → parallèles (illustrations IA Catalogue)
- T043 → parallèle aux autres tâches Profil
- T045, T046, T047 → tous parallèles (Polish)

---

## Exemple d'exécution parallèle — Phase 2

```
Lancer simultanément :
- T005 Créer comp/tab-bar
- T006 Créer comp/xp-bar
- T007 Créer comp/credit-jar
- T008 Créer comp/task-card
- T009 Créer comp/reward-card
- T010 Créer comp/trophy-badge
- T011 Créer comp/avatar-frame
(tous indépendants — fichiers/nœuds différents)
```

---

## Stratégie d'implémentation

### MVP (US1 + US2 uniquement — Phases 1 à 5)

1. Compléter Phase 1 : Tokens
2. Compléter Phase 2 : Composants
3. Compléter Phase 3 : Onboarding (T012→T016)
4. Compléter Phase 4 : Dashboard Famille (T017→T019)
5. Compléter Phase 5 : Dashboard Enfant (T020→T028)
6. **ARRÊT ET VALIDATION** : Le cœur de l'app est démontrable

### Livraison complète (toutes phases)

1. MVP → ajouter Phase 6 (Validation) → Phase 7 (Catalogue) → Phase 8 (Profil) → Phase 9 (Polish)
2. Chaque phase ajoute de la valeur sans casser les écrans précédents

---

## Récapitulatif

| Phase | Tâches | User Story | Priorité |
|-------|--------|------------|---------|
| Phase 1 — Tokens | T001–T003 | Setup | — |
| Phase 2 — Composants | T004–T011 | Fondations | — |
| Phase 3 — Onboarding | T012–T016 | US1 | P1 🎯 |
| Phase 4 — Dashboard Famille | T017–T019 | US1 | P1 🎯 |
| Phase 5 — Dashboard Enfant | T020–T028 | US2 | P1 🎯 |
| Phase 6 — Validation | T029–T033 | US3 | P2 |
| Phase 7 — Catalogue | T034–T039 | US4 | P2 |
| Phase 8 — Profil & Trophées | T040–T044 | US5 | P3 |
| Phase 9 — Polish | T045–T049 | Cross | — |
| **Total** | **49 tâches** | 5 stories | — |

## Notes

- [P] = nœuds/composants différents dans le .pen, pas de conflit
- Chaque écran est un frame indépendant dans `family_business.pen`
- Valider visuellement avec `get_screenshot` après chaque phase
- Les illustrations IA sont optionnelles — des formes illustrées colorées suffisent si l'API est indisponible
- Committer le fichier `.pen` après chaque phase complète
