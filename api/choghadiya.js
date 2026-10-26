// /aaj-ka-choghadiya — दिन-रात के 16 चौघड़िया, शहर के हिसाब से (सर्वर पर बनता है)
const S = "https://aajkarashifal.net";
const R = x => x * Math.PI / 180, N = x => ((x % 360) + 360) % 360, JD = t => t / 864e5 + 2440587.5;
const CT = { "दिल्ली": [28.61, 77.21], "हरिद्वार": [29.95, 78.16], "मुंबई": [19.08, 72.88], "कोलकाता": [22.57, 88.36], "चेन्नई": [13.08, 80.27], "बेंगलुरु": [12.97, 77.59], "लखनऊ": [26.85, 80.95], "जयपुर": [26.91, 75.79], "पटना": [25.59, 85.14], "अहमदाबाद": [23.02, 72.57], "हैदराबाद": [17.39, 78.49] };
const DY = "रविवार,सोमवार,मंगलवार,बुधवार,गुरुवार,शुक्रवार,शनिवार".split(",");
const MO = "जनवरी,फ़रवरी,मार्च,अप्रैल,मई,जून,जुलाई,अगस्त,सितंबर,अक्टूबर,नवंबर,दिसंबर".split(",");
// चक्र: उद्वेग, चल, लाभ, अमृत, काल, शुभ, रोग
const CY = [["उद्वेग", 0, "अशुभ", "सरकारी काम और अधिकारियों से बात ठीक, बाकी नया काम टालें"], ["चल", 1, "सामान्य", "यात्रा के लिए ठीक"], ["लाभ", 2, "शुभ", "व्यापार, पढ़ाई और नया काम शुरू करने के लिए अच्छा"], ["अमृत", 2, "शुभ", "हर शुभ काम के लिए सबसे अच्छा"], ["काल", 0, "अशुभ", "शुभ काम न करें"], ["शुभ", 2, "शुभ", "पूजा, विवाह और मंगल कार्य के लिए अच्छा"], ["रोग", 0, "अशुभ", "नया काम और लेन-देन टालें"]];
const DS = [0, 3, 6, 2, 5, 1, 4]; // दिन का पहला चौघड़िया (रवि..शनि) = उद्वेग, अमृत, रोग, लाभ, शुभ, चल, काल
const NS = [5, 1, 4, 0, 3, 6, 2];  // रात का पहला = शुभ, चल, काल, उद्वेग, अमृत, रोग, लाभ
const sunL = d => N(280.46 + .9856474 * d + 1.915 * Math.sin(R(357.528 + .9856003 * d)) + .02 * Math.sin(R(2 * (357.528 + .9856003 * d))));
function sun(y, mo, da, lat, lon) {
  const n = Math.floor((Date.UTC(y, mo, da) - Date.UTC(y, 0, 0)) / 864e5), B = R(360 * (n - 81) / 364),
    e = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B), d = JD(Date.UTC(y, mo, da, 6, 30)) - 2451545,
    dc = Math.asin(Math.sin(R(23.44)) * Math.sin(R(sunL(d)))),
    h = Math.acos((Math.sin(R(-.833)) - Math.sin(R(lat)) * Math.sin(dc)) / (Math.cos(R(lat)) * Math.cos(dc))) * 180 / Math.PI / 15,
    nn = 12 - (lon - 82.5) / 15 - e / 60;
  return [nn - h, nn + h];
}
const hm = h => { const m = Math.round(h * 60), a = Math.floor(m / 60) % 24; return (a % 12 || 12) + ":" + String(m % 60).padStart(2, "0") + (a >= 12 ? " PM" : " AM"); };
const ist = () => { const d = new Date(Date.now() + 19800000); return [d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()]; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function calc(y, mo, da, city) {
  const [lat, lon] = CT[city], w = new Date(Date.UTC(y, mo, da)).getUTCDay(), nx = new Date(Date.UTC(y, mo, da + 1));
  const [sr, ss] = sun(y, mo, da, lat, lon), [sr2] = sun(nx.getUTCFullYear(), nx.getUTCMonth(), nx.getUTCDate(), lat, lon);
  const dl = (ss - sr) / 8, nl = (sr2 + 24 - ss) / 8, out = [];
  for (let i = 0; i < 8; i++) out.push({ n: false, i: CY[(DS[w] + i) % 7], a: sr + i * dl, b: sr + (i + 1) * dl });
  for (let i = 0; i < 8; i++) out.push({ n: true, i: CY[(NS[w] + i) % 7], a: ss + i * nl, b: ss + (i + 1) * nl });
  return { w, sr, ss, out };
}
const CL = ["#fde0e0", "#fff3c4", "#dff5e6"];
function page(city, today) {
  const [y, mo, da] = today, C = calc(y, mo, da, city), lb = `${da} ${MO[mo]} ${y}`, dn = DY[C.w];
  const good = C.out.filter(x => x.i[1] == 2 && !x.n).map(x => `${x.i[0]} (${hm(x.a)} – ${hm(x.b)})`);
  const title = `आज का चौघड़िया ${lb} (${dn}): ${city} के लिए दिन-रात के शुभ-अशुभ समय`;
  const desc = `${lb}, ${dn} का चौघड़िया, ${city} के अनुसार। अमृत, शुभ, लाभ, चल, काल, रोग और उद्वेग का पूरा समय और अभी कौन सा चौघड़िया चल रहा है।`;
  const canon = city == "दिल्ली" ? S + "/aaj-ka-choghadiya" : `${S}/aaj-ka-choghadiya?c=${encodeURIComponent(city)}`;
  const row = x => `<tr data-a="${Math.round(x.a * 60)}" data-b="${Math.round(x.b * 60)}" style="background:${CL[x.i[1]]}"><td><b>${x.i[0]}</b></td><td>${hm(x.a)} – ${hm(x.b)}</td><td><b>${x.i[2]}</b></td><td class="x">${x.i[3]}</td></tr>`;
  const tb = (arr, h) => `<h2>${h}</h2><div class="tw"><table><thead><tr><th>चौघड़िया</th><th>समय</th><th>फल</th><th>किसके लिए</th></tr></thead><tbody>${arr.map(row).join("")}</tbody></table></div>`;
  const faq = [["चौघड़िया क्या होता है?", "चौघड़िया दिन और रात को आठ-आठ बराबर भागों में बांटकर बनाया गया समय है। हर भाग लगभग डेढ़ घंटे का होता है और उसका एक नाम और फल होता है।"],
    ["कौन से चौघड़िया शुभ माने जाते हैं?", "अमृत, शुभ और लाभ शुभ माने जाते हैं। चल सामान्य है, जबकि उद्वेग, काल और रोग अशुभ माने जाते हैं।"],
    ["चौघड़िया का समय हर शहर में अलग क्यों होता है?", "क्योंकि इसकी गणना सूर्योदय और सूर्यास्त से होती है, जो हर शहर में अलग समय पर होते हैं।"]];
  const ld = [{ "@context": "https://schema.org", "@type": "Article", headline: title, description: desc, inLanguage: "hi", mainEntityOfPage: canon, datePublished: `${y}-${String(mo + 1).padStart(2, "0")}-${String(da).padStart(2, "0")}`, image: S + "/og-image.jpg", author: { "@type": "Organization", name: "आज का राशिफल" }, publisher: { "@type": "Organization", name: "आज का राशिफल", logo: { "@type": "ImageObject", url: S + "/icon-512.png" } } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }];
  const CSS = `*{box-sizing:border-box}body{margin:0;background:#f8f6fd;color:#241b3d;font:16px/1.7 "Noto Sans Devanagari",system-ui,sans-serif}.w{max-width:900px;margin:0 auto;padding:0 18px}.nb{background:#fff6ea;border-bottom:1px solid #e6e0f3;position:sticky;top:0;z-index:5}.nbi{display:flex;align-items:center;justify-content:space-between;padding:10px 18px;gap:10px}.brand{display:flex;align-items:center;gap:10px;font-weight:600;font-size:1.1rem;color:#0f6b7d;text-decoration:none}.lg{width:54px;height:54px;border-radius:24%;overflow:hidden;display:block;box-shadow:0 2px 8px rgba(20,12,50,.25)}.lg img{width:100%;height:100%;object-fit:contain}.cta{background:#f5a90d;color:#241b3d;border-radius:999px;padding:7px 18px;font-weight:600;text-decoration:none;font-size:.9rem}main{padding:24px 18px 50px}.bc{font-size:.85rem;color:#6a6285;margin:0 0 10px}.bc a{color:#6a6285}h1{font-size:clamp(1.6rem,5vw,2.3rem);line-height:1.3;margin:0 0 6px}h2{font-size:1.35rem;margin:26px 0 8px;color:#0f6b7d}
.now{background:#fff;border:2px solid #f5a90d;border-radius:16px;padding:12px 18px;margin:14px 0}.now b{font-size:1.25rem}.tw{overflow-x:auto}table{border-collapse:collapse;width:100%;background:#fff;border-radius:12px;overflow:hidden}th,td{padding:8px 12px;text-align:left;border-bottom:1px solid #e6e0f3;font-size:.95rem}th{background:#fff6ea}td.x{color:#6a6285;font-size:.88rem}tr.cur{outline:3px solid #c2185b;outline-offset:-3px}
select,button{font:inherit;padding:7px 12px;border-radius:10px;border:1px solid #e6e0f3;background:#fff}button{background:#f5a90d;border:0;font-weight:600}.note{background:#fff3d6;border:1px solid #f0d67a;border-radius:12px;padding:10px 14px;font-size:.9rem;margin-top:22px}details{background:#fff;border:1px solid #e6e0f3;border-radius:12px;padding:8px 14px;margin:8px 0}summary{cursor:pointer;font-weight:600}.go{background:#f5a90d;color:#241b3d;border-radius:999px;padding:8px 20px;font-weight:600;text-decoration:none;display:inline-block}footer{border-top:1px solid #e6e0f3;padding:22px 0 40px;color:#6a6285;font-size:.88rem;text-align:center}footer a{margin:0 6px;color:#241b3d}@media(max-width:560px){td.x{display:none}th:last-child{display:none}}`;
  const JS = `(function(){try{var n=new Date(Date.now()+19800000),m=n.getUTCHours()*60+n.getUTCMinutes(),rows=document.querySelectorAll("tr[data-a]"),f=null;for(var i=0;i<rows.length;i++){var a=+rows[i].dataset.a,b=+rows[i].dataset.b;if((m>=a&&m<b)||(m+1440>=a&&m+1440<b)){f=rows[i];break}}if(f){f.className="cur";var c=f.children;document.getElementById("nw").innerHTML="अभी चल रहा है: <b>"+c[0].textContent+"</b> ("+c[1].textContent+") · "+c[2].textContent}else{document.getElementById("nw").textContent="नीचे सारी तालिका देखें।"}}catch(e){}})();`;
  const opts = Object.keys(CT).map(c => `<option${c == city ? " selected" : ""}>${c}</option>`).join("");
  return `<!DOCTYPE html><html lang="hi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(desc)}"><link rel="canonical" href="${canon}"><meta property="og:type" content="article"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${canon}"><meta property="og:site_name" content="आज का राशिफल"><meta property="og:image" content="${S}/og-image.jpg"><meta name="twitter:card" content="summary_large_image"><meta name="theme-color" content="#0f6b7d"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png"><link rel="manifest" href="/manifest.json"><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet"><style>${CSS}</style>${ld.map(x => '<script type="application/ld+json">' + JSON.stringify(x) + "</script>").join("")}</head><body><nav class="nb"><div class="w nbi"><a class="brand" href="/"><span class="lg"><img src="/logo.png" alt="आज का राशिफल" width="54" height="54"></span>आज का राशिफल</a><a class="cta" href="/#kundali">फ्री कुंडली</a></div></nav><main class="w"><p class="bc"><a href="/">मुख्य पृष्ठ</a> › आज का चौघड़िया</p><h1>आज का चौघड़िया: ${lb}, ${dn}</h1><p>${city} के सूर्योदय (${hm(C.sr)}) और सूर्यास्त (${hm(C.ss)}) के अनुसार दिन और रात के सभी चौघड़िया। शुभ काम के लिए अमृत, शुभ और लाभ चुनें।</p>
<form method="get" action="/aaj-ka-choghadiya">शहर: <select name="c" onchange="this.form.submit()">${opts}</select> <noscript><button>देखें</button></noscript></form>
<div class="now"><span id="nw">अभी का चौघड़िया देखा जा रहा है…</span></div>
<p><b>आज के दिन के शुभ चौघड़िया:</b> ${good.join(", ") || "—"}</p><p class="shr"><button type="button" class="shi" data-sh data-t="${esc("🕉️ आज का चौघड़िया · " + city + " · " + lb + "\nशुभ समय: " + (good.join(", ") || "—") + "\nपूरी तालिका देखें:")}" data-u="${canon}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 10.5l6.8-4M8.6 13.5l6.8 4"/></svg> चौघड़िया शेयर करें</button></p>
${tb(C.out.filter(x => !x.n), "दिन का चौघड़िया (सूर्योदय से सूर्यास्त)")}${tb(C.out.filter(x => x.n), "रात का चौघड़िया (सूर्यास्त से अगले सूर्योदय)")}
<h2>अक्सर पूछे जाने वाले सवाल</h2>${faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}
<div class="note">समय सूर्योदय-सूर्यास्त की गणना पर आधारित अनुमान है और पंचांग से 1–3 मिनट अलग हो सकता है। ज़रूरी मुहूर्त के लिए स्थानीय पंचांग या पंडित जी से भी मिला लें।</div>
<p style="margin-top:18px"><a class="go" href="/aaj-ka-rashifal">आज का राशिफल</a> <a class="go" href="/">मुख्य पृष्ठ</a></p></main><footer><div class="w"><a href="/">मुख्य पृष्ठ</a> · <a href="/privacy.html">गोपनीयता नीति</a> · <a href="/about.html">हमारे बारे में</a> · <a href="/contact.html">संपर्क</a> · <a href="/disclaimer.html">अस्वीकरण</a><br>© 2026 आज का राशिफल · aajkarashifal.net</div></footer><script>${JS}</script><script src="/share.js" defer></script></body></html>`;
}
module.exports = (req, res) => {
  try {
    let c = new URL(req.url, "http://x").searchParams.get("c") || "दिल्ली"; if (!CT[c]) c = "दिल्ली";
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=900, stale-while-revalidate=3600");
    res.status(200).send(page(c, ist()));
  } catch (e) { res.setHeader("Cache-Control", "no-store"); res.status(500).send("error"); }
};
module.exports._t = { calc, page };
