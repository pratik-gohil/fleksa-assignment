if(!self.define){const s=s=>{"require"!==s&&(s+=".js");let e=Promise.resolve();return c[s]||(e=new Promise((async e=>{if("document"in self){const c=document.createElement("script");c.src=s,document.head.appendChild(c),c.onload=e}else importScripts(s),e()}))),e.then((()=>{if(!c[s])throw new Error(`Module ${s} didn’t register its module`);return c[s]}))},e=(e,c)=>{Promise.all(e.map(s)).then((s=>c(1===s.length?s[0]:s)))},c={require:Promise.resolve(e)};self.define=(e,a,r)=>{c[e]||(c[e]=Promise.resolve().then((()=>{let c={};const i={uri:location.origin+e.slice(1)};return Promise.all(a.map((e=>{switch(e){case"exports":return c;case"module":return i;default:return s(e)}}))).then((s=>{const e=r(...s);return c.default||(c.default=e),c}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/static/cTPsdc2kzrmh7jg8B72bM/_buildManifest.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/cTPsdc2kzrmh7jg8B72bM/_ssgManifest.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/1214.36c6a5f18d7bcb1dcb7e.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/2185.328de2732e43503e874f.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/2254-9d71f7f6a47ae34f244c.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/2281.9b60104adce4089012ec.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/2566-6eafe6c955a88d247adb.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/2651.1ccd22e30abebec38be5.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/2890.7e8c8f0e5b33526ae169.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/3057.88600531ace621a09102.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/4385.242b424b3de2608ebb8e.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/6093.285018e0b08cf94ef49a.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/6249.632c6a11162620ef555a.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/6425.f1fe805ce7b46d4bb91f.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/7191.e4b5cd495852577cd488.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/7257.b64e65e88e2d6e74c80d.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/7270-b37850197f654336d2f0.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/75fc9c18.52f5522a2f0ef94f2066.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/7745.ea0adb94659a804ac031.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/7962.f4bd8249ebb752171183.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/817.946c0588672572d5b8e1.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/8382.d93a69b02428280b53fc.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/8417.6d1d4f61db7932fb2fd7.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/8554.53cbd756f8a82c7d86e0.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/8692.942035bc712e14e53546.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/8866.dd223d1ed87cea3dd7c1.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/9059.ab6cf3c3c4b1f3b53e54.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/9666.c264b278f58a3304bb9a.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/framework-bdc1b4e5e48979e16d36.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/main-d8068026770184fc990f.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/pages/404-a4cd550c45b175e85179.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/pages/_app-bb7346ee382ddb07610d.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/pages/_error-e8e4f59290310567975f.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/pages/account-e0a653c6b24b3579f364.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/pages/account/addresses-559d2325bc053615704d.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/pages/account/edit-e0b5954712a2209b907f.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/pages/account/order-history-32e2a7c29c4b9fe2b6d8.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/pages/account/order/%5Bid%5D-6cf79bf335431fb29308.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/pages/checkout-7f8870c6135bc88c751a.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/pages/contact-us-cebb16c22e04cc6a0f95.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/pages/gallery-fde2ed0e57817bc54a7b.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/pages/imprint-6ae1ec7acf28358a95ac.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/pages/index-dd26d0dd71cd901788e7.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/pages/login-88c7e76453bd6556c98a.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/pages/logout-71f143a9f73af7ad7541.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/pages/menu-14fe0e9f6f78802c5998.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/pages/menu/%5Bid%5D-54d8c35d8b131b2916cb.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/pages/offers-bc36f80ae513a77032f9.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/pages/order-placed-8210ff3fe518ee96a89c.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/pages/privacy-policy-56d71c0eddd6b071c334.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/pages/pwa/manifest.json-f997728faa8a60bfaac4.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/pages/reservation-4d35174965836bf04dec.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/pages/reservation-success-fdde3add5796b4bd307e.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/pages/restaurant-select/%5Bname%5D-1e3d151690c6a6de4e94.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/pages/sitemap-bb79d5f5853cd7ce0c4f.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/pages/terms-6bd3d4292b293c3cda02.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/polyfills-381dbb3c33243b4920e6.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/chunks/webpack-4393a84b18c1afd8f03c.js",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/_next/static/css/3f76f9187ca4d622b3a5.css",revision:"cTPsdc2kzrmh7jg8B72bM"},{url:"/assets/png/fleksa-logo-black.png",revision:"fe1831d5937eab5db55806f08c1416ec"},{url:"/assets/png/fleksa-logo-white.png",revision:"2ee274902eef7d174f513ba1381b70c8"},{url:"/assets/png/person.png",revision:"f2ab4dba3e00798c2a47ef9bd488df6c"},{url:"/assets/svg/account/back-arrow.svg",revision:"a02a84e0b8d2ccc409e3097e40e0dae0"},{url:"/assets/svg/account/delete.png",revision:"70693df31369c11f62acb3688ccbb508"},{url:"/assets/svg/account/info_red.svg",revision:"dc93c5dbee087dcc292f1c7565541da7"},{url:"/assets/svg/account/plus.svg",revision:"c9e01642c7799f7fb1a9c0d3c08f72e5"},{url:"/assets/svg/account/x-circle.svg",revision:"4e85be724ea0a79b69cceda1ea7bf9b5"},{url:"/assets/svg/address-home.svg",revision:"0e4bd62a6ae7dfe88df52e00e73f581f"},{url:"/assets/svg/address-other.svg",revision:"ff810b7b1a1bd3d548675cd80e064a7a"},{url:"/assets/svg/address-work.svg",revision:"457c8966dc6ea492b52c88575cf86a48"},{url:"/assets/svg/address/home.svg",revision:"69b1f44ee1aefa779c4b0399ad9a2af0"},{url:"/assets/svg/address/map.svg",revision:"7a5d8c672045dda0b021991f73c18c22"},{url:"/assets/svg/address/work.svg",revision:"d811e741373787e7fe7cd5ff58ad62b1"},{url:"/assets/svg/autolocate.svg",revision:"50a999e0dd89efb7a4678d204a5f7453"},{url:"/assets/svg/back.svg",revision:"0ae44edea09f476d2bdbe42196b67312"},{url:"/assets/svg/button-minus.svg",revision:"762cfdb5677efd109b167fe51ae9fa9e"},{url:"/assets/svg/button-plus.svg",revision:"ea3f924f609474bfa68f7dab658a6ecc"},{url:"/assets/svg/call.svg",revision:"47848739c041510b4960d8f6a985995e"},{url:"/assets/svg/card.svg",revision:"20fa414accdff5b25f4dbdeeb129b7ed"},{url:"/assets/svg/cart-empty.svg",revision:"8709d7eda2f1f364416e119995c59989"},{url:"/assets/svg/cart.svg",revision:"bb134400d5b4488ee1537bb9a3427e16"},{url:"/assets/svg/cash.svg",revision:"d0b7b6cac29f54551d49a7be255d3999"},{url:"/assets/svg/contact.svg",revision:"1ced2cb7a66b84121ec44bf2f9141833"},{url:"/assets/svg/contact_us_main_img.svg",revision:"ea73fedef7ac11a9739ca68a05f2a10f"},{url:"/assets/svg/couple.svg",revision:"52a978ecadaacc3857341219a7a71e40"},{url:"/assets/svg/cross.svg",revision:"6636cfba658830685f7881a4972bfa40"},{url:"/assets/svg/delivery.svg",revision:"d3ba086de814a6ee364771bfaf90a7f1"},{url:"/assets/svg/dinein.svg",revision:"2757b917ae1dfbe886aca8044b27f19c"},{url:"/assets/svg/edit.svg",revision:"238bd972a574b89e73273199f876bcf0"},{url:"/assets/svg/email.svg",revision:"6b49c9839fab442611cba9f9728dd71b"},{url:"/assets/svg/flag-german.svg",revision:"7c36beadc9363bfea8ea6f815905b95a"},{url:"/assets/svg/flag-united-kingdom.svg",revision:"da08e077435d424937ee4c60ec87c261"},{url:"/assets/svg/fleksa-logo.svg",revision:"bdcc182331467d0da0c93a891ff474ea"},{url:"/assets/svg/gallery.svg",revision:"3fd24fff57573dada2c1289c0dbc3cd6"},{url:"/assets/svg/home.svg",revision:"8b41ca2e4953bb7e8cc248acee31994a"},{url:"/assets/svg/login.svg",revision:"69dc345b8b2839c94903303274365b77"},{url:"/assets/svg/map-user-location.svg",revision:"e9b3be04b2366038c45b16967e33bc6a"},{url:"/assets/svg/menu.svg",revision:"8dc0e3e22acb6de96554b20ae25dddec"},{url:"/assets/svg/next.svg",revision:"fdff8c4b3c72cd530393a551938e3195"},{url:"/assets/svg/options.svg",revision:"c488311e16be4c370c964975731070fd"},{url:"/assets/svg/paypal.svg",revision:"c571701e499890f2cde5a15aa1a2271a"},{url:"/assets/svg/pencil.svg",revision:"880898124b4023a289b6c4e20f3e3d03"},{url:"/assets/svg/pickup.svg",revision:"65561abc2189220c6b506fc10c751e73"},{url:"/assets/svg/previous.svg",revision:"71e984df6590f1d0c0082f13a1ae20ef"},{url:"/assets/svg/reservation.svg",revision:"15da2296b60676b0a349c34110901397"},{url:"/assets/svg/restaurant.svg",revision:"6063c9046ddcfb86568a1b90103dfa23"},{url:"/assets/svg/right-arrow.svg",revision:"c3366d8966005cbd40ed1246fea9e7c2"},{url:"/assets/svg/search.svg",revision:"b579ddf30d8a51b425fc41e7589968c4"},{url:"/assets/svg/social/facebook.svg",revision:"307b47c8edf567dff7b17a70add78eda"},{url:"/assets/svg/social/instagram.svg",revision:"dfc60ca79cf1934b2771b65c5e443a9d"},{url:"/assets/svg/social/twitter.svg",revision:"f23d6a3967c87d3d580887bd69ceeb30"},{url:"/assets/svg/star.svg",revision:"1b3fab0d451089abd940e0236c096c26"},{url:"/assets/svg/success/order_placed.svg",revision:"470954d98b7a513cd634a1b39d6c8e34"},{url:"/assets/svg/tag.svg",revision:"eacc5744d3fbffac43da52b4c9c161e7"},{url:"/assets/svg/tick.svg",revision:"7dd1e38c00099a5569a14c980c253624"},{url:"/assets/svg/x-circle.svg",revision:"8274365de45e22fa16dd381212f89f05"},{url:"/favicon.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/vercel.svg",revision:"26bf2d0adaf1028a4d4c6ee77005e819"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:c,state:a})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:mp3|mp4)$/i,new s.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;const e=s.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;return!s.pathname.startsWith("/api/")}),new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute((({url:s})=>!(self.origin===s.origin)),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600,purgeOnQuotaError:!0})]}),"GET")}));
