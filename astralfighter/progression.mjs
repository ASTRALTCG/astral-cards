export const MAX_LEVEL=50;
export const xpNeed=level=>Math.round(40*1.24**(level-1));
export const expeditionXpDivisors=level=>level<=5?[5,7]:level<=9?[9,12]:[10,15];
export function expeditionXpRange(level){if(level>=MAX_LEVEL)return [0,0];const [min,max]=expeditionXpDivisors(level);return [Math.round(xpNeed(level)/max),Math.round(xpNeed(level)/min)];}
export function expeditionXp(level,rng=Math.random){if(level>=MAX_LEVEL)return 0;const [min,max]=expeditionXpDivisors(level),divisor=min+Math.min(max-min,Math.floor(rng()*(max-min+1)));return Math.round(xpNeed(level)/divisor);}
