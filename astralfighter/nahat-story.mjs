// Four missions, seven encounters. Forest encounters share one completion reward.
const n=text=>({speaker:null,text});
const say=(speaker,text,other='nahat')=>({speaker,text,other});
const scene=(background,frames)=>frames.map(f=>({...f,background}));
export const NAHAT_CAST={
 nahat:{name:'Nahat',art:'nahat-ado',combatArt:'nahat-ado-combat',kind:'human'},
 nahatHealer:{name:'???',art:'nahat-healer',kind:'human'},
 nathalia:{name:'Nathalia',art:'nathalia',combatArt:'nathalia-combat',kind:'human'},
 nathaliaPose:{name:'Nathalia',art:'nathalia-pose',kind:'human'},
 lycaon:{name:'Lycaon',art:'lycaon',combatArt:'lycaon-combat',kind:'human'},
 vesperaCitizens:{name:'Habitants de Vespera',art:'vespera-citizens',kind:'human'},
 academyStudents:{name:'Élèves de l’académie',art:'academy-students',kind:'human'}
};
export const NAHAT_CHAPTER={title:'Chapitre 1 — Le prodige de l’Épine',description:'Un prodige laissé pour mort, une main tendue dans la forêt et le long chemin du retour vers Vespera.',nextTitle:'À venir'};
export const NAHAT_MISSIONS={
 1:{title:'La main tendue',level:1,background:'nahat-cottage',enemies:['nahatWolf'],before:[
 ...scene('nahat-city-view',[
 n('Né dans un village proche de Vespera, Nahat était destiné à devenir éleveur, comme son père. Mais les récits de l’Épine nourrissaient un autre rêve : rejoindre l’Ordre et rencontrer Achylion, son idole.'),
 n('Un voyageur accueilli par ses parents remarqua son éveil alors qu’il n’avait que quatre ans. Le rapport de cet homme, membre respecté de l’Épine, changea son destin. À six ans, Nahat fut recruté.'),
 n('Assassinat, armes, pilotage galactique, combat rapproché : il excellait en tout. À quatorze ans, il obtint le rang Akami et entra dans sa dernière année d’études. Son premier assassinat devait enfin lui permettre de faire ses preuves.'),
 n('La révolte d’Alatros contre Achylion suspendit sa formation. Aveuglé par son orgueil, Nahat s’infiltra dans un conseil de guerre pour tuer le meneur. Il approcha sa dague de sa gorge… et s’effondra, le ventre ouvert par l’épée d’Alatros.'),
 n('« Tu as choisi le mauvais camp, mon petit… » Laissé pour mort aux portes de la ville, Nahat tenta de rentrer chez lui. Il s’écroula sur le chemin.')]),
 ...scene('nahat-cottage',[n('Au cœur de la forêt, une petite maison de bois se tient à l’écart des sentiers. C’est là que Nahat ouvre enfin les yeux.')]),
 ...scene('nahat-interior',[
 n('Sa blessure a été soignée. Nahat regarde autour de lui : il est seul. Encore faible, il se lève et se dirige vers la sortie.'),
 n('La porte s’ouvre. Une vieille dame entre, un panier rempli d’herbes médicinales au bras.'),
 say('nahatHealer','Tu es enfin réveillé, mon petit.'),
 say('nahat','Où suis-je ? Et qui êtes-vous ?','nahatHealer'),
 say('nahatHealer','Ça n’a pas d’importance pour le moment. Il faut te reposer et reprendre des forces. Tu ne serais pas là si je ne t’avais pas trouvé à temps.'),
 n('Un vertige saisit Nahat. Il retombe sur le lit.'),
 say('nahatHealer','Reste tranquille. Je vais te préparer un thé avec des herbes qui accéléreront ta guérison.'),
 n('Elle prépare la mixture et la lui tend. Nahat la boit d’un trait. Plusieurs jours passent ; les forces lui reviennent peu à peu.'),
 say('nahat','Les herbes de la vieille dame ont un goût affreux, mais elles sont plutôt efficaces.'),
 n('Un cri retentit à l’extérieur.'),say('nahat','Quelqu’un est en danger !')]),
 ...scene('nahat-cottage',[n('Nahat sort en courant. Un loup sauvage menace la vieille dame. Il se place entre eux, sa lame levée.'),say('nahat','Reculez ! Je m’en occupe.','nahatHealer')])
 ],after:scene('nahat-cottage',[
 say('nahatHealer','Merci de m’avoir sauvée. Je vois que tu vas beaucoup mieux.'),
 say('nahat','C’est grâce à vous. Je ne vous remercierai jamais assez. Allez-vous enfin me dire où nous sommes, et votre nom ?','nahatHealer'),
 say('nahatHealer','Nous sommes au cœur de la forêt, près de Duna. Nos chemins ne font que se croiser, cher enfant. Termine ta convalescence, oublie tout ça et renoue avec ton destin.'),
 n('Nahat comprend qu’elle ne souhaite pas en révéler davantage. Cette fois, il décide de ne pas insister.')])},
 2:{title:'Les épreuves des bois',level:4,background:'nahat-forest',enemies:['nahatSnake','nahatBear','nahatTiger','nahatOrcs'],gauntlet:true,before:[
 ...scene('nahat-interior',[n('Quelques jours plus tard, Nahat se sent prêt à retourner à Vespera. Il rassemble ses affaires ; sa blessure ne le retient plus.')]),
 ...scene('nahat-cottage',[say('nahat','Vous m’avez rendu bien plus que mes forces. Merci.','nahatHealer'),n('Il lui fait ses adieux une dernière fois, puis s’engouffre entre les arbres.')]),
 ...scene('nahat-forest',[n('La forêt s’assombrit. Entre les racines, les bêtes guettent. Nahat se demande quel accueil lui réserve l’Épine : son échec a sûrement fait le tour de l’Ordre.'),
 n('Il revoit la lame d’Alatros, sa propre précipitation. Son orgueil et sa vanité ont bien failli le tuer. Cette fois, il avancera sans sous-estimer ce qui lui barre le chemin.'),
 n('Un serpent se dresse devant lui. Plus loin l’attendent un ours, un tigre et des orcs. Il doit traverser les quatre rencontres pour sortir des bois.')])
 ],after:scene('nahat-forest',[n('Les derniers orcs reculent. Nahat traverse la clairière en reprenant son souffle. Après une longue marche et bien des obstacles, il aperçoit enfin la sortie de la forêt. La nuit tombe.')])},
 3:{title:'Le duel de Nathalia',level:5,background:'nahat-forest',enemies:['nathalia'],duel:true,before:scene('nahat-forest',[
 n('Une petite pierre heurte la tête de Nahat. Il lève les yeux. Nathalia est assise sur une branche, l’air amusé. Camarade de promotion, elle est aussi l’une des recrues les plus prometteuses de l’académie.'),
 say('nathaliaPose','Ça fait des jours que tout le monde te cherche, Échec ! Je pars à la recherche d’une racine pour notre maître et je tombe sur toi… Quel heureux hasard.'),
 say('nahat','Comment m’as-tu appelé ?','nathaliaPose'),
 say('nathaliaPose','Échec. Comme tout ce que tu entreprends.'),
 say('nahat','Viens te battre si tu l’oses ! Que je te montre qui est vraiment un échec ici !','nathaliaPose'),
 say('nathaliaPose','On ne joue malheureusement pas dans la même cour, très cher.'),
 n('Nathalia quitte sa branche et dégaine.')
 ]),after:[
 ...scene('nahat-forest',[say('nathalia','C’est ça, la fine fleur de l’Épine ? Quelle déception… On se reverra bientôt, petit échec.'),n('Nathalia disparaît dans la forêt.'),say('nahat','Si l’exaspération devait avoir un visage, ce serait le sien !')]),
 ...scene('nahat-city-view',[n('Nahat reprend sa route. Au loin, les murs de Vespera se découpent dans la lumière du soir. Il franchit les portes de la ville et se dirige vers chez lui.')]),
 ...scene('nahat-city-night',[
 {...say('vesperaCitizens','Les habitants se retournent à son passage. Leurs regards insistants lui glacent le dos ; les chuchotements commencent dès qu’il s’éloigne.'),narration:true},
 say('nahat','Mon échec n’est donc pas passé inaperçu…','vesperaCitizens'),
 n('Il continue jusqu’à ses appartements. Devant sa porte, une voix familière le tire de ses pensées.'),
 {...say('lycaon','Alors comme ça, tu es en vie !'),speakerName:'…'},
 say('nahat','Maître Lycaon… Vous êtes là.','lycaon'),
 say('lycaon','Tu sais très bien que personne ne passe les portes de Vespera sans que j’en sois averti. Qu’est-ce qui t’est passé par la tête ? As-tu imaginé un seul instant ce que tes actes ont déclenché ?'),
 say('lycaon','Tu pensais réellement qu’un minable Akami comme toi avait l’étoffe nécessaire pour éliminer un homme tel qu’Alatros ?'),
 say('lycaon','À ton avis, qui a été rendu responsable du commandement de cet assassinat ? La notoriété d’Achylion en a pris un coup.'),
 say('lycaon','Grâce à ton échec total, l’Épine a perdu quatorze de ses plus grands généraux pour mettre fin à ce coup d’État !'),
 n('Nahat baisse la tête. Lycaon contemple son élève abattu, puis reprend d’un ton sec.'),
 say('lycaon','Reste chez toi. Demain, à la première heure, retrouve-moi à l’académie.'),
 n('Son maître disparaît dans les rues. Nahat rentre chez lui ; malgré tout, un sourire se dessine sur son visage.'),
 say('nahat','Je vais pouvoir reprendre ma formation demain. Je devrai travailler dur pour retrouver les faveurs de mes aînés.'),
 n('Il se couche enfin, épuisé par son voyage.')])]},
 4:{title:'Le prix de l’orgueil',level:6,background:'nahat-academy',enemies:['lycaon'],scriptedDefeat:true,boss:true,before:[
 ...scene('nahat-city-day',[n('Dès la première heure, Nahat traverse les rues de Vespera. L’académie l’attend. Il se surprend à hâter le pas.')]),
 ...scene('nahat-academy',[
 n('Lycaon est posté devant les portes. Tous les élèves sont présents : l’académie au grand complet. La joie de Nahat s’efface, remplacée par une inquiétude sourde.'),
 say('nahat','Que font tous les élèves au même endroit ? C’est comme s’ils m’attendaient…','academyStudents'),
 {...say('academyStudents','Nahat traverse les rangs silencieux. Dans les regards, il ne lit que dégoût et haine. Il rejoint Lycaon, la tête baissée.'),narration:true},
 say('lycaon','Moi, Lycaon, Maître académique en second et décisionnaire du passage Akama, te bannis de l’académie.'),
 n('Le monde de Nahat s’écroule. Son rêve vient d’être balayé d’une phrase. Son maître fait de lui un exemple : quiconque nuit à l’Épine doit en assumer les conséquences.'),
 say('nahat','Maître, je…','lycaon'),say('lycaon','Ma décision est prise. Tu n’es plus digne de faire partie de nos rangs.'),
 say('nahat','Maître, c’était un moment d’inattention. Vous savez que j’en suis capable.','lycaon'),
 say('lycaon','Tu parais bien sûr de toi, petit insolent. Faisons un marché. Je n’aurais moi-même eu aucune chance contre Alatros, et tu prétends pourtant être capable de l’éliminer.'),
 say('lycaon','Alors affrontons-nous. Si tu arrives à me toucher ne serait-ce qu’une seule fois, j’accepte ta réintégration.'),
 n('Nahat serre son arme. Tout ce qu’il espère encore repose sur un seul coup.')])],
 interlude:scene('nahat-academy',[{...say('lycaon','Regarde le fossé qui nous sépare et revois où est ta place.'),combatPortrait:true}]),
 after:scene('nahat-forest',[n('Nahat s’effondre. Lycaon jouait simplement avec lui. Un seul véritable coup a suffi.'),n('Blessé, humilié, banni, Nahat quitte Vespera sans savoir où aller. Puis il repense à la femme de la forêt, à son thé amer, à sa bienveillance sans questions.'),say('nahat','Elle est la dernière personne que j’ai vue me sourire.'),n('Il reprend la direction de la forêt, vers la petite maison près de Duna.'),n('Fin du chapitre 1 — Le prodige de l’Épine.')])}
};
const profiles={
 nahatWolf:{name:'Loup sauvage',art:'chien-sauvage',hp:95,dmg:10},
 nahatSnake:{name:'Serpent sauvage',art:'nahat-snake',hp:198,dmg:22},
 nahatBear:{name:'Ours sauvage',art:'nahat-bear',hp:331,dmg:22},
 nahatTiger:{name:'Tigre sauvage',art:'nahat-tiger',hp:193,dmg:25},
 nahatOrcs:{name:'Orcs',art:'nahat-orcs',hp:228,dmg:25},
 nathalia:{name:'Nathalia',art:'nathalia-combat',hp:311,dmg:36},
 lycaon:{name:'Lycaon',art:'lycaon-combat',hp:9999,dmg:1}
};
export function nahatEnemies(stage,wave=1){const m=NAHAT_MISSIONS[stage],kind=m.enemies[m.gauntlet?wave-1:0],p=profiles[kind];return [{...p,id:'enemy0',type:'dog',storyKind:kind,level:m.level,maxHp:p.hp,baseDmg:p.dmg,boss:!!m.boss,burning:false,powerUsed:false,powerBonus:0}];}
export function nahatIntent(b){if(b.storyKey!=='nahat')return null;
 if(b.stage===2)return {title:`Traversée des bois · ${b.nahatWave??1} / 4`,text:({nahatSnake:'Morsure : 33 % de chance d’empoisonner. Poison non cumulable : 5 % des PV max au début de chaque tour.',nahatBear:'Un ours plus résistant. Il prépare un puissant coup de patte à 160 % de ses dégâts.',nahatTiger:'Une attaque, puis 25 % de chance de frapper une seconde fois à 75 % de ses dégâts.',nahatOrcs:'Deux actions par tour : chaque attaque inflige 100 % de ses dégâts.'}[b.enemies[0]?.storyKind]??'')+' PV et compétences restaurés entre les combats. Défaite ou abandon : retour au serpent. Récompense après les orcs uniquement.'};
 if(b.stage===4)return {title:'La leçon de Lycaon',text:b.lycaonFinisherPending?'Lycaon va conclure la leçon.':'Lycaon esquive toutes les frappes. Ses coups d’entraînement ne retirent qu’un PV.'};return null;
}
