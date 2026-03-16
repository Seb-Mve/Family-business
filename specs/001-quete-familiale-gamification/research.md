# Research: La Quête Familiale

**Branch**: `001-quete-familiale-gamification` | **Date**: 2026-03-16

## Décision 1 — Style visuel gaming / RPG enfant

**Decision**: Style illustré "RPG chibi" — personnages ronds, expressifs, palette vive, ombres douces, pas de lignes dures. Références : Pokémon GO (lisibilité), Duolingo (gamification bienveillante), Toca Boca (univers enfant).

**Rationale**: L'enfant de 4 ans reconnaît immédiatement l'avatar et son état. Les couleurs vives et les formes rondes sont universellement associées au jeu et à la sécurité pour les jeunes enfants.

**Alternatives considered**: Style flat minimal (trop froid), style réaliste (trop complexe pour jeunes enfants).

---

## Décision 2 — Palette de couleurs

**Decision**:
- Bleu principal : `#4A90E2` (actions, XP, éléments de confiance)
- Vert succès : `#27AE60` (validé, accessible, VALIDER)
- Orange énergie : `#F5A623` (streaks, flammes, accent)
- Violet prestige : `#9B59B6` (niveaux hauts, trophées, éléments de prestige)
- Or récompense : `#FFD700` (crédits, billes, bocal)
- Fond chaud : `#FFF8F0` (blanc cassé chaleureux, non agressif pour les yeux d'un enfant)
- Rouge alerte : `#E74C3C` (RÉESSAYER, éléments bloqués)
- Texte principal : `#2C3E50`

**Rationale**: Palette chaleureuse et joyeuse, chaque couleur a une sémantique claire. L'enfant associe vert = bien, rouge = non, or = récompense sans lire un mot.

---

## Décision 3 — Typographie

**Decision**: Police `Nunito` (arrondie, claire, disponible Google Fonts) — variantes Bold (titres, boutons), SemiBold (labels), Regular (corps). Taille minimale 14px pour les éléments enfant-facing, 12px acceptable pour métadonnées parent.

**Rationale**: Nunito est conçue pour la lisibilité, les extrémités arrondies sont ludiques sans être illisibles. Robuste pour le français avec accents.

**Alternatives considered**: Fredoka One (trop décoratif pour textes longs), Baloo (moins lisible en petit).

---

## Décision 4 — Architecture d'écrans et navigation

**Decision**: Tab bar pill-style en bas (4 onglets) : Accueil (🏠), Quêtes (⚔️), Catalogue (🎁), Profil (👤). Navigation persistante sur tous les écrans post-onboarding.

**Rationale**: 4 onglets = destinations top-level, correspond exactement aux 4 grandes zones de l'app. Le parent mémorise facilement. Les icônes sont immédiatement reconnaissables même sans lire le label.

---

## Décision 5 — Système de niveaux et avatars

**Decision**: 10 niveaux avec titres adaptés au genre de l'enfant. Deux chemins narratifs distincts, convergents au niveau 10.

### Path Garçon — Le Guerrier ⚔️

| Niveau | Titre | Description visuelle avatar |
|--------|-------|-----------------------------|
| 1 | Apprenti | Tunique simple, bâton en bois |
| 2 | Écuyer Courageux | Tunique avec écusson, épée de bois |
| 3 | Chevalier Vaillant | Armure légère, épée métallique |
| 4 | Gardien du Royaume | Armure complète, bouclier |
| 5 | Champion des Royaumes | Armure dorée, cape |
| 6 | Héros Indestructible | Armure lumineuse, halo de feu |
| 7 | Paladin de Lumière | Armure argentée, aura sacrée |
| 8 | Seigneur des Légendes | Armure légendaire, particules magiques |
| 9 | Titan de l'Univers | Transformation cosmique, aura arc-en-ciel |
| 10 | Légende Suprême et Éternelle | Forme ultime, couronne, étoiles |

### Path Fille — L'Enchanteresse ✨

| Niveau | Titre | Description visuelle avatar |
|--------|-------|-----------------------------|
| 1 | Apprentie | Robe simple, baguette de bois |
| 2 | Exploratrice Audacieuse | Tenue d'exploration, carte magique |
| 3 | Guerrière de Lumière | Armure légère, épée enchantée |
| 4 | Gardienne du Royaume | Armure florale, bouclier de cristal |
| 5 | Championne Étoilée | Tenue dorée, cape d'étoiles |
| 6 | Héroïne Indestructible | Aura lumineuse, couronne de lumière |
| 7 | Enchanteresse Sacrée | Robe céleste, sceptre divin |
| 8 | Reine des Légendes | Manteau légendaire, couronne de gemmes |
| 9 | Impératrice Cosmique | Transformation cosmique, aura arc-en-ciel |
| 10 | Légende Suprême et Éternelle | Forme ultime, couronne, étoiles |

**Rationale**: Progression narrative distincte selon le genre mais prestige identique au niveau 10 — les deux enfants atteignent la même récompense ultime. Noms épiques volontairement grandioses pour maximiser la fierté et la motivation. L'enfant comprend instinctivement qu'il "grandit". Chaque palier est visuellement distinct.

### Avatars disponibles à la création (8 types)

| # | Garçon | Fille |
|---|--------|-------|
| 1 | 🛡️ Chevalier | 🧚 Fée |
| 2 | 🧙 Mage | 🔮 Enchanteresse |
| 3 | 🥷 Ninja | 🧝 Elfe Guerrière |
| 4 | 🏹 Archer | 🏴‍☠️ Exploratrice |

---

## Décision 6 — Mécanique des streaks hebdomadaires

**Decision**: La flamme sur chaque carte de tâche représente le nombre de **semaines consécutives** où la tâche a été accomplie et validée par le parent. La validation de la série se fait manuellement par le parent en fin de semaine (bouton dédié dans la vue de gestion).

**Rationale**: Adapté aux familles séparées. Évite la punition pour oubli accidentel. Encourage sur la durée sans créer d'anxiété quotidienne.

---

## Décision 7 — Valeurs XP et Crédits par défaut

**Decision**:
- **Quêtes de Base** : 10 XP, 0 Crédit (hygiène, routines légères)
- **Quêtes Épiques** : 20 XP, 5 Crédits (tâches ménagères, aide familiale)
- **Seuils de niveau** : Niveau 1→2 : 200 XP | 2→3 : 500 XP | 3→4 : 1000 XP (doublement progressif)
- **Catalogue** : Privilèges 5-20 C | Butins 25-100 C

**Rationale**: Équilibre motivant — un enfant faisant 3 quêtes épiques/semaine gagne ~20 C/semaine, peut s'offrir un Privilège en 1 semaine ou un Butin en 1-2 mois. Tension positive sans frustration.
