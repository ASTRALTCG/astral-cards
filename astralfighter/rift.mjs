import {grantShield,shieldTotal} from './mastery.mjs';
// Fissure encounters are fixed by floor, independent of the chosen companion.
export const RIFT_LEVEL=8,RIFT_FLOORS=50;
export const RIFT_CREATURES={
 spectralGuard:{name:'Garde spectral Néantin',art:'rift-spectral-guard',hp:.72,dmg:.75,rule:'Une chance sur trois de critiquer pour doubler les dégâts. À sa mort, un portail libère un Spectre Néantin avec la moitié de ses PV max et de son attaque initiale. Une seule transformation.'},
 specter:{name:'Spectre Néantin',art:'rift-specter',hp:.36,dmg:.375,rule:'Forme libérée par le Garde spectral. Attaque normalement, mais exécute sa cible à 4 % de PV max ou moins, avant ou après la frappe. L’exécution ignore les boucliers ; les passifs de survie restent applicables.'},
 axeGuard:{name:'Garde Néantin à la hache',art:'rift-axe-guard',hp:1,dmg:.9,rule:'Cycle de quatre actions : bouclier de 11 % des PV max ; frappe à 175 % ; soin de 5 % des PV max ; frappe à 175 %. Puis le cycle recommence. Le bouclier remplace celui de ce même pouvoir.'},
 bird:{name:'Oiseau du Néant',art:'rift-bird',hp:1.3,dmg:.8,rule:'30 % de PV en plus et 20 % d’attaque en moins qu’un Être du Néant. Malédiction aux actions 1, 4, 7… : dissipe tous les bonus retirables du compagnon et inflige 10 % de son attaque par type de bonus retiré. Les cumuls d’un même bonus ne comptent qu’une fois. Attaque normalement entre les malédictions.'},
 saw:{name:'Spectre aux bras scies du Néant',art:'rift-saw',hp:.9,dmg:.8,rule:'Chaque attaque gagne 10 points de puissance : 100 %, 110 %, 120 %… Une seule fois, en survivant à 50 % de PV max ou moins, obtient un bouclier égal à trois fois les dégâts du compagnon avant combat.'},

 being:{name:'L’Être du Néant',art:'rift-being',hp:1,dmg:1,rule:'Alterner frappe et orbe. L’orbe marque sa cible : sa prochaine frappe sur cette même cible inflige +40 %, puis retire la Fissure. Purifiable.'},
 larva:{name:'Larve du Néant',art:'rift-larva',hp:.65,dmg:.7,rule:'Après trois morsures, prépare un cocon pendant un tour. Si elle survit jusqu’à son action suivante, devient un Être du Néant. Une larve ressuscitée recommence sa croissance.'},
 moth:{name:'La Mite du Néant',art:'rift-moth',hp:.85,dmg:.85,rule:'Ses ailes réduisent de 50 % la première frappe directe reçue, puis se replient. Alterne une attaque et un tour consacré à reformer cette protection. Les invocations peuvent ouvrir ses ailes ; les dégâts périodiques ignorent la protection.'},
 pain:{name:'La Souffre-douleur du Néant',art:'rift-pain',hp:1.1,dmg:.85,rule:'Ouvre son portail sans attaquer, stocke 35 % des dégâts directs réellement subis (plafond : 90 % de son attaque), puis les ajoute à une frappe à 80 %. Ensuite, deux attaques ordinaires avant de rouvrir le portail.'},
 reaper:{name:'Le Moissonneur du Néant',art:'rift-reaper',hp:.9,dmg:.7,rule:'Après la mort d’un allié, prépare une résurrection pendant une action, puis le relève à 35 % de ses PV max à son action suivante. Chaque entité ne peut revenir qu’une fois. Il ne frappe pas pendant le rituel.'},
 scythes:{name:'Les Faux croisées du Néant',art:'rift-scythes',hp:1,dmg:.9,rule:'Alternent une frappe à 130 % et deux frappes à 55 %. Une fois sous 50 % de PV : préparent une frappe à 180 %, puis passent une action à récupérer. Une seule barre de PV.'},
 maw:{name:'Le Gouffre du Néant',art:'rift-maw',hp:1.2,dmg:1.05,rule:'Morsure, puis lanterne sans attaque : 2 cumuls d’Attraction des âmes. Chaque frappe directe du compagnon retire un cumul. Dévore ensuite à 120 % +30 points par cumul restant, puis les retire. Invocations et dégâts périodiques ne retirent pas de cumul. Purifiable.'},
 dragon:{name:'Draconoros, le dragon du Néant',art:'rift-dragon',hp:1,dmg:1,rule:'Griffe, préparation du souffle, souffle de zone puis récupération. Durant la préparation, infliger 15 % de ses PV max affaiblit le souffle de 150 % à 65 %. Sous 50 % de PV, le souffle gagne 20 points. Dès l’étage 20, invoque une fois deux Larves en passant son action ; dès le 30, une morsure drainante remplace sa griffe (soin : 30 % des dégâts infligés, plafonné à 4 % de ses PV max). Le souffle touche aussi les invocations.'}
};
const ROUTES=[
 [['being'],['larva','larva'],['spectralGuard'],['moth','larva'],['maw'],['axeGuard'],['bird'],['saw'],['reaper','larva'],['dragon']],
 [['pain','larva'],['spectralGuard','moth'],['scythes','being'],['bird','larva'],['axeGuard'],['saw','being'],['reaper','moth'],['maw','spectralGuard'],['pain','bird'],['dragon']],
 [['axeGuard','larva'],['saw','moth'],['reaper','spectralGuard'],['scythes','bird'],['pain'],['being','moth','larva'],['maw','axeGuard'],['spectralGuard','saw'],['reaper','bird','larva'],['dragon']],
 [['scythes','moth'],['axeGuard','being'],['pain','spectralGuard'],['maw','larva','larva'],['saw'],['bird','axeGuard'],['reaper','scythes'],['saw','being','larva'],['spectralGuard','moth','larva'],['dragon']],
 [['bird','pain'],['axeGuard','scythes'],['reaper','saw','larva'],['maw','moth'],['spectralGuard'],['being','axeGuard','moth'],['bird','scythes','larva'],['pain','saw'],['reaper','spectralGuard','axeGuard'],['dragon']]
];
export const riftCleared=s=>Math.max(0,Math.min(50,Math.floor(s.rift?.cleared??0)));
export const riftReplays=(s,floor)=>Math.min(5,Math.max(0,Math.floor(Number(s.rift?.replays?.[floor])||0)));
export const riftUnlocked=s=>!!s.hero&&s.hero.level>=RIFT_LEVEL;
export function riftFloor(n){
 if(!Number.isInteger(n)||n<1||n>50)throw Error('Étage de la Fissure invalide.');
 const depth=Math.floor((n-1)/10),boss=n%10===0,mini=!boss&&n%5===0,level=Math.min(50,n+8);
 return {number:n,depth,level,boss,mini,kinds:ROUTES[depth][(n-1)%10],gold:(boss?[35,70,90,135,750]:[15,25,45,80,150])[depth],replayGold:(boss?[10,20,35,80,0]:[5,7,15,45,75])[depth],replayable:n!==50,name:boss?'Draconoros':mini?'Gardien de la Fissure':['Le seuil','Les profondeurs','Les oubliés','L’abîme','Le cœur du Néant'][depth]};
}
export function makeRiftEnemy(kind,floor,index,count=1){
 const f=riftFloor(floor),c=RIFT_CREATURES[kind],x=f.level-9;
 // HP follows achievable attack growth; damage follows natural companion HP growth.
 // Groups share a budget rather than multiplying the damage of a solo encounter.
 const pressure=1+Math.max(0,floor-42)*.025,elite=f.boss?1.6:f.mini?1.2:1;
 let hp=Math.round((210+18*x+1.7*x**1.35)*c.hp*elite*pressure/(count===1?1:count===2?1.65:2.25));
 let dmg=Math.max(1,Math.round(26*1.13**x*c.dmg*(f.boss?1.12:f.mini?1.06:1)*pressure/(count===1?1:count===2?1.85:2.65)));
 // Preserve the four introductory floors; strengthen all later encounters and summons.
 if(floor>=5){hp=Math.round(hp*1.15);dmg=Math.round(dmg*1.10);}
 if(kind==='dragon'&&floor>10){hp=Math.round(hp*.85);dmg=Math.max(1,Math.round(dmg*.85));}
 return {id:'enemy'+index,type:'rift',riftKind:kind,name:c.name,art:c.art,level:f.level,hp,maxHp:hp,dmg,baseDmg:dmg,boss:f.boss&&kind==='dragon'||f.mini&&index===0,burning:false,powerUsed:false,powerBonus:0,
  rift:{step:0,nativeHp:hp,nativeDmg:dmg,depth:f.depth,floor,ward:kind==='moth',stored:0,open:false,growth:0,cocoon:false,revived:false,ritual:null,chargedDamage:0,breathReady:false,fractured:false,rageUsed:false,summoned:false}};
}
export const riftEnemies=n=>{const f=riftFloor(n);return f.kinds.map((k,i)=>makeRiftEnemy(k,n,i,f.kinds.length));};
export function riftIntent(e,b){
 if(e.hp<=0)return {name:e.rift?.revived?'Âme épuisée':'Vaincu',text:e.rift?.revived?'Ne peut plus être ressuscité.':'Un Moissonneur vivant peut préparer sa résurrection.'};
 if(e.attracted)return {name:'Action perdue',text:'Emprisonné par Attraction. Sa préparation attendra son prochain tour.'};
 const r=e.rift;if(!r)return null;const k=e.riftKind;
 if(k==='spectralGuard')return {name:'Garde spectral',text:'Frappe à 100 %. Critique ×2 : une chance sur trois. À sa mort, libère un Spectre à demi-statistiques.'};
 if(k==='specter')return {name:'Exécution spectrale',danger:true,text:'Attaque basique. À 4 % de PV max ou moins, sa cible est exécutée en ignorant le bouclier.'};
 if(k==='axeGuard')return [{name:'Rempart spectral',text:'Remplace son bouclier par 11 % de ses PV max. Aucune attaque.'},{name:'Hache du Néant',danger:true,text:'Frappe à 175 % des dégâts.'},{name:'Régénération',text:'Récupère 5 % de ses PV max. Aucune attaque.'},{name:'Hache du Néant',danger:true,text:'Frappe à 175 % des dégâts.'}][r.step%4];
 if(k==='bird')return r.step%3===0?{name:'Malédiction',danger:true,text:'Retire tous les bonus dissipables du compagnon. Inflige 10 % de son attaque par type de bonus retiré.'}:{name:'Serres du Néant',text:`Frappe à 100 %. Malédiction dans ${3-r.step%3} action(s).`};
 if(k==='saw')return {name:'Scies grandissantes',danger:true,text:`Frappe à ${100+10*r.step} %. ${r.sawShieldUsed?'Bouclier de dernier recours déjà déclenché.':'À 50 % de PV ou moins : bouclier égal à 300 % de l’attaque du compagnon avant combat.'}`};

 if(k==='dragon'){
  if(r.breathReady)return {name:'Souffle du Néant',danger:true,text:`Zone · ${r.fractured?65:150}${e.hp<=e.maxHp*.5?' +20':''} % des dégâts. ${r.fractured?'Souffle affaibli !':`${Math.max(0,Math.ceil(e.maxHp*.15)-r.chargedDamage)} dégâts à infliger avant son action pour l’affaiblir.`}`};
  if(r.depth>=1&&!r.summoned&&e.hp<=e.maxHp*.5)return {name:'Appel des profondeurs',text:'Invoquera deux Larves sans attaquer ce tour.'};
  return [{name:r.depth>=2?'Morsure dévorante':'Griffe du Néant',text:r.depth>=2?'Frappe à 100 % et se soigne de 30 % des dégâts infligés (maximum 4 % de ses PV max).':'Frappe ciblée à 100 %.'},{name:'Inspiration',text:'Prépare son souffle sans attaquer. Vous aurez ensuite un tour pour briser sa concentration.'},null,{name:'Récupération',text:'Aucune attaque. Profitez de cette ouverture.'}][r.step%4];
 }
 if(k==='maw'){const stacks=b.riftAttraction?.[e.id]??0;return [{name:'Morsure égarée',text:'Frappe ciblée à 100 %.'},{name:'Lanterne hypnotique',text:'Aucune attaque. Applique 2 cumuls d’Attraction des âmes.'},{name:'Dévoration',danger:true,text:`Frappe à ${120+30*stacks} %. Chaque frappe directe du compagnon retire un cumul avant la morsure.`}][r.step%3];}
 if(k==='pain')return r.open?{name:'Renvoi du portail',danger:true,text:`Frappe à 80 % + ${r.stored} dégâts stockés (plafond ${Math.round(e.dmg*.9)}).`}:r.step===0?{name:'Portail de douleur',text:'Ouvre son portail sans attaquer. Les prochaines frappes directes alimenteront son renvoi.'}:{name:'Entaille',text:'Frappe à 100 %. Portail fermé : aucun dégât stocké.'};
 if(k==='reaper'){const dead=b.enemies.find(x=>x.id!==e.id&&x.hp<=0&&x.rift&&!x.rift.revived);return r.ritual?{name:'Résurrection',danger:true,text:'Relève l’allié désigné à 35 % de ses PV max. Éliminez le Moissonneur pour arrêter le rituel.'}:dead?{name:'Rituel des âmes',text:`Prépare la résurrection de ${dead.name}, sans attaquer.`}:{name:'Faux des âmes',text:'Frappe à 85 %. Aucun allié à ressusciter.'};}
 if(k==='larva')return r.cocoon?{name:'Éclosion imminente',danger:true,text:'Se transformera en Être du Néant à sa prochaine action. Détruisez le cocon avant !'}:r.growth>=3?{name:'Tissage du cocon',text:'Prépare son évolution sans attaquer.'}:{name:'Morsure',text:`Frappe à 100 %. Croissance : ${r.growth}/3.`};
 if(k==='scythes'){if(r.rage===1)return {name:'Moisson croisée',danger:true,text:'Une frappe à 180 %, puis un tour de récupération.'};if(r.rage===2)return {name:'Récupération',text:'Les deux faux restent immobiles ce tour.'};if(!r.rageUsed&&e.hp<=e.maxHp*.5)return {name:'Union des lames',text:'Prépare la Moisson croisée sans attaquer.'};return r.step%2?{name:'Deux visages',text:'Deux frappes à 55 % chacune.'}:{name:'Lame solitaire',danger:true,text:'Une frappe à 130 %.'};}
 if(k==='moth')return r.step%2?{name:'Ailes du Néant',text:'Reforme sa protection sans attaquer.'}:{name:'Poussière obscure',text:'Frappe à 100 %. '+(r.ward?'La première frappe directe reçue sera réduite de moitié.':'Ailes repliées : défense ouverte.')};
 return r.step%2?{name:'Orbe fissurante',text:'Frappe à 70 % et marque la cible touchée. Marque purifiable.'}:{name:'Impact du Néant',text:'Frappe à 100 %, +40 % si cette même cible porte sa Fissure. Consomme la marque.'};
}
export function riftDirectDamage(b,e,damage,fromHero){
 if(!e.rift)return damage;
 if(e.riftKind==='moth'&&e.rift.ward){e.rift.ward=false;damage=Math.max(1,Math.round(damage*.5));}
 if(fromHero)for(const id of Object.keys(b.riftAttraction??{}))b.riftAttraction[id]=Math.max(0,b.riftAttraction[id]-1);
 const actual=Math.min(e.hp,Math.max(0,damage-shieldTotal(e,b.round)));
 if(e.riftKind==='pain'&&e.rift.open)e.rift.stored=Math.min(Math.round(e.dmg*.9),e.rift.stored+Math.round(actual*.35));
 return damage;
}
export function riftEnemyTurn(b,e,ctx){
 const {strike,emit,log}=ctx,r=e.rift,k=e.riftKind;
 const cue=(label,kind='pulse')=>{emit({type:'rift-cue',to:e.id,label,kind});log(`${e.name} : ${label}.`);};
 if(k==='spectralGuard'||k==='specter'){strike(1,k==='specter'?'void-orb':'purple-slash');r.step++;return;}
 if(k==='axeGuard'){
  const step=r.step%4;
  if(step===0){grantShield(e,'Rempart spectral',e.maxHp*.11);emit({type:'shield',round:b.round,to:e.id,shields:structuredClone(e.shields),label:'Rempart spectral · '+shieldTotal(e,b.round)});cue('Rempart spectral','ward');}
  else if(step===2){const amount=Math.min(e.maxHp-e.hp,Math.round(e.maxHp*.05));e.hp+=amount;emit({type:'heal',to:e.id,amount,label:'Régénération spectrale'});cue('Régénération','revive');}
  else{cue('Hache du Néant · 175 %','cross');strike(1.75,'purple-scythe');}r.step++;return;
 }
 if(k==='bird'){
  if(r.step%3===0){cue('Malédiction','curse');ctx.curse?.();}else strike(1,'purple-slash');r.step++;return;
 }
 if(k==='saw'){cue(`Scies · ${100+10*r.step} %`,'saw');strike(1+.1*r.step,'void-saws');r.step++;return;}

 if(k==='being'){const orb=r.step%2===1;cue(orb?'Orbe fissurante':'Impact du Néant');strike(orb?.7:1,'void-orb',false,false,orb?'mark':'consume');r.step++;return;}
 if(k==='larva'){
  if(r.cocoon){const ratio=e.hp/e.maxHp,revived=r.revived,next=makeRiftEnemy('being',r.floor,0,1);Object.assign(e,{riftKind:'being',name:next.name,art:next.art,maxHp:Math.round(e.maxHp*1.25),dmg:Math.round(e.dmg*1.2)});e.hp=Math.max(1,Math.round(e.maxHp*ratio));e.rift={...next.rift,revived};cue('Métamorphose','evolve');emit({type:'rift-reform',to:e.id,enemy:structuredClone(e)});return;}
  if(r.growth>=3){r.cocoon=true;cue('Cocon du Néant','cocoon');return;}strike(1,'purple-slash');r.growth++;return;
 }
 if(k==='moth'){if(r.step%2){r.ward=true;cue('Ailes protectrices','ward');}else strike(1,'void-orb');r.step++;return;}
 if(k==='pain'){
  if(r.step===0){r.open=true;r.stored=0;cue('Portail de douleur','portal');}
  else if(r.step===1){cue(`Renvoi · ${r.stored} dégâts stockés`,'portal');strike(.8+r.stored/e.dmg,'void-orb');r.open=false;r.stored=0;}
  else strike(1,'purple-slash');r.step=(r.step+1)%4;return;
 }
 if(k==='maw'){
  if(r.step===0)strike(1,'fangs');
  if(r.step===1){b.riftAttraction??={};b.riftAttraction[e.id]=2;cue('Lanterne hypnotique','lantern');emit({type:'rift-marks',to:'hero',attraction:{...b.riftAttraction}});}
  if(r.step===2){const stacks=b.riftAttraction?.[e.id]??0;cue(`Dévoration · ${120+stacks*30} %`,'devour');strike(1.2+.3*stacks,'fangs');if(b.riftAttraction)delete b.riftAttraction[e.id];}
  r.step=(r.step+1)%3;return;
 }
 if(k==='reaper'){
  if(r.ritual){const ally=b.enemies.find(x=>x.id===r.ritual);r.ritual=null;if(ally&&ally.hp<=0&&!ally.rift.revived){ally.hp=Math.max(1,Math.round(ally.maxHp*.35));Object.assign(ally,{burning:false,poisonStacks:0,weakenedUntil:0,attracted:false,joinedRound:b.round});Object.assign(ally.rift,{revived:true,step:0,growth:0,cocoon:false,open:false,stored:0,breathReady:false,ritual:null});cue('Résurrection','revive');emit({type:'rift-reform',to:ally.id,enemy:structuredClone(ally)});return;}}
  const dead=b.enemies.find(x=>x.id!==e.id&&x.hp<=0&&x.rift&&!x.rift.revived);if(dead){r.ritual=dead.id;cue(`Rituel : ${dead.name}`,'revive');return;}strike(.85,'purple-scythe');return;
 }
 if(k==='scythes'){
  if(r.rage===1){cue('Moisson croisée','cross');strike(1.8,'purple-scythe');r.rage=2;return;}if(r.rage===2){r.rage=0;cue('Récupération');return;}
  if(!r.rageUsed&&e.hp<=e.maxHp*.5){r.rageUsed=true;r.rage=1;cue('Union des lames','cross');return;}
  if(r.step%2){strike(.55,'purple-scythe');if(b.hp>0)strike(.55,'purple-scythe');}else strike(1.3,'purple-scythe');r.step++;return;
 }
 if(k==='dragon'){
  if(r.breathReady){cue(r.fractured?'Souffle affaibli':'Souffle du Néant','breath');strike((r.fractured?.65:1.5)+(e.hp<=e.maxHp*.5?.2:0),'void-orb',false,true);r.breathReady=false;r.step=3;return;}
  if(r.depth>=1&&!r.summoned&&e.hp<=e.maxHp*.5){r.summoned=true;cue('Appel des profondeurs','summon');for(let i=0;i<2;i++){const larva=makeRiftEnemy('larva',r.floor,b.enemies.length,3);larva.maxHp=Math.round(larva.maxHp*.55);larva.hp=larva.maxHp;larva.dmg=Math.max(1,Math.round(larva.dmg*.65));larva.joinedRound=b.round;b.enemies.push(larva);emit({type:'spawn',enemy:structuredClone(larva)});}return;}
  if(r.step===0)strike(1,r.depth>=2?'fangs':'purple-slash',r.depth>=2);
  else if(r.step===1){r.breathReady=true;r.fractured=false;r.chargedDamage=0;cue('Inspiration du Néant','charge');}
  else cue('Récupération');r.step=(r.step+1)%4;
 }
}
