// Service worker to give a Progressive Web App experience.
// Credit to Matt Gaunt - https://developers.google.com/web/fundamentals/primers/service-workers/

const CACHE_NAME = 'itsolver-cache-v2';
const urlsToCache = [
  "/",
  "/sw.js",
  "/about/",
  "/blog/",
  "/cloud-apps-g-suite/",
  "/contact/",
  "/legal/",
  "/offline",
  "/on-demand-tasks/",
  "/on-demand/",
  "/privacy/",
  "/service-area/",
  "/service-plans/",
  "/assets/images/customers/statewide-roofing/logo.jpg",
  "/assets/images/staff-angus.jpg",
  "/assets/images/gsuite-logo.png",
  "/assets/images/gsuite-product-lockup.png",
  "/the_favicon/favicon-32x32.png",
  "the_favicon/favicon-16x16.png",
  "/the_favicon/favicon.ico"
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
