(function(){
if(window.__sh)return;window.__sh=1;
var RS="मेष,वृषभ,मिथुन,कर्क,सिंह,कन्या,तुला,वृश्चिक,धनु,मकर,कुंभ,मीन".split(",");
var css='.shf{position:fixed;right:16px;bottom:18px;z-index:80;width:52px;height:52px;border-radius:50%;border:0;background:#c2185b;color:#fff;box-shadow:0 6px 18px rgba(0,0,0,.3);cursor:pointer;display:grid;place-items:center;padding:0}.shf:active{transform:scale(.94)}.shf svg{width:24px;height:24px}'+
'.shb{position:fixed;inset:0;background:rgba(20,12,30,.5);z-index:95;opacity:0;pointer-events:none;transition:opacity .25s}.shb.on{opacity:1;pointer-events:auto}'+
'.shs{position:fixed;left:50%;bottom:0;z-index:96;width:min(440px,100%);transform:translate(-50%,105%);transition:transform .3s cubic-bezier(.2,.8,.2,1);background:#fff;color:#241b3d;border-radius:20px 20px 0 0;padding:16px 16px 22px;font:500 15px/1.5 "Noto Sans Devanagari",system-ui,sans-serif;box-shadow:0 -10px 40px rgba(0,0,0,.25)}.shs.on{transform:translate(-50%,0)}'+
'.shs h4{margin:0 0 4px;font-size:1.05rem}.shs p{margin:0 0 12px;color:#6a6285;font-size:.85rem}.shg{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.shg a,.shg button{display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 4px;border:1px solid #e6e0f3;border-radius:14px;background:#fff;color:#241b3d;text-decoration:none;font:inherit;font-size:.85rem;cursor:pointer}.shg i{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;color:#fff;font-style:normal;font-weight:700;font-size:1rem}'+
'.shx{position:absolute;right:12px;top:10px;border:0;background:#f1edf8;border-radius:50%;width:28px;height:28px;cursor:pointer;font-size:14px}.sht{position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:99;background:#2b2236;color:#fff;padding:10px 18px;border-radius:12px;font:600 14px system-ui;opacity:0;transition:opacity .25s;pointer-events:none}.sht.on{opacity:1}@media print{.shf,.shs,.shb,.shi{display:none}}.shi{position:relative;display:inline-flex;align-items:center;gap:8px;cursor:pointer;width:auto;height:auto;padding:10px 22px;border-radius:999px;color:#2b2236;font:600 .95rem \"Noto Sans Devanagari\",system-ui,sans-serif;letter-spacing:.2px;border:1px solid rgba(255,255,255,.95);background:linear-gradient(180deg,rgba(255,255,255,.95) 0%,rgba(243,238,250,.7) 55%,rgba(255,255,255,.85) 100%);-webkit-backdrop-filter:blur(12px) saturate(1.4);backdrop-filter:blur(12px) saturate(1.4);box-shadow:inset 0 1.5px 1px rgba(255,255,255,1),inset 0 -3px 8px rgba(120,90,160,.14),0 8px 18px rgba(60,40,90,.18),0 1px 3px rgba(60,40,90,.2);transition:transform .18s,box-shadow .18s}.shi:hover{transform:translateY(-1px);box-shadow:inset 0 1.5px 1px #fff,inset 0 -3px 8px rgba(120,90,160,.14),0 12px 22px rgba(60,40,90,.22),0 1px 3px rgba(60,40,90,.2)}.shi:active{transform:translateY(1px) scale(.98);box-shadow:inset 0 2px 6px rgba(120,90,160,.25),0 2px 6px rgba(60,40,90,.15)}.shi svg{width:18px;height:18px;flex:none;color:#c2185b;filter:drop-shadow(0 1px 1px rgba(194,24,91,.25))}.shi::after{content:\"✦\";color:#f5a90d;font-size:.8em;margin-left:-2px;text-shadow:0 0 6px rgba(245,169,13,.6)}.shi.sm{padding:4px 13px;font-size:.78rem;gap:5px}.shi.sm svg{width:14px;height:14px}.shi.sm::after{display:none}.shr{margin:14px 0}';
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
function data(){
 var c=document.querySelector('link[rel=canonical]'),url=c?c.href:location.href.split("#")[0],text=(document.title||"").replace(/\s*\|\s*आज का राशिफल$/,"");
 var isHome=location.pathname==="/"||/index\.html$/.test(location.pathname);
 if(isHome){var r=null;try{r=localStorage.getItem("rashi")}catch(e){}
  if(r!==null&&/^(\d|1[01])$/.test(r)){url=location.origin+"/?r="+r;text="🪔 "+RS[+r]+" राशि का आज का राशिफल, पंचांग और राहु काल देखें"}
  else{url=location.origin+"/";text="🪔 आज का राशिफल: अपनी राशि का रोज़ का हाल, पंचांग, राहु काल और फ्री कुंडली"}}
 else text="🪔 "+text;
 return{url:url,text:text,title:document.title}}
var bd=document.createElement("div"),sh=document.createElement("div"),tt=document.createElement("div"),bt=document.createElement("button");
bd.className="shb";sh.className="shs";tt.className="sht";sh.setAttribute("role","dialog");sh.setAttribute("aria-label","शेयर करें");
bt.className="shf";bt.setAttribute("aria-label","शेयर करें");bt.title="शेयर करें";
bt.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 10.5l6.8-4M8.6 13.5l6.8 4"/></svg>';
function toast(m){tt.textContent=m;tt.className="sht on";setTimeout(function(){tt.className="sht"},1800)}
function close(){bd.className="shb";sh.className="shs"}
function copy(d){var s=d.text+"\n"+d.url;
 if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(s).then(function(){toast("लिंक कॉपी हो गया")},fb)}else fb();
 function fb(){var t=document.createElement("textarea");t.value=s;t.style.position="fixed";t.style.opacity="0";document.body.appendChild(t);t.select();try{document.execCommand("copy");toast("लिंक कॉपी हो गया")}catch(e){toast("कॉपी नहीं हुआ")}document.body.removeChild(t)}}
function open_(d){
 var u=encodeURIComponent(d.url),t=encodeURIComponent(d.text),both=encodeURIComponent(d.text+"\n"+d.url);
 var L=[["WhatsApp","#25d366","W","https://wa.me/?text="+both],["Telegram","#229ed9","T","https://t.me/share/url?url="+u+"&text="+t],["Facebook","#1877f2","f","https://www.facebook.com/sharer/sharer.php?u="+u],["X (Twitter)","#111","X","https://twitter.com/intent/tweet?text="+t+"&url="+u],["ईमेल","#c2185b","@","mailto:?subject="+encodeURIComponent(d.title)+"&body="+both]];
 sh.innerHTML='<button class="shx" aria-label="बंद करें">✕</button><h4>शेयर करें</h4><p>दोस्तों और परिवार को भेजें</p><div class="shg">'+L.map(function(x){return'<a href="'+x[3]+'" target="_blank" rel="noopener"><i style="background:'+x[1]+'">'+x[2]+'</i>'+x[0]+'</a>'}).join("")+'<button type="button" id="shc"><i style="background:#6a6285">⧉</i>लिंक कॉपी</button></div>';
 sh.querySelector(".shx").onclick=close;sh.querySelector("#shc").onclick=function(){copy(d);close()};
 sh.querySelectorAll("a").forEach(function(a){a.onclick=function(){setTimeout(close,200)}});
 bd.className="shb on";sh.className="shs on"}
function run(d){var coarse=window.matchMedia&&matchMedia("(pointer:coarse)").matches;
 if(navigator.share&&coarse){navigator.share({title:d.title,text:d.text,url:d.url}).catch(function(e){if(e&&e.name!=="AbortError")open_(d)});return}
 open_(d)}
window.AKShare=function(t,u){var d=data();if(t)d.text=t;if(u)d.url=u;run(d)};
document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("[data-sh]");if(!b)return;e.preventDefault();window.AKShare(b.getAttribute("data-t"),b.getAttribute("data-u"))});
bd.onclick=close;document.addEventListener("keydown",function(e){if(e.key==="Escape")close()});
function go(){document.body.appendChild(bd);document.body.appendChild(sh);document.body.appendChild(tt)}
if(document.body)go();else document.addEventListener("DOMContentLoaded",go)
})();
