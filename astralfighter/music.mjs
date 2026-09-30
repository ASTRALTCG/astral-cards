export const MUSIC_TRACKS={home:'accueil',discussion:'discussion',combat:'combat',rift:'fissure',boss:'boss'};
export function musicTheme({home,state,tab,result}){
 if(home||!state?.hero)return 'home';
 if(state.storyScene)return 'discussion';
 const encounter=state.battle??result;
 if(encounter)return encounter.mode==='rift'?(encounter.stage%10===0?'boss':'rift'):'combat';
 return tab==='rift'?'rift':'home';
}
export function createMusicPlayer({AudioClass=globalThis.Audio,storage=globalThis.localStorage,setTimer=setInterval,clearTimer=clearInterval}={}){
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
