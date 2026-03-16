# Feature Specification: La Quête Familiale — Application Mobile de Gamification Familiale

**Feature Branch**: `001-quete-familiale-gamification`
**Created**: 2026-03-16
**Status**: Draft
**Input**: User description: "La Quête Familiale - Family Gamification Mobile App"

---

## Aperçu

"La Quête Familiale" est une application mobile gamifiée destinée aux familles. **L'app reste toujours dans les mains du parent** — l'enfant regarde l'écran avec le parent, il ne tient pas l'appareil. Le parent opère toutes les interactions : attribution de tâches, validation, gestion du catalogue. Chaque tâche accomplie rapporte des XP (expérience) et des Crédits. L'enfant progresse en niveaux (de l'Écuyer au Chevalier et au-delà), débloque des récompenses dans un catalogue, et collectionne des trophées. L'interface est conçue pour être immédiatement compréhensible par de très jeunes enfants (dès 4 ans), ludique, visuelle et orientée gaming avec des récompenses de prestige.

## Clarifications

### Session 2026-03-16

- Q: Quel est le modèle d'accès à l'app — PIN parent, sélecteur de profil, ou autre ? → A: Pas de PIN. L'app s'ouvre directement sur un dashboard famille avec sélecteur de profils enfants. Le parent accède aux fonctions de gestion (ajout de tâches, validation) directement depuis l'interface, sans barrière d'authentification dans le MVP.
- Q: Comment le parent déclenche-t-il la validation d'une tâche ? → A: Option A — Tap direct sur la carte de tâche depuis le dashboard enfant, qui ouvre l'écran de validation. Aucun mode parent séparé dans le MVP.
- Q: Que se passe-t-il pour la série (streak) si une tâche n'est pas validée avant minuit ? → A: Les séries sont hebdomadaires (non quotidiennes). Le parent valide la série en fin de semaine. Ce choix tient compte des familles séparées et évite la punition pour oubli accidentel.
- Q: Comment fonctionne l'approbation des récompenses — l'enfant a-t-il accès à l'app ? → A: L'app reste toujours dans les mains du parent en MVP. L'enfant ne tient pas l'appareil — il regarde l'écran avec le parent. Le parent gère toutes les interactions : validation des tâches, catalogue, récompenses. Pas de flux d'approbation asynchrone nécessaire.
- Q: Quel contenu par défaut pour le catalogue et les tâches ? → A: Listes prédéfinies fournies par le parent (voir section Contenu par défaut ci-dessous). Le parent peut ajouter, modifier ou supprimer des items.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Création de profils famille (Priority: P1)

Un parent installe l'application pour la première fois. L'app s'ouvre sur un dashboard famille. Il crée un profil Famille puis un ou plusieurs profils Enfant en choisissant un avatar et un prénom. À chaque ouverture, l'app affiche directement le dashboard famille avec les profils enfants disponibles — aucun PIN requis. Le parent accède aux fonctions de gestion (tâches, validation, catalogue) directement depuis l'interface.

**Why this priority**: Sans profils distincts, aucune autre fonctionnalité ne peut fonctionner. C'est le point d'entrée obligatoire de toute l'expérience.

**Independent Test**: Peut être testé en créant un profil Famille et un profil Enfant, puis en vérifiant l'accès au dashboard et la sélection de profil.

**Acceptance Scenarios**:

1. **Given** l'app est lancée pour la première fois, **When** le parent suit le flux d'onboarding, **Then** il peut créer un profil Famille et au moins un profil Enfant avec avatar + prénom, sans PIN.
2. **Given** plusieurs profils Enfant existent, **When** l'app s'ouvre, **Then** le dashboard famille affiche les avatars de chaque enfant ; le parent tape un avatar pour accéder au profil correspondant.
3. **Given** un profil Enfant est sélectionné, **When** le parent veut valider une tâche, **Then** il accède directement à l'écran de validation sans saisie de PIN.

---

### User Story 2 — Tableau de bord principal et quêtes du jour (Priority: P1)

L'enfant (ou le parent avec l'enfant) ouvre l'app et voit immédiatement son avatar actuel, son niveau, sa barre XP, son bocal de crédits rempli, et les tâches du jour sous forme de grandes cartes illustrées. Chaque carte montre une illustration de la tâche, un indicateur de série (flamme), et l'état de complétion.

**Why this priority**: C'est l'écran central de l'expérience quotidienne. Il détermine l'engagement de l'enfant chaque jour.

**Independent Test**: Peut être testé en vérifiant que le dashboard affiche correctement avatar, XP, crédits, et les cartes de tâches avec leurs états.

**Acceptance Scenarios**:

1. **Given** un profil Enfant est actif, **When** le tableau de bord s'ouvre, **Then** l'avatar correspondant au niveau est visible, avec la barre XP et le bocal de crédits rempli proportionnellement.
2. **Given** des tâches sont assignées pour aujourd'hui, **When** l'enfant regarde l'écran, **Then** chaque tâche apparaît sous forme de grande carte illustrée avec son indicateur de série de jours.
3. **Given** une tâche a été validée par le parent, **When** l'enfant regarde la carte, **Then** elle affiche un état "complété" visuel distinctif (coche verte, aspect célébratoire).

---

### User Story 3 — Validation de tâche par le parent (Priority: P2)

Le parent appuie directement sur une carte de tâche depuis le dashboard enfant. Un écran de validation s'affiche avec la tâche en grand, deux boutons : VALIDER (vert, prominent) ou RÉESSAYER (rouge, secondaire). Quand il valide, une animation de billes dorées volant vers le bocal se déclenche, et l'enfant reçoit XP + Crédits. Aucun mode parent séparé n'existe dans le MVP.

**Why this priority**: C'est le mécanisme de récompense central. Sans validation, l'enfant ne peut pas progresser.

**Independent Test**: Peut être testé en validant une tâche et en vérifiant l'incrémentation des compteurs XP et Crédits, ainsi que l'animation.

**Acceptance Scenarios**:

1. **Given** le parent est en mode validation, **When** il appuie sur VALIDER, **Then** une animation de billes dorées vole de la zone tâche vers le bocal, et les compteurs XP + Crédits s'incrémentent visuellement.
2. **Given** le parent appuie sur RÉESSAYER, **Then** la tâche reste dans l'état "non validée" et aucun crédit ni XP n'est attribué.
3. **Given** la validation est complétée et l'enfant atteint le seuil XP du niveau suivant, **Then** une animation de montée de niveau se déclenche avec le nouvel avatar débloqué.

---

### User Story 4 — Le Catalogue de récompenses (Priority: P2)

Le parent, avec l'enfant qui regarde l'écran, ouvre le catalogue de récompenses en deux onglets : Privilèges (temps d'écran, sorties, activités) et Butins (objets matériels). L'enfant désigne ce qu'il veut, le parent sélectionne et confirme directement. Chaque récompense affiche une illustration et son coût en Crédits. Les récompenses accessibles (solde suffisant) sont cliquables ; celles hors de portée sont grisées avec une icône cadenas.

**Why this priority**: Le catalogue est la motivation principale de l'enfant à accomplir ses tâches. Il donne une finalité concrète aux Crédits accumulés.

**Independent Test**: Peut être testé en vérifiant que les récompenses sont correctement filtrées selon le solde et que la demande de rachat fonctionne.

**Acceptance Scenarios**:

1. **Given** l'enfant a 150 Crédits, **When** le parent ouvre le catalogue avec l'enfant, **Then** les récompenses à ≤150 C sont cliquables ; celles au-dessus sont grisées avec un cadenas.
2. **Given** l'enfant désigne une récompense accessible, **When** le parent tape dessus et confirme, **Then** les Crédits correspondants sont immédiatement déduits avec animation de billes quittant le bocal.
3. **Given** une récompense est rachetée, **Then** elle apparaît dans l'historique des récompenses de l'enfant.

---

### User Story 5 — Profil, progression et trophées (Priority: P3)

L'enfant consulte son écran de profil qui montre sa progression à long terme : une timeline des niveaux (Niveau 1 à 10 avec avatars), sa position actuelle mise en évidence, et une grille de trophées gagnés (badges illustrés pour séries longues, types de tâches, accomplissements).

**Why this priority**: Renforce l'engagement à long terme et le sentiment de fierté. Non critique au fonctionnement quotidien mais essentiel pour la rétention.

**Independent Test**: Peut être testé en vérifiant que la timeline reflète le niveau actuel et que les trophées s'affichent selon les critères remplis.

**Acceptance Scenarios**:

1. **Given** un enfant est au Niveau 3 (Chevalier), **When** il ouvre l'écran Profil, **Then** la timeline affiche les niveaux 1 à 10 avec le niveau 3 mis en évidence et les niveaux supérieurs verrouillés.
2. **Given** un trophée est débloqué (ex. série de 30 jours), **When** l'enfant ouvre la grille des trophées, **Then** le badge apparaît illuminé avec son titre et sa description courte.
3. **Given** un trophée n'est pas encore débloqué, **When** l'enfant le voit, **Then** il apparaît en silhouette sombre avec une indication de progression (ex. "18/30 jours").

---

### Edge Cases

- Que se passe-t-il si un enfant n'a aucune tâche assignée pour aujourd'hui ? → Écran d'état vide engageant avec message d'encouragement et bouton Parent pour ajouter des quêtes.
- Que se passe-t-il si l'enfant dépense tous ses crédits et tente d'acheter une récompense inaccessible ? → Retour visuel clair (bocal vide animé), message d'encouragement.
- Que se passe-t-il si un enfant atteint le niveau maximum (10) ? → Écran de célébration "Légende Familiale", trophée prestige unique débloqué, mode légende activé.
- Que se passe-t-il si aucun profil Enfant n'a encore été créé ? → L'app affiche un écran d'accueil invitant le parent à créer le premier profil Enfant.

---

## Requirements *(mandatory)*

### Functional Requirements

**Profils & Accès**

- **FR-001**: Le système DOIT permettre la création d'un profil Famille lors du premier lancement (nom de la famille, sans PIN).
- **FR-002**: Le système DOIT permettre la création de plusieurs profils Enfant (minimum 5) avec choix d'avatar parmi une sélection prédéfinie et saisie du prénom.
- **FR-003**: Le système DOIT isoler complètement les données de chaque enfant (XP, Crédits, Tâches, Trophées).
- **FR-004**: L'app DOIT s'ouvrir directement sur le dashboard famille affichant tous les profils Enfant créés, sans authentification requise.
- **FR-005**: L'app est conçue pour être opérée par le parent qui tient l'appareil. L'enfant regarde l'écran. Toutes les interactions de gestion (validation, tâches, catalogue, récompenses) sont effectuées par le parent directement.

**Tableau de bord & Tâches**

- **FR-006**: L'écran principal DOIT afficher l'avatar actuel de l'enfant selon son niveau, sa barre XP avec progression numérique (ex. 450/1000), et son bocal de Crédits rempli proportionnellement au solde.
- **FR-007**: Le système DOIT afficher les tâches du jour sous forme de grille de cartes illustrées avec icône de série (flamme) et compteur de jours.
- **FR-008**: Chaque carte de tâche DOIT afficher : illustration, titre court, nombre de jours de série consécutifs, et état visuel (à faire / complété).
- **FR-009**: Le parent DOIT pouvoir ajouter, modifier et supprimer des tâches depuis le mode Parent.
- **FR-010**: Chaque tâche DOIT avoir une valeur en XP et en Crédits configurable par le parent (valeurs par défaut fournies).

**Validation & Animations**

- **FR-011**: Un tap sur une carte de tâche DOIT ouvrir directement l'écran de validation, qui présente deux actions : VALIDER (prominent, vert, coche) et RÉESSAYER (secondaire, rouge). Aucun mode parent intermédiaire n'est requis dans le MVP.
- **FR-012**: La validation DOIT déclencher une animation de billes dorées volant de la zone tâche vers le bocal de Crédits.
- **FR-013**: L'atteinte d'un seuil d'XP DOIT déclencher une animation de montée de niveau avec affichage du nouvel avatar débloqué.
- **FR-014**: Les séries (streaks) sont calculées à la **semaine** : une série représente le nombre de semaines consécutives où une tâche a été accomplie et validée. Le parent valide la série en fin de semaine (pas de réinitialisation automatique à minuit). Ce mode est conçu pour accommoder les familles séparées et éviter toute dynamique punitive liée à un oubli accidentel.

**Catalogue**

- **FR-015**: Le catalogue DOIT proposer deux catégories : Privilèges et Butins, accessibles via onglets.
- **FR-016**: Chaque récompense DOIT afficher une illustration, un titre court, et son coût en Crédits.
- **FR-017**: Le système DOIT distinguer visuellement les récompenses accessibles (pleine couleur) des inaccessibles (grisées + icône cadenas).
- **FR-018**: Le rachat d'une récompense est effectué directement par le parent (qui tient l'appareil) avec une confirmation en un tap. Aucun flux d'approbation asynchrone n'est nécessaire.
- **FR-019**: Le parent DOIT pouvoir ajouter des récompenses personnalisées au catalogue avec titre, illustration et coût.

**Progression & Trophées**

- **FR-020**: Le système DOIT maintenir 10 niveaux de progression avec avatars distincts et titres (ex. Écuyer, Chevalier, Paladin, etc.).
- **FR-021**: L'écran Profil DOIT afficher une timeline visuelle des niveaux 1 à 10 avec le niveau actuel mis en évidence.
- **FR-022**: Le système DOIT proposer au minimum 10 trophées débloquables selon des critères mesurables (séries, types de tâches, accomplissements spéciaux).
- **FR-023**: Les trophées non encore débloqués DOIVENT afficher la progression vers leur obtention.

### Key Entities

- **Famille**: Groupe principal regroupant un Parent et un ou plusieurs Enfants.
- **Parent**: Utilisateur administrateur, accès direct sans PIN, contrôle les tâches, validations et catalogue depuis l'interface principale.
- **Enfant**: Utilisateur joueur avec profil dédié, avatar, niveau, XP, Crédits, historique de tâches et trophées.
- **Tâche (Quête)**: Action quotidienne assignée à un enfant, avec valeur XP et Crédits, état (à faire/complété), et compteur de série hebdomadaire validée par le parent en fin de semaine.
- **Crédit**: Monnaie virtuelle gagnée en validant des tâches, dépensée dans le catalogue de récompenses.
- **XP (Expérience)**: Points cumulatifs permettant la progression en niveau ; distincts des Crédits.
- **Niveau**: Palier de progression (1 à 10) associé à un avatar unique et un titre de prestige.
- **Récompense**: Item du catalogue (Privilège ou Butin) avec coût en Crédits, soumis à approbation parentale.
- **Trophée**: Badge collectible illustré, débloqué selon des critères d'accomplissement à long terme.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un parent peut compléter l'onboarding complet (compte Parent + 1 profil Enfant + 3 tâches) en moins de 5 minutes lors du premier lancement.
- **SC-002**: Un enfant de 4 à 6 ans peut comprendre son état de progression (niveau, tâches du jour) sans aide parentale en moins de 30 secondes.
- **SC-003**: Le parent peut valider une tâche en moins de 10 secondes depuis le tableau de bord.
- **SC-004**: 100% des éléments interactifs principaux sont atteignables avec le pouce sur un écran mobile standard sans repositionner la main.
- **SC-005**: L'animation de validation (billes dorées) se déclenche dans les 500ms après appui sur VALIDER et se complète en moins de 2 secondes.
- **SC-006**: Le taux de complétion des tâches quotidiennes assignées atteint 70% ou plus après un mois d'utilisation régulière.
- **SC-007**: Les enfants consultent le catalogue au moins 3 fois par semaine, traduisant un engagement actif sur 4 semaines consécutives.
- **SC-008**: Le parent peut passer du dashboard famille à l'écran de validation d'une tâche en moins de 3 tapotements.

---

## Contenu par défaut

### Quêtes de Base (génèrent principalement de l'XP)

1. Se laver le visage le matin
2. Se brosser les dents le matin
3. Se brosser les dents le soir
4. S'habiller en autonomie
5. Mettre le linge sale dans le panier
6. Ranger les chaussures à l'entrée
7. Accrocher le manteau
8. Mettre ses chaussures en autonomie
9. Débarrasser son assiette après le repas
10. Ranger les jouets du quotidien
11. Boire un grand verre d'eau au réveil
12. Se laver les mains avant de passer à table
13. Aller se coucher au premier appel
14. Lire ou regarder un livre pendant 15 minutes
15. Ranger ses livres sur l'étagère après la lecture

### Quêtes Épiques (génèrent principalement des Crédits)

16. Ramasser les miettes sous la table avec une balayette
17. Vider ou remplir le lave-vaisselle
18. Mettre la table complète
19. Trier les jouets non utilisés pour un don
20. Plier et ranger le linge propre
21. Trier les chaussettes propres par paires
22. Aider au nettoyage de la voiture
23. Ranger les courses
24. Participer à la préparation d'un repas
25. Nettoyer le bureau ou l'espace de dessin
26. Sortir le tri sélectif
27. Dépoussiérer les meubles bas avec un chiffon sec
28. Vider les petites corbeilles dans la poubelle principale
29. Nettoyer la table après le repas
30. Aider le petit frère ou la petite sœur

### Privilèges — coût en Crédits faible

1. 15 minutes d'écran supplémentaires
2. 30 minutes d'écran supplémentaires
3. Choix du film pour la soirée
4. Choix du menu d'un repas
5. Choix de la musique lors d'un trajet en voiture
6. Une histoire supplémentaire au coucher
7. Coucher retardé de 30 minutes (le week-end)
8. Exemption exceptionnelle d'une quête de base
9. Prendre un bain moussant prolongé avec des jouets spécifiques
10. Consommer le dessert sur le canapé
11. Utiliser un matériel créatif exceptionnel (peinture, tampons, gommettes)
12. Construction d'une cabane dans le salon
13. Session de jeu vidéo en coopération avec un parent
14. Pique-nique organisé dans le salon ou le jardin
15. Choisir son pyjama pour la nuit (même dépareillé)

### Butins — coût en Crédits élevé

16. Achat d'un livre ou d'une bande dessinée
17. Achat d'un petit jouet ou d'une figurine
18. Paquet de cartes à collectionner
19. Magazine jeunesse
20. Matériel créatif
21. Friandise spéciale en boulangerie
22. Accessoire pour vélo ou trottinette
23. Achat d'un jeu vidéo ou d'une application
24. Sortie au cinéma en famille
25. Sortie dans un parc d'attractions ou zoo
26. Activité extérieure spécifique
27. Peluche
28. Vêtement ou accessoire non essentiel
29. Repas dans un fast-food
30. Jeu de société familial choisi par l'enfant

---

## Assumptions

- L'application est utilisée sur smartphone (iOS ou Android), priorité mobile portrait, conçue en 390×844px (iPhone 14 standard).
- Un seul compte Parent principal par famille dans le MVP (multi-parent hors scope).
- Les tâches sont quotidiennes mais les séries (streaks) sont hebdomadaires : le parent valide la série en fin de semaine. Pas de réinitialisation punitive automatique à minuit.
- Les niveaux, avatars et titres sont prédéfinis par l'app (non personnalisables par le parent dans le MVP).
- Les animations décrites dans les maquettes (billes dorées, montée de niveau) représentent des états statiques illustrant les séquences clés.
- Le catalogue et les tâches sont préchargés avec les listes définitives fournies (30 tâches, 15 Privilèges, 15 Butins) ; le parent peut modifier, ajouter ou supprimer des items.
- L'application fonctionne localement sur l'appareil ; la synchronisation multi-device est hors scope du MVP.
- La langue de l'interface est exclusivement le français.
- Le style visuel est gaming/RPG adapté aux enfants : couleurs vives, icônes illustrées, polices arrondies, récompenses de prestige.
