import {FORGEUR_STORY_VERSION,FORGEUR_MISSIONS,FORGEUR_ENCOUNTERS,forgeurStoryEnemies,forgeurEnemyTurn} from './forgeur-story.mjs';
import {FORGEUR_CLASS,FORGEUR_PASSIVE,FORGEUR_SKILLS,FORGEUR_TEXT,FORGEUR_ITEMS,forgeTension,forgeState,forgeArt,newProfile,syncProfile,companionAvailable} from './forgeur.mjs';
export {forgeTension,forgeState,forgeArt,newProfile,syncProfile,companionAvailable};
import {MAX_LEVEL,xpNeed,expeditionXp,expeditionXpRange,expeditionXpDivisors} from './progression.mjs';
export {MAX_LEVEL,xpNeed,expeditionXp,expeditionXpRange,expeditionXpDivisors};
import {ACHIEVEMENTS,newAchievements,ensureAchievements,recordAchievement,recordMonsterDrop,achievementRows,unlockedTitles,equippedTitle,setCompanionTitle} from './achievements.mjs';
export {ACHIEVEMENTS,unlockedTitles,equippedTitle,setCompanionTitle};
import {NAHAT_MISSIONS,nahatEnemies,nahatIntent} from './nahat-story.mjs';
export {NAHAT_MISSIONS,nahatIntent};
import {ASTRAL_ITEMS,isAstral,astralActive,astralPassiveText,itemStats,normalizeForge,forgedStatKeys,STAR_NAMES,starText,placeForgeItem,addForgeStar,destroyForgeStar,removeForgeItem} from './astral.mjs';
export {isAstral,itemStats,forgedStatKeys,STAR_NAMES,starText,placeForgeItem,addForgeStar,destroyForgeStar,removeForgeItem};
import {DIAMANITE_ITEMS} from './diamanite.mjs';
import {MASTERY_SKILLS,MASTERY_TEXT,activeShields,shieldTotal,shieldCapacity,grantShield,absorbShield,markedPrey} from './mastery.mjs';
export {activeShields,shieldTotal,shieldCapacity,markedPrey};
import {goldenEnemy,EXPEDITION_BALANCE,scaleEncounter,EXPEDITIONS,EXPEDITION_ENEMIES,EXPEDITION_BESTIARY,expeditionFor,expeditionEncounter,prepareExpeditionEnemy,expeditionIntent,expeditionEnemyTurn} from './expeditions.mjs';
export {EXPEDITIONS,expeditionIntent};
import {TRIALS,trialEnemy,trialIntent,trialDirectDamage,trialEnemyTurn} from './trials.mjs';
export {TRIALS,trialIntent};
import {DRUNN_MISSIONS,drunnEnemies,drunnIntent} from './drunn-story.mjs';
export {DRUNN_MISSIONS,drunnIntent};
import {RIFT_LEVEL,RIFT_FLOORS,RIFT_CREATURES,riftReplays,riftCleared,riftUnlocked,riftFloor,riftEnemies,riftIntent,riftDirectDamage,riftEnemyTurn} from './rift.mjs';
export {RIFT_LEVEL,RIFT_FLOORS,RIFT_CREATURES,riftReplays,riftCleared,riftUnlocked,riftFloor,riftIntent};
import {KAERUNE_MISSIONS,STORY_CAST,WOLFFY_CHAPTER,WOLFFY_MISSIONS,STIBILI_MISSIONS,storyRoute,storyLines} from './story.mjs';
export {KAERUNE_MISSIONS,STORY_CAST,WOLFFY_CHAPTER,WOLFFY_MISSIONS,STIBILI_MISSIONS,storyRoute,storyLines};
export const BALANCE_VERSION=9;
export const ECONOMY={startingGold:0,equipmentPrice:37,advancedEquipmentPrice:125,goldEquipmentPrice:350,potionPrice:25,trainingBonus:3,trainingBonusFromCleared:4,lateWorldGold:22,lateWorldFromStage:6,trainingGold:[2,5],worldGold:[5,15],firstWorldCombatBonus:15};
export const LEGACY_KEYS={darunk:'wolffy',emy:'drunn',drun:'drunn',golkias:'nahat',mink:'kaerune'};
export const CLASSES={
 forgeur:FORGEUR_CLASS,
 wolffy:{name:'Wolffy',title:'Le loup Démononuageux',role:'Équilibré',art:'wolffy',hp:133,dmg:22,luck:13,speed:13,weapon:'cristal',color:'#edbb72',lore:'Wolffy appartient à l’archétype des Démononuageux. Il a été transformé par Selkiel lors de l’apparition du tout premier Navigateur Démononuageux. Équilibré en combat, il est considéré comme le loup de combat parfait !'},
 drunn:{name:'Drunn',title:'Le tireur des Guerriers bêtes',role:'Chance',art:'drunn',hp:115,dmg:23,luck:30,speed:7,weapon:'arc',color:'#7bddb8',lore:'Drunn appartient à l’archétype des Guerriers bêtes. Calme, froid et précis, il ne rate aucune cible. Le Dompteur, son Navigateur, l’a choisi pour sa loyauté et son efficacité.'},
 nahat:{name:'Nahat',title:'Le prodige de l’Épine',role:'Vitalité',art:'nahat-ado',hp:150,dmg:19,luck:9,speed:6,weapon:'epee-bouclier',color:'#c8aa79',lore:'Nahat appartient à l’archétype de l’Épine. Recruté il y a peu, il a récemment révélé un potentiel gigantesque. Il fait déjà partie des prodiges.'},
 stibili:{name:'Stibili',title:'Le mage voyageur',role:'Dégâts',art:'stibili',hp:104,dmg:30,luck:12,speed:11,weapon:'baton',color:'#b8a0ff',lore:'Né d’une étoile, Stibili est une anomalie. Ce mage voyageur, intelligent et méfiant, ne poursuit qu’une ambition : découvrir et créer toujours plus de sorts. Il étudie les traces laissées par ses adversaires pour enrichir ses formules.'},
 kaerune:{name:'Kaerune',title:'La combattante du Sceau brisé',role:'Vitesse',art:'kaerune',hp:115,dmg:23,luck:12,speed:31,weapon:'griffe',color:'#91baf4',lore:'Kaerune appartient à l’archétype du Sceau brisé, sur la planète Harmony. Recrutée comme combattante principale, elle s’appuie sur sa rapidité et ses griffes acérées.'}
};
export const ITEMS={
 ...FORGEUR_ITEMS,
 ...Object.fromEntries(Object.values(TRIALS).map(d=>[d.orb,{name:d.orbName,slot:'orb',unique:true,questOnly:true,sellPrice:0,rolls:{}}])),
 'talisman-sables':{name:'Talisman des sables',owner:'drunn',slot:'accessory',unique:true,questOnly:true,fixedStats:{luck:10},rolls:{luck:[10]}},
 griffe:{name:'Griffe en bois',price:37,slot:'weapon',rolls:{dmg:[3,4,5],speed:[3,4]}},
 arc:{name:'Arc en bois',price:37,slot:'weapon',rolls:{dmg:[3,4,5],luck:[3,4]}},
 'epee-bouclier':{name:'Épée & bouclier en bois',price:37,slot:'weapon',rolls:{dmg:[3,4,5],hp:[10,14]}},
 baton:{name:'Bâton en bois',price:37,slot:'weapon',rolls:{dmg:[5,6,7],luck:[1,2]}},
 cristal:{name:'Cristal en bois',price:37,slot:'weapon',rolls:{dmg:[3,4,5],luck:[1,2]}},
 veste:{name:'Veste en tissu',price:37,level:1,slot:'armor',rolls:{hp:[15,20,25]}},
 'griffe-fer':{name:'Griffe en fer',price:125,unlockCleared:7,level:2,slot:'weapon',family:'griffe',rolls:{dmg:[6,7,8],speed:[6,8]}},
 'arc-fer':{name:'Arc en fer',price:125,unlockCleared:7,level:2,slot:'weapon',family:'arc',rolls:{dmg:[6,7,8],luck:[6,8]}},
 'epee-bouclier-fer':{name:'Épée & bouclier en fer',price:125,unlockCleared:7,level:2,slot:'weapon',family:'epee-bouclier',rolls:{dmg:[6,7,8],hp:[24,30]}},
 'baton-acier':{name:'Bâton en acier',price:125,unlockCleared:7,level:2,slot:'weapon',family:'baton',rolls:{dmg:[9,10,11],luck:[2,3]}},
 'cristal-fer':{name:'Cristal de fer',price:125,unlockCleared:7,level:2,slot:'weapon',family:'cristal',rolls:{dmg:[7,8,9],luck:[2,3]}},
 'veste-aventurier':{name:'Veste d’aventurier',price:125,level:2,unlockCleared:7,slot:'armor',rolls:{hp:[35,45,55]}},
 'lame-sabre':{name:'Lame-sabre en bois',price:37,slot:'weapon',family:'lame-sabre',rolls:{dmg:[6,7,8],hp:[4,6],luck:[-4,-3]}},
 'lame-sabre-fer':{name:'Lame-sabre en fer',price:125,unlockCleared:7,level:2,slot:'weapon',family:'lame-sabre',rolls:{dmg:[10,11,12],hp:[12,16],luck:[-7,-5]}},
 'griffe-or':{name:'Griffe en or',price:350,unlockChapter:true,level:3,slot:'weapon',family:'griffe',rolls:{dmg:[12,14,16],speed:[10,12,14]}},
 'arc-or':{name:'Arc en or',price:350,unlockChapter:true,level:3,slot:'weapon',family:'arc',rolls:{dmg:[12,14,16],luck:[10,12,14]}},
 'epee-bouclier-or':{name:'Épée & bouclier en or',price:350,unlockChapter:true,level:3,slot:'weapon',family:'epee-bouclier',rolls:{dmg:[12,14,16],hp:[42,50,58]}},
 'lame-sabre-or':{name:'Lame-sabre en or',price:350,unlockChapter:true,level:3,slot:'weapon',family:'lame-sabre',rolls:{dmg:[17,19,21],hp:[18,22,26],luck:[-9,-8,-7]}},
 'cristal-emeraude':{name:'Cristal d’émeraude',price:350,unlockChapter:true,level:3,slot:'weapon',family:'cristal',rolls:{dmg:[13,15,17],luck:[4,5,6]}},
 'grimoire-dore':{name:'Grimoire doré',price:350,unlockChapter:true,level:3,slot:'weapon',family:'baton',grantsSkill:'foudroiement',rolls:{dmg:[10,11,12],luck:[2,3,4]}},
 'porte-aile-bois':{name:'Porte-aile en bois',level:1,price:37,owner:'kaerune',slot:'weapon',family:'porte-aile',rolls:{dmg:[1,2,3],speed:[6,7,8],luck:[-4,-3,-2]}},
 'porte-aile-fer':{name:'Porte-aile de fer',level:2,price:125,unlockCleared:7,owner:'kaerune',slot:'weapon',family:'porte-aile',rolls:{dmg:[3,4,5],speed:[11,13,15],luck:[-6,-5,-4]}},
 'porte-aile-lumiere':{name:'Porte-aile de lumière',level:3,price:350,unlockChapter:true,owner:'kaerune',slot:'weapon',family:'porte-aile',rolls:{dmg:[7,9,11],speed:[18,21,24],luck:[-8,-7,-6]}},
 'protege-bras-cuir':{name:'Protège-bras en cuir',level:1,price:37,owner:'nahat',slot:'weapon',family:'protege-bras',rarityRolls:{hpPercent:[3,4,5,7]},rolls:{hpPercent:[3,4,5]}},
 'protege-bras-metal':{name:'Protège-bras en métal',level:2,price:125,unlockCleared:7,owner:'nahat',slot:'weapon',family:'protege-bras',rarityRolls:{hpPercent:[6,7,8,10]},rolls:{hpPercent:[6,7,8]}},
 'protege-bras-acier':{name:'Protège-bras en acier',level:3,price:350,unlockChapter:true,owner:'nahat',slot:'weapon',family:'protege-bras',rarityRolls:{hpPercent:[9,10,11,13]},rolls:{hpPercent:[9,10,11]}},
 'arbalete-usee':{name:'Arbalète usée',level:1,price:37,owner:'drunn',slot:'weapon',family:'arbalete',rolls:{dmg:[1,2,3],luck:[1,2]}},
 'arbalete-moderne':{name:'Arbalète moderne',level:2,price:125,unlockCleared:7,owner:'drunn',slot:'weapon',family:'arbalete',rolls:{dmg:[3,4,5],luck:[3,4,5]}},
 'arbalete-doree-magique':{name:'Arbalète dorée magique',level:3,price:350,unlockChapter:true,owner:'drunn',slot:'weapon',family:'arbalete',rolls:{dmg:[7,9,11],luck:[6,7,8]}},
 'dentier-combat':{name:'Dentier de combat',level:1,price:37,owner:'wolffy',slot:'weapon',family:'dentier',rolls:{dmg:[1,2,3],hp:[4,6,8],luck:[1,2],speed:[1,2]}},
 'dentier-metal':{name:'Dentier de combat en métal',level:2,price:125,unlockCleared:7,owner:'wolffy',slot:'weapon',family:'dentier',rolls:{dmg:[3,4,5],hp:[10,13,16],luck:[2,3,4],speed:[2,3,4]}},
 'dentier-nuageux':{name:'Dentier de combat nuageux',level:3,price:350,unlockChapter:true,owner:'wolffy',slot:'weapon',family:'dentier',rolls:{dmg:[6,7,8],hp:[18,24,30],luck:[3,4,5],speed:[3,4,5]}},
 ...DIAMANITE_ITEMS,...ASTRAL_ITEMS,
 'bracelet-boule-feu':{name:'Bracelet « Boule de feu »',price:150,owner:'stibili',slot:'accessory',fixedStats:{dmg:8},rolls:{dmg:[8]}},
 'echarpe-aventurier':{name:'L’écharpe d’aventurier',price:65,slot:'accessory',rolls:{}},
 'collier-presages':{name:'Collier des présages',price:60,craftOnly:true,slot:'accessory',rolls:{omen:[3,4,5]}},
 'amulette-force':{name:'Amulette de force',craftOnly:true,sellPrice:80,slot:'accessory',rolls:{dmgPercent:[3,4,5]}},
 'bracelet-chance':{name:'Bracelet de chance',craftOnly:true,sellPrice:80,slot:'accessory',rolls:{luckPercent:[2,3,4]}},
 'couronne-vitalite':{name:'Couronne de vitalité',craftOnly:true,sellPrice:80,slot:'accessory',rolls:{vitalityPercent:[3,4,5]}},
 'ceinture-enflammee':{name:'Ceinture enflammée',craftOnly:true,sellPrice:80,slot:'accessory',rolls:{flameDamage:[7,8,9]}},
 'collier-os':{name:'Collier d’os',craftOnly:true,sellPrice:80,slot:'accessory',rarityRolls:{bonePower:[25,27,30,35]},rolls:{bonePower:[25,27,30]}},
 'bague-vitesse':{name:'Bague de vitesse',craftOnly:true,sellPrice:80,slot:'accessory',rolls:{speedPercent:[2,3,4]}},
 'bracelet-majestueux':{name:'Bracelet majestueux en Diamanite',craftOnly:true,sellPrice:80,slot:'accessory',rolls:{allStatsPercent:[1,1,2]},rarityRolls:{allStatsPercent:[1,1,2,4]}},
 'ceinture-pierre':{name:'Ceinture ancienne en pierre',craftOnly:true,sellPrice:80,slot:'accessory',rolls:{stoneShieldPercent:[4,5,6]},rarityRolls:{stoneShieldPercent:[4,5,6,8]}},
 'boucles-slime':{name:'Boucles d’oreilles modèle Slime',craftOnly:true,sellPrice:80,slot:'accessory',rolls:{}},
 'potion-soin':{name:'Potion de soin',price:25,consumable:true,healPercent:20,rolls:{}},
 'orbe-vie':{name:'Orbe de vie',slot:'orb',sellPrice:200,unique:true,rolls:{hpPercent:[15]}}
};
export const RARITIES=[
 {id:'common',name:'Commune',chance:40,salePercent:25},
 {id:'rare',name:'Rare',chance:30,salePercent:30},
 {id:'super-rare',name:'Super rare',chance:20,salePercent:35},
 {id:'legendary',name:'Légendaire',chance:10,salePercent:40}
];
export const itemRarity=item=>RARITIES.find(r=>r.id===item?.rarity)??RARITIES[0];
export const hasRarity=type=>!!ITEMS[type]?.slot&&ITEMS[type].slot!=='orb';
export const equipmentLevel=type=>ITEMS[type]?.level??(['weapon','armor'].includes(ITEMS[type]?.slot)?({37:1,110:2,200:3}[ITEMS[type].price]??null):null);
export function rarityStats(type,rarity){
 const tier=RARITIES.findIndex(r=>r.id===rarity);if(tier<0||!ITEMS[type])throw Error('Rareté inconnue.');
 return {...Object.fromEntries(Object.entries(ITEMS[type].rolls).map(([key,values])=>{const lo=Math.min(...values),hi=Math.max(...values);return [key,ITEMS[type].rarityRolls?.[key]?.[tier]??[lo,Math.floor((lo+hi)/2),hi,hi+1][tier]];})),...ITEMS[type].fixedStats};
}
export function rollRarity(rng=Math.random){const n=rng()*100;return n<40?'common':n<70?'rare':n<90?'super-rare':'legendary';}
export function createItem(type,rng=Math.random){
 const d=ITEMS[type];if(!d)throw Error('Objet inconnu.');const rarity=hasRarity(type)?rollRarity(rng):null;
 return {id:globalThis.crypto.randomUUID(),type,rank:0,purchasePrice:d.price??0,...(rarity?{rarity}:{}),stats:rarity?rarityStats(type,rarity):Object.fromEntries(Object.entries(d.rolls).map(([k,v])=>[k,v[0]]))};
}
export const RECIPES={
 'bracelet-majestueux':{name:'Bracelet majestueux en Diamanite',output:'bracelet-majestueux',resources:{'plume-malefique':1,'ecaille-rouge':1,'touffe-poils':1,'flocon-eternel':1,'pierre-precieuse-usee':1,'roche-magmatique':1}},
 'ceinture-pierre':{name:'Ceinture ancienne en pierre',output:'ceinture-pierre',resources:{'pierre-precieuse-usee':3}},
 'boucles-slime':{name:'Boucles d’oreilles modèle Slime',output:'boucles-slime',resources:{'gelee-slime':5},consumables:{'potion-soin':3}},
 'ceinture-enflammee':{name:'Ceinture enflammée',output:'ceinture-enflammee',resources:{'roche-magmatique':1,'plume-enflammee':1}},
 'collier-os':{name:'Collier d’os',output:'collier-os',resources:{'plume-malefique':1,os:3}},
 'amulette-force':{name:'Amulette de force',output:'amulette-force',resources:{'fragment-neant':1,'ecaille-rouge':2}},
 'bracelet-chance':{name:'Bracelet de chance',output:'bracelet-chance',resources:{'fragment-neant':1,'flocon-eternel':1}},
 'couronne-vitalite':{name:'Couronne de vitalité',output:'couronne-vitalite',resources:{'fragment-neant':1,'pierre-precieuse-usee':2}},
 'bague-vitesse':{name:'Bague de vitesse',output:'bague-vitesse',resources:{'fragment-neant':1,'touffe-poils':1}},
 'collier-presages':{name:'Collier des présages',output:'collier-presages',resources:{'plume-malefique':2,'pierre-precieuse-usee':1},equipment:'veste'},
 'potion-soin':{name:'Potion de soin',output:'potion-soin',resources:{'gelee-slime':3,'ecaille-rouge':1}}
};
export function craftCandidates(s,recipe){const d=RECIPES[recipe];return d?.equipment?s.items.filter(i=>i.type===d.equipment&&!Object.values(s.equipped).includes(i.id)):[];}
export function craftReady(s,recipe,ingredientId=null){
 const d=RECIPES[recipe];return !!(s.hero&&!s.battle&&!s.storyScene&&d&&Object.entries(d.resources).every(([k,n])=>resourceQuantity(s,k)>=n)&&Object.entries(d.consumables??{}).every(([k,n])=>s.items.filter(i=>i.type===k).length>=n)&&(!d.equipment||craftCandidates(s,recipe).some(i=>i.id===ingredientId)));
}
export function craft(s,recipe,ingredientId=null,rng=Math.random){
 if(!craftReady(s,recipe,ingredientId))throw Error('Fabrication impossible : vérifiez les ingrédients et, si nécessaire, choisissez une veste non équipée.');
 const d=RECIPES[recipe],item=createItem(d.output,rng); // Validate and generate before consuming anything.
 for(const [k,n]of Object.entries(d.resources)){s.resources[k]-=n;if(!s.resources[k])delete s.resources[k];}
 for(const [type,n]of Object.entries(d.consumables??{})){let remaining=n;s.items=s.items.filter(i=>i.type!==type||remaining--<=0);}
 if(d.equipment)s.items=s.items.filter(i=>i.id!==ingredientId);
 s.items.push(item);if(!ITEMS[item.type].consumable)recordAchievement(s,'crafted');return item;
}
export const equippedItem=(s,slot)=>s.items.find(i=>i.id===s.equipped[slot]);
export const equippedAccessories=s=>['accessory','accessory2'].map(slot=>equippedItem(s,slot)).filter(Boolean);
export const accessoryOf=(s,type)=>equippedAccessories(s).find(i=>i.type===type);
export const bowPassiveActive=i=>!!i&&(ITEMS[i.type]?.family??i.type)==='arc'&&rarityIndex(i)>=2;
export const omenRate=s=>accessoryOf(s,'collier-presages')?.stats.omen??0;
const rarityIndex=i=>RARITIES.indexOf(itemRarity(i));
export const resourceDropBonus=s=>accessoryOf(s,'echarpe-aventurier')?2*(rarityIndex(accessoryOf(s,'echarpe-aventurier'))+1):0;
export const resourceDropChance=(s,type)=>TRAINING_BESTIARY[type]?Math.min(1,Number((TRAINING_BESTIARY[type].dropChance+resourceDropBonus(s)/100).toFixed(8))):0;
export const fireballPercent=s=>120+(s.hero?.key==='stibili'&&accessoryOf(s,'bracelet-boule-feu')?10*(rarityIndex(accessoryOf(s,'bracelet-boule-feu'))+1):0);
export const majesticBracelet=s=>!!accessoryOf(s,'bracelet-majestueux');
export const actionAlreadyUsed=(s,id)=>majesticBracelet(s)&&!!s.battle?.usedActions?.includes(id);
export const potionHealPercent=s=>accessoryOf(s,'boucles-slime')?15:ITEMS['potion-soin'].healPercent;
export function itemPassiveText(i){
 if((ITEMS[i.type]?.family??i.type)==='arc')return (bowPassiveActive(i)?'':'Super rare et Légendaire : ')+'Chaque frappe critique déclenchée par la Chance ajoute 3 % de dégâts d’attaque, cumulables jusqu’à la fin du combat.';
 if(isAstral(i))return astralPassiveText(i);
 if(i.type==='bracelet-majestueux')return `Toutes les statistiques +${i.stats.allStatsPercent} %, équipements compris. Seuls les dégâts de l’attaque de base sont réduits de 50 %. Choisissez deux actions différentes par tour : impossible de choisir deux fois la même action. Les répétitions automatiques de Vitesse restent possibles. Les potions ne consomment aucune action.`;
 if(i.type==='ceinture-pierre')return `Au début du combat, gagnez un bouclier de ${i.stats.stoneShieldPercent} % des PV max. Gagnez un second bouclier de ${i.stats.stoneShieldPercent} % la première fois que vos PV tombent à 50 % ou moins. Ce second déclenchement est unique, même après un soin. Les boucliers restent jusqu’à absorption ou dissipation.`;
 if(i.type==='boucles-slime')return 'Vos potions soignent 15 % des PV max au lieu de 20 % et renforcent de 40 % votre prochaine attaque de base ou compétence offensive. Une action non offensive annule ce bonus. Non cumulable. Après une victoire en Expédition ou dans une salle encore récompensée de la Fissure, 4 % de chances de gagner une Potion de soin. Effet identique à toutes les raretés.';
 if(i.type==='armure-magique-diamanite')return rarityIndex(i)>=2?'Réduit tous les dégâts subis de 2 %.':'Super rare et Légendaire : réduit tous les dégâts subis de 2 %.';
 if(i.type==='armure-complete')return (i.rarity==='legendary'?'Augmente les PV max, les dégâts, la Chance et la Vitesse de Wolffy de 2 %, après les points de statistiques et les équipements, avant le combat.':'Légendaire : augmente les PV max, les dégâts, la Chance et la Vitesse de Wolffy de 2 %, après les points de statistiques et les équipements, avant le combat.')+' Wolffy porte son armure tant que cet objet est équipé.';
 if(i.type==='ceinture-enflammee')return `Au début du combat, retire une compétence active débloquée au hasard jusqu’à la fin du combat, puis augmente les dégâts du compagnon de ${i.stats.flameDamage} %. L’attaque de base et les passifs restent disponibles. Sans compétence active débloquée, le bonus s’applique seul.`;
 if(i.type==='collier-os')return `Une fois par combat, au début d’un tour à 30 % de PV max ou moins, invoque gratuitement un Squelette chétif avec ${i.stats.bonePower} % des dégâts et ${i.stats.bonePower} % des PV max du compagnon avant le combat. Il attaque après le compagnon, sans critique, double action ni bonus d’allié. Les ennemis peuvent cibler le compagnon ou le squelette ; la Larve conserve sa priorité de protection.`;
 const trial=Object.values(TRIALS).find(d=>d.orb===i.type);if(trial)return trial.effect;
 const percentStat={"amulette-force":['dmgPercent','les dégâts'],"bracelet-chance":['luckPercent','la Chance'],"couronne-vitalite":['vitalityPercent','les PV max'],"bague-vitesse":['speedPercent','la Vitesse']}[i.type];
 if(percentStat)return `Augmente ${percentStat[1]} de ${i.stats[percentStat[0]]} %, après les bonus des équipements et des points de statistiques.`;
 if(i.type==='collier-presages')return `Chaque perte de PV due à des dégâts ajoute ${i.stats.omen} points de chance de Riposte, puis tente une riposte à 40 % des dégâts d’attaque. Les cumuls restent jusqu’au déclenchement, qui les consomme tous. Sans critique ni double action. Brûlures et poisons inclus ; sacrifices exclus. Les dégâts périodiques ciblent un ennemi vivant si leur source est absente. Fin des cumuls en fin de combat.`;
 if(i.type==='grimoire-dore')return 'Débloque Foudroiement tant que ce grimoire est équipé. Au camp, extraire son essence détruit le livre sans gain d’or et apprend définitivement la compétence à Stibili.';
 if(ITEMS[i.type]?.family==='arbalete')return 'Ajoute 1 dégât par tranche complète de 4 points de statistiques investis en Chance. La Chance de base et celle des équipements ne comptent pas. Identique à toutes les raretés.';
 if(i.type==='bracelet-boule-feu')return 'Augmente les dégâts de base de la compétence « Boule de feu ».';
 if(i.type==='echarpe-aventurier')return 'Augmente la chance d’obtenir des ressources.';
 return '';
}
export const SKILLS={
 ...FORGEUR_SKILLS,
 ...MASTERY_SKILLS,
 larve:{name:'Larve du Néant',owner:'stibili',level:1,unlockChapter2:3,cd:0,effect:'larve'},
 foudroiement:{name:'Foudroiement',owner:'stibili',level:1,requiresItem:'grimoire-dore',cd:3,effect:'foudroiement'},
 fury:{name:'Fury',owner:'wolffy',level:3,cd:6,effect:'fury'},
 precision:{name:'Précision',owner:'drunn',level:3,cd:6,effect:'precision'},
 courage:{name:'Courage',owner:'nahat',level:3,cd:7,effect:'courage'},
 puissance:{name:'Puissance',owner:'stibili',level:6,cd:0,effect:'puissance'},
 ouragan:{name:'Ouragan',owner:'stibili',level:1,cd:0,effect:'ouragan'},
 redressement:{name:'Redressement',owner:'kaerune',level:3,cd:0,effect:'redressement'},
 matriarche:{name:'Grande matriarche',owner:'kaerune',level:5,cd:0,automatic:true,transformChance:.49,effect:'matriarche'},
 epine:{name:'Pour l’Épine !',owner:'nahat',level:6,cd:1,effect:'epine'},
 meute:{name:'Appel de la meute',owner:'wolffy',level:6,cd:3,effect:'meute'},
 pret:{name:'Salve de flèches',owner:'drunn',level:6,cd:4,effect:'pret'},
 feu:{name:'Boule de feu',owner:'stibili',level:3,cd:3,effect:'feu'},
 refus:{name:'Refus de mourir',owner:'nahat',level:9,cd:0,automatic:true,effect:'refus'},
 envol:{name:'Envol',owner:'kaerune',level:9,cd:2,effect:'envol'},
 nuageux:{name:'Nuageux',owner:'wolffy',level:9,cd:2,waitTurns:2,effect:'nuageux'},
 tircharge:{name:'Tir chargé',owner:'drunn',level:9,cd:0,effect:'tircharge'},
 attraction:{name:'Attraction',owner:'stibili',level:1,unlockStage:3,cd:5,effect:'attraction'},
 detresse:{name:'L’appel de détresse',owner:'kaerune',level:12,cd:0,automatic:true,effect:'detresse'},
 souffle:{name:'Dernier souffle',owner:'kaerune',level:16,cd:0,effect:'souffle'},
 saut:{name:'Saut',owner:'wolffy',level:12,cd:5,effect:'saut'},
 crocs:{name:'Crocs nuageux',owner:'wolffy',level:16,cd:3,effect:'crocs'},
 toxic:{name:'Flèche toxique',owner:'drunn',level:12,cd:0,effect:'toxic'},
 fumee:{name:'Écran de fumée',owner:'drunn',level:16,cd:0,effect:'fumee'},
 soin:{name:'Soin, soin et SOIN !',owner:'stibili',level:11,cd:0,effect:'soin'},
 elementaire:{name:'Sacrifice élémentaire',owner:'stibili',level:15,cd:0,effect:'elementaire'},
 navigatrice:{name:'Pour notre Navigatrice',owner:'nahat',level:12,cd:1,effect:'navigatrice'},
 rebecca:{name:'Dague de Rebecca',owner:'nahat',level:12,cd:0,ephemeral:true,extraAction:true,effect:'rebecca'},
 sacrifice:{name:'Sacrifice pour l’Épine',owner:'nahat',level:16,cd:2,effect:'sacrifice'},
 glacier:{name:'Glacier',owner:'stibili',level:9,cd:5,effect:'glacier'}
};
export const STAT_GAINS={hp:2,dmg:1,luck:.5,speed:.5};
export const RECOMMENDED={forgeur:'hp',nahat:'hp',kaerune:'speed',drunn:'luck',stibili:'dmg'};
export const emptyAllocation=()=>({hp:0,dmg:0,luck:0,speed:0});

export const pointsAtLevel=level=>level>=2&&level<=MAX_LEVEL?4:0;
export const earnedPoints=level=>4*Math.max(0,Math.min(MAX_LEVEL,Math.floor(level))-1);
export const remainingPoints=s=>s.hero?Math.max(0,earnedPoints(s.hero.level)-Object.values(s.hero.allocated??emptyAllocation()).reduce((a,b)=>a+b,0)):0;
export function allocateStats(s,distribution){
 if(!s.hero||s.battle)throw Error('Répartissez vos points au camp.');
 if(!distribution||typeof distribution!=='object'||Array.isArray(distribution))throw Error('Répartition invalide.');
 let spent=0;for(const [k,n]of Object.entries(distribution)){if(!Object.hasOwn(STAT_GAINS,k)||!Number.isSafeInteger(n)||n<0)throw Error('Répartition invalide.');spent+=n;}
 if(!spent||spent>remainingPoints(s))throw Error('Pas assez de points disponibles.');
 s.hero.allocated??=emptyAllocation();for(const [k,n]of Object.entries(distribution))s.hero.allocated[k]+=n;
 return spent;
}
export const reforgePrice=s=>s.hero?.level>=10?100+5*(s.hero.level-10):0;
export function reforgeStats(s){
 if(!s.hero||s.battle||s.storyScene)throw Error('Reforgez vos points au camp, hors combat.');
 const refunded=Object.values(s.hero.allocated??emptyAllocation()).reduce((a,b)=>a+b,0),cost=reforgePrice(s);
 if(!refunded)throw Error('Aucun point investi à reforger.');
 if(s.gold<cost)throw Error(`Il vous manque ${cost-s.gold} or pour reforger vos points.`);
 s.gold-=cost;s.hero.allocated=emptyAllocation();return {refunded,cost};
}
export const PASSIVES={
 forgeur:FORGEUR_PASSIVE,
 stibili:{name:'Accumulation',text:'Chaque compétence effectivement lancée ajoute 8 points de pourcentage à la prochaine attaque de base : 100 %, 108 %, 116 %… Les répétitions de compétences par la vitesse comptent. La première frappe de base consomme toute l’accumulation ; sa répétition éventuelle revient à 100 %. Les potions ne comptent pas. Transmutation élémentaire et Sacrifice élémentaire consomment les cumuls existants sans en ajouter. Réinitialisation en fin de combat.'},
 kaerune:{name:'L’ordre Kaerune',text:'Tous les 4 points de répartition investis en vitesse donnent +1 dégât permanent. Les fractions sont conservées jusqu’au prochain groupe de 4. La vitesse des équipements et des effets temporaires ne compte pas dans cette conversion.'},
 wolffy:{name:'Acharnement',text:'Sous 49 % des PV max : dégâts, chance et vitesse +15 %. Le bonus disparaît dès que les PV remontent à 49 % ou plus. Les effets qui annulent la chance et la vitesse restent prioritaires.'},
 drunn:{name:'Analyse',text:'15 % de chances d’esquiver chaque attaque ou compétence offensive provenant d’un ennemi qui possède un bonus positif actif. Un malus seul, comme une brûlure, ne déclenche rien. La probabilité disparaît dès que le bonus de cet attaquant prend fin ; elle ne protège pas des autres ennemis.'},
 nahat:{name:'Mes armes : Mes choix',text:'Protège-bras : l’attaque de base ignore les dégâts d’attaque de Nahat et utilise à la place 3,5 % de ses PV max. Les compétences conservent leurs formules.\nLame-sabre : gagne des dégâts égaux à 25 % des PV bonus issus des points investis et des équipements, arrondis à l’inférieur, sans perdre ces PV. Les PV naturels et ceux gagnés par niveau ne comptent pas.\nÉpée et bouclier : après chaque quatrième attaque ou compétence offensive ennemie subie, riposte à 55 % des dégâts d’attaque (4e, 8e, 12e attaque, etc.). Une compétence à plusieurs impacts compte une seule fois. Les attaques annulées ou esquivées ne comptent pas. La riposte ne peut ni être critique ni être répétée par la Vitesse. Aucun effet sans arme équipée.'}
};
export const acharnement=s=>s.hero?.key==='wolffy'&&!!s.battle&&s.battle.hp/s.battle.maxHp<.49;
export const basicMultiplier=s=>s.hero?.key==='stibili'?1+.08*(s.battle?.accumulation??0):s.hero?.key==='wolffy'&&s.battle?.cloudStrike?1.5:1;
export const battleAllies=b=>[...(b?.larva?[b.larva]:[]),...(b?.pups??[]),...(b?.bone?[b.bone]:[])];
export const battleUnit=(b,id)=>id==='hero'?b:battleAllies(b).find(a=>a.id===id)??b.enemies.find(e=>e.id===id);
export const livingPups=b=>(b?.pups??[]).filter(p=>p.hp>0);
function makeWolfPup(base,index,s){const crystal=astralActive(equippedItem(s,'weapon'),'cristal-astral'),armor=astralActive(equippedItem(s,'armor'),'armure-complete-astral')?1.15:1;const hp=Math.max(1,Math.round(base.hp*(crystal?.5:.35)*armor));return {id:'wolf-pup-'+index,name:'Bébé Wolffy',art:'bebe-wolffy',hp,maxHp:hp,dmg:Math.max(1,Math.round(base.dmg*(crystal?.75:.5)*armor)),burning:false,isPup:true};}
export const BASIC_VARIANCE=3;
export const basicAttackPower=s=>nahatWeaponFamily(s)==='protege-bras'?(s.battle?.maxHp??stats(s).hp)*.035:combatStats(s).dmg;
export function basicDamageRange(s){const center=Math.round(basicAttackPower(s)*basicMultiplier(s)),variance=nahatWeaponFamily(s)==='protege-bras'?0:BASIC_VARIANCE;return [Math.max(1,center-variance),Math.max(1,center+variance)].map(n=>Math.max(1,Math.round(n*(majesticBracelet(s)?.5:1)*(equippedItem(s,'orb')?.type==='orbe-contrecoup'?1.2:equippedItem(s,'orb')?.type==='orbe-brasier'&&s.battle?.hp<s.battle?.maxHp*.35?1.25:equippedItem(s,'orb')?.type==='orbe-echo'?.8:equippedItem(s,'orb')?.type==='orbe-cycle'&&s.battle?.previousOffense?(s.battle.previousOffense==='basic'?.85:1.2):1))));}
// Beneficial timed effects and permanent Power are separate from debuffs such as burn.
export const enemyBoosted=(e,round)=>!!(e.hp>0&&(shieldTotal(e,round)>0||e.riftKind==='saw'&&e.rift.step>0||e.lanternWard||e.frostGuard||e.forestBoost||e.parry||e.guardian==='brasier'&&e.hp<e.maxHp*.35||e.rift?.ward||e.powerBonus>0||e.aura||((e.wingsUntil??0)>=round)||(e.rageStacks??0)>0||Object.values(e.buffs??{}).some(effect=>effect.beneficial===true&&(effect.until==null||effect.until>=round))));
export const smokeActive=s=>s.hero?.key==='drunn'&&!!s.battle&&(s.battle.smokeUntil??0)>=s.battle.round;
export const dodgeChance=(s,e)=>s.hero?.key==='drunn'&&s.battle?(enemyBoosted(e,s.battle.round)?.15:0)+(smokeActive(s)?.22:0):0;
export const crocsPercent=s=>80+7*(s.battle?.fangStacks??0);
export const elementalMissing=s=>['feu','glacier','ouragan'].filter(id=>!s.battle?.elementalUsed?.[id]);
export const lastBreathReady=s=>s.hero?.key==='kaerune'&&s.battle?.lastBreathTurn===s.battle?.round;
// All combat healing, including objects and automatic transformations, shares this gate.
export function healHero(s,amount,alreadyScaled=false){const b=s.battle;if(!b||b.hp<=0||b.unhealable)return 0;const restored=Math.max(0,Math.min(b.maxHp-b.hp,Math.round(amount*(alreadyScaled?1:(equippedItem(s,'orb')?.type==='orbe-brasier'?.6:1)))));b.hp+=restored;return restored;}

// Current harmful hero states; scenario locks and skill costs are not dispellable effects.
export function cleanseHero(b){b.roxxorWeakened=false;b.burning=!!b.eternalFlames;b.snakePoison=false;b.sandUntil=0;b.cobraBurnStacks=0;b.unhealable=!!(b.refusSuccess||b.distressUsed);b.riftFissures={};b.riftAttraction={};}

export function enemyDamage(s,e){return Math.max(1,Math.round((e.dmg+(e.type==='corkbeau'&&!e.storyKind?Math.min(s.battle.maxHp*.02,e.dmg*.5):0))*((e.weakenedUntil??0)>=s.battle.round?.85:1)));}
export const ENEMIES={
 ...EXPEDITION_ENEMIES,
 slime:{name:'Slime de combat',art:'slime',hp:134,dmg:22},
 dog:{name:'Chien sauvage',art:'chien-sauvage',hp:116,dmg:26},
 corkbeau:{name:'Corkbeau',art:'corkbeau',hp:108,dmg:24},
 dragonnet:{name:'Dragonnet rouge',art:'dragonnet-rouge',hp:112,dmg:22},
 bandit:{name:'Bandit',art:'bandit',hp:110,dmg:28},
 icewolf:{name:'Loup de glace à l’épée',art:'loup-glace-epee',hp:150,dmg:28},
 drannex:{name:'Drannex',art:'drannex',hp:160,dmg:22,boss:true},
 forest:{name:'Enfant de la forêt',art:'enfant-foret',hp:96,dmg:0,healer:true}
};
export const RESOURCES={
 'touffe-poils':{name:'Touffe de poils',art:'touffe-poils',buyPrice:100,sellPrice:7},
 'flocon-eternel':{name:'Flocon éternel',art:'flocon-eternel',buyPrice:100,sellPrice:10},
 'roche-magmatique':{name:'Roche magmatique',art:'roche-magmatique',buyPrice:100,sellPrice:10},
 'plume-enflammee':{name:'Plume enflammée',art:'plume-enflammee',buyPrice:100,sellPrice:10},
 os:{name:'Os',art:'os',buyPrice:100,sellPrice:5},
 'fragment-neant':{name:'Fragment du Néant',art:'fragment-neant',sellPrice:70},
 'ecaille-rouge':{name:'Écaille rouge',art:'ecaille-rouge',buyPrice:100,sellPrice:11},
 'pierre-precieuse-usee':{name:'Pierre précieuse usée',art:'pierre-precieuse-usee',buyPrice:100,sellPrice:5},
 'fragment-glace-eternel':{name:'Fragment de glace éternel',art:'fragment-glace-eternel',buyPrice:150,sellPrice:40},
 'plume-malefique':{name:'Plume maléfique',art:'plume-malefique',buyPrice:100,sellPrice:7},
 'gelee-slime':{name:'Gelée de slime',art:'gelee-slime',buyPrice:100,sellPrice:2}
};
const RESOURCE_LIMIT=99;
export const TRAINING_BESTIARY={
 ...EXPEDITION_BESTIARY,
 slime:{weight:1,tag:'Soutien',drop:'gelee-slime',dropChance:.40,skills:[{name:'Puissance',text:'Augmente les dégâts de 10 à 12 % jusqu’à la fin du combat. Renforce un allié vivant au hasard s’il en a un, sinon lui-même. Une seule utilisation.'}]},
 dog:{weight:1,tag:'Équilibré',drop:'touffe-poils',dropChance:.15,skills:[{name:'Morsure',text:'Utilise uniquement son attaque de base. Un adversaire équilibré.'}]},
 corkbeau:{weight:1,tag:'Charognard',drop:'plume-malefique',dropChance:.15,skills:[{name:'Bec charognard',text:'Ses attaques ajoutent des dégâts égaux à 2 % des PV max du compagnon, plafonnés à 50 % de ses propres dégâts. Les compagnons très robustes subissent davantage de dégâts.'}]},
 dragonnet:{weight:1,tag:'Feu',drop:'ecaille-rouge',dropChance:.15,skills:[{name:'Boule de feu',text:'Inflige 120 % de ses dégâts de base. Possède 10 % de chances de brûler : perte de 5 % des PV max au début de chaque tour, jusqu’à la fin du combat. Récupération : 3 tours. Utilisée dès qu’elle est disponible.'},{name:'Dernier brasier',text:'À sa mort, explose et inflige 7 % des PV max du compagnon, arrondis au supérieur. Ignore réduction et esquive. Si le compagnon tombe à 0 PV, le combat est perdu, sans récompense. Gardez assez de PV avant de l’achever !'}]},
 bandit:{weight:1,tag:'Toujours en duo',drop:'pierre-precieuse-usee',dropChance:.15,skills:[{name:'Embuscade',text:'Les bandits attaquent toujours à deux. Chacun est moins résistant et frappe moins fort qu’un adversaire seul. Chaque bandit vivant porte une attaque de base à son tour. Choisissez votre cible pour réduire rapidement leur nombre.'}]},
 icewolf:{weight:1,tag:'Glace',drop:'fragment-glace-eternel',dropChance:.15,goldBonus:.30,skills:[{name:'Glacier',text:'Inflige 135 % de ses dégâts de base. Une seule utilisation par combat, lors de sa première action.'},{name:'Escrime',text:'Après Glacier, frappe de 1 à 4 fois au hasard. Chaque coup inflige 33 % de ses dégâts de base ; chaque nombre de coups a la même probabilité.'}],rewardText:'Victoire : +30 % d’or, après le bonus de progression des expéditions. Le total est arrondi à l’entier supérieur.'}
};
export function resourceOrigin(type){
 if(type==='fragment-neant')return 'Récompense de la Fissure du Néant : première victoire aux étages 10, 20, 30, 40 et 50.';
 const names=[...new Set(Object.values(EXPEDITIONS).flatMap(zone=>zone.kinds).filter(kind=>TRAINING_BESTIARY[kind]?.drop===type).map(kind=>ENEMIES[kind].name))];
 return names.length?'Créature'+(names.length>1?'s':'')+' : '+names.join(' · ')+'.':'Disponible en boutique.';
}
export function trainingEncounter(rng=Math.random,zone='forest'){return expeditionEncounter(zone,rng);}
// Each adventure retains one unresolved encounter per expedition, independently.
function pendingExpedition(s,zone){const pending=s.expeditionEncounters?.[zone];return pending&&EXPEDITIONS[zone]?.kinds.includes(pending.type)?pending:null;}
export function retreatBattle(s){
 const b=s.battle;
 if(b?.mode==='training'){
  const zone=b.expedition??expeditionFor(b.enemies[0]?.type),pool=EXPEDITIONS[zone].kinds;
  // Adopt battles saved before persistent encounters were introduced.
  if(!pendingExpedition(s,zone))(s.expeditionEncounters??={})[zone]={type:pool.includes(b.trainingEncounter)?b.trainingEncounter:pool.find(type=>b.enemies.some(e=>e.type===type))??pool[0],golden:!!b.goldenEncounter,levelOffset:Math.max(-1,Math.min(1,b.level-(b.expeditionEntryLevel??s.hero.level)))};
 }
 s.battle=null;
}

export const resourceQuantity=(s,type)=>Object.hasOwn(RESOURCES,type)?Math.min(RESOURCE_LIMIT,Math.max(0,Math.floor(Number(s.resources?.[type])||0))):0;
export const resourceTotal=s=>Object.keys(RESOURCES).reduce((n,type)=>n+resourceQuantity(s,type),0);
export function buyResource(s,type){
 const d=RESOURCES[type];
 if(!s.hero||s.battle||s.storyScene||!d?.buyPrice)throw Error('Ressource indisponible à l’achat.');
 const held=resourceQuantity(s,type);
 if(held>=RESOURCE_LIMIT)throw Error('Stock maximum atteint pour cette ressource.');
 if(s.gold<d.buyPrice)throw Error('Or insuffisant.');
 s.resources??={};s.resources[type]=held+1;s.gold-=d.buyPrice;recordAchievement(s,'spent',d.buyPrice);return d;
}
export function sellResource(s,type,quantity=1){
 if(!s.hero||s.battle||s.storyScene)throw Error('Vendez vos ressources au camp.');
 if(!Object.hasOwn(RESOURCES,type)||!Number.isSafeInteger(quantity)||quantity<1||quantity>resourceQuantity(s,type))throw Error('Quantité de ressource indisponible.');
 const gold=RESOURCES[type].sellPrice*quantity;s.resources[type]-=quantity;
 if(!s.resources[type])delete s.resources[type];s.gold+=gold;return gold;
}
function collectResources(s,enemies,rng){
 const collected={};s.resources??={};
 for(const enemy of enemies){
  const entry=!enemy.storyKind&&TRAINING_BESTIARY[enemy.type];
  if(!entry?.drop||enemy.noReward||enemy.hp>0||rng()>=resourceDropChance(s,enemy.type))continue;
  const count=resourceQuantity(s,entry.drop);if(count>=RESOURCE_LIMIT)continue;
  s.resources[entry.drop]=count+1;recordMonsterDrop(s,entry.drop);collected[entry.drop]=(collected[entry.drop]??0)+1;
 }
 return Object.entries(collected).map(([type,quantity])=>({type,quantity}));
}
export const LABELS={flameDamage:'% de dégâts en combat',bonePower:'% des statistiques de l’invocation',hp:'PV',dmg:'Dégâts',luck:'Chance',speed:'Vitesse',dmgPercent:'% de dégâts',luckPercent:'% de Chance',speedPercent:'% de Vitesse',vitalityPercent:'% de PV max après bonus',hpPercent:'% de PV max',omen:'% de Riposte par impact subi'};
export const rngInt=(a,b,rng=Math.random)=>a+Math.floor(rng()*(b-a+1));

export const fresh=()=>({forgeurStoryVersion:FORGEUR_STORY_VERSION,profile:newProfile(),forge:{unlocked:false,itemId:null},achievements:newAchievements(),version:1,progressionVersion:1,nahatStoryVersion:1,drunnStoryVersion:1,balanceVersion:BALANCE_VERSION,hero:null,gold:0,items:[],resources:{},equipped:{weapon:null,armor:null,accessory:null,accessory2:null,orb:null},cleared:0,rift:{cleared:0},missions:{forest:false},battle:null,storyScene:null,wolffyStory:{cemetery:0},stibiliChapter2:{cleared:0,voidForm:false}});
export function migrateBalance(s){
 // One release migration per adventure, including inactive duplicate Forgeurs.
 // Profile unlock and adventure identity survive; no other companion is reset.
 if(s.hero?.key==='forgeur'&&s.forgeurStoryVersion!==FORGEUR_STORY_VERSION){
  const played=s.hero.level>1||s.hero.xp>0||s.gold>0||s.items?.length>0||s.cleared>0||s.battle||s.storyScene||Object.values(s.hero.allocated??{}).some(Boolean)||Object.values(s.resources??{}).some(Boolean)||s.rift?.cleared>0||['wins','spent','goldBought','crafted','astralStars','astralWeapons','astralArmors'].some(k=>(s.achievements?.[k]??0)>0)||s.achievements?.claimed?.length>0||s.achievements?.unlockedByCode?.length>0||Object.values(s.achievements?.monsterDrops??{}).some(Boolean)||s.trials?.claimed||s.forge?.unlocked;
  if(played){
   const identity={...(s.adventureId?{adventureId:s.adventureId}:{}),...(s.adventureNumber?{adventureNumber:s.adventureNumber}:{})};
   const profile=s.profile??newProfile();profile.unlocks??={};profile.unlocks.forgeur=true;
   const clean=fresh();clean.profile=profile;summon(clean,'forgeur');
   for(const key of Object.keys(s))delete s[key];Object.assign(s,clean,identity,{forgeurResetNotice:true});
  }else s.forgeurStoryVersion=FORGEUR_STORY_VERSION;
  migrateBalance(s);return true;
 }

 const legacyAstralAchievements=s.achievements?.version!==2;
 let traversalChanged=ensureAchievements(s);
 if(legacyAstralAchievements){for(const item of (s.items??[]).filter(isAstral)){recordAchievement(s,ITEMS[item.type].slot==='weapon'?'astralWeapons':'astralArmors');if(item.stars?.some(Boolean))recordAchievement(s,'astralStars');}}
 normalizeForge(s);
 if(s.battle?.mode==='forest'){s.battle=null;traversalChanged=true;}
 if(s.battle?.ascended){const b=s.battle,ratio=b.hp/b.maxHp;delete b.ascended;delete b.cooldowns.ascension;b.maxHp=stats(s).hp;b.hp=Math.max(1,Math.round(b.maxHp*ratio));traversalChanged=true;}
 const hadFixedProgression=s.progressionVersion===1;
 let rarityChanged=false,guardsChanged=false,equippedGuardChanged=false,chapterChanged=false,stibiliChanged=false,progressionChanged=false,trainingChanged=false;
 if(!s.rift){s.rift={cleared:0};chapterChanged=true;}
 if(!s.stibiliChapter2){s.stibiliChapter2={cleared:0,voidForm:false};chapterChanged=true;}
 s.resources=Object.fromEntries(Object.keys(RESOURCES).map(type=>[type,resourceQuantity(s,type)]).filter(([,n])=>n>0));
 const old=s.hero?.key;let changed=s.balanceVersion!==BALANCE_VERSION;
 if(LEGACY_KEYS[old]){s.hero.key=LEGACY_KEYS[old];changed=true;}
 if(s.hero?.key==='nahat'&&s.nahatStoryVersion!==1){s.nahatLegacyCleared=s.cleared??0;s.cleared=0;s.nahatStoryVersion=1;if(s.battle?.mode==='world')s.battle=null;s.storyScene=null;chapterChanged=true;}
 // Replace Drunn’s former generic encounters, retaining all earned power and shop access.
 if(s.hero?.key==='drunn'&&s.drunnStoryVersion!==1){s.drunnLegacyCleared=s.cleared??0;s.cleared=0;s.drunnStoryVersion=1;if(s.battle?.mode==='world')s.battle=null;s.storyScene=null;chapterChanged=true;}
 if(s.hero&&!s.hero.allocated){s.hero.allocated=emptyAllocation();changed=true;}
 for(const item of s.items){
  if(item.type==='massue'){item.type='marteau';changed=true;}
  if(old==='darunk'&&item.type==='griffe')item.type='dague';
  if(old==='mink'&&item.type==='dague')item.type='griffe';
  if(item.type==='marteau'){item.type='epee-bouclier';changed=true;}
  if(item.type==='dague'){item.type='cristal';changed=true;}
  if(item.purchasePrice==null&&ITEMS[item.type]?.price&&!ITEMS[item.type].consumable){item.purchasePrice=({1:55,2:75,3:200,4:375,5:650}[equipmentLevel(item.type)]??ITEMS[item.type].price);changed=true;}
 }
 for(const item of s.items??[])if(hasRarity(item.type)&&!RARITIES.some(r=>r.id===item.rarity)){
  const exact=RARITIES.find(r=>JSON.stringify(rarityStats(item.type,r.id))===JSON.stringify(item.stats));
  item.rarity=exact?.id??'common';if(!exact)item.legacyRoll=true;rarityChanged=true;
 }
 // Apply the arm-guard rebalance to owned items as well as future purchases.
 for(const item of s.items)if(ITEMS[item.type]?.family==='protege-bras'){
  const next=rarityStats(item.type,itemRarity(item).id);
  if(item.stats.hpPercent!==next.hpPercent||item.type==='protege-bras-diamanite'&&Object.hasOwn(item.stats,'dmg')){item.stats=next;delete item.legacyRoll;guardsChanged=true;if(s.equipped.weapon===item.id)equippedGuardChanged=true;}
 }
 if(!Object.hasOwn(s.equipped,'accessory2')){s.equipped.accessory2=null;changed=true;}
 s.equipped.accessory??=null;s.equipped.orb??=null;
 if(s.items.some(i=>i.id===s.equipped.accessory&&i.type==='orbe-vie')){s.equipped.orb=s.equipped.accessory;s.equipped.accessory=null;changed=true;}
 if(s.hero?.key==='stibili'&&s.cleared>chapterSize(s)){s.cleared=chapterSize(s);changed=true;}
 s.missions??={forest:false};s.wolffyStory??={cemetery:0};s.storyScene??=null;
 if(s.battle&&((s.battle.mode==='world'&&s.battle.stage!==chapterCleared(s,s.battle.chapter??1)+1)||(s.battle.mode==='forest'&&s.missions.forest)))changed=true;
 if(changed){s.battle=null;s.storyScene=null;}
 // Replace a legacy Redressement preparation with the permanent effect, without replaying a turn.
 if(s.hero?.key==='kaerune'&&s.battle&&s.battle.redressement===undefined){
  const b=s.battle;b.redressement=!!(b.pending||Object.hasOwn(b.cooldowns??{},'redressement'));
  delete b.pending;if(b.cooldowns)delete b.cooldowns.redressement;changed=true;
 }
 // Upgrade active timers once, without resetting an ongoing battle.
 let combatChanged=false;
 if(s.battle&&!s.battle.durationVersion){
  const b=s.battle;
  for(const id of ['fury','precision','courage'])if((b.buffs?.[id]??0)>=b.round)b.buffs[id]++;
  for(const enemy of b.enemies??[])if(enemy.wingsUsed&&(enemy.wingsUntil??0)>=b.round)enemy.wingsUntil++;
  b.durationVersion=1;combatChanged=true;
 }
 if(s.battle?.story&&s.hero?.key==='wolffy'&&s.battle.stage===1){
  for(const enemy of s.battle.enemies??[])if(enemy.storyKind==='sword'&&enemy.maxHp!==100){enemy.maxHp=100;enemy.hp=Math.min(enemy.hp,100);combatChanged=true;}
  for(const enemy of s.battle.enemies??[])if(enemy.storyKind==='sword'&&!enemy.swordRegenVersion){
   enemy.dmg=Math.max(1,Math.round(enemy.dmg*.5));enemy.baseDmg=Math.max(1,Math.round((enemy.baseDmg??ENEMIES.slime.dmg)*.5));
   enemy.revivals=0;enemy.swordRegenVersion=1;combatChanged=true;
  }
 }
 if(equippedGuardChanged&&s.battle){
  const b=s.battle,previousMax=b.maxHp;b.maxHp=combatStats(s).hp;
  b.hp=b.hp<=0?0:Math.max(1,Math.min(b.maxHp,Math.round(b.hp*b.maxHp/previousMax)));
 }
 if(s.hero?.key==='stibili'&&s.battle&&(s.battle.stibiliBalanceVersion??0)<2){
  const b=s.battle;
  b.summonBase=b.summonBase?{...b.summonBase,dmg:Math.max(1,Math.round((b.summonBase.dmg*(b.stibiliBalanceVersion?1:.7)+.3*s.hero.allocated.dmg*statBreakdown(s).allStatMultiplier)*100)/100)}:{hp:stats(s).hp,dmg:stats(s).dmg};
  if(b.larva){const l=b.larva,oldMax=l.maxHp;l.maxHp=Math.max(1,Math.round(b.summonBase.hp*.35));l.dmg=Math.max(1,Math.round(b.summonBase.dmg*.5));l.hp=l.hp<=0?0:Math.max(1,Math.min(l.maxHp,Math.round(l.hp*l.maxHp/oldMax)));}
  b.stibiliBalanceVersion=2;stibiliChanged=true;
 }
 // Keep the build's proportions when removing legacy surplus points. No level, item or mission is reset.
 if(s.hero&&s.progressionVersion!==1){
  const h=s.hero,oldLevel=h.level;h.level=Math.min(MAX_LEVEL,h.level);if(h.level===MAX_LEVEL)h.xp=0;
  const keys=Object.keys(STAT_GAINS),spent=keys.reduce((sum,k)=>sum+h.allocated[k],0),budget=earnedPoints(h.level);
  const adjusted=spent>budget||oldLevel!==h.level;
  if(spent>budget){
   const shares=keys.map((k,i)=>({k,i,exact:h.allocated[k]*budget/spent}));
   for(const a of shares)h.allocated[a.k]=Math.floor(a.exact);
   const remainder=budget-keys.reduce((sum,k)=>sum+h.allocated[k],0);
   shares.sort((a,b)=>(b.exact-Math.floor(b.exact))-(a.exact-Math.floor(a.exact))||a.i-b.i);
   for(let i=0;i<remainder;i++)h.allocated[shares[i].k]++;
  }
  if(adjusted){
   s.progressionNotice=true;
   if(s.battle){
    const b=s.battle,oldMax=b.maxHp;b.maxHp=combatStats(s).hp;b.hp=b.hp<=0?0:Math.max(1,Math.min(b.maxHp,Math.round(b.hp*b.maxHp/oldMax)));
    b.summonBase={hp:stats(s).hp,dmg:stats(s).dmg};
    if(b.larva){const l=b.larva,previous=l.maxHp;l.maxHp=Math.max(1,Math.round(b.summonBase.hp*.35));l.hp=l.hp<=0?0:Math.max(1,Math.min(l.maxHp,Math.round(l.hp*l.maxHp/previous)));l.dmg=Math.max(1,Math.round(b.summonBase.dmg*.5));}
   }
  }
  s.progressionVersion=1;progressionChanged=true;
 }
 if(s.battle?.mode==='training'&&!s.battle.trainingBalanceVersion){
  const ratio=.861/(hadFixedProgression?.902:.82);
  for(const e of s.battle.enemies){const previousMax=e.maxHp;e.maxHp=Math.max(1,Math.round(e.maxHp*ratio));e.hp=e.hp<=0?0:Math.max(1,Math.min(e.maxHp,Math.round(e.hp*e.maxHp/previousMax)));e.dmg=Math.round(e.dmg*ratio);if(e.baseDmg!=null)e.baseDmg=Math.round(e.baseDmg*ratio);}
  s.battle.trainingBalanceVersion=1;trainingChanged=true;
 }
 // Apply the accessibility reduction once to saved training fights, preserving HP ratios and statuses.
 if(s.battle?.mode==='training'&&(s.battle.trainingBalanceVersion??0)<2){
  for(const e of s.battle.enemies){const previousMax=e.maxHp;e.maxHp=Math.max(1,Math.round(e.maxHp*.85));e.hp=e.hp<=0?0:Math.max(1,Math.min(e.maxHp,Math.round(e.hp*e.maxHp/previousMax)));e.dmg=Math.max(1,Math.round(e.dmg*.8));if(e.baseDmg!=null)e.baseDmg=Math.max(1,Math.round(e.baseDmg*.8));}
  s.battle.trainingBalanceVersion=2;trainingChanged=true;
 }
 // Raise the reduced training values once: +5% maximum health, +10% base damage.
 if(s.battle?.mode==='training'&&(s.battle.trainingBalanceVersion??0)<3){
  for(const e of s.battle.enemies){const previousMax=e.maxHp;e.maxHp=Math.max(1,Math.round(e.maxHp*1.05));e.hp=e.hp<=0?0:Math.max(1,Math.min(e.maxHp,Math.round(e.hp*e.maxHp/previousMax)));e.dmg=Math.max(1,Math.round(e.dmg*1.10));if(e.baseDmg!=null)e.baseDmg=Math.max(1,Math.round(e.baseDmg*1.10));}
  s.battle.trainingBalanceVersion=3;trainingChanged=true;
 }
 // All companions now use the same fixed bases, including previously rolled saves.
 const baseStatsVersion=['nahat','forgeur'].includes(s.hero?.key)?3:s.hero?.key==='wolffy'?1:2;
 if(s.hero&&(s.hero.baseStatsVersion!==baseStatsVersion||Object.hasOwn(s.hero,'iv'))){
  delete s.hero.iv;s.hero.baseStatsVersion=baseStatsVersion;
  if(s.battle){
   const b=s.battle,oldMax=b.maxHp;b.maxHp=combatStats(s).hp;
   b.hp=b.hp<=0?0:Math.max(1,Math.min(b.maxHp,Math.round(b.hp*b.maxHp/oldMax)));
   b.summonBase={hp:stats(s).hp,dmg:stats(s).dmg};
   if(b.larva){const l=b.larva,previous=l.maxHp;l.maxHp=Math.max(1,Math.round(b.summonBase.hp*.35));l.dmg=Math.max(1,Math.round(b.summonBase.dmg*.5));l.hp=l.hp<=0?0:Math.max(1,Math.min(l.maxHp,Math.round(l.hp*l.maxHp/previous)));}
  }
  changed=true;
 }
 // Convert an already used Demence into one summon, without rerolling a critical or replaying a turn.
 if(s.hero?.key==='wolffy'&&s.battle&&s.battle.packVersion!==1){
  const b=s.battle;b.packVersion=1;b.packUsed=!!b.demence;b.cloudStrike=false;
  b.summonBase??={hp:stats(s).hp,dmg:stats(s).dmg};b.pups=b.packUsed?[makeWolfPup(b.summonBase,0,s)]:[];
  delete b.demence;delete b.buffs.demence;delete b.buffApplied?.demence;delete b.cooldowns.demence;
  if(b.cooldowns.nuageux>=b.round)b.cooldowns.nuageux++;
  changed=true;
 }
 if(s.hero?.key==='wolffy'&&s.battle&&s.battle.packReworkVersion!==1){const b=s.battle;b.packReworkVersion=1;for(const p of livingPups(b).slice(2))p.hp=0;changed=true;}
 if(s.battle&&s.battle.advancedSkillsVersion!==1){
  const b=s.battle;b.advancedSkillsVersion=1;b.unhealable??=false;b.distressUsed??=false;b.lastBreathTurn??=0;b.fangStacks??=0;b.smokeUsed??=false;b.smokeUntil??=0;b.navigatorUsed??=false;b.elementalSacrificeUsed??=false;
  b.elementalUsed??={feu:b.cooldowns.feu!=null||b.log?.includes('Boule de feu !'),glacier:!!b.glacierUsed,ouragan:(b.hurricaneStacks??0)>0||b.log?.includes('Ouragan !')};changed=true;
 }
 // Upgrade ongoing fights without resetting progress or replenishing known spent heals.
 if(s.battle){const b=s.battle;
  if(b.healCharges===undefined){const casts=(b.log??[]).filter(t=>t==='Soin, soin et SOIN ! !').length;b.healCharges=Math.max(0,2-Math.max(casts,b.cooldowns?.soin!==undefined?1:0));b.healLastTurn=0;delete b.cooldowns.soin;combatChanged=true;}
  if(s.hero?.key==='stibili'&&b.mode==='world'&&b.chapter===2&&!b.voidBalanceVersion){
   for(const e of b.enemies){const ratio=e.hp/e.maxHp,hpFactor=b.stage===4?1:1.15,dmgFactor=b.stage===4?1.2:1.1;e.maxHp=Math.round(e.maxHp*hpFactor);e.hp=ratio>0?Math.max(1,Math.round(e.maxHp*ratio)):0;e.dmg=Math.round(e.dmg*dmgFactor);if(e.baseDmg!==undefined)e.baseDmg=Math.round(e.baseDmg*dmgFactor);}
   b.voidBalanceVersion=1;combatChanged=true;
  }
 }
 if(s.battle&&s.battle.encounterBalanceVersion!==1){const b=s.battle;
  if(b.mode==='training'){for(const e of b.enemies)scaleEncounter(e,EXPEDITION_BALANCE[e.type]);b.expeditionEntryLevel=s.hero.level;}
  if(b.storyKey==='nahat'&&b.stage===2)for(const e of b.enemies)scaleEncounter(e,e.storyKind==='nahatBear'?{hp:1.35,dmg:1}:{hp:1.1,dmg:1.1});
  b.encounterBalanceVersion=1;changed=true;
 }
 if(s.battle&&s.battle.playtestBalanceVersion!==1){const b=s.battle;
  if(b.mode==='world'&&b.chapter===2&&s.hero.key==='stibili')for(const e of b.enemies)scaleEncounter(e,{hp:1.25,dmg:1.25});
  if(b.mode==='rift')b.riftRewardXp=Math.round(b.riftRewardXp*.65);
  for(const e of b.enemies){if(e.type==='abyssfly'&&e.summonedBy)e.dmg=0;if(e.type==='lantern')e.lanternWard=b.enemies.some(a=>a.hp>0&&a.type==='abyssfly'&&a.summonedBy===e.id);}
  b.playtestBalanceVersion=1;changed=true;
 }
 if(s.battle&&s.battle.weaponChoiceVersion!==1){const b=s.battle;
  if(s.hero.key==='nahat'){const ratio=b.hp/b.maxHp;b.maxHp=stats(s).hp;b.hp=b.hp<=0?0:Math.max(1,Math.round(b.maxHp*ratio));b.summonBase={hp:stats(s).hp,dmg:stats(s).dmg};if(b.storyKey==='nahat'&&b.stage===3)for(const e of b.enemies)scaleEncounter(e,{hp:1.15,dmg:1.15});}
  b.plumesStacks??=0;b.weaponChoiceVersion=1;combatChanged=true;
 }
 const oldHp=s.battle?.maxHp;
 let accessoryRebalanced=false;
 for(const item of s.items)if(['bracelet-majestueux','ceinture-pierre'].includes(item.type)){const next=rarityStats(item.type,itemRarity(item).id);if(JSON.stringify(item.stats)!==JSON.stringify(next)){item.stats=next;accessoryRebalanced=true;changed=true;}}
 if(s.battle){const b=s.battle;if(accessoryRebalanced&&oldHp){const next=stats(s).hp;b.hp=b.hp>0?Math.max(1,Math.round(next*b.hp/oldHp)):0;b.maxHp=next;}
 if(b.lorePatchVersion!==1){if(b.storyKey==='nahat'&&b.stage===2)for(const e of b.enemies)if(e.storyKind==='nahatOrcs'){e.hp=Math.round(e.hp*228/e.maxHp);e.maxHp=228;}if(s.hero.key==='nahat')delete b.cooldowns.epine;b.epineStacks??=0;b.riposteCount??=0;b.lorePatchVersion=1;changed=true;}}
 if(s.battle&&s.battle.nahatSabreVersion!==1){const b=s.battle;if(nahatWeaponFamily(s)==='lame-sabre'){const v=stats(s),ratio=b.hp/b.maxHp;b.maxHp=v.hp;b.hp=b.hp>0?Math.max(1,Math.round(v.hp*ratio)):0;b.summonBase={hp:v.hp,dmg:v.dmg};}b.nahatSabreVersion=1;changed=true;}
 if(s.battle){const b=s.battle;if(b.rebeccaVersion!==1){b.rebeccaReady=false;b.rebeccaVersion=1;delete b.cooldowns.navigatrice;changed=true;}if(b.dragonBalanceVersion!==1){if(b.mode==='rift'&&b.stage>10)for(const e of b.enemies)if(e.riftKind==='dragon')scaleEncounter(e,{hp:.85,dmg:.85});b.dragonBalanceVersion=1;changed=true;}}
 s.balanceVersion=BALANCE_VERSION;return traversalChanged||changed||combatChanged||rarityChanged||guardsChanged||chapterChanged||stibiliChanged||progressionChanged||trainingChanged;
}
export function summon(s,key){
 if(s.hero)throw Error('Un compagnon est déjà invoqué.');
 if(!Object.hasOwn(CLASSES,key))throw Error('Choisissez un compagnon.');
 if(!companionAvailable(key,s.profile))throw Error('Ce compagnon n’est pas disponible.');
 s.hero={key,level:1,xp:0,allocated:emptyAllocation(),baseStatsVersion:['nahat','forgeur'].includes(key)?3:key==='wolffy'?1:2};return s.hero;
}
function probabilities(v,cap=.5){v.luck=Math.max(0,v.luck);v.speed=Math.max(0,v.speed);v.crit=Math.min(cap,v.luck/300);v.double=Math.min(cap,v.speed/300);return v;}
export function statBreakdown(s){
 const h=s.hero,c=CLASSES[h.key],allocated=h.allocated??emptyAllocation(),natural={},v={};let hpPercent=0;
 for(const k of Object.keys(STAT_GAINS)){natural[k]=Math.round(c[k]*(k==='hp'?1.13**(h.level-1):1));v[k]=natural[k]+allocated[k]*STAT_GAINS[k];}
 for(const id of Object.values(s.equipped)){const item=s.items.find(x=>x.id===id);if(item)for(const [k,n]of Object.entries(itemStats(item))){if(k==='hpPercent')hpPercent+=n;else if(k in v)v[k]+=n;}}
 const accessories=equippedAccessories(s),accessoryBonus=stat=>accessories.reduce((sum,i)=>sum+(i.stats[stat]??0),0),scarf=accessoryOf(s,'echarpe-aventurier'),armor=equippedItem(s,'armor'),allStatMultiplier=(scarf?.rarity==='legendary'?1.01:1)*(1+accessoryBonus('allStatsPercent')/100)*(h.key==='wolffy'&&armor?.type==='armure-complete'&&armor.rarity==='legendary'?1.02:1);
 v.hp=Math.max(1,Math.round(v.hp*(1+hpPercent/100)*allStatMultiplier*(1+accessoryBonus('vitalityPercent')/100)));
 for(const k of ['luck','speed'])v[k]=Math.round(v[k]*allStatMultiplier*(1+accessoryBonus(k+'Percent')/100)*100)/100;
 const bonusHp=Math.max(0,v.hp-natural.hp),weapon=s.items.find(i=>i.id===s.equipped.weapon);
 const convertedHp=0;
 const passiveDamage=h.key==='kaerune'?Math.floor(allocated.speed/4):h.key==='nahat'&&ITEMS[weapon?.type]?.family==='lame-sabre'?Math.floor(bonusHp*(astralActive(weapon,'lame-sabre-astral')?.30:.25)):0;
 const equipmentDamage=h.key==='drunn'&&ITEMS[weapon?.type]?.family==='arbalete'?Math.floor(Math.max(0,allocated.luck)/4)*(astralActive(weapon,'arbalete-astral')?2:1):0;
 const damageBeforeAccessories=h.key==='stibili'?natural.dmg+(v.dmg-natural.dmg-allocated.dmg)*.7+allocated.dmg:v.dmg+passiveDamage+equipmentDamage;
 v.dmg=Math.max(1,Math.round(damageBeforeAccessories*allStatMultiplier*(1+accessoryBonus('dmgPercent')/100)*100)/100);const overflow={luck:Math.max(0,v.luck-150),speed:Math.max(0,v.speed-150)};const overflowDamage=Math.round((overflow.luck+overflow.speed)*100)/100;v.luck=Math.min(150,v.luck);v.speed=Math.min(150,v.speed);v.dmg=Math.round((v.dmg+overflowDamage)*100)/100;probabilities(v);
 return {values:v,natural,bonusHp,convertedHp,passiveDamage,equipmentDamage,allStatMultiplier,overflow,overflowDamage};
}
export const stats=s=>statBreakdown(s).values;
export const nahatWeaponFamily=s=>s.hero?.key==='nahat'?(ITEMS[equippedItem(s,'weapon')?.type]?.family??equippedItem(s,'weapon')?.type):null;
export const plumesPercent=s=>20+10*Math.min(13,Math.max(0,s.battle?.plumesStacks??0));
// One shared entry point for enemy dispels. Equipment and survival costs are not removable buffs.
export function dispelHeroBonuses(b){
 const round=b.round??1,unique=new Set(Object.entries(b.buffs??{}).filter(([,until])=>until>=round).map(([name])=>name));
 for(const key of ['plumesStacks','adaptation','accumulation','hurricaneStacks','astralArcStacks','fangStacks','charges','omenStacks','divineSwordStacks'])if(b[key]>0)unique.add(key);
 if(b.power>0||b.powerCasts>0)unique.add('puissance');
 if(b.redressement)unique.add('redressement');
 if(b.lastBreathTurn>=round)unique.add('souffle');
 if(b.cloudStrike)unique.add('nuageux');
 if(b.smokeUntil>=round)unique.add('fumee');
 if(b.slimeBoost)unique.add('slimeBoost');
 for(const key of ['forgeNextStrike','forgeNextFracas','forgeNextProtection','forgeJudgment','preventionArmed','preventionPending'])if(b[key])unique.add(key);
 b.forgeNextStrike=false;b.forgeNextFracas=false;b.forgeNextProtection=false;b.forgeJudgment=false;b.preventionArmed=0;b.preventionPending=null;b.divineSwordStacks=0;
 for(const shield of activeShields(b,round))unique.add('shield:'+shield.source);
 b.buffs={};b.buffApplied={};b.plumesStacks=0;b.adaptation=0;b.power=0;b.powerCasts=0;b.accumulation=0;b.hurricaneStacks=0;b.astralArcStacks=0;b.fangStacks=0;b.charges=0;b.omenStacks=0;b.redressement=false;b.lastBreathTurn=0;b.cloudStrike=false;b.smokeUntil=0;b.shields=[];b.slimeBoost=false;for(const pup of b.pups??[])delete pup.furyUntil;
 return unique.size;
}

export function compatibleItem(s,type){
 const d=ITEMS[type];return !!(s.hero&&d&&!d.excludeOwners?.includes(s.hero.key)&&(!d.owner||d.owner===s.hero.key||s.hero.key==='forgeur'&&d.family==='protege-bras')&&(d.consumable||['armor','orb','accessory'].includes(d.slot)||(d.slot==='weapon'&&(d.owner===s.hero.key||s.hero.key==='forgeur'&&d.family==='protege-bras'||(d.family||type)===CLASSES[s.hero.key].weapon||(s.hero.key==='nahat'&&d.family==='lame-sabre')))));
}
export function itemUnlocked(s,type){const d=ITEMS[type];return !!(d&&!d.questOnly&&!d.craftOnly&&compatibleItem(s,type));}
export const resalePrice=item=>ITEMS[item?.type]?.sellPrice??(ITEMS[item?.type]?.slot?Math.ceil((item.purchasePrice??ITEMS[item.type].price??0)*itemRarity(item).salePercent/100):0);
export const shopItems=s=>Object.keys(ITEMS).filter(type=>ITEMS[type].price&&!ITEMS[type].craftOnly&&compatibleItem(s,type));
export const trainingGoldRange=s=>ECONOMY.trainingGold.map(n=>n+(Math.max(s.cleared,s.drunnLegacyCleared??0,s.nahatLegacyCleared??0)>=ECONOMY.trainingBonusFromCleared?ECONOMY.trainingBonus:0));
export const worldGoldRange=stage=>stage>=ECONOMY.lateWorldFromStage?[ECONOMY.lateWorldGold,ECONOMY.lateWorldGold]:ECONOMY.worldGold;
export function buy(s,type,rng=Math.random){
 const def=ITEMS[type];if(!s.hero||s.battle||s.storyScene||!def||def.unique||def.craftOnly||!compatibleItem(s,type))throw Error('Objet indisponible.');
 if(!itemUnlocked(s,type))throw Error('Objet indisponible à l’achat.');
 if(s.gold<def.price)throw Error('Or insuffisant.');
 const item=createItem(type,rng);s.gold-=def.price;s.items.push(item);recordAchievement(s,'spent',def.price);if(def.slot==='weapon'&&equipmentLevel(type)===3)recordAchievement(s,'goldBought');if(isAstral(item))recordAchievement(s,def.slot==='weapon'?'astralWeapons':'astralArmors');if(isAstral(item)&&!s.forge?.unlocked){s.forge={unlocked:true,itemId:null,announce:true};}return item;
}
export function equip(s,id,requestedSlot=null){
 if(s.battle)throw Error('Terminez le combat.');const item=s.items.find(x=>x.id===id);if(!item||ITEMS[item.type]?.consumable||!compatibleItem(s,item.type))throw Error('Équipement incompatible.');
 const current=Object.keys(s.equipped).find(slot=>s.equipped[slot]===id);if(current){s.equipped[current]=null;return;}
 let slot=ITEMS[item.type].slot;
 if(slot==='accessory'){
  if(requestedSlot&&!['accessory','accessory2'].includes(requestedSlot))throw Error('Emplacement incompatible.');
  slot=requestedSlot??(['accessory','accessory2'].find(k=>!s.equipped[k])??'accessory');
  if(['accessory','accessory2'].some(k=>k!==slot&&equippedItem(s,k)?.type===item.type))throw Error('Deux accessoires du même nom ne peuvent pas être équipés, même de raretés différentes.');
 }else if(requestedSlot&&requestedSlot!==slot)throw Error('Emplacement incompatible.');
 s.equipped[slot]=id;
}
export function extractEssence(s,id){
 if(s.hero?.key!=='stibili'||s.battle||s.storyScene)throw Error('Extraction réservée à Stibili au camp.');
 if(s.essences?.foudroiement)throw Error('Foudroiement est déjà appris définitivement.');
 const item=s.items.find(i=>i.id===id);if(item?.type!=='grimoire-dore')throw Error('Choisissez un Grimoire doré dans cet inventaire.');
 s.items=s.items.filter(i=>i.id!==id);for(const slot of Object.keys(s.equipped))if(s.equipped[slot]===id)s.equipped[slot]=null;
 s.essences={...s.essences,foudroiement:true};return 'foudroiement';
}
export function sell(s,id){
 if(s.battle)throw Error('Terminez le combat.');
 const item=s.items.find(i=>i.id===id),price=resalePrice(item);
 if(s.forge?.itemId===id)throw Error('Retirez cet équipement de la Forge Cosmique avant de le vendre.');
 if(!item||!price)throw Error('Cet objet ne peut pas être revendu.');
 s.items=s.items.filter(i=>i.id!==id);
 for(const slot of Object.keys(s.equipped))if(s.equipped[slot]===id)s.equipped[slot]=null;
 s.gold+=price;return price;
}
export const potionCount=s=>s.items.filter(i=>i.type==='potion-soin').length;
export function consumePotion(s){
 const b=s.battle;if(!b||b.hp<=0)throw Error('Utilisable uniquement pendant un combat.');
 if(b.mode==='trial')throw Error('Traversée magique : les potions sont interdites pendant cette épreuve.');
 if(s.storyScene||b.sealedMagic||b.openingPending||b.astralOpening)throw Error('Impossible d’utiliser une potion dans ce combat.');
 if(b.unhealable)throw Error('Insoignable : aucun soin possible pendant ce combat.');
 if(b.hp>=b.maxHp)throw Error('Vos PV sont déjà au maximum.');
 const index=s.items.findIndex(i=>i.type==='potion-soin');if(index<0)throw Error('Vous n’avez plus de potion.');
 const amount=healHero(s,b.maxHp*potionHealPercent(s)/100);
 if(accessoryOf(s,'boucles-slime'))b.slimeBoost=true;
 if(b.mode!=='practice')s.items.splice(index,1);b.log.push(`Potion de soin : +${amount} PV. Vous pouvez encore jouer votre action.${b.slimeBoost?' Prochaine action offensive : +40 % de dégâts.':''}`);b.log=b.log.slice(-45);
 return {events:[{type:'potion',to:'hero',amount}],result:null};
}
export const chargedMultiplier=charges=>.88*(1+.20*Math.min(5,Math.max(0,charges)));
export const heroArt=(s,combat=!!s.battle)=>s.hero?.key==='forgeur'?(combat?forgeArt(s.battle):'forgeur-classic'):s.hero?.key==='nahat'?(combat?'nahat-ado-combat':'nahat-ado'):s.hero?.key==='wolffy'&&equippedItem(s,'armor')?.type==='armure-complete-astral'?'wolffy-armure-astral':s.hero?.key==='wolffy'&&equippedItem(s,'armor')?.type==='armure-complete'?'wolffy-armure':s.hero?.key==='stibili'&&s.stibiliChapter2?.voidForm?'stibili-neant':s.battle?.matriarch?'kaerune-forme-2':CLASSES[s.hero.key].art;
export const wolfPupDamage=(p,round)=>p.dmg*((p.furyUntil??0)>=round?1.2:1);
export const hurricaneMultiplier=s=>.8*1.1**(s.battle?.hurricaneStacks??0);
export const forestUnlocked=s=>false;
export const chapterSize=(s,chapter=1)=>Object.keys(storyRoute(s.hero?.key,chapter)?.missions??(chapter===1?WOLFFY_MISSIONS:{})).length;
export const getAchievements=s=>achievementRows(s,chapterSize(s));
export function grantExperience(s,amount){
 const old=s.hero.level;if(old>=MAX_LEVEL){s.hero.xp=0;return 0;}
 s.hero.xp+=Math.max(0,Math.floor(amount));while(s.hero.level<MAX_LEVEL&&s.hero.xp>=xpNeed(s.hero.level)){s.hero.xp-=xpNeed(s.hero.level);s.hero.level++;}
 if(s.hero.level>=MAX_LEVEL)s.hero.xp=0;
 if(s.hero.level>old)s.pendingLevelUp={from:s.pendingLevelUp?.from??old,to:s.hero.level};
 return s.hero.level-old;
}
export function claimAchievement(s,id){
 if(!s.hero||s.battle||s.storyScene)throw Error('Récupérez vos récompenses au camp, après le combat ou le récit.');
 const d=getAchievements(s).find(d=>d.id===id);if(!d||!d.ready||d.claimed)throw Error('Récompense indisponible ou déjà récupérée.');
 ensureAchievements(s);s.achievements.claimed.push(id);s.gold+=d.reward.gold??0;
 const xp=s.hero.level>=MAX_LEVEL?0:d.reward.level?xpNeed(s.hero.level):d.reward.xp??0;
 const levels=grantExperience(s,xp);return {...d.reward,xp,levels};
}

export const chapterCleared=(s,chapter=1)=>chapter===2&&s.hero?.key==='stibili'?(s.stibiliChapter2?.cleared??0):chapter===1?s.cleared:0;
export const chapterUnlocked=(s,chapter=1)=>chapter===1||chapter===2&&s.hero?.key==='stibili'&&s.cleared>=chapterSize(s);
function applyStoryMilestone(s,scene,skip=false){
 if(s.hero?.key!=='stibili'||scene.chapter!==2||scene.phase==='recap')return;
 const lines=storyLines(scene.stage,scene.phase,s.hero.key,2);
 if((skip?lines:lines.slice(0,scene.index+1)).some(f=>f.voidForm)){s.stibiliChapter2??={cleared:0,voidForm:false};s.stibiliChapter2.voidForm=true;}
}
export function beginStory(s,stage,replay=false,chapter=1){
 if(!chapterUnlocked(s,chapter)||!storyRoute(s.hero?.key,chapter)||s.battle||s.storyScene||!storyRoute(s.hero.key,chapter).missions[stage])throw Error('Récit indisponible.');
 const cleared=chapterCleared(s,chapter);if(replay?stage>cleared:stage!==cleared+1)throw Error('Mission verrouillée.');
 const phase=replay?'recap':s.hero.key==='wolffy'&&stage===7&&s.wolffyStory?.cemetery?'between':'before';
 s.storyScene={stage,phase,index:0,chapter};applyStoryMilestone(s,s.storyScene);
 if(!storyLines(stage,phase,s.hero.key,chapter).length)advanceStory(s,true);
}
export function advanceStory(s,skip=false){
 const scene=s.storyScene;if(!scene)return null;const chapter=scene.chapter??1;
 if(!skip&&++scene.index<storyLines(scene.stage,scene.phase,s.hero.key,chapter).length){applyStoryMilestone(s,scene);return null;}
 applyStoryMilestone(s,scene,true);s.storyScene=null;
 if(scene.phase==='interlude'&&s.battle?.storyKey==='nahat'&&s.battle.stage===4){s.battle.lycaonFinisherPending=true;s.battle.openingPending=true;return null;}
 if(['before','between'].includes(scene.phase)){startBattle(s,'world',scene.stage,Math.random,chapter);return null;}
 return scene.result??null;
}
function stibiliVoidEnemies(stage){
 const m=storyRoute('stibili',2).missions[stage];
 const profiles={voidbeing:{hp:Math.round(500*1.15),dmg:Math.round(38*1.1)},voidlarva:{hp:Math.round(160*1.15),dmg:Math.round(17*1.1)},ozvex:{hp:700,dmg:Math.round(48*1.2)}};
 return m.enemies.map((kind,i)=>{const c=STORY_CAST[kind==='ozvex'?'ozvek':kind],v=profiles[kind];return {id:'enemy'+i,type:kind==='ozvex'?'corkbeau':'dog',storyKind:kind,name:c.name,art:c.art,level:stage+9,hp:Math.round(v.hp*1.25),maxHp:Math.round(v.hp*1.25),dmg:Math.round(v.dmg*1.25),baseDmg:Math.round(v.dmg*1.25),boss:!!m.boss,healer:false,burning:false,powerUsed:false,powerBonus:0,luck:kind==='ozvex'?18:0,wingsUsed:false,wingsUntil:0,sealed:!!m.sealed,voidRematch:kind==='ozvex'};});
}
function storyEnemies(stage,second=false){
 const kinds=second?WOLFFY_MISSIONS[stage].secondEnemies:WOLFFY_MISSIONS[stage].enemies;
 const pair=kinds.length===2,f=1.13**(stage-1);
 return kinds.map((kind,i)=>{
  const type={sword:'slime',reynga:'dog',emillia:'corkbeau',felk:'drannex',skeleton:'dog',ushio:'corkbeau',rivernia:'corkbeau'}[kind],base=ENEMIES[type];
  let hp=Math.round(base.hp*f*(pair?.6:1)),dmg=Math.round(base.dmg*f*(pair?.46:1));
  if(kind==='sword'){hp=100;dmg=Math.max(1,Math.round(dmg*.5));}
  // The final boss inherits the former two-enemy encounter's combined budget.
  if(kind==='rivernia'){hp=Math.round(ENEMIES.corkbeau.hp*f*.6)+Math.round(ENEMIES.slime.hp*f*.6);dmg=Math.round(ENEMIES.corkbeau.dmg*f*.46)+Math.round(ENEMIES.slime.dmg*f*.46);}
  return {id:'enemy'+i,type,storyKind:kind,...(kind==='sword'?{swordRegenVersion:1,revivals:0}:{}),name:STORY_CAST[kind].name,art:STORY_CAST[kind].art,level:stage,hp,maxHp:hp,dmg,baseDmg:dmg,boss:['felk','rivernia'].includes(kind),healer:false,burning:false,powerUsed:false,powerBonus:0,revived:false,rageStacks:0,aura:false,drainReady:1};
 });
}
function stibiliEnemies(stage){
 const mission=STIBILI_MISSIONS[stage],pair=mission.enemies.length===2,f=1.13**(stage-1);
 return mission.enemies.map((kind,i)=>{
  const type=kind==='slime'?'slime':kind==='ozvex'?'corkbeau':'dog';
  const base=kind==='ozvex'?{hp:192,dmg:21}:ENEMIES[type];
  const hp=Math.round(base.hp*f*(pair?.6:1)),dmg=Math.round(base.dmg*f*(pair?.46:1));
  return {id:'enemy'+i,type,storyKind:kind==='slime'?null:kind,name:STORY_CAST[kind].name,art:STORY_CAST[kind].art,level:stage,hp,maxHp:hp,dmg,baseDmg:dmg,boss:!!mission.boss,healer:false,burning:false,powerUsed:false,powerBonus:0,burnImmune:['maella','maella2'].includes(kind),fireReady:1,luck:kind==='ozvex'?18:0,wingsUsed:false,wingsUntil:0};
 });
}
function kaeruneEnemies(stage){
 const m=KAERUNE_MISSIONS[stage],pair=m.enemies.length===2,f=1.13**(stage-1);
 const profiles={seraphyne:{hp:116,dmg:23},umbraelys:{hp:120,dmg:23},eliandris:{hp:88,dmg:19},nyurune:{hp:120,dmg:24},cobra:{hp:105,dmg:18}};
 return m.enemies.map((kind,i)=>{
  const dog=kind==='wilddog',base=dog?ENEMIES.dog:profiles[kind],c=STORY_CAST[kind];
  const hp=Math.round(base.hp*f*(pair?.6:1)),dmg=Math.round(base.dmg*f*(pair?.46:1));
  return {id:'enemy'+i,type:'dog',storyKind:dog?null:kind,name:c.name,art:c.combatArt??c.art,level:stage,hp,maxHp:hp,dmg,baseDmg:dmg,boss:!!m.boss,healer:false,burning:false,powerUsed:false,powerBonus:0,survivalUsed:false,lesson:m.lesson??null};
 });
}
export const heroBurnPercent=b=>b?.burning?5+Math.max(0,(b.cobraBurnStacks??0)-1):0;
export const enemyCritChance=(e,round)=>e.riftKind==='spectralGuard'?1/3:e.storyKind==='arenaDrannex'?.24:e.storyKind==='ozvex'?Math.min(.5,.35*(1-Math.exp(-(e.luck??18)/55))+((e.wingsUntil??0)>=round?.15:0)):0;
export function startBattle(s,mode,stage=1,rng=Math.random,chapter=1){
 if(!s.hero||s.battle||s.storyScene)throw Error('Combat indisponible.');
 if(!['practice','training','world','rift','trial'].includes(mode))throw Error('Mode inconnu.');
 if(mode==='world'&&(!chapterUnlocked(s,chapter)||!Number.isInteger(stage)||stage<1||stage>chapterSize(s,chapter)||stage!==chapterCleared(s,chapter)+1))throw Error('Combat verrouillé.');
 if(mode==='forest'&&(!forestUnlocked(s)||s.missions.forest))throw Error('Mission verrouillée ou déjà terminée.');
 if(mode==='rift'&&(!riftUnlocked(s)||!Number.isInteger(stage)||stage<1||stage>50||stage>riftCleared(s)+1||stage===50&&riftCleared(s)===50))throw Error('Étage de la Fissure verrouillé.');
 if(mode==='trial'&&(!Object.hasOwn(TRIALS,stage)||s.trials?.claimed))throw Error('Traversée déjà accomplie ou Gardien inconnu.');
 const expedition=mode==='training'?(typeof stage==='string'?stage:'forest'):null;
 if(expedition&&!Object.hasOwn(EXPEDITIONS,expedition))throw Error('Expédition inconnue.');
 const pending=expedition?pendingExpedition(s,expedition):null;
 const trainingLevelOffset=mode==='training'?(Number.isInteger(pending?.levelOffset)?pending.levelOffset:rngInt(-1,1,rng)):0;
 const level=mode==='practice'?s.hero.level:mode==='trial'?15:mode==='rift'?riftFloor(stage).level:mode==='training'?(expedition==='chasm'?s.hero.level+2:Math.min(MAX_LEVEL,Math.max(1,s.hero.level+trainingLevelOffset))):mode==='forest'?7:mode==='world'&&s.hero.key==='forgeur'?FORGEUR_MISSIONS[stage].level:mode==='world'&&s.hero.key==='nahat'?NAHAT_MISSIONS[stage].level:mode==='world'&&s.hero.key==='drunn'?DRUNN_MISSIONS[stage].level:stage+(chapter===2?9:0);
 const encounter=mode==='training'?(pending?.type??trainingEncounter(rng,expedition)):null;
 const goldenEncounter=mode==='training'&&s.hero.level>=10&&(pending?!!pending.golden:rng()<.05);
 if(expedition)(s.expeditionEncounters??={})[expedition]={type:encounter,golden:goldenEncounter,levelOffset:trainingLevelOffset};
 const pair=mode==='training'?encounter==='bandit':mode==='world'&&[3,6,8,10].includes(stage),boss=mode==='world'&&stage===5;
 const pool=['slime','dog','corkbeau'];
 const types=mode==='practice'?[]:mode==='training'?(pair?['bandit','bandit']:[encounter]):mode==='forest'?['forest']:boss?['drannex']:pair?[pool[(stage+1)%3],pool[(stage+2)%3]]:[pool[rngInt(0,2,rng)]];
 let enemies=types.map((type,i)=>{const base=ENEMIES[type],f=1.13**(level-1),difficulty=mode==='training'?.861:1;const hp=Math.max(1,Math.round(Math.round(Math.round(base.hp*f*(pair?.60:1)*difficulty)*(mode==='training'?.85:1))*(mode==='training'?1.05:1)));return {id:'enemy'+i,type,name:base.name,art:base.art,level,maxHp:hp,hp,dmg:Math.max(1,Math.round(Math.round(Math.round(base.dmg*f*(pair?.46:1)*difficulty)*(mode==='training'?.8:1))*(mode==='training'?1.10:1))),boss:!!base.boss,healer:!!base.healer,burning:false,powerUsed:false,powerBonus:0};});
 if(mode==='training')enemies=goldenEncounter?[goldenEnemy(level)]:enemies.map(prepareExpeditionEnemy);
 if(mode==='rift')enemies=riftEnemies(stage);
 if(mode==='trial')enemies=[trialEnemy(stage)];
 if(mode==='practice')enemies=[{id:'enemy0',type:'practice-dummy',practiceDummy:true,name:'Le mannequin d’entraînement',art:'training-dummy',level:s.hero.level,hp:stats(s).hp,maxHp:stats(s).hp,dmg:0,totalDamage:0,noReward:true}];
 const story=mode==='world'&&!!storyRoute(s.hero.key);if(story)enemies=s.hero.key==='forgeur'?forgeurStoryEnemies(stage):s.hero.key==='nahat'?nahatEnemies(stage):s.hero.key==='drunn'?drunnEnemies(stage):s.hero.key==='kaerune'?kaeruneEnemies(stage):s.hero.key==='stibili'?(chapter===2?stibiliVoidEnemies(stage):stibiliEnemies(stage)):storyEnemies(stage,stage===7&&!!s.wolffyStory?.cemetery);
 if(mode==='world'&&!['drunn','nahat','forgeur'].includes(s.hero.key)&&chapter===1&&stage>=4)for(const enemy of enemies){enemy.maxHp=Math.ceil(enemy.maxHp*1.2);enemy.hp=enemy.maxHp;}
 if(chapter===2&&mode==='world'&&stage>=2){s.stibiliChapter2??={cleared:0,voidForm:false};s.stibiliChapter2.voidForm=true;}
 const v=stats(s);s.battle={goldenEncounter,goldenIntroSeen:false,expeditionRewardMultiplier:mode==='training'&&expedition==='chasm'&&!goldenEncounter?1.11:1,weaponChoiceVersion:1,plumesStacks:0,playtestBalanceVersion:1,encounterBalanceVersion:1,expeditionEntryLevel:s.hero.level,nahatWave:1,expedition,bone:null,boneUsed:false,disabledSkill:null,openingPending:story&&s.hero.key==='drunn'&&stage===3,eternalFlames:story&&s.hero.key==='drunn'&&stage===7,trainingBalanceVersion:3,stibiliBalanceVersion:2,voidBalanceVersion:1,healCharges:2,healLastTurn:0,chapter:mode==='world'?chapter:1,sealedMagic:mode==='world'&&chapter===2&&stage===1,summonBase:{hp:v.hp,dmg:v.dmg},larva:null,larvaUsed:false,pups:[],packUsed:false,packVersion:1,packReworkVersion:1,cloudStrike:false,advancedSkillsVersion:1,unhealable:false,distressUsed:false,lastBreathTurn:0,fangStacks:0,smokeUsed:false,smokeUntil:0,navigatorUsed:false,elementalUsed:{},elementalSacrificeUsed:false,durationVersion:1,buffApplied:{},riftRewardXp:mode==='rift'?(s.hero.level>=MAX_LEVEL?0:Math.round(Math.round(xpNeed(s.hero.level)*.2)*.65)):0,riftEntryLevel:s.hero.level,riftAttraction:{},riftFissures:{},trainingEncounter:encounter,id:globalThis.crypto.randomUUID(),mode,stage:mode==='forest'?7:stage,level,story,storyKey:story?s.hero.key:null,background:mode==='trial'?TRIALS[stage].background:story?storyRoute(s.hero.key,chapter).missions[stage].background??null:null,lesson:story&&s.hero.key==='kaerune'?KAERUNE_MISSIONS[stage].lesson??null:null,burning:story&&s.hero.key==='drunn'&&stage===7,storyWave:story&&s.hero.key==='wolffy'&&stage===7&&s.wolffyStory?.cemetery?2:1,enemies,hp:v.hp,maxHp:v.hp,round:1,cooldowns:{},buffs:{},power:0,powerCasts:0,accumulation:0,reinforcementCalled:false,refusUsed:false,refusSuccess:false,matriarch:false,hurricaneStacks:0,glacierUsed:false,charges:s.hero.key==='drunn'&&s.hero.level>=9?1:0,redressement:false,target:0,log:[mode==='forest'?'Quatre tours pour vaincre l’Enfant de la forêt avant son attaque fatale.':story?storyRoute(s.hero.key,chapter).missions[stage].title+' — À vous de jouer.':boss?'Drannex, le loup à deux têtes, vous barre la route.':'Le combat commence. À vous de jouer.']};
 if(accessoryOf(s,'ceinture-pierre'))grantShield(s.battle,'Ceinture ancienne · entrée',s.battle.maxHp*accessoryOf(s,'ceinture-pierre').stats.stoneShieldPercent/100);
 s.battle.rebeccaVersion=1;s.battle.rebeccaReady=false;s.battle.dragonBalanceVersion=1;s.battle.nahatSabreVersion=1;s.battle.lorePatchVersion=1;s.battle.epineStacks=0;s.battle.riposteCount=0;s.battle.usedActions=[];s.battle.stoneBeltUsed=false;s.battle.slimeBoost=false;
 const belt=accessoryOf(s,'ceinture-enflammee');if(belt){const skills=availableSkills(s).filter(d=>!d.automatic);s.battle.beltDamage=belt.stats.flameDamage;if(skills.length)s.battle.disabledSkill=skills[rngInt(0,skills.length-1,rng)].id;s.battle.log.push(`Ceinture enflammée : dégâts +${s.battle.beltDamage} %${s.battle.disabledSkill?' ; '+SKILLS[s.battle.disabledSkill].name+' retirée pour ce combat':''}.`);}
 if(s.hero.key==='forgeur'){s.battle.tension=3;s.battle.divineSwordStacks=0;}
 s.battle.astralOpening=!s.battle.openingPending&&(astralActive(equippedItem(s,'armor'),'cape-astral')||s.hero.key==='forgeur'&&equippedItem(s,'weapon')?.type==='epee-dieux-nuageux');
 return s.battle;
}
export function combatStats(s){
 const v=stats(s),b=s.battle;if(!b)return v;const active=k=>(b.buffs[k]??0)>=b.round;
 if(active('fury')){v.dmg=Math.round(v.dmg*1.2);v.luck*=1.2;v.speed*=1.2;}
 if(acharnement(s)){v.dmg=Math.round(v.dmg*1.15);v.luck*=1.15;v.speed*=1.15;}
 if(b.refusSuccess)v.dmg*=.8;
 if(b.roxxorWeakened)v.dmg*=.9;
 if(skillUnlocked(s,'adaptation'))v.dmg*=1+.02*(b.adaptation??0);
 if(s.hero.key==='kaerune'&&b.redressement){v.dmg=Math.round(v.dmg*1.05);v.speed*=1.03;}
 if(s.hero.key==='forgeur'){v.dmg*=forgeState(b)==='hot'?1.2:forgeState(b)==='cold'?.8:1;v.dmg*=1+.1*(b.divineSwordStacks??0);}
 probabilities(v,1);
 if(s.hero.key==='forgeur'){if(forgeState(b)==='hot')v.crit=Math.min(1,v.crit+.15);if(forgeState(b)==='cold')v.double=Math.min(1,v.double+.15);}
 if(b.matriarch){v.dmg=Math.round(v.dmg*1.1);v.double=Math.min(1,v.double+.1);}
 if(active('precision'))v.crit=Math.min(1,v.crit+.15);
 v.dmg=Math.max(1,Math.round(v.dmg*1.06**b.power*(1+(b.beltDamage??0)/100)*Math.max(0,1-.15*(b.lastBreathCasts??0))*(1+.07*(b.epineStacks??0))*(1+.03*(b.astralArcStacks??0))));return v;
}
export const skillUnlocked=(s,id)=>{const d=SKILLS[id];return !!(s.hero&&d&&d.owner===s.hero.key&&(!d.ephemeral||!!s.battle?.rebeccaReady)&&(d.requiresItem?(equippedItem(s,'weapon')?.type===d.requiresItem||id==='foudroiement'&&s.essences?.foudroiement===true):d.unlockChapter2?chapterCleared(s,2)>=d.unlockChapter2:d.unlockStage?s.cleared>=d.unlockStage:s.hero.level>=d.level));};
export const availableSkills=s=>Object.entries(SKILLS).filter(([id])=>skillUnlocked(s,id)&&s.battle?.disabledSkill!==id).map(([id,v])=>({id,...v}));
export function skillReady(s,id){
 const b=s.battle,d=SKILLS[id];
 if(id==='entailles'&&forgeState(b)!=='hot')return false;
 if(b?.disabledSkill===id||actionAlreadyUsed(s,id))return false;
 if(id==='transmutation'&&!(b?.accumulation>0)||id==='extraction'&&!(b?.enemies[b.target]?.hp>0?b.enemies[b.target]:b?.enemies.find(e=>e.hp>0))?.poisonStacks)return false;
 if(id==='soin'&&((b?.healCharges??2)<=0||b?.healLastTurn===b?.round))return false;
 if(id==='fumee'&&b?.smokeUsed||id==='elementaire'&&(b?.elementalSacrificeUsed||elementalMissing(s).length)||id==='sacrifice'&&b?.hp>=b?.maxHp)return false;
 return !!(b&&d&&!b.openingPending&&!b.sealedMagic&&!(id==='larve'&&b.larvaUsed)&&!d.automatic&&skillUnlocked(s,id)&&!(id==='redressement'&&b.redressement)&&b.round>=(b.cooldowns[id]??1)&&!(id==='puissance'&&b.powerCasts)&&!(id==='meute'&&livingPups(b).length>=2)&&!(id==='epine'&&b.hp<=0)&&!(id==='nuageux'&&b.hp>=b.maxHp&&!livingPups(b).length));
}
export function skillText(s,id){
 if(id==='meute'&&s.hero?.key==='wolffy'){const weapon=equippedItem(s,'weapon'),armor=equippedItem(s,'armor');if(isAstral(weapon)||isAstral(armor)){const crystal=astralActive(weapon,'cristal-astral'),double=astralActive(weapon,'dentier-astral'),armored=astralActive(armor,'armure-complete-astral');return `Invoque un Bébé Wolffy, ou deux sur un coup critique, dans la limite de deux petits vivants. Chaque petit possède ${crystal?75:50} % des dégâts et ${crystal?50:35} % des PV max de Wolffy avant combat, équipement compris.${armored?' Ces deux valeurs sont ensuite augmentées de 15 % par l’armure Astral.':''} Il attaque ${double?'deux fois':'une fois'} après Wolffy, sans critique ni bonus de Vitesse. Les ennemis peuvent cibler Wolffy ou ses petits. Récupération : 3 tours. La compétence d’invocation ne peut pas être répétée par la Vitesse.`;}}
 if((SKILLS[id]?.unlockStage||SKILLS[id]?.unlockChapter2)&&!skillUnlocked(s,id))return 'Effet ???';
 if(FORGEUR_TEXT[id])return FORGEUR_TEXT[id];
 if(MASTERY_TEXT[id])return MASTERY_TEXT[id]+(id==='plumes'?` Puissance actuelle : ${plumesPercent(s)} %.`:'');
 const descriptions={
 detresse:'Passif automatique. Une fois par combat, survit à des dégâts mortels avec 1 PV, puis devient Insoignable jusqu’à la fin du combat : aucun soin par compétence, passif, objet ou équipement. Ne protège pas d’un second coup mortel.',
 souffle:'Prépare le prochain tour : si Kaerune utilise son attaque de base, elle effectue deux frappes, toutes deux critiques. Le bonus expire à la fin de ce prochain tour, même si une autre compétence est utilisée. Aucun effet sur les compétences. Chaque activation réduit les dégâts de 15 points de pourcentage, cumulables jusqu’à la fin du combat (4 activations : −60 %). Activable chaque tour, sans récupération. La vitesse ne peut pas répéter la préparation ni ajouter une troisième frappe.',
 saut:'Wolffy bondit sur l’ennemi ciblé et lui inflige 100 % des dégâts d’attaque de Wolffy. Les dégâts d’attaque de cet ennemi sont réduits de 15 % dès maintenant, puis pendant les 2 tours suivants. Le malus ne se cumule pas ; un nouveau bond renouvelle sa durée. Récupération : 5 tours (tour 1 → tour 6). Peut être critique et répété par la vitesse.',
 crocs:`Mord la cible à ${crocsPercent(s)} % des dégâts d’attaque. Puissance initiale : 80 %. Chaque fin de tour de Wolffy ajoute 7 points : 80 %, 87 %, 94 %… Utiliser la compétence remet les cumuls à zéro, puis la fin de ce tour ajoute 7 points. La Vitesse ne peut pas répéter cette compétence. Peut être critique (probabilité plafonnée à 49 %) : invoque alors un Bébé Wolffy si moins de deux sont vivants. Récupération : 3 tours (tour 1 → tour 4).`,
 toxic:'Inflige 25 % des dégâts d’attaque et applique 1 cumul de Poison. Au début de son tour, la cible perd 3 % par cumul de la plus élevée des deux statistiques actuelles de Drunn : dégâts d’attaque ou chance. Cumuls illimités, propres à chaque cible, jusqu’à la fin du combat. Le critique augmente seulement les dégâts directs. La vitesse répète les dégâts et ajoute un second cumul. Aucun temps de récupération.',
 fumee:'Une fois par combat, augmente de 22 points les chances d’esquiver les attaques et compétences offensives pendant 3 tours, tour du lancement inclus. Se cumule avec Analyse : 37 % contre un ennemi renforcé. Aucun effet sur les dégâts déjà appliqués, le poison ou la brûlure. Ni critique ni répétition par la vitesse.',
 soin:'Retire tous les effets négatifs de Stibili, puis le soigne de 30 % de ses PV max, ou de 50 % en cas de coup critique. Cible uniquement Stibili, jamais ses invocations. Commence chaque combat avec 2 charges : chaque utilisation en consomme une, sans récupération. Une seule utilisation par tour, deux par combat. La Vitesse ne peut pas répéter cette compétence. Les charges sont réinitialisées au prochain combat.',
 elementaire:'Nécessite d’avoir lancé Boule de feu, Glacier et Ouragan au moins une fois chacun pendant ce combat. Inflige 110 % des dégâts d’attaque, plus 10 points de pourcentage par cumul d’Accumulation présent avant le lancer (110 %, 120 %, 130 %…). Consomme tous ces cumuls après utilisation. Aucun coût en PV. Peut être critique. Une seule utilisation par combat, sans répétition par la vitesse.',
 navigatrice:'Inflige 75 % des dégâts d’attaque et possède 75 % de chances d’obtenir Dague de Rebecca, une compétence éphémère. Une seule Dague peut être disponible à la fois. Utilisable chaque tour, sans récupération. Peut être critique et répétée par la Vitesse ; chaque lancer effectue son propre jet d’obtention.',
 rebecca:'Extra-action éphémère obtenue grâce à Pour notre Navigatrice. Ne consomme ni le tour ni une action du compagnon ; les ennemis et les invocations ne jouent pas après son utilisation. Inflige 25 % des dégâts d’attaque et octroie un bouclier égal à 10 % des PV max de Nahat. Le bouclier s’ajoute au bouclier restant et dure jusqu’à absorption ou dissipation. Peut être critique et répétée par la Vitesse : seule la frappe peut être critique, chaque lancer ajoute 10 % de bouclier. Disparaît après utilisation et à la fin du combat. Peut être obtenue de nouveau.',
 sacrifice:'Inutilisable à 100 % des PV. Sacrifie 15 % des PV max et inflige exactement cette valeur à la cible, sans critique ni amplification. Le sacrifice peut être mortel ; si Nahat tombe, il ne frappe pas. Sous Ascension, la frappe peut manquer (40 %) mais le coût est payé. La vitesse peut répéter la compétence en payant de nouveau son coût. Récupération : 2 tours (tour 1 → tour 3).',
 larve:'Invoque une Larve du Néant. La créature possède 50% des dégâts de base de Stibili ainsi que 35% de ses PV MAX. La compétence est désactivée une fois lancée. La créature ne peut QUE attaquer et ne peut pas subir de bonus.',
 foudroiement:'Frappe tous les ennemis vivants avec un éclair infligeant 80 % des dégâts d’attaque de Stibili. Aucun jet de dé. Chaque cible peut subir un critique et la Vitesse peut répéter la compétence. Récupération : 3 tours (tour 1 → tour 4). Disponible avec le Grimoire doré équipé, ou définitivement après extraction de son essence au camp.',
 attraction:'Emprisonne la cible dans le Néant : elle perd sa prochaine action, puis réapparaît. Aucun dégât direct. Les brûlures continuent au début de son tour. Une attaque spéciale prévue ce tour est reportée à son prochain tour ; le coup fatal de l’Enfant de la forêt peut ainsi être retardé. Consomme votre action. Récupération : 5 tours (lancée au tour 1, disponible au tour 6). Une répétition par la vitesse ne prolonge pas l’emprisonnement de la même cible. Obtenue après la première victoire contre la Mite du Néant, mission 3.',
 fury:'Dégâts, chance et vitesse de Wolffy +20 % dès le lancement et pendant les 2 tours suivants. Les Bébés Wolffy vivants présents au lancement gagnent aussi 20 % de dégâts pendant cette durée. Récupération : 6 tours. Une répétition prolonge l’effet de 2 tours.',
 precision:'Chance de critique +15 points de pourcentage dès le lancement et pendant les 3 tours suivants, même au-delà de 50 % (maximum 100 %). Un critique inflige 175 % des dégâts. Récupération : 6 tours. Une répétition prolonge l’effet de 3 tours.',
 courage:'Divise par 2 les dégâts subis dès le lancement et pendant les 2 tours suivants. Récupération : 7 tours. Une répétition prolonge la protection de 2 tours. Ne protège pas contre l’attaque fatale de l’Enfant de la forêt.',
 puissance:'Aucun dégât au lancement. Augmente les dégâts de 6 % multiplicatifs à la fin de chaque tour jusqu’à la fin du combat. Une seule activation. Une répétition par la vitesse ajoute une deuxième croissance de 6 % par tour.',
 matriarche:'Automatique dès le niveau 5 : à chaque double action réellement déclenchée par la vitesse, Kaerune a exactement 49 % de chances de prendre sa seconde forme à la fin de cette double action. Chaque tentative est indépendante : aucun cumul ni transformation garantie après plusieurs échecs. Rend 15 % des PV max (sans dépasser le maximum), augmente les dégâts de 10 % et ajoute 10 points de pourcentage à la probabilité de double action, même au-delà de 50 % (maximum 100 %). Une seule transformation, sans action à dépenser, jusqu’à la fin du combat. Redressement ne peut pas être répété par la vitesse et ne déclenche pas cette transformation.',
 ouragan:`Une tornade frappe la cible choisie à 80 % des dégâts de base. Après chaque lancer, 50 % de chances d’augmenter de 10 % la puissance du prochain Ouragan : 80 %, 88 %, 96,8 %… Sans limite de cumuls. Sinon, le prochain Ouragan revient à 80 %. Le tirage ne change pas les dégâts du lancer en cours. Si la Vitesse déclenche une double action, les deux lancers gagnent chacun un cumul garanti : aucun risque de perdre les cumuls lors de cette double action. Le second lancer utilise le bonus gagné après le premier. Aucune récupération. Bonus conservé entre les actions, réinitialisé à la fin du combat. Dégâts du prochain lancer : ${(hurricaneMultiplier(s)*100).toLocaleString('fr-FR',{maximumFractionDigits:1})} %.`,
 epine:'Sacrifie 10 % des PV max et augmente les dégâts d’attaque de 7 % jusqu’à la fin du combat. Bonus cumulable sans limite et impossible à dissiper. Utilisable chaque tour, sans critique. Peut être répétée par la Vitesse. Le sacrifice ignore les boucliers et peut être fatal.',
 meute:'Invoque un Bébé Wolffy, ou deux si l’invocation est un coup critique. Chaque petit possède 50 % des dégâts et 35 % des PV max de Wolffy avant combat, équipement compris, sans les bonus de combat. Il attaque après Wolffy, sans critique ni double action. Fury, La proie désignée et Instinct protecteur peuvent le renforcer ; les autres bonus d’allié ne s’appliquent pas. Les attaques ciblées ennemies choisissent au hasard entre Wolffy et ses petits vivants ; les attaques de zone peuvent toucher toute la meute. Deux Bébés Wolffy vivants au maximum. Récupération : 3 tours (tour 1 → tour 4). La vitesse ne peut pas répéter cette compétence.',
 redressement:'Actif : augmente les dégâts d’attaque de Kaerune de 5 % et sa vitesse de 3 % jusqu’à la fin du combat. Passif, uniquement après activation : à 30 % de ses PV max ou moins, chaque frappe la soigne de 4 % des dégâts réellement infligés. Une seule activation par combat, sans récupération. La vitesse ne peut pas répéter cette compétence.',
 pret:'Porte trois frappes, chacune sur une cible vivante tirée au hasard (la même cible peut être choisie plusieurs fois). Chaque frappe inflige de 30 à 80 % des dégâts de base et peut être critique. S’il reste une seule cible, elle reçoit les trois frappes. Récupération : 4 tours.',
 feu:`Inflige ${fireballPercent(s)} % des dégâts de base${fireballPercent(s)>120?' (bracelet équipé)':''}, avec 10 % de chances de brûler la cible. La brûlure dure jusqu’à la fin du combat et retire 5 % des PV max au début de chaque tour de la cible. Elle ne se cumule pas. Récupération : 3 tours. Glacier et Boule de feu ont des récupérations indépendantes.`,
 refus:`Passif : à la première blessure mortelle du combat, lance un dé à 6 faces. ${s.hero?.level>=24?'Amélioration niveau 24 : sur 1, 2 ou 6,':'Sur 6,'} Nahat survit avec 30 % de ses PV max, devient Insoignable et inflige 20 % de dégâts en moins jusqu’à la fin du combat.${s.hero?.level>=24?' Gagne aussi un bouclier égal à 3 % de ses PV max, jusqu’à absorption ou fin du combat.':' Au niveau 24 : s’active sur 1, 2 ou 6 et accorde un bouclier de 3 % des PV max.'} Les autres résultats provoquent la défaite. Un seul jet par combat.`,
 envol:'Une tempête frappe tous les ennemis vivants à 70 % des dégâts de base chacun. Chaque cible peut subir un critique. La vitesse peut répéter toute la tempête une fois. Récupération : 2 tours (lancée au tour 1, disponible au tour 3).',
 nuageux:'Wolffy récupère 22 % de ses PV manquants. Chaque Bébé Wolffy vivant récupère 60 % de ses propres PV max, sans dépasser le maximum. Si au moins un petit est vivant au lancement, la prochaine frappe d’attaque de base de Wolffy inflige 50 % de dégâts supplémentaires. Ce bonus ne se cumule pas et les autres compétences ne le consomment pas. Consomme votre action. Récupération : 2 tours complets d’attente (lancée au tour 1, disponible au tour 4). Une répétition par la vitesse répète les soins sans cumuler le bonus.',
 tircharge:`Gagne automatiquement 1 charge au début de chaque tour, dès le premier, jusqu’à 5. Les charges restent au maximum tant que vous ne tirez pas. Tir chargé consomme toutes les charges et frappe à 88 % × (1 + 20 % par charge) des dégâts de base : 176 % à 5 charges. Aucune récupération. Une répétition par la vitesse reprend la puissance du tir initial, sans consommer une seconde fois ni créer de charges. Charges actuelles : ${s.battle?.charges??0}/5. Puissance actuelle : ${(chargedMultiplier(s.battle?.charges??0)*100).toLocaleString('fr-FR',{maximumFractionDigits:1})} %. Les charges sont réinitialisées à chaque combat.`,
 glacier:'Inflige 180 % des dégâts de base. Récupération : 5 tours (tour 1 → tour 6). Indépendant de Boule de feu : les deux compétences restent utilisables selon leur propre récupération. Peut être critique et répété par la Vitesse.'
 };
 return descriptions[id]+(!['soin','detresse','souffle','saut','crocs','toxic','fumee','elementaire','navigatrice','rebecca','sacrifice','meute','nuageux','puissance','redressement','refus','envol','tircharge','glacier','matriarche','ouragan','attraction','larve'].includes(id)?' La vitesse peut répéter la compétence une fois, même si sa récupération vient de commencer.':'');
}
// Descriptions shared by hover, keyboard/touch details and battle-state tests.
function durationText(until,round,applied){
 const left=until-round+1;
 if(applied===round)return `Actif dès maintenant, puis pendant les ${until-round} tours suivants. Le lancement ne consomme aucun tour de durée.`;
 return `${left} tour${left>1?'s':''} restant${left>1?'s':''}, tour actuel inclus.`;
}
export function heroEffects(s){
 const b=s.battle;if(!b)return [];const effects=[];
 const add=(id,icon,name,text,stacks)=>effects.push({id,icon,name,text,...(stacks===undefined?{}:{stacks})});
 if(b.beltDamage)add('flame-belt','♨','Ceinture enflammée',`Dégâts +${b.beltDamage} %. ${b.disabledSkill?SKILLS[b.disabledSkill].name+' retirée pour ce combat.':'Aucune compétence active à retirer.'}`);
 if(majesticBracelet(s))add('majestic','Ⅱ','Bracelet majestueux',`Attaque de base : dégâts −50 %. Actions choisies : ${b.usedActions?.length??0} / 2. Chaque action doit être différente.`);
 if(b.astralArcStacks)add('astral-arc','✦','Maîtrise de l’arc',`Dégâts +${3*b.astralArcStacks} %, cumulables jusqu’à la fin du combat.`,b.astralArcStacks);
 if(b.epineStacks)add('epine-oath','✦','Pour l’Épine !',`Dégâts +${7*b.epineStacks} %. ${b.epineStacks} cumul(s), impossibles à dissiper.`,b.epineStacks);
 if(nahatWeaponFamily(s)==='epee-bouclier')add('riposte-count','⚔','Riposte',`${b.riposteCount??0} / 4 attaques ou compétences offensives subies. La quatrième déclenche une riposte à ${astralActive(equippedItem(s,'weapon'),'epee-bouclier-astral')?125:55} % des dégâts.`,b.riposteCount??0);
 if(b.slimeBoost)add('slime-boost','✦','Élan du Slime','Prochaine action offensive : +40 % de dégâts. Toute action non offensive annule ce bonus.');
 if(accessoryOf(s,'ceinture-pierre'))add('stone-belt','◈','Ceinture ancienne',b.stoneBeltUsed?'Les deux déclenchements ont été utilisés.':`À 50 % de PV ou moins : un second bouclier de ${accessoryOf(s,'ceinture-pierre').stats.stoneShieldPercent} % des PV max, une seule fois.`);
 if(!!accessoryOf(s,'collier-os'))add('bone-necklace','☠','Collier d’os',b.boneUsed?'Invocation déjà déclenchée ce combat.':'Invoque un Squelette chétif au début d’un tour à 30 % de PV max ou moins. Une fois par combat.');
 for(const [id,n]of Object.entries(b.riftAttraction??{}))if(n>0)add('rift-attraction-'+id,'◉','Attraction des âmes',`Dévoration du Gouffre : ${120+30*n} %. Chaque frappe directe du compagnon retire un cumul. Purifiable.`,n);
 if(Object.keys(b.riftFissures??{}).length)add('rift-fissure','◆','Fissure','La prochaine frappe de l’Être qui a posé cette marque inflige +40 % sur cette cible, puis la consomme. Purifiable.');
 if(b.snakePoison)add('poison','☠','Poison du serpent','Perd 5 % des PV max au début de chaque tour. Non cumulable, jusqu’à la fin du combat ou purification.');
 if(b.unhealable)add('unhealable','✚','Insoignable','Aucun PV ne peut être récupéré pendant ce combat, quelle que soit la source du soin.');
 if(skillUnlocked(s,'detresse'))add('detresse','羽','L’appel de détresse',b.distressUsed?'Survie déjà utilisée. Insoignable jusqu’à la fin du combat.':'Prête : survit une fois à des dégâts mortels avec 1 PV, puis devient Insoignable.');

 if(s.hero.key==='forgeur'){
  add('tension','⚒','Acier vivant',FORGEUR_PASSIVE.text,forgeTension(b));
  if(b.divineSwordStacks)add('divine-sword','⚔','Épée des dieux nuageux',`Dégâts +${b.divineSwordStacks*10} %. Coût au début du tour : 5 % des PV max, ignore le bouclier.`,b.divineSwordStacks);
  if(b.forgeNextStrike)add('forge-ignite','✦','Forge rallumée','Prochaine frappe offensive : dégâts +20 %.');
  if(b.forgeNextFracas)add('forge-fracas','↑','Fracas préparé','Le prochain Fracas gagne 2 Tensions.');
  if(b.forgeNextProtection)add('forge-protection','↓','Refroidissement préparé','La prochaine Protection ultime retire 2 Tensions.');
  if(b.forgeJudgment)add('forge-judgment','⚔','Jugement',FORGEUR_TEXT.jugement);
  if(b.preventionArmed)add('forge-prevention','◉','Auréole de prévention',`${Math.round(b.preventionArmed*100)} % des PV perdus sur la prochaine action offensive ennemie seront convertis en bouclier au prochain tour.`);
  if(b.preventionPending)add('forge-prevention-pending','⬡','Auréole en attente',`${Math.round(b.preventionPending.amount*b.preventionPending.rate)} points de bouclier au prochain tour.`);
 }
 if(b.lastBreathCasts)add('souffle-cost','↓','Épuisement',`Dégâts −${Math.min(100,b.lastBreathCasts*15)} %. Cumulable, jusqu’à la fin du combat.`,b.lastBreathCasts);
 if(b.lastBreathTurn>=b.round)add('souffle','✦','Dernier souffle',b.lastBreathTurn===b.round?'Ce tour : attaque de base doublée et deux critiques garantis.':'Au prochain tour : attaque de base doublée et deux critiques garantis.');
 if(smokeActive(s))add('fumee','☁','Écran de fumée',`+22 points d’esquive, 37 % contre un ennemi renforcé avec Analyse. ${b.smokeUntil-b.round+1} tour(s) restant(s), tour actuel inclus.`);
 if(skillUnlocked(s,'crocs'))add('crocs','⚔','Crocs nuageux',`Prochaine morsure : ${crocsPercent(s)} %. +7 points à chaque fin de tour de Wolffy.`,b.fangStacks??0);
 if(skillUnlocked(s,'elementaire'))add('elementaire','◈','Sacrifice élémentaire',b.elementalSacrificeUsed?'Déjà utilisé ce combat.':elementalMissing(s).length?'À lancer : '+elementalMissing(s).map(id=>SKILLS[id].name).join(', ')+'.':'Prêt : les trois éléments ont été utilisés.');
 if((b.sandUntil??0)>=b.round)add('sand','◌','Sable de brouillage',`20 % de risque de manquer chaque frappe de base ou de compétence offensive. ${b.sandUntil-b.round+1} tour(s) restant(s), tour actuel inclus.`);
 if(b.roxxorWeakened)add('roxxor-regret','↓','Poids du regret','Dégâts d’attaque réduits de 10 % jusqu’à la fin du combat. Non cumulable ; une purification peut retirer ce malus.');
 if(b.sealedMagic)add('sealed','◈','Magie scellée','Vos compétences et les potions sont indisponibles. Seule l’attaque de base répond.');
 if(b.larva?.hp>0)add('larva','◈','Larve protectrice','Les attaques ciblées frappent d’abord la Larve. Les attaques de zone et les brûlures déjà subies peuvent toujours toucher Stibili.');
 for(const sh of activeShields(b,b.round))add('shield-'+sh.source,'⬡',sh.source,`Bouclier : ${sh.amount} points${sh.until==null?' jusqu’à absorption':', '+(sh.until-b.round+1)+' tour(s) restant(s)'}. Les sacrifices de PV ignorent le bouclier.`,sh.amount);
 if(skillUnlocked(s,'plumes'))add('plumes','羽','Plumes tranchantes',`Prochain lancer : ${plumesPercent(s)} % des dégâts d’attaque. Cumuls dissipables, conservés jusqu’à la fin du combat.`,b.plumesStacks??0);
 if(nahatWeaponFamily(s))add('armes','⚔','Mes armes : Mes choix',PASSIVES.nahat.text);
 if(skillUnlocked(s,'adaptation'))add('adaptation','羽','Adaptation',`Dégâts d’attaque +${2*(b.adaptation??0)} %. Chaque attaque de base ajoute 2 %.`,b.adaptation??0);
 if(skillUnlocked(s,'instinct'))add('instinct','◈','Instinct protecteur',b.instinctUsed?'Secours déjà utilisé ce combat.':'Secours à 30 % de PV ou moins, au début du prochain tour.');
 if(markedPrey(b))add('proie','◉','La proie désignée',`Les petits attaquent ${markedPrey(b).name} à +20 % pendant ${b.prey.until-b.round+1} tour(s).`);
 const timed={fury:['✦','Fury','Dégâts, chance et vitesse +20 %. Bébés Wolffy présents au lancement : dégâts +20 %.'],precision:['◎','Précision','Chance de critique +15 points, même au-delà de 50 % (maximum 100 %).'],courage:['⬡','Courage','Dégâts subis divisés par 2.']};
 for(const [id,[icon,name,text]]of Object.entries(timed)){const left=(b.buffs[id]??0)-b.round+1;if(left>0)add(id,icon,name,`${text} ${durationText(b.buffs[id],b.round,b.buffApplied?.[id])}`);}
 if(s.hero.key==='stibili'&&b.accumulation)add('accumulation','✹','Accumulation',`Prochaine attaque de base : ${Math.round(basicMultiplier(s)*100)} % des dégâts (${b.accumulation} compétence${b.accumulation>1?'s':''}). Consommé par la première frappe de base, par Transmutation élémentaire, par Sacrifice élémentaire ou à la fin du combat.`,b.accumulation);
 if(acharnement(s))add('acharnement','⚔','Acharnement','Dégâts, chance et vitesse +15 % tant que vos PV sont sous 49 %.');
 if(s.hero.key==='drunn'&&b.enemies.some(e=>enemyBoosted(e,b.round)))add('analyse','◎','Analyse','15 % d’esquive contre chaque attaquant bénéficiant d’un bonus positif actif. Aucun bonus contre les ennemis non renforcés.');
 if(s.hero.key==='kaerune'&&s.hero.level>=5)add('matriarche',b.matriarch?'✦':'49%','Grande matriarche',b.matriarch?'Seconde forme : dégâts +10 %, probabilité de double action +10 points, même au-delà de 50 % (maximum 100 %). Jusqu’à la fin du combat.':'Chaque double action de vitesse donne 49 % de chances de se transformer et de récupérer 15 % des PV max. Tirages indépendants, une seule transformation par combat.');
 if(s.hero.key==='stibili')add('ouragan','≋','Ouragan',`Prochaine tornade : ${(hurricaneMultiplier(s)*100).toLocaleString('fr-FR',{maximumFractionDigits:1})} % des dégâts de base. ${b.hurricaneStacks??0} bonus cumulé(s). Lancer simple : 50 % de chances de gagner un bonus, sinon retour à 80 %. Double action de Vitesse : un cumul garanti après chacun des deux lancers. Fin des cumuls en fin de combat.`,b.hurricaneStacks??0);
 if(skillUnlocked(s,'refus'))add('refus','⚄','Refus de mourir',b.refusSuccess?'Survie utilisée · Insoignable · dégâts −20 %.':b.refusUsed?'Jet déjà utilisé.':skillText(s,'refus'));
 const orb=equippedItem(s,'orb');if(orb&&Object.values(TRIALS).some(d=>d.orb===orb.type))add('orb','◉',ITEMS[orb.type].name,itemPassiveText(orb)+(orb.type==='orbe-echo'?` Compteur : ${b.echoCount??0}/3.`:''));
 if(s.hero.key==='drunn'&&s.hero.level>=9)add('charges','➶','Tir chargé',`${b.charges??0}/5 charges. Puissance : ${(chargedMultiplier(b.charges??0)*100).toLocaleString('fr-FR',{maximumFractionDigits:1})} % des dégâts de base. +1 au début de chaque tour ; toutes consommées au tir. Jusqu’à utilisation ou fin du combat.`,b.charges??0);
 if(b.packUsed)add('meute','✦','Appel de la meute',`${livingPups(b).length} petit(s) vivant(s). Deux petits vivants maximum. Récupération : 3 tours. Les attaques ciblées peuvent toucher Wolffy ou un petit vivant.`,livingPups(b).length);
 if(b.cloudStrike)add('nuageux','☁','Nuageux — attaque renforcée','La prochaine frappe d’attaque de base de Wolffy inflige 50 % de dégâts supplémentaires. Les compétences ne consomment pas ce bonus.');
 if(b.powerCasts)add('puissance','✧','Puissance',`Dégâts ×${(1.06**b.power).toFixed(2)}. Croissance de 6 % multiplicatifs, ${b.powerCasts} fois à la fin de chaque tour. ${b.power} cumul(s) de croissance. Jusqu’à la fin du combat.`,b.power);
 if(b.burning)add('burn','♨',b.cobraBurnStacks?'Brûlure des laves':'Brûlure',`Perd ${heroBurnPercent(b)} % des PV max au début de chaque tour, jusqu’à la fin du combat.${b.cobraBurnStacks?' Chaque nouvelle morsure du Cobra ajoute 1 point de pourcentage.':''}`,b.cobraBurnStacks||undefined);
 if(omenRate(s))add('presages','◈','Collier des présages',`${b.omenStacks??0} cumul(s) : ${(b.omenStacks??0)*omenRate(s)} % de chance de Riposte. Chaque perte de PV par dégâts ajoute ${omenRate(s)} points, puis tente une riposte à 40 % des dégâts d’attaque. Tous les cumuls sont consommés au déclenchement.`,b.omenStacks??0);
 if(s.hero.key==='kaerune'&&b.redressement)add('redressement','✦','Redressement',`Dégâts d’attaque +5 %, vitesse +3 % jusqu’à la fin du combat. À 30 % des PV max ou moins : soigne 4 % des dégâts réellement infligés. ${b.hp<=b.maxHp*.3?'Vol de vie actif.':'Vol de vie en attente du seuil de PV.'}`);
 return effects;
}
// Old saves predate the counter. Existing encounters allow at most two Slime boosts:
// 10–12% identifies one application, 21–25.44% identifies two.
const enemyPowerStacks=e=>e.powerStacks??(e.powerBonus>0?(e.powerBonus>12.001?2:1):0);
export function enemyEffects(e,round=1){
 const effects=[];
 for(const sh of activeShields(e,round))effects.push({id:'shield-'+sh.source,icon:'⬡',name:sh.source,text:`${sh.amount} points de bouclier. Les dégâts sont absorbés avant les PV.`,stacks:sh.amount});
 if(EXPEDITION_BESTIARY[e.type])for(const skill of EXPEDITION_BESTIARY[e.type].skills)effects.push({id:'expedition-'+e.type,icon:'✦',name:skill.name,text:skill.text});
 if(e.trap?.until>=round)effects.push({id:'piege',icon:'⌁',name:'Piège du pisteur',text:`Prochaine action offensive : 60 % des dégâts de Drunn subis avant la frappe, puis dégâts de cette action −30 %. ${e.trap.until-round+1} tour(s) restant(s).`});
 if(e.frostGuard)effects.push({id:'frost-guard',icon:'⬡',name:'Garde de glace',text:'La prochaine frappe directe subie inflige 20 % de dégâts en moins. Le poison et les brûlures ignorent cette garde.'});
 if(e.type==='lantern'&&e.lanternWard)effects.push({id:'lantern-link',icon:'⬡',name:'Lueur protectrice',text:'Tant que sa Luciole liée est vivante, tous les dégâts subis sont réduits de 50 %.'});
 if(e.type==='abyssfly')effects.push({id:'fly-support',icon:'✚',name:'Soutien',text:'N’attaque pas. Soigne son maître de 20 % des PV max ou lui accorde Puissance s’il est déjà en pleine santé.'});
 if(e.summonedBy)effects.push({id:'linked',icon:'∞',name:'Invocation liée',text:'Disparaît lorsque le Sceptre et lanterne meurt. Aucun butin ni EXP supplémentaire.'});
 if(e.guardian)effects.push({id:'guardian',icon:'◈',name:'Gardien de la Traversée',text:TRIALS[e.guardian].rule});
 if(e.riftKind){effects.push({id:'rift-rule',icon:'◈',name:'Créature de la Fissure',text:RIFT_CREATURES[e.riftKind].rule});if(e.rift.ward)effects.push({id:'rift-ward',icon:'⬡',name:'Ailes protectrices',text:'Première frappe directe réduite de 50 %.'});if(e.rift.cocoon)effects.push({id:'rift-cocoon',icon:'◉',name:'Cocon',text:'Éclosion à la prochaine action de la Larve.'});if(e.rift.revived)effects.push({id:'rift-revived',icon:'◇',name:'Âme épuisée',text:'Cette entité a déjà été ressuscitée.'});}
 const add=(id,icon,name,text,stacks)=>effects.push({id,icon,name,text,...(stacks===undefined?{}:{stacks})});
 if(e.forgeurStory){add('forgeur-enemy-rule','◆',e.name,FORGEUR_ENCOUNTERS[e.storyKind].rule);if(e.bombPending)add('bomb','●','Bombe au sol','Après la prochaine attaque de l’Écurexplosion : explosion à 140 % des dégâts.');if(e.rageStacks)add('three-heads','♨','Rage de la troisième tête',`Dégâts +${e.rageStacks*7} %.`,e.rageStacks);}
 if(e.riftKind==='saw'&&e.rift.step>0)add('saw-power','⚔','Scies grandissantes',`Prochaine frappe : ${100+10*e.rift.step} % des dégâts.`,e.rift.step);
 if(e.poisonStacks)add('poison','☠','Poison',`${e.poisonStacks} cumul(s) : perd ${e.poisonStacks*3} % de la plus élevée des statistiques dégâts/chance de Drunn au début de son tour.`,e.poisonStacks);
 if((e.weakenedUntil??0)>=round)add('weakened','↓','Affaibli — Saut',`Dégâts d’attaque réduits de 15 %. ${durationText(e.weakenedUntil,round,e.weakenedApplied)}`);
 if(e.type==='dragonnet'&&!e.storyKind)add('explosion','✹','Dernier brasier','À sa mort : inflige 7 % des PV max du compagnon, arrondis au supérieur. Ignore réduction et esquive. Si cette explosion vous terrasse, le combat est perdu, sans récompense.');
 if(e.type==='icewolf'&&!e.storyKind){add('glacier','❄','Glacier',e.glacierUsed?'Déjà utilisé : indisponible jusqu’à la fin du combat.':'Prêt : 135 % de ses dégâts lors de sa première action. Une fois par combat.');add('escrime','⚔','Escrime','Après Glacier : de 1 à 4 coups aléatoires, chacun à 33 % des dégâts de base.');}
 if(e.storyKind==='osculus')add('sand','◌','Sable de brouillage',e.sandUsed?'Déjà lancé : ne peut plus être utilisé.':'Première action : 20 % de risque de manquer les frappes pendant les deux prochains tours complets du compagnon.');
 if(e.storyKind==='tykytil')add('forest','✿','Protection de la forêt','Tours impairs : attaque à 110 %. Tours pairs : récupère 10 % de ses PV max, puis attaque normalement. Bonus non cumulable. Vitesse : 12,4 % de chance d’une seconde attaque normale ; le soin ne se répète pas.');
 if(e.storyKind==='arenaDrannex')add('two-heads','⚔','Deux gueules','50 % de chance de frapper une seconde fois à 50 % des dégâts. Chaque frappe a 24 % de chance de critique (×1,75). Aucune double action de vitesse.');
 if(e.storyKind==='mystrial')add('trial','♨','Épreuve des flammes','Tour 1 : Boule de feu à 120 %. Tour 2 : concentration sans attaque. Tour 3 : Énorme giga boule de feu à 250 %. Survivez aussi à la brûlure suivante pour réussir.');
 if(e.storyKind==='rakesh')add('scripted','◆','Force écrasante','Ra’Kesh frappe le premier et terrasse Drunn. Cette défaite fait avancer le récit et accorde les récompenses.');
 if(e.sealed)add('void','◈','Orbe ténébreuse','Chaque orbe inflige 51 % des PV max de Stibili. La magie de Stibili est scellée.');
 if(e.voidRematch)add('void-storm','◈','Rafale de Dyzeria','Tous les trois tours après son renforcement, attaque de zone à 75 % des dégâts : touche Stibili et sa Larve.');
 if(e.storyKind==='kappiouteau'||e.type==='dragonnet'&&!e.storyKind)add('fire','♨','Boule de feu',`120 % des dégâts, 10 % de chances de brûler jusqu’à la fin du combat (5 % des PV max au début de chaque tour). Même récupération que Stibili : ${SKILLS.feu.cd} tours. ${round>=(e.fireReady??1)?'Prête.':`Disponible dans ${e.fireReady-round} tour(s).`}`);
 if(e.attracted)add('attraction','◉','Attraction','Emprisonné dans le Néant. Perd sa prochaine action, puis réapparaît. La brûlure continue.');
 if(e.burnImmune)add('frost','❄','Cœur de glace','Immunité à la brûlure, jusqu’à la fin du combat. Les dégâts directs de Boule de feu restent appliqués.');
 if(['maella','maella2'].includes(e.storyKind))add('dice','⚄','Éclat du destin','Après chaque attaque de base, lance un dé à six faces. Sur 5 ou 6 : seconde frappe égale à 10 % des PV retirés par cette attaque, arrondie, minimum 1. Sur 1 à 4 : aucun dégât supplémentaire.');
 if(e.storyKind==='ozvex'){
  const left=Math.max(0,(e.wingsUntil??0)-round+1);
  add('wings','✦','Battement d’aile',`${e.wingsUsed?(left?`Chance de critique +15 points. ${durationText(e.wingsUntil,round,e.wingsApplied)}`:'Bonus terminé. Ne peut plus être relancé.'):'Au premier tour : chance de critique +15 points dès le lancement et pendant les 4 tours suivants. Une fois par combat.'} Chance actuelle : ${(enemyCritChance(e,round)*100).toFixed(1)} %. Critiques : 175 % des dégâts.`);
  add('falcon','♥','Faucon-Dragon','Après un coup critique provoqué par la chance de Stibili ou d’Ozvex, Ozvex récupère 10 % des PV réellement retirés par ce coup. Ne dépasse pas ses PV max et ne ressuscite jamais. Aucun soin sur brûlure.');
 }
 if(e.storyKind==='emillia')add('rage','⚔','Force & courage',`Chaque attaque augmente les dégâts de 15 % multiplicatifs jusqu’à la fin du combat. ${e.rageStacks??0} cumul(s). Dégâts actuels : ${e.dmg}.`,e.rageStacks??0);
 if(e.storyKind==='sword'){const left=Math.max(0,2-(e.revivals??0));add('sword-revival','☁','Régénération démoniaque',left?`Revient avec tous ses PV après sa défaite. ${left} résurrection${left>1?'s':''} restante${left>1?'s':''}. Les tours et effets en cours sont conservés. Récompenses après la troisième défaite uniquement.`:'Les deux résurrections ont été utilisées. Vainquez-la encore une fois pour terminer le combat.',left);}
 if(e.storyKind==='seraphyne')add('lesson','✦','Exercice de maîtrise',e.lesson==='first'?'Séraphyne arrête le duel dès sa première attaque. Cette défaite scénarisée valide la mission et donne ses récompenses une seule fois.':'Les PV de Séraphyne ne descendent pas sous 1. Lorsqu’elle atteint cette limite, elle conclut le duel. La défaite valide la mission et donne ses récompenses une seule fois.');
 if(e.storyKind==='umbraelys')add('survival','◈','Survie',e.survivalUsed?'Second souffle déjà utilisé.':'Survit à un coup fatal avec 1 PV, une seule fois par combat. Ce n’est pas une résurrection.');
 if(e.storyKind==='eliandris')add('light','☀','Lumière','Récupère 12 % de ses PV max au début de son tour et après chaque frappe non fatale qui est critique ou provient de la seconde action de vitesse. Un coup à la fois critique et issu de cette seconde action ne déclenche qu’un soin. Les simples enchaînements de plusieurs frappes ne comptent pas comme une double action.');
 if(e.storyKind==='cobra')add('lava','♨','Venin incandescent','Chaque attaque qui inflige des dégâts brûle à coup sûr. Première brûlure : 5 % des PV max au début de chaque tour du compagnon, puis 6 %, 7 %… à chaque nouvelle application. Persiste jusqu’à la fin du combat. Seul le Cobra cumule ainsi les brûlures.');
 if(e.storyKind==='skeleton')add('revival','☠','Rémanence',e.revived?'Résurrection utilisée. Dégâts réduits de 50 % jusqu’à la fin du combat.':'Revient une seule fois avec 50 % des PV max et 50 % de dégâts en moins.');
 if(e.storyKind==='felk')add('aura','✦','Aura Nébryss',e.aura?'7 % de chances de contre-attaquer après chaque frappe subie. Jusqu’à la fin du combat.':'Au premier tour : active une aura donnant 7 % de chances de contre-attaquer après chaque frappe subie.');
 if(['ushio','rivernia'].includes(e.storyKind))add('drain','☽',e.storyKind==='ushio'?'Arrache âme':'Épée du destin','120 % des dégâts d’attaque. Rend 30 % des dégâts réellement infligés en PV. Un tour complet entre deux utilisations.');
 if(e.storyKind==='rivernia')add('combativite','Ⅱ','Combativité','Aux tours 4, 8, 12… remplace sa compétence par deux attaques de base.');
 if(e.powerBonus)add('puissance','✧','Puissance',`Dégâts +${Number(e.powerBonus.toFixed(1))} %. ${enemyPowerStacks(e)} cumul(s). Jusqu’à la fin du combat.`,enemyPowerStacks(e));
 if(e.burning)effects.push({id:'burn',icon:'♨',name:'Brûlure',text:'Perd 5 % de ses PV max au début de chacun de ses tours. Jusqu’à la fin du combat.'});
 return effects;
}
export function resolveAction(s,action,rng=Math.random){
 const b=s.battle;if(!b)throw Error('Aucun combat en cours.');
 if(s.storyScene)throw Error('Terminez le dialogue avant de reprendre le combat.');
 if(b.mode==='world'&&b.stage!==chapterCleared(s,b.chapter??1)+1)throw Error('Combat terminé ou verrouillé.');
 if(b.mode==='forest'||b.mode==='trial'&&s.trials?.claimed)throw Error('Épreuve indisponible.');
 if(action==='end-turn'&&(!majesticBracelet(s)||!b.usedActions?.length))throw Error('Aucune seconde action à terminer.');
 if(actionAlreadyUsed(s,action))throw Error('Cette action a déjà été choisie ce tour.');
 if(b.openingPending?action!=='opening':!['attack','end-turn','astral-opening'].includes(action)&&!skillReady(s,action))throw Error('Compétence indisponible.');
 if(b.astralOpening&&action!=='astral-opening')throw Error('Les effets de début de tour sont en cours.');
 if(action==='astral-opening'&&!b.astralOpening)throw Error('Effet déjà résolu.');
 const nahatDuel=b.storyKey==='nahat'&&b.stage===3,lycaonLesson=b.storyKey==='nahat'&&b.stage===4;
 const duelOver=()=>nahatDuel&&(b.hp<b.maxHp*.1||b.enemies.some(e=>e.hp<e.maxHp*.1));
 const events=[],log=t=>{b.log.push(t);b.log=b.log.slice(-45);},alive=()=>b.enemies.filter(e=>e.hp>0);
 let forgeStrikeFactor=1,preventionWindow=b.preventionWindow??0;
 const nextEnemyAction=()=>{preventionWindow++;if(s.hero.key==='forgeur')b.preventionWindow=preventionWindow;};
 let actionScale=1,wingDouble=false,lastHitCritical=false,lastHitDamage=0,speedStrike=false,enemyActionBlocked=false;
 const orb=equippedItem(s,'orb')?.type,offensive=action==='attack'?'basic':['pret','feu','envol','tircharge','glacier','ouragan','foudroiement','saut','crocs','toxic','elementaire','sacrifice','plumes','sang','extraction','navigatrice','rebecca','piege','fracas','entailles'].includes(action)||action==='protectionultime'&&forgeState(b)==='cold'?'skill':null;
 let slimeFactor=b.slimeBoost&&offensive?1.4:1;if(!b.openingPending)b.slimeBoost=false;
 const alternating=offensive&&b.previousOffense&&offensive!==b.previousOffense;
 const cycleFactor=orb==='orbe-cycle'&&offensive&&b.previousOffense?(alternating?1.2:.85):1;
 if(b.mode==='trial'&&b.stage==='cycle')b.cycleBroken=!!(alternating&&b.lastOffenseRound===b.round-1);
 if(offensive){b.previousOffense=offensive;b.lastOffenseRound=b.round;}
 const outgoing=(basic=false,direct=true)=> (orb==='orbe-contrecoup'?1.2:orb==='orbe-brasier'&&b.hp<b.maxHp*.35?1.25:1)*(direct?cycleFactor:1)*(orb==='orbe-echo'&&basic?.8:1)*(basic&&majesticBracelet(s)?.5:1)*(direct?slimeFactor*actionScale*forgeStrikeFactor:1);
 const armor=equippedItem(s,'armor'),armorMultiplier=armor?.type==='armure-magique-diamanite'&&rarityIndex(armor)>=2?.98:1;
 const received=damage=>Math.max(1,Math.round(damage*(orb==='orbe-contrecoup'?1.3:1)*armorMultiplier*(s.hero.key==='forgeur'&&forgeState(b)==='hot'?1.15:1)));
 const echoHits=[],echoHeals=[];let echoCasting=false;
 let refusalPending=null,trappedAction=null,riposteCounted=false;
 const shieldEvent=(unit,to,label,absorbed=0)=>events.push({type:'shield',round:b.round,to,shields:structuredClone(unit.shields??[]),label,absorbed});
 const absorb=(unit,damage,to)=>{const out=absorbShield(unit,damage,b.round);if(out.absorbed)shieldEvent(unit,to,'Bouclier −'+out.absorbed,out.absorbed);return out.damage;};
 const flushRefusal=()=>{if(refusalPending){events.push(refusalPending);refusalPending=null;}};

 let hurricaneDouble=false;
 const forcedBasic=action==='attack'&&lastBreathReady(s),fangPower=crocsPercent(s)/100;
 const stoneShield=()=>{if(b.hp>0&&b.hp<=b.maxHp*.5&&!b.stoneBeltUsed&&accessoryOf(s,'ceinture-pierre')){b.stoneBeltUsed=true;grantShield(b,'Ceinture ancienne · seuil',b.maxHp*accessoryOf(s,'ceinture-pierre').stats.stoneShieldPercent/100);shieldEvent(b,'hero','Ceinture ancienne · bouclier');log(`Ceinture ancienne : second et dernier bouclier de ${accessoryOf(s,'ceinture-pierre').stats.stoneShieldPercent} % des PV max.`);}};
 const woundHero=(damage,bypassShield=false)=>{
  if(!bypassShield)damage=absorb(b,damage,'hero');
  if(nahatDuel||lycaonLesson)damage=Math.min(damage,Math.max(0,b.hp-1));
  const before=b.hp,lethal=before>0&&damage>=before;let survived=lethal&&skillUnlocked(s,'detresse')&&!b.distressUsed;
  b.hp=Math.max(survived?1:0,b.hp-damage);
  if(survived){b.distressUsed=true;b.unhealable=true;}
  if(lethal&&skillUnlocked(s,'refus')&&!b.refusUsed){
   b.refusUsed=true;const roll=rngInt(1,6,rng);b.refusSuccess=s.hero.level>=24?[1,2,6].includes(roll):roll===6;
   if(b.refusSuccess){b.hp=Math.max(1,Math.round(b.maxHp*.3));b.unhealable=true;survived=true;}
   if(b.refusSuccess&&s.hero.level>=24)grantShield(b,'Refus de mourir',b.maxHp*.03);
   refusalPending={shields:structuredClone(b.shields??[]),upgraded:s.hero.level>=24,type:'refusal',from:'hero',to:'hero',skill:'refus',roll,success:b.refusSuccess,hp:b.hp};
   log(`Refus de mourir — dé : ${roll}/6. ${b.refusSuccess?'Nahat survit : ses PV sont restaurés, puis il devient Insoignable et ses dégâts diminuent de 20 %.':'Le destin refuse : Nahat est vaincu.'}`);
  }
  if(b.hp>0&&b.hp<=b.maxHp*.3&&skillUnlocked(s,'instinct')&&!b.instinctUsed)b.instinctPending=true;
  stoneShield();return {actual:Math.min(before,damage),survived,damage};
 };
 const distressCue=()=>{if(b.refusSuccess){flushRefusal();return;}events.push({type:'distress',to:'hero',hp:b.hp});log('L’appel de détresse : Kaerune survit avec 1 PV et devient Insoignable jusqu’à la fin du combat.');};

 const blockAttack=()=>enemyActionBlocked;

 const receiveOmen=(damage,source=null)=>{
  if(damage<=0||b.hp<=0||!omenRate(s))return;
  b.omenStacks=(b.omenStacks??0)+1;
  events.push({type:'omen',stacks:b.omenStacks});
  const chance=b.omenStacks*omenRate(s),enemy=source?.hp>0?source:target();
  log(`Présages : ${b.omenStacks} cumul(s), ${chance} % de chance de Riposte.`);
  if(enemy&&rng()<chance/100){b.omenStacks=0;events.push({type:'omen',stacks:0});riposte(enemy,.4,'Collier des présages');}
 };

 const target=()=>b.enemies[b.target]?.hp>0?b.enemies[b.target]:alive()[0];
 const summonReinforcement=e=>{
  if(e.type!=='drannex'||e.hp<=0||e.hp>e.maxHp*.5||b.reinforcementCalled)return;
  b.reinforcementCalled=true;const level=3,f=1.13**2,base=ENEMIES.dog;
  const dog={id:'enemy'+b.enemies.length,type:'dog',name:base.name,art:base.art,level,maxHp:Math.round(base.hp*f),hp:Math.round(base.hp*f),dmg:Math.round(base.dmg*f),boss:false,healer:false,burning:false,powerUsed:false,powerBonus:0,joinedRound:b.round};
  if(b.mode==='world'&&b.stage>=4){dog.maxHp=Math.ceil(dog.maxHp*1.2);dog.hp=dog.maxHp;}
  if(e.storyKind==='felk'){dog.storyKind='reynga';dog.name=STORY_CAST.reynga.name;dog.art=STORY_CAST.reynga.art;}
  b.enemies.push(dog);events.push({type:'spawn',enemy:structuredClone(dog)});log(`${e.name} appelle ${dog.name} de niveau 3 ! Ce renfort attaquera au prochain tour.`);
 };
 const revive=e=>{
  if(e.riftKind==='spectralGuard'&&e.hp<=0&&!e.rift.spectralSpent){
   const hp=Math.max(1,Math.round((e.rift.nativeHp??e.maxHp)*.5)),dmg=Math.max(1,Math.round((e.rift.nativeDmg??e.baseDmg??e.dmg)*.5));
   events.push({type:'rift-portal',to:e.id});
   Object.assign(e,{riftKind:'specter',name:RIFT_CREATURES.specter.name,art:RIFT_CREATURES.specter.art,hp,maxHp:hp,dmg,baseDmg:dmg,burning:false,poisonStacks:0,weakenedUntil:0,powerBonus:0,shields:[],attracted:false});delete e.trap;
   Object.assign(e.rift,{step:0,spectralSpent:true});events.push({type:'rift-reform',to:e.id,enemy:structuredClone(e)});log('Le portail engloutit le Garde et libère un Spectre Néantin !');return;
  }

  if(e.storyKind==='sword'&&e.hp<=0&&(e.revivals??0)<2){
   e.revivals=(e.revivals??0)+1;e.hp=e.maxHp;
   events.push({type:'sword-revive',to:e.id,hp:e.hp,revivals:e.revivals,label:`Régénération démoniaque · ${e.revivals}/2`});
   log(`L’Épée des nuages se reforme dans les nuages démoniaques et retrouve tous ses PV. Résurrection ${e.revivals}/2.`);return;
  }
  if(e.storyKind!=='skeleton'||e.hp>0||e.revived)return;
  e.revived=true;e.hp=Math.ceil(e.maxHp*.5);e.dmg=Math.max(1,Math.round(e.baseDmg*.5));
  events.push({type:'revive',to:e.id,hp:e.hp,dmg:e.dmg});log(`${e.name} revient avec la moitié de ses PV max et de ses dégâts !`);
 };
 const falconHeal=damage=>{
  for(const bird of alive().filter(x=>x.storyKind==='ozvex')){
   const amount=Math.min(bird.maxHp-bird.hp,Math.round(damage*.1));if(amount<=0)continue;
   bird.hp+=amount;events.push({type:'heal',to:bird.id,amount,label:'Faucon-Dragon'});log(`Faucon-Dragon : ${bird.name} récupère ${amount} PV après le coup critique.`);
  }
 };
 let lastEnemyTarget='hero';
 const enemyTarget=()=>{
  if(b.larva?.hp>0)return b.larva;
  const candidates=[b,...livingPups(b),...(b.bone?.hp>0?[b.bone]:[])];return candidates.length===1?b:candidates[rngInt(0,candidates.length-1,rng)];
 };
 const allyId=unit=>unit===b?'hero':unit.id;
 const incoming=(e,unit,id,damage,crit=false,projectile=false)=>{
  if(id==='hero'&&blockAttack(e))return 0;
  if(id==='hero')damage=received(damage);else damage=absorb(unit,damage,id);
  const {actual,survived,damage:hpDamage}=id==='hero'?woundHero(damage):{actual:Math.min(unit.hp,damage),survived:false,damage};if(id!=='hero')unit.hp=Math.max(0,unit.hp-damage);
  events.push({type:'hit',from:e.id,to:id,damage:hpDamage,hpAfter:id==='hero'&&refusalPending?0:unit.hp,crit,projectile});
  if(id==='hero'&&s.hero.key==='forgeur'){if(b.preventionArmed){b.preventionPending={rate:b.preventionArmed,amount:0,window:preventionWindow,enemy:e.id};b.preventionArmed=0;}if(b.preventionPending?.window===preventionWindow&&b.preventionPending.enemy===e.id)b.preventionPending.amount+=actual;forgeSync();}
  log(`${crit?'Critique ! ':''}${e.name} inflige ${hpDamage} dégâts à ${id==='hero'?CLASSES[s.hero.key].name:unit.name}.`);
  if(survived)distressCue();flushRefusal();
  if(id==='hero'){receiveOmen(actual,e);if(actual>0&&b.hp>0&&e.dispelsBonuses){dispelHeroBonuses(b);events.push({type:'dispel',to:'hero'});log('Les bonus du compagnon sont dissipés.');}if(b.hp>0&&e.hp>0)countRiposte(e);}
  if(id!=='hero'&&!unit.hp){events.push({type:'ally-down',to:id});log(`${unit.name} est vaincu${id==='larva'?' : Stibili est à découvert':''}.`);}
  return actual;
 };
 const executeSpecter=(e,unit,id)=>{
  if(unit.hp<=0||unit.hp>unit.maxHp*.04)return false;
  const damage=unit.hp,result=id==='hero'?woundHero(damage,true):{survived:false};if(id!=='hero')unit.hp=0;
  events.push({type:'rift-cue',to:e.id,label:'Exécution spectrale',kind:'execute'},{type:'hit',from:e.id,to:id,damage,hpAfter:id==='hero'&&refusalPending?0:unit.hp,crit:false,projectile:'void-execute',execution:true});
  if(result.survived)distressCue();flushRefusal();
  if(id!=='hero'&&!unit.hp)events.push({type:'ally-down',to:id});
  log(`${e.name} exécute ${id==='hero'?CLASSES[s.hero.key].name:unit.name} en ignorant les boucliers.`);return true;
 };
 const enemyStrike=(e,mult=1,projectile=false,drain=false,area=false,riftMark=null,criticalChance=null)=>{
  if(b.hp<=0||e.hp<=0||duelOver())return 0;
  triggerTrap(e);if(e.hp<=0||b.hp<=0)return 0;
  if(trappedAction===e.id)mult*=.7;
  if(b.sealedMagic){lastEnemyTarget='hero';return incoming(e,b,'hero',Math.ceil(b.maxHp*.51),false,'void-orb');}
  const recipients=area?[['hero',b],...battleAllies(b).filter(a=>a.hp>0).map(a=>[a.id,a])]:[(()=>{const unit=enemyTarget();return [allyId(unit),unit];})()];
  let total=0;
  for(const [id,unit]of recipients){
   lastEnemyTarget=id;
   if(e.riftKind==='specter'&&executeSpecter(e,unit,id))continue;
   if(id==='hero'&&blockAttack(e))continue;
   if(id==='hero'&&dodgeChance(s,e)>0&&rng()<dodgeChance(s,e)){events.push({type:'dodge',from:e.id,to:'hero'});log(`${smokeActive(s)?'Écran de fumée / Analyse':'Analyse'} : attaque de ${e.name} esquivée.`);continue;}
   const chance=criticalChance??enemyCritChance(e,b.round),crit=chance>0&&rng()<chance;
   const targetState=id!=='hero'?{...s,battle:{...b,maxHp:unit.maxHp}}:s;
   const fissured=riftMark==='consume'&&unit.riftFissures?.[e.id];
   const damage=Math.max(1,Math.round(enemyDamage(targetState,e)*mult*(fissured?1.4:1)*(crit?(e.riftKind==='spectralGuard'?2:1.75):1)*(id==='hero'&&(b.buffs.courage??0)>=b.round?.5:1)));
   const actual=incoming(e,unit,id,damage,crit,projectile);total+=actual;if(crit)falconHeal(actual);if(e.hp>0&&e.riftKind==='specter')executeSpecter(e,unit,id);
   if(actual>0&&riftMark){unit.riftFissures??={};if(riftMark==='mark')unit.riftFissures[e.id]=true;else delete unit.riftFissures[e.id];events.push({type:'rift-marks',to:id,fissures:{...unit.riftFissures}});}
  }
  if(drain&&e.hp>0){const amount=Math.min(e.maxHp-e.hp,Math.round(total*.3),e.riftKind==='dragon'?Math.max(1,Math.round(e.maxHp*.04)):Infinity);e.hp+=amount;events.push({type:'heal',to:e.id,amount});log(`${e.name} absorbe ${amount} PV.`);}
  return total;
 };
 const deathEffect=e=>{
  if(e.riftKind==='saw'&&e.hp>0&&e.hp<=e.maxHp*.5&&!e.rift.sawShieldUsed){
   e.rift.sawShieldUsed=true;grantShield(e,'Rempart des scies',(b.summonBase??stats(s)).dmg*3);shieldEvent(e,e.id,'Rempart des scies · '+shieldTotal(e,b.round));
   log(`${e.name} obtient ${shieldTotal(e,b.round)} points de bouclier.`);
  }

  if(e.hp<=0&&e.type==='abyssfly'){const master=b.enemies.find(a=>a.id===e.summonedBy);if(master)master.lanternWard=false;}
  if(e.hp<=0)for(const child of b.enemies.filter(c=>c.summonedBy===e.id&&c.hp>0)){child.hp=0;events.push({type:'linked-death',to:child.id,from:e.id});log(`${child.name} disparaît avec son invocateur.`);}
  if(e.type!=='dragonnet'||e.storyKind||e.hp>0||e.exploded)return;
  e.exploded=true;const damage=received(Math.ceil(b.maxHp*7/100)),{actual,survived,damage:hpDamage}=woundHero(damage);
  events.push({type:'status',to:e.id,label:'Dernier brasier !'},{type:'hit',from:e.id,to:'hero',damage:hpDamage,hpAfter:refusalPending?0:b.hp,crit:false,projectile:'explosion'});if(survived)distressCue();
  for(const ally of battleAllies(b).filter(a=>a.hp>0))incoming(e,ally,ally.id,Math.ceil(ally.maxHp*.07),false,'explosion');
  receiveOmen(actual);log(`Dernier brasier : ${e.name} explose et inflige ${damage} dégâts (7 % des PV max).`);
 };
 const lanternDamage=(e,damage)=>e.type==='lantern'&&b.enemies.some(a=>a.hp>0&&a.type==='abyssfly'&&a.summonedBy===e.id)?Math.max(damage>0?1:0,Math.round(damage*.5)):damage;
 const wardDamage=(e,damage)=>{damage=lanternDamage(e,damage);if(!e.frostGuard)return damage;e.frostGuard=false;events.push({type:'expedition-ward',to:e.id,label:'Garde de glace · −20 %'});return Math.max(1,Math.round(damage*.8));};
 const wound=(e,damage)=>{
  const absorbedBefore=shieldTotal(e,b.round);damage=absorb(e,damage,e.id);const absorbed=absorbedBefore-shieldTotal(e,b.round);
  if(e.practiceDummy){const actual=Math.max(0,Number.isFinite(damage)?damage:0);e.totalDamage=(e.totalDamage??0)+actual;e.lastDamage=actual;return {actual,survived:false};}
  if(lycaonLesson)return {actual:0,survived:false};
  const before=e.hp,survived=e.storyKind==='umbraelys'&&!e.survivalUsed&&damage>=before;
  const floor=nahatDuel||b.sealedMagic||e.storyKind==='seraphyne'||survived?1:0;
  e.hp=Math.max(floor,e.hp-damage);if(survived)e.survivalUsed=true;
  if(e.riftKind==='dragon'&&e.rift.breathReady){e.rift.chargedDamage+=before-e.hp;if(e.rift.chargedDamage>=Math.ceil(e.maxHp*.15))e.rift.fractured=true;}
  if(e.guardian==='contrecoup'&&e.charging)e.chargeDamage+=before-e.hp;
  return {actual:before-e.hp,survived,absorbed};
 };
 function countRiposte(e){if(riposteCounted||nahatWeaponFamily(s)!=='epee-bouclier')return;riposteCounted=true;b.riposteCount=(b.riposteCount??0)+1;if(b.riposteCount>=4){b.riposteCount=0;riposte(e);}}
 function riposte(e,mult=astralActive(equippedItem(s,'weapon'),'epee-bouclier-astral')?1.25:.55,label='Mes armes : Mes choix'){
  if(lycaonLesson){events.push({type:'dodge',to:e.id});log('Lycaon esquive la riposte.');return;}
  const damage=wardDamage(e,trialDirectDamage(e,riftDirectDamage(b,e,Math.max(1,Math.round(combatStats(s).dmg*mult*outgoing(false,false))),true))),{survived}=wound(e,damage);
  events.push({type:'status',to:'hero',label:'Riposte !'},{type:'hit',from:'hero',to:e.id,damage,hpAfter:e.hp,crit:false,projectile:'black-slash',riposte:true});
  log(`${label} — riposte ! ${CLASSES[s.hero.key].name} inflige ${damage} dégâts à ${e.name}.`);
  if(survived)survivalCue(e);revive(e);deathEffect(e);summonReinforcement(e);
 }
 const survivalCue=e=>{events.push({type:'enemy-survival',to:e.id,label:'Survie · 1 PV'});log('Survie : Umbraelys reste debout avec 1 PV. Son second souffle est consommé.');};
 const lightHeal=(e,reason)=>{
  if(e.hp<=0)return;const amount=Math.min(e.maxHp-e.hp,Math.round(e.maxHp*12/100));
  if(amount<=0)return;e.hp+=amount;events.push({type:'heal',to:e.id,amount,label:'Lumière',light:true});log(`Lumière : Éliandris récupère ${amount} PV (${reason}).`);
 };
 const redressementHeal=damage=>{
  if(s.hero.key!=='kaerune'||!b.redressement||b.hp<=0||b.hp>b.maxHp*.3)return;
  const amount=healHero(s,damage*.04);if(amount<=0)return;
  events.push({type:'heal',to:'hero',amount,label:'Redressement'});log(`Redressement : Kaerune récupère ${amount} PV (4 % des dégâts infligés).`);
 };
 const hit=(mult=1,randomTarget=false,projectile=false,specific=null,basic=false,fixedDamage=null,extraDamage=0,nonCriticalBonus=0)=>{
  lastHitCritical=false;lastHitDamage=0;const living=alive(),e=specific||(randomTarget?living[rngInt(0,living.length-1,rng)]:target());if(!e||e.hp<=0||b.hp<=0||duelOver())return null;
  if(lycaonLesson){events.push({type:'dodge',to:e.id});log('Lycaon esquive la frappe sans effort.');return null;}
  if((b.sandUntil??0)>=b.round&&rng()<.2){events.push({type:'miss',to:e.id,label:'Sable · frappe manquée !'});log(`Sable de brouillage : Drunn manque ${e.name}.`);return null;}

  if(basic){mult*=basicMultiplier(s);if(s.hero.key==='stibili')b.accumulation=0;if(s.hero.key==='wolffy'&&b.cloudStrike){b.cloudStrike=false;events.push({type:'cloud-strike',active:false});}}
  const v=combatStats(s),crit=fixedDamage!==null?false:basic&&forcedBasic?true:rng()<Math.min(action==='crocs'?.49:1,v.crit);lastHitCritical=crit;
  const power=fixedDamage!==null?fixedDamage:basic?Math.max(1,Math.round(basicAttackPower(s)*mult)+(nahatWeaponFamily(s)==='protege-bras'?0:rngInt(-BASIC_VARIANCE,BASIC_VARIANCE,rng))):v.dmg*mult+extraDamage;
  const rawDamage=fixedDamage!==null?fixedDamage:Math.max(1,Math.round(power*(crit?1.75:1)+nonCriticalBonus));
  const damage=wardDamage(e,trialDirectDamage(e,riftDirectDamage(b,e,Math.max(1,Math.round(rawDamage*outgoing(basic))),true)));
  if(echoCasting)echoHits.push({id:e.id,damage,projectile});
  const {actual,survived,absorbed=0}=wound(e,damage);lastHitDamage=actual+absorbed;events.push({type:'hit',from:'hero',to:e.id,damage,hpAfter:e.hp,crit,projectile,matriarch:!!b.matriarch,charges:shotCharges});if(survived)survivalCue(e);if(e.storyKind==='eliandris'&&actual>0&&(crit||speedStrike))lightHeal(e,crit?'coup critique':'seconde action de vitesse');log(`${crit?'Critique ! ':''}${CLASSES[s.hero.key].name} inflige ${damage} dégâts à ${e.name}.`);redressementHeal(actual);if(crit){falconHeal(actual);if(bowPassiveActive(equippedItem(s,'weapon'))&&!(basic&&forcedBasic)){b.astralArcStacks=(b.astralArcStacks??0)+1;events.push({type:'status',to:'hero',label:'Maîtrise de l’arc · +'+(3*b.astralArcStacks)+' %'});}}if(wingDouble){const amount=healHero(s,actual*.07);if(amount)events.push({type:'heal',to:'hero',amount,label:'Porte-aile Astral'});}revive(e);deathEffect(e);summonReinforcement(e);if(e.aura&&e.hp>0&&rng()<.07){log('Aura Nébryss : contre-attaque !');enemyActionBlocked=false;trappedAction=null;riposteCounted=false;nextEnemyAction();enemyStrike(e,1,'purple-slash');}return e;
 };
 function triggerTrap(e){
  if(!e.trap||e.trap.until<b.round)return;
  delete e.trap;trappedAction=e.id;
  const damage=wardDamage(e,trialDirectDamage(e,riftDirectDamage(b,e,Math.max(1,Math.round(combatStats(s).dmg*.6*outgoing(false,false))),true))),{survived}=wound(e,damage);
  events.push({type:'trap-trigger',to:e.id},{type:'hit',from:'hero',to:e.id,damage,hpAfter:e.hp,crit:false,projectile:'tracker-trap'});
  log(`Piège du pisteur : ${e.name} subit ${damage} dégâts ; son action inflige 30 % de dégâts en moins.`);
  if(survived)survivalCue(e);revive(e);deathEffect(e);summonReinforcement(e);
 }
 const extend=(name,n)=>{
  b.buffs[name]=Math.max(b.round,b.buffs[name]??0)+n;
  b.buffApplied??={};b.buffApplied[name]=b.round;
 };
 const shotCharges=action==='tircharge'?b.charges:0;
 if(action==='tircharge'){b.charges=0;log(`Tir chargé : ${shotCharges} charge(s) consommée(s).`);}
 const forgeShield=(source,amount)=>{const remaining=activeShields(b,b.round).filter(sh=>sh.source===source).reduce((n,sh)=>n+sh.amount,0);grantShield(b,source,remaining+Math.max(0,Math.round(amount)));shieldEvent(b,'hero',source+' · bouclier');};
 const forgeSync=()=>events.push({type:'forge-sync',to:'hero',tension:forgeTension(b),forgeNextStrike:!!b.forgeNextStrike,forgeNextFracas:!!b.forgeNextFracas,forgeNextProtection:!!b.forgeNextProtection,forgeJudgment:!!b.forgeJudgment,preventionArmed:b.preventionArmed??0,preventionPending:b.preventionPending?structuredClone(b.preventionPending):null,divineSwordStacks:b.divineSwordStacks??0});
 const changeTension=value=>{const before=forgeTension(b),state=forgeState(b);b.tension=Math.max(1,Math.min(5,value));if(before!==b.tension){events.push({type:'forge-tension',to:'hero',fromTension:before,tension:b.tension,fromState:state,state:forgeState(b),art:forgeArt(b)});log(`Acier vivant : ${before} → ${b.tension} Tensions · ${forgeState(b)==='hot'?'Surchauffe':forgeState(b)==='cold'?'Refroidissement':'Neutre'}.`);}};
 const prepareForgeStrike=isOffensive=>{forgeStrikeFactor=1;if(s.hero.key!=='forgeur')return;if(isOffensive){if(b.forgeNextStrike){forgeStrikeFactor*=1.2;b.forgeNextStrike=false;}if(b.forgeJudgment&&forgeState(b)==='hot'){forgeStrikeFactor*=2;b.forgeJudgment=false;}}else b.forgeJudgment=false;};
 const forgeTurnStart=()=>{
  if(s.hero.key!=='forgeur'||b.hp<=0||b.forgeTurnStarted===b.round)return;b.forgeTurnStarted=b.round;
  if(equippedItem(s,'weapon')?.type==='epee-dieux-nuageux'){const cost=Math.ceil(b.maxHp*.05);woundHero(cost,true);events.push({type:'sacrifice',to:'hero',damage:cost,hpAfter:b.hp});if(b.hp>0){b.divineSwordStacks=(b.divineSwordStacks??0)+1;log(`Épée des dieux nuageux : ${cost} PV sacrifiés, dégâts +${b.divineSwordStacks*10} %.`);}}
  if(b.hp>0&&forgeState(b)==='cold')forgeShield('Acier vivant',b.maxHp*.15);
  if(b.hp>0&&b.preventionPending){forgeShield('Auréole de prévention',b.preventionPending.amount*b.preventionPending.rate);b.preventionPending=null;}
  forgeSync();
 };
 const cast=id=>{
  if(id==='epine'&&b.hp<=0)return;
  const forgeWas=forgeState(b);prepareForgeStrike(['fracas','entailles'].includes(id)||id==='protectionultime'&&forgeWas==='cold');
  if(s.hero.key==='stibili'&&!['transmutation','elementaire'].includes(id)){b.accumulation++;if(['feu','glacier','ouragan'].includes(id)){b.elementalUsed??={};b.elementalUsed[id]=true;}}
  events.push({type:'skill',skill:id,to:id==='soin'?'hero':target()?.id,matriarch:!!b.matriarch,charges:shotCharges});log(SKILLS[id].name+' !');
  if(id==='fracas'){hit(forgeWas==='hot'?1.75:.80,false,'forge-sword');const gain=b.forgeNextFracas?2:1;b.forgeNextFracas=false;changeTension(forgeTension(b)+gain);}
  if(id==='protectionultime'){forgeShield('Protection ultime',b.maxHp*(forgeWas==='cold'?.17:.12));if(forgeWas==='cold')hit(0,false,'forge-shield-strike',null,false,null,shieldTotal(b,b.round)*.42);const loss=b.forgeNextProtection?2:1;b.forgeNextProtection=false;changeTension(forgeTension(b)-loss);}
  if(id==='entailles'){const count=rngInt(1,3,rng),victim=target();for(let i=0;i<count&&victim?.hp>0&&b.hp>0;i++)hit(.65,false,'forge-slash',victim);}
  if(id==='magmageux'){forgeShield('Protection Magmageux',b.maxHp*.2);if(b.hp<=b.maxHp*.49){const e=target();if(e?.hp>0&&!e.burnImmune){e.burning=true;events.push({type:'forge-burn',to:e.id,label:'Brûlure · 5 % des PV max',burning:true});}else if(e)events.push({type:'status',to:e.id,label:'Immunité à la brûlure'});}}
  if(id==='regulation'){changeTension(3);if(forgeWas==='hot'){forgeShield('Refroidissement brutal',(b.summonBase??stats(s)).dmg*2.5);b.forgeNextProtection=true;}else if(forgeWas==='cold'){b.forgeNextStrike=true;b.forgeNextFracas=true;}events.push({type:'forge-regulation',to:'hero',previous:forgeWas});}
  if(id==='jugement'){const cost=Math.ceil(b.maxHp*.25);woundHero(cost,true);events.push({type:'sacrifice',to:'hero',damage:cost,hpAfter:b.hp});if(b.hp>0){forgeShield('Jugement',(b.summonBase??stats(s)).dmg*1.5);b.forgeJudgment=true;}}
  if(id==='aureole')b.preventionArmed=speedStrike?1:.5;
  if(s.hero.key==='forgeur')forgeSync();
  if(id==='navigatrice'){hit(.75,false,'blood-price');if(b.hp>0&&rng()<.75){b.rebeccaReady=true;events.push({type:'status',to:'hero',label:'Dague de Rebecca obtenue !'});log('Dague de Rebecca est disponible pour une utilisation.');}}
  if(id==='rebecca'){hit(.25,false,'blood-price');if(b.hp>0){const remaining=activeShields(b,b.round).filter(sh=>sh.source==='Dague de Rebecca').reduce((sum,sh)=>sum+sh.amount,0);grantShield(b,'Dague de Rebecca',remaining+Math.round(b.maxHp*.1));shieldEvent(b,'hero','Dague de Rebecca · bouclier +10 %');}}
  if(id==='plumes'){const percent=plumesPercent(s);hit(percent/100,false,'luminous-feathers');b.plumesStacks=Math.min(13,(b.plumesStacks??0)+1);events.push({type:'plumes-charge',to:'hero',stacks:b.plumesStacks,percent:plumesPercent(s)});log(`Plumes tranchantes : prochain lancer à ${plumesPercent(s)} %.`);}
  if(id==='sang'){const v=combatStats(s);hit(.9,false,'blood-price',null,false,null,0,Math.min(v.dmg,(b.maxHp-b.hp)*.15));}
  if(id==='proie'){const e=target();b.prey={id:e.id,until:b.round+2};events.push({type:'prey-mark',to:e.id,prey:structuredClone(b.prey)});}
  if(id==='piege'){hit(1,false,'absorbing-arrow');const amount=healHero(s,lastHitDamage*2);events.push({type:'heal',to:'hero',amount,label:'Flèche absorbante'});log(`Flèche absorbante : Drunn récupère ${amount} PV.`);}
  if(id==='transmutation'){const stacks=b.accumulation;b.accumulation=0;grantShield(b,'Transmutation élémentaire',b.maxHp*Math.min(.15,.03*stacks),b.round+1);shieldEvent(b,'hero','Transmutation · '+stacks+' cumuls convertis');}
  if(id==='extraction'){
   const e=target(),v=combatStats(s),stacks=e.poisonStacks,damage=lanternDamage(e,Math.max(1,Math.round(v.dmg*.11*stacks*outgoing(false,true))));e.poisonStacks=0;
   events.push({type:'poison-stack',to:e.id,stacks:0});const {survived}=wound(e,damage);events.push({type:'hit',from:'hero',to:e.id,damage,hpAfter:e.hp,crit:false,projectile:'venom-extract'});if(echoCasting)echoHits.push({id:e.id,damage,projectile:'venom-extract'});
   log(`Extraction du venin : ${stacks} cumuls consommés, ${damage} dégâts.`);if(survived)survivalCue(e);revive(e);deathEffect(e);summonReinforcement(e);
  }
  if(id==='soin'){
   b.healCharges=(b.healCharges??2)-1;b.healLastTurn=b.round;events.push({type:'heal-charges',charges:b.healCharges,round:b.round});
   const crit=rng()<combatStats(s).crit,rate=crit?.5:.3;cleanseHero(b);events.push({type:'cleanse',to:'hero'});
   const amount=healHero(s,b.maxHp*rate);events.push({type:'heal',to:'hero',amount,crit,label:crit?'Soin critique':'Soin'});log(`Stibili se purifie et récupère ${amount} PV${crit?' — soin critique à 50 % des PV max':''}.`);
  }
  if(id==='souffle'){b.lastBreathTurn=b.round+1;b.lastBreathCasts=(b.lastBreathCasts??0)+1;events.push({type:'breath-cost',stacks:b.lastBreathCasts});log(`Dernier souffle : prochain tour préparé ; dégâts −${Math.min(100,15*b.lastBreathCasts)} % jusqu’à la fin du combat.`);}
  if(id==='fumee'){b.smokeUsed=true;b.smokeUntil=b.round+2;log('Écran de fumée : +22 points d’esquive pendant 3 tours.');}
  if(id==='saut'){const e=hit(1,false,'wolf-leap');if(e?.hp>0){e.weakenedUntil=b.round+2;e.weakenedApplied=b.round;events.push({type:'weakened',to:e.id,until:e.weakenedUntil});log(`${e.name} : dégâts réduits de 15 %.`);}}
  if(id==='crocs'){b.fangStacks=0;hit(fangPower,false,'fangs');if(lastHitCritical&&b.hp>0&&livingPups(b).length<2){const pup=makeWolfPup(b.summonBase??stats(s),b.pups.length,s);b.pups.push(pup);events.push({type:'ally-summon',ally:structuredClone(pup)});log('Crocs nuageux — critique : un Bébé Wolffy rejoint la meute !');}}
  if(id==='toxic'){const e=hit(.25,false,'toxic-arrow');if(e?.hp>0){e.poisonStacks=(e.poisonStacks??0)+1;events.push({type:'poison-stack',to:e.id,stacks:e.poisonStacks});log(`Poison : ${e.name}, ${e.poisonStacks} cumul(s).`);}}
  if(id==='elementaire'){
   b.elementalSacrificeUsed=true;const stacks=b.accumulation??0,percent=110+10*stacks;hit(percent/100,false,'elemental-orb');b.accumulation=0;events.push({type:'elemental-consume',stacks,percent});log(`Sacrifice élémentaire : ${percent} % de dégâts, ${stacks} cumul(s) d’Accumulation consommé(s), sans coût en PV.`);
  }
  if(id==='sacrifice'){
   const damage=Math.ceil(b.maxHp*.15),{survived}=woundHero(damage,true);events.push({type:'sacrifice',to:'hero',damage,hpAfter:refusalPending?0:b.hp});if(survived)distressCue();log(`Sacrifice pour l’épine : ${damage} PV sacrifiés.`);
   if(b.hp>0)hit(1,false,'blood-strike',null,false,damage);
  }
  if(id==='larve'){const base=b.summonBase??stats(s);const hp=Math.max(1,Math.round(base.hp*.35)),dmg=Math.max(1,Math.round(base.dmg*.5));b.larva={id:'larva',name:'Larve du Néant',art:'larve-neant',hp,maxHp:hp,dmg,burning:false};b.larvaUsed=true;events.push({type:'ally-summon',ally:structuredClone(b.larva)});log(`Larve du Néant invoquée : ${hp} PV, ${dmg} dégâts. Elle protège Stibili des attaques ciblées.`);}
  if(id==='foudroiement')for(const e of alive())hit(.8,false,'lightning',e);
  if(id==='fury'){extend('fury',2);for(const pup of livingPups(b)){pup.furyUntil=b.buffs.fury;events.push({type:'pup-fury',to:pup.id,until:pup.furyUntil,damage:Math.round(wolfPupDamage(pup,b.round))});}}
  if(id==='precision')extend('precision',3);
  if(id==='courage')extend('courage',2);
  if(id==='puissance')b.powerCasts++;
  if(id==='attraction'){const e=target();if(e){e.attracted=true;events.push({type:'exile',to:e.id});log(`${e.name} est emprisonné : sa prochaine action sera perdue.`);}}
  if(id==='ouragan'){
   hit(hurricaneMultiplier(s),false,'tornado');
   const increased=hurricaneDouble||rng()<.5;b.hurricaneStacks=increased?(b.hurricaneStacks??0)+1:0;
   const power=Number((hurricaneMultiplier(s)*100).toFixed(1));events.push({type:'hurricane-charge',power,increased,stacks:b.hurricaneStacks});log(`Ouragan : ${increased?'la tempête se renforce':'les cumuls sont dissipés'}. Prochain lancer : ${power} %.`);
  }
  if(id==='epine'){const cost=Math.ceil(b.maxHp*.1),{survived}=woundHero(cost,true);events.push({type:'sacrifice',to:'hero',damage:cost,hpAfter:refusalPending?0:b.hp});if(survived)distressCue();if(b.hp>0)b.epineStacks=(b.epineStacks??0)+1;log(`Nahat sacrifie ${cost} PV. Pour l’Épine : dégâts +${7*(b.epineStacks??0)} % jusqu’à la fin du combat.`);}
  if(id==='meute'){
   const crit=rng()<combatStats(s).crit,count=Math.min(crit?2:1,Math.max(0,2-livingPups(b).length)),base=b.summonBase??stats(s);b.packUsed=true;
   events.push({type:'pack-call',crit,count});log(`Appel de la meute${crit?' — coup critique !':''} ${count} Bébé${count>1?'s':''} Wolffy ${count>1?'rejoignent':'rejoint'} le combat.`);
   for(let i=0;i<count;i++){const pup=makeWolfPup(base,b.pups.length,s);b.pups.push(pup);events.push({type:'ally-summon',ally:structuredClone(pup)});}
  }
  if(id==='redressement'){b.redressement=true;log('Redressement : dégâts d’attaque +5 %, vitesse +3 % jusqu’à la fin du combat. À 30 % de PV ou moins, soigne 4 % des dégâts infligés.');}
  if(id==='pret')for(let i=0;i<3&&alive().length&&b.hp>0;i++)hit(rngInt(30,80,rng)/100,true,'arrows');
  if(id==='feu'){const e=hit(fireballPercent(s)/100,false,'fire');if(e&&e.hp>0&&e.burnImmune){events.push({type:'status',to:e.id,label:'Immunité à la brûlure'});log(`${e.name} résiste à la brûlure, mais subit les dégâts directs.`);}else if(e&&e.hp>0&&rng()<.1){e.burning=true;events.push({type:'status',to:e.id,label:'Brûlure'});log(`${e.name} brûle jusqu’à la fin du combat.`);}}
  if(id==='envol')for(const e of alive())hit(.7,false,'wind',e);
  if(id==='nuageux'){
   const missing=b.maxHp-b.hp,amount=healHero(s,missing*.22);events.push({type:'heal',to:'hero',amount});log(`Nuageux : Wolffy récupère ${amount} PV.`);
   const pups=livingPups(b);
   for(const pup of pups){const heal=Math.min(pup.maxHp-pup.hp,Math.round(pup.maxHp*.6));pup.hp+=heal;events.push({type:'heal',to:pup.id,amount:heal,label:'Nuageux'});log(`Nuageux : ${pup.name} récupère ${heal} PV.`);}
   if(pups.length){b.cloudStrike=true;events.push({type:'cloud-strike',active:true});log('Nuageux : prochaine frappe d’attaque de base de Wolffy renforcée de 50 %.');}
  }
  if(id==='tircharge')hit(chargedMultiplier(shotCharges),false,'charged');
  if(id==='glacier'){b.glacierUsed=true;hit(1.8,false,'ice');}

 };
 if(action==='rebecca')b.rebeccaReady=false;
 if(!b.openingPending&&!b.astralOpening&&action!=='end-turn'){
  const double=forcedBasic||!['crocs','soin','souffle','fumee','elementaire','meute','larve','redressement','proie','piege','sang','transmutation','extraction','entailles','regulation','jugement'].includes(action)&&rng()<combatStats(s).double;let repeated=false;hurricaneDouble=action==='ouragan'&&double;
  const triple=double&&!forcedBasic&&astralActive(equippedItem(s,'weapon'),'griffe-astral');wingDouble=double&&!forcedBasic&&astralActive(equippedItem(s,'weapon'),'porte-aile-astral');
  for(let i=0;i<(triple?3:double?2:1)&&alive().length&&b.hp>0;i++){actionScale=i===2?.5:1;speedStrike=i>0;if(i){slimeFactor=1;repeated=true;events.push({type:'double',source:forcedBasic?'souffle':'speed'});log(forcedBasic?'Dernier souffle : seconde frappe critique garantie !':'Vitesse : action supplémentaire !');}if(action==='attack'){prepareForgeStrike(true);hit(1,false,false,null,true);if(skillUnlocked(s,'adaptation')){b.adaptation=(b.adaptation??0)+1;events.push({type:'adaptation',to:'hero',stacks:b.adaptation});}}else{echoCasting=true;const beforeEvents=events.length;cast(action);echoCasting=false;echoHeals.push(...events.slice(beforeEvents).filter(e=>e.type==='heal'&&e.to==='hero'&&['soin','nuageux'].includes(action)).map(e=>e.amount));}}
  actionScale=1;wingDouble=false;forgeStrikeFactor=1;if(s.hero.key==='forgeur')forgeSync();
  if(repeated&&b.hp>0&&s.hero.key==='kaerune'&&s.hero.level>=SKILLS.matriarche.level&&!b.matriarch){
   if(rng()<SKILLS.matriarche.transformChance){
    b.matriarch=true;const amount=healHero(s,b.maxHp*.15);
    events.push({type:'transform',to:'hero',art:'kaerune-forme-2',hp:b.hp,maxHp:b.maxHp,amount,matriarch:true});
    log(`Grande matriarche : Kaerune se transforme, récupère ${amount} PV, gagne 10 % de dégâts et 10 points de double action jusqu’à la fin du combat !`);
   }else{
    log('Grande matriarche : pas de transformation cette fois (49 % de chances à chaque double action).');
   }
  }
  if(SKILLS[action]&&action!=='redressement')b.cooldowns[action]=b.round+(SKILLS[action].waitTurns!==undefined?SKILLS[action].waitTurns+1:SKILLS[action].cd);
 }
 if(orb==='orbe-echo'&&SKILLS[action]){
  b.echoCount=(b.echoCount??0)+1;
  if(b.echoCount===3){b.echoCount=0;events.push({type:'status',to:'hero',label:'Écho brisé · 50 %'});log('Écho brisé : troisième compétence, répétition des dégâts et soins directs à 50 %.');
   for(const h of echoHits){const e=b.enemies.find(e=>e.id===h.id);if(!e?.hp||b.hp<=0)continue;const damage=wardDamage(e,trialDirectDamage(e,riftDirectDamage(b,e,Math.max(1,Math.round(h.damage*.5)),true))),{survived}=wound(e,damage);events.push({type:'hit',from:'hero',to:e.id,damage,hpAfter:e.hp,crit:false,projectile:h.projectile});if(survived)survivalCue(e);revive(e);deathEffect(e);summonReinforcement(e);}
   for(const n of echoHeals){const amount=healHero(s,n*.5,true);events.push({type:'heal',to:'hero',amount,label:'Écho brisé'});}
  }
 }
 flushRefusal();
 if(majesticBracelet(s)&&!b.openingPending&&!b.astralOpening&&action!=='end-turn'&&!SKILLS[action]?.extraAction)(b.usedActions??=[]).push(action);
 const extraAction=!!SKILLS[action]?.extraAction||action==='astral-opening';
 const anotherChoice=majesticBracelet(s)&&!b.openingPending&&action!=='end-turn'&&b.usedActions.length<2&&(!actionAlreadyUsed(s,'attack')||availableSkills(s).some(d=>skillReady(s,d.id)));
 if(!anotherChoice&&!extraAction){
 if(skillUnlocked(s,'crocs'))b.fangStacks=(b.fangStacks??0)+1;
 for(const ally of battleAllies(b))for(let strike=0;strike<(ally.isPup&&astralActive(equippedItem(s,'weapon'),'dentier-astral')?2:1);strike++){
  if(b.hp<=0||!alive().length||duelOver())break;if(ally.hp<=0)continue;
  if(lycaonLesson){events.push({type:'dodge',to:target().id});log('Lycaon esquive aussi l’invocation.');continue;}
  const prey=ally.isPup?markedPrey(b):null,e=prey??target(),damage=wardDamage(e,riftDirectDamage(b,e,Math.round((ally.isPup?wolfPupDamage(ally,b.round):ally.dmg)*(prey?1.2:1)),false)),{survived}=wound(e,damage);
  events.push({type:'hit',from:ally.id,to:e.id,damage,hpAfter:e.hp,crit:false,projectile:ally.isBone?'bone-drop':ally.isPup?'pack-slash':'purple-slash'});
  log(`${ally.name} inflige ${damage} dégâts à ${e.name}.`);
  if(survived)survivalCue(e);revive(e);deathEffect(e);summonReinforcement(e);
  if(e.aura&&e.hp>0&&b.hp>0&&rng()<.07){enemyActionBlocked=false;trappedAction=null;riposteCounted=false;nextEnemyAction();enemyStrike(e,1,'purple-slash');}
 }
 }
 const astralPulse=()=>{
  const cape=astralActive(equippedItem(s,'armor'),'cape-astral'),guard=s.hero.key==='nahat'&&astralActive(equippedItem(s,'weapon'),'protege-bras-astral')&&b.round>1;
  if(b.hp<=0||!alive().length)return;
  if(cape)events.push({type:'astral-vortex'});
  for(const kind of [cape?'cape':null,guard?'guard':null].filter(Boolean)){
   const victims=kind==='cape'?alive():[alive()[rngInt(0,alive().length-1,rng)]];
   for(const e of victims){if(!e||e.hp<=0||b.hp<=0)continue;const damage=wardDamage(e,trialDirectDamage(e,riftDirectDamage(b,e,Math.max(1,Math.round((kind==='cape'?combatStats(s).dmg:b.maxHp)*.02*outgoing(false,false))),true))),{survived}=wound(e,damage);
    events.push({type:'hit',from:'hero',to:e.id,damage,hpAfter:e.hp,crit:false,projectile:kind==='cape'?'void-orb':'blood-price'});log(`${kind==='cape'?'Cape protectrice Astral':'Protège-bras Astral'} : ${damage} dégâts à ${e.name}.`);if(survived)survivalCue(e);revive(e);deathEffect(e);summonReinforcement(e);
   }
  }
 };
 const finish=won=>{
  if(!won&&b.hp<=0&&!b.astralDeathUsed&&!b.sealedMagic&&astralActive(equippedItem(s,'weapon'),'baton-astral',3)){
   b.astralDeathUsed=true;const e=target();if(e){const damage=wardDamage(e,trialDirectDamage(e,riftDirectDamage(b,e,Math.max(1,Math.round(combatStats(s).dmg*2*outgoing(false,false))),true))),{survived}=wound(e,damage);events.push({type:'status',to:'hero',label:'Ultime explosion Astral'},{type:'hit',from:'hero',to:e.id,damage,hpAfter:e.hp,crit:false,projectile:'elemental-orb'});log(`Bâton Astral : ultime explosion, ${damage} dégâts.`);if(survived)survivalCue(e);revive(e);deathEffect(e);won=e.hp<=0;}
  }
  flushRefusal();
  if(b.mode!=='practice'&&won&&!(nahatDuel&&b.hp<b.maxHp*.1))recordAchievement(s,'wins');
  const scriptedDefeat=!won&&b.hp<=0&&b.story&&((s.hero.key==='kaerune'&&!!b.lesson)||b.sealedMagic||b.storyKey==='drunn'&&b.stage===3||lycaonLesson&&b.lycaonFinisherPending),completed=won||scriptedDefeat;
  if(won&&b.storyKey==='nahat'&&b.stage===2&&(b.nahatWave??1)<4){
   const next=(b.nahatWave??1)+1;s.battle=null;startBattle(s,'world',2,rng);s.battle.nahatWave=next;s.battle.enemies=nahatEnemies(2,next);s.battle.log=[`Traversée des bois : combat ${next} / 4. PV et compétences restaurés. Aucune récompense avant la fin des quatre rencontres.`];return {events,result:null};
  }
  if(won&&b.story&&s.hero.key==='wolffy'&&b.stage===7&&b.storyWave===1){
   s.wolffyStory??={cemetery:0};s.wolffyStory.cemetery=1;s.battle=null;
   s.storyScene={stage:7,phase:'between',index:0};return {events,result:null};
  }
  let xp=0,baseGold=0,bonusGold=0,rareGoldBonus=0,rewardItem=null,resourceDrops=[];const old=s.hero.level,first=completed&&b.mode==='world',firstRift=completed&&b.mode==='rift'&&b.stage>riftCleared(s),potionDropAllowed=b.mode==='training'||b.mode==='rift'&&(firstRift||b.stage!==50&&riftReplays(s,b.stage)<5);
  if(completed&&b.mode!=='practice'){
   xp=b.mode==='trial'?0:b.mode==='rift'?Math.round(b.riftRewardXp*(firstRift?1:b.stage!==50&&riftReplays(s,b.stage)<5?.25:0)):s.hero.level>=MAX_LEVEL?0:b.mode==='training'?expeditionXp(b.expeditionEntryLevel??s.hero.level,rng):Math.round(22*1.18**(b.level-1)*((b.enemies.filter(e=>!e.noReward).length===2||b.story&&b.stage===chapterSize(s,b.chapter??1))?1.3:1));
   if(b.mode==='rift'){baseGold=firstRift?riftFloor(b.stage).gold:riftReplays(s,b.stage)<5?riftFloor(b.stage).replayGold:0;s.rift??={cleared:0};s.rift.cleared=Math.max(riftCleared(s),b.stage);if(!firstRift){s.rift.replays??={};s.rift.replays[b.stage]=Math.min(5,riftReplays(s,b.stage)+1);}}
   else if(b.mode==='trial'){
    s.trials={claimed:b.stage};rewardItem=createItem(TRIALS[b.stage].orb,rng);s.items.push(rewardItem);
   }else{const range=b.mode==='training'?trainingGoldRange(s):worldGoldRange(b.stage+(b.chapter===2?9:0));baseGold=rngInt(...range,rng);if(b.mode==='training'&&b.enemies.some(e=>e.type==='icewolf'&&!e.storyKind)){rareGoldBonus=Math.ceil(baseGold*1.3)-baseGold;baseGold+=rareGoldBonus;}bonusGold=first&&b.chapter!==2&&b.stage===1?ECONOMY.firstWorldCombatBonus:0;if(first){if(b.chapter===2){s.stibiliChapter2??={cleared:0,voidForm:false};s.stibiliChapter2.cleared=b.stage;}else s.cleared=b.stage;}}
   if(first&&b.storyKey==='nahat'&&b.stage===2){baseGold=30;xp*=4;}
   if(first&&b.chapter!==2&&s.hero.key==='stibili'&&STIBILI_MISSIONS[b.stage].potionReward){rewardItem={id:globalThis.crypto.randomUUID(),type:'potion-soin',rank:0,stats:{},purchasePrice:0};s.items.push(rewardItem);log('Cadeau de Kappiouteau : 1 Potion de soin ajoutée au sac.');}
   if(first&&b.storyKey==='drunn'&&b.stage===3&&!s.drunnTalismanClaimed){s.drunnTalismanClaimed=true;rewardItem=createItem('talisman-sables',rng);s.items.push(rewardItem);log('Ra’Kesh vous remet le Talisman des sables : +10 chance.');}
   resourceDrops=['rift','trial'].includes(b.mode)?[]:collectResources(s,b.enemies,rng);
   if(firstRift&&b.stage%10===0){s.resources??={};const held=resourceQuantity(s,'fragment-neant');if(held<RESOURCE_LIMIT){s.resources['fragment-neant']=held+1;resourceDrops.push({type:'fragment-neant',quantity:1});}}
   for(const drop of resourceDrops)log(`Butin : ${RESOURCES[drop.type].name} ×${drop.quantity}.`);
   if(won&&potionDropAllowed&&accessoryOf(s,'boucles-slime')&&rng()<.04){rewardItem=createItem('potion-soin',rng);s.items.push(rewardItem);log('Boucles Slime : une Potion de soin trouvée !');}
   if(b.mode==='training'){xp=Math.round(xp*(b.expeditionRewardMultiplier??1));baseGold=b.goldenEncounter?100:Math.round(baseGold*(b.expeditionRewardMultiplier??1));}
   s.gold+=baseGold+bonusGold;grantExperience(s,xp);
  }
  if(s.hero.level>old)s.pendingLevelUp={from:s.pendingLevelUp?.from??old,to:s.hero.level};
  const rewardSkill=first&&s.hero.key==='stibili'&&b.stage===3?(b.chapter===2?'larve':'attraction'):null;
  if(rewardSkill)log('Nouvelle compétence obtenue : '+SKILLS[rewardSkill].name+' !');
  if(b.mode==='training'&&(won||b.hp<=0||b.goldenEscaped)&&s.expeditionEncounters)delete s.expeditionEncounters[b.expedition??expeditionFor(b.enemies[0]?.type)];
  if(completed&&b.mode!=='practice')syncProfile(s);
  const result={goldenEncounter:!!b.goldenEncounter,goldenEscaped:!!b.goldenEscaped,nahatStory:b.storyKey==='nahat',nahatDuel,riftReplay:b.mode==='rift'&&!firstRift,riftReplayCount:b.mode==='rift'?riftReplays(s,b.stage):0,drunnStory:b.storyKey==='drunn',trialSurvived:!!b.trialSurvived,chapter:b.chapter??1,sealedMagic:!!b.sealedMagic,completed,scriptedDefeat,resourceDrops,rareGoldBonus,rewardSkill,won,xp,gold:baseGold+bonusGold,baseGold,bonusGold,rewardItem,levels:s.hero.level-old,oldLevel:old,first,escape:won&&b.story&&b.chapter!==2&&s.hero.key==='stibili'&&!!STIBILI_MISSIONS[b.stage].escape,worldDone:chapterCleared(s,b.chapter??1)>=chapterSize(s,b.chapter??1),mode:b.mode,stage:b.mode==='training'?(b.expedition??expeditionFor(b.enemies[0]?.type)):b.stage,log:[...b.log]};s.battle=null;
  if(completed&&b.story){if(s.hero.key==='wolffy'&&b.stage===7)s.wolffyStory.cemetery=0;s.storyScene={chapter:b.chapter??1,stage:b.stage,phase:'after',index:0,result};}
  return {events,result};
 };
 if(action==='astral-opening'){b.astralOpening=false;forgeTurnStart();astralPulse();if(b.hp<=0)return finish(false);return alive().length?{events,result:null}:finish(true);}
 if(b.openingPending){b.openingPending=false;const e=b.enemies[0],damage=b.hp;b.hp=0;events.push({type:'status',to:e.id,label:lycaonLesson?'Le fossé qui nous sépare':'Force écrasante'},{type:'hit',from:e.id,to:'hero',damage,hpAfter:0,crit:false});log(lycaonLesson?'Lycaon conclut la leçon d’un seul coup. Cette défaite fait avancer l’histoire.':'Ra’Kesh frappe avant que Drunn puisse agir. Cette défaite fait partie du récit.');return finish(false);}
 if(duelOver())return finish(true);
 if(b.hp<=0)return finish(false);
 if(!alive().length)return finish(true);
 if(extraAction){log(`${SKILLS[action]?.name??'Effet'} : extra-action terminée. Vous pouvez encore jouer normalement.`);return {events,result:null};}
 if(anotherChoice){log('Bracelet majestueux : choisissez une autre action, ou terminez votre tour.');return {events,result:null};}
 for(const e of alive()){
  if(e.hp<=0)continue;
  enemyActionBlocked=false;trappedAction=null;riposteCounted=false;nextEnemyAction();
  if(e.poisonStacks){const v=combatStats(s),damage=lanternDamage(e,Math.max(1,Math.round(Math.max(v.dmg,v.luck)*.03*e.poisonStacks*outgoing(false,false)))),{survived}=wound(e,damage);events.push({type:'poison',to:e.id,damage,hpAfter:e.hp});if(survived)survivalCue(e);log(`Poison : ${e.name} perd ${damage} PV.`);revive(e);deathEffect(e);if(b.hp<=0)return finish(false);if(!alive().length)return finish(true);if(!e.hp)continue;summonReinforcement(e);}
  if(e.burning){const damage=lanternDamage(e,Math.ceil(e.maxHp*.05*outgoing(false,false)));const {survived}=wound(e,damage);events.push({type:'burn',to:e.id,damage,hpAfter:e.hp});if(survived)survivalCue(e);log(`Brûlure : ${e.name} perd ${damage} PV.`);revive(e);deathEffect(e);if(b.hp<=0)return finish(false);if(!alive().length)return finish(true);if(!e.hp)continue;summonReinforcement(e);}
  if(e.storyKind==='eliandris')lightHeal(e,'début de tour');
  if(e.practiceDummy)continue;
  if(e.joinedRound>=b.round)continue;
  if(e.attracted){
   e.attracted=false;
   if(e.healer&&b.round>=(e.fatalAt??4))e.fatalAt=b.round+1;
   if(e.storyKind==='rivernia'&&b.round%4===0)e.delayedCombo=true;
   events.push({type:'exile-return',to:e.id});log(`${e.name} perd son action dans le Néant, puis réapparaît.`);continue;
  }
  if(lycaonLesson){const damage=Math.min(1,Math.max(0,b.hp-1));b.hp-=damage;stoneShield();events.push({type:'hit',from:e.id,to:'hero',damage,hpAfter:b.hp,crit:false,projectile:'purple-slash'});log('Lycaon effleure Nahat : 1 dégât.');if(damage>0)countRiposte(e);continue;}
  if(b.storyKey==='nahat'&&b.stage===2){
   if(e.storyKind==='nahatBear'&&b.round%3===1){events.push({type:'status',to:e.id,label:'L’ours se redresse…'});log('L’ours prépare un puissant coup de patte.');}
   else if(e.storyKind==='nahatTiger'){enemyStrike(e,1,'fangs');if(b.hp>0&&rng()<.25){enemyActionBlocked=false;trappedAction=null;riposteCounted=false;nextEnemyAction();events.push({type:'status',to:e.id,label:'Bond du tigre · seconde attaque à 75 %'});enemyStrike(e,.75,'fangs');}}
   else if(e.storyKind==='nahatOrcs'){enemyStrike(e,1,'black-slash');enemyActionBlocked=false;trappedAction=null;riposteCounted=false;nextEnemyAction();enemyStrike(e,1,'black-slash');}
   else if(e.storyKind==='nahatSnake'){const actual=enemyStrike(e,1,'fangs');if(actual>0&&lastEnemyTarget==='hero'&&b.hp>0&&!b.snakePoison&&rng()<.33){b.snakePoison=true;events.push({type:'snake-poison',to:'hero'});log('Morsure venimeuse : Poison, 5 % des PV max au début de chaque tour. Non cumulable.');}}
   else enemyStrike(e,e.storyKind==='nahatBear'&&b.round%3===2?1.6:1,'black-slash');
   if(!b.hp)return finish(false);continue;
  }
  let forgeurHitHero=false;
  if(forgeurEnemyTurn(b,e,{
   rng,emit:event=>events.push(event),log,
   nextAction:()=>{enemyActionBlocked=false;trappedAction=null;riposteCounted=false;nextEnemyAction();},
   strike:(mult,projectile,crit)=>{const cursor=events.length,total=enemyStrike(e,mult,projectile,false,false,null,crit);forgeurHitHero=events.slice(cursor).some(event=>event.type==='hit'&&event.from===e.id&&event.to==='hero');return total;},
   weakness:()=>{if(forgeurHitHero&&!b.roxxorWeakened){b.roxxorWeakened=true;events.push({type:'roxxor-weaken',to:'hero'});log('Poids du regret : dégâts du Forgeur −10 % jusqu’à la fin du combat. Non cumulable.');}},
   burn:()=>{const unit=enemyTarget(),id=allyId(unit);if(unit.hp>0){if(id==='hero'&&blockAttack(e))return;unit.burning=true;events.push({type:'forgeur-story-burn',from:e.id,to:id,label:'Souffle de la Tryhydre · brûlure'});log(`${id==='hero'?CLASSES[s.hero.key].name:unit.name} brûle : 5 % des PV max au début du tour.`);}}
  })){flushRefusal();if(!b.hp)return finish(false);continue;}
  if(expeditionEnemyTurn(b,e,{rng,strike:(mult,projectile,drain=false)=>enemyStrike(e,mult,projectile,drain),emit:event=>events.push(event),log})){flushRefusal();if(!b.hp)return finish(false);continue;}
  if(e.guardian){trialEnemyTurn(b,e,{strike:(mult,projectile,drain=false,area=false)=>enemyStrike(e,mult,projectile,drain,area),emit:event=>events.push(event),log});flushRefusal();if(!b.hp)return finish(false);continue;}
  if(e.riftKind){
   riftEnemyTurn(b,e,{strike:(mult,projectile,drain=false,area=false,mark=null)=>enemyStrike(e,mult,projectile,drain,area,mark),emit:event=>events.push(event),log,curse:()=>{
    const removed=dispelHeroBonuses(b);events.push({type:'dispel',to:'hero',count:removed});log(`Malédiction : ${removed} type(s) de bonus dissipé(s).`);
    if(removed>0&&b.hp>0)incoming(e,b,'hero',Math.max(1,Math.round(enemyDamage(s,e)*.1*removed)),false,'void-curse');
   }});
   events.push({type:'rift-sync',to:e.id,rift:structuredClone(e.rift),attraction:{...b.riftAttraction}});
   if(!b.hp)return finish(false);continue;
  }
  if(e.storyKind==='osculus'&&!e.sandUsed){e.sandUsed=true;b.sandUntil=b.round+2;events.push({type:'drunn-sand',from:e.id,to:'hero',until:b.sandUntil,label:'Sable de brouillage · 2 tours'});log('Sable de brouillage : 20 % de risque de manquer pendant vos deux prochains tours.');continue;}
  if(e.storyKind==='tykytil'){
   if(b.round%2===0){const amount=Math.min(e.maxHp-e.hp,Math.ceil(e.maxHp*.1));e.hp+=amount;events.push({type:'heal',to:e.id,amount,label:'Protection de la forêt'});log(`Protection de la forêt : Tykytil récupère ${amount} PV.`);}else{events.push({type:'status',to:e.id,label:'Protection de la forêt · attaque +10 %'});}
   e.forestBoost=!!(b.round%2);enemyStrike(e,b.round%2?1.1:1);e.forestBoost=false;if(b.hp>0&&rng()<.28*(1-Math.exp(-(e.speed??28)/48))){events.push({type:'status',to:e.id,label:'Vitesse · seconde attaque'});riposteCounted=false;nextEnemyAction();enemyStrike(e);}if(!b.hp)return finish(false);continue;
  }
  if(e.storyKind==='arenaDrannex'){enemyStrike(e);if(b.hp>0&&rng()<.5){events.push({type:'status',to:e.id,label:'Seconde gueule · 50 %'});riposteCounted=false;nextEnemyAction();enemyStrike(e,.5);}if(!b.hp)return finish(false);continue;}
  if(e.storyKind==='mystrial'){
   if(b.round===2){events.push({type:'drunn-charge',to:e.id,label:'Mystrial concentre son énergie…'});log('Mystrial charge son énergie. Il ne frappe pas ce tour.');continue;}
   const giant=b.round>=3;events.push({type:'status',to:e.id,label:giant?'Énorme giga boule de feu · 250 %':'Boule de feu · 120 %'});log(giant?'Mystrial déchaîne son Énorme giga boule de feu !':'Mystrial lance son unique Boule de feu.');enemyStrike(e,giant?2.5:1.2,giant?'giant-fire':'fire');if(!b.hp)return finish(false);if(giant)b.trialSurvived=true;continue;
  }
  if(e.storyKind==='voidbeing'||e.storyKind==='voidlarva'){
   enemyStrike(e,1,e.storyKind==='voidbeing'?'void-orb':'purple-slash');if(!b.hp)return finish(false);continue;
  }
  if(e.voidRematch&&e.wingsUsed&&b.round%3===0){
   events.push({type:'status',to:e.id,label:'Rafale de Dyzeria · zone'});log('Ozvek balaie tout le groupe : la Larve ne protège pas Stibili de cette attaque de zone.');
   enemyStrike(e,.75,'wind',false,true);if(!b.hp)return finish(false);continue;
  }
  if(e.storyKind==='seraphyne'){
   if(e.lesson==='first'||e.hp===1){const damage=b.hp,{survived}=woundHero(damage);events.push({type:'status',to:e.id,label:e.lesson==='first'?'La première leçon':'La dernière ouverture'},{type:'hit',from:e.id,to:'hero',damage,hpAfter:refusalPending?0:b.hp,crit:false,projectile:'mentor'});if(survived){distressCue();continue;}log('Séraphyne conclut l’exercice. Kaerune est vaincue, mais la leçon est acquise.');return finish(false);}
   enemyStrike(e);if(!b.hp)return finish(false);continue;
  }
  if(e.storyKind==='cobra'){
   const actual=enemyStrike(e);if(actual>0&&b.hp>0){b.burning=true;b.cobraBurnStacks=(b.cobraBurnStacks??0)+1;events.push({type:'lava-burn',to:'hero',stacks:b.cobraBurnStacks,percent:heroBurnPercent(b),label:`Brûlure des laves · ${heroBurnPercent(b)} %`});log(`Venin incandescent : brûlure à ${heroBurnPercent(b)} % des PV max par tour.`);}if(!b.hp)return finish(false);continue;
  }
  if(e.healer){
   if(b.round>=(e.fatalAt??4)){if(dodgeChance(s,e)>0&&rng()<dodgeChance(s,e)){events.push({type:'dodge',to:'hero'});log('Analyse : attaque fatale esquivée !');continue;}const unit=enemyTarget(),id=allyId(unit),damage=unit.hp;if(id==='hero'&&blockAttack(e))continue;const survived=id==='hero'?woundHero(damage).survived:false;if(id!=='hero')unit.hp=0;events.push({type:'fatal',from:e.id,to:id,damage,hpAfter:id==='hero'&&refusalPending?0:unit.hp});if(survived){distressCue();continue;}log('Une flèche, un mort : '+(id==='hero'?CLASSES[s.hero.key].name+' est terrassé.':unit.name+' est vaincu.'));if(id==='hero')return finish(false);events.push({type:'ally-down',to:id});continue;}
   const amount=Math.min(e.maxHp-e.hp,Math.ceil(e.maxHp*.06));e.hp+=amount;events.push({type:'heal',to:e.id,amount});log(`Soin : l’Enfant de la forêt récupère ${amount} PV.`);continue;
  }
  if(e.type==='slime'&&(!e.storyKind||['sword','arenaSlime'].includes(e.storyKind))&&!e.powerUsed){
   const allies=alive().filter(a=>a.id!==e.id),recipient=allies.length?allies[rngInt(0,allies.length-1,rng)]:e;
   const percent=rngInt(10,12,rng);recipient.powerStacks=enemyPowerStacks(recipient)+1;recipient.powerBonus=(1+(recipient.powerBonus||0)/100)*(1+percent/100)*100-100;
   recipient.dmg=Math.round(recipient.dmg*(1+percent/100));e.powerUsed=true;
   events.push({type:'enemy-skill',from:e.id,to:recipient.id,label:'Puissance',percent,dmg:recipient.dmg,stacks:recipient.powerStacks});
   log(`${e.name} lance Puissance sur ${recipient.name} : dégâts +${percent} % jusqu’à la fin du combat.`);continue;
  }
  if((e.storyKind==='kappiouteau'||e.type==='dragonnet'&&!e.storyKind)&&b.round>=(e.fireReady??1)){
   e.fireReady=b.round+SKILLS.feu.cd;events.push({type:'status',to:e.id,label:'Boule de feu'});log(`${e.name} lance Boule de feu.`);
   const actual=enemyStrike(e,1.2,'fire');if(actual>0&&b.hp>0&&rng()<.1){const unit=battleUnit(b,lastEnemyTarget);if(unit?.hp>0){unit.burning=true;events.push({type:'status',to:lastEnemyTarget,label:'Brûlure'});log(`${lastEnemyTarget==='hero'?CLASSES[s.hero.key].name:unit.name} brûle : 5 % de ses PV max par tour jusqu’à la fin du combat.`);}}
   if(!b.hp)return finish(false);continue;
  }
  if(e.type==='icewolf'&&!e.storyKind){
   if(!e.glacierUsed){
    e.glacierUsed=true;events.push({type:'enemy-technique',from:e.id,label:'Glacier',skill:'glacier'});log(`${e.name} lance Glacier !`);enemyStrike(e,1.35,'ice');
   }else{
    const strikes=rngInt(1,4,rng);events.push({type:'enemy-technique',from:e.id,label:`Escrime · ${strikes} coup${strikes>1?'s':''}`,skill:'escrime'});log(`Escrime : ${strikes} coup${strikes>1?'s':''} à 33 % des dégâts de base.`);
    for(let i=0;i<strikes&&b.hp>0;i++)enemyStrike(e,.33,'ice-slash');
   }
   if(!b.hp)return finish(false);continue;
  }
  if(['maella','maella2'].includes(e.storyKind)){
   const actual=enemyStrike(e),roll=rngInt(1,6,rng),bonus=roll>=5&&actual>0?Math.max(1,Math.round(actual*.1)):0;
   events.push({type:'dice',from:e.id,to:'hero',roll,bonus,base:actual});log(`Éclat du destin — dé : ${roll}/6. ${bonus?`Seconde frappe : ${bonus} dégâts (10 % de ${actual}).`:'Aucune frappe supplémentaire.'}`);
   if(bonus&&b.hp>0){const prior=battleUnit(b,lastEnemyTarget),unit=prior?.hp>0?prior:enemyTarget();incoming(e,unit,allyId(unit),bonus,false,'frost-shard');}
   if(!b.hp)return finish(false);continue;
  }
  if(e.storyKind==='ozvex'&&!e.wingsUsed){e.wingsUsed=true;e.wingsApplied=b.round;e.wingsUntil=b.round+4;events.push({type:'enemy-wings',to:e.id,label:'Battement d’aile',until:e.wingsUntil,applied:e.wingsApplied});log('Battement d’aile : +15 points de chance critique dès le lancement et pendant les 4 tours suivants.');continue;}
  if(e.storyKind==='felk'&&!e.aura){e.aura=true;events.push({type:'enemy-aura',to:e.id,label:'Aura Nébryss'});log('Aura Nébryss : Felk peut désormais contre-attaquer (7 %).');continue;}
  const combo=e.storyKind==='rivernia'&&(b.round%4===0||e.delayedCombo);if(combo)e.delayedCombo=false;
  if(['ushio','rivernia'].includes(e.storyKind)&&!combo&&b.round>=e.drainReady){
   e.drainReady=b.round+2;const label=e.storyKind==='ushio'?'Arrache âme':'Épée du destin';
   events.push({type:'status',to:e.id,label});log(`${e.name} utilise ${label}.`);
   enemyStrike(e,1.2,e.storyKind==='ushio'?'purple-scythe':'purple-slash',true);
  }else{
   if(combo)log('Combativité : Rivernia frappe deux fois !');
   for(let i=0;i<(combo?2:1)&&b.hp>0;i++){enemyActionBlocked=false;trappedAction=null;riposteCounted=false;nextEnemyAction();enemyStrike(e,1,e.storyKind==='sword'?'black-slash':false);}
   if(e.storyKind==='emillia'){e.rageStacks++;e.dmg=Math.round(e.baseDmg*1.15**e.rageStacks);events.push({type:'enemy-rage',to:e.id,dmg:e.dmg,label:'Force & courage +15 %'});log(`Force & courage : dégâts portés à ${e.dmg}.`);}
  }
  if(duelOver())return finish(true);
  if(!b.hp)return finish(false);
 }
 if(!alive().length)return finish(true);
 if(b.mode==='rift'){for(const e of b.enemies.filter(e=>e.hp<=0)){delete b.riftAttraction[e.id];delete b.riftFissures[e.id];for(const ally of battleAllies(b))if(ally.riftFissures)delete ally.riftFissures[e.id];}}
 if(b.goldenEncounter&&b.round>=4){b.goldenEscaped=true;events.push({type:'status',to:b.enemies[0].id,label:'L’Enchanteur s’échappe !'});log('Quatre tours se sont écoulés. L’Enchanteur doré disparaît avec son trésor.');return finish(false);}
 if(b.powerCasts){b.power+=b.powerCasts;log(`Puissance : dégâts ×${(1.06**b.power).toFixed(2)}.`);}
 for(const ally of battleAllies(b).filter(a=>a.hp>0&&a.burning)){const damage=absorb(ally,Math.ceil(ally.maxHp*.05),ally.id);ally.hp=Math.max(0,ally.hp-damage);events.push({type:'burn',to:ally.id,damage});if(!ally.hp)events.push({type:'ally-down',to:ally.id});}
 b.usedActions=[];b.round++;for(const unit of [b,...battleAllies(b),...b.enemies]){const current=activeShields(unit,b.round);if(current.length!==(unit.shields??[]).length){unit.shields=current;shieldEvent(unit,unit===b?'hero':unit.id,'Bouclier expiré');}}if(b.burning){const damage=received(Math.ceil(b.maxHp*heroBurnPercent(b)/100)),{actual,survived,damage:hpDamage}=woundHero(damage);events.push({type:'burn',to:'hero',damage:hpDamage,hpAfter:refusalPending?0:b.hp});if(survived)distressCue();receiveOmen(actual);log(`Début du tour ${b.round} — Brûlure : ${CLASSES[s.hero.key].name} perd ${damage} PV.`);if(!b.hp)return finish(false);}
 if(b.snakePoison&&b.hp>0){const damage=received(Math.ceil(b.maxHp*.05)),{actual,survived,damage:hpDamage}=woundHero(damage);events.push({type:'poison',to:'hero',damage:hpDamage,hpAfter:refusalPending?0:b.hp});if(survived)distressCue();flushRefusal();receiveOmen(actual);log(`Début du tour ${b.round} — Poison : ${CLASSES[s.hero.key].name} perd ${hpDamage} PV.`);if(!b.hp)return finish(false);}
 forgeTurnStart();astralPulse();if(b.hp<=0)return finish(false);if(!alive().length)return finish(true);
 if(b.hp>0&&b.hp<=b.maxHp*.3&&!b.boneUsed&&!!accessoryOf(s,'collier-os')){const rate=accessoryOf(s,'collier-os').stats.bonePower/100,base=b.summonBase??stats(s),hp=Math.max(1,Math.round(base.hp*rate));b.boneUsed=true;b.bone={id:'bone-ally',name:'Squelette chétif',art:'squelette-chetif',isBone:true,hp,maxHp:hp,dmg:Math.max(1,Math.round(base.dmg*rate)),burning:false};events.push({type:'ally-summon',ally:structuredClone(b.bone)});log('Collier d’os : un Squelette chétif rejoint le combat.');}
 if(skillUnlocked(s,'instinct')&&!b.instinctUsed&&b.hp>0&&(b.instinctPending||b.hp<=b.maxHp*.3)){
  b.instinctUsed=true;delete b.instinctPending;const pups=livingPups(b).sort((a,c)=>a.hp/a.maxHp-c.hp/c.maxHp);
  if(pups.length){const pup=pups[0];grantShield(pup,'Instinct protecteur',b.maxHp*.08,b.round+1);shieldEvent(pup,pup.id,'Instinct protecteur · bouclier');}
  else{b.pups??=[];const pup=makeWolfPup(b.summonBase??stats(s),b.pups.length,s);b.pups.push(pup);events.push({type:'ally-summon',ally:structuredClone(pup)});}
  log('Instinct protecteur : la meute reçoit un secours. Une seule fois par combat.');
 }
 if(duelOver())return finish(true);
 if(lycaonLesson&&b.round===5&&!b.lycaonDialogueSeen){b.lycaonDialogueSeen=true;s.storyScene={stage:4,chapter:1,phase:'interlude',index:0};return {events,result:null};}
 if(b.trialSurvived){events.push({type:'status',to:'hero',label:'Vairon interrompt l’épreuve !'});log('Drunn résiste au brasier et à la brûlure. Vairon interrompt le combat.');return finish(true);}
 if(s.hero.key==='drunn'&&s.hero.level>=9)b.charges=Math.min(5,(b.charges??0)+1);
 flushRefusal();return {events,result:null};
}

// Stable adventure identities separate duplicate companions without changing class mechanics.
export const adventureId=state=>state?.hero?(state.adventureId??state.hero.key):null;
export const adventureNumber=state=>state?.adventureNumber??1;
export function createCompanionAdventure(key,companions,profile=null){
 if(!Object.hasOwn(CLASSES,key))throw Error('Choisissez un compagnon.');
 const others=Object.values(companions).filter(c=>c.hero?.key===key);
 const number=1+Math.max(0,...others.map(adventureNumber));
 let id=key;while(Object.hasOwn(companions,id))id=key+'--'+globalThis.crypto.randomUUID();
 const state=fresh();if(profile)state.profile=profile;syncProfile(state,companions);summon(state,key);
 if(id!==key)state.adventureId=id;
 if(number>1)state.adventureNumber=number;
 return state;
}
function validAdventureSlot(id,state){
 const key=state?.hero?.key,number=adventureNumber(state);
 return typeof id==='string'&&Object.hasOwn(CLASSES,key)&&adventureId(state)===id&&Number.isSafeInteger(number)&&number>0&&(id===key||id.startsWith(key+'--')&&/^[a-z0-9-]{1,100}$/.test(id)&&number>1);
}
const adventureSnapshot=state=>{const copy=structuredClone(state);delete copy.companions;delete copy.companionSaveVersion;delete copy.activeAdventureId;return copy;};
// Keep the active snapshot at the root, and store each adventure exactly once by identity.
export function packCompanionSave(active,companions){
 syncProfile(active,companions);const slots={};
 for(const [id,state]of Object.entries(companions)){if(!validAdventureSlot(id,state))throw Error('Emplacement d’aventure invalide.');slots[id]=adventureSnapshot(state);}
 const id=adventureId(active);
 if(id){if(!validAdventureSlot(id,active))throw Error('Aventure active invalide.');slots[id]=adventureSnapshot(active);}
 return {...adventureSnapshot(active),companionSaveVersion:2,activeAdventureId:id,companions:slots};
}
export function restoreCompanionSave(raw){
 if(!raw||raw.version!==1)throw Error('Sauvegarde non reconnue.');
 const companions={};let changed=false;
 const restore=value=>{
  if(!value||value.version!==1||!value.hero||!(Object.hasOwn(CLASSES,value.hero.key)||Object.hasOwn(LEGACY_KEYS,value.hero.key))||!Array.isArray(value.items)||!Number.isSafeInteger(value.hero.level)||value.hero.level<1)throw Error('Progression de compagnon invalide.');
  const state=adventureSnapshot(value);changed=migrateBalance(state)||changed;return state;
 };
 if(raw.companionSaveVersion!=null){
  if(![1,2].includes(raw.companionSaveVersion)||!raw.companions||typeof raw.companions!=='object'||Array.isArray(raw.companions))throw Error('Collection de compagnons invalide.');
  const numbers=new Set();
  for(const [key,value]of Object.entries(raw.companions)){
   const state=restore(value),id=raw.companionSaveVersion===1?(LEGACY_KEYS[key]??key):key;
   if(raw.companionSaveVersion===1&&id!==state.hero.key||!validAdventureSlot(id,state)||Object.hasOwn(companions,id))throw Error('Emplacement de compagnon invalide.');
   const numberKey=state.hero.key+':'+adventureNumber(state);if(numbers.has(numberKey))throw Error('Numéro d’aventure dupliqué.');numbers.add(numberKey);companions[id]=state;
  }
  changed=raw.companionSaveVersion===1||changed;
 }else if(raw.hero){const state=restore(raw);companions[state.hero.key]=state;changed=true;}
 const legacyKey=LEGACY_KEYS[raw.hero?.key]??raw.hero?.key;
 const id=raw.companionSaveVersion===2?raw.activeAdventureId:legacyKey;
 if(raw.hero&&(!id||!Object.hasOwn(companions,id)||companions[id].hero.key!==legacyKey)||!raw.hero&&id!=null)throw Error('Le compagnon actif est absent de la sauvegarde.');
 if(raw.companionSaveVersion===2&&raw.hero&&adventureId(raw)!==id)throw Error('Aventure active incohérente.');
 const active=id?companions[id]:fresh();active.profile=raw.profile??newProfile();const wasUnlocked=!!active.profile.unlocks?.forgeur;syncProfile(active,companions);changed=changed||!raw.profile||wasUnlocked!==active.profile.unlocks.forgeur;
 return {active,companions,profile:active.profile,changed};
}

// Temporary prototype test controls. Only the active companion at camp is modified.
export function applyTestCode(s,code){
 if(!s.hero||s.battle||s.storyScene)throw Error('Choisissez un compagnon et revenez au camp pour utiliser un code.');
 const value=String(code).trim();
 if(value==='ADD25kBu77'){s.gold+=5000;return '+5 000 or pour votre compagnon !';}
 if(value==='ADDALLHgbd45'){
  ensureAchievements(s);s.achievements.unlockedByCode=ACHIEVEMENTS.map(d=>d.id);
  return 'Tous les succès de ce compagnon sont débloqués ! Récupérez leurs récompenses dans Succès.';
 }
 if(value==='ADD1LVVVuY8'){
  if(s.hero.level>=MAX_LEVEL)throw Error('Ce compagnon a déjà atteint le niveau 50.');
  grantExperience(s,xpNeed(s.hero.level));return '+1 niveau complet et 4 points de statistiques !';
 }
 throw Error('Code inconnu. Vérifiez les majuscules et les minuscules.');
}
