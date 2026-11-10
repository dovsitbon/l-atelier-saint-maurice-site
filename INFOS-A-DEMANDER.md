# L'atelier : infos à demander au patron

À rassembler lors du passage au restaurant. Chaque info a sa place dans le site (fichier indiqué).

1. **Le prénom du chef et son histoire** : depuis quand il tient L'atelier, d'où viennent ses recettes. (`locales/*.json` → `blocks.cuisine`, `pages.traditionnel`)
2. **La carte et les prix** : entrées, plats, desserts, vins, avec les prix exacts ; quels plats changent selon la saison. Le cassoulet est-il servi toute l'année ? Le couscous du week-end cité par Amiens Tourisme existe-t-il encore ? (`data/carte.json`, `locales/*.json` → `carte.items`)
3. **La formule du midi** : contenu et prix (Amiens Tourisme indique « à partir de 17 € »). (`data/carte.json` → `formules`)
4. **Le plat du jour** : comment il le décide, qui peut le mettre à jour sur le site, et son prix. (`data/plat-du-jour.json`)
5. **Les horaires exacts** : service du matin dès 8 h 30 (café, petit-déjeuner ?), heures d'arrivée possibles au déjeuner et au dîner, congés annuels, jours fériés. (`data/horaires.json`, `data/site.json → reservation.services`, `data/annonces.json`)
6. **La capacité et les groupes** : nombre de couverts (environ 30 ?), privatisation possible, menus de groupe et prix, terrasse au bord de l'eau ? (`data/site.json → capacity`, `data/carte.json → formules.groupes`)
7. **Un portable pour WhatsApp** (le 03 22 44 60 23 est un fixe). (`data/site.json → whatsapp`)
8. **L'adresse e-mail** qui recevra les réservations (Resend). (variable Vercel `BOOKING_NOTIFY_EMAIL`)
9. **Des photos** : façade, salle, plats (cassoulet, tête de veau), ardoise, l'équipe (sans visages de clients). (`assets/hero|plats|salle|facade/` puis `npm run photos` et `data/photos.json`)
10. **Le logo** : existe-t-il une enseigne ou un logo officiel ? Sinon, valider le logo typographique proposé. (`public/logo.svg`, `app/icon.svg`)
11. **SIRET, raison sociale, directeur de la publication** pour les mentions légales. (`data/site.json → legal`)
12. **Paiement** : carte bancaire, espèces, titres-restaurant, chèques ? **Stationnement** conseillé ? (`locales/*.json` → `faq`, `infos.parkingText`)
13. **Bon cadeau** : montants, validité, format. (`locales/*.json` → `pages.cadeau`)
14. **Avis** : accord pour reprendre 3 vrais avis Google sur le site. (`data/avis.json`)
