self.__WB_DISABLE_DEV_LOGS = true
if ('serviceWorker' in navigator) {
  caches.keys().then(function(cacheNames) {
    console.log("cacheNames", cacheNames)
    cacheNames.forEach(function(cacheName) {
      caches.delete(cacheName);
    });
  });
}