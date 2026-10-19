// /api/rates — सोना-चांदी का भाव अपने आप लाता है।
// 1) goodreturns.in से भाव पढ़ता है (scrape)
// 2) अंतरराष्ट्रीय भाव + डॉलर-रुपया से अनुमान निकालता है (cross-check और backup)
// scrape किया हुआ भाव तभी माना जाता है जब वह अनुमान से ±12% के अंदर हो, वरना अनुमान ही दिखता है।
// ब्राउज़र/Vercel इसे 30 मिनट cache करते हैं, इसलिए साइट पर बोझ नहीं पड़ता।

const UA = "Mozilla/5.0 (compatible; AajKaRashifalBot/1.0; +https://aajkarashifal.net)";
const MONTHS = "जनवरी,फ़रवरी,मार्च,अप्रैल,मई,जून,जुलाई,अगस्त,सितंबर,अक्टूबर,नवंबर,दिसंबर".split(",");
const DUTY = 1.06 * 1.03; // आयात शुल्क + GST का मोटा अंदाज़ा
const TOL = 0.12;

const get = async (url, type, log) => {
  try {
    const r = await fetch(url, { headers: { "user-agent": UA, accept: "*/*" }, signal: AbortSignal.timeout(7000) });
    if (!r.ok) throw new Error("HTTP " + r.status);
    return type === "json" ? await r.json() : await r.text();
  } catch (e) { log.push(url + " -> " + e.message); return null; }
};

const text = h => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#8377;|&#x20b9;|&rupee;/gi, " ").replace(/\s+/g, " ");
const num = s => parseInt(String(s).replace(/,/g, ""), 10);
const inr = n => Math.round(n).toLocaleString("en-IN");

// "24 Carat Gold" के बाद वाली तालिका में "10 gram" की पंक्ति
function goldFrom(t, k) {
  const re = new RegExp(k + "\\s*(?:K\\b|Carat|Karat)[^]{0,80}?Gold", "ig");
  let m;
  while ((m = re.exec(t))) {
    const seg = t.slice(m.index, m.index + 2500);
    const x = seg.match(/\b10\s*(?:gram|grams|gm|g)\b[^0-9]{0,40}([\d,]{5,9})/i);
    if (x) return num(x[1]);
  }
  return null;
}
function silverFrom(t) {
  const re = /Silver[^]{0,80}?(?:Price|Rate)/ig;
  let m;
  while ((m = re.exec(t))) {
    const seg = t.slice(m.index, m.index + 2500);
    const x = seg.match(/\b1\s*(?:kg|kilogram|kilo)\b[^0-9]{0,40}([\d,]{5,9})/i);
    if (x) return num(x[1]);
  }
  return null;
}

async function compute(debug) {
  const log = [];
  const [xau, xag, fx, gh, sh] = await Promise.all([
    get("https://api.gold-api.com/price/XAU", "json", log),
    get("https://api.gold-api.com/price/XAG", "json", log),
    get("https://open.er-api.com/v6/latest/USD", "json", log),
    get("https://www.goodreturns.in/gold-rates/", "text", log),
    get("https://www.goodreturns.in/silver-rates/", "text", log),
  ]);

  const usdinr = fx && fx.rates && fx.rates.INR;
  let estG = null, estS = null;
  if (usdinr && xau && xau.price) estG = xau.price * usdinr / 31.1035 * 10 * DUTY;
  if (usdinr && xag && xag.price) estS = xag.price * usdinr / 31.1035 * 1000 * DUTY;

  let g24 = gh ? goldFrom(text(gh), "24") : null;
  let g22 = gh ? goldFrom(text(gh), "22") : null;
  let sv = sh ? silverFrom(text(sh)) : null;

  const raw = { g24, g22, sv };
  const ok = (v, est) => v && (!est || Math.abs(v - est) / est <= TOL);
  const live = { g24: ok(g24, estG), g22: ok(g22, estG && estG * 22 / 24), sv: ok(sv, estS) };
  if (!live.g24) g24 = estG ? Math.round(estG) : null;
  if (!live.g22) g22 = g24 ? Math.round(g24 * 22 / 24) : null;
  if (!live.sv) sv = estS ? Math.round(estS) : null;

  const allLive = live.g24 && live.g22 && live.sv;
  const ist = new Date(Date.now() + 5.5 * 3600e3);
  const rd = ist.getUTCDate() + " " + MONTHS[ist.getUTCMonth()] + " " + ist.getUTCFullYear();

  const out = {
    g24: g24 ? inr(g24) : "", g22: g22 ? inr(g22) : "", sv: sv ? inr(sv) : "",
    rd, src: allLive ? "live" : (g24 || sv ? "est" : "none"),
  };
  if (debug) {
    const sn = (h, re, n) => { if (!h) return []; const t = text(h), r = [], g = new RegExp(re, "ig"); let m; while ((m = g.exec(t)) && r.length < n) r.push(t.slice(Math.max(0, m.index - 60), m.index + 160)); return r; };
    out.raw = { g24: raw.g24, g22: raw.g22, sv: raw.sv };
    out.snip = { gold10: sn(gh, "\\b10\\s*(?:gram|grams|gm|g)\\b", 3), gold24: sn(gh, "24\\s*(?:K\\b|Carat|Karat)", 2), silver1kg: sn(sh, "\\b1\\s*(?:kg|kilogram|kilo)\\b", 3), silverWord: sn(sh, "Silver\\s*(?:Price|Rate)", 2) };
  }
  if (debug) out.debug = { log, usdinr, estG: estG && Math.round(estG), estS: estS && Math.round(estS), live, ghLen: gh && gh.length, shLen: sh && sh.length };
  return out;
}

module.exports = async (req, res) => {
  const debug = req.url && /[?&]debug=1/.test(req.url);
  try {
    const out = await compute(debug);
    res.setHeader("Cache-Control", debug ? "no-store" : "public, s-maxage=1800, stale-while-revalidate=7200");
    res.status(out.src === "none" ? 503 : 200).json(out);
  } catch (e) {
    res.setHeader("Cache-Control", "no-store");
    res.status(500).json({ src: "none", error: String(e && e.message || e) });
  }
};
module.exports._t = { goldFrom, silverFrom, text, compute };
