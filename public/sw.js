if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,i,a)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const t={uri:location.origin+s.slice(1)};return Promise.all(i.map((s=>{switch(s){case"exports":return n;case"module":return t;default:return e(s)}}))).then((e=>{const s=a(...e);return n.default||(n.default=s),n}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/5REC3zdMKYlonYvAojNim/_buildManifest.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/5REC3zdMKYlonYvAojNim/_ssgManifest.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/10.939f2ae91f3a90378b56.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/385.81f54c54c76e6d5eac51.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/425.4477133865c67a13a654.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/427.7c4087967f11fa83b49f.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/441.9904ddf5cda6ed91dbc2.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/563-6602588a981f6ec5d4bc.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/59.ed437f03b5598659a5d4.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/651.cb9a3a166873236b582d.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/705-37ce0f150888741efbef.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/732.68476e9d1c1e229e856d.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/745.ffbd0dd7f7f1505e7068.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/757.0f9ca20eb23f391275d1.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/75fc9c18.5c1929f66343f0a636cd.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/80.22073a6cffce93f64e53.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/93.914bff7eafbfd4ac4b69.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/framework-c93ed74a065331c4bd75.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/main-b5e2aedae0a71e6390ea.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/pages/_app-807a8dcbacd1290d4836.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/pages/_error-94ed2348718d59e1af9b.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/pages/account-2e3b30bb4f9e06730e75.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/pages/checkout-09b44cd6a725214e1910.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/pages/contact-us-8350adc4ceef4ecfd0e2.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/pages/gallery-893f1516194485fd5c06.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/pages/index-929377ed9f499b09bb02.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/pages/login-61e0ba0c451989676f86.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/pages/logout-2431e1acd7c727624f01.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/pages/menu-90055b70672d40b4e2d8.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/pages/menu/%5Bid%5D-34e7e516d781654c4ad8.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/pages/order-placed-ef051a4798187fde9358.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/pages/reservation-9accc7a10a8423925575.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/pages/restaurant-select/%5Bname%5D-70e830aef2b48332c85c.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/pages/terms-f3deba2328e457afae57.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/polyfills-a54b4f32bdc1ef890ddd.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/chunks/webpack-0f2e1a980338243c67e7.js",revision:"5REC3zdMKYlonYvAojNim"},{url:"/_next/static/css/3f76f9187ca4d622b3a5.css",revision:"5REC3zdMKYlonYvAojNim"},{url:"/assets/svg/cart-empty.svg",revision:"3dae090e45131f68932c76da69df0392"},{url:"/assets/svg/cart.svg",revision:"bb134400d5b4488ee1537bb9a3427e16"},{url:"/assets/svg/contact.svg",revision:"1ced2cb7a66b84121ec44bf2f9141833"},{url:"/assets/svg/couple.svg",revision:"354c04a309a26a9e92687f0b442ce545"},{url:"/assets/svg/delivery.svg",revision:"05dd3238d0bed83712b47278dbff5e1e"},{url:"/assets/svg/dinein.svg",revision:"b4b56bd24ffbb55e4a0cd78e66c6990d"},{url:"/assets/svg/edit.svg",revision:"238bd972a574b89e73273199f876bcf0"},{url:"/assets/svg/flag-german.svg",revision:"7c36beadc9363bfea8ea6f815905b95a"},{url:"/assets/svg/flag-united-kingdom.svg",revision:"da08e077435d424937ee4c60ec87c261"},{url:"/assets/svg/gallery.svg",revision:"3fd24fff57573dada2c1289c0dbc3cd6"},{url:"/assets/svg/home.svg",revision:"8b41ca2e4953bb7e8cc248acee31994a"},{url:"/assets/svg/menu.svg",revision:"8dc0e3e22acb6de96554b20ae25dddec"},{url:"/assets/svg/next.svg",revision:"5c1c155d8de3086627f874064b218bb6"},{url:"/assets/svg/options.svg",revision:"c488311e16be4c370c964975731070fd"},{url:"/assets/svg/pickup.svg",revision:"9f1a69845993eaa3af7dff0f1a60e57c"},{url:"/assets/svg/previous.svg",revision:"16e955556bd7943ed57e1a7b6a7f0039"},{url:"/assets/svg/reservation.svg",revision:"15da2296b60676b0a349c34110901397"},{url:"/assets/svg/restaurant.svg",revision:"554cd0803621dea983fcd8bf0b268392"},{url:"/assets/svg/right-arrow.svg",revision:"c3366d8966005cbd40ed1246fea9e7c2"},{url:"/assets/svg/search.svg",revision:"45ee3a91b015961426f8721b5a713896"},{url:"/assets/svg/star.svg",revision:"1b3fab0d451089abd940e0236c096c26"},{url:"/assets/svg/tick.svg",revision:"6f5d768d8e5259038099e4570354b47b"},{url:"/favicon.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/manifest.json",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600,purgeOnQuotaError:!0})]}),"GET")}));
