
const CACHE = 'sdrpg-v6-power';
const SCOPE = '/power/';
const CORE = [SCOPE, SCOPE+'index.html', SCOPE+'manifest.webmanifest', SCOPE+'icons/icon-192.png', SCOPE+'icons/icon-512.png'];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', e=>{
  e.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', e=>{
  const req=e.request;
  if(req.mode==='navigate'){
    e.respondWith((async()=>{
      try{
        const net=await fetch(req);
        (await caches.open(CACHE)).put(SCOPE+'index.html', net.clone());
        return net;
      }catch(err){
        const cached=await caches.match(SCOPE+'index.html');
        return cached || Response.error();
      }
    })());
    return;
  }
  if(req.method==='GET'){
    e.respondWith((async()=>{
      const cached=await caches.match(req);
      if(cached) return cached;
      try{
        const resp=await fetch(req);
        if(resp && resp.status===200) (await caches.open(CACHE)).put(req, resp.clone());
        return resp;
      }catch(err){ return Response.error(); }
    })());
  }
});
