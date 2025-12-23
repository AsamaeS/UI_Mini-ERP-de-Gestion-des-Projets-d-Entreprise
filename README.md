# Mini-ERP de Gestion des Projets d'Entreprise

Projet académique réalisé dans le cadre de la formation à l'INPT (2025–2026).

## Objectif

Conception et développement d'un Mini-ERP modulaire destiné aux PME, couvrant :
- Gestion des projets et des tâches
- Ressources Humaines – Gestion des congés et absences
- Gestion documentaire centralisée
- Workflow et traçabilité (audit)
- Reporting et statistiques avancées

## Équipe projet

- **Asmae SERJI** - Chef de Projet
- **Ahlam ELBechari** - Responsable RH / Manager
- **Fatma Haidari** - Développeuse
- **Wijdane Elhariri** - Développeuse

**Encadrant académique :**  
Mahmoud El Hamlaoui

## Technologies utilisées

- **Frontend** : React 18 + TypeScript + Vite
- **UI Framework** : shadcn/ui + Tailwind CSS
- **Routing** : React Router v6
- **State Management** : React Query
- **Charts** : Recharts

## Architecture

Le projet suit une architecture modulaire avec séparation claire entre :
- Interface utilisateur (composants réutilisables)
- Logique métier (hooks et contextes)
- Pages et navigation
- Types TypeScript pour la sécurité de type

## Installation et développement

### Prérequis
- Node.js >= 18.x
- npm ou yarn

### Installation des dépendances
```bash
npm install
```

### Lancement en mode développement
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:8080`

### Build de production
```bash
npm run build
```

## Structure du projet
```
src/
├── components/     # Composants UI réutilisables
├── pages/          # Pages de l'application
├── contexts/       # Contextes React (Auth, etc.)
├── hooks/          # Hooks personnalisés
├── types/          # Définitions TypeScript
└── lib/            # Utilitaires
```

## Fonctionnalités principales

- **Dashboard** : Vue synthétique des KPIs et métriques
- **Gestion de projets** : Création, suivi et reporting
- **RH** : Gestion des congés, absences et équipes
- **Documentaire** : Dépôt et recherche de documents
- **Workflow** : Traçabilité et audit des opérations

## Licence

Projet académique © 2025-2026 INPT
