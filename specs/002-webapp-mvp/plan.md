# Implementation Plan: La Quête Familiale — Web App MVP

**Branch**: `002-webapp-mvp` | **Date**: 2026-03-16 | **Spec**: [spec.md](./spec.md)

## Summary

Développer une web app mobile-first "La Quête Familiale" en Next.js 14 / TypeScript / Tailwind CSS, fidèle aux 9 écrans de la branche `001-quete-familiale-gamification`. Données persistées en localStorage via Zustand. Pas de backend. Deploy sur Vercel via GitHub.

## Technical Context

**Language/Version**: TypeScript 5 strict
**Framework**: Next.js 14 (App Router)
**Styling**: Tailwind CSS 3 — palette tokens issus du design (bleu #4A90E2, vert #27AE60, orange #F5A623, violet #9B59B6, or #FFD700, fond #FFF8F0, rouge #E74C3C)
**State/Persistence**: Zustand 4 + middleware `persist` → localStorage
**Animation**: Framer Motion (animation billes validation)
**Deploy**: Vercel (via GitHub push automatique)
**Testing**: Vitest + Testing Library (logique métier uniquement)
**Target Platform**: Mobile web portrait — min 375px (iPhone SE) → max 430px (iPhone 15 Pro Max)
**PWA**: @ducanh2912/next-pwa pour installabilité sur mobile (optionnel MVP — meilleur support App Router)
**Performance Goals**: TTI < 2s sur 4G, transitions < 300ms
**Constraints**: Offline-first, aucune requête réseau post-chargement initial
**Scale/Scope**: 1 famille, 2-5 enfants, ~20 tâches, ~10 récompenses

## Constitution Check

Constitution non remplie (template vierge) → aucun gate applicable. Plan validé.

## Project Structure

```text
quete-familiale/                     ← repo dédié (nouveau)
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout — font, viewport, couleurs globales
│   │   ├── page.tsx                 # Entry: redirect → /onboarding ou /famille
│   │   ├── onboarding/
│   │   │   ├── page.tsx             # Écran 0a Splash + 0b Création Famille
│   │   │   └── enfant/page.tsx      # Écran 0c Création Profil Enfant
│   │   ├── famille/
│   │   │   └── page.tsx             # Écran 1 Dashboard Famille
│   │   └── enfant/[id]/
│   │       ├── page.tsx             # Écran 2 Dashboard Enfant
│   │       ├── validation/[tacheId]/page.tsx  # Écran 3a/3b Validation
│   │       ├── catalogue/page.tsx   # Écran 4 Catalogue
│   │       └── profil/page.tsx      # Écran 5 Profil & Trophées
│   ├── components/
│   │   ├── ui/
│   │   │   ├── TabBar.tsx           # Navigation pill-style 4 onglets
│   │   │   ├── XPBar.tsx            # Barre XP avec dégradé
│   │   │   ├── CreditJar.tsx        # Bocal de crédits
│   │   │   ├── TaskCard.tsx         # Carte de quête avec streak
│   │   │   ├── RewardCard.tsx       # Carte récompense avec état
│   │   │   ├── TrophyBadge.tsx      # Badge trophée illuminé/silhouette
│   │   │   ├── AvatarCircle.tsx     # Avatar enfant circulaire
│   │   │   └── MobileFrame.tsx      # Wrapper max-w-[430px] centré
│   │   └── screens/
│   │       ├── ValidationSuccess.tsx # Overlay animation billes
│   │       └── LevelUpOverlay.tsx    # Overlay montée de niveau
│   ├── store/
│   │   ├── index.ts                 # Zustand store principal avec persist
│   │   ├── types.ts                 # Types TypeScript toutes entités
│   │   ├── actions.ts               # Actions métier (validerTache, rachatRecompense…)
│   │   └── selectors.ts             # Sélecteurs dérivés (niveauTitle, xpPourcentage…)
│   ├── data/
│   │   ├── taches.ts                # 20 tâches statiques (base + épiques)
│   │   ├── recompenses.ts           # 10 récompenses statiques
│   │   ├── trophees.ts              # 10 trophées statiques
│   │   └── progression.ts           # Seuils XP + titres de niveau par genre
│   └── lib/
│       ├── completion.ts            # Logique date du jour, double-validation
│       └── niveau.ts                # Calcul montée de niveau
├── public/
│   └── avatars/                     # 8 images PNG avatars (garçons + filles)
├── tailwind.config.ts               # Tokens couleur design system
├── next.config.ts
└── vitest.config.ts
```

## Phases de développement

### Phase 1 — Setup & fondations (bloquant)
1. Init repo Next.js 14 + TypeScript + Tailwind
2. Configurer tokens couleur Tailwind (palette design)
3. Configurer Zustand store avec persist middleware
4. Définir tous les types TypeScript (types.ts)
5. Injecter les données statiques (taches, recompenses, trophees, progression)
6. MobileFrame wrapper (max-w-[430px], centré, fond #FFF8F0)
7. Configurer Vercel deploy

### Phase 2 — Composants UI réutilisables
1. TabBar (4 onglets, onglet actif coloré)
2. XPBar (dégradé bleu→violet, progression %)
3. CreditJar (bocal + solde)
4. TaskCard (emoji icône, titre, streak, état complété)
5. RewardCard (emoji, titre, coût, état accessible/verrouillé)
6. TrophyBadge (illuminé/silhouette + progression)
7. AvatarCircle (image circulaire + badge niveau)

### Phase 3 — Onboarding (US1)
1. Splash screen animé
2. Formulaire Création Famille
3. Formulaire Création Enfant (sélecteur genre, grille avatars, âge, prénom)
4. Persistence au submit, redirect dashboard famille

### Phase 4 — Dashboard Famille (US2)
1. Grille avatars enfants cliquables
2. Navigation vers dashboard enfant
3. Bouton "+ Ajouter un Héros"
4. Raccourci 1 enfant → direct dashboard enfant

### Phase 5 — Dashboard Enfant (US3)
1. Header avatar + nom + titre de niveau genre-adapté
2. XPBar avec données réelles
3. CreditJar avec solde réel
4. Grille TaskCard quêtes du jour (état du jour calculé)
5. TabBar avec onglet Accueil actif

### Phase 6 — Validation de tâche (US4)
1. Écran 3a : tâche en grand + XP + Crédits + VALIDER + RÉESSAYER
2. Action validerTache : mise à jour XP, crédits, completion
3. Vérification montée de niveau
4. Écran 3b : overlay animation billes (Framer Motion)
5. Overlay LevelUp si niveau franchi

### Phase 7 — Catalogue (US5)
1. Onglets Privilèges / Butins
2. Grille RewardCard avec états accessibles/verrouillés
3. Action rachatRecompense avec confirmation
4. Déduction crédits + ajout historique

### Phase 8 — Profil & Trophées (US6)
1. Timeline 10 niveaux (complétés / actuel / verrouillés)
2. Grille TrophyBadge avec progression réelle
3. TabBar onglet Profil actif

### Phase 9 — Polish & Deploy
1. Transitions de page (Framer Motion)
2. Safe area insets iOS (padding-bottom)
3. Tests unitaires logique métier (Vitest)
4. PWA manifest + icône
5. Deploy Vercel production
