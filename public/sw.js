if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise((async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]}))},s=(s,a)=>{Promise.all(s.map(e)).then((e=>a(1===e.length?e[0]:e)))},a={require:Promise.resolve(s)};self.define=(s,n,c)=>{a[s]||(a[s]=Promise.resolve().then((()=>{let a={};const r={uri:location.origin+s.slice(1)};return Promise.all(n.map((s=>{switch(s){case"exports":return a;case"module":return r;default:return e(s)}}))).then((e=>{const s=c(...e);return a.default||(a.default=s),a}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/9unjL5Vj13SBIeR6fF3Oy/_buildManifest.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/9unjL5Vj13SBIeR6fF3Oy/_ssgManifest.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/126.749f1f822067ac8030fb.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/173-40b6ddc11351d0261697.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/185.680527044397f7bb3b4c.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/191.8ced740b2ae371d717f9.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/249.16c03200f0a2619cd89a.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/257.81895e09ff9cf240e109.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/296.1c674d00c1ade70b7dce.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/385.ade61cd6708a954b9a15.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/425.81d0b071824a64aa8af3.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/441.9904ddf5cda6ed91dbc2.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/522.7d611cca19e8e2420afd.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/533.02e24d9d06e45fc47546.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/554.0a2e721c039bfc251d77.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/57.ad22eb3e7b081b6cbcb7.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/64.dd1ec55c77a2dbe516e0.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/645-a8706a03181a749fddf6.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/651.cb9a3a166873236b582d.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/688.5b77794bca85e68a6aac.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/692.30bb0648acc7773cb744.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/745.cc9c1140f10b8bdcd363.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/75fc9c18.5c1929f66343f0a636cd.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/817.f0eef34741dfbe0002ec.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/93.e626d29d7ea861b5580a.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/framework-c93ed74a065331c4bd75.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/main-b5e2aedae0a71e6390ea.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/pages/_app-c7c9b4da4f5dd216cdf0.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/pages/_error-94ed2348718d59e1af9b.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/pages/account-1f92a9f0879dbc2d06de.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/pages/account/addresses-ffe767f68016726ea902.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/pages/account/edit-f62edb69e124ff2dad81.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/pages/account/order-history-710bd40c5829ea5ebc1c.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/pages/account/order/%5Bid%5D-c1fc51e73fdeae900414.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/pages/checkout-337392b439f18f00cd7f.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/pages/contact-us-ad8e76b22eddf9b66031.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/pages/gallery-1973e4eb3ee85debf0d6.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/pages/index-ebed59290b95c77c85e2.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/pages/login-89f75536bba7c5744700.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/pages/logout-936c2b34652d5f9b1a84.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/pages/menu-e14138770befde0e90b8.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/pages/menu/%5Bid%5D-00330cc5c638328b63f0.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/pages/offers-9622ce9626123a561eb6.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/pages/order-placed-d82aa0fd46e4b54d5764.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/pages/reservation-40b23511ed12bc5f6ff8.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/pages/reservation-success-74b4995735bad83ea9ab.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/pages/restaurant-select/%5Bname%5D-70e830aef2b48332c85c.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/pages/terms-e6957809061fc8d34aff.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/polyfills-a54b4f32bdc1ef890ddd.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/chunks/webpack-dfd81855e2c18076ea82.js",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/_next/static/css/3f76f9187ca4d622b3a5.css",revision:"9unjL5Vj13SBIeR6fF3Oy"},{url:"/assets/svg/account/back-arrow.svg",revision:"a02a84e0b8d2ccc409e3097e40e0dae0"},{url:"/assets/svg/account/delete.png",revision:"70693df31369c11f62acb3688ccbb508"},{url:"/assets/svg/account/delete.svg",revision:"a053ff8987bbaeb390ede53e8f6aeb3b"},{url:"/assets/svg/account/home.png",revision:"d10a7fd037d8a0db713aa1087e1e9722"},{url:"/assets/svg/account/home.svg",revision:"cc43c3f5eefc4e8f9be4ed23957d6404"},{url:"/assets/svg/account/info_red.svg",revision:"dc93c5dbee087dcc292f1c7565541da7"},{url:"/assets/svg/account/map.png",revision:"169c9b466580ab8dae022ffd899996a8"},{url:"/assets/svg/account/map.svg",revision:"d28b7a97c4d8e33b8c39bd58232bccc9"},{url:"/assets/svg/account/plus.svg",revision:"c9e01642c7799f7fb1a9c0d3c08f72e5"},{url:"/assets/svg/account/work.png",revision:"7c3bbc0a166f2dde75a3f15486a8eac1"},{url:"/assets/svg/account/work.svg",revision:"0aa15a92af2940eec81db390d3a8de44"},{url:"/assets/svg/address-home.svg",revision:"0e4bd62a6ae7dfe88df52e00e73f581f"},{url:"/assets/svg/address-other.svg",revision:"ff810b7b1a1bd3d548675cd80e064a7a"},{url:"/assets/svg/address-work.svg",revision:"457c8966dc6ea492b52c88575cf86a48"},{url:"/assets/svg/address/home.svg",revision:"69b1f44ee1aefa779c4b0399ad9a2af0"},{url:"/assets/svg/address/map.svg",revision:"7a5d8c672045dda0b021991f73c18c22"},{url:"/assets/svg/address/work.svg",revision:"d811e741373787e7fe7cd5ff58ad62b1"},{url:"/assets/svg/call.svg",revision:"47848739c041510b4960d8f6a985995e"},{url:"/assets/svg/cart-empty.svg",revision:"8709d7eda2f1f364416e119995c59989"},{url:"/assets/svg/cart.svg",revision:"bb134400d5b4488ee1537bb9a3427e16"},{url:"/assets/svg/contact.svg",revision:"1ced2cb7a66b84121ec44bf2f9141833"},{url:"/assets/svg/contact_us_main_img.svg",revision:"ea73fedef7ac11a9739ca68a05f2a10f"},{url:"/assets/svg/couple.svg",revision:"52a978ecadaacc3857341219a7a71e40"},{url:"/assets/svg/cross.svg",revision:"6636cfba658830685f7881a4972bfa40"},{url:"/assets/svg/delivery.svg",revision:"d3ba086de814a6ee364771bfaf90a7f1"},{url:"/assets/svg/dinein.svg",revision:"2757b917ae1dfbe886aca8044b27f19c"},{url:"/assets/svg/edit.svg",revision:"238bd972a574b89e73273199f876bcf0"},{url:"/assets/svg/email.svg",revision:"6b49c9839fab442611cba9f9728dd71b"},{url:"/assets/svg/flag-german.svg",revision:"7c36beadc9363bfea8ea6f815905b95a"},{url:"/assets/svg/flag-united-kingdom.svg",revision:"da08e077435d424937ee4c60ec87c261"},{url:"/assets/svg/gallery.svg",revision:"3fd24fff57573dada2c1289c0dbc3cd6"},{url:"/assets/svg/home.svg",revision:"8b41ca2e4953bb7e8cc248acee31994a"},{url:"/assets/svg/menu.svg",revision:"8dc0e3e22acb6de96554b20ae25dddec"},{url:"/assets/svg/next.svg",revision:"fdff8c4b3c72cd530393a551938e3195"},{url:"/assets/svg/options.svg",revision:"c488311e16be4c370c964975731070fd"},{url:"/assets/svg/pencil.svg",revision:"880898124b4023a289b6c4e20f3e3d03"},{url:"/assets/svg/pickup.svg",revision:"65561abc2189220c6b506fc10c751e73"},{url:"/assets/svg/previous.svg",revision:"71e984df6590f1d0c0082f13a1ae20ef"},{url:"/assets/svg/reservation.svg",revision:"15da2296b60676b0a349c34110901397"},{url:"/assets/svg/restaurant.svg",revision:"6063c9046ddcfb86568a1b90103dfa23"},{url:"/assets/svg/right-arrow.svg",revision:"c3366d8966005cbd40ed1246fea9e7c2"},{url:"/assets/svg/search.svg",revision:"b579ddf30d8a51b425fc41e7589968c4"},{url:"/assets/svg/star.svg",revision:"1b3fab0d451089abd940e0236c096c26"},{url:"/assets/svg/tag.svg",revision:"eacc5744d3fbffac43da52b4c9c161e7"},{url:"/assets/svg/tick.svg",revision:"7dd1e38c00099a5569a14c980c253624"},{url:"/assets/svg/x-circle.svg",revision:"8274365de45e22fa16dd381212f89f05"},{url:"/favicon.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/manifest.json",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/vercel.svg",revision:"26bf2d0adaf1028a4d4c6ee77005e819"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600,purgeOnQuotaError:!0})]}),"GET")}));
