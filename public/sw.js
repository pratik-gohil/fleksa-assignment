if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return i[e]||(s=new Promise((async s=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},s=(s,i)=>{Promise.all(s.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(s)};self.define=(s,a,t)=>{i[s]||(i[s]=Promise.resolve().then((()=>{let i={};const c={uri:location.origin+s.slice(1)};return Promise.all(a.map((s=>{switch(s){case"exports":return i;case"module":return c;default:return e(s)}}))).then((e=>{const s=t(...e);return i.default||(i.default=s),i}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/0162ba1d1043b95fb302416e57fc01020058d32c.eeb3c59dc001de31e2f3.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/26.dc5eb1f3cefd8f70a6c2.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/27.bacf945a3c7cbfff5481.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/28.df30d77ae1f93aacd6bc.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/29.d3bc9e1fc738661b3fa1.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/30.3f60fb11998923896f2a.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/31.ff04f6ca93ff23231806.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/32.c8ffbacd6b486ba71459.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/33.ef1b7c64b095559ca9b9.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/34.ff105c5b468cab12c36b.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/75fc9c18.851b46342beeff380cfd.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/8.80a105ecdb466158132b.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/a703b6671b909b61d0e4d66e21cf12b408960c9e.14e9885890e941d46be7.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/c8f7fe3b0e41be846d5687592cf2018ff6e22687.ee611536fa465bbf183d.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/e5ceaf93ef3139b1307732c41bc5cd6c8c53ced9.49b363d59f4bff12075a.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/e5ceaf93ef3139b1307732c41bc5cd6c8c53ced9_CSS.210d3c80a2b0e2401248.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/framework.efe182f2d62be1d8151a.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/main-1168ce2eb64c3f5552cd.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/pages/_app-2f195a22d1b2b968b0df.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/pages/_error-9808c06d3b90055fae15.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/pages/account-0e16d06c7d58b7f775d0.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/pages/checkout-3738e1dea1f9bc6a8bf1.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/pages/contact-us-31234713e521692cd8c2.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/pages/gallery-2bd97053552dec1cee91.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/pages/index-c9e677cf42890a183c84.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/pages/login-817e660809b4376d2e00.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/pages/logout-cb8a31424122da228041.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/pages/menu-0f0e1a7cec1e5451ca53.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/pages/menu/%5Bid%5D-3baa4acb13196b202c8d.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/pages/order-placed-c2f5d12eab18921472da.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/pages/reservation-ece7eece244239797ba4.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/pages/restaurant-select/%5Bname%5D-9d54186af39237692ff3.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/pages/terms-dbaa571609a631bb3efd.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/polyfills-3df0de3cea69da24cd66.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/chunks/webpack-b7fb6abf391e552285db.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/css/fc9a91bc175a1b0fd801.css",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/osed8ai05i18pQPAE8PpD/_buildManifest.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/_next/static/osed8ai05i18pQPAE8PpD/_ssgManifest.js",revision:"osed8ai05i18pQPAE8PpD"},{url:"/assets/svg/cart-empty.svg",revision:"3dae090e45131f68932c76da69df0392"},{url:"/assets/svg/cart.svg",revision:"bb134400d5b4488ee1537bb9a3427e16"},{url:"/assets/svg/contact.svg",revision:"1ced2cb7a66b84121ec44bf2f9141833"},{url:"/assets/svg/couple.svg",revision:"354c04a309a26a9e92687f0b442ce545"},{url:"/assets/svg/delivery.svg",revision:"05dd3238d0bed83712b47278dbff5e1e"},{url:"/assets/svg/dinein.svg",revision:"b4b56bd24ffbb55e4a0cd78e66c6990d"},{url:"/assets/svg/edit.svg",revision:"238bd972a574b89e73273199f876bcf0"},{url:"/assets/svg/flag-german.svg",revision:"7c36beadc9363bfea8ea6f815905b95a"},{url:"/assets/svg/flag-united-kingdom.svg",revision:"da08e077435d424937ee4c60ec87c261"},{url:"/assets/svg/gallery.svg",revision:"3fd24fff57573dada2c1289c0dbc3cd6"},{url:"/assets/svg/home.svg",revision:"8b41ca2e4953bb7e8cc248acee31994a"},{url:"/assets/svg/menu.svg",revision:"8dc0e3e22acb6de96554b20ae25dddec"},{url:"/assets/svg/next.svg",revision:"5c1c155d8de3086627f874064b218bb6"},{url:"/assets/svg/options.svg",revision:"c488311e16be4c370c964975731070fd"},{url:"/assets/svg/pickup.svg",revision:"9f1a69845993eaa3af7dff0f1a60e57c"},{url:"/assets/svg/previous.svg",revision:"16e955556bd7943ed57e1a7b6a7f0039"},{url:"/assets/svg/reservation.svg",revision:"15da2296b60676b0a349c34110901397"},{url:"/assets/svg/restaurant.svg",revision:"554cd0803621dea983fcd8bf0b268392"},{url:"/assets/svg/right-arrow.svg",revision:"c3366d8966005cbd40ed1246fea9e7c2"},{url:"/assets/svg/search.svg",revision:"45ee3a91b015961426f8721b5a713896"},{url:"/assets/svg/star.svg",revision:"1b3fab0d451089abd940e0236c096c26"},{url:"/assets/svg/tick.svg",revision:"6f5d768d8e5259038099e4570354b47b"},{url:"/favicon.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/manifest.json",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
