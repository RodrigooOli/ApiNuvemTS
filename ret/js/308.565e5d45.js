(self["webpackChunkret"]=self["webpackChunkret"]||[]).push([[308],{4648:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>L});var l=a(3673),o=a(2323);const r=(0,l.Wm)("span",{class:"text-blue text-bold"},"Retaguarda ",-1),s=(0,l.Wm)("span",{class:"text-body2"},"Cadastros",-1),u=(0,l.Uk)("Sair");function n(e,t,a,n,i,d){const c=(0,l.up)("q-btn"),m=(0,l.up)("q-toolbar-title"),p=(0,l.up)("q-item-label"),w=(0,l.up)("q-item-section"),f=(0,l.up)("q-item"),b=(0,l.up)("q-list"),W=(0,l.up)("q-btn-dropdown"),g=(0,l.up)("q-toolbar"),_=(0,l.up)("q-separator"),Z=(0,l.up)("q-header"),q=(0,l.up)("Drawer"),S=(0,l.up)("router-view"),h=(0,l.up)("q-page-container"),Q=(0,l.up)("q-layout");return(0,l.wg)(),(0,l.j4)(Q,{view:"lHh LpR lFf"},{default:(0,l.w5)((()=>[(0,l.Wm)(Z,{class:"bg-grey-1"},{default:(0,l.w5)((()=>[(0,l.Wm)(g,{class:""},{default:(0,l.w5)((()=>[(0,l.Wm)(c,{flat:"",round:"",icon:"menu","aria-label":"Menu",class:"lt-md",color:"primary",onClick:e.toggleDrawer},null,8,["onClick"]),(0,l.Wm)(m,{class:"text-blue",style:{padding:"0px"}},{default:(0,l.w5)((()=>[r,s])),_:1}),(0,l.Wm)(W,{rounded:"",class:"text-blue-8",flat:"","dropdown-icon":"person"},{default:(0,l.w5)((()=>[(0,l.Wm)(b,null,{default:(0,l.w5)((()=>[(0,l.Wm)(f,null,{default:(0,l.w5)((()=>[(0,l.Wm)(w,null,{default:(0,l.w5)((()=>[(0,l.Wm)(p,null,{default:(0,l.w5)((()=>[(0,l.Uk)((0,o.zw)(e.user.nome),1)])),_:1})])),_:1})])),_:1}),(0,l.Wm)(f,{clickable:"",class:"text-red",onClick:e.sair},{default:(0,l.w5)((()=>[(0,l.Wm)(w,null,{default:(0,l.w5)((()=>[(0,l.Wm)(p,null,{default:(0,l.w5)((()=>[u])),_:1})])),_:1})])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1}),(0,l.Wm)(_)])),_:1}),(0,l.Wm)(q),(0,l.Wm)(h,null,{default:(0,l.w5)((()=>[(0,l.Wm)(S)])),_:1})])),_:1})}var i=a(515),d=a.n(i),c=a(7874),m=a(8942),p=a(3242);const w=(0,l.aZ)({name:"RelatorioLayout",components:{ToggleLojas:m.Z,Drawer:p.Z},setup(){return{toggleDrawer:p.w}},async mounted(){await this.SET_USER(),await this.SET_LOJAS()},computed:{user(){return this.$store.state.user},lojas(){return this.$store.state.lojas}},methods:d()(d()(d()({},(0,c.nv)("user",["SET_USER"])),(0,c.nv)("lojas",["SET_LOJAS"])),{},{routerGo(e){console.log(e)},sair(){this.$q.sessionStorage.clear(),this.$q.localStorage.remove("gp-l-s"),location.reload()}})});var f=a(3066),b=a(3812),W=a(9570),g=a(2165),_=a(3747),Z=a(2670),q=a(7011),S=a(3414),h=a(2035),Q=a(2350),k=a(5869),v=a(2652),y=a(7518),C=a.n(y);w.render=n;const L=w;C()(w,"components",{QLayout:f.Z,QHeader:b.Z,QToolbar:W.Z,QBtn:g.Z,QToolbarTitle:_.Z,QBtnDropdown:Z.Z,QList:q.Z,QItem:S.Z,QItemSection:h.Z,QItemLabel:Q.Z,QSeparator:k.Z,QPageContainer:v.Z})}}]);