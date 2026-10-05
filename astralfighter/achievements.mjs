import {xpNeed} from './progression.mjs';
// Companion-local counters: events are recorded by the engine only after a successful action.
const row=(id,name,metric,target,reward,description,exactGold=false)=>({id,name,metric,target,reward:{...reward,...(reward.gold!==undefined?{gold:exactGold?reward.gold:Math.ceil(reward.gold*.8)}:{})},description});
export const ACHIEVEMENTS=[
 ...[[20,40,20],[50,100,45],[80,150,65],[150,300,150],[300,550,350],[500,700,400]].map(([n,xp,gold],i)=>row('combat-'+(i+1),'Combat '+(i+1),'wins',n,{xp,gold,...(i===2?{title:'Combattant'}:i===5?{title:'Conquérant'}:{})},`Gagnez ${n} combats.`)),
 row('achat-or','Achat OR','goldBought',1,{xp:100,gold:25},'Achetez votre premier équipement en or (niveau 3), y compris le cristal d’émeraude et les variantes lumière ou acier.'),
 ...[[150,50],[300,150],[1500,0]].map(([n,xp],i)=>row('depense-'+(i+1),'Dépense '+(i+1),'spent',n,{xp,...(i===2?{title:'Acheteur compulsif'}:{})},`Dépensez ${n} or en boutique. Équipements, consommables et ressources compris.`)),
 ...[[10,75,50],[20,200,200],[30,450,250],[40,700,300],[50,0,500]].map(([n,xp,gold],i)=>row('neant-'+(i+1),'Néant '+(i+1),'rift',n,{xp,gold,...(i===4?{level:1}:{}),...({1:{title:'Combattant du Néant'},3:{title:'Conquérant du Néant'},4:{title:'Néantin'}}[i]??{})},`Vainquez l’étage ${n} de la Fissure du Néant.`)),
 ...[[1,25,25],[5,400,100],[15,1000,250]].map(([n,xp,gold],i)=>row('craft-'+(i+1),'Craft '+(i+1),'crafted',n,{xp,gold,...(i===2?{title:'Artisan'}:{})},`Fabriquez ${n===1?'votre premier objet':n+' objets'} à l’atelier, hors consommables.`)),
 ...[[5,15],[10,50],[15,80],[20,250],[30,350],[40,500],[50,750]].map(([n,gold],i)=>row('level-'+(i+1),'Level '+(i+1),'level',n,{gold,...({3:{title:'Aventurier remarquable'},4:{title:'Chasseur de prime'},5:{title:'Navigateur'},6:{title:'ASTRAL'}}[i]??{})},`Atteignez le niveau ${n}.`)),
 row('chapitre-1','Chapitre 1','chapter',1,{xp:Math.round(xpNeed(6)*.75),gold:30},'Terminez le chapitre 1 ou le chapitre unique de ce compagnon.'),
 row('astral-star',"Nah i'd win",'astralStars',1,{gold:400,title:"Nah i'd win"},'Achetez votre premier équipement Cosmique dans la Boutique Cosmique.',true),
 row('astral-weapon','Cette puissance...','astralWeapons',1,{gold:300},'Achetez une arme Cosmique.',true),
 row('astral-armor','... coule dans mes veines','astralArmors',1,{gold:300},'Achetez une armure Cosmique.',true),
 row('astral-universe','Cette puissance qui coule dans les veines','astralPair',2,{title:'Le plus fort de l’univers'},'Débloquez les succès « Cette puissance... » et « ... coule dans mes veines ».',true),
 ...[
  ['ecaille-rouge','Écaille rouge',10,'Écailles rouges','Dragonnet rouge'],
  ['plume-malefique','Plume maléfique',10,'Plumes maléfiques','Maître Corkbeau'],
  ['flocon-eternel','Flocon Éternel',10,'Flocons Éternels','L’Éternel'],
  ['os','Ossement',15,'Os','Le revenant'],
  ['plume-enflammee','Plumes enflammées',10,'Plumes enflammées','Chaud bouillant']
 ].map(([resource,name,target,label,title])=>row('loot-'+resource,name,'loot:'+resource,target,{gold:200,title},`Récupérez ${target} ${label} sur les monstres. Les achats en boutique ne comptent pas. Les ressources vendues ou utilisées restent comptabilisées.`,true))
];
export const newAchievements=()=>({version:2,monsterDrops:{},astralWeapons:0,astralArmors:0,astralStars:0,wins:0,spent:0,goldBought:0,crafted:0,claimed:[],title:null});
export function ensureAchievements(s){if(!s.achievements){s.achievements=newAchievements();return true;}let changed=false;if(s.achievements.version!==2){Object.assign(s.achievements,{astralWeapons:0,astralArmors:0,astralStars:0,version:2});changed=true;}if(!s.achievements.monsterDrops||typeof s.achievements.monsterDrops!=='object'||Array.isArray(s.achievements.monsterDrops)){s.achievements.monsterDrops={};changed=true;}return changed;}
// Only called when a defeated monster actually awards a resource. Never infer its origin from inventory.
export function recordMonsterDrop(s,resource,quantity=1){ensureAchievements(s);if(!ACHIEVEMENTS.some(d=>d.metric==='loot:'+resource)||!Number.isSafeInteger(quantity)||quantity<1)return;const drops=s.achievements.monsterDrops;drops[resource]=Math.min(Number.MAX_SAFE_INTEGER,Math.max(0,Math.floor(Number(drops[resource])||0))+quantity);}
export function recordAchievement(s,metric,amount=1){ensureAchievements(s);if(['wins','spent','goldBought','crafted','astralWeapons','astralArmors','astralStars'].includes(metric))s.achievements[metric]=Math.max(0,Number(s.achievements[metric])||0)+amount;}
export function achievementRows(s,chapterLength){const a=s.achievements??newAchievements();return ACHIEVEMENTS.map(d=>{const actualValue=d.metric.startsWith('loot:')?a.monsterDrops?.[d.metric.slice(5)]??0:d.metric==='astralPair'?Number(a.astralWeapons>0)+Number(a.astralArmors>0):d.metric==='level'?s.hero?.level??0:d.metric==='rift'?s.rift?.cleared??0:d.metric==='chapter'?Number(chapterLength>0&&s.cleared>=chapterLength):a[d.metric]??0;const value=Array.isArray(a.unlockedByCode)&&a.unlockedByCode.includes(d.id)?Math.max(d.target,actualValue):actualValue;return {...d,value,progress:Math.min(d.target,value),ready:value>=d.target,claimed:a.claimed.includes(d.id)};});}
export const unlockedTitles=s=>ACHIEVEMENTS.filter(d=>d.reward.title&&s.achievements?.claimed.includes(d.id)).map(d=>d.reward.title);
export const equippedTitle=s=>unlockedTitles(s).includes(s.achievements?.title)?s.achievements.title:null;
export function setCompanionTitle(s,title){if(!s.hero||title!==null&&!unlockedTitles(s).includes(title))throw Error('Titre indisponible pour ce compagnon.');ensureAchievements(s);s.achievements.title=title;}
