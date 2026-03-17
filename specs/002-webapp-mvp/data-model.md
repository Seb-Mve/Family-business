# Data Model: La Quête Familiale — Web App MVP

**Branch**: `002-webapp-mvp` | **Date**: 2026-03-16

Modèle de données TypeScript pour le store Zustand. Toutes les entités sont sérialisables en JSON (localStorage).

---

## Types TypeScript — `src/store/types.ts`

### AppState (root du store)

```typescript
interface AppState {
  famille: Famille | null
  completions: CompletionTache[]        // toutes les completions, tous enfants
  rachats: Rachat[]                     // historique rachats, tous enfants

  // Actions
  creerFamille: (nom: string) => void
  creerEnfant: (data: CreateEnfantInput) => void
  validerTache: (enfantId: string, tacheId: string) => void
  rachatRecompense: (enfantId: string, recompenseId: string) => void
  validerStreak: (enfantId: string, tacheId: string) => void
}
```

---

### Famille

```typescript
interface Famille {
  id: string                  // crypto.randomUUID()
  nom: string                 // ex. "Famille Mauve"
  dateCreation: string        // ISO date YYYY-MM-DD
  enfants: Enfant[]
}
```

---

### Enfant

```typescript
interface Enfant {
  id: string                  // crypto.randomUUID()
  prenom: string
  genre: 'garcon' | 'fille'
  age: number                 // 4-15 ans
  avatarId: AvatarId          // 1-8
  niveau: number              // 1-10
  xp: number                  // XP total accumulé
  xpPourProchainNiveau: number // seuil du niveau suivant
  credits: number             // solde disponible
  streaks: Record<string, number>    // { [tacheId]: nbSemainesConsecutives }
  trophees: string[]          // IDs trophées débloqués
}

type AvatarId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
// 1-4 → avatars garçon (si genre='garcon'), 5-8 → avatars fille (si genre='fille')
// À la création, avatarId ∈ {1,2,3,4} pour garçon, {5,6,7,8} pour fille
```

**Valeurs initiales** : `niveau: 1`, `xp: 0`, `xpPourProchainNiveau: 200`, `credits: 0`, `streaks: {}`, `trophees: []`

---

### Tâche (données statiques — `src/data/taches.ts`)

```typescript
interface Tache {
  id: string                  // ex. 'faire-son-lit'
  titre: string               // ex. "Faire son lit"
  type: 'base' | 'epique'
  xpValeur: number            // base: 10, épique: 20
  creditsValeur: number       // base: 0, épique: 5
  icone: string               // emoji ex. "🛏️"
}
```

**20 tâches prédéfinies** (voir spec.md §Données pré-définies).

---

### CompletionTache (état quotidien)

```typescript
interface CompletionTache {
  id: string
  enfantId: string
  tacheId: string
  date: string                // YYYY-MM-DD (date locale)
  statut: 'a_faire' | 'complete'
  dateValidation: string | null  // ISO datetime si validé
}
```

**Index de lookup** : `completions.find(c => c.enfantId === id && c.tacheId === tid && c.date === today)`

---

### Récompense (données statiques — `src/data/recompenses.ts`)

```typescript
interface Recompense {
  id: string
  titre: string               // ex. "15 min d'écran"
  categorie: 'privilege' | 'butin'
  cout: number                // en Crédits
  icone: string               // emoji
}
```

**10 récompenses prédéfinies** (voir spec.md §Données pré-définies).

---

### Rachat

```typescript
interface Rachat {
  id: string
  enfantId: string
  recompenseId: string
  dateRachat: string          // ISO datetime
  creditsDebites: number
}
```

---

### Trophée (données statiques — `src/data/trophees.ts`)

```typescript
interface Trophee {
  id: string
  titre: string               // ex. "Constance d'Acier"
  description: string
  icone: string               // emoji
  critereType: 'serie' | 'type_tache' | 'niveau' | 'special'
  critereValeur: number | string
}

// Progression calculée dynamiquement (non stockée)
interface TropheeAvecProgression extends Trophee {
  debloque: boolean
  progressionActuelle: number
  progressionMax: number
}
```

**10 trophées prédéfinis** (voir data-model.md branche 001).

---

### Progression (données statiques — `src/data/progression.ts`)

```typescript
const SEUILS_XP: Record<number, number> = {
  1: 200,    // N1 → N2
  2: 500,    // N2 → N3
  3: 1000,   // N3 → N4
  4: 2000,   // N4 → N5
  5: 4000,
  6: 8000,
  7: 16000,
  8: 32000,
  9: 64000,
  // N10 = niveau max
}

const TITRES_NIVEAU: Record<'garcon' | 'fille', Record<number, string>> = {
  garcon: {
    1: 'Apprenti',
    2: 'Écuyer Courageux',
    3: 'Chevalier Vaillant',
    4: 'Gardien du Royaume',
    5: 'Champion des Royaumes',
    6: 'Héros Indestructible',
    7: 'Paladin de Lumière',
    8: 'Seigneur des Légendes',
    9: 'Titan de l\'Univers',
    10: 'Légende Suprême et Éternelle',
  },
  fille: {
    1: 'Apprentie',
    2: 'Exploratrice Audacieuse',
    3: 'Guerrière de Lumière',
    4: 'Gardienne du Royaume',
    5: 'Championne Étoilée',
    6: 'Héroïne Indestructible',
    7: 'Enchanteresse Sacrée',
    8: 'Reine des Légendes',
    9: 'Impératrice Cosmique',
    10: 'Légende Suprême et Éternelle',
  },
}
```

---

### Input types (création)

```typescript
interface CreateEnfantInput {
  prenom: string
  genre: 'garcon' | 'fille'
  age: number                 // 4-15
  avatarId: AvatarId
}
```

---

## Transitions d'état

### Validation d'une tâche

```
CompletionTache { statut: 'a_faire' }
  → parent tape carte
  → écran validation
  → [VALIDER]
    → CompletionTache { statut: 'complete', dateValidation: now }
    → Enfant.xp += tache.xpValeur
    → Enfant.credits += tache.creditsValeur
    → si Enfant.xp >= Enfant.xpPourProchainNiveau → monter niveau
  → [RÉESSAYER]
    → retour dashboard, aucune modification
```

### Montée de niveau

```
Enfant.xp >= Enfant.xpPourProchainNiveau
  → Enfant.niveau += 1
  → Enfant.xpPourProchainNiveau = SEUILS_XP[Enfant.niveau]
  → Vérification déblocage trophées
  → Animation LevelUpOverlay
```

### Rachat récompense

```
Condition: Enfant.credits >= Recompense.cout
  → Enfant.credits -= Recompense.cout
  → Rachat créé (enfantId, recompenseId, dateRachat, creditsDebites)
```

### Streak hebdomadaire

```
Parent valide manuellement la série (bouton dans UI)
  → Enfant.streaks[tacheId] += 1
  → Vérification déblocage trophées (critereType: 'serie')
```
