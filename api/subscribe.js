const crypto=require("crypto"),{ready,redis}=require("./_redis");
module.exports=async(req,res)=>{
 try{
  if(req.method==="GET"){let db="missing";if(ready()){try{const x=await redis(["PING"]);db="ok:"+JSON.stringify(x)}catch(e){db="error: "+e.message}}
   res.setHeader("Cache-Control","no-store");return res.json({db,vapidPublic:!!process.env.VAPID_PUBLIC,vapidPrivate:!!process.env.VAPID_PRIVATE,cronSecret:!!process.env.CRON_SECRET})}
  if(!ready())return res.status(503).json({error:"database not configured"});
  if(req.method!=="POST"&&req.method!=="DELETE")return res.status(405).end();
  const b=typeof req.body==="string"?JSON.parse(req.body||"{}"):(req.body||{}),ep=b.sub&&b.sub.endpoint;
  if(typeof ep!=="string"||!/^https:\/\//.test(ep)||ep.length>1000)return res.status(400).json({error:"bad subscription"});
  const f=crypto.createHash("sha256").update(ep).digest("hex");
  if(req.method==="DELETE"){await redis(["HDEL","subs",f]);return res.json({ok:true})}
  const k=b.sub.keys||{},r=Number(b.rashi);
  if(!k.p256dh||!k.auth||!Number.isInteger(r)||r<0||r>11)return res.status(400).json({error:"bad data"});
  await redis(["HSET","subs",f,JSON.stringify({sub:{endpoint:ep,keys:{p256dh:k.p256dh,auth:k.auth}},rashi:r})]);
  res.json({ok:true})
 }catch(e){res.status(500).json({error:"server error"})}};
