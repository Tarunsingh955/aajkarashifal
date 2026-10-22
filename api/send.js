const webpush=require("web-push"),{teaser,istYMD}=require("./_teaser"),{ready,redis}=require("./_redis");
module.exports=async(req,res)=>{
 const sec=process.env.CRON_SECRET;
 if(sec&&req.headers.authorization!==`Bearer ${sec}`)return res.status(401).end();
 if(!ready()||!process.env.VAPID_PUBLIC||!process.env.VAPID_PRIVATE)return res.status(503).json({error:"not configured"});
 webpush.setVapidDetails(process.env.VAPID_SUBJECT||"mailto:you@example.com",process.env.VAPID_PUBLIC,process.env.VAPID_PRIVATE);
 const all=(await redis(["HGETALL","subs"]))||[],ds=istYMD(),items=[];let ok=0,gone=0,fail=0;
 for(let i=0;i<all.length;i+=2)items.push([all[i],JSON.parse(all[i+1])]);
 for(let i=0;i<items.length;i+=50){
  await Promise.all(items.slice(i,i+50).map(async([f,v])=>{
   try{await webpush.sendNotification(v.sub,JSON.stringify(teaser(v.rashi,ds)),{TTL:21600});ok++}
   catch(e){if(e.statusCode===404||e.statusCode===410){gone++;await redis(["HDEL","subs",f]).catch(()=>{})}else fail++}}))}
 res.json({total:items.length,ok,gone,fail})};
