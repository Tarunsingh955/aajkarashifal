self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("push",e=>{let d={};try{d=e.data.json()}catch(_){}
 e.waitUntil(self.registration.showNotification(d.title||"आज का राशिफल",{body:d.body||"आज का संकेत देखने के लिए टैप करें।",icon:"icon-192.png",badge:"icon-192.png",tag:"daily",data:{url:d.url||"/"}}))});
self.addEventListener("notificationclick",e=>{e.notification.close();const u=(e.notification.data&&e.notification.data.url)||"/";
 e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(l=>{for(const c of l){if("navigate" in c){return c.navigate(u).then(x=>(x||c).focus())}}return self.clients.openWindow(u)}))});
