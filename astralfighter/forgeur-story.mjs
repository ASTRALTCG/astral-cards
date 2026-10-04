// Chapter data and enemy patterns. Independent of engine/save state.
const n=(text,extra={})=>({speaker:null,text,...extra});
const d=(speaker,text,other='forgeur',extra={})=>({speaker,text,other,...extra});
export const FORGEUR_STORY_VERSION=1;
export const FORGEUR_CAST={
 forgeur:{name:'Le Forgeur',art:'forgeur-classic',kind:'forgeur'},
 zvatas:{name:'Zvatas',art:'zvatas',kind:'beast'},
 todylk:{name:'Todylk',art:'todylk',kind:'beast'},
 ecurexplosion:{name:'L’Écurexplosion',art:'ecurexplosion',kind:'beast'},
 roxxor:{name:'Roxxor',art:'roxxor',kind:'beast'},
 dragonNebryss:{name:'Dragon brumeux contrôlé par Nébryss',art:'dragon-brumeux-nebryss',kind:'beast'},
 dragonDemon:{name:'Dragon brumeux démononuageux',art:'dragon-brumeux-demon',kind:'beast'},
 tryhydre:{name:'La Tryhydre',art:'tryhydre',kind:'beast'},
 avatarZvatas:{name:'L’Avatar de Zvatas',art:'avatar-zvatas',kind:'beast'}
};
export const FORGEUR_CHAPTER={title:'Chapitre 1 — Naissance',description:'Sur Démono, une nouvelle volonté éveille les braises de l’ancienne guerre. Né pour forger et commander, le Forgeur doit d’abord ramener l’ordre parmi les siens.',nextTitle:'Pour prouver ma place (et que j’existe)'};
export const FORGEUR_MISSIONS={
 1:{title:'Les premières braises',level:1,gearHint:'Premiers pas sur Démono',enemies:['ecurexplosion'],background:'forgeur-plains',before:[
 n('Des siècles se sont écoulés depuis la chute de Selkiel, l’ancien Navigateur de Démono. Sous les nuages noirs, les traces de la défaite semblent ne jamais devoir s’effacer.'),
 n('Puis Zvertune, une lune errante, s’est approchée d’un peu trop près de Démono. De cette lune est né Zvatas.'),
 n('Lorsque Zvatas a pris le contrôle de la planète, les Démononuageux se sont réveillés, un par un. Avec eux sont revenues les colères d’une guerre perdue depuis des siècles.'),
 n('Pour gouverner ces forces éparses, Zvatas a façonné lui-même une créature : le Forgeur. Un être capable de s’adapter au combat, de créer des armes et des armures extraordinaires, et de guider les autres.'),
 d('zvatas','Ouvre les yeux. Voici ton nouveau monde.'),
 n('Une lueur traverse l’acier. Le Forgeur ouvre les yeux, puis observe ses mains. Il n’a encore aucun souvenir. Pourtant, il sait déjà à quoi elles serviront.'),
 d('forgeur','Ce monde… attend quelque chose de moi.','zvatas'),
 d('zvatas','Après la défaite de Selkiel, Démono a perdu sa splendeur. Ses guerriers se réveillent sans ordre ni direction. Tu vas leur en donner une.'),
 d('forgeur','Et vous, Maître ?','zvatas'),
 d('zvatas','Nébryss est affaiblie par ses combats. J’emporte progressivement mon armée dans mon propre corps. Quand viendra l’invasion, nous serons prêts.'),
 d('zvatas','Ici, tu rétabliras l’ordre. Forge ce dont ils ont besoin. Fais d’eux une armée.'),
 n('Le Forgeur referme lentement les doigts. Il vient de naître, et une planète entière pèse déjà dans ses mains.'),
 n('Sur les plaines, une silhouette l’attend : Todylk. Remis de sa défaite, le Démononuageux porte encore dans les yeux une détermination farouche.'),
 d('todylk','C’est donc toi, le Forgeur. Il faut que tu viennes. L’Écurexplosion ravage une partie de la forêt.'),
 d('forgeur','Il combat un ennemi ?','todylk'),
 d('todylk','Il combat ce qu’il a perdu. Et tout ce qui se trouve à portée de ses bombes.'),
 n('Le Forgeur lève la tête, acquiesce et suit les détonations. À la lisière, une créature lance bombe après bombe, dévorée par la haine de son ancienne défaite.'),
 d('forgeur','Arrête. Ces terres sont les nôtres. Une autre mission t’attend.','ecurexplosion'),
 d('ecurexplosion','Une autre mission ? Tu ne sais rien de ce qu’ils nous ont fait !'),
 n('L’Écurexplosion saisit une nouvelle bombe. Le Forgeur abaisse son épée et se place entre lui et la forêt.')
 ],after:[
 n('L’Écurexplosion tombe à genoux. Le silence revient entre deux souffles rauques. Ses dernières bombes roulent dans l’herbe sans qu’il cherche à les reprendre.'),
 d('ecurexplosion','Je n’aurais pas dû… Je suis désolé.'),
 d('forgeur','Ce n’est rien. Après tant de siècles, tu es désemparé. Mais ce monde a encore besoin de toi.','ecurexplosion'),
 n('Soudain, un tremblement traverse le sol.',{shake:true}),
 n('Au loin, la surface du lac de la Mer bleutée se soulève. Roxxor sort de l’eau, envahi par la douleur et le regret. Son cri couvre le fracas des vagues.'),
 d('forgeur','Roxxor ! Calme-toi !','roxxor'),
 d('roxxor','J’ai perdu ! Contre Reysia… La vice-commandante de Nébryss !'),
 d('roxxor','Je le revois à chaque instant. Je ne le supporte plus !'),
 n('Le Forgeur accourt. Roxxor ne semble plus distinguer ceux qui viennent l’aider de ceux qu’il veut combattre.')
 ]},
 2:{title:'Le poids d’une défaite',level:4,gearHint:'Au moins un équipement de niveau 1',enemies:['roxxor'],background:'forgeur-plains',before:[
 n('Roxxor avance hors du lac, laissant derrière lui de profonds sillons. Le Forgeur tente une dernière fois de lui barrer la route sans lever son arme.'),
 d('forgeur','Reysia n’est pas ici. Regarde autour de toi : tu es sur Démono.','roxxor'),
 d('roxxor','Alors pourquoi ai-je encore l’impression d’être à terre ?'),
 d('forgeur','Parce que tu n’as pas encore accepté de te relever.','roxxor'),
 n('Roxxor rugit et se jette sur lui. Cette fois, le Forgeur doit frapper.')
 ],after:[
 n('Roxxor s’effondre enfin. Le Forgeur a dû frapper fort : avant la défaite, cette créature occupait un rang élevé dans l’armée.'),
 d('forgeur','Maître Zvatas, Roxxor est évanoui. Il le restera pendant un moment.','zvatas'),
 d('zvatas','Ce n’est pas un problème. La plus grande menace est encore à venir.'),
 n('Le Forgeur reprend sa route. Au loin, il reconnaît Wolffy, qui s’était battu désespérément jusqu’au terme de l’ancienne guerre.'),
 d('wolffy','On m’a dit que tu savais forger. Il me faudrait un nouveau dentier de combat.'),
 d('forgeur','Alors tu en auras un. Je suis là pour créer du matériel à la hauteur de ceux qui le portent.','wolffy'),
 n('Lorsque l’ouvrage est prêt, Wolffy lève une patte pour remercier le Forgeur, puis repart avec son nouvel équipement.'),
 d('forgeur','La bénédiction de l’épée… Il la possède, mais il ne s’en rend même pas compte.',null),
 n('Les jours passent. Le Forgeur façonne des armures, des épées et des griffes. Peu à peu, le rythme de sa forge remplace celui des explosions.'),
 n('En explorant une caverne, il découvre un cristal violet. Sa couleur tranche avec les nuages noirs qui imprègnent Démono.'),
 n('Il s’approche. Ce n’est pas une pierre. C’est un cœur… le cœur d’une créature de Nébryss.'),
 n('Au contact de sa main, le cœur se met à battre. Chaque pulsation est plus forte que la précédente. L’espace se déchire autour de lui.'),
 n('Le Forgeur bascule dans une dimension parallèle. Un horizon violet s’étend de toutes parts, traversé d’éclairs.',{background:'forgeur-nebryss'}),
 d('forgeur','Où suis-je ? Qu’est-ce que tu as fait ?',null,{background:'forgeur-nebryss'}),
 d('dragonNebryss','Enfin… Des siècles à moisir ici. Des siècles que j’attends un réceptacle !','forgeur',{background:'forgeur-nebryss'})
 ]},
 3:{title:'Le cœur étranger',level:7,gearHint:'Arme en or et veste d’aventurier conseillées',enemies:['dragonNebryss'],background:'forgeur-nebryss',before:[
 n('La voix du cœur résonne dans toute la dimension. Une forme immense s’enroule dans la brume violette : un Dragon brumeux, soumis à une volonté de Nébryss.'),
 d('forgeur','Tu ne feras pas de moi ton réceptacle.','dragonNebryss'),
 d('dragonNebryss','Tu es venu jusqu’à moi. Tu n’as plus à choisir.'),
 n('Le Forgeur serre son arme. Les éclairs révèlent les contours du Dragon, déjà prêt à frapper deux fois.')
 ],after:[
 n('L’emprise de Nébryss se brise. La brume violette se déchire et laisse apparaître le Dragon brumeux démononuageux.'),
 d('dragonDemon','Je… Qu’est-ce qui s’est passé ?'),
 n('Un portail s’ouvre sous leurs pieds et les ramène sur Démono. Tous deux peinent encore à comprendre ce qu’ils viennent de traverser.',{background:'forgeur-plains'}),
 d('dragonDemon','Pardonne-moi. Ce cœur…','forgeur',{background:'forgeur-plains'}),
 d('zvatas','Forgeur ! À la place principale. Maintenant !','forgeur',{background:'forgeur-plains'}),
 n('Le Forgeur s’élance. Après de longues minutes de course, il débouche sur les plaines bordant la place principale.',{background:'forgeur-plains'}),
 n('La Tryhydre est là. Trois têtes se dressent au-dessus du sol : l’une des pièces maîtresses de l’ancienne armée vient de se réveiller.',{background:'forgeur-plains'}),
 d('forgeur','Reculez tous. Je m’en charge.','tryhydre',{background:'forgeur-plains'})
 ]},
 4:{title:'Trois têtes, un nouveau maître',level:10,gearHint:'Niveau 9–10 · un équipement en or et un en Diamanite',boss:true,enemies:['tryhydre'],background:'forgeur-plains',before:[
 n('La Tryhydre balaie les plaines du regard. Ses trois têtes cherchent encore une bataille qui s’est achevée des siècles auparavant.'),
 d('forgeur','La guerre est terminée. Écoute-moi.','tryhydre'),
 d('tryhydre','Où est l’ennemi ? Où est mon maître ?'),
 n('Un souffle brûlant répond à la place des mots. Le Forgeur plante ses pieds dans la terre et lève son arme.')
 ],after:[
 n('La Tryhydre cesse enfin de lutter. Ses têtes se tournent à gauche, puis à droite. Rien, autour d’elle, ne ressemble à ses derniers souvenirs.'),
 d('tryhydre','Ce lieu… Pourquoi tout a-t-il changé ?'),
 d('forgeur','Tu as perdu la guerre. Il y a des siècles.','tryhydre'),
 n('Ses trois têtes s’abaissent lentement. La colère laisse place à une déception immense.'),
 d('tryhydre','Et mon maître ? Où est Selkiel ?'),
 d('forgeur','Selkiel est mort. Désormais, notre Navigateur est Maître Zvatas.','tryhydre'),
 n('La Tryhydre scrute l’horizon sans rien apercevoir. Le Forgeur lève un doigt vers le ciel.'),
 n('Au-dessus d’eux se tient Zvatas, immense comme une lune.'),
 d('tryhydre','Maître… Désormais, je ne perdrai plus.','zvatas'),
 d('zvatas','Tu n’as plus le choix. La défaite n’est plus une option.','tryhydre'),
 n('Plusieurs semaines passent. Le calme revient sur Démono, fragile, mais réel. La forge ne s’éteint presque jamais.'),
 d('zvatas','Forgeur. Es-tu prêt à devenir commandant ?'),
 d('forgeur','Oui, Maître.','zvatas'),
 d('zvatas','Tu n’as pas compris ma question.'),
 n('Un puissant tourbillon noir apparaît sur les plaines. Il ravage les alentours, arrache l’herbe et emporte tout dans sa course.'),
 n('Au cœur de la tempête se dessine une silhouette : l’Avatar de Zvatas. La création même de ce que le Navigateur serait en tant que soldat.'),
 d('avatarZvatas','Alors prouve-le. Bats-moi, au péril de ton existence.'),
 n('Le Forgeur resserre sa prise sur son épée. L’Avatar de Zvatas s’avance.'),
 n('Fin du chapitre 1 — Naissance.'),
 n('Chapitre 2 — Pour prouver ma place (et que j’existe). En cours de développement…')
 ]}
};
// Fixed encounter budgets: never scale to the player's equipped gear.
export const FORGEUR_ENCOUNTERS={
 ecurexplosion:{hp:155,dmg:18,level:1,rule:'Tours impairs : dépose une bombe. Tours pairs : frappe à 100 %, puis la bombe explose à 140 % des dégâts d’attaque. Aucun critique ni double action.'},
 roxxor:{hp:370,dmg:31,level:4,rule:'Chaque tour : frappe à 125 %, sans critique ni double action. Chaque frappe qui touche le Forgeur a 15 % de chance de réduire ses dégâts de 10 % jusqu’à la fin du combat. Malus non cumulable, retirable par une purification.'},
 dragonNebryss:{hp:560,dmg:43,level:7,rule:'Chaque tour : une frappe à 60 %, sans critique, puis une frappe à 100 % avec 50 % de chance de critique (×1,75). Aucune double action de Vitesse.'},
 tryhydre:{hp:900,dmg:60,level:10,rule:'Chaque tour, trois têtes : attaque à 100 %, applique une brûlure (5 % des PV max au début du tour), puis gagne 7 % de dégâts d’attaque, cumulables. Aucun critique ni double action supplémentaire.'}
};
export function forgeurStoryEnemies(stage){
 const kind=FORGEUR_MISSIONS[stage].enemies[0],v=FORGEUR_ENCOUNTERS[kind],c=FORGEUR_CAST[kind];
 return [{id:'enemy0',type:'dog',storyKind:kind,forgeurStory:true,name:c.name,art:c.art,level:v.level,hp:v.hp,maxHp:v.hp,dmg:v.dmg,baseDmg:v.dmg,boss:!!FORGEUR_MISSIONS[stage].boss,burning:false,powerBonus:0,rageStacks:0,bombPending:false}];
}
export function forgeurEnemyTurn(b,e,{strike,nextAction,emit,log,rng,burn,weakness}){
 if(!e.forgeurStory)return false;
 const cue=(label,kind)=>emit({type:'forgeur-story-cue',to:e.id,label,kind});
 if(e.storyKind==='ecurexplosion'){
  if(b.round%2===1){e.bombPending=true;cue('Bombe posée · explosion au prochain tour','bomb-set');log('Une bombe attend au sol. Au prochain tour ennemi : frappe, puis explosion à 140 %.');}
  else{strike(1,false,0);if(e.bombPending&&b.hp>0&&e.hp>0){nextAction();e.bombPending=false;cue('La bombe explose !','bomb-explode');strike(1.4,'explosion',0);}}
 }else if(e.storyKind==='roxxor'){
  cue('Poids du regret · 125 %','heavy');strike(1.25,'fangs',0);
  if(b.hp>0&&rng()<.15)weakness();
 }else if(e.storyKind==='dragonNebryss'){
  cue('Brume de Nébryss · première frappe','dragon');strike(.6,'purple-slash',0);
  if(b.hp>0&&e.hp>0){nextAction();cue('Seconde frappe · 50 % de critique','dragon');strike(1,'purple-slash',.5);}
 }else if(e.storyKind==='tryhydre'){
  cue('Première tête · morsure','head-strike');strike(1,'fangs',0);
  if(b.hp>0&&e.hp>0){nextAction();cue('Deuxième tête · souffle brûlant','head-burn');burn();}
  if(b.hp>0&&e.hp>0){e.rageStacks++;e.dmg=Math.round(e.baseDmg*(1+.07*e.rageStacks));emit({type:'enemy-rage',to:e.id,dmg:e.dmg,label:'Troisième tête · dégâts +'+(7*e.rageStacks)+' %'});log('La troisième tête attise sa rage : +'+(7*e.rageStacks)+' % de dégâts.');}
 }
 return true;
}
