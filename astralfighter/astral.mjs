// All rolls are explicit: common, rare, super-rare, legendary.
const weapon=(name,owner,family,rarityRolls)=>({name,owner,family,slot:'weapon',rarityRolls,rolls:rarityRolls});
const armor=(name,rarityRolls,restriction={})=>({name,slot:'armor',rarityRolls,rolls:rarityRolls,...restriction});
export const ASTRAL_ITEMS=Object.fromEntries(Object.entries({
 'epee-dieux-nuageux':weapon('Épée lourde Cosmique','forgeur','epee-lourde',{dmg:[50,55,65,85]}),
 'epee-bouclier-astral':weapon('Épée & bouclier Cosmique','nahat','epee-bouclier',{dmg:[40,45,55,70],hp:[120,130,145,165]}),
 'lame-sabre-astral':weapon('Lame-sabre Cosmique','nahat','lame-sabre',{dmg:[55,65,75,85],hp:[50,60,75,90],luck:[-35,-30,-25,-15]}),
 'protege-bras-astral':weapon('Protège-bras Cosmique','nahat','protege-bras',{hpPercent:[22,23,24,26]}),
 'cristal-astral':weapon('Cristal Cosmique','wolffy','cristal',{dmg:[44,55,66,77],luck:[37,45,45,50]}),
 'dentier-astral':weapon('Dentier de combat Cosmique','wolffy','dentier',{dmg:[30,40,50,60],hp:[80,100,110,125],luck:[20,22,23,25],speed:[20,22,23,25]}),
 'arc-astral':weapon('Arc Cosmique','drunn','arc',{dmg:[45,55,65,80],luck:[25,30,35,40]}),
 'arbalete-astral':weapon('Arbalète Cosmique','drunn','arbalete',{dmg:[32,38,43,51],luck:[20,25,28,31]}),
 'baton-astral':weapon('Bâton Cosmique','stibili','baton',{dmg:[55,65,75,90]}),
 'griffe-astral':weapon('Griffe Cosmique','kaerune','griffe',{dmg:[45,55,65,75],speed:[28,33,38,45]}),
 'porte-aile-astral':weapon('Porte-aile Cosmique','kaerune','porte-aile',{dmg:[30,40,48,55],speed:[45,55,61,70],luck:[-30,-28,-25,-20]}),
 'cape-astral':armor('Cape protectrice Cosmique',{hp:[250,270,310,400]}),
 'armure-complete-astral':armor('Armure complète de Wolffy Cosmique',{hp:[200,220,250,300]},{owner:'wolffy'})
}).map(([id,d])=>[id,{...d,cosmic:true,level:5,price:1050,sellPrice:200}]));
export const isAstral=i=>!!ASTRAL_ITEMS[typeof i==='string'?i:i?.type];
export const astralActive=(i,type,min=2)=>i?.type===type&&['common','rare','super-rare','legendary'].indexOf(i.rarity)>=min;
export function astralPassiveText(i){
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
 return (astralActive(i,i.type,min)?'Passif actif : ':min===3?'Légendaire : ':'Super rare et Légendaire : ')+text[i.type]+(i.type==='armure-complete-astral'?' Wolffy porte son armure Cosmique à toutes les raretés.':'');
}

// Stars no longer alter equipment statistics.
export const itemStats=item=>({...item.stats});
export function normalizeForge(s){
 s.forge={unlocked:!!s.forge?.unlocked,announce:!!s.forge?.announce,cosmicBought:!!s.forge?.cosmicBought,flamesBought:!!s.forge?.flamesBought};
 for(const item of s.items??[])delete item.stars;
}
export const COSMIC_ART={"epee-dieux-nuageux": "epee-lourde-cosmique", "epee-bouclier-astral": "epee-bouclier-cosmique", "lame-sabre-astral": "lame-sabre-cosmique", "protege-bras-astral": "protege-bras-cosmique", "cristal-astral": "cristal-cosmique", "dentier-astral": "dentier-cosmique", "arc-astral": "arc-cosmique", "arbalete-astral": "arbalete-cosmique", "baton-astral": "baton-cosmique", "griffe-astral": "griffe-cosmique", "porte-aile-astral": "porte-aile-cosmique"};
for(const [id,art]of Object.entries(COSMIC_ART))ASTRAL_ITEMS[id].art=art;
