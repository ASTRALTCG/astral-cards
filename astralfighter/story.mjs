import {FORGEUR_CAST,FORGEUR_CHAPTER,FORGEUR_MISSIONS} from './forgeur-story.mjs';
import {NAHAT_CAST,NAHAT_CHAPTER,NAHAT_MISSIONS} from './nahat-story.mjs';
import {DRUNN_CAST,DRUNN_CHAPTER,DRUNN_MISSIONS} from './drunn-story.mjs';
import {STIBILI_VOID_CAST,STIBILI_CHAPTER2,STIBILI_CHAPTER2_MISSIONS} from './stibili-chapter2.mjs';
import {KAERUNE_CAST,KAERUNE_CHAPTER,KAERUNE_MISSIONS} from './kaerune-story.mjs';
export {KAERUNE_CHAPTER,KAERUNE_MISSIONS};
import {STIBILI_CAST,STIBILI_CHAPTER,STIBILI_MISSIONS} from './stibili-story.mjs';
export {STIBILI_CHAPTER,STIBILI_MISSIONS};
// Story data stays separate from combat math so every companion can have its own route.
const narrate=text=>({speaker:null,text});
const say=(speaker,text,other='wolffy',effect='')=>({speaker,text,other,effect});
export const STORY_CAST={
 ...FORGEUR_CAST,
 ...NAHAT_CAST,
 ...DRUNN_CAST,
 ...STIBILI_CAST,
 ...STIBILI_VOID_CAST,
 ...KAERUNE_CAST,
 wolffy:{name:'Wolffy',art:'wolffy',kind:'wolf'},
 sword:{name:'L’Épée des nuages',art:'epee-nuages',kind:'sword'},
 reynga:{name:'Reynga',art:'reynga',kind:'beast'},
 rivernia:{name:'Rivernia',art:'rivernia',kind:'human'},
 unknown:{name:'???',art:'rivernia',kind:'human',silhouette:true},
 emillia:{name:'Emillia',art:'emillia',kind:'human'},
 felk:{name:'Commandant Felk',art:'felk',kind:'human'},
 skeleton:{name:'Squelette de Nébryss',art:'squelette-nebryss',kind:'human'},
 ushio:{name:'Ushio',art:'ushio',kind:'human'}
};
export const WOLFFY_CHAPTER={title:'Chapitre 1 — La bataille',description:'Découvrez comment Wolffy est passé d’un simple loup à une créature enragée, loyale à Selkiel et à Zvatas.'};
export const WOLFFY_MISSIONS={
 1:{title:'L’éveil',enemies:['sword'],before:[
  narrate('L’histoire commence avant l’apparition du premier Navigateur. La planète n’a pas encore de nom. Ses forêts sont verdoyantes, ses ruisseaux abondants.'),
  narrate('Des animaux hauts de plusieurs mètres peuplent ces terres. Tous possèdent la capacité de parler. Leur cruauté maintient les humains enfermés dans un village.'),
  narrate('Wolffy connaît surtout les sentiers, les odeurs après la pluie et le pas de sa mère devant lui. Quand elle s’arrête, il s’arrête. Quand elle repart, le monde retrouve sa direction.'),
  narrate('Loin de cette forêt, Selkiel, un humain, échappe à sa prison. Dans une grotte au fond de l’océan, il pose la main sur une vieille épée.'),
  narrate('Sous l’apparence d’une lame oubliée repose une relique suprême : l’Épée des nuages. Le pouvoir des Démononuageux prend sa source en elle.'),
  narrate('Au contact de Selkiel, elle s’éveille. La lame retrouve son éclat et libère un torrent de nuages démoniaques. Ils traversent l’océan, gagnent le ciel, puis retombent sur toute vie.'),
  narrate('La forêt disparaît sous les nuages. Wolffy appelle sa mère. Il la retrouve à quelques pas, couchée là où elle l’attendait.'),
  narrate('Elle essaie de se relever. Ses pattes cèdent. Wolffy pousse son museau contre le sien, attend un souffle… puis comprend qu’il attendra seul.'),
  narrate('La puissance qui vient de la tuer envahit son propre corps. Lui survit. Ses muscles se tendent, ses crocs s’allongent ; une rage étrangère se mêle à la sienne. C’est une force qu’il ne maîtrisera jamais.'),
  narrate('Il ne sait pas ce qui lui arrive. Mais chaque nuage porte la même présence. Wolffy la suit jusqu’à sa source, sans s’arrêter quand ses pattes commencent à saigner.'),
  narrate('Devant l’Épée, les nuages se courbent. La relique demeure immobile. Wolffy sent dans sa poitrine le même battement sourd que dans la lame.'),
  say('wolffy','T… Tu as tué ma mère !','sword'),
  say('sword','…'),
  say('wolffy','Elle ne t’avait rien fait. Regarde-moi quand je te parle !','sword'),
  narrate('Le silence de la relique lui est insupportable. Wolffy ramasse ses dernières forces.'),
  say('wolffy','Ma rage va t’anéantir !','sword')
 ],after:[
  say('wolffy','Cette régénération… T… TU ES QUOI ?!','sword'),
  narrate('Il a frappé jusqu’à ne plus sentir sa mâchoire. Les marques laissées sur la lame se referment déjà. L’Épée n’a pas bougé.'),
  say('sword','La force avec laquelle tu me frappes vient de moi.'),
  say('wolffy','Alors reprends-la. Rends-la-moi, elle.','sword'),
  narrate('Aucune réponse ne vient. Wolffy avance encore une patte. Son corps refuse de suivre.'),
  say('sword','Je suis ton roi. Désormais, obéis.'),
  narrate('La voix résonne au milieu de ses pensées. Wolffy voudrait la chasser, mais ses yeux se ferment. Il s’effondre au pied de la source même de sa colère.')
 ]},
 2:{title:'Conquête',enemies:['reynga'],before:[
  narrate('Plusieurs semaines passent sans que Wolffy en sache rien. Lorsqu’il ouvre les yeux, une secousse lui fait claquer les crocs.'),
  say('wolffy','Maman… ?'),
  narrate('Sa propre voix l’arrête. Plus grave. Râpeuse. Il cherche une odeur familière, mais ne trouve que la fumée et la terre retournée.'),
  narrate('Le monde a désormais un nom : Démono. Selkiel et l’Épée des nuages en sont devenus les maîtres. Déjà, un Navigateur étranger convoite cette jeune planète : Nébryss.'),
  narrate('Son armée franchit un portail et se répand sur les terres. Wolffy se relève au milieu d’une bataille dont personne ne lui a expliqué les camps.'),
  narrate('Une créature lui barre le passage. Reynga. Elle porte une odeur qu’il n’a jamais rencontrée dans cette forêt.'),
  say('wolffy','Dégage de là.','reynga'),
  say('reynga','Gloire à Nébryss !'),
  say('wolffy','Je ne te le demanderai pas deux fois.','reynga')
 ],after:[
  {...narrate('Reynga se dissipe dans une volute de fumée. Wolffy referme les crocs sur le vide.'),speaker:'reynga',effect:'smoke',narration:true},
  say('wolffy','C’était ça… mon premier combat ?'),
  narrate('Il se souvient de l’Épée, intacte sous ses coups. Ce souvenir lui laisse un goût plus amer que la poussière.'),
  say('unknown','Ferme-la, le clébard !'),
  narrate('La voix vient de tout près. Wolffy n’a entendu aucun pas.'),
  say('wolffy','Montre-toi.','unknown')
 ]},
 3:{title:'Rivernia, être cosmique de Nébryss',enemies:['reynga','reynga'],before:[
  narrate('Une silhouette se détache de la fumée. Rivernia, être cosmique au service de Nébryss, regarde Wolffy comme un obstacle trop petit pour mériter un détour.'),
  say('rivernia','À genoux, le toutou.'),
  say('wolffy','Approche. On verra qui touche le sol en premier.','rivernia'),
  say('rivernia','Me battre contre un chien ? Tu te donnes beaucoup d’importance.'),
  narrate('Wolffy bondit. Rivernia le voit venir ; son sourire ne change pas.'),
  {...narrate('Elle laisse échapper un rire bref, puis disparaît. Deux Reynga occupent l’endroit où Wolffy allait retomber.'),speaker:'rivernia',effect:'vanish',narration:true},
  say('wolffy','Vous aussi, vous allez me parler de votre maître ?','reynga'),
  say('reynga','Gloire à Nébryss !'),
  say('wolffy','Évidemment.','reynga')
 ],after:[
  narrate('Les deux silhouettes se défont. Wolffy cherche aussitôt au-delà d’elles.'),
  say('wolffy','Elle est passée où ?!'),
  narrate('Il voudrait la poursuivre. Mais plus loin, un cri s’interrompt brutalement. Celui-là vient d’une créature de sa planète.'),
  narrate('Wolffy tourne la tête, hésite une seconde, puis repart dans la direction du cri.')
 ]},
 4:{title:'Encerclé par l’adversaire',enemies:['emillia'],before:[
  narrate('Wolffy court entre les arbres brisés. Des Démononuageux tombent ; d’autres tiennent leur position. Il reconnaît parfois un mouvement, un plumage, sous les formes que les nuages ont transformées.'),
  narrate('Les envahisseurs avancent encore. Wolffy se place sur leur chemin.'),
  say('wolffy','Reculez. Vous n’irez pas plus loin.'),
  narrate('Une enfant s’avance seule. Emillia serre son arme à deux mains. Ses yeux passent sur les crocs de Wolffy, puis reviennent se fixer sur les siens.'),
  say('emillia','Vous devez tous mourir. Pour la survie de Nébryss !'),
  say('wolffy','Ici, vous êtes chez nous ! Gloire à notre…','emillia'),
  narrate('Le mot suivant ne vient pas. Roi ? Planète ? Il ne sait pas encore. Emillia profite de cette hésitation pour frapper.'),
  narrate('Wolffy esquive de justesse. L’enfant attaque déjà une seconde fois, plus fort.'),
  say('wolffy','Tu veux vraiment faire ça ?','emillia'),
  say('emillia','Je dois le faire !')
 ],after:[
  say('emillia','Argh… T’es plus costaud que l’autre piaf !'),
  narrate('Wolffy regarde derrière elle. Il comprend d’où venait le cri.'),
  say('wolffy','Disparais !','emillia'),
  narrate('Il se jette en avant. Une ombre s’interpose et bloque ses crocs : le commandant Felk. Emillia recule derrière lui.'),
  say('felk','Misérable. Tu oses t’en prendre à mes soldats ?'),
  say('wolffy','C’est vous qui êtes venus ! Pourquoi devrions-nous nous entretuer ?!','felk'),
  say('felk','Parce que votre Énergie sera la nôtre. Et Nébryss vivra.'),
  say('wolffy','Et nous ?','felk'),
  narrate('Felk laisse échapper un ricanement. Wolffy cesse d’attendre une autre réponse.')
 ]},
 5:{title:'Le commandant des armées',enemies:['felk'],before:[
  say('felk','Prêt à mourir pour ta planète ?'),
  say('wolffy','Parle pour toi.','felk'),
  narrate('Une lumière violette glisse sur l’armure du commandant. Wolffy abaisse la tête et cherche un passage sous sa garde.'),
  say('felk','Tu ne sais même pas ce que tu défends.'),
  say('wolffy','Je sais ce que vous êtes en train de détruire.','felk'),
  narrate('Felk avance. Cette fois, Wolffy l’attend.')
 ],after:[
  narrate('Le commandant tombe. Wolffy reste campé devant lui, le souffle court, prêt à bondir au moindre mouvement.'),
  say('wolffy','Meurs…','felk'),
  narrate('Felk ne répond plus. La lumière violette quitte lentement son armure.'),
  narrate('Un bruit derrière Wolffy. Emillia s’est approchée. Elle regarde le commandant et attend, elle aussi, un mouvement qui ne vient pas.'),
  say('emillia','Commandant… ?'),
  narrate('Wolffy connaît cette attente. Il détourne les yeux une fraction de seconde.'),
  say('emillia','Enfoiré ! Je… Je vais te TUER !')
 ]},
 6:{title:'La revanche d’Emillia',enemies:['emillia','emillia'],before:[
  narrate('Emillia se dédouble. Deux silhouettes prennent position de part et d’autre de Wolffy. Même souffle précipité, même arme levée.'),
  say('wolffy','Deux visages. La même odeur.','emillia'),
  say('emillia','Tu ne peux pas nous surveiller toutes les deux.'),
  say('wolffy','Pars.','emillia'),
  say('emillia','Après ce que tu lui as fait ?!'),
  narrate('Les deux Emillia attaquent ensemble. Wolffy recule d’un pas pour les garder devant lui, puis montre les crocs.')
 ],after:[
  narrate('L’une des silhouettes disparaît. L’autre reste à genoux, incapable de relever son arme.'),
  say('emillia','Ma technique de clone… Elle n’a pas fonctionné…'),
  narrate('Wolffy entend encore sa menace. Il voit son arme bouger et frappe avant de réfléchir.'),
  narrate('Un coup de croc démoniaque met fin au combat. Lorsqu’il desserre la mâchoire, plus personne ne lui répond.'),
  narrate('Il avait reconnu sa colère. Cela ne l’a pas empêché de la tuer.'),
  say('wolffy','Je t’avais dit de partir.'),
  narrate('Il reprend sa course. Cette fois, il ne regarde pas derrière lui.')
 ]},
 7:{title:'Cimetière',enemies:['skeleton'],secondEnemies:['skeleton','skeleton'],before:[
  narrate('Les bruits de bataille s’éloignent. Wolffy débouche sur une étendue de terre ravagée. Du sang a séché entre les pierres ; aucune voix ne l’appelle.'),
  narrate('Il ralentit enfin. Ici, même son souffle paraît trop fort.'),
  say('wolffy','Hein ? C’est quoi, cette sensation…'),
  narrate('Quelque chose gratte sous ses pattes. Un squelette de Nébryss s’arrache au sol, tenant encore son arme.'),
  say('skeleton','Kikikiki…'),
  say('wolffy','La bataille est finie pour toi. Reste à terre.','skeleton'),
  narrate('Le squelette relève son arme. Wolffy n’entend ni souffle ni battement de cœur.')
 ],between:[
  narrate('Wolffy a dû abattre le squelette une seconde fois pour que ses os restent immobiles. Il les fixe encore, les muscles tendus.'),
  say('wolffy','Ne te relève pas.'),
  narrate('La terre remue derrière lui. Deux autres squelettes sortent du sol.'),
  say('wolffy','Eux, ils ont le droit de revenir…'),
  narrate('Le souvenir d’un museau froid lui traverse l’esprit. Wolffy le repousse et se retourne vers les deux silhouettes.'),
  narrate('Cimetière II — Il reprend son souffle. Puis les armes se lèvent de nouveau.')
 ],after:[
  narrate('Wolffy attend que les os cessent de bouger. Il a appris à ne plus croire la première chute.'),
  narrate('Il voudrait se coucher quelques instants. Mais, entre les pierres, un nouveau grattement se fait entendre.'),
  say('wolffy','Combien vous êtes encore… ?'),
  narrate('Il avance avant que ses pattes décident de ne plus le porter.')
 ]},
 8:{title:'Le pouvoir de l’Épée',enemies:['skeleton','reynga'],before:[
  narrate('Les affrontements se succèdent. Wolffy ne compte plus les silhouettes tombées, ni celles qui se sont relevées. Sa patte avant finit par céder.'),
  narrate('Un squelette approche, accompagné d’un Reynga. Wolffy essaie de se redresser ; son corps tremble sans lui obéir.'),
  say('sword','Bats-toi. Je te l’ordonne.'),
  narrate('La voix ne vient pas du champ de bataille. Elle traverse les nuages qui vivent en lui. La même présence que dans la grotte, intacte, immense.'),
  say('wolffy','Je… ne peux plus.','sword'),
  narrate('Les nuages se resserrent autour de ses membres. La puissance de leur source le traverse et lui rend ses forces. Wolffy se relève d’un seul mouvement.'),
  say('wolffy','Pourquoi moi ?','sword'),
  say('sword','Ils avancent encore.'),
  narrate('Wolffy regarde les deux envahisseurs. Derrière lui s’étendent les terres où il courait avec sa mère. Il se replace entre elles et leurs armes.'),
  say('wolffy','L’Épée… Je me battrai pour vous. Mais ils ne prendront pas ce qui reste ici.','sword')
 ],after:[
  narrate('Les deux adversaires tombent. Wolffy attend un nouveau vertige, mais ses pattes tiennent bon. Les nuages poursuivent leur course autour de lui.'),
  say('wolffy','Selkiel. L’Épée. Démono…'),
  narrate('Ces noms étaient ceux d’un monde qu’il avait découvert en se réveillant. À présent, il se surprend à les prononcer comme ceux de son camp.'),
  narrate('Il n’a pas pardonné. Il sait seulement de quel côté il se tient quand les armes se lèvent.'),
  narrate('Une présence plus forte arrive avec le vent. Wolffy suit sa trace : elle mène au portail.')
 ]},
 9:{title:'Ushio, le faucheur de Nébryss',enemies:['ushio'],before:[
  narrate('Le portail déforme l’air au milieu des ruines. C’est par cette ouverture que Nébryss envoie ses sbires. Tant qu’elle restera ouverte, d’autres viendront.'),
  narrate('Un humain en garde l’accès : Ushio, sous l’emprise du Navigateur. Sa faux laisse une lueur violette derrière chacun de ses mouvements.'),
  say('ushio','Piètre créature. Tu oses souiller le domaine de notre maître ?'),
  say('wolffy','Le domaine de ton maître ? T’es chez nous, ici !','ushio'),
  say('ushio','Plus maintenant.'),
  narrate('Wolffy regarde l’ouverture derrière lui, puis la portée de la faux. Il lui faudra passer tout près.'),
  say('wolffy','Alors viens me chasser.','ushio')
 ],after:[
  say('ushio','J… Je t’ai sous-estimé, ouais…'),
  say('wolffy','Je vais anéantir ce portail. Vous allez rentrer chez vous !','ushio'),
  narrate('Il n’a pas le temps d’avancer. Une pression écrasante lui courbe l’échine. Ses quatre pattes s’enfoncent dans la terre.'),
  narrate('Rivernia se tient devant le portail. Wolffy reconnaît la voix avant même qu’elle parle.'),
  say('rivernia','Tu as fait beaucoup de bruit pour arriver jusqu’ici.'),
  say('wolffy','Tu ne disparais plus ?','rivernia'),
  narrate('Elle pose la main sur son arme. Cette fois, aucun Reynga ne vient prendre sa place.'),
  say('rivernia','Bats-toi.')
 ]},
 10:{title:'Rivernia',boss:true,enemies:['rivernia'],before:[
  narrate('Wolffy force ses pattes à se tendre. Rivernia lui laisse le temps de se relever. Elle ne rit plus.'),
  say('rivernia','Tu aurais dû rester avec les autres, dans la forêt.'),
  say('wolffy','Il ne reste plus grand monde, dans la forêt.','rivernia'),
  narrate('Les nuages démoniaques montent le long de son dos. Wolffy sent la rage reprendre toute la place. Cette fois, il ne cherche pas à la retenir.'),
  say('rivernia','Viens, alors.'),
  say('wolffy','Je suis là.','rivernia')
 ],after:[
  narrate('Rivernia pose un genou à terre. Wolffy ne lui laisse ni le temps de parler, ni celui de disparaître. Il se jette sur elle et la dévore sans pitié.'),
  narrate('Quand il relève la tête, le portail est toujours ouvert. Des voix lui parviennent de l’autre côté.'),
  say('wolffy','C’est terminé. Vous ne passerez plus.'),
  narrate('Il s’approche, cherchant où mordre pour déchirer cette lumière. Ses crocs se referment sur l’air.'),
  narrate('Une main surgit du passage et le saisit. Wolffy plante ses griffes dans la terre, mais la traction l’arrache au sol.'),
  say('wolffy','Lâche-moi !'),
  narrate('Démono disparaît derrière lui. Le portail l’emporte avant qu’il ait pu le refermer.'),
  narrate('Fin du chapitre 1 — La bataille. À suivre : En plein cœur de Nébryss.')
 ]}
};
export function storyLines(stage,phase,key='wolffy',chapter=1){const m=storyRoute(key,chapter)?.missions[stage];if(!m)return [];return phase==='recap'?[...m.before,...(m.between??[]),...(m.interlude??[]),...m.after]:m[phase]??[];}

export function storyRoute(key,chapter=1){if(chapter===2&&key==='stibili')return {...STIBILI_CHAPTER2,missions:STIBILI_CHAPTER2_MISSIONS};if(chapter!==1)return null;return key==='forgeur'?{...FORGEUR_CHAPTER,missions:FORGEUR_MISSIONS}:key==='nahat'?{...NAHAT_CHAPTER,missions:NAHAT_MISSIONS}:key==='drunn'?{...DRUNN_CHAPTER,missions:DRUNN_MISSIONS}:key==='wolffy'?{...WOLFFY_CHAPTER,nextTitle:'En plein cœur de Nébryss',missions:WOLFFY_MISSIONS}:key==='stibili'?{...STIBILI_CHAPTER,missions:STIBILI_MISSIONS}:key==='kaerune'?{...KAERUNE_CHAPTER,missions:KAERUNE_MISSIONS}:null;}
