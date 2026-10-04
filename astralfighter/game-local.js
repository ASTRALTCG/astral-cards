// AstralFighter — Forgeur visuals, base stats and armor prices.
(()=>{'use strict';const modules=Object.create(null);
modules["title-ornaments.mjs"]=(()=>{
// Cosmetic only: progression and title ownership remain in achievements.mjs.
const TITLE_ORNAMENTS={
 'Dragonnet rouge':{id:'dragon',description:'Un cadre écarlate dont les ailes de dragon se déploient.',animated:true},
 'Maître Corkbeau':{id:'raven',description:'Un cadre d’obsidienne aux reflets argentés, couronné d’ailes de corbeau.',animated:true},
 'L’Éternel':{id:'frost',description:'La glace envahit le cadre, reste figée 1,5 seconde puis dégèle doucement, sur un cycle de 10 secondes.',animated:true},
 'Le revenant':{id:'revenant',description:'Un écrin d’os ancien, un crâne et des flammes nécromantiques vertes.',animated:true},
 'Chaud bouillant':{id:'inferno',description:'Un cadre incandescent, parcouru de flammes vivantes et de braises.',animated:true},
 'Artisan':{id:'artisan',frame:null,description:'Cadre doré, enclume et marteau animé de l’atelier.',void:false,animated:true},
 'Aventurier remarquable':{id:'emerald',frame:null,description:'Un écrin d’émeraude aux reflets lumineux.',void:false,animated:true},
 'Chasseur de prime':{id:'bounty',frame:null,description:'Cadre de diamant. Un avis de recherche se plante dans le cadre pendant 2,5 secondes après 10 secondes de repos.',void:false,animated:true},
 'Navigateur':{id:'navigator',frame:null,description:'Le cadre se transforme en constellation : fragments stellaires et anneaux en orbite.',void:false,animated:true},
 'ASTRAL':{id:'astral',frame:null,description:'Cadre noir aux reflets discrets. Le trou noir grandit à chaque aspiration. À la troisième, il explose en lumière puis se reforme.',void:false,animated:true},
 'Acheteur compulsif':{id:'buyer',frame:null,description:'Un cadre doré sous une pluie de pièces d’or.',void:false,animated:true},
 "Nah i'd win":{id:'liquid',frame:null,description:'Courants bleus et rouges : à la fusion, le cadre tremble et déborde d’éclairs violets pendant deux secondes.',void:false,animated:true},
 'Le plus fort de l’univers':{id:'universe',frame:null,description:'Couronne astrale, angles dorés sculptés, astres en orbite et courants d’énergie.',void:false,animated:true},
 'Combattant':{id:'stone',frame:'stone-frame',description:'Pierre sculptée et épées, côtés lisses et motifs aux proportions conservées.',void:false,animated:false},
 'Conquérant':{id:'metal',frame:null,description:'Une grande épée plantée dans le cadre veille sur un feu de camp animé.',void:false,animated:true},
 'Combattant du Néant':{id:'void',frame:'void-frame',description:'Ornement du Néant, œil fermé et légère lueur violette.',void:true,animated:false},
 'Conquérant du Néant':{id:'void-conqueror',frame:'void-frame',description:'Lueur du Néant, tentacules vivants et œil animé sur un cycle de 3 secondes.',void:true,animated:true},
 'Néantin':{id:'neantin',frame:'neantin-frame',description:'Toutes les 10 secondes, des fissures du Néant ébranlent le cadre pendant 2 secondes.',void:true,animated:true}
};
const titleOrnament=title=>TITLE_ORNAMENTS[title]??null;
const isVoidTitle=title=>!!titleOrnament(title)?.void;
const titleTextClass=title=>isVoidTitle(title)?'void-title':({liquid:'liquid-title',universe:'universe-title',astral:'astral-title',dragon:'dragon-title',raven:'raven-title',frost:'frost-title',revenant:'revenant-title',inferno:'inferno-title'}[titleOrnament(title)?.id]??'');

// Shared clock keeps camp and combat ornaments in phase across UI refreshes.
const ornamentPhase=seconds=>`-${(Date.now()%(seconds*1000))/1000}s`;
const gems=()=>'<span class="regalia-gems"><i></i><i></i><i></i><i></i></span>';
const shards=()=>Array.from({length:24},(_,n)=>{const side=n%4,t=10+Math.floor(n/4)*16,angle=(n*137.5)*Math.PI/180;return `<i style="--x:${side===0?0:side===1?100:t}%;--y:${side===2?0:side===3?100:t}%;--dx:${Math.round(Math.cos(angle)*40)}px;--dy:${Math.round(Math.sin(angle)*40)}px;--spin:${n%2?160:-140}deg;--tilt:${n%3*35}deg"></i>`;}).join('');
function titleOrnamentMarkup(o){
 if(['dragon','raven','frost','revenant','inferno'].includes(o.id))return lootOrnamentMarkup(o.id);
 if(o.id==='stone')return `<div class="hero-ornament stone-smooth" aria-hidden="true"><span class="stone-rail rail-top"></span><span class="stone-rail rail-right"></span><span class="stone-rail rail-bottom"></span><span class="stone-rail rail-left"></span><span class="stone-corner stone-nw"></span><span class="stone-corner stone-ne"></span><span class="stone-corner stone-se"></span><span class="stone-corner stone-sw"></span><span class="stone-stud stud-top"></span><span class="stone-stud stud-right"></span><span class="stone-stud stud-bottom"></span><span class="stone-stud stud-left"></span></div>`;
 if(!['metal','artisan','emerald','bounty','navigator','astral','buyer'].includes(o.id))return null;
 const phase=ornamentPhase(o.id==='bounty'?12.5:o.id==='astral'?10:12);
 let extra='';
 if(o.id==='metal')extra=`${reliefSword()}<span class="campfire"><i class="camp-log"></i><i class="camp-log"></i><i class="camp-flame flame-one"></i><i class="camp-flame flame-two"></i><i class="camp-flame flame-three"></i><i class="camp-ember"></i><i class="camp-ember"></i></span>`;
 if(o.id==='artisan')extra=`<span class="artisan-forge"><svg class="artisan-anvil" viewBox="0 0 90 45" focusable="false"><path fill="#3b3644" stroke="#ebc57a" stroke-width="2" d="M4 8H66V2H83V17H67L57 27V34H73V42H20V34H35V25L24 18H15Z"/><path stroke="#fff0c1" d="M10 10H62M23 39H68"/></svg><svg class="forge-hammer artisan-hammer" viewBox="0 0 48 56" focusable="false"><path fill="#947255" stroke="#deb577" d="M22 20H29V54H22Z"/><path fill="#444251" stroke="#ffe2a1" stroke-width="2" d="M6 6H42V25H6Z"/><path stroke="#ccb9a0" d="M10 10H38"/></svg><span class="forge-sparks artisan-sparks">✦ · ✧</span></span>`;
 if(o.id==='bounty')extra=`<span class="wanted-event"><span class="wanted-poster"><b>RECHERCHÉ</b><svg viewBox="0 0 60 55" focusable="false"><path fill="#3a2625" d="M12 50Q13 30 24 30Q12 12 23 5Q37 -2 40 12Q44 26 35 30Q49 33 50 50Z"/><path stroke="#d8bb84" stroke-width="2" d="M18 18L39 17M21 21L26 22M31 22L36 21"/></svg><span>PRIME : ★★★</span></span><svg class="wanted-dagger" viewBox="0 0 25 65" focusable="false"><path fill="#89747b" stroke="#ead2ad" d="M9 2H16V22H9Z M3 22H22V27H3Z"/><path fill="#c3d9ed" stroke="#647b99" d="M7 27H18L12 63Z"/></svg></span>`;
 if(o.id==='navigator')extra=`<span class="astral-apotheosis"><span class="astral-halo halo-a"></span><span class="astral-halo halo-b"></span><span class="astral-nucleus">✦</span></span><span class="ascended-fragments">${shards()}</span><svg class="astral-constellation" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false"><path vector-effect="non-scaling-stroke" d="M0 15L12 1L50 0L86 3L100 20L99 75L85 100L50 99L11 100L0 81ZM0 15L5 48L0 81M100 20L95 48L99 75M12 1L25 5L50 0L75 6L86 3M11 100L26 94L50 99L76 94L85 100"/></svg>`;
 if(o.id==='astral')extra=`<span class="singularity-crown" style="--nova-phase:${ornamentPhase(30)}"><span class="blackhole-form"><span class="blackhole-lens"></span><span class="blackhole-disc"></span><span class="blackhole-core"></span><span class="blackhole-disc disc-front"></span></span><span class="singularity-nova"><span class="nova-wave"></span><span class="nova-light"></span>${Array.from({length:8},(_,n)=>`<i class="nova-ray" style="--burst-angle:${n*45}deg"></i>`).join('')}</span></span><span class="singularity-infall">${Array.from({length:16},(_,n)=>{const side=n%4,t=12+Math.floor(n/4)*25;return `<i style="--start-x:${side===0?0:side===1?100:t}%;--start-y:${side===2?0:side===3?100:t}%;--fall-angle:${n*67}deg"></i>`;}).join('')}</span><span class="singularity-etch etch-left"></span><span class="singularity-etch etch-right"></span>`;
 if(o.id==='buyer')extra=`<span class="coin-rain">${Array.from({length:12},(_,i)=>`<i class="rain-coin" style="--coin-x:${i%2?101:-1}%;--coin-y:${Math.floor(i/2)*16}%;--coin-delay:-${i*.47}s;--coin-drift:${i%2?8:-8}px">✦</i>`).join('')}</span>`;
 return `<div class="hero-ornament regalia regalia-${o.id}" aria-hidden="true" style="--title-phase:${phase}"><span class="regalia-rim"></span>${o.id==='astral'?'':gems()}${extra}</div>`;
}
function lootOrnamentMarkup(id){
 const wings=['dragon','raven'].includes(id)?`<span class="loot-wings"><i class="loot-wing wing-left"></i><i class="loot-wing wing-right"></i></span>`:'';
 const fire=['revenant','inferno'].includes(id)?`<span class="loot-fire fire-base"></span><span class="loot-fire fire-crown"></span><span class="loot-embers">${Array.from({length:8},(_,n)=>`<i style="--ember-x:${10+n*11}%;--ember-y:100%;--ember-delay:-${n*.43}s"></i>`).join('')}</span>`:'';
 return `<div class="hero-ornament loot-regalia loot-${id}" aria-hidden="true" style="--loot-phase:${ornamentPhase(10)}"><span class="loot-rim"></span><span class="loot-inner-rim"></span>${wings}${fire}${id==='revenant'?'<img class="revenant-skull" src="assets/ornaments/necromantic-skull.webp" alt="" draggable="false">':''}${id==='frost'?'<span class="frost-interior"></span><span class="frost-crown"></span>':''}</div>`;
}
function voidOrnamentOverlay(o){
 if(o.id==='void'||o.id==='void-conqueror')return '<span class="void-soft-glow"></span>';
 if(o.id!=='neantin')return '';
 return `<svg class="void-frame-cracks" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false"><path vector-effect="non-scaling-stroke" d="M0 9L7 13L2 18L6 22L0 28M7 13L13 10M100 18L93 22L97 28L91 34L100 37M93 22L89 17M0 62L8 66L4 73L10 77L0 86M8 66L13 63M100 69L92 73L95 80L87 87L100 92M92 73L86 70M20 0L24 6L31 2L35 8L42 0M63 100L68 93L74 97L78 90L86 100"/></svg>`;
}

let swordSerial=0;
function reliefSword(){
 const id='relief-steel-'+(++swordSerial);
 return `<svg class="camp-sword" viewBox="0 0 45 150" focusable="false"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#3f4655"/><stop offset=".3" stop-color="#989da9"/><stop offset=".52" stop-color="#e4e5e9"/><stop offset=".56" stop-color="#8b929e"/><stop offset="1" stop-color="#343b48"/></linearGradient><linearGradient id="${id}-leather"><stop stop-color="#14131a"/><stop offset=".45" stop-color="#62565b"/><stop offset="1" stop-color="#201d28"/></linearGradient><linearGradient id="${id}-guard" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#c7bdac"/><stop offset=".35" stop-color="#817885"/><stop offset=".5" stop-color="#afa7a2"/><stop offset="1" stop-color="#393441"/></linearGradient></defs><path fill="#11131e" opacity=".8" d="M10 44H38V125L24 149L10 128Z"/><path fill="url(#${id}-leather)" stroke="#23222b" d="M17 7H27V36H17Z"/><path stroke="#b0a09e" stroke-width="1.2" opacity=".8" d="M17 10L27 14M17 17L27 21M17 24L27 28M17 31L27 35"/><path stroke="#100f16" stroke-width="1.8" d="M17 13L27 17M17 20L27 24M17 27L27 31"/><path fill="url(#${id}-guard)" stroke="#d3c8b4" stroke-width=".8" d="M16 3L19 1H25L28 4V9H16Z"/><path fill="#272731" d="M3 39L5 46H41V40Z"/><path fill="url(#${id}-guard)" stroke="#cbc0b2" stroke-width=".8" d="M3 35L14 34L17 32H28L31 35H41V42H3Z"/><path fill="#e7dfd1" opacity=".8" d="M4 35L15 34H29L32 36H40V37H31L28 35H16L14 36H4Z"/><path fill="url(#${id})" stroke="#272d3a" stroke-width="1" d="M8 43H36V124L22 146L8 124Z"/><path fill="#d0d4dc" d="M8 43L12 47V122L22 146L8 124Z"/><path fill="#525b6a" d="M32 47L36 43V124L22 146L32 122Z"/><path fill="#202633" opacity=".55" d="M12 47H32L30 50H14V120L12 122Z"/><path fill="#f2edf0" opacity=".72" d="M21.4 47H22.7L23 130L22 143L21.5 127Z"/><path fill="#d2d6e1" opacity=".2" d="M13 64L31 56V66L13 73Z M13 105L31 97V102L13 110Z"/><path stroke="#303744" stroke-width="1" opacity=".8" d="M14 54L19 53M25 74L29 71M15 86L18 85M28 111L31 108"/><path stroke="#c2c7d0" stroke-width=".5" opacity=".7" d="M14 55L19 54M25 75L29 72M15 87L18 86"/><path fill="#c99568" opacity=".18" d="M26 104L32 99V122L22 143Z"/></svg>`;
}

return {TITLE_ORNAMENTS,isVoidTitle,ornamentPhase,titleOrnament,titleOrnamentMarkup,titleTextClass,voidOrnamentOverlay};
})();
modules["music.mjs"]=(()=>{
const MUSIC_TRACKS={home:'accueil',discussion:'discussion',combat:'combat',rift:'fissure',boss:'boss'};
function musicTheme({home,state,tab,result}){
 if(home||!state?.hero)return 'home';
 if(state.storyScene)return 'discussion';
 const encounter=state.battle??result;
 if(encounter)return encounter.mode==='rift'?(encounter.stage%10===0?'boss':'rift'):'combat';
 return tab==='rift'?'rift':'home';
}
function createMusicPlayer({AudioClass=globalThis.Audio,storage=globalThis.localStorage,setTimer=setInterval,clearTimer=clearInterval}={}){
 const key='astralfighter-audio-v1';let prefs={enabled:true,volume:.18};
 try{const v=JSON.parse(storage?.getItem(key)||'null');if(v){if(typeof v.enabled==='boolean')prefs.enabled=v.enabled;if(typeof v.volume==='number'&&Number.isFinite(v.volume))prefs.volume=Math.max(0,Math.min(1,v.volume));}}catch{}
 const tracks=new Map();let theme='home',unlocked=false,hidden=false,timer=null;
 const save=()=>{try{storage?.setItem(key,JSON.stringify(prefs));}catch{}};
 function audioFor(id){if(!tracks.has(id)){const a=new AudioClass('assets/music/'+MUSIC_TRACKS[id]+'.mp3');a.loop=true;a.preload='none';a.volume=0;tracks.set(id,a);}return tracks.get(id);}
 function stop(){if(timer!==null)clearTimer(timer);timer=null;for(const a of tracks.values()){a.pause();a.volume=0;}}
 function sync(){
  if(!AudioClass||!unlocked||hidden||!prefs.enabled||prefs.volume===0){stop();return;}
  const active=audioFor(theme);if(active.paused)Promise.resolve(active.play()).catch(()=>{});
  if(timer!==null)clearTimer(timer);
  const starts=new Map([...tracks].map(([id,a])=>[id,a.volume]));let step=0;
  timer=setTimer(()=>{step++;const t=Math.min(1,step/20);for(const [id,a]of tracks){const target=id===theme?prefs.volume:0;a.volume=Math.max(0,Math.min(1,starts.get(id)+(target-starts.get(id))*t));if(t===1&&id!==theme)a.pause();}if(t===1){clearTimer(timer);timer=null;}},40);
 }
 return {get enabled(){return prefs.enabled;},get volume(){return prefs.volume;},select(next){if(!MUSIC_TRACKS[next]||next===theme)return;theme=next;sync();},unlock(){unlocked=true;sync();},setEnabled(value){prefs.enabled=!!value;save();sync();},setVolume(value){if(!Number.isFinite(value))return;prefs.volume=Math.max(0,Math.min(1,value));save();sync();},setHidden(value){hidden=!!value;sync();},stop};
}

return {MUSIC_TRACKS,createMusicPlayer,musicTheme};
})();
modules["purchase-reveal.mjs"]=(()=>{
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

function showPurchaseReveal({name,type,rarity,rarityName,stats,passive,companion,sound=false,volume=1}){
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

return {showPurchaseReveal};
})();
modules["forgeur-story.mjs"]=(()=>{
// Chapter data and enemy patterns. Independent of engine/save state.
const n=(text,extra={})=>({speaker:null,text,...extra});
const d=(speaker,text,other='forgeur',extra={})=>({speaker,text,other,...extra});
const FORGEUR_STORY_VERSION=1;
const FORGEUR_CAST={
 forgeur:{name:'Le Forgeur',art:'forgeur-classic',kind:'forgeur'},
 zvatas:{name:'Zvatas',art:'zvatas',kind:'beast'},
 todylk:{name:'Todylk',art:'todylk',kind:'beast'},
 ecurexplosion:{name:'L’Écurexplosion',art:'ecurexplosion',kind:'beast'},
 roxxor:{name:'Roxxor',art:'roxxor',kind:'beast'},
 dragonNebryss:{name:'Dragon brumeux contrôlé par Nébryss',art:'dragon-brumeux-nebryss',kind:'beast'},
 dragonDemon:{name:'Dragon brumeux démononuageux',art:'dragon-brumeux-demon',kind:'beast'},
 tryhydre:{name:'La Tryhydre',art:'tryhydre',kind:'beast'},
 avatarZvatas:{name:'L’Avatar de Zvatas',art:'avatar-zvatas',kind:'beast'}
};
const FORGEUR_CHAPTER={title:'Chapitre 1 — Naissance',description:'Sur Démono, une nouvelle volonté éveille les braises de l’ancienne guerre. Né pour forger et commander, le Forgeur doit d’abord ramener l’ordre parmi les siens.',nextTitle:'Pour prouver ma place (et que j’existe)'};
const FORGEUR_MISSIONS={
 1:{title:'Les premières braises',level:1,gearHint:'Premiers pas sur Démono',enemies:['ecurexplosion'],background:'forgeur-plains',before:[
 n('Des siècles se sont écoulés depuis la chute de Selkiel, l’ancien Navigateur de Démono. Sous les nuages noirs, les traces de la défaite semblent ne jamais devoir s’effacer.'),
 n('Puis Zvertune, une lune errante, s’est approchée d’un peu trop près de Démono. De cette lune est né Zvatas.'),
 n('Lorsque Zvatas a pris le contrôle de la planète, les Démononuageux se sont réveillés, un par un. Avec eux sont revenues les colères d’une guerre perdue depuis des siècles.'),
 n('Pour gouverner ces forces éparses, Zvatas a façonné lui-même une créature : le Forgeur. Un être capable de s’adapter au combat, de créer des armes et des armures extraordinaires, et de guider les autres.'),
 d('zvatas','Ouvre les yeux. Voici ton nouveau monde.'),
 n('Une lueur traverse l’acier. Le Forgeur ouvre les yeux, puis observe ses mains. Il n’a encore aucun souvenir. Pourtant, il sait déjà à quoi elles serviront.'),
 d('forgeur','Ce monde… attend quelque chose de moi.','zvatas'),
 d('zvatas','Après la défaite de Selkiel, Démono a perdu sa splendeur. Ses guerriers se réveillent sans ordre ni direction. Tu vas leur en donner une.'),
 d('forgeur','Et vous, Maître ?','zvatas'),
 d('zvatas','Nébryss est affaiblie par ses combats. J’emporte progressivement mon armée dans mon propre corps. Quand viendra l’invasion, nous serons prêts.'),
 d('zvatas','Ici, tu rétabliras l’ordre. Forge ce dont ils ont besoin. Fais d’eux une armée.'),
 n('Le Forgeur referme lentement les doigts. Il vient de naître, et une planète entière pèse déjà dans ses mains.'),
 n('Sur les plaines, une silhouette l’attend : Todylk. Remis de sa défaite, le Démononuageux porte encore dans les yeux une détermination farouche.'),
 d('todylk','C’est donc toi, le Forgeur. Il faut que tu viennes. L’Écurexplosion ravage une partie de la forêt.'),
 d('forgeur','Il combat un ennemi ?','todylk'),
 d('todylk','Il combat ce qu’il a perdu. Et tout ce qui se trouve à portée de ses bombes.'),
 n('Le Forgeur lève la tête, acquiesce et suit les détonations. À la lisière, une créature lance bombe après bombe, dévorée par la haine de son ancienne défaite.'),
 d('forgeur','Arrête. Ces terres sont les nôtres. Une autre mission t’attend.','ecurexplosion'),
 d('ecurexplosion','Une autre mission ? Tu ne sais rien de ce qu’ils nous ont fait !'),
 n('L’Écurexplosion saisit une nouvelle bombe. Le Forgeur abaisse son épée et se place entre lui et la forêt.')
 ],after:[
 n('L’Écurexplosion tombe à genoux. Le silence revient entre deux souffles rauques. Ses dernières bombes roulent dans l’herbe sans qu’il cherche à les reprendre.'),
 d('ecurexplosion','Je n’aurais pas dû… Je suis désolé.'),
 d('forgeur','Ce n’est rien. Après tant de siècles, tu es désemparé. Mais ce monde a encore besoin de toi.','ecurexplosion'),
 n('Soudain, un tremblement traverse le sol.',{shake:true}),
 n('Au loin, la surface du lac de la Mer bleutée se soulève. Roxxor sort de l’eau, envahi par la douleur et le regret. Son cri couvre le fracas des vagues.'),
 d('forgeur','Roxxor ! Calme-toi !','roxxor'),
 d('roxxor','J’ai perdu ! Contre Reysia… La vice-commandante de Nébryss !'),
 d('roxxor','Je le revois à chaque instant. Je ne le supporte plus !'),
 n('Le Forgeur accourt. Roxxor ne semble plus distinguer ceux qui viennent l’aider de ceux qu’il veut combattre.')
 ]},
 2:{title:'Le poids d’une défaite',level:4,gearHint:'Au moins un équipement de niveau 1',enemies:['roxxor'],background:'forgeur-plains',before:[
 n('Roxxor avance hors du lac, laissant derrière lui de profonds sillons. Le Forgeur tente une dernière fois de lui barrer la route sans lever son arme.'),
 d('forgeur','Reysia n’est pas ici. Regarde autour de toi : tu es sur Démono.','roxxor'),
 d('roxxor','Alors pourquoi ai-je encore l’impression d’être à terre ?'),
 d('forgeur','Parce que tu n’as pas encore accepté de te relever.','roxxor'),
 n('Roxxor rugit et se jette sur lui. Cette fois, le Forgeur doit frapper.')
 ],after:[
 n('Roxxor s’effondre enfin. Le Forgeur a dû frapper fort : avant la défaite, cette créature occupait un rang élevé dans l’armée.'),
 d('forgeur','Maître Zvatas, Roxxor est évanoui. Il le restera pendant un moment.','zvatas'),
 d('zvatas','Ce n’est pas un problème. La plus grande menace est encore à venir.'),
 n('Le Forgeur reprend sa route. Au loin, il reconnaît Wolffy, qui s’était battu désespérément jusqu’au terme de l’ancienne guerre.'),
 d('wolffy','On m’a dit que tu savais forger. Il me faudrait un nouveau dentier de combat.'),
 d('forgeur','Alors tu en auras un. Je suis là pour créer du matériel à la hauteur de ceux qui le portent.','wolffy'),
 n('Lorsque l’ouvrage est prêt, Wolffy lève une patte pour remercier le Forgeur, puis repart avec son nouvel équipement.'),
 d('forgeur','La bénédiction de l’épée… Il la possède, mais il ne s’en rend même pas compte.',null),
 n('Les jours passent. Le Forgeur façonne des armures, des épées et des griffes. Peu à peu, le rythme de sa forge remplace celui des explosions.'),
 n('En explorant une caverne, il découvre un cristal violet. Sa couleur tranche avec les nuages noirs qui imprègnent Démono.'),
 n('Il s’approche. Ce n’est pas une pierre. C’est un cœur… le cœur d’une créature de Nébryss.'),
 n('Au contact de sa main, le cœur se met à battre. Chaque pulsation est plus forte que la précédente. L’espace se déchire autour de lui.'),
 n('Le Forgeur bascule dans une dimension parallèle. Un horizon violet s’étend de toutes parts, traversé d’éclairs.',{background:'forgeur-nebryss'}),
 d('forgeur','Où suis-je ? Qu’est-ce que tu as fait ?',null,{background:'forgeur-nebryss'}),
 d('dragonNebryss','Enfin… Des siècles à moisir ici. Des siècles que j’attends un réceptacle !','forgeur',{background:'forgeur-nebryss'})
 ]},
 3:{title:'Le cœur étranger',level:7,gearHint:'Arme en or et veste d’aventurier conseillées',enemies:['dragonNebryss'],background:'forgeur-nebryss',before:[
 n('La voix du cœur résonne dans toute la dimension. Une forme immense s’enroule dans la brume violette : un Dragon brumeux, soumis à une volonté de Nébryss.'),
 d('forgeur','Tu ne feras pas de moi ton réceptacle.','dragonNebryss'),
 d('dragonNebryss','Tu es venu jusqu’à moi. Tu n’as plus à choisir.'),
 n('Le Forgeur serre son arme. Les éclairs révèlent les contours du Dragon, déjà prêt à frapper deux fois.')
 ],after:[
 n('L’emprise de Nébryss se brise. La brume violette se déchire et laisse apparaître le Dragon brumeux démononuageux.'),
 d('dragonDemon','Je… Qu’est-ce qui s’est passé ?'),
 n('Un portail s’ouvre sous leurs pieds et les ramène sur Démono. Tous deux peinent encore à comprendre ce qu’ils viennent de traverser.',{background:'forgeur-plains'}),
 d('dragonDemon','Pardonne-moi. Ce cœur…','forgeur',{background:'forgeur-plains'}),
 d('zvatas','Forgeur ! À la place principale. Maintenant !','forgeur',{background:'forgeur-plains'}),
 n('Le Forgeur s’élance. Après de longues minutes de course, il débouche sur les plaines bordant la place principale.',{background:'forgeur-plains'}),
 n('La Tryhydre est là. Trois têtes se dressent au-dessus du sol : l’une des pièces maîtresses de l’ancienne armée vient de se réveiller.',{background:'forgeur-plains'}),
 d('forgeur','Reculez tous. Je m’en charge.','tryhydre',{background:'forgeur-plains'})
 ]},
 4:{title:'Trois têtes, un nouveau maître',level:10,gearHint:'Niveau 9–10 · un équipement en or et un en Diamanite',boss:true,enemies:['tryhydre'],background:'forgeur-plains',before:[
 n('La Tryhydre balaie les plaines du regard. Ses trois têtes cherchent encore une bataille qui s’est achevée des siècles auparavant.'),
 d('forgeur','La guerre est terminée. Écoute-moi.','tryhydre'),
 d('tryhydre','Où est l’ennemi ? Où est mon maître ?'),
 n('Un souffle brûlant répond à la place des mots. Le Forgeur plante ses pieds dans la terre et lève son arme.')
 ],after:[
 n('La Tryhydre cesse enfin de lutter. Ses têtes se tournent à gauche, puis à droite. Rien, autour d’elle, ne ressemble à ses derniers souvenirs.'),
 d('tryhydre','Ce lieu… Pourquoi tout a-t-il changé ?'),
 d('forgeur','Tu as perdu la guerre. Il y a des siècles.','tryhydre'),
 n('Ses trois têtes s’abaissent lentement. La colère laisse place à une déception immense.'),
 d('tryhydre','Et mon maître ? Où est Selkiel ?'),
 d('forgeur','Selkiel est mort. Désormais, notre Navigateur est Maître Zvatas.','tryhydre'),
 n('La Tryhydre scrute l’horizon sans rien apercevoir. Le Forgeur lève un doigt vers le ciel.'),
 n('Au-dessus d’eux se tient Zvatas, immense comme une lune.'),
 d('tryhydre','Maître… Désormais, je ne perdrai plus.','zvatas'),
 d('zvatas','Tu n’as plus le choix. La défaite n’est plus une option.','tryhydre'),
 n('Plusieurs semaines passent. Le calme revient sur Démono, fragile, mais réel. La forge ne s’éteint presque jamais.'),
 d('zvatas','Forgeur. Es-tu prêt à devenir commandant ?'),
 d('forgeur','Oui, Maître.','zvatas'),
 d('zvatas','Tu n’as pas compris ma question.'),
 n('Un puissant tourbillon noir apparaît sur les plaines. Il ravage les alentours, arrache l’herbe et emporte tout dans sa course.'),
 n('Au cœur de la tempête se dessine une silhouette : l’Avatar de Zvatas. La création même de ce que le Navigateur serait en tant que soldat.'),
 d('avatarZvatas','Alors prouve-le. Bats-moi, au péril de ton existence.'),
 n('Le Forgeur resserre sa prise sur son épée. L’Avatar de Zvatas s’avance.'),
 n('Fin du chapitre 1 — Naissance.'),
 n('Chapitre 2 — Pour prouver ma place (et que j’existe). En cours de développement…')
 ]}
};
// Fixed encounter budgets: never scale to the player's equipped gear.
const FORGEUR_ENCOUNTERS={
 ecurexplosion:{hp:155,dmg:18,level:1,rule:'Tours impairs : dépose une bombe. Tours pairs : frappe à 100 %, puis la bombe explose à 140 % des dégâts d’attaque. Aucun critique ni double action.'},
 roxxor:{hp:370,dmg:31,level:4,rule:'Chaque tour : frappe à 125 %, sans critique ni double action. Chaque frappe qui touche le Forgeur a 15 % de chance de réduire ses dégâts de 10 % jusqu’à la fin du combat. Malus non cumulable, retirable par une purification.'},
 dragonNebryss:{hp:560,dmg:43,level:7,rule:'Chaque tour : une frappe à 60 %, sans critique, puis une frappe à 100 % avec 50 % de chance de critique (×1,75). Aucune double action de Vitesse.'},
 tryhydre:{hp:900,dmg:60,level:10,rule:'Chaque tour, trois têtes : attaque à 100 %, applique une brûlure (5 % des PV max au début du tour), puis gagne 7 % de dégâts d’attaque, cumulables. Aucun critique ni double action supplémentaire.'}
};
function forgeurStoryEnemies(stage){
 const kind=FORGEUR_MISSIONS[stage].enemies[0],v=FORGEUR_ENCOUNTERS[kind],c=FORGEUR_CAST[kind];
 return [{id:'enemy0',type:'dog',storyKind:kind,forgeurStory:true,name:c.name,art:c.art,level:v.level,hp:v.hp,maxHp:v.hp,dmg:v.dmg,baseDmg:v.dmg,boss:!!FORGEUR_MISSIONS[stage].boss,burning:false,powerBonus:0,rageStacks:0,bombPending:false}];
}
function forgeurEnemyTurn(b,e,{strike,nextAction,emit,log,rng,burn,weakness}){
 if(!e.forgeurStory)return false;
 const cue=(label,kind)=>emit({type:'forgeur-story-cue',to:e.id,label,kind});
 if(e.storyKind==='ecurexplosion'){
  if(b.round%2===1){e.bombPending=true;cue('Bombe posée · explosion au prochain tour','bomb-set');log('Une bombe attend au sol. Au prochain tour ennemi : frappe, puis explosion à 140 %.');}
  else{strike(1,false,0);if(e.bombPending&&b.hp>0&&e.hp>0){nextAction();e.bombPending=false;cue('La bombe explose !','bomb-explode');strike(1.4,'explosion',0);}}
 }else if(e.storyKind==='roxxor'){
  cue('Poids du regret · 125 %','heavy');strike(1.25,'fangs',0);
  if(b.hp>0&&rng()<.15)weakness();
 }else if(e.storyKind==='dragonNebryss'){
  cue('Brume de Nébryss · première frappe','dragon');strike(.6,'purple-slash',0);
  if(b.hp>0&&e.hp>0){nextAction();cue('Seconde frappe · 50 % de critique','dragon');strike(1,'purple-slash',.5);}
 }else if(e.storyKind==='tryhydre'){
  cue('Première tête · morsure','head-strike');strike(1,'fangs',0);
  if(b.hp>0&&e.hp>0){nextAction();cue('Deuxième tête · souffle brûlant','head-burn');burn();}
  if(b.hp>0&&e.hp>0){e.rageStacks++;e.dmg=Math.round(e.baseDmg*(1+.07*e.rageStacks));emit({type:'enemy-rage',to:e.id,dmg:e.dmg,label:'Troisième tête · dégâts +'+(7*e.rageStacks)+' %'});log('La troisième tête attise sa rage : +'+(7*e.rageStacks)+' % de dégâts.');}
 }
 return true;
}

return {FORGEUR_CAST,FORGEUR_CHAPTER,FORGEUR_ENCOUNTERS,FORGEUR_MISSIONS,FORGEUR_STORY_VERSION,forgeurEnemyTurn,forgeurStoryEnemies};
})();
modules["forgeur.mjs"]=(()=>{
// Forgeur rules. No engine imports: usable by combat, catalog and offline bundle.
const FORGEUR_CLASS={name:'Le Forgeur',title:'L’acier entre deux extrêmes',role:'Tension',art:'forgeur-classic',hp:110,dmg:15,luck:14,speed:14,weapon:'epee-lourde',color:'#ff8358',lore:'Après la chute de Selkiel, le Forgeur fut appelé par Zvatas pour les gouverner tous…'};
const FORGEUR_PASSIVE={name:'Acier vivant',text:'Commence chaque combat avec 3 cumuls de Tension, entre 1 et 5. À 2, 3 ou 4 : état neutre. À 5, Surchauffe : dégâts +20 %, Chance de critique +15 points et dégâts reçus +15 %. À 1, Refroidissement : dégâts −20 %, probabilité de double action +15 points et bouclier de 15 % des PV max au début de chaque tour. La Tension et les états ne peuvent pas être dissipés. Les boucliers se cumulent, persistent jusqu’à absorption ou dissipation et disparaissent en fin de combat.'};
const FORGEUR_SKILLS={
 fracas:{name:'Fracas de l’épée',owner:'forgeur',level:1,cd:0,effect:'fracas'},
 protectionultime:{name:'Protection ultime',owner:'forgeur',level:1,cd:0,effect:'protectionultime'},
 entailles:{name:'Entailles multiples',owner:'forgeur',level:3,cd:3,effect:'entailles'},
 magmageux:{name:'Protection Magmageux',owner:'forgeur',level:5,cd:3,effect:'magmageux'},
 regulation:{name:'Refroidissement ou Surchauffe',owner:'forgeur',level:7,cd:2,effect:'regulation'},
 jugement:{name:'Jugement',owner:'forgeur',level:11,cd:1,waitTurns:1,effect:'jugement'},
 aureole:{name:'Auréole de prévention',owner:'forgeur',level:13,cd:1,waitTurns:1,effect:'aureole'}
};
const FORGEUR_TEXT={
 fracas:'Inflige 125 % des dégâts d’attaque, ou 175 % si le Forgeur est déjà en Surchauffe au lancement, puis gagne 1 Tension. Peut être critique et répété par la Vitesse ; chaque lancer fait évoluer la Tension. Sans récupération.',
 protectionultime:'Ajoute un bouclier égal à 12 % des PV max, puis perd 1 Tension. Si le Forgeur est déjà en Refroidissement au lancement : bouclier de 17 % à la place, puis frappe la cible pour 42 % de tous ses points de bouclier actuels. Le bouclier ne critique pas ; la frappe peut critiquer. Répétable par la Vitesse. Sans récupération.',
 entailles:'Nécessite Surchauffe. Inflige 1 à 3 entailles à une même cible, chacune à 65 % des dégâts d’attaque. Chaque entaille peut être critique. Pas de répétition par la Vitesse. Récupération : 3 tours (tour 1 → tour 4).',
 magmageux:'Ajoute un bouclier de 20 % des PV max. À 49 % des PV max ou moins au lancement, applique aussi une Brûlure à la cible choisie : 5 % de ses PV max au début de chacun de ses tours, non cumulable. À 50 % ou plus, seul le bouclier est appliqué. Ne critique pas ; répétable par la Vitesse. Récupération : 3 tours.',
 regulation:'Ramène la Tension à 3. Depuis Surchauffe : ajoute un bouclier égal à 250 % des dégâts avant combat et prépare Protection ultime à retirer 2 Tensions au prochain lancer. Depuis Refroidissement : la prochaine frappe offensive inflige +20 % de dégâts et le prochain Fracas ajoute 2 Tensions. Depuis 2, 3 ou 4 : aucun bonus. Ni critique ni répétition par la Vitesse. Récupération : 2 tours.',
 jugement:'Sacrifie 25 % des PV max, en ignorant les boucliers et au risque de mourir, puis ajoute un bouclier égal à 150 % des dégâts avant combat. Prépare la prochaine attaque de base ou compétence offensive lancée en Surchauffe : ses dégâts sont doublés. Une action sans dégâts annule cette préparation. Une répétition par la Vitesse ne profite pas une seconde fois du bonus. Jugement ne frappe pas directement, ne critique pas et ne se répète pas. Récupération : un tour complet à attendre (tour 1 → tour 3).',
 aureole:'Prépare un bouclier égal à 50 % des PV effectivement perdus lors de la prochaine attaque ou compétence offensive ennemie reçue. Les impacts de cette même action se cumulent ; ni les dégâts périodiques ni les sacrifices ne comptent. Le bouclier arrive au début du prochain tour du Forgeur, s’il survit. Une répétition par la Vitesse porte le taux à 100 %. Ne critique pas. Récupération : un tour complet à attendre (tour 1 → tour 3).'
};
const sword=(name,level,price,rolls)=>({name,owner:'forgeur',family:'epee-lourde',level,price,slot:'weapon',rolls:{dmg:rolls},rarityRolls:{dmg:rolls},...(level===4?{sellPrice:111}:{})});
const FORGEUR_ITEMS={
 'epee-lourde':sword('Épée lourde basique',1,37,[7,8,9,11]),
 'epee-lourde-magmatique':sword('Épée lourde magmatique',2,125,[9,10,12,14]),
 'epee-lourde-doree':sword('Épée lourde magmatique dorée',3,350,[12,13,15,17]),
 'epee-lourde-diamanite':sword('Épée lourde magmatique en Diamanite',4,555,[32,35,38,42])
};
const forgeTension=b=>Math.max(1,Math.min(5,Math.floor(b?.tension??3)));
const forgeState=b=>forgeTension(b)===5?'hot':forgeTension(b)===1?'cold':'neutral';
const forgeArt=b=>forgeState(b)==='hot'?'forgeur-offensif':forgeState(b)==='cold'?'forgeur-defensif-v2':'forgeur-classic';
const newProfile=()=>({version:1,unlocks:{forgeur:false},forgeurNoticePending:false});
// Profile progress survives deletion of every adventure. Only a genuinely new profile starts locked.
function syncProfile(active,companions={}){
 const profile={...newProfile(),...active?.profile,unlocks:{...active?.profile?.unlocks}};
 const states=[active,...Object.values(companions)].filter(Boolean);
 const unlocked=states.some(s=>s.profile?.unlocks?.forgeur===true||s.hero?.key==='forgeur'||s.hero?.key==='wolffy'&&s.cleared>=10);
 if(unlocked&&!profile.unlocks.forgeur)profile.forgeurNoticePending=true;
 profile.unlocks.forgeur=!!(profile.unlocks.forgeur||unlocked);
 for(const s of states)s.profile=profile;
 return profile;
}
const companionAvailable=(key,profile)=>key!=='forgeur'||profile?.unlocks?.forgeur===true;

return {FORGEUR_CLASS,FORGEUR_ITEMS,FORGEUR_PASSIVE,FORGEUR_SKILLS,FORGEUR_TEXT,companionAvailable,forgeArt,forgeState,forgeTension,newProfile,syncProfile};
})();
modules["progression.mjs"]=(()=>{
const MAX_LEVEL=50;
const xpNeed=level=>Math.round(40*1.24**(level-1));
const expeditionXpDivisors=level=>level<=5?[5,7]:level<=9?[9,12]:[10,15];
function expeditionXpRange(level){if(level>=MAX_LEVEL)return [0,0];const [min,max]=expeditionXpDivisors(level);return [Math.round(xpNeed(level)/max),Math.round(xpNeed(level)/min)];}
function expeditionXp(level,rng=Math.random){if(level>=MAX_LEVEL)return 0;const [min,max]=expeditionXpDivisors(level),divisor=min+Math.min(max-min,Math.floor(rng()*(max-min+1)));return Math.round(xpNeed(level)/divisor);}

return {MAX_LEVEL,expeditionXp,expeditionXpDivisors,expeditionXpRange,xpNeed};
})();
modules["achievements.mjs"]=(()=>{
const {xpNeed}=modules["progression.mjs"];
// Companion-local counters: events are recorded by the engine only after a successful action.
const row=(id,name,metric,target,reward,description,exactGold=false)=>({id,name,metric,target,reward:{...reward,...(reward.gold!==undefined?{gold:exactGold?reward.gold:Math.ceil(reward.gold*.8)}:{})},description});
const ACHIEVEMENTS=[
 ...[[20,40,20],[50,100,45],[80,150,65],[150,300,150],[300,550,350],[500,700,400]].map(([n,xp,gold],i)=>row('combat-'+(i+1),'Combat '+(i+1),'wins',n,{xp,gold,...(i===2?{title:'Combattant'}:i===5?{title:'Conquérant'}:{})},`Gagnez ${n} combats.`)),
 row('achat-or','Achat OR','goldBought',1,{xp:100,gold:25},'Achetez votre premier équipement en or (niveau 3), y compris le cristal d’émeraude et les variantes lumière ou acier.'),
 ...[[150,50],[300,150],[1500,0]].map(([n,xp],i)=>row('depense-'+(i+1),'Dépense '+(i+1),'spent',n,{xp,...(i===2?{title:'Acheteur compulsif'}:{})},`Dépensez ${n} or en boutique. Équipements, consommables et ressources compris.`)),
 ...[[10,75,50],[20,200,200],[30,450,250],[40,700,300],[50,0,500]].map(([n,xp,gold],i)=>row('neant-'+(i+1),'Néant '+(i+1),'rift',n,{xp,gold,...(i===4?{level:1}:{}),...({1:{title:'Combattant du Néant'},3:{title:'Conquérant du Néant'},4:{title:'Néantin'}}[i]??{})},`Vainquez l’étage ${n} de la Fissure du Néant.`)),
 ...[[1,25,25],[5,400,100],[15,1000,250]].map(([n,xp,gold],i)=>row('craft-'+(i+1),'Craft '+(i+1),'crafted',n,{xp,gold,...(i===2?{title:'Artisan'}:{})},`Fabriquez ${n===1?'votre premier objet':n+' objets'} à l’atelier, hors consommables.`)),
 ...[[5,15],[10,50],[15,80],[20,250],[30,350],[40,500],[50,750]].map(([n,gold],i)=>row('level-'+(i+1),'Level '+(i+1),'level',n,{gold,...({3:{title:'Aventurier remarquable'},4:{title:'Chasseur de prime'},5:{title:'Navigateur'},6:{title:'ASTRAL'}}[i]??{})},`Atteignez le niveau ${n}.`)),
 row('chapitre-1','Chapitre 1','chapter',1,{xp:Math.round(xpNeed(6)*.75),gold:30},'Terminez le chapitre 1 ou le chapitre unique de ce compagnon.'),
 row('astral-star',"Nah i'd win",'astralStars',1,{gold:400,title:"Nah i'd win"},'Appliquez une étoile sur un équipement Astral.',true),
 row('astral-weapon','Cette puissance...','astralWeapons',1,{gold:300},'Achetez une arme Astral.',true),
 row('astral-armor','... coule dans mes veines','astralArmors',1,{gold:300},'Achetez une armure Astral.',true),
 row('astral-universe','Cette puissance qui coule dans les veines','astralPair',2,{title:'Le plus fort de l’univers'},'Débloquez les succès « Cette puissance... » et « ... coule dans mes veines ».',true),
 ...[
  ['ecaille-rouge','Écaille rouge',10,'Écailles rouges','Dragonnet rouge'],
  ['plume-malefique','Plume maléfique',10,'Plumes maléfiques','Maître Corkbeau'],
  ['flocon-eternel','Flocon Éternel',10,'Flocons Éternels','L’Éternel'],
  ['os','Ossement',15,'Os','Le revenant'],
  ['plume-enflammee','Plumes enflammées',10,'Plumes enflammées','Chaud bouillant']
 ].map(([resource,name,target,label,title])=>row('loot-'+resource,name,'loot:'+resource,target,{gold:200,title},`Récupérez ${target} ${label} sur les monstres. Les achats en boutique ne comptent pas. Les ressources vendues ou utilisées restent comptabilisées.`,true))
];
const newAchievements=()=>({version:2,monsterDrops:{},astralWeapons:0,astralArmors:0,astralStars:0,wins:0,spent:0,goldBought:0,crafted:0,claimed:[],title:null});
function ensureAchievements(s){if(!s.achievements){s.achievements=newAchievements();return true;}let changed=false;if(s.achievements.version!==2){Object.assign(s.achievements,{astralWeapons:0,astralArmors:0,astralStars:0,version:2});changed=true;}if(!s.achievements.monsterDrops||typeof s.achievements.monsterDrops!=='object'||Array.isArray(s.achievements.monsterDrops)){s.achievements.monsterDrops={};changed=true;}return changed;}
// Only called when a defeated monster actually awards a resource. Never infer its origin from inventory.
function recordMonsterDrop(s,resource,quantity=1){ensureAchievements(s);if(!ACHIEVEMENTS.some(d=>d.metric==='loot:'+resource)||!Number.isSafeInteger(quantity)||quantity<1)return;const drops=s.achievements.monsterDrops;drops[resource]=Math.min(Number.MAX_SAFE_INTEGER,Math.max(0,Math.floor(Number(drops[resource])||0))+quantity);}
function recordAchievement(s,metric,amount=1){ensureAchievements(s);if(['wins','spent','goldBought','crafted','astralWeapons','astralArmors','astralStars'].includes(metric))s.achievements[metric]=Math.max(0,Number(s.achievements[metric])||0)+amount;}
function achievementRows(s,chapterLength){const a=s.achievements??newAchievements();return ACHIEVEMENTS.map(d=>{const actualValue=d.metric.startsWith('loot:')?a.monsterDrops?.[d.metric.slice(5)]??0:d.metric==='astralPair'?Number(a.astralWeapons>0)+Number(a.astralArmors>0):d.metric==='level'?s.hero?.level??0:d.metric==='rift'?s.rift?.cleared??0:d.metric==='chapter'?Number(chapterLength>0&&s.cleared>=chapterLength):a[d.metric]??0;const value=Array.isArray(a.unlockedByCode)&&a.unlockedByCode.includes(d.id)?Math.max(d.target,actualValue):actualValue;return {...d,value,progress:Math.min(d.target,value),ready:value>=d.target,claimed:a.claimed.includes(d.id)};});}
const unlockedTitles=s=>ACHIEVEMENTS.filter(d=>d.reward.title&&s.achievements?.claimed.includes(d.id)).map(d=>d.reward.title);
const equippedTitle=s=>unlockedTitles(s).includes(s.achievements?.title)?s.achievements.title:null;
function setCompanionTitle(s,title){if(!s.hero||title!==null&&!unlockedTitles(s).includes(title))throw Error('Titre indisponible pour ce compagnon.');ensureAchievements(s);s.achievements.title=title;}

return {ACHIEVEMENTS,achievementRows,ensureAchievements,equippedTitle,newAchievements,recordAchievement,recordMonsterDrop,setCompanionTitle,unlockedTitles};
})();
modules["nahat-story.mjs"]=(()=>{
// Four missions, seven encounters. Forest encounters share one completion reward.
const n=text=>({speaker:null,text});
const say=(speaker,text,other='nahat')=>({speaker,text,other});
const scene=(background,frames)=>frames.map(f=>({...f,background}));
const NAHAT_CAST={
 nahat:{name:'Nahat',art:'nahat-ado',combatArt:'nahat-ado-combat',kind:'human'},
 nahatHealer:{name:'???',art:'nahat-healer',kind:'human'},
 nathalia:{name:'Nathalia',art:'nathalia',combatArt:'nathalia-combat',kind:'human'},
 nathaliaPose:{name:'Nathalia',art:'nathalia-pose',kind:'human'},
 lycaon:{name:'Lycaon',art:'lycaon',combatArt:'lycaon-combat',kind:'human'},
 vesperaCitizens:{name:'Habitants de Vespera',art:'vespera-citizens',kind:'human'},
 academyStudents:{name:'Élèves de l’académie',art:'academy-students',kind:'human'}
};
const NAHAT_CHAPTER={title:'Chapitre 1 — Le prodige de l’Épine',description:'Un prodige laissé pour mort, une main tendue dans la forêt et le long chemin du retour vers Vespera.',nextTitle:'À venir'};
const NAHAT_MISSIONS={
 1:{title:'La main tendue',level:1,background:'nahat-cottage',enemies:['nahatWolf'],before:[
 ...scene('nahat-city-view',[
 n('Né dans un village proche de Vespera, Nahat était destiné à devenir éleveur, comme son père. Mais les récits de l’Épine nourrissaient un autre rêve : rejoindre l’Ordre et rencontrer Achylion, son idole.'),
 n('Un voyageur accueilli par ses parents remarqua son éveil alors qu’il n’avait que quatre ans. Le rapport de cet homme, membre respecté de l’Épine, changea son destin. À six ans, Nahat fut recruté.'),
 n('Assassinat, armes, pilotage galactique, combat rapproché : il excellait en tout. À quatorze ans, il obtint le rang Akami et entra dans sa dernière année d’études. Son premier assassinat devait enfin lui permettre de faire ses preuves.'),
 n('La révolte d’Alatros contre Achylion suspendit sa formation. Aveuglé par son orgueil, Nahat s’infiltra dans un conseil de guerre pour tuer le meneur. Il approcha sa dague de sa gorge… et s’effondra, le ventre ouvert par l’épée d’Alatros.'),
 n('« Tu as choisi le mauvais camp, mon petit… » Laissé pour mort aux portes de la ville, Nahat tenta de rentrer chez lui. Il s’écroula sur le chemin.')]),
 ...scene('nahat-cottage',[n('Au cœur de la forêt, une petite maison de bois se tient à l’écart des sentiers. C’est là que Nahat ouvre enfin les yeux.')]),
 ...scene('nahat-interior',[
 n('Sa blessure a été soignée. Nahat regarde autour de lui : il est seul. Encore faible, il se lève et se dirige vers la sortie.'),
 n('La porte s’ouvre. Une vieille dame entre, un panier rempli d’herbes médicinales au bras.'),
 say('nahatHealer','Tu es enfin réveillé, mon petit.'),
 say('nahat','Où suis-je ? Et qui êtes-vous ?','nahatHealer'),
 say('nahatHealer','Ça n’a pas d’importance pour le moment. Il faut te reposer et reprendre des forces. Tu ne serais pas là si je ne t’avais pas trouvé à temps.'),
 n('Un vertige saisit Nahat. Il retombe sur le lit.'),
 say('nahatHealer','Reste tranquille. Je vais te préparer un thé avec des herbes qui accéléreront ta guérison.'),
 n('Elle prépare la mixture et la lui tend. Nahat la boit d’un trait. Plusieurs jours passent ; les forces lui reviennent peu à peu.'),
 say('nahat','Les herbes de la vieille dame ont un goût affreux, mais elles sont plutôt efficaces.'),
 n('Un cri retentit à l’extérieur.'),say('nahat','Quelqu’un est en danger !')]),
 ...scene('nahat-cottage',[n('Nahat sort en courant. Un loup sauvage menace la vieille dame. Il se place entre eux, sa lame levée.'),say('nahat','Reculez ! Je m’en occupe.','nahatHealer')])
 ],after:scene('nahat-cottage',[
 say('nahatHealer','Merci de m’avoir sauvée. Je vois que tu vas beaucoup mieux.'),
 say('nahat','C’est grâce à vous. Je ne vous remercierai jamais assez. Allez-vous enfin me dire où nous sommes, et votre nom ?','nahatHealer'),
 say('nahatHealer','Nous sommes au cœur de la forêt, près de Duna. Nos chemins ne font que se croiser, cher enfant. Termine ta convalescence, oublie tout ça et renoue avec ton destin.'),
 n('Nahat comprend qu’elle ne souhaite pas en révéler davantage. Cette fois, il décide de ne pas insister.')])},
 2:{title:'Les épreuves des bois',level:4,background:'nahat-forest',enemies:['nahatSnake','nahatBear','nahatTiger','nahatOrcs'],gauntlet:true,before:[
 ...scene('nahat-interior',[n('Quelques jours plus tard, Nahat se sent prêt à retourner à Vespera. Il rassemble ses affaires ; sa blessure ne le retient plus.')]),
 ...scene('nahat-cottage',[say('nahat','Vous m’avez rendu bien plus que mes forces. Merci.','nahatHealer'),n('Il lui fait ses adieux une dernière fois, puis s’engouffre entre les arbres.')]),
 ...scene('nahat-forest',[n('La forêt s’assombrit. Entre les racines, les bêtes guettent. Nahat se demande quel accueil lui réserve l’Épine : son échec a sûrement fait le tour de l’Ordre.'),
 n('Il revoit la lame d’Alatros, sa propre précipitation. Son orgueil et sa vanité ont bien failli le tuer. Cette fois, il avancera sans sous-estimer ce qui lui barre le chemin.'),
 n('Un serpent se dresse devant lui. Plus loin l’attendent un ours, un tigre et des orcs. Il doit traverser les quatre rencontres pour sortir des bois.')])
 ],after:scene('nahat-forest',[n('Les derniers orcs reculent. Nahat traverse la clairière en reprenant son souffle. Après une longue marche et bien des obstacles, il aperçoit enfin la sortie de la forêt. La nuit tombe.')])},
 3:{title:'Le duel de Nathalia',level:5,background:'nahat-forest',enemies:['nathalia'],duel:true,before:scene('nahat-forest',[
 n('Une petite pierre heurte la tête de Nahat. Il lève les yeux. Nathalia est assise sur une branche, l’air amusé. Camarade de promotion, elle est aussi l’une des recrues les plus prometteuses de l’académie.'),
 say('nathaliaPose','Ça fait des jours que tout le monde te cherche, Échec ! Je pars à la recherche d’une racine pour notre maître et je tombe sur toi… Quel heureux hasard.'),
 say('nahat','Comment m’as-tu appelé ?','nathaliaPose'),
 say('nathaliaPose','Échec. Comme tout ce que tu entreprends.'),
 say('nahat','Viens te battre si tu l’oses ! Que je te montre qui est vraiment un échec ici !','nathaliaPose'),
 say('nathaliaPose','On ne joue malheureusement pas dans la même cour, très cher.'),
 n('Nathalia quitte sa branche et dégaine.')
 ]),after:[
 ...scene('nahat-forest',[say('nathalia','C’est ça, la fine fleur de l’Épine ? Quelle déception… On se reverra bientôt, petit échec.'),n('Nathalia disparaît dans la forêt.'),say('nahat','Si l’exaspération devait avoir un visage, ce serait le sien !')]),
 ...scene('nahat-city-view',[n('Nahat reprend sa route. Au loin, les murs de Vespera se découpent dans la lumière du soir. Il franchit les portes de la ville et se dirige vers chez lui.')]),
 ...scene('nahat-city-night',[
 {...say('vesperaCitizens','Les habitants se retournent à son passage. Leurs regards insistants lui glacent le dos ; les chuchotements commencent dès qu’il s’éloigne.'),narration:true},
 say('nahat','Mon échec n’est donc pas passé inaperçu…','vesperaCitizens'),
 n('Il continue jusqu’à ses appartements. Devant sa porte, une voix familière le tire de ses pensées.'),
 {...say('lycaon','Alors comme ça, tu es en vie !'),speakerName:'…'},
 say('nahat','Maître Lycaon… Vous êtes là.','lycaon'),
 say('lycaon','Tu sais très bien que personne ne passe les portes de Vespera sans que j’en sois averti. Qu’est-ce qui t’est passé par la tête ? As-tu imaginé un seul instant ce que tes actes ont déclenché ?'),
 say('lycaon','Tu pensais réellement qu’un minable Akami comme toi avait l’étoffe nécessaire pour éliminer un homme tel qu’Alatros ?'),
 say('lycaon','À ton avis, qui a été rendu responsable du commandement de cet assassinat ? La notoriété d’Achylion en a pris un coup.'),
 say('lycaon','Grâce à ton échec total, l’Épine a perdu quatorze de ses plus grands généraux pour mettre fin à ce coup d’État !'),
 n('Nahat baisse la tête. Lycaon contemple son élève abattu, puis reprend d’un ton sec.'),
 say('lycaon','Reste chez toi. Demain, à la première heure, retrouve-moi à l’académie.'),
 n('Son maître disparaît dans les rues. Nahat rentre chez lui ; malgré tout, un sourire se dessine sur son visage.'),
 say('nahat','Je vais pouvoir reprendre ma formation demain. Je devrai travailler dur pour retrouver les faveurs de mes aînés.'),
 n('Il se couche enfin, épuisé par son voyage.')])]},
 4:{title:'Le prix de l’orgueil',level:6,background:'nahat-academy',enemies:['lycaon'],scriptedDefeat:true,boss:true,before:[
 ...scene('nahat-city-day',[n('Dès la première heure, Nahat traverse les rues de Vespera. L’académie l’attend. Il se surprend à hâter le pas.')]),
 ...scene('nahat-academy',[
 n('Lycaon est posté devant les portes. Tous les élèves sont présents : l’académie au grand complet. La joie de Nahat s’efface, remplacée par une inquiétude sourde.'),
 say('nahat','Que font tous les élèves au même endroit ? C’est comme s’ils m’attendaient…','academyStudents'),
 {...say('academyStudents','Nahat traverse les rangs silencieux. Dans les regards, il ne lit que dégoût et haine. Il rejoint Lycaon, la tête baissée.'),narration:true},
 say('lycaon','Moi, Lycaon, Maître académique en second et décisionnaire du passage Akama, te bannis de l’académie.'),
 n('Le monde de Nahat s’écroule. Son rêve vient d’être balayé d’une phrase. Son maître fait de lui un exemple : quiconque nuit à l’Épine doit en assumer les conséquences.'),
 say('nahat','Maître, je…','lycaon'),say('lycaon','Ma décision est prise. Tu n’es plus digne de faire partie de nos rangs.'),
 say('nahat','Maître, c’était un moment d’inattention. Vous savez que j’en suis capable.','lycaon'),
 say('lycaon','Tu parais bien sûr de toi, petit insolent. Faisons un marché. Je n’aurais moi-même eu aucune chance contre Alatros, et tu prétends pourtant être capable de l’éliminer.'),
 say('lycaon','Alors affrontons-nous. Si tu arrives à me toucher ne serait-ce qu’une seule fois, j’accepte ta réintégration.'),
 n('Nahat serre son arme. Tout ce qu’il espère encore repose sur un seul coup.')])],
 interlude:scene('nahat-academy',[{...say('lycaon','Regarde le fossé qui nous sépare et revois où est ta place.'),combatPortrait:true}]),
 after:scene('nahat-forest',[n('Nahat s’effondre. Lycaon jouait simplement avec lui. Un seul véritable coup a suffi.'),n('Blessé, humilié, banni, Nahat quitte Vespera sans savoir où aller. Puis il repense à la femme de la forêt, à son thé amer, à sa bienveillance sans questions.'),say('nahat','Elle est la dernière personne que j’ai vue me sourire.'),n('Il reprend la direction de la forêt, vers la petite maison près de Duna.'),n('Fin du chapitre 1 — Le prodige de l’Épine.')])}
};
const profiles={
 nahatWolf:{name:'Loup sauvage',art:'chien-sauvage',hp:95,dmg:10},
 nahatSnake:{name:'Serpent sauvage',art:'nahat-snake',hp:198,dmg:22},
 nahatBear:{name:'Ours sauvage',art:'nahat-bear',hp:331,dmg:22},
 nahatTiger:{name:'Tigre sauvage',art:'nahat-tiger',hp:193,dmg:25},
 nahatOrcs:{name:'Orcs',art:'nahat-orcs',hp:228,dmg:25},
 nathalia:{name:'Nathalia',art:'nathalia-combat',hp:311,dmg:36},
 lycaon:{name:'Lycaon',art:'lycaon-combat',hp:9999,dmg:1}
};
function nahatEnemies(stage,wave=1){const m=NAHAT_MISSIONS[stage],kind=m.enemies[m.gauntlet?wave-1:0],p=profiles[kind];return [{...p,id:'enemy0',type:'dog',storyKind:kind,level:m.level,maxHp:p.hp,baseDmg:p.dmg,boss:!!m.boss,burning:false,powerUsed:false,powerBonus:0}];}
function nahatIntent(b){if(b.storyKey!=='nahat')return null;
 if(b.stage===2)return {title:`Traversée des bois · ${b.nahatWave??1} / 4`,text:({nahatSnake:'Morsure : 33 % de chance d’empoisonner. Poison non cumulable : 5 % des PV max au début de chaque tour.',nahatBear:'Un ours plus résistant. Il prépare un puissant coup de patte à 160 % de ses dégâts.',nahatTiger:'Une attaque, puis 25 % de chance de frapper une seconde fois à 75 % de ses dégâts.',nahatOrcs:'Deux actions par tour : chaque attaque inflige 100 % de ses dégâts.'}[b.enemies[0]?.storyKind]??'')+' PV et compétences restaurés entre les combats. Défaite ou abandon : retour au serpent. Récompense après les orcs uniquement.'};
 if(b.stage===4)return {title:'La leçon de Lycaon',text:b.lycaonFinisherPending?'Lycaon va conclure la leçon.':'Lycaon esquive toutes les frappes. Ses coups d’entraînement ne retirent qu’un PV.'};return null;
}

return {NAHAT_CAST,NAHAT_CHAPTER,NAHAT_MISSIONS,nahatEnemies,nahatIntent};
})();
modules["astral.mjs"]=(()=>{
const {recordAchievement}=modules["achievements.mjs"];
// All rolls are explicit: common, rare, super-rare, legendary.
const weapon=(name,owner,family,rarityRolls)=>({name,owner,family,slot:'weapon',rarityRolls,rolls:rarityRolls});
const armor=(name,rarityRolls,restriction={})=>({name,slot:'armor',rarityRolls,rolls:rarityRolls,...restriction});
const ASTRAL_ITEMS=Object.fromEntries(Object.entries({
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
}).map(([id,d])=>[id,{...d,astral:true,level:5,price:1050,sellPrice:200}]));
const isAstral=i=>!!ASTRAL_ITEMS[typeof i==='string'?i:i?.type];
const astralActive=(i,type,min=2)=>i?.type===type&&['common','rare','super-rare','legendary'].indexOf(i.rarity)>=min;
function astralPassiveText(i){
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
const STAR_STATS=['hp','dmg','speed','luck'];
const STAR_NAMES={hp:'PV',dmg:'Dégâts',speed:'Vitesse',luck:'Chance'};
const FORGE_PRICE=350,DESTROY_STAR_PRICE=200;
const nativeStarKey=(item,stat)=>stat==='hp'&&Object.hasOwn(item.stats,'hpPercent')?'hpPercent':stat;
function itemStats(item){
 const native=item.stats??{},out={...native};if(!isAstral(item))return out;
 for(const star of item.stars??[]){if(!star)continue;const key=nativeStarKey(item,star.stat);out[key]=(out[key]??0)+(Object.hasOwn(native,key)?Math.abs(native[key])*star.value/100:star.value);}
 return Object.fromEntries(Object.entries(out).map(([k,v])=>[k,Math.round(v*10000)/10000]));
}
const forgedStatKeys=item=>new Set((item.stars??[]).filter(Boolean).map(star=>nativeStarKey(item,star.stat)));
function normalizeForge(s){
 s.forge??={unlocked:false,itemId:null};
 if(!s.items.some(i=>i.id===s.forge.itemId&&isAstral(i)))s.forge.itemId=null;
 for(const item of s.items.filter(isAstral)){
  item.stars=Array.from({length:3},(_,n)=>{const star=item.stars?.[n];if(item.id!==s.forge.itemId||!star||!STAR_STATS.includes(star.stat))return null;const native=Object.hasOwn(item.stats,nativeStarKey(item,star.stat)),range=native?[3,8]:star.stat==='hp'?[150,200]:star.stat==='dmg'?[15,30]:[10,20];return Number.isInteger(star.value)&&star.value>=range[0]&&star.value<=range[1]?{stat:star.stat,value:star.value}:null;});
 }
}
function atForge(s){if(!s.hero||s.battle||s.storyScene||!s.forge?.unlocked)throw Error('La Forge Cosmique est accessible au camp après votre premier achat Astral.');}
function placeForgeItem(s,id){atForge(s);if(s.forge.itemId)throw Error('Retirez d’abord l’équipement actuellement dans la Forge.');const item=s.items.find(i=>i.id===id);if(!isAstral(item))throw Error('Choisissez un équipement Astral de ce compagnon.');s.forge.itemId=id;item.stars=[null,null,null];return item;}
function addForgeStar(s,slot,rng=Math.random){
 atForge(s);const item=s.items.find(i=>i.id===s.forge.itemId);if(!isAstral(item)||!Number.isInteger(slot)||slot<0||slot>2||item.stars?.[slot])throw Error('Emplacement stellaire indisponible.');if(s.gold<FORGE_PRICE)throw Error('Il faut 350 or pour activer une étoile.');
 const random=()=>Math.min(1-Number.EPSILON,Math.max(0,rng())),stat=STAR_STATS[Math.floor(random()*4)],native=Object.hasOwn(item.stats,nativeStarKey(item,stat)),[lo,hi]=native?[3,8]:stat==='hp'?[150,200]:stat==='dmg'?[15,30]:[10,20],star={stat,value:lo+Math.floor(random()*(hi-lo+1))};
 item.stars??=[null,null,null];item.stars[slot]=star;s.gold-=FORGE_PRICE;recordAchievement(s,'astralStars');return star;
}
function destroyForgeStar(s,slot){atForge(s);const item=s.items.find(i=>i.id===s.forge.itemId);if(!Number.isInteger(slot)||slot<0||slot>2||!item?.stars?.[slot])throw Error('Étoile introuvable.');if(s.gold<DESTROY_STAR_PRICE)throw Error('Il faut 200 or pour détruire une étoile.');s.gold-=DESTROY_STAR_PRICE;item.stars[slot]=null;}
// Called by the UI only after its two explicit confirmation windows.
function removeForgeItem(s){atForge(s);const item=s.items.find(i=>i.id===s.forge.itemId);if(!item)throw Error('La Forge est vide.');item.stars=[null,null,null];s.forge.itemId=null;return item;}
function starText(item,star){if(!star)return 'Étoile vide';const native=Object.hasOwn(item.stats,nativeStarKey(item,star.stat));return `+${star.value}${native?' %':''} ${STAR_NAMES[star.stat]}${native?' de la valeur native':''}`;}

return {ASTRAL_ITEMS,DESTROY_STAR_PRICE,FORGE_PRICE,STAR_NAMES,STAR_STATS,addForgeStar,astralActive,astralPassiveText,destroyForgeStar,forgedStatKeys,isAstral,itemStats,nativeStarKey,normalizeForge,placeForgeItem,removeForgeItem,starText};
})();
modules["diamanite.mjs"]=(()=>{
// Explicit rolls: each column is common, rare, super-rare, legendary.
const weapon=(name,owner,family,rarityRolls)=>({name,owner,family,slot:'weapon',rarityRolls,rolls:rarityRolls});
const armor=(name,rarityRolls,restriction)=>({name,slot:'armor',rarityRolls,rolls:rarityRolls,...restriction});
const DIAMANITE_ITEMS=Object.fromEntries(Object.entries({
 'epee-bouclier-diamanite':weapon('Épée & bouclier en Diamanite','nahat','epee-bouclier',{dmg:[24,25,26,27],hp:[75,77,79,82]}),
 'lame-sabre-diamanite':weapon('Lame-sabre en Diamanite','nahat','lame-sabre',{dmg:[30,33,37,40],hp:[20,22,24,24],luck:[-12,-11,-10,-10]}),
 'protege-bras-diamanite':weapon('Protège bras en Diamanite','nahat','protege-bras',{hpPercent:[14,15,16,17]}),
 'armure-magique-diamanite':armor('Armure magique en Diamanite',{hp:[88,98,105,120]},{excludeOwners:['wolffy']}),
 'arc-diamanite':weapon('Arc en Diamanite','drunn','arc',{dmg:[25,27,29,35],luck:[16,17,18,18]}),
 'arbalete-diamanite':weapon('Arbalète en Diamanite','drunn','arbalete',{dmg:[16,18,20,22],luck:[11,12,13,15]}),
 'baton-diamanite':weapon('Bâton en Diamanite','stibili','baton',{dmg:[30,32,35,40]}),
 'griffe-diamanite':weapon('Griffe en Diamanite','kaerune','griffe',{dmg:[25,27,29,35],speed:[16,17,18,18]}),
 'porte-aile-diamanite':weapon('Porte-aile en Diamanite','kaerune','porte-aile',{dmg:[15,17,18,20],speed:[30,31,32,35],luck:[-15,-14,-13,-10]}),
 'cristal-diamanite':weapon('Cristal en Diamanite','wolffy','cristal',{dmg:[24,25,26,28],luck:[15,16,17,19]}),
 'dentier-diamanite':weapon('Dentier de combat en Diamanite','wolffy','dentier',{dmg:[12,14,16,20],hp:[45,50,55,65],luck:[9,10,11,13],speed:[9,11,12,13]}),
 'armure-complete':armor('Armure complète',{hp:[100,110,125,150]},{owner:'wolffy'})
}).map(([id,item])=>[id,{...item,level:4,price:555,sellPrice:75}]));

return {DIAMANITE_ITEMS};
})();
modules["mastery.mjs"]=(()=>{
// Level 19–24 additions. Shield points are separate from health and cannot heal.
const MASTERY_SKILLS={
 plumes:{name:'Plumes tranchantes',owner:'kaerune',level:19,cd:3,effect:'plumes'},
 proie:{name:'La proie désignée',owner:'wolffy',level:19,cd:5,effect:'proie'},
 piege:{name:'Flèche absorbante',owner:'drunn',level:19,cd:3,effect:'piege'},
 sang:{name:'Le prix du sang',owner:'nahat',level:19,cd:3,effect:'sang'},
 transmutation:{name:'Transmutation élémentaire',owner:'stibili',level:20,cd:4,effect:'transmutation'},
 adaptation:{name:'Adaptation',owner:'kaerune',level:24,cd:0,automatic:true,effect:'adaptation'},
 instinct:{name:'Instinct protecteur',owner:'wolffy',level:24,cd:0,automatic:true,effect:'instinct'},
 extraction:{name:'Extraction du venin',owner:'drunn',level:24,cd:4,extraAction:true,effect:'extraction'}
};
const MASTERY_TEXT={
 plumes:'Inflige initialement 20 % des dégâts d’attaque de Kaerune. Chaque utilisation augmente la puissance du prochain lancer de 10 points, jusqu’à 150 % : 20 %, 30 %, 40 %… Chaque répétition par la Vitesse compte comme une utilisation et profite du cumul précédent. Peut être critique. Les cumuls sont dissipables par les ennemis et disparaissent en fin de combat. Récupération : 3 tours (tour 1 → tour 4).',
 proie:'Marque une cible pendant 3 tours, tour du lancement inclus. Les Bébés Wolffy attaquent cette cible et lui infligent 20 % de dégâts supplémentaires. À sa mort ou à l’expiration de la marque, ils suivent de nouveau votre cible. Récupération : 5 tours. Ni critique ni répétition par la Vitesse.',
 piege:'Tire une flèche infligeant 100 % des dégâts d’attaque et soigne Drunn de 200 % des dégâts effectivement infligés, sans dépasser ses PV max. Les dégâts absorbés par un bouclier comptent, mais pas les dégâts excédant les PV restants. Insoignable empêche le soin. Récupération : 3 tours (tour 1 → tour 4). Peut être critique. Pas de répétition par la Vitesse.',
 sang:'Inflige 90 % des dégâts d’attaque, plus 15 % des PV actuellement manquants. Ce bonus est plafonné à 100 % des dégâts d’attaque. Seule la partie à 90 % peut être critique ; le bonus de PV manquants ne l’est jamais. Récupération : 3 tours. Pas de double action.',
 transmutation:'Consomme tous les cumuls d’Accumulation pour créer un bouclier de 3 % des PV max par cumul, plafonné à 15 %. Protection pendant 2 tours, tour du lancement inclus. Les cumuls consommés ne renforcent plus l’attaque de base. Cette conversion ne crée pas de nouveau cumul. Nécessite au moins 1 cumul. Récupération : 4 tours. Ni critique ni double action.',
 adaptation:'Chaque attaque de base ajoute 1 cumul après sa frappe, même si elle manque. Chaque cumul augmente les dégâts d’attaque de 2 % jusqu’à la fin du combat : 2 %, 4 %, 6 %… Une double action de base ajoute 2 cumuls. Les compétences, invocations et échos n’en ajoutent pas.',
 instinct:'Une fois par combat, lorsque Wolffy descend à 30 % de ses PV max ou moins, déclenche un secours au début de son prochain tour. Sans Bébé Wolffy vivant, en invoque un avec 50 % des dégâts et 35 % des PV max de Wolffy avant combat. Sinon, le petit vivant le plus blessé reçoit un bouclier égal à 8 % des PV max de Wolffy pendant 2 tours. Ce secours ne consomme pas Appel de la meute.',
 extraction:'Retire tous les cumuls de Poison de Flèche toxic sur la cible et inflige 11 % des dégâts d’attaque de Drunn par cumul : 11 %, 22 %, 33 %… Extra-compétence : ne consomme pas l’action du tour ; les ennemis et les invocations ne jouent pas après son utilisation. Nécessite une cible empoisonnée. Récupération : 4 tours. Ni critique ni répétition par la Vitesse.'
};
const activeShields=(unit,round)=> (unit?.shields??[]).filter(x=>x.amount>0&&(x.until==null||x.until>=round));
const shieldTotal=(unit,round)=>activeShields(unit,round).reduce((n,x)=>n+x.amount,0);
const shieldCapacity=(unit,round)=>{const shields=activeShields(unit,round);return Math.max(0,...shields.map(x=>x.poolCapacity??0),shields.reduce((n,x)=>n+Math.max(x.amount,x.capacity??x.amount),0));};
function grantShield(unit,source,amount,until=null){
 const shield={source,amount:Math.max(0,Math.round(amount)),until,capacity:Math.max(0,Math.round(amount))};
 unit.shields=(unit.shields??[]).filter(x=>x.source!==source);if(shield.amount)unit.shields.push(shield);const capacity=unit.shields.reduce((sum,x)=>sum+Math.max(x.amount,x.capacity??x.amount),0);for(const part of unit.shields)part.poolCapacity=capacity;return shield;
}
function absorbShield(unit,damage,round){
 if(!unit.shields?.length)return {damage,absorbed:0};
 let left=damage;unit.shields=activeShields(unit,round).sort((a,b)=>(a.until??Infinity)-(b.until??Infinity));
 for(const sh of unit.shields){const spent=Math.min(left,sh.amount);sh.amount-=spent;left-=spent;if(!left)break;}
 unit.shields=unit.shields.filter(x=>x.amount>0);return {damage:left,absorbed:damage-left};
}
const markedPrey=b=>b?.prey?.until>=b.round?b.enemies.find(e=>e.id===b.prey.id&&e.hp>0):null;

return {MASTERY_SKILLS,MASTERY_TEXT,absorbShield,activeShields,grantShield,markedPrey,shieldCapacity,shieldTotal};
})();
modules["expeditions.mjs"]=(()=>{
// Expedition profiles share the original training level and reward curve.
const EXPEDITIONS={
 flames:{name:'La route des flammes',art:'harmony-fire',kinds:['dragonnet','firehawk','magmagolem'],text:'Braises, ailes de feu et roche en fusion.'},
 ice:{name:'La montagne glaciale',art:'stibili-snow',kinds:['icewolf','iceslime','frostdummy'],text:'Des adversaires aguerris dans les neiges éternelles.'},
 forest:{name:'La forêt des âmes',art:'harmony-forest',kinds:['dog','slime','corkbeau'],text:'Sous les feuillages, chaque rencontre réserve son butin.'},
 chasm:{name:'Crevasse de l’abîme',art:'expedition-cave',kinds:['boneminer','lantern','boneserpent'],text:'Descendez parmi les ossements et les lueurs de l’abîme.'}
};
const EXPEDITION_ENEMIES={
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
const EXPEDITION_BESTIARY={
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
function expeditionFor(type){return Object.keys(EXPEDITIONS).find(k=>EXPEDITIONS[k].kinds.includes(type))??'forest';}
function expeditionEncounter(zone,rng=Math.random){const pool=EXPEDITIONS[zone]?.kinds;if(!pool)throw Error('Expédition inconnue.');return pool[Math.min(pool.length-1,Math.floor(rng()*pool.length))];}
const EXPEDITION_BALANCE={magmagolem:{hp:1.15,dmg:1},firehawk:{hp:1,dmg:1.07},slime:{hp:1,dmg:1.07},dragonnet:{hp:1,dmg:1.2}};
function scaleEncounter(e,factors){
 if(!factors)return;const ratio=e.hp/e.maxHp;e.maxHp=Math.max(1,Math.round(e.maxHp*factors.hp));e.hp=e.hp<=0?0:Math.max(1,Math.round(e.maxHp*ratio));e.dmg=Math.max(1,Math.round(e.dmg*factors.dmg));if(e.baseDmg!==undefined)e.baseDmg=Math.max(1,Math.round(e.baseDmg*factors.dmg));
}
function prepareExpeditionEnemy(e){
 scaleEncounter(e,EXPEDITION_BALANCE[e.type]);
 if(e.type==='iceslime')e.frostGuard=true;
 if(e.type==='lantern'){
  const totalHp=e.maxHp,totalDamage=e.dmg;
  e.maxHp=e.hp=Math.max(1,Math.round(totalHp*.78));e.dmg=Math.max(1,Math.round(totalDamage*.65));
  e.lanternBase={hp:Math.max(1,totalHp-e.maxHp),dmg:Math.max(1,totalDamage-e.dmg)};
 }
 return e;
}
function expeditionIntent(e){
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
function expeditionEnemyTurn(b,e,{strike,emit,log,rng=Math.random}){
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

function goldenEnemy(level){const hp=76+11*(level-1);return {id:'enemy0',type:'golden',name:'L’Enchanteur doré',art:'enchanteur-dore',level,hp,maxHp:hp,dmg:Math.max(1,Math.round(6*1.09**(level-1))),boss:false,burning:false,powerUsed:false,powerBonus:0};}

return {EXPEDITIONS,EXPEDITION_BALANCE,EXPEDITION_BESTIARY,EXPEDITION_ENEMIES,expeditionEncounter,expeditionEnemyTurn,expeditionFor,expeditionIntent,goldenEnemy,prepareExpeditionEnemy,scaleEncounter};
})();
modules["trials.mjs"]=(()=>{
const TRIALS={
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
function trialEnemy(kind){const d=TRIALS[kind];return {id:'enemy0',type:'guardian',guardian:kind,name:d.name,art:'guardian-'+kind,level:15,hp:d.hp,maxHp:d.hp,dmg:d.dmg,boss:true,turns:0,chargeDamage:0};}
function trialIntent(e){const n=(e.turns??0)+1,k=e.guardian;
 if(k==='contrecoup')return n%3===1?'Coup de piston · 100 %':n%3===2?'Charge · aucune attaque':`Impact chargé · ${e.chargeDamage>=Math.ceil(e.maxHp*.15)?80:180} %`;
 if(k==='cycle')return n%2?'Lame des racines · 130 %':'Sève ancestrale · soin puis attaque à 65 %';
 if(k==='echo')return n%3===1?'Double estoc · 2 × 55 %':n%3===2?'Parade · riposte à 60 %':'Écho de la rapière · 3 × 50 %';
 return n%3===1?'Morsure du brasier · 100 %':n%3===2?'Envol · prépare une attaque de zone':'Déferlante rouge · zone à 140 %';
}
function trialDirectDamage(e,damage){if(e.guardian==='echo'&&e.parry){e.parry=false;return Math.max(1,Math.round(damage*.5));}return damage;}
function trialEnemyTurn(b,e,{strike,emit,log}){
 const label=trialIntent(e);emit({type:'status',to:e.id,label});log(e.name+' : '+label+'.');e.turns=(e.turns??0)+1;const n=e.turns,k=e.guardian;
 if(k==='contrecoup'){if(n%3===2){e.charging=true;e.chargeDamage=0;}else{strike(n%3===1?1:e.chargeDamage>=Math.ceil(e.maxHp*.15)?.8:1.8,'ice-slash');e.charging=false;}}
 if(k==='cycle'){if(n%2)strike(1.3,'purple-slash');else{const amount=Math.min(e.maxHp-e.hp,Math.round(e.maxHp*(b.cycleBroken?.03:.06)));e.hp+=amount;emit({type:'heal',to:e.id,amount,label:'Sève ancestrale'});b.cycleBroken=false;strike(.65,'purple-slash');}}
 if(k==='echo'){if(n%3===2){e.parry=true;strike(.6,'charged');}else for(let i=0;i<(n%3===1?2:3)&&b.hp>0;i++)strike(n%3===1?.55:.5,'charged');}
 if(k==='brasier'){const fury=e.hp<e.maxHp*.35?1.15:1;if(n%3!==2)strike((n%3===1?1:1.4)*fury,'fire',false,n%3===0);}
}

return {TRIALS,trialDirectDamage,trialEnemy,trialEnemyTurn,trialIntent};
})();
modules["drunn-story.mjs"]=(()=>{
// Ænoria: a complete, single-chapter route. Arena rounds are independent missions.
const n=text=>({speaker:null,text});
const say=(speaker,text,other='drunn')=>({speaker,text,other});
const DRUNN_CAST={
 drunn:{name:'Drunn',art:'drunn',kind:'beast'},
 dompteur:{name:'Le Dompteur',art:'drunn-dompteur',kind:'human'},
 kairos:{name:'Kaïros',art:'drunn-kairos',kind:'beast'},
 vairon:{name:'Vairon',art:'drunn-vairon',kind:'beast'},
 vargrom:{name:'Vargrom',art:'drunn-vargrom',kind:'beast'},
 osculus:{name:'Osculus des sables',art:'drunn-osculus',kind:'beast'},
 rakesh:{name:'Ra’Kesh',art:'drunn-rakesh',kind:'beast'},
 trokille:{name:'Trokille',art:'drunn-trokille',kind:'beast'},
 tykytil:{name:'Tykytil',art:'drunn-tykytil',kind:'beast'},
 arenaDrannex:{name:'Drannex',art:'drunn-drannex',kind:'beast'},
 mystrial:{name:'Mystrial',art:'drunn-mystrial',kind:'beast'}
};
const DRUNN_CHAPTER={title:'Chapitre unique — Le meilleur pisteur… ce sera moi !',singleChapter:true,description:'Sur Ænoria, Drunn doit réunir quatre clans avant qu’une guerre venue des étoiles ne les trouve divisés.'};
const DRUNN_MISSIONS={
 1:{title:'Des yeux fidèles',level:1,background:'aenoria-ice',enemies:['vargrom'],before:[
 n('Ænoria est une planète de forêts, de glaces, de sables et de flammes. Quatre clans se partagent ses terres. Au-dessus de leurs querelles veille leur Navigateur : le Dompteur.'),
 n('Drunn était autrefois l’allié de Valgheim, gardien de la forêt de l’Ouest. Mais le Dompteur avait besoin de bras solides et d’yeux fidèles à ses convictions.'),
 n('Écarté de la forêt, Drunn est devenu secrètement son bras droit. Il n’en a jamais voulu le titre. Ce matin, une nouvelle mission l’attend.'),
 say('dompteur','Tu visiteras les quatre clans. Apaise leurs tensions avant qu’elles ne déchirent Ænoria.'),
 say('drunn','Par lequel dois-je commencer ?','dompteur'),
 say('dompteur','Au nord. Kaïros dirige le clan des Glaces. Il est en froid avec son frère Vairon, mais demeure le plus lucide des deux.'),
 say('dompteur','Agis vite. Une guerre de planètes peut éclater du jour au lendemain. Lorsque viendra une bataille commune, nous devrons tous nous soutenir.'),
 n('Drunn s’agenouille. Cette fois, il ne s’agit pas de suivre une piste : c’est l’avenir de la planète qui repose sur sa parole.'),
 say('drunn','J’exécuterai votre mission. Au péril de ma vie.','dompteur'),
 n('Après plusieurs jours de marche vers le nord, l’air se glace. Chaque respiration lui brûle la poitrine. Une silhouette immense garde l’entrée des terres gelées : Vargrom.'),
 say('vargrom','Que vient faire ici un pitoyable soldat de la forêt ?'),
 say('drunn','Je souhaite m’entretenir avec Kaïros. Je viens pour…','vargrom'),
 n('Vargrom avance. Drunn n’a pas le temps de terminer sa phrase : le gardien charge.')
 ],after:[
 n('Drunn abaisse son arc. Vargrom se redresse, fier, impassible, toujours au milieu du passage.'),
 say('vargrom','Tu ne passeras pas.'),
 say('drunn','Écoute-moi enfin ! Je ne suis pas venu pour…','vargrom'),
 n('Un bruit sourd interrompt Drunn. Puis un silence pesant s’étend sur la neige. Kaïros est là.'),
 say('kairos','Un soldat de la forêt, sur mes terres ? Que veux-tu ?'),
 say('drunn','Il faut que les querelles avec votre frère cessent. Ænoria doit rester unie.','kairos'),
 say('kairos','Le problème n’est pas ici. Cherche-le dans les Terres des flammes.'),
 say('drunn','Alors je parlerai à Vairon. Merci de m’avoir écouté.','kairos'),
 say('kairos','Inutile. Tu mourras avant d’avoir obtenu quoi que ce soit. Va plutôt au sud, vers les Sables Éternels.'),
 say('drunn','Les Sables ? En quoi cela changerait-il la situation ?','kairos')
 ]},
 2:{title:'La grande mer de sable',level:4,background:'aenoria-sands',enemies:['osculus'],before:[
 say('kairos','S’il existe quelqu’un que Vairon considère comme son égal, c’est Ra’Kesh.'),
 say('drunn','Ra’Kesh est un conquérant. Il veut des terres, pas des promesses. Je devrai le combattre pour le raisonner.','kairos'),
 say('kairos','Tu ne le vaincras jamais en combat singulier. Trouve donc une autre solution.'),
 n('Kaïros laisse échapper un rire bref. Drunn reprend la route. La même question l’accompagne à chaque pas : comment convaincre celui qu’on ne peut pas vaincre ?'),
 n('La neige cède à la poussière, puis aux dunes. Les Sables Éternels s’étendent au-delà de l’horizon. Drunn avance dans une mer silencieuse.'),
 n('Le sol ondule près de ses bottes. Un Osculus des sables jaillit, ses pinces levées. Drunn bande son arc avant que le sable ne l’aveugle.')
 ],after:[n('L’Osculus recule, puis s’enfouit sous la dune. Drunn essuie le sable de ses yeux et poursuit sa marche. Devant lui, le désert paraît sans fin.')]
 },
 3:{title:'La parole du Dompteur',level:4,background:'aenoria-sands',enemies:['rakesh'],scriptedDefeat:true,boss:true,before:[
 n('Aux portes de la cité des Sables, Ra’Kesh attend déjà. Un éclaireur l’a averti de l’arrivée du voyageur.'),
 say('rakesh','Qu’est-ce qu’un misérable cloporte vient faire devant ma cité ?'),
 n('Il pose un pied au sol. La pierre tremble. Drunn lève une main, laissant son arc abaissé.'),
 say('drunn','Je viens parler. Nous avons tous intérêt à…','rakesh'),
 n('Ra’Kesh rugit. Le coup part avant que Drunn puisse se mettre en garde.')
 ],after:[
 n('Le monde s’éteint. Plusieurs jours passent dans le silence du coma.'),
 n('Drunn ouvre les yeux dans une cellule. Ses mains et ses pieds sont liés. Il tire sur les chaînes, mais elles ne cèdent pas.'),
 say('trokille','Ne bouge pas. Mon chef arrive. Il veut encore en découdre avec toi.'),
 n('Drunn demeure silencieux. Quelques minutes plus tard, Ra’Kesh entre. Même l’air de la cellule semble lui faire place.'),
 say('rakesh','Tu préfères mourir maintenant, ou plus tard ?'),
 say('drunn','Je comprends votre colère. Mais une planète arrive pour conquérir Ænoria.','rakesh'),
 say('rakesh','Qui t’a donné ces informations ?'),
 say('drunn','Le Dompteur.','rakesh'),
 n('Ra’Kesh recule d’un pas. Personne ne prononcerait ce nom avec une telle assurance pour soutenir un mensonge.'),
 say('rakesh','Alors, qu’attends-tu de moi ?'),
 say('drunn','La paix. Et votre aide pour convaincre Vairon de cesser de vouloir tuer Kaïros.','rakesh'),
 say('rakesh','Leurs querelles m’indiffèrent. Je veux étendre mon territoire.'),
 n('Drunn regarde les chaînes, puis relève la tête. La solution que Kaïros lui demandait de trouver vient enfin de prendre forme.'),
 say('drunn','Si nous unissons les quatre clans, nous vaincrons les envahisseurs. La planète attaquante sera alors à vous. Toute une planète.','rakesh'),
 say('rakesh','Une planète… pour moi seul ?'),
 n('La colère laisse place à une joie presque enfantine. Ra’Kesh bondit, fait libérer Drunn et lui tend un talisman.'),
 say('rakesh','Un gage de ma reconnaissance. Montre-le à Vairon. Il comprendra.'),
 n('Drunn reçoit le Talisman des sables : un accessoire qui lui confère 10 points de chance.')
 ]},
 4:{title:'Rien ne meurt, tout refleurit',level:6,background:'aenoria-forest',enemies:['tykytil'],before:[
 n('Encore étourdi par les événements, Drunn quitte les Sables Éternels. Il a gagné un allié en promettant une planète qui ne lui appartient pas. Il espère ne pas avoir condamné Ænoria par cette promesse.'),
 n('Sur la route des Terres des flammes, une présence familière l’arrête : Tykytil, un ragondin de la Forêt. Drunn s’accroupit et tend la main pour le caresser.'),
 say('tykytil','Traître.'),
 n('La main de Drunn reste suspendue. Tykytil recule.'),
 say('tykytil','Lâche.'),
 say('drunn','Tu crois que j’ai abandonné la Forêt. Je voudrais t’expliquer, mais je n’ai pas le temps…','tykytil'),
 n('Drunn se détourne. Un bond rapide derrière lui, un cri : Tykytil lui saute dessus. Ce n’est pas une menace. Il veut le tuer.')
 ],after:[
 n('Le combat s’achève dans le silence. Drunn reste longtemps agenouillé près de Tykytil, puis creuse une tombe au pied d’un arbre.'),
 say('drunn','Pardonne-moi. Je ne savais pas comment te faire comprendre.','tykytil'),
 n('Il recouvre le corps de terre. Tykytil renaîtra parmi les arbres et les ronces : dans la Forêt de Valgheim, rien ne meurt. Tout refleurit.'),
 n('Drunn reprend son arc. À l’horizon, les Terres des flammes rougeoient.')
 ]},
 5:{title:'L’arène des flammes · Première épreuve',level:8,background:'aenoria-arena',enemies:['arenaSlime','arenaCorkbeau'],before:[
 n('Dès son arrivée, un faucon archer se pose sur sa route. Mystrial, serviteur de Vairon et combattant réputé, observe le voyageur sans un mot.'),
 say('drunn','Je dois rencontrer votre chef. Ra’Kesh m’a remis ceci.','mystrial'),
 n('Il présente le talisman. Mystrial ne tend pas la main.'),
 say('mystrial','Pour parler à Vairon, il faut être victorieux.'),
 n('Drunn saisit son arc. Mystrial secoue la tête.'),
 say('mystrial','Tu ne comprends pas. Trois combats, dans l’arène des flammes. Trois victoires. Alors seulement, tu seras entendu.'),
 say('drunn','Très bien. Qu’on en finisse.','mystrial'),
 n('Drunn descend dans l’arène. Le premier adversaire n’est pas un champion, mais deux créatures capturées : un Slime de combat et un Corkbeau.')
 ],after:[n('Les deux créatures s’effondrent. Drunn cherche son souffle, mais déjà une autre grille se lève. Dans l’ombre, deux gueules grondent à l’unisson.')]
 },
 6:{title:'L’arène des flammes · Les deux gueules',level:10,background:'aenoria-arena',enemies:['arenaDrannex'],boss:true,before:[
 n('Drannex entre dans l’arène. Ses deux têtes suivent Drunn, chacune guettant une ouverture différente. Un premier coup peut en cacher un second.'),
 say('drunn','Deux gueules… Très bien. Je garderai les deux en vue.','arenaDrannex'),
 n('Drunn recule d’un pas et encoche une flèche. La deuxième épreuve commence.')
 ],after:[n('Drannex cède enfin. Drunn avance lentement, inspectant les gradins. Une ombre passe au-dessus de lui.'),n('Depuis les cieux, Mystrial descend et se pose dans l’arène. Le dernier adversaire est arrivé.')]
 },
 7:{title:'L’arène des flammes · Le dernier brasier',level:11,background:'aenoria-arena',enemies:['mystrial'],boss:true,before:[
 say('mystrial','Je serai le dernier pilier entre toi et notre chef.'),
 say('drunn','Alors je passerai aussi celui-ci.','mystrial'),
 n('La chaleur monte. Les vêtements de Drunn prennent feu ; les flammes de l’arène ne s’éteindront pas pendant cette épreuve.'),
 say('mystrial','Une première flamme. Un instant pour rassembler mon énergie. Puis un brasier auquel peu survivent.'),
 n('Drunn serre son arc. Il peut vaincre Mystrial — ou tenir jusqu’à la fin de son troisième tour. Il faudra encore résister à la brûlure qui suivra.')
 ],after:[
 n('Un grondement interrompt l’arène. Vairon est là. D’un geste, il fait reculer Mystrial.'),
 say('vairon','Pourquoi es-tu venu ?'),
 n('Drunn, haletant, présente le Talisman des sables.'),
 say('vairon','Un être de la Forêt… qui a gagné le respect de Ra’Kesh ?'),
 n('Vairon serre le poing. Des roches volcaniques éclatent autour de lui. Puis tout s’apaise.'),
 say('vairon','Parle. Que souhaites-tu ?'),
 say('drunn','Faites la paix avec votre frère. Une menace approche d’Ænoria. Ra’Kesh accepte de nous soutenir, mais nous devons être unis.','vairon'),
 n('Vairon réfléchit. Les minutes passent, seulement troublées par le craquement des braises.'),
 say('vairon','J’accepte. Mais Kaïros répondra de ses actes. Les accusations concernant l’événement d’il y a un an ne disparaîtront pas.'),
 n('Drunn ignore de quel événement il parle. Il ne pose pas la question. Pour la première fois depuis son départ, il ose se sentir soulagé.'),
 n('Il quitte les Terres des flammes et rejoint le Dompteur. Sa mission n’a pas effacé les rancœurs, mais les clans acceptent enfin de regarder dans la même direction.'),
 say('dompteur','Tu as obtenu ce que la force seule n’aurait pas arraché. Je te nomme chef d’assaut, Drunn.'),
 say('drunn','Je serai prêt lorsque vous aurez besoin de moi.','dompteur'),
 n('La mission de Drunn est réussie. Mais pour combien de temps ?'),
 n('Fin — Le meilleur pisteur… ce sera moi !')
 ]}
};
const DRUNN_PROFILES={
 vargrom:{hp:222,dmg:10},osculus:{hp:240,dmg:23},rakesh:{hp:9999,dmg:9999},tykytil:{hp:250,dmg:21},
 arenaSlime:{hp:190,dmg:24},arenaCorkbeau:{hp:165,dmg:26},arenaDrannex:{hp:460,dmg:32},mystrial:{hp:950,dmg:96}
};
function drunnEnemies(stage){const m=DRUNN_MISSIONS[stage];return m.enemies.map((kind,i)=>{const p=DRUNN_PROFILES[kind],c=DRUNN_CAST[kind]??(kind==='arenaSlime'?{name:'Slime de combat',art:'slime'}:{name:'Corkbeau',art:'corkbeau'});return {id:'enemy'+i,type:kind==='arenaSlime'?'slime':kind==='arenaCorkbeau'?'corkbeau':'dog',storyKind:kind,name:c.name,art:c.art,level:m.level,hp:p.hp,maxHp:p.hp,dmg:p.dmg,baseDmg:p.dmg,speed:kind==='tykytil'?28:0,boss:!!m.boss,powerUsed:false,powerBonus:0,burning:false};});}
function drunnIntent(b){if(b.storyKey!=='drunn')return null;const e=b.enemies.find(e=>e.hp>0);if(!e)return null;if(e.storyKind==='mystrial')return {title:['Boule de feu · 120 %','Concentration · aucune attaque','Énorme giga boule de feu · 250 %'][Math.min(2,b.round-1)],text:'Survivez au tour 3 et à sa brûlure, ou vainquez Mystrial avant. Brûlure permanente : 5 % des PV max par tour.'};if(e.storyKind==='tykytil')return {title:'Protection de la forêt',text:b.round%2?'Ce tour : attaque à 110 %. Aucun cumul.':'Ce tour : récupère 10 % de ses PV max, puis attaque normalement.'};return null;}

return {DRUNN_CAST,DRUNN_CHAPTER,DRUNN_MISSIONS,DRUNN_PROFILES,drunnEnemies,drunnIntent};
})();
modules["rift.mjs"]=(()=>{
const {grantShield,shieldTotal}=modules["mastery.mjs"];
// Fissure encounters are fixed by floor, independent of the chosen companion.
const RIFT_LEVEL=8,RIFT_FLOORS=50;
const RIFT_CREATURES={
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
const riftCleared=s=>Math.max(0,Math.min(50,Math.floor(s.rift?.cleared??0)));
const riftReplays=(s,floor)=>Math.min(5,Math.max(0,Math.floor(Number(s.rift?.replays?.[floor])||0)));
const riftUnlocked=s=>!!s.hero&&s.hero.level>=RIFT_LEVEL;
function riftFloor(n){
 if(!Number.isInteger(n)||n<1||n>50)throw Error('Étage de la Fissure invalide.');
 const depth=Math.floor((n-1)/10),boss=n%10===0,mini=!boss&&n%5===0,level=Math.min(50,n+8);
 return {number:n,depth,level,boss,mini,kinds:ROUTES[depth][(n-1)%10],gold:(boss?[35,70,90,135,750]:[15,25,45,80,150])[depth],replayGold:(boss?[10,20,35,80,0]:[5,7,15,45,75])[depth],replayable:n!==50,name:boss?'Draconoros':mini?'Gardien de la Fissure':['Le seuil','Les profondeurs','Les oubliés','L’abîme','Le cœur du Néant'][depth]};
}
function makeRiftEnemy(kind,floor,index,count=1){
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
const riftEnemies=n=>{const f=riftFloor(n);return f.kinds.map((k,i)=>makeRiftEnemy(k,n,i,f.kinds.length));};
function riftIntent(e,b){
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
function riftDirectDamage(b,e,damage,fromHero){
 if(!e.rift)return damage;
 if(e.riftKind==='moth'&&e.rift.ward){e.rift.ward=false;damage=Math.max(1,Math.round(damage*.5));}
 if(fromHero)for(const id of Object.keys(b.riftAttraction??{}))b.riftAttraction[id]=Math.max(0,b.riftAttraction[id]-1);
 const actual=Math.min(e.hp,Math.max(0,damage-shieldTotal(e,b.round)));
 if(e.riftKind==='pain'&&e.rift.open)e.rift.stored=Math.min(Math.round(e.dmg*.9),e.rift.stored+Math.round(actual*.35));
 return damage;
}
function riftEnemyTurn(b,e,ctx){
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

return {RIFT_CREATURES,RIFT_FLOORS,RIFT_LEVEL,makeRiftEnemy,riftCleared,riftDirectDamage,riftEnemies,riftEnemyTurn,riftFloor,riftIntent,riftReplays,riftUnlocked};
})();
modules["stibili-chapter2.mjs"]=(()=>{
const n=(text,extra={})=>({speaker:null,text,...extra});
const d=(speaker,text,other='stibili',extra={})=>({speaker,text,other,...extra});
const STIBILI_VOID_CAST={
 voidbeing:{name:'L’Être du Néant',art:'etre-neant',kind:'beast'},
 voidlarva:{name:'Larve du Néant',art:'larve-neant',kind:'beast'},
 yula:{name:'Yula',art:'yula',kind:'human'},
 ozvek:{name:'Ozvek',art:'ozvex',kind:'beast'}
};
const STIBILI_CHAPTER2={title:'Chapitre 2 — Un mage dans le Néant',description:'Privé de sa magie, Stibili découvre un lieu qui semble le reconnaître. Une rencontre y changera bien plus que son apparence.',nextTitle:'Extinction d’une planète à lui seul'};
const STIBILI_CHAPTER2_MISSIONS={
 1:{title:'Intrusion',enemies:['voidbeing'],background:'void',sealed:true,before:[
  n('Stibili tombe. Dans quelque chose. Quelque part. Le passage ouvert au-dessus de Dyzeria s’est refermé, emportant avec lui la dernière lumière.'),
  n('Le choc lui coupe le souffle. Sous ses mains, un sol froid et lugubre s’étend dans une obscurité sans horizon.'),
  d('stibili','Où… suis-je ? Je ne ressens plus l’énergie d’Ozvek. Rien. Pas même une trace.'),
  n('Il avance à tâtons. Une silhouette se détache soudain des ténèbres. Elle était peut-être là depuis le début.'),
  d('stibili','Vous ! Quel est cet endroit ? Comment est-ce que je peux en sortir ?','voidbeing'),
  d('voidbeing','…'),
  n('Stibili lève la main. Une formule familière se dessine dans son esprit : une Boule de feu. Mais au bout de ses doigts, rien ne vient.'),
  d('stibili','Non… Pourquoi est-ce que ça ne fonctionne pas ?','voidbeing'),
  n('Il court. Cherche une issue, une paroi, une lumière. Tout demeure obscur. Puis la même silhouette apparaît devant lui, sans un bruit.'),
  d('voidbeing','Intrusion.'),
  d('stibili','Je ne voulais pas venir ici !','voidbeing'),
  n('Une orbe ténébreuse se forme. Stibili serre les poings : sa magie ne lui répond plus.')
 ],after:[
  n('Stibili s’effondre. Il tente encore d’appeler sa magie, mais ne trouve que le vide.'),
  d('stibili','Je… ne peux pas…'),
  n('Un portail s’ouvre sous lui. Le sol disparaît. Il tombe de nouveau, pendant de longues secondes qui lui semblent interminables.'),
  n('Cette fois, il atterrit sur une plateforme circulaire. Un pont étroit s’en éloigne. À son extrémité, une femme l’attend.'),
  d('yula','Relève-toi, voyageur.')
 ]},
 2:{title:'La marque de Yula',enemies:['voidbeing'],background:'void',boss:true,before:[
  d('stibili','Où m’avez-vous amené ?','yula'),
  d('yula','Tu es dans le Néant. Et tu ne devrais pas utiliser ta capacité à voyager comme bon te semble.'),
  d('stibili','Je n’en savais rien. Je cherchais seulement à m’échapper…','yula'),
  d('yula','Il ne sait donc pas que c’est lui qui l’a créé…','stibili',{whisper:true}),
  d('stibili','Qu’avez-vous dit ?','yula'),
  n('Yula lève la main. Stibili se raidit, puis convulse. Une force inconnue se referme autour de son cœur.'),
  d('yula','Tu vas vaincre l’Être du Néant.'),
  d('stibili','Vous ne comprenez pas ! Je ne peux plus utiliser ma magie !','yula'),
  n('Elle s’approche, relève le bord de son chapeau et effleure son visage. Une griffe lui entaille légèrement la joue.'),
  d('yula','Alors apprends à écouter autre chose.'),
  n('Tout s’assombrit. Quand Stibili regarde ses mains, elles ne sont plus les mêmes. Le Néant a changé son corps. Son cœur le déchire ; des cris résonnent dans sa tête.',{voidForm:true}),
  d('stibili','Ces voix… Faites-les taire…','yula'),
  d('yula','Lève les yeux.'),
  n('L’Être du Néant se tient devant lui. Une puissance étrangère circule dans ses veines. Cette fois, ses sorts répondent.'),
  d('stibili','Je ne sais pas ce que vous m’avez fait… mais je refuse de tomber encore.','voidbeing')
 ],after:[
  n('La créature se dissipe. Stibili laisse échapper un long soupir. Il tient à peine debout.'),
  d('yula','Tu as réussi. Mais il te reste encore beaucoup de choses à affronter.'),
  d('stibili','Attendez… Ces voix, mon cœur…','yula'),
  n('Yula claque des doigts. La plateforme, le pont et sa silhouette disparaissent.'),
  n('Stibili se retrouve là où il était tombé la première fois. Toujours cette obscurité. Aucun signe de vie. Aucune trace de l’Être du Néant.'),
  d('stibili','Elle m’a renvoyé ici… Et cette créature a disparu.')
 ]},
 3:{title:'Ce qui rampe dans l’ombre',enemies:['voidlarva','voidlarva','voidlarva'],background:'void',before:[
  n('Quelques pas suffisent. Un froissement se propage dans les ténèbres, puis un autre, plus proche.'),
  n('Trois petites créatures émergent de l’ombre. Leurs corps semblent faits de la même matière que celle qui habite désormais Stibili.'),
  d('stibili','Des Larves… Elles viennent vers moi.','voidlarva'),
  n('Les trois Larves du Néant bondissent.')
 ],after:[
  n('Le silence revient. Avant que la dernière Larve ne se dissipe, Stibili referme une prison de magie autour d’elle.'),
  d('stibili','Pas si vite. Cette énergie… Je peux la comprendre.','voidlarva'),
  n('La Larve se contracte, puis disparaît entre ses doigts. Son pouvoir trouve une place dans les veines du mage.'),
  d('stibili','Je peux l’appeler. Lui donner une forme… et la faire combattre à mes côtés.'),
  n('Compétence obtenue : Larve du Néant.'),
  n('Stibili observe ses mains. Le pouvoir de la créature circule sous sa peau. Il ne sait plus où sa propre magie s’arrête.'),
  n('Yula réapparaît dans l’obscurité. Elle claque des doigts, et le Néant s’efface.')
 ]},
 4:{title:'Le dernier saut de Dyzeria',enemies:['ozvex'],background:'mountain',boss:true,before:[
  n('L’air frappe son visage. Le ciel de Dyzeria s’étend au-dessus de lui. Stibili reconnaît les reliefs, les pierres… et l’énergie qu’il avait perdue de vue.'),
  d('ozvek','Toi…'),
  d('stibili','Ozvek. Encore vous.','ozvek'),
  n('Le Faucon-Dragon déploie ses ailes. Stibili sent la Larve remuer dans sa magie, prête à répondre à son appel.'),
  d('stibili','Cette fois, je ne suis pas revenu les mains vides.','ozvek')
 ],after:[
  n('Ozvek vacille, puis disparaît. Son énergie vitale s’arrache au sol et s’élève vers une présence immense.'),
  n('Son Navigateur absorbe cette force. Un rugissement traverse Dyzeria. La planète entière tremble.'),
  d('stibili','Non… Il faut que je parte. Maintenant.'),
  n('Il dessine son tube spatial. Le geste est exact, la formule familière. Pourtant, aucun passage ne s’ouvre.'),
  d('stibili','Pourquoi ?!'),
  n('Des projectiles déchirent les cieux. Stibili court, esquive, trébuche, se relève. La terre éclate derrière lui.'),
  n('Devant, une falaise. Le vide s’ouvre, immensément grand. Derrière, les impacts se rapprochent.'),
  d('stibili','Tant pis.'),
  n('Il saute.'),
  n('Pendant sa chute, il aperçoit enfin la silhouette du Navigateur : immense, imposante, terriblement puissante. Il détourne les yeux. Il doit survivre à l’impact.'),
  n('L’eau se referme sur lui. Pendant plusieurs secondes, il ne perçoit que le froid et le grondement sourd des profondeurs.'),
  n('Puis Stibili remonte à la surface, à bout de souffle. Plus de projectile. Plus de rugissement. Aucun signe d’une menace.'),
  d('stibili','Je suis… encore là.'),
  n('Fin du chapitre 2 — Un mage dans le Néant.')
 ]}
};

return {STIBILI_CHAPTER2,STIBILI_CHAPTER2_MISSIONS,STIBILI_VOID_CAST};
})();
modules["kaerune-story.mjs"]=(()=>{
const n=text=>({speaker:null,text});
const d=(speaker,text,other='kaerune')=>({speaker,text,other});
const KAERUNE_CAST={
 kaerune:{name:'Kaerune',art:'kaerune',kind:'winged'},
 nyurune:{name:'Nyurune',art:'nyurune',kind:'winged'},
 seraphyne:{name:'Séraphyne',art:'seraphyne',kind:'winged'},
 umbraelys:{name:'Umbraelys',art:'umbraelys-discussion',combatArt:'umbraelys',kind:'bust'},
 eliandris:{name:'Éliandris',art:'eliandris-discussion',combatArt:'eliandris',kind:'bust'},
 zyrael:{name:'Zyraël',art:'zyrael',kind:'throne'},
 thyur:{name:'Thyur, le démon des laves',art:'thyur',kind:'beast'},
 cobra:{name:'Cobra des laves',art:'cobra-lave',kind:'beast'},
 wilddog:{name:'Chien sauvage',art:'chien-sauvage',kind:'beast'}
};
const KAERUNE_CHAPTER={title:'Chapitre 1 — La relève',description:'Sur Harmony, Kaerune apprend à protéger ceux qu’elle aime. Mais la guerre n’attendra pas qu’elle soit prête.',nextTitle:'L’ombre du Sceau'};
const KAERUNE_MISSIONS={
 1:{title:'Dans l’ombre d’une maîtresse',enemies:['seraphyne'],lesson:'first',background:'harmony-forest',before:[
 n('On raconte qu’une Déesse donna la vie à Harmony. Là où il n’y avait que de la matière et du silence, elle fit naître un monde et trois peuples : les Humains, les Hybrides et les Démons de lave.'),
 n('Les Humains inventaient, bâtissaient et transformaient la planète. Les Hybrides cherchaient dans la magie les moyens d’établir une paix durable. Les Démons de lave mettaient leur force incommensurable au service des autres peuples.'),
 n('Après avoir créé la vie, la Déesse façonna le Sceau brisé : une sphère capable de préserver l’énergie vitale d’une entité jusqu’à ce qu’elle retrouve ses forces. Puis elle s’y enferma.'),
 n('Des milliers d’années passèrent sans qu’elle en sorte. Lorsque Harmony eut besoin d’une protectrice, Zyraël apparut : une Navigatrice chargée de veiller sur toute vie et sur le Sceau brisé.'),
 n('Mais les Démons de lave réclamaient toujours plus de terres. Les anciens protecteurs devinrent des conquérants. Les Humains se retranchèrent ; les combattantes et magiciennes hybrides tinrent les frontières.'),
 n('Parmi elles, Séraphyne repoussa les assauts pendant de longues années. Une grave blessure finit pourtant par lui arracher une partie de ses pouvoirs. Il lui fallait préparer la relève.'),
 n('Dans une clairière, Kaerune déploie ses bras-ailes. Elle est jeune. Le potentiel que sa maîtresse perçoit en elle ne suffit pas encore à faire taire son inquiétude.'),
 d('kaerune','Tu pourrais choisir quelqu’un qui a déjà combattu les Démons de lave.','seraphyne'),
 d('seraphyne','Je pourrais. Mais je ne t’ai pas choisie parce que tu étais prête. Je t’ai choisie parce que tu peux le devenir.'),
 d('kaerune','Alors je vais te montrer ce que je sais faire.','seraphyne'),
 d('seraphyne','Viens. Et regarde bien : la première leçon risque d’être courte.')
 ],after:[
 n('Kaerune n’a pas vu le coup partir. Elle reprend son souffle dans l’herbe, les plumes en désordre. Séraphyne s’est déjà arrêtée.'),
 d('kaerune','Même blessée… Je n’ai pas tenu une seconde.','seraphyne'),
 d('seraphyne','Tu as regardé l’endroit que tu voulais atteindre. Pas celle qui t’empêchait d’y aller.'),
 d('kaerune','Si c’est moi, la relève, on a un problème.','seraphyne'),
 n('Une ombre ailée s’étend sur la clairière. Zyraël s’approche sans bruit. Kaerune se redresse aussitôt.'),
 d('zyrael','Tu compares ton premier pas au chemin qu’elle a parcouru toute sa vie.'),
 d('kaerune','Et si je n’y arrivais jamais ?','zyrael'),
 d('zyrael','Alors tu recommenceras demain. Travaille avec constance, Kaerune. Tu pourrais devenir plus forte que n’importe laquelle d’entre nous.'),
 n('Kaerune regarde les traces laissées dans l’herbe. Sa honte n’a pas disparu. Mais, cette fois, elle y voit aussi un point de départ.'),
 d('kaerune','D’accord. Demain, je verrai le coup venir.','seraphyne')
 ]},
 2:{title:'Une promesse entre les arbres',enemies:['wilddog','wilddog'],background:'harmony-forest',before:[
 n('Quelques jours plus tard, Nyurune entraîne sa sœur sur les sentiers de la forêt. Le camp disparaît derrière les arbres, avec ses exercices et ses regards impatients.'),
 d('nyurune','Tu marches comme si Séraphyne allait surgir d’un buisson.'),
 d('kaerune','Elle en serait capable.','nyurune'),
 d('nyurune','Moi, un jour, je ferai partie de l’élite. Les missions lointaines, les frontières… On ne se verra presque plus.'),
 n('Nyurune essaie de sourire. Kaerune ralentit.'),
 d('kaerune','Tu dis ça comme si tu avais déjà fait tes adieux.','nyurune'),
 d('nyurune','Je dis ça parce qu’il faut bien grandir.'),
 d('kaerune','Alors on grandira. Mais je trouverai du temps pour toi. Même si je dois traverser toute Harmony.','nyurune'),
 n('Un grognement coupe leur conversation. Deux chiens sauvages sortent des fougères. Le premier montre les crocs ; le second cherche à les contourner.'),
 d('nyurune','À gauche, Kaerune ! Ne les laisse pas t’encercler.'),
 d('kaerune','Je les ai vus. Reste près de moi.','nyurune')
 ],after:[
 n('Le dernier chien s’effondre. Kaerune attend quelques secondes avant de replier ses ailes. Une éraflure rougit son flanc.'),
 d('nyurune','Depuis quand tu bouges comme ça ?'),
 d('kaerune','Depuis que ma maîtresse m’a plantée dans l’herbe.','nyurune'),
 d('nyurune','Je suis sérieuse. Tu étais… différente.'),
 d('kaerune','Je tremblais. J’ai juste essayé de ne pas m’arrêter.','nyurune'),
 n('Au retour au camp, Umbraelys aperçoit le sang avant même que Kaerune puisse parler.'),
 d('umbraelys','Qu’est-ce qui s’est passé ? Qui t’a fait ça ?'),
 d('kaerune','Deux chiens. C’est une égratignure, je te promets.','umbraelys'),
 d('umbraelys','Une égratignure aujourd’hui. La prochaine fois, tu ne décideras pas de la profondeur de la blessure.')
 ]},
 3:{title:'Rester debout',enemies:['umbraelys'],background:'harmony-forest',before:[
 n('Umbraelys vérifie le bandage de Kaerune, puis l’emmène à l’écart des tentes. Son inquiétude a pris un ton plus ferme.'),
 d('umbraelys','Une grande combattante doit savoir frapper. Elle doit surtout savoir revenir.'),
 d('kaerune','Si je recule à chaque attaque, je ne gagnerai jamais.','umbraelys'),
 d('umbraelys','Esquiver, ce n’est pas fuir. C’est obliger l’autre à dépenser sa force dans le vide.'),
 d('kaerune','Et s’il ne me laisse pas la place ?','umbraelys'),
 d('umbraelys','Tu la crées. Observe mes appuis. Ne cours pas après le premier coup.'),
 n('Umbraelys prend position. Dans son regard, Kaerune retrouve la même attention inquiète, désormais cachée derrière celle d’une combattante.')
 ],after:[
 n('Umbraelys refuse de céder une première fois. Un souffle, un dernier appui… puis Kaerune trouve l’ouverture. L’exercice s’arrête enfin.'),
 d('umbraelys','Assez. Tu as gagné.'),
 d('kaerune','Je t’ai fait mal ?','umbraelys'),
 d('umbraelys','Non. Mais ta force augmente à vue d’œil. Il va falloir apprendre à la connaître aussi vite qu’elle grandit.'),
 n('Le soir, Kaerune s’installe près du feu, contre Nyurune. Les conversations s’éteignent une à une. Sa sœur, elle, reste éveillée.'),
 d('nyurune','Les éclaireuses ont vu de nouvelles lueurs dans les montagnes. Les Démons de lave se réveillent.'),
 d('kaerune','Séraphyne nous préviendra si le danger approche.','nyurune'),
 d('nyurune','Elle ne peut plus tout porter. C’est ça qui me fait peur.'),
 n('Kaerune ne trouve pas de réponse. Elle rapproche une aile de sa sœur et reste là jusqu’à ce que Nyurune s’endorme.')
 ]},
 4:{title:'Le pas qui manque',enemies:['seraphyne'],lesson:'second',background:'harmony-forest',before:[
 n('À l’aube, Séraphyne attend déjà dans la clairière. Kaerune a peu dormi. Les paroles de Nyurune lui reviennent à chaque battement d’ailes.'),
 d('seraphyne','Tu as quelque chose à me demander.'),
 d('kaerune','Quand saurai-je que je suis prête ?','seraphyne'),
 d('seraphyne','Ce n’est pas le genre de réponse que je peux te donner à ta place.'),
 d('kaerune','Alors ne retiens pas tes coups.','seraphyne'),
 d('seraphyne','Je les retiendrai assez pour que tu puisses apprendre. À toi de m’obliger à faire attention.'),
 n('Cette fois, Kaerune voit le premier mouvement. Elle garde les yeux sur sa maîtresse et entre dans le combat.')
 ],after:[
 n('Kaerune a tenu. Elle a même forcé Séraphyne à changer d’appui. Pourtant, quand sa maîtresse referme la distance, Kaerune se retrouve une nouvelle fois au sol.'),
 d('kaerune','J’étais si près…','seraphyne'),
 d('seraphyne','Oui. Et tu as voulu finir avant d’avoir préparé la fin.'),
 d('kaerune','Il fallait que j’attaque plus vite ?','seraphyne'),
 d('seraphyne','Il fallait que tu saches pourquoi tu attaquais. Va voir Éliandris. Elle te parlera de technicité mieux que moi.'),
 n('Séraphyne attend que Kaerune s’éloigne pour relâcher son épaule blessée. Pour la première fois depuis longtemps, son sourire n’a rien de forcé.')
 ]},
 5:{title:'La lumière entre deux gestes',enemies:['eliandris'],background:'harmony-forest',before:[
 n('Éliandris écoute Kaerune raconter le combat sans l’interrompre. Quand elle répond, sa voix est calme, presque douce.'),
 d('eliandris','Tu décris chacun de tes coups. Tu ne m’as pas encore parlé d’une seule décision.'),
 d('kaerune','Je voulais la toucher avant qu’elle me touche.','eliandris'),
 d('eliandris','C’est un désir. Une décision, c’est choisir quand tu acceptes d’attendre.'),
 d('kaerune','Attendre devant quelqu’un qui veut me frapper ?','eliandris'),
 d('eliandris','Parfois. Se préparer, observer, reprendre son appui… Un geste sans attaque peut décider du suivant.'),
 n('Une lumière pâle glisse sur les plumes d’Éliandris. Les petites marques de ses exercices précédents s’effacent.'),
 d('eliandris','Ma lumière me soigne à chaque tour. Elle réagit aussi aux coups critiques et aux frappes de ta seconde action de vitesse. Frapper plus souvent n’est donc pas toujours la solution.'),
 d('kaerune','Il faut que mes coups comptent plus que ce que tu récupères.','eliandris'),
 d('eliandris','Voilà une décision. Maintenant, essaie.')
 ],after:[
 n('La lumière revient, mais Kaerune cesse de la poursuivre coup après coup. Elle prépare son enchaînement, attend l’ouverture et s’y engage tout entière.'),
 d('eliandris','Tu as compris. La technique ne remplace pas la force. Elle lui donne une direction.'),
 d('kaerune','J’avais peur qu’en prenant mon temps, je perde celui des autres.','eliandris'),
 d('eliandris','Souviens-toi de cette peur. Mais ne la laisse pas choisir tous tes gestes.'),
 n('Kaerune quitte la clairière en répétant mentalement le mouvement. Pour une fois, elle ne cherche pas à aller plus vite.')
 ]},
 6:{title:'À la hauteur de ma sœur',enemies:['nyurune'],background:'harmony-forest',before:[
 n('Au milieu de l’après-midi, Nyurune barre le chemin de Kaerune. Ses ailes sont déployées et son sourire a quelque chose de provocateur.'),
 d('nyurune','Tout le camp parle de tes progrès. Il paraît qu’on ne peut plus te suivre.'),
 d('kaerune','Tout le camp ? Umbraelys a encore parlé ?','nyurune'),
 d('nyurune','Peut-être. Mais j’ai quelques années d’expérience à défendre. Fais-moi une place dans ton programme.'),
 d('kaerune','Tu veux un défi ?','nyurune'),
 d('nyurune','Je veux vérifier que tu n’oublieras pas ta sœur quand tu seras une prodige.'),
 d('kaerune','Ça, tu n’as pas besoin de me battre pour le vérifier.','nyurune')
 ],after:[
 n('Nyurune reste un instant immobile, encore surprise par le dernier enchaînement. Puis elle laisse échapper un rire incrédule.'),
 d('nyurune','Toutes ces années à te montrer comment faire… et maintenant, c’est moi qui n’arrive plus à suivre.'),
 d('kaerune','Tu m’as justement montré comment faire.','nyurune'),
 d('nyurune','N’essaie pas d’être gentille. Ça rend ma défaite encore pire.'),
 n('Kaerune s’apprête à répondre lorsqu’une explosion secoue le camp. Au-delà des tentes, les arbres s’embrasent.'),
 d('nyurune','Kaerune, avec moi !'),
 n('Une seconde déflagration coupe le passage. Des silhouettes courent dans la fumée. Quand Kaerune retrouve son équilibre, elle ne voit plus sa sœur.'),
 d('kaerune','Nyurune ! Réponds-moi !','nyurune')
 ]},
 7:{title:'Celle qu’ils craignent',enemies:['cobra'],boss:true,background:'harmony-fire',before:[
 n('La forêt n’a plus d’odeur que celle de la cendre. Kaerune suit les appels, cherche un passage entre les flammes, puis s’immobilise devant un sifflement.'),
 n('Un Cobra des laves se dresse au milieu du sentier. Sa chair semble couler entre ses écailles. Une magie étrangère dirige chacun de ses mouvements : celle des Démons de lave.'),
 d('cobra','Kaerune. Enfin.'),
 d('kaerune','Où est ma sœur ?','cobra'),
 d('cobra','Tu n’auras plus à t’en soucier. Mes maîtres m’envoient supprimer une menace avant qu’elle ne grandisse.'),
 d('kaerune','Ils ont brûlé notre camp… pour moi ?','cobra'),
 d('cobra','Une jeune aile se brise plus facilement. Ils ont décidé de ne pas attendre.'),
 n('Kaerune recule d’un pas. La peur est là, entière. Puis elle pense à la clairière, au feu de la veille, à la promesse faite entre les arbres.'),
 d('kaerune','Alors ils auraient dû venir eux-mêmes.','cobra')
 ],after:[
 n('Le Cobra s’affaisse. Le feu qui courait entre ses écailles se disperse dans la terre. Kaerune reste debout juste assez longtemps pour s’assurer qu’il ne bouge plus.'),
 d('kaerune','Nyurune… Je suis là…'),
 n('Ses jambes cèdent. Elle tombe loin des flammes, incapable d’appeler une seconde fois.'),
 n('Plusieurs heures passent. Nyurune finit par retrouver sa sœur parmi les troncs noircis. Elle se penche, écoute son souffle, puis ferme les yeux de soulagement.'),
 d('nyurune','Tu avais promis qu’on trouverait du temps. Ne commence pas à tricher.'),
 n('Nyurune ramène Kaerune dans la cité principale. Lorsqu’elle apprend l’attaque, Zyraël quitte son trône et se rend elle-même au domaine des Démons de lave.'),
 d('zyrael','Votre créature a attaqué notre camp. Vous allez faire cesser ces agressions. Maintenant.','thyur'),
 d('thyur','La colère a débordé nos frontières. Elle ne les franchira plus.','zyrael'),
 d('zyrael','Harmony vous a donné une place. Je refuse de croire que vous ne puissiez y vivre qu’en détruisant celle des autres.','thyur'),
 d('thyur','Alors laissez-nous vous le prouver.','zyrael'),
 n('Zyraël choisit de leur laisser cette chance. Elle regagne le trône de sa cité, décidée à protéger la paix autant que les êtres qui en dépendent.'),
 n('Quand les dernières traces de sa présence disparaissent, Thyur se tourne vers les profondeurs de son domaine.'),
 d('thyur','Elle nous fait encore confiance. Préparez l’assaut.',null),
 d('thyur','Notre réplique du Sceau brisé retiendra la Navigatrice. Et cette fois, Kaerune ne nous échappera pas.',null),
 n('Dans la cité, Kaerune dort encore. Nyurune veille près d’elle. Aucune des deux ne sait ce qui vient d’être décidé.'),
 n('Fin du chapitre 1 — La relève.')
 ]}
};

// The coda leaves the battlefield: neutral light for the city, embers for Thyur’s domain.
KAERUNE_MISSIONS[7].after=KAERUNE_MISSIONS[7].after.map((frame,i)=>i<6?frame:{...frame,background:[6,7,8,9,11,12,13].includes(i)?'harmony-fire':'harmony-sanctuary'});

return {KAERUNE_CAST,KAERUNE_CHAPTER,KAERUNE_MISSIONS};
})();
modules["stibili-story.mjs"]=(()=>{
const n=text=>({speaker:null,text});
const d=(speaker,text,other='stibili',effect='')=>({speaker,text,other,effect});
const STIBILI_CAST={
 stibili:{name:'Stibili',art:'stibili',kind:'mage'},
 slime:{name:'Slime de combat',art:'slime',kind:'beast'},
 mite:{name:'La Mite du Néant',art:'mite-neant',kind:'beast'},
 kappiouteau:{name:'Kappiouteau',art:'kappiouteau',kind:'human'},
 maella:{name:'Maëlla',art:'maella',kind:'human'},
 maella2:{name:'Maëlla',art:'maella-forme-2',kind:'human'},
 ozvex:{name:'Ozvex',art:'ozvex',kind:'beast'}
};
const STIBILI_CHAPTER={title:'Chapitre 1 — Naissance d’un mage',description:'Né d’une étoile, Stibili traverse les mondes à la recherche de nouveaux sorts. Mais certaines découvertes attirent des regards qu’il vaudrait mieux éviter.',nextTitle:'Un mage dans le Néant'};
const STIBILI_MISSIONS={
 1:{title:'Une étoile dans l’herbe',enemies:['slime'],background:'meadow',before:[
 n('Au cœur d’une étoile, quelque chose ouvre les yeux. Ce n’est ni un Navigateur ni une créature façonnée par l’un d’eux. C’est une anomalie.'),
 n('Une étincelle s’arrache à l’astre, traverse le ciel d’une planète inconnue et s’écrase dans une prairie. Au fond du cratère, un petit mage se relève.'),
 d('stibili','Deux mains. Une tête. Une chute manifestement mal calculée… Bon. Je suis vivant.'),
 n('Des masses gélatineuses bondissent entre les herbes. L’une d’elles se rapproche, puis se jette sur lui.'),
 d('stibili','Reste où tu es. Je ne sais pas encore ce que tu es… et je ne tiens pas à l’apprendre de l’intérieur.','slime'),
 n('Instinctivement, Stibili trace une spirale. L’air s’enroule autour de ses doigts. Il peut lui donner une forme. Il peut créer un sort.'),
 d('stibili','Une idée, un mouvement… et le vent obéit. Voilà qui mérite une expérience.','slime')
 ],after:[d('stibili','La forme se défait, mais il reste quelque chose. Une trace. Une façon de faire circuler l’énergie.'),n('Stibili retient chaque détail. Il ne connaît ni le nom de cette planète ni celui de la force qui l’habite. Pourtant, pour la première fois, il sait ce qu’il veut : des sorts. Tous ceux qu’il pourra comprendre.')]},
 2:{title:'Le laboratoire des Slimes',enemies:['slime','slime'],background:'meadow',before:[
 n('Les saisons passent. Stibili grandit sur cette planète peuplée de Slimes. Il observe, affronte, recommence. Les traces laissées par ses adversaires deviennent des formules qu’il conserve avec soin.'),
 d('stibili','Même espèce, même bond… mais pas la même circulation d’énergie. Rien ne doit être tenu pour acquis.','slime'),
 n('Deux Slimes approchent. Le mage ferme son carnet et l’éloigne des éclaboussures.'),d('stibili','Très bien. Une dernière vérification. Et personne ne touche à mes notes.','slime')
 ],after:[
 n('À force d’étudier ces traces, Stibili distingue une énergie qui traverse les êtres et les mondes : l’Énergie Astrale. Quelque part, elle semble manquer. Comme si on l’aspirait.'),
 d('stibili','Ce courant vient de plus loin que le ciel. Si je le plie sans le rompre… je peux fabriquer un passage.'),
 n('Il dessine un tube spatial. La prairie se déforme autour d’une ouverture étroite.'),d('stibili','Je reviendrai peut-être. Quand vous aurez inventé autre chose que bondir.')
 ]},
 3:{title:'Ce qui rôde entre les mondes',enemies:['mite'],background:'space',before:[
 n('Le tube spatial se referme derrière Stibili. Les étoiles s’étirent en lignes pâles. Puis une ombre ailée se détache du vide.'),d('stibili','Une créature ici ? Impossible… Non. Mauvaise habitude : rien n’est impossible avant d’avoir été vérifié.','mite'),
 n('La Mite du Néant gratte la paroi du passage. À chaque battement, le sort tremble.'),d('stibili','Tu ne t’intéresses pas à moi. Tu regardes le passage. C’est presque plus inquiétant.','mite')
 ],after:[n('La Mite s’éloigne. Stibili resserre aussitôt son tube spatial, sans attendre de savoir si elle compte revenir.'),d('stibili','À noter : les raccourcis ont des habitants. Éviter de leur laisser le temps de réfléchir.'),n('Une traînée obscure reste suspendue dans le passage. Stibili en reproduit la courbure : un minuscule trou noir se forme entre ses doigts.'),d('stibili','Attirer. Enfermer. Puis relâcher… Juste assez longtemps pour garder une longueur d’avance. Je vais appeler cela Attraction.'),n('Nouvelle compétence obtenue : Attraction. Stibili peut emprisonner un adversaire dans le Néant et lui faire perdre sa prochaine action.'),n('Le passage débouche sur le pont d’un bateau, au large d’une planète dont il ignore le nom. Une odeur de sel remplace celle des étoiles.')]},
 4:{title:'Le pirate et le collectionneur',enemies:['kappiouteau'],background:'pirate',potionReward:true,before:[
 d('kappiouteau','Doucement, petit voyageur. Tu es sur mes terres… enfin, sur mon pont. Repars gentiment, et nous éviterons les ennuis.'),
 d('stibili','Tu tiens un sabre en flammes et tu me demandes de te croire sur parole ?','kappiouteau'),
 d('kappiouteau','Je pourrais aussi te demander pourquoi tu surgis au milieu de mon bateau.'),d('stibili','Je cherche des sorts. Le feu que tu contrôles m’intéresse.','kappiouteau'),
 d('kappiouteau','Alors il va falloir tenir debout assez longtemps pour le regarder !'),d('stibili','Une démonstration hostile. Ce sont souvent les plus précises.','kappiouteau')
 ],after:[
 d('kappiouteau','Ça suffit ! Je m’avoue vaincu. Je ne suis pas de taille contre toutes tes magies bizarres.'),d('stibili','Tu abandonnes vite. Où est le piège ?','kappiouteau'),
 d('kappiouteau','Dans ta tête, apparemment. Tiens, une potion de soin. Tu l’as gagnée.'),n('Kappiouteau tend une fiole. Une Potion de soin est ajoutée au sac de Stibili : elle rend 20 % des PV max en combat, sans consommer son action.'),
 d('stibili','Je vérifierai son contenu. Mais… merci.','kappiouteau'),d('kappiouteau','Si tu poursuis ta chasse aux sorts, évite les Navigateurs. Ils lèvent des armées et se battent pour l’Énergie Astrale. Depuis qu’elle disparaît, personne ne sait s’arrêter.'),
 d('stibili','Quelqu’un aspire l’énergie, et eux se disputent ce qui reste… Charmante méthode.','kappiouteau'),n('Stibili retient la mise en garde. Puis il ouvre un nouveau passage, vers une planète de glace.')
 ]},
 5:{title:'La passagère clandestine',enemies:['mite'],background:'space',before:[
 n('Le tube spatial s’allonge entre deux mondes. Une silhouette familière remonte le courant.'),d('stibili','Encore toi. Ce n’est donc pas un territoire. Tu suis quelque chose.','mite'),
 n('La Mite du Néant frappe la paroi, exactement là où le passage brille le plus.'),d('stibili','Je poserai mes questions après. Pour l’instant, éloigne-toi de mon sort.','mite')
 ],after:[n('Stibili quitte le tube. Un vent glacé le frappe de plein fouet.'),d('stibili','Il fait drôlement froid. J’aurais dû inventer un manteau avant le voyage interplanétaire.'),n('Il marche de jour en jour à la recherche d’un être vivant. Sous la neige, les vestiges d’un monde habité apparaissent peu à peu.')]},
 6:{title:'La gardienne du froid',enemies:['maella'],background:'snow',before:[
 n('Au milieu des ruines gelées, une silhouette l’observe. Stibili s’arrête avant qu’elle lui en donne l’ordre.'),d('maella','N’avance plus. Cette planète est inhabitable depuis le passage d’un Navigateur ennemi. Il a tout congelé.'),
 d('stibili','Et tu es restée. Par choix… ou parce que tu ne pouvais pas partir ?','maella'),d('maella','Tu poses beaucoup de questions pour quelqu’un dont j’ignore le nom.'),
 d('stibili','Stibili. Je peux générer des boules de feu. Si tu veux de l’aide…','maella'),d('maella','Un inconnu qui tombe du ciel et propose ses pouvoirs. Nous avons déjà payé pour faire confiance.'),
 d('stibili','Je comprends. Je ne te fais pas confiance non plus.','maella'),d('maella','Alors prouve ta valeur au combat. Je m’appelle Maëlla. Et ne compte pas sur tes flammes pour me brûler.')
 ],after:[d('maella','Tu es exceptionnellement fort… Cette magie ne ressemble à rien de ce que je connais.'),d('stibili','Elle est à moi. Je tiens à ce détail.','maella'),n('Maëlla porte soudain les mains à sa tête. Une voix résonne dans son esprit : « Défends ta planète. Ce mage est extrêmement dangereux. »'),d('maella','Non… Attends… Je dois…'),d('stibili','Qui te parle ? Maëlla, regarde-moi.','maella'),n('Une armure d’acier enveloppe Maëlla. Son regard se durcit. Stibili reconnaît la peur ; ce qui la commande lui reste inconnu.')]
 },
 7:{title:'L’ordre sous l’armure',enemies:['maella2'],background:'snow',escape:true,boss:true,before:[
 d('maella2','Tu ne menaceras pas cette planète.'),d('stibili','Je viens de proposer de l’aider. Cette voix a un curieux sens des priorités.','maella2'),
 n('Maëlla avance. L’acier couvre désormais sa silhouette, mais ses gestes et sa résistance aux brûlures restent les mêmes.'),d('stibili','Je n’ai pas besoin de te vaincre. Seulement d’une ouverture pour repartir.','maella2'),n('Objectif : épuisez la barre de combat de Maëlla pour ouvrir une voie de fuite. Ce succès ne signifie pas qu’elle est vaincue dans le récit.')
 ],after:[n('Le dernier sort repousse Maëlla de quelques pas. Elle se redresse déjà. Stibili n’a pas réussi à la vaincre ; il a seulement gagné les secondes dont il avait besoin.'),d('stibili','Tu pourras me détester quand cette voix te laissera choisir.','maella2'),n('Épuisé, il ouvre son portail voyageur et s’y engouffre avant que Maëlla puisse l’atteindre.')]
 },
 8:{title:'L’appétit du Néant',enemies:['mite'],background:'space',before:[
 n('Le tube spatial vacille. Stibili lutte pour maintenir sa forme. La Mite du Néant revient aussitôt.'),d('stibili','Trois voyages. Trois apparitions. Et toujours près des fissures…','mite'),
 n('Il distingue enfin une énergie étrangère sur les bords de son sort. Pour traverser l’espace, le tube effleure le Néant.'),d('stibili','Ce n’est pas l’Énergie Astrale qui t’attire. C’est celle du Néant que mon passage laisse filtrer. Je trace une piste.','mite'),d('stibili','Très instructif. Très mauvais moment.','mite')
 ],after:[n('Alors que Stibili repousse la Mite, le tube spatial s’arrête brusquement. Ses réserves, épuisées par Maëlla puis par ce nouveau combat, ne suffisent plus.'),d('stibili','Non. Tiens encore une seconde… Une seule !'),n('Le passage se déchire. Stibili chute dans l’espace, emporté vers une planète montagneuse : Dyseria.')]
 },
 9:{title:'Ozvex, les ailes de Dyseria',enemies:['ozvex'],background:'mountain',boss:true,before:[
 n('Dyseria. Autrefois, faucons et dragons s’y livraient une guerre sans fin. Leur union a finalement donné naissance à une nouvelle espèce : les Faucons-Dragons.'),
 n('Stibili n’en sait encore rien. Réfugié dans une grotte, il passe plusieurs jours à récupérer son énergie. Il vérifie ses formules, puis les vérifie encore.'),d('stibili','Le portail consomme trop. Et le Néant répond. Je dois comprendre avant le prochain essai.'),
 n('Une ombre immense bouche l’entrée. Grand et majestueux, Ozvex déploie ses ailes au-dessus de la roche.'),d('ozvex','Que cet être disparaisse de nos terres !'),d('stibili','Nous sommes parfaitement d’accord sur mon départ. Laisse-moi simplement…','ozvex'),
 n('Un battement d’ailes coupe sa retraite. Le combat est imminent.'),d('stibili','Évidemment. Ici aussi, les négociations commencent par les griffes.','ozvex')
 ],after:[d('ozvex','À moi ! Renforts ! Ne laissez pas le mage s’échapper !'),n('Blessé, Ozvex appelle les siens. Stibili recule, cherchant l’endroit où ouvrir un dernier passage.'),d('stibili','Pas assez d’énergie. Pas assez de temps…'),n('Un trou dimensionnel s’ouvre sous ses pieds. Le mage s’immobilise une fraction de seconde : ce sort n’est pas le sien.'),d('stibili','Qui a fait ça ?!'),n('L’ouverture l’emporte avant qu’il puisse répondre. Quelque part, dans l’inconnu, quelqu’un — ou quelque chose — l’attend peut-être.'),n('Fin du chapitre 1 — Naissance d’un mage. À suivre : Un mage dans le Néant.')]
 }
};

return {STIBILI_CAST,STIBILI_CHAPTER,STIBILI_MISSIONS};
})();
modules["story.mjs"]=(()=>{
const {FORGEUR_CAST,FORGEUR_CHAPTER,FORGEUR_MISSIONS}=modules["forgeur-story.mjs"];
const {NAHAT_CAST,NAHAT_CHAPTER,NAHAT_MISSIONS}=modules["nahat-story.mjs"];
const {DRUNN_CAST,DRUNN_CHAPTER,DRUNN_MISSIONS}=modules["drunn-story.mjs"];
const {STIBILI_VOID_CAST,STIBILI_CHAPTER2,STIBILI_CHAPTER2_MISSIONS}=modules["stibili-chapter2.mjs"];
const {KAERUNE_CAST,KAERUNE_CHAPTER,KAERUNE_MISSIONS}=modules["kaerune-story.mjs"];

const {STIBILI_CAST,STIBILI_CHAPTER,STIBILI_MISSIONS}=modules["stibili-story.mjs"];

// Story data stays separate from combat math so every companion can have its own route.
const narrate=text=>({speaker:null,text});
const say=(speaker,text,other='wolffy',effect='')=>({speaker,text,other,effect});
const STORY_CAST={
 ...FORGEUR_CAST,
 ...NAHAT_CAST,
 ...DRUNN_CAST,
 ...STIBILI_CAST,
 ...STIBILI_VOID_CAST,
 ...KAERUNE_CAST,
 wolffy:{name:'Wolffy',art:'wolffy',kind:'wolf'},
 sword:{name:'L’Épée des nuages',art:'epee-nuages',kind:'sword'},
 reynga:{name:'Reynga',art:'reynga',kind:'beast'},
 rivernia:{name:'Rivernia',art:'rivernia',kind:'human'},
 unknown:{name:'???',art:'rivernia',kind:'human',silhouette:true},
 emillia:{name:'Emillia',art:'emillia',kind:'human'},
 felk:{name:'Commandant Felk',art:'felk',kind:'human'},
 skeleton:{name:'Squelette de Nébryss',art:'squelette-nebryss',kind:'human'},
 ushio:{name:'Ushio',art:'ushio',kind:'human'}
};
const WOLFFY_CHAPTER={title:'Chapitre 1 — La bataille',description:'Découvrez comment Wolffy est passé d’un simple loup à une créature enragée, loyale à Selkiel et à Zvatas.'};
const WOLFFY_MISSIONS={
 1:{title:'L’éveil',enemies:['sword'],before:[
  narrate('L’histoire commence avant l’apparition du premier Navigateur. La planète n’a pas encore de nom. Ses forêts sont verdoyantes, ses ruisseaux abondants.'),
  narrate('Des animaux hauts de plusieurs mètres peuplent ces terres. Tous possèdent la capacité de parler. Leur cruauté maintient les humains enfermés dans un village.'),
  narrate('Wolffy connaît surtout les sentiers, les odeurs après la pluie et le pas de sa mère devant lui. Quand elle s’arrête, il s’arrête. Quand elle repart, le monde retrouve sa direction.'),
  narrate('Loin de cette forêt, Selkiel, un humain, échappe à sa prison. Dans une grotte au fond de l’océan, il pose la main sur une vieille épée.'),
  narrate('Sous l’apparence d’une lame oubliée repose une relique suprême : l’Épée des nuages. Le pouvoir des Démononuageux prend sa source en elle.'),
  narrate('Au contact de Selkiel, elle s’éveille. La lame retrouve son éclat et libère un torrent de nuages démoniaques. Ils traversent l’océan, gagnent le ciel, puis retombent sur toute vie.'),
  narrate('La forêt disparaît sous les nuages. Wolffy appelle sa mère. Il la retrouve à quelques pas, couchée là où elle l’attendait.'),
  narrate('Elle essaie de se relever. Ses pattes cèdent. Wolffy pousse son museau contre le sien, attend un souffle… puis comprend qu’il attendra seul.'),
  narrate('La puissance qui vient de la tuer envahit son propre corps. Lui survit. Ses muscles se tendent, ses crocs s’allongent ; une rage étrangère se mêle à la sienne. C’est une force qu’il ne maîtrisera jamais.'),
  narrate('Il ne sait pas ce qui lui arrive. Mais chaque nuage porte la même présence. Wolffy la suit jusqu’à sa source, sans s’arrêter quand ses pattes commencent à saigner.'),
  narrate('Devant l’Épée, les nuages se courbent. La relique demeure immobile. Wolffy sent dans sa poitrine le même battement sourd que dans la lame.'),
  say('wolffy','T… Tu as tué ma mère !','sword'),
  say('sword','…'),
  say('wolffy','Elle ne t’avait rien fait. Regarde-moi quand je te parle !','sword'),
  narrate('Le silence de la relique lui est insupportable. Wolffy ramasse ses dernières forces.'),
  say('wolffy','Ma rage va t’anéantir !','sword')
 ],after:[
  say('wolffy','Cette régénération… T… TU ES QUOI ?!','sword'),
  narrate('Il a frappé jusqu’à ne plus sentir sa mâchoire. Les marques laissées sur la lame se referment déjà. L’Épée n’a pas bougé.'),
  say('sword','La force avec laquelle tu me frappes vient de moi.'),
  say('wolffy','Alors reprends-la. Rends-la-moi, elle.','sword'),
  narrate('Aucune réponse ne vient. Wolffy avance encore une patte. Son corps refuse de suivre.'),
  say('sword','Je suis ton roi. Désormais, obéis.'),
  narrate('La voix résonne au milieu de ses pensées. Wolffy voudrait la chasser, mais ses yeux se ferment. Il s’effondre au pied de la source même de sa colère.')
 ]},
 2:{title:'Conquête',enemies:['reynga'],before:[
  narrate('Plusieurs semaines passent sans que Wolffy en sache rien. Lorsqu’il ouvre les yeux, une secousse lui fait claquer les crocs.'),
  say('wolffy','Maman… ?'),
  narrate('Sa propre voix l’arrête. Plus grave. Râpeuse. Il cherche une odeur familière, mais ne trouve que la fumée et la terre retournée.'),
  narrate('Le monde a désormais un nom : Démono. Selkiel et l’Épée des nuages en sont devenus les maîtres. Déjà, un Navigateur étranger convoite cette jeune planète : Nébryss.'),
  narrate('Son armée franchit un portail et se répand sur les terres. Wolffy se relève au milieu d’une bataille dont personne ne lui a expliqué les camps.'),
  narrate('Une créature lui barre le passage. Reynga. Elle porte une odeur qu’il n’a jamais rencontrée dans cette forêt.'),
  say('wolffy','Dégage de là.','reynga'),
  say('reynga','Gloire à Nébryss !'),
  say('wolffy','Je ne te le demanderai pas deux fois.','reynga')
 ],after:[
  {...narrate('Reynga se dissipe dans une volute de fumée. Wolffy referme les crocs sur le vide.'),speaker:'reynga',effect:'smoke',narration:true},
  say('wolffy','C’était ça… mon premier combat ?'),
  narrate('Il se souvient de l’Épée, intacte sous ses coups. Ce souvenir lui laisse un goût plus amer que la poussière.'),
  say('unknown','Ferme-la, le clébard !'),
  narrate('La voix vient de tout près. Wolffy n’a entendu aucun pas.'),
  say('wolffy','Montre-toi.','unknown')
 ]},
 3:{title:'Rivernia, être cosmique de Nébryss',enemies:['reynga','reynga'],before:[
  narrate('Une silhouette se détache de la fumée. Rivernia, être cosmique au service de Nébryss, regarde Wolffy comme un obstacle trop petit pour mériter un détour.'),
  say('rivernia','À genoux, le toutou.'),
  say('wolffy','Approche. On verra qui touche le sol en premier.','rivernia'),
  say('rivernia','Me battre contre un chien ? Tu te donnes beaucoup d’importance.'),
  narrate('Wolffy bondit. Rivernia le voit venir ; son sourire ne change pas.'),
  {...narrate('Elle laisse échapper un rire bref, puis disparaît. Deux Reynga occupent l’endroit où Wolffy allait retomber.'),speaker:'rivernia',effect:'vanish',narration:true},
  say('wolffy','Vous aussi, vous allez me parler de votre maître ?','reynga'),
  say('reynga','Gloire à Nébryss !'),
  say('wolffy','Évidemment.','reynga')
 ],after:[
  narrate('Les deux silhouettes se défont. Wolffy cherche aussitôt au-delà d’elles.'),
  say('wolffy','Elle est passée où ?!'),
  narrate('Il voudrait la poursuivre. Mais plus loin, un cri s’interrompt brutalement. Celui-là vient d’une créature de sa planète.'),
  narrate('Wolffy tourne la tête, hésite une seconde, puis repart dans la direction du cri.')
 ]},
 4:{title:'Encerclé par l’adversaire',enemies:['emillia'],before:[
  narrate('Wolffy court entre les arbres brisés. Des Démononuageux tombent ; d’autres tiennent leur position. Il reconnaît parfois un mouvement, un plumage, sous les formes que les nuages ont transformées.'),
  narrate('Les envahisseurs avancent encore. Wolffy se place sur leur chemin.'),
  say('wolffy','Reculez. Vous n’irez pas plus loin.'),
  narrate('Une enfant s’avance seule. Emillia serre son arme à deux mains. Ses yeux passent sur les crocs de Wolffy, puis reviennent se fixer sur les siens.'),
  say('emillia','Vous devez tous mourir. Pour la survie de Nébryss !'),
  say('wolffy','Ici, vous êtes chez nous ! Gloire à notre…','emillia'),
  narrate('Le mot suivant ne vient pas. Roi ? Planète ? Il ne sait pas encore. Emillia profite de cette hésitation pour frapper.'),
  narrate('Wolffy esquive de justesse. L’enfant attaque déjà une seconde fois, plus fort.'),
  say('wolffy','Tu veux vraiment faire ça ?','emillia'),
  say('emillia','Je dois le faire !')
 ],after:[
  say('emillia','Argh… T’es plus costaud que l’autre piaf !'),
  narrate('Wolffy regarde derrière elle. Il comprend d’où venait le cri.'),
  say('wolffy','Disparais !','emillia'),
  narrate('Il se jette en avant. Une ombre s’interpose et bloque ses crocs : le commandant Felk. Emillia recule derrière lui.'),
  say('felk','Misérable. Tu oses t’en prendre à mes soldats ?'),
  say('wolffy','C’est vous qui êtes venus ! Pourquoi devrions-nous nous entretuer ?!','felk'),
  say('felk','Parce que votre Énergie sera la nôtre. Et Nébryss vivra.'),
  say('wolffy','Et nous ?','felk'),
  narrate('Felk laisse échapper un ricanement. Wolffy cesse d’attendre une autre réponse.')
 ]},
 5:{title:'Le commandant des armées',enemies:['felk'],before:[
  say('felk','Prêt à mourir pour ta planète ?'),
  say('wolffy','Parle pour toi.','felk'),
  narrate('Une lumière violette glisse sur l’armure du commandant. Wolffy abaisse la tête et cherche un passage sous sa garde.'),
  say('felk','Tu ne sais même pas ce que tu défends.'),
  say('wolffy','Je sais ce que vous êtes en train de détruire.','felk'),
  narrate('Felk avance. Cette fois, Wolffy l’attend.')
 ],after:[
  narrate('Le commandant tombe. Wolffy reste campé devant lui, le souffle court, prêt à bondir au moindre mouvement.'),
  say('wolffy','Meurs…','felk'),
  narrate('Felk ne répond plus. La lumière violette quitte lentement son armure.'),
  narrate('Un bruit derrière Wolffy. Emillia s’est approchée. Elle regarde le commandant et attend, elle aussi, un mouvement qui ne vient pas.'),
  say('emillia','Commandant… ?'),
  narrate('Wolffy connaît cette attente. Il détourne les yeux une fraction de seconde.'),
  say('emillia','Enfoiré ! Je… Je vais te TUER !')
 ]},
 6:{title:'La revanche d’Emillia',enemies:['emillia','emillia'],before:[
  narrate('Emillia se dédouble. Deux silhouettes prennent position de part et d’autre de Wolffy. Même souffle précipité, même arme levée.'),
  say('wolffy','Deux visages. La même odeur.','emillia'),
  say('emillia','Tu ne peux pas nous surveiller toutes les deux.'),
  say('wolffy','Pars.','emillia'),
  say('emillia','Après ce que tu lui as fait ?!'),
  narrate('Les deux Emillia attaquent ensemble. Wolffy recule d’un pas pour les garder devant lui, puis montre les crocs.')
 ],after:[
  narrate('L’une des silhouettes disparaît. L’autre reste à genoux, incapable de relever son arme.'),
  say('emillia','Ma technique de clone… Elle n’a pas fonctionné…'),
  narrate('Wolffy entend encore sa menace. Il voit son arme bouger et frappe avant de réfléchir.'),
  narrate('Un coup de croc démoniaque met fin au combat. Lorsqu’il desserre la mâchoire, plus personne ne lui répond.'),
  narrate('Il avait reconnu sa colère. Cela ne l’a pas empêché de la tuer.'),
  say('wolffy','Je t’avais dit de partir.'),
  narrate('Il reprend sa course. Cette fois, il ne regarde pas derrière lui.')
 ]},
 7:{title:'Cimetière',enemies:['skeleton'],secondEnemies:['skeleton','skeleton'],before:[
  narrate('Les bruits de bataille s’éloignent. Wolffy débouche sur une étendue de terre ravagée. Du sang a séché entre les pierres ; aucune voix ne l’appelle.'),
  narrate('Il ralentit enfin. Ici, même son souffle paraît trop fort.'),
  say('wolffy','Hein ? C’est quoi, cette sensation…'),
  narrate('Quelque chose gratte sous ses pattes. Un squelette de Nébryss s’arrache au sol, tenant encore son arme.'),
  say('skeleton','Kikikiki…'),
  say('wolffy','La bataille est finie pour toi. Reste à terre.','skeleton'),
  narrate('Le squelette relève son arme. Wolffy n’entend ni souffle ni battement de cœur.')
 ],between:[
  narrate('Wolffy a dû abattre le squelette une seconde fois pour que ses os restent immobiles. Il les fixe encore, les muscles tendus.'),
  say('wolffy','Ne te relève pas.'),
  narrate('La terre remue derrière lui. Deux autres squelettes sortent du sol.'),
  say('wolffy','Eux, ils ont le droit de revenir…'),
  narrate('Le souvenir d’un museau froid lui traverse l’esprit. Wolffy le repousse et se retourne vers les deux silhouettes.'),
  narrate('Cimetière II — Il reprend son souffle. Puis les armes se lèvent de nouveau.')
 ],after:[
  narrate('Wolffy attend que les os cessent de bouger. Il a appris à ne plus croire la première chute.'),
  narrate('Il voudrait se coucher quelques instants. Mais, entre les pierres, un nouveau grattement se fait entendre.'),
  say('wolffy','Combien vous êtes encore… ?'),
  narrate('Il avance avant que ses pattes décident de ne plus le porter.')
 ]},
 8:{title:'Le pouvoir de l’Épée',enemies:['skeleton','reynga'],before:[
  narrate('Les affrontements se succèdent. Wolffy ne compte plus les silhouettes tombées, ni celles qui se sont relevées. Sa patte avant finit par céder.'),
  narrate('Un squelette approche, accompagné d’un Reynga. Wolffy essaie de se redresser ; son corps tremble sans lui obéir.'),
  say('sword','Bats-toi. Je te l’ordonne.'),
  narrate('La voix ne vient pas du champ de bataille. Elle traverse les nuages qui vivent en lui. La même présence que dans la grotte, intacte, immense.'),
  say('wolffy','Je… ne peux plus.','sword'),
  narrate('Les nuages se resserrent autour de ses membres. La puissance de leur source le traverse et lui rend ses forces. Wolffy se relève d’un seul mouvement.'),
  say('wolffy','Pourquoi moi ?','sword'),
  say('sword','Ils avancent encore.'),
  narrate('Wolffy regarde les deux envahisseurs. Derrière lui s’étendent les terres où il courait avec sa mère. Il se replace entre elles et leurs armes.'),
  say('wolffy','L’Épée… Je me battrai pour vous. Mais ils ne prendront pas ce qui reste ici.','sword')
 ],after:[
  narrate('Les deux adversaires tombent. Wolffy attend un nouveau vertige, mais ses pattes tiennent bon. Les nuages poursuivent leur course autour de lui.'),
  say('wolffy','Selkiel. L’Épée. Démono…'),
  narrate('Ces noms étaient ceux d’un monde qu’il avait découvert en se réveillant. À présent, il se surprend à les prononcer comme ceux de son camp.'),
  narrate('Il n’a pas pardonné. Il sait seulement de quel côté il se tient quand les armes se lèvent.'),
  narrate('Une présence plus forte arrive avec le vent. Wolffy suit sa trace : elle mène au portail.')
 ]},
 9:{title:'Ushio, le faucheur de Nébryss',enemies:['ushio'],before:[
  narrate('Le portail déforme l’air au milieu des ruines. C’est par cette ouverture que Nébryss envoie ses sbires. Tant qu’elle restera ouverte, d’autres viendront.'),
  narrate('Un humain en garde l’accès : Ushio, sous l’emprise du Navigateur. Sa faux laisse une lueur violette derrière chacun de ses mouvements.'),
  say('ushio','Piètre créature. Tu oses souiller le domaine de notre maître ?'),
  say('wolffy','Le domaine de ton maître ? T’es chez nous, ici !','ushio'),
  say('ushio','Plus maintenant.'),
  narrate('Wolffy regarde l’ouverture derrière lui, puis la portée de la faux. Il lui faudra passer tout près.'),
  say('wolffy','Alors viens me chasser.','ushio')
 ],after:[
  say('ushio','J… Je t’ai sous-estimé, ouais…'),
  say('wolffy','Je vais anéantir ce portail. Vous allez rentrer chez vous !','ushio'),
  narrate('Il n’a pas le temps d’avancer. Une pression écrasante lui courbe l’échine. Ses quatre pattes s’enfoncent dans la terre.'),
  narrate('Rivernia se tient devant le portail. Wolffy reconnaît la voix avant même qu’elle parle.'),
  say('rivernia','Tu as fait beaucoup de bruit pour arriver jusqu’ici.'),
  say('wolffy','Tu ne disparais plus ?','rivernia'),
  narrate('Elle pose la main sur son arme. Cette fois, aucun Reynga ne vient prendre sa place.'),
  say('rivernia','Bats-toi.')
 ]},
 10:{title:'Rivernia',boss:true,enemies:['rivernia'],before:[
  narrate('Wolffy force ses pattes à se tendre. Rivernia lui laisse le temps de se relever. Elle ne rit plus.'),
  say('rivernia','Tu aurais dû rester avec les autres, dans la forêt.'),
  say('wolffy','Il ne reste plus grand monde, dans la forêt.','rivernia'),
  narrate('Les nuages démoniaques montent le long de son dos. Wolffy sent la rage reprendre toute la place. Cette fois, il ne cherche pas à la retenir.'),
  say('rivernia','Viens, alors.'),
  say('wolffy','Je suis là.','rivernia')
 ],after:[
  narrate('Rivernia pose un genou à terre. Wolffy ne lui laisse ni le temps de parler, ni celui de disparaître. Il se jette sur elle et la dévore sans pitié.'),
  narrate('Quand il relève la tête, le portail est toujours ouvert. Des voix lui parviennent de l’autre côté.'),
  say('wolffy','C’est terminé. Vous ne passerez plus.'),
  narrate('Il s’approche, cherchant où mordre pour déchirer cette lumière. Ses crocs se referment sur l’air.'),
  narrate('Une main surgit du passage et le saisit. Wolffy plante ses griffes dans la terre, mais la traction l’arrache au sol.'),
  say('wolffy','Lâche-moi !'),
  narrate('Démono disparaît derrière lui. Le portail l’emporte avant qu’il ait pu le refermer.'),
  narrate('Fin du chapitre 1 — La bataille. À suivre : En plein cœur de Nébryss.')
 ]}
};
function storyLines(stage,phase,key='wolffy',chapter=1){const m=storyRoute(key,chapter)?.missions[stage];if(!m)return [];return phase==='recap'?[...m.before,...(m.between??[]),...(m.interlude??[]),...m.after]:m[phase]??[];}

function storyRoute(key,chapter=1){if(chapter===2&&key==='stibili')return {...STIBILI_CHAPTER2,missions:STIBILI_CHAPTER2_MISSIONS};if(chapter!==1)return null;return key==='forgeur'?{...FORGEUR_CHAPTER,missions:FORGEUR_MISSIONS}:key==='nahat'?{...NAHAT_CHAPTER,missions:NAHAT_MISSIONS}:key==='drunn'?{...DRUNN_CHAPTER,missions:DRUNN_MISSIONS}:key==='wolffy'?{...WOLFFY_CHAPTER,nextTitle:'En plein cœur de Nébryss',missions:WOLFFY_MISSIONS}:key==='stibili'?{...STIBILI_CHAPTER,missions:STIBILI_MISSIONS}:key==='kaerune'?{...KAERUNE_CHAPTER,missions:KAERUNE_MISSIONS}:null;}

return {KAERUNE_CHAPTER,KAERUNE_MISSIONS,STIBILI_CHAPTER,STIBILI_MISSIONS,STORY_CAST,WOLFFY_CHAPTER,WOLFFY_MISSIONS,storyLines,storyRoute};
})();
modules["engine.mjs"]=(()=>{
const {FORGEUR_STORY_VERSION,FORGEUR_MISSIONS,FORGEUR_ENCOUNTERS,forgeurStoryEnemies,forgeurEnemyTurn}=modules["forgeur-story.mjs"];
const {FORGEUR_CLASS,FORGEUR_PASSIVE,FORGEUR_SKILLS,FORGEUR_TEXT,FORGEUR_ITEMS,forgeTension,forgeState,forgeArt,newProfile,syncProfile,companionAvailable}=modules["forgeur.mjs"];

const {MAX_LEVEL,xpNeed,expeditionXp,expeditionXpRange,expeditionXpDivisors}=modules["progression.mjs"];

const {ACHIEVEMENTS,newAchievements,ensureAchievements,recordAchievement,recordMonsterDrop,achievementRows,unlockedTitles,equippedTitle,setCompanionTitle}=modules["achievements.mjs"];

const {NAHAT_MISSIONS,nahatEnemies,nahatIntent}=modules["nahat-story.mjs"];

const {ASTRAL_ITEMS,isAstral,astralActive,astralPassiveText,itemStats,normalizeForge,forgedStatKeys,STAR_NAMES,starText,placeForgeItem,addForgeStar,destroyForgeStar,removeForgeItem}=modules["astral.mjs"];

const {DIAMANITE_ITEMS}=modules["diamanite.mjs"];
const {MASTERY_SKILLS,MASTERY_TEXT,activeShields,shieldTotal,shieldCapacity,grantShield,absorbShield,markedPrey}=modules["mastery.mjs"];

const {goldenEnemy,EXPEDITION_BALANCE,scaleEncounter,EXPEDITIONS,EXPEDITION_ENEMIES,EXPEDITION_BESTIARY,expeditionFor,expeditionEncounter,prepareExpeditionEnemy,expeditionIntent,expeditionEnemyTurn}=modules["expeditions.mjs"];

const {TRIALS,trialEnemy,trialIntent,trialDirectDamage,trialEnemyTurn}=modules["trials.mjs"];

const {DRUNN_MISSIONS,drunnEnemies,drunnIntent}=modules["drunn-story.mjs"];

const {RIFT_LEVEL,RIFT_FLOORS,RIFT_CREATURES,riftReplays,riftCleared,riftUnlocked,riftFloor,riftEnemies,riftIntent,riftDirectDamage,riftEnemyTurn}=modules["rift.mjs"];

const {KAERUNE_MISSIONS,STORY_CAST,WOLFFY_CHAPTER,WOLFFY_MISSIONS,STIBILI_MISSIONS,storyRoute,storyLines}=modules["story.mjs"];

const BALANCE_VERSION=9;
const ECONOMY={startingGold:0,equipmentPrice:37,advancedEquipmentPrice:125,goldEquipmentPrice:350,potionPrice:25,trainingBonus:3,trainingBonusFromCleared:4,lateWorldGold:22,lateWorldFromStage:6,trainingGold:[2,5],worldGold:[5,15],firstWorldCombatBonus:15};
const LEGACY_KEYS={darunk:'wolffy',emy:'drunn',drun:'drunn',golkias:'nahat',mink:'kaerune'};
const CLASSES={
 forgeur:FORGEUR_CLASS,
 wolffy:{name:'Wolffy',title:'Le loup Démononuageux',role:'Équilibré',art:'wolffy',hp:133,dmg:22,luck:13,speed:13,weapon:'cristal',color:'#edbb72',lore:'Wolffy appartient à l’archétype des Démononuageux. Il a été transformé par Selkiel lors de l’apparition du tout premier Navigateur Démononuageux. Équilibré en combat, il est considéré comme le loup de combat parfait !'},
 drunn:{name:'Drunn',title:'Le tireur des Guerriers bêtes',role:'Chance',art:'drunn',hp:115,dmg:23,luck:30,speed:7,weapon:'arc',color:'#7bddb8',lore:'Drunn appartient à l’archétype des Guerriers bêtes. Calme, froid et précis, il ne rate aucune cible. Le Dompteur, son Navigateur, l’a choisi pour sa loyauté et son efficacité.'},
 nahat:{name:'Nahat',title:'Le prodige de l’Épine',role:'Vitalité',art:'nahat-ado',hp:150,dmg:19,luck:9,speed:6,weapon:'epee-bouclier',color:'#c8aa79',lore:'Nahat appartient à l’archétype de l’Épine. Recruté il y a peu, il a récemment révélé un potentiel gigantesque. Il fait déjà partie des prodiges.'},
 stibili:{name:'Stibili',title:'Le mage voyageur',role:'Dégâts',art:'stibili',hp:104,dmg:30,luck:12,speed:11,weapon:'baton',color:'#b8a0ff',lore:'Né d’une étoile, Stibili est une anomalie. Ce mage voyageur, intelligent et méfiant, ne poursuit qu’une ambition : découvrir et créer toujours plus de sorts. Il étudie les traces laissées par ses adversaires pour enrichir ses formules.'},
 kaerune:{name:'Kaerune',title:'La combattante du Sceau brisé',role:'Vitesse',art:'kaerune',hp:115,dmg:23,luck:12,speed:31,weapon:'griffe',color:'#91baf4',lore:'Kaerune appartient à l’archétype du Sceau brisé, sur la planète Harmony. Recrutée comme combattante principale, elle s’appuie sur sa rapidité et ses griffes acérées.'}
};
const ITEMS={
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
const RARITIES=[
 {id:'common',name:'Commune',chance:40,salePercent:25},
 {id:'rare',name:'Rare',chance:30,salePercent:30},
 {id:'super-rare',name:'Super rare',chance:20,salePercent:35},
 {id:'legendary',name:'Légendaire',chance:10,salePercent:40}
];
const itemRarity=item=>RARITIES.find(r=>r.id===item?.rarity)??RARITIES[0];
const hasRarity=type=>!!ITEMS[type]?.slot&&ITEMS[type].slot!=='orb';
const equipmentLevel=type=>ITEMS[type]?.level??(['weapon','armor'].includes(ITEMS[type]?.slot)?({37:1,110:2,200:3}[ITEMS[type].price]??null):null);
function rarityStats(type,rarity){
 const tier=RARITIES.findIndex(r=>r.id===rarity);if(tier<0||!ITEMS[type])throw Error('Rareté inconnue.');
 return {...Object.fromEntries(Object.entries(ITEMS[type].rolls).map(([key,values])=>{const lo=Math.min(...values),hi=Math.max(...values);return [key,ITEMS[type].rarityRolls?.[key]?.[tier]??[lo,Math.floor((lo+hi)/2),hi,hi+1][tier]];})),...ITEMS[type].fixedStats};
}
function rollRarity(rng=Math.random){const n=rng()*100;return n<40?'common':n<70?'rare':n<90?'super-rare':'legendary';}
function createItem(type,rng=Math.random){
 const d=ITEMS[type];if(!d)throw Error('Objet inconnu.');const rarity=hasRarity(type)?rollRarity(rng):null;
 return {id:globalThis.crypto.randomUUID(),type,rank:0,purchasePrice:d.price??0,...(rarity?{rarity}:{}),stats:rarity?rarityStats(type,rarity):Object.fromEntries(Object.entries(d.rolls).map(([k,v])=>[k,v[0]]))};
}
const RECIPES={
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
function craftCandidates(s,recipe){const d=RECIPES[recipe];return d?.equipment?s.items.filter(i=>i.type===d.equipment&&!Object.values(s.equipped).includes(i.id)):[];}
function craftReady(s,recipe,ingredientId=null){
 const d=RECIPES[recipe];return !!(s.hero&&!s.battle&&!s.storyScene&&d&&Object.entries(d.resources).every(([k,n])=>resourceQuantity(s,k)>=n)&&Object.entries(d.consumables??{}).every(([k,n])=>s.items.filter(i=>i.type===k).length>=n)&&(!d.equipment||craftCandidates(s,recipe).some(i=>i.id===ingredientId)));
}
function craft(s,recipe,ingredientId=null,rng=Math.random){
 if(!craftReady(s,recipe,ingredientId))throw Error('Fabrication impossible : vérifiez les ingrédients et, si nécessaire, choisissez une veste non équipée.');
 const d=RECIPES[recipe],item=createItem(d.output,rng); // Validate and generate before consuming anything.
 for(const [k,n]of Object.entries(d.resources)){s.resources[k]-=n;if(!s.resources[k])delete s.resources[k];}
 for(const [type,n]of Object.entries(d.consumables??{})){let remaining=n;s.items=s.items.filter(i=>i.type!==type||remaining--<=0);}
 if(d.equipment)s.items=s.items.filter(i=>i.id!==ingredientId);
 s.items.push(item);if(!ITEMS[item.type].consumable)recordAchievement(s,'crafted');return item;
}
const equippedItem=(s,slot)=>s.items.find(i=>i.id===s.equipped[slot]);
const equippedAccessories=s=>['accessory','accessory2'].map(slot=>equippedItem(s,slot)).filter(Boolean);
const accessoryOf=(s,type)=>equippedAccessories(s).find(i=>i.type===type);
const bowPassiveActive=i=>!!i&&(ITEMS[i.type]?.family??i.type)==='arc'&&rarityIndex(i)>=2;
const omenRate=s=>accessoryOf(s,'collier-presages')?.stats.omen??0;
const rarityIndex=i=>RARITIES.indexOf(itemRarity(i));
const resourceDropBonus=s=>accessoryOf(s,'echarpe-aventurier')?2*(rarityIndex(accessoryOf(s,'echarpe-aventurier'))+1):0;
const resourceDropChance=(s,type)=>TRAINING_BESTIARY[type]?Math.min(1,Number((TRAINING_BESTIARY[type].dropChance+resourceDropBonus(s)/100).toFixed(8))):0;
const fireballPercent=s=>120+(s.hero?.key==='stibili'&&accessoryOf(s,'bracelet-boule-feu')?10*(rarityIndex(accessoryOf(s,'bracelet-boule-feu'))+1):0);
const majesticBracelet=s=>!!accessoryOf(s,'bracelet-majestueux');
const actionAlreadyUsed=(s,id)=>majesticBracelet(s)&&!!s.battle?.usedActions?.includes(id);
const potionHealPercent=s=>accessoryOf(s,'boucles-slime')?15:ITEMS['potion-soin'].healPercent;
function itemPassiveText(i){
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
const SKILLS={
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
const STAT_GAINS={hp:2,dmg:1,luck:.5,speed:.5};
const RECOMMENDED={forgeur:'hp',nahat:'hp',kaerune:'speed',drunn:'luck',stibili:'dmg'};
const emptyAllocation=()=>({hp:0,dmg:0,luck:0,speed:0});

const pointsAtLevel=level=>level>=2&&level<=MAX_LEVEL?4:0;
const earnedPoints=level=>4*Math.max(0,Math.min(MAX_LEVEL,Math.floor(level))-1);
const remainingPoints=s=>s.hero?Math.max(0,earnedPoints(s.hero.level)-Object.values(s.hero.allocated??emptyAllocation()).reduce((a,b)=>a+b,0)):0;
function allocateStats(s,distribution){
 if(!s.hero||s.battle)throw Error('Répartissez vos points au camp.');
 if(!distribution||typeof distribution!=='object'||Array.isArray(distribution))throw Error('Répartition invalide.');
 let spent=0;for(const [k,n]of Object.entries(distribution)){if(!Object.hasOwn(STAT_GAINS,k)||!Number.isSafeInteger(n)||n<0)throw Error('Répartition invalide.');spent+=n;}
 if(!spent||spent>remainingPoints(s))throw Error('Pas assez de points disponibles.');
 s.hero.allocated??=emptyAllocation();for(const [k,n]of Object.entries(distribution))s.hero.allocated[k]+=n;
 return spent;
}
const reforgePrice=s=>s.hero?.level>=10?100+5*(s.hero.level-10):0;
function reforgeStats(s){
 if(!s.hero||s.battle||s.storyScene)throw Error('Reforgez vos points au camp, hors combat.');
 const refunded=Object.values(s.hero.allocated??emptyAllocation()).reduce((a,b)=>a+b,0),cost=reforgePrice(s);
 if(!refunded)throw Error('Aucun point investi à reforger.');
 if(s.gold<cost)throw Error(`Il vous manque ${cost-s.gold} or pour reforger vos points.`);
 s.gold-=cost;s.hero.allocated=emptyAllocation();return {refunded,cost};
}
const PASSIVES={
 forgeur:FORGEUR_PASSIVE,
 stibili:{name:'Accumulation',text:'Chaque compétence effectivement lancée ajoute 8 points de pourcentage à la prochaine attaque de base : 100 %, 108 %, 116 %… Les répétitions de compétences par la vitesse comptent. La première frappe de base consomme toute l’accumulation ; sa répétition éventuelle revient à 100 %. Les potions ne comptent pas. Transmutation élémentaire et Sacrifice élémentaire consomment les cumuls existants sans en ajouter. Réinitialisation en fin de combat.'},
 kaerune:{name:'L’ordre Kaerune',text:'Tous les 4 points de répartition investis en vitesse donnent +1 dégât permanent. Les fractions sont conservées jusqu’au prochain groupe de 4. La vitesse des équipements et des effets temporaires ne compte pas dans cette conversion.'},
 wolffy:{name:'Acharnement',text:'Sous 49 % des PV max : dégâts, chance et vitesse +15 %. Le bonus disparaît dès que les PV remontent à 49 % ou plus. Les effets qui annulent la chance et la vitesse restent prioritaires.'},
 drunn:{name:'Analyse',text:'15 % de chances d’esquiver chaque attaque ou compétence offensive provenant d’un ennemi qui possède un bonus positif actif. Un malus seul, comme une brûlure, ne déclenche rien. La probabilité disparaît dès que le bonus de cet attaquant prend fin ; elle ne protège pas des autres ennemis.'},
 nahat:{name:'Mes armes : Mes choix',text:'Protège-bras : l’attaque de base ignore les dégâts d’attaque de Nahat et utilise à la place 3,5 % de ses PV max. Les compétences conservent leurs formules.\nLame-sabre : gagne des dégâts égaux à 25 % des PV bonus issus des points investis et des équipements, arrondis à l’inférieur, sans perdre ces PV. Les PV naturels et ceux gagnés par niveau ne comptent pas.\nÉpée et bouclier : après chaque quatrième attaque ou compétence offensive ennemie subie, riposte à 55 % des dégâts d’attaque (4e, 8e, 12e attaque, etc.). Une compétence à plusieurs impacts compte une seule fois. Les attaques annulées ou esquivées ne comptent pas. La riposte ne peut ni être critique ni être répétée par la Vitesse. Aucun effet sans arme équipée.'}
};
const acharnement=s=>s.hero?.key==='wolffy'&&!!s.battle&&s.battle.hp/s.battle.maxHp<.49;
const basicMultiplier=s=>s.hero?.key==='stibili'?1+.08*(s.battle?.accumulation??0):s.hero?.key==='wolffy'&&s.battle?.cloudStrike?1.5:1;
const battleAllies=b=>[...(b?.larva?[b.larva]:[]),...(b?.pups??[]),...(b?.bone?[b.bone]:[])];
const battleUnit=(b,id)=>id==='hero'?b:battleAllies(b).find(a=>a.id===id)??b.enemies.find(e=>e.id===id);
const livingPups=b=>(b?.pups??[]).filter(p=>p.hp>0);
function makeWolfPup(base,index,s){const crystal=astralActive(equippedItem(s,'weapon'),'cristal-astral'),armor=astralActive(equippedItem(s,'armor'),'armure-complete-astral')?1.15:1;const hp=Math.max(1,Math.round(base.hp*(crystal?.5:.35)*armor));return {id:'wolf-pup-'+index,name:'Bébé Wolffy',art:'bebe-wolffy',hp,maxHp:hp,dmg:Math.max(1,Math.round(base.dmg*(crystal?.75:.5)*armor)),burning:false,isPup:true};}
const BASIC_VARIANCE=3;
const basicAttackPower=s=>nahatWeaponFamily(s)==='protege-bras'?(s.battle?.maxHp??stats(s).hp)*.035:combatStats(s).dmg;
function basicDamageRange(s){const center=Math.round(basicAttackPower(s)*basicMultiplier(s)),variance=nahatWeaponFamily(s)==='protege-bras'?0:BASIC_VARIANCE;return [Math.max(1,center-variance),Math.max(1,center+variance)].map(n=>Math.max(1,Math.round(n*(majesticBracelet(s)?.5:1)*(equippedItem(s,'orb')?.type==='orbe-contrecoup'?1.2:equippedItem(s,'orb')?.type==='orbe-brasier'&&s.battle?.hp<s.battle?.maxHp*.35?1.25:equippedItem(s,'orb')?.type==='orbe-echo'?.8:equippedItem(s,'orb')?.type==='orbe-cycle'&&s.battle?.previousOffense?(s.battle.previousOffense==='basic'?.85:1.2):1))));}
// Beneficial timed effects and permanent Power are separate from debuffs such as burn.
const enemyBoosted=(e,round)=>!!(e.hp>0&&(shieldTotal(e,round)>0||e.riftKind==='saw'&&e.rift.step>0||e.lanternWard||e.frostGuard||e.forestBoost||e.parry||e.guardian==='brasier'&&e.hp<e.maxHp*.35||e.rift?.ward||e.powerBonus>0||e.aura||((e.wingsUntil??0)>=round)||(e.rageStacks??0)>0||Object.values(e.buffs??{}).some(effect=>effect.beneficial===true&&(effect.until==null||effect.until>=round))));
const smokeActive=s=>s.hero?.key==='drunn'&&!!s.battle&&(s.battle.smokeUntil??0)>=s.battle.round;
const dodgeChance=(s,e)=>s.hero?.key==='drunn'&&s.battle?(enemyBoosted(e,s.battle.round)?.15:0)+(smokeActive(s)?.22:0):0;
const crocsPercent=s=>80+7*(s.battle?.fangStacks??0);
const elementalMissing=s=>['feu','glacier','ouragan'].filter(id=>!s.battle?.elementalUsed?.[id]);
const lastBreathReady=s=>s.hero?.key==='kaerune'&&s.battle?.lastBreathTurn===s.battle?.round;
// All combat healing, including objects and automatic transformations, shares this gate.
function healHero(s,amount,alreadyScaled=false){const b=s.battle;if(!b||b.hp<=0||b.unhealable)return 0;const restored=Math.max(0,Math.min(b.maxHp-b.hp,Math.round(amount*(alreadyScaled?1:(equippedItem(s,'orb')?.type==='orbe-brasier'?.6:1)))));b.hp+=restored;return restored;}

// Current harmful hero states; scenario locks and skill costs are not dispellable effects.
function cleanseHero(b){b.roxxorWeakened=false;b.burning=!!b.eternalFlames;b.snakePoison=false;b.sandUntil=0;b.cobraBurnStacks=0;b.unhealable=!!(b.refusSuccess||b.distressUsed);b.riftFissures={};b.riftAttraction={};}

function enemyDamage(s,e){return Math.max(1,Math.round((e.dmg+(e.type==='corkbeau'&&!e.storyKind?Math.min(s.battle.maxHp*.02,e.dmg*.5):0))*((e.weakenedUntil??0)>=s.battle.round?.85:1)));}
const ENEMIES={
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
const RESOURCES={
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
const TRAINING_BESTIARY={
 ...EXPEDITION_BESTIARY,
 slime:{weight:1,tag:'Soutien',drop:'gelee-slime',dropChance:.40,skills:[{name:'Puissance',text:'Augmente les dégâts de 10 à 12 % jusqu’à la fin du combat. Renforce un allié vivant au hasard s’il en a un, sinon lui-même. Une seule utilisation.'}]},
 dog:{weight:1,tag:'Équilibré',drop:'touffe-poils',dropChance:.15,skills:[{name:'Morsure',text:'Utilise uniquement son attaque de base. Un adversaire équilibré.'}]},
 corkbeau:{weight:1,tag:'Charognard',drop:'plume-malefique',dropChance:.15,skills:[{name:'Bec charognard',text:'Ses attaques ajoutent des dégâts égaux à 2 % des PV max du compagnon, plafonnés à 50 % de ses propres dégâts. Les compagnons très robustes subissent davantage de dégâts.'}]},
 dragonnet:{weight:1,tag:'Feu',drop:'ecaille-rouge',dropChance:.15,skills:[{name:'Boule de feu',text:'Inflige 120 % de ses dégâts de base. Possède 10 % de chances de brûler : perte de 5 % des PV max au début de chaque tour, jusqu’à la fin du combat. Récupération : 3 tours. Utilisée dès qu’elle est disponible.'},{name:'Dernier brasier',text:'À sa mort, explose et inflige 7 % des PV max du compagnon, arrondis au supérieur. Ignore réduction et esquive. Si le compagnon tombe à 0 PV, le combat est perdu, sans récompense. Gardez assez de PV avant de l’achever !'}]},
 bandit:{weight:1,tag:'Toujours en duo',drop:'pierre-precieuse-usee',dropChance:.15,skills:[{name:'Embuscade',text:'Les bandits attaquent toujours à deux. Chacun est moins résistant et frappe moins fort qu’un adversaire seul. Chaque bandit vivant porte une attaque de base à son tour. Choisissez votre cible pour réduire rapidement leur nombre.'}]},
 icewolf:{weight:1,tag:'Glace',drop:'fragment-glace-eternel',dropChance:.15,goldBonus:.30,skills:[{name:'Glacier',text:'Inflige 135 % de ses dégâts de base. Une seule utilisation par combat, lors de sa première action.'},{name:'Escrime',text:'Après Glacier, frappe de 1 à 4 fois au hasard. Chaque coup inflige 33 % de ses dégâts de base ; chaque nombre de coups a la même probabilité.'}],rewardText:'Victoire : +30 % d’or, après le bonus de progression des expéditions. Le total est arrondi à l’entier supérieur.'}
};
function resourceOrigin(type){
 if(type==='fragment-neant')return 'Récompense de la Fissure du Néant : première victoire aux étages 10, 20, 30, 40 et 50.';
 const names=[...new Set(Object.values(EXPEDITIONS).flatMap(zone=>zone.kinds).filter(kind=>TRAINING_BESTIARY[kind]?.drop===type).map(kind=>ENEMIES[kind].name))];
 return names.length?'Créature'+(names.length>1?'s':'')+' : '+names.join(' · ')+'.':'Disponible en boutique.';
}
function trainingEncounter(rng=Math.random,zone='forest'){return expeditionEncounter(zone,rng);}
// Each adventure retains one unresolved encounter per expedition, independently.
function pendingExpedition(s,zone){const pending=s.expeditionEncounters?.[zone];return pending&&EXPEDITIONS[zone]?.kinds.includes(pending.type)?pending:null;}
function retreatBattle(s){
 const b=s.battle;
 if(b?.mode==='training'){
  const zone=b.expedition??expeditionFor(b.enemies[0]?.type),pool=EXPEDITIONS[zone].kinds;
  // Adopt battles saved before persistent encounters were introduced.
  if(!pendingExpedition(s,zone))(s.expeditionEncounters??={})[zone]={type:pool.includes(b.trainingEncounter)?b.trainingEncounter:pool.find(type=>b.enemies.some(e=>e.type===type))??pool[0],golden:!!b.goldenEncounter,levelOffset:Math.max(-1,Math.min(1,b.level-(b.expeditionEntryLevel??s.hero.level)))};
 }
 s.battle=null;
}

const resourceQuantity=(s,type)=>Object.hasOwn(RESOURCES,type)?Math.min(RESOURCE_LIMIT,Math.max(0,Math.floor(Number(s.resources?.[type])||0))):0;
const resourceTotal=s=>Object.keys(RESOURCES).reduce((n,type)=>n+resourceQuantity(s,type),0);
function buyResource(s,type){
 const d=RESOURCES[type];
 if(!s.hero||s.battle||s.storyScene||!d?.buyPrice)throw Error('Ressource indisponible à l’achat.');
 const held=resourceQuantity(s,type);
 if(held>=RESOURCE_LIMIT)throw Error('Stock maximum atteint pour cette ressource.');
 if(s.gold<d.buyPrice)throw Error('Or insuffisant.');
 s.resources??={};s.resources[type]=held+1;s.gold-=d.buyPrice;recordAchievement(s,'spent',d.buyPrice);return d;
}
function sellResource(s,type,quantity=1){
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
const LABELS={flameDamage:'% de dégâts en combat',bonePower:'% des statistiques de l’invocation',hp:'PV',dmg:'Dégâts',luck:'Chance',speed:'Vitesse',dmgPercent:'% de dégâts',luckPercent:'% de Chance',speedPercent:'% de Vitesse',vitalityPercent:'% de PV max après bonus',hpPercent:'% de PV max',omen:'% de Riposte par impact subi'};
const rngInt=(a,b,rng=Math.random)=>a+Math.floor(rng()*(b-a+1));

const fresh=()=>({forgeurStoryVersion:FORGEUR_STORY_VERSION,profile:newProfile(),forge:{unlocked:false,itemId:null},achievements:newAchievements(),version:1,progressionVersion:1,nahatStoryVersion:1,drunnStoryVersion:1,balanceVersion:BALANCE_VERSION,hero:null,gold:0,items:[],resources:{},equipped:{weapon:null,armor:null,accessory:null,accessory2:null,orb:null},cleared:0,rift:{cleared:0},missions:{forest:false},battle:null,storyScene:null,wolffyStory:{cemetery:0},stibiliChapter2:{cleared:0,voidForm:false}});
function migrateBalance(s){
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
function summon(s,key){
 if(s.hero)throw Error('Un compagnon est déjà invoqué.');
 if(!Object.hasOwn(CLASSES,key))throw Error('Choisissez un compagnon.');
 if(!companionAvailable(key,s.profile))throw Error('Ce compagnon n’est pas disponible.');
 s.hero={key,level:1,xp:0,allocated:emptyAllocation(),baseStatsVersion:['nahat','forgeur'].includes(key)?3:key==='wolffy'?1:2};return s.hero;
}
function probabilities(v,cap=.5){v.luck=Math.max(0,v.luck);v.speed=Math.max(0,v.speed);v.crit=Math.min(cap,v.luck/300);v.double=Math.min(cap,v.speed/300);return v;}
function statBreakdown(s){
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
const stats=s=>statBreakdown(s).values;
const nahatWeaponFamily=s=>s.hero?.key==='nahat'?(ITEMS[equippedItem(s,'weapon')?.type]?.family??equippedItem(s,'weapon')?.type):null;
const plumesPercent=s=>20+10*Math.min(13,Math.max(0,s.battle?.plumesStacks??0));
// One shared entry point for enemy dispels. Equipment and survival costs are not removable buffs.
function dispelHeroBonuses(b){
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

function compatibleItem(s,type){
 const d=ITEMS[type];return !!(s.hero&&d&&!d.excludeOwners?.includes(s.hero.key)&&(!d.owner||d.owner===s.hero.key||s.hero.key==='forgeur'&&d.family==='protege-bras')&&(d.consumable||['armor','orb','accessory'].includes(d.slot)||(d.slot==='weapon'&&(d.owner===s.hero.key||s.hero.key==='forgeur'&&d.family==='protege-bras'||(d.family||type)===CLASSES[s.hero.key].weapon||(s.hero.key==='nahat'&&d.family==='lame-sabre')))));
}
function itemUnlocked(s,type){const d=ITEMS[type];return !!(d&&!d.questOnly&&!d.craftOnly&&compatibleItem(s,type));}
const resalePrice=item=>ITEMS[item?.type]?.sellPrice??(ITEMS[item?.type]?.slot?Math.ceil((item.purchasePrice??ITEMS[item.type].price??0)*itemRarity(item).salePercent/100):0);
const shopItems=s=>Object.keys(ITEMS).filter(type=>ITEMS[type].price&&!ITEMS[type].craftOnly&&compatibleItem(s,type));
const trainingGoldRange=s=>ECONOMY.trainingGold.map(n=>n+(Math.max(s.cleared,s.drunnLegacyCleared??0,s.nahatLegacyCleared??0)>=ECONOMY.trainingBonusFromCleared?ECONOMY.trainingBonus:0));
const worldGoldRange=stage=>stage>=ECONOMY.lateWorldFromStage?[ECONOMY.lateWorldGold,ECONOMY.lateWorldGold]:ECONOMY.worldGold;
function buy(s,type,rng=Math.random){
 const def=ITEMS[type];if(!s.hero||s.battle||s.storyScene||!def||def.unique||def.craftOnly||!compatibleItem(s,type))throw Error('Objet indisponible.');
 if(!itemUnlocked(s,type))throw Error('Objet indisponible à l’achat.');
 if(s.gold<def.price)throw Error('Or insuffisant.');
 const item=createItem(type,rng);s.gold-=def.price;s.items.push(item);recordAchievement(s,'spent',def.price);if(def.slot==='weapon'&&equipmentLevel(type)===3)recordAchievement(s,'goldBought');if(isAstral(item))recordAchievement(s,def.slot==='weapon'?'astralWeapons':'astralArmors');if(isAstral(item)&&!s.forge?.unlocked){s.forge={unlocked:true,itemId:null,announce:true};}return item;
}
function equip(s,id,requestedSlot=null){
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
function extractEssence(s,id){
 if(s.hero?.key!=='stibili'||s.battle||s.storyScene)throw Error('Extraction réservée à Stibili au camp.');
 if(s.essences?.foudroiement)throw Error('Foudroiement est déjà appris définitivement.');
 const item=s.items.find(i=>i.id===id);if(item?.type!=='grimoire-dore')throw Error('Choisissez un Grimoire doré dans cet inventaire.');
 s.items=s.items.filter(i=>i.id!==id);for(const slot of Object.keys(s.equipped))if(s.equipped[slot]===id)s.equipped[slot]=null;
 s.essences={...s.essences,foudroiement:true};return 'foudroiement';
}
function sell(s,id){
 if(s.battle)throw Error('Terminez le combat.');
 const item=s.items.find(i=>i.id===id),price=resalePrice(item);
 if(s.forge?.itemId===id)throw Error('Retirez cet équipement de la Forge Cosmique avant de le vendre.');
 if(!item||!price)throw Error('Cet objet ne peut pas être revendu.');
 s.items=s.items.filter(i=>i.id!==id);
 for(const slot of Object.keys(s.equipped))if(s.equipped[slot]===id)s.equipped[slot]=null;
 s.gold+=price;return price;
}
const potionCount=s=>s.items.filter(i=>i.type==='potion-soin').length;
function consumePotion(s){
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
const chargedMultiplier=charges=>.88*(1+.20*Math.min(5,Math.max(0,charges)));
const heroArt=(s,combat=!!s.battle)=>s.hero?.key==='forgeur'?(combat?forgeArt(s.battle):'forgeur-classic'):s.hero?.key==='nahat'?(combat?'nahat-ado-combat':'nahat-ado'):s.hero?.key==='wolffy'&&equippedItem(s,'armor')?.type==='armure-complete-astral'?'wolffy-armure-astral':s.hero?.key==='wolffy'&&equippedItem(s,'armor')?.type==='armure-complete'?'wolffy-armure':s.hero?.key==='stibili'&&s.stibiliChapter2?.voidForm?'stibili-neant':s.battle?.matriarch?'kaerune-forme-2':CLASSES[s.hero.key].art;
const wolfPupDamage=(p,round)=>p.dmg*((p.furyUntil??0)>=round?1.2:1);
const hurricaneMultiplier=s=>.8*1.1**(s.battle?.hurricaneStacks??0);
const forestUnlocked=s=>false;
const chapterSize=(s,chapter=1)=>Object.keys(storyRoute(s.hero?.key,chapter)?.missions??(chapter===1?WOLFFY_MISSIONS:{})).length;
const getAchievements=s=>achievementRows(s,chapterSize(s));
function grantExperience(s,amount){
 const old=s.hero.level;if(old>=MAX_LEVEL){s.hero.xp=0;return 0;}
 s.hero.xp+=Math.max(0,Math.floor(amount));while(s.hero.level<MAX_LEVEL&&s.hero.xp>=xpNeed(s.hero.level)){s.hero.xp-=xpNeed(s.hero.level);s.hero.level++;}
 if(s.hero.level>=MAX_LEVEL)s.hero.xp=0;
 if(s.hero.level>old)s.pendingLevelUp={from:s.pendingLevelUp?.from??old,to:s.hero.level};
 return s.hero.level-old;
}
function claimAchievement(s,id){
 if(!s.hero||s.battle||s.storyScene)throw Error('Récupérez vos récompenses au camp, après le combat ou le récit.');
 const d=getAchievements(s).find(d=>d.id===id);if(!d||!d.ready||d.claimed)throw Error('Récompense indisponible ou déjà récupérée.');
 ensureAchievements(s);s.achievements.claimed.push(id);s.gold+=d.reward.gold??0;
 const xp=s.hero.level>=MAX_LEVEL?0:d.reward.level?xpNeed(s.hero.level):d.reward.xp??0;
 const levels=grantExperience(s,xp);return {...d.reward,xp,levels};
}

const chapterCleared=(s,chapter=1)=>chapter===2&&s.hero?.key==='stibili'?(s.stibiliChapter2?.cleared??0):chapter===1?s.cleared:0;
const chapterUnlocked=(s,chapter=1)=>chapter===1||chapter===2&&s.hero?.key==='stibili'&&s.cleared>=chapterSize(s);
function applyStoryMilestone(s,scene,skip=false){
 if(s.hero?.key!=='stibili'||scene.chapter!==2||scene.phase==='recap')return;
 const lines=storyLines(scene.stage,scene.phase,s.hero.key,2);
 if((skip?lines:lines.slice(0,scene.index+1)).some(f=>f.voidForm)){s.stibiliChapter2??={cleared:0,voidForm:false};s.stibiliChapter2.voidForm=true;}
}
function beginStory(s,stage,replay=false,chapter=1){
 if(!chapterUnlocked(s,chapter)||!storyRoute(s.hero?.key,chapter)||s.battle||s.storyScene||!storyRoute(s.hero.key,chapter).missions[stage])throw Error('Récit indisponible.');
 const cleared=chapterCleared(s,chapter);if(replay?stage>cleared:stage!==cleared+1)throw Error('Mission verrouillée.');
 const phase=replay?'recap':s.hero.key==='wolffy'&&stage===7&&s.wolffyStory?.cemetery?'between':'before';
 s.storyScene={stage,phase,index:0,chapter};applyStoryMilestone(s,s.storyScene);
 if(!storyLines(stage,phase,s.hero.key,chapter).length)advanceStory(s,true);
}
function advanceStory(s,skip=false){
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
const heroBurnPercent=b=>b?.burning?5+Math.max(0,(b.cobraBurnStacks??0)-1):0;
const enemyCritChance=(e,round)=>e.riftKind==='spectralGuard'?1/3:e.storyKind==='arenaDrannex'?.24:e.storyKind==='ozvex'?Math.min(.5,.35*(1-Math.exp(-(e.luck??18)/55))+((e.wingsUntil??0)>=round?.15:0)):0;
function startBattle(s,mode,stage=1,rng=Math.random,chapter=1){
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
function combatStats(s){
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
const skillUnlocked=(s,id)=>{const d=SKILLS[id];return !!(s.hero&&d&&d.owner===s.hero.key&&(!d.ephemeral||!!s.battle?.rebeccaReady)&&(d.requiresItem?(equippedItem(s,'weapon')?.type===d.requiresItem||id==='foudroiement'&&s.essences?.foudroiement===true):d.unlockChapter2?chapterCleared(s,2)>=d.unlockChapter2:d.unlockStage?s.cleared>=d.unlockStage:s.hero.level>=d.level));};
const availableSkills=s=>Object.entries(SKILLS).filter(([id])=>skillUnlocked(s,id)&&s.battle?.disabledSkill!==id).map(([id,v])=>({id,...v}));
function skillReady(s,id){
 const b=s.battle,d=SKILLS[id];
 if(id==='entailles'&&forgeState(b)!=='hot')return false;
 if(b?.disabledSkill===id||actionAlreadyUsed(s,id))return false;
 if(id==='transmutation'&&!(b?.accumulation>0)||id==='extraction'&&!(b?.enemies[b.target]?.hp>0?b.enemies[b.target]:b?.enemies.find(e=>e.hp>0))?.poisonStacks)return false;
 if(id==='soin'&&((b?.healCharges??2)<=0||b?.healLastTurn===b?.round))return false;
 if(id==='fumee'&&b?.smokeUsed||id==='elementaire'&&(b?.elementalSacrificeUsed||elementalMissing(s).length)||id==='sacrifice'&&b?.hp>=b?.maxHp)return false;
 return !!(b&&d&&!b.openingPending&&!b.sealedMagic&&!(id==='larve'&&b.larvaUsed)&&!d.automatic&&skillUnlocked(s,id)&&!(id==='redressement'&&b.redressement)&&b.round>=(b.cooldowns[id]??1)&&!(id==='puissance'&&b.powerCasts)&&!(id==='meute'&&livingPups(b).length>=2)&&!(id==='epine'&&b.hp<=0)&&!(id==='nuageux'&&b.hp>=b.maxHp&&!livingPups(b).length));
}
function skillText(s,id){
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
function heroEffects(s){
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
function enemyEffects(e,round=1){
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
function resolveAction(s,action,rng=Math.random){
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
  if(id==='fracas'){hit(forgeWas==='hot'?1.75:1.25,false,'forge-sword');const gain=b.forgeNextFracas?2:1;b.forgeNextFracas=false;changeTension(forgeTension(b)+gain);}
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
const adventureId=state=>state?.hero?(state.adventureId??state.hero.key):null;
const adventureNumber=state=>state?.adventureNumber??1;
function createCompanionAdventure(key,companions,profile=null){
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
function packCompanionSave(active,companions){
 syncProfile(active,companions);const slots={};
 for(const [id,state]of Object.entries(companions)){if(!validAdventureSlot(id,state))throw Error('Emplacement d’aventure invalide.');slots[id]=adventureSnapshot(state);}
 const id=adventureId(active);
 if(id){if(!validAdventureSlot(id,active))throw Error('Aventure active invalide.');slots[id]=adventureSnapshot(active);}
 return {...adventureSnapshot(active),companionSaveVersion:2,activeAdventureId:id,companions:slots};
}
function restoreCompanionSave(raw){
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
function applyTestCode(s,code){
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

return {ACHIEVEMENTS,BALANCE_VERSION,BASIC_VARIANCE,CLASSES,DRUNN_MISSIONS,ECONOMY,ENEMIES,EXPEDITIONS,ITEMS,KAERUNE_MISSIONS,LABELS,LEGACY_KEYS,MAX_LEVEL,NAHAT_MISSIONS,PASSIVES,RARITIES,RECIPES,RECOMMENDED,RESOURCES,RIFT_CREATURES,RIFT_FLOORS,RIFT_LEVEL,SKILLS,STAR_NAMES,STAT_GAINS,STIBILI_MISSIONS,STORY_CAST,TRAINING_BESTIARY,TRIALS,WOLFFY_CHAPTER,WOLFFY_MISSIONS,accessoryOf,acharnement,actionAlreadyUsed,activeShields,addForgeStar,advanceStory,adventureId,adventureNumber,allocateStats,applyTestCode,availableSkills,basicAttackPower,basicDamageRange,basicMultiplier,battleAllies,battleUnit,beginStory,bowPassiveActive,buy,buyResource,chapterCleared,chapterSize,chapterUnlocked,chargedMultiplier,claimAchievement,cleanseHero,combatStats,companionAvailable,compatibleItem,consumePotion,craft,craftCandidates,craftReady,createCompanionAdventure,createItem,crocsPercent,destroyForgeStar,dispelHeroBonuses,dodgeChance,drunnIntent,earnedPoints,elementalMissing,emptyAllocation,enemyBoosted,enemyCritChance,enemyDamage,enemyEffects,equip,equipmentLevel,equippedAccessories,equippedItem,equippedTitle,expeditionIntent,expeditionXp,expeditionXpDivisors,expeditionXpRange,extractEssence,fireballPercent,forestUnlocked,forgeArt,forgeState,forgeTension,forgedStatKeys,fresh,getAchievements,grantExperience,hasRarity,healHero,heroArt,heroBurnPercent,heroEffects,hurricaneMultiplier,isAstral,itemPassiveText,itemRarity,itemStats,itemUnlocked,lastBreathReady,livingPups,majesticBracelet,markedPrey,migrateBalance,nahatIntent,nahatWeaponFamily,newProfile,omenRate,packCompanionSave,placeForgeItem,plumesPercent,pointsAtLevel,potionCount,potionHealPercent,rarityStats,reforgePrice,reforgeStats,remainingPoints,removeForgeItem,resalePrice,resolveAction,resourceDropBonus,resourceDropChance,resourceOrigin,resourceQuantity,resourceTotal,restoreCompanionSave,retreatBattle,riftCleared,riftFloor,riftIntent,riftReplays,riftUnlocked,rngInt,rollRarity,sell,sellResource,setCompanionTitle,shieldCapacity,shieldTotal,shopItems,skillReady,skillText,skillUnlocked,smokeActive,starText,startBattle,statBreakdown,stats,storyLines,storyRoute,summon,syncProfile,trainingEncounter,trainingGoldRange,trialIntent,unlockedTitles,wolfPupDamage,worldGoldRange,xpNeed};
})();
modules["battle-fx.mjs"]=(()=>{
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
function clearBattleEffects(){for(const n of liveEffects)n.remove();liveEffects.clear();}
// Labels stay readable even when reduced motion suppresses the decorative effects.
async function combatCueEffect(kind,unit,details={}){
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
async function distressEffect(){
 const root=stage(),hero=document.getElementById('hero'),p=anchor(hero);if(!root||!p)return;
 const r=root.getBoundingClientRect(),falls=[];
 for(let i=0;i<(reduced()?3:15);i++){
  const x=20+(i*83%(Math.max(80,r.width-40))),n=node('fx-white-feather',x,15,26+i%4*7,'#fff');
  falls.push(motion(n,[{opacity:0,transform:center(.65,-35)},{opacity:1,offset:.18,transform:`translate(-50%,${r.height*.15}px) rotate(5deg)`},{opacity:.9,offset:.68},{opacity:0,transform:`translate(calc(-50% + ${i%2?30:-30}px),${r.height*.74}px) rotate(${i%2?80:-80}deg)`}],1600,{delay:i%5*100}));
 }
 ring(p,'#fff1bf',150,900);await Promise.all(falls);
}
async function castEffect(event){
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
async function strikeEffect(event,from,to){
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
async function transformationEffect(event,swap){
 const p=anchor(document.getElementById('hero'));if(!p){swap();return;}
 const color=event.matriarch?'#8fe9ff':'#ffdb8e';
 ring(p,color,180,1100);
 const n=node('fx-transformation',p.x,p.y,Math.max(150,p.h),color);
 motion(n,[{opacity:0,transform:center(.3)},{opacity:.92,offset:.36,transform:center(1)},{opacity:.55,offset:.6,transform:center(1.1)},{opacity:0,transform:center(1.45)}],1050);
 await pause(380);swap();sparks(p,event.matriarch?'#ffc975':color,30,110);await pause(610);
}

async function enemyStoryEffect(event,unit,onReform=()=>{}){
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

async function diceEffect(event){
 const root=stage();if(!root)return;
 const refusal=event.skill==='refus',lightning=event.skill==='foudroiement',success=refusal?event.success:lightning?event.empowered:!!event.bonus;
 const box=document.createElement('div');box.className='combat-die die-spinning'+(lightning?' lightning-die':'');box.setAttribute?.('role','status');box.setAttribute?.('aria-live','polite');
 box.innerHTML=`<strong>${refusal?'Nahat · Refus de mourir':lightning?'Stibili · Foudroiement':'Maëlla · Éclat du destin'}</strong><span class="die-face">⚀</span><p>${refusal?(event.upgraded?'1, 2 ou 6 : survie et bouclier de 3 %.':'6 : survie avec 30 % des PV max.'):lightning?'1 ou 6 : éclair bleu à 175 %.':'5 ou 6 : une frappe supplémentaire à 10 %.'}</p>`;root.append(box);liveEffects.add(box);
 if(!reduced())for(const face of ['⚁','⚃','⚅']){const el=box.querySelector('.die-face');if(el)el.textContent=face;await new Promise(resolve=>setTimeout(resolve,100));}
 box.classList.remove('die-spinning');if(success)box.classList.add('success');
 box.innerHTML=`<strong>${refusal?'Refus de mourir':lightning?'Foudroiement':'Maëlla'} · Dé : ${event.roll} / 6</strong><span class="die-face">${['⚀','⚁','⚂','⚃','⚄','⚅'][event.roll-1]}</span><p>${refusal?(success?'Nahat survit · Insoignable · dégâts −20 %':'Le destin refuse.'):lightning?(success?'Éclair bleu · 175 % de puissance !':'Éclair jaune · 100 % de puissance'):event.bonus?`Seconde frappe : ${event.bonus} dégâts<br>10 % des ${event.base} dégâts infligés`:'Aucune frappe supplémentaire.'}</p>`;
 await new Promise(resolve=>setTimeout(resolve,1500));discard(box);
}

async function riftEntryEffect(){
 const overlay=document.createElement('div');overlay.className='rift-entry';overlay.setAttribute('role','status');overlay.innerHTML='<span class="rift-entry-ring" aria-hidden="true"></span><strong>Fissure du Néant</strong><span>La descente commence…</span>';document.body.append(overlay);
 try{await overlay.animate([{opacity:0},{opacity:1,offset:.22},{opacity:1,offset:.7},{opacity:0}],{duration:reduced()?120:1350,easing:'ease-in-out',fill:'forwards'}).finished.catch(()=>{});}finally{overlay.remove();}
}

async function drunnTechniqueEffect(kind,unit){
 const p=anchor(unit);if(!p)return;
 if(kind==='sand'){
  for(let i=0;i<16;i++){const dust=node('fx-sand-dust',p.x+(i%4-1.5)*22,p.y+(Math.floor(i/4)-1.5)*22,35+i%3*12,'#e6c37d');motion(dust,[{opacity:0,transform:'translate(-100%,-50%) scale(.3)'},{opacity:.6,offset:.35},{opacity:0,transform:'translate(70%,-80%) scale(1.8)'}],1000,{delay:i*18});}await pause(1100);
 }else{ring(p,'#ff9b3d',180,1100);sparks(p,'#ffd778',20,70);await pause(1100);}
}

// First-person passage: keep the old screen covered until the destination is ready.
async function traversalEntryEffect(arrive){
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

async function expeditionTechniqueEffect(event,unit){
 const a=anchor(unit);if(!a)return;
 const ice=event.type==='expedition-ward'||event.kind==='frostdummy',color=ice?'#b7f2ff':event.kind==='magmagolem'?'#ff893d':event.kind==='lantern'?'#f982c5':'#e8dcc2';
 ring(a,color,ice?125:95,620);sparks(a,color,12,65);await pause(430);
}

async function masteryEffect(event,unit){
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
async function signatureEffect(portrait){
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
async function forgeurEffect(event,unit){
 const p=anchor(unit);if(!p)return;
 if(event.type==='forge-tension'){
  const anvil=node('fx-forge-anvil',p.x,p.top+10,94,'#ff7058');if(anvil)anvil.innerHTML='<svg viewBox="0 0 90 45"><path fill="#38202b" stroke="#ff795c" stroke-width="2" d="M4 8H66V2H83V17H67L57 27V34H73V42H20V34H35V25L24 18H15Z"/><path stroke="#ffdeb1" d="M10 10H62M23 39H68"/></svg><img class="mini-forge-sword" src="assets/epee-dieux-nuageux.webp" alt="">';
  sparks({...p,y:p.top+18},'#ff754e',14,55);const forge=motion(anvil,[{opacity:0,transform:center(.75)},{opacity:1,offset:.2,transform:center(1)},{opacity:1,offset:.75},{opacity:0,transform:'translate(-50%,calc(-50% - 20px)) scale(.9)'}],800);
  if(event.fromState!==event.state){
   const sprite=unit.querySelector('.art'),color=event.state==='cold'?'#82d5ff':event.state==='hot'?'#ff6544':'#f1b780';ring(p,color,160,700);
   if(sprite){if(sprite.animate&&!reduced())await sprite.animate([{opacity:1,filter:'brightness(1)',transform:'scale(1)'},{opacity:.12,filter:'brightness(2)',transform:'scale(.96)'}],{duration:220,fill:'none'}).finished.catch(()=>{});
    sprite.src='assets/'+event.art+'.webp';
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

return {castEffect,clearBattleEffects,combatCueEffect,diceEffect,distressEffect,drunnTechniqueEffect,enemyStoryEffect,expeditionTechniqueEffect,forgeurEffect,masteryEffect,riftEntryEffect,signatureEffect,strikeEffect,transformationEffect,traversalEntryEffect};
})();
modules["app.mjs"]=(()=>{
const {titleOrnament,titleTextClass,isVoidTitle,titleOrnamentMarkup,voidOrnamentOverlay,ornamentPhase}=modules["title-ornaments.mjs"];
const {createMusicPlayer,musicTheme}=modules["music.mjs"];
const {showPurchaseReveal}=modules["purchase-reveal.mjs"];
const {forgeTension,forgeState,forgeArt,companionAvailable,syncProfile,retreatBattle,adventureId,adventureNumber,createCompanionAdventure,wolfPupDamage,applyTestCode,isAstral,itemStats,forgedStatKeys,STAR_NAMES,starText,placeForgeItem,addForgeStar,destroyForgeStar,removeForgeItem,majesticBracelet,actionAlreadyUsed,potionHealPercent,dispelHeroBonuses,resourceOrigin,expeditionXpRange,expeditionXpDivisors,getAchievements,claimAchievement,equippedTitle,unlockedTitles,setCompanionTitle,nahatIntent,activeShields,shieldTotal,shieldCapacity,markedPrey,extractEssence,EXPEDITIONS,expeditionIntent,TRIALS,trialIntent,buyResource,drunnIntent,RIFT_CREATURES,riftReplays,riftCleared,riftUnlocked,riftFloor,riftIntent,cleanseHero,smokeActive,crocsPercent,elementalMissing,lastBreathReady,battleUnit,livingPups,equipmentLevel,resourceDropChance,resourceDropBonus,RARITIES,itemRarity,hasRarity,rarityStats,itemPassiveText,RECIPES,craftCandidates,craftReady,craft,ENEMIES,RESOURCES,TRAINING_BESTIARY,resourceQuantity,resourceTotal,sellResource,reforgePrice,reforgeStats,packCompanionSave,restoreCompanionSave,MAX_LEVEL,storyRoute,chapterSize,chapterCleared,chapterUnlocked,STORY_CAST,WOLFFY_CHAPTER,WOLFFY_MISSIONS,storyLines,beginStory,advanceStory,ECONOMY,LEGACY_KEYS,migrateBalance,CLASSES,ITEMS,SKILLS,LABELS,fresh,summon,stats,combatStats,xpNeed,buy,equip,sell,heroEffects,enemyEffects,shopItems,trainingGoldRange,worldGoldRange,consumePotion,potionCount,chargedMultiplier,hurricaneMultiplier,heroArt,STAT_GAINS,RECOMMENDED,PASSIVES,emptyAllocation,pointsAtLevel,earnedPoints,remainingPoints,allocateStats,statBreakdown,basicMultiplier,basicDamageRange,itemUnlocked,resalePrice,enemyDamage,startBattle,resolveAction,availableSkills,skillUnlocked,skillReady,skillText,forestUnlocked}=modules["engine.mjs"];
const {forgeurEffect,signatureEffect,masteryEffect,expeditionTechniqueEffect,traversalEntryEffect,drunnTechniqueEffect,riftEntryEffect,combatCueEffect,diceEffect,enemyStoryEffect,castEffect,strikeEffect,transformationEffect,clearBattleEffects,distressEffect}=modules["battle-fx.mjs"];
const music=typeof createMusicPlayer==='function'?createMusicPlayer():null;
const app=document.querySelector('#app'),SAVE='astral-compagnons-v1';
let essenceRequest=null,forgeRequest=null,practiceRequest=null;
let signatureAnimations=true;try{signatureAnimations=localStorage.getItem('astralfighter-signatures-v1')!=='off';}catch{}
let liberating=false;
let trialSelected=null,expeditionSelected='forest';
let riftSelected=null,openingScheduled=false,combatBagOpen=false,combatBagContext=null;
const inventoryExpanded=new Map();let selectedInventoryItem=null,combatInspection=null;
let combatTipTimer=null,combatTipSlot=null;
let newAdventureMode=false;
let companions={},home=true,saveBlocked=false,inventoryView='equipment',resourceSale=null;
let s=fresh(),tab='world',busy=false,result=null,sound=music?.enabled??false,audioContext,toastTimer,selectedHero=null,saleItemId=null,allocationDraft=emptyAllocation();
const num=n=>new Intl.NumberFormat('fr-FR',{maximumFractionDigits:1,notation:n>=1e7?'compact':'standard'}).format(n);
const pct=n=>(n*100).toFixed(1)+' %';
function toast(t){const el=document.querySelector('#toast');el.textContent=t;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),4200);}
function save(){
 if(saveBlocked){toast('Sauvegarde inaccessible : votre ancienne progression est conservée.');return false;}
 try{localStorage.setItem(SAVE,JSON.stringify(packCompanionSave(s,companions)));if(s.hero)companions[adventureId(s)]=s;return true;}catch{toast('La sauvegarde locale est indisponible dans ce navigateur.');return false;}
}
try{const raw=localStorage.getItem(SAVE);if(raw){const restored=restoreCompanionSave(JSON.parse(raw));s=restored.active;companions=restored.companions;if(restored.changed)save();}}
catch{saveBlocked=true;toast('Sauvegarde inaccessible. Votre ancienne progression est conservée ; cette session ne sera pas enregistrée.');}
const companionCard=key=>`<img class="selection-card-image" src="assets/cards/${key}.webp" alt="Carte ASTRAL CARDS de ${CLASSES[key].name}" width="744" height="1038" decoding="async" draggable="false">`;
const artSrc=name=>`assets/${name}.webp`;
const art=(name,extra='')=>`<img class="art ${extra} " src="${artSrc(name)}" alt="" decoding="async" draggable="false">`;
const itemArt=(type,extra='')=>`<img class="item-art ${extra}" src="assets/${type}.webp" alt="" decoding="async" draggable="false">`;
// Supplied artwork stays decorative: the adjacent name remains the accessible label.
const abilityIcon=(id,kind='skill')=>`<img class="ability-icon" src="assets/icons/${kind}-${id==='piege'?'absorbante':id}.webp${id==='meute'||kind==='passive'&&id==='nahat'?'?v=3':''}" width="40" height="40" alt="" decoding="async" draggable="false">`;
const mysteryIcon=()=>'<span class="ability-icon mystery-icon" aria-hidden="true">?</span>';
const preloadedForms=new Set();
function preloadForm(){if(s.hero?.key==='forgeur'&&globalThis.Image)for(const name of ['forgeur-classic','forgeur-defensif-v2','forgeur-offensif']){if(!preloadedForms.has(name)){const img=new Image();img.src=artSrc(name);preloadedForms.add(name);img.decode?.().catch(()=>preloadedForms.delete(name));}}const name=s.hero?.key==='kaerune'&&s.hero.level>=5?'kaerune-forme-2':null;if(!name||preloadedForms.has(name)||!globalThis.Image)return;const img=new Image();img.src=artSrc(name);preloadedForms.add(name);img.decode?.().catch(()=>preloadedForms.delete(name));}
const itemName=i=>ITEMS[i.type].name+(i.rank?' +'+i.rank:'');
const itemLevelLabel=type=>equipmentLevel(type)?' · Niveau '+equipmentLevel(type):'';
const rarityClass=i=>hasRarity(i.type)?' rarity-'+itemRarity(i).id:'';
const rarityBadge=i=>hasRarity(i.type)?`<span class="rarity-label">${itemRarity(i).name}${i.legacyRoll?' · jet antérieur':''}</span>`:'<span class="rarity-label">Orbe unique</span>';
const statString=o=>Object.entries(o).map(([k,v])=>k==='stoneShieldPercent'?`Bouclier : ${v} % des PV max`:k==='allStatsPercent'?`+${v} % à toutes les statistiques`:k==='hpPercent'?`+${v} % de PV max`:`${v>=0?'+':'−'}${num(Math.abs(v))} ${LABELS[k]}`).join(' · ')||'Aucun bonus de statistique fixe.';
const signed=n=>(n>=0?'+':'−')+num(Math.abs(n));

const battleTitle=b=>b.mode==='practice'?'Entraînement libre':b.mode==='trial'?'Traversée magique · '+TRIALS[b.stage].name:b.mode==='rift'?'Fissure du Néant · Étage '+b.stage:b.mode==='training'?'Expédition · '+EXPEDITIONS[b.expedition??'forest'].name:b.mode==='forest'?'Forêt luxuriante':storyRoute(s.hero.key)?`Chapitre ${b.chapter??1} · ${b.stage}. ${storyRoute(s.hero.key,b.chapter??1).missions[b.stage].title}${b.storyWave===2?' — Cimetière II':''}`:'Monde 1 · Combat '+b.stage;
function riftPortal(){const locked=!riftUnlocked(s);return `<button class="tab rift-tab ${tab==='rift'?'active':''}" data-action="rift-enter" aria-disabled="${locked}" ${locked?'title="Disponible dès le niveau 8 du compagnon"':''}>Fissure du Néant</button>`;}
function riftScreen(){
 const cleared=riftCleared(s),selected=riftSelected??Math.min(50,cleared+1),f=riftFloor(selected),open=riftUnlocked(s),canEnter=open&&selected<=cleared+1&&!(selected===50&&cleared===50),first=Math.floor((selected-1)/10)*10+1;
 const replay=selected<=cleared,replayCount=riftReplays(s,selected),exhausted=replay&&(replayCount>=5||selected===50),fullXp=s.hero.level>=MAX_LEVEL?0:Math.round(Math.round(xpNeed(s.hero.level)*.2)*.65),xp=exhausted?0:replay?Math.round(fullXp*.25):fullXp;
 return `<section class="rift-screen"><div class="rift-heading"><div><div class="eyebrow">UNE DESCENTE EN 50 ÉTAGES</div><h2>Fissure du Néant</h2><p>Plongez dans la fissure du Néant et affrontez les créatures pour tester vos compétences et gagner des récompenses !</p></div><span class="rift-progress"><b>${cleared}<small> / 50</small></b>étages vaincus</span></div><div class="rift-depths" aria-label="Profondeur">${Array.from({length:5},(_,i)=>`<button data-action="rift-select" data-stage="${i*10+1}" class="${f.depth===i?'active':''}" aria-pressed="${f.depth===i}">${i*10+1}–${i*10+10}</button>`).join('')}</div><div class="rift-floor-grid" aria-label="Étages">${Array.from({length:10},(_,i)=>{const n=first+i,d=riftFloor(n),locked=n>cleared+1;return `<button data-action="rift-select" data-stage="${n}" class="rift-floor ${n===selected?'selected':''} ${n<=cleared?'cleared':''} ${locked?'locked':''} ${d.boss?'dragon-floor':d.mini?'guardian-floor':''}" aria-pressed="${n===selected}" aria-label="Étage ${n}, ${d.boss?'Draconoros':d.mini?'mini-boss':'combat'}${locked?', verrouillé':n<=cleared?', terminé':''}"><span>${d.boss?'◆':d.mini?'✦':n<=cleared?'✓':locked?'·':'↓'}</span><b>${n}</b><small>${d.boss?'Boss':d.mini?'Gardien':n<=cleared?'Vaincu':locked?'Verrouillé':'Combat'}</small><small class="rift-replay-count">${n===50?'Sans relecture':riftReplays(s,n)+' / 5'}</small></button>`;}).join('')}</div><div class="rift-encounter"><div class="rift-portraits ${f.kinds.length>1?'rift-party':''}">${f.kinds.map(k=>art(RIFT_CREATURES[k].art)).join('')}<span class="rift-floor-stamp">${String(selected).padStart(2,'0')}</span></div><div class="rift-brief"><div class="eyebrow">ÉTAGE ${selected} · ${f.boss?'BOSS':f.mini?'MINI-BOSS':f.name.toUpperCase()}</div><h3>${f.kinds.map(k=>RIFT_CREATURES[k].name).join(' · ')}</h3><p class="rift-recommended">Niveau conseillé : <b>${f.level}</b>${selected>42?' · défi de niveau maximum':''}</p><p class="rift-replay-summary">Relectures gagnées : <b>${selected===50?'Aucune relecture possible':replayCount+' / 5'}</b>${exhausted&&selected!==50?' · Jouable sans récompense':''}</p><div class="rift-rewards"><span><b>${replay?(exhausted?0:f.replayGold):f.gold}</b> or</span><span><b>${xp}</b> EXP${exhausted?' · récompenses épuisées':xp?(replay?' · relecture : 25 %':' · environ 13 % du niveau actuel'):' · niveau maximum'}</span>${f.boss?`<span>${selected<=cleared?'Aucun Fragment en relecture':'<b>1</b> Fragment du Néant · première victoire'}</span>`:''}</div><button class="primary rift-start" data-action="rift-fight" data-stage="${selected}" ${canEnter?'':'disabled'}>${!open?'Disponible au niveau 8':selected===50&&cleared===50?'Étage final terminé':!canEnter?'Vaincre l’étage '+(cleared+1)+' pour progresser':exhausted?'Rejouer pour le plaisir':selected<=cleared?'Rejouer cet étage':'Affronter cet étage'}</button><p class="small muted">${CLASSES[s.hero.key].name} · progression et récompenses personnelles.<br>PV restaurés entre les combats. Les 5 premières relectures gagnées : 25 % de l’EXP habituelle et l’or de relecture affiché, sans Fragment. L’étage 50 ne peut pas être rejoué. Ensuite : aucune récompense, jeu libre. Une défaite ou un abandon ne consomme pas de relecture récompensée.</p></div></div><div class="rift-rules">${[...new Set(f.kinds)].map(k=>`<details><summary>${RIFT_CREATURES[k].name} · Compétences</summary><p>${RIFT_CREATURES[k].rule}</p></details>`).join('')}</div>${cleared===50?'<p class="rift-complete">Les cinquante étages sont vaincus. Vous avez atteint le cœur de la Fissure !</p>':''}<p class="bottom-note">Or première victoire / relecture : 1–9 : 15 / 5 ; 10 : 35 / 10 ; 11–19 : 25 / 7 ; 20 : 70 / 20 ; 21–29 : 45 / 15 ; 30 : 90 / 35 ; 31–39 : 80 / 45 ; 40 : 135 / 80 ; 41–49 : 150 / 75 ; 50 : 750, sans relecture.<br>À la première victoire, l’EXP vaut 20 % de l’EXP nécessaire, puis est réduite de 35 % au niveau du compagnon à l’entrée du combat, arrondie au plus proche. La première victoire aux étages 10, 20, 30, 40 et 50 offre 1 Fragment du Néant : 5 maximum par compagnon. Rejouer ne donne aucun Fragment.</p></section>`;
}
function riftIntentPanel(b){if(b.mode!=='rift')return '';return `<section class="rift-intentions" aria-label="Intentions ennemies"><h3>Leur prochaine action</h3><div>${b.enemies.filter(e=>e.hp>0).map(e=>{const intent=riftIntent(e,b);return `<article class="${intent?.danger?'danger':''}" data-intent="${e.id}"><strong>${e.name}</strong><b>${intent?.name??'Attaque'}</b><p>${intent?.text??''}</p><details><summary>Comprendre cette créature</summary><p>${RIFT_CREATURES[e.riftKind].rule}</p></details></article>`;}).join('')}</div></section>`;}

function sidebar(){
 const c=CLASSES[s.hero.key],v=combatStats(s),ornament=titleOrnament(equippedTitle(s));
 return `<aside class="hero-panel${ornament?' has-ornament ornament-'+ornament.id:''}"${ornament?` data-title-ornament="${ornament.id}"`:''}>${ornament?heroOrnament(ornament):''}<div class="hero-summary"><div class="hero-name"><h2>${c.name}</h2><button class="success-link" data-action="achievements" aria-haspopup="dialog">Succès${getAchievements(s).some(d=>d.ready&&!d.claimed)?'<span class="success-ready-dot" aria-label="Récompense disponible"></span>':''}</button><span class="badge">Niv. ${s.hero.level}</span></div>${titleBadge(s)}<p class="role">${c.title}</p>${art(heroArt(s),'portrait')}<div class="xp-label"><span>Expérience</span><span>${s.hero.level>=MAX_LEVEL?'Niveau maximum':num(s.hero.xp)+' / '+num(xpNeed(s.hero.level))}</span></div><div class="bar" role="progressbar" aria-label="Expérience" aria-valuenow="${s.hero.level>=MAX_LEVEL?1:s.hero.xp}" aria-valuemin="0" aria-valuemax="${s.hero.level>=MAX_LEVEL?1:xpNeed(s.hero.level)}"><i style="width:${s.hero.level>=MAX_LEVEL?100:s.hero.xp/xpNeed(s.hero.level)*100}%"></i></div></div><div class="stats">${['hp','dmg','luck','speed'].map(k=>`<div class="stat"><span>${LABELS[k]}</span><strong>${num(v[k])}</strong><em>${k==='luck'?pct(v.crit)+' critiques':k==='speed'?pct(v.double)+' double action':k==='hp'?'PV max':'Dégâts de base'}</em></div>`).join('')}</div><div class="gear"><div class="eyebrow">Équipement</div>${[['weapon','Arme'],['armor','Armure'],['accessory','Accessoire 1'],['accessory2','Accessoire 2'],['orb','Orbe']].map(([slot,label])=>{const i=s.items.find(i=>i.id===s.equipped[slot]);return `<div class="gear-row">${i?itemArt(i.type,'gear-art'):''}<p>${label}<br><b>${i?itemName(i):'Emplacement libre'}</b></p></div>`;}).join('')}</div><button class="character-link" data-action="tab" data-tab="character" ${s.battle||s.storyScene?'disabled':''}>Fiche personnage${remainingPoints(s)>0?` · ${num(remainingPoints(s))} points`: ''}</button><p class="save-note">Progression sauvegardée sur ce navigateur.<br>PV restaurés entre les combats.</p></aside>`;
}
function passiveCard(preview=false){const p={...PASSIVES[s.hero.key]},weapon=s.items.find(i=>i.id===s.equipped.weapon);if(s.hero.key==='nahat'&&['super-rare','legendary'].includes(weapon?.rarity)){if(weapon.type==='lame-sabre-astral')p.text=p.text.replace('25 %','30 %');if(weapon.type==='epee-bouclier-astral')p.text=p.text.replace('55 %','125 %');if(weapon.type==='protege-bras-astral')p.text+='\nProtège-bras Astral : après le premier tour, inflige 2 % des PV max à un ennemi aléatoire au début de chaque tour.';}return `<details class="passive-card"${preview?' data-ability-preview=""':''}><summary>${abilityIcon(s.hero.key,'passive')}<span class="passive-copy"><small>Passif</small><strong>${p.name}</strong></span><span class="passive-expand" aria-hidden="true">＋</span></summary><p>${p.text.replaceAll('\n','<br><br>')}</p></details>`;}
function characterSkills(){
 const skills=Object.entries(SKILLS).filter(([,d])=>d.owner===s.hero.key).sort((a,b)=>(a[1].unlockStage||a[1].unlockChapter2?99:a[1].level)-(b[1].unlockStage||b[1].unlockChapter2?99:b[1].level));
 return `<section class="character-skills" aria-labelledby="character-skills-title"><div class="section-head"><div><div class="eyebrow">VOTRE PROGRESSION</div><h3 id="character-skills-title">Compétences</h3><p>Toutes vos compétences, présentes et à venir. <span class="preview-mouse-hint">Survolez pour agrandir ; cliquez pour garder la carte ouverte.</span><span class="preview-touch-hint">Touchez une carte pour agrandir son icône et lire ses effets.</span></p></div></div><div class="skill-catalog">${skills.map(([id,d])=>{const unlocked=skillUnlocked(s,id);if(d.ephemeral)return `<details class="skill-catalog-card" data-catalog-skill="${id}" data-ability-preview=""><summary>${abilityIcon(id)}<span class="skill-level">Éphémère</span><span class="skill-catalog-name"><strong>${d.name}</strong><small>Extra-action · obtenue en combat dès le niveau ${d.level}</small></span><span class="skill-state">À obtenir avec Pour notre Navigatrice</span></summary><div class="skill-catalog-description"><p>${skillText(s,id)}</p></div></details>`;if(d.requiresItem)return `<details class="skill-catalog-card ${unlocked?'unlocked':'locked'}" data-catalog-skill="${id}" data-ability-preview=""><summary>${abilityIcon(id)}<span class="skill-level">${s.essences?.foudroiement?'Apprise':'Équipement'}</span><span class="skill-catalog-name"><strong>${d.name}</strong><small>${s.essences?.foudroiement?'Essence du Grimoire doré':'Grimoire doré'}</small></span><span class="skill-state">${s.essences?.foudroiement?'✓ Apprise définitivement':unlocked?'✓ Disponible':'🔒 Grimoire ou essence'}</span></summary><div class="skill-catalog-description"><p>${skillText(s,id)}</p></div></details>`;if(d.unlockStage||d.unlockChapter2)return `<details class="skill-catalog-card ${unlocked?'unlocked':'locked mystery-skill'}" data-catalog-skill="${id}" data-ability-preview=""><summary>${unlocked?abilityIcon(id):mysteryIcon()}<span class="skill-level">${unlocked?'Récit':'Niv. ???'}</span><span class="skill-catalog-name"><strong>${d.unlockChapter2&&!unlocked?'????':d.name}</strong><small>${unlocked?'Compétence active':'Effet ???'}</small></span><span class="skill-state">${unlocked?'✓ Débloquée':'🔒 ???'}</span><span class="skill-expand" aria-hidden="true">＋</span></summary><div class="skill-catalog-description">${unlocked?`<p class="skill-availability">${d.unlockChapter2?'Obtenue au chapitre 2, après la capture d’une Larve du Néant.':'Obtenue après votre première victoire contre la Mite du Néant.'}</p><p>${skillText(s,id)}</p>`:'<p>Niv. ??? · Effet ???</p>'}</div></details>`;return `<details class="skill-catalog-card ${unlocked?'unlocked':'locked'}" data-catalog-skill="${id}" data-ability-preview=""><summary>${abilityIcon(id)}<span class="skill-level">Niv. ${d.level}</span><span class="skill-catalog-name"><strong>${d.name}</strong><small>${id==='refus'&&s.hero.level>=24?'Passive · améliorée au niveau 24':d.automatic?'Passive · déclenchement automatique':'Compétence active'}</small></span><span class="skill-state">${unlocked?'✓ Débloquée':'🔒 Niveau '+d.level}</span><span class="skill-expand" aria-hidden="true">＋</span></summary><div class="skill-catalog-description"><p class="skill-availability">${unlocked?'Débloquée au niveau '+d.level+'.':'Se débloque au niveau '+d.level+' · encore '+(d.level-s.hero.level)+' niveau'+(d.level-s.hero.level>1?'x':'')+' à gagner.'}</p><p>${skillText(s,id)}</p></div></details>`;}).join('')}</div></section>`;
}
function characterScreen(){
 const current=stats(s),draftTotal=Object.values(allocationDraft).reduce((a,b)=>a+b,0),available=remainingPoints(s),preview=structuredClone(s);
 for(const k of Object.keys(STAT_GAINS))preview.hero.allocated[k]+=allocationDraft[k];
 const next=stats(preview),breakdown=statBreakdown(preview);
 return `<p class="overflow-note">Chance et Vitesse avant combat : plafond de 150 points chacune, soit 50 %. Chaque point excédentaire donne +1 dégât. Conversion actuelle : +${num(statBreakdown(s).overflowDamage)} dégâts.</p><div class="section-head"><div><div class="eyebrow">FICHE PERSONNAGE</div><h2>${CLASSES[s.hero.key].name}</h2><p>${num(available-draftTotal)} points encore à répartir · ${s.hero.level>=MAX_LEVEL?'Niveau maximum atteint':pointsAtLevel(s.hero.level+1)+' au prochain niveau'}</p></div></div>${s.progressionNotice?'<p class="lesson-note">Vos points ont été ajustés au nouveau barème : 4 par niveau, en conservant au mieux les proportions de votre répartition.</p>':''}<div class="stat-warning"><b>Pensez aux dégâts !</b> Seuls les PV augmentent automatiquement avec les niveaux. Investissez aussi dans les dégâts pour continuer à vaincre les ennemis.</div><div class="allocation-grid">${Object.entries(STAT_GAINS).map(([k,gain])=>`<article class="allocation-card"><label for="allocate-${k}">${LABELS[k]} ${RECOMMENDED[s.hero.key]===k?'<span class="recommended-stat" title="Statistique idéale pour ce personnage" aria-label="Statistique idéale">👍</span>':''}</label><div class="allocation-preview">${num(current[k])}${allocationDraft[k]||next[k]!==current[k]?` <span>→ ${num(next[k])}</span>`:''}</div><p>1 point = +${num(gain)} ${LABELS[k]}</p><div class="allocation-controls"><button data-action="adjust-stat" data-stat="${k}" data-delta="-1" ${allocationDraft[k]<=0?'disabled':''} aria-label="Retirer un point prévu en ${LABELS[k]}">−</button><input id="allocate-${k}" type="number" inputmode="numeric" min="0" max="${available-draftTotal+allocationDraft[k]}" step="1" value="${allocationDraft[k]}" data-stat-input="${k}" aria-label="Points à investir en ${LABELS[k]}"><button data-action="adjust-stat" data-stat="${k}" data-delta="1" ${draftTotal>=available?'disabled':''} aria-label="Prévoir un point en ${LABELS[k]}">+</button></div><small>${s.hero.allocated[k]} points déjà investis${k==='luck'?` · ${pct(next.crit)} de critiques`:k==='speed'?` · ${pct(next.double)} de double action`:''}</small></article>`).join('')}</div><div class="allocation-actions"><button class="primary" data-action="apply-stats" ${!draftTotal?'disabled':''}>Valider ${num(draftTotal)} point${draftTotal>1?'s':''}</button><button data-action="cancel-stats" ${!draftTotal?'disabled':''}>Annuler la préparation</button></div>${reforgePanel()}<p class="bottom-note">Préparez votre répartition puis validez. La reforge permet de récupérer vos points investis. ${s.hero.key==='stibili'?'Les dégâts affichés incluent une réduction de 30 % sur les dégâts naturels et ceux des équipements. Chaque point investi ajoute ensuite 1 dégât. ':''}Vos PV naturels gagnent 13 % par niveau. 3 points de Chance = 1 % de critique ; 3 points de Vitesse = 1 % de double action. Avant combat, les deux probabilités sont plafonnées à 50 %. Les bonus en combat peuvent dépasser ce plafond, jusqu’à 100 %. Avant combat, chaque point au-delà de 150 est converti en 1 dégât.</p>${passiveCard(true)}${breakdown.passiveDamage?`<p class="passive-preview">Bonus actuel du passif : +${num(breakdown.passiveDamage)} dégâts${s.hero.key==='nahat'?` grâce à ${s.items.find(i=>i.id===s.equipped.weapon)?.type==='lame-sabre-astral'&&['super-rare','legendary'].includes(s.items.find(i=>i.id===s.equipped.weapon)?.rarity)?30:25} % de ${num(breakdown.bonusHp)} PV bonus, arrondis à l’inférieur, sans perte de PV`:''}.</p>`:''}${breakdown.equipmentDamage?`<p class="equipment-passive">Arbalète : +${num(breakdown.equipmentDamage)} dégâts grâce aux ${num(preview.hero.allocated.luck)} points de statistiques investis en Chance (voir le passif de l’arme pour le taux par tranche de 4).</p>`:''}${characterSkills()}`;
}
function adventureCard(key,slot=null){
 const c=CLASSES[key],id=slot?adventureId(slot):key;
 return `<button class="companion-card choose-card ${slot?'started-companion':'sealed-companion'}" data-action="${slot?'resume-companion':'choose'}" data-key="${id}" ${slot?'':'aria-haspopup="dialog"'}><span class="role">${c.role}</span><span class="selection-visual">${slot?art(heroArt(slot,false)):companionCard(key)}</span><h2>${c.name}</h2>${slot?`<span class="adventure-number">Aventure n° ${adventureNumber(slot)}</span>`:''}${slot?titleBadge(slot):''}<p>${c.title}</p>${slot?`<span class="companion-progress"><b>Niv. ${slot.hero.level}</b><span>${num(slot.gold)} or</span><span>${chapterUnlocked(slot,2)?`Chap. 2 · ${chapterCleared(slot,2)} / ${chapterSize(slot,2)}`:`${Math.min(slot.cleared,chapterSize(slot))+' / '+chapterSize(slot)+' missions'}`}</span></span><span class="companion-session">${slot.storyScene?'Dialogue en cours':slot.battle?'Combat en cours':'Au camp'}</span>`:'<span class="companion-new">Nouvelle aventure · niveau 1</span>'}<span class="choose-link">${slot?'Reprendre l’aventure':newAdventureMode?'Commencer une nouvelle aventure':'Découvrir ce compagnon'}</span></button>`;
}
function summonScreen(){
 const states=Object.values(companions),first=Object.fromEntries(Object.keys(CLASSES).map(key=>[key,states.filter(c=>c.hero.key===key).sort((a,b)=>adventureNumber(a)-adventureNumber(b))[0]]));
 const extra=states.filter(c=>first[c.hero.key]!==c),cards=Object.keys(CLASSES).filter(key=>companionAvailable(key,s.profile)).map(key=>adventureCard(key,newAdventureMode?null:first[key])).join('')+(newAdventureMode?'':extra.map(c=>adventureCard(c.hero.key,c)).join(''));
 return `<section class="companion-home"><div class="summon-intro"><div class="eyebrow">${s.profile?.unlocks?.forgeur?'SIX':'CINQ'} COMPAGNONS · VOS AVENTURES</div><h1>${newAdventureMode?'Une nouvelle aventure commence':'Choisissez votre combattant'}</h1><p class="muted">${newAdventureMode?'Choisissez votre compagnon. Niveau 1, inventaire vide, histoire et succès à découvrir : tout recommence. Vos autres aventures restent conservées.':'Libérez un compagnon de sa carte, ou retrouvez une aventure déjà commencée.'}</p>${states.length?`<div class="adventure-home-actions"><button class="${newAdventureMode?'ghost':'primary'}" data-action="${newAdventureMode?'cancel-new-adventure':'new-adventure'}">${newAdventureMode?'← Mes aventures':'＋ Nouvelle aventure'}</button><span>${states.length} aventure${states.length>1?'s':''} enregistrée${states.length>1?'s':''}</span></div>`:''}</div><div class="summon-grid adventure-grid">${cards}</div><div class="summon-footer"><p>Chaque aventure possède ses niveaux, son or, ses équipements, ses succès et ses missions.<br>Vous pouvez jouer plusieurs fois le même compagnon et essayer une autre façon de le faire évoluer.</p></div></section>`;
}
function goHome(){
 if(busy||s.hero&&!save())return;clearBattleEffects();newAdventureMode=false;home=true;result=null;allocationDraft=emptyAllocation();saleItemId=null;resourceSale=null;selectedInventoryItem=null;selectedHero=null;render();
}
function resumeCompanion(id){
 if(busy||!Object.hasOwn(companions,id))return;
 if(s.hero&&!save())return;
 const previous=s;s=companions[id];if(!save()){s=previous;return;}
 newAdventureMode=false;home=false;tab=chapterUnlocked(s,2)?'chapter2':'world';result=null;allocationDraft=emptyAllocation();saleItemId=null;resourceSale=null;selectedInventoryItem=null;selectedHero=null;riftSelected=null;if(s.battle?.mode==='rift')tab='rift';render();
}
function reforgePanel(){
 const cost=reforgePrice(s),spent=Object.values(s.hero.allocated).reduce((a,b)=>a+b,0);
 return `<div class="reforge-panel"><div><h3>Reforger les points</h3><p>Récupérez tous les points investis pour les répartir à nouveau.</p><small>${cost===0?'Gratuit et illimité jusqu’au niveau 9 inclus. Dès le niveau 10 : 100 or, puis +5 or par niveau.':`${num(cost)} or à votre niveau · +5 or par niveau supplémentaire. Le prix n’augmente pas avec le nombre de reforges.`}</small>${spent&&s.gold<cost?`<span class="reforge-shortfall">Il vous manque ${num(cost-s.gold)} or.</span>`:''}</div><button data-action="reforge" aria-haspopup="dialog" ${!spent||s.gold<cost?'disabled':''}>Reforger les points <b>${cost?'· '+num(cost)+' or':'· Gratuit'}</b></button></div>`;
}
function worldScreen(){
 if(storyRoute(s.hero.key))return campaignScreen();
 return `<div class="world-banner"><div class="eyebrow">MONDE 01</div><h2>Les terres sauvages</h2><p>Slimes de combat, chiens sauvages et Corkbeaux vous attendent.</p><span class="count">${s.cleared}<span class="muted"> / 10</span></span></div><div class="section-head"><div><h3>Votre traversée</h3><p>Chaque combat remporté est terminé définitivement.</p></div></div><div class="stages">${Array.from({length:10},(_,i)=>{const stage=i+1,done=stage<=s.cleared,locked=stage>s.cleared+1;return `<button class="stage ${done?'completed':!locked?'available':''} ${stage===5?'boss-stage':''}" data-action="world" data-stage="${stage}" ${locked||done?'disabled':''} title="${done?'Combat terminé':locked?'Combat verrouillé':'Lancer ce combat'}"><strong>${done?'✓':String(stage).padStart(2,'0')}</strong><span>Niveau ${stage}<br>${done?'Terminé':stage===5?'Drannex · Boss':[3,6,8,10].includes(stage)?'2 créatures':'1 créature'}</span></button>`;}).join('')}</div><p class="bottom-note">${s.cleared===10?'Monde 1 terminé ! Continuez à progresser en expédition.':'Une difficulté trop élevée ? Entraînez votre compagnon et améliorez son équipement.'}<br>Combats 1 à 5 : 5 à 15 or. Combats 6 à 10 : 22 or fixes. Bonus unique de 15 or au combat 1.</p>`;
}
function chapterTabs(selected=1){const route=storyRoute(s.hero.key);if(route.singleChapter)return '';return `<nav class="chapter-tabs" aria-label="Chapitres de ${CLASSES[s.hero.key].name}"><button class="${selected===1?'primary':''}" data-action="chapter" data-chapter="1">${route.title}</button><button class="${selected===2?'primary':''}" data-action="chapter" data-chapter="2">Chapitre 2 · ${route.nextTitle}</button>${s.hero.key==='stibili'?`<button class="${selected===3?'primary':''}" data-action="chapter" data-chapter="3">Chapitre 3 · ${storyRoute('stibili',2).nextTitle}</button>`:''}</nav>`;}
function campaignScreen(chapter=1){
 const route=storyRoute(s.hero.key,chapter),wolf=s.hero.key==='wolffy',count=chapterSize(s,chapter),cleared=chapterCleared(s,chapter),open=chapterUnlocked(s,chapter);
 return `${s.hero.key==='forgeur'&&s.forgeurResetNotice?'<aside class="forgeur-reset-notice" role="status"><strong>Une nouvelle naissance</strong><p>Le chapitre du Forgeur est arrivé. Cette aventure a été remise au niveau 1, sans équipement ni progression. Son déblocage et vos autres compagnons sont conservés. Cette remise à zéro ne se reproduira pas.</p><button class="ghost" data-action="forgeur-reset-notice">Compris</button></aside>':''}${chapterTabs(chapter)}<div class="world-banner ${wolf?'wolffy-banner':s.hero.key==='kaerune'?'kaerune-banner':s.hero.key==='drunn'?'drunn-banner':s.hero.key==='nahat'?'nahat-banner':'stibili-banner'}"><div class="eyebrow">L’HISTOIRE DE ${CLASSES[s.hero.key].name.toUpperCase()}</div><h2>${route.title}</h2><p>${route.description}</p><span class="count">${Math.min(cleared,count)} / ${count}</span></div>${!open?'<p class="lesson-note">Terminez le chapitre 1 pour entrer dans le Néant.</p>':''}<div class="story-missions">${Object.entries(route.missions).map(([n,m])=>{const stage=Number(n),done=stage<=cleared,locked=!open||stage>cleared+1;return `<article class="story-mission ${done?'completed':locked?'locked':'available'}"><span class="mission-number">${done?'✓':n.padStart(2,'0')}</span><div><h3>${m.title}</h3><p>${done?'Mission terminée':locked?'Terminez la mission précédente':m.gauntlet?'Niveau conseillé : 4 · 4 combats · une seule récompense':m.duel?'Duel non mortel · niveau conseillé : 5':wolf&&stage===7?'Deux rencontres · une seule récompense':m.escape?'Combat pour ouvrir une voie de fuite':m.lesson?'Duel d’apprentissage · défaite scénarisée':m.scriptedDefeat?'Défaite scénarisée · récompenses accordées':m.level?`Niveau conseillé : ${m.level}${stage===6?' (ou 9 bien équipé)':stage===7?'–12 · arme en or':''}`:'Récit et combat'}${locked&&m.level?` · Niveau conseillé : ${m.level}${stage===7?'–12':''}`:''}${m.gearHint?' · '+m.gearHint:''}${m.boss||wolf&&stage===5?' · Boss':''}${m.potionReward?' · Potion de soin offerte':''}</p></div><button data-action="${done?'recap':'world'}" data-stage="${stage}" data-chapter="${chapter}" ${locked?'disabled':''} class="${!locked&&!done?'primary':'ghost'}">${done?'Revoir le récit':locked?'Verrouillée':wolf&&stage===7&&s.wolffyStory?.cemetery?'Cimetière II':'Commencer'}</button></article>`;}).join('')}</div><p class="bottom-note">Les récits peuvent être relus ; les missions terminées ne sont pas rejouables.<br>${s.hero.key==='forgeur'?'Chaque victoire : 5 à 15 or et de l’EXP. Bonus unique de 15 or à la première mission.':s.hero.key==='nahat'?'Mission 1 : 5 à 15 or + 15 or de bienvenue. Traversée des bois : 30 or et l’EXP des quatre combats, uniquement à la fin. Duels : 5 à 15 or et de l’EXP.':chapter===2?'Chaque rencontre rapporte 22 or et de l’EXP, y compris la défaite scénarisée de la première mission.':`Missions 1 à 5 : 5 à 15 or. Missions 6 à ${count} : 22 or. Bonus unique de 15 or à la première mission.`}</p>`;
}
function chapterTwoScreen(){if(storyRoute(s.hero.key)?.singleChapter)return campaignScreen(1);if(s.hero.key==='stibili')return campaignScreen(2);const route=storyRoute(s.hero.key);return `${chapterTabs(2)}<section class="chapter-coming ${s.hero.key==='stibili'?'stibili-next':s.hero.key==='kaerune'?'kaerune-next':''}"><div class="eyebrow">L’HISTOIRE DE ${CLASSES[s.hero.key].name.toUpperCase()} · CHAPITRE 2</div><h2>${route.nextTitle}</h2><p>En cours de développement</p></section>`;}
function chapterThreeScreen(){return `${chapterTabs(3)}<section class="chapter-coming stibili-next"><div class="eyebrow">L’HISTOIRE DE STIBILI · CHAPITRE 3</div><h2>${storyRoute('stibili',2).nextTitle}</h2><p>En cours de développement</p></section>`;}
function storyScreen(){
 const scene=s.storyScene,chapter=scene.chapter??1,route=storyRoute(s.hero.key,chapter),lines=storyLines(scene.stage,scene.phase,s.hero.key,chapter),frame=lines[scene.index],speaker=STORY_CAST[frame.speaker];
 const portrait=(key,side)=>{const c=STORY_CAST[key];if(!c)return '';return `<div class="story-actor ${side} ${c.kind} ${frame.speaker===key?'speaking':'listening'} ${c.silhouette?'silhouette':''} ${frame.speaker===key?frame.effect||'':''}">${art(frame.combatPortrait?(c.combatArt??c.art):key===s.hero?.key?heroArt(s,false):c.art)}</div>`;};
 const left=frame.other===null?frame.speaker:frame.speaker===s.hero.key?s.hero.key:frame.other||s.hero.key,right=frame.other===null?null:frame.speaker===s.hero.key?frame.other:frame.speaker;
 return `<section class="story-scene ${frame.shake?'forgeur-story-quake':''}"><div class="story-heading"><div><div class="eyebrow">CHAPITRE ${chapter} · MISSION ${scene.stage}${scene.phase==='recap'?' · RELECTURE':scene.phase==='interlude'?' · COMBAT EN PAUSE':''}</div><h2>${route.missions[scene.stage].title}</h2></div><span>${scene.index+1} / ${lines.length}</span></div><div class="story-stage ${s.hero.key==='forgeur'?'forgeur-story-bg bg-'+(frame.background??route.missions[scene.stage].background):s.hero.key==='nahat'?'drunn-bg nahat-bg bg-'+(frame.background??route.missions[scene.stage].background):s.hero.key==='drunn'?'drunn-bg bg-'+route.missions[scene.stage].background:s.hero.key==='kaerune'?'kaerune-bg bg-'+(frame.background??route.missions[scene.stage].background):s.hero.key==='stibili'?'stibili-bg bg-'+route.missions[scene.stage].background:scene.stage>=2?'story-war':'story-awakening'}">${frame.speaker?portrait(left,'left')+(right!==left?portrait(right,'right'):''): '<div class="story-narration-mark" aria-hidden="true">✧</div>'}</div><div class="story-dialogue ${frame.whisper?'whisper':''}" aria-live="polite"><div class="story-speaker">${frame.narration||!speaker?'Récit':frame.speakerName??speaker.name}</div><p>${frame.whisper?'<small>À voix basse</small>':''}${frame.text}</p><div class="story-controls"><button class="ghost" data-action="story-skip">${scene.phase==='recap'?'Fermer le récit':'Passer cette scène'}</button><button class="primary" data-action="story-next">${scene.index<lines.length-1?'Suite →':['before','between'].includes(scene.phase)?'Entrer en combat':scene.phase==='after'?'Voir les récompenses':scene.phase==='interlude'?'Reprendre le combat':'Retour au chapitre'}</button></div></div></section>`;
}

function trainingScreen(){
 const difficult=expeditionSelected==='chasm',rewardFactor=difficult?1.11:1,[minGold,maxGold]=trainingGoldRange(s).map(n=>Math.round(n*rewardFactor)),zone=EXPEDITIONS[expeditionSelected],[minXp,maxXp]=expeditionXpRange(s.hero.level).map(n=>Math.round(n*rewardFactor)),[minFights,maxFights]=expeditionXpDivisors(s.hero.level);
 return `<div class="section-head"><div><div class="eyebrow">CHOISISSEZ VOTRE DESTINATION</div><div class="expedition-heading"><h2>Expédition</h2><button class="practice-button" data-action="practice" aria-haspopup="dialog">Entraînement</button></div><p>Niveau ${difficult?s.hero.level+2:Math.max(1,s.hero.level-1)}${difficult?'':' à '+Math.min(MAX_LEVEL,s.hero.level+1)} · ${minGold} à ${maxGold} or${s.hero.level<MAX_LEVEL?' · '+num(minXp)+' à '+num(maxXp)+' EXP':''} par victoire.${s.hero.level<MAX_LEVEL&&!difficult?' Environ '+minFights+' à '+maxFights+' victoires pour remplir une barre d’EXP.':''}</p></div></div><div class="expedition-grid">${Object.entries(EXPEDITIONS).map(([id,d])=>`<button class="expedition-card ${id===expeditionSelected?'selected':''}" data-action="expedition-select" data-zone="${id}" aria-pressed="${id===expeditionSelected}" style="--expedition-bg:url('assets/${d.art}.webp')"><span class="expedition-scene" aria-hidden="true"></span><strong>${d.name}</strong><span>${d.text}</span><small>3 rencontres ordinaires · même probabilité</small>${id==='chasm'?'<span class="chasm-warning">⚠ Expédition difficile<br>Ennemis de niveau +2<br>Récompenses : +11 % d’EXP et d’or</span>':''}</button>`).join('')}</div><div class="expedition-departure"><div><h3>${zone.name}</h3><p>${s.hero.level>=10?'95 % de rencontres ordinaires, réparties équitablement entre les trois créatures.<br>5 % de chance de rencontrer l’Enchanteur doré : quatre tours pour gagner 100 or.':'Trois créatures ordinaires, avec la même probabilité.<br>L’Enchanteur doré peut apparaître à partir du niveau 10 du compagnon.'}<br>Quitter volontairement conserve le même adversaire. Après une victoire, la mort du compagnon ou la fuite de l’Enchanteur, la prochaine rencontre est tirée au hasard.</p></div><button class="primary" data-action="training" data-zone="${expeditionSelected}">Partir en expédition</button></div><div class="bestiary-grid">${[...zone.kinds,'golden'].map(type=>{const d=TRAINING_BESTIARY[type];return `<button class="bestiary-card" data-action="bestiary" data-type="${type}" aria-haspopup="dialog"><span class="creature-tag">${d.tag}</span>${art(ENEMIES[type].art)}<strong>${ENEMIES[type].name}</strong><span class="bestiary-link">Techniques & butin ↗</span></button>`;}).join('')}</div><p class="bottom-note">Ressources : 15 % de base, gelées de slime : 40 %. L’écharpe d’aventurier ajoute son bonus.<br>Aucune perte d’or ou d’EXP en cas de défaite. Les potions utilisées restent consommées. PV restaurés à chaque nouveau combat.</p>`;
}
function openBestiary(type){
 const d=TRAINING_BESTIARY[type];if(!d||s.battle)return;const enemy=ENEMIES[type],drop=RESOURCES[d.drop];
 document.querySelector('#bestiary-title').textContent=enemy.name;
 document.querySelector('#bestiary-content').innerHTML=`<div class="bestiary-detail"><div class="bestiary-portrait">${art(enemy.art)}<span class="creature-tag">${d.tag}</span></div><div><div class="eyebrow">TECHNIQUES & PARTICULARITÉS</div>${d.skills.map(skill=>`<article class="bestiary-skill"><h3>${skill.name}</h3><p>${skill.text}</p></article>`).join('')}${d.rewardText?`<p class="rare-reward">${d.rewardText}</p>`:''}<div class="bestiary-drop">${d.drop?itemArt(d.drop):''}<div><small>BUTIN POSSIBLE · VICTOIRE</small><b>${drop?.name??'Aucun butin'}</b><span>${num(resourceDropChance(s,type)*100)} % de chance par créature${resourceDropBonus(s)?` (${Math.round(d.dropChance*100)} % de base + ${resourceDropBonus(s)} points avec l’écharpe)`:''} · Vente : ${drop?.sellPrice??0} or</span></div></div></div></div>`;
 document.querySelector('#bestiary-dialog').showModal();
}
function inventoryTabs(){return `<nav class="inventory-tabs" aria-label="Contenu du sac"><button data-action="inventory-view" data-view="equipment" aria-pressed="${inventoryView==='equipment'}">Équipement & potions <span>${s.items.length}</span></button><button data-action="inventory-view" data-view="resources" aria-pressed="${inventoryView==='resources'}">Ressources <span>${resourceTotal(s)}</span></button></nav>`;}
function resourceScreen(){
 const owned=Object.keys(RESOURCES).filter(type=>resourceQuantity(s,type)>0);
 return `${inventoryTabs()}<div class="section-head"><div><div class="eyebrow">BUTIN DE ${CLASSES[s.hero.key].name.toUpperCase()}</div><h2>Ressources</h2><p>Les trouvailles de ce compagnon : pour fabriquer ou financer son équipement.</p></div></div>${owned.length?`<div class="resource-grid">${owned.map(type=>{const d=RESOURCES[type],q=resourceQuantity(s,type);return `<article class="resource-card"><div class="resource-art">${itemArt(type)}<span class="resource-count" aria-label="Quantité : ${q}">${q}</span></div><h3>${d.name}</h3><p class="resource-price">${d.sellPrice} or <span>par unité</span></p><div class="resource-actions"><button data-action="sell-resource" data-type="${type}" data-quantity="1" aria-haspopup="dialog">Vendre 1 · ${d.sellPrice} or</button>${q>1?`<button class="ghost" data-action="sell-resource" data-type="${type}" data-quantity="${q}" aria-haspopup="dialog">Vendre la pile · ${q*d.sellPrice} or</button>`:''}</div></article>`;}).join('')}</div>`:'<div class="empty">Vos prochaines trouvailles apparaîtront ici.<br><br><button data-action="tab" data-tab="training">Choisir une expédition</button></div>'}<p class="bottom-note">Ces ressources servent au craft et peuvent aussi être vendues. Consultez le bestiaire pour découvrir où les trouver.</p>`;
}
function rarityEffectValues(type,rarity){
 if(type==='armure-magique-diamanite')return ['super-rare','legendary'].includes(rarity)?'Dégâts subis : −2 %.':'Pas de réduction des dégâts.';
 if(type==='armure-complete')return rarity==='legendary'?'PV max, dégâts, Chance et Vitesse : +2 %.':'Pas de bonus en pourcentage.';
 const tier=RARITIES.findIndex(r=>r.id===rarity);
 if(type==='bracelet-boule-feu')return `Boule de feu : ${130+10*tier} % des dégâts de base.`;
 if(type==='echarpe-aventurier')return `Chance d’obtenir une ressource : +${2+2*tier} points de pourcentage.${rarity==='legendary'?' PV, dégâts, chance et vitesse : +1 %.':''}`;
 return '';
}
function rarityPreview(type){
 if(!hasRarity(type))return '';
 return `<details class="rarity-preview"><summary>Voir les 4 raretés et leurs valeurs</summary><div class="rarity-table">${RARITIES.map(r=>`<div class="rarity-${r.id}"><b>${r.name} · ${r.chance} %</b><span>${statString(rarityStats(type,r.id))}${['bracelet-boule-feu','echarpe-aventurier','armure-magique-diamanite','armure-complete'].includes(type)?`<small class="rarity-passive">${rarityEffectValues(type,r.id)}</small>`:''}</span></div>`).join('')}</div></details>`;
}
function shopStatRange(type){
 const variants=RARITIES.map(r=>rarityStats(type,r.id));
 const keys=Object.keys(variants[0]);
 return keys.length?keys.map(k=>{const values=variants.map(v=>v[k]),lo=Math.min(...values),hi=Math.max(...values);return `<span class="${lo<0?'stat-malus':''}">${LABELS[k]} : ${signed(lo)}${lo===hi?' (fixe)':' à '+signed(hi)}</span>`;}).join('<br>'):'Aucun bonus de statistique fixe.';
}
function shopPassive(type){
 return itemPassiveText({type,rarity:'common',stats:rarityStats(type,'common')});
}
function shopResources(){
 return `<h3 class="shop-section-title">Ressources</h3><div class="shop-grid">${Object.entries(RESOURCES).filter(([,d])=>d.buyPrice).map(([type,d])=>{const count=resourceQuantity(s,type),full=count>=99;return `<article class="item-card"><div class="item-type">Ressource · à l’unité</div>${itemArt(type)}<h3>${d.name}</h3><p class="small muted">Dans le sac de ${CLASSES[s.hero.key].name} : ${count} / 99</p><div class="item-bottom"><span>${d.buyPrice} or / unité</span><button class="primary" data-action="buy-resource" data-type="${type}" ${full||s.gold<d.buyPrice?'disabled':''}>${full?'Stock maximum':'Acheter ×1'}</button></div></article>`;}).join('')}</div>`;
}
function shopScreen(){
 const sections=[['Armes',type=>ITEMS[type].slot==='weapon'],['Armures',type=>ITEMS[type].slot==='armor'],['Accessoires',type=>ITEMS[type].slot==='accessory'],['Consommables',type=>ITEMS[type].consumable]];
 return `<div class="section-head"><div><div class="eyebrow">L’ÉCHOPPE</div><h2>Équipez votre compagnon</h2><p>Achats réservés à ${CLASSES[s.hero.key].name}.</p></div></div><div class="rarity-legend">${RARITIES.map(r=>`<span class="rarity-${r.id}"><i></i>${r.name} · ${r.chance} %</span>`).join('')}</div>${sections.map(([label,filter])=>`<h3 class="shop-section-title">${label}</h3><div class="shop-grid">${shopItems(s).filter(filter).map(type=>{const d=ITEMS[type],locked=!itemUnlocked(s,type),unlock='Indisponible',passive=d.consumable?'':shopPassive(type);return `<article class="item-card ${locked?'locked-item':''}"><div class="item-type">${d.consumable?'Consommable · toutes classes':({weapon:'Arme',armor:'Armure',accessory:'Accessoire'}[d.slot])+' · '+(d.owner?CLASSES[d.owner].name:d.slot==='weapon'?CLASSES[s.hero.key].name:d.excludeOwners?.includes('wolffy')?'tous sauf Wolffy':'tous les compagnons')}${itemLevelLabel(type)}</div>${itemArt(type)}<h3>${d.name}</h3><div class="item-stats">${d.consumable?'Rend 20 % des PV max.<br>Sans consommer votre action.':shopStatRange(type)}</div>${passive?`<p class="equipment-passive">${passive}</p>`:''}${rarityPreview(type)}<p class="small muted">${d.consumable?'Consommée après utilisation.':'La rareté et ses valeurs sont révélées après l’achat.'}</p><div class="item-bottom"><span>${d.price} or</span><button class="primary" data-action="buy" data-type="${type}" ${s.gold<d.price||locked?'disabled':''}>${locked?unlock:'Acheter'}</button></div>${locked?`<p class="unlock-note">${unlock}.</p>`:''}</article>`;}).join('')}</div>`).join('')}${shopResources()}<p class="bottom-note">Tous les équipements de boutique sont accessibles sans condition de niveau ni de chapitre. Armes : niveau 1 — 37 or ; niveau 2 — 125 or ; niveau 3 — 350 or ; niveau 4 — 555 or ; niveau 5 — 1 050 or. Armures : Veste en tissu — 37 or ; Veste d’aventurier — 110 or ; niveau 4 — 375 or ; Astral — 650 or. Niveau 4 : revente fixe à 75 or. Astral : revente fixe à 200 or. Écharpe : 65 or. Bracelet de Stibili : 150 or. Potion : 25 or.</p>`;
}
function inventoryScreen(){
 if(inventoryView==='resources')return resourceScreen();
 const slots=[['weapon','Armes'],['armor','Armures'],['accessory','Accessoires'],['orb','Orbes']],potions=potionCount(s);
 const row=i=>`<button class="inventory-row${rarityClass(i)}" data-action="item-detail" data-id="${i.id}" aria-haspopup="dialog"><span class="inventory-object-name">${itemName(i)}${Object.values(s.equipped).includes(i.id)?'<small class="equipped-mark">Équipé</small>':''}</span>${rarityBadge(i)}<span aria-hidden="true">›</span></button>`;
 return `${inventoryTabs()}<div class="section-head"><div><div class="eyebrow">SAC DE ${CLASSES[s.hero.key].name.toUpperCase()}</div><h2>Équipement</h2><p>Arme, armure, deux accessoires différents et orbe : cinq emplacements.</p></div><button data-action="tab" data-tab="craft">Ouvrir l’atelier</button></div><div class="equipment-slots compact-equipment">${[...slots.slice(0,2),['accessory','Accessoire 1'],['accessory2','Accessoire 2'],...slots.slice(3)].map(([slot,label])=>{const i=s.items.find(i=>i.id===s.equipped[slot]);return `<button class="equipment-slot${i?rarityClass(i):''}" data-action="item-detail" data-id="${i?.id??''}" ${i?'aria-haspopup="dialog"':'disabled'}><span>${label}</span><b>${i?itemName(i):'Emplacement libre'}</b>${i?rarityBadge(i):''}</button>`;}).join('')}</div><div class="inventory-categories">${slots.map(([slot,label])=>{const items=s.items.filter(i=>ITEMS[i.type]?.slot===slot);return `<details class="inventory-category" data-inventory-category="${slot}" ${inventoryExpanded.get(s.hero.key+':'+slot)?'open':''}><summary><span>${label}</span><span class="inventory-count">${items.length}</span><span class="category-chevron" aria-hidden="true">⌄</span></summary><div class="inventory-list">${items.length?items.map(row).join(''):'<p class="category-empty">Aucun objet dans cette catégorie.</p>'}</div></details>`;}).join('')}</div>${potions?`<button class="inventory-potion" data-action="item-detail" data-id="${s.items.find(i=>i.type==='potion-soin').id}" aria-haspopup="dialog">${itemArt('potion-soin')}<span>Potion de soin ×${potions}<small>Consommable · utilisable en combat</small></span><span aria-hidden="true">›</span></button>`:''}${!s.items.length?'<div class="empty">Votre sac est vide.<br><br><button data-action="tab" data-tab="shop">Visiter la boutique</button></div>':''}<p class="bottom-note">Sélectionnez un objet pour voir son image, ses statistiques et ses effets, l’équiper ou le vendre.</p>`;
}

let craftSelections={};
function craftScreen(){
 return `<div class="section-head"><div><div class="eyebrow">L’ATELIER DE ${CLASSES[s.hero.key].name.toUpperCase()}</div><h2>Des trouvailles aux trésors</h2><p>Utilisez les ingrédients de ce compagnon. L’objet créé rejoint son inventaire.</p></div></div><div class="craft-grid">${Object.entries(RECIPES).map(([id,r])=>{const choices=craftCandidates(s,id);if(!choices.some(i=>i.id===craftSelections[id]))craftSelections[id]=choices[0]?.id??null;const ready=craftReady(s,id,craftSelections[id]);return `<article class="recipe-card"><div class="recipe-heading">${itemArt(r.output)}<div><span class="eyebrow">${ITEMS[r.output].slot==='accessory'?'ACCESSOIRE · TOUS LES COMPAGNONS':'CONSOMMABLE'}</span><h3>${r.name}</h3></div></div><p class="recipe-effect">${r.output==='collier-presages'?'Chaque perte de PV par dégâts ajoute 3 à 6 points de chance de Riposte selon la rareté. Une riposte inflige 40 % des dégâts d’attaque et consomme tous les cumuls.':r.output==='potion-soin'?'Rend 20 % des PV max en combat sans consommer votre action.':itemPassiveText({type:r.output,stats:rarityStats(r.output,'common')})}</p>${rarityPreview(r.output)}<ul class="recipe-ingredients">${Object.entries(r.resources).map(([type,n])=>`<li tabindex="0" class="resource-ingredient ${resourceQuantity(s,type)>=n?'ready':'missing'}" aria-label="${attr(RESOURCES[type].name+' — '+resourceOrigin(type))}">${itemArt(type)}<span>${RESOURCES[type].name}</span><b>${resourceQuantity(s,type)} / ${n}</b><span class="resource-origin" role="tooltip">${resourceOrigin(type)}</span></li>`).join('')}${Object.entries(r.consumables??{}).map(([type,n])=>`<li class="${s.items.filter(i=>i.type===type).length>=n?'ready':'missing'}">${itemArt(type)}<span>${ITEMS[type].name}</span><b>${s.items.filter(i=>i.type===type).length} / ${n}</b></li>`).join('')}${r.equipment?`<li class="${choices.length?'ready':'missing'}">${itemArt(r.equipment)}<span>Veste en tissu non équipée</span><b>${choices.length?'1 / 1':'0 / 1'}</b></li>`:''}</ul>${r.equipment?`<label class="craft-choice">Veste à consommer<select data-craft-ingredient="${id}" ${!choices.length?'disabled':''}>${choices.length?choices.map(i=>`<option value="${i.id}" ${craftSelections[id]===i.id?'selected':''}>${itemName(i)} · ${itemRarity(i).name} · ${statString(i.stats)}</option>`).join(''):'<option>Aucune veste non équipée</option>'}</select></label><p class="small muted">La veste choisie sera détruite. Une veste équipée est protégée. La rareté du collier est tirée indépendamment.</p>`:''}<button class="primary craft-button" data-action="craft" data-recipe="${id}" aria-haspopup="dialog" ${ready?'':'disabled'}>${ready?'Préparer ce craft':'Ingrédients manquants'}</button></article>`;}).join('')}</div><p class="bottom-note">Aucun coût en or. Les ingrédients sont consommés une fois la fabrication terminée. Pour le collier, utilisez les Plumes maléfiques obtenues sur le Corkbeau.</p>`;
}
let craftRequest=null;
const craftDialog=document.querySelector('#craft-dialog');
function requestCraft(recipe){
 if(busy||home||!craftReady(s,recipe,craftSelections[recipe]))return;
 craftRequest={owner:s,key:adventureId(s),recipe,ingredientId:craftSelections[recipe]??null};
 const r=RECIPES[recipe],vest=s.items.find(i=>i.id===craftRequest.ingredientId);
 document.querySelector('#craft-content').innerHTML=`<div class="craft-review">${itemArt(r.output)}<h3>${r.name}</h3><p>Pour ${CLASSES[s.hero.key].name}</p><p>${Object.entries(r.resources).map(([k,n])=>n+' × '+RESOURCES[k].name).join('<br>')}${Object.entries(r.consumables??{}).map(([k,n])=>'<br>'+n+' × '+ITEMS[k].name).join('')}${vest?'<br>1 × '+itemName(vest)+' · '+itemRarity(vest).name+' · '+statString(vest.stats):''}</p><p class="small muted">Ces ingrédients seront consommés pour fabriquer l’objet.</p></div>`;
 document.querySelector('#craft-confirm').hidden=false;document.querySelector('#craft-confirm').disabled=false;document.querySelector('#craft-close').hidden=false;document.querySelector('#craft-close').textContent='Annuler';craftDialog.showModal();
}
function forgeSound(){
 if(!sound||(music?.volume??1)===0)return;
 try{audioContext??=new(window.AudioContext||window.webkitAudioContext)();audioContext.resume?.();const ctx=audioContext,t=ctx.currentTime;
 for(const [f,v]of [[180,.06],[940,.05],[2180,.025],[3540,.012]]){const o=ctx.createOscillator(),g=ctx.createGain();o.type='triangle';o.frequency.setValueAtTime(f,t);o.connect(g);g.connect(ctx.destination);g.gain.setValueAtTime(v*(music?.volume??1),t);g.gain.exponentialRampToValueAtTime(.001,t+.3);o.onended=()=>{o.disconnect();g.disconnect();};o.start(t);o.stop(t+.32);}
 }catch{}
}
document.querySelector('#craft-close').onclick=()=>{if(busy)return;craftRequest=null;craftDialog.close();};
craftDialog.addEventListener('cancel',e=>{if(busy)e.preventDefault();else craftRequest=null;});
document.querySelector('#craft-confirm').onclick=async()=>{
 const req=craftRequest;if(busy||!req||home||s!==req.owner||adventureId(s)!==req.key||!craftReady(s,req.recipe,req.ingredientId))return;
 if(!save())return;
 busy=true;document.querySelector('#craft-confirm').disabled=true;document.querySelector('#craft-confirm').hidden=true;document.querySelector('#craft-close').hidden=true;
 document.querySelector('#craft-content').innerHTML='<div class="forge-progress" role="status"><div class="forge-hammer" aria-hidden="true">⚒</div><div class="forge-sparks" aria-hidden="true">✦ · ✧ · ✦</div><h3>La forge s’anime…</h3><p>Votre objet prend forme.</p><div class="forge-track"><i></i></div></div>';
 try{
  for(let i=0;i<4;i++){forgeSound();await sleep(875);}
  if(s!==req.owner||home||adventureId(s)!==req.key)throw Error('Le compagnon a changé. Aucun ingrédient consommé.');
  const before=structuredClone(s),item=craft(s,req.recipe,req.ingredientId);if(!save()){Object.assign(s,before);throw Error('Fabrication annulée : sauvegarde indisponible. Aucun ingrédient consommé.');}
  document.querySelector('#craft-content').innerHTML=`<div class="craft-reveal${rarityClass(item)}" role="status">${itemArt(item.type)}<span class="eyebrow">FABRICATION RÉUSSIE</span><h3>${itemName(item)}</h3>${hasRarity(item.type)?rarityBadge(item):''}<p>${item.type==='potion-soin'?'Rend 20 % des PV max.':statString(item.stats)}</p><p>Ajouté au sac de ${CLASSES[req.owner.hero.key].name}.</p></div>`;playTone(true);
 }catch(e){document.querySelector('#craft-content').textContent=e.message;}
 finally{busy=false;craftRequest=null;document.querySelector('#craft-close').hidden=false;document.querySelector('#craft-close').textContent='Fermer';render();}
};
const attr=t=>String(t).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
function effectArt(e){
 const alias={tension:['forgeur','passive'],'divine-sword':['forgeur','passive'],'forge-ignite':['regulation'],'forge-fracas':['fracas'],'forge-protection':['protectionultime'],'forge-judgment':['jugement'],'forge-prevention':['aureole'],'forge-prevention-pending':['aureole'],accumulation:['stibili','passive'],acharnement:['wolffy','passive'],analyse:['drunn','passive'],armes:['nahat','passive'],'riposte-count':['nahat','passive'],'epine-oath':['epine'],'souffle-cost':['souffle'],charges:['tircharge'],larva:['larve'],'shield-Acier vivant':['forgeur','passive'],'shield-Protection ultime':['protectionultime'],'shield-Protection Magmageux':['magmageux'],'shield-Refroidissement brutal':['regulation'],'shield-Jugement':['jugement'],'shield-Auréole de prévention':['aureole'],'shield-Transmutation élémentaire':['transmutation'],'shield-Dague de Rebecca':['rebecca'],'shield-Instinct protecteur':['instinct'],'shield-Refus de mourir':['refus']};
 const icon=alias[e.id]??(SKILLS[e.id]?[e.id]:null);
 return icon?abilityIcon(...icon):`<span aria-hidden="true">${e.icon}</span>`;
}
function effectIcons(effects){
 return `<div class="status-icons">${effects.map(e=>{
  const stacks=Number.isFinite(e.stacks)&&e.stacks>0?Math.floor(e.stacks):0;
  const count=stacks>=1000?new Intl.NumberFormat('fr-FR',{notation:'compact',maximumFractionDigits:1}).format(stacks):String(stacks);
  const description=e.text+(stacks?` Cumuls : ${stacks}.`:'');
  return `<button class="status-icon status-${e.id}${stacks?' has-stacks':''}" data-action="effect" data-title="${attr(e.name)}" data-description="${attr(description)}" title="${attr(e.name+' : '+description)}" aria-label="${attr(e.name+' : '+description)}" aria-haspopup="dialog">${effectArt(e)}${stacks?`<span class="status-stack" aria-hidden="true">${count}</span>`:''}</button>`;
 }).join('')}</div>`;
}
function health(h,max,effects=[],shield=0,unlimited=false,capacity=shield){return `<div class="health-row"><div class="health"><div class="bar"><i style="width:${Math.max(0,h/max*100)}%"></i></div><span class="hp-label">${unlimited?'∞ PV':num(h)+' / '+num(max)+' PV'}</span><div class="shield-meter" ${shield?'':'hidden'}><div class="shield-bar" role="progressbar" aria-label="Bouclier" aria-valuemin="0" aria-valuenow="${shield}" aria-valuemax="${Math.max(1,capacity)}"><i style="width:${Math.min(100,shield/Math.max(1,capacity)*100)}%"></i></div><span class="shield-label">⬡ ${num(shield)} bouclier</span></div></div>${effectIcons(effects)}</div>`;}

function skillLabel(id){const b=s.battle;
 if(id==='entailles'&&forgeState(b)!=='hot')return 'Nécessite Surchauffe · 5 Tensions';
 if(id==='magmageux'&&skillReady(s,id))return b.hp<=b.maxHp*.49?'Bouclier + brûlure sur la cible':'Bouclier · brûlure à 49 % PV ou moins';
 if(id==='transmutation'&&!b.accumulation)return 'Nécessite un cumul d’Accumulation';
 if(id==='extraction'&&skillReady(s,id))return 'Extra-action · ne consomme pas le tour';
 if(id==='extraction'&&!skillReady(s,id)&&!(b.cooldowns[id]>b.round))return 'Cible sans Poison';
 if(id==='adaptation')return `${b.adaptation??0} cumuls · dégâts +${2*(b.adaptation??0)} %`;
 if(id==='instinct')return b.instinctUsed?'Secours déjà utilisé':'Automatique · seuil de 30 % PV';
 if(id==='soin')return `${b.healCharges??2} / 2 charges · ${(b.healCharges??2)>0?'sans récupération':'épuisée pour ce combat'}`;
 if(id==='refus')return b.refusUsed?(b.refusSuccess?'Survie utilisée · Insoignable · dégâts −20 %':'Jet déjà utilisé'):'Passif · un jet sur blessure mortelle';
 if(id==='detresse')return b.distressUsed?'Survie utilisée · Insoignable':'Passif · survie prête';
 if(id==='navigatrice')return '75 % de chances d’obtenir la Dague';if(id==='rebecca')return 'Extra-action gratuite · éphémère';
 if(id==='souffle')return 'Prépare le prochain tour';
 if(id==='fumee')return b.smokeUsed?(smokeActive(s)?'Fumée active · '+(b.smokeUntil-b.round+1)+' tour(s)':'Déjà utilisée ce combat'):'Une utilisation par combat';
 if(id==='elementaire'){if(b.elementalSacrificeUsed)return 'Déjà utilisée ce combat';const missing=elementalMissing(s);return missing.length?'À lancer : '+missing.map(k=>SKILLS[k].name).join(', '):'Prête · '+(110+10*(b.accumulation??0))+' % · consomme Accumulation';}
 if(id==='sacrifice'&&b.hp>=b.maxHp)return 'Inutilisable à PV complets';
 if(id==='crocs'&&b.round>=(b.cooldowns.crocs??1))return crocsPercent(s)+' % de puissance · disponible';
 if(id==='redressement')return b.redressement?'Active jusqu’à la fin du combat':'Une activation par combat';if(id==='larve')return b.larvaUsed?'Déjà invoquée ce combat':'Une invocation par combat';if(id==='matriarche')return b.matriarch?'Seconde forme · active':'Automatique · 49 % par double action';if(id==='ouragan')return (hurricaneMultiplier(s)*100).toLocaleString('fr-FR',{maximumFractionDigits:1})+' % de puissance · sans récupération';if(id==='nuageux'&&b.hp>=b.maxHp&&!livingPups(b).length)return 'PV déjà au maximum';if(id==='tircharge')return `${b.charges}/5 charges · ${(chargedMultiplier(b.charges)*100).toLocaleString('fr-FR',{maximumFractionDigits:1})} % de puissance`;if(id==='puissance'&&b.powerCasts)return 'Active jusqu’à la fin du combat';if(id==='meute'&&livingPups(b).length>=2)return 'Meute complète · 2 / 2 petits';if(id==='epine'&&b.hp<=1)return 'PV insuffisants';return b.cooldowns[id]>b.round?'Disponible dans '+(b.cooldowns[id]-b.round)+' tour(s)':'Compétence · disponible';}
function enemyCard(e,i,b,multiple){if(e.practiceDummy)return `<div class="fighter enemy practice-dummy selected" id="${e.id}"><div class="name">${e.name}</div>${art(e.art)}${health(e.hp,e.maxHp,enemyEffects(e,b.round),0,true)}<span class="practice-infinity">N’attaque jamais</span><span class="dummy-damage-total">Dégâts cumulés : ${num(e.totalDamage??0)}</span><span class="target-tag" title="Les effets fondés sur les PV max utilisent ${num(e.maxHp)} PV de référence, soit les PV max du compagnon à l’entrée.">Cible d’entraînement</span></div>`;return `<div class="fighter enemy ${e.boss?'boss-fighter':''} ${b.target===i?'selected':''} ${markedPrey(b)?.id===e.id?'marked-prey':''}" id="${e.id}"  data-action="target" data-index="${i}" style="opacity:${e.hp>0?1:.24}"><div class="name">${e.boss?'BOSS · ':''}${e.name} · Niv. ${e.level}</div>${markedPrey(b)?.id===e.id?'<span class="prey-eyes" aria-label="Proie désignée">◉ ◉</span>':''}${art(e.art)}${health(e.hp,e.maxHp,enemyEffects(e,b.round),shieldTotal(e,b.round),false,shieldCapacity(e,b.round))}<span class="enemy-damage" title="${e.type==='corkbeau'&&!e.storyKind?'Ajoute 2 % des PV max de sa cible, plafonné à 50 % de ses dégâts propres.':''}">${e.sealed?'51 % des PV max de Stibili':e.healer?'Soin · Attaque fatale au tour '+(e.fatalAt??4):num(enemyDamage({...s,battle:b},e))+' dégâts / attaque'}</span>${e.type==='dragonnet'&&!e.storyKind&&e.hp>0?`<span class="death-warning">À sa mort : −${Math.ceil(b.maxHp*7/100)} PV</span>`:''}${e.burning?'<span class="burn-label">Brûlure · −5 % PV max / tour</span>':''}${multiple&&e.hp>0?`<button class="target-tag target-button" data-action="target" data-index="${i}" aria-pressed="${b.target===i}" aria-label="Cibler ${e.name}" ${busy?'disabled':''}>${b.target===i?'◆ Cible choisie':'Cibler'}</button>`:`<span class="target-tag">${e.hp<=0?'Vaincu':'Cible automatique'}</span>`}</div>`;}
function larvaCard(l){return `<div class="fighter ally ${l.hp<=0?'fallen-ally':''}" id="larva"><div class="name">Larve du Néant</div>${art(l.art)}${health(l.hp,l.maxHp,[],shieldTotal(l,s.battle?.round??1),false,shieldCapacity(l,s.battle?.round??1))}<span class="enemy-damage">${num(l.dmg)} dégâts / attaque</span><span class="target-tag">${l.hp>0?'Protège Stibili':'Invocation vaincue'}</span></div>`;}
function boneCard(p){return `<div class="fighter ally bone-ally ${p.hp<=0?'fallen-ally':''}" id="${p.id}"><div class="name">Squelette chétif</div>${art(p.art)}${health(p.hp,p.maxHp,[...((p.furyUntil??0)>=(s.battle?.round??1)?[{id:'fury',icon:'✦',name:'Fury',text:'Dégâts +20 %. '+(p.furyUntil-(s.battle?.round??1)+1)+' tour(s) restant(s).'}]:[]),...activeShields(p,s.battle?.round??1).map(sh=>({id:'shield-'+sh.source,icon:'⬡',name:sh.source,text:`${sh.amount} points de bouclier · ${sh.until-(s.battle?.round??1)+1} tours.`,stacks:sh.amount}))],shieldTotal(p,s.battle?.round??1),false,shieldCapacity(p,s.battle?.round??1))}<span class="enemy-damage">${num(p.dmg)} dégâts</span></div>`;}
function expeditionIntentPanel(b){return b.mode==='training'?`<div class="rift-intentions expedition-intentions">${b.enemies.filter(e=>e.hp>0&&expeditionIntent(e)).map(e=>`<article><b>${e.name}</b><p>${expeditionIntent(e)}</p></article>`).join('')}</div>`:'';}
function pupCard(p){return `<div class="fighter ally wolf-pup ${p.hp<=0?'fallen-ally':''}" id="${p.id}"><div class="name">Bébé Wolffy</div>${art(p.art)}${health(p.hp,p.maxHp,[...((p.furyUntil??0)>=(s.battle?.round??1)?[{id:'fury',icon:'✦',name:'Fury',text:'Dégâts +20 %. '+(p.furyUntil-(s.battle?.round??1)+1)+' tour(s) restant(s).'}]:[]),...activeShields(p,s.battle?.round??1).map(sh=>({id:'shield-'+sh.source,icon:'⬡',name:sh.source,text:`${sh.amount} points de bouclier · ${sh.until-(s.battle?.round??1)+1} tours.`,stacks:sh.amount}))],shieldTotal(p,s.battle?.round??1),false,shieldCapacity(p,s.battle?.round??1))}<span class="enemy-damage">${num(Math.round(wolfPupDamage(p,s.battle?.round??1)))} dégâts / attaque</span><span class="target-tag">${p.hp>0?'Membre de la meute':'Invocation vaincue'}</span></div>`;}

function battleScreen(){
 const b=s.battle,forestDeadline=b.enemies[0]?.fatalAt??4,c=CLASSES[s.hero.key],skills=b.sealedMagic?[]:availableSkills(s),living=b.enemies.filter(e=>e.hp>0),multiple=living.length>1;
 if(!b.enemies[b.target]?.hp)b.target=b.enemies.findIndex(e=>e.hp>0);
 return `<div class="arena ${s.hero.key==='stibili'?'stibili-combat':s.hero.key==='wolffy'?'wolffy-combat':''} ${s.hero.key==='forgeur'?'forgeur-combat forge-'+forgeState(b):''} ${b.bone?'has-bone':''} ${b.pups?.length?'has-pack':''} ${b.pups?.filter(p=>p.hp>0).length>=3?'large-pack':''} ${b.larva?'has-larva':''} ${b.enemies.length>=3?'three-enemies':''} ${b.mode==='practice'?'training-arena practice-arena':b.mode==='training'?'expedition-arena drunn-arena expedition-'+(b.goldenEncounter?'treasury':b.expedition??'forest'):b.mode==='trial'?'drunn-arena bg-'+(TRIALS[b.stage]?.background??b.background):b.mode==='rift'?'rift-arena':b.mode==='forest'?'forest-arena':(b.mode==='training'||b.story&&s.hero.key==='wolffy'&&b.stage===1)?'training-arena':b.story&&s.hero.key==='forgeur'?'forgeur-story-arena bg-'+b.background:b.story&&['drunn','nahat'].includes(s.hero.key)?'drunn-arena bg-'+b.background:b.story&&s.hero.key==='kaerune'?'kaerune-arena bg-'+b.background:b.story&&s.hero.key==='stibili'?'stibili-arena bg-'+b.background:b.story&&b.stage>=2?'wolffy-arena':''}">${b.goldenEncounter&&!b.goldenIntroSeen?'<span class="golden-entry-flash" aria-hidden="true"></span>':''}<div class="arena-top"><div><span class="turn">Tour ${b.round}${b.goldenEncounter?' / 4':''}${b.mode==='forest'?' / '+forestDeadline:''} · ${busy?'Résolution en cours':'À vous de jouer'}</span><h3>${battleTitle(b)}</h3></div><button class="ghost" data-action="retreat" ${busy?'disabled':''}>Quitter</button></div>${b.sealedMagic?'<div class="lesson-note">La magie ne répond plus. Seule l’attaque de base est disponible.</div>':''}${b.lesson?`<div class="lesson-note">Duel d’apprentissage : la défaite face à Séraphyne fait partie du récit et valide la mission. Or et EXP accordés à sa conclusion.</div>`:''}${b.mode==='forest'?`<div class="forest-countdown ${b.round>=forestDeadline?'urgent':''}">${b.round>=forestDeadline?'Dernière action : vainquez-la maintenant !':`L’Enfant de la forêt se soigne de 6 % de ses PV max à chaque tour. Attaque fatale au tour ${forestDeadline}.`}</div>`:''}<div class="battlefield">${b.enemies.some(e=>e.hp>0&&e.bombPending)?'<span class="forgeur-bomb" role="img" aria-label="Bombe : explosion au prochain tour ennemi"></span>':''}<div class="allied-group"><div class="fighter ${b.matriarch?'matriarch-form':''} ${smokeActive(s)?'smoke-active':''}" id="hero">${combatNameplate(c)}${titleBadge(s)}${art(heroArt(s))}${health(b.hp,b.maxHp,heroEffects(s),shieldTotal(b,b.round),false,shieldCapacity(b,b.round))}<span class="target-tag">Votre compagnon</span></div><div class="summon-column">${b.larva?larvaCard(b.larva):''}${b.bone?boneCard(b.bone):''}${s.hero.key==='wolffy'?`<div class="pack-allies">${(b.pups??[]).filter(p=>p.hp>0).map(pupCard).join('')}</div>`:''}</div></div><div class="enemy-group">${b.enemies.map((e,i)=>enemyCard(e,i,b,multiple)).join('')}</div></div><div class="arena-footer"><span>${multiple?'Choisissez votre cible, puis votre attaque ou compétence.':'Le seul ennemi vivant est ciblé automatiquement.'}</span><span>${buffLabel(b)}</span></div></div>${combatToolbar(skills)}${nahatIntentPanel(b)}${drunnIntentPanel(b)}${riftIntentPanel(b)}${trialIntentPanel(b)}${expeditionIntentPanel(b)}${forgeTensionPanel()}${chargePanel()}${skills.length?`<details class="skill-detail"><summary>Détails des compétences</summary>${skills.map(d=>`<p><b>${d.name}.</b> ${skillText(s,d.id)}</p>`).join('')}</details>`:''}${passiveCard()}${logScreen(b.log)}`;
}
function chargePanel(){
 const b=s.battle;if(s.hero.key!=='drunn'||s.hero.level<9)return '';
 const n=b.charges,power=(chargedMultiplier(n)*100).toLocaleString('fr-FR',{maximumFractionDigits:1});
 return `<div class="charge-panel ${n===5?'fully-charged':''}" role="status"><div><strong>Tir chargé · ${n}/5</strong><span>Prochain tir : ${power} % des dégâts de base</span></div><div class="charge-pips" aria-label="${n} charges sur 5">${Array.from({length:5},(_,i)=>`<i class="${i<n?'filled':''}" aria-hidden="true"></i>`).join('')}</div><p>${n===5?'Charge maximale conservée jusqu’au tir.':'Une charge supplémentaire au début du prochain tour.'}</p></div>`;
}

function buffLabel(){return heroEffects(s).map(e=>e.name).join(' / ')||'Aucun effet actif';}
function logScreen(log){return `<div class="log"><div class="log-head">Journal du combat</div><div class="log-lines" aria-live="polite">${log.slice(-8).map(t=>`<div>${t}</div>`).join('')}</div></div>`;}
function resultScreen(){
 if(result.mode==='practice')return `<div class="result"><div class="eyebrow">ENTRAÎNEMENT LIBRE</div><h2>Fin de l’entraînement</h2><p>Le compagnon retrouve tous ses PV. Aucun or, aucune EXP ni récompense.</p><button class="primary" data-action="practice">Recommencer</button><button data-action="tab" data-tab="training">Retour aux expéditions</button></div>`;
 const completed=result.completed??result.won;
 const unlocked=availableSkills(s).filter(d=>!d.unlockStage&&d.level>result.oldLevel&&d.level<=s.hero.level);
 return `<div class="result"><div class="symbol">${completed?'✧':'◇'}</div><div class="eyebrow">${battleTitle(result)}</div><h2>${result.goldenEscaped?'Le trésor vous échappe…':result.nahatDuel?'Duel interrompu':result.nahatStory&&result.scriptedDefeat?'La leçon de Lycaon':result.mode==='rift'&&result.won&&result.stage===50?'Fissure conquise !':result.drunnStory&&result.scriptedDefeat?'L’histoire continue…':result.trialSurvived?'Épreuve surmontée !':result.sealedMagic?'L’histoire continue…':result.scriptedDefeat?'Leçon accomplie !':result.escape?'Évasion réussie !':completed?'Victoire !':'Vous vous relevez.'}</h2><p>${result.goldenEscaped?'L’Enchanteur doré s’est enfui après quatre tours. Aucun or ni EXP gagnés.':result.nahatDuel?'Nathalia met fin au duel. Les deux adversaires restent en vie ; l’histoire continue.':result.nahatStory&&result.scriptedDefeat?'Votre compagnon gagne en expérience.':result.nahatStory&&result.stage===2&&!completed?'La traversée doit être recommencée depuis le Serpent sauvage. Aucune récompense intermédiaire n’est accordée.':result.drunnStory&&result.scriptedDefeat?'Ra’Kesh frappe le premier et terrasse Drunn. Cette défaite fait partie du récit : vous gagnez l’or, l’EXP et le Talisman des sables.':result.trialSurvived?'Drunn a résisté au grand brasier et à la brûlure suivante. Vairon interrompt le combat.':result.sealedMagic?'Privé de magie, Stibili succombe aux orbes du Néant. Cette défaite fait partie du récit : vous recevez l’or et l’EXP et poursuivez l’histoire.':result.scriptedDefeat?'Votre compagnon gagne en expérience.':result.escape?'Stibili trouve une ouverture et s’échappe. Maëlla reste debout.':completed?(result.mode==='trial'?'Votre orbe rejoint l’inventaire de ce compagnon. Les autres orbes seront déblocables dans de futures mises à jour…':result.riftReplay&&result.xp===0?'Étage rejoué pour le plaisir : aucune récompense.':s.hero.level>=MAX_LEVEL?'Niveau maximum atteint.':'Votre compagnon gagne en expérience.'):result.mode==='forest'?'Le temps est écoulé. Renforcez vos dégâts et tentez à nouveau ce défi.':'Cet adversaire était trop fort cette fois.<br>Aucun or ni EXP perdus. Les potions utilisées restent consommées. Vos PV sont restaurés.'}</p>${completed?`<div class="rewards"><span>${s.hero.level>=MAX_LEVEL&&result.xp===0?'Niveau maximum':`+${num(result.xp)} EXP`}</span>${result.gold?`<span>+${num(result.gold)} or</span>`:''}</div>${result.mode==='rift'?`<p class="rift-replay-summary">Relectures gagnées : <b>${result.riftReplayCount??0} / 5</b></p>`:''}${result.bonusGold?`<p class="small">Dont ${result.bonusGold} or de bonus unique pour le premier combat du monde 1.</p>`:''}`:''}${result.rareGoldBonus?`<p class="rare-reward">Loup glacé : +${result.rareGoldBonus} or de prime inclus dans la récompense.</p>`:''}${result.resourceDrops?.length?`<div class="loot-panel"><h3>Butin récupéré</h3>${result.resourceDrops.map(d=>`<div class="loot-row">${itemArt(d.type)}<span>${RESOURCES[d.type].name}</span><b>×${d.quantity}</b></div>`).join('')}<button data-action="tab" data-tab="inventory" data-view="resources">Voir les ressources</button></div>`:''}${result.rewardSkill?`<div class="reward-item skill-reward">${abilityIcon(result.rewardSkill)}<h3>${SKILLS[result.rewardSkill].name} débloquée !</h3><p>${skillText(s,result.rewardSkill)}</p></div>`:''}${result.rewardItem?`<div class="reward-item">${itemArt(result.rewardItem.type)}<h3>${ITEMS[result.rewardItem.type].name}${result.rewardItem.type==='potion-soin'?' ×1 obtenue':' obtenue'}</h3><p>${result.mode==='trial'?itemPassiveText(result.rewardItem):result.rewardItem.type==='talisman-sables'?'Cadeau de Ra’Kesh · +10 chance · réservé à Drunn. Équipez-le dans votre inventaire.':result.rewardItem.type==='potion-soin'?'Potion ajoutée au sac. Rend 20 % des PV max en combat sans consommer votre action.':'+15 % de PV max · Équipez-la dans votre inventaire.'}</p></div>`:''}${result.levels?`<p style="color:var(--purple)">Niveau ${s.hero.level} atteint ! ${unlocked.map(d=>d.name+' débloquée.').join(' ')} +${earnedPoints(s.hero.level)-earnedPoints(result.oldLevel)} points à répartir.</p>`:''}${completed&&result.first&&result.stage===chapterSize(s,result.chapter??1)?`<p style="color:var(--gold)">${result.chapter===2?'Chapitre 2 terminé. Stibili retrouve la surface, mais le Néant demeure en lui.':s.hero.key==='stibili'?'Chapitre 1 terminé. Un passage inconnu a emporté Stibili.':s.hero.key==='wolffy'?'Chapitre 1 terminé. Wolffy a franchi le portail de Nébryss.':s.hero.key==='kaerune'?'Chapitre 1 terminé. Kaerune a survécu à l’assaut. Dans les profondeurs, Thyur prépare déjà le suivant.':s.hero.key==='drunn'?'Chapitre terminé. Le Dompteur nomme Drunn chef d’assaut. Ænoria est unie… pour combien de temps ?':s.hero.key==='nahat'?'Chapitre 1 terminé. Nahat retourne vers la dernière personne qui lui a souri.':'Les terres sauvages sont conquises. Monde 1 terminé !'}</p>`:''}${result.nahatStory&&result.stage===2&&completed?'<p class="lesson-note">Les épreuves des bois sont terminées. Retournez au camp pour vous préparer, puis lancez la mission « Le duel de Nathalia » dans les chapitres.</p>':''}<div class="result-actions">${result.levels?'<button class="primary" data-action="tab" data-tab="character">Répartir mes points</button>':''}${result.mode==='rift'&&completed?`${result.stage<50?`<button class="primary" data-action="rift-fight" data-stage="${result.stage+1}">Étage suivant</button>`:''}${result.stage<50?`<button data-action="rift-fight" data-stage="${result.stage}">Rejouer cet étage</button>`:''}<button data-action="tab" data-tab="rift">Voir la Fissure</button>`:''}${result.mode==='training'||!completed?`<button class="primary" data-action="again">${result.mode==='training'?'Repartir dans cette expédition':'Réessayer ce combat'}</button>`:''}${completed&&result.mode==='world'&&!(result.nahatStory&&result.stage===2)&&result.stage<chapterSize(s,result.chapter??1)?`<button class="primary" data-action="next" data-stage="${result.stage+1}" data-chapter="${result.chapter??1}">Combat suivant</button>`:''}${completed&&result.mode==='world'&&result.worldDone&&s.hero.key==='stibili'?`<button class="primary" data-action="chapter" data-chapter="${result.chapter===2?3:2}">Chapitre ${result.chapter===2?3:2}</button>`:''}${result.rewardItem?.type==='talisman-sables'?'<button class="primary" data-action="tab" data-tab="inventory">Équiper le talisman</button>':''}${ITEMS[result.rewardItem?.type]?.slot==='orb'?'<button class="primary" data-action="tab" data-tab="inventory">Équiper mon orbe</button>':''}<button class="ghost" data-action="return">${result.mode==='trial'?'Retour à la Traversée':result.mode==='rift'?'Retour à la Fissure':'Retour au camp'}</button></div></div>${logScreen(result.log)}`;
}
function showLevelUp(){
 const pending=s.pendingLevelUp,dialog=document.querySelector('#levelup-dialog');if(home||busy||s.battle||!pending||!dialog||dialog.open)return;
 const gained=earnedPoints(pending.to)-earnedPoints(pending.from),skills=availableSkills(s).filter(d=>!d.unlockStage&&!d.unlockChapter2&&!d.requiresItem&&d.level>pending.from&&d.level<=pending.to);
 document.querySelector('#levelup-content').innerHTML=`<div class="levelup-rays" aria-hidden="true"></div><div class="levelup-kicker">FÉLICITATIONS</div><h2 id="levelup-title">${pending.to===MAX_LEVEL?'Niveau ultime atteint !':'Un nouveau cap !'}</h2><div class="levelup-emblem">${art(heroArt(s))}<div class="levelup-number"><small>NIVEAU</small><strong>${pending.to}</strong></div></div><p class="levelup-owner">${CLASSES[s.hero.key].name} gagne en puissance.</p><div class="levelup-gains"><strong>+${gained}</strong><span>points de statistiques à répartir${pending.to-pending.from>1?`<small>${pending.to-pending.from} niveaux gagnés · ${pending.from} → ${pending.to}</small>`:''}</span></div>${s.hero.key==='nahat'&&pending.from<24&&pending.to>=24?`<section class="levelup-unlocks"><h3>Compétence améliorée</h3><div>${abilityIcon('refus')}<span><b>Refus de mourir</b><small>Sur 1, 2 ou 6 · bouclier de 3 % des PV max</small></span></div></section>`:''}${skills.length?`<section class="levelup-unlocks"><h3>${skills.length>1?'Nouvelles compétences':'Nouvelle compétence'}</h3>${skills.map(d=>`<div>${abilityIcon(d.id)}<span><b>${d.name}</b><small>${d.automatic?'Passif automatique':'Compétence active'} · niveau ${d.level}</small></span></div>`).join('')}</section>`:''}<div class="levelup-actions"><button id="levelup-continue" class="primary" autofocus>Continuer l’aventure</button>${!s.storyScene?'<button id="levelup-stats">Répartir mes points</button>':''}</div>`;
 const dismiss=()=>{delete s.pendingLevelUp;save();dialog.close();showForgeurUnlock();};
 document.querySelector('#levelup-continue').onclick=dismiss;
 const allocate=document.querySelector('#levelup-stats');if(allocate)allocate.onclick=()=>{dismiss();result=null;tab='character';render();};
 dialog.oncancel=e=>{e.preventDefault();dismiss();};dialog.showModal();playCombatCue('double');
}
function stellarStats(item){const improved=forgedStatKeys(item);return Object.entries(itemStats(item)).map(([k,v])=>`<span class="${improved.has(k)?'astral-stat':''}">${statString({[k]:v})}</span>`).join(' · ')||'Aucun bonus fixe.';}
function starsRow(item){return isAstral(item)?`<div class="item-stars" aria-label="Étoiles cosmiques">${Array.from({length:3},(_,i)=>`<span class="star-${item.stars?.[i]?.stat??'empty'}" title="${starText(item,item.stars?.[i])}">★</span>`).join('')}</div>`:'';}
function forgeScreen(){
 if(!s.forge?.unlocked)return '<div class="empty"><h2>Forge Cosmique</h2><p>Achetez votre premier équipement Astral pour débloquer définitivement la Forge.</p><button data-action="tab" data-tab="shop">Voir la boutique</button></div>';
 const item=s.items.find(i=>i.id===s.forge.itemId),items=s.items.filter(isAstral);
 return `<section class="cosmic-forge"><div class="forge-heading"><div><div class="eyebrow">LES ÉTOILES FAÇONNENT VOTRE PUISSANCE</div><h2>Forge Cosmique</h2><p>Trois étoiles. Quatre voies. Un équipement unique.</p></div><div class="forge-gold">${num(s.gold)} <small>or disponible</small></div></div>${item?`<div class="forge-layout"><div class="forge-orbit"><div class="forge-rings" aria-hidden="true"></div>${itemArt(item.type,'forge-art')}${[0,1,2].map(n=>{const star=item.stars?.[n];return `<button class="forge-star forge-star-${n} star-${star?.stat??'empty'}" data-action="forge-star" data-slot="${n}" title="${starText(item,star)}" aria-label="Étoile ${n+1} : ${star?starText(item,star)+'. Détruire pour 200 or.':'vide. Activer pour 350 or.'}" ${busy?'disabled':''}><span>★</span><small>${star?'+'+star.value+(Object.hasOwn(item.stats,star.stat)||star.stat==='hp'&&Object.hasOwn(item.stats,'hpPercent')?' %':''):'350 or'}</small></button>`;}).join('')}</div><div class="forge-details"><h3>${itemName(item)}</h3>${rarityBadge(item)}<div class="forge-stats">${stellarStats(item)}</div><p>${itemPassiveText(item)}</p><div class="forge-star-list">${[0,1,2].map(n=>`<p class="star-${item.stars?.[n]?.stat??'empty'}">★ ${starText(item,item.stars?.[n])}</p>`).join('')}</div><p class="forge-equipped">${Object.values(s.equipped).includes(item.id)?'Équipé · tous ses bonus restent actifs en combat.':'Dans votre inventaire · équipez-le pour bénéficier de ses bonus.'}</p><button class="ghost forge-remove" data-action="forge-remove" ${busy?'disabled':''}>Retirer l’équipement</button><p class="small muted">Le retirer détruit définitivement ses étoiles. L’équipement est conservé.</p></div></div>`:`<div class="forge-empty"><span class="forge-empty-star" aria-hidden="true">✧</span><h3>Placez un équipement Astral</h3><p>Il restera dans votre inventaire et pourra être équipé normalement.</p></div><div class="forge-choices">${items.length?items.map(i=>`<button class="forge-choice${rarityClass(i)}" data-action="forge-place" data-id="${i.id}">${itemArt(i.type)}<span>${itemName(i)}${rarityBadge(i)}</span><b>Placer →</b></button>`).join(''):'<p>Aucun équipement Astral dans ce sac. Retrouvez-les en boutique.</p>'}</div>`}<details class="forge-rules"><summary>Comprendre les étoiles et leurs coûts</summary><p>Chaque étoile coûte 350 or. PV, Dégâts, Vitesse et Chance ont chacun 25 % de chances d’apparaître. Les doublons se cumulent.</p><p>Statistique native : +3 à 8 % de sa valeur d’origine. Statistique absente : +150 à 200 PV, +15 à 30 dégâts, +10 à 20 Vitesse ou Chance. Tirages entiers, bornes incluses.</p><p>Un bonus en pourcentage se calcule toujours sur la valeur native, jamais sur les autres étoiles. Sur un malus, il réduit la pénalité. Pour un protège-bras, l’étoile PV améliore son pourcentage de PV natif.</p><p>Détruire une étoile coûte 200 or. La remplacer coûte donc 550 or au total, sans garantie d’amélioration. Retirer l’objet détruit toutes ses étoiles sans remboursement.</p></details><div id="forge-reveal" role="status" aria-live="polite"></div></section>`;
}
function showForgeAnnouncement(){
 if(home||busy||!s.forge?.announce||s.battle||s.storyScene||result)return;
 document.querySelector('#forge-unlock').showModal();
}
function forgeTransaction(mutate){const before=structuredClone(s);try{const out=mutate();if(!save()){Object.assign(s,before);throw Error('Modification annulée : sauvegarde indisponible.');}return out;}catch(e){Object.assign(s,before);throw e;}}
function requestForgeConfirmation(kind,slot=null,stage=1){
 const item=s.items.find(i=>i.id===s.forge?.itemId);if(!item||home||busy||s.battle||s.storyScene)return;
 forgeRequest={owner:s,key:adventureId(s),id:item.id,kind,slot,stage};
 document.querySelector('#forge-confirm-title').textContent=kind==='star'?'Détruire cette étoile ?':stage===1?'Retirer cet équipement ?':'Confirmer le retrait irréversible';
 document.querySelector('#forge-confirm-copy').textContent=kind==='star'?`${starText(item,item.stars?.[slot])} sera perdu. Coût : 200 or. Une nouvelle étoile coûtera 350 or, sans garantie d’être meilleure.`:stage===1?'Toutes les étoiles et leurs bonus seront définitivement perdus. Votre équipement restera dans votre inventaire et conservera ses statistiques natives.':'Cette action est irréversible. Toutes les étoiles seront détruites, sans remboursement. Votre équipement lui-même ne sera pas détruit.';
 document.querySelector('#forge-confirm-yes').textContent=kind==='star'?'Détruire · 200 or':stage===1?'Continuer vers la confirmation finale':'Retirer et perdre les étoiles';
 document.querySelector('#forge-confirm').showModal();
}
async function activateForgeStar(slot){
 const item=s.items.find(i=>i.id===s.forge?.itemId);if(!item)return;
 const star=forgeTransaction(()=>addForgeStar(s,slot));busy=true;render();playTone(true);
 const reveal=document.querySelector('#forge-reveal');reveal.innerHTML=`<div class="stellar-reveal star-${star.stat}"><span>★</span><b>Étoile de ${STAR_NAMES[star.stat]}</b><p>${starText(item,star)}</p></div>`;
 try{await new Promise(resolve=>setTimeout(resolve,globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches?150:1900));}finally{busy=false;render();}
}

function render(){
 const codeBlocked=home||!s.hero||!!s.battle||!!s.storyScene||busy||saveBlocked;
 document.querySelector('#admin-code').disabled=codeBlocked;
 document.querySelector('#admin-code-submit').disabled=codeBlocked;
 document.querySelector('#admin-code-status').textContent=home||!s.hero?'Choisissez un compagnon.':codeBlocked?'Disponible au camp, hors dialogue.':'Compagnon actif : '+CLASSES[s.hero.key].name;
 showForgeAnnouncement();
 showWelcome();
 showAdventureCreated();
 if(document.querySelector('#achievements-dialog').open)renderAchievements();
 if(music)music.select(musicTheme({home,state:s,tab,result}));
 const bagContext=!home&&s.battle?s.hero.key+':'+s.battle.id:null;
 if(bagContext!==combatBagContext){combatBagContext=bagContext;combatBagOpen=false;}
 app.classList?.toggle?.('combat-view',!home&&!!s.battle);hideCombatTips();
 if(!home&&s.battle?.openingPending&&!busy&&!openingScheduled){openingScheduled=true;setTimeout(()=>{openingScheduled=false;if(!home&&s.battle?.openingPending&&!busy)action('opening');},450);}
 if(!home&&s.battle?.astralOpening&&!busy&&!openingScheduled){openingScheduled=true;setTimeout(()=>{openingScheduled=false;if(!home&&s.battle?.astralOpening&&!busy)action('astral-opening');},450);}
 clearAbilityPreviews();
 preloadForm();
 document.querySelector('#reset').disabled=busy||home||!s.hero;
 if(home||!s.hero){app.innerHTML=summonScreen();showForgeurUnlock();return;}
 app.innerHTML=`<div class="topline"><div><div class="eyebrow">${CLASSES[s.hero.key].name} · AVENTURE N° ${adventureNumber(s)}</div><h1>${s.battle?'Le moment d’agir.':'Le camp des compagnons'}</h1></div><div class="adventure-controls"><button data-action="home" class="ghost" ${busy?'disabled':''}>Compagnons</button><div class="wallet"><b>${num(s.gold)}</b> or</div></div></div><div class="game-layout">${sidebar()}<section class="workspace">${!s.battle&&!result&&!s.storyScene?`<nav class="tabs camp-tabs" aria-label="Camp">${[['world',s.hero.key==='forgeur'||storyRoute(s.hero.key)?'Chapitres':'Monde 1'],['character','Fiche personnage'],['training','Expédition'],['shop','Boutique'],['inventory','Inventaire']].map(([k,t])=>`<button class="tab ${tab===k?'active':''}" data-action="tab" data-tab="${k}" aria-current="${tab===k?'page':'false'}">${t}</button>`).join('')}<span class="atelier-rift-links"><button class="tab ${tab==='craft'?'active':''}" data-action="tab" data-tab="craft" aria-current="${tab==='craft'?'page':'false'}">Atelier</button>${riftPortal()}<button class="tab forge-tab ${tab==='forge'?'active':''}" data-action="tab" data-tab="forge" ${s.forge?.unlocked?'':'disabled title="Achetez un équipement Astral pour débloquer la Forge Cosmique"'}>✦ Forge Cosmique</button></span><button class="tab traversal-link ${tab==='trials'?'active':''}" data-action="tab" data-tab="trials" aria-current="${tab==='trials'?'page':'false'}"><span aria-hidden="true">✧</span> Traversée magique</button></nav>`:''}${s.storyScene?storyScreen():s.battle?battleScreen():result?resultScreen():({world:worldScreen,chapter2:chapterTwoScreen,chapter3:chapterThreeScreen,character:characterScreen,training:trainingScreen,shop:shopScreen,inventory:inventoryScreen,craft:craftScreen,forge:forgeScreen,rift:riftScreen,trials:trialsScreen}[tab])()}</section></div>`;
 if(s.battle?.goldenEncounter&&!s.battle.goldenIntroSeen){s.battle.goldenIntroSeen=true;save();}
 const lines=app.querySelector('.log-lines');if(lines)lines.scrollTop=lines.scrollHeight;
 showLevelUp();showForgeurUnlock();
}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function playTone(spell=false){if(!sound||(music?.volume??1)===0)return;try{audioContext??=new(window.AudioContext||window.webkitAudioContext)();if(audioContext.state==='suspended')audioContext.resume();const osc=audioContext.createOscillator(),gain=audioContext.createGain();osc.connect(gain);gain.connect(audioContext.destination);osc.type=spell?'sine':'triangle';const t=audioContext.currentTime;osc.frequency.setValueAtTime(spell?350:155,t);osc.frequency.exponentialRampToValueAtTime(spell?750:45,t+.14);gain.gain.setValueAtTime(.08*(music?.volume??1),t);gain.gain.exponentialRampToValueAtTime(.001,t+.2);osc.start(t);osc.stop(t+.21);}catch{}}
// Separate timbres for chance (electric impact) and speed (reward chime).
// Cosmetic synthesis uses deterministic noise, never the combat random generator.
function playCombatCue(kind){
 if(!sound||(music?.volume??1)===0)return;
 try{
  audioContext??=new(window.AudioContext||window.webkitAudioContext)();
  if(audioContext.state==='suspended')audioContext.resume().catch(()=>{});
  const ctx=audioContext,t=ctx.currentTime;
  const tone=(frequency,when,duration,volume,type,endFrequency)=>{
   const osc=ctx.createOscillator(),gain=ctx.createGain();osc.type=type;osc.connect(gain);gain.connect(ctx.destination);
   osc.frequency.setValueAtTime(frequency,when);if(endFrequency)osc.frequency.exponentialRampToValueAtTime(endFrequency,when+duration);
   gain.gain.setValueAtTime(.0001,when);gain.gain.exponentialRampToValueAtTime(Math.max(.0001,volume*(music?.volume??1)),when+.008);gain.gain.exponentialRampToValueAtTime(.0001,when+duration);
   osc.onended=()=>{osc.disconnect();gain.disconnect();};osc.start(when);osc.stop(when+duration+.01);
  };
  if(kind==='double'){
   [523.25,659.25,783.99,1046.5].forEach((f,i)=>{tone(f,t+i*.095,.24,.055,'sine');tone(f*2,t+i*.095,.15,.012,'triangle');});
  }else if(kind==='critical'){
   const buffer=ctx.createBuffer(1,Math.ceil(ctx.sampleRate*.30),ctx.sampleRate),samples=buffer.getChannelData(0);let seed=137;
   for(let i=0;i<samples.length;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;samples[i]=(seed/2147483648-1)*(i%110<70?1:.3);}
   const noise=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();noise.buffer=buffer;filter.type='highpass';filter.frequency.setValueAtTime(950,t);
   noise.connect(filter);filter.connect(gain);gain.connect(ctx.destination);gain.gain.setValueAtTime(.0001,t);gain.gain.exponentialRampToValueAtTime(Math.max(.0001,.12*(music?.volume??1)),t+.006);gain.gain.exponentialRampToValueAtTime(.0001,t+.28);
   noise.onended=()=>{noise.disconnect();filter.disconnect();gain.disconnect();};noise.start(t);noise.stop(t+.30);
   tone(1800,t,.17,.045,'sawtooth',140);tone(100,t,.24,.055,'triangle',38);
  }
 }catch{/* Sound must never interrupt combat, including browsers without Web Audio. */}
}
function floatText(id,text,kind=''){const el=document.getElementById(id);if(!el)return;const f=document.createElement('span');f.className='float-text '+kind;f.textContent=text;el.append(f);setTimeout(()=>f.remove(),950);}
function forgeTensionPanel(){if(s.hero?.key!=='forgeur'||!s.battle)return '';const b=s.battle,n=forgeTension(b),state=forgeState(b);return `<section class="tension-panel forge-${state}" aria-label="Acier vivant"><div>${abilityIcon('forgeur','passive')}<span><strong>Acier vivant</strong><small>${state==='hot'?'Surchauffe · dégâts +20 % · critique +15 points · dégâts reçus +15 %':state==='cold'?'Refroidissement · dégâts −20 % · Vitesse +15 points · bouclier au prochain tour':'Neutre · attisez ou refroidissez votre forge'}</small></span><b>${n} / 5</b></div><div class="tension-gauge">${Array.from({length:5},(_,i)=>`<i class="${i<n?'filled':''}"></i>`).join('')}</div></section>`;}
function showForgeurUnlock(){
 const dialog=document.querySelector('#forgeur-unlock-dialog');if(busy||s.battle||s.storyScene||!s.profile?.forgeurNoticePending||dialog.open||document.querySelector('#levelup-dialog')?.open)return;
 document.querySelector('#forgeur-unlock-content').innerHTML=`<div class="forgeur-unlock-glow"></div><p class="eyebrow">UN NOUVEAU COMPAGNON S’ÉVEILLE</p><h2 id="forgeur-unlock-title">Le Forgeur</h2>${art('forgeur-classic')}<p>Le chapitre de Wolffy est terminé.<br>Une nouvelle aventure vous attend, entre acier et magma.</p><p class="small muted">Ce compagnon est désormais disponible définitivement, même après la réinitialisation de vos aventures.</p><button class="primary" id="forgeur-discover">Découvrir le Forgeur</button><button class="ghost" id="forgeur-later">Plus tard</button>`;
 const close=discover=>{s.profile.forgeurNoticePending=false;if(!save()){s.profile.forgeurNoticePending=true;return;}dialog.close();if(discover){goHome();choose('forgeur');}};
 document.querySelector('#forgeur-discover').onclick=()=>close(true);document.querySelector('#forgeur-later').onclick=()=>close(false);dialog.oncancel=e=>{e.preventDefault();close(false);};dialog.showModal();
}
async function animate(events,visual){
 let signaturePlayed=false;
 for(const e of events){
  if(e.type==='forgeur-story-cue'){
   const unit=battleUnit(visual,e.to);floatText(e.to,e.label,'spell-name');
   if(e.kind==='bomb-set'){unit.bombPending=true;document.querySelector('.battlefield')?.insertAdjacentHTML('beforeend','<span class="forgeur-bomb bomb-arriving" role="img" aria-label="Bombe : explosion au prochain tour ennemi"></span>');await sleep(650);}
   else if(e.kind==='bomb-explode'){unit.bombPending=false;document.querySelector('.forgeur-bomb')?.remove();await sleep(250);}
   else await sleep(280);
  }else if(e.type==='roxxor-weaken'){visual.roxxorWeakened=true;refreshHeroEffects(visual);floatText('hero','Poids du regret · dégâts −10 %','spell-name');await sleep(450);
  }else if(e.type==='forgeur-story-burn'){
   const unit=battleUnit(visual,e.to);unit.burning=true;refreshHeroEffects(visual);floatText(e.to,e.label,'burn');await strikeEffect({projectile:'fire'},document.getElementById(e.from),document.getElementById(e.to));
  }else if(e.type==='forge-tension'){
   visual.tension=e.tension;await forgeurEffect(e,document.getElementById('hero'));refreshHeroEffects(visual);const panel=document.querySelector('.tension-panel');if(panel){const original=s.battle;s.battle=visual;panel.outerHTML=forgeTensionPanel();s.battle=original;}
  }else if(e.type==='forge-sync'){
   for(const key of ['tension','forgeNextStrike','forgeNextFracas','forgeNextProtection','forgeJudgment','preventionArmed','preventionPending','divineSwordStacks'])visual[key]=e[key];refreshHeroEffects(visual);
  }else if(e.type==='forge-regulation'){await forgeurEffect(e,document.getElementById('hero'));
  }else if(e.type==='forge-burn'){const unit=battleUnit(visual,e.to);unit.burning=true;const el=document.getElementById(e.to),icons=el?.querySelector('.status-icons');if(icons)icons.outerHTML=effectIcons(enemyEffects(unit,visual.round));floatText(e.to,e.label,'burn');await forgeurEffect(e,el);
  }else if(e.type==='shield'){
   const unit=battleUnit(visual,e.to);unit.shields=e.shields;visual.round=e.round??visual.round;if(e.to==='hero'&&e.label.startsWith('Transmutation'))visual.accumulation=0;
   updateVisualHealth(document.getElementById(e.to),unit,visual.round);refreshHeroEffects(visual);if(e.to!=='hero'){const icons=document.getElementById(e.to)?.querySelector('.status-icons');if(icons)icons.outerHTML=effectIcons(enemyEffects(unit,visual.round));}floatText(e.to,e.label,'shield');await masteryEffect(e,document.getElementById(e.to));
  }else if(e.type==='prey-mark'||e.type==='trap-set'||e.type==='trap-trigger'){
   const unit=battleUnit(visual,e.to);if(e.type==='prey-mark'){visual.prey=e.prey;document.getElementById(e.to)?.classList.add('marked-prey');}else if(e.type==='trap-set')unit.trap=e.trap;else delete unit.trap;
   const icons=document.getElementById(e.to)?.querySelector('.status-icons');if(icons)icons.outerHTML=effectIcons(enemyEffects(unit,visual.round));await masteryEffect(e,document.getElementById(e.to));
  }else if(e.type==='breath-cost'){
   visual.lastBreathCasts=e.stacks;refreshHeroEffects(visual);floatText('hero','Épuisement · −'+Math.min(100,e.stacks*15)+' %','spell-name');
  }else if(e.type==='adaptation'){
   visual.adaptation=e.stacks;refreshHeroEffects(visual);floatText('hero','Adaptation · +'+(e.stacks*2)+' %','spell-name');
  }else if(['hit','burn','poison','sacrifice','fatal'].includes(e.type)){
   const from=e.from?document.getElementById(e.from):null,to=document.getElementById(e.to);
   if(e.projectile){playTone(true);if(!(signaturePlayed&&e.projectile==='elemental-orb'))await strikeEffect(e,from,to);}else if(e.type==='hit'||e.type==='fatal'){from?.classList.add('lunging');await sleep(140);}
   if(e.type==='fatal')floatText(e.from,'Une flèche, un mort','crit');
   if(e.crit)playCombatCue('critical');else playTone();
   to?.classList.add('hurt');if(!e.crit)floatText(e.to,'−'+num(e.damage),e.type==='poison'?'poison':e.type==='burn'?'burn':'');
   const recipient=battleUnit(visual,e.to);recipient.hp=e.hpAfter??Math.max(0,recipient.hp-e.damage);if(recipient.practiceDummy)recipient.totalDamage=(recipient.totalDamage??0)+e.damage;
   updateVisualHealth(to,recipient,visual.round);
   if(e.crit)await combatCueEffect('critical',to,{damage:num(e.damage),enemy:e.from!=='hero'});else await sleep(340);
   from?.classList.remove('lunging');to?.classList.remove('hurt');
  }else if(e.type==='snake-poison'){
   visual.snakePoison=true;refreshHeroEffects(visual);floatText('hero','Poison · 5 % PV max','poison');await sleep(450);
  }else if(e.type==='cleanse'){
   cleanseHero(visual);refreshHeroEffects(visual);floatText('hero','Purification','heal');
  }else if(e.type==='heal'||e.type==='potion'){
   const unit=battleUnit(visual,e.to);if(e.light)await enemyStoryEffect({type:'enemy-light'},document.getElementById(e.to));unit.hp=Math.min(unit.maxHp,unit.hp+e.amount);updateVisualHealth(document.getElementById(e.to),unit,visual.round);floatText(e.to,(e.label?e.label+' · ':'')+'+'+num(e.amount)+' PV','heal');playTone(true);await sleep(450);
  }else if(e.type==='rift-cue'){
   floatText(e.to,e.label,'spell-name');playTone(true);await enemyStoryEffect(e,document.getElementById(e.to));
  }else if(e.type==='rift-marks'){
   const unit=battleUnit(visual,e.to);if(e.attraction)visual.riftAttraction=e.attraction;if(e.fissures)unit.riftFissures=e.fissures;refreshHeroEffects(visual);
  }else if(e.type==='rift-sync'){
   const unit=battleUnit(visual,e.to);unit.rift=e.rift;visual.riftAttraction=e.attraction;refreshHeroEffects(visual);const icons=document.getElementById(e.to)?.querySelector('.status-icons');if(icons)icons.outerHTML=effectIcons(enemyEffects(unit,visual.round));
  }else if(e.type==='rift-portal'){
   await enemyStoryEffect(e,document.getElementById(e.to));
  }else if(e.type==='rift-reform'){
   const unit=battleUnit(visual,e.to),el=document.getElementById(e.to);Object.assign(unit,e.enemy);if(el?.querySelector('.art'))el.querySelector('.art').src=artSrc(unit.art);if(el?.querySelector('.name'))el.querySelector('.name').textContent=unit.name+' · Niv. '+unit.level;updateVisualHealth(el,unit,visual.round);floatText(e.to,'Retour du Néant','spell-name');await enemyStoryEffect({type:'rift-cue',kind:'revive'},el);
  }else if(e.type==='distress'){
   visual.hp=e.hp;visual.unhealable=true;visual.distressUsed=true;updateVisualHealth(document.getElementById('hero'),visual,visual.round);refreshHeroEffects(visual);floatText('hero','Survie · Insoignable','spell-name');await distressEffect();
  }else if(e.type==='guard'){
   visual.navigatorUsed=true;refreshHeroEffects(visual);floatText('hero','Attaque annulée','heal');await sleep(450);
  }else if(e.type==='weakened'||e.type==='poison-stack'){
   const unit=battleUnit(visual,e.to);if(e.type==='weakened'){unit.weakenedUntil=e.until;unit.weakenedApplied=visual.round;}else unit.poisonStacks=e.stacks;
   const icons=document.getElementById(e.to)?.querySelector('.status-icons');if(icons)icons.outerHTML=effectIcons(enemyEffects(unit,visual.round));floatText(e.to,e.type==='weakened'?'Dégâts −15 %':'Poison ×'+e.stacks,e.type==='poison-stack'?'poison':'spell-name');await sleep(300);
  }else if(e.type==='pack-call'){
   visual.packUsed=true;
   if(e.crit){playCombatCue('critical');await combatCueEffect('critical',document.getElementById('hero'),{subtitle:e.count===1?'Un Bébé Wolffy rejoint le combat.':'Deux Bébés Wolffy rejoignent le combat.'});}
  }else if(e.type==='cloud-strike'){
   visual.cloudStrike=e.active;const icons=document.getElementById('hero')?.querySelector('.status-icons');if(icons)icons.outerHTML=effectIcons(heroEffects({...s,battle:visual}));
   if(e.active){floatText('hero','Prochaine attaque +50 %','heal');await sleep(300);}
  }else if(e.type==='ally-summon'){
   const ally=structuredClone(e.ally);
   if(ally.isBone){visual.bone=ally;visual.boneUsed=true;document.querySelector('.summon-column')?.insertAdjacentHTML('beforeend',boneCard(ally));document.querySelector('.arena')?.classList.add('has-bone');}
   else if(ally.isPup){visual.pups??=[];visual.pups.push(ally);visual.packUsed=true;document.querySelector('.pack-allies')?.insertAdjacentHTML('beforeend',pupCard(ally));document.querySelector('.arena')?.classList.add('has-pack');}
   else{visual.larva=ally;visual.larvaUsed=true;document.querySelector('.summon-column')?.insertAdjacentHTML('beforeend',larvaCard(ally));document.querySelector('.arena')?.classList.add('has-larva');}
   document.getElementById(ally.id)?.classList.add('summoning');floatText(ally.id,ally.isBone?'Le collier s’éveille !':ally.isPup?'La meute répond !':'Invocation du Néant','spell-name');await sleep(600);
  }else if(e.type==='linked-death'){
   const child=battleUnit(visual,e.to);if(child)child.hp=0;const el=document.getElementById(e.to);updateVisualHealth(el,child);el?.classList.add('fallen-ally');floatText(e.to,'Lien rompu','spell-name');await sleep(450);
  }else if(e.type==='expedition-technique'||e.type==='expedition-ward'){
   const unit=battleUnit(visual,e.to);if(e.type==='expedition-ward'&&unit)unit.frostGuard=false;
   floatText(e.to,e.label,'spell-name');await expeditionTechniqueEffect(e,document.getElementById(e.to));
  }else if(e.type==='ally-down'){
   const ally=battleUnit(visual,e.to);if(ally)ally.hp=0;document.getElementById(e.to)?.classList.add('fallen-ally');floatText(e.to,'Invocation vaincue','spell-name');await sleep(350);
  }else if(e.type==='spawn'){
   visual.enemies.push(structuredClone(e.enemy));document.querySelector('.enemy-group')?.insertAdjacentHTML('beforeend',enemyCard(e.enemy,visual.enemies.length-1,visual,true,false));
   document.getElementById(e.enemy.id)?.classList.add('summoning');if(visual.enemies.length>=3)document.querySelector('.arena')?.classList.add('three-enemies');floatText(e.enemy.id,e.enemy.summonedBy?'Luciole invoquée':e.enemy.riftKind?'Larve invoquée':'Renfort · Niv. 3','spell-name');playTone(true);await sleep(600);
  }else if(e.type==='plumes-charge'){
   visual.plumesStacks=e.stacks;refreshHeroEffects(visual);floatText('hero','Plumes · '+e.percent+' %','spell-name');
  }else if(e.type==='dispel'){
   dispelHeroBonuses(visual);updateVisualHealth(document.getElementById('hero'),visual,visual.round);refreshHeroEffects(visual);floatText(e.to,'Bonus dissipés','spell-name');
  }else if(e.type==='dodge'){
   const targetId=e.to??'hero',unit=document.getElementById(targetId);unit?.classList.add('dodging');floatText(targetId,'Esquive !','heal');await sleep(400);unit?.classList.remove('dodging');
  }else if(e.type==='transform'){
   const hero=document.getElementById('hero');
   await transformationEffect(e,()=>{
    visual.hp=e.hp;visual.maxHp=e.maxHp;visual.matriarch=!!e.matriarch;
    if(e.matriarch)hero?.classList.add('matriarch-form');
    const portrait=hero?.querySelector('.art');if(portrait)portrait.src=artSrc(e.art);
    const sidebarPortrait=document.querySelector('.hero-panel .portrait');if(sidebarPortrait)sidebarPortrait.src=artSrc(e.art);
    updateVisualHealth(hero,visual);if(e.amount)floatText('hero','+'+num(e.amount)+' PV','heal');
   });
  }else if(e.type==='omen'){visual.omenStacks=e.stacks;const icons=document.getElementById('hero')?.querySelector('.status-icons');if(icons)icons.outerHTML=effectIcons(heroEffects({...s,battle:visual}));
  }else if(e.type==='heal-charges'){visual.healCharges=e.charges;visual.healLastTurn=e.round;
  }else if(e.type==='refusal'){
   await diceEffect(e);visual.refusUsed=true;visual.refusSuccess=e.success;visual.hp=e.hp;visual.shields=e.shields??[];if(e.success)visual.unhealable=true;updateVisualHealth(document.getElementById('hero'),visual,visual.round);refreshHeroEffects(visual);floatText('hero',e.success?'Refus de mourir · 30 % PV':'Refus de mourir · échec',e.success?'heal':'spell-name');
  }else if(e.type==='dice'){await diceEffect(e,document.getElementById(e.from));
  }else if(e.type==='enemy-survival'){
   const unit=visual.enemies.find(x=>x.id===e.to),el=document.getElementById(e.to);unit.survivalUsed=true;
   const icons=el?.querySelector('.status-icons');if(icons)icons.outerHTML=effectIcons(enemyEffects(unit,visual.round));floatText(e.to,e.label,'spell-name');playTone(true);await enemyStoryEffect(e,el);
  }else if(e.type==='lava-burn'){
   visual.burning=true;visual.cobraBurnStacks=e.stacks;const el=document.getElementById('hero'),icons=el?.querySelector('.status-icons');if(icons)icons.outerHTML=effectIcons(heroEffects({...s,battle:visual}));floatText('hero',e.label,'burn');playTone();await enemyStoryEffect(e,el);
  }else if(e.type==='sword-revive'){
   const unit=visual.enemies.find(x=>x.id===e.to),el=document.getElementById(e.to);floatText(e.to,e.label,'spell-name');playTone(true);
   await enemyStoryEffect(e,el,()=>{unit.hp=e.hp;unit.revivals=e.revivals;updateVisualHealth(el,unit,visual.round);const icons=el?.querySelector('.status-icons');if(icons)icons.outerHTML=effectIcons(enemyEffects(unit,visual.round));});
  }else if(['enemy-aura','enemy-rage','enemy-wings','revive'].includes(e.type)){
   const unit=visual.enemies.find(x=>x.id===e.to),el=document.getElementById(e.to);
   if(e.type==='revive'){unit.hp=e.hp;unit.revived=true;unit.dmg=e.dmg;updateVisualHealth(el,unit,visual.round);}
   if(e.type==='enemy-aura')unit.aura=true;
   if(e.type==='enemy-wings'){unit.wingsUsed=true;unit.wingsUntil=e.until;unit.wingsApplied=e.applied;}
   if(e.type==='enemy-rage'){unit.rageStacks=(unit.rageStacks??0)+1;unit.dmg=e.dmg;}
   const icons=el?.querySelector('.status-icons');if(icons)icons.outerHTML=effectIcons(enemyEffects(unit,visual.round));
   const damageLabel=el?.querySelector('.enemy-damage');if(damageLabel)damageLabel.textContent=num(unit.dmg)+' dégâts / attaque';
   floatText(e.to,e.label||'Résurrection','spell-name');playTone(true);await enemyStoryEffect(e,el);
  }else if(e.type==='enemy-technique'){
   const unit=visual.enemies.find(x=>x.id===e.from),el=document.getElementById(e.from);if(e.skill==='glacier')unit.glacierUsed=true;
   const icons=el?.querySelector('.status-icons');if(icons)icons.outerHTML=effectIcons(enemyEffects(unit,visual.round));
   floatText(e.from,e.label,'spell-name');playTone(true);await sleep(500);
  }else if(e.type==='enemy-skill'){
   const recipient=visual.enemies.find(x=>x.id===e.to);recipient.powerStacks=e.stacks;recipient.powerBonus=(1+(recipient.powerBonus||0)/100)*(1+e.percent/100)*100-100;recipient.dmg=e.dmg;
   const unit=document.getElementById(e.to),fx=document.createElement('div');fx.className='effect puissance';unit?.append(fx);
   const icons=unit?.querySelector('.status-icons');if(icons)icons.outerHTML=effectIcons(enemyEffects(recipient,visual.round));
   const damageLabel=unit?.querySelector('.enemy-damage');if(damageLabel)damageLabel.textContent=num(e.dmg)+' dégâts / attaque';
   floatText(e.to,'Puissance +'+e.percent+' %','heal');playTone(true);await sleep(600);fx.remove();
  }else if(e.type==='skill'){
   if(e.skill==='saut')playHowl();else playTone(true);
   if(['protectionultime','magmageux','jugement','aureole'].includes(e.skill))await forgeurEffect({type:'forge-cast',skill:e.skill},document.getElementById(e.skill==='jugement'?e.to:'hero'));
   if(e.skill==='fumee'){visual.smokeUntil=visual.round+2;visual.smokeUsed=true;document.getElementById('hero')?.classList.add('smoke-active');refreshHeroEffects(visual);}
   if(e.skill==='souffle'){visual.lastBreathTurn=visual.round+1;refreshHeroEffects(visual);}
   if(e.skill==='elementaire'&&signatureAnimations)signaturePlayed=await signatureEffect(heroArt({...s,battle:visual}));
   if(!signaturePlayed){floatText('hero',SKILLS[e.skill].name,'spell-name');await castEffect(e);}

  }else if(e.type==='exile'||e.type==='exile-return'){
   const unit=visual.enemies.find(x=>x.id===e.to),el=document.getElementById(e.to);unit.attracted=e.type==='exile';
   if(unit.attracted)el?.classList.add('void-exiled');else{el?.classList.remove('void-exiled');floatText(e.to,'Action perdue · retour','spell-name');}
   const icons=el?.querySelector('.status-icons');if(icons)icons.outerHTML=effectIcons(enemyEffects(unit,visual.round));
   await sleep(e.type==='exile'?150:550);
  }else if(e.type==='hurricane-charge'){
   visual.hurricaneStacks=e.stacks;refreshHeroEffects(visual);floatText('hero','Prochain Ouragan : '+num(e.power)+' %',e.increased?'heal':'spell-name');await sleep(300);
  }else if(e.type==='elemental-consume'){visual.accumulation=0;refreshHeroEffects(visual);floatText('hero',e.stacks+' cumuls consommés','spell-name');await sleep(250);
  }else if(e.type==='pup-fury'){const pup=visual.pups?.find(p=>p.id===e.to);if(pup)pup.furyUntil=e.until;floatText(e.to,'Fury · dégâts +20 %','heal');await sleep(200);
  }else if(e.type==='astral-vortex'){const field=document.querySelector('.battlefield');if(field){field.classList.add('astral-vortex');await sleep(850);field.classList.remove('astral-vortex');}
  }else if(e.type==='double'){playCombatCue('double');await combatCueEffect('double',document.getElementById('hero'),e.source==='souffle'?{subtitle:'Dernier souffle · deux critiques garantis'}:{});
  }else if(e.type==='drunn-sand'){visual.sandUntil=e.until;floatText('hero',e.label,'burn');refreshHeroEffects(visual);await drunnTechniqueEffect('sand',document.getElementById('hero'));
  }else if(e.type==='drunn-charge'){floatText(e.to,e.label,'spell-name');await drunnTechniqueEffect('charge',document.getElementById(e.to));
  }else if(e.type==='status'){floatText(e.to,e.label,'burn');await sleep(450);}
  else{floatText(e.to||'hero',e.label||'Échec','crit');await sleep(450);}
 }
}
function refreshHeroEffects(visual){const icons=document.getElementById('hero')?.querySelector('.status-icons');if(icons)icons.outerHTML=effectIcons(heroEffects({...s,battle:visual}));}
function playHowl(){if(!sound||(music?.volume??1)===0)return;try{audioContext??=new(window.AudioContext||window.webkitAudioContext)();audioContext.resume?.();const ctx=audioContext,t=ctx.currentTime;for(const [ratio,volume]of [[1,.07],[2,.018],[3,.008]]){const osc=ctx.createOscillator(),gain=ctx.createGain();osc.type='sine';osc.connect(gain);gain.connect(ctx.destination);osc.frequency.setValueAtTime(240*ratio,t);osc.frequency.exponentialRampToValueAtTime(510*ratio,t+.2);osc.frequency.exponentialRampToValueAtTime(300*ratio,t+.85);gain.gain.setValueAtTime(.0001,t);gain.gain.exponentialRampToValueAtTime(Math.max(.0001,volume*(music?.volume??1)),t+.15);gain.gain.exponentialRampToValueAtTime(.0001,t+.95);osc.onended=()=>{osc.disconnect();gain.disconnect();};osc.start(t);osc.stop(t+1);}}catch{}}
function updateVisualHealth(el,unit,round=s.battle?.round??1){
 if(!el||!unit)return;
 if(unit.practiceDummy){const hp=el.querySelector('.hp-label');if(hp)hp.textContent='∞ PV';const total=el.querySelector('.dummy-damage-total');if(total)total.textContent='Dégâts cumulés : '+num(unit.totalDamage??0);return;}
 const points=shieldTotal(unit,round),capacity=Math.max(1,shieldCapacity(unit,round)),meter=el.querySelector('.shield-meter'),bar=el.querySelector('.shield-bar'),fill=el.querySelector('.shield-bar i'),label=el.querySelector('.shield-label');
 if(meter)meter.hidden=points<=0;
 if(label){label.hidden=points<=0;label.textContent='⬡ '+num(points)+' bouclier';}
 if(fill)fill.style.width=Math.min(100,points/capacity*100)+'%';
 if(bar){bar.setAttribute('aria-valuenow',String(points));bar.setAttribute('aria-valuemax',String(capacity));}
 const hpBar=el.querySelector('.health .bar i'),hpLabel=el.querySelector('.hp-label');if(hpBar)hpBar.style.width=Math.max(0,unit.hp/unit.maxHp*100)+'%';if(hpLabel)hpLabel.textContent=num(unit.hp)+' / '+num(unit.maxHp)+' PV';if(el.id!=='hero')el.style.opacity=unit.hp<=0?'.24':'1';
}

async function action(kind){
 if(busy||!s.battle)return;busy=true;render();const visual=structuredClone(s.battle);
 try{const outcome=kind==='potion'?consumePotion(s):resolveAction(s,kind);result=outcome.result;save();try{await animate(outcome.events,visual);}catch{/* A visual failure must not lose a completed turn. */}}
 catch(e){toast(e.message);}finally{clearBattleEffects();busy=false;render();}
}
const sellDialog=document.querySelector('#sell-dialog');
function requestSale(id){
 if(busy||s.battle)return;const item=s.items.find(i=>i.id===id);if(!item||!resalePrice(item))return;if(s.forge?.itemId===id){toast('Retirez cet équipement de la Forge Cosmique avant de le vendre.');return;}
 essenceRequest=null;resourceSale=null;saleItemId=id;const price=resalePrice(item);document.querySelector('#sell-title').textContent='Vendre '+itemName(item)+' pour '+price+' or ?';document.querySelector('#confirm-sell').textContent='Vendre définitivement · '+price+' or';document.querySelector('#cancel-sell').textContent='Garder cet objet';document.querySelector('#sell-description').textContent=([75,80].includes(ITEMS[item.type].sellPrice)||isAstral(item))?`Vous recevrez ${price} or, quelle que soit la rareté. Cet équipement sera retiré du sac et de son emplacement s’il est équipé. Ses bonus et malus cesseront de s’appliquer.`:item.type!=='orbe-vie'?`Vous recevrez ${price} or (${itemRarity(item).salePercent} % ${item.type==='collier-presages'?'de sa valeur de référence':'du prix payé'}, arrondi au supérieur). Cet équipement sera retiré définitivement du sac et de son emplacement s’il est équipé. Ses bonus et malus cesseront alors de s’appliquer.`:'Vous recevrez 200 or et perdrez définitivement cet objet ainsi que son bonus de 15 % de PV s’il est équipé. La mission ne peut pas être rejouée : dans cette version, aucun moyen ne permet d’obtenir une nouvelle Orbe de vie. Vous risquez de ne plus jamais pouvoir la récupérer. Voulez-vous vraiment la vendre ?';sellDialog.showModal();
}
function requestEssence(id){
 if(busy||home||s.battle||s.storyScene||s.hero?.key!=='stibili'||s.essences?.foudroiement)return;
 const item=s.items.find(i=>i.id===id);if(item?.type!=='grimoire-dore')return;
 essenceRequest={owner:s,key:adventureId(s),id};resourceSale=null;saleItemId=null;
 document.querySelector('#sell-title').textContent='Extraire l’essence du Grimoire doré ?';
 document.querySelector('#sell-description').textContent='Ce Grimoire doré sera détruit, même s’il est équipé. Vous ne recevrez aucun or. Stibili apprendra définitivement Foudroiement et pourra l’utiliser avec une autre arme. Cette extraction est irréversible.';
 document.querySelector('#confirm-sell').textContent='Extraire · apprendre Foudroiement';document.querySelector('#cancel-sell').textContent='Garder le grimoire';sellDialog.showModal();
}
function requestResourceSale(type,quantity){
 if(busy||s.battle||s.storyScene||!RESOURCES[type]||!Number.isSafeInteger(quantity)||quantity<1||quantity>resourceQuantity(s,type))return;
 essenceRequest=null;resourceSale={type,quantity,heroKey:adventureId(s)};saleItemId=null;const d=RESOURCES[type],price=d.sellPrice*quantity;
 document.querySelector('#sell-title').textContent=`Vendre ${d.name} ×${quantity} ?`;
 document.querySelector('#sell-description').textContent=`Cette vente rapporte ${price} or à ${CLASSES[s.hero.key].name}. ${quantity} ressource(s) seront retirées de son sac.`;
 document.querySelector('#confirm-sell').textContent=`Confirmer la vente · ${price} or`;document.querySelector('#cancel-sell').textContent='Garder les ressources';sellDialog.showModal();
}
document.querySelector('#cancel-sell').onclick=()=>{essenceRequest=null;saleItemId=null;resourceSale=null;sellDialog.close();if(selectedInventoryItem?.key===adventureId(s))openInventoryItem(selectedInventoryItem.id);};
sellDialog.addEventListener('cancel',e=>{e.preventDefault?.();document.querySelector('#cancel-sell').onclick();});
document.querySelector('#confirm-sell').onclick=()=>{
 if(essenceRequest){const request=essenceRequest;essenceRequest=null;
  if(request.owner!==s||request.key!==adventureId(s)||busy||home||s.battle||s.storyScene){sellDialog.close();return;}
  try{extractEssence(s,request.id);selectedInventoryItem=null;save();sellDialog.close();render();playCombatCue('double');toast('Foudroiement appris définitivement ! Aucun or gagné.');}catch(e){toast(e.message);}return;
 }
 if(busy)return;
 try{
  if(resourceSale){const {type,quantity,heroKey}=resourceSale;if(home||adventureId(s)!==heroKey)return;const price=sellResource(s,type,quantity);resourceSale=null;save();sellDialog.close();render();toast(`${RESOURCES[type].name} ×${quantity} : +${price} or.`);return;}
  if(!saleItemId)return;const label=itemName(s.items.find(i=>i.id===saleItemId));const price=sell(s,saleItemId);selectedInventoryItem=null;saleItemId=null;save();sellDialog.close();render();toast(label+' vendu : +'+price+' or.');
 }catch(e){toast(e.message);}
};
document.querySelector('#close-bestiary').onclick=()=>document.querySelector('#bestiary-dialog').close();
document.querySelector('#close-effect').onclick=()=>document.querySelector('#effect-dialog').close();
const chooseDialog=document.querySelector('#choose-dialog');
function showWelcome(){
 if(liberating||!s.hero||!s.welcomePending)return;
 const dialog=document.querySelector('#welcome-dialog');if(dialog.open)return;
 home=false;
 document.querySelector('#welcome-content').innerHTML=`<div class="welcome-scene" aria-hidden="true"></div><div class="welcome-layout"><div class="welcome-portrait" aria-hidden="true">${art(heroArt(s,false))}<span>${CLASSES[s.hero.key].name}</span></div><div class="welcome-copy"><p class="welcome-eyebrow">L’UNIVERS D’ASTRAL CARDS VOUS ATTEND</p><h2 id="welcome-title">Chaque compagnon<br>porte une <em>histoire.</em></h2><p id="welcome-description" class="welcome-lead"><strong>ASTRALFIGHTER</strong> vous invite à découvrir les histoires, les personnages et les secrets de l’univers d’<strong>ASTRAL CARDS</strong>.</p><div class="welcome-journey"><p><span>01</span>Partez en expédition.<br><b>Gagnez de l’expérience.</b></p><p><span>02</span>Forgez votre équipement.<br><b>Révélez votre puissance.</b></p><p><span>03</span>Découvrez votre compagnon.<br><b>Vivez son histoire.</b></p></div><p class="welcome-depth">Puis, lorsque vous serez prêt, engouffrez-vous dans les profondeurs de la <strong>Fissure du Néant</strong>…</p><div class="welcome-footer"><p>Votre premier chapitre commence ici.</p><button class="primary welcome-start" id="welcome-start" autofocus>Commencer l’aventure <span aria-hidden="true">→</span></button></div></div></div>`;
 document.querySelector('#welcome-start').onclick=finishWelcome;
 dialog.showModal();
}
function finishWelcome(){
 if(!s.welcomePending)return;s.welcomePending=false;
 if(!save()){s.welcomePending=true;return;}
 document.querySelector('#welcome-dialog').close();home=false;render();
}
document.querySelector('#welcome-dialog').addEventListener('cancel',event=>{event.preventDefault();finishWelcome();});

function showAdventureCreated(){
 if(liberating||busy||!s.hero||!s.adventureCreatedPending)return;
 const dialog=document.querySelector('#adventure-created-dialog');if(dialog.open)return;
 document.querySelector('#adventure-created-content').innerHTML=`<div class="created-adventure-portrait">${art(heroArt(s,false))}</div><p class="eyebrow">AVENTURE N° ${adventureNumber(s)} · NIVEAU 1</p><h2 id="adventure-created-title">${CLASSES[s.hero.key].name} est prêt !</h2><p>Votre nouveau compagnon a été ajouté à <strong>l’accueil des compagnons</strong>, sous <strong>${CLASSES[s.hero.key].name} · Aventure n° ${adventureNumber(s)}</strong>.</p><p>Pour le retrouver, cliquez sur <strong>Compagnons</strong>, puis sur sa carte. Le bouton « Nouvelle aventure » sert à créer un autre personnage.</p><p class="muted">Vos autres aventures sont conservées.</p>`;
 dialog.showModal();
}
function closeAdventureCreated(showHome=false){
 if(!s.adventureCreatedPending||busy)return;
 delete s.adventureCreatedPending;if(!save()){s.adventureCreatedPending=true;return;}
 document.querySelector('#adventure-created-dialog').close();
 if(showHome)goHome();else{home=false;render();}
}
document.querySelector('#adventure-created-play').onclick=()=>closeAdventureCreated();
document.querySelector('#adventure-created-home').onclick=()=>closeAdventureCreated(true);
document.querySelector('#adventure-created-dialog').addEventListener('cancel',event=>{event.preventDefault();closeAdventureCreated();});

function choose(key){if(busy||!home||!Object.hasOwn(CLASSES,key)||!companionAvailable(key,s.profile)||!newAdventureMode&&Object.values(companions).some(c=>c.hero.key===key))return;selectedHero=key;const c=CLASSES[key];document.querySelector('#choose-title').textContent=c.name;document.querySelector('#choose-content').innerHTML=`<div class="choice-preview choice-card-preview">${companionCard(key)}<div><div class="eyebrow">${c.role}</div><p>${c.lore}</p><p><b>Arme exclusive :</b> ${key==='forgeur'?'épée lourde ou protège-bras':key==='nahat'?'épée et bouclier, lame-sabre ou protège-bras':ITEMS[c.weapon].name.replace(' en bois','').toLowerCase()}.</p><div class="choice-stats">${['hp','dmg','luck','speed'].map(k=>`<span>${LABELS[k]}<b>${num(c[k])}</b></span>`).join('')}</div><p class="small muted">Statistiques de départ fixes, identiques après confirmation.</p></div></div>`;document.querySelector('#confirm-choice').textContent=newAdventureMode?'Commencer avec '+c.name:'Choisir '+c.name;chooseDialog.showModal();}
document.querySelector('#cancel-choice').onclick=()=>{selectedHero=null;chooseDialog.close();};
chooseDialog.addEventListener('cancel',()=>{selectedHero=null;});
function releaseCompanion(key,done){
 const dialog=document.querySelector('#release-dialog'),c=CLASSES[key];
 dialog.innerHTML=`<div class="release-scene" aria-hidden="true"><div class="release-glow"></div><div class="release-card">${companionCard(key)}</div><div class="release-hero">${art(heroArt(s,false))}</div><div class="release-flare"></div></div><p class="release-caption" id="release-label"><span>UNE CARTE PREND VIE</span><strong>${c.name}</strong></p>`;
 // A nonvisual host can still confirm and save a companion synchronously.
 if(!dialog.querySelector('.release-scene')){done();return;}
 liberating=true;busy=true;render();dialog.showModal();
 const reduce=globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false;
 setTimeout(()=>{dialog.close();dialog.innerHTML='';liberating=false;busy=false;done();},reduce?250:2100);
}
document.querySelector('#release-dialog').addEventListener('cancel',e=>e.preventDefault());
document.querySelector('#confirm-choice').onclick=()=>{
 if(busy||!home||!selectedHero||!newAdventureMode&&Object.values(companions).some(c=>c.hero.key===selectedHero))return;
 try{
  if(s.hero&&!save())return;
  const key=selectedHero,previous=s,firstCompanion=!s.hero&&!Object.values(companions).some(c=>c.hero),next=createCompanionAdventure(key,companions,s.profile);if(firstCompanion)next.welcomePending=true;if(Object.values(companions).some(c=>c.hero.key===key))next.adventureCreatedPending=true;
  s=next;if(!save()){s=previous;return;}
  newAdventureMode=false;home=false;tab='world';result=null;allocationDraft=emptyAllocation();selectedHero=null;chooseDialog.close();playTone(true);
  releaseCompanion(key,()=>{render();if(!s.welcomePending)toast(CLASSES[key].name+' rejoint votre aventure !');});
 }catch(e){liberating=false;busy=false;toast(e.message);}
};
// Transient hover and explicit pinning belong only to character-sheet cards.
// Native summary clicks also cover Enter/Space and touch; no combat handlers change.
const abilityPreviewTimers=new Map();
let hoveredAbility=null;
function cancelAbilityPreview(card){clearTimeout(abilityPreviewTimers.get(card));abilityPreviewTimers.delete(card);}
function clearAbilityPreviews(){for(const timer of abilityPreviewTimers.values())clearTimeout(timer);abilityPreviewTimers.clear();hoveredAbility=null;}
function closeAbilityPreview(card){cancelAbilityPreview(card);delete card.dataset.previewPinned;card.open=false;}
app.addEventListener('pointerover',e=>{
 if(e.pointerType==='mouse'){const slot=e.target.closest?.('.combat-slot');if(slot&&!slot.contains(e.relatedTarget))scheduleCombatTip(slot);}
 if(e.pointerType!=='mouse'||!globalThis.matchMedia?.('(hover: hover) and (pointer: fine)').matches)return;
 const card=e.target.closest?.('details[data-ability-preview]');
 if(!card||card.contains(e.relatedTarget))return;
 hoveredAbility=card;cancelAbilityPreview(card);
 if(!card.open)abilityPreviewTimers.set(card,setTimeout(()=>{abilityPreviewTimers.delete(card);card.open=true;},180));
});
app.addEventListener('pointerout',e=>{
 const slot=e.target.closest?.('.combat-slot');if(slot&&!slot.contains(e.relatedTarget))hideCombatTips();
 const card=e.target.closest?.('details[data-ability-preview]');
 if(!card||card.contains(e.relatedTarget))return;
 cancelAbilityPreview(card);if(hoveredAbility===card)hoveredAbility=null;
 if(!card.dataset.previewPinned)card.open=false;
});
app.addEventListener('keydown',e=>{
 if(e.key!=='Escape')return;hideCombatTips();
 const card=e.target.closest?.('details[data-ability-preview]')||hoveredAbility;
 if(card){e.preventDefault();closeAbilityPreview(card);}
});
app.addEventListener('click',async e=>{
 const preview=e.target.closest?.('summary')?.parentElement;
 if(preview?.matches?.('details[data-ability-preview]')){
  e.preventDefault();cancelAbilityPreview(preview);
  if(preview.dataset.previewPinned)closeAbilityPreview(preview);
  else{preview.dataset.previewPinned='true';preview.open=true;}
  return;
 }
 const b=e.target.closest('[data-action]');if(!b||b.disabled)return;const a=b.dataset.action;
 if(a==='effect'){document.querySelector('#effect-title').textContent=b.dataset.title;document.querySelector('#effect-description').textContent=b.dataset.description;document.querySelector('#effect-dialog').showModal();return;}
 if(busy)return;
 if(a==='practice'){if(home||!s.hero||s.battle||s.storyScene)return;practiceRequest=adventureId(s);document.querySelector('#practice-dialog').showModal();return;}
 if(a==='achievements'){if(!home&&s.hero){renderAchievements();document.querySelector('#achievements-dialog').showModal();}return;}
 if(a==='forgeur-reset-notice'){delete s.forgeurResetNotice;save();render();return;}
 if(a==='home'){document.querySelector('#achievements-dialog').close();goHome();return;}
 if(a==='new-adventure'||a==='cancel-new-adventure'){if(!home||busy)return;newAdventureMode=a==='new-adventure';selectedHero=null;render();return;}
 if(a==='resume-companion'){resumeCompanion(b.dataset.key);return;}
 if(!home&&s.storyScene&&!['story-next','story-skip'].includes(a))return;
 try{
  if(a==='forge-place'){forgeTransaction(()=>placeForgeItem(s,b.dataset.id));render();return;}
 if(a==='forge-remove'){requestForgeConfirmation('remove');return;}
 if(a==='forge-star'){const slot=Number(b.dataset.slot),item=s.items.find(i=>i.id===s.forge?.itemId);if(item?.stars?.[slot])requestForgeConfirmation('star',slot);else await activateForgeStar(slot);return;}
 if(a==='story-next'||a==='story-skip'){result=advanceStory(s,a==='story-skip');save();render();return;}
  if(a==='combat-bag'){if(!s.battle||s.battle.openingPending)return;combatBagOpen=!combatBagOpen;render();app.querySelector('[data-action="combat-bag"]')?.focus?.();return;}
  if(a==='expedition-select'){if(s.battle||!EXPEDITIONS[b.dataset.zone])return;expeditionSelected=b.dataset.zone;render();return;}
  if(a==='bestiary'){openBestiary(b.dataset.type);return;}
  if(a==='inventory-view'){if(s.battle)return;inventoryView=b.dataset.view==='resources'?'resources':'equipment';}
  if(a==='trial-select'){trialSelected=b.dataset.kind;render();return;}
  if(a==='trial-fight'){startBattle(s,'trial',b.dataset.kind);tab='trials';result=null;save();render();return;}
  if(a==='rift-enter'){if(s.battle||!riftUnlocked(s))return;riftSelected=Math.min(50,riftCleared(s)+1);busy=true;try{await riftEntryEffect();}finally{busy=false;}tab='rift';result=null;render();return;}
  if(a==='rift-select'){if(s.battle)return;riftFloor(Number(b.dataset.stage));riftSelected=Number(b.dataset.stage);tab='rift';result=null;render();return;}
  if(a==='rift-fight'){if(s.battle)return;const floor=Number(b.dataset.stage);startBattle(s,'rift',floor);tab='rift';riftSelected=floor;result=null;save();busy=true;try{await riftEntryEffect();}finally{busy=false;render();}return;}
  if(a==='chapter'){if(s.battle)return;tab=b.dataset.chapter==='3'&&s.hero.key==='stibili'?'chapter3':b.dataset.chapter==='2'?'chapter2':'world';result=null;}
  else if(a==='recap'){beginStory(s,Number(b.dataset.stage),true,Number(b.dataset.chapter||1));save();}
  else if(a==='choose'){choose(b.dataset.key);return;}
  if(a==='tab'){if(s.battle)return;if(b.dataset.tab==='trials'&&tab!=='trials'){busy=true;try{await traversalEntryEffect(()=>{tab='trials';result=null;allocationDraft=emptyAllocation();render();});}finally{busy=false;}return;}tab=b.dataset.tab;if(b.dataset.view)inventoryView=b.dataset.view==='resources'?'resources':'equipment';result=null;allocationDraft=emptyAllocation();}
  else if(a==='adjust-stat'){if(s.battle)return;const k=b.dataset.stat,delta=Number(b.dataset.delta),used=Object.values(allocationDraft).reduce((a,b)=>a+b,0);if(Object.hasOwn(STAT_GAINS,k)&&[-1,1].includes(delta)&&allocationDraft[k]+delta>=0&&used+delta<=remainingPoints(s))allocationDraft[k]+=delta;}
  else if(a==='reforge'){requestReforge();return;}
  else if(a==='cancel-stats')allocationDraft=emptyAllocation();
  else if(a==='apply-stats'){const n=allocateStats(s,allocationDraft);allocationDraft=emptyAllocation();save();toast(n+' points répartis.');}
  else if(['training','world','next','again','forest'].includes(a)){const mode=a==='training'?'training':a==='forest'?'forest':a==='again'?result.mode:'world',stage=a==='again'?result.stage:a==='training'?(b.dataset.zone??expeditionSelected):Number(b.dataset.stage||1),chapter=a==='again'?(result.chapter??1):Number(b.dataset.chapter||1);if(mode==='world'&&storyRoute(s.hero.key)){beginStory(s,stage,false,chapter);tab=chapter===2?'chapter2':'world';}else startBattle(s,mode,stage);result=null;save();}
  else if(a==='return'){if(result?.mode==='training'){tab='training';expeditionSelected=EXPEDITIONS[result.stage]?result.stage:'forest';}if(result?.mode==='trial')tab='trials';if(result?.mode==='rift'){tab='rift';riftSelected=Math.min(50,riftCleared(s)+1);}result=null;}
  else if(a==='craft'){requestCraft(b.dataset.recipe);return;}
  else if(a==='buy'){
   if(saveBlocked)throw Error('Achat impossible : sauvegarde indisponible.');
   const previousForge=structuredClone(s.forge),previousGold=s.gold,previousItems=[...s.items],previousAchievements=structuredClone(s.achievements),i=buy(s,b.dataset.type);
   // Commit before any animation. Failed storage restores both the item list and wallet.
   if(!save()){s.forge=previousForge;s.gold=previousGold;s.items=previousItems;s.achievements=previousAchievements;render();return;}
   if(hasRarity(i.type)){
    busy=true;render();
    try{await showPurchaseReveal({name:itemName(i),type:i.type,rarity:itemRarity(i).id,rarityName:itemRarity(i).name,stats:statString(i.stats),passive:itemPassiveText(i),companion:CLASSES[s.hero.key].name,sound,volume:music?.volume??1});}
    catch{toast(itemName(i)+' · '+itemRarity(i).name+' ajouté au sac.');}
    finally{busy=false;render();app.querySelector('[data-action="buy"][data-type="'+i.type+'"]')?.focus?.();}
    return;
   }
   toast('Potion ajoutée au sac.');
  }
  else if(a==='buy-resource'){
   const previousGold=s.gold,previousResources={...s.resources},previousAchievements=structuredClone(s.achievements),d=buyResource(s,b.dataset.type);
   if(!save()){s.gold=previousGold;s.resources=previousResources;s.achievements=previousAchievements;render();return;}
   toast(d.name+' ×1 ajouté aux ressources de '+CLASSES[s.hero.key].name+'.');
  }
  else if(a==='sell-resource'){requestResourceSale(b.dataset.type,Number(b.dataset.quantity));return;}
  else if(a==='sell'){requestSale(b.dataset.id);return;}
  else if(a==='item-detail'){openInventoryItem(b.dataset.id);return;}
  else if(a==='equip'){equip(s,b.dataset.id,b.dataset.slot??null);save();}
  else if(a==='retreat'&&s.battle?.mode==='practice'){retreatBattle(s);result=null;tab='training';save();toast('Entraînement terminé. Aucune récompense ; vos potions sont conservées.');}
  else if(a==='retreat'){const expedition=s.battle?.mode==='training';retreatBattle(s);save();toast(expedition?'Retour au camp. Le même adversaire vous attend dans cette expédition.':'Retour au camp. Aucun or ni EXP perdus ; les potions utilisées restent consommées.');}
  else if(a==='target'){const i=Number(b.dataset.index);if(s.battle?.enemies[i]?.hp>0){s.battle.target=i;save();}}
  else if(a==='attack'||a==='skill'||a==='potion'||a==='end-turn'){const kind=a==='skill'?b.dataset.skill:a;if(kind!=='end-turn'&&(isTouchActivation(e)||!combatActionReady(kind))){openCombatInspection(kind);return;}await action(kind);return;}
  render();
 }catch(err){toast(err.message);}
});

app.addEventListener('change',e=>{
 if(e.target.dataset?.craftIngredient){if(busy||s.battle||home)return;craftSelections[e.target.dataset.craftIngredient]=e.target.value;render();return;}
 const k=e.target.dataset?.statInput;if(!Object.hasOwn(STAT_GAINS,k)||s.battle||busy)return;
 const other=Object.entries(allocationDraft).reduce((sum,[key,n])=>sum+(key===k?0:n),0),n=Number(e.target.value);
 allocationDraft[k]=Math.min(remainingPoints(s)-other,Math.max(0,Number.isFinite(n)?Math.floor(n):0));render();
});
function updateAudioControls(){
 const button=document.querySelector('#sound');button.textContent='Son : '+(sound?'oui':'non');button.setAttribute('aria-label',sound?'Désactiver le son':'Activer le son');button.setAttribute('aria-pressed',String(sound));
 const volume=Math.round((music?.volume??.18)*100);document.querySelector('#audio-volume').value=volume;document.querySelector('#audio-volume-value').textContent=volume+' %';
}
function updateSignatureControl(){const button=document.querySelector('#signature-toggle');button.textContent='Signatures : '+(signatureAnimations?'oui':'non');button.setAttribute('aria-pressed',String(signatureAnimations));button.setAttribute('aria-label',(signatureAnimations?'Désactiver':'Activer')+' les animations signature');}
document.querySelector('#signature-toggle').onclick=()=>{signatureAnimations=!signatureAnimations;try{localStorage.setItem('astralfighter-signatures-v1',signatureAnimations?'on':'off');}catch{}updateSignatureControl();};
updateSignatureControl();
document.querySelector('#practice-cancel').onclick=()=>{practiceRequest=null;document.querySelector('#practice-dialog').close();};
document.querySelector('#practice-confirm').onclick=()=>{const owner=practiceRequest;practiceRequest=null;document.querySelector('#practice-dialog').close();if(busy||home||!s.hero||s.battle||s.storyScene||owner!==adventureId(s))return;const before=structuredClone(s);try{startBattle(s,'practice');if(!save()){s=before;render();return;}result=null;tab='training';render();}catch(error){s=before;toast(error.message);}};
document.querySelector('#sound').onclick=()=>{sound=!sound;music?.setEnabled(sound);if(sound)music?.unlock();updateAudioControls();};
document.querySelector('#audio-volume').addEventListener('input',e=>{music?.setVolume(Number(e.target.value)/100);music?.unlock();updateAudioControls();});
document.addEventListener?.('pointerdown',()=>music?.unlock(),{once:true});
document.addEventListener?.('keydown',()=>music?.unlock(),{once:true});
document.addEventListener?.('visibilitychange',()=>music?.setHidden(document.hidden));
updateAudioControls();
const help=document.querySelector('#help-dialog');
document.querySelector('#help').onclick=()=>{
 const skills=availableSkills(s);
 document.querySelector('#help-content').innerHTML=`<h3>Choisir son compagnon</h3><p>Choisissez librement votre personnage, puis confirmez après avoir lu son histoire. Ses statistiques de départ sont fixes : les valeurs affichées avant confirmation sont celles obtenues à la création.</p><h3>Un tour, un choix</h3><p>Attaquez ou utilisez une compétence débloquée. Chaque frappe de base du personnage tire un bonus ou malus entier entre −3 et +3 dégâts (minimum 1), sauf Nahat avec des protège-bras : sa base vaut exactement 3,5 % de ses PV max, arrondis au plus proche. Le critique multiplie ensuite ce résultat par 1,75. Chaque frappe répétée par la vitesse possède son propre jet. Les autres compétences gardent leur formule. Les ennemis survivants répondent automatiquement. La vitesse peut répéter votre action une fois, sans provoquer de répétition en boucle. La Griffe Astral Super rare ou Légendaire ajoute une troisième action à demi-puissance. Cliquez sur un ennemi pour changer de cible. Certaines compétences utilisables une seule fois par combat, dont Redressement, ne peuvent pas être répétées par la vitesse.</p><h3>Progression</h3><p>Les compétences se débloquent généralement aux niveaux 3, 6 et 9. Stibili obtient Ouragan au niveau 1, Boule de feu au niveau 3, Puissance au niveau 6 et Glacier au niveau 9. Kaerune obtient Redressement au niveau 3 et Grande matriarche au niveau 5. Les compétences verrouillées restent masquées en combat et sont consultables dans la fiche personnage avec leur niveau de déblocage. Seuls les PV naturels augmentent automatiquement de 13 % par niveau. Vous recevez exactement 4 points à chaque montée de niveau, du niveau 2 au niveau maximum 50 : 196 points au total. Au niveau 50, vous ne gagnez plus d’EXP ni de nouveaux points. Répartissez-les dans la fiche personnage : +2 PV, +1 dégât, +0,5 chance ou +0,5 vitesse par point. Investissez dans les dégâts : ils ne progressent plus seuls. L’EXP requise augmente de 24 % par niveau (40 EXP au départ).</p><h3>Critiques et vitesse</h3><p>Un critique inflige 175 % des dégâts. 3 points de Chance donnent 1 % de critique et 3 points de Vitesse donnent 1 % de double action : 75 points = 25 %, 150 points = 50 %. Les fractions de pourcentage sont conservées dans les calculs. Avant combat, chaque point excédant 150 en Chance ou en Vitesse est converti en 1 dégât. Le plafond de 50 % concerne uniquement les statistiques avant combat. Les bonus temporaires peuvent le dépasser, jusqu’à 100 %. Les malus ne peuvent pas rendre les probabilités négatives. La seconde forme de Kaerune ajoute 10 points de pourcentage à la double action, même au-delà de 50 % (maximum 100 %). Les actions garanties par une compétence, comme Dernier souffle, restent garanties.</p>${s.hero?`<h3>Passif : ${PASSIVES[s.hero.key].name}</h3><p>${PASSIVES[s.hero.key].text.replaceAll('\n','<br><br>')}</p>`:''}${skills.length?`<h3>Vos compétences</h3>${skills.map(d=>`<p><b>${d.name}.</b> ${skillText(s,d.id)}</p>`).join('')}`:''}<h3>Durée des effets</h3><p>Un effet annoncé pour X tours agit dès son activation, puis reste actif pendant X tours complets à partir du tour suivant. Exemple : Fury lancée au tour 1 renforce les tours 2 et 3, puis expire au début du tour 4. Écran de fumée dure précisément trois tours en comptant celui du lancement ; Dernier souffle prépare uniquement le tour suivant. Les icônes indiquent les tours encore disponibles. Cette durée est distincte du délai de récupération de la compétence.</p><h3>Récupération</h3><p>Une compétence lancée au tour 1 avec une récupération de 4 tours revient au tour 5. Chaque compétence possède sa propre récupération. Les soins à récupération courte, comme les sacrifices offensifs, imposent un tour d’attente complet entre deux utilisations (tour 1, puis tour 3). Les effets prennent fin avec le combat.</p><h3>Puissance du Slime</h3><p>À sa première action, le Slime de combat utilise Puissance au lieu d’attaquer. Il augmente les dégâts d’un allié vivant aléatoire de 10 à 12 % jusqu’à la fin du combat. S’il est seul, il se renforce lui-même. Une seule utilisation par Slime et par combat.</p><h3>Bestiaire et ressources</h3><p>Chaque Expédition a 5 % de chances de révéler l’Enchanteur doré, à vaincre en quatre tours pour 100 or. Les 95 % restants se répartissent équitablement entre les trois rencontres ordinaires. La Crevasse oppose des ennemis de deux niveaux supérieurs et donne 11 % d’EXP et d’or en plus sur ses rencontres ordinaires. Le Sceptre invoque une Luciole liée à sa survie, sans récompense supplémentaire. Le loup glacé donne +30 % d’or (total arrondi au supérieur). Le bestiaire détaille leurs techniques et butins. Le Dragonnet explose à sa mort : si cette explosion vous terrasse, vous perdez le combat et ses récompenses. Les ressources gagnées se trouvent dans l’onglet Ressources du sac et se vendent à l’unité ou par pile. Elles appartiennent uniquement au compagnon qui les a obtenues.</p><h3>Or et équipements</h3><p>Départ : 0 or. Équipements de départ : 37 or ; armes de niveau 2 : 125 or ; niveau 3 : 350 or ; niveau 4 : 555 or ; niveau 5 : 1 050 or. Veste d’aventurier : 110 or. Expédition : 2 à 5 or, puis +3 or fixes dès que le combat 5 est accessible, soit 5 à 8 or. Monde : 5 à 15 or pour les combats 1 à 5, puis 22 or fixes à partir du combat 6. Le premier combat du monde 1 offre un bonus unique de 15 or. Un combat du monde remporté ne peut plus être rejoué. Une défaite ou un abandon permet de réessayer.</p><h3>Déblocage et revente</h3><p>Les équipements en fer/acier et la veste d’aventurier deviennent achetables après la victoire du combat 7. Les armes dorées se débloquent après le chapitre 1. Raretés : commune 40 %, rare 30 %, super rare 20 %, légendaire 10 %. Chaque rareté fixe toutes les valeurs ensemble ; le légendaire ajoute 1 à chaque valeur super rare, y compris les malus. Revente : 25 %, 30 %, 35 % ou 40 % du prix payé selon la rareté, arrondie au supérieur. L’Orbe de vie conserve sa revente spéciale à 200 or. Les potions ne se revendent pas.</p><h3>Ennemis</h3><p>Corkbeau ajoute 2 % des PV max de sa cible à ses dégâts, avec un plafond de 50 % de ses dégâts propres. À 50 % de PV ou moins, Drannex encore vivant appelle une seule fois un Chien sauvage de niveau 3. Ce renfort attaque à partir du tour suivant.</p><h3>Potions</h3><p>Une potion coûte 25 or et rend 20 % des PV max en combat, sans dépasser le maximum. Elle disparaît du sac après utilisation, même si vous perdez ou quittez ensuite le combat. Elle ne consomme pas votre action, ne fait pas jouer les ennemis et ne fait avancer ni charges ni récupérations. À PV complets ou dans l’état Insoignable, aucune potion n’est consommée.</p><h3>Atelier et accessoires</h3><p>L’atelier remplace la fusion. Collier des présages : 2 Plumes maléfiques, 1 Pierre précieuse usée et 1 Veste en tissu non équipée. Potion de soin : 3 Gelées de slime et 1 Écaille rouge. Les ressources et le résultat restent propres au compagnon actif. Le collier possède quatre raretés : chaque perte de PV par dégâts ajoute 3, 4, 5 ou 6 points de chance de Riposte. Une riposte inflige 40 % des dégâts d’attaque et consomme tous les cumuls. Valeur de référence pour la revente du collier : 60 or. Les orbes sont exclues des raretés.</p><h3>Grimoire doré</h3><p>Équipé par Stibili, il débloque Foudroiement : dé 1 ou 6, éclair bleu à 175 % ; autres résultats, éclair jaune à 100 %. Récupération 3 tours. Retirer le grimoire retire l’accès au sort. Les critiques et la vitesse fonctionnent normalement.</p><h3>Traversée magique</h3><p>Quatre Gardiens et quatre orbes aux effets puissants avec contrepartie. Défis conseillés au niveau 15, avec une arme en or et une Veste d’aventurier, sans obligation d’équipement ni de niveau. Potions interdites pendant ces combats. Votre première victoire donne l’orbe du Gardien et ferme les autres défis pour ce compagnon, jusqu’à une future mise à jour. Défaites et abandons ne verrouillent aucun choix. Les anciennes Orbes de vie déjà gagnées restent conservées.</p><h3>Fissure du Néant</h3><p>Accessible au niveau 8 par l’onglet près de l’Atelier. Cinquante étages, avec un gardien aux étages 5, 15, 25, 35 et 45 et Draconoros tous les dix étages. Chaque compagnon conserve sa propre progression. Les 5 premières relectures gagnées de chaque étage donnent 25 % de l’EXP habituelle et l’or indiqué pour les relectures, sans Fragment. L’étage 50 ne peut pas être rejoué. Ensuite, les relectures restent possibles sans récompense. Une première victoire donne environ 13 % de l’EXP nécessaire au niveau du compagnon au début du combat (aucune EXP au niveau 50). Les gains d’or augmentent par tranche de dix étages : consultez les montants avant le combat. Le dernier étage offre 750 or une seule fois. La première victoire à chaque étage de Draconoros donne 1 Fragment du Néant, revendable 70 or : 5 maximum par compagnon, aucun en rejouant. Pas de malus de salle pour le moment. Les intentions ennemies expliquent leur prochaine action ; les règles détaillées sont consultables avant et pendant le combat.</p><h3>Sauvegarde et Reset</h3><p>La progression est enregistrée dans ce navigateur après chaque action terminée. Le bouton Compagnons permet de changer d’aventure. Le bouton Nouvelle aventure permet de rejouer le même compagnon depuis le niveau 1. Chaque aventure conserve séparément son or, ses objets, ses succès, ses missions et ses points. Reset efface uniquement l’aventure jouée, après confirmation. Vos PV sont restaurés entre les combats.</p>`;help.showModal();
};
document.querySelector('#close-help').onclick=()=>help.close();
help.addEventListener('click',e=>{if(e.target===help){const r=help.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)help.close();}});
const reforgeDialog=document.querySelector('#reforge-dialog');let reforgeHero=null;
function requestReforge(){
 if(home||busy||!s.hero||s.battle||s.storyScene)return;
 const cost=reforgePrice(s),points=Object.values(s.hero.allocated).reduce((a,b)=>a+b,0);if(!points)return;
 reforgeHero=adventureId(s);
 document.querySelector('#reforge-description').textContent=`${CLASSES[s.hero.key].name} récupérera ses ${num(points)} points investis. ${cost?`${num(cost)} or seront retirés de sa bourse.`:'Cette reforge est gratuite.'} Les points déjà disponibles restent disponibles. Niveau, équipements et progression sont conservés.`;
 document.querySelector('#confirm-reforge').textContent=cost?'Confirmer · '+num(cost)+' or':'Reforger gratuitement';reforgeDialog.showModal();
}
document.querySelector('#cancel-reforge').onclick=()=>{reforgeHero=null;reforgeDialog.close();};
reforgeDialog.addEventListener('cancel',()=>{reforgeHero=null;});
document.querySelector('#confirm-reforge').onclick=()=>{
 if(busy||home||adventureId(s)!==reforgeHero)return;
 try{const outcome=reforgeStats(s);reforgeHero=null;allocationDraft=emptyAllocation();save();reforgeDialog.close();render();toast(`${num(outcome.refunded)} points rendus${outcome.cost?' · −'+num(outcome.cost)+' or':''}. Répartissez-les à nouveau !`);}catch(e){toast(e.message);}
};
const resetDialog=document.querySelector('#reset-dialog');
document.querySelector('#reset').onclick=()=>{if(home||!s.hero)return;if(busy){toast('Attendez la fin de l’action avant de recommencer.');return;}document.querySelector('#reset-description').textContent=`Cette action efface uniquement l’aventure de ${CLASSES[s.hero.key].name} (n° ${adventureNumber(s)}) : ses niveaux, son or, ses objets et ses missions. Les autres aventures sont conservées. Cette suppression est définitive.`;resetDialog.showModal();};
document.querySelector('#cancel-reset').onclick=()=>{resetDialog.close();render();};
resetDialog.addEventListener('cancel',()=>setTimeout(()=>render(),0));
document.querySelector('#confirm-reset').onclick=()=>{
 if(busy||home||!s.hero)return;
 syncProfile(s,companions);const key=adventureId(s),next=fresh(),remaining={...companions};next.profile=s.profile;delete remaining[key];
 try{if(saveBlocked)throw Error();localStorage.setItem(SAVE,JSON.stringify(packCompanionSave(next,remaining)));}catch{toast('Impossible de réinitialiser la sauvegarde dans ce navigateur.');return;}
 companions=remaining;s=next;newAdventureMode=false;home=true;result=null;allocationDraft=emptyAllocation();tab='world';selectedHero=null;resetDialog.close();render();toast('Aventure réinitialisée. Les autres aventures sont conservées.');
};

if(document.modelContext?.registerTool){try{Promise.resolve(document.modelContext.registerTool({name:'read_adventure_state',title:'Lire la progression',description:'Consulter le compagnon, sa progression, son équipement et le combat en cours.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true},execute:input=>{if(!input||typeof input!=='object'||Object.keys(input).length)throw Error('Aucun paramètre attendu.');return structuredClone(s);}})).catch(()=>{});}catch{}}
render();

function nahatIntentPanel(b){const d=nahatIntent(b);return d?`<aside class="drunn-intent nahat-intent" aria-live="polite"><span>${b.stage===2?'TRAVERSÉE DES BOIS':'DUEL DE L’ÉPINE'}</span><strong>${d.title}</strong><p>${d.text}</p></aside>`:'';}
function drunnIntentPanel(b){const d=drunnIntent(b);return d?`<aside class="drunn-intent" aria-live="polite"><span>PROCHAINE ACTION</span><strong>${d.title}</strong><p>${d.text}</p></aside>`:'';}

// Compact combat controls. The engine remains the single source for readiness and effects.
function combatActionReady(id){const b=s.battle;if(!b||busy||b.openingPending||b.astralOpening)return false;if(id==='attack')return !actionAlreadyUsed(s,id);if(id==='end-turn')return majesticBracelet(s)&&!!b.usedActions?.length;if(id==='potion'&&b.mode==='trial')return false;
 if(id==='potion')return !b.sealedMagic&&!b.unhealable&&potionCount(s)>0&&b.hp<b.maxHp;return skillReady(s,id);}
function combatActionInfo(id){
 if(id==='end-turn')return {name:'Terminer le tour',text:'Renonce à la seconde action du bracelet. Les ennemis jouent ensuite.',label:'Seconde action facultative'};
 if(id==='potion'&&s.battle?.mode==='trial')return {name:'Potion de soin',text:'Les potions sont interdites pendant les épreuves de la Traversée magique.',label:'Interdite dans cette épreuve'};
 if(id==='attack')return {name:'Attaque de base',text:`${basicDamageRange(s).map(num).join(' à ')} dégâts. ${lastBreathReady(s)?'Deux critiques garantis par Dernier souffle.':pct(combatStats(s).crit)+' de chance critique et '+pct(combatStats(s).double)+' de double action.'} Jet indépendant de −3 à +3 dégâts par frappe (minimum 1), puis critique ×1,75.${majesticBracelet(s)?' Bracelet majestueux : dégâts de base réduits de 50 %, réduction comprise dans cet aperçu.':''}`,label:actionAlreadyUsed(s,id)?'Déjà choisie ce tour':'Attaque de base'};
 if(id==='potion')return {name:'Potion de soin',text:`Rend ${potionHealPercent(s)} % des PV max, sans consommer votre action.${potionHealPercent(s)===15?' Prépare +40 % de dégâts sur votre prochaine action offensive ; une autre action annule ce bonus.':''} Une potion est retirée du sac.`,label:s.battle.sealedMagic?'Objets indisponibles dans ce combat':s.battle.unhealable?'Insoignable : aucun soin possible':!potionCount(s)?'Aucune potion dans le sac':s.battle.hp>=s.battle.maxHp?'PV au maximum':potionCount(s)+' potion(s) disponible(s)'};
 return {name:SKILLS[id].name,text:skillText(s,id),label:actionAlreadyUsed(s,id)?'Déjà choisie ce tour':skillLabel(id)};
}
function combatBadge(id){if(id==='attack')return '';if(id==='soin')return (s.battle.healCharges??2)+'/2';if(id==='potion')return '×'+potionCount(s);if(SKILLS[id].automatic)return 'P';const b=s.battle,wait=Math.max(0,(b.cooldowns[id]??0)-b.round);return wait>0?String(wait):skillReady(s,id)?'':'—';}
function combatActionIcon(id){return id==='attack'?'<span class="basic-action-icon" aria-hidden="true">⚔</span>':id==='potion'?itemArt('potion-soin'):abilityIcon(id);}
function combatToolbar(skills){
 const icon=id=>{const d=combatActionInfo(id),ready=combatActionReady(id),automatic=SKILLS[id]?.automatic,badge=combatBadge(id);return `<div class="combat-slot ${automatic?'automatic-skill':''}"><button class="action combat-icon ${ready?'is-ready':'is-unavailable'}" data-action="${id==='attack'||id==='potion'?id:'skill'}" ${SKILLS[id]?`data-skill="${id}"`:''} aria-disabled="${!ready}" aria-label="${attr(d.name+' · '+d.label)}" aria-describedby="combat-tip-${id}" ${s.battle.openingPending?'disabled':''}>${combatActionIcon(id)}<svg class="combat-hover-progress" viewBox="0 0 24 24" aria-hidden="true"><circle class="hover-track" cx="12" cy="12" r="9"/><circle class="hover-fill" cx="12" cy="12" r="9" pathLength="100"/></svg>${badge?`<span class="combat-badge" aria-hidden="true">${badge}</span>`:''}<span class="visually-hidden">${d.name}</span></button><div class="combat-skill-tooltip" id="combat-tip-${id}" role="tooltip"><strong>${d.name}</strong><span class="combat-tip-status">${d.label}</span><p>${d.text}</p></div></div>`;};
 const count=potionCount(s),bagLabel=combatBagOpen?'Revenir aux compétences':'Ouvrir la sacoche';
 const content=combatBagOpen?(count?icon('potion'):'<p class="combat-bag-empty">Aucun objet utilisable en combat dans votre sac.</p>'):icon('attack')+skills.map(d=>icon(d.id)).join('');
 return `<section class="combat-toolbar" aria-label="Actions de combat"><div class="combat-toolbar-row"><div class="actions compact-actions" id="combat-action-panel" role="group" aria-label="${combatBagOpen?'Objets de combat':'Compétences'}">${content}</div><button class="combat-bag-toggle ${combatBagOpen?'is-open':''}" data-action="combat-bag" aria-label="${bagLabel}" aria-expanded="${combatBagOpen}" aria-controls="combat-action-panel" title="${bagLabel}" ${busy||s.battle.openingPending?'disabled':''}><span class="combat-bag-symbol" aria-hidden="true">🎒</span><span>${combatBagOpen?'Retour':'Objets'}</span>${count?`<span class="combat-bag-count" aria-hidden="true">${count}</span>`:''}</button></div>${majesticBracelet(s)?`<div class="majestic-actions"><span>Bracelet · Action ${(s.battle.usedActions?.length??0)+1} / 2 · Deux actions différentes</span>${s.battle.usedActions?.length?'<button data-action="end-turn" '+(busy?'disabled':'')+'>Terminer le tour</button>':''}</div>`:''}<p class="combat-controls-hint">${combatBagOpen?'Sac de '+CLASSES[s.hero.key].name+' · Cliquez à nouveau sur la sacoche pour retrouver vos compétences.':'<span class="desktop-hint">Gardez le curseur 2 secondes sur une icône pour lire son effet.</span><span class="touch-hint">Touchez une icône pour voir son effet et lancer l’action.</span>'}</p></section>`;
}
function isTouchActivation(e){return ['touch','pen'].includes(e.pointerType)||!e.pointerType&&!!globalThis.matchMedia?.('(hover: none)').matches;}
function hideCombatTips(){clearTimeout(combatTipTimer);combatTipTimer=null;combatTipSlot?.classList.remove('tip-waiting');combatTipSlot=null;for(const tip of app.querySelectorAll?.('.combat-skill-tooltip')??[])tip.classList.remove('tip-open');}
function showCombatTip(slot){
 if(!slot||!s.battle)return;hideCombatTips();const tip=slot.querySelector('.combat-skill-tooltip');if(!tip)return;tip.classList.add('tip-open');
 const r=slot.getBoundingClientRect(),w=globalThis.innerWidth??1024,h=globalThis.innerHeight??768,box=tip.getBoundingClientRect();tip.style.left=Math.max(12,Math.min(w-box.width-12,r.left+r.width/2-box.width/2))+'px';tip.style.top=Math.max(12,Math.min(h-box.height-12,r.top-box.height-10))+'px';
}
function scheduleCombatTip(slot){if(!slot||!s.battle)return;if(combatTipSlot===slot)return;hideCombatTips();combatTipSlot=slot;slot.classList.add('tip-waiting');combatTipTimer=setTimeout(()=>{if(combatTipSlot===slot&&s.battle)showCombatTip(slot);},2000);}
app.addEventListener('focusin',e=>scheduleCombatTip(e.target.closest?.('.combat-slot')));
app.addEventListener('focusout',e=>{const slot=e.target.closest?.('.combat-slot');if(slot&&!slot.contains(e.relatedTarget))hideCombatTips();});
const combatDialog=document.querySelector('#combat-skill-dialog');
function openCombatInspection(id){
 if(!s.battle||busy||s.battle.openingPending||SKILLS[id]&&!skillUnlocked(s,id))return;hideCombatTips();const d=combatActionInfo(id);combatInspection={id,key:adventureId(s),battle:s.battle.id,round:s.battle.round};
 document.querySelector('#combat-skill-title').textContent=d.name;document.querySelector('#combat-skill-content').innerHTML=`<div class="combat-inspection-icon">${combatActionIcon(id)}</div><p class="combat-tip-status">${d.label}</p><p>${d.text}</p>`;
 const launch=document.querySelector('#combat-skill-launch');launch.disabled=!combatActionReady(id);launch.textContent=SKILLS[id]?.automatic?'Compétence passive':id==='potion'?'Utiliser la potion':id==='attack'?'Attaquer':'Lancer la compétence';combatDialog.showModal();
}
document.querySelector('#combat-skill-close').onclick=()=>{combatInspection=null;combatDialog.close();};
combatDialog.oncancel=()=>{combatInspection=null;};
document.querySelector('#combat-skill-launch').onclick=async()=>{const c=combatInspection;if(!c||c.key!==adventureId(s)||c.battle!==s.battle?.id||c.round!==s.battle?.round||!combatActionReady(c.id))return;combatInspection=null;combatDialog.close();await action(c.id);};
// Native details provide mouse, keyboard and touch category controls.
app.addEventListener('toggle',e=>{const slot=e.target.dataset?.inventoryCategory;if(slot&&s.hero)inventoryExpanded.set(s.hero.key+':'+slot,e.target.open);},true);
const itemDialog=document.querySelector('#inventory-item-dialog');
function closeInventoryItem(){const id=selectedInventoryItem?.id;selectedInventoryItem=null;itemDialog.close();if(id)app.querySelector?.(`[data-action="item-detail"][data-id="${id}"]`)?.focus?.();}
function openInventoryItem(id){
 if(home||busy||s.battle||s.storyScene)return;const i=s.items.find(i=>i.id===id);if(!i)return;selectedInventoryItem={key:adventureId(s),id};const d=ITEMS[i.type],eq=Object.values(s.equipped).includes(id);document.querySelector('#inventory-item-title').textContent=itemName(i);
 document.querySelector('#inventory-item-content').innerHTML=`<article class="inventory-item-detail${rarityClass(i)}"><div class="inventory-detail-art">${itemArt(i.type)}</div><div>${d.consumable?'<span class="rarity-label">Consommable</span>':rarityBadge(i)}<p class="small muted">${eq?'Équipé par ':'Dans le sac de '}${CLASSES[s.hero.key].name}${itemLevelLabel(i.type)}</p><div class="item-stats">${d.consumable?'Rend 20 % des PV max en combat, sans consommer votre action.':stellarStats(i)}</div>${starsRow(i)}${itemPassiveText(i)?`<p class="equipment-passive">${itemPassiveText(i)}</p>`:''}${i.legacyRoll?'<p class="small muted">Anciennes valeurs conservées.</p>':''}</div></article>`;
 const essence=document.querySelector('#inventory-item-essence');essence.hidden=i.type!=='grimoire-dore'||s.hero.key!=='stibili';essence.disabled=!!s.essences?.foudroiement;essence.textContent=s.essences?.foudroiement?'Essence déjà apprise':'Extraire l’essence · 0 or';
 const wear=document.querySelector('#inventory-item-equip'),sellButton=document.querySelector('#inventory-item-sell');wear.hidden=!!d.consumable;wear.textContent=eq?'Retirer':d.slot==='accessory'?'Équiper · Accessoire 1':'Équiper';const second=document.querySelector('#inventory-item-equip-second');second.hidden=d.slot!=='accessory'||eq;second.textContent='Équiper · Accessoire 2';sellButton.hidden=!resalePrice(i);sellButton.textContent='Vendre · '+resalePrice(i)+' or';document.querySelector('#inventory-item-note').textContent=d.consumable?'Utilisable depuis la barre d’actions pendant un combat.':resalePrice(i)?'La vente demandera une confirmation.':'Récompense unique · non vendable.';if(!itemDialog.open)itemDialog.showModal();
}
document.querySelector('#inventory-item-close').onclick=closeInventoryItem;
itemDialog.oncancel=()=>{selectedInventoryItem=null;};
document.querySelector('#inventory-item-equip').onclick=()=>{const c=selectedInventoryItem;if(!c||c.key!==adventureId(s)||home||s.battle||s.storyScene||busy)return;try{equip(s,c.id,ITEMS[s.items.find(i=>i.id===c.id)?.type]?.slot==='accessory'?'accessory':null);save();render();openInventoryItem(c.id);}catch(e){toast(e.message);}};
document.querySelector('#inventory-item-equip-second').onclick=()=>{const c=selectedInventoryItem;if(!c||c.key!==adventureId(s)||home||s.battle||s.storyScene||busy)return;try{equip(s,c.id,'accessory2');save();render();openInventoryItem(c.id);}catch(e){toast(e.message);}};
document.querySelector('#inventory-item-sell').onclick=()=>{const c=selectedInventoryItem;if(!c||c.key!==adventureId(s)||home||s.battle||s.storyScene||busy)return;itemDialog.close();requestSale(c.id);};


function trialsScreen(){
 const claimed=s.trials?.claimed;
 return `<section class="traversal"><div class="section-head"><div><div class="eyebrow">QUATRE GARDIENS · UN CHOIX</div><h2>Traversée magique</h2><p>Défiez un Gardien et remportez son orbe.</p></div></div><p class="trial-reference">Conseillé : niveau 15 · arme en or · Veste d’aventurier.<br>Aucune restriction de niveau ou d’équipement. Les potions sont interdites pendant les épreuves.</p>${claimed?`<div class="trial-complete">${itemArt(TRIALS[claimed].orb)}<div><h3>${TRIALS[claimed].orbName} obtenue</h3><p>Les autres orbes seront déblocables dans de futures mises à jour…</p><button data-action="tab" data-tab="inventory">Voir mon orbe</button></div></div>`:'<p class="trial-choice-note">Une seule orbe par compagnon pour le moment. Seule une victoire valide votre choix : vous pouvez changer de Gardien après une défaite ou un abandon.</p>'}<div class="trial-grid">${Object.entries(TRIALS).map(([key,d])=>`<article class="trial-card ${claimed&&claimed!==key?'trial-locked':''}" style="--guardian-color:${d.color}"><div class="trial-art">${art('guardian-'+key)}${itemArt(d.orb)}</div><h3>${d.name}</h3><p class="trial-orb-name">${d.orbName}</p><details><summary>Effet de l’orbe et contrepartie</summary><p>${d.effect}</p><p>Orbe unique, sans rareté, non revendable. Occupe l’emplacement Orbe.</p></details><details><summary>Compétences du Gardien</summary><p>${d.rule}</p></details>${!claimed?`<button data-action="trial-select" data-kind="${key}" class="${trialSelected===key?'primary':''}">${trialSelected===key?'Gardien sélectionné':'Choisir ce Gardien'}</button>${trialSelected===key?`<div class="trial-confirm"><p>En cas de victoire, vous obtiendrez <b>${d.orbName}</b>. Les trois autres orbes resteront verrouillées pour ce compagnon.</p><button class="primary" data-action="trial-fight" data-kind="${key}">Affronter ce Gardien</button></div>`:''}`:`<span class="trial-state">${claimed===key?'✓ Épreuve accomplie':'Prochaine mise à jour'}</span>`}</article>`).join('')}</div></section>`;
}
function trialIntentPanel(b){if(b.mode!=='trial')return '';const e=b.enemies[0];return `<section class="rift-intentions"><h3>Prochaine action du Gardien</h3><article><b>${trialIntent(e)}</b><p>${e.charging?`Armure : ${Math.min(e.chargeDamage,Math.ceil(e.maxHp*.15))} / ${Math.ceil(e.maxHp*.15)} dégâts pour affaiblir l’impact.`:e.parry?'Parade active : première frappe directe réduite de 50 %.':''}</p><details><summary>Règles de l’épreuve</summary><p>${TRIALS[b.stage].rule}</p></details></article></section>`;}

document.querySelector('#inventory-item-essence').onclick=()=>{const c=selectedInventoryItem;if(!c||c.key!==adventureId(s)||busy||home||s.battle||s.storyScene)return;itemDialog.close();requestEssence(c.id);};


function combatNameplate(c){
 const o=titleOrnament(equippedTitle(s));return `<div class="name combat-nameplate${o?' nameplate-'+o.id:''}"${o?` data-combat-ornament="${o.id}"`:''}>${o?heroOrnament(o):''}<span class="combat-name-text">${c.name} · Niv. ${s.hero.level}</span></div>`;
}
function heroOrnament(o){
 const regalia=titleOrnamentMarkup(o);if(regalia)return regalia;
 if(o.id==='liquid')return `<div class="hero-ornament liquid-ornament" aria-hidden="true" style="--liquid-phase:-${(Date.now()%12000)/1000}s"><span class="liquid-flow"></span><span class="liquid-violet"></span><span class="liquid-glow"></span><span class="liquid-overflow"></span><svg class="liquid-lightning" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false"><g class="liquid-arcs"><path vector-effect="non-scaling-stroke" d="M3 32 L0 25 L5 22 L1 16 L7 12 L4 5 L16 3 L21 0 L27 4 L34 1 M68 3 L74 0 L79 5 L86 2 L93 6 L96 13 L100 18 L95 23 L99 29 L96 37 M97 63 L100 70 L95 75 L99 82 L94 87 L96 94 L87 96 L82 100 L76 96 L68 99 M33 97 L27 100 L22 95 L14 98 L8 94 L5 87 L0 82 L5 76 L1 69 L4 62"/><path class="arc-branches" vector-effect="non-scaling-stroke" d="M5 22 L9 24 L6 29 M7 12 L12 10 L15 13 M21 0 L23 7 L28 9 M93 6 L88 10 L90 15 M95 23 L91 20 L87 23 M95 75 L89 72 L90 68 M94 87 L87 88 L84 84 M82 100 L79 92 L74 90 M22 95 L25 90 L20 86 M8 94 L12 87 L10 83 M5 76 L10 73 L8 67"/></g></svg></div>`;
 if(o.id==='universe'){
  const corner='<svg viewBox="0 0 60 60" focusable="false"><path class="sovereign-metal" d="M5 54V16L16 5H54L45 11H20L11 20V45Z"/><path class="sovereign-filigree" d="M16 48V24L24 16H48M2 32L8 26M32 2L26 8"/><path class="sovereign-gem" d="M16 9L23 16L16 23L9 16Z"/><path class="sovereign-filigree" d="M16 2V7M2 16H7M25 16H30M16 25V30"/></svg>';
  return `<div class="hero-ornament universe-ornament sovereign-ornament" aria-hidden="true"><span class="sovereign-rim"></span><span class="sovereign-current"></span><span class="sovereign-corner corner-nw">${corner}</span><span class="sovereign-corner corner-ne">${corner}</span><span class="sovereign-corner corner-se">${corner}</span><span class="sovereign-corner corner-sw">${corner}</span><span class="sovereign-crown"><span class="sovereign-orbit"><i></i><i></i></span><svg viewBox="0 0 120 76" focusable="false"><path class="sovereign-metal" d="M19 35L39 44L31 22L51 37L60 13L69 37L89 22L81 44L101 35L91 59H29Z"/><path class="sovereign-filigree" d="M29 62H91M35 67H85M21 46L11 40M99 46L109 40M42 54L60 45L78 54"/><path class="sovereign-core" d="M60 1L64 10L75 13L64 17L60 28L56 17L45 13L56 10Z"/><path class="sovereign-gem" d="M60 41L67 49L60 57L53 49Z"/></svg></span><span class="sovereign-seal">✧</span><span class="sovereign-particles"><i></i><i></i><i></i><i></i><i></i><i></i></span><span class="universe-meteors"><i></i><i></i><i></i></span></div>`;
 }
 return `<div class="hero-ornament ${o.animated?'ornament-living':''} ${o.id==='neantin'?'neantin-quake':''}" aria-hidden="true" style="--ornament-frame:url('assets/ornaments/${o.frame}.webp');--title-phase:${ornamentPhase(12)};--eye-phase:${ornamentPhase(3)}">${voidOrnamentOverlay(o)}<span class="ornament-frame"></span>${o.void?`<span class="ornament-eye ${o.animated?'eye-awake':'eye-closed'}"><img class="eye-open-img" src="assets/ornaments/void-eye.webp" alt="" draggable="false" decoding="async"><img class="eye-shut-img" src="assets/ornaments/void-eye-closed.webp" alt="" draggable="false" decoding="async"></span>`:''}${o.animated&&o.void?'<img class="ornament-tendril tendril-left" src="assets/ornaments/void-tendril.webp" alt="" draggable="false" decoding="async"><img class="ornament-tendril tendril-right" src="assets/ornaments/void-tendril.webp" alt="" draggable="false" decoding="async">':''}${o.id==='neantin'?'<span class="ornament-aura"></span><span class="ornament-sparks"><i></i><i></i><i></i><i></i></span>':''}</div>`;
}
function titleBadge(state){const title=equippedTitle(state);return title?`<span style="--liquid-phase:-${(Date.now()%12000)/1000}s" class="companion-title ${titleTextClass(title)}">✧ ${title} ✧</span>`:'';}
function renderAchievements(){
 if(!s.hero)return;const rows=getAchievements(s),claimed=rows.filter(d=>d.claimed).length,ready=rows.filter(d=>d.ready&&!d.claimed).length,titles=unlockedTitles(s),blocked=!!(s.battle||s.storyScene),key=adventureId(s);
 const groups={loot:'Butins des monstres',wins:'Combats',goldBought:'Équipement en or',spent:'Boutique',rift:'Fissure du Néant',crafted:'Atelier',level:'Progression',chapter:'Histoire',astralWeapons:'Armes Astral',astralArmors:'Armures Astral',astralStars:'Forge Cosmique',astralPair:'Maîtrise Astral'};
 const reward=d=>[d.reward.level?'+1 niveau complet':d.reward.xp?`+${num(d.reward.xp)} EXP`:'',d.reward.gold?`+${num(d.reward.gold)} or`:'',d.reward.title?`<span class="${titleTextClass(d.reward.title)}">Titre « ${d.reward.title} »</span>`:''].filter(Boolean).join(' · ');
 document.querySelector('#achievements-title').textContent='Succès de '+CLASSES[s.hero.key].name+' · aventure n° '+adventureNumber(s);
 document.querySelector('#achievements-content').innerHTML=`<div class="success-overview"><strong>${claimed}<small> / ${rows.length} récupérés</small></strong><span>${ready?ready+' récompense'+(ready>1?'s':'')+' à récupérer':'Vos prochains exploits vous attendent'}</span></div>${blocked?'<p class="lesson-note">Progression à jour. Revenez au camp pour récupérer vos récompenses après le combat ou le récit.</p>':''}${s.hero.level>=MAX_LEVEL?'<p class="small muted">Niveau 50 atteint : les récompenses en EXP ou en niveau ne dépassent pas ce maximum. L’or et les titres restent disponibles.</p>':''}<div class="success-groups">${Object.entries({ready:'À récupérer',...groups}).filter(([metric])=>metric!=='ready'||ready>0).map(([metric,label])=>`<section><h3>${label}</h3>${rows.filter(d=>metric==='ready'?d.ready&&!d.claimed:(metric==='loot'?d.metric.startsWith('loot:'):d.metric===metric)&&(!d.ready||d.claimed)).map(d=>`<article class="success-row ${d.claimed?'claimed':d.ready?'ready':''}"><div class="success-details"><div class="success-row-heading"><h4>${d.name}</h4><span>${num(d.progress)} / ${num(d.target)}</span></div><p>${d.description}</p><progress value="${d.progress}" max="${d.target}" aria-label="${d.name}"></progress><div class="success-reward">${reward(d)}</div></div><button class="success-claim" data-success-action="claim" data-key="${key}" data-id="${d.id}" ${!d.ready||d.claimed||blocked?'disabled':''} aria-label="${d.claimed?'Récompense déjà récupérée':!d.ready?'Succès en cours':blocked?'Récompense à récupérer au camp':'Récupérer la récompense de '+d.name}"><span aria-hidden="true">${d.claimed?'✓':d.ready?'✦':'◇'}</span><small>${d.claimed?'Récupéré':d.ready?'Récupérer':'En cours'}</small></button></article>`).join('')}</section>`).join('')}</div><section class="success-titles"><h3>Mon titre</h3><p>Affiché sous votre nom, au camp, au combat et à la sélection. Certains titres habillent aussi le panneau du compagnon.</p><div class="title-choices"><button data-success-action="title" data-key="${key}" data-title="" aria-pressed="${!equippedTitle(s)}">Sans titre</button>${titles.map(t=>`<button class="${titleTextClass(t)}" data-success-action="title" data-key="${key}" data-title="${t}" aria-pressed="${equippedTitle(s)===t}"${titleOrnament(t)?` title="${titleOrnament(t).description}"`:''}>${t}</button>`).join('')}</div>${!titles.length?'<p class="small muted">Récupérez une récompense contenant un titre pour le porter.</p>':''}</section><p class="bottom-note">Récompenses uniques par compagnon. Les butins des monstres sont suivis à partir de l’ajout de ces cinq succès : le stock déjà présent ne permet pas de distinguer les achats des butins. Vendre ou crafter ne réduit pas ces compteurs. Niveaux, chapitres et étages déjà terminés sont pris en compte.</p>`;
}
document.querySelector('#achievements-close').onclick=()=>document.querySelector('#achievements-dialog').close();
document.querySelector('#achievements-content').addEventListener('click',e=>{
 const button=e.target.closest('[data-success-action]');if(!button||button.disabled||busy||home||button.dataset.key!==adventureId(s))return;
 const before=structuredClone(s);
 try{
  if(button.dataset.successAction==='title')setCompanionTitle(s,button.dataset.title||null);
  else if(button.dataset.successAction==='claim'){const reward=claimAchievement(s,button.dataset.id);if(!save()){Object.assign(s,before);render();return;}toast('Récompense récupérée !'+(reward.title?' Titre débloqué : '+reward.title+'.':''));if(reward.levels)document.querySelector('#achievements-dialog').close();render();return;}
  else return;
  if(!save())Object.assign(s,before);render();
 }catch(error){toast(error.message);renderAchievements();}
});

function closeForgeNotice(discover=false){if(!s.forge?.announce)return;try{forgeTransaction(()=>{s.forge.announce=false;});document.querySelector('#forge-unlock').close();if(discover){tab='forge';result=null;}render();}catch(e){toast(e.message);}}
document.querySelector('#forge-discover').onclick=()=>closeForgeNotice(true);
document.querySelector('#forge-later').onclick=()=>closeForgeNotice();
document.querySelector('#forge-unlock').addEventListener('cancel',e=>{e.preventDefault();closeForgeNotice();});
document.querySelector('#forge-confirm-no').onclick=()=>{forgeRequest=null;document.querySelector('#forge-confirm').close();};
document.querySelector('#forge-confirm').addEventListener('cancel',()=>{forgeRequest=null;});
document.querySelector('#forge-confirm-yes').onclick=()=>{
 const r=forgeRequest;if(!r||r.owner!==s||r.key!==adventureId(s)||r.id!==s.forge?.itemId||home||busy||s.battle||s.storyScene)return;
 document.querySelector('#forge-confirm').close();forgeRequest=null;
 if(r.kind==='remove'&&r.stage===1){requestForgeConfirmation('remove',null,2);return;}
 try{forgeTransaction(()=>r.kind==='star'?destroyForgeStar(s,r.slot):removeForgeItem(s));render();toast(r.kind==='star'?'Étoile détruite. Les autres étoiles sont conservées.':'Équipement retiré. Ses statistiques natives sont conservées.');}catch(e){toast(e.message);}
};

document.querySelector('#admin-code-form').addEventListener('submit',e=>{
 e.preventDefault();if(home||busy||saveBlocked||!s.hero||s.battle||s.storyScene)return;
 const input=document.querySelector('#admin-code');
 try{const message=forgeTransaction(()=>applyTestCode(s,input.value));input.value='';render();toast(message);document.querySelector('#admin-code-status').textContent=message;}
 catch(error){toast(error.message);document.querySelector('#admin-code-status').textContent=error.message;}
});

return {};
})();
})();
