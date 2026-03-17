# Contract: localStorage Schema

**Branch**: `002-webapp-mvp` | **Date**: 2026-03-16

## Clé de stockage

```
localStorage['quete-familiale-v1']
```

Valeur : JSON string sérialisé par Zustand `persist` middleware.

---

## Structure JSON stockée

```json
{
  "state": {
    "famille": {
      "id": "uuid-v4",
      "nom": "Famille Mauve",
      "dateCreation": "2026-03-16",
      "enfants": [
        {
          "id": "uuid-v4",
          "prenom": "Hugo",
          "genre": "garcon",
          "age": 7,
          "avatarId": 1,
          "niveau": 1,
          "xp": 0,
          "xpPourProchainNiveau": 200,
          "credits": 0,
          "streaks": {},
          "trophees": []
        }
      ]
    },
    "completions": [
      {
        "id": "uuid-v4",
        "enfantId": "uuid-v4",
        "tacheId": "faire-son-lit",
        "date": "2026-03-16",
        "statut": "complete",
        "dateValidation": "2026-03-16T08:30:00.000Z"
      }
    ],
    "rachats": [
      {
        "id": "uuid-v4",
        "enfantId": "uuid-v4",
        "recompenseId": "15-min-ecran",
        "dateRachat": "2026-03-16T18:00:00.000Z",
        "creditsDebites": 5
      }
    ]
  },
  "version": 0
}
```

---

## Invariants et contraintes

| Contrainte | Règle |
|------------|-------|
| Unicité completion | Max 1 completion `{enfantId, tacheId, date}` avec `statut: 'complete'` |
| Solde crédits | `enfant.credits >= 0` toujours |
| Niveau | `enfant.niveau ∈ [1, 10]` |
| AvatarId | `enfant.avatarId ∈ [1, 8]` |
| Âge | `enfant.age ∈ [4, 15]` |
| XP cohérent | `enfant.xp >= 0` |
| Rachat valide | `creditsDebites === recompense.cout` au moment du rachat |

---

## Migration de schéma

Toute modification du schéma doit :
1. Incrémenter la version dans la clé (`quete-familiale-v2`, etc.)
2. Implémenter une fonction `migrate(persistedState, version)` dans le store

```typescript
persist(store, {
  name: 'quete-familiale-v1',
  version: 1,
  migrate: (persistedState, version) => {
    if (version === 0) {
      // migration v0 → v1
    }
    return persistedState
  }
})
```

---

## Comportement si localStorage indisponible

1. Détecter la disponibilité au démarrage
2. Si indisponible → afficher `<ErrorScreen message="Le stockage local est désactivé. Activez-le dans les paramètres de votre navigateur." />`
3. Ne jamais crasher silencieusement
4. Aucune donnée ne doit être perdue sans avertissement explicite
