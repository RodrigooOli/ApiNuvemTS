(self["webpackChunkret"]=self["webpackChunkret"]||[]).push([[769],{1769:(t,e,l)=>{"use strict";l.r(e),l.d(e,{default:()=>M});var a=l(3673),i=l(8880);const o=(0,a.Uk)(" FILTROS "),s=(0,a.Wm)("label",null,"Data Início",-1),r=(0,a.Wm)("br",null,null,-1),n=(0,a.Wm)("label",null,"Data Fim",-1),u=(0,a.Wm)("br",null,null,-1),d=(0,a.Uk)(" Gerar relatório ");function m(t,e,l,m,f,p){const w=(0,a.up)("RelatorioPage"),c=(0,a.up)("q-toolbar-title"),h=(0,a.up)("q-toolbar"),b=(0,a.up)("q-input"),F=(0,a.up)("q-btn"),W=(0,a.up)("q-form"),g=(0,a.up)("q-item-section"),C=(0,a.up)("q-item"),v=(0,a.up)("q-list"),y=(0,a.up)("q-drawer"),Z=(0,a.Q2)("ripple");return(0,a.wg)(),(0,a.j4)("div",null,[(0,a.Wm)(w,{rows:t.rows,columns:t.columns,totais:t.totais,filtros:t.filtros,totaisColunas:t.totaisColunas,title:"",onToggleDrawerFilters:e[1]||(e[1]=e=>t.drawerFilters=!t.drawerFilters)},null,8,["rows","columns","totais","filtros","totaisColunas"]),(0,a.Wm)(y,{"show-if-above":"",modelValue:t.drawerFilters,"onUpdate:modelValue":e[4]||(e[4]=e=>t.drawerFilters=e),side:"right"},{default:(0,a.w5)((()=>[(0,a.Wm)(h,null,{default:(0,a.w5)((()=>[(0,a.Wm)(c,null,{default:(0,a.w5)((()=>[o])),_:1})])),_:1}),(0,a.Wm)(v,null,{default:(0,a.w5)((()=>[(0,a.Wm)(C,null,{default:(0,a.w5)((()=>[(0,a.Wm)(g,null,{default:(0,a.w5)((()=>[(0,a.Wm)(W,{onSubmit:(0,i.iM)(t.gerarRelatorio,["prevent","stop"]),style:{width:"100%","max-width":"400px"}},{default:(0,a.w5)((()=>[s,(0,a.Wm)(b,{type:"date",filled:"",modelValue:t.filtros.dataIni,"onUpdate:modelValue":e[2]||(e[2]=e=>t.filtros.dataIni=e)},null,8,["modelValue"]),r,n,(0,a.Wm)(b,{type:"date",filled:"",modelValue:t.filtros.dataFim,"onUpdate:modelValue":e[3]||(e[3]=e=>t.filtros.dataFim=e)},null,8,["modelValue"]),u,(0,a.wy)((0,a.Wm)(F,{color:"blue",class:"q-pa-md",type:"submit",style:{width:"100%"},onClick:t.closeMenuFiltros},{default:(0,a.w5)((()=>[d])),_:1},8,["onClick"]),[[Z]])])),_:1},8,["onSubmit"])])),_:1})])),_:1})])),_:1})])),_:1},8,["modelValue"])])}var f=l(1959),p=l(4459),w=l(4399),c=l(3649);const h=(0,f.iH)({dataIni:(0,c.C3)(0,3).inicio,dataFim:(0,c.C3)(0,3).fim}),b=[t=>!!t.dataIni&&!!t.dataFim||"Informe o período!"],F=function(t){return t.map((t=>{const e=this.$store.state.lojas.ls.find((e=>e.id==t.id)).nome;return{loja:e}}))},W={},g={},C={},v=function(t){return[]},y=function(t){return Object.keys(t).map((e=>({name:e,label:(this.labels[e]||e).toUpperCase(),field:e,align:isNaN(parseInt(t[e]))?"left":"right",sortable:!0,format:this.format[e]})))},Z=(0,a.aZ)({name:"",components:{RelatorioPage:w.Z},setup:()=>({filtros:h,format:g,labels:W,validate:b,setRows:F,setColumns:y,setTotais:v,totaisColunas:C}),data(){return{drawerFilters:!1,totais:[],rows:[],columns:[]}},methods:{async gerarRelatorio(){if(!await this.valida())return;const t=await p.b.gerarRelatorio("",this.filtros);this.rows=this.setRows.bind(this)(t),this.columns=this.setColumns.bind(this)(this.rows[0]||{}),this.totais=this.setTotais.bind(this)(this.rows)},async valida(){const t=this.validate||[];for(let e=0;e<t.length;e++){const l=t[e],a=await l(this.filtros);if("string"===typeof a)return this.$q.notify({type:"negative",message:a}),!1}return!0},closeMenuFiltros(){this.drawerFilters=innerWidth>1200||!this.drawerFilters}}});var q=l(2428),I=l(9570),Q=l(3747),k=l(7011),R=l(3414),V=l(2035),_=l(5269),T=l(4842),U=l(2165),j=l(6489),D=l(7518),S=l.n(D);Z.render=m;const M=Z;S()(Z,"components",{QDrawer:q.Z,QToolbar:I.Z,QToolbarTitle:Q.Z,QList:k.Z,QItem:R.Z,QItemSection:V.Z,QForm:_.Z,QInput:T.Z,QBtn:U.Z}),S()(Z,"directives",{Ripple:j.Z})}}]);