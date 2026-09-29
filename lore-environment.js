/* Décors vivants. Coordonnées locales sur une grille 1000 × 1000 : aucun mouvement de caméra.
   Canvas 2D sans lecture de pixels, utilisable aussi en ouvrant les pages depuis le disque. */
(() => {
  'use strict';
  const body = document.querySelector('.lore-has-environment');
  const decor = body?.querySelector('.lore-environment');
  const button = body?.querySelector('.lore-decor-toggle');
  if (!decor || !button) return;
  const sources = {rebecca:'images/lore-epine/chemin-sanglant.png',demono:'images/lore-demono/environnement.png',aenoria:'images/lore-aenoria/environnement.png',harmony:'images/lore-harmony/environnement.png'};
  const world = Object.keys(sources).find(k => body.classList.contains(`lore-environment-${k}`));
  if (!world) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'lore-environment-motion'; canvas.setAttribute('aria-hidden','true');
  const ctx = canvas.getContext('2d'); if (!ctx) return;
  decor.append(canvas);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)'), mobile = matchMedia('(max-width: 600px)');
  const image = new Image(), cleanStorm = new Image(), TAU = Math.PI * 2;
  let paused = false, loaded = false, failed = false, away = false, modal = false;
  let frame = 0, last = 0, time = 0, ratio = 1, fit = 1, ox = 0, oy = 0, patches = [], stormLayers = [];
  try {paused = localStorage.getItem('astral-lore-decor-paused') === 'true';} catch (_) { /* Stockage facultatif. */ }
  const frac = v => v - Math.floor(v), rand = v => frac(Math.sin(v * 127.1 + 311.7) * 43758.5453);
  const mix = (a,b,n) => a + (b-a)*n;
  function surface(w,h) {const c=document.createElement('canvas');c.width=Math.ceil(w);c.height=Math.ceil(h);return c;}
  function sprite(rgb) {
    const c=surface(64,64),g=c.getContext('2d'),f=g.createRadialGradient(32,32,0,32,32,32);
    f.addColorStop(0,`rgba(${rgb},1)`);f.addColorStop(.22,`rgba(${rgb},.45)`);f.addColorStop(1,`rgba(${rgb},0)`);
    g.fillStyle=f;g.fillRect(0,0,64,64);return c;
  }
  const mist=sprite('186,195,201'),green=sprite('182,244,79'),ember=sprite('255,172,62'),storm=sprite('182,128,218');
  function glow(s,x,y,w,h,a) {ctx.globalAlpha=a;ctx.drawImage(s,x-w/2,y-h/2,w,h);ctx.globalAlpha=1;}
  function path(g,points,x=0,y=0) {g.beginPath();points.forEach(([px,py],i)=>i?g.lineTo(px-x,py-y):g.moveTo(px-x,py-y));}
  // Le masque souple inclut quelques pixels de bord pour éviter de dédoubler le tissu.
  function patch(r,outline,stroke=0,feather=2) {
    const {x,y,w,h}=r,source=surface(w,h),mask=surface(w,h),output=surface(w,h),m=mask.getContext('2d');
    source.getContext('2d').drawImage(image,x*image.width/1000,y*image.height/1000,w*image.width/1000,h*image.height/1000,0,0,w,h);
    if(outline) {
      m.filter=`blur(${feather}px)`;path(m,outline,x,y);m.lineJoin='round';m.lineCap='round';m.strokeStyle='#fff';
      if(!stroke){m.closePath();m.fillStyle='#fff';m.fill();}
      m.lineWidth=stroke||12;m.stroke();
    } else {
      m.save();m.translate(w*.5,h*.36);m.scale(w*.5,h*.64);
      const f=m.createRadialGradient(0,0,.48,0,0,1);f.addColorStop(0,'#fff');f.addColorStop(1,'transparent');
      m.fillStyle=f;m.fillRect(-1,-1,2,2);m.restore();
    }
    return {...r,source,mask,output,brush:output.getContext('2d')};
  }
  function ripple(p,t,kind,phase=0) {
    const g=p.brush;g.clearRect(0,0,p.w,p.h);
    for(let y=0;y<p.h;y+=3) {
      const n=y/p.h,h=Math.min(4,p.h-y);let dx,dy,stretch=0;
      if(kind==='cloth') {
        const breeze=Math.sin(t*2.05-n*7+phase);dx=breeze*5.5*n;dy=Math.sin(t*1.7-n*5+phase)*n*.8;stretch=breeze*5*n;
      } else if(kind==='water') {
        dx=Math.sin(y*.14-t*7+phase)*.7;dy=Math.sin(y*.08-t*9+phase)*1.6;
      } else {
        const wave=Math.sin(t*1.45-n*5.5+phase);
        dx=wave*(14+18*n);dy=Math.sin(t*1.17-n*6+phase)*7;stretch=Math.sin(t*1.45-n*5.5+phase+1)*12;
      }
      g.drawImage(p.source,0,y,p.w,h,dx,y+dy,p.w+stretch,h);
    }
    g.globalCompositeOperation='destination-in';g.drawImage(p.mask,0,0);g.globalCompositeOperation='source-over';
    ctx.drawImage(p.output,p.x,p.y);
  }
  function rebecca(t) {
    patches.forEach((p,i)=>ripple(p,t,'hair',i*1.7));
    for(let i=0;i<11;i++) {
      const seed=rand(i+20),x=280+seed*435+Math.sin(t*(.07+seed*.055)+i*1.8)*65,y=450+rand(i+50)*325+Math.sin(t*.12+i)*7;
      glow(mist,x,y,220+seed*155,46+seed*55,.065+.03*Math.sin(t*.19+i));
    }
  }
  // Masques de régions, jamais de tracés d'éclairs : les éclairs sont ceux de la photographie originale.
  const stormRegions=[
    [[0,0],[164,0],[195,168],[255,283],[250,544],[231,642],[106,769],[0,758]],
    [[260,97],[405,46],[461,107],[432,180],[386,251],[345,392],[300,413],[268,297]],
    [[683,0],[1000,0],[1000,677],[875,766],[781,616],[732,452],[609,326],[619,219]]
  ];
  function prepareStorm() {
    stormLayers=stormRegions.map(points=>{
      const c=surface(1000,1000),g=c.getContext('2d'),mask=surface(1000,1000),m=mask.getContext('2d');
      m.filter='blur(12px)';path(m,points);m.closePath();m.fillStyle='#fff';m.fill();
      g.drawImage(cleanStorm,0,0,1000,1000);g.globalCompositeOperation='destination-in';g.drawImage(mask,0,0);
      return c;
    });
  }
  function demono(t) {
    stormLayers.forEach((layer,i)=>{
      const period=[3.7,4.9,4.3][i],phase=(t+[.8,2.6,1.9][i])%period;
      // Décharge brève, puis rémanence : retour exact aux pixels de l'image fournie.
      const flash=Math.max(Math.exp(-Math.pow((phase-.95)/.085,2)),.78*Math.exp(-Math.pow((phase-1.22)/.14,2)));
      ctx.globalAlpha=1-flash;ctx.drawImage(layer,0,0);ctx.globalAlpha=1;
    });
  }
  function motes(t,s,count,r,color,speed) {
    for(let i=0;i<count;i++) {
      const seed=rand(i+61),life=frac(t*speed*(.7+seed*.6)+seed),alpha=Math.sin(Math.PI*life)*(.28+seed*.4);
      const x=r.x+rand(i+11)*r.w+Math.sin(t*.45+i*2)*5,y=r.y-life*r.h;
      glow(s,x,y,6+seed*5,8+seed*9,alpha*.55);ctx.fillStyle=`rgba(${color},${alpha*.8})`;
      ctx.beginPath();ctx.ellipse(x,y,.5+seed*.7,1+seed,0,0,TAU);ctx.fill();
    }
  }
  function aenoria(t) {
    ripple(patches[0],t,'cloth');ripple(patches[1],t,'cloth',1.6);
    const breath=.07+.035*Math.sin(t*.85);
    [[471,301,25,80],[480,426,34,100],[496,555,47,90],[342,597,85,50],[611,606,80,50]].forEach(([x,y,w,h],i)=>glow(green,x,y,w,h,breath+.025*Math.sin(t*1.1+i)));
    motes(t,green,21,{x:290,y:779,w:373,h:187},'192,248,104',.085);
  }
  // Chaque ligne suit une chute peinte, y compris les filets secondaires et l'arrière-plan.
  const falls=[
    {points:[[83,176],[83,212],[85,237],[88,244]],width:4,speed:0.56},
    {points:[[88,242],[98,253],[101,291],[105,330],[109,365]],width:11,speed:0.595},
    {points:[[111,260],[119,268],[119,289],[123,307]],width:5,speed:0.63},
    {points:[[131,279],[141,286],[145,310],[151,330]],width:10,speed:0.665},
    {points:[[151,290],[157,303],[163,320]],width:5,speed:0.7},
    {points:[[964,224],[958,235],[954,253]],width:5,speed:0.56},
    {points:[[949,241],[947,269],[947,311],[945,321]],width:5,speed:0.595},
    {points:[[945,321],[937,330],[935,366],[938,398],[938,425]],width:17,speed:0.63},
    {points:[[891,318],[885,330],[883,360],[883,389]],width:7,speed:0.665},
    {points:[[874,337],[875,351],[875,370]],width:4,speed:0.7},
    {points:[[133,591],[126,603],[123,624]],width:5,speed:0.56},
    {points:[[143,592],[145,608],[147,625]],width:4,speed:0.595},
    {points:[[270,591],[274,603],[274,636],[279,660]],width:5,speed:0.63},
    {points:[[282,602],[286,615],[287,641]],width:4,speed:0.665},
    {points:[[325,585],[334,594],[344,607]],width:14,speed:0.7},
    {points:[[343,608],[345,637],[349,687],[350,731],[354,775]],width:24,speed:0.56},
    {points:[[361,612],[371,634],[372,680],[376,720],[379,759]],width:12,speed:0.595},
    {points:[[376,652],[381,674],[383,702],[386,728]],width:5,speed:0.63},
    {points:[[465,740],[470,761],[483,788],[497,801]],width:4,speed:0.665},
    {points:[[543,697],[543,727],[529,752],[536,782]],width:3,speed:0.7},
    {points:[[715,690],[723,696],[725,718]],width:4,speed:0.56},
    {points:[[746,708],[760,714],[771,727]],width:4,speed:0.595},
    {points:[[735,607],[736,638],[736,671],[737,693]],width:5,speed:0.63},
    {points:[[747,610],[750,633],[751,662]],width:4,speed:0.665},
    {points:[[764,618],[766,647],[768,682],[765,708]],width:6,speed:0.7},
    {points:[[800,613],[811,634],[820,667],[824,700],[825,718]],width:28,speed:0.56},
    {points:[[819,626],[831,654],[835,681],[836,705]],width:8,speed:0.595},
    {points:[[874,525],[881,549],[881,590],[881,629],[891,645]],width:19,speed:0.63},
    {points:[[867,524],[866,554],[868,593]],width:5,speed:0.665},
    {points:[[941,525],[944,549],[945,578]],width:4,speed:0.7},
    {points:[[355,860],[364,874],[370,902],[370,945],[371,981]],width:22,speed:0.56},
    {points:[[371,883],[378,913],[379,947],[382,976]],width:8,speed:0.595},
    {points:[[692,819],[691,850],[689,878]],width:4,speed:0.63},
    {points:[[722,827],[721,856],[719,887],[717,919]],width:10,speed:0.665},
    {points:[[762,785],[755,802],[750,817]],width:10,speed:0.7},
    {points:[[753,817],[751,848],[753,882],[754,907],[751,931]],width:26,speed:0.56},
    {points:[[811,800],[806,818],[797,838],[785,876],[780,923]],width:25,speed:0.595},
    {points:[[798,850],[792,879],[790,906]],width:6,speed:0.63},
    {points:[[639,854],[635,874],[628,899]],width:5,speed:0.665},
    {points:[[581,886],[571,900],[565,915]],width:6,speed:0.7}
  ];
  function water(p,t,phase) {
    const g=p.brush;g.clearRect(0,0,p.w,p.h);
    // Deux échantillons de la texture originale glissent vers le bas et se relaient sans saut.
    g.globalCompositeOperation='lighter';
    const travel=22,progress=frac(t*(1.25+phase%3*.15)),passes=[progress,frac(progress+.5)];
    passes.forEach(v=>{
      g.globalAlpha=Math.pow(Math.sin(Math.PI*v),2);
      for(let y=0;y<p.h;y+=2){
        const sy=Math.max(0,Math.min(p.h-3,y-(v-.5)*travel)),dx=Math.sin(y*.1-t*5+phase)*.65;
        g.drawImage(p.source,0,sy,p.w,2,dx,y,p.w,2);
      }
    });
    g.globalAlpha=1;g.globalCompositeOperation='destination-in';g.drawImage(p.mask,0,0);g.globalCompositeOperation='source-over';
    ctx.drawImage(p.output,p.x,p.y);
  }
  function along(points,n) {const pos=Math.min(.99999,Math.max(0,n))*(points.length-1),i=Math.floor(pos),k=pos-i;return[mix(points[i][0],points[i+1][0],k),mix(points[i][1],points[i+1][1],k)];}
  function harmony(t) {
    patches.forEach((p,i)=>water(p,t,i));ctx.lineCap='round';
    falls.forEach((f,j)=>{
      for(let i=0;i<22;i++) {
        const seed=rand(i*7+j*33),start=frac(t*f.speed+seed),length=.07+rand(i+201)*.12,spread=(rand(i+j*37)-.5)*f.width*.68;
        ctx.beginPath();
        for(let k=0;k<=6;k++) {
          const n=Math.min(1,start+k/6*length),[x,y]=along(f.points,n),dx=spread*(.5+n*.55)+Math.sin(n*11+i+t*2)*.5;
          k?ctx.lineTo(x+dx,y):ctx.moveTo(x+dx,y);
        }
        ctx.strokeStyle=`rgba(233,237,231,${Math.sin(Math.PI*start)*(.20+seed*.20)})`;ctx.lineWidth=.6+seed*.9;ctx.stroke();
      }
    });
    glow(ember,503,444,110,154,.08+.026*Math.sin(t*.72));motes(t,ember,23,{x:441,y:461,w:120,h:247},'255,193,106',.085);
    glow(mist,374,758,53,14,.035+.015*Math.sin(t*2));glow(mist,717,930,72,12,.04+.016*Math.sin(t*2.4));
  }
  const paint={rebecca,demono,aenoria,harmony}[world];
  function render(t) {
    ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,canvas.width,canvas.height);
    if(!loaded||reduced.matches)return;
    ctx.setTransform(ratio*fit*image.width/1000,0,0,ratio*fit*image.height/1000,ratio*ox,ratio*oy);paint(t);
  }
  function resize() {
    const w=decor.clientWidth,h=decor.clientHeight;ratio=Math.min(devicePixelRatio||1,1.25,1800/Math.max(w,h));
    canvas.width=Math.max(1,Math.round(w*ratio));canvas.height=Math.max(1,Math.round(h*ratio));
    if(loaded){fit=Math.max(w/image.width,h/image.height);ox=(w-image.width*fit)/2;oy=mobile.matches?(h-image.height*fit)/2:0;}
    render(time);
  }
  const running=()=>loaded&&!paused&&!reduced.matches&&!document.hidden&&!modal&&!away;
  function tick(now) {
    frame=0;if(!running()){last=0;return;}if(!last)last=now;
    const dt=now-last;if(dt>=(mobile.matches?50:1000/24)){time+=Math.min(dt,100)/1000;last=now;render(time);}
    frame=requestAnimationFrame(tick);
  }
  function sync() {
    if(frame)cancelAnimationFrame(frame);frame=0;last=0;
    const stopped=paused||reduced.matches||failed;body.classList.toggle('lore-decor-paused',stopped);
    button.setAttribute('aria-pressed',String(stopped));button.disabled=reduced.matches||failed||!loaded;
    button.textContent=reduced.matches||failed?'Décor fixe':paused?'Animer le décor':'Mettre le décor en pause';
    if(reduced.matches)render(time);if(running())frame=requestAnimationFrame(tick);
  }
  button.addEventListener('click',()=>{paused=!paused;try{localStorage.setItem('astral-lore-decor-paused',String(paused));}catch(_){}sync();});
  reduced.addEventListener('change',()=>{render(time);sync();});window.addEventListener('resize',resize,{passive:true});
  document.addEventListener('visibilitychange',sync);window.addEventListener('pagehide',()=>{away=true;sync();});window.addEventListener('pageshow',()=>{away=false;sync();});
  new MutationObserver(()=>{const next=body.classList.contains('lore-profile-open');if(next!==modal){modal=next;sync();}}).observe(body,{attributes:true,attributeFilter:['class']});
  image.onload=()=>{
    loaded=true;
    if(world==='rebecca')patches=[
      patch({x:550,y:102,w:374,h:399},[[619,137],[711,154],[767,207],[843,235],[805,307],[849,353],[781,379],[804,446],[713,409],[631,351],[599,248]],0,15),
      patch({x:170,y:94,w:299,h:380},[[383,126],[299,162],[263,224],[219,294],[234,356],[197,405],[296,385],[362,311],[409,222]],0,15),
      patch({x:327,y:273,w:359,h:270},[[407,318],[509,337],[590,307],[636,383],[609,433],[568,497],[508,450],[432,482],[389,413]],0,16)
    ];
    if(world==='aenoria')patches=[
      patch({x:191,y:93,w:159,h:384},[[210,112],[278,137],[291,201],[330,417],[306,403],[318,462],[272,379],[247,360],[226,303]]),
      patch({x:685,y:89,w:139,h:380},[[714,120],[802,96],[800,167],[787,236],[769,309],[734,416],[721,444],[735,363],[715,388],[736,282],[738,200]])
    ];
    if(world==='harmony')patches=falls.map(f=>{
      const xs=f.points.map(p=>p[0]),ys=f.points.map(p=>p[1]),x=Math.min(...xs)-f.width,y=Math.min(...ys)-5;
      return patch({x,y,w:Math.max(...xs)-x+f.width,h:Math.max(...ys)-y+6},f.points,f.width*.95);
    });
    if(world==='demono') {
      loaded=false;
      cleanStorm.onload=()=>{prepareStorm();loaded=true;resize();sync();};
      cleanStorm.onerror=()=>{failed=true;sync();};
      cleanStorm.src='images/lore-demono/environnement-sans-eclairs.png';
    }
    resize();sync();
  };
  image.onerror=()=>{failed=true;sync();};resize();sync();button.hidden=false;image.src=sources[world];
})();
