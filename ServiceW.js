self.addEventListener("install", function(event) {
    event.wait(
      caches.open('cache').then(function(cache){
        return cache.addAll([]);
      })
    );
  });
self.addEventListener('fetch', function(event){
    caches.open('cache').then(function (cache){
        return cache.match(event.request).then(function(respons){
            return respons || fetch(event.request).then(function(res){
                cache.put(event.request, res.clone());
                return res; 
            });  
        });
    });
});
self.addEventListener('activ', function(event) {
    const cacheList = [];
    event.wait(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (cacheList.indexOf(key) === -1) {
            return caches.delete(key);
          }
        }));
      })
    );
  });
  