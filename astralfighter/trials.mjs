export const TRIALS={
 contrecoup:{name:'Gardien du contrecoup',orb:'orbe-contrecoup',orbName:'Orbe du contrecoup',color:'#74bfff',background:'aenoria-ice',hp:1148,dmg:75,
  effect:'Inflige 20 % de dégâts supplémentaires, mais reçoit 30 % de dégâts supplémentaires. Les sacrifices de PV ne sont pas amplifiés. Les invocations ne sont pas affectées.',
  rule:'Pas de potion pendant ce duel. Le golem alterne coup de piston (100 %), charge sans attaque, puis impact à 180 %. Pendant sa charge, retirer 15 % de ses PV max brise son armure : l’impact tombe à 80 %.'},
 cycle:{name:'Gardien du cycle sauvage',orb:'orbe-cycle',orbName:'Orbe du cycle sauvage',color:'#8adb97',background:'aenoria-forest',hp:840,dmg:80,
  effect:'Alterner attaque de base et compétence offensive augmente les dégâts directs de la nouvelle action de 20 %. Répéter la même catégorie les réduit de 15 %. La première action est neutre ; soins, objets et bonus ne changent pas le cycle. Une double action de Vitesse conserve le même multiplicateur.',
  rule:'Pas de potion pendant ce duel. Le squelette alterne une lourde frappe à 130 %, puis une régénération de 6 % de ses PV max avec une attaque à 65 %. Alterner attaque de base et compétence offensive durant deux tours successifs divise son prochain soin par deux.'},
 echo:{name:'Gardienne de l’écho brisé',orb:'orbe-echo',orbName:'Orbe de l’écho brisé',color:'#f7d471',background:'echo-palace',hp:817,dmg:78,
  effect:'Chaque troisième activation de compétence répète ses dégâts directs et ses soins directs à 50 %. Les attaques de base infligent 20 % de dégâts en moins. Une activation compte une fois, même répétée par la Vitesse. Aucun coût supplémentaire, invocation, bonus ou effet négatif répété ; les passifs ne comptent pas.',
  rule:'Pas de potion pendant ce duel. La duelliste alterne deux estocs à 55 %, une parade avec riposte à 60 %, puis trois estocs à 50 %. La parade réduit uniquement la première frappe directe reçue de 50 % ; brûlure et poison la traversent.'},
 brasier:{name:'Gardien du dernier brasier',orb:'orbe-brasier',orbName:'Orbe du dernier brasier',color:'#ff7978',background:'aenoria-arena',hp:955,dmg:100,
  effect:'Sous 35 % des PV max : inflige 25 % de dégâts supplémentaires. Tous les soins reçus sont réduits de 40 % pendant le combat. Les invocations ne sont pas affectées.',
  rule:'Pas de potion pendant ce duel. Le requin alterne morsure à 100 %, envol sans attaque, puis déferlante de zone à 140 %, qui frappe aussi les invocations. Sous 35 % de ses PV max, ses dégâts augmentent de 15 %.'}
};
export function trialEnemy(kind){const d=TRIALS[kind];return {id:'enemy0',type:'guardian',guardian:kind,name:d.name,art:'guardian-'+kind,level:15,hp:d.hp,maxHp:d.hp,dmg:d.dmg,boss:true,turns:0,chargeDamage:0};}
export function trialIntent(e){const n=(e.turns??0)+1,k=e.guardian;
 if(k==='contrecoup')return n%3===1?'Coup de piston · 100 %':n%3===2?'Charge · aucune attaque':`Impact chargé · ${e.chargeDamage>=Math.ceil(e.maxHp*.15)?80:180} %`;
 if(k==='cycle')return n%2?'Lame des racines · 130 %':'Sève ancestrale · soin puis attaque à 65 %';
 if(k==='echo')return n%3===1?'Double estoc · 2 × 55 %':n%3===2?'Parade · riposte à 60 %':'Écho de la rapière · 3 × 50 %';
 return n%3===1?'Morsure du brasier · 100 %':n%3===2?'Envol · prépare une attaque de zone':'Déferlante rouge · zone à 140 %';
}
export function trialDirectDamage(e,damage){if(e.guardian==='echo'&&e.parry){e.parry=false;return Math.max(1,Math.round(damage*.5));}return damage;}
export function trialEnemyTurn(b,e,{strike,emit,log}){
 const label=trialIntent(e);emit({type:'status',to:e.id,label});log(e.name+' : '+label+'.');e.turns=(e.turns??0)+1;const n=e.turns,k=e.guardian;
 if(k==='contrecoup'){if(n%3===2){e.charging=true;e.chargeDamage=0;}else{strike(n%3===1?1:e.chargeDamage>=Math.ceil(e.maxHp*.15)?.8:1.8,'ice-slash');e.charging=false;}}
 if(k==='cycle'){if(n%2)strike(1.3,'purple-slash');else{const amount=Math.min(e.maxHp-e.hp,Math.round(e.maxHp*(b.cycleBroken?.03:.06)));e.hp+=amount;emit({type:'heal',to:e.id,amount,label:'Sève ancestrale'});b.cycleBroken=false;strike(.65,'purple-slash');}}
 if(k==='echo'){if(n%3===2){e.parry=true;strike(.6,'charged');}else for(let i=0;i<(n%3===1?2:3)&&b.hp>0;i++)strike(n%3===1?.55:.5,'charged');}
 if(k==='brasier'){const fury=e.hp<e.maxHp*.35?1.15:1;if(n%3!==2)strike((n%3===1?1:1.4)*fury,'fire',false,n%3===0);}
}
