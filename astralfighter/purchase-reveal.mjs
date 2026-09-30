// Cosmetic only: the purchase and its one rarity roll are already saved by app.mjs.
// Local seeded particles never consume the game's random generator.
const REVEAL_MS=3800;
const COLORS={common:'#75e5a2',rare:'#72b7ff','super-rare':'#ff7388',legendary:'#ffd579'};
const escapeText=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clamp=n=>Math.max(0,Math.min(1,n));
const ease=n=>1-(1-clamp(n))**3;
let activeReveal=false;

function purchaseSound(enabled,legendary,volume=1){
 if(!enabled)return {impact(){},reveal(){},stop(){}};
 let ctx,master;const sources=new Set();
 const tone=(f,delay,duration,volume,type='sine',end=f)=>{
  const o=ctx.createOscillator(),g=ctx.createGain(),at=ctx.currentTime+delay;
  o.type=type;o.frequency.setValueAtTime(f,at);o.frequency.exponentialRampToValueAtTime(Math.max(15,end),at+duration);
  o.connect(g);g.connect(master);g.gain.setValueAtTime(.0001,at);g.gain.exponentialRampToValueAtTime(volume,at+.015);g.gain.exponentialRampToValueAtTime(.0001,at+duration);
  sources.add(o);o.onended=()=>{sources.delete(o);o.disconnect();g.disconnect();};o.start(at);o.stop(at+duration+.02);
 };
 const stop=()=>{for(const source of sources)try{source.stop();}catch{}sources.clear();if(ctx)ctx.close().catch(()=>{});};
 try{
  const Audio=globalThis.AudioContext||globalThis.webkitAudioContext;if(!Audio)return {impact(){},reveal(){},stop(){}};
  ctx=new Audio();ctx.resume().catch(()=>{});master=ctx.createGain();master.gain.value=.65*volume;master.connect(ctx.destination);
  tone(85,0,1.25,.07,'sine',150);tone(230,.7,1.55,.065,'triangle',1500);
  if(legendary){tone(55,1.25,.55,.12,'sawtooth',38);tone(930,1.8,.25,.04,'triangle',150);}
  return {
   impact(){try{tone(130,0,.75,.22,'triangle',25);tone(1100,0,.5,.07,'sawtooth',100);}catch{}},
   reveal(){try{for(const source of sources)try{source.stop();}catch{};const notes=legendary?[392,493.88,587.33,783.99,987.77]:[392,493.88,659.25];notes.forEach((f,i)=>tone(f,i*.105,.62,.075));}catch{}},stop
  };
 }catch{stop();return {impact(){},reveal(){},stop(){}};}
}

// Render a generated planet sprite, then throw textured pieces outward at impact.
function cosmicScene(canvas,planet,legendary){
 const ctx=canvas.getContext('2d');if(!ctx)return null;
 let seed=71839;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const stars=Array.from({length:110},()=>({x:rand(),y:rand(),r:.4+rand()*1.4,a:.2+rand()*.6}));
 const debris=Array.from({length:32},(_,i)=>({angle:i*Math.PI*2/32,speed:.7+rand()*1.6,spin:rand()*7-3.5,scale:.3+rand()*.8}));
 const sparks=Array.from({length:72},()=>({angle:rand()*Math.PI*2,speed:.4+rand()*2.2,size:.6+rand()*2}));
 let width=1,height=1,dpr=1;
 const resize=()=>{const rect=canvas.getBoundingClientRect();width=Math.max(1,rect.width);height=Math.max(1,rect.height);dpr=Math.min(2,globalThis.devicePixelRatio||1);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);};
 resize();
 function glow(x,y,r,color,alpha){ctx.save();ctx.globalAlpha=clamp(alpha);const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,2*r,2*r);ctx.restore();}
 function bolt(x,y,r,angle,strength){
  ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.globalAlpha=strength;ctx.strokeStyle='#ffdb8c';ctx.shadowColor='#ffbd48';ctx.shadowBlur=18;ctx.lineWidth=2.2;
  ctx.beginPath();ctx.moveTo(-r*.9,-r*.7);for(let i=0;i<9;i++)ctx.lineTo(-r*.9+i*r*.24,-r*.7+Math.sin(i*2.37+angle)*r*.25);ctx.stroke();ctx.lineWidth=.8;ctx.strokeStyle='#fff9d9';ctx.stroke();ctx.restore();
 }
 function render(ms){
  const t=ms/1000,impact=2.35,burst=Math.max(0,t-impact),size=Math.min(width*.7,height*.48,390),cx=width/2,cy=height*.47;
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,width,height);ctx.fillStyle='#080714';ctx.fillRect(0,0,width,height);
  glow(cx,cy,size*1.4,'#302653',.4);
  const zoom=1+.16*ease(t/2.35);ctx.save();
  const shake=legendary&&t>1.3&&t<2.7?(t<2.35?2.8:6)*clamp((2.7-t)/.35):0;
  ctx.translate(cx+Math.sin(t*61)*shake,cy+Math.cos(t*83)*shake*.65);ctx.scale(zoom,zoom);ctx.translate(-cx,-cy);
  for(const s of stars){const distance=1+.1*t;const x=cx+(s.x*width-cx)*distance,y=cy+(s.y*height-cy)*distance;ctx.globalAlpha=s.a;ctx.fillStyle='#e5dcff';ctx.beginPath();ctx.arc(x,y,s.r,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;
  if(t<impact){
   const intro=ease(t/.65);ctx.save();ctx.globalAlpha=intro;ctx.translate(cx,cy);ctx.rotate(-.08+t*.018);
   if(planet.complete&&planet.naturalWidth)ctx.drawImage(planet,-size/2,-size/2,size,size);
   ctx.restore();
   if(legendary&&t>1.2){
    const charge=clamp((t-1.2)/1.1);glow(cx,cy,size*.65,'#ffb94c',charge*.14);
    // Two slow electrical surges, never a strobe.
    const surge=Math.max(0,1-Math.abs(t-1.53)/.23)+Math.max(0,1-Math.abs(t-2.04)/.25);
    for(let i=0;i<5;i++)bolt(cx,cy,size*.47,i*1.257+t*.15,Math.min(.9,surge));
   }
   const flight=clamp((t-.8)/1.55),progress=flight**2.4;
   if(t>.8){
    const x=cx+(1-progress)*width*.52,y=cy-(1-progress)*height*.52,dx=width*.52,dy=-height*.52,l=Math.hypot(dx,dy),tail=size*(.5+.9*flight);
    ctx.save();ctx.lineCap='round';const g=ctx.createLinearGradient(x,y,x+dx/l*tail,y+dy/l*tail);g.addColorStop(0,legendary?'#ffdd97':'#e7e3ff');g.addColorStop(1,'transparent');ctx.strokeStyle=g;ctx.lineWidth=4+flight*8;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+dx/l*tail,y+dy/l*tail);ctx.stroke();
    glow(x,y,28+flight*12,legendary?'#ffd78c':'#b9abff',1);ctx.fillStyle='#fff6dc';ctx.beginPath();ctx.arc(x,y,3+flight*5,0,Math.PI*2);ctx.fill();ctx.restore();
   }
  }else{
   const radius=size*(.25+burst*1.8);glow(cx,cy,size*(.55+burst*.5),legendary?'#ffcf77':'#b3a2ff',(1-clamp(burst/1.4))*.5);
   ctx.save();ctx.globalAlpha=clamp(1-burst/1.35);ctx.strokeStyle=legendary?'#ffe8b5':'#d6cdff';ctx.lineWidth=3*(1-clamp(burst/1.4));ctx.beginPath();ctx.ellipse(cx,cy,radius,radius*.42,-.25,0,Math.PI*2);ctx.stroke();ctx.restore();
   if(planet.complete&&planet.naturalWidth)for(let i=0;i<debris.length;i++){
    const f=debris[i],a=f.angle,b=a+Math.PI*2/debris.length+.02,travel=burst*size*f.speed;
    ctx.save();ctx.globalAlpha=clamp(1-burst/1.28);ctx.translate(cx+Math.cos(a)*travel,cy+Math.sin(a)*travel);ctx.rotate(burst*f.spin);ctx.scale(1+burst*.2,1+burst*.2);
    ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,size*.51,a,b);ctx.closePath();ctx.clip();ctx.drawImage(planet,-size/2,-size/2,size,size);ctx.restore();
   }
   for(const p of sparks){const travel=burst*size*p.speed;glow(cx+Math.cos(p.angle)*travel,cy+Math.sin(p.angle)*travel,p.size*3,legendary?'#ffd580':'#c9b6ff',1-clamp(burst/1.5));}
   // One softly decaying local flash, not a full-screen white frame.
   glow(cx,cy,size*.9,legendary?'#ffe3a1':'#dfd9ff',.65*(1-clamp(burst/.45)));
  }
  ctx.restore();
 }
 return {render,resize};
}

export function showPurchaseReveal({name,type,rarity,rarityName,stats,passive,companion,sound=false,volume=1}){
 if(activeReveal)return Promise.reject(Error('Une révélation est déjà en cours.'));
 activeReveal=true;
 return new Promise((resolve,reject)=>{
  let dialog,frame,timer,revealed=false,closed=false,scene,started,impactPlayed=false;
  const legendary=rarity==='legendary',reduced=globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false;
  const previousFocus=document.activeElement,audio=purchaseSound(sound&&!reduced&&volume>0,legendary,volume);
  const color=COLORS[rarity]??COLORS.common;
  const finish=error=>{if(closed)return;closed=true;activeReveal=false;cancelAnimationFrame(frame);clearTimeout(timer);audio.stop();globalThis.removeEventListener('resize',resize);document.removeEventListener('visibilitychange',visibility);dialog?.close();dialog?.remove();if(previousFocus?.isConnected)previousFocus.focus();if(error instanceof Error)reject(error);else resolve();};
  const reveal=()=>{
   if(revealed||closed)return;revealed=true;cancelAnimationFrame(frame);clearTimeout(timer);audio.reveal();
   dialog.classList.add('is-revealed');dialog.querySelector('.purchase-result').hidden=false;dialog.querySelector('.purchase-skip').hidden=true;dialog.querySelector('.purchase-phase').textContent='Votre équipement est arrivé.';dialog.querySelector('.purchase-continue').focus();
  };
  const resize=()=>{scene?.resize();};
  const visibility=()=>{if(document.hidden)reveal();};
  const tick=now=>{
   if(closed||revealed)return;try{
    started??=now;const elapsed=now-started;
    scene.render(elapsed);
    if(elapsed>=2350&&!impactPlayed){impactPlayed=true;audio.impact();dialog.querySelector('.purchase-phase').textContent='Une nouvelle puissance se révèle…';}
    if(elapsed>=REVEAL_MS)reveal();else frame=requestAnimationFrame(tick);
   }catch{reveal();}
  };
  try{
   dialog=document.createElement('dialog');dialog.className='purchase-dialog'+(legendary?' is-legendary':'')+(reduced?' reduced-motion':'');dialog.style.setProperty('--purchase-color',color);dialog.setAttribute('aria-labelledby','purchase-title');
   dialog.innerHTML=`<canvas class="purchase-cosmos" aria-hidden="true"></canvas><div class="purchase-intro"><p class="purchase-kicker">ASTRALFIGHTER</p><h2 id="purchase-title">Un fragment du cosmos…</h2><p class="purchase-phase" role="status">L’étoile approche.</p></div><button type="button" class="purchase-skip">Passer l’animation <span aria-hidden="true">›</span></button><section class="purchase-result" hidden aria-label="Équipement obtenu"><p class="purchase-kicker">ÉQUIPEMENT OBTENU</p><div class="purchase-item-halo"><img src="assets/${escapeText(type)}.webp" alt="" class="purchase-item" draggable="false"></div><span class="purchase-rarity">${escapeText(rarityName)}</span><h2>${escapeText(name)}</h2><p class="purchase-stats">${escapeText(stats)}</p>${passive?`<p class="purchase-passive">${escapeText(passive)}</p>`:''}<p class="purchase-owner">Ajouté au sac de <b>${escapeText(companion)}</b>.</p><button type="button" class="purchase-continue primary">Continuer</button></section>`;
   document.body.append(dialog);dialog.showModal();
   dialog.querySelector('.purchase-skip').onclick=reveal;dialog.querySelector('.purchase-continue').onclick=finish;
   dialog.addEventListener('cancel',event=>{event.preventDefault();if(revealed)finish();else reveal();});
   dialog.querySelector('.purchase-skip').focus();
   if(reduced){reveal();return;}
   const planet=new Image();let animationStarted=false;
   const start=()=>{
    if(animationStarted||closed||revealed)return;animationStarted=true;clearTimeout(timer);
    scene=cosmicScene(dialog.querySelector('canvas'),planet,legendary);
    if(!scene){reveal();return;}
    globalThis.addEventListener('resize',resize);
    // Never leave a purchased item hidden by a suspended animation frame.
    timer=setTimeout(reveal,REVEAL_MS+500);frame=requestAnimationFrame(tick);
   };
   document.addEventListener('visibilitychange',visibility);
   planet.onload=start;planet.onerror=reveal;
   timer=setTimeout(reveal,4000);planet.src='assets/purchase-planet.webp';
   if(planet.complete&&planet.naturalWidth)start();
  }catch(error){finish(error);}
 });
}
