# Research: La Quête Familiale — Web App MVP

**Branch**: `002-webapp-mvp` | **Date**: 2026-03-16

---

## Décision 1 — Framework : Next.js 14 App Router

**Decision**: Next.js 14 avec App Router (pas Pages Router).

**Rationale**: App Router permet le streaming SSR et les Server Components, mais pour une app offline-first 100% client, l'avantage principal est la convention de routing par fichiers et le layout.tsx partagé. Tous les composants interactifs seront marqués `"use client"`. Le SSR est désactivé pour les routes dynamiques avec `dynamic = 'force-dynamic'` ou rendu côté client uniquement.

**Alternatives considered**: Pages Router (déprécié, moins de support futur), Vite + React Router (pas de routing SSR ni de layout natif, plus de config).

**Pattern critique** : `localStorage` n'est pas disponible côté serveur → le Zustand store avec `persist` doit utiliser `skipHydration: true` + `useStore.persist.rehydrate()` dans un `useEffect` côté client pour éviter les erreurs d'hydratation.

---

## Décision 2 — State management : Zustand + persist middleware

**Decision**: Zustand 4 avec le middleware `persist` configuré sur `localStorage`.

**Rationale**: Zustand est minimal (aucun boilerplate), supporte TypeScript first-class, et le middleware `persist` sérialise/désérialise automatiquement en JSON dans `localStorage`. Pour une app sans backend, c'est la solution la plus simple.

**Pattern de store recommandé** :
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // state + actions
    }),
    {
      name: 'quete-familiale-v1',  // clé localStorage
      skipHydration: true,          // évite erreurs SSR/hydratation
    }
  )
)
```

**Hydratation client** : dans le root layout ou un Provider :
```typescript
useEffect(() => {
  useStore.persist.rehydrate()
}, [])
```

**Alternatives considered**: Redux Toolkit (trop verbeux pour MVP), Jotai (primitives atomiques — moins adapté à un store structuré avec entités relationnelles), React Context (pas de persistence intégrée).

---

## Décision 3 — Tailwind CSS : configuration mobile-first

**Decision**: Tailwind CSS 3 avec tokens personnalisés dans `tailwind.config.ts`. Breakpoint cible : `max-w-[430px]` centré sur desktop, plein écran sur mobile.

**Tokens design system** :
```typescript
extend: {
  colors: {
    primary: '#4A90E2',
    success: '#27AE60',
    energy: '#F5A623',
    prestige: '#9B59B6',
    gold: '#FFD700',
    warm: '#FFF8F0',
    danger: '#E74C3C',
    text: '#2C3E50',
  },
  fontFamily: {
    nunito: ['Nunito', 'sans-serif'],
  }
}
```

**Contrainte 375px** : toujours tester en iPhone SE. Éviter les `gap` ou `padding` > 16px sur les éléments de liste. Utiliser `text-sm` (14px) minimum pour les labels enfants.

**Alternatives considered**: CSS Modules (pas de tokens partagés), Styled Components (runtime CSS-in-JS, impacte perf mobile), Emotion (idem).

---

## Décision 4 — Animation : Framer Motion

**Decision**: Framer Motion pour les animations critiques (billes crédits, montée de niveau, transitions d'écrans).

**Pattern animation billes** (validation tâche) :
```typescript
// Billes or qui tombent dans le bocal
<motion.div
  initial={{ y: -100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
/>
```

**Contrainte performance** : utiliser `transform` et `opacity` uniquement (GPU-accelerated). Éviter `width`, `height`, `top`, `left` dans les animations.

**Transitions écrans** : `AnimatePresence` avec `mode="wait"` pour les changements de page, durée 200-250ms max pour rester sous le seuil SC-005 (< 300ms).

**Alternatives considered**: CSS animations (moins de contrôle, pas de séquençage), React Spring (API moins intuitive pour des animations de type jeu).

---

## Décision 5 — Persistence localStorage : structure et migration

**Decision**: Clé unique `quete-familiale-v1` avec versionning. En cas de changement de schéma, incrémenter la version et prévoir une migration dans le middleware `persist` via `onRehydrateStorage`.

**Gestion localStorage indisponible** (edge case spec) :
```typescript
const isLocalStorageAvailable = () => {
  try {
    localStorage.setItem('__test__', '1')
    localStorage.removeItem('__test__')
    return true
  } catch {
    return false
  }
}
```

Si indisponible → afficher un message d'erreur gracieux (FR-017 edge case). Pas de fallback silencieux.

**Taille estimée** : < 50 KB pour 5 enfants + 365 jours de completions. Bien en dessous de la limite localStorage (5-10 MB selon navigateur).

---

## Décision 6 — Routing et navigation post-onboarding

**Decision**: La page d'entrée (`/`) lit le store Zustand et redirige :
- Si `famille === null` → `/onboarding`
- Si `famille.enfants.length === 1` → `/enfant/[id]` directement (US2 scenario 3)
- Sinon → `/famille`

**Pattern** :
```typescript
// app/page.tsx — "use client"
const famille = useStore(s => s.famille)
if (!famille) redirect('/onboarding')
if (famille.enfants.length === 1) redirect(`/enfant/${famille.enfants[0].id}`)
redirect('/famille')
```

**Tab bar** : composant partagé affiché dans `app/enfant/[id]/layout.tsx` — persiste sur tous les écrans post-dashboard-enfant.

---

## Décision 7 — Génération des IDs

**Decision**: `crypto.randomUUID()` (natif navigateur, pas de dépendance externe). Disponible dans tous les navigateurs modernes (Chrome 92+, Firefox 95+, Safari 15.4+).

**Alternatives considered**: `nanoid` (dépendance supplémentaire inutile pour ce cas), `uuid` package (idem).

---

## Décision 8 — Gestion des dates et streaks

**Decision**: Les completions sont indexées par date `YYYY-MM-DD` (format ISO local). La date du jour est calculée côté client via `new Date().toISOString().split('T')[0]`.

**Double-validation** : avant toute validation, vérifier l'existence d'une `CompletionTache` pour `{ enfantId, tacheId, date: today, statut: 'complete' }`.

**Streaks hebdomadaires** : compteur manuel incrémenté par le parent (pas de calcul automatique par date). Stocké dans `enfant.streaks: Record<tacheId, number>`.

---

## Décision 9 — Typographie : Nunito via next/font

**Decision**: Charger Nunito via `next/font/google` dans le root layout pour éviter le flash de texte et optimiser le LCP.

```typescript
import { Nunito } from 'next/font/google'
const nunito = Nunito({ subsets: ['latin'], weight: ['400', '600', '700'] })
```

**Taille minimale** : 14px (tailwind `text-sm`) pour éléments enfant-facing, 12px (`text-xs`) pour métadonnées parent uniquement.

---

## Décision 10 — Testing : Vitest + Testing Library

**Decision**: Tests uniquement sur la logique métier (store actions, calcul niveau, completion). Pas de tests e2e en MVP.

**Fichiers à tester** :
- `lib/niveau.ts` — montée de niveau, seuils XP
- `lib/completion.ts` — détection double validation, date du jour
- `store/actions.ts` — validerTache, rachatRecompense
- `store/selectors.ts` — niveauTitle, xpPourcentage

**Alternatives considered**: Jest (config plus lourde avec Next.js), Playwright (trop long pour MVP).
