(self["webpackChunkbase"]=self["webpackChunkbase"]||[]).push([[881],{5881:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>y});var l=a(3673),n=a(2323);const o=(0,l.Wm)("span",{class:"text-bold text-h5 text-blue"},"AdminPlus",-1),u=(0,l.Uk)("Sair"),s=(0,l.Uk)("MENU");function i(e,t,a,i,r,c){const d=(0,l.up)("q-btn"),p=(0,l.up)("q-toolbar-title"),m=(0,l.up)("q-item-label"),b=(0,l.up)("q-item-section"),w=(0,l.up)("q-item"),f=(0,l.up)("q-list"),W=(0,l.up)("q-btn-dropdown"),h=(0,l.up)("q-toolbar"),_=(0,l.up)("q-header"),q=(0,l.up)("q-icon"),v=(0,l.up)("q-drawer"),g=(0,l.up)("router-view"),k=(0,l.up)("q-page-container"),Z=(0,l.up)("q-layout");return(0,l.wg)(),(0,l.j4)(Z,{view:"lHh Lpr lFf"},{default:(0,l.w5)((()=>[(0,l.Wm)(_,{class:"bg-transparent"},{default:(0,l.w5)((()=>[(0,l.Wm)(h,{class:"bg-white text-black"},{default:(0,l.w5)((()=>[(0,l.Wm)(d,{flat:"",round:"",icon:"menu","aria-label":"Menu",onClick:e.toggleLeftDrawer},null,8,["onClick"]),(0,l.Wm)(p,null,{default:(0,l.w5)((()=>[o])),_:1}),(0,l.Wm)(W,{unelevated:"",label:e.$store.state.repr.nome},{default:(0,l.w5)((()=>[(0,l.Wm)(f,null,{default:(0,l.w5)((()=>[(0,l.Wm)(w,{clickable:"",class:"text-red",onClick:e.sair},{default:(0,l.w5)((()=>[(0,l.Wm)(b,null,{default:(0,l.w5)((()=>[(0,l.Wm)(m,null,{default:(0,l.w5)((()=>[u])),_:1})])),_:1})])),_:1},8,["onClick"])])),_:1})])),_:1},8,["label"])])),_:1})])),_:1}),(0,l.Wm)(v,{modelValue:e.leftDrawerOpen,"onUpdate:modelValue":t[1]||(t[1]=t=>e.leftDrawerOpen=t),"show-if-above":""},{default:(0,l.w5)((()=>[(0,l.Wm)(f,null,{default:(0,l.w5)((()=>[(0,l.Wm)(w,{class:"q-pa-md"},{default:(0,l.w5)((()=>[(0,l.Wm)(m,{class:"text-bold text-blue"},{default:(0,l.w5)((()=>[s])),_:1})])),_:1}),((0,l.wg)(!0),(0,l.j4)(l.HY,null,(0,l.Ko)(e.optionsMenu,((e,t)=>((0,l.wg)(),(0,l.j4)(w,{clickable:"",key:t,class:"q-mb-l q-pa-md",to:e.to,disable:e.disable,"exact-active-class":"bg-blue-1"},{default:(0,l.w5)((()=>[(0,l.Wm)(b,{avatar:""},{default:(0,l.w5)((()=>[(0,l.Wm)(q,{name:e.icon,class:"q-pa-sm text-blue-9"},null,8,["name"])])),_:2},1024),(0,l.Wm)(b,null,{default:(0,l.w5)((()=>[(0,l.Wm)(m,{class:"text-grey-8 text-bold"},{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.title),1)])),_:2},1024),(0,l.Wm)(m,{caption:""},{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.subtitle),1)])),_:2},1024)])),_:2},1024)])),_:2},1032,["to","disable"])))),128))])),_:1})])),_:1},8,["modelValue"]),(0,l.Wm)(k,null,{default:(0,l.w5)((()=>[(0,l.Wm)(g)])),_:1})])),_:1})}var r=a(1959),c=a(7874),d=function(e,t,a,l){function n(e){return e instanceof a?e:new a((function(t){t(e)}))}return new(a||(a=Promise))((function(a,o){function u(e){try{i(l.next(e))}catch(t){o(t)}}function s(e){try{i(l["throw"](e))}catch(t){o(t)}}function i(e){e.done?a(e.value):n(e.value).then(u,s)}i((l=l.apply(e,t||[])).next())}))};const p=(0,l.aZ)({name:"MainLayout",setup(){const e=[{icon:"home",title:"Início",subtitle:"Ir para o ínicio",to:"/",disable:!1},{icon:"store",title:"Lojas",subtitle:"Visualizar e Cadastrar novas lojas no Galileo Plus",to:"lojas",disable:!0}],t=(0,r.iH)(!1);return{optionsMenu:e,leftDrawerOpen:t,toggleLeftDrawer(){t.value=!t.value}}},mounted(){return d(this,void 0,void 0,(function*(){yield this.LOGIN(),this.$store.state.repr.interno&&this.optionsMenu.push({icon:"person_add",title:"Representantes",subtitle:"Ver e editar representantes do Galileo Plus",to:"representantes",disable:!0})}))},methods:Object.assign(Object.assign({},(0,c.nv)("repr",["LOGIN"])),{sair(){this.$q.sessionStorage.remove("gp-repr"),location.reload()}})});var m=a(3066),b=a(3812),w=a(9570),f=a(2165),W=a(3747),h=a(2670),_=a(7011),q=a(3414),v=a(2035),g=a(2350),k=a(2428),Z=a(4554),x=a(2652),Q=a(7518),L=a.n(Q);p.render=i;const y=p;L()(p,"components",{QLayout:m.Z,QHeader:b.Z,QToolbar:w.Z,QBtn:f.Z,QToolbarTitle:W.Z,QBtnDropdown:h.Z,QList:_.Z,QItem:q.Z,QItemSection:v.Z,QItemLabel:g.Z,QDrawer:k.Z,QIcon:Z.Z,QPageContainer:x.Z})}}]);