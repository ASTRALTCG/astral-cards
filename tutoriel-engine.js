/* Chapitre scripté : chaque état attend un clic. Aucun minuteur ne fait avancer le récit. */
(function (root) {
  'use strict';
  const C = {
    gecko:'Geckoto', hole:'Sous les profondeurs', falco:'Falco', sea:'Cruauté des mers',
    dragon:'Dragon brumeux', cyclone:'Le cyclone', storm:'Démon des tempêtes', eye:"L'oeil protecteur",
    hand:'La grande main', rox:'Roxxor', nav:'Zvatas forme 1', env:'Cataclysme des nuages',
    pillage:'Pillage bénéfique', urkan:'Urkan', vairon:'Vairon', sovereign:'Vairon souverrain',
    assimilation:'Assimilation des Energies', env2:'Le domaine sauvage', larva:'La larve', wolf:"Wollfy de l'épée", swordEye:"L'oeil de l'épée", light:'La lumière après les nuages', dompteur:'Dompteur', elphoros:'Elphoros', small:'Du plus petit au plus monstrueux', rakesh:"Ra'Kesh", immunity:"L'immunité bestiale", tryhydre:'Tryhydre'
  };
  const clone = value => JSON.parse(JSON.stringify(value));
  const player = () => ({energy:0,max:0,stars:0,actions:0,hand:[],zones:{},deck:false});
  function buildChapter1() {
    let state = {turn:0,active:1,phase:'Découverte',players:{1:player(),2:player()},revealed:[]};
    const steps=[];
    const p = n => state.players[n];
    function put(n,z,name,options={}) { (p(n).zones[z] ||= []).push({name,back:false,tapped:false,...options}); }
    function remove(n,name) {
      const h=p(n).hand.indexOf(name); if(h>=0) p(n).hand.splice(h,1);
      for(const z of Object.values(p(n).zones)) {const i=z.findIndex(c=>c.name===name);if(i>=0)z.splice(i,1);}
    }
    function move(n,name,z,options={}) {remove(n,name);put(n,z,name,options);}
    function draw(n,names) {p(n).hand.push(...names);}
    function turn(n,t,phase='Energy') {state.active=n;state.turn=t;state.phase=phase;p(n).max=t;p(n).energy=t;p(n).actions=0;}
    function step(title,text,opts={},change) {if(change)change();steps.push({title,text,...opts,state:clone(state)});}
    step('Bienvenue dans Astral Cards', 'Il existe mille et une façons de jouer. Dans ce premier chapitre, vous allez découvrir les bases en incarnant le Joueur 1, avec les Démononuageux. Les Bêtes Guerriers vous feront face. Avancez à votre rythme avec « Suivant ».');
    step('Votre Navigateur, votre stratégie', 'Votre Navigateur donne une direction à votre stratégie. Les Sbires le soutiennent au combat, avec l’aide des cartes Pouvoirs, Cosmiques, Spéciales et de l’Environnement.', {focus:C.nav});
    step('Deux chemins vers la victoire', 'Réduisez les PV du Navigateur adverse à zéro, ou accumulez 12 étoiles. Pour jouer vos Sbires, vous dépensez de l’Energy, une ressource comparable à de la mana.');
    step('Installez votre Deck', 'Votre Deck se place en bas à droite de votre tapis. Votre Main apparaîtra juste sous le Terrain. Le tapis adverse est tourné de 180°, comme si l’autre joueur était assis face à vous.', {},()=>{state.phase='Installation';p(1).deck=true;});
    step('Un Navigateur encore caché', 'Placez votre Navigateur au centre. Recouvrez-le avec votre carte Environnement, face cachée. Le Navigateur sera révélé plus tard ; à ce moment-là, l’Environnement rejoindra son emplacement en haut du tapis.', {},()=>{put(1,6,C.nav);put(1,6,C.env,{back:true});});
    step('Vos cartes Cosmiques', 'Mini soleil, Cobra gigantesque, Tryhydre et Au-delà des nuages attendent face cachée dans l’emplacement au cristal, en bas à gauche.', {},()=>['Mini soleil','Cobra gigantesque','Tryhydre','Au delà des nuages'].forEach(n=>put(1,10,n,{back:true})));
    step('Vos cartes Spéciales', 'La larve, Wollfy de l’épée et L’œil de l’épée se placent face cachée dans l’emplacement à l’étoile, en haut à gauche. Elles sont tournées de 90° pour suivre l’orientation de cette zone.', {},()=>['La larve',"Wollfy de l'épée","L'oeil de l'épée"].forEach(n=>put(1,1,n,{back:true,tapped:true})));
    step('Le Terrain adverse', 'Le Joueur 2 installe également son Deck et son Navigateur, recouvert par son Environnement face cachée.', {},()=>{p(2).deck=true;put(2,6,'Navigateur adverse',{back:true});put(2,6,C.env2,{back:true});});
    step('Les Cosmiques du Joueur 2', 'Le Joueur 2 place ses cartes Cosmiques face cachée dans l’emplacement marqué d’un cristal sur son tapis.', {},()=>['La double atatque',"L'immunité bestiale",'Le déchaînement','Déferlement'].forEach(n=>put(2,10,n,{back:true})));
    step('Les Spéciales du Joueur 2', 'Le Joueur 2 place ses cartes Spéciales face cachée dans l’emplacement marqué d’une étoile sur son tapis. Elles sont tournées de 90° pour suivre l’orientation de cette zone.', {},()=>['Kaïron souverain','Kaïros souverrain',C.sovereign].forEach(n=>put(2,1,n,{back:true,tapped:true})));
    step('Qui commence ?', 'Décidez toujours qui commence AVANT de regarder vos cartes. Vous pouvez lancer un dé : le meilleur résultat choisit. Ici, c’est décidé : vous êtes le Joueur 1 et vous commencez !', {},()=>{state.phase='Premier joueur';});
    step('À vous : piochez votre Main de départ', 'Le premier joueur a été choisi. Cliquez sur votre Deck illuminé, en bas à droite de votre tapis, pour piocher vos cinq cartes de départ.', {target:{player:1,name:'Deck',location:'board'},action:'Piocher 5 cartes',requireDeck:true},()=>{state.phase='Main de départ';});
    step('Votre Main de départ', 'Vos cinq cartes de départ sont dans votre Main, sous votre Terrain. La Main adverse reste cachée.', {},()=>{state.phase='Main de départ';draw(1,[C.sea,C.hole,C.gecko,C.falco,C.dragon]);draw(2,['Les écorcheurs','Vargrom',C.urkan,C.assimilation,C.vairon]);});
    step('Reforger sa Main', 'Une fois, avant de commencer, chaque joueur peut remettre toute sa Main dans son Deck, le mélanger, puis repiocher le même nombre de cartes. Pour suivre ce scénario, vous conservez tous les deux votre Main.', {next:'Conserver ma Main'});
    step('Tour 1 · Votre Energy', 'Votre premier tour commence avec 1 / 1 Energy. Au début de chacun de vos tours, votre maximum augmente de 1, jusqu’à 7, puis votre Energy est entièrement rechargée à ce nouveau maximum.', {},()=>turn(1,1));
    step('Pas de pioche pour le premier joueur', 'Vous avez déjà vos cinq cartes de départ. Au tout premier tour, le joueur qui commence ne pioche pas : il accédera aux différents modes avant son adversaire. Vous disposez de deux actions principales pendant votre tour.', {},()=>{state.phase='Phase de jeu';});
    step('Lire un Sbire : Geckoto', 'En haut à gauche : son coût d’invocation, 1 Energy. En haut à droite : sa Puissance, 1. Juste en dessous : ses PV, 1. Cette carte peut donc être invoquée avec votre Energy actuelle.', {focus:C.gecko,stats:true});
    step('À vous : invoquez Geckoto', 'Cliquez sur Geckoto, qui clignote dans votre Main. Son invocation coûte 1 Energy et utilise votre première action principale.', {target:{player:1,name:C.gecko,location:'hand'},action:'Invoquer Geckoto'});
    step('Un Sbire arrive incliné', 'Geckoto rejoint votre Terrain incliné. Un Sbire invoqué depuis la Main de cette manière ne peut pas attaquer ce tour. Votre Energy est maintenant à 0 / 1.', {},()=>{move(1,C.gecko,7,{tapped:true});p(1).energy=0;p(1).actions=1;});
    step('Apparition : un effet immédiat', 'L’effet « Apparition » de Geckoto s’active dès son invocation : « Piochez 1 carte ». Cette pioche provient de son effet, elle n’utilise pas une nouvelle action principale.', {focus:C.gecko});
    step('À vous : piochez avec Geckoto', 'Cliquez sur votre Deck illuminé pour piocher la carte accordée par l’effet Apparition de Geckoto.', {target:{player:1,name:'Deck',location:'board'},action:'Piocher 1 carte avec Geckoto',requireDeck:true});
    step('Une carte rejoint votre Main', 'Vous avez pioché une carte grâce à l’effet de Geckoto. Vous avez utilisé une seule de vos deux actions principales.', {},()=>draw(1,[C.cyclone]));
    step('La faculté Black-Hole', 'Sous les profondeurs possède la faculté Black-Hole. Vous pouvez la poser face cachée, sans payer d’Energy ni utiliser d’action principale. Après le délai d’un tour, vous pourrez l’activer gratuitement lorsque ses conditions seront réunies.', {focus:C.hole});
    step('À vous : posez votre Black-Hole', 'Cliquez sur Sous les profondeurs. Posez-la face cachée dans l’emplacement Pouvoir de droite : votre adversaire ne sait pas quelle carte vous préparez.', {target:{player:1,name:C.hole,location:'hand'},action:'Poser face cachée'});
    step('Le piège est en place', 'Sous les profondeurs est bien FACE CACHÉE sur votre Terrain. Vous avez encore une action principale, mais aucune action intéressante à effectuer ici. Vous pouvez terminer votre tour.', {next:'Terminer mon tour'},()=>move(1,C.hole,13,{back:true}));
    step('Tour 1 · Joueur 2', 'C’est au tour du Joueur 2. Il dispose de 1 / 1 Energy. Comme il joue en second, il pioche une carte pendant son premier tour.', {},()=>turn(2,1));
    step('Phase de pioche', 'Le Joueur 2 pioche une carte. Sa Main contient désormais six cartes.', {},()=>{state.phase='Pioche';draw(2,[C.pillage]);});
    step('Pillage bénéfique', 'Le Joueur 2 active Pillage bénéfique dans son emplacement Pouvoir central. Cette carte lui permettrait de piocher deux cartes… mais vous pouvez réagir avant sa résolution.', {focus:C.pillage},()=>{state.phase='Phase de jeu';move(2,C.pillage,12);p(2).actions=1;});
    step('Un Déclenchement depuis la Main', 'Falco peut réagir lorsqu’un adversaire active une carte Pouvoir. Son effet de Déclenchement vous permet de vous en défausser pour annuler cette activation. Vous n’invoquez pas Falco : vous utilisez son effet.', {focus:C.falco});
    step('À vous : annulez le Pouvoir', 'Cliquez sur Falco dans votre Main pour utiliser son Déclenchement contre Pillage bénéfique.', {target:{player:1,name:C.falco,location:'hand'},action:'Activer le Déclenchement de Falco'});
    step('Falco annule Pillage bénéfique', 'Falco se place temporairement dans votre emplacement de résolution à gauche. L’activation de Pillage bénéfique est annulée : l’adversaire ne pioche pas les deux cartes.', {},()=>move(1,C.falco,11));
    step('La faculté Néantin', 'Falco et Pillage bénéfique possèdent Néantin. Une carte dont l’effet se résout rejoint le Néant plutôt que le Vortex. Falco part donc au Néant, face visible et tourné de 90°. Le Pillage, dont l’activation a été annulée, rejoint le Vortex adverse.', {},()=>{move(1,C.falco,3,{tapped:true});move(2,C.pillage,9);});
    step('Le Joueur 2 invoque Urkan', 'Pour sa seconde action principale, il paie 1 Energy et invoque Urkan. Comme Geckoto, Urkan arrive incliné. Cette invocation remplit les conditions de votre Black-Hole !', {},()=>{move(2,C.urkan,7,{tapped:true});p(2).energy=0;p(2).actions=2;});
    step('Votre Black-Hole peut s’activer', 'Sous les profondeurs peut être activée lorsqu’un Sbire adverse est invoqué. Elle détruit ce Sbire si son coût d’Energy est inférieur ou égal à 2. Urkan remplit cette condition, et votre carte posée au tour précédent est disponible.', {focus:C.hole});
    step('À vous : révélez votre piège', 'Cliquez sur votre carte face cachée, en bas à droite des emplacements Pouvoir. Vous l’activez gratuitement en réaction à l’invocation d’Urkan.', {target:{player:1,name:C.hole,location:'board'},action:'Activer Sous les profondeurs'});
    step('Sous les profondeurs se révèle', 'Votre Black-Hole se retourne face visible, dans le même emplacement. Son effet va maintenant détruire Urkan.', {},()=>{p(1).zones[13][0].back=false;});
    step('Urkan rejoint le Vortex', 'Urkan est détruit et rejoint le Vortex du Joueur 2. Après sa résolution, Sous les profondeurs rejoint votre Vortex. Une destruction par effet ne rapporte pas ici l’étoile d’une destruction au combat.', {},()=>{move(2,C.urkan,9);move(1,C.hole,9);});
    step('Le Joueur 2 termine son tour', 'Les deux joueurs ont maintenant joué leur premier tour. À partir du prochain tour, la pioche normale sera de deux cartes.', {next:'Commencer mon tour 2'},()=>{state.phase='Fin de tour';});
    step('Les phases de début de tour', 'Dans l’ordre : Energy (augmenter le maximum et recharger), Pioche, Redressement, puis Ascension. Pendant l’Ascension, vérifiez votre progression : révélation du Navigateur, cartes Cosmiques, mode Astral, Super Nova… Nous approfondirons ces étapes dans les prochains chapitres.', {},()=>{state.active=1;state.turn=2;state.phase='Début du tour';});
    step('Tour 2 · Phase d’Energy', 'Votre maximum passe à 2. Vous récupérez la totalité de votre Energy : 2 / 2.', {},()=>turn(1,2));
    step('Phase de pioche · À vous', 'À partir de votre deuxième tour, vous piochez normalement deux cartes. Cliquez sur votre Deck illuminé pour les prendre.', {target:{player:1,name:'Deck',location:'board'},action:'Piocher 2 cartes',requireDeck:true},()=>{state.phase='Pioche';});
    step('Votre pioche du tour 2', 'Deux cartes rejoignent votre Main. Passons à la phase de redressement.', {},()=>{state.phase='Pioche';draw(1,[C.storm,C.eye]);});
    step('Phase de redressement', 'Geckoto se redresse. Il est maintenant prêt au combat !', {},()=>{state.phase='Redressement';p(1).zones[7][0].tapped=false;});
    step('Phase d’Ascension', 'Au tour 2 de ce scénario, aucun nouveau mode ne se débloque. Votre Navigateur reste caché. Vous pouvez passer à votre phase de jeu.', {},()=>{state.phase='Ascension';});
    step('Un Terrain adverse vide', 'En temps normal, si le Terrain adverse est vide, vos Sbires prêts au combat peuvent attaquer son Navigateur : ils lui infligent toujours 1 dégât. Mais ici, le Navigateur adverse n’est pas encore révélé.', {},()=>{state.phase='Phase de jeu';});
    step('À vous : gagnez une étoile', 'Vous pouvez à la place incliner Geckoto pour générer 1 étoile. Cliquez sur Geckoto sur votre Terrain.', {target:{player:1,name:C.gecko,location:'board'},action:'Incliner Geckoto · +1 étoile'});
    step('Votre première étoile !', 'Vous avez 1 étoile sur les 12 nécessaires pour gagner. Cette inclinaison n’est pas une attaque : elle ne peut donc pas être annulée comme une attaque. Nous allons maintenant attendre le tour adverse.', {next:'Terminer mon tour'},()=>{p(1).zones[7][0].tapped=true;p(1).stars=1;p(1).actions=1;});
    step('Tour 2 · Joueur 2 · Energy', 'L’Energy du Joueur 2 augmente et se recharge à 2 / 2.', {},()=>turn(2,2));
    step('Phase de pioche adverse', 'Le Joueur 2 pioche deux cartes.', {},()=>{state.phase='Pioche';draw(2,['Valgheim','Silence des arbres']);});
    step('Redressement et Ascension adverses', 'Le Joueur 2 n’a aucun Sbire à redresser et son Navigateur reste caché. Il passe à sa phase de jeu.', {},()=>{state.phase='Ascension';});
    step('L’invocation de Vairon', 'Le Joueur 2 dépense ses 2 Energy et sa première action principale pour invoquer Vairon. Vairon arrive incliné sur son Terrain. Regardez sa carte avant de découvrir son effet Apparition.', {focus:C.vairon},()=>{state.phase='Phase de jeu';move(2,C.vairon,7,{tapped:true});p(2).energy=0;p(2).actions=1;});
    step('L’Apparition de Vairon', 'Vairon révèle les cinq premières cartes de son Deck. Si « Kaïros – Guerrier bête » en fait partie, son effet permet de l’invoquer. Regardons les cartes révélées.', {focus:C.vairon});
    step('Cinq cartes révélées', 'Les cinq cartes sont révélées. Vous pouvez cliquer sur chacune pour la lire. Kaïros n’en fait pas partie : aucune invocation supplémentaire ne se produit.', {reveal:true},()=>{state.revealed=['Permutation obscure','Lycanthros','Elphoros',"L'éclipse salvatrice","L'appel sauvage"];});
    step('Retour au Deck, puis mélange', 'Les cinq cartes retournent dans le Deck adverse, qui est mélangé. Lorsqu’un effet vous fait consulter votre Deck, y chercher une carte ou y remettre une carte, mélangez-le ensuite. La pioche normale ne demande pas de mélange.', {},()=>{state.revealed=[];});
    step('L’Assimilation des énergies', 'Pour sa seconde action principale, le Joueur 2 active L’Assimilation des énergies. Il choisit d’envoyer Vairon de son Terrain au Vortex afin d’invoquer Vairon souverain des flammes depuis ses cartes Spéciales.', {focus:C.assimilation},()=>{move(2,C.assimilation,11);p(2).actions=2;});
    step('Une invocation spéciale', 'Vairon rejoint le Vortex. Sa version Souverain quitte les cartes Spéciales et arrive verticalement sur le Terrain, prête au combat : il s’agit d’une invocation spéciale. L’Assimilation des énergies rejoint ensuite le Vortex.', {focus:C.sovereign},()=>{move(2,C.vairon,9);move(2,C.sovereign,7);move(2,C.assimilation,9);});
    step('Vairon souverain attaque Geckoto', 'L’adversaire annonce l’attaque, puis incline Vairon souverain. Geckoto est sa cible. Vairon souverain possède 5 de Puissance, contre 1 PV pour Geckoto.', {attack:true},()=>{state.phase='Combat';p(2).zones[7][0].tapped=true;});
    step('Geckoto est détruit au combat', 'Le combat est résolu : Geckoto rejoint votre Vortex. La destruction d’un de vos Sbires Démononuageux au combat ouvre une possibilité de réaction depuis votre Main.', {},()=>move(1,C.gecko,9));
    step('Le Déclenchement de Cruauté des mers', 'Lorsqu’un Sbire Démononuageux de votre Terrain est détruit au combat, vous pouvez invoquer Cruauté des mers depuis votre Main grâce à son Déclenchement.', {focus:C.sea});
    step('À vous : faites surgir Cruauté des mers', 'Cliquez sur Cruauté des mers dans votre Main pour l’invoquer grâce à son effet.', {target:{player:1,name:C.sea,location:'hand'},action:'Invoquer Cruauté des mers'});
    step('Cruauté des mers entre en jeu', 'Cruauté des mers rejoint votre Terrain verticalement, prête au combat. Cette invocation par effet ne dépense pas votre Energy.', {},()=>move(1,C.sea,7));
    step('Une étoile pour l’adversaire', 'Le Joueur 2 gagne 1 étoile pour avoir détruit Geckoto au combat. Vous avez maintenant une étoile chacun. Il termine son tour.', {next:'Commencer mon tour 3'},()=>{p(2).stars=1;state.phase='Fin de tour';});
    step('Tour 3 · Phase d’Energy', 'Votre maximum augmente à 3 et votre Energy se recharge à 3 / 3.', {},()=>turn(1,3));
    step('Phase de pioche · À vous', 'C’est votre phase de pioche. Cliquez sur votre Deck illuminé pour piocher vos deux cartes du tour.', {target:{player:1,name:'Deck',location:'board'},action:'Piocher 2 cartes',requireDeck:true},()=>{state.phase='Pioche';});
    step('Votre pioche du tour 3', 'Deux cartes rejoignent votre Main. Passons à la phase de redressement.', {},()=>{state.phase='Pioche';draw(1,[C.hand,C.rox]);});
    step('Phase de redressement', 'Cruauté des mers est toujours sur votre Terrain et elle est déjà redressée. Vous n’avez donc aucune carte à redresser.', {},()=>{state.phase='Redressement';});
    step('Tour 3 · Révélez votre Navigateur', 'Pendant cette phase d’Ascension, votre Navigateur entre en scène ! Déplacez l’Environnement qui le recouvre vers son emplacement dédié, en haut de votre tapis.', {next:'Révéler Zvatas'},()=>{state.phase='Ascension';});
    step('Zvatas rejoint la bataille', 'Zvatas est maintenant visible au centre de votre Terrain. Votre Environnement, Cataclysme des nuages, est révélé dans son emplacement dédié, tourné de 90°. Le Navigateur adverse restera caché jusqu’à son propre troisième tour.', {focus:C.nav},()=>move(1,C.env,2,{tapped:true}));
    step('Tutoriel 1 terminé', 'Vous avez découvert la mise en place, l’Energy, les invocations, les réactions, le combat et les étoiles. Besoin de revoir une étape ? Recommencez ce chapitre. La suite de l’apprentissage vous attendra au chapitre 2 !', {complete:true});
    return steps;
  }

  function buildChapter2() {
    let state = {turn:3,active:1,phase:'Début du tour',players:{1:player(),2:player()},revealed:[]};
    const steps=[];
    const p = n => state.players[n];
    function put(n,z,name,options={}) { (p(n).zones[z] ||= []).push({name,back:false,tapped:false,...options}); }
    function find(n,name){ for(const z of Object.values(p(n).zones)){const c=z.find(c=>c.name===name);if(c)return c;} return null; }
    function remove(n,name) {
      const h=p(n).hand.indexOf(name); if(h>=0) p(n).hand.splice(h,1);
      for(const z of Object.values(p(n).zones)) {const i=z.findIndex(c=>c.name===name);if(i>=0){z.splice(i,1);return;}}
    }
    function move(n,name,z,options={}) {remove(n,name);put(n,z,name,options);}
    function draw(n,names) {p(n).hand.push(...names);}
    function step(title,text,opts={},change) {if(change)change();steps.push({title,text,...opts,state:clone(state)});}

    // Situation de départ du chapitre 2.
    p(1).energy=2;p(1).max=2;p(1).stars=0;p(1).actions=0;p(1).deck=true;
    draw(1,[C.light,C.hand,C.dragon]);
    put(1,6,C.nav,{power:1,hp:5,clouds:0});
    put(1,6,C.env,{back:true});
    // Le sommet de la pile est La larve afin que le clic sur la pile soit guidé sans afficher les zones techniques.
    put(1,1,C.wolf,{back:true,tapped:true});put(1,1,C.swordEye,{back:true,tapped:true});put(1,1,C.larva,{back:true,tapped:true});
    put(1,7,C.sea,{power:1,hp:1,tapped:true});

    p(2).energy=3;p(2).max=3;p(2).stars=0;p(2).actions=0;p(2).deck=true;
    put(2,6,C.dompteur,{power:1,hp:5});
    put(2,2,C.env2,{tapped:true});
    put(2,5,C.elphoros,{hp:3,tapped:true});

    step('Chapitre 2 · Le Navigateur', 'Dans ce chapitre, vous allez apprendre à révéler votre Navigateur, utiliser son effet et comprendre ce qu’il peut faire au combat. Le tour est à vous.');
    step('Phase d’Energy', 'Votre maximum d’Energy augmente et votre réserve se recharge entièrement.', {},()=>{state.phase='Energy';p(1).max=3;p(1).energy=3;});
    step('Phase de pioche', 'Cliquez sur votre Deck illuminé pour effectuer votre pioche du tour.', {target:{player:1,name:'Deck',location:'board'},action:'Piocher',requireDeck:true},()=>{state.phase='Pioche';});
    step('Votre pioche', 'Deux cartes rejoignent votre Main. Prenez le temps de regarder votre nouvelle Main avant de continuer.', {},()=>draw(1,[C.eye,C.storm]));
    step('Phase de redressement', 'La carte déjà inclinée sur votre Terrain se redresse et redevient prête à agir.', {},()=>{state.phase='Redressement';const c=find(1,C.sea);if(c)c.tapped=false;});
    step('Phase d’Ascension', 'Vous avez maintenant atteint 3 Energy. Il est temps de révéler votre Navigateur. Cliquez sur la carte qui le recouvre au centre de votre Terrain.', {target:{player:1,name:C.env,location:'board'},action:'Révéler votre Navigateur'},()=>{state.phase='Ascension';});
    step('Votre Navigateur est révélé', 'Votre Environnement rejoint son emplacement dédié et votre Navigateur apparaît. En général, un Navigateur possède 1 point de Puissance, 5 PV et une seconde face destinée au mode Astral, que nous verrons plus tard.', {focus:C.nav},()=>{move(1,C.env,2,{tapped:true});const nav=find(1,C.nav);if(nav){nav.clouds=3;nav.hp=5;}});
    step('Ses compteurs', 'Lorsqu’il est révélé, placez 3 compteurs Nuage sur votre Navigateur. Son effet pourra en retirer un lorsqu’un Sbire Démononuageux est invoqué afin de le redresser immédiatement. Cet effet ne peut être utilisé qu’une fois par tour, et la carte ainsi redressée ne pourra plus être redressée par un autre effet ce tour-ci.', {focus:C.nav});
    step('Invoquez un Sbire', 'Cliquez sur le Sbire illuminé dans votre Main pour l’invoquer. Il utilise toute votre Energy disponible.', {target:{player:1,name:C.dragon,location:'hand'},action:'Invoquer le Sbire'});
    step('Activez l’effet du Navigateur', 'Le Sbire arrive incliné sur votre Terrain. Cliquez maintenant sur votre Navigateur pour utiliser son effet.', {target:{player:1,name:C.nav,location:'board'},action:'Activer son effet'},()=>{move(1,C.dragon,8,{tapped:true,power:2,hp:5});p(1).energy=0;p(1).actions=1;});
    step('Effet résolu', 'Un compteur est retiré et le Sbire invoqué se redresse automatiquement. Il est désormais prêt au combat.', {},()=>{const nav=find(1,C.nav);if(nav)nav.clouds=2;const d=find(1,C.dragon);if(d)d.tapped=false;});
    step('L’effet de votre Environnement', 'Votre Environnement possède lui aussi un effet passif. Lorsqu’un de vos Sbires Démononuageux est redressé par un effet, vous pouvez augmenter ses PV de 1. S’il possède déjà 4 PV ou plus, vous pouvez lui donner 1 point de Puissance à la place.', {focus:C.env});
    step('Choisissez le bonus du Dragon brumeux', 'Le Dragon brumeux possède 2 de Puissance et 5 PV de base. Comme il possède déjà 4 PV ou plus, Cataclysme des nuages vous laisse choisir : augmentez sa Puissance de 1 ou ses PV de 1.', {focus:C.dragon,statChoice:true});
    step('Attaques du Navigateur', 'Un Navigateur peut attaquer. S’il détruit un Sbire au combat, il génère 1 étoile, comme vos Sbires. Si le Terrain adverse est vide, il ne peut pas attaquer directement le Navigateur adverse ; il peut toutefois s’incliner pour générer 1 étoile.');
    step('Votre dernière action principale', 'Jouez la carte illuminée. Son effet va vous permettre d’invoquer une carte depuis votre Deck Spécial.', {target:{player:1,name:C.hand,location:'hand'},action:'Jouer la carte'});
    step('Choisissez dans votre Deck Spécial', 'Cliquez sur votre pile de cartes Spéciales illuminée pour voir les cartes disponibles.', {target:{player:1,name:C.larva,location:'board'},action:'Ouvrir le Deck Spécial'},()=>{remove(1,C.hand);p(1).actions=2;});
    step('Choisissez la carte à invoquer', 'Les cartes disponibles s’affichent. Cliquez sur la carte illuminée pour l’invoquer grâce à l’effet.', {target:{player:1,name:C.larva,location:'revealed'},action:'Invoquer cette carte',reveal:true},()=>{state.revealed=[C.larva,C.swordEye,C.wolf];});
    step('Invocation spéciale', 'Un Sbire invoqué grâce à un effet est une invocation spéciale : vous ne payez pas son coût d’Energy et il arrive verticalement, prêt au combat, sauf si l’effet indique le contraire.', {},()=>{state.revealed=[];remove(1,C.larva);put(1,5,C.larva,{power:1,hp:2});});
    step('Passez à l’attaque', 'Commencez par attaquer le Sbire adverse avec votre premier attaquant. Cliquez sur votre carte illuminée.', {target:{player:1,name:C.dragon,location:'board'},action:'Attaquer'});
    step('Choisissez la cible', 'Votre attaquant est incliné. Cliquez maintenant sur le Sbire adverse pour le prendre pour cible.', {target:{player:2,name:C.elphoros,location:'board'},action:'Cibler le Sbire'},()=>{const d=find(1,C.dragon);if(d)d.tapped=true;});
    step('Dégâts infligés', 'Votre attaquant possède 2 de Puissance. Les dégâts sont soustraits aux PV : le Sbire adverse n’a plus qu’1 PV.', {},()=>{const e=find(2,C.elphoros);if(e)e.hp=1;});
    step('Attaquez avec votre Navigateur', 'Le Sbire adverse est presque vaincu. Cliquez sur votre Navigateur pour lancer une seconde attaque.', {target:{player:1,name:C.nav,location:'board'},action:'Attaquer avec le Navigateur'});
    step('Choisissez la cible', 'Votre Navigateur est incliné. Cliquez sur le Sbire adverse pour terminer le combat.', {target:{player:2,name:C.elphoros,location:'board'},action:'Cibler le Sbire'},()=>{const nav=find(1,C.nav);if(nav)nav.tapped=true;});
    step('Une étoile remportée', 'Le Sbire adverse est détruit et rejoint le Vortex. Votre Navigateur l’ayant détruit au combat, vous gagnez 1 étoile.', {},()=>{move(2,C.elphoros,9);p(1).stars=1;});
    step('Le champ est libre', 'Votre dernier Sbire est encore prêt au combat. Cliquez dessus pour attaquer.', {target:{player:1,name:C.larva,location:'board'},action:'Attaquer'});
    step('Ciblez le Navigateur adverse', 'Cette fois, le champ est libre. Cliquez sur le Navigateur adverse pour lui infliger les dégâts.', {target:{player:2,name:C.dompteur,location:'board'},action:'Cibler le Navigateur'},()=>{const l=find(1,C.larva);if(l)l.tapped=true;});
    step('Dégâts sur le Navigateur', 'Le Navigateur adverse perd 1 PV. Vous venez de voir comment révéler, utiliser et faire combattre votre propre Navigateur.', {},()=>{const n=find(2,C.dompteur);if(n)n.hp=4;});
    step('Chapitre 2 terminé', 'Bravo ! Vous savez maintenant exploiter l’effet de votre Navigateur, l’utiliser au combat et combiner ses possibilités avec vos invocations.', {complete:true});
    return steps;
  }
  function buildChapter3() {
    let state = {turn:5,active:1,phase:'Phase de jeu',players:{1:player(),2:player()},revealed:[]};
    const steps=[];
    const p = n => state.players[n];
    function put(n,z,name,options={}) { (p(n).zones[z] ||= []).push({name,back:false,tapped:false,...options}); }
    function find(n,name){ for(const z of Object.values(p(n).zones)){const c=z.find(c=>c.name===name);if(c)return c;} return null; }
    function remove(n,name) { const h=p(n).hand.indexOf(name); if(h>=0){p(n).hand.splice(h,1);return;} for(const z of Object.values(p(n).zones)){const i=z.findIndex(c=>c.name===name);if(i>=0){z.splice(i,1);return;}} }
    function move(n,name,z,options={}) {remove(n,name);put(n,z,name,options);}
    function step(title,text,opts={},change) {if(change)change();steps.push({title,text,...opts,state:clone(state)});}

    p(1).energy=5;p(1).max=5;p(1).stars=2;p(1).actions=0;p(1).deck=true;
    p(1).hand=[C.tryhydre,C.light,C.small,C.falco];
    put(1,6,C.nav,{power:1,hp:5,clouds:3}); put(1,2,C.env); put(1,7,C.storm,{power:5,hp:5});
    p(2).energy=5;p(2).max=5;p(2).stars=0;p(2).actions=0;p(2).deck=true;
    put(2,6,C.dompteur,{power:1,hp:5}); put(2,2,C.env2,{tapped:true}); put(2,7,C.rakesh,{power:6,hp:6,tapped:true}); put(2,12,C.immunity,{back:true});

    step('Chapitre 3 · Les Cartes Cosmiques','Les cartes Cosmiques sont des cartes semblables aux cartes de base. Lors de la Phase d’Ascension du tour 5, elles rejoignent votre Deck principal. Ici, une figure déjà dans votre Main : ce sera plus explicite pour le tutoriel.',{focus:C.tryhydre});
    step('Une puissance encore hors de portée','La Tryhydre est une carte extrêmement puissante, mais elle coûte 6 Energy. Vous n’en possédez que 5. Heureusement, Astral Cards regorge de rebondissements !',{focus:C.tryhydre});
    step('Jouez votre tour librement','Une fois les différentes phases terminées, vous pouvez organiser vos actions dans l’ordre qui vous semble le plus intéressant. Commençons par attaquer.');
    step('Attaquez avec le Démon des tempêtes','Cliquez sur le Démon des tempêtes pour déclarer une attaque.',{target:{player:1,name:C.storm,location:'board'},action:'Attaquer'});
    step('Choisissez votre cible','Votre Démon des tempêtes s’incline. Cliquez sur Ra’Kesh pour le prendre pour cible.',{target:{player:2,name:C.rakesh,location:'board'},action:"Cibler Ra'Kesh"},()=>{const c=find(1,C.storm);if(c)c.tapped=true;});
    step('Revirement de situation !','Le Joueur 2 active sa carte face cachée : L’immunité bestiale. Son effet annule l’attaque.',{focus:C.immunity},()=>{const c=find(2,C.immunity);if(c)c.back=false;});
    step('Déclenchement de Falco','Falco peut se déclencher depuis votre Main lorsqu’un adversaire active une carte Pouvoir. Son effet permet d’annuler cette activation.',{focus:C.falco});
    step('Réagissez avec Falco','Cliquez sur Falco dans votre Main pour utiliser son Déclenchement.',{target:{player:1,name:C.falco,location:'hand'},action:'Activer Falco'});
    step('Falco entre en résolution','Falco se place face recto sur votre Terrain. Les cartes Cosmiques restent sensibles aux mêmes règles et interactions que les cartes de base.',{},()=>move(1,C.falco,11));
    step('L’attaque est sauvée','L’immunité bestiale est annulée et rejoint le Vortex adverse. Falco possède Néantin : après la résolution de son effet, il rejoint votre Néant. L’attaque du Démon des tempêtes peut donc continuer.',{},()=>{move(1,C.falco,3);move(2,C.immunity,9);});
    step('Ra’Kesh encaisse les dégâts','Le Démon des tempêtes possède 5 de Puissance. Ra’Kesh avait 6 PV : il lui reste donc 1 PV.',{},()=>{const c=find(2,C.rakesh);if(c)c.hp=1;});
    step('Terminons ce vilain Ra’Kesh !','Cliquez sur votre Navigateur pour attaquer.',{target:{player:1,name:C.nav,location:'board'},action:'Attaquer avec Zvatas'});
    step('Ciblez Ra’Kesh','Votre Navigateur s’incline. Cliquez sur Ra’Kesh pour terminer le combat.',{target:{player:2,name:C.rakesh,location:'board'},action:"Cibler Ra'Kesh"},()=>{const c=find(1,C.nav);if(c)c.tapped=true;});
    step('Ra’Kesh est détruit','Ra’Kesh rejoint le Vortex adverse. Votre Navigateur l’ayant détruit au combat, vous gagnez 1 étoile.',{},()=>{move(2,C.rakesh,9);p(1).stars=3;});
    step('Du plus petit au plus monstrueux','Bien ! Maintenant, utilisons Du plus petit au plus monstrueux.',{focus:C.small});
    step('Activez la carte Pouvoir','Cliquez sur Du plus petit au plus monstrueux dans votre Main.',{target:{player:1,name:C.small,location:'hand'},action:'Jouer la carte'});
    step('Préparez l’invocation spéciale','La carte est jouée face recto dans votre zone de Pouvoir. Elle permet d’envoyer un Sbire Démononuageux de votre Terrain au Néant. Si vous le faites, vous pouvez invoquer depuis votre Main un Sbire Démononuageux dont le coût d’Energy est inférieur, égal ou supérieur de 1 à celui envoyé.',{focus:C.small},()=>{move(1,C.small,12);p(1).actions=1;});
    step('Le calcul est parfait','Le Démon des tempêtes coûte 5 Energy et la Tryhydre en coûte 6. Envoyer le Démon des tempêtes au Néant vous permettra donc d’invoquer la Tryhydre.');
    step('Envoyez le Démon des tempêtes au Néant','Cliquez sur le Démon des tempêtes.',{target:{player:1,name:C.storm,location:'board'},action:'Envoyer au Néant'});
    step('Choisissez la Tryhydre','Le Démon des tempêtes rejoint votre Néant. Cliquez maintenant sur la Tryhydre dans votre Main.',{target:{player:1,name:C.tryhydre,location:'hand'},action:'Invoquer la Tryhydre'},()=>move(1,C.storm,3,{power:5,hp:5,tapped:true}));
    step('Invocation spéciale réussie','La Tryhydre arrive face recto et verticalement sur votre Terrain, prête au combat. Son coût de 6 Energy n’a pas été payé : elle a été invoquée grâce à l’effet de votre carte Pouvoir.',{},()=>move(1,C.tryhydre,7,{power:4,hp:6}));
    step('Bravo ! L’adversaire est dans la panade !','Cliquez sur la Tryhydre pour attaquer.',{target:{player:1,name:C.tryhydre,location:'board'},action:'Attaquer'});
    step('Attaquez le Navigateur adverse','La Tryhydre s’incline. Cliquez sur le Dompteur.',{target:{player:2,name:C.dompteur,location:'board'},action:'Cibler le Dompteur'},()=>{const c=find(1,C.tryhydre);if(c)c.tapped=true;});
    step('Le Dompteur est touché','Le Navigateur adverse perd 1 PV.',{},()=>{const c=find(2,C.dompteur);if(c)c.hp=4;});
    step('Il vous reste encore une action','L’invocation spéciale de la Tryhydre grâce à votre carte Pouvoir ne compte pas comme une action principale supplémentaire. Vous n’avez activé qu’une seule carte : il vous reste donc encore une action principale.');
    step('La lumière après les nuages','Cliquez sur La lumière après les nuages.',{target:{player:1,name:C.light,location:'hand'},action:'Jouer la carte'});
    step('Un second souffle','Son effet permet de redresser un Sbire Démononuageux.',{focus:C.light},()=>{move(1,C.light,13);p(1).actions=2;});
    step('Redressez la Tryhydre','Cliquez sur la Tryhydre pour la redresser.',{target:{player:1,name:C.tryhydre,location:'board'},action:'Redresser la Tryhydre'});
    step('Cataclysme des nuages s’active !','La Tryhydre vient de se redresser. Comme elle possède 4 PV ou plus, votre Environnement s’active : choisissez d’augmenter sa Puissance de 1 ou ses PV de 1.',{focus:C.tryhydre,statChoice:true,statChoiceCard:C.tryhydre},()=>{const c=find(1,C.tryhydre);if(c)c.tapped=false;});
    step('Prête à attaquer de nouveau','La Tryhydre se redresse verticalement et bénéficie du bonus que vous venez de choisir.',{},()=>{const c=find(1,C.tryhydre);if(c)c.tapped=false;});
    step('Attaquez encore !','Cliquez sur la Tryhydre pour lancer une nouvelle attaque.',{target:{player:1,name:C.tryhydre,location:'board'},action:'Attaquer'});
    step('Ciblez encore le Dompteur','La Tryhydre s’incline. Cliquez sur le Navigateur adverse.',{target:{player:2,name:C.dompteur,location:'board'},action:'Cibler le Dompteur'},()=>{const c=find(1,C.tryhydre);if(c)c.tapped=true;});
    step('Une seconde blessure','Le Dompteur perd encore 1 PV.',{},()=>{const c=find(2,C.dompteur);if(c)c.hp=3;});
    step('Chapitre 3 terminé','Gardez à l’esprit que vos cartes Cosmiques sont puissantes et généralement difficiles ou complexes à invoquer ou à jouer, mais qu’elles ont le même statut que les autres cartes. Un effet qui parle d’un Sbire concerne donc aussi un Sbire Cosmique.',{complete:true});
    return steps;
  }
  function build(chapter=1){ chapter=Number(chapter); return chapter===3 ? buildChapter3() : chapter===2 ? buildChapter2() : buildChapter1(); }
  const api={build,buildChapter1,buildChapter2,buildChapter3,C};
  if(typeof module!=='undefined' && module.exports) module.exports=api;
  else root.AstralTutorial=api;
})(typeof window!=='undefined'?window:globalThis);
