if(!self.define){const s=s=>{"require"!==s&&(s+=".js");let r=Promise.resolve();return n[s]||(r=new Promise((async r=>{if("document"in self){const n=document.createElement("script");n.src=s,document.head.appendChild(n),n.onload=r}else importScripts(s),r()}))),r.then((()=>{if(!n[s])throw new Error(`Module ${s} didn’t register its module`);return n[s]}))},r=(r,n)=>{Promise.all(r.map(s)).then((s=>n(1===s.length?s[0]:s)))},n={require:Promise.resolve(r)};self.define=(r,e,i)=>{n[r]||(n[r]=Promise.resolve().then((()=>{let n={};const l={uri:location.origin+r.slice(1)};return Promise.all(e.map((r=>{switch(r){case"exports":return n;case"module":return l;default:return s(r)}}))).then((s=>{const r=i(...s);return n.default||(n.default=r),n}))})))}}define("./service-worker.js",["./workbox-85fe00c4"],(function(s){"use strict";s.setCacheNameDetails({prefix:"ret"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"/css/276.73a3890a.css",revision:null},{url:"/css/308.73a3890a.css",revision:null},{url:"/css/503.041794a0.css",revision:null},{url:"/css/561.1d7a151c.css",revision:null},{url:"/css/654.bb9afedf.css",revision:null},{url:"/css/app.121f8d29.css",revision:null},{url:"/css/vendor.84e96be0.css",revision:null},{url:"/favicon.ico",revision:"d609881b47929ce1a390324e582bf68d"},{url:"/fonts/KFOkCnqEu92Fr1MmgVxIIzQ.9391e6e2.woff",revision:null},{url:"/fonts/KFOlCnqEu92Fr1MmEU9fBBc-.ddd11dab.woff",revision:null},{url:"/fonts/KFOlCnqEu92Fr1MmSU5fBBc-.877b9231.woff",revision:null},{url:"/fonts/KFOlCnqEu92Fr1MmWUlfBBc-.0344cc3c.woff",revision:null},{url:"/fonts/KFOlCnqEu92Fr1MmYUtfBBc-.b555d228.woff",revision:null},{url:"/fonts/KFOmCnqEu92Fr1Mu4mxM.9b78ea3b.woff",revision:null},{url:"/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.73d1c707.woff",revision:null},{url:"/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.4e5d88c6.woff2",revision:null},{url:"/icons/GerenciaEntregas.png",revision:"39d22bf642770c99370fef85ce80aad1"},{url:"/icons/clientes.png",revision:"0c890dec0c6606cb19408dcd4286029a"},{url:"/icons/comandas.ICO",revision:"edde10838d00e89d5b4960a3857db8ae"},{url:"/icons/emitente.png",revision:"89c98d93185c0faacfb0f26beb041767"},{url:"/icons/formaspagamento.png",revision:"daa5f93f706dcabb717562f1242ffd3d"},{url:"/icons/fornecedor.png",revision:"7af09dd466f73280a2e8d48365eac04a"},{url:"/icons/funcionario.png",revision:"261867914510008b4fe9f615d5f82f27"},{url:"/icons/impressoras.ico",revision:"cf30dee29e506777f0d6bb85d06a4351"},{url:"/icons/opcionais.ICO",revision:"f2c63077b54182d4a9320d6d63f9a20e"},{url:"/icons/produtos.png",revision:"b4aced2d290ded81fd79d35f4f70af02"},{url:"/icons/transportadora.png",revision:"4f0d4ca1ad2834fa7dfb488c2e4cdc92"},{url:"/img/logo.42dc0442.png",revision:null},{url:"/index.html",revision:"06bc8a4a03338b0af9837d27d1cbb9bc"},{url:"/js/137.d1467204.js",revision:null},{url:"/js/276.7f9568a9.js",revision:null},{url:"/js/298.95f8dea6.js",revision:null},{url:"/js/308.565e5d45.js",revision:null},{url:"/js/330.e269ad06.js",revision:null},{url:"/js/347.d432ac20.js",revision:null},{url:"/js/377.958adeab.js",revision:null},{url:"/js/404.ab7ad7c5.js",revision:null},{url:"/js/422.f96b815e.js",revision:null},{url:"/js/436.dba547ee.js",revision:null},{url:"/js/443.6d494fab.js",revision:null},{url:"/js/454.c0a6e09b.js",revision:null},{url:"/js/503.a1bc9c26.js",revision:null},{url:"/js/561.514d7047.js",revision:null},{url:"/js/60.030a1edc.js",revision:null},{url:"/js/654.1ec740f5.js",revision:null},{url:"/js/734.cfd61c39.js",revision:null},{url:"/js/769.3c7fad79.js",revision:null},{url:"/js/814.d0229c9b.js",revision:null},{url:"/js/912.4421f9bf.js",revision:null},{url:"/js/app.10e1e090.js",revision:null},{url:"/js/chunk-common.d44fa78c.js",revision:null},{url:"/js/vendor.ab2d581d.js",revision:null},{url:"/manifest.json",revision:"ad155ffa919e01bbd4fa2efbb6133b43"}],{}),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("/index.html"),{denylist:[/service-worker\.js$/,/workbox-(.)*\.js$/]}))}));