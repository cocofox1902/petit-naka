# Checklist SEO - Petit Naka

## ✅ DÉJÀ FAIT

### 1. Meta Tags de Base
- ✅ **Meta charset** : UTF-8 défini dans `index.html`
- ✅ **Meta viewport** : Responsive design configuré
- ✅ **Meta description** : Description de base dans `index.html`
- ✅ **Title dynamique** : Titres de page mis à jour dynamiquement via `SEOHead.jsx`
- ✅ **Description dynamique** : Descriptions mises à jour selon la page et le restaurant sélectionné

### 2. Structure HTML
- ✅ **Langue** : `lang="fr"` défini dans `index.html`
- ✅ **Structure sémantique** : Utilisation de `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`
- ✅ **Accessibilité** : Attributs ARIA, navigation clavier, labels

### 3. Performance
- ✅ **Code splitting** : Lazy loading des pages avec React.lazy()
- ✅ **Lazy loading images** : Composant `LazyImage` avec Intersection Observer
- ✅ **Optimisation des assets** : Images optimisées

### 4. Navigation
- ✅ **ScrollToTop** : Retour en haut à chaque changement de page
- ✅ **URLs propres** : Routes React Router configurées
- ✅ **Redirects** : Fichier `_redirects` pour Netlify (SPA)

---

## ❌ À FAIRE

### 1. Meta Tags Avancés (Priorité HAUTE)

#### Open Graph (Facebook, LinkedIn, etc.)
- ❌ `og:title` - Titre pour les réseaux sociaux
- ❌ `og:description` - Description pour les réseaux sociaux
- ❌ `og:image` - Image de partage (logo ou photo du restaurant)
- ❌ `og:url` - URL canonique de la page
- ❌ `og:type` - Type de contenu (website, restaurant, etc.)
- ❌ `og:locale` - Locale (fr_FR)

#### Twitter Cards
- ❌ `twitter:card` - Type de carte (summary, summary_large_image)
- ❌ `twitter:title` - Titre pour Twitter
- ❌ `twitter:description` - Description pour Twitter
- ❌ `twitter:image` - Image pour Twitter
- ❌ `twitter:site` - Compte Twitter (si existe)

#### Autres Meta Tags
- ❌ `meta name="keywords"` - Mots-clés (optionnel, moins important aujourd'hui)
- ❌ `meta name="author"` - Auteur du site
- ❌ `meta name="robots"` - Instructions pour les robots (index, follow)
- ❌ `canonical URL` - URL canonique pour éviter le contenu dupliqué
- ❌ `alternate hreflang` - Si multilingue (pas nécessaire pour l'instant)

### 2. Structured Data / Schema.org (Priorité HAUTE)

#### Restaurant Schema
- ❌ `Restaurant` schema avec :
  - Nom, adresse, téléphone
  - Horaires d'ouverture
  - Menu/offre
  - Note/rating (si disponible)
  - Images
  - Coordonnées GPS

#### LocalBusiness Schema
- ❌ `LocalBusiness` schema pour chaque restaurant
- ❌ `FoodEstablishment` schema
- ❌ `PostalAddress` schema

#### Breadcrumb Schema
- ❌ Navigation breadcrumb pour améliorer l'affichage dans Google

#### WebSite Schema
- ❌ `WebSite` schema avec SearchAction (recherche interne)

### 3. Fichiers SEO (Priorité MOYENNE)

#### robots.txt
- ❌ Créer `/public/robots.txt` avec :
  - User-agent rules
  - Sitemap location
  - Disallow rules si nécessaire

#### sitemap.xml
- ❌ Créer `/public/sitemap.xml` avec :
  - Toutes les pages du site
  - URLs dynamiques pour chaque restaurant
  - Priorités et fréquences de mise à jour
  - Dates de dernière modification

#### humans.txt (Optionnel)
- ❌ Fichier humans.txt avec infos sur l'équipe

### 4. Optimisation Technique (Priorité MOYENNE)

#### Images
- ❌ **Alt text optimisé** : Vérifier que toutes les images ont des alt text descriptifs
- ❌ **Images optimisées** : Format WebP, compression, dimensions appropriées
- ❌ **Lazy loading natif** : Utiliser `loading="lazy"` en plus de l'Intersection Observer

#### Performance
- ❌ **Preload** : Précharger les ressources critiques (fonts, images importantes)
- ❌ **Prefetch** : Précharger les routes suivantes probables
- ❌ **Service Worker** : Pour le cache et l'offline (PWA)

#### Core Web Vitals
- ❌ **LCP (Largest Contentful Paint)** : Optimiser le temps de chargement
- ❌ **FID (First Input Delay)** : Réduire la latence d'interaction
- ❌ **CLS (Cumulative Layout Shift)** : Éviter les décalages de layout

### 5. Contenu SEO (Priorité MOYENNE)

#### Headings
- ❌ Vérifier la hiérarchie H1-H6 (un seul H1 par page)
- ❌ H1 optimisé avec mots-clés pertinents

#### Contenu
- ❌ **Mots-clés** : Intégrer naturellement les mots-clés (cuisine japonaise, restaurant Paris, sushi, ramen, etc.)
- ❌ **Contenu unique** : S'assurer que chaque page a du contenu unique et pertinent
- ❌ **Longueur de contenu** : Minimum 300 mots par page (surtout pour Home et Histoire)

#### Liens Internes
- ❌ Vérifier que les liens internes sont optimisés avec des ancres descriptives
- ❌ Créer un maillage interne cohérent

### 6. Analytics & Tracking (Priorité BASSE)

#### Google Analytics
- ❌ Intégrer Google Analytics 4 (GA4)
- ❌ Événements personnalisés (clics sur réservation, sélection restaurant, etc.)

#### Google Search Console
- ❌ Configurer Google Search Console
- ❌ Soumettre le sitemap
- ❌ Surveiller les erreurs d'indexation

#### Autres
- ❌ Google My Business (si applicable)
- ❌ Facebook Pixel (si applicable)

### 7. Sécurité & HTTPS (Priorité BASSE)

- ❌ **HTTPS** : S'assurer que le site est en HTTPS (généralement géré par Netlify)
- ❌ **Security headers** : Headers de sécurité (Content-Security-Policy, etc.)

### 8. Internationalisation (Optionnel)

- ❌ **Hreflang tags** : Si multilingue dans le futur
- ❌ **Traductions** : Contenu multilingue

---

## 📋 PRIORISATION RECOMMANDÉE

### Phase 1 - Essentiel (À faire en premier)
1. ✅ Meta tags Open Graph
2. ✅ Meta tags Twitter Cards
3. ✅ Structured Data (Schema.org) pour Restaurant
4. ✅ robots.txt
5. ✅ sitemap.xml
6. ✅ URL canonique

### Phase 2 - Important
1. ✅ Optimisation des alt text
2. ✅ Vérification de la hiérarchie H1-H6
3. ✅ Amélioration du contenu (mots-clés, longueur)
4. ✅ Google Search Console

### Phase 3 - Amélioration
1. ✅ Google Analytics
2. ✅ Optimisation Core Web Vitals
3. ✅ Preload/Prefetch
4. ✅ Service Worker (PWA)

---

## 📝 NOTES

- Le site est déjà bien structuré avec React Router
- Les meta tags dynamiques sont déjà en place via `SEOHead.jsx`
- Il faut maintenant enrichir avec Open Graph, Twitter Cards et Schema.org
- Le sitemap devra être généré dynamiquement ou statique avec toutes les routes
- Les images doivent être optimisées et avoir des alt text descriptifs

