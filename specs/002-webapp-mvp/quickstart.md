# Quickstart — La Quête Familiale Web App MVP

**Branch**: `002-webapp-mvp` | **Date**: 2026-03-16

## Stack

- **Next.js 14** (App Router, `"use client"` sur tous les composants interactifs)
- **TypeScript 5** (strict)
- **Tailwind CSS 3** (tokens couleur dans `tailwind.config.ts`)
- **Zustand 4** + middleware `persist` → localStorage
- **Framer Motion** (animation billes, transitions)
- **Vercel** (deploy auto via GitHub push)

---

## Créer le projet

```bash
npx create-next-app@14 quete-familiale \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd quete-familiale
npm install zustand framer-motion
npm install -D vitest @testing-library/react @testing-library/user-event @vitejs/plugin-react jsdom
```

---

## Structure de fichiers cible

```
quete-familiale/
├── src/
│   ├── app/
│   │   ├── layout.tsx                         # Nunito font, viewport, fond #FFF8F0
│   │   ├── page.tsx                           # Redirect → /onboarding ou /famille
│   │   ├── onboarding/
│   │   │   ├── page.tsx                       # Splash + Création Famille (Écran 0a/0b)
│   │   │   └── enfant/page.tsx                # Création Profil Enfant (Écran 0c)
│   │   ├── famille/
│   │   │   └── page.tsx                       # Dashboard Famille (Écran 1)
│   │   └── enfant/[id]/
│   │       ├── layout.tsx                     # TabBar partagé
│   │       ├── page.tsx                       # Dashboard Enfant (Écran 2)
│   │       ├── validation/[tacheId]/page.tsx  # Validation (Écrans 3a/3b)
│   │       ├── catalogue/page.tsx             # Catalogue (Écran 4)
│   │       └── profil/page.tsx                # Profil & Trophées (Écran 5)
│   ├── components/
│   │   ├── ui/
│   │   │   ├── TabBar.tsx
│   │   │   ├── XPBar.tsx
│   │   │   ├── CreditJar.tsx
│   │   │   ├── TaskCard.tsx
│   │   │   ├── RewardCard.tsx
│   │   │   ├── TrophyBadge.tsx
│   │   │   ├── AvatarCircle.tsx
│   │   │   └── MobileFrame.tsx
│   │   └── screens/
│   │       ├── ValidationSuccess.tsx
│   │       └── LevelUpOverlay.tsx
│   ├── store/
│   │   ├── index.ts                           # Store Zustand + persist
│   │   ├── types.ts                           # Tous les types TypeScript
│   │   ├── actions.ts                         # validerTache, rachatRecompense…
│   │   └── selectors.ts                       # getTitreNiveau, getXPPourcentage…
│   ├── data/
│   │   ├── taches.ts                          # 20 tâches (10 base + 10 épiques)
│   │   ├── recompenses.ts                     # 10 récompenses (6 privilèges + 4 butins)
│   │   ├── trophees.ts                        # 10 trophées
│   │   └── progression.ts                     # Seuils XP + titres de niveau
│   └── lib/
│       ├── completion.ts                      # isDoubleValidation, getTodayDate
│       └── niveau.ts                          # calculerMonteeNiveau
├── public/avatars/                            # 8 PNG avatars (issus de family_business.pen)
├── tailwind.config.ts
├── next.config.ts
└── vitest.config.ts
```

---

## Scénario de test indépendant — US1 (Onboarding)

1. Ouvrir l'app à froid (localStorage vide)
2. Vérifier redirection vers `/onboarding`
3. Saisir "Famille Mauve" → cliquer "Suivant"
4. Sélectionner "Garçon" → vérifier 4 avatars garçon affichés
5. Choisir avatar chevalier, saisir "Hugo", âge "7" → cliquer "Créer le Héros"
6. **Attendu** : dashboard famille affiché avec Hugo, niveau 1, 0 XP, 0 Crédits
7. Fermer / rouvrir l'onglet → **attendu** : données conservées, landing sur dashboard Hugo (enfant unique)

---

## Scénario de test indépendant — US4 (Validation tâche)

1. Depuis le dashboard Hugo, taper sur "Faire son lit"
2. **Attendu** : écran validation affiché (tâche, +10 XP, +0 Crédits)
3. Taper "VALIDER" → **attendu** : animation billes, retour dashboard, XP = 10
4. Retenter la validation → **attendu** : carte marquée complète, 2ème validation bloquée
5. Taper "Passer l'aspirateur" → VALIDER → **attendu** : XP +20, Crédits +5

---

## Tokens Tailwind

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      primary: '#4A90E2',    // boutons primaires, XP
      success: '#27AE60',    // VALIDER, complété
      energy: '#F5A623',     // streaks, flammes
      prestige: '#9B59B6',   // niveaux, trophées
      gold: '#FFD700',       // crédits, bocal
      warm: '#FFF8F0',       // fond général
      danger: '#E74C3C',     // RÉESSAYER, bloqué
      'app-text': '#2C3E50', // texte principal
    },
    fontFamily: {
      nunito: ['Nunito', 'sans-serif'],
    },
    maxWidth: {
      mobile: '430px',       // conteneur app
    }
  }
}
```

---

## Pattern store Zustand (hydratation SSR-safe)

```typescript
// src/store/index.ts
'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppState } from './types'

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      famille: null,
      completions: [],
      rachats: [],
      // ... actions
    }),
    {
      name: 'quete-familiale-v1',
      skipHydration: true,
    }
  )
)

// src/app/layout.tsx — déclencher la rehydratation côté client
'use client'
useEffect(() => {
  useStore.persist.rehydrate()
}, [])
```

---

## Références design

- Maquettes Pencil : `family_business.pen` (branche `001-quete-familiale-gamification`)
- Palette : `specs/001-quete-familiale-gamification/quickstart.md`
- Titres de niveau par genre : `specs/001-quete-familiale-gamification/research.md` Décision 5
- Data model complet : `specs/002-webapp-mvp/data-model.md`
- Contrats actions store : `specs/002-webapp-mvp/contracts/store-actions.md`

---

## Prochaine étape

Lancer `/speckit.tasks` pour générer la liste ordonnée des tâches d'implémentation.
