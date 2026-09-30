// Transient battle effects. Coordinates always follow the displayed sprites.
// Gameplay and randomness stay in engine.mjs; these animations never modify a turn.
const liveEffects=new Set();
const reduced=()=>globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false;
const pause=ms=>new Promise(resolve=>setTimeout(resolve,reduced()?Math.min(ms,70):ms));
const clamp=(x,a,b)=>Math.min(b,Math.max(a,x));
function stage(){return document.querySelector('.arena');}
function anchor(unit){
 const root=stage();if(!root||!unit)return null;
 const a=root.getBoundingClientRect(),r=(unit.querySelector('.art')||unit).getBoundingClientRect();
 return {x:r.left-a.left+r.width/2,y:r.top-a.top+r.height*.48,feet:r.top-a.top+r.height*.91,top:r.top-a.top,w:r.width,h:r.height};
}
function node(kind,x,y,size=60,color='#b9eaff'){
 const root=stage();if(!root)return null;
 const n=document.createElement('span');n.className='battle-fx '+kind;n.setAttribute?.('aria-hidden','true');
 Object.assign(n.style,{left:x+'px',top:y+'px',width:size+'px',height:size+'px',opacity:0});
 n.style.setProperty?.('--fx-color',color);root.append(n);liveEffects.add(n);return n;
}
function discard(n){if(!n)return;n.remove();liveEffects.delete(n);}
function motion(n,frames,ms,options={}){
 if(!n)return Promise.resolve();
 const settings={duration:reduced()?Math.min(ms,120):ms,easing:'ease-out',fill:'forwards',...options};
 if(reduced())settings.delay=0;
 try{return n.animate(frames,settings).finished.catch(()=>{}).finally(()=>discard(n));}catch{discard(n);return Promise.resolve();}
}
export function clearBattleEffects(){for(const n of liveEffects)n.remove();liveEffects.clear();}
// Labels stay readable even when reduced motion suppresses the decorative effects.
export async function combatCueEffect(kind,unit,details={}){
 const root=stage();if(!root)return;
 const critical=kind==='critical',p=anchor(unit),label=document.createElement('div');
 label.className='combat-cue '+(critical?'cue-critical':'cue-double');label.setAttribute?.('role','status');
 label.innerHTML=critical?`<strong>⚡ ${details.enemy?'CRITIQUE ENNEMI !':'COUP CRITIQUE !'}</strong><small>${details.subtitle??'Dégâts critiques · ×1,75'}</small>`:`<strong>✦ DOUBLE ACTION</strong><small>${details.subtitle??'Bonus de vitesse · vous rejouez !'}</small>`;
 root.append(label);liveEffects.add(label);
 let damage;
 if(p){
  if(critical){
   damage=details.damage===undefined?null:node('fx-critical-damage',clamp(p.x,60,root.getBoundingClientRect().width-60),p.y,110,'#fff0a6');
   if(damage){damage.textContent='−'+details.damage;damage.style.opacity=1;}
   if(!reduced()){
    for(let i=0;i<3;i++){
     const bolt=node('fx-critical-bolt',p.x+(i-1)*28,p.y-12,100,'#ffe6a0');
     motion(bolt,[{opacity:0,transform:center(.6,i*13-13)},{opacity:1,offset:.12,transform:center(1.1,i*13-13)},{opacity:0,transform:center(1.25,i*13-13)}],460+i*65);
    }
    sparks(p,'#fff0ae',18,90);ring(p,'#ffd577',120,500);
   }
  }else if(!reduced()){
   ring(p,'#7affdc',140,650);sparks(p,'#97ffe8',18,90);
   const mark=node('fx-double-mark',p.x,p.y,90,'#b0ffeb');if(mark)mark.textContent='×2';
   motion(mark,[{opacity:0,transform:center(.4)},{opacity:1,offset:.2,transform:center(1.1)},{opacity:1,offset:.7,transform:center(1)},{opacity:0,transform:'translate(-50%,-95%) scale(1)'}],750);
  }
 }
 try{await new Promise(resolve=>setTimeout(resolve,critical?950:850));}finally{discard(label);discard(damage);}
}
const center=(scale=1,rotation=0)=>`translate(-50%,-50%) rotate(${rotation}deg) scale(${scale})`;
function ring(p,color,size=100,ms=500){const n=node('fx-shock-ring',p.x,p.y,size,color);return motion(n,[{opacity:0,transform:center(.15)},{opacity:.9,offset:.2,transform:center(.5)},{opacity:0,transform:center(1.45)}],ms);}
function sparks(p,color,count=14,radius=65){
 for(let i=0;i<count;i++){
  const angle=i*2.39996,reach=radius*(.45+(i%5)/8),n=node('fx-spark',p.x,p.y,3+i%4,color);
  motion(n,[{opacity:1,transform:center(.8)},{opacity:0,transform:`translate(calc(-50% + ${Math.cos(angle)*reach}px),calc(-50% + ${Math.sin(angle)*reach}px)) scale(.1)`}],410+(i%4)*60);
 }
}
function glyph(p,text,kind,color='#ffe0a0',size=65,ms=760){const n=node('fx-glyph '+kind,p.x,p.y,size,color);if(n)n.textContent=text;return motion(n,[{opacity:0,transform:center(.4,-12)},{opacity:1,offset:.2,transform:center(1.12,4)},{opacity:1,offset:.62,transform:center(1)},{opacity:0,transform:'translate(-50%,-85%) scale(1.15)'}],ms);}
async function windCircle(p,transformed=false,large=false){
 const colors=transformed?['#aff7ff','#ffbc57','#ffffff']:['#a5edff','#d9ffff','#79c5ed'];
 const size=clamp(p.w*(transformed?1.4:1.12),large?105:75,large?190:145);
 for(let i=0;i<5;i++){
  const n=node('fx-wind-ring',p.x,p.y+(i-2)*8,size+i*9,colors[i%3]);
  motion(n,[{opacity:0,transform:`translate(-50%,-50%) rotate(${i*45}deg) scale(.35,.16)`},{opacity:.9,offset:.25,transform:`translate(-50%,-50%) rotate(${i*45+80}deg) scale(1,.40)`},{opacity:0,transform:`translate(-50%,-50%) rotate(${i*45+260}deg) scale(1.2,.52)`}],620+i*30);
 }
 sparks(p,colors[0],12,size*.6);await pause(510);
}
export async function distressEffect(){
 const root=stage(),hero=document.getElementById('hero'),p=anchor(hero);if(!root||!p)return;
 const r=root.getBoundingClientRect(),falls=[];
 for(let i=0;i<(reduced()?3:15);i++){
  const x=20+(i*83%(Math.max(80,r.width-40))),n=node('fx-white-feather',x,15,26+i%4*7,'#fff');
  falls.push(motion(n,[{opacity:0,transform:center(.65,-35)},{opacity:1,offset:.18,transform:`translate(-50%,${r.height*.15}px) rotate(5deg)`},{opacity:.9,offset:.68},{opacity:0,transform:`translate(calc(-50% + ${i%2?30:-30}px),${r.height*.74}px) rotate(${i%2?80:-80}deg)`}],1600,{delay:i%5*100}));
 }
 ring(p,'#fff1bf',150,900);await Promise.all(falls);
}
export async function castEffect(event){
 const hero=document.getElementById('hero'),p=anchor(hero);if(!p)return;
 const head={...p,y:p.top+12};
 switch(event.skill){
 case 'navigatrice':ring(p,'#ffbd92',115,500);await pause(220);break;
 case 'rebecca':{const seal=node('fx-rebecca-seal',p.x,p.y,92,'#ff537b');if(seal)seal.innerHTML='<img src="assets/icons/skill-rebecca.webp" alt="" style="width:100%;height:100%;object-fit:contain">';await motion(seal,[{opacity:0,transform:center(.4)},{opacity:1,offset:.3,transform:center(1)},{opacity:0,transform:center(1.25)}],500);break;}
 case 'souffle':{
  const seal=node('fx-kaerune-order',p.x,p.y,150,'#ffe6a4');await motion(seal,[{opacity:0,transform:center(.55)},{opacity:1,offset:.18,transform:center(1)},{opacity:1,offset:.65},{opacity:0,transform:center(1.13)}],1500);break;
 }
 case 'fumee':ring({...p,y:p.feet},'#b9bdc6',145,600);await pause(450);break;
 case 'sacrifice':{
  const drop=node('fx-blood-drop',head.x,head.y-18,56,'#ff365e');if(drop)drop.textContent='🩸';await motion(drop,[{opacity:0,transform:center(.3)},{opacity:1,offset:.45,transform:center(1.2)},{opacity:0,transform:center(1.5)}],500);sparks(head,'#f94162',20,70);await pause(200);break;
 }
 case 'elementaire':ring(p,'#e7aaff',100,480);await pause(240);break;

 case 'attraction':{
  const target=document.getElementById(event.to),q=anchor(target),root=stage();if(!q||!root)break;
  const rect=root.getBoundingClientRect(),size=Math.max(rect.width,rect.height)*2;
  const veil=node('fx-void-veil',q.x,q.y,size,'#a37aff');
  motion(veil,[{opacity:0,transform:center(.2)},{opacity:.78,offset:.48,transform:center(1)},{opacity:0,transform:center(.08)}],1050);
  const hole=node('fx-void-hole',q.x,q.y,105,'#b88cff');
  const portal=motion(hole,[{opacity:0,transform:center(.03)},{opacity:1,offset:.32,transform:center(1.2,90)},{opacity:1,offset:.72,transform:center(1,260)},{opacity:0,transform:center(.01,360)}],1100);
  if(!reduced())for(let i=0;i<14;i++){
   const angle=i*Math.PI*2/14,reach=Math.min(380,rect.width*.7),streak=node('fx-void-streak',q.x,q.y,7,'#cab3ff');
   motion(streak,[{opacity:0,transform:`translate(calc(-50% + ${Math.cos(angle)*reach}px),calc(-50% + ${Math.sin(angle)*reach}px)) rotate(${i*26}deg) scale(4,.5)`},{opacity:.8,offset:.25},{opacity:0,transform:center(.1,240)}],760,{delay:i*17});
  }
  await pause(350);
  const sprite=target?.querySelector('.art');
  if(sprite&&!reduced())try{await sprite.animate([{opacity:1,transform:'scaleX(-1) scale(1)'},{opacity:.05,transform:'scaleX(-1) rotate(30deg) scale(.05)'}],{duration:500,easing:'ease-in',fill:'none'}).finished;}catch{}
  target?.classList.add('void-exiled');await portal;break;
 }
 case 'redressement': { // Permanent attack and speed buff.
  const n=document.createElement('div');n.className='effect redressement';n.setAttribute?.('aria-hidden','true');hero.append(n);liveEffects.add(n);await pause(550);discard(n);break;
 }
 case 'courage':{
  const n=node('fx-shield',p.x,p.y,100,'#ffdd86');if(n)n.innerHTML='<span>✦</span>';
  ring(p,'#ffe5a5',125,750);await motion(n,[{opacity:0,transform:center(.3)},{opacity:1,offset:.2,transform:center(1.12)},{opacity:.9,offset:.65,transform:center(1)},{opacity:0,transform:center(1.22)}],800);break;
 }
 case 'epine':{
  const heart=node('fx-sacrifice-heart',head.x,head.y,53,'#ff6b87');if(heart)heart.textContent='♥';
  motion(heart,[{opacity:0,transform:center(.4)},{opacity:1,offset:.18,transform:center(1.15)},{opacity:1,offset:.5,transform:center(.9)},{opacity:0,transform:center(1.35)}],850);
  const knife=node('fx-sacrifice-knife',head.x+5,head.y-58,48,'#e5f5ff');if(knife)knife.textContent='🗡';
  motion(knife,[{opacity:0,transform:center(.8,145)},{opacity:1,offset:.2,transform:center(1,145)},{opacity:1,offset:.58,transform:'translate(-60%,58%) rotate(145deg)'},{opacity:0,transform:'translate(-60%,65%) rotate(145deg)'}],720);
  await pause(420);sparks(head,'#ff647c',10,36);await pause(320);break;
 }
 case 'fury':await glyph({...head,x:head.x+p.w*.18},'💢','fx-anger','#ff685f',53,720);break;
 case 'meute':{
  const art=hero.querySelector('.art');
  if(!reduced()&&art?.animate)await art.animate([{transform:'translateX(0)'},{transform:'translateX(-5px)',offset:.18},{transform:'translateX(5px)',offset:.32},{transform:'translateX(-4px)',offset:.48},{transform:'translateX(4px)',offset:.65},{transform:'translateX(0)'}],{duration:430}).finished.catch(()=>{});
  const aura=node('fx-rage-aura',p.x,p.y,clamp(p.h,140,230),'#ff303b');
  motion(aura,[{opacity:0,transform:center(.8)},{opacity:.65,offset:.35,transform:center(1)},{opacity:0,transform:center(1.25)}],700);sparks(p,'#f6535b',20,75);await pause(660);break;
 }
 case 'soin':{
  const color='#79ff9e',height=clamp(p.h*1.25,155,320),width=clamp(p.w*.7,65,140),beam=node('fx-heal-beam',p.x,p.feet-height/2,width,color),effects=[];
  if(beam)beam.style.height=height+'px';
  effects.push(motion(beam,[{opacity:0,transform:center(.7)},{opacity:.9,offset:.25,transform:center(1)},{opacity:.7,offset:.75},{opacity:0,transform:center(1.12)}],1150));
  for(let i=0;i<3;i++){
   const ribbon=node('fx-heal-ribbon',p.x,p.feet,width*1.2,color);
   effects.push(motion(ribbon,[{opacity:0,transform:'translate(-50%,-50%) scaleY(.3) rotate(-15deg)'},{opacity:1,offset:.25},{opacity:.8,offset:.7},{opacity:0,transform:`translate(-50%,calc(-50% - ${height*.85}px)) scaleY(.3) rotate(20deg)`}],900,{delay:i*100}));
  }
  sparks(p,color,16,55);await Promise.all(effects);break;
 }
 case 'nuageux':{
  const root=stage(),r=root.getBoundingClientRect();
  for(let i=0;i<12;i++){
   const x=r.width*(i%6)/5,y=85+Math.floor(i/6)*r.height*.42,n=node('fx-dark-cloud',x,y,110+(i%3)*45,'#181324');
   motion(n,[{opacity:0,transform:'translate(-60%,-50%) scale(.6)'},{opacity:.74,offset:.3,transform:'translate(-50%,-50%) scale(1)'},{opacity:0,transform:'translate(-30%,-68%) scale(1.3)'}],1250,{delay:(i%4)*45});
  }
  await pause(800);break;
 }
 case 'precision':{
  const n=node('fx-crosshair',p.x,p.y,105,'#b4ffd8');if(n)n.innerHTML='<i></i><b></b><em></em>';
  await motion(n,[{opacity:0,transform:center(1.6,40)},{opacity:1,offset:.36,transform:center(1)},{opacity:1,offset:.75,transform:center(1)},{opacity:0,transform:center(.95)}],850);break;
 }
 case 'envol':await windCircle(p,event.matriarch,true);break;
 case 'pret':ring(p,'#b0f5d0',70,350);await pause(190);break;
 case 'tircharge':{
  const charges=event.charges??0,color='#ffe5a5';
  for(let i=0;i<Math.max(1,charges);i++){
   const angle=i*2*Math.PI/Math.max(1,charges),n=node('fx-charge-star',p.x+Math.cos(angle)*48,p.y+Math.sin(angle)*48,9,color);
   motion(n,[{opacity:0,transform:center(.5)},{opacity:1,offset:.3,transform:center(1)},{opacity:0,transform:`translate(calc(-50% + ${-Math.cos(angle)*48}px),calc(-50% + ${-Math.sin(angle)*48}px)) scale(.3)`}],540);
  }
  ring(p,color,60+charges*13,620);await pause(540);break;
 }
 case 'puissance':{
  for(let i=0;i<3;i++){const n=node('fx-power-ring',p.x,p.y,75+i*20,'#c3a1ff');motion(n,[{opacity:0,transform:center(.6,i*60)},{opacity:.9,offset:.3,transform:center(1,i*60+90)},{opacity:0,transform:center(1.3,i*60+150)}],750);}
  sparks(p,'#d9b7ff',18,72);await pause(610);break;
 }
 case 'larve':ring({...p,y:p.feet},'#b084ff',135,700);sparks(p,'#ab70e8',20,70);await pause(600);break;
 case 'ascension':ring(p,'#ffe4ac',150,650);await pause(210);break;
 case 'feu':sparks({...p,x:p.x+p.w*.24},'#ffbd69',10,35);await pause(180);break;
 case 'glacier':ring({...p,y:p.feet},'#b9f4ff',85,340);await pause(180);break;
 case 'ouragan':ring(p,'#ade7df',70,350);await pause(150);break;
 default:await pause(120);
 }
}
export async function strikeEffect(event,from,to){
 const a=anchor(from),b=anchor(to);if(!b)return;
 const kind=event.projectile;
 if(kind==='forge-sword'){
  const sword=node('fx-forge-strike',b.x,b.y-45,140,'#ff8358');if(sword)sword.innerHTML='<img src="assets/epee-lourde-magmatique.webp" alt="">';
  await motion(sword,[{opacity:0,transform:center(.8,-70)},{opacity:1,offset:.2,transform:center(1,-45)},{opacity:1,offset:.6,transform:'translate(-50%,calc(-50% + 45px)) rotate(35deg)'},{opacity:0,transform:'translate(-50%,calc(-50% + 60px)) rotate(45deg)'}],650);sparks(b,'#ffb577',23,90);ring(b,'#ff704b',90,350);return;
 }
 if(kind==='forge-slash'||kind==='forge-shield-strike'){
  const slash=node(kind==='forge-slash'?'fx-forge-slash':'fx-forge-impact',b.x,b.y,130,'#ff654f');await motion(slash,[{opacity:0,transform:center(.2,-25)},{opacity:1,offset:.35,transform:center(1,15)},{opacity:0,transform:center(1.35,30)}],420);sparks(b,'#ff8264',12,60);return;
 }
 if(kind==='luminous-feathers'){
  const origin=a??{...b,x:b.x-120};const flights=[];
  for(let i=0;i<5;i++){const y=(i-2)*15,feather=node('fx-luminous-feather',origin.x,origin.y+y,55,'#d9f7ff');flights.push(motion(feather,[{opacity:0,transform:center(.4)},{opacity:1,offset:.2},{opacity:1,transform:`translate(calc(-50% + ${b.x-origin.x}px),calc(-50% + ${b.y-origin.y-y}px)) rotate(55deg) scale(.8)`}],480,{delay:i*65}));}
  await Promise.all(flights);sparks(b,'#e2fbff',24,90);return;
 }
 if(kind==='absorbing-arrow'){
  const start=a??{...b,x:b.x-100},arrow=node('fx-toxic-arrow',start.x,start.y,64,'#80efde');if(arrow)arrow.textContent='➶';
  await motion(arrow,[{opacity:0,transform:center(.7)},{opacity:1,offset:.12},{opacity:1,transform:`translate(calc(-50% + ${b.x-start.x}px),calc(-50% + ${b.y-start.y}px))`}],460);sparks(b,'#80efde',15,60);
  const essence=node('fx-void-orb',b.x,b.y,36,'#80efde');await motion(essence,[{opacity:1,transform:center(.9)},{opacity:.9,offset:.6},{opacity:0,transform:`translate(calc(-50% + ${start.x-b.x}px),calc(-50% + ${start.y-b.y}px)) scale(.3)`}],500);ring(start,'#80efde',100,500);return;
 }
 if(['void-saws','void-execute','void-curse'].includes(kind)){
  const color=kind==='void-execute'?'#e3bdff':'#ad63ef';ring(b,color,kind==='void-curse'?160:100,550);
  if(kind==='void-curse'){const cloud=node('fx-venom-burst',b.x,b.y,140,color);await motion(cloud,[{opacity:0,transform:center(1.5)},{opacity:.85,offset:.5,transform:center(.7)},{opacity:0,transform:center(.1)}],600);}
  else{const cut=node('fx-pup-cross',b.x,b.y,kind==='void-execute'?170:115,color);await motion(cut,[{opacity:0,transform:center(.2,-30)},{opacity:1,offset:.3,transform:center(1,20)},{opacity:0,transform:center(1.25,40)}],500);}
  sparks(b,color,20,80);return;
 }
 if(kind==='blood-price'){await strikeEffect({...event,projectile:'blood-strike'},from,to);ring(b,'#d52d55',95,500);sparks(b,'#f33b59',20,65);return;}
 if(kind==='venom-extract'){ring(b,'#a6f475',125,600);sparks(b,'#88ea60',26,90);const cloud=node('fx-venom-burst',b.x,b.y,130,'#8bee6b');await motion(cloud,[{opacity:0,transform:center(.4)},{opacity:.85,offset:.35,transform:center(1)},{opacity:0,transform:center(1.8)}],700);return;}
 if(kind==='tracker-trap'){await masteryEffect({type:'trap-trigger'},to);return;}

 if(kind==='fire-feather'){
  const origin=a??{...b,x:b.x-100},feather=node('fx-expedition-feather',origin.x,origin.y,66,'#ff9a48');
  await motion(feather,[{opacity:0,transform:center(.5)},{opacity:1,offset:.15},{opacity:1,transform:`translate(calc(-50% + ${b.x-origin.x}px),calc(-50% + ${b.y-origin.y}px)) rotate(55deg) scale(.85)`}],460);
  sparks(b,'#ffb152',13,60);await pause(130);return;
 }
 if(kind==='magma-impact'){ring(b,'#ff6b24',170,600);sparks(b,'#ffc46d',23,105);const root=stage();if(root&&!reduced())await root.animate([{transform:'translateX(0)'},{transform:'translateX(5px)'},{transform:'translateX(-5px)'},{transform:'translateX(0)'}],{duration:330}).finished.catch(()=>{});await pause(220);return;}
 if(kind==='abyss-light'){
  const origin=a??{...b,x:b.x+80},orb=node('fx-void-orb',origin.x,origin.y,38,'#ff608a');
  await motion(orb,[{opacity:0,transform:center(.4)},{opacity:1,offset:.18},{opacity:1,transform:`translate(calc(-50% + ${b.x-origin.x}px),calc(-50% + ${b.y-origin.y}px)) scale(1.1)`}],540);sparks(b,'#fa7caa',14,60);ring(b,'#c166dc',95,420);return;
 }
 if(kind==='bone-drop'){
  const bone=node('fx-falling-bone',b.x,b.y-110,62,'#e9dbff');
  await motion(bone,[{opacity:0,transform:center(.6,-80)},{opacity:1,offset:.2},{opacity:1,transform:'translate(-50%,calc(-50% + 110px)) rotate(45deg) scale(1)'}],520);
  ring(b,'#d8b9ff',80,350);sparks(b,'#e6d0ff',12,55);await pause(100);return;
 }
 if(kind==='pack-slash'){
  const sprite=from?.querySelector('.art');
  if(sprite?.animate&&!reduced()){try{await sprite.animate([{transform:'translateX(0)'},{transform:'translateX(24px)',offset:.45},{transform:'translateX(0)'}],{duration:320,easing:'ease-in-out'}).finished;}catch{}}
  const cross=node('fx-pup-cross',b.x,b.y,95,'#bc7bff');await motion(cross,[{opacity:0,transform:center(.35)},{opacity:1,offset:.3,transform:center(1)},{opacity:0,transform:center(1.2)}],360);sparks(b,'#bc7bff',12,55);return;
 }
 if(kind==='bone-slash'){await strikeEffect({...event,projectile:'ice-slash'},from,to);return;}

 if(kind==='wolf-leap'){
  const sprite=from?.querySelector('.art');
  if(a&&sprite?.animate&&!reduced()){
   const dx=b.x-a.x,dy=b.y-a.y;
   try{await sprite.animate([{transform:'translate(0,0) scale(1)'},{transform:`translate(${dx*.45}px,${dy*.4-85}px) scale(1.13)`,offset:.3},{transform:`translate(${dx}px,${dy}px) scale(1.05)`,offset:.55},{transform:`translate(${dx*.45}px,${dy*.4-50}px) scale(1)`,offset:.75},{transform:'translate(0,0) scale(1)'}],{duration:850,easing:'ease-in-out'}).finished;}catch{}
  }
  ring(b,'#ed9fad',120,450);sparks(b,'#ffd2d9',12,65);await pause(200);return;
 }
 if(kind==='fangs'){
  const upper=node('fx-fang-bite upper',b.x,b.y,140,'#f07698'),lower=node('fx-fang-bite lower',b.x,b.y,140,'#f07698');
  await Promise.all([motion(upper,[{opacity:0,transform:'translate(-50%,-90%) scale(1.2)'},{opacity:1,offset:.25},{opacity:1,offset:.55,transform:center(1)},{opacity:0,transform:center(.92)}],650),motion(lower,[{opacity:0,transform:'translate(-50%,-10%) scale(1.2)'},{opacity:1,offset:.25},{opacity:1,offset:.55,transform:center(1)},{opacity:0,transform:center(.92)}],650)]);
  sparks(b,'#ef9bb5',16,70);return;
 }
 if(kind==='toxic-arrow'){
  const start=a??{...b,x:b.x-100},arrow=node('fx-toxic-arrow',start.x,start.y,64,'#b4f86d');if(arrow)arrow.textContent='➶';
  for(let i=0;i<7;i++){const f=i/7,n=node('fx-toxic-mist',start.x+(b.x-start.x)*f,start.y+(b.y-start.y)*f,45,'#87d550');motion(n,[{opacity:0,transform:center(.3)},{opacity:.6,offset:.3},{opacity:0,transform:center(1.2)}],750,{delay:i*55});}
  await motion(arrow,[{opacity:0,transform:center(.7)},{opacity:1,offset:.1},{opacity:1,transform:`translate(calc(-50% + ${b.x-start.x}px),calc(-50% + ${b.y-start.y}px)) rotate(-10deg)`}],550);sparks(b,'#a1ef62',18,70);return;
 }
 if(kind==='elemental-orb'){
  const root=stage(),r=root.getBoundingClientRect(),orb=node('fx-elemental-orb',b.x,b.top-25,90,'#e7baff');
  await motion(orb,[{opacity:0,transform:center(.3)},{opacity:1,offset:.28,transform:center(.8)},{opacity:1,offset:.75,transform:center(1.45)},{opacity:0,transform:`translate(-50%,${b.y-b.top}px) scale(.5)`}],1100);
  const burst=node('fx-elemental-burst',r.width/2,r.height/2,Math.max(r.width,r.height)*1.5,'#dbbaff');if(burst){document.body?.append(burst);Object.assign(burst.style,{position:'fixed',left:'50vw',top:'50vh',width:'150vmax',height:'150vmax',zIndex:1000});}await motion(burst,[{opacity:0,transform:center(.1)},{opacity:.8,offset:.15,transform:center(1)},{opacity:0,transform:center(1.2)}],700);sparks(b,'#e9c6ff',26,120);return;
 }
 if(kind==='blood-strike'){sparks(b,'#ff4e6f',16,70);ring(b,'#d54266',80,450);await pause(300);return;}

 if(kind==='lightning'||kind==='lightning-blue'){
  const blue=kind==='lightning-blue',color=blue?'#6ccfff':'#ffe07c',height=clamp(b.y+65,130,340);
  const bolt=node('fx-lightning'+(blue?' empowered':''),b.x,b.y-height/2,blue?95:68,color);if(bolt)bolt.style.height=height+'px';
  ring(b,color,blue?165:110,700);sparks(b,color,blue?23:12,blue?100:60);
  if(blue){const echo=node('fx-lightning lightning-echo',b.x+20,b.y-height/2,66,'#d5f5ff');if(echo)echo.style.height=height+'px';motion(echo,[{opacity:0},{opacity:.8,offset:.2},{opacity:0}],550);}
  await motion(bolt,[{opacity:0,transform:center(1)},{opacity:1,offset:.08,transform:center(1)},{opacity:.25,offset:.2},{opacity:1,offset:.3},{opacity:0,transform:center(1.08)}],blue?780:580);return;
 }
 if(kind==='void-orb'){
  const origin=a??{...b,x:b.x+100},orb=node('fx-void-orb',origin.x,origin.y,48,'#a568e2');
  await motion(orb,[{opacity:0,transform:center(.3)},{opacity:1,offset:.2,transform:center(1)},{opacity:1,transform:`translate(calc(-50% + ${b.x-origin.x}px),calc(-50% + ${b.y-origin.y}px)) scale(1.2)`}],650);
  ring(b,'#ac77f5',140,550);sparks(b,'#c195ff',18,80);await pause(260);return;
 }
 if(kind==='explosion'){
  if(a){ring(a,'#ff994b',180,650);sparks(a,'#ffb45d',24,110);const burst=node('fx-dragon-burst',a.x,a.y,150,'#ff8f45');await motion(burst,[{opacity:0,transform:center(.15)},{opacity:1,offset:.25,transform:center(.85)},{opacity:0,transform:center(1.5)}],600);}
  ring(b,'#ff8f45',105,420);sparks(b,'#ffc276',10,55);await pause(180);return;
 }
 if(kind==='frost-shard'){
  const n=node('fx-frost-shard',b.x,b.y-40,38,'#c5f4ff');
  await motion(n,[{opacity:0,transform:center(.3,-15)},{opacity:1,offset:.3,transform:center(1,10)},{opacity:0,transform:'translate(-50%,50%) scale(.6)'}],370);sparks(b,'#c5f4ff',8,40);return;
 }
 if(['pack-slash','black-slash','purple-slash','purple-scythe','ice-slash','mentor'].includes(kind)){
  const color=kind==='pack-slash'?'#f65d83':kind==='black-slash'?'#272030':kind==='ice-slash'?'#bcefff':kind==='mentor'?'#ffe3fb':'#c083ff';
  if(kind==='purple-scythe'){
   const n=node('fx-story-scythe',b.x,b.y,clamp(b.h,115,180),color);
   await motion(n,[{opacity:0,transform:center(.8,-70)},{opacity:1,offset:.25,transform:center(1,-35)},{opacity:1,offset:.65,transform:center(1.1,55)},{opacity:0,transform:center(1.15,90)}],600);
  }else{
   const n=node('fx-story-slash '+(kind==='black-slash'?'black':''),b.x,b.y,clamp(b.h*1.1,120,210),color);
   await motion(n,[{opacity:0,transform:center(.25,-65)},{opacity:1,offset:.2,transform:center(.8,-40)},{opacity:1,offset:.5,transform:center(1,20)},{opacity:0,transform:center(1.15,65)}],400);
  }
  sparks(b,color,13,65);return;
 }
 if(kind==='wind'){await windCircle(b,event.matriarch);return;}
 if(kind==='ice'){
  const ground={...b,y:b.feet};ring(ground,'#b5f1ff',135,1000);
  for(let i=0;i<7;i++){
   const h=(i===3?1:.55+((i*3)%4)*.11)*clamp(b.h*1.15,130,220),x=b.x+(i-3)*14;
   const n=node('fx-ice-spike',x,b.feet-h/2,28+(i%3)*11,'#bcefff');
   if(n){n.style.height=h+'px';n.style.transformOrigin='50% 100%';}
   motion(n,[{opacity:0,transform:'translate(-50%,-50%) scaleY(0)'},{opacity:1,offset:.38,transform:'translate(-50%,-50%) scaleY(1)'},{opacity:.9,offset:.72,transform:'translate(-50%,-50%) scaleY(1)'},{opacity:0,transform:'translate(-50%,-50%) scaleY(.96)'}],1050,{delay:Math.abs(i-3)*35});
  }
  await pause(420);sparks(b,'#e0fbff',23,90);return;
 }
 if(kind==='tornado'){
  for(let i=0;i<9;i++){
   const w=22+i*10,n=node('fx-tornado-band',b.x,b.feet-8-i*16,w,'#c9f9eb');
   if(n)n.style.height=(10+i*2)+'px';
   motion(n,[{opacity:0,transform:'translate(-75%,-50%) scale(.4)'},{opacity:.9,offset:.2,transform:'translate(-50%,-50%) scale(1)'},{opacity:.85,offset:.6,transform:`translate(-${i%2?35:65}%,-65%) scale(1.04)`},{opacity:0,transform:'translate(-30%,-105%) scale(1.3)'}],1000,{delay:i*24});
  }
  for(let i=0;i<12;i++){
   const n=node('fx-wind-mote',b.x,b.feet-20,6,'#c6f8db');
   motion(n,[{opacity:0,transform:'translate(-50%,0)'},{opacity:1,offset:.25,transform:`translate(${i%2?-45:45}px,-${25+i*4}px) rotate(70deg)`},{opacity:.9,offset:.65,transform:`translate(${i%2?55:-55}px,-${70+i*3}px) rotate(200deg)`},{opacity:0,transform:'translate(0,-155px) rotate(360deg)'}],1000,{delay:i*15});
  }
  await pause(650);return;
 }
 if(kind==='arrows'){
  for(let i=0;i<5;i++){
   const dx=(i-2)*15,n=node('fx-arrow',b.x+dx+45,b.y-140,70,'#d8f7c6');
   motion(n,[{opacity:0,transform:'translate(-50%,-50%) rotate(110deg)'},{opacity:1,offset:.13,transform:'translate(-50%,-50%) rotate(110deg)'},{opacity:1,offset:.76,transform:'translate(calc(-50% - 45px),calc(-50% + 145px)) rotate(110deg)'},{opacity:0,transform:'translate(calc(-50% - 48px),calc(-50% + 150px)) rotate(110deg)'}],500,{delay:i*35});
  }
  await pause(390);sparks(b,'#d9f9a5',8,35);return;
 }
 if(!a)return;
 if(kind==='charged'){
  const charges=event.charges??0,dx=b.x-a.x,dy=b.y-a.y,angle=Math.atan2(dy,dx)*180/Math.PI;
  const n=node('fx-charged-arrow',a.x,a.y,60+charges*12,'#ffe2a2');
  motion(n,[{opacity:0,transform:center(.5,angle)},{opacity:1,offset:.08,transform:center(1,angle)},{opacity:1,offset:.94,transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) rotate(${angle}deg)`},{opacity:0,transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) rotate(${angle}deg)`}],400);
  for(let i=0;i<4+charges*2;i++){const t=i/(4+charges*2);const n=node('fx-spark',a.x+dx*t,a.y+dy*t,3+charges*.6,'#ffe9bb');motion(n,[{opacity:0},{opacity:.8,offset:.25},{opacity:0,transform:'translate(-10px,12px) scale(.2)'}],530,{delay:t*300});}
  await pause(370);ring(b,'#ffe3a5',70+charges*15,430);sparks(b,'#ffe6a9',10+charges*3,40+charges*10);return;
 }
 if(kind==='giant-fire'){
  const orb=node('fx-fireball',a.x,a.y-30,135,'#ff7b30');
  await motion(orb,[{opacity:0,transform:'translate(-50%,-50%) scale(.3)'},{opacity:1,offset:.6,transform:'translate(-50%,-50%) scale(1.3)'},{opacity:1,transform:`translate(calc(-50% + ${b.x-a.x}px),calc(-50% + ${b.y-a.y+30}px)) scale(1.7)`}],1050);
  ring(b,'#ffd48b',260,600);sparks(b,'#ff7f30',32,150);await pause(450);return;
 }
 if(kind==='fire'){
  const dx=b.x-a.x,dy=b.y-a.y,angle=Math.atan2(dy,dx)*180/Math.PI,n=node('fx-fireball',a.x,a.y,45,'#ff9b3d');
  motion(n,[{opacity:0,transform:center(.35,angle)},{opacity:1,offset:.15,transform:`translate(calc(-50% + ${dx*.1}px),calc(-50% + ${dy*.1-12}px)) rotate(${angle}deg) scale(.8)`},{opacity:1,offset:.52,transform:`translate(calc(-50% + ${dx*.5}px),calc(-50% + ${dy*.5-28}px)) rotate(${angle}deg) scale(1)`},{opacity:1,offset:.94,transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) rotate(${angle}deg) scale(1.1)`},{opacity:0,transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(1.35)`}],600,{easing:'ease-in'});
  for(let i=0;i<18;i++){const t=i/18,n=node('fx-ember',a.x+dx*t,a.y+dy*t-Math.sin(t*Math.PI)*28,4+i%5,'#ffba56');motion(n,[{opacity:0,transform:center(1)},{opacity:.9,offset:.15,transform:center(1)},{opacity:0,transform:'translate(-20px,15px) scale(.1)'}],350,{delay:t*540});}
  await pause(565);ring(b,'#ffb84d',100,450);sparks(b,'#ffcb64',22,85);
 }
}
export async function transformationEffect(event,swap){
 const p=anchor(document.getElementById('hero'));if(!p){swap();return;}
 const color=event.matriarch?'#8fe9ff':'#ffdb8e';
 ring(p,color,180,1100);
 const n=node('fx-transformation',p.x,p.y,Math.max(150,p.h),color);
 motion(n,[{opacity:0,transform:center(.3)},{opacity:.92,offset:.36,transform:center(1)},{opacity:.55,offset:.6,transform:center(1.1)},{opacity:0,transform:center(1.45)}],1050);
 await pause(380);swap();sparks(p,event.matriarch?'#ffc975':color,30,110);await pause(610);
}

export async function enemyStoryEffect(event,unit,onReform=()=>{}){
 const p=anchor(unit);if(!p){if(event.type==='sword-revive')onReform();return;}
 if(event.type==='rift-portal'){
  const portal=node('fx-spectral-portal',p.x,p.y,Math.max(150,p.h),'#bb82ff'),sprite=unit?.querySelector('.art');
  const swirl=motion(portal,[{opacity:0,transform:center(.1,0)},{opacity:1,offset:.35,transform:center(1,120)},{opacity:.9,offset:.75,transform:center(.8,300)},{opacity:0,transform:center(.05,400)}],1100);
  if(sprite?.animate&&!reduced()){try{await sprite.animate([{opacity:1,transform:'scale(1)'},{opacity:.8,offset:.45,transform:'scale(.65) rotate(12deg)'},{opacity:0,transform:'scale(.02) rotate(100deg)'}],{duration:950,easing:'ease-in'}).finished;}catch{}}
  await swirl;return;
 }
 if(event.type==='rift-cue'){const color=event.kind==='lantern'?'#edb6ff':'#b15fff';ring(p,color,event.kind==='breath'?210:120,650);sparks(p,color,18,80);const aura=node('fx-void-orb',p.x,p.y,event.kind==='charge'?100:65,color);await motion(aura,[{opacity:0,transform:center(.2)},{opacity:.8,offset:.45,transform:center(1)},{opacity:0,transform:center(1.6)}],700);return;}
 if(event.type==='sword-revive'){
  const clouds=[];unit?.classList.add('sword-reforming');
  try{
   for(let i=0;i<8;i++){
    const angle=i*Math.PI/4,x=p.x+Math.cos(angle)*p.w*.32,y=p.y+Math.sin(angle)*p.h*.32;
    const cloud=node('fx-dark-cloud fx-sword-cloud',x,y,75+i%3*20,'#471824');
    clouds.push(motion(cloud,[{opacity:0,transform:center(.3)},{opacity:.94,offset:.35,transform:center(1)},{opacity:.8,offset:.6,transform:center(1.1)},{opacity:0,transform:`translate(calc(-50% + ${Math.cos(angle)*30}px),calc(-50% + ${Math.sin(angle)*30}px)) scale(1.35)`}],1100,{delay:i*25}));
   }
   await pause(480);onReform();ring(p,'#e57982',110,650);sparks(p,'#eb8b90',15,65);
   await Promise.all(clouds);
  }finally{unit?.classList.remove('sword-reforming');}
  return;
 }
 if(event.type==='enemy-light'||event.type==='enemy-survival'||event.type==='lava-burn'){
  const color=event.type==='enemy-light'?'#fff2ad':event.type==='enemy-survival'?'#ffc88a':'#ff783b';
  ring(p,color,event.type==='enemy-light'?95:120,650);sparks(p,color,12,55);
  if(event.type==='enemy-survival'){const shield=node('fx-shield',p.x,p.y,110,color);await motion(shield,[{opacity:0,transform:center(.6)},{opacity:1,offset:.4,transform:center(1)},{opacity:0,transform:center(1.1)}],600);}else await pause(400);
  return;
 }
 if(event.type==='enemy-wings'){await windCircle(p,true,true);return;}
 const color=event.type==='enemy-rage'?'#f78ea5':'#c087ff';
 const n=node('fx-story-aura',p.x,p.y,clamp(p.h,110,210),color);
 ring({...p,y:p.feet},color,130,800);sparks(p,color,18,80);
 await motion(n,[{opacity:0,transform:center(.4)},{opacity:.9,offset:.3,transform:center(1)},{opacity:.7,offset:.6,transform:center(1.08)},{opacity:0,transform:center(1.3)}],800);
}

export async function diceEffect(event){
 const root=stage();if(!root)return;
 const refusal=event.skill==='refus',lightning=event.skill==='foudroiement',success=refusal?event.success:lightning?event.empowered:!!event.bonus;
 const box=document.createElement('div');box.className='combat-die die-spinning'+(lightning?' lightning-die':'');box.setAttribute?.('role','status');box.setAttribute?.('aria-live','polite');
 box.innerHTML=`<strong>${refusal?'Nahat · Refus de mourir':lightning?'Stibili · Foudroiement':'Maëlla · Éclat du destin'}</strong><span class="die-face">⚀</span><p>${refusal?(event.upgraded?'1, 2 ou 6 : survie et bouclier de 3 %.':'6 : survie avec 30 % des PV max.'):lightning?'1 ou 6 : éclair bleu à 175 %.':'5 ou 6 : une frappe supplémentaire à 10 %.'}</p>`;root.append(box);liveEffects.add(box);
 if(!reduced())for(const face of ['⚁','⚃','⚅']){const el=box.querySelector('.die-face');if(el)el.textContent=face;await new Promise(resolve=>setTimeout(resolve,100));}
 box.classList.remove('die-spinning');if(success)box.classList.add('success');
 box.innerHTML=`<strong>${refusal?'Refus de mourir':lightning?'Foudroiement':'Maëlla'} · Dé : ${event.roll} / 6</strong><span class="die-face">${['⚀','⚁','⚂','⚃','⚄','⚅'][event.roll-1]}</span><p>${refusal?(success?'Nahat survit · Insoignable · dégâts −20 %':'Le destin refuse.'):lightning?(success?'Éclair bleu · 175 % de puissance !':'Éclair jaune · 100 % de puissance'):event.bonus?`Seconde frappe : ${event.bonus} dégâts<br>10 % des ${event.base} dégâts infligés`:'Aucune frappe supplémentaire.'}</p>`;
 await new Promise(resolve=>setTimeout(resolve,1500));discard(box);
}

export async function riftEntryEffect(){
 const overlay=document.createElement('div');overlay.className='rift-entry';overlay.setAttribute('role','status');overlay.innerHTML='<span class="rift-entry-ring" aria-hidden="true"></span><strong>Fissure du Néant</strong><span>La descente commence…</span>';document.body.append(overlay);
 try{await overlay.animate([{opacity:0},{opacity:1,offset:.22},{opacity:1,offset:.7},{opacity:0}],{duration:reduced()?120:1350,easing:'ease-in-out',fill:'forwards'}).finished.catch(()=>{});}finally{overlay.remove();}
}

export async function drunnTechniqueEffect(kind,unit){
 const p=anchor(unit);if(!p)return;
 if(kind==='sand'){
  for(let i=0;i<16;i++){const dust=node('fx-sand-dust',p.x+(i%4-1.5)*22,p.y+(Math.floor(i/4)-1.5)*22,35+i%3*12,'#e6c37d');motion(dust,[{opacity:0,transform:'translate(-100%,-50%) scale(.3)'},{opacity:.6,offset:.35},{opacity:0,transform:'translate(70%,-80%) scale(1.8)'}],1000,{delay:i*18});}await pause(1100);
 }else{ring(p,'#ff9b3d',180,1100);sparks(p,'#ffd778',20,70);await pause(1100);}
}

// First-person passage: keep the old screen covered until the destination is ready.
export async function traversalEntryEffect(arrive){
 const overlay=document.createElement('div');overlay.className='traversal-entry';
 overlay.setAttribute('role','status');overlay.setAttribute('aria-label','Traversée magique : vous avancez sur le chemin des étoiles.');
 const scene=document.createElement('div');scene.className='traversal-entry-scene';
 const image=document.createElement('img');image.className='traversal-entry-art';image.src='assets/traversal-passage.webp';image.alt='';
 scene.append(image);overlay.append(scene);document.body.append(overlay);
 const app=document.querySelector('#app'),wasInert=app?.inert,scroll=document.body.style.overflow;
 if(app)app.inert=true;document.body.style.overflow='hidden';
 const animations=[];let arrived=false;
 const play=(el,frames,options)=>{const a=el.animate(frames,{fill:'forwards',...options});animations.push(a);return a.finished.catch(()=>{});};
 const reveal=()=>{if(!arrived){arrived=true;arrive();}};
 try{
  // Decode before moving so the four-second journey is never spent loading artwork.
  if(image.decode){let timer;try{await Promise.race([image.decode().catch(()=>{}),new Promise(resolve=>{timer=setTimeout(resolve,2500);})]);}finally{clearTimeout(timer);}}
  await play(overlay,[{opacity:0},{opacity:1}],{duration:reduced()?100:180});
  if(reduced())await play(scene,[{opacity:.65},{opacity:1}],{duration:250});
  else await Promise.all([
   play(image,[{transform:'scale(1.03)'},{transform:'scale(1.6)'}],{duration:4000,easing:'linear'}),
   play(scene,[{transform:'translate(0,0)'},{transform:'translate(1px,3px)',offset:.25},{transform:'translate(0,0)',offset:.5},{transform:'translate(-1px,3px)',offset:.75},{transform:'translate(0,0)'}],{duration:1000,iterations:4,easing:'ease-in-out'})
  ]);
  await play(scene,[{opacity:1},{opacity:0}],{duration:reduced()?80:240});
  reveal();
  await play(overlay,[{opacity:1},{opacity:0}],{duration:reduced()?100:350});
 }finally{
  for(const a of animations)a.cancel();overlay.remove();
  if(app)app.inert=wasInert;document.body.style.overflow=scroll;
  reveal();
 }
}

export async function expeditionTechniqueEffect(event,unit){
 const a=anchor(unit);if(!a)return;
 const ice=event.type==='expedition-ward'||event.kind==='frostdummy',color=ice?'#b7f2ff':event.kind==='magmagolem'?'#ff893d':event.kind==='lantern'?'#f982c5':'#e8dcc2';
 ring(a,color,ice?125:95,620);sparks(a,color,12,65);await pause(430);
}

export async function masteryEffect(event,unit){
 const p=anchor(unit);if(!p)return;
 if(event.type==='prey-mark'){
  const eyes=node('fx-prey-eyes',p.x,p.top-12,90,'#ff355c');if(eyes)eyes.textContent='◉ ◉';
  await motion(eyes,[{opacity:0,transform:center(.6)},{opacity:1,offset:.25,transform:center(1.1)},{opacity:1,offset:.75},{opacity:0,transform:center(1)}],1000);return;
 }
 if(event.type==='trap-set'||event.type==='trap-trigger'){
  const trap=node('fx-tracker-trap',p.x,p.feet,105,'#e14c5d');
  await motion(trap,[{opacity:0,transform:center(.65)},{opacity:1,offset:.3,transform:center(1)},{opacity:0,transform:center(event.type==='trap-set'?1:1.3)}],650);sparks(p,'#ffbb70',12,55);return;
 }
 const color=event.absorbed?'#caf4ff':'#74cfff';ring(p,color,Math.max(110,p.h*.85),650);sparks(p,color,15,55);await pause(500);
}

// Cosmetic scene only: the resolved turn is saved before this animation starts.
export async function signatureEffect(portrait){
 if(reduced()||!document.body||!document.createElement)return false;
 const overlay=document.createElement('div');if(!overlay.animate)return false;
 overlay.className='signature-scene';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Sacrifice élémentaire de Stibili');
 const cosmos=document.createElement('div');cosmos.className='signature-cosmos';
 const camera=document.createElement('div');camera.className='signature-camera';
 const hero=document.createElement('img');hero.className='signature-hero';hero.src=`assets/${portrait}.webp`;hero.alt='Stibili';
 const orb=document.createElement('span');orb.className='signature-orb fx-elemental-orb';
 const burst=document.createElement('span');burst.className='signature-burst fx-elemental-burst';
 const caption=document.createElement('div');caption.className='signature-caption';caption.textContent='Sacrifice élémentaire';
 const skip=document.createElement('button');skip.className='signature-skip';skip.textContent='Passer';skip.setAttribute('aria-label','Passer l’animation signature');
 camera.append(hero,orb);overlay.append(cosmos,camera,caption,burst,skip);
 const app=document.querySelector('#app'),header=document.querySelector('header'),oldFocus=document.activeElement,oldOverflow=document.body.style.overflow,oldInert=app?.inert,headerInert=header?.inert;
 let stopped=false;const animations=[];
 const stop=()=>{stopped=true;for(const a of animations)a.cancel();};skip.onclick=stop;overlay.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();stop();}else if(e.key==='Tab'){e.preventDefault();skip.focus?.();}});
 const play=(el,frames,duration,easing='ease-in-out')=>{if(stopped)return Promise.resolve();const a=el.animate(frames,{duration,easing,fill:'forwards'});animations.push(a);return a.finished.catch(()=>{});};
 document.body.append(overlay);liveEffects.add(overlay);if(app)app.inert=true;if(header)header.inert=true;document.body.style.overflow='hidden';skip.focus?.();
 try{
  if(hero.decode){let timer;try{await Promise.race([hero.decode().catch(()=>{}),new Promise(resolve=>{timer=setTimeout(resolve,800);})]);}finally{clearTimeout(timer);}}
  if(stopped)return true;
  await play(overlay,[{opacity:0},{opacity:1}],180);
  await Promise.all([play(camera,[{transform:'scale(.94)'},{transform:'scale(1.03)'}],900),play(caption,[{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],600)]);
  if(stopped)return true;
  await Promise.all([
   play(camera,[{transform:'scale(1.03)'},{transform:'scale(1.15)'}],2200),
   play(orb,[{opacity:0,transform:'translate(-50%,-50%) scale(.15)'},{opacity:1,offset:.12,transform:'translate(-50%,-50%) scale(.4)'},{opacity:1,offset:.48,transform:'translate(-50%,-50%) scale(1.1)'},{opacity:1,offset:.8,transform:'translate(-50%,-50%) scale(2.2)'},{opacity:1,transform:'translate(-50%,-50%) scale(3.8)'}],2200,'ease-in'),
   play(cosmos,[{transform:'scale(1)',filter:'brightness(.8)'},{transform:'scale(1.08)',filter:'brightness(1.4)'}],2200)
  ]);
  if(stopped)return true;
  await Promise.all([play(burst,[{opacity:0,transform:'translate(-50%,-50%) scale(.05)'},{opacity:.95,offset:.24,transform:'translate(-50%,-50%) scale(1)'},{opacity:.2,transform:'translate(-50%,-50%) scale(1.4)'}],650),play(orb,[{opacity:1},{opacity:0}],180),play(camera,[{opacity:1},{opacity:0}],420)]);
  await play(overlay,[{opacity:1},{opacity:0}],260);return true;
 }catch{return false;}finally{
  for(const a of animations)a.cancel();discard(overlay);if(app)app.inert=oldInert;if(header)header.inert=headerInert;document.body.style.overflow=oldOverflow;oldFocus?.focus?.({preventScroll:true});
 }
}

// Acier vivant: the supplied forms cross-fade in place; the forge uses the Artisan anvil.
export async function forgeurEffect(event,unit){
 const p=anchor(unit);if(!p)return;
 if(event.type==='forge-tension'){
  const anvil=node('fx-forge-anvil',p.x,p.top+10,94,'#ff7058');if(anvil)anvil.innerHTML='<svg viewBox="0 0 90 45"><path fill="#38202b" stroke="#ff795c" stroke-width="2" d="M4 8H66V2H83V17H67L57 27V34H73V42H20V34H35V25L24 18H15Z"/><path stroke="#ffdeb1" d="M10 10H62M23 39H68"/></svg><img class="mini-forge-sword" src="assets/epee-dieux-nuageux.webp" alt="">';
  sparks({...p,y:p.top+18},'#ff754e',14,55);const forge=motion(anvil,[{opacity:0,transform:center(.75)},{opacity:1,offset:.2,transform:center(1)},{opacity:1,offset:.75},{opacity:0,transform:'translate(-50%,calc(-50% - 20px)) scale(.9)'}],800);
  if(event.fromState!==event.state){
   const sprite=unit.querySelector('.art'),color=event.state==='cold'?'#82d5ff':event.state==='hot'?'#ff6544':'#f1b780';ring(p,color,160,700);
   if(sprite){if(sprite.animate&&!reduced())await sprite.animate([{opacity:1,filter:'brightness(1)',transform:'scale(1)'},{opacity:.12,filter:'brightness(2)',transform:'scale(.96)'}],{duration:220,fill:'none'}).finished.catch(()=>{});
    sprite.src='assets/'+event.art+'.webp';if(event.state==='cold')sprite.classList.add('forgeur-dark-matte');else sprite.classList.remove('forgeur-dark-matte');
    if(sprite.decode)await sprite.decode().catch(()=>{});
    if(sprite.animate&&!reduced())await sprite.animate([{opacity:.12,filter:'brightness(1.8)',transform:'scale(.96)'},{opacity:1,filter:'brightness(1)',transform:'scale(1)'}],{duration:440,fill:'none',easing:'ease-out'}).finished.catch(()=>{});
   }
   const root=stage();root?.classList.remove('forge-hot','forge-cold','forge-neutral');root?.classList.add('forge-'+event.state);
  }
  await forge;return;
 }
 if(event.type==='forge-regulation'){
  if(event.previous==='neutral')return;const root=stage(),r=root.getBoundingClientRect(),flash=node('fx-forge-flash',r.width/2,r.height/2,Math.max(r.width,r.height),event.previous==='hot'?'#62bdff':'#ff584c');
  await motion(flash,[{opacity:0},{opacity:.28,offset:.2},{opacity:.08,offset:.42},{opacity:.3,offset:.65},{opacity:0}],2000);return;
 }
 if(event.type==='forge-burn'){sparks(p,'#ff673f',22,75);const fire=node('fx-forge-magma',p.x,p.y,135,'#ff6337');await motion(fire,[{opacity:0,transform:center(.25)},{opacity:.9,offset:.4,transform:center(1)},{opacity:0,transform:center(1.45)}],750);return;}
 if(event.skill==='jugement'){
  const sword=node('fx-forge-falling-sword',p.x,p.top-42,64,'#ff7058');if(sword)sword.innerHTML='<img src="assets/epee-dieux-nuageux.webp" alt="">';
  await motion(sword,[{opacity:0,transform:center(.7)},{opacity:1,offset:.12,transform:center(1)},{opacity:1,offset:.8,transform:center(1)},{opacity:0,transform:`translate(-50%,calc(-50% + ${p.h*.65}px)) scale(1.1)`}],1850);ring(p,'#ff6a50',100,400);return;
 }
 if(event.skill==='magmageux'){
  const cloud=node('fx-forge-magma',p.x,p.y,170,'#ed4f42');await motion(cloud,[{opacity:0,transform:center(.4)},{opacity:.8,offset:.4,transform:center(1)},{opacity:0,transform:center(1.55)}],900);sparks(p,'#ffa26b',24,85);return;
 }
 if(event.skill==='aureole'){
  const halo=node('fx-forge-halo',p.x,p.top+8,110,'#f07689');await motion(halo,[{opacity:0,transform:center(.4)},{opacity:1,offset:.3,transform:center(1)},{opacity:.9,offset:.7},{opacity:0,transform:center(1.15)}],850);return;
 }
 if(event.skill==='protectionultime'){const shield=node('fx-shield',p.x,p.y,125,'#ff725f');if(shield)shield.innerHTML='<span>⬡</span>';await motion(shield,[{opacity:0,transform:center(.5)},{opacity:1,offset:.3,transform:center(1)},{opacity:0,transform:center(1.15)}],650);}
}
