if(!self.define){const s=s=>{"require"!==s&&(s+=".js");let e=Promise.resolve();return r[s]||(e=new Promise((async e=>{if("document"in self){const r=document.createElement("script");r.src=s,document.head.appendChild(r),r.onload=e}else importScripts(s),e()}))),e.then((()=>{if(!r[s])throw new Error(`Module ${s} didn’t register its module`);return r[s]}))},e=(e,r)=>{Promise.all(e.map(s)).then((s=>r(1===s.length?s[0]:s)))},r={require:Promise.resolve(e)};self.define=(e,a,i)=>{r[e]||(r[e]=Promise.resolve().then((()=>{let r={};const c={uri:location.origin+e.slice(1)};return Promise.all(a.map((e=>{switch(e){case"exports":return r;case"module":return c;default:return s(e)}}))).then((s=>{const e=i(...s);return r.default||(r.default=e),r}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/static/AY1oOmspHmrdrvR2AfHi-/_buildManifest.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/AY1oOmspHmrdrvR2AfHi-/_ssgManifest.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/103.b27608fc163b8871323c.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/129.8c2652f7bc9138d6bd35.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/173-e2549c27119164de6bc3.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/185.4c087c84bec44bfa6ac4.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/191.8fe334a9004347a6a02a.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/257.56d6af9a4c46960355c2.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/385.81f54c54c76e6d5eac51.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/425.1fcb7bb6af153f04f73a.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/522.dc7d4ebf671d4317563e.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/64.1e5897b1d4cd5c60013d.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/645-a8706a03181a749fddf6.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/651.cb9a3a166873236b582d.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/693.81e0c478064bf0d81430.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/732.853fdcc1170485d9c985.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/745.ffbd0dd7f7f1505e7068.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/75fc9c18.5c1929f66343f0a636cd.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/817.99de6d48b2e18a7572ff.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/823.42afc6ab2310f8fcec52.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/93.e626d29d7ea861b5580a.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/944.75f8199edb39d592244f.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/framework-c93ed74a065331c4bd75.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/main-b5e2aedae0a71e6390ea.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/pages/_app-36867f7b27dda61cd019.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/pages/_error-94ed2348718d59e1af9b.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/pages/account-30297b243a21df0e13dc.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/pages/account/addresses-54105c0293ef09b3f22b.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/pages/account/edit-cd9f1156be782d9483e4.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/pages/account/order-history-f0e55cce45824e2cfd99.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/pages/account/order/%5Bid%5D-479f1dcc8e79e9421678.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/pages/checkout-7ba0b124d5d0e93beb3f.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/pages/contact-us-ddbaacfbfe5269012be1.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/pages/gallery-faf7c25dc2e346f1f7a0.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/pages/index-36b03cb990ad7415f185.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/pages/login-d786310d8f267bef33f2.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/pages/logout-60d1193828b806dc5ac7.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/pages/menu-775f9eeefc9c49f9e1e4.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/pages/menu/%5Bid%5D-cf1579f08e5ddd20c111.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/pages/order-placed-8a389fa96fa0e499b2dd.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/pages/reservation-dd93fe5e1e2c266e2686.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/pages/reservation-success-7e5558ae455f2474e1d8.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/pages/restaurant-select/%5Bname%5D-70e830aef2b48332c85c.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/pages/terms-033ab90b8b1629f1991a.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/polyfills-a54b4f32bdc1ef890ddd.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/chunks/webpack-4a20f93ca634868fb343.js",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/_next/static/css/3f76f9187ca4d622b3a5.css",revision:"AY1oOmspHmrdrvR2AfHi-"},{url:"/assets/svg/account/back-arrow.svg",revision:"8c2146cf04115d0649f8231dd0f85e94"},{url:"/assets/svg/account/delete.png",revision:"70693df31369c11f62acb3688ccbb508"},{url:"/assets/svg/account/delete.svg",revision:"b7b4998a96ac6d4985e62696931eecd1"},{url:"/assets/svg/account/home.png",revision:"d10a7fd037d8a0db713aa1087e1e9722"},{url:"/assets/svg/account/home.svg",revision:"7dc30e12dce4f2316fd7556dc2ec99e7"},{url:"/assets/svg/account/map.png",revision:"169c9b466580ab8dae022ffd899996a8"},{url:"/assets/svg/account/map.svg",revision:"e8bb3d246b5ca0ca15abeb614f74447c"},{url:"/assets/svg/account/plus.svg",revision:"5faa6589b1beeb69bde6f6b82644fbf1"},{url:"/assets/svg/account/work.png",revision:"7c3bbc0a166f2dde75a3f15486a8eac1"},{url:"/assets/svg/account/work.svg",revision:"6c5178847a9865abfd220d03cb641f92"},{url:"/assets/svg/address-home.svg",revision:"0e4bd62a6ae7dfe88df52e00e73f581f"},{url:"/assets/svg/address-other.svg",revision:"ff810b7b1a1bd3d548675cd80e064a7a"},{url:"/assets/svg/address-work.svg",revision:"457c8966dc6ea492b52c88575cf86a48"},{url:"/assets/svg/call.svg",revision:"47848739c041510b4960d8f6a985995e"},{url:"/assets/svg/cart-empty.svg",revision:"8709d7eda2f1f364416e119995c59989"},{url:"/assets/svg/cart.svg",revision:"bb134400d5b4488ee1537bb9a3427e16"},{url:"/assets/svg/contact.svg",revision:"1ced2cb7a66b84121ec44bf2f9141833"},{url:"/assets/svg/contact_us_main_img.svg",revision:"ea73fedef7ac11a9739ca68a05f2a10f"},{url:"/assets/svg/couple.svg",revision:"52a978ecadaacc3857341219a7a71e40"},{url:"/assets/svg/delivery.svg",revision:"d3ba086de814a6ee364771bfaf90a7f1"},{url:"/assets/svg/dinein.svg",revision:"2757b917ae1dfbe886aca8044b27f19c"},{url:"/assets/svg/edit.svg",revision:"238bd972a574b89e73273199f876bcf0"},{url:"/assets/svg/email.svg",revision:"6b49c9839fab442611cba9f9728dd71b"},{url:"/assets/svg/flag-german.svg",revision:"7c36beadc9363bfea8ea6f815905b95a"},{url:"/assets/svg/flag-united-kingdom.svg",revision:"da08e077435d424937ee4c60ec87c261"},{url:"/assets/svg/gallery.svg",revision:"3fd24fff57573dada2c1289c0dbc3cd6"},{url:"/assets/svg/home.svg",revision:"8b41ca2e4953bb7e8cc248acee31994a"},{url:"/assets/svg/menu.svg",revision:"8dc0e3e22acb6de96554b20ae25dddec"},{url:"/assets/svg/next.svg",revision:"fdff8c4b3c72cd530393a551938e3195"},{url:"/assets/svg/options.svg",revision:"c488311e16be4c370c964975731070fd"},{url:"/assets/svg/pencil.svg",revision:"4c655d1bdc258bc90401c6407e8c252e"},{url:"/assets/svg/pickup.svg",revision:"65561abc2189220c6b506fc10c751e73"},{url:"/assets/svg/previous.svg",revision:"71e984df6590f1d0c0082f13a1ae20ef"},{url:"/assets/svg/reservation.svg",revision:"15da2296b60676b0a349c34110901397"},{url:"/assets/svg/restaurant.svg",revision:"6063c9046ddcfb86568a1b90103dfa23"},{url:"/assets/svg/right-arrow.svg",revision:"c3366d8966005cbd40ed1246fea9e7c2"},{url:"/assets/svg/search.svg",revision:"b579ddf30d8a51b425fc41e7589968c4"},{url:"/assets/svg/star.svg",revision:"1b3fab0d451089abd940e0236c096c26"},{url:"/assets/svg/tick.svg",revision:"7dd1e38c00099a5569a14c980c253624"},{url:"/assets/svg/x-circle.svg",revision:"8274365de45e22fa16dd381212f89f05"},{url:"/favicon.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/manifest.json",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/vercel.svg",revision:"26bf2d0adaf1028a4d4c6ee77005e819"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:r,state:a})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:mp3|mp4)$/i,new s.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;const e=s.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;return!s.pathname.startsWith("/api/")}),new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute((({url:s})=>!(self.origin===s.origin)),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600,purgeOnQuotaError:!0})]}),"GET")}));
