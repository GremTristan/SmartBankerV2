# SmartBanker - Landing Page Corporate

Landing page minimaliste et artistique sur les enjeux de l'intelligence artificielle, utilisant une palette noir et blanc.

## 🎨 Design

- **Style** : Minimaliste, artistique, corporate
- **Couleurs** : Noir et blanc prédominants
- **Typographie** : Inter (corps) + Playfair Display (titres)
- **Thème** : Sensibilisation aux enjeux de l'IA, exploitation des données, impact sur l'emploi

## 📦 Installation

```bash
npm install
```

## 🚀 Développement

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

## 🏗️ Build

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`

## 📱 Responsive Design

La landing page est entièrement responsive avec trois breakpoints principaux :

- **Mobile** : 375×812px
- **Tablet** : 768×1024px  
- **Desktop** : 1440×1024px

Voir `RESPONSIVE_GUIDE.md` pour les détails complets.

## 🧩 Composants

### Composants réutilisables

1. **Header** (`src/components/Header.jsx`)
   - Navigation sticky
   - Logo et menu
   - CTA dans le header

2. **Hero** (`src/components/Hero.jsx`)
   - Section principale avec titre accrocheur
   - Image hero avec transition smooth
   - Boutons CTA

3. **Features** (`src/components/Features.jsx`)
   - 4 enjeux principaux
   - Icônes SVG minimalistes
   - Cards avec hover effects

4. **SocialProof** (`src/components/SocialProof.jsx`)
   - Témoignages
   - Logos d'entreprises

5. **Pricing** (`src/components/Pricing.jsx`)
   - Section CTA principale
   - Liste de bénéfices
   - Bouton avec micro-animations

6. **Footer** (`src/components/Footer.jsx`)
   - Liens de navigation
   - Informations de contact
   - Réseaux sociaux

7. **Loader** (`src/components/Loader.jsx`)
   - Loader minimal au chargement

## ✨ Interactions

### Micro-animations CTA

- **Hover** : Transformation, ombre, effet de vague
- **Tap/Click** : Feedback visuel immédiat
- **Transitions** : Smooth avec `cubic-bezier`

### Hero Image

- Transition smooth au chargement
- Opacity fade-in
- Transform translateY

### Loader

- Animation de rotation
- Fade-out au chargement complet

## 🖼️ Assets

### Illustrations

- `public/assets/illustrations/data-exploitation.svg` - Exploitation des données
- `public/assets/illustrations/job-loss.svg` - Perte d'emploi
- `public/assets/illustrations/transparency.svg` - Manque de transparence

### Hero Image

- `public/assets/hero-image.svg` - Image principale hero section

### Format

- Toutes les illustrations sont en **SVG** (vectorielles, scalables)
- Format **WebP** recommandé pour les images raster (à ajouter si nécessaire)

## 📐 Structure du projet

```
SmartBankerV2/
├── public/
│   └── assets/
│       ├── illustrations/
│       └── hero-image.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx / Header.css
│   │   ├── Hero.jsx / Hero.css
│   │   ├── Features.jsx / Features.css
│   │   ├── SocialProof.jsx / SocialProof.css
│   │   ├── Pricing.jsx / Pricing.css
│   │   ├── Footer.jsx / Footer.css
│   │   └── Loader.jsx / Loader.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── RESPONSIVE_GUIDE.md
```

## 🎯 Fonctionnalités

- ✅ Header sticky avec effet au scroll
- ✅ Hero section avec image et CTA
- ✅ Section Features (4 enjeux)
- ✅ Preuve sociale (témoignages + logos)
- ✅ Section Pricing/CTA avec micro-animations
- ✅ Footer complet
- ✅ Loader minimal
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Animations et transitions smooth
- ✅ Design minimaliste noir et blanc

## 🔧 Technologies

- **React** 18.2.0
- **Vite** 5.0.8
- **CSS3** (Variables, Grid, Flexbox, Animations)

## 📝 Notes

- Le design privilégie la lisibilité et l'impact visuel
- Toutes les animations sont optimisées pour les performances
- Le code est modulaire et facilement extensible
- Les composants sont réutilisables et maintenables

## 📄 Licence

Tous droits réservés - SmartBanker 2024

