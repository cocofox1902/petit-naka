# SEO - Actions à faire manuellement

## ⚠️ IMPORTANT : Modifications nécessaires

### 1. URL de base du site (URGENT)

**Fichiers à modifier :**
- `src/components/SEOHead.jsx` (ligne 7)
- `src/components/StructuredData.jsx` (ligne 7)
- `public/robots.txt` (ligne 6)
- `public/sitemap.xml` (toutes les URLs)

**Action :** Remplacez `https://petit-naka.netlify.app` par votre vraie URL de domaine.

**Option recommandée :** Créez un fichier `.env` avec :
```
VITE_BASE_URL=https://votre-domaine.com
```

Puis modifiez les fichiers pour utiliser `process.env.VITE_BASE_URL || 'https://votre-domaine.com'`

---

### 2. Image Open Graph / Twitter Card

**Fichier :** `src/components/SEOHead.jsx`

**Problème actuel :** Le code utilise le logo comme image de partage, mais il faudrait une image dédiée.

**Action :**
1. Créez une image de partage (1200x630px recommandé) avec :
   - Logo Petit Naka
   - Texte "Cuisine Japonaise authentique à Paris"
   - Design attractif pour les réseaux sociaux
2. Placez-la dans `public/og-image.jpg` (ou `.png`)
3. Modifiez `SEOHead.jsx` ligne ~80 pour utiliser cette image :
   ```javascript
   const ogImage = `${BASE_URL}/og-image.jpg`
   ```

---

### 3. Compte Twitter (Optionnel)

**Fichier :** `src/components/SEOHead.jsx`

**Action :** Si vous avez un compte Twitter, ajoutez dans la fonction `updateTwitterCards()` :
```javascript
setMetaTag('twitter:site', '@votre_compte_twitter')
```

---

### 4. Google Search Console

**Actions :**
1. Allez sur https://search.google.com/search-console
2. Ajoutez votre propriété (votre domaine)
3. Vérifiez la propriété (via fichier HTML ou DNS)
4. Soumettez votre sitemap : `https://votre-domaine.com/sitemap.xml`
5. Surveillez les erreurs d'indexation

---

### 5. Google Analytics 4 (GA4)

**Actions :**
1. Créez un compte Google Analytics 4
2. Obtenez votre ID de mesure (format : G-XXXXXXXXXX)
3. Créez un fichier `src/utils/analytics.js` :
   ```javascript
   export const GA_TRACKING_ID = 'G-XXXXXXXXXX'
   
   export const pageview = (url) => {
     window.gtag('config', GA_TRACKING_ID, {
       page_path: url,
     })
   }
   
   export const event = ({ action, category, label, value }) => {
     window.gtag('event', action, {
       event_category: category,
      event_label: label,
      value: value,
    })
  }
   ```
4. Ajoutez le script Google Analytics dans `index.html` :
   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```
5. Intégrez les événements dans vos composants (clics sur réservation, sélection restaurant, etc.)

---

### 6. Optimisation des images

**Actions :**
1. **Compresser les images** : Utilisez des outils comme TinyPNG, Squoosh, ou ImageOptim
2. **Convertir en WebP** : Format moderne plus léger (avec fallback pour les anciens navigateurs)
3. **Dimensions appropriées** : 
   - Images de carousel : max 1920x1080px
   - Images de plats : max 800x600px
   - Logo : max 512x512px
4. **Vérifier les alt text** : Toutes les images doivent avoir des descriptions descriptives

**Outils recommandés :**
- https://squoosh.app/ (compression et conversion)
- https://tinypng.com/ (compression)
- https://www.iloveimg.com/resize-image (redimensionnement)

---

### 7. Contenu SEO

**Actions :**
1. **Vérifier la longueur du contenu** :
   - Page d'accueil : minimum 300 mots
   - Page Histoire : enrichir avec plus de détails
   - Autres pages : s'assurer qu'elles ont du contenu unique

2. **Intégrer des mots-clés naturellement** :
   - "restaurant japonais Paris"
   - "sushi Paris"
   - "ramen Paris"
   - "cuisine japonaise authentique"
   - "restaurant japonais 19ème arrondissement"
   - etc.

3. **Créer du contenu unique pour chaque restaurant** :
   - Descriptions spécifiques
   - Spécialités par restaurant
   - Historique/ambiance

---

### 8. Google My Business

**Actions :**
1. Créez/revendiquez votre fiche Google My Business pour chaque restaurant
2. Ajoutez des photos de qualité
3. Mettez à jour les horaires régulièrement
4. Répondez aux avis clients
5. Publiez des posts régulièrement

---

### 9. Facebook Pixel (Optionnel)

**Si vous utilisez Facebook Ads :**
1. Créez un Pixel Facebook dans Facebook Business Manager
2. Obtenez votre Pixel ID
3. Ajoutez le script dans `index.html`
4. Configurez les événements (PageView, Lead, etc.)

---

### 10. Vérification finale

**Outils de test :**
- **Google Rich Results Test** : https://search.google.com/test/rich-results
  - Testez vos pages avec structured data
- **Facebook Sharing Debugger** : https://developers.facebook.com/tools/debug/
  - Testez vos Open Graph tags
- **Twitter Card Validator** : https://cards-dev.twitter.com/validator
  - Testez vos Twitter Cards
- **Google PageSpeed Insights** : https://pagespeed.web.dev/
  - Testez les performances
- **Google Mobile-Friendly Test** : https://search.google.com/test/mobile-friendly
  - Vérifiez la compatibilité mobile

---

## 📝 Checklist de validation

Avant de mettre en production, vérifiez :

- [ ] URL de base mise à jour partout
- [ ] Image Open Graph créée et configurée
- [ ] Sitemap.xml avec les bonnes URLs
- [ ] robots.txt avec la bonne URL de sitemap
- [ ] Google Search Console configuré
- [ ] Google Analytics configuré (si souhaité)
- [ ] Images optimisées (compression, WebP)
- [ ] Alt text sur toutes les images
- [ ] Contenu unique et suffisant sur chaque page
- [ ] Mots-clés intégrés naturellement
- [ ] Test des rich results avec Google
- [ ] Test des partages sociaux (Facebook, Twitter)
- [ ] Test de performance (PageSpeed Insights)

---

## 🎯 Priorités

1. **URGENT** : Modifier l'URL de base
2. **HAUTE** : Créer l'image Open Graph
3. **HAUTE** : Configurer Google Search Console
4. **MOYENNE** : Optimiser les images
5. **MOYENNE** : Enrichir le contenu
6. **BASSE** : Google Analytics
7. **BASSE** : Facebook Pixel

