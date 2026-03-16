# Implementation Plan: La Quête Familiale

**Branch**: `001-quete-familiale-gamification` | **Date**: 2026-03-16 | **Spec**: [spec.md](./spec.md)

## Summary

Créer un ensemble complet de maquettes mobiles (Pencil .pen) pour "La Quête Familiale" — application de gamification familiale opérée par le parent, orientée RPG/prestige, 100% en français. L'app couvre 6 écrans principaux : onboarding, dashboard famille, dashboard enfant, validation de tâche, catalogue de récompenses, et profil/trophées. Design mobile-first (390×844px), palette vive, style illustré gaming adapté aux enfants dès 4 ans.

## Technical Context

**Language/Version**: Pencil .pen (design tool — aucun code source)
**Primary Dependencies**: Pencil MCP, polices rondes (Inter/Nunito), icônes Lucide/phosphor
**Storage**: Fichier `.pen` local — `family_business.pen`
**Testing**: Validation visuelle via `get_screenshot`, vérification de layout via `snapshot_layout`
**Target Platform**: Mobile iOS/Android portrait — 390×844px (iPhone 14 standard)
**Project Type**: UI mockup — application mobile
**Performance Goals**: Animations fluides représentées par états statiques illustrant les séquences
**Constraints**: Lisible par enfant de 4 ans, opérable d'une main par le parent, friction minimale
**Scale/Scope**: 6 écrans principaux + système de composants réutilisables

## Constitution Check

Constitution non remplie (template vierge) → aucun gate applicable. Plan validé.

## Project Structure

### Documentation (this feature)

```text
specs/001-quete-familiale-gamification/
├── plan.md              ← ce fichier
├── research.md          ← Phase 0 : décisions design
├── data-model.md        ← Phase 1 : entités et états
├── quickstart.md        ← Phase 1 : guide d'utilisation
└── tasks.md             ← Phase 2 (via /speckit.tasks)
```

### Fichier design

```text
family_business.pen
├── [Composants réutilisables — hors écrans]
│   ├── comp/tab-bar          Barre de navigation pill-style
│   ├── comp/status-bar       Barre de statut OS simulée
│   ├── comp/task-card        Carte de quête illustrée
│   ├── comp/xp-bar           Barre d'expérience
│   ├── comp/credit-jar       Bocal de crédits animé
│   ├── comp/reward-card      Carte de récompense catalogue
│   └── comp/trophy-badge     Badge trophée
│
├── [Écran 0] Onboarding — Création profil famille
├── [Écran 1] Dashboard Famille — Sélecteur de profils
├── [Écran 2] Dashboard Enfant — Hub principal
├── [Écran 3] Validation de tâche — Vue parent
├── [Écran 4] Catalogue — Privilèges & Butins
└── [Écran 5] Profil & Trophées — Progression long terme
```

## Complexity Tracking

Aucune violation de constitution à justifier.

## Phases de design

### Phase 1 — Composants réutilisables (fondations)

Créer d'abord les briques de base pour garantir la cohérence visuelle :

1. **Palette & tokens** : bleu `#4A90E2`, vert `#5CB85C`, orange `#F5A623`, violet `#9B59B6`, fond `#FFF8F0`, or `#FFD700`
2. **Tab bar** pill-style : 4 onglets (Accueil, Quêtes, Catalogue, Profil)
3. **Carte de tâche** : illustration + titre + flamme streak + état (à faire / complété)
4. **Barre XP** : dégradé coloré avec label et progression numérique
5. **Bocal de crédits** : illustration bocal avec billes dorées proportionnelles au solde
6. **Carte de récompense** : illustration + titre + coût en crédits + état (disponible / verrouillé)
7. **Badge trophée** : forme hexagonale illustrée, deux états (illuminé / silhouette)

### Phase 2 — Écrans

Ordre de construction :

1. **Écran 0 — Onboarding** : splash + création profil famille + ajout premier enfant (avatar + prénom)
2. **Écran 1 — Dashboard Famille** : grille d'avatars enfants, card famille avec nom
3. **Écran 2 — Dashboard Enfant** : avatar niveau + XP + bocal + grille de quêtes du jour
4. **Écran 3 — Validation tâche** : tâche en grand + VALIDER (vert) + RÉESSAYER (rouge) + état post-validation avec billes
5. **Écran 4 — Catalogue** : onglets Privilèges / Butins + grille de cartes récompenses
6. **Écran 5 — Profil & Trophées** : timeline niveaux + grille badges
