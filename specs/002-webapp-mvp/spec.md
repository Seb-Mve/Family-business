# Feature Specification: La Quête Familiale — Web App MVP

**Feature Branch**: `002-webapp-mvp`
**Created**: 2026-03-16
**Status**: Draft
**Design Reference**: Maquettes Pencil — branche `001-quete-familiale-gamification`

## Contexte

La Quête Familiale est une application de gamification familiale opérée par le parent. L'enfant accumule XP et Crédits en accomplissant des tâches quotidiennes validées par le parent. Cette spec couvre l'implémentation web des 9 écrans maquettés, données persistées localement — sans backend.

---

## User Scenarios & Testing

### User Story 1 — Création du profil famille et premier enfant (Priority: P1)

Au premier lancement, le parent crée le profil famille (nom) puis ajoute un enfant (prénom, genre, âge, avatar parmi 8). L'enfant démarre niveau 1, 0 XP, 0 Crédits.

**Why this priority**: Sans profil, aucune fonctionnalité n'est accessible. Porte d'entrée obligatoire.

**Independent Test**: Créer "Famille Mauve" + "Hugo, garçon, 7 ans, avatar chevalier" → accès dashboard famille.

**Acceptance Scenarios**:

1. **Given** premier lancement, **When** nom famille saisi et "Suivant" pressé, **Then** écran création enfant affiché
2. **Given** écran création enfant, **When** genre sélectionné, **Then** grille de 8 avatars du genre correspondant affichée
3. **Given** avatar + prénom + âge saisis, **When** "Créer le Héros" pressé, **Then** dashboard famille affiché avec profil créé
4. **Given** profil créé, **When** app fermée et rouverte, **Then** données conservées, atterrissage sur dashboard famille

---

### User Story 2 — Dashboard Famille et sélection d'un enfant (Priority: P1)

Le parent voit les avatars enfants cliquables. Tap sur avatar → dashboard de l'enfant. Bouton "+ Ajouter un Héros" disponible.

**Why this priority**: Point d'entrée quotidien. Sans navigation entre profils, l'app n'est pas utilisable avec plusieurs enfants.

**Independent Test**: Avec deux profils, le parent navigue de l'un à l'autre via le dashboard famille.

**Acceptance Scenarios**:

1. **Given** dashboard famille, **When** tap sur avatar enfant, **Then** dashboard de cet enfant affiché
2. **Given** dashboard famille, **When** tap sur "+ Ajouter un Héros", **Then** écran création enfant affiché
3. **Given** un seul enfant, **When** app ouverte, **Then** dashboard de l'enfant unique affiché directement

---

### User Story 3 — Dashboard Enfant — état du héros (Priority: P1)

Affiche avatar niveau actuel, prénom, titre de niveau (adapté au genre), barre XP, bocal de crédits, grille quêtes du jour.

**Why this priority**: Coeur de l'expérience quotidienne — ce que l'enfant regarde chaque jour.

**Independent Test**: Enfant niveau 3, 450 XP, 150 Crédits → informations correctement affichées avec quêtes.

**Acceptance Scenarios**:

1. **Given** dashboard enfant, **When** affiché, **Then** titre de niveau adapté au genre (ex. "Chevalier Vaillant" / "Guerrière de Lumière")
2. **Given** XP 450/1000, **When** dashboard affiché, **Then** barre XP à 45% avec texte "450 / 1000 XP"
3. **Given** dashboard enfant, **When** affiché, **Then** quêtes actives affichées en cartes avec compteur de séries
4. **Given** quête validée dans la journée, **When** dashboard affiché, **Then** carte marquée validée (overlay vert)

---

### User Story 4 — Validation d'une tâche par le parent (Priority: P1)

Tap sur carte de tâche → écran de validation avec tâche en grand + gains. VALIDER (vert) attribue XP/Crédits + animation. RÉESSAYER (rouge) renvoie au dashboard sans modification.

**Why this priority**: Mécanique centrale — sans validation, pas de progression possible.

**Independent Test**: Valider "Faire son lit" (10 XP) → dashboard affiche +10 XP.

**Acceptance Scenarios**:

1. **Given** tap sur carte non validée, **When** écran de validation affiché, **Then** tâche, XP gain et Crédits gain visibles
2. **Given** écran validation, **When** VALIDER pressé, **Then** animation billes + "+XP" "+C" en vert, retour dashboard avec valeurs mises à jour
3. **Given** écran validation, **When** REESSAYER pressé, **Then** retour dashboard, tâche inchangée
4. **Given** tâche déjà validée aujourd'hui, **When** parent tente de la valider, **Then** double validation bloquée
5. **Given** validation qui dépasse le seuil XP, **When** VALIDER pressé, **Then** niveau monte, titre de niveau mis à jour

---

### User Story 5 — Catalogue des récompenses (Priority: P2)

Deux onglets (Privilèges / Butins). Récompenses abordables en couleur + coche verte. Hors de portée grisées + cadenas. Échange possible par tap + confirmation, déduit les crédits.

**Why this priority**: Finalité motivationnelle — sans catalogue, les crédits n'ont pas de débouché.

**Independent Test**: Solde 15C → récompenses ≤15C accessibles, >15C verrouillées.

**Acceptance Scenarios**:

1. **Given** catalogue, solde 15C, **When** affiché, **Then** récompenses ≤15C en couleur avec coche, >15C grisées avec cadenas
2. **Given** récompense abordable, **When** tap dessus, **Then** confirmation avant déduction
3. **Given** confirmation acceptée, **When** échange validé, **Then** solde décrémenté, récompense dans historique

---

### User Story 6 — Profil et Trophées (Priority: P2)

Timeline 10 niveaux (complétés / actuel / verrouillés), barre XP, grille trophées (illuminés si débloqués, silhouettes avec progression sinon).

**Why this priority**: Motivation long terme et sentiment de progression durable.

**Independent Test**: Enfant niveau 3 → niveaux 1-2 complétés, niveau 3 actif, niveaux 4-10 verrouillés.

**Acceptance Scenarios**:

1. **Given** écran profil, **When** affiché, **Then** timeline 10 niveaux avec états corrects
2. **Given** trophée débloqué, **When** affiché, **Then** carte illuminée avec nom et illustration
3. **Given** trophée non débloqué, **When** affiché, **Then** silhouette avec progression (ex. "2/4 semaines")

---

### Edge Cases

- Que se passe-t-il si le localStorage est indisponible ? Message d'erreur gracieux, aucune perte silencieuse
- Que se passe-t-il si le XP atteint exactement le seuil ? Montée de niveau déclenchée immédiatement
- Que se passe-t-il en cas de tentative de double validation ? Deuxième tentative bloquée
- Que se passe-t-il si le solde est insuffisant ? Bouton d'échange désactivé
- Que se passe-t-il sur iPhone SE (375px) ? Interface utilisable sans scroll horizontal
- Que se passe-t-il si l'app est fermée pendant l'animation ? Données sauvegardées avant l'animation

---

## Requirements

### Functional Requirements

- **FR-001**: Le système DOIT afficher l'onboarding au premier lancement uniquement
- **FR-002**: Le système DOIT permettre la création d'un profil famille (nom)
- **FR-003**: Le système DOIT permettre la création d'un profil enfant (prénom, genre, âge 4-15, avatar parmi 8)
- **FR-004**: Le système DOIT persister toutes les données localement sans connexion internet requise
- **FR-005**: Le système DOIT afficher le titre de niveau adapté au genre (path Guerrier vs path Enchanteresse)
- **FR-006**: Le système DOIT calculer et afficher la barre XP avec progression vers le niveau suivant
- **FR-007**: Le système DOIT afficher les quêtes du jour avec compteur de séries hebdomadaires
- **FR-008**: Le système DOIT permettre au parent de valider ou rejeter une tâche
- **FR-009**: Le système DOIT attribuer XP et Crédits lors d'une validation selon les valeurs de la tâche
- **FR-010**: Le système DOIT déclencher une montée de niveau automatique quand le seuil XP est atteint
- **FR-011**: Le système DOIT empêcher la double validation d'une même tâche dans la même journée
- **FR-012**: Le système DOIT afficher le catalogue en deux onglets (Privilèges / Butins)
- **FR-013**: Le système DOIT distinguer visuellement récompenses accessibles et verrouillées selon le solde
- **FR-014**: Le système DOIT déduire les crédits du solde lors d'un échange de récompense
- **FR-015**: Le système DOIT afficher la timeline de progression 10 niveaux avec états corrects
- **FR-016**: Le système DOIT afficher la grille de trophées avec états illuminé/silhouette et progression
- **FR-017**: Le système DOIT être utilisable sur mobile portrait (largeur min 375px) sans scroll horizontal

### Données pré-définies (contenu statique MVP)

**Quêtes de base (10 XP, 0 Crédit)** : Faire son lit, Ranger les jouets, Brosser les dents matin, Brosser les dents soir, Se doucher, S'habiller seul, Débarrasser la table, Mettre la table, Ranger son cartable, Faire ses devoirs

**Quêtes épiques (20 XP, 5 Crédits)** : Passer l'aspirateur, Nettoyer les toilettes, Faire la vaisselle, Sortir la poubelle, Ranger le salon, Aider à cuisiner, Arroser les plantes, Nourrir les animaux, Ranger le linge, Aider un frère/soeur

**Privilèges** : 15 min d'écran (5C), 30 min d'écran (10C), Choix du film (15C), Cabane salon (20C), Coucher tardif (25C), Jeu vidéo coop (30C)

**Butins** : Friandise boulangerie (15C), Un livre (25C), Cartes à collectionner (30C), Petite figurine (40C)

**Seuils XP** : N1→N2: 200 | N2→N3: 500 | N3→N4: 1000 | N4→N5: 2000 | N5→N10: doublement progressif

### Key Entities

- **Famille** : nom, liste d'enfants
- **Enfant** : prénom, genre, âge, avatarId, niveau (1-10), XP, crédits, séries hebdomadaires par tâche, trophées débloqués, historique rachats
- **Tâche** : id, titre, type (base/épique), XP, crédits, icône emoji
- **CompletionTâche** : enfantId, tâcheId, date (YYYY-MM-DD), statut (a_faire/complete), dateValidation
- **Récompense** : id, titre, catégorie (privilege/butin), coût en crédits, icône emoji
- **Rachat** : enfantId, récompenseId, dateRachat, crédits débités
- **Trophée** : id, titre, description, critèreType, critèreValeur, progressionActuelle

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: Un parent peut créer un profil famille complet en moins de 2 minutes
- **SC-002**: Un parent peut valider une tâche en moins de 5 secondes depuis le dashboard enfant
- **SC-003**: Les données sont conservées après fermeture et réouverture de l'app
- **SC-004**: L'interface est entièrement utilisable sur 375px de large sans scroll horizontal
- **SC-005**: Toutes les transitions entre écrans s'effectuent en moins de 300ms
- **SC-006**: Les 9 écrans maquettés sont tous implémentés et fonctionnels
- **SC-007**: L'app fonctionne intégralement sans connexion internet

---

## Assumptions

- Les données sont stockées sur un seul appareil — pas de synchronisation multi-appareils en MVP
- Le parent est toujours l'opérateur ; l'enfant ne manipule pas l'app seul
- Les tâches sont des données statiques pré-définies — pas d'ajout/édition personnalisée en MVP
- Les récompenses sont des données statiques pré-définies — pas de personnalisation parent en MVP
- Les séries (streaks) sont hebdomadaires et validées manuellement par le parent
- Les illustrations d'avatars et icônes de tâches sont des emojis ou assets statiques inclus dans l'app
- Un seul enfant actif à l'écran à la fois
