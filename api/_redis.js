const U=process.env.UPSTASH_REDIS_REST_URL||process.env.KV_REST_API_URL,K=process.env.UPSTASH_REDIS_REST_TOKEN||process.env.KV_REST_API_TOKEN;
module.exports={ready:()=>!!(U&&K),redis:async c=>{const r=await fetch(U,{method:"POST",headers:{Authorization:`Bearer ${K}`},body:JSON.stringify(c)});if(!r.ok)throw new Error("redis "+r.status);return(await r.json()).result}};
