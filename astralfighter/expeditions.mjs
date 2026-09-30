// Expedition profiles share the original training level and reward curve.
export const EXPEDITIONS={
 flames:{name:'La route des flammes',art:'harmony-fire',kinds:['dragonnet','firehawk','magmagolem'],text:'Braises, ailes de feu et roche en fusion.'},
 ice:{name:'La montagne glaciale',art:'stibili-snow',kinds:['icewolf','iceslime','frostdummy'],text:'Des adversaires aguerris dans les neiges éternelles.'},
 forest:{name:'La forêt des âmes',art:'harmony-forest',kinds:['dog','slime','corkbeau'],text:'Sous les feuillages, chaque rencontre réserve son butin.'},
 chasm:{name:'Crevasse de l’abîme',art:'expedition-cave',kinds:['boneminer','lantern','boneserpent'],text:'Descendez parmi les ossements et les lueurs de l’abîme.'}
};
export const EXPEDITION_ENEMIES={
 golden:{name:'L’Enchanteur doré',art:'enchanteur-dore',hp:76,dmg:6},
 firehawk:{name:'Faucon enflammé',art:'faucon-flammes',hp:108,dmg:24},
 magmagolem:{name:'Golem magmatique',art:'golem-magmatique',hp:150,dmg:20},
 iceslime:{name:'Slime gelé',art:'slime-gele',hp:134,dmg:22},
 frostdummy:{name:'Mannequin givré',art:'mannequin-givre',hp:125,dmg:23},
 boneminer:{name:'Squelette mineur',art:'squelette-mineur',hp:116,dmg:26},
 lantern:{name:'Sceptre et lanterne',art:'sceptre-lanterne',hp:134,dmg:22},
 abyssfly:{name:'Luciole de l’abîme',art:'luciole-abime',hp:108,dmg:24},
 boneserpent:{name:'Draco-Serpent squelette',art:'draco-serpent-squelette',hp:150,dmg:22}
};
const entry=(tag,drop,name,text)=>({weight:1,tag,drop,dropChance:drop==='gelee-slime'?.4:drop?.15:0,skills:[{name,text}]});
export const EXPEDITION_BESTIARY={
 golden:{...entry('Rencontre rare',null,'Fuite dorée','Vous avez quatre tours complets pour le vaincre. Il lance un éclair doré chaque tour et s’enfuit après le quatrième. Sa défaite rapporte exactement 100 or.'),rewardText:'Dès le niveau 10 du compagnon : 5 % de chance dans chaque expédition · 100 or à la victoire.'},
 firehawk:entry('Assaut rapide','plume-enflammee','Serres ardentes','À sa première action puis toutes les trois actions, frappe deux fois à 55 % de ses dégâts. Les autres tours : attaque de base.'),
 magmagolem:entry('Colosse','roche-magmatique','Cœur magmatique','Alterne une charge sans attaque et un impact à 170 % des dégâts. Sa puissance est annoncée avant la frappe.'),
 iceslime:entry('Carapace glacée','gelee-slime','Croûte de givre','Commence avec une carapace qui réduit la première frappe directe subie de 20 %, puis se brise. Lance un éclat gelé à 100 % de ses dégâts à chaque tour.'),
 frostdummy:entry('Sentinelle','flocon-eternel','Garde de glace','À sa première action puis toutes les trois actions, frappe à 80 % et prépare une garde réduisant la prochaine frappe directe de 20 %. Les autres tours : attaque à 100 %. Les gardes ne se cumulent pas.'),
 boneminer:entry('Mineur','os','Coup de pioche','Alterne un coup à 80 % et une frappe de pioche à 120 % de ses dégâts. La frappe lourde est annoncée.'),
 lantern:entry('Invocateur','pierre-precieuse-usee','Lueur liée','Invoque une Luciole à sa première action, puis attaque. Tant que la Luciole vit, tous les dégâts subis par le Sceptre sont réduits de 50 %. Elle agit dès le tour suivant, ne revient pas si elle meurt et disparaît avec son invocateur. Aucun butin ni EXP supplémentaire pour cette invocation.'),
 abyssfly:entry('Lueur de l’abîme',null,'Lueur protectrice','N’attaque jamais. Chaque tour, soigne le Sceptre de 20 % de ses PV max. S’il a déjà tous ses PV, lui accorde Puissance : +10 à +12 % de dégâts jusqu’à la fin du combat, comme le Slime. Ne fait rien si ce bonus est déjà actif et que le Sceptre est en pleine santé.'),
 boneserpent:entry('Ossature agile','os','Anneaux d’os','À sa première action puis toutes les trois actions, frappe trois fois à 35 % de ses dégâts. Les autres tours : morsure à 100 %.')
};
export function expeditionFor(type){return Object.keys(EXPEDITIONS).find(k=>EXPEDITIONS[k].kinds.includes(type))??'forest';}
export function expeditionEncounter(zone,rng=Math.random){const pool=EXPEDITIONS[zone]?.kinds;if(!pool)throw Error('Expédition inconnue.');return pool[Math.min(pool.length-1,Math.floor(rng()*pool.length))];}
export const EXPEDITION_BALANCE={magmagolem:{hp:1.15,dmg:1},firehawk:{hp:1,dmg:1.07},slime:{hp:1,dmg:1.07},dragonnet:{hp:1,dmg:1.2}};
export function scaleEncounter(e,factors){
 if(!factors)return;const ratio=e.hp/e.maxHp;e.maxHp=Math.max(1,Math.round(e.maxHp*factors.hp));e.hp=e.hp<=0?0:Math.max(1,Math.round(e.maxHp*ratio));e.dmg=Math.max(1,Math.round(e.dmg*factors.dmg));if(e.baseDmg!==undefined)e.baseDmg=Math.max(1,Math.round(e.baseDmg*factors.dmg));
}
export function prepareExpeditionEnemy(e){
 scaleEncounter(e,EXPEDITION_BALANCE[e.type]);
 if(e.type==='iceslime')e.frostGuard=true;
 if(e.type==='lantern'){
  const totalHp=e.maxHp,totalDamage=e.dmg;
  e.maxHp=e.hp=Math.max(1,Math.round(totalHp*.78));e.dmg=Math.max(1,Math.round(totalDamage*.65));
  e.lanternBase={hp:Math.max(1,totalHp-e.maxHp),dmg:Math.max(1,totalDamage-e.dmg)};
 }
 return e;
}
export function expeditionIntent(e){
 const n=(e.expeditionTurns??0)+1;
 return e.type==='golden'?'Éclair doré · fuite après le tour 4':e.type==='magmagolem'?(n%2?'Charge · aucune attaque':'Impact magmatique · 170 %'):
 e.type==='firehawk'?(n%3===1?'Serres ardentes · 2 × 55 %':'Attaque · 100 %'):
 e.type==='frostdummy'?(n%3===1?'Garde de glace · frappe à 80 %':'Éclat gelé · 100 %'):
 e.type==='boneminer'?(n%2?'Pioche · 80 %':'Pioche lourde · 120 %'):
 e.type==='lantern'?(!e.lanternSummoned?'Invocation liée + attaque':'Orbe de la lanterne · 100 %'):
 e.type==='boneserpent'?(n%3===1?'Anneaux d’os · 3 × 35 %':'Morsure · 100 %'):
 e.type==='abyssfly'?'Soin du Sceptre · 20 % des PV max / Puissance':
 e.type==='iceslime'?'Éclat gelé · 100 %':null;
}
export function expeditionEnemyTurn(b,e,{strike,emit,log,rng=Math.random}){
 if(!EXPEDITION_ENEMIES[e.type])return false;
 const n=e.expeditionTurns=(e.expeditionTurns??0)+1;
 const cue=label=>{emit({type:'expedition-technique',to:e.id,label,kind:e.type});log(`${e.name} : ${label}.`);};
 if(e.type==='golden'){cue('Éclair doré');strike(1,'lightning');}
 else if(e.type==='magmagolem'){if(n%2)cue('Cœur magmatique · charge');else{cue('Impact magmatique');strike(1.7,'magma-impact');}}
 else if(e.type==='firehawk'){if(n%3===1){cue('Serres ardentes');strike(.55,'fire-feather');if(b.hp>0)strike(.55,'fire-feather');}else strike(1,'fire-feather');}
 else if(e.type==='iceslime')strike(1,'ice');
 else if(e.type==='frostdummy'){if(n%3===1){e.frostGuard=true;cue('Garde de glace');strike(.8,'ice-slash');}else strike(1,'ice-slash');}
 else if(e.type==='boneminer'){cue(n%2?'Coup de pioche':'Pioche lourde');strike(n%2?.8:1.2,'bone-slash');}
 else if(e.type==='boneserpent'){if(n%3===1){cue('Anneaux d’os');for(let i=0;i<3&&b.hp>0;i++)strike(.35,'bone-slash');}else strike(1,'bone-slash');}
 else if(e.type==='abyssfly'){
  const master=b.enemies.find(a=>a.id===e.summonedBy&&a.hp>0);if(!master)return true;
  if(master.hp<master.maxHp){const amount=Math.min(master.maxHp-master.hp,Math.round(master.maxHp*.2));master.hp+=amount;cue('Lueur réparatrice');emit({type:'heal',from:e.id,to:master.id,amount});log(`${e.name} soigne ${master.name} de ${amount} PV.`);}
  else if(!(master.powerBonus>0)){const percent=10+Math.floor(rng()*3);master.powerBonus=percent;master.powerStacks=1;master.dmg=Math.round(master.dmg*(1+percent/100));emit({type:'enemy-skill',from:e.id,to:master.id,label:'Puissance',percent,dmg:master.dmg,stacks:1});log(`${e.name} accorde Puissance : dégâts +${percent} % à ${master.name}.`);}
  else log(`${e.name} veille : le Sceptre est en pleine santé et possède déjà Puissance.`);
 }
 else if(e.type==='lantern'){
  if(!e.lanternSummoned){
   e.lanternSummoned=true;const base=e.lanternBase;
   const fly={id:'enemy'+b.enemies.length,type:'abyssfly',name:'Luciole de l’abîme',art:'luciole-abime',level:e.level,hp:base.hp,maxHp:base.hp,dmg:0,summonedBy:e.id,noReward:true,joinedRound:b.round};
   b.enemies.push(fly);e.lanternWard=true;cue('Lueur liée');emit({type:'spawn',enemy:structuredClone(fly)});
  }
  strike(1,'abyss-light');
 }
 return true;
}

export function goldenEnemy(level){const hp=76+11*(level-1);return {id:'enemy0',type:'golden',name:'L’Enchanteur doré',art:'enchanteur-dore',level,hp,maxHp:hp,dmg:Math.max(1,Math.round(6*1.09**(level-1))),boss:false,burning:false,powerUsed:false,powerBonus:0};}
