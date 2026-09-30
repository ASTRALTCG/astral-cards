// Level 19–24 additions. Shield points are separate from health and cannot heal.
export const MASTERY_SKILLS={
 plumes:{name:'Plumes tranchantes',owner:'kaerune',level:19,cd:3,effect:'plumes'},
 proie:{name:'La proie désignée',owner:'wolffy',level:19,cd:5,effect:'proie'},
 piege:{name:'Flèche absorbante',owner:'drunn',level:19,cd:3,effect:'piege'},
 sang:{name:'Le prix du sang',owner:'nahat',level:19,cd:3,effect:'sang'},
 transmutation:{name:'Transmutation élémentaire',owner:'stibili',level:20,cd:4,effect:'transmutation'},
 adaptation:{name:'Adaptation',owner:'kaerune',level:24,cd:0,automatic:true,effect:'adaptation'},
 instinct:{name:'Instinct protecteur',owner:'wolffy',level:24,cd:0,automatic:true,effect:'instinct'},
 extraction:{name:'Extraction du venin',owner:'drunn',level:24,cd:4,extraAction:true,effect:'extraction'}
};
export const MASTERY_TEXT={
 plumes:'Inflige initialement 20 % des dégâts d’attaque de Kaerune. Chaque utilisation augmente la puissance du prochain lancer de 10 points, jusqu’à 150 % : 20 %, 30 %, 40 %… Chaque répétition par la Vitesse compte comme une utilisation et profite du cumul précédent. Peut être critique. Les cumuls sont dissipables par les ennemis et disparaissent en fin de combat. Récupération : 3 tours (tour 1 → tour 4).',
 proie:'Marque une cible pendant 3 tours, tour du lancement inclus. Les Bébés Wolffy attaquent cette cible et lui infligent 20 % de dégâts supplémentaires. À sa mort ou à l’expiration de la marque, ils suivent de nouveau votre cible. Récupération : 5 tours. Ni critique ni répétition par la Vitesse.',
 piege:'Tire une flèche infligeant 100 % des dégâts d’attaque et soigne Drunn de 200 % des dégâts effectivement infligés, sans dépasser ses PV max. Les dégâts absorbés par un bouclier comptent, mais pas les dégâts excédant les PV restants. Insoignable empêche le soin. Récupération : 3 tours (tour 1 → tour 4). Peut être critique. Pas de répétition par la Vitesse.',
 sang:'Inflige 90 % des dégâts d’attaque, plus 15 % des PV actuellement manquants. Ce bonus est plafonné à 100 % des dégâts d’attaque. Seule la partie à 90 % peut être critique ; le bonus de PV manquants ne l’est jamais. Récupération : 3 tours. Pas de double action.',
 transmutation:'Consomme tous les cumuls d’Accumulation pour créer un bouclier de 3 % des PV max par cumul, plafonné à 15 %. Protection pendant 2 tours, tour du lancement inclus. Les cumuls consommés ne renforcent plus l’attaque de base. Cette conversion ne crée pas de nouveau cumul. Nécessite au moins 1 cumul. Récupération : 4 tours. Ni critique ni double action.',
 adaptation:'Chaque attaque de base ajoute 1 cumul après sa frappe, même si elle manque. Chaque cumul augmente les dégâts d’attaque de 2 % jusqu’à la fin du combat : 2 %, 4 %, 6 %… Une double action de base ajoute 2 cumuls. Les compétences, invocations et échos n’en ajoutent pas.',
 instinct:'Une fois par combat, lorsque Wolffy descend à 30 % de ses PV max ou moins, déclenche un secours au début de son prochain tour. Sans Bébé Wolffy vivant, en invoque un avec 50 % des dégâts et 35 % des PV max de Wolffy avant combat. Sinon, le petit vivant le plus blessé reçoit un bouclier égal à 8 % des PV max de Wolffy pendant 2 tours. Ce secours ne consomme pas Appel de la meute.',
 extraction:'Retire tous les cumuls de Poison de Flèche toxic sur la cible et inflige 11 % des dégâts d’attaque de Drunn par cumul : 11 %, 22 %, 33 %… Extra-compétence : ne consomme pas l’action du tour ; les ennemis et les invocations ne jouent pas après son utilisation. Nécessite une cible empoisonnée. Récupération : 4 tours. Ni critique ni répétition par la Vitesse.'
};
export const activeShields=(unit,round)=> (unit?.shields??[]).filter(x=>x.amount>0&&(x.until==null||x.until>=round));
export const shieldTotal=(unit,round)=>activeShields(unit,round).reduce((n,x)=>n+x.amount,0);
export const shieldCapacity=(unit,round)=>{const shields=activeShields(unit,round);return Math.max(0,...shields.map(x=>x.poolCapacity??0),shields.reduce((n,x)=>n+Math.max(x.amount,x.capacity??x.amount),0));};
export function grantShield(unit,source,amount,until=null){
 const shield={source,amount:Math.max(0,Math.round(amount)),until,capacity:Math.max(0,Math.round(amount))};
 unit.shields=(unit.shields??[]).filter(x=>x.source!==source);if(shield.amount)unit.shields.push(shield);const capacity=unit.shields.reduce((sum,x)=>sum+Math.max(x.amount,x.capacity??x.amount),0);for(const part of unit.shields)part.poolCapacity=capacity;return shield;
}
export function absorbShield(unit,damage,round){
 if(!unit.shields?.length)return {damage,absorbed:0};
 let left=damage;unit.shields=activeShields(unit,round).sort((a,b)=>(a.until??Infinity)-(b.until??Infinity));
 for(const sh of unit.shields){const spent=Math.min(left,sh.amount);sh.amount-=spent;left-=spent;if(!left)break;}
 unit.shields=unit.shields.filter(x=>x.amount>0);return {damage:left,absorbed:damage-left};
}
export const markedPrey=b=>b?.prey?.until>=b.round?b.enemies.find(e=>e.id===b.prey.id&&e.hp>0):null;
