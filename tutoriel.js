(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const steps = AstralTutorial.build();
  const ZONES = {1:[10.5,12.8],2:[45.5,12.8],3:[90.6,14.2],4:[15,49],5:[30.5,49],6:[45.5,40],7:[60,49],8:[75.8,49],9:[93.1,51.4],10:[7.1,84],11:[30.5,84],12:[45.5,84],13:[60,84],14:[93.1,84]};
  const back = 'tutoriel-assets/back.webp';
  let index=0, started=false;
  const current = () => steps[index];
  const source = name => TUTORIAL_CARDS[name]?.src;
  function makeImage(src,alt) {const img=document.createElement('img');img.src=src;img.alt=alt;img.draggable=false;return img;}
  function showCard(name) {
    if(!source(name)) return;
    $('dialog-title').textContent=name;$('dialog-image').src=source(name);$('dialog-image').alt=name;
    if(!$('card-dialog').open)$('card-dialog').showModal();
  }
  function isTarget(n,name,location) {const t=current().target;return t?.player===n && t.name===name && t.location===location;}
  function next(origin) {
    if(current().requireDeck && origin!=='card')return;
    if(index<steps.length-1){index++;render(true);}
  }
  function cardButton(n,c,location) {
    const button=document.createElement('button');button.type='button';
    const target=isTarget(n,c.name,location);
    button.className=(location==='board'?'board-card':'hand-card')+(c.tapped?' tapped':'')+(c.back?' back-card':'')+(target?' target-card':'');
    button.dataset.card=c.back?'hidden':c.name;
    button.setAttribute('aria-label',target?current().action:c.back?'Carte face cachée':'Agrandir '+c.name+(c.tapped?' · inclinée':''));
    button.append(makeImage(c.back?back:source(c.name),c.back?'Dos de carte Astral Cards':c.name));
    if(target)button.addEventListener('click',()=>next('card'));
    else if(!c.back)button.addEventListener('click',()=>showCard(c.name));
    else {button.tabIndex=-1;button.setAttribute('aria-disabled','true');}
    return button;
  }
  function renderBoard(n) {
    const mat=$('mat-'+n),p=current().state.players[n];mat.replaceChildren();
    mat.classList.toggle('attacking',Boolean(current().attack));
    const stacks={...p.zones};if(p.deck)stacks[14]=[{name:'Deck',back:true}];
    for(const [z,cards] of Object.entries(stacks)) {
      if(!cards.length)continue;
      // Seul le sommet est interactif. Un Environnement couvre entièrement le Navigateur.
      const top=cards[cards.length-1],b=cardButton(n,top,'board'),[x,y]=ZONES[z];
      b.style.left=x+'%';b.style.top=y+'%';b.dataset.zone=z;
      if(cards.length>1 && Number(z)!==6) {const badge=document.createElement('span');badge.className='stack-count';badge.textContent=cards.length;badge.setAttribute('aria-label',cards.length+' cartes dans la pile');b.append(badge);}
      mat.append(b);
    }
  }
  function renderStatus(n) {
    const s=current().state,p=s.players[n],el=$('status-'+n);
    el.classList.toggle('active-status',s.active===n && s.turn>0);
    el.innerHTML='<strong></strong><div class="resources"><span class="energy"></span><span class="star-count"></span><span class="action-count"></span></div>';
    el.querySelector('strong').textContent=n===1?'Vous · Joueur 1':'Joueur 2';
    el.querySelector('.energy').textContent='Energy '+p.energy+' / '+p.max;
    el.querySelector('.star-count').textContent='✦ '+p.stars+' / 12';
    el.querySelector('.action-count').textContent=p.actions+' / 2 actions';
  }
  function render(focus=false) {
    const st=current(),s=st.state;
    [1,2].forEach(n=>{renderBoard(n);renderStatus(n);});
    $('hand').replaceChildren(...s.players[1].hand.map(name=>cardButton(1,{name},'hand')));
    $('step-counter').textContent=(index+1)+' / '+steps.length;
    $('tutorial-progress').max=steps.length-1;$('tutorial-progress').value=index;
    $('turn-label').textContent=s.turn?'Tour '+s.turn+' · '+(s.active===1?'À vous':'Joueur 2'):'Préparation';
    $('phase-label').textContent=s.phase;
    $('step-kind').textContent=st.complete?'Chapitre accompli':st.target?'À vous de jouer':s.active===2&&s.turn?'Observez et avancez à votre rythme':'Pas à pas';
    $('step-title').textContent=st.title;$('step-text').textContent=st.text;
    $('focus-wrap').hidden=!st.focus;
    if(st.focus){$('focus-image').src=source(st.focus);$('focus-image').alt=st.focus;$('focus-card').setAttribute('aria-label','Agrandir '+st.focus);}
    $('stat-legend').hidden=!st.stats;
    $('revealed-cards').hidden=!st.reveal;
    $('revealed-cards').replaceChildren(...s.revealed.map(name=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Agrandir '+name);b.append(makeImage(source(name),name));const label=document.createElement('span');label.textContent=name;b.append(label);b.onclick=()=>showCard(name);return b;}));
    $('previous-step').disabled=index===0;
    $('next-step').disabled=Boolean(st.requireDeck);
    $('next-step').textContent=st.complete?'Retour aux chapitres':st.requireDeck?'Cliquez sur votre Deck':st.target?st.action:st.next||'Suivant';
    $('action-hint').hidden=!st.target;
    $('action-hint').textContent=st.requireDeck?'Cliquez sur votre Deck illuminé pour piocher.':'La carte à jouer est illuminée.';
    $('restart-tutorial').hidden=!st.complete;$('chapter-two').hidden=!st.complete;
    document.querySelector('.guide-scroll').scrollTop=0;
    if(focus)$('step-title').focus({preventScroll:true});
    requestAnimationFrame(fitTable);
  }
  function fitTable() {
    if(!started)return;
    const box=$('table-fit');const width=Math.max(0,Math.min(box.clientWidth,(box.clientHeight-11)*8/9));
    $('table-stack').style.width=width+'px';
  }
  function start() {index=0;started=true;$('tutorial-start').hidden=true;$('tutorial-game').hidden=false;render(true);window.scrollTo({top:0});}
  function exit() {if(document.fullscreenElement)document.exitFullscreen?.();started=false;$('tutorial-game').hidden=true;$('tutorial-start').hidden=false;$('start-tutorial').focus();}
  $('start-tutorial').onclick=start;$('restart-tutorial').onclick=start;$('exit-tutorial').onclick=exit;
  $('next-step').onclick=()=>current().complete?exit():next();
  $('previous-step').onclick=()=>{if(index>0){index--;render(true);}};
  $('focus-card').onclick=()=>showCard(current().focus);
  $('close-card').onclick=()=>$('card-dialog').close();
  $('card-dialog').addEventListener('click',event=>{if(event.target===$('card-dialog')){const r=event.target.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)event.target.close();}});
  $('fullscreen').hidden=!document.fullscreenEnabled;
  $('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await $('tutorial-game').requestFullscreen();}catch{ $('fullscreen').hidden=true;}};
  document.addEventListener('fullscreenchange',()=>{$('fullscreen').textContent=document.fullscreenElement?'Réduire':'Plein écran';fitTable();});
  new ResizeObserver(fitTable).observe($('table-fit'));
  new ResizeObserver(entries=>{
    document.documentElement.style.setProperty('--tutorial-header-height',entries[0].target.getBoundingClientRect().height+'px');
    fitTable();
  }).observe(document.querySelector('.site-header'));
  window.addEventListener('resize',fitTable);
})();
