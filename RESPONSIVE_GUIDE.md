# Guide Responsive - Landing Page SmartBanker

## Breakpoints

La landing page utilise les breakpoints suivants pour s'adapter aux différentes tailles d'écran :

- **Mobile** : `375px × 812px` (jusqu'à 767px)
- **Tablet** : `768px × 1024px` (768px à 1023px)
- **Desktop** : `1440px × 1024px` (1024px et plus)

### Variables CSS

```css
--breakpoint-mobile: 375px;
--breakpoint-tablet: 768px;
--breakpoint-desktop: 1440px;
```

## Grille (Grid System)

### Structure de base

- **Container** : `max-width: 1440px` avec padding responsive
- **Mobile** : `padding: 0 2rem` (32px)
- **Tablet** : `padding: 0 4rem` (64px)
- **Desktop** : `padding: 0 3rem` (48px de chaque côté)

### Grilles par composant

#### Hero Section
- **Desktop** : `grid-template-columns: 1fr 1fr` (2 colonnes)
- **Tablet/Mobile** : `grid-template-columns: 1fr` (1 colonne)

#### Features Section
- **Desktop** : `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`
- **Tablet** : `grid-template-columns: repeat(2, 1fr)`
- **Mobile** : `grid-template-columns: 1fr`

#### Testimonials
- **Desktop** : `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`
- **Mobile** : `grid-template-columns: 1fr`

#### Pricing Section
- **Desktop** : `grid-template-columns: 1fr 1fr` (2 colonnes)
- **Tablet/Mobile** : `grid-template-columns: 1fr` (1 colonne)

#### Footer
- **Desktop** : `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`
- **Mobile** : `grid-template-columns: 1fr`

## Échelle Typographique

### Hiérarchie des titres

Utilisation de `clamp()` pour une typographie fluide :

```css
h1 {
  font-size: clamp(2rem, 5vw, 4.5rem);      /* 32px - 72px */
}

h2 {
  font-size: clamp(1.75rem, 4vw, 3.5rem);  /* 28px - 56px */
}

h3 {
  font-size: clamp(1.5rem, 3vw, 2.5rem);   /* 24px - 40px */
}

p {
  font-size: clamp(1rem, 1.5vw, 1.125rem); /* 16px - 18px */
}
```

### Tailles spécifiques par breakpoint

#### Mobile (≤ 767px)
- Titre principal : `2rem` (32px)
- Sous-titres : `1.75rem` (28px)
- Corps de texte : `1rem` (16px)
- Petits textes : `0.875rem` (14px)

#### Tablet (768px - 1023px)
- Titre principal : `3rem` (48px)
- Sous-titres : `2.5rem` (40px)
- Corps de texte : `1.0625rem` (17px)

#### Desktop (≥ 1024px)
- Titre principal : `4.5rem` (72px)
- Sous-titres : `3.5rem` (56px)
- Corps de texte : `1.125rem` (18px)

## Espacements (Spacing)

### Variables d'espacement

```css
--spacing-xs: 0.5rem;   /* 8px */
--spacing-sm: 1rem;     /* 16px */
--spacing-md: 2rem;     /* 32px */
--spacing-lg: 4rem;     /* 64px */
--spacing-xl: 6rem;     /* 96px */
```

### Ajustements par breakpoint

- **Mobile** : Réduction de 25-30% des espacements verticaux
- **Tablet** : Espacements standards
- **Desktop** : Espacements maximaux

## Règles d'adaptation

### Navigation (Header)

- **Desktop** : Menu complet horizontal
- **Tablet** : Menu complet avec espacements réduits
- **Mobile** : Menu hamburger (à implémenter) ou liens essentiels uniquement

### Images et médias

- **Hero Image** : 
  - Desktop : `aspect-ratio: 3/2`, largeur complète
  - Mobile : `max-width: 100%`, centré

- **Illustrations** :
  - Toutes les illustrations sont en SVG (vectorielles)
  - S'adaptent automatiquement à la taille du conteneur

### Boutons CTA

- **Desktop** : Taille standard, effets hover complets
- **Mobile** : `width: 100%` pour faciliter le tap, animations simplifiées

### Transitions et animations

- **Desktop** : Animations complètes avec effets hover
- **Mobile** : Animations réduites pour les performances, focus sur les interactions tap

## Media Queries

### Structure standard

```css
/* Mobile First */
.element {
  /* Styles mobile */
}

@media (min-width: 768px) {
  .element {
    /* Styles tablet */
  }
}

@media (min-width: 1024px) {
  .element {
    /* Styles desktop */
  }
}
```

### Points de rupture spécifiques

- `@media (max-width: 767px)` : Mobile uniquement
- `@media (min-width: 768px) and (max-width: 1023px)` : Tablet
- `@media (min-width: 1024px)` : Desktop et plus

## Performance

### Optimisations responsive

1. **Images** : Format WebP pour les images raster, SVG pour les illustrations
2. **Fonts** : Chargement optimisé avec `preconnect` et `display: swap`
3. **CSS** : Utilisation de `clamp()` pour éviter les media queries multiples
4. **JavaScript** : Pas de dépendances lourdes, code vanilla React

## Tests recommandés

### Résolutions à tester

- iPhone SE (375×667)
- iPhone 12/13 (390×844)
- iPad (768×1024)
- iPad Pro (1024×1366)
- Desktop 1440p (1440×900)
- Desktop 1920p (1920×1080)

### Points de vérification

- [ ] Lisibilité du texte à toutes les tailles
- [ ] Espacements cohérents
- [ ] Navigation accessible
- [ ] Boutons facilement cliquables sur mobile
- [ ] Images bien dimensionnées
- [ ] Pas de débordement horizontal
- [ ] Animations fluides sur tous les appareils

