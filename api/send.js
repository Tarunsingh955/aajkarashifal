const webpush=require("web-push"),{slotMsg,istYMD}=require("./_teaser"),{ready,redis}=require("./_redis");
// सूचना भेजने का समय: /api/send?slot=morning (10 बजे) | noon (2 बजे) | evening (7 बजे)
// बाहर का free timer (cron-job.org) इसे तय समय पर बुलाता है। एक ही slot दिन में दोबारा नहीं जाता।
module.exports=async(req,res)=>{
 const sec=process.env.CRON_SECRET;
 if(sec&&req.headers.authorization!==`Bearer ${sec}`)return res.status(401).end();
 if(!ready()||!process.env.VAPID_PUBLIC||!process.env.VAPID_PRIVATE)return res.status(503).json({error:"not configured"});
 const q=req.query||{},slot=["morning","noon","evening"].includes(q.slot)?q.slot:"morning",ds=istYMD();
 if(!q.force){const got=await redis(["SET",`sent:${slot}:${ds.join("-")}`,"1","NX","EX",72000]).catch(()=>"OK");if(got!=="OK")return res.json({skipped:"already sent",slot})}
 webpush.setVapidDetails(process.env.VAPID_SUBJECT||"mailto:you@example.com",process.env.VAPID_PUBLIC,process.env.VAPID_PRIVATE);
 const all=(await redis(["HGETALL","subs"]))||[],items=[];let ok=0,gone=0,fail=0;
 for(let i=0;i<all.length;i+=2)items.push([all[i],JSON.parse(all[i+1])]);
 for(let i=0;i<items.length;i+=50){
  await Promise.all(items.slice(i,i+50).map(async([f,v])=>{
   try{await webpush.sendNotification(v.sub,JSON.stringify(slotMsg(slot,v.rashi,ds)),{TTL:10800});ok++}
   catch(e){if(e.statusCode===404||e.statusCode===410){gone++;await redis(["HDEL","subs",f]).catch(()=>{})}else fail++}}))}
 res.json({slot,total:items.length,ok,gone,fail})};
