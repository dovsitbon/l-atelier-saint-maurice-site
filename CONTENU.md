# L'atelier : contenu du site, pour validation

Tous les textes en français et en anglais, la carte et les prix. Les points **À VALIDER** et **à remplir** sont à confirmer avec le restaurant.
Fichier généré par `npm run contenu` à partir de `locales/*.json` et `data/*.json` : modifiez ces fichiers, pas celui-ci.

## Titre du hero : 3 propositions

1. **Les recettes de toujours** (retenu sur le site) · EN : Old-school French cooking, done right
2. Cuisine de bistrot, au bord de l'eau · EN : Bistro cooking by the water
3. Comme à la maison, en mieux · EN : Like home cooking, only better (repris dans le bloc « La cuisine »)

## À valider en priorité

- **Carte** : plats proposés d'après les avis Google (cassoulet, veau, sauce gribiche) et la fiche Amiens Tourisme. Tous les prix sont **à remplir**.
- **Formule du midi** : « à partir de 17 € » (prix minimum indiqué par Amiens Tourisme), à confirmer.
- **Plat du jour** : un exemple par jour (mardi → vendredi), à remplacer chaque semaine dans `data/plat-du-jour.json`. Prix à remplir.
- **Capacité** : environ 30 couverts (Amiens Tourisme), à confirmer.
- **Horaires** : d'après la fiche Google, à confirmer. Le site propose le déjeuner de 11 h 45 à 13 h 45 et le dîner de 18 h 30 à 21 h (`data/site.json → reservation.services`).
- **Paiement, stationnement, validité du bon cadeau, SIRET** : à remplir.
- **Avis** : aucun avis inventé. Emplacements vides, à remplir avec de vrais avis Google et l'accord de leurs auteurs (`data/avis.json`).

## La carte (data/carte.json)

### Entrées · Starters

| Plat | Description | Prix | English |
|---|---|---|---|
| Œuf mayonnaise | Mayonnaise montée à la main | **à remplir** | Œuf mayonnaise |
| Terrine de campagne | Faite maison, cornichons et pain grillé | **à remplir** | Country terrine |
| Poireaux vinaigrette | Vinaigrette à la moutarde, œuf mimosa | **à remplir** | Leeks vinaigrette |
| Soupe du jour | Selon le marché | **à remplir** | Soup of the day |

### Plats · Mains

| Plat | Description | Prix | English |
|---|---|---|---|
| Cassoulet de la maison | Haricots lingots, confit de canard, saucisse et poitrine, cuit longuement au four | **à remplir** | House cassoulet |
| Tête de veau, sauce gribiche | Pommes vapeur, gribiche aux câpres et cornichons | **à remplir** | Calf's head, sauce gribiche |
| Blanquette de veau à l'ancienne | Sauce crème et champignons, riz | **à remplir** | Old-style veal blanquette |
| Bœuf bourguignon | Mijoté au vin rouge, lardons et petits oignons | **à remplir** | Beef bourguignon |
| Poisson du marché | Selon l'arrivage, beurre blanc | **à remplir** | Market fish |

### Desserts · Desserts

| Plat | Description | Prix | English |
|---|---|---|---|
| Crème brûlée | À la vanille | **à remplir** | Crème brûlée |
| Mousse au chocolat | Chocolat noir, servie à la cuillère | **à remplir** | Chocolate mousse |
| Tarte du moment | Fruits de saison, pâte maison | **à remplir** | Tart of the moment |
| Île flottante | Crème anglaise, caramel | **à remplir** | Île flottante |

### Vins · Wine

| Plat | Description | Prix | English |
|---|---|---|---|
| Vin rouge au verre | La sélection du moment | **à remplir** | Red wine by the glass |
| Vin blanc au verre | La sélection du moment | **à remplir** | White wine by the glass |
| Pichet de vin, 50 cl | Rouge, blanc ou rosé | **à remplir** | Carafe of wine, 50 cl |
| Vins en bouteille | Demandez la carte des vins en salle | **à remplir** | Wine by the bottle |

### Formules

- Le déjeuner : à partir de 17 € (source : Amiens Tourisme (prix min. de la formule du midi), à confirmer)
- Le dîner : **à remplir**
- Les groupes : **à remplir**

## Plat du jour (data/plat-du-jour.json)

- Mardi : Blanquette de veau à l'ancienne, riz · Old-style veal blanquette with rice
- Mercredi : Tête de veau, sauce gribiche · Calf's head with sauce gribiche
- Jeudi : Cassoulet de la maison · House cassoulet
- Vendredi : Poisson du marché, beurre blanc · Market fish, beurre blanc
- Prix : **à remplir**

## Horaires (data/horaires.json)

- Lundi : fermé
- Mardi : 08:30 – 15:00
- Mercredi : 08:30 – 15:00
- Jeudi : 08:30 – 15:00
- Vendredi : 08:30 – 15:00, 17:30 – 22:00
- Samedi : 17:30 – 22:00
- Dimanche : fermé

## Bandeau d'annonces (data/annonces.json)

Sans annonce en cours, le bandeau affiche « Plat du jour : … ».
- **fetes-2026** (2026-12-20 → 2027-01-01)
  - fr : Fermé le 25 décembre et le 1er janvier. Pensez à réserver vos repas de fin d'année.
  - en : Closed on 25 December and 1 January. Book early for your end-of-year meals.
- **conges-exemple** (2027-08-01 → 2027-08-21) · désactivée
  - fr : Congés d'été du 1er au 21 août. Réouverture le mardi 24 août.
  - en : Summer break from 1 to 21 August. We reopen on Tuesday 24 August.

## Tous les textes du site

### meta

- `meta.title`
  - fr : Restaurant de cuisine française traditionnelle à Amiens, quai Saint-Maurice | L'atelier
  - en : Traditional French restaurant in Amiens, quai Saint-Maurice | L'atelier
- `meta.description`
  - fr : L'atelier, restaurant de cuisine française traditionnelle au 47 quai Saint-Maurice à Amiens : cassoulet, tête de veau sauce gribiche, plat du jour, déjeuner en semaine et dîner le vendredi et le samedi. Réservez en ligne.
  - en : L'atelier, a traditional French restaurant at 47 quai Saint-Maurice in Amiens: cassoulet, calf's head with sauce gribiche, dish of the day, weekday lunch and dinner on Friday and Saturday. Book online.
- `meta.ogAlt`
  - fr : L'atelier, cuisine française traditionnelle, quai Saint-Maurice à Amiens
  - en : L'atelier, traditional French cooking on quai Saint-Maurice in Amiens

### nav

- `nav.home`
  - fr : L'atelier, accueil
  - en : L'atelier, home
- `nav.skip`
  - fr : Aller au contenu
  - en : Skip to content
- `nav.menu`
  - fr : Menu
  - en : Menu
- `nav.close`
  - fr : Fermer le menu
  - en : Close menu
- `nav.carte`
  - fr : La carte
  - en : Menu
- `nav.platDuJour`
  - fr : Plat du jour
  - en : Dish of the day
- `nav.book`
  - fr : Réserver
  - en : Book
- `nav.infos`
  - fr : Infos
  - en : Info
- `nav.gift`
  - fr : Bon cadeau
  - en : Gift voucher
- `nav.bookCta`
  - fr : Réserver une table
  - en : Book a table
- `nav.call`
  - fr : Appeler
  - en : Call
- `nav.lang`
  - fr : Langue
  - en : Language

### intro

- `intro.skip`
  - fr : Passer
  - en : Skip
- `intro.tagline`
  - fr : CUISINE FRANÇAISE
  - en : CUISINE FRANÇAISE

### announce

- `announce.dish`
  - fr : Plat du jour : {dish}
  - en : Dish of the day: {dish}
- `announce.dishOn`
  - fr : Plat du jour, {day} : {dish}
  - en : Dish of the day, {day}: {dish}
- `announce.close`
  - fr : Fermer le bandeau
  - en : Close banner

### hero

- `hero.eyebrow`
  - fr : Cuisine française traditionnelle · Quai Saint-Maurice, Amiens
  - en : Traditional French cooking · Quai Saint-Maurice, Amiens
- `hero.title`
  - fr : Les recettes de toujours
  - en : Old-school French cooking, done right
- `hero.lead`
  - fr : Cassoulet, tête de veau sauce gribiche, blanquette : des plats mijotés comme avant, servis au bord de la Somme.
  - en : Cassoulet, calf's head with sauce gribiche, veal blanquette: slow-cooked dishes the way they used to be, served by the river Somme.
- `hero.ctaBook`
  - fr : Réserver une table
  - en : Book a table
- `hero.ctaMenu`
  - fr : Voir la carte
  - en : See the menu
- `hero.rating`
  - fr : {value}/5 sur Google
  - en : {value}/5 on Google
- `hero.ratingCount`
  - fr : {count} avis
  - en : {count} reviews

### status

- `status.open`
  - fr : Ouvert maintenant
  - en : Open now
- `status.closed`
  - fr : Fermé
  - en : Closed
- `status.until`
  - fr : jusqu'à {time}
  - en : until {time}
- `status.opens`
  - fr : ouvre {day} à {time}
  - en : opens {day} at {time}
- `status.today`
  - fr : aujourd'hui
  - en : today
- `status.tomorrow`
  - fr : demain
  - en : tomorrow

### tiles

- `tiles.title`
  - fr : À la carte
  - en : On the menu
- `tiles.platDuJour`
  - fr : Plat du jour
  - en : Dish of the day
- `tiles.entrees`
  - fr : Entrées
  - en : Starters
- `tiles.plats`
  - fr : Plats
  - en : Mains
- `tiles.desserts`
  - fr : Desserts
  - en : Desserts
- `tiles.vins`
  - fr : Vins
  - en : Wine

### services

- `services.title`
  - fr : La maison en bref
  - en : At a glance
- `services.lunch.title`
  - fr : Déjeuner en semaine
  - en : Weekday lunch
- `services.lunch.text`
  - fr : Du mardi au vendredi, formule et plat du jour.
  - en : Tuesday to Friday, set lunch and dish of the day.
- `services.dinner.title`
  - fr : Dîner vendredi et samedi
  - en : Friday and Saturday dinner
- `services.dinner.text`
  - fr : À la carte, de 17 h 30 à 22 h.
  - en : À la carte, 5:30 pm to 10 pm.
- `services.homemade.title`
  - fr : Fait maison
  - en : Made in-house
- `services.homemade.text`
  - fr : Sauces, terrines et desserts préparés sur place.
  - en : Sauces, terrines and desserts made on site.
- `services.booking.title`
  - fr : Sur réservation
  - en : Booking advised
- `services.booking.text`
  - fr : En ligne ou par téléphone, une trentaine de couverts.
  - en : Online or by phone, about thirty seats.

### pdj

- `pdj.eyebrow`
  - fr : L'ardoise
  - en : The chalkboard
- `pdj.title`
  - fr : Le plat du jour
  - en : Dish of the day
- `pdj.today`
  - fr : Aujourd'hui
  - en : Today
- `pdj.price`
  - fr : Prix
  - en : Price
- `pdj.toFill`
  - fr : à remplir
  - en : to be confirmed
- `pdj.week`
  - fr : Cette semaine
  - en : This week
- `pdj.days.2`
  - fr : Mardi
  - en : Tuesday
- `pdj.days.3`
  - fr : Mercredi
  - en : Wednesday
- `pdj.days.4`
  - fr : Jeudi
  - en : Thursday
- `pdj.days.5`
  - fr : Vendredi
  - en : Friday
- `pdj.none`
  - fr : Le plat du jour est écrit chaque matin sur l'ardoise. Appelez-nous pour le connaître.
  - en : The dish of the day goes up on the chalkboard every morning. Give us a call to find out.
- `pdj.cta`
  - fr : Réserver pour midi
  - en : Book for lunch
- `pdj.updated`
  - fr : Ardoise mise à jour le {date}
  - en : Chalkboard updated on {date}

### carte

- `carte.eyebrow`
  - fr : La carte
  - en : The menu
- `carte.title`
  - fr : Entrées, plats, desserts et vins
  - en : Starters, mains, desserts and wine
- `carte.lead`
  - fr : Une carte courte, qui change avec les saisons. Tout est préparé ici, à partir de produits frais.
  - en : A short menu that follows the seasons. Everything is made here, from fresh produce.
- `carte.seeAll`
  - fr : La carte complète
  - en : Full menu
- `carte.from`
  - fr : à partir de
  - en : from
- `carte.toFill`
  - fr : à remplir
  - en : to be confirmed
- `carte.signature`
  - fr : La maison
  - en : House classic
- `carte.checked`
  - fr : Carte mise à jour le {date}. Prix nets, service compris.
  - en : Menu updated on {date}. Prices include service.
- `carte.categories.entrees`
  - fr : Entrées
  - en : Starters
- `carte.categories.plats`
  - fr : Plats
  - en : Mains
- `carte.categories.desserts`
  - fr : Desserts
  - en : Desserts
- `carte.categories.vins`
  - fr : Vins
  - en : Wine
- `carte.formules.title`
  - fr : Déjeuner, dîner, groupes
  - en : Lunch, dinner, groups
- `carte.formules.midi.title`
  - fr : Le déjeuner
  - en : Lunch
- `carte.formules.midi.when`
  - fr : Mardi → vendredi, midi
  - en : Tuesday → Friday, midday
- `carte.formules.midi.text`
  - fr : Formule du midi avec le plat du jour, ou la carte.
  - en : Set lunch with the dish of the day, or order from the menu.
- `carte.formules.soir.title`
  - fr : Le dîner
  - en : Dinner
- `carte.formules.soir.when`
  - fr : Vendredi et samedi soir
  - en : Friday and Saturday evening
- `carte.formules.soir.text`
  - fr : À la carte, dans une salle plus calme, à la lumière du soir sur le quai.
  - en : À la carte, in a quieter room with the evening light on the quay.
- `carte.formules.groupes.title`
  - fr : Les groupes
  - en : Groups
- `carte.formules.groupes.when`
  - fr : Sur demande
  - en : On request
- `carte.formules.groupes.text`
  - fr : Repas de famille, d'équipe ou d'affaires : menu fixé ensemble à l'avance.
  - en : Family, team or business meals: we agree the menu with you in advance.
- `carte.formules.cta.midi`
  - fr : Réserver un déjeuner
  - en : Book lunch
- `carte.formules.cta.soir`
  - fr : Réserver un dîner
  - en : Book dinner
- `carte.formules.cta.groupes`
  - fr : Nous contacter
  - en : Get in touch

### blocks

- `blocks.cuisine.eyebrow`
  - fr : La cuisine
  - en : The cooking
- `blocks.cuisine.title`
  - fr : Comme à la maison, en mieux
  - en : Like home cooking, only better
- `blocks.cuisine.text`
  - fr : Ici, on prend le temps. Le cassoulet cuit des heures, la gribiche se monte à la main, la blanquette mijote doucement. Des recettes que l'on connaît par cœur et que l'on aime retrouver.
  - en : We take our time here. The cassoulet bakes for hours, the gribiche is whisked by hand, the blanquette simmers slowly. Recipes we know by heart and that people come back for.
- `blocks.cuisine.cta`
  - fr : Voir la carte
  - en : See the menu
- `blocks.lunch.eyebrow`
  - fr : Le midi
  - en : Midday
- `blocks.lunch.title`
  - fr : Un vrai déjeuner, en semaine
  - en : A proper weekday lunch
- `blocks.lunch.text`
  - fr : Du mardi au vendredi, une formule simple et le plat du jour écrit à l'ardoise. Assez rapide pour reprendre le travail, assez bon pour qu'on y revienne.
  - en : Tuesday to Friday, a simple set lunch and the dish of the day on the chalkboard. Quick enough to get back to work, good enough to come back.
- `blocks.lunch.cta`
  - fr : Réserver
  - en : Book
- `blocks.groups.eyebrow`
  - fr : Groupes et repas d'affaires
  - en : Groups and business meals
- `blocks.groups.title`
  - fr : La salle pour vous
  - en : The room is yours
- `blocks.groups.text`
  - fr : Une trentaine de couverts au bord de l'eau : la bonne taille pour un repas de famille, un départ en retraite ou un déjeuner d'affaires. On fixe le menu ensemble.
  - en : About thirty seats by the water: just right for a family meal, a retirement lunch or a business meeting. We plan the menu together.
- `blocks.groups.cta`
  - fr : Nous contacter
  - en : Get in touch

### book

- `book.eyebrow`
  - fr : Réservation
  - en : Booking
- `book.title`
  - fr : Réserver une table
  - en : Book a table
- `book.lead`
  - fr : Le midi du mardi au vendredi, le soir le vendredi et le samedi. Nous vous confirmons la table par e-mail ou par téléphone.
  - en : Lunch Tuesday to Friday, dinner on Friday and Saturday. We'll confirm your table by email or phone.
- `book.date`
  - fr : Date
  - en : Date
- `book.chooseDate`
  - fr : Choisir un jour
  - en : Pick a day
- `book.service`
  - fr : Service
  - en : Service
- `book.services.lunch`
  - fr : Déjeuner
  - en : Lunch
- `book.services.dinner`
  - fr : Dîner
  - en : Dinner
- `book.time`
  - fr : Heure d'arrivée
  - en : Arrival time
- `book.chooseTime`
  - fr : Choisir une heure
  - en : Pick a time
- `book.noTimes`
  - fr : Plus de table en ligne pour ce service. Appelez-nous, il reste peut-être une place.
  - en : No more tables online for this service. Call us, we may still have room.
- `book.guests`
  - fr : Nombre de personnes
  - en : Number of guests
- `book.groupHint`
  - fr : À partir de {n} personnes, nous vous rappelons pour organiser le repas.
  - en : For {n} guests or more, we'll call you back to plan the meal.
- `book.name`
  - fr : Nom
  - en : Name
- `book.phone`
  - fr : Téléphone
  - en : Phone
- `book.email`
  - fr : E-mail
  - en : Email
- `book.message`
  - fr : Message
  - en : Message
- `book.messagePh`
  - fr : Allergie, chaise haute, anniversaire…
  - en : Allergies, high chair, birthday…
- `book.submit`
  - fr : Envoyer la demande
  - en : Send request
- `book.sending`
  - fr : Envoi…
  - en : Sending…
- `book.callInstead`
  - fr : ou appelez le
  - en : or call
- `book.privacy`
  - fr : Vos coordonnées servent uniquement à confirmer la réservation.
  - en : Your details are only used to confirm your booking.
- `book.errors.date`
  - fr : Choisissez un jour.
  - en : Pick a day.
- `book.errors.service`
  - fr : Choisissez le déjeuner ou le dîner.
  - en : Choose lunch or dinner.
- `book.errors.time`
  - fr : Choisissez une heure.
  - en : Pick a time.
- `book.errors.name`
  - fr : Indiquez votre nom.
  - en : Please enter your name.
- `book.errors.phone`
  - fr : Indiquez un numéro de téléphone valide.
  - en : Please enter a valid phone number.
- `book.errors.email`
  - fr : Indiquez une adresse e-mail valide.
  - en : Please enter a valid email address.
- `book.errors.server`
  - fr : La demande n'est pas partie. Réessayez, ou appelez-nous au 03 22 44 60 23.
  - en : Your request didn't go through. Please try again, or call us on +33 3 22 44 60 23.
- `book.done.title`
  - fr : Demande bien reçue
  - en : Request received
- `book.done.text`
  - fr : Merci {name}. Votre demande pour {when} est entre nos mains.
  - en : Thank you, {name}. We have your request for {when}.
- `book.done.mail`
  - fr : Un e-mail récapitulatif vient de vous être envoyé. Nous vous confirmons la table rapidement.
  - en : We've emailed you a summary and will confirm your table shortly.
- `book.done.notSent`
  - fr : Pour être sûr de votre table, appelez-nous pour la confirmer.
  - en : To be sure of your table, please call us to confirm.
- `book.done.again`
  - fr : Nouvelle demande
  - en : New request
- `book.mail.subject`
  - fr : Demande de réservation
  - en : Booking request
- `book.mail.title`
  - fr : Nouvelle demande de réservation
  - en : New booking request
- `book.mail.group`
  - fr : Groupe
  - en : Group
- `book.mail.date`
  - fr : Date
  - en : Date
- `book.mail.service`
  - fr : Service
  - en : Service
- `book.mail.time`
  - fr : Heure
  - en : Time
- `book.mail.guests`
  - fr : Personnes
  - en : Guests
- `book.mail.name`
  - fr : Nom
  - en : Name
- `book.mail.phone`
  - fr : Téléphone
  - en : Phone
- `book.mail.email`
  - fr : E-mail
  - en : Email
- `book.mail.message`
  - fr : Message
  - en : Message
- `book.mail.lang`
  - fr : Langue du client
  - en : Guest language
- `book.mail.replyHint`
  - fr : Répondez directement à cet e-mail pour écrire au client.
  - en : Reply to this email to write to the guest.
- `book.mail.confirmSubject`
  - fr : L'atelier : nous avons bien reçu votre demande
  - en : L'atelier: we've received your request
- `book.mail.confirmIntro`
  - fr : Bonjour {name},
  - en : Hello {name},
- `book.mail.confirmBody`
  - fr : Merci pour votre demande de réservation. Voici le récapitulatif :
  - en : Thank you for your booking request. Here's a summary:
- `book.mail.confirmOutro`
  - fr : Nous vous confirmons la table très vite. Pour toute modification, appelez-nous au 03 22 44 60 23.
  - en : We'll confirm your table very soon. To change anything, call us on +33 3 22 44 60 23.
- `book.mail.signature`
  - fr : À bientôt au 47 quai Saint-Maurice, ⏎ L'atelier
  - en : See you soon at 47 quai Saint-Maurice, ⏎ L'atelier

### reviews

- `reviews.eyebrow`
  - fr : Ce qu'on en dit
  - en : What guests say
- `reviews.title`
  - fr : La note de nos clients
  - en : Our guests' rating
- `reviews.count`
  - fr : sur {count} avis Google
  - en : from {count} Google reviews
- `reviews.checked`
  - fr : Note relevée le {date}
  - en : Rating checked on {date}
- `reviews.cta`
  - fr : Lire les avis sur Google
  - en : Read the reviews on Google
- `reviews.slot`
  - fr : Avis client à venir
  - en : Guest review coming soon

### infos

- `infos.eyebrow`
  - fr : Infos pratiques
  - en : Practical info
- `infos.title`
  - fr : Nous trouver
  - en : Find us
- `infos.address`
  - fr : Adresse
  - en : Address
- `infos.directions`
  - fr : Itinéraire
  - en : Directions
- `infos.phone`
  - fr : Téléphone
  - en : Phone
- `infos.hours`
  - fr : Horaires
  - en : Opening hours
- `infos.hoursNote`
  - fr : Jours fériés et congés : voir le bandeau en haut de la page.
  - en : Bank holidays and closures: see the banner at the top of the page.
- `infos.access`
  - fr : Accès
  - en : Getting here
- `infos.accessText`
  - fr : Sur le quai, le long de la Somme, à quelques minutes à pied du quartier Saint-Leu.
  - en : On the quay along the river Somme, a few minutes' walk from the Saint-Leu quarter.
- `infos.parking`
  - fr : Stationnement
  - en : Parking
- `infos.parkingText`
  - fr : Stationnement sur le quai et dans les rues voisines (à remplir).
  - en : Street parking on the quay and nearby streets (to be confirmed).
- `infos.mapTitle`
  - fr : Plan d'accès à L'atelier, 47 quai Saint-Maurice, Amiens
  - en : Map to L'atelier, 47 quai Saint-Maurice, Amiens
- `infos.days.0`
  - fr : Lundi
  - en : Monday
- `infos.days.1`
  - fr : Mardi
  - en : Tuesday
- `infos.days.2`
  - fr : Mercredi
  - en : Wednesday
- `infos.days.3`
  - fr : Jeudi
  - en : Thursday
- `infos.days.4`
  - fr : Vendredi
  - en : Friday
- `infos.days.5`
  - fr : Samedi
  - en : Saturday
- `infos.days.6`
  - fr : Dimanche
  - en : Sunday
- `infos.closed`
  - fr : Fermé
  - en : Closed

### faq

- `faq.eyebrow`
  - fr : Questions fréquentes
  - en : FAQ
- `faq.title`
  - fr : Bon à savoir
  - en : Good to know
- `faq.items.0.q`
  - fr : Faut-il réserver ?
  - en : Do I need to book?
- `faq.items.0.a`
  - fr : C'est conseillé : la salle compte une trentaine de couverts. Pour le vendredi et le samedi soir, réservez de préférence quelques jours avant. En ligne sur ce site ou au 03 22 44 60 23.
  - en : It's a good idea: the room has about thirty seats. For Friday and Saturday evenings, try to book a few days ahead. Online here or on +33 3 22 44 60 23.
- `faq.items.1.q`
  - fr : Quels sont vos horaires ?
  - en : What are your opening hours?
- `faq.items.1.a`
  - fr : Du mardi au jeudi de 8 h 30 à 15 h, le vendredi de 8 h 30 à 15 h puis de 17 h 30 à 22 h, le samedi de 17 h 30 à 22 h. Fermé le dimanche et le lundi.
  - en : Tuesday to Thursday 8:30 am to 3 pm, Friday 8:30 am to 3 pm and 5:30 pm to 10 pm, Saturday 5:30 pm to 10 pm. Closed Sunday and Monday.
- `faq.items.2.q`
  - fr : Le plat du jour change-t-il tous les jours ?
  - en : Does the dish of the day change daily?
- `faq.items.2.a`
  - fr : Oui. Il est écrit chaque matin sur l'ardoise et mis à jour sur ce site. Il est servi au déjeuner, du mardi au vendredi.
  - en : Yes. It goes up on the chalkboard every morning and on this website. It's served at lunch, Tuesday to Friday.
- `faq.items.3.q`
  - fr : Quels moyens de paiement acceptez-vous ?
  - en : How can I pay?
- `faq.items.3.a`
  - fr : À remplir : carte bancaire, espèces, titres-restaurant.
  - en : To be confirmed: card, cash, meal vouchers.
- `faq.items.4.q`
  - fr : Pouvez-vous accueillir un groupe ?
  - en : Can you host a group?
- `faq.items.4.a`
  - fr : Oui, pour un repas de famille, d'équipe ou d'affaires, jusqu'à la salle entière sur demande. Appelez-nous pour fixer la date et le menu.
  - en : Yes, for a family, team or business meal, up to the whole room on request. Call us to set the date and the menu.
- `faq.items.5.q`
  - fr : Comment venir ?
  - en : How do I get there?
- `faq.items.5.a`
  - fr : Nous sommes au 47 quai Saint-Maurice, au bord de la Somme, à quelques minutes à pied de Saint-Leu. Stationnement : à remplir.
  - en : We're at 47 quai Saint-Maurice, by the river Somme, a few minutes' walk from Saint-Leu. Parking: to be confirmed.

### footer

- `footer.tagline`
  - fr : Cuisine française traditionnelle, au bord de la Somme.
  - en : Traditional French cooking by the river Somme.
- `footer.menu`
  - fr : La carte
  - en : Menu
- `footer.traditionnel`
  - fr : Restaurant traditionnel à Amiens
  - en : Traditional restaurant in Amiens
- `footer.dejeuner`
  - fr : Déjeuner à Amiens
  - en : Lunch in Amiens
- `footer.gift`
  - fr : Bon cadeau
  - en : Gift voucher
- `footer.legal`
  - fr : Mentions légales
  - en : Legal notice
- `footer.rights`
  - fr : © {year} L'atelier, Amiens
  - en : © {year} L'atelier, Amiens

### placeholder

- `placeholder`
  - fr : Photo à venir
  - en : Photo coming soon

### photos

- `photos.hero.label`
  - fr : La salle ou un plat signature
  - en : The dining room or a signature dish
- `photos.hero.alt`
  - fr : La salle de L'atelier, quai Saint-Maurice à Amiens
  - en : The dining room at L'atelier, quai Saint-Maurice, Amiens
- `photos.facade.label`
  - fr : La façade
  - en : The front
- `photos.facade.alt`
  - fr : La façade de L'atelier au 47 quai Saint-Maurice
  - en : L'atelier's shopfront at 47 quai Saint-Maurice
- `photos.salle.label`
  - fr : La salle
  - en : The dining room
- `photos.salle.alt`
  - fr : La salle du restaurant, nappes et bois
  - en : The dining room, tablecloths and wood
- `photos.cassoulet.label`
  - fr : Le cassoulet
  - en : The cassoulet
- `photos.cassoulet.alt`
  - fr : Le cassoulet de la maison
  - en : The house cassoulet
- `photos.veau.label`
  - fr : La tête de veau
  - en : Calf's head
- `photos.veau.alt`
  - fr : Tête de veau, sauce gribiche
  - en : Calf's head with sauce gribiche
- `photos.platDuJour.label`
  - fr : L'ardoise
  - en : The chalkboard
- `photos.platDuJour.alt`
  - fr : L'ardoise du plat du jour
  - en : The dish of the day chalkboard
- `photos.entrees.label`
  - fr : Une entrée
  - en : A starter
- `photos.entrees.alt`
  - fr : Une entrée de la carte
  - en : A starter from the menu
- `photos.plats.label`
  - fr : Un plat
  - en : A main
- `photos.plats.alt`
  - fr : Un plat de la carte
  - en : A main course from the menu
- `photos.desserts.label`
  - fr : Un dessert
  - en : A dessert
- `photos.desserts.alt`
  - fr : Un dessert maison
  - en : A homemade dessert
- `photos.vins.label`
  - fr : Les vins
  - en : Wine
- `photos.vins.alt`
  - fr : Verres de vin au comptoir
  - en : Glasses of wine at the counter
- `photos.cuisine.label`
  - fr : En cuisine
  - en : In the kitchen
- `photos.cuisine.alt`
  - fr : Une cocotte en cuisine
  - en : A cast-iron pot in the kitchen
- `photos.dejeuner.label`
  - fr : Le déjeuner
  - en : Lunch
- `photos.dejeuner.alt`
  - fr : Une table dressée pour le déjeuner
  - en : A table set for lunch
- `photos.groupes.label`
  - fr : La salle dressée
  - en : The room, set
- `photos.groupes.alt`
  - fr : La salle dressée pour un groupe
  - en : The room set for a group
- `photos.equipe.label`
  - fr : Le patron
  - en : The owner
- `photos.equipe.alt`
  - fr : Le patron de L'atelier
  - en : The owner of L'atelier

### pages

- `pages.carte.title`
  - fr : La carte
  - en : The menu
- `pages.carte.metaTitle`
  - fr : La carte : cuisine française traditionnelle à Amiens | L'atelier
  - en : Menu: traditional French cooking in Amiens | L'atelier
- `pages.carte.metaDescription`
  - fr : La carte de L'atelier, quai Saint-Maurice à Amiens : œuf mayonnaise, terrine maison, cassoulet, tête de veau sauce gribiche, crème brûlée, vins au verre. Prix et formule du midi.
  - en : L'atelier's menu, quai Saint-Maurice in Amiens: œuf mayonnaise, homemade terrine, cassoulet, calf's head with sauce gribiche, crème brûlée, wine by the glass. Prices and set lunch.
- `pages.traditionnel.title`
  - fr : Restaurant traditionnel à Amiens
  - en : Traditional French restaurant in Amiens
- `pages.traditionnel.metaTitle`
  - fr : Restaurant traditionnel à Amiens, cuisine française maison | L'atelier
  - en : Traditional French restaurant in Amiens, home cooking | L'atelier
- `pages.traditionnel.metaDescription`
  - fr : Un restaurant traditionnel à Amiens, au 47 quai Saint-Maurice : cassoulet, tête de veau sauce gribiche, blanquette et desserts maison. Déjeuner en semaine, dîner le vendredi et le samedi.
  - en : A traditional French restaurant in Amiens at 47 quai Saint-Maurice: cassoulet, calf's head with sauce gribiche, veal blanquette and homemade desserts. Weekday lunch, Friday and Saturday dinner.
- `pages.traditionnel.eyebrow`
  - fr : Cuisine française · Amiens
  - en : French cooking · Amiens
- `pages.traditionnel.lead`
  - fr : Au 47 quai Saint-Maurice, L'atelier sert une cuisine française de tradition : des plats mijotés, des sauces faites à la main et des desserts de toujours.
  - en : At 47 quai Saint-Maurice, L'atelier serves traditional French food: slow-cooked dishes, hand-made sauces and desserts that never go out of style.
- `pages.traditionnel.sections.0.h`
  - fr : Une cuisine de tradition, faite maison
  - en : Traditional cooking, made in-house
- `pages.traditionnel.sections.0.p`
  - fr : Le cassoulet cuit longuement au four, la tête de veau arrive avec sa sauce gribiche aux câpres, la blanquette garde sa sauce crème à l'ancienne. Rien de compliqué : de bons produits et le temps qu'il faut.
  - en : The cassoulet bakes slowly in the oven, the calf's head comes with a caper-studded sauce gribiche, the blanquette keeps its old-fashioned cream sauce. Nothing complicated: good produce and as much time as it takes.
- `pages.traditionnel.sections.1.h`
  - fr : Le cassoulet, à Amiens
  - en : Cassoulet in Amiens
- `pages.traditionnel.sections.1.p`
  - fr : C'est le plat que nos clients citent le plus souvent. Haricots fondants, confit de canard, saucisse et poitrine : une assiette généreuse, à partager ou non.
  - en : It's the dish our guests mention most. Melting beans, duck confit, sausage and pork belly: a generous plate, to share or not.
- `pages.traditionnel.sections.2.h`
  - fr : Au bord de la Somme
  - en : By the river Somme
- `pages.traditionnel.sections.2.p`
  - fr : Le restaurant est sur le quai Saint-Maurice, à quelques minutes à pied du quartier Saint-Leu. Une petite salle d'une trentaine de couverts, chaleureuse, où l'on vient en habitué.
  - en : The restaurant sits on quai Saint-Maurice, a few minutes' walk from the Saint-Leu quarter. A small, warm room of about thirty seats, where people come back as regulars.
- `pages.traditionnel.sections.3.h`
  - fr : Quand venir
  - en : When to come
- `pages.traditionnel.sections.3.p`
  - fr : Le midi du mardi au vendredi, avec la formule et le plat du jour. Le soir, le vendredi et le samedi, à la carte. Réservation conseillée.
  - en : Lunch Tuesday to Friday, with the set lunch and dish of the day. Dinner on Friday and Saturday, à la carte. Booking advised.
- `pages.traditionnel.cta`
  - fr : Réserver une table
  - en : Book a table
- `pages.dejeuner.title`
  - fr : Déjeuner à Amiens
  - en : Lunch in Amiens
- `pages.dejeuner.metaTitle`
  - fr : Déjeuner à Amiens : formule du midi et plat du jour | L'atelier
  - en : Lunch in Amiens: set lunch and dish of the day | L'atelier
- `pages.dejeuner.metaDescription`
  - fr : Déjeuner à Amiens, quai Saint-Maurice : formule du midi à partir de 17 €, plat du jour fait maison, du mardi au vendredi. Réservation en ligne ou au 03 22 44 60 23.
  - en : Lunch in Amiens on quai Saint-Maurice: set lunch from €17, homemade dish of the day, Tuesday to Friday. Book online or call +33 3 22 44 60 23.
- `pages.dejeuner.eyebrow`
  - fr : Le midi, du mardi au vendredi
  - en : Midday, Tuesday to Friday
- `pages.dejeuner.lead`
  - fr : Une formule du midi, un plat du jour écrit à l'ardoise et une salle au calme au bord de la Somme. Pour un déjeuner d'affaires comme pour une pause entre collègues.
  - en : A set lunch, a dish of the day on the chalkboard and a quiet room by the river Somme. For a business lunch or a break with colleagues.
- `pages.dejeuner.sections.0.h`
  - fr : La formule du midi
  - en : The set lunch
- `pages.dejeuner.sections.0.p`
  - fr : Entrée et plat, ou plat et dessert, à partir de {price}. Le plat du jour change chaque jour et suit le marché (formule à confirmer).
  - en : Starter and main, or main and dessert, from {price}. The dish of the day changes daily and follows the market (to be confirmed).
- `pages.dejeuner.sections.1.h`
  - fr : Servi à l'heure
  - en : Served on time
- `pages.dejeuner.sections.1.p`
  - fr : Le service du midi commence à 11 h 45. Dites-nous si vous êtes pressés : on s'organise.
  - en : Lunch service starts at 11:45 am. Tell us if you're in a hurry and we'll make it work.
- `pages.dejeuner.sections.2.h`
  - fr : Les déjeuners d'affaires
  - en : Business lunches
- `pages.dejeuner.sections.2.p`
  - fr : Une table au calme pour discuter, ou la salle entière pour une équipe. Appelez-nous pour préparer le menu à l'avance.
  - en : A quiet table to talk, or the whole room for a team. Call us to plan the menu ahead.
- `pages.dejeuner.cta`
  - fr : Réserver un déjeuner
  - en : Book lunch
- `pages.cadeau.title`
  - fr : Bon cadeau
  - en : Gift voucher
- `pages.cadeau.metaTitle`
  - fr : Bon cadeau restaurant à Amiens | L'atelier
  - en : Restaurant gift voucher in Amiens | L'atelier
- `pages.cadeau.metaDescription`
  - fr : Offrez un repas à L'atelier, restaurant de cuisine française traditionnelle quai Saint-Maurice à Amiens : bon cadeau à retirer au restaurant.
  - en : Give a meal at L'atelier, a traditional French restaurant on quai Saint-Maurice in Amiens: gift voucher to collect at the restaurant.
- `pages.cadeau.eyebrow`
  - fr : Offrir
  - en : Give a meal
- `pages.cadeau.lead`
  - fr : Un déjeuner ou un dîner à L'atelier, à offrir pour un anniversaire, un départ ou simplement pour faire plaisir.
  - en : Lunch or dinner at L'atelier, as a gift for a birthday, a farewell or just because.
- `pages.cadeau.how`
  - fr : Comment ça marche
  - en : How it works
- `pages.cadeau.steps.0`
  - fr : Appelez-nous ou passez au restaurant pour choisir le montant ou le repas offert.
  - en : Call us or drop by to choose an amount or a meal.
- `pages.cadeau.steps.1`
  - fr : Le bon est préparé à votre nom, à retirer au 47 quai Saint-Maurice.
  - en : We prepare the voucher in your name, to collect at 47 quai Saint-Maurice.
- `pages.cadeau.steps.2`
  - fr : La personne réserve sa table quand elle le souhaite (durée de validité : à remplir).
  - en : The recipient books whenever they like (validity: to be confirmed).
- `pages.cadeau.cta`
  - fr : Appeler pour un bon cadeau
  - en : Call about a gift voucher
- `pages.legal.title`
  - fr : Mentions légales
  - en : Legal notice
- `pages.legal.metaTitle`
  - fr : Mentions légales | L'atelier
  - en : Legal notice | L'atelier
- `pages.legal.pending`
  - fr : à remplir
  - en : to be confirmed
- `pages.legal.editor`
  - fr : Éditeur du site
  - en : Publisher
- `pages.legal.editorText`
  - fr : L'atelier, restaurant, 47 quai Saint-Maurice, 80000 Amiens. Téléphone : 03 22 44 60 23.
  - en : L'atelier, restaurant, 47 quai Saint-Maurice, 80000 Amiens, France. Phone: +33 3 22 44 60 23.
- `pages.legal.company`
  - fr : Raison sociale
  - en : Company name
- `pages.legal.siret`
  - fr : SIRET
  - en : SIRET
- `pages.legal.director`
  - fr : Directeur de la publication
  - en : Publication director
- `pages.legal.host`
  - fr : Hébergement
  - en : Hosting
- `pages.legal.data`
  - fr : Données personnelles
  - en : Personal data
- `pages.legal.dataText`
  - fr : Les informations envoyées par le formulaire de réservation (nom, téléphone, e-mail, message) servent uniquement à traiter votre demande. Elles ne sont ni vendues ni cédées. Pour les consulter ou les faire supprimer, contactez le restaurant.
  - en : Details sent through the booking form (name, phone, email, message) are only used to handle your request. They are never sold or shared. To see or delete them, contact the restaurant.
- `pages.legal.cookies`
  - fr : Cookies
  - en : Cookies
- `pages.legal.cookiesText`
  - fr : Ce site n'utilise pas de cookie publicitaire ni de mesure d'audience. Un cookie technique mémorise seulement la langue choisie.
  - en : This site uses no advertising or analytics cookies. One technical cookie only remembers your language.
- `pages.legal.photos`
  - fr : Photos et textes
  - en : Photos and text
- `pages.legal.photosText`
  - fr : Photos et textes : L'atelier. Toute reproduction est soumise à autorisation.
  - en : Photos and text: L'atelier. Reproduction requires permission.
