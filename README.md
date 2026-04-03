# DomotiqueApp

PWA Angular de domotique connectée à un serveur [Domoticz](https://www.domoticz.com/wiki/Domoticz_API/JSON_URL's).

Générée avec [Angular CLI](https://github.com/angular/angular-cli) version **20.3.16**.

---

## Stack technique

- **Angular 20** — standalone components, zoneless (`provideZonelessChangeDetection`), signaux natifs
- **Angular Material 20** + **Material Symbols** — UI et icônes
- **Angular PWA** (`@angular/service-worker`) — mode offline
- **Vitest** — tests unitaires
- **TypeScript 5.8**

---

## Fonctionnalités

- Visualisation et contrôle des **volets roulants** (blinds)
- Contrôle des **interrupteurs** (switches, dimmers, push buttons)
- Lecture des **capteurs de température / humidité**
- Lecture des **capteurs** divers (mouvements, contacts…)
- **Favoris** — accès rapide aux équipements marqués
- **Plans / pièces** dynamiques (chargés depuis l'API Domoticz)
- **Arrosage** (sprinklers) avec sélecteurs de zones
- **Configuration** serveur (URL, identifiants) stockée en `localStorage`
- Navigation latérale avec **badge** indiquant le nombre de plans

---

## Architecture

- Pas de NgRx — état géré via **signaux Angular** dans `DeviceStoreService`
- Routing **hash-based**, composants lazy-loaded
- Tous les appels API passent par `DomoticzApiService` → `<serverUrl>/json.htm` (Basic Auth)
- Composants bouton **dumb** (inputs/outputs) + composants page **smart** (inject services)

---

## Serveur Domoticz cible

Version **2024.7**

---

## Commandes

```bash
npm start          # Serveur de dev — localhost:4200
npm run build      # Build de production
npm run watch      # Build watch (config développement)
npm test           # Tests unitaires (Vitest, single run)
npm run test:watch # Vitest en mode watch
npm run test:ui    # Vitest avec interface navigateur
```

---

## TODO

- Ajouter une page pour les équipements inconnus (`Unknown`)
- Ajouter la gestion des scénarios
- Ajouter la gestion des mesures
