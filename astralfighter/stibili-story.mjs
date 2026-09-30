const n=text=>({speaker:null,text});
const d=(speaker,text,other='stibili',effect='')=>({speaker,text,other,effect});
export const STIBILI_CAST={
 stibili:{name:'Stibili',art:'stibili',kind:'mage'},
 slime:{name:'Slime de combat',art:'slime',kind:'beast'},
 mite:{name:'La Mite du Néant',art:'mite-neant',kind:'beast'},
 kappiouteau:{name:'Kappiouteau',art:'kappiouteau',kind:'human'},
 maella:{name:'Maëlla',art:'maella',kind:'human'},
 maella2:{name:'Maëlla',art:'maella-forme-2',kind:'human'},
 ozvex:{name:'Ozvex',art:'ozvex',kind:'beast'}
};
export const STIBILI_CHAPTER={title:'Chapitre 1 — Naissance d’un mage',description:'Né d’une étoile, Stibili traverse les mondes à la recherche de nouveaux sorts. Mais certaines découvertes attirent des regards qu’il vaudrait mieux éviter.',nextTitle:'Un mage dans le Néant'};
export const STIBILI_MISSIONS={
 1:{title:'Une étoile dans l’herbe',enemies:['slime'],background:'meadow',before:[
 n('Au cœur d’une étoile, quelque chose ouvre les yeux. Ce n’est ni un Navigateur ni une créature façonnée par l’un d’eux. C’est une anomalie.'),
 n('Une étincelle s’arrache à l’astre, traverse le ciel d’une planète inconnue et s’écrase dans une prairie. Au fond du cratère, un petit mage se relève.'),
 d('stibili','Deux mains. Une tête. Une chute manifestement mal calculée… Bon. Je suis vivant.'),
 n('Des masses gélatineuses bondissent entre les herbes. L’une d’elles se rapproche, puis se jette sur lui.'),
 d('stibili','Reste où tu es. Je ne sais pas encore ce que tu es… et je ne tiens pas à l’apprendre de l’intérieur.','slime'),
 n('Instinctivement, Stibili trace une spirale. L’air s’enroule autour de ses doigts. Il peut lui donner une forme. Il peut créer un sort.'),
 d('stibili','Une idée, un mouvement… et le vent obéit. Voilà qui mérite une expérience.','slime')
 ],after:[d('stibili','La forme se défait, mais il reste quelque chose. Une trace. Une façon de faire circuler l’énergie.'),n('Stibili retient chaque détail. Il ne connaît ni le nom de cette planète ni celui de la force qui l’habite. Pourtant, pour la première fois, il sait ce qu’il veut : des sorts. Tous ceux qu’il pourra comprendre.')]},
 2:{title:'Le laboratoire des Slimes',enemies:['slime','slime'],background:'meadow',before:[
 n('Les saisons passent. Stibili grandit sur cette planète peuplée de Slimes. Il observe, affronte, recommence. Les traces laissées par ses adversaires deviennent des formules qu’il conserve avec soin.'),
 d('stibili','Même espèce, même bond… mais pas la même circulation d’énergie. Rien ne doit être tenu pour acquis.','slime'),
 n('Deux Slimes approchent. Le mage ferme son carnet et l’éloigne des éclaboussures.'),d('stibili','Très bien. Une dernière vérification. Et personne ne touche à mes notes.','slime')
 ],after:[
 n('À force d’étudier ces traces, Stibili distingue une énergie qui traverse les êtres et les mondes : l’Énergie Astrale. Quelque part, elle semble manquer. Comme si on l’aspirait.'),
 d('stibili','Ce courant vient de plus loin que le ciel. Si je le plie sans le rompre… je peux fabriquer un passage.'),
 n('Il dessine un tube spatial. La prairie se déforme autour d’une ouverture étroite.'),d('stibili','Je reviendrai peut-être. Quand vous aurez inventé autre chose que bondir.')
 ]},
 3:{title:'Ce qui rôde entre les mondes',enemies:['mite'],background:'space',before:[
 n('Le tube spatial se referme derrière Stibili. Les étoiles s’étirent en lignes pâles. Puis une ombre ailée se détache du vide.'),d('stibili','Une créature ici ? Impossible… Non. Mauvaise habitude : rien n’est impossible avant d’avoir été vérifié.','mite'),
 n('La Mite du Néant gratte la paroi du passage. À chaque battement, le sort tremble.'),d('stibili','Tu ne t’intéresses pas à moi. Tu regardes le passage. C’est presque plus inquiétant.','mite')
 ],after:[n('La Mite s’éloigne. Stibili resserre aussitôt son tube spatial, sans attendre de savoir si elle compte revenir.'),d('stibili','À noter : les raccourcis ont des habitants. Éviter de leur laisser le temps de réfléchir.'),n('Une traînée obscure reste suspendue dans le passage. Stibili en reproduit la courbure : un minuscule trou noir se forme entre ses doigts.'),d('stibili','Attirer. Enfermer. Puis relâcher… Juste assez longtemps pour garder une longueur d’avance. Je vais appeler cela Attraction.'),n('Nouvelle compétence obtenue : Attraction. Stibili peut emprisonner un adversaire dans le Néant et lui faire perdre sa prochaine action.'),n('Le passage débouche sur le pont d’un bateau, au large d’une planète dont il ignore le nom. Une odeur de sel remplace celle des étoiles.')]},
 4:{title:'Le pirate et le collectionneur',enemies:['kappiouteau'],background:'pirate',potionReward:true,before:[
 d('kappiouteau','Doucement, petit voyageur. Tu es sur mes terres… enfin, sur mon pont. Repars gentiment, et nous éviterons les ennuis.'),
 d('stibili','Tu tiens un sabre en flammes et tu me demandes de te croire sur parole ?','kappiouteau'),
 d('kappiouteau','Je pourrais aussi te demander pourquoi tu surgis au milieu de mon bateau.'),d('stibili','Je cherche des sorts. Le feu que tu contrôles m’intéresse.','kappiouteau'),
 d('kappiouteau','Alors il va falloir tenir debout assez longtemps pour le regarder !'),d('stibili','Une démonstration hostile. Ce sont souvent les plus précises.','kappiouteau')
 ],after:[
 d('kappiouteau','Ça suffit ! Je m’avoue vaincu. Je ne suis pas de taille contre toutes tes magies bizarres.'),d('stibili','Tu abandonnes vite. Où est le piège ?','kappiouteau'),
 d('kappiouteau','Dans ta tête, apparemment. Tiens, une potion de soin. Tu l’as gagnée.'),n('Kappiouteau tend une fiole. Une Potion de soin est ajoutée au sac de Stibili : elle rend 20 % des PV max en combat, sans consommer son action.'),
 d('stibili','Je vérifierai son contenu. Mais… merci.','kappiouteau'),d('kappiouteau','Si tu poursuis ta chasse aux sorts, évite les Navigateurs. Ils lèvent des armées et se battent pour l’Énergie Astrale. Depuis qu’elle disparaît, personne ne sait s’arrêter.'),
 d('stibili','Quelqu’un aspire l’énergie, et eux se disputent ce qui reste… Charmante méthode.','kappiouteau'),n('Stibili retient la mise en garde. Puis il ouvre un nouveau passage, vers une planète de glace.')
 ]},
 5:{title:'La passagère clandestine',enemies:['mite'],background:'space',before:[
 n('Le tube spatial s’allonge entre deux mondes. Une silhouette familière remonte le courant.'),d('stibili','Encore toi. Ce n’est donc pas un territoire. Tu suis quelque chose.','mite'),
 n('La Mite du Néant frappe la paroi, exactement là où le passage brille le plus.'),d('stibili','Je poserai mes questions après. Pour l’instant, éloigne-toi de mon sort.','mite')
 ],after:[n('Stibili quitte le tube. Un vent glacé le frappe de plein fouet.'),d('stibili','Il fait drôlement froid. J’aurais dû inventer un manteau avant le voyage interplanétaire.'),n('Il marche de jour en jour à la recherche d’un être vivant. Sous la neige, les vestiges d’un monde habité apparaissent peu à peu.')]},
 6:{title:'La gardienne du froid',enemies:['maella'],background:'snow',before:[
 n('Au milieu des ruines gelées, une silhouette l’observe. Stibili s’arrête avant qu’elle lui en donne l’ordre.'),d('maella','N’avance plus. Cette planète est inhabitable depuis le passage d’un Navigateur ennemi. Il a tout congelé.'),
 d('stibili','Et tu es restée. Par choix… ou parce que tu ne pouvais pas partir ?','maella'),d('maella','Tu poses beaucoup de questions pour quelqu’un dont j’ignore le nom.'),
 d('stibili','Stibili. Je peux générer des boules de feu. Si tu veux de l’aide…','maella'),d('maella','Un inconnu qui tombe du ciel et propose ses pouvoirs. Nous avons déjà payé pour faire confiance.'),
 d('stibili','Je comprends. Je ne te fais pas confiance non plus.','maella'),d('maella','Alors prouve ta valeur au combat. Je m’appelle Maëlla. Et ne compte pas sur tes flammes pour me brûler.')
 ],after:[d('maella','Tu es exceptionnellement fort… Cette magie ne ressemble à rien de ce que je connais.'),d('stibili','Elle est à moi. Je tiens à ce détail.','maella'),n('Maëlla porte soudain les mains à sa tête. Une voix résonne dans son esprit : « Défends ta planète. Ce mage est extrêmement dangereux. »'),d('maella','Non… Attends… Je dois…'),d('stibili','Qui te parle ? Maëlla, regarde-moi.','maella'),n('Une armure d’acier enveloppe Maëlla. Son regard se durcit. Stibili reconnaît la peur ; ce qui la commande lui reste inconnu.')]
 },
 7:{title:'L’ordre sous l’armure',enemies:['maella2'],background:'snow',escape:true,boss:true,before:[
 d('maella2','Tu ne menaceras pas cette planète.'),d('stibili','Je viens de proposer de l’aider. Cette voix a un curieux sens des priorités.','maella2'),
 n('Maëlla avance. L’acier couvre désormais sa silhouette, mais ses gestes et sa résistance aux brûlures restent les mêmes.'),d('stibili','Je n’ai pas besoin de te vaincre. Seulement d’une ouverture pour repartir.','maella2'),n('Objectif : épuisez la barre de combat de Maëlla pour ouvrir une voie de fuite. Ce succès ne signifie pas qu’elle est vaincue dans le récit.')
 ],after:[n('Le dernier sort repousse Maëlla de quelques pas. Elle se redresse déjà. Stibili n’a pas réussi à la vaincre ; il a seulement gagné les secondes dont il avait besoin.'),d('stibili','Tu pourras me détester quand cette voix te laissera choisir.','maella2'),n('Épuisé, il ouvre son portail voyageur et s’y engouffre avant que Maëlla puisse l’atteindre.')]
 },
 8:{title:'L’appétit du Néant',enemies:['mite'],background:'space',before:[
 n('Le tube spatial vacille. Stibili lutte pour maintenir sa forme. La Mite du Néant revient aussitôt.'),d('stibili','Trois voyages. Trois apparitions. Et toujours près des fissures…','mite'),
 n('Il distingue enfin une énergie étrangère sur les bords de son sort. Pour traverser l’espace, le tube effleure le Néant.'),d('stibili','Ce n’est pas l’Énergie Astrale qui t’attire. C’est celle du Néant que mon passage laisse filtrer. Je trace une piste.','mite'),d('stibili','Très instructif. Très mauvais moment.','mite')
 ],after:[n('Alors que Stibili repousse la Mite, le tube spatial s’arrête brusquement. Ses réserves, épuisées par Maëlla puis par ce nouveau combat, ne suffisent plus.'),d('stibili','Non. Tiens encore une seconde… Une seule !'),n('Le passage se déchire. Stibili chute dans l’espace, emporté vers une planète montagneuse : Dyseria.')]
 },
 9:{title:'Ozvex, les ailes de Dyseria',enemies:['ozvex'],background:'mountain',boss:true,before:[
 n('Dyseria. Autrefois, faucons et dragons s’y livraient une guerre sans fin. Leur union a finalement donné naissance à une nouvelle espèce : les Faucons-Dragons.'),
 n('Stibili n’en sait encore rien. Réfugié dans une grotte, il passe plusieurs jours à récupérer son énergie. Il vérifie ses formules, puis les vérifie encore.'),d('stibili','Le portail consomme trop. Et le Néant répond. Je dois comprendre avant le prochain essai.'),
 n('Une ombre immense bouche l’entrée. Grand et majestueux, Ozvex déploie ses ailes au-dessus de la roche.'),d('ozvex','Que cet être disparaisse de nos terres !'),d('stibili','Nous sommes parfaitement d’accord sur mon départ. Laisse-moi simplement…','ozvex'),
 n('Un battement d’ailes coupe sa retraite. Le combat est imminent.'),d('stibili','Évidemment. Ici aussi, les négociations commencent par les griffes.','ozvex')
 ],after:[d('ozvex','À moi ! Renforts ! Ne laissez pas le mage s’échapper !'),n('Blessé, Ozvex appelle les siens. Stibili recule, cherchant l’endroit où ouvrir un dernier passage.'),d('stibili','Pas assez d’énergie. Pas assez de temps…'),n('Un trou dimensionnel s’ouvre sous ses pieds. Le mage s’immobilise une fraction de seconde : ce sort n’est pas le sien.'),d('stibili','Qui a fait ça ?!'),n('L’ouverture l’emporte avant qu’il puisse répondre. Quelque part, dans l’inconnu, quelqu’un — ou quelque chose — l’attend peut-être.'),n('Fin du chapitre 1 — Naissance d’un mage. À suivre : Un mage dans le Néant.')]
 }
};
