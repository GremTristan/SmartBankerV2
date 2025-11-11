# Documentation - Module E-Business Card SmartBankers

## Vue d'ensemble

Le module E-Business Card est un micro-module de transport rapide de l'information de connexion développé pour le lancement de SmartBankers (Section 1 du lancement de MyDigiSelf SN) dans les centres financiers, notamment Hong Kong, Genève et Zurich.

## Objectifs

- **Transport rapide de l'information** : Permettre un partage instantané des informations de connexion SmartBankers
- **Double modalité** : Support QR code et NFC pour une accessibilité maximale
- **Intégration MyDigiSelf** : Connexion au système MyDigiSelf pour la gestion des utilisateurs
- **Redirection intelligente** : Accès direct au Manifeste et à la page de souscription

## Fonctionnalités

### 1. QR Code

Le QR code généré automatiquement contient l'URL du Manifeste SmartBankers. Il peut être scanné par n'importe quel appareil équipé d'un lecteur QR code.

**Caractéristiques :**
- Génération dynamique avec la bibliothèque `qrcode.react`
- Niveau de correction d'erreur élevé (H) pour une meilleure lisibilité
- Taille optimisée pour l'affichage mobile (200x200px)
- Liens directs vers le Manifeste et la page de souscription

**Utilisation :**
1. Ouvrir l'E-Business Card depuis le header
2. Scanner le QR code avec l'appareil photo
3. Redirection automatique vers le Manifeste SmartBankers

### 2. NFC (Near Field Communication)

Le partage NFC permet de transférer les informations de connexion par simple contact entre deux appareils compatibles.

**Caractéristiques :**
- Support de l'API Web NFC (Chrome/Edge sur Android)
- Détection automatique du support NFC
- Écriture d'une URL NDEF vers le Manifeste
- Fallback vers vCard si NFC non disponible

**Utilisation :**
1. Activer le partage NFC via le bouton dédié
2. Approcher l'appareil d'un autre appareil compatible NFC
3. Les données sont transférées automatiquement

**Compatibilité :**
- Chrome/Edge sur Android (API Web NFC)
- Nécessite HTTPS pour fonctionner
- Nécessite l'activation du NFC sur l'appareil

### 3. vCard (Fallback)

Si NFC n'est pas disponible, l'utilisateur peut télécharger une carte de contact au format vCard standard.

**Contenu de la vCard :**
- Nom : SmartBankers
- Organisation : MyDigiSelf SN
- URL : Lien vers le Manifeste
- Note : Description du mouvement

### 4. Google Wallet

Ajout de la carte SmartBankers à Google Wallet pour un accès rapide depuis le portefeuille numérique Android.

**Caractéristiques :**
- Détection automatique des appareils Android
- Génération des données de configuration Google Wallet
- QR code intégré dans la carte
- Liens vers le Manifeste et la souscription

**Utilisation :**
1. Sur un appareil Android, cliquer sur "Ajouter à Google Wallet"
2. Les données de configuration sont générées
3. Pour une implémentation complète, un backend est nécessaire pour signer le JWT

**Note :** Une implémentation complète nécessite :
- Un compte développeur Google
- Une clé API Google Wallet
- Un backend pour signer les JWT

### 5. Apple Wallet

Ajout de la carte SmartBankers à Apple Wallet pour un accès rapide depuis le portefeuille numérique iOS.

**Caractéristiques :**
- Détection automatique des appareils iOS
- Génération des données de configuration Apple Wallet
- QR code intégré dans la carte
- Liens vers le Manifeste et la souscription

**Utilisation :**
1. Sur un appareil iOS, cliquer sur "Ajouter à Apple Wallet"
2. Les données de configuration sont générées au format JSON
3. Pour une implémentation complète, un backend est nécessaire pour générer le fichier .pkpass signé

**Note :** Une implémentation complète nécessite :
- Un compte développeur Apple
- Un certificat Apple Developer
- Un backend pour générer et signer les fichiers .pkpass

## Architecture Technique

### Composants

#### EBusinessCard.jsx
Composant principal de l'E-Business Card avec :
- Gestion de l'état NFC
- Génération du QR code
- Interface utilisateur responsive

#### Manifeste.jsx
Page dédiée au Manifeste SmartBankers avec :
- Présentation de la vision
- Description des enjeux
- Engagements du mouvement
- CTA vers l'inscription

### Routing

L'application utilise React Router pour gérer les routes :
- `/` : Page d'accueil avec accès à l'E-Business Card
- `/manifeste` : Page du Manifeste SmartBankers

### Intégration

Le module est intégré dans l'application principale via :
- Bouton dans le header (icône NFC)
- Modal overlay pour l'affichage
- Redirection automatique depuis le QR code

## URLs de Redirection

- **Manifeste** : `{origin}/manifeste`
- **Souscription** : `{origin}/#pricing`

## Design

### Style
- Design minimaliste noir et blanc cohérent avec SmartBankers
- Typographie : Inter (corps) + Playfair Display (titres)
- Animations fluides pour l'ouverture/fermeture

### Responsive
- Mobile-first design
- Adaptation automatique pour tablette et desktop
- QR code redimensionné sur mobile (180x180px)

## Utilisation dans les Centres Financiers

### Hong Kong (Priorité)
- Présentation lors des événements financiers
- Partage rapide via QR code ou NFC
- Intégration dans les réseaux professionnels

### Genève et Zurich
- Déploiement proactif dans les institutions financières
- Formation des équipes sur l'utilisation
- Suivi des conversions depuis l'E-Business Card

## Connexion MyDigiSelf

Le module est connecté au système MyDigiSelf pour :
- Suivi des conversions depuis le QR code/NFC
- Intégration avec le système d'inscription
- Analytics et métriques de performance

## Sécurité

- **HTTPS requis** : L'API NFC nécessite une connexion sécurisée
- **Validation des URLs** : Vérification des redirections
- **Pas de données sensibles** : Seulement des URLs publiques

## Dépendances

```json
{
  "react-router-dom": "^6.x",
  "qrcode.react": "^3.x"
}
```

## Installation

```bash
npm install react-router-dom qrcode.react
```

## Déploiement

1. Build de l'application : `npm run build`
2. Déploiement sur serveur HTTPS (requis pour NFC)
3. Configuration des URLs de redirection
4. Test sur appareils compatibles NFC

## Tests

### QR Code
- [ ] Génération correcte du QR code
- [ ] Scan et redirection vers le Manifeste
- [ ] Affichage responsive sur tous les appareils

### NFC
- [ ] Détection du support NFC
- [ ] Écriture réussie des données
- [ ] Transfert vers appareil cible
- [ ] Gestion des erreurs

### vCard
- [ ] Téléchargement du fichier .vcf
- [ ] Contenu correct de la vCard
- [ ] Import dans applications de contacts

## Métriques à Suivre

- Nombre d'ouvertures de l'E-Business Card
- Scans de QR code réussis
- Partages NFC réussis
- Téléchargements de vCard
- Conversions depuis le Manifeste
- Inscriptions depuis la page de souscription

## Intégration des Wallets

### Google Wallet

Pour une intégration complète de Google Wallet, vous devez :

1. **Créer un compte développeur Google Wallet**
   - Accéder à [Google Wallet API](https://developers.google.com/wallet)
   - Créer un projet Google Cloud
   - Activer l'API Google Wallet

2. **Configurer le backend**
   - Installer la bibliothèque Google Wallet API
   - Créer un service pour signer les JWT
   - Générer les liens d'ajout vers Google Wallet

3. **Mettre à jour le frontend**
   - Remplacer la fonction `handleAddToGoogleWallet` par un appel API
   - Utiliser le lien généré par le backend

### Apple Wallet

Pour une intégration complète d'Apple Wallet, vous devez :

1. **Créer un compte développeur Apple**
   - Accéder à [Apple Developer](https://developer.apple.com)
   - Obtenir un certificat de passe
   - Configurer l'identifiant de type de passe

2. **Configurer le backend**
   - Utiliser une bibliothèque de génération de passes (ex: `passkit`)
   - Créer un service pour générer les fichiers .pkpass
   - Signer les passes avec le certificat Apple

3. **Mettre à jour le frontend**
   - Remplacer la fonction `handleAddToAppleWallet` par un appel API
   - Télécharger le fichier .pkpass généré

## Évolutions Futures

- Support de plus de formats NFC
- Personnalisation de la vCard par utilisateur
- Analytics intégrés
- Support de la géolocalisation pour les centres financiers
- Intégration avec les réseaux sociaux professionnels
- Backend pour génération complète des passes wallet
- Support de Samsung Pay et autres wallets

## Support

Pour toute question ou problème :
- Documentation technique : Voir le code source
- Support utilisateur : Contact via le site SmartBankers
- Développement : Équipe MyDigiSelf SN

---

**Version** : 1.0  
**Date** : 2024  
**Auteur** : Équipe SmartBankers / MyDigiSelf SN

