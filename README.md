# Site Maison Rouffiange

Site statique prêt pour GitHub et Vercel.

## Fichiers
- `index.html` : accueil
- `boucherie.html` : boucherie et découpes
- `charcuterie.html` : charcuterie
- `traiteur.html` : traiteur
- `contact.html` : coordonnées et formulaire local
- `style.css` : styles responsive
- `script.js` : menu mobile, animations et onglets
- `assets/images/` : images du site

## Mise en ligne sur GitHub
1. Créer un nouveau dépôt GitHub.
2. Déposer tous les fichiers et dossiers à la racine du dépôt.
3. Valider les fichiers avec un commit.

## Déploiement sur Vercel
1. Dans Vercel, choisir **Add New > Project**.
2. Importer le dépôt GitHub.
3. Framework Preset : **Other**.
4. Ne rien renseigner dans Build Command.
5. Output Directory : laisser vide.
6. Cliquer sur **Deploy**.

## Important pour le formulaire
Le site est statique. Le formulaire de contact ne peut pas envoyer d’e-mail sans service externe. Il affiche le numéro de la boutique à appeler. Pour recevoir les formulaires par e-mail, connecter plus tard Formspree, EmailJS ou un endpoint serveur.

## Images de découpe
Les planches sont actuellement des fichiers PNG. Les zones sont visuellement séparées mais ne sont pas de vrais éléments SVG indépendants. Pour animer chaque morceau séparément, il faudra convertir ou redessiner les planches en SVG interactif.

## Découpes interactives
La page `boucherie.html` comprend désormais des planches interactives pour le bœuf, le veau, le porc et la volaille. Les morceaux séparés se trouvent dans `assets/images/cuts/`. Au survol ou au toucher, la pièce sélectionnée reste nette, tandis que la planche complète est atténuée et une fiche descriptive apparaît à droite.


Nouvelle page ajoutée : `histoire.html` — page de storytelling, équipe et valeurs Maison Rouffiange.
Mise en avant saisonnière ajoutée : section `Brochettes & BBQ` sur l’accueil et la page boucherie.
