# Data Model: La Quête Familiale

**Branch**: `001-quete-familiale-gamification` | **Date**: 2026-03-16

## Entités

### Famille
| Champ | Type | Description |
|-------|------|-------------|
| id | string | Identifiant unique |
| nom | string | Nom de la famille (ex. "Famille Mauve") |
| dateCreation | date | Date d'installation |
| enfants | Enfant[] | Liste des profils enfants |

---

### Enfant
| Champ | Type | Description |
|-------|------|-------------|
| id | string | Identifiant unique |
| prenom | string | Prénom affiché |
| genre | "garcon" \| "fille" | Détermine le path de progression (titres de niveaux) |
| age | number | Âge de l'enfant (4-15 ans) |
| avatarId | string | Référence au type d'avatar (1-8 = choix création, évolue avec le niveau) |
| niveau | number | Niveau actuel (1-10) |
| xp | number | XP total accumulé |
| xpPourProchainNiveau | number | Seuil XP du prochain niveau |
| credits | number | Solde de crédits disponibles |
| streaks | Map<tacheId, number> | Compteur de séries hebdomadaires par tâche |
| trophees | string[] | IDs des trophées débloqués |
| historiqueRecompenses | Rachat[] | Historique des récompenses obtenues |

**Titres de niveau par genre** : voir `research.md` — Décision 5.

**Seuils XP par niveau** :
- N1→N2 : 200 XP
- N2→N3 : 500 XP
- N3→N4 : 1 000 XP
- N4→N5 : 2 000 XP
- N5→N10 : doublement progressif

---

### Tâche (Quête)
| Champ | Type | Description |
|-------|------|-------------|
| id | string | Identifiant unique |
| titre | string | Titre court affiché sur la carte |
| type | "base" \| "epique" | Base = XP surtout, Épique = Crédits surtout |
| xpValeur | number | XP gagnés à la validation (défaut Base: 10, Épique: 20) |
| creditsValeur | number | Crédits gagnés (défaut Base: 0, Épique: 5) |
| illustrationId | string | Référence à l'illustration de la carte |
| actif | boolean | Si la tâche est visible dans le dashboard |

---

### CompletionTache (état quotidien par enfant)
| Champ | Type | Description |
|-------|------|-------------|
| enfantId | string | Référence à l'enfant |
| tacheId | string | Référence à la tâche |
| date | date | Jour concerné |
| statut | "a_faire" \| "complete" | État de complétion |
| dateValidation | datetime \| null | Timestamp de validation par le parent |

---

### Récompense
| Champ | Type | Description |
|-------|------|-------------|
| id | string | Identifiant unique |
| titre | string | Titre court affiché |
| categorie | "privilege" \| "butin" | Onglet du catalogue |
| cout | number | Coût en Crédits |
| illustrationId | string | Référence à l'illustration |
| disponible | boolean | Si visible dans le catalogue |
| personnalisee | boolean | Créée par le parent (vs. présélectionnée) |

---

### Rachat
| Champ | Type | Description |
|-------|------|-------------|
| id | string | Identifiant unique |
| enfantId | string | Référence à l'enfant |
| recompenseId | string | Référence à la récompense |
| dateRachat | datetime | Moment du rachat |
| creditsDebites | number | Montant déduit |

---

### Trophée
| Champ | Type | Description |
|-------|------|-------------|
| id | string | Identifiant unique |
| titre | string | Nom du trophée (ex. "Constance d'Acier") |
| description | string | Courte description |
| illustrationId | string | Référence au badge illustré |
| critereType | "serie" \| "type_tache" \| "niveau" \| "special" | Type de critère |
| critereValeur | number \| string | Seuil de déblocage |

**Trophées prédéfinis (10 minimum)** :

| Titre | Critère | Valeur |
|-------|---------|--------|
| Constance d'Acier | série (semaines) | 4 sem. consécutives |
| Flamme Éternelle | série (semaines) | 12 sem. consécutives |
| Nettoyeur Agile | tâches ménagères validées | 20 tâches épiques |
| Maître du Matin | quêtes de base matin | 30 matins consécutifs |
| Collectionneur de Butins | butins rachetés | 5 butins |
| Généreux Chevalier | aide frère/sœur | 10 fois validé |
| Étoile de la Semaine | 7 tâches validées en 1 semaine | 1 fois |
| Champion Constant | 7 tâches/semaine pendant 4 sem. | 4 fois |
| Completion d'Effort | tâche épique à 20 crédits | 1 fois |
| Légende Familiale | atteindre le niveau 10 | niveau 10 |

---

## Transitions d'état

### Tâche quotidienne
```
À faire → [parent tape sur la carte] → Écran validation → [VALIDER] → Complète + XP/Crédits attribués
                                                         → [RÉESSAYER] → À faire (inchangé)
```

### Niveau enfant
```
XP accumulé < seuil → [validation tâche] → XP accumulé ≥ seuil → Animation montée de niveau → Nouveau niveau + nouvel avatar
```

### Série (streak)
```
[fin de semaine] → Parent valide la série → Compteur +1 → Vérification déblocage trophées
```

### Crédit
```
Solde crédits → [validation tâche épique] → Solde + créditsValeur
Solde crédits → [rachat récompense] → Solde - cout (si solde ≥ cout)
```
