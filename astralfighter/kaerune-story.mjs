const n=text=>({speaker:null,text});
const d=(speaker,text,other='kaerune')=>({speaker,text,other});
export const KAERUNE_CAST={
 kaerune:{name:'Kaerune',art:'kaerune',kind:'winged'},
 nyurune:{name:'Nyurune',art:'nyurune',kind:'winged'},
 seraphyne:{name:'Séraphyne',art:'seraphyne',kind:'winged'},
 umbraelys:{name:'Umbraelys',art:'umbraelys-discussion',combatArt:'umbraelys',kind:'bust'},
 eliandris:{name:'Éliandris',art:'eliandris-discussion',combatArt:'eliandris',kind:'bust'},
 zyrael:{name:'Zyraël',art:'zyrael',kind:'throne'},
 thyur:{name:'Thyur, le démon des laves',art:'thyur',kind:'beast'},
 cobra:{name:'Cobra des laves',art:'cobra-lave',kind:'beast'},
 wilddog:{name:'Chien sauvage',art:'chien-sauvage',kind:'beast'}
};
export const KAERUNE_CHAPTER={title:'Chapitre 1 — La relève',description:'Sur Harmony, Kaerune apprend à protéger ceux qu’elle aime. Mais la guerre n’attendra pas qu’elle soit prête.',nextTitle:'L’ombre du Sceau'};
export const KAERUNE_MISSIONS={
 1:{title:'Dans l’ombre d’une maîtresse',enemies:['seraphyne'],lesson:'first',background:'harmony-forest',before:[
 n('On raconte qu’une Déesse donna la vie à Harmony. Là où il n’y avait que de la matière et du silence, elle fit naître un monde et trois peuples : les Humains, les Hybrides et les Démons de lave.'),
 n('Les Humains inventaient, bâtissaient et transformaient la planète. Les Hybrides cherchaient dans la magie les moyens d’établir une paix durable. Les Démons de lave mettaient leur force incommensurable au service des autres peuples.'),
 n('Après avoir créé la vie, la Déesse façonna le Sceau brisé : une sphère capable de préserver l’énergie vitale d’une entité jusqu’à ce qu’elle retrouve ses forces. Puis elle s’y enferma.'),
 n('Des milliers d’années passèrent sans qu’elle en sorte. Lorsque Harmony eut besoin d’une protectrice, Zyraël apparut : une Navigatrice chargée de veiller sur toute vie et sur le Sceau brisé.'),
 n('Mais les Démons de lave réclamaient toujours plus de terres. Les anciens protecteurs devinrent des conquérants. Les Humains se retranchèrent ; les combattantes et magiciennes hybrides tinrent les frontières.'),
 n('Parmi elles, Séraphyne repoussa les assauts pendant de longues années. Une grave blessure finit pourtant par lui arracher une partie de ses pouvoirs. Il lui fallait préparer la relève.'),
 n('Dans une clairière, Kaerune déploie ses bras-ailes. Elle est jeune. Le potentiel que sa maîtresse perçoit en elle ne suffit pas encore à faire taire son inquiétude.'),
 d('kaerune','Tu pourrais choisir quelqu’un qui a déjà combattu les Démons de lave.','seraphyne'),
 d('seraphyne','Je pourrais. Mais je ne t’ai pas choisie parce que tu étais prête. Je t’ai choisie parce que tu peux le devenir.'),
 d('kaerune','Alors je vais te montrer ce que je sais faire.','seraphyne'),
 d('seraphyne','Viens. Et regarde bien : la première leçon risque d’être courte.')
 ],after:[
 n('Kaerune n’a pas vu le coup partir. Elle reprend son souffle dans l’herbe, les plumes en désordre. Séraphyne s’est déjà arrêtée.'),
 d('kaerune','Même blessée… Je n’ai pas tenu une seconde.','seraphyne'),
 d('seraphyne','Tu as regardé l’endroit que tu voulais atteindre. Pas celle qui t’empêchait d’y aller.'),
 d('kaerune','Si c’est moi, la relève, on a un problème.','seraphyne'),
 n('Une ombre ailée s’étend sur la clairière. Zyraël s’approche sans bruit. Kaerune se redresse aussitôt.'),
 d('zyrael','Tu compares ton premier pas au chemin qu’elle a parcouru toute sa vie.'),
 d('kaerune','Et si je n’y arrivais jamais ?','zyrael'),
 d('zyrael','Alors tu recommenceras demain. Travaille avec constance, Kaerune. Tu pourrais devenir plus forte que n’importe laquelle d’entre nous.'),
 n('Kaerune regarde les traces laissées dans l’herbe. Sa honte n’a pas disparu. Mais, cette fois, elle y voit aussi un point de départ.'),
 d('kaerune','D’accord. Demain, je verrai le coup venir.','seraphyne')
 ]},
 2:{title:'Une promesse entre les arbres',enemies:['wilddog','wilddog'],background:'harmony-forest',before:[
 n('Quelques jours plus tard, Nyurune entraîne sa sœur sur les sentiers de la forêt. Le camp disparaît derrière les arbres, avec ses exercices et ses regards impatients.'),
 d('nyurune','Tu marches comme si Séraphyne allait surgir d’un buisson.'),
 d('kaerune','Elle en serait capable.','nyurune'),
 d('nyurune','Moi, un jour, je ferai partie de l’élite. Les missions lointaines, les frontières… On ne se verra presque plus.'),
 n('Nyurune essaie de sourire. Kaerune ralentit.'),
 d('kaerune','Tu dis ça comme si tu avais déjà fait tes adieux.','nyurune'),
 d('nyurune','Je dis ça parce qu’il faut bien grandir.'),
 d('kaerune','Alors on grandira. Mais je trouverai du temps pour toi. Même si je dois traverser toute Harmony.','nyurune'),
 n('Un grognement coupe leur conversation. Deux chiens sauvages sortent des fougères. Le premier montre les crocs ; le second cherche à les contourner.'),
 d('nyurune','À gauche, Kaerune ! Ne les laisse pas t’encercler.'),
 d('kaerune','Je les ai vus. Reste près de moi.','nyurune')
 ],after:[
 n('Le dernier chien s’effondre. Kaerune attend quelques secondes avant de replier ses ailes. Une éraflure rougit son flanc.'),
 d('nyurune','Depuis quand tu bouges comme ça ?'),
 d('kaerune','Depuis que ma maîtresse m’a plantée dans l’herbe.','nyurune'),
 d('nyurune','Je suis sérieuse. Tu étais… différente.'),
 d('kaerune','Je tremblais. J’ai juste essayé de ne pas m’arrêter.','nyurune'),
 n('Au retour au camp, Umbraelys aperçoit le sang avant même que Kaerune puisse parler.'),
 d('umbraelys','Qu’est-ce qui s’est passé ? Qui t’a fait ça ?'),
 d('kaerune','Deux chiens. C’est une égratignure, je te promets.','umbraelys'),
 d('umbraelys','Une égratignure aujourd’hui. La prochaine fois, tu ne décideras pas de la profondeur de la blessure.')
 ]},
 3:{title:'Rester debout',enemies:['umbraelys'],background:'harmony-forest',before:[
 n('Umbraelys vérifie le bandage de Kaerune, puis l’emmène à l’écart des tentes. Son inquiétude a pris un ton plus ferme.'),
 d('umbraelys','Une grande combattante doit savoir frapper. Elle doit surtout savoir revenir.'),
 d('kaerune','Si je recule à chaque attaque, je ne gagnerai jamais.','umbraelys'),
 d('umbraelys','Esquiver, ce n’est pas fuir. C’est obliger l’autre à dépenser sa force dans le vide.'),
 d('kaerune','Et s’il ne me laisse pas la place ?','umbraelys'),
 d('umbraelys','Tu la crées. Observe mes appuis. Ne cours pas après le premier coup.'),
 n('Umbraelys prend position. Dans son regard, Kaerune retrouve la même attention inquiète, désormais cachée derrière celle d’une combattante.')
 ],after:[
 n('Umbraelys refuse de céder une première fois. Un souffle, un dernier appui… puis Kaerune trouve l’ouverture. L’exercice s’arrête enfin.'),
 d('umbraelys','Assez. Tu as gagné.'),
 d('kaerune','Je t’ai fait mal ?','umbraelys'),
 d('umbraelys','Non. Mais ta force augmente à vue d’œil. Il va falloir apprendre à la connaître aussi vite qu’elle grandit.'),
 n('Le soir, Kaerune s’installe près du feu, contre Nyurune. Les conversations s’éteignent une à une. Sa sœur, elle, reste éveillée.'),
 d('nyurune','Les éclaireuses ont vu de nouvelles lueurs dans les montagnes. Les Démons de lave se réveillent.'),
 d('kaerune','Séraphyne nous préviendra si le danger approche.','nyurune'),
 d('nyurune','Elle ne peut plus tout porter. C’est ça qui me fait peur.'),
 n('Kaerune ne trouve pas de réponse. Elle rapproche une aile de sa sœur et reste là jusqu’à ce que Nyurune s’endorme.')
 ]},
 4:{title:'Le pas qui manque',enemies:['seraphyne'],lesson:'second',background:'harmony-forest',before:[
 n('À l’aube, Séraphyne attend déjà dans la clairière. Kaerune a peu dormi. Les paroles de Nyurune lui reviennent à chaque battement d’ailes.'),
 d('seraphyne','Tu as quelque chose à me demander.'),
 d('kaerune','Quand saurai-je que je suis prête ?','seraphyne'),
 d('seraphyne','Ce n’est pas le genre de réponse que je peux te donner à ta place.'),
 d('kaerune','Alors ne retiens pas tes coups.','seraphyne'),
 d('seraphyne','Je les retiendrai assez pour que tu puisses apprendre. À toi de m’obliger à faire attention.'),
 n('Cette fois, Kaerune voit le premier mouvement. Elle garde les yeux sur sa maîtresse et entre dans le combat.')
 ],after:[
 n('Kaerune a tenu. Elle a même forcé Séraphyne à changer d’appui. Pourtant, quand sa maîtresse referme la distance, Kaerune se retrouve une nouvelle fois au sol.'),
 d('kaerune','J’étais si près…','seraphyne'),
 d('seraphyne','Oui. Et tu as voulu finir avant d’avoir préparé la fin.'),
 d('kaerune','Il fallait que j’attaque plus vite ?','seraphyne'),
 d('seraphyne','Il fallait que tu saches pourquoi tu attaquais. Va voir Éliandris. Elle te parlera de technicité mieux que moi.'),
 n('Séraphyne attend que Kaerune s’éloigne pour relâcher son épaule blessée. Pour la première fois depuis longtemps, son sourire n’a rien de forcé.')
 ]},
 5:{title:'La lumière entre deux gestes',enemies:['eliandris'],background:'harmony-forest',before:[
 n('Éliandris écoute Kaerune raconter le combat sans l’interrompre. Quand elle répond, sa voix est calme, presque douce.'),
 d('eliandris','Tu décris chacun de tes coups. Tu ne m’as pas encore parlé d’une seule décision.'),
 d('kaerune','Je voulais la toucher avant qu’elle me touche.','eliandris'),
 d('eliandris','C’est un désir. Une décision, c’est choisir quand tu acceptes d’attendre.'),
 d('kaerune','Attendre devant quelqu’un qui veut me frapper ?','eliandris'),
 d('eliandris','Parfois. Se préparer, observer, reprendre son appui… Un geste sans attaque peut décider du suivant.'),
 n('Une lumière pâle glisse sur les plumes d’Éliandris. Les petites marques de ses exercices précédents s’effacent.'),
 d('eliandris','Ma lumière me soigne à chaque tour. Elle réagit aussi aux coups critiques et aux frappes de ta seconde action de vitesse. Frapper plus souvent n’est donc pas toujours la solution.'),
 d('kaerune','Il faut que mes coups comptent plus que ce que tu récupères.','eliandris'),
 d('eliandris','Voilà une décision. Maintenant, essaie.')
 ],after:[
 n('La lumière revient, mais Kaerune cesse de la poursuivre coup après coup. Elle prépare son enchaînement, attend l’ouverture et s’y engage tout entière.'),
 d('eliandris','Tu as compris. La technique ne remplace pas la force. Elle lui donne une direction.'),
 d('kaerune','J’avais peur qu’en prenant mon temps, je perde celui des autres.','eliandris'),
 d('eliandris','Souviens-toi de cette peur. Mais ne la laisse pas choisir tous tes gestes.'),
 n('Kaerune quitte la clairière en répétant mentalement le mouvement. Pour une fois, elle ne cherche pas à aller plus vite.')
 ]},
 6:{title:'À la hauteur de ma sœur',enemies:['nyurune'],background:'harmony-forest',before:[
 n('Au milieu de l’après-midi, Nyurune barre le chemin de Kaerune. Ses ailes sont déployées et son sourire a quelque chose de provocateur.'),
 d('nyurune','Tout le camp parle de tes progrès. Il paraît qu’on ne peut plus te suivre.'),
 d('kaerune','Tout le camp ? Umbraelys a encore parlé ?','nyurune'),
 d('nyurune','Peut-être. Mais j’ai quelques années d’expérience à défendre. Fais-moi une place dans ton programme.'),
 d('kaerune','Tu veux un défi ?','nyurune'),
 d('nyurune','Je veux vérifier que tu n’oublieras pas ta sœur quand tu seras une prodige.'),
 d('kaerune','Ça, tu n’as pas besoin de me battre pour le vérifier.','nyurune')
 ],after:[
 n('Nyurune reste un instant immobile, encore surprise par le dernier enchaînement. Puis elle laisse échapper un rire incrédule.'),
 d('nyurune','Toutes ces années à te montrer comment faire… et maintenant, c’est moi qui n’arrive plus à suivre.'),
 d('kaerune','Tu m’as justement montré comment faire.','nyurune'),
 d('nyurune','N’essaie pas d’être gentille. Ça rend ma défaite encore pire.'),
 n('Kaerune s’apprête à répondre lorsqu’une explosion secoue le camp. Au-delà des tentes, les arbres s’embrasent.'),
 d('nyurune','Kaerune, avec moi !'),
 n('Une seconde déflagration coupe le passage. Des silhouettes courent dans la fumée. Quand Kaerune retrouve son équilibre, elle ne voit plus sa sœur.'),
 d('kaerune','Nyurune ! Réponds-moi !','nyurune')
 ]},
 7:{title:'Celle qu’ils craignent',enemies:['cobra'],boss:true,background:'harmony-fire',before:[
 n('La forêt n’a plus d’odeur que celle de la cendre. Kaerune suit les appels, cherche un passage entre les flammes, puis s’immobilise devant un sifflement.'),
 n('Un Cobra des laves se dresse au milieu du sentier. Sa chair semble couler entre ses écailles. Une magie étrangère dirige chacun de ses mouvements : celle des Démons de lave.'),
 d('cobra','Kaerune. Enfin.'),
 d('kaerune','Où est ma sœur ?','cobra'),
 d('cobra','Tu n’auras plus à t’en soucier. Mes maîtres m’envoient supprimer une menace avant qu’elle ne grandisse.'),
 d('kaerune','Ils ont brûlé notre camp… pour moi ?','cobra'),
 d('cobra','Une jeune aile se brise plus facilement. Ils ont décidé de ne pas attendre.'),
 n('Kaerune recule d’un pas. La peur est là, entière. Puis elle pense à la clairière, au feu de la veille, à la promesse faite entre les arbres.'),
 d('kaerune','Alors ils auraient dû venir eux-mêmes.','cobra')
 ],after:[
 n('Le Cobra s’affaisse. Le feu qui courait entre ses écailles se disperse dans la terre. Kaerune reste debout juste assez longtemps pour s’assurer qu’il ne bouge plus.'),
 d('kaerune','Nyurune… Je suis là…'),
 n('Ses jambes cèdent. Elle tombe loin des flammes, incapable d’appeler une seconde fois.'),
 n('Plusieurs heures passent. Nyurune finit par retrouver sa sœur parmi les troncs noircis. Elle se penche, écoute son souffle, puis ferme les yeux de soulagement.'),
 d('nyurune','Tu avais promis qu’on trouverait du temps. Ne commence pas à tricher.'),
 n('Nyurune ramène Kaerune dans la cité principale. Lorsqu’elle apprend l’attaque, Zyraël quitte son trône et se rend elle-même au domaine des Démons de lave.'),
 d('zyrael','Votre créature a attaqué notre camp. Vous allez faire cesser ces agressions. Maintenant.','thyur'),
 d('thyur','La colère a débordé nos frontières. Elle ne les franchira plus.','zyrael'),
 d('zyrael','Harmony vous a donné une place. Je refuse de croire que vous ne puissiez y vivre qu’en détruisant celle des autres.','thyur'),
 d('thyur','Alors laissez-nous vous le prouver.','zyrael'),
 n('Zyraël choisit de leur laisser cette chance. Elle regagne le trône de sa cité, décidée à protéger la paix autant que les êtres qui en dépendent.'),
 n('Quand les dernières traces de sa présence disparaissent, Thyur se tourne vers les profondeurs de son domaine.'),
 d('thyur','Elle nous fait encore confiance. Préparez l’assaut.',null),
 d('thyur','Notre réplique du Sceau brisé retiendra la Navigatrice. Et cette fois, Kaerune ne nous échappera pas.',null),
 n('Dans la cité, Kaerune dort encore. Nyurune veille près d’elle. Aucune des deux ne sait ce qui vient d’être décidé.'),
 n('Fin du chapitre 1 — La relève.')
 ]}
};

// The coda leaves the battlefield: neutral light for the city, embers for Thyur’s domain.
KAERUNE_MISSIONS[7].after=KAERUNE_MISSIONS[7].after.map((frame,i)=>i<6?frame:{...frame,background:[6,7,8,9,11,12,13].includes(i)?'harmony-fire':'harmony-sanctuary'});
