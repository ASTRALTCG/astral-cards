// Forgeur rules. No engine imports: usable by combat, catalog and offline bundle.
export const FORGEUR_CLASS={name:'Le Forgeur',title:'L’acier entre deux extrêmes',role:'Tension',art:'forgeur-classic',hp:145,dmg:24,luck:14,speed:12,weapon:'epee-lourde',color:'#ff8358',lore:'Après la chute de Selkiel, le Forgeur fut appelé par Zvatas pour les gouverner tous…'};
export const FORGEUR_PASSIVE={name:'Acier vivant',text:'Commence chaque combat avec 3 cumuls de Tension, entre 1 et 5. À 2, 3 ou 4 : état neutre. À 5, Surchauffe : dégâts +20 %, Chance de critique +15 points et dégâts reçus +15 %. À 1, Refroidissement : dégâts −20 %, probabilité de double action +15 points et bouclier de 15 % des PV max au début de chaque tour. La Tension et les états ne peuvent pas être dissipés. Les boucliers se cumulent, persistent jusqu’à absorption ou dissipation et disparaissent en fin de combat.'};
export const FORGEUR_SKILLS={
 fracas:{name:'Fracas de l’épée',owner:'forgeur',level:1,cd:0,effect:'fracas'},
 protectionultime:{name:'Protection ultime',owner:'forgeur',level:1,cd:0,effect:'protectionultime'},
 entailles:{name:'Entailles multiples',owner:'forgeur',level:3,cd:3,effect:'entailles'},
 magmageux:{name:'Protection Magmageux',owner:'forgeur',level:5,cd:3,effect:'magmageux'},
 regulation:{name:'Refroidissement ou Surchauffe',owner:'forgeur',level:7,cd:2,effect:'regulation'},
 jugement:{name:'Jugement',owner:'forgeur',level:11,cd:1,waitTurns:1,effect:'jugement'},
 aureole:{name:'Auréole de prévention',owner:'forgeur',level:13,cd:1,waitTurns:1,effect:'aureole'}
};
export const FORGEUR_TEXT={
 fracas:'Inflige 125 % des dégâts d’attaque, ou 175 % si le Forgeur est déjà en Surchauffe au lancement, puis gagne 1 Tension. Peut être critique et répété par la Vitesse ; chaque lancer fait évoluer la Tension. Sans récupération.',
 protectionultime:'Ajoute un bouclier égal à 12 % des PV max, puis perd 1 Tension. Si le Forgeur est déjà en Refroidissement au lancement : bouclier de 17 % à la place, puis frappe la cible pour 42 % de tous ses points de bouclier actuels. Le bouclier ne critique pas ; la frappe peut critiquer. Répétable par la Vitesse. Sans récupération.',
 entailles:'Nécessite Surchauffe. Inflige 1 à 3 entailles à une même cible, chacune à 65 % des dégâts d’attaque. Chaque entaille peut être critique. Pas de répétition par la Vitesse. Récupération : 3 tours (tour 1 → tour 4).',
 magmageux:'Ajoute un bouclier de 20 % des PV max. À 49 % des PV max ou moins au lancement, applique aussi une Brûlure à la cible choisie : 5 % de ses PV max au début de chacun de ses tours, non cumulable. À 50 % ou plus, seul le bouclier est appliqué. Ne critique pas ; répétable par la Vitesse. Récupération : 3 tours.',
 regulation:'Ramène la Tension à 3. Depuis Surchauffe : ajoute un bouclier égal à 250 % des dégâts avant combat et prépare Protection ultime à retirer 2 Tensions au prochain lancer. Depuis Refroidissement : la prochaine frappe offensive inflige +20 % de dégâts et le prochain Fracas ajoute 2 Tensions. Depuis 2, 3 ou 4 : aucun bonus. Ni critique ni répétition par la Vitesse. Récupération : 2 tours.',
 jugement:'Sacrifie 25 % des PV max, en ignorant les boucliers et au risque de mourir, puis ajoute un bouclier égal à 150 % des dégâts avant combat. Prépare la prochaine attaque de base ou compétence offensive lancée en Surchauffe : ses dégâts sont doublés. Une action sans dégâts annule cette préparation. Une répétition par la Vitesse ne profite pas une seconde fois du bonus. Jugement ne frappe pas directement, ne critique pas et ne se répète pas. Récupération : un tour complet à attendre (tour 1 → tour 3).',
 aureole:'Prépare un bouclier égal à 50 % des PV effectivement perdus lors de la prochaine attaque ou compétence offensive ennemie reçue. Les impacts de cette même action se cumulent ; ni les dégâts périodiques ni les sacrifices ne comptent. Le bouclier arrive au début du prochain tour du Forgeur, s’il survit. Une répétition par la Vitesse porte le taux à 100 %. Ne critique pas. Récupération : un tour complet à attendre (tour 1 → tour 3).'
};
const sword=(name,level,price,rolls)=>({name,owner:'forgeur',family:'epee-lourde',level,price,slot:'weapon',rolls:{dmg:rolls},rarityRolls:{dmg:rolls},...(level===4?{sellPrice:111}:{})});
export const FORGEUR_ITEMS={
 'epee-lourde':sword('Épée lourde basique',1,37,[7,8,9,11]),
 'epee-lourde-magmatique':sword('Épée lourde magmatique',2,125,[9,10,12,14]),
 'epee-lourde-doree':sword('Épée lourde magmatique dorée',3,350,[12,13,15,17]),
 'epee-lourde-diamanite':sword('Épée lourde magmatique en Diamanite',4,555,[32,35,38,42])
};
export const forgeTension=b=>Math.max(1,Math.min(5,Math.floor(b?.tension??3)));
export const forgeState=b=>forgeTension(b)===5?'hot':forgeTension(b)===1?'cold':'neutral';
export const forgeArt=b=>forgeState(b)==='hot'?'forgeur-offensif':forgeState(b)==='cold'?'forgeur-defensif':'forgeur-classic';
export const newProfile=()=>({version:1,unlocks:{forgeur:false},forgeurNoticePending:false});
// Profile progress survives deletion of every adventure. Only a genuinely new profile starts locked.
export function syncProfile(active,companions={}){
 const profile={...newProfile(),...active?.profile,unlocks:{...active?.profile?.unlocks}};
 const states=[active,...Object.values(companions)].filter(Boolean);
 const unlocked=states.some(s=>s.profile?.unlocks?.forgeur===true||s.hero?.key==='forgeur'||s.hero?.key==='wolffy'&&s.cleared>=10);
 if(unlocked&&!profile.unlocks.forgeur)profile.forgeurNoticePending=true;
 profile.unlocks.forgeur=!!(profile.unlocks.forgeur||unlocked);
 for(const s of states)s.profile=profile;
 return profile;
}
export const companionAvailable=(key,profile)=>key!=='forgeur'||profile?.unlocks?.forgeur===true;
