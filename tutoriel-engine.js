/* Chapitre scripté : chaque état attend un clic. Aucun minuteur ne fait avancer le récit. */
(function (root) {
  'use strict';
  const C = {
    gecko:'Geckoto', hole:'Sous les profondeurs', falco:'Falco', sea:'Cruauté des mers',
    dragon:'Dragon brumeux', cyclone:'Le cyclone', storm:'Démon des tempêtes', eye:"L'oeil protecteur",
    hand:'La grande main', rox:'Roxxor', nav:'Zvatas forme 1', env:'Cataclysme des nuages',
    pillage:'Pillage bénéfique', urkan:'Urkan', vairon:'Vairon', sovereign:'Vairon souverrain',
    assimilation:'Assimilation des Energies', env2:'Le domaine sauvage'
  };
  const clone = value => JSON.parse(JSON.stringify(value));
  const player = () => ({energy:0,max:0,stars:0,actions:0,hand:[],zones:{},deck:false});
  function build() {
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
    step('Un Sbire arrive incliné', 'Geckoto rejoint votre Terrain, incliné à 90°. Un Sbire invoqué depuis la Main de cette manière ne peut pas attaquer ce tour. Votre Energy est maintenant à 0 / 1.', {},()=>{move(1,C.gecko,7,{tapped:true});p(1).energy=0;p(1).actions=1;});
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
  const api={build,C};
  if(typeof module!=='undefined' && module.exports) module.exports=api;
  else root.AstralTutorial=api;
})(typeof window!=='undefined'?window:globalThis);
