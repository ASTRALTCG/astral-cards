// Ænoria: a complete, single-chapter route. Arena rounds are independent missions.
const n=text=>({speaker:null,text});
const say=(speaker,text,other='drunn')=>({speaker,text,other});
export const DRUNN_CAST={
 drunn:{name:'Drunn',art:'drunn',kind:'beast'},
 dompteur:{name:'Le Dompteur',art:'drunn-dompteur',kind:'human'},
 kairos:{name:'Kaïros',art:'drunn-kairos',kind:'beast'},
 vairon:{name:'Vairon',art:'drunn-vairon',kind:'beast'},
 vargrom:{name:'Vargrom',art:'drunn-vargrom',kind:'beast'},
 osculus:{name:'Osculus des sables',art:'drunn-osculus',kind:'beast'},
 rakesh:{name:'Ra’Kesh',art:'drunn-rakesh',kind:'beast'},
 trokille:{name:'Trokille',art:'drunn-trokille',kind:'beast'},
 tykytil:{name:'Tykytil',art:'drunn-tykytil',kind:'beast'},
 arenaDrannex:{name:'Drannex',art:'drunn-drannex',kind:'beast'},
 mystrial:{name:'Mystrial',art:'drunn-mystrial',kind:'beast'}
};
export const DRUNN_CHAPTER={title:'Chapitre unique — Le meilleur pisteur… ce sera moi !',singleChapter:true,description:'Sur Ænoria, Drunn doit réunir quatre clans avant qu’une guerre venue des étoiles ne les trouve divisés.'};
export const DRUNN_MISSIONS={
 1:{title:'Des yeux fidèles',level:1,background:'aenoria-ice',enemies:['vargrom'],before:[
 n('Ænoria est une planète de forêts, de glaces, de sables et de flammes. Quatre clans se partagent ses terres. Au-dessus de leurs querelles veille leur Navigateur : le Dompteur.'),
 n('Drunn était autrefois l’allié de Valgheim, gardien de la forêt de l’Ouest. Mais le Dompteur avait besoin de bras solides et d’yeux fidèles à ses convictions.'),
 n('Écarté de la forêt, Drunn est devenu secrètement son bras droit. Il n’en a jamais voulu le titre. Ce matin, une nouvelle mission l’attend.'),
 say('dompteur','Tu visiteras les quatre clans. Apaise leurs tensions avant qu’elles ne déchirent Ænoria.'),
 say('drunn','Par lequel dois-je commencer ?','dompteur'),
 say('dompteur','Au nord. Kaïros dirige le clan des Glaces. Il est en froid avec son frère Vairon, mais demeure le plus lucide des deux.'),
 say('dompteur','Agis vite. Une guerre de planètes peut éclater du jour au lendemain. Lorsque viendra une bataille commune, nous devrons tous nous soutenir.'),
 n('Drunn s’agenouille. Cette fois, il ne s’agit pas de suivre une piste : c’est l’avenir de la planète qui repose sur sa parole.'),
 say('drunn','J’exécuterai votre mission. Au péril de ma vie.','dompteur'),
 n('Après plusieurs jours de marche vers le nord, l’air se glace. Chaque respiration lui brûle la poitrine. Une silhouette immense garde l’entrée des terres gelées : Vargrom.'),
 say('vargrom','Que vient faire ici un pitoyable soldat de la forêt ?'),
 say('drunn','Je souhaite m’entretenir avec Kaïros. Je viens pour…','vargrom'),
 n('Vargrom avance. Drunn n’a pas le temps de terminer sa phrase : le gardien charge.')
 ],after:[
 n('Drunn abaisse son arc. Vargrom se redresse, fier, impassible, toujours au milieu du passage.'),
 say('vargrom','Tu ne passeras pas.'),
 say('drunn','Écoute-moi enfin ! Je ne suis pas venu pour…','vargrom'),
 n('Un bruit sourd interrompt Drunn. Puis un silence pesant s’étend sur la neige. Kaïros est là.'),
 say('kairos','Un soldat de la forêt, sur mes terres ? Que veux-tu ?'),
 say('drunn','Il faut que les querelles avec votre frère cessent. Ænoria doit rester unie.','kairos'),
 say('kairos','Le problème n’est pas ici. Cherche-le dans les Terres des flammes.'),
 say('drunn','Alors je parlerai à Vairon. Merci de m’avoir écouté.','kairos'),
 say('kairos','Inutile. Tu mourras avant d’avoir obtenu quoi que ce soit. Va plutôt au sud, vers les Sables Éternels.'),
 say('drunn','Les Sables ? En quoi cela changerait-il la situation ?','kairos')
 ]},
 2:{title:'La grande mer de sable',level:4,background:'aenoria-sands',enemies:['osculus'],before:[
 say('kairos','S’il existe quelqu’un que Vairon considère comme son égal, c’est Ra’Kesh.'),
 say('drunn','Ra’Kesh est un conquérant. Il veut des terres, pas des promesses. Je devrai le combattre pour le raisonner.','kairos'),
 say('kairos','Tu ne le vaincras jamais en combat singulier. Trouve donc une autre solution.'),
 n('Kaïros laisse échapper un rire bref. Drunn reprend la route. La même question l’accompagne à chaque pas : comment convaincre celui qu’on ne peut pas vaincre ?'),
 n('La neige cède à la poussière, puis aux dunes. Les Sables Éternels s’étendent au-delà de l’horizon. Drunn avance dans une mer silencieuse.'),
 n('Le sol ondule près de ses bottes. Un Osculus des sables jaillit, ses pinces levées. Drunn bande son arc avant que le sable ne l’aveugle.')
 ],after:[n('L’Osculus recule, puis s’enfouit sous la dune. Drunn essuie le sable de ses yeux et poursuit sa marche. Devant lui, le désert paraît sans fin.')]
 },
 3:{title:'La parole du Dompteur',level:4,background:'aenoria-sands',enemies:['rakesh'],scriptedDefeat:true,boss:true,before:[
 n('Aux portes de la cité des Sables, Ra’Kesh attend déjà. Un éclaireur l’a averti de l’arrivée du voyageur.'),
 say('rakesh','Qu’est-ce qu’un misérable cloporte vient faire devant ma cité ?'),
 n('Il pose un pied au sol. La pierre tremble. Drunn lève une main, laissant son arc abaissé.'),
 say('drunn','Je viens parler. Nous avons tous intérêt à…','rakesh'),
 n('Ra’Kesh rugit. Le coup part avant que Drunn puisse se mettre en garde.')
 ],after:[
 n('Le monde s’éteint. Plusieurs jours passent dans le silence du coma.'),
 n('Drunn ouvre les yeux dans une cellule. Ses mains et ses pieds sont liés. Il tire sur les chaînes, mais elles ne cèdent pas.'),
 say('trokille','Ne bouge pas. Mon chef arrive. Il veut encore en découdre avec toi.'),
 n('Drunn demeure silencieux. Quelques minutes plus tard, Ra’Kesh entre. Même l’air de la cellule semble lui faire place.'),
 say('rakesh','Tu préfères mourir maintenant, ou plus tard ?'),
 say('drunn','Je comprends votre colère. Mais une planète arrive pour conquérir Ænoria.','rakesh'),
 say('rakesh','Qui t’a donné ces informations ?'),
 say('drunn','Le Dompteur.','rakesh'),
 n('Ra’Kesh recule d’un pas. Personne ne prononcerait ce nom avec une telle assurance pour soutenir un mensonge.'),
 say('rakesh','Alors, qu’attends-tu de moi ?'),
 say('drunn','La paix. Et votre aide pour convaincre Vairon de cesser de vouloir tuer Kaïros.','rakesh'),
 say('rakesh','Leurs querelles m’indiffèrent. Je veux étendre mon territoire.'),
 n('Drunn regarde les chaînes, puis relève la tête. La solution que Kaïros lui demandait de trouver vient enfin de prendre forme.'),
 say('drunn','Si nous unissons les quatre clans, nous vaincrons les envahisseurs. La planète attaquante sera alors à vous. Toute une planète.','rakesh'),
 say('rakesh','Une planète… pour moi seul ?'),
 n('La colère laisse place à une joie presque enfantine. Ra’Kesh bondit, fait libérer Drunn et lui tend un talisman.'),
 say('rakesh','Un gage de ma reconnaissance. Montre-le à Vairon. Il comprendra.'),
 n('Drunn reçoit le Talisman des sables : un accessoire qui lui confère 10 points de chance.')
 ]},
 4:{title:'Rien ne meurt, tout refleurit',level:6,background:'aenoria-forest',enemies:['tykytil'],before:[
 n('Encore étourdi par les événements, Drunn quitte les Sables Éternels. Il a gagné un allié en promettant une planète qui ne lui appartient pas. Il espère ne pas avoir condamné Ænoria par cette promesse.'),
 n('Sur la route des Terres des flammes, une présence familière l’arrête : Tykytil, un ragondin de la Forêt. Drunn s’accroupit et tend la main pour le caresser.'),
 say('tykytil','Traître.'),
 n('La main de Drunn reste suspendue. Tykytil recule.'),
 say('tykytil','Lâche.'),
 say('drunn','Tu crois que j’ai abandonné la Forêt. Je voudrais t’expliquer, mais je n’ai pas le temps…','tykytil'),
 n('Drunn se détourne. Un bond rapide derrière lui, un cri : Tykytil lui saute dessus. Ce n’est pas une menace. Il veut le tuer.')
 ],after:[
 n('Le combat s’achève dans le silence. Drunn reste longtemps agenouillé près de Tykytil, puis creuse une tombe au pied d’un arbre.'),
 say('drunn','Pardonne-moi. Je ne savais pas comment te faire comprendre.','tykytil'),
 n('Il recouvre le corps de terre. Tykytil renaîtra parmi les arbres et les ronces : dans la Forêt de Valgheim, rien ne meurt. Tout refleurit.'),
 n('Drunn reprend son arc. À l’horizon, les Terres des flammes rougeoient.')
 ]},
 5:{title:'L’arène des flammes · Première épreuve',level:8,background:'aenoria-arena',enemies:['arenaSlime','arenaCorkbeau'],before:[
 n('Dès son arrivée, un faucon archer se pose sur sa route. Mystrial, serviteur de Vairon et combattant réputé, observe le voyageur sans un mot.'),
 say('drunn','Je dois rencontrer votre chef. Ra’Kesh m’a remis ceci.','mystrial'),
 n('Il présente le talisman. Mystrial ne tend pas la main.'),
 say('mystrial','Pour parler à Vairon, il faut être victorieux.'),
 n('Drunn saisit son arc. Mystrial secoue la tête.'),
 say('mystrial','Tu ne comprends pas. Trois combats, dans l’arène des flammes. Trois victoires. Alors seulement, tu seras entendu.'),
 say('drunn','Très bien. Qu’on en finisse.','mystrial'),
 n('Drunn descend dans l’arène. Le premier adversaire n’est pas un champion, mais deux créatures capturées : un Slime de combat et un Corkbeau.')
 ],after:[n('Les deux créatures s’effondrent. Drunn cherche son souffle, mais déjà une autre grille se lève. Dans l’ombre, deux gueules grondent à l’unisson.')]
 },
 6:{title:'L’arène des flammes · Les deux gueules',level:10,background:'aenoria-arena',enemies:['arenaDrannex'],boss:true,before:[
 n('Drannex entre dans l’arène. Ses deux têtes suivent Drunn, chacune guettant une ouverture différente. Un premier coup peut en cacher un second.'),
 say('drunn','Deux gueules… Très bien. Je garderai les deux en vue.','arenaDrannex'),
 n('Drunn recule d’un pas et encoche une flèche. La deuxième épreuve commence.')
 ],after:[n('Drannex cède enfin. Drunn avance lentement, inspectant les gradins. Une ombre passe au-dessus de lui.'),n('Depuis les cieux, Mystrial descend et se pose dans l’arène. Le dernier adversaire est arrivé.')]
 },
 7:{title:'L’arène des flammes · Le dernier brasier',level:11,background:'aenoria-arena',enemies:['mystrial'],boss:true,before:[
 say('mystrial','Je serai le dernier pilier entre toi et notre chef.'),
 say('drunn','Alors je passerai aussi celui-ci.','mystrial'),
 n('La chaleur monte. Les vêtements de Drunn prennent feu ; les flammes de l’arène ne s’éteindront pas pendant cette épreuve.'),
 say('mystrial','Une première flamme. Un instant pour rassembler mon énergie. Puis un brasier auquel peu survivent.'),
 n('Drunn serre son arc. Il peut vaincre Mystrial — ou tenir jusqu’à la fin de son troisième tour. Il faudra encore résister à la brûlure qui suivra.')
 ],after:[
 n('Un grondement interrompt l’arène. Vairon est là. D’un geste, il fait reculer Mystrial.'),
 say('vairon','Pourquoi es-tu venu ?'),
 n('Drunn, haletant, présente le Talisman des sables.'),
 say('vairon','Un être de la Forêt… qui a gagné le respect de Ra’Kesh ?'),
 n('Vairon serre le poing. Des roches volcaniques éclatent autour de lui. Puis tout s’apaise.'),
 say('vairon','Parle. Que souhaites-tu ?'),
 say('drunn','Faites la paix avec votre frère. Une menace approche d’Ænoria. Ra’Kesh accepte de nous soutenir, mais nous devons être unis.','vairon'),
 n('Vairon réfléchit. Les minutes passent, seulement troublées par le craquement des braises.'),
 say('vairon','J’accepte. Mais Kaïros répondra de ses actes. Les accusations concernant l’événement d’il y a un an ne disparaîtront pas.'),
 n('Drunn ignore de quel événement il parle. Il ne pose pas la question. Pour la première fois depuis son départ, il ose se sentir soulagé.'),
 n('Il quitte les Terres des flammes et rejoint le Dompteur. Sa mission n’a pas effacé les rancœurs, mais les clans acceptent enfin de regarder dans la même direction.'),
 say('dompteur','Tu as obtenu ce que la force seule n’aurait pas arraché. Je te nomme chef d’assaut, Drunn.'),
 say('drunn','Je serai prêt lorsque vous aurez besoin de moi.','dompteur'),
 n('La mission de Drunn est réussie. Mais pour combien de temps ?'),
 n('Fin — Le meilleur pisteur… ce sera moi !')
 ]}
};
export const DRUNN_PROFILES={
 vargrom:{hp:222,dmg:10},osculus:{hp:240,dmg:23},rakesh:{hp:9999,dmg:9999},tykytil:{hp:250,dmg:21},
 arenaSlime:{hp:190,dmg:24},arenaCorkbeau:{hp:165,dmg:26},arenaDrannex:{hp:460,dmg:32},mystrial:{hp:950,dmg:96}
};
export function drunnEnemies(stage){const m=DRUNN_MISSIONS[stage];return m.enemies.map((kind,i)=>{const p=DRUNN_PROFILES[kind],c=DRUNN_CAST[kind]??(kind==='arenaSlime'?{name:'Slime de combat',art:'slime'}:{name:'Corkbeau',art:'corkbeau'});return {id:'enemy'+i,type:kind==='arenaSlime'?'slime':kind==='arenaCorkbeau'?'corkbeau':'dog',storyKind:kind,name:c.name,art:c.art,level:m.level,hp:p.hp,maxHp:p.hp,dmg:p.dmg,baseDmg:p.dmg,speed:kind==='tykytil'?28:0,boss:!!m.boss,powerUsed:false,powerBonus:0,burning:false};});}
export function drunnIntent(b){if(b.storyKey!=='drunn')return null;const e=b.enemies.find(e=>e.hp>0);if(!e)return null;if(e.storyKind==='mystrial')return {title:['Boule de feu · 120 %','Concentration · aucune attaque','Énorme giga boule de feu · 250 %'][Math.min(2,b.round-1)],text:'Survivez au tour 3 et à sa brûlure, ou vainquez Mystrial avant. Brûlure permanente : 5 % des PV max par tour.'};if(e.storyKind==='tykytil')return {title:'Protection de la forêt',text:b.round%2?'Ce tour : attaque à 110 %. Aucun cumul.':'Ce tour : récupère 10 % de ses PV max, puis attaque normalement.'};return null;}
