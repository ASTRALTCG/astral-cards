/* ASTRAL FIGHTER — ANNONCES À MODIFIER DANS VISUAL STUDIO CODE
 * Ajoutez chaque nouvelle note EN PREMIER dans la liste ci-dessous.
 * Donnez-lui un id inédit, même pour deux annonces publiées le même jour.
 * Une simple correction de texte peut conserver le même id.
 * Enregistrez, puis envoyez CE fichier dans le dossier astralfighter du site.
 * Aucun logiciel de compilation nécessaire. Conservez les virgules et guillemets.
 * Les textes sont du texte simple : pas de balises HTML.
 *
 * MODÈLE : copiez le bloc suivant juste après « window.ASTRAL_PATCH_NOTES = [ ».
 * {
 *   id: "2026-10-06-01",
 *   date: "2026-10-06",
 *   titre: "Le titre de votre mise à jour",
 *   introduction: "Votre petit message aux joueurs.",
 *   sections: [
 *     { titre: "Nouveautés", points: ["Premier ajout.", "Deuxième ajout."] },
 *     { titre: "Équilibrage", points: ["Votre modification."] },
 *   ],
 * },
 */
window.ASTRAL_PATCH_NOTES = [
    {
    id: "2026-10-05-03",
    date: "2026-10-05",
    titre: "Ajout de l'onglet mise à jour",
    introduction: "Suiviez les mises à jour depuis ici !",
    sections: [
      {
        titre: "Onglet mise à jour",
        points: [
          "Mise à jour en direct",
        ],
      },
    ],
  },
  {
    id: "2026-10-05-notes-de-patch",
    date: "2026-10-05",
    titre: "Les nouvelles d’ASTRAL FIGHTER",
    introduction: "L’aventure continue d’évoluer. Retrouvez désormais les nouveautés, les ajustements et les corrections directement dans le jeu !",
    sections: [
      { titre: "Un carnet pour suivre l’aventure", points: [
        "L’onglet Note de patch rejoint la barre du haut, accessible avec tous vos compagnons.",
        "Son icône s’illumine lorsqu’une nouvelle note vous attend et s’éteint après sa consultation.",
        "La dernière mise à jour s’affiche en premier. Le bouton en bas permet de consulter les précédentes.",
      ] },
    ],
  },
  {
    id: "2026-10-04-forgeur-fracas",
    date: "2026-10-04",
    titre: "Le Forgeur — un nouvel équilibre",
    introduction: "Des ajustements pour mieux rythmer les combats du Forgeur.",
    sections: [
      { titre: "Compétences", points: [
        "Fracas de l’épée inflige désormais 80 % des dégâts d’attaque hors Surchauffe, contre 125 % auparavant. En Surchauffe, les dégâts restent à 175 %.",
        "Fracas de l’épée et Protection ultime ont un tour complet de récupération : utilisées au tour 1, elles redeviennent disponibles au tour 3.",
        "Les effets de Tension et les répétitions par la Vitesse sont conservés.",
      ] },
      { titre: "Compagnon et équipement", points: [
        "Le Forgeur commence avec 110 PV, 15 d’attaque, 14 de Chance et 14 de Vitesse.",
        "Son visuel en Refroidissement bénéficie d’un fond transparent corrigé.",
        "Les prix des armures suivent désormais ceux des armes de même niveau : notamment 555 or pour la Diamanite et 1 050 or pour l’Astral.",
      ] },
    ],
  },
];
