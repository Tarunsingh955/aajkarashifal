# रोज़ की सूचना (Daily notification) - सेटअप गाइड

**क्या होता है:** यूज़र राशि चुनकर सूचना चालू करता है। हर सुबह ~7 बजे (IST) उसे सूचना आती है: "🪔 कर्क राशि · आज का दिन सामान्य" + एक छोटी लाइन। सूचना पर टैप करने पर साइट खुलती है और पूरा हाल (शुभ समय, राहु काल, 7 दिन) वहीं दिखता है।

## 1. डेटाबेस (मुफ़्त)
Vercel Dashboard → Storage → **Upstash Redis** जोड़ें और प्रोजेक्ट से connect करें। इससे `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` (या `KV_REST_API_URL` / `KV_REST_API_TOKEN`) अपने आप जुड़ जाते हैं।

## 2. VAPID चाबियाँ
अपने कंप्यूटर पर: `npx web-push generate-vapid-keys`

Vercel → Settings → Environment Variables में डालें:
- `VAPID_PUBLIC` = public key
- `VAPID_PRIVATE` = private key (किसी को न दें)
- `VAPID_SUBJECT` = `mailto:आपका-ईमेल@example.com`
- `CRON_SECRET` = कोई लंबा random पासवर्ड

फिर **public key** को `index.html` में खोजें `const VAPID_PUBLIC=""` और उसमें चिपकाएं (या `config.json` में `{"vapid":"..."}`).

## 3. Deploy
इस पूरे फ़ोल्डर को Vercel पर deploy करें (`index.html`, `sw.js`, `manifest.json`, `icon-*.png`, `api/`, `package.json`, `vercel.json`). साइट https पर होनी चाहिए।

## 4. जाँच
1. साइट खोलें → "रोज़ की सूचना" → **टेस्ट सूचना देखें** (यह सर्वर के बिना चलती है)।
2. **सूचना चालू करें** दबाएं और अनुमति दें।
3. सर्वर से भेजकर देखें:  
   `curl -H "Authorization: Bearer <CRON_SECRET>" https://आपकी-साइट/api/send`

## ध्यान रखें
- iPhone (iOS 16.4+) पर सूचना तभी आती है जब साइट को **Add to Home Screen** किया गया हो।
- Vercel Hobby प्लान में cron दिन में एक बार चलता है और समय ±1 घंटा आगे-पीछे हो सकता है। सबके लिए एक ही समय है।
- एक बार में बहुत सारे यूज़र हों (कुछ हज़ार) तो function का समय सीमा पार हो सकती है; तब भेजने का काम टुकड़ों में बांटना पड़ेगा।
- सर्वर पर सिर्फ राशि और ब्राउज़र का push-पता रखा जाता है। अपनी Privacy Policy में यह ज़रूर लिखें।
- सूचना का मूड पेज और सर्वर पर एक ही चंद्र-गोचर गणना से बनता है। `index.html` में GH, moonL या ay बदलें तो `api/_teaser.js` में भी वही बदलाव करें।


## लॉन्च से पहले ज़रूर भरें: config.json
`config.json` खोलकर `"email"` में अपना संपर्क ईमेल और `"owner"` में अपना (या बिज़नेस का) नाम लिखें। इनसे Contact और Privacy पेज अपने-आप भर जाते हैं। ईमेल खाली रहा तो पेज पर "ईमेल जल्द जोड़ा जाएगा" दिखेगा, और AdSense को चालू संपर्क ईमेल चाहिए।
