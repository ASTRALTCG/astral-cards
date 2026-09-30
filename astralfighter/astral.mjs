import {recordAchievement} from './achievements.mjs';
// All rolls are explicit: common, rare, super-rare, legendary.
const weapon=(name,owner,family,rarityRolls)=>({name,owner,family,slot:'weapon',rarityRolls,rolls:rarityRolls});
const armor=(name,rarityRolls,restriction={})=>({name,slot:'armor',rarityRolls,rolls:rarityRolls,...restriction});
export const ASTRAL_ITEMS=Object.fromEntries(Object.entries({
 'epee-dieux-nuageux':weapon('Épée des dieux nuageux (copie)','forgeur','epee-lourde',{dmg:[50,55,65,85]}),
 'epee-bouclier-astral':weapon('Épée & bouclier Astral','nahat','epee-bouclier',{dmg:[40,45,55,70],hp:[120,130,145,165]}),
 'lame-sabre-astral':weapon('Lame-sabre Astral','nahat','lame-sabre',{dmg:[55,65,75,85],hp:[50,60,75,90],luck:[-35,-30,-25,-15]}),
 'protege-bras-astral':weapon('Protège-bras Astral','nahat','protege-bras',{hpPercent:[22,23,24,26]}),
 'cristal-astral':weapon('Cristal Astral nuageux','wolffy','cristal',{dmg:[44,55,66,77],luck:[37,45,45,50]}),
 'dentier-astral':weapon('Dentier de combat Astral','wolffy','dentier',{dmg:[30,40,50,60],hp:[80,100,110,125],luck:[20,22,23,25],speed:[20,22,23,25]}),
 'arc-astral':weapon('Arc Astral','drunn','arc',{dmg:[45,55,65,80],luck:[25,30,35,40]}),
 'arbalete-astral':weapon('Arbalète Astral','drunn','arbalete',{dmg:[32,38,43,51],luck:[20,25,28,31]}),
 'baton-astral':weapon('Bâton Astral','stibili','baton',{dmg:[55,65,75,90]}),
 'griffe-astral':weapon('Griffe Astral','kaerune','griffe',{dmg:[45,55,65,75],speed:[28,33,38,45]}),
 'porte-aile-astral':weapon('Porte-aile Astral','kaerune','porte-aile',{dmg:[30,40,48,55],speed:[45,55,61,70],luck:[-30,-28,-25,-20]}),
 'cape-astral':armor('Cape protectrice Astral',{hp:[250,270,310,400]}),
 'armure-complete-astral':armor('Armure complète Astral',{hp:[200,220,250,300]},{owner:'wolffy'})
}).map(([id,d])=>[id,{...d,astral:true,level:5,price:d.slot==='weapon'?1050:650,sellPrice:200}]));
export const isAstral=i=>!!ASTRAL_ITEMS[typeof i==='string'?i:i?.type];
export const astralActive=(i,type,min=2)=>i?.type===type&&['common','rare','super-rare','legendary'].indexOf(i.rarity)>=min;
export function astralPassiveText(i){
 if(i.type==='epee-dieux-nuageux')return 'Toutes les raretés : au début de chaque tour, y compris le premier, sacrifie 5 % des PV max en ignorant le bouclier (peut provoquer la défaite), puis gagne 10 % de dégâts d’attaque cumulables jusqu’à la fin du combat. Bonus additif : +10 %, +20 %, +30 %…';
 const text={
 'epee-bouclier-astral':'La riposte de Nahat inflige 125 % des dégâts d’attaque au lieu de 55 %.',
 'lame-sabre-astral':'Mes armes : Mes choix convertit 30 % des PV bonus en dégâts au lieu de 25 %, sans perdre ces PV.',
 'protege-bras-astral':'Au début de chaque tour après le premier, inflige 2 % des PV max de Nahat à un ennemi vivant choisi au hasard.',
 'cristal-astral':'Les Bébés Wolffy possèdent 75 % des dégâts et 50 % des PV max de Wolffy avant combat.',
 'dentier-astral':'Les Bébés Wolffy attaquent deux fois par tour.',
 'arc-astral':'Chaque frappe critique déclenchée par la Chance ajoute 3 % de dégâts d’attaque, cumulables jusqu’à la fin du combat.',
 'baton-astral':'Une fois par combat, à sa mort, Stibili explose et inflige 200 % de ses dégâts d’attaque à la cible. Si cette cible est vaincue, le combat est compté comme une victoire.',
 'griffe-astral':'Les doubles actions déclenchées par la Vitesse deviennent triples. Les dégâts et soins de la troisième action sont réduits de 50 %. Respecte les compétences non répétables.',
 'porte-aile-astral':'Lors d’une double action déclenchée par la Vitesse, Kaerune récupère 7 % des dégâts réellement infligés par chacune des deux actions.',
 'cape-astral':'Au début de chaque tour, inflige 2 % des dégâts d’attaque du porteur à tous les ennemis.',
 'armure-complete-astral':'Les PV et les dégâts des Bébés Wolffy sont augmentés de 15 %, après leur calcul à partir des statistiques de Wolffy avant combat.'
 };
 if(i.type==='arbalete-astral')return `Ajoute ${astralActive(i,i.type)?2:1} dégât${astralActive(i,i.type)?'s':''} par tranche complète de 4 points investis en Chance. La Chance naturelle et celle des équipements ne comptent pas. Super rare et Légendaire : 2 dégâts par tranche.`;
 if(!text[i.type])return '';
 const min=i.type==='baton-astral'?3:2;
 return (astralActive(i,i.type,min)?'Passif actif : ':min===3?'Légendaire : ':'Super rare et Légendaire : ')+text[i.type]+(i.type==='armure-complete-astral'?' Wolffy porte son armure Astral à toutes les raretés.':'');
}
export const STAR_STATS=['hp','dmg','speed','luck'];
export const STAR_NAMES={hp:'PV',dmg:'Dégâts',speed:'Vitesse',luck:'Chance'};
export const FORGE_PRICE=350,DESTROY_STAR_PRICE=200;
export const nativeStarKey=(item,stat)=>stat==='hp'&&Object.hasOwn(item.stats,'hpPercent')?'hpPercent':stat;
export function itemStats(item){
 const native=item.stats??{},out={...native};if(!isAstral(item))return out;
 for(const star of item.stars??[]){if(!star)continue;const key=nativeStarKey(item,star.stat);out[key]=(out[key]??0)+(Object.hasOwn(native,key)?Math.abs(native[key])*star.value/100:star.value);}
 return Object.fromEntries(Object.entries(out).map(([k,v])=>[k,Math.round(v*10000)/10000]));
}
export const forgedStatKeys=item=>new Set((item.stars??[]).filter(Boolean).map(star=>nativeStarKey(item,star.stat)));
export function normalizeForge(s){
 s.forge??={unlocked:false,itemId:null};
 if(!s.items.some(i=>i.id===s.forge.itemId&&isAstral(i)))s.forge.itemId=null;
 for(const item of s.items.filter(isAstral)){
  item.stars=Array.from({length:3},(_,n)=>{const star=item.stars?.[n];if(item.id!==s.forge.itemId||!star||!STAR_STATS.includes(star.stat))return null;const native=Object.hasOwn(item.stats,nativeStarKey(item,star.stat)),range=native?[3,8]:star.stat==='hp'?[150,200]:star.stat==='dmg'?[15,30]:[10,20];return Number.isInteger(star.value)&&star.value>=range[0]&&star.value<=range[1]?{stat:star.stat,value:star.value}:null;});
 }
}
function atForge(s){if(!s.hero||s.battle||s.storyScene||!s.forge?.unlocked)throw Error('La Forge Cosmique est accessible au camp après votre premier achat Astral.');}
export function placeForgeItem(s,id){atForge(s);if(s.forge.itemId)throw Error('Retirez d’abord l’équipement actuellement dans la Forge.');const item=s.items.find(i=>i.id===id);if(!isAstral(item))throw Error('Choisissez un équipement Astral de ce compagnon.');s.forge.itemId=id;item.stars=[null,null,null];return item;}
export function addForgeStar(s,slot,rng=Math.random){
 atForge(s);const item=s.items.find(i=>i.id===s.forge.itemId);if(!isAstral(item)||!Number.isInteger(slot)||slot<0||slot>2||item.stars?.[slot])throw Error('Emplacement stellaire indisponible.');if(s.gold<FORGE_PRICE)throw Error('Il faut 350 or pour activer une étoile.');
 const random=()=>Math.min(1-Number.EPSILON,Math.max(0,rng())),stat=STAR_STATS[Math.floor(random()*4)],native=Object.hasOwn(item.stats,nativeStarKey(item,stat)),[lo,hi]=native?[3,8]:stat==='hp'?[150,200]:stat==='dmg'?[15,30]:[10,20],star={stat,value:lo+Math.floor(random()*(hi-lo+1))};
 item.stars??=[null,null,null];item.stars[slot]=star;s.gold-=FORGE_PRICE;recordAchievement(s,'astralStars');return star;
}
export function destroyForgeStar(s,slot){atForge(s);const item=s.items.find(i=>i.id===s.forge.itemId);if(!Number.isInteger(slot)||slot<0||slot>2||!item?.stars?.[slot])throw Error('Étoile introuvable.');if(s.gold<DESTROY_STAR_PRICE)throw Error('Il faut 200 or pour détruire une étoile.');s.gold-=DESTROY_STAR_PRICE;item.stars[slot]=null;}
// Called by the UI only after its two explicit confirmation windows.
export function removeForgeItem(s){atForge(s);const item=s.items.find(i=>i.id===s.forge.itemId);if(!item)throw Error('La Forge est vide.');item.stars=[null,null,null];s.forge.itemId=null;return item;}
export function starText(item,star){if(!star)return 'Étoile vide';const native=Object.hasOwn(item.stats,nativeStarKey(item,star.stat));return `+${star.value}${native?' %':''} ${STAR_NAMES[star.stat]}${native?' de la valeur native':''}`;}
