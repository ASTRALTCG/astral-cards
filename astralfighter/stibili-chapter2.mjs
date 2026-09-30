const n=(text,extra={})=>({speaker:null,text,...extra});
const d=(speaker,text,other='stibili',extra={})=>({speaker,text,other,...extra});
export const STIBILI_VOID_CAST={
 voidbeing:{name:'L’Être du Néant',art:'etre-neant',kind:'beast'},
 voidlarva:{name:'Larve du Néant',art:'larve-neant',kind:'beast'},
 yula:{name:'Yula',art:'yula',kind:'human'},
 ozvek:{name:'Ozvek',art:'ozvex',kind:'beast'}
};
export const STIBILI_CHAPTER2={title:'Chapitre 2 — Un mage dans le Néant',description:'Privé de sa magie, Stibili découvre un lieu qui semble le reconnaître. Une rencontre y changera bien plus que son apparence.',nextTitle:'Extinction d’une planète à lui seul'};
export const STIBILI_CHAPTER2_MISSIONS={
 1:{title:'Intrusion',enemies:['voidbeing'],background:'void',sealed:true,before:[
  n('Stibili tombe. Dans quelque chose. Quelque part. Le passage ouvert au-dessus de Dyzeria s’est refermé, emportant avec lui la dernière lumière.'),
  n('Le choc lui coupe le souffle. Sous ses mains, un sol froid et lugubre s’étend dans une obscurité sans horizon.'),
  d('stibili','Où… suis-je ? Je ne ressens plus l’énergie d’Ozvek. Rien. Pas même une trace.'),
  n('Il avance à tâtons. Une silhouette se détache soudain des ténèbres. Elle était peut-être là depuis le début.'),
  d('stibili','Vous ! Quel est cet endroit ? Comment est-ce que je peux en sortir ?','voidbeing'),
  d('voidbeing','…'),
  n('Stibili lève la main. Une formule familière se dessine dans son esprit : une Boule de feu. Mais au bout de ses doigts, rien ne vient.'),
  d('stibili','Non… Pourquoi est-ce que ça ne fonctionne pas ?','voidbeing'),
  n('Il court. Cherche une issue, une paroi, une lumière. Tout demeure obscur. Puis la même silhouette apparaît devant lui, sans un bruit.'),
  d('voidbeing','Intrusion.'),
  d('stibili','Je ne voulais pas venir ici !','voidbeing'),
  n('Une orbe ténébreuse se forme. Stibili serre les poings : sa magie ne lui répond plus.')
 ],after:[
  n('Stibili s’effondre. Il tente encore d’appeler sa magie, mais ne trouve que le vide.'),
  d('stibili','Je… ne peux pas…'),
  n('Un portail s’ouvre sous lui. Le sol disparaît. Il tombe de nouveau, pendant de longues secondes qui lui semblent interminables.'),
  n('Cette fois, il atterrit sur une plateforme circulaire. Un pont étroit s’en éloigne. À son extrémité, une femme l’attend.'),
  d('yula','Relève-toi, voyageur.')
 ]},
 2:{title:'La marque de Yula',enemies:['voidbeing'],background:'void',boss:true,before:[
  d('stibili','Où m’avez-vous amené ?','yula'),
  d('yula','Tu es dans le Néant. Et tu ne devrais pas utiliser ta capacité à voyager comme bon te semble.'),
  d('stibili','Je n’en savais rien. Je cherchais seulement à m’échapper…','yula'),
  d('yula','Il ne sait donc pas que c’est lui qui l’a créé…','stibili',{whisper:true}),
  d('stibili','Qu’avez-vous dit ?','yula'),
  n('Yula lève la main. Stibili se raidit, puis convulse. Une force inconnue se referme autour de son cœur.'),
  d('yula','Tu vas vaincre l’Être du Néant.'),
  d('stibili','Vous ne comprenez pas ! Je ne peux plus utiliser ma magie !','yula'),
  n('Elle s’approche, relève le bord de son chapeau et effleure son visage. Une griffe lui entaille légèrement la joue.'),
  d('yula','Alors apprends à écouter autre chose.'),
  n('Tout s’assombrit. Quand Stibili regarde ses mains, elles ne sont plus les mêmes. Le Néant a changé son corps. Son cœur le déchire ; des cris résonnent dans sa tête.',{voidForm:true}),
  d('stibili','Ces voix… Faites-les taire…','yula'),
  d('yula','Lève les yeux.'),
  n('L’Être du Néant se tient devant lui. Une puissance étrangère circule dans ses veines. Cette fois, ses sorts répondent.'),
  d('stibili','Je ne sais pas ce que vous m’avez fait… mais je refuse de tomber encore.','voidbeing')
 ],after:[
  n('La créature se dissipe. Stibili laisse échapper un long soupir. Il tient à peine debout.'),
  d('yula','Tu as réussi. Mais il te reste encore beaucoup de choses à affronter.'),
  d('stibili','Attendez… Ces voix, mon cœur…','yula'),
  n('Yula claque des doigts. La plateforme, le pont et sa silhouette disparaissent.'),
  n('Stibili se retrouve là où il était tombé la première fois. Toujours cette obscurité. Aucun signe de vie. Aucune trace de l’Être du Néant.'),
  d('stibili','Elle m’a renvoyé ici… Et cette créature a disparu.')
 ]},
 3:{title:'Ce qui rampe dans l’ombre',enemies:['voidlarva','voidlarva','voidlarva'],background:'void',before:[
  n('Quelques pas suffisent. Un froissement se propage dans les ténèbres, puis un autre, plus proche.'),
  n('Trois petites créatures émergent de l’ombre. Leurs corps semblent faits de la même matière que celle qui habite désormais Stibili.'),
  d('stibili','Des Larves… Elles viennent vers moi.','voidlarva'),
  n('Les trois Larves du Néant bondissent.')
 ],after:[
  n('Le silence revient. Avant que la dernière Larve ne se dissipe, Stibili referme une prison de magie autour d’elle.'),
  d('stibili','Pas si vite. Cette énergie… Je peux la comprendre.','voidlarva'),
  n('La Larve se contracte, puis disparaît entre ses doigts. Son pouvoir trouve une place dans les veines du mage.'),
  d('stibili','Je peux l’appeler. Lui donner une forme… et la faire combattre à mes côtés.'),
  n('Compétence obtenue : Larve du Néant.'),
  n('Stibili observe ses mains. Le pouvoir de la créature circule sous sa peau. Il ne sait plus où sa propre magie s’arrête.'),
  n('Yula réapparaît dans l’obscurité. Elle claque des doigts, et le Néant s’efface.')
 ]},
 4:{title:'Le dernier saut de Dyzeria',enemies:['ozvex'],background:'mountain',boss:true,before:[
  n('L’air frappe son visage. Le ciel de Dyzeria s’étend au-dessus de lui. Stibili reconnaît les reliefs, les pierres… et l’énergie qu’il avait perdue de vue.'),
  d('ozvek','Toi…'),
  d('stibili','Ozvek. Encore vous.','ozvek'),
  n('Le Faucon-Dragon déploie ses ailes. Stibili sent la Larve remuer dans sa magie, prête à répondre à son appel.'),
  d('stibili','Cette fois, je ne suis pas revenu les mains vides.','ozvek')
 ],after:[
  n('Ozvek vacille, puis disparaît. Son énergie vitale s’arrache au sol et s’élève vers une présence immense.'),
  n('Son Navigateur absorbe cette force. Un rugissement traverse Dyzeria. La planète entière tremble.'),
  d('stibili','Non… Il faut que je parte. Maintenant.'),
  n('Il dessine son tube spatial. Le geste est exact, la formule familière. Pourtant, aucun passage ne s’ouvre.'),
  d('stibili','Pourquoi ?!'),
  n('Des projectiles déchirent les cieux. Stibili court, esquive, trébuche, se relève. La terre éclate derrière lui.'),
  n('Devant, une falaise. Le vide s’ouvre, immensément grand. Derrière, les impacts se rapprochent.'),
  d('stibili','Tant pis.'),
  n('Il saute.'),
  n('Pendant sa chute, il aperçoit enfin la silhouette du Navigateur : immense, imposante, terriblement puissante. Il détourne les yeux. Il doit survivre à l’impact.'),
  n('L’eau se referme sur lui. Pendant plusieurs secondes, il ne perçoit que le froid et le grondement sourd des profondeurs.'),
  n('Puis Stibili remonte à la surface, à bout de souffle. Plus de projectile. Plus de rugissement. Aucun signe d’une menace.'),
  d('stibili','Je suis… encore là.'),
  n('Fin du chapitre 2 — Un mage dans le Néant.')
 ]}
};
