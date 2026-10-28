(function(){
if(window.__nv)return;window.__nv=1;
var L=[["⏰","आज का चौघड़िया","दिन-रात के शुभ-अशुभ समय","/aaj-ka-choghadiya"],["🚗","गाड़ी खरीदने का मुहूर्त","अपनी राशि के अनुसार शुभ दिन","/vahan-kharidne-ka-shubh-muhurat.html"],["💍","कुंडली मिलान","वर-वधू के 36 गुण","/kundali-milan.html"],["🪔","त्योहार और व्रत","आने वाली तारीखें और मुहूर्त","/#fst"],["🗓️","रोज़ का राशिफल","आज, कल और पिछले दिन","/aaj-ka-rashifal"]];
var css='.nvw{position:relative;flex:none}.nvb{display:inline-flex;align-items:center;gap:6px;border:1px solid #f0d9a6;background:linear-gradient(180deg,#fffdf6,#fff1cf);color:#7a4a00;font:700 .92rem "Noto Sans Devanagari",system-ui,sans-serif;padding:8px 14px;border-radius:999px;cursor:pointer;box-shadow:0 2px 8px rgba(180,120,20,.18);white-space:nowrap}.nvb i{font-style:normal;font-size:.7rem;transition:transform .2s}.nvb[aria-expanded=true] i{transform:rotate(180deg)}'+
'.nvp{position:fixed;top:68px;right:10px;width:min(330px,calc(100vw - 20px));background:#fff;border:1px solid #e6e0f3;border-radius:16px;box-shadow:0 18px 40px rgba(30,20,60,.28);padding:8px;z-index:200;display:none}.nvp.on{display:block;animation:nvi .18s ease}@keyframes nvi{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}'+
'.nvp a{display:flex;gap:12px;align-items:center;padding:10px 12px;border-radius:12px;text-decoration:none;color:#241b3d}.nvp a:hover,.nvp a:focus{background:#fff6e6}.nvp a span{font-size:1.5rem;width:34px;text-align:center}.nvp b{display:block;font:600 .98rem "Noto Sans Devanagari",system-ui,sans-serif}.nvp small{display:block;color:#6a6285;font:400 .8rem "Noto Sans Devanagari",system-ui,sans-serif}.nvp .hd{padding:6px 12px 4px;font:700 .75rem system-ui;letter-spacing:.06em;color:#b0791a;text-transform:uppercase}'+
'@media(min-width:461px){.nb .brand,.nb .nl a{white-space:nowrap}.nb .nl{gap:12px}.nb .nl a:nth-child(n+5){display:none}}@media(max-width:460px){.nvb{padding:7px 11px;font-size:.84rem}.nb .brand{font-size:1rem;gap:6px}}';
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
function build(){var bar=document.querySelector("nav.nb .nbi");if(!bar||bar.querySelector(".nvw"))return;
 var w=document.createElement("div");w.className="nvw";
 w.innerHTML='<button type="button" class="nvb" aria-haspopup="true" aria-expanded="false">शुभ मुहूर्त <i>▼</i></button><div class="nvp" role="menu"><div class="hd">शुभ मुहूर्त और मिलान</div>'+L.map(function(x){return'<a role="menuitem" href="'+x[3]+'"><span>'+x[0]+'</span><div><b>'+x[1]+'</b><small>'+x[2]+'</small></div></a>'}).join("")+'</div>';
 var ref=bar.querySelector(".cs")||bar.querySelector(".cta");
 if(ref&&ref.parentNode===bar)bar.insertBefore(w,ref);else bar.appendChild(w);
 var b=w.querySelector(".nvb"),p=w.querySelector(".nvp");
 function pos(){var r=bar.getBoundingClientRect(),br=b.getBoundingClientRect();p.style.top=Math.max(r.bottom+4,8)+"px";if(innerWidth>520){p.style.right="auto";p.style.left=Math.max(10,Math.min(br.right-p.offsetWidth,innerWidth-p.offsetWidth-10))+"px"}else{p.style.left="";p.style.right="10px"}}
 function close(){p.className="nvp";b.setAttribute("aria-expanded","false")}
 b.onclick=function(e){e.stopPropagation();var o=p.className.indexOf("on")>=0;if(o)close();else{p.className="nvp on";pos();b.setAttribute("aria-expanded","true")}};
 document.addEventListener("click",function(e){if(!w.contains(e.target))close()});
 document.addEventListener("keydown",function(e){if(e.key==="Escape")close()});
 window.addEventListener("scroll",function(){if(p.className.indexOf("on")>=0)pos()},{passive:true});
 p.addEventListener("click",function(e){if(e.target.closest("a"))setTimeout(close,50)})}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",build);else build()
})();
