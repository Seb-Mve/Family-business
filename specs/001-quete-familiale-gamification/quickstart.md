# Quickstart — La Quête Familiale (Maquettes Pencil)

**Branch**: `001-quete-familiale-gamification` | **Date**: 2026-03-16

## Ouvrir les maquettes

1. Ouvrir Pencil
2. Ouvrir le fichier `family_business.pen` (dans `/Users/sebastienmauve/Documents/Family business/`)
3. Les 6 écrans sont disposés horizontalement sur le canvas, de gauche à droite

## Structure du canvas

| Position | Écran | Description |
|----------|-------|-------------|
| 1er (gauche) | Onboarding | Création profil famille + premier enfant |
| 2e | Dashboard Famille | Sélecteur de profils enfants |
| 3e | Dashboard Enfant | Hub principal (avatar, XP, bocal, quêtes) |
| 4e | Validation tâche | Vue parent — VALIDER / RÉESSAYER |
| 5e | Catalogue | Privilèges & Butins |
| 6e (droite) | Profil & Trophées | Timeline niveaux + badges |

## Composants réutilisables

Les composants se trouvent en dehors des écrans principaux (zone gauche du canvas) :

- `Tab Bar` — navigation pill-style 4 onglets
- `Task Card` — carte de quête illustrée
- `XP Bar` — barre d'expérience
- `Credit Jar` — bocal de crédits
- `Reward Card` — carte catalogue
- `Trophy Badge` — badge hexagonal trophée

## Palette de couleurs

| Token | Hex | Usage |
|-------|-----|-------|
| Bleu principal | `#4A90E2` | Actions primaires, XP |
| Vert succès | `#27AE60` | Validé, VALIDER, accessible |
| Orange énergie | `#F5A623` | Streaks, flammes |
| Violet prestige | `#9B59B6` | Niveaux, trophées |
| Or récompense | `#FFD700` | Crédits, billes |
| Fond chaud | `#FFF8F0` | Arrière-plan général |
| Rouge alerte | `#E74C3C` | RÉESSAYER, bloqué |
| Texte principal | `#2C3E50` | Corps de texte |

## Flux utilisateur principal

```
Onboarding
    ↓ (premier lancement seulement)
Dashboard Famille
    ↓ (tap sur avatar enfant)
Dashboard Enfant
    ↓ (tap sur carte de tâche)
Écran de Validation
    ↓ (VALIDER → animation billes → retour dashboard)
    ↓ (RÉESSAYER → retour dashboard)
Dashboard Enfant
    ↓ (onglet Catalogue)
Catalogue Récompenses
    ↓ (onglet Profil)
Profil & Trophées
```

## Prochaine étape

Lancer `/speckit.tasks` pour générer la liste ordonnée des tâches de design à exécuter dans Pencil.
