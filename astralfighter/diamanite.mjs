// Explicit rolls: each column is common, rare, super-rare, legendary.
const weapon=(name,owner,family,rarityRolls)=>({name,owner,family,slot:'weapon',rarityRolls,rolls:rarityRolls});
const armor=(name,rarityRolls,restriction)=>({name,slot:'armor',rarityRolls,rolls:rarityRolls,...restriction});
export const DIAMANITE_ITEMS=Object.fromEntries(Object.entries({
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
}).map(([id,item])=>[id,{...item,level:4,price:item.slot==='weapon'?555:375,sellPrice:75}]));
