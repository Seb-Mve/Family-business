# Contract: Store Actions

**Branch**: `002-webapp-mvp` | **Date**: 2026-03-16

Contrats des actions Zustand exposées par le store. Ces signatures définissent l'interface entre les composants React et la logique métier.

---

## `creerFamille(nom: string): void`

**Préconditions**: `famille === null`
**Effets**:
- Crée `Famille { id: uuid, nom, dateCreation: today, enfants: [] }`
- Persiste en localStorage

---

## `creerEnfant(data: CreateEnfantInput): string`

**Préconditions**: `famille !== null`
**Input**:
```typescript
{ prenom: string, genre: 'garcon'|'fille', age: 4-15, avatarId: 1-8 }
```
**Effets**:
- Crée `Enfant` avec valeurs initiales (niveau 1, xp 0, crédits 0)
- Ajoute à `famille.enfants`
- Retourne l'`id` du nouvel enfant
**Erreurs**: Aucune (validation côté formulaire)

---

## `validerTache(enfantId: string, tacheId: string): ValidationResult`

**Préconditions**:
- `enfant` existe
- `tache` existe
- Pas de completion `{ enfantId, tacheId, date: today, statut: 'complete' }` existante

**Effets**:
1. Crée/met à jour `CompletionTache { statut: 'complete', dateValidation: now }`
2. `enfant.xp += tache.xpValeur`
3. `enfant.credits += tache.creditsValeur`
4. Si `enfant.xp >= enfant.xpPourProchainNiveau` et `enfant.niveau < 10` :
   - `enfant.niveau += 1`
   - `enfant.xpPourProchainNiveau = SEUILS_XP[enfant.niveau]`
   - `levelUp = true`
5. Vérifie déblocage trophées
6. Persiste en localStorage **avant** tout retour (edge case: fermeture pendant animation)

**Retourne**:
```typescript
interface ValidationResult {
  xpGagne: number
  creditsGagnes: number
  levelUp: boolean
  nouveauNiveau?: number
  tropheesDebloques: string[]  // IDs
}
```

**Guard double-validation**: Si completion `complete` existe déjà → throw `Error('DEJA_VALIDE')`

---

## `rachatRecompense(enfantId: string, recompenseId: string): void`

**Préconditions**:
- `enfant.credits >= recompense.cout`

**Effets**:
1. `enfant.credits -= recompense.cout`
2. Crée `Rachat { enfantId, recompenseId, dateRachat: now, creditsDebites: recompense.cout }`
3. Persiste

**Guard solde insuffisant**: Si `enfant.credits < recompense.cout` → throw `Error('SOLDE_INSUFFISANT')` (bouton désactivé côté UI, guard défensif côté store)

---

## `validerStreak(enfantId: string, tacheId: string): void`

**Préconditions**: `enfant` et `tache` existent
**Effets**:
1. `enfant.streaks[tacheId] = (enfant.streaks[tacheId] ?? 0) + 1`
2. Vérifie déblocage trophées `critereType: 'serie'`
3. Persiste

---

## Sélecteurs — `src/store/selectors.ts`

```typescript
// Titre de niveau selon genre
getTitreNiveau(enfant: Enfant): string

// Pourcentage XP pour la barre
getXPPourcentage(enfant: Enfant): number  // 0-100

// Completions du jour pour un enfant
getCompletionsAujourdhui(state: AppState, enfantId: string): CompletionTache[]

// Tâche complétée aujourd'hui ?
isTacheCompleteAujourdhui(state: AppState, enfantId: string, tacheId: string): boolean

// Récompenses avec état accessible/verrouillé
getRecompensesAvecEtat(enfant: Enfant): RecompenseAvecEtat[]

// Trophées avec progression calculée
getTropheesAvecProgression(state: AppState, enfant: Enfant): TropheeAvecProgression[]

// Rachats d'un enfant
getRachatsEnfant(state: AppState, enfantId: string): Rachat[]
```
