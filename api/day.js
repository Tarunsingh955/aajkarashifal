// /aaj-ka-rashifal/2026-10-26 — हर तारीख का अलग पेज (सर्वर पर बनता है, Google के लिए)
// बिना तारीख: /aaj-ka-rashifal — पिछले-अगले दिनों की सूची
const { DN, DX } = require("./_daydata");
const S = "https://aajkarashifal.net";
const R = x => x * Math.PI / 180, N = x => ((x % 360) + 360) % 360, JD = t => t / 864e5 + 2440587.5;
const RS = "मेष,वृषभ,मिथुन,कर्क,सिंह,कन्या,तुला,वृश्चिक,धनु,मकर,कुंभ,मीन".split(",");
const SL = "mesh,vrishabh,mithun,kark,singh,kanya,tula,vrishchik,dhanu,makar,kumbh,meen".split(",");
const NK = "अश्विनी,भरणी,कृत्तिका,रोहिणी,मृगशिरा,आर्द्रा,पुनर्वसु,पुष्य,आश्लेषा,मघा,पूर्वा फाल्गुनी,उत्तरा फाल्गुनी,हस्त,चित्रा,स्वाति,विशाखा,अनुराधा,ज्येष्ठा,मूल,पूर्वाषाढ़ा,उत्तराषाढ़ा,श्रवण,धनिष्ठा,शतभिषा,पूर्वा भाद्रपद,उत्तरा भाद्रपद,रेवती".split(",");
const TT = "प्रतिपदा,द्वितीया,तृतीया,चतुर्थी,पंचमी,षष्ठी,सप्तमी,अष्टमी,नवमी,दशमी,एकादशी,द्वादशी,त्रयोदशी,चतुर्दशी".split(",");
const DY = "रविवार,सोमवार,मंगलवार,बुधवार,गुरुवार,शुक्रवार,शनिवार".split(",");
const MO = "जनवरी,फ़रवरी,मार्च,अप्रैल,मई,जून,जुलाई,अगस्त,सितंबर,अक्टूबर,नवंबर,दिसंबर".split(",");
const GH = [[4,3,4,3],[2,2,3,2],[3,4,4,4],[2,2,2,3],[2,3,3,2],[3,4,5,4],[5,4,4,4],[2,2,1,2],[3,2,3,2],[3,5,4,4],[4,4,4,5],[3,2,2,1]];
const GT = ["आज मन में आत्मविश्वास रहेगा और तबीयत ठीक रहेगी। अपने काम को खुद आगे बढ़ाने का अच्छा दिन है।","आज खर्च और बोली पर काबू रखें। पैसे से जुड़ी बात सोच-समझकर करें और बहस से बचें।","आज हिम्मत और मेहनत का साथ मिलेगा। छोटी यात्रा या भाई-बहनों से मिलकर अच्छी खबर मिल सकती है।","आज मन थोड़ा बेचैन रह सकता है। घर और परिवार की बातों में धैर्य रखें और आराम को समय दें।","आज पढ़ाई, बच्चों या फैसलों को लेकर थोड़ी उलझन हो सकती है। जल्दबाज़ी न करें, जानकार से सलाह लें।","आज रुकावटें दूर होंगी और विरोधियों पर भारी रहेंगे। सेहत और काम दोनों में अच्छी प्रगति मिल सकती है।","आज जीवनसाथी या करीबी लोगों से अच्छा तालमेल रहेगा। साझेदारी और मुलाकातों के लिए अच्छा दिन है।","आज सावधान रहने का दिन है। बड़े फैसले, लेन-देन और सफर में जल्दबाज़ी न करें और सेहत का ध्यान रखें।","आज किस्मत थोड़ी देर से साथ देगी। काम में देरी हो तो हिम्मत न हारें और बड़ों का आशीर्वाद लें।","आज काम में सफलता और पहचान मिल सकती है। ज़रूरी काम सुबह ही निपटाएं।","आज पैसे और मन की मुराद पूरी होने के योग हैं। दोस्तों और बड़ों से फायदा मिल सकता है।","आज खर्च बढ़ सकता है और नींद कम आ सकती है। फालतू खर्च से बचें और शांत रहने की कोशिश करें।"];
const LORD = [["सूर्य","नारंगी","आत्मविश्वास और पिता-समान लोगों से मदद का दिन। सरकारी काम निपटाएं।"],["चंद्र","सफेद","मन शांत रखें। परिवार और माँ के साथ समय अच्छा रहेगा।"],["मंगल","लाल","ऊर्जा ज़्यादा रहेगी। जल्दबाज़ी और बहस से बचें।"],["बुध","हरा","बातचीत, पढ़ाई और हिसाब-किताब के लिए अच्छा दिन।"],["गुरु","पीला","सीखने, सलाह लेने और शुभ शुरुआत का दिन।"],["शुक्र","गुलाबी","घर, खरीदारी और रिश्तों के लिए सुखद दिन।"],["शनि","नीला","मेहनत का फल मिलेगा। धैर्य रखें, बड़े जोखिम टालें।"]];
const RN = [9,6,5,2,1,5,6,9,3,8,8,3];
const MW = ["","कमज़ोर","सामान्य","ठीक","अच्छा","बेहतरीन"];
const LAT = 28.61, LON = 77.21; // दिल्ली

const moonL = d => { const D = R(297.85 + 12.190749 * d), M = R(134.963 + 13.064993 * d), Sx = R(357.528 + .9856003 * d); return N(218.316 + 13.176396 * d + 6.289 * Math.sin(M) + 1.274 * Math.sin(2 * D - M) + .658 * Math.sin(2 * D) - .186 * Math.sin(Sx)); };
const ay = d => 23.85 + d / 365.25 * .01397;
const sunL = d => N(280.46 + .9856474 * d + 1.915 * Math.sin(R(357.528 + .9856003 * d)) + .02 * Math.sin(R(2 * (357.528 + .9856003 * d))));
const hm = h => { const m = Math.round(h * 60), a = Math.floor(m / 60) % 24; return (a % 12 || 12) + ":" + String(m % 60).padStart(2, "0") + (a >= 12 ? " PM" : " AM"); };
function sun(y, mo, da) {
  const n = Math.floor((Date.UTC(y, mo, da) - Date.UTC(y, 0, 0)) / 864e5), B = R(360 * (n - 81) / 364),
    e = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B), d = JD(Date.UTC(y, mo, da, 6, 30)) - 2451545,
    dc = Math.asin(Math.sin(R(23.44)) * Math.sin(R(sunL(d)))),
    h = Math.acos((Math.sin(R(-.833)) - Math.sin(R(LAT)) * Math.sin(dc)) / (Math.cos(R(LAT)) * Math.cos(dc))) * 180 / Math.PI / 15,
    nn = 12 - (LON - 82.5) / 15 - e / 60;
  return [nn - h, nn + h];
}
function info(y, mo, da) {
  const w = new Date(Date.UTC(y, mo, da)).getUTCDay(), d = JD(Date.UTC(y, mo, da, 6, 30)) - 2451545,
    ml = moonL(d), sl = sunL(d), el = N(ml - sl), t = Math.floor(el / 12), sm = N(ml - ay(d)), ms = Math.floor(sm / 30),
    [sr, ss] = sun(y, mo, da), ln = (ss - sr) / 8, rk = sr + ([8, 2, 7, 5, 6, 4, 3][w] - 1) * ln, mid = (sr + ss) / 2;
  return { w, ms, pk: t < 15 ? "शुक्ल" : "कृष्ण", tn: t == 14 ? "पूर्णिमा" : t == 29 ? "अमावस्या" : TT[t % 15], nk: NK[Math.floor(sm / (360 / 27))],
    sr: hm(sr), ss: hm(ss), rk: hm(rk) + " – " + hm(rk + ln), ab: hm(mid - .4) + " – " + hm(mid + .4) };
}
function rashi(r, I) {
  const hs = (I.ms - r + 12) % 12, sc = GH[hs], ov = Math.round(sc.reduce((a, b) => a + b) / 4);
  return { hs: hs + 1, sc, ov, txt: GT[hs] + " " + LORD[I.w][2] };
}
const ist = () => { const d = new Date(Date.now() + 19800000); return [d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()]; };
const shift = (y, m, d, k) => { const t = new Date(Date.UTC(y, m, d + k)); return [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()]; };
const iso = (y, m, d) => y + "-" + String(m + 1).padStart(2, "0") + "-" + String(d).padStart(2, "0");
const label = (y, m, d) => d + " " + MO[m] + " " + y;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const CSS = `*{box-sizing:border-box}body{margin:0;background:#f8f6fd;color:#241b3d;font:16px/1.7 "Noto Sans Devanagari",system-ui,sans-serif}.w{max-width:900px;margin:0 auto;padding:0 18px}
.nb{background:#fff6ea;border-bottom:1px solid #e6e0f3;position:sticky;top:0;z-index:5}.nbi{display:flex;align-items:center;justify-content:space-between;padding:10px 18px;gap:10px}
.brand{display:flex;align-items:center;gap:10px;font-weight:600;font-size:1.1rem;color:#0f6b7d;text-decoration:none}.lg{width:54px;height:54px;border-radius:24%;overflow:hidden;display:block;box-shadow:0 2px 8px rgba(20,12,50,.25)}.lg img{width:100%;height:100%;object-fit:contain}
.cta{background:#f5a90d;color:#241b3d;border-radius:999px;padding:7px 18px;font-weight:600;text-decoration:none;font-size:.9rem}
main{padding:24px 18px 50px}.bc{font-size:.85rem;color:#6a6285;margin:0 0 10px}.bc a{color:#6a6285}h1{font-size:clamp(1.6rem,5vw,2.3rem);line-height:1.3;margin:0 0 6px}h2{font-size:1.35rem;margin:28px 0 8px;color:#0f6b7d}
.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:10px;margin:14px 0}.t{background:#fff;border:1px solid #e6e0f3;border-radius:14px;padding:10px 14px}.t small{display:block;color:#6a6285}.t b{display:block}
.rs{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:12px}.c{background:#fff;border:1px solid #e6e0f3;border-radius:14px;padding:12px 16px}.c h3{margin:0 0 4px;font-size:1.1rem}.c h3 a{color:#c2185b;text-decoration:none}
.m{display:inline-block;border-radius:999px;padding:1px 12px;font-size:.85rem;font-weight:600}.c p{margin:6px 0;font-size:.95rem}.c small{color:#6a6285}
.nv{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;margin:20px 0}.nv a,.go{background:#f5a90d;color:#241b3d;border-radius:999px;padding:8px 20px;font-weight:600;text-decoration:none;display:inline-block}
.note{background:#fff3d6;border:1px solid #f0d67a;border-radius:12px;padding:10px 14px;font-size:.9rem;margin-top:22px}.lk{display:flex;flex-wrap:wrap;gap:8px}.lk a{background:#fff;border:1px solid #e6e0f3;border-radius:999px;padding:4px 14px;text-decoration:none;color:#0f6b7d;font-size:.92rem}
footer{border-top:1px solid #e6e0f3;padding:22px 0 40px;color:#6a6285;font-size:.88rem;text-align:center}footer a{margin:0 6px;color:#241b3d}`;
const MCOL = ["", "#fde0e0", "#ffe9c7", "#fff3c4", "#dff5e6", "#c8f0d6"];

function shell(title, desc, canon, body, ld) {
  return `<!DOCTYPE html><html lang="hi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(desc)}"><link rel="canonical" href="${canon}"><meta property="og:type" content="article"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${canon}"><meta property="og:site_name" content="आज का राशिफल"><meta property="og:image" content="${S}/og-image.jpg"><meta name="twitter:card" content="summary_large_image"><meta name="theme-color" content="#0f6b7d"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png?v=2"><link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png?v=2"><link rel="manifest" href="/manifest.json"><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet"><style>${CSS}</style>${ld.map(x => '<script type="application/ld+json">' + JSON.stringify(x) + "</script>").join("")}<style>/*SH*/.shi{position:relative;display:inline-flex;align-items:center;gap:8px;cursor:pointer;width:auto;height:auto;padding:10px 22px;border-radius:999px;color:#2b2236;font:600 .95rem "Noto Sans Devanagari",system-ui,sans-serif;letter-spacing:.2px;border:1px solid rgba(255,255,255,.95);background:linear-gradient(180deg,rgba(255,255,255,.95) 0%,rgba(243,238,250,.7) 55%,rgba(255,255,255,.85) 100%);-webkit-backdrop-filter:blur(12px) saturate(1.4);backdrop-filter:blur(12px) saturate(1.4);box-shadow:inset 0 1.5px 1px rgba(255,255,255,1),inset 0 -3px 8px rgba(120,90,160,.14),0 8px 18px rgba(60,40,90,.18),0 1px 3px rgba(60,40,90,.2);transition:transform .18s,box-shadow .18s}.shi:hover{transform:translateY(-1px);box-shadow:inset 0 1.5px 1px #fff,inset 0 -3px 8px rgba(120,90,160,.14),0 12px 22px rgba(60,40,90,.22),0 1px 3px rgba(60,40,90,.2)}.shi:active{transform:translateY(1px) scale(.98);box-shadow:inset 0 2px 6px rgba(120,90,160,.25),0 2px 6px rgba(60,40,90,.15)}.shi svg{width:18px;height:18px;flex:none;color:#c2185b;filter:drop-shadow(0 1px 1px rgba(194,24,91,.25))}.shi::after{content:"✦";color:#f5a90d;font-size:.8em;margin-left:-2px;text-shadow:0 0 6px rgba(245,169,13,.6)}.shi.sm{padding:4px 13px;font-size:.78rem;gap:5px}.shi.sm svg{width:14px;height:14px}.shi.sm::after{display:none}.shr{margin:14px 0}</style></head><body><nav class="nb"><div class="w nbi" style="padding:10px 18px"><a class="brand" href="/"><span class="lg"><img src="/logo.png?v=2" alt="आज का राशिफल" width="54" height="54"></span>आज का राशिफल</a><a class="cta" href="/#kundali">फ्री कुंडली</a></div></nav><main class="w">${body}</main><footer><div class="w"><a href="/">मुख्य पृष्ठ</a> · <a href="/privacy.html">गोपनीयता नीति</a> · <a href="/about.html">हमारे बारे में</a> · <a href="/contact.html">संपर्क</a> · <a href="/disclaimer.html">अस्वीकरण</a><br>© 2026 आज का राशिफल · aajkarashifal.net</div></footer><script src="/share.js" defer></script></body></html>`;
}

function dayPage(y, m, d, today) {
  const I = info(y, m, d), lb = label(y, m, d), dn = DY[I.w], k = iso(y, m, d);
  const isToday = k === iso(...today), tag = isToday ? "आज" : "";
  const title = `${tag ? "आज का राशिफल" : "राशिफल"} ${lb} (${dn}): सभी 12 राशियों का हाल, पंचांग और राहु काल`;
  const desc = `${lb}, ${dn} का राशिफल: मेष से मीन तक सभी राशियों का दिन, ${I.pk} पक्ष ${I.tn} तिथि, ${I.nk} नक्षत्र, राहु काल ${I.rk} और शुभ मुहूर्त।`;
  const canon = `${S}/aaj-ka-rashifal/${k}`;
  const prev = shift(y, m, d, -1), next = shift(y, m, d, 1), T = [y, m, d];
  const inRange = (a) => Math.abs((Date.UTC(...a) - Date.UTC(...today)) / 864e5) <= 30;
  const cards = RS.map((n, r) => {
    const x = rashi(r, I);
    return `<div class="c"><h3><a href="/${SL[r]}-rashi.html">${n} राशि</a> <span class="m" style="background:${MCOL[x.ov]}">${MW[x.ov]} दिन</span></h3><p>${x.txt}</p><small>प्रेम ${MW[x.sc[0]]} · करियर ${MW[x.sc[1]]} · स्वास्थ्य ${MW[x.sc[2]]} · धन ${MW[x.sc[3]]}<br>शुभ रंग ${LORD[I.w][1]} · शुभ अंक ${RN[r]}</small></div>`;
  }).join("");
  const body = `<p class="bc"><a href="/">मुख्य पृष्ठ</a> › <a href="/aaj-ka-rashifal">रोज़ का राशिफल</a> › ${lb}</p><h1>${tag ? "आज का राशिफल" : "राशिफल"}: ${lb}, ${dn}</h1><p>${lb} को चंद्रमा ${RS[I.ms]} राशि में रहेगा। नीचे सभी 12 राशियों का दिन, साथ में आज का पंचांग, राहु काल और शुभ मुहूर्त दिया है।</p><p class="shr"><button type="button" class="shi" data-sh data-t="${esc("🪔 राशिफल " + lb + " (" + dn + ")\n📿 " + I.pk + " पक्ष " + I.tn + ", नक्षत्र " + I.nk + ", चंद्रमा " + RS[I.ms] + " राशि में\n✅ अभिजित मुहूर्त " + I.ab + "\n⛔ राहु काल " + I.rk + "\nसभी 12 राशियों का हाल देखें:")}" data-u="${canon}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 10.5l6.8-4M8.6 13.5l6.8 4"/></svg> आज का दिन शेयर करें</button></p>
<h2>पंचांग (दिल्ली के अनुसार)</h2><div class="g"><div class="t"><small>वार</small><b>${dn}</b></div><div class="t"><small>तिथि</small><b>${I.pk} पक्ष ${I.tn}</b></div><div class="t"><small>नक्षत्र</small><b>${I.nk}</b></div><div class="t"><small>चंद्र राशि</small><b>${RS[I.ms]}</b></div><div class="t"><small>सूर्योदय / सूर्यास्त</small><b>${I.sr} / ${I.ss}</b></div><div class="t"><small>⛔ राहु काल (अशुभ)</small><b>${I.rk}</b></div><div class="t"><small>✅ अभिजित मुहूर्त (शुभ)</small><b>${I.ab}</b></div><div class="t"><small>🪔 आज के देव</small><b>${DN[I.w]}</b></div></div>
<h2>12 राशियों का राशिफल</h2><div class="rs">${cards}</div>
<h2>${dn} को क्या न करें</h2><p>${DX[I.w]}। राहु काल ${I.rk} में कोई नया और बड़ा शुभ काम शुरू करने से बचें।</p>
<div class="nv">${inRange(prev) ? `<a href="/aaj-ka-rashifal/${iso(...prev)}">‹ ${label(...prev)}</a>` : "<span></span>"}${inRange(next) ? `<a href="/aaj-ka-rashifal/${iso(...next)}">${label(...next)} ›</a>` : "<span></span>"}</div>
<div class="note">दैनिक फल सामान्य मार्गदर्शन और मनोरंजन के लिए है, यह ग्रहों की चाल पर आधारित अनुमान है। समय दिल्ली के लिए हैं और दूसरे शहरों में थोड़ा बदल सकते हैं। पूरा हाल, अपनी राशि और नोटिफिकेशन के लिए <a href="/">मुख्य पृष्ठ</a> देखें।</div><p><a class="go" href="/">अपनी राशि का पूरा हाल देखें</a></p>`;
  const ld = [{ "@context": "https://schema.org", "@type": "Article", headline: title, description: desc, inLanguage: "hi", mainEntityOfPage: canon, datePublished: k, dateModified: k, image: S + "/og-image.jpg", author: { "@type": "Organization", name: "आज का राशिफल" }, publisher: { "@type": "Organization", name: "आज का राशिफल", logo: { "@type": "ImageObject", url: S + "/icon-512.png" } } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "मुख्य पृष्ठ", item: S + "/" }, { "@type": "ListItem", position: 2, name: "रोज़ का राशिफल", item: S + "/aaj-ka-rashifal" }, { "@type": "ListItem", position: 3, name: lb, item: canon }] }];
  return shell(title, desc, canon, body, ld);
}

function hub(today) {
  const [y, m, d] = today;
  const items = []; for (let k = 7; k >= -7; k--) items.push(shift(y, m, d, k));
  const body = `<p class="bc"><a href="/">मुख्य पृष्ठ</a> › रोज़ का राशिफल</p><h1>रोज़ का राशिफल: आज, कल और पिछले दिन</h1><p>किसी भी दिन का राशिफल, पंचांग और राहु काल देखने के लिए तारीख चुनें।</p><p><a class="go" href="/aaj-ka-rashifal/${iso(y, m, d)}">आज का राशिफल (${label(y, m, d)})</a></p><div class="lk">${items.map(a => `<a href="/aaj-ka-rashifal/${iso(...a)}">${a[2]} ${MO[a[1]]} · ${DY[new Date(Date.UTC(...a)).getUTCDay()]}</a>`).join("")}</div>`;
  return shell("रोज़ का राशिफल: आज, कल और पिछले दिनों का राशिफल, पंचांग | आज का राशिफल", "आज और आस-पास की तारीखों का राशिफल, पंचांग और राहु काल। मेष से मीन तक सभी 12 राशियों का दिन एक जगह।", S + "/aaj-ka-rashifal", body, []);
}

function sitemap(today) {
  const [y, m, d] = today; let u = `<url><loc>${S}/aaj-ka-rashifal</loc><changefreq>daily</changefreq><priority>0.8</priority></url>`;
  for (let k = -7; k <= 7; k++) { const a = shift(y, m, d, k); u += `<url><loc>${S}/aaj-ka-rashifal/${iso(...a)}</loc><lastmod>${iso(...a)}</lastmod><changefreq>daily</changefreq><priority>${k === 0 ? "0.9" : "0.6"}</priority></url>`; }
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${u}</urlset>`;
}

module.exports = async (req, res) => {
  const q = new URL(req.url, "http://x").searchParams, today = ist();
  try {
    if (q.get("sitemap")) { res.setHeader("Content-Type", "application/xml; charset=utf-8"); res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400"); return res.status(200).send(sitemap(today)); }
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    const dd = q.get("d");
    if (!dd) { res.setHeader("Cache-Control", "public, s-maxage=1800, stale-while-revalidate=86400"); return res.status(200).send(hub(today)); }
    const mt = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dd);
    if (mt) {
      const y = +mt[1], m = +mt[2] - 1, d = +mt[3], t = new Date(Date.UTC(y, m, d));
      const ok = t.getUTCFullYear() === y && t.getUTCMonth() === m && t.getUTCDate() === d, diff = (t - Date.UTC(...today)) / 864e5;
      if (ok && Math.abs(diff) <= 30) { res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400"); return res.status(200).send(dayPage(y, m, d, today)); }
    }
    res.setHeader("Cache-Control", "public, s-maxage=600");
    res.status(404).send(shell("पेज नहीं मिला | आज का राशिफल", "यह तारीख उपलब्ध नहीं है।", S + "/aaj-ka-rashifal", `<h1>यह तारीख उपलब्ध नहीं है</h1><p>आज से 30 दिन आगे-पीछे की तारीखें ही देखी जा सकती हैं।</p><p><a class="go" href="/aaj-ka-rashifal">रोज़ का राशिफल</a></p>`, []));
  } catch (e) { res.setHeader("Cache-Control", "no-store"); res.status(500).send("error"); }
};
module.exports._t = { dayPage, hub, sitemap, info };
