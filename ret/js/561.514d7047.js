(self["webpackChunkret"]=self["webpackChunkret"]||[]).push([[561],{9585:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>St});var o=a(3673);const s={class:"q-pl-md q-pr-md"},r={class:"row"},n={class:"col-xs-12 col-sm-12 col-md-6 col-lg-5 q-pa-sm"},i={class:"col-xs-12 col-sm-12 col-md-6 col-lg-7 q-pa-sm"},l={class:"row"},c={class:"col-xs-12 col-sm-12 col-md-6 col-lg-7 q-pa-sm"},d={class:"col-xs-12 col-sm-12 col-md-6 col-lg-5 q-pa-sm"},m={class:"row"},p={class:"col-xs-12 col-sm-12 col-md-6 col-lg-5 q-pa-sm"},u={class:"col-xs-12 col-sm-12 col-md-6 col-lg-7 q-pa-sm"},h=(0,o.Wm)("div",{style:{height:"300px"}},null,-1);function g(t,e,a,g,f,w){const x=(0,o.up)("ToggleLojas"),b=(0,o.up)("Totais"),y=(0,o.up)("GraficoRankingDeVendas"),v=(0,o.up)("GraficoVendasFormaPgto"),W=(0,o.up)("GraficoFaturamento"),C=(0,o.up)("GraficoFaturamentoPorCaixa"),$=(0,o.up)("GraficoCentroDeCusto"),_=(0,o.up)("TableContasAPagar"),k=(0,o.up)("q-page");return(0,o.wg)(),(0,o.j4)(k,null,{default:(0,o.w5)((()=>[(0,o.Wm)(x,{onRecarregaInformacoes:w.recarregaInformacoes},null,8,["onRecarregaInformacoes"]),(0,o.Wm)("div",s,[(0,o.Wm)(b),(0,o.Wm)("div",r,[(0,o.Wm)("div",n,[(0,o.Wm)(y)]),(0,o.Wm)("div",i,[(0,o.Wm)(v)])]),(0,o.Wm)("div",l,[(0,o.Wm)("div",c,[(0,o.Wm)(W)]),(0,o.Wm)("div",d,[(0,o.Wm)(C)])]),(0,o.Wm)("div",m,[(0,o.Wm)("div",p,[(0,o.Wm)($)]),(0,o.Wm)("div",u,[(0,o.Wm)(_)])]),h])])),_:1})}var f=a(8942),w=a(2323);const x={class:"row"},b={class:"ellipsis"},y=(0,o.Wm)("br",null,null,-1),v={class:""};function W(t,e,a,s,r,n){const i=(0,o.up)("q-tooltip"),l=(0,o.up)("q-space"),c=(0,o.up)("q-icon"),d=(0,o.up)("q-card-section"),m=(0,o.up)("q-card");return(0,o.wg)(),(0,o.j4)("div",x,[((0,o.wg)(!0),(0,o.j4)(o.HY,null,(0,o.Ko)(t.infoTotais,(e=>((0,o.wg)(),(0,o.j4)("div",{class:"col-xs-12 col-sm-12 col-md-6 col-lg-3 q-pa-sm",key:e.title},[(0,o.Wm)(m,{class:"card q-pa-md"},{default:(0,o.w5)((()=>[(0,o.Wm)(i,null,{default:(0,o.w5)((()=>[(0,o.Uk)(" R$ "+(0,w.zw)(t.parseReal(t.value(e.key)||0)),1)])),_:2},1024),(0,o.Wm)(d,{class:"flex",style:{"flex-wrap":"nowrap"}},{default:(0,o.w5)((()=>[(0,o.Wm)("div",b,[(0,o.Wm)("span",{class:"text-h5 "+(t.value(e.key)<0?"text-red":"")}," R$ "+(0,w.zw)(t.parseReal(t.value(e.key)||0)),3),y,(0,o.Wm)("span",{class:`text-${e.color} text-bold`},(0,w.zw)(e.title),3)]),(0,o.Wm)(l),(0,o.Wm)("div",v,[(0,o.Wm)(c,{name:e.icon,color:e.color,class:"",style:{"font-size":"50px"}},null,8,["name","color"])])])),_:2},1024)])),_:2},1024)])))),128))])}var C=a(3649);const $=(0,o.aZ)({name:"Totais",setup(){return{parseReal:C.im}},data(){return{infoTotais:[{title:"Receitas",key:"entradas",icon:"trending_up",color:"green"},{title:"Despesas",key:"saidas",icon:"trending_down",color:"red"},{title:"Saldo",key:"saldo",icon:"swap_vertical_circle",color:"blue"},{title:"Média mensal",key:"previsao",icon:"pending_actions",color:"orange"}]}},methods:{value(t){return this.$store.state.geral.totais[t]}}});var _=a(151),k=a(8870),q=a(5589),R=a(2025),S=a(4554),j=a(7518),F=a.n(j);$.render=W;const D=$;F()($,"components",{QCard:_.Z,QTooltip:k.Z,QCardSection:q.Z,QSpace:R.Z,QIcon:S.Z});const P=(0,o.HX)("data-v-22c12da3");(0,o.dD)("data-v-22c12da3");const Q=(0,o.Uk)(" Valor total á pagar: "),O={class:"text-bold"};(0,o.Cn)();const Z=P(((t,e,a,s,r,n)=>{const i=(0,o.up)("q-td"),l=(0,o.up)("q-tr"),c=(0,o.up)("q-table");return(0,o.wg)(),(0,o.j4)(c,{rows:n.rowsContas,columns:n.columnsContas,"row-key":`${Math.random()}`,flat:"",title:"Contas à pagar","title-class":"text-grey text-h5",separator:"none","rows-per-page-options":[0],"no-data-label":"Sem pagamentos pendentes no período selecionado",class:"card q-pa-xs",style:{height:"430px"}},{body:P((t=>[(0,o.Wm)(l,{props:t},{default:P((()=>[((0,o.wg)(!0),(0,o.j4)(o.HY,null,(0,o.Ko)(Object.keys(t.row).filter((t=>"id"!==t)),((e,a)=>((0,o.wg)(),(0,o.j4)(i,{key:a,align:isNaN(t.row[e])?"left":"right"},{default:P((()=>[(0,o.Uk)((0,w.zw)(t.cols.find((t=>t.name===e)).value),1)])),_:2},1032,["align"])))),128))])),_:2},1032,["props"])])),bottom:P((()=>[(0,o.Wm)(l,{class:"total-a-pagar"},{default:P((()=>[(0,o.Wm)(i,null,{default:P((()=>[Q,(0,o.Wm)("span",O," R$ "+(0,w.zw)(r.totalAPagar.toLocaleString("pt-br",{minimumFractionDigits:2,maximumFractionDigits:2})),1)])),_:1})])),_:1})])),_:1},8,["rows","columns","row-key"])})),I={name:"TableContasAPagar",data(){return{totalAPagar:0}},computed:{rowsContas(){return this.$store.state.geral.contas.filter((t=>(0===t.id&&(this.totalAPagar=parseFloat(t.valor)),0!==t.id))).map((t=>({vencimento:t.vencimento,valor:t.valor,descricao:t.descricao,nome:t.nome})))},columnsContas(){const t={nome:"LOJA",descricao:"DESCRICAO",valor:"VALOR (R$)",vencimento:"VENCIMENTO"},e={nome:(t,e)=>t,descricao:(t,e)=>t,valor:(t,e)=>parseFloat(t).toLocaleString("pt-br",{minimumFractionDigits:2,maximumFractionDigits:2}),vencimento:(t,e)=>new Date(t).toLocaleDateString("pt-br")},a={vencimento:(t,e)=>Date.parse(t)-Date.parse(e)};return Object.keys(this.rowsContas[0]||{}).filter((t=>"id"!==t)).map((o=>({name:o,label:t[o],field:o,sortable:!0,format:e[o],sort:a[o],align:"vencimento"===o||isNaN(parseInt(this.rowsContas[0][o]))?"left":"right"})))}}};var T=a(6429),V=a(8186),G=a(3884);I.render=Z,I.__scopeId="data-v-22c12da3";const z=I;F()(I,"components",{QTable:T.Z,QTr:V.Z,QTd:G.Z});const A=(0,o.Wm)("span",{class:"text-h5 text-grey"},"Centro de custo",-1),L=(0,o.Uk)(),H=(0,o.Wm)("br",null,null,-1),N={class:"text-grey",style:{"font-size":"13px"}};function M(t,e,a,s,r,n){const i=(0,o.up)("JsCharting"),l=(0,o.up)("q-card-section"),c=(0,o.up)("q-card");return(0,o.wg)(),(0,o.j4)(c,{class:"card",style:{height:"430px"}},{default:(0,o.w5)((()=>[(0,o.Wm)(l,null,{default:(0,o.w5)((()=>[A,L,H,(0,o.Wm)("span",N," Gasto total: R$ "+(0,w.zw)(r.total),1),(0,o.Wm)(i,{points:n.centroDeCusto},null,8,["points"])])),_:1})])),_:1})}a(107);function J(t,e,a,s,r,n){return(0,o.wg)(),(0,o.j4)("div",{id:a.id,style:{width:"100%",height:"350px"}},null,8,["id"])}var U=a(1205);const E={props:{points:{type:Array,default:[]},type:{type:String,default:"pieDonut"},id:{type:String,default:"chartDiv"}},watch:{points:{handler(t){U.FA.chart(`${this.$props.id}`,{defaultSeries:{type:"donut"},defaultCultureName:"pt-br",legend_position:"bottom",defaultPoint:{tooltip:"%name <b>R$ {%yValue}</b> <br/>%percentOfTotal% do faturamento total"},series:[{name:"",type:this.$props.type,shape:{innerSize:"50%"},angle:{orientation:90,sweep:"%PercentOfTotal%"},points:this.$props.points}]})}}}};E.render=J;const K=E,Y={name:"GraficoCentroDeCusto",data(){return{total:0}},components:{JsCharting:K},computed:{centroDeCusto:{get(){const t=this.$store.state.geral.centroDeCusto;return this.total=(0,C.im)(t.filter((t=>"ZZZTOTAL"!==t.grupo)).reduce(((t,e)=>t+e.valor),0)),t.filter((t=>"ZZZTOTAL"!==t.grupo)).map((t=>({name:t.grupo,y:t.valor||0})))}}}};Y.render=M;const X=Y;F()(Y,"components",{QCard:_.Z,QCardSection:q.Z});const B=(0,o.Wm)("span",{class:"text-h5 text-grey"},"Faturamento diário",-1),tt=(0,o.Wm)("div",{id:"id",style:{height:"100%",width:"100%"}},null,-1);function et(t,e,a,s,r,n){const i=(0,o.up)("q-card-section"),l=(0,o.up)("q-card");return(0,o.wg)(),(0,o.j4)(l,{class:"card flex flex-center",style:{height:"430px"}},{default:(0,o.w5)((()=>[(0,o.Wm)(i,{style:{height:"100%",width:"100%"}},{default:(0,o.w5)((()=>[B,tt])),_:1})])),_:1})}var at=a(515),ot=a.n(at),st=a(3502),rt=a.n(st),nt=a(1959);const it={name:"GraficoFaturamentoxDespesa",data(){return{chart:(0,nt.iH)({}),chartOptions:{chart:{type:"line",height:350,dropShadow:{enabled:!0,top:0,left:0,blur:2,opacity:.5,color:"blue"},xaxis:{show:!1}},series:[{data:[]}]}}},mounted(){this.chart=new(rt())(document.querySelector("#id"),this.chartOptions),this.chart.render()},computed:{labels:{get(){return Object.keys(this.$store.state.geral.faturamentoPorDia)}},series:{get(){return Object.values(this.$store.state.geral.faturamentoPorDia)}}},watch:{series:{handler(){this.chart.updateOptions(ot()(ot()({},this.chartOptions),{},{series:[{name:"R$",data:this.series}],markers:{size:[4,7]},xaxis:{categories:this.labels,labels:{show:!1}},yaxis:{labels:{formatter:t=>(0,C.im)(t)}}}))}}}};it.render=et;const lt=it;F()(it,"components",{QCard:_.Z,QCardSection:q.Z});const ct=(0,o.Wm)("span",{class:"text-h5 text-grey"},"Faturamento Por Caixa",-1),dt=(0,o.Uk)(),mt=(0,o.Wm)("br",null,null,-1);function pt(t,e,a,s,r,n){const i=(0,o.up)("JsCharting"),l=(0,o.up)("q-card-section"),c=(0,o.up)("q-card");return(0,o.wg)(),(0,o.j4)(c,{class:"card",style:{height:"430px"}},{default:(0,o.w5)((()=>[(0,o.Wm)(l,null,{default:(0,o.w5)((()=>[ct,dt,mt,(0,o.Wm)(i,{id:"graficoFaturamentoPorCaixa",points:n.faturamentoPorCaixa},null,8,["points"])])),_:1})])),_:1})}const ut={name:"GraficoFaturamentoPorCaixa",components:{JsCharting:K},computed:{faturamentoPorCaixa:{get(){const t=this.$store.state.geral.faturamentoPorCaixa,e=Object.keys(t).map((e=>({name:`Caixa ${e}`,y:(0,C.p3)(t[e])})));return e}}}};ut.render=pt;const ht=ut;F()(ut,"components",{QCard:_.Z,QCardSection:q.Z});const gt=(0,o.Wm)("span",{class:"text-h5 text-grey"},"Forma de Pagamento ",-1),ft=(0,o.Wm)("div",{id:"grafico_vendas_por_forma_pgto",style:{height:"100%",width:"100%"}},null,-1);function wt(t,e,a,s,r,n){const i=(0,o.up)("q-card-section"),l=(0,o.up)("q-card");return(0,o.wg)(),(0,o.j4)(l,{class:"card flex flex-center",style:{height:"430px"}},{default:(0,o.w5)((()=>[(0,o.Wm)(i,{style:{width:"100%"}},{default:(0,o.w5)((()=>[gt,ft])),_:1})])),_:1})}const xt={name:"GraficoVendasFormaPgto",data(){return{chart:(0,nt.iH)({}),chartOptions:{chart:{type:"bar",height:350,dropShadow:{enabled:!0,top:0,left:0,blur:2,opacity:.5},xaxis:{show:!1}},series:[],labels:[]}}},mounted(){this.chart=new(rt())(document.querySelector("#grafico_vendas_por_forma_pgto"),this.chartOptions),this.chart.render()},computed:{labels:{get(){return Object.keys(this.$store.state.geral.vendasPorFormaPagamento)}},series:{get(){return Object.values(this.$store.state.geral.vendasPorFormaPagamento)}}},watch:{series:{handler(){this.chart.updateOptions({chart:{dropShadow:{enabled:!0,top:1,left:1,blur:10,color:"#fff",opacity:.35}},series:[{name:"R$",data:this.series}],plotOptions:{bar:{barHeight:"100%",horizontal:!0,dataLabels:{position:"bottom"}}},dataLabels:{enabled:!0,formatter:(t,e)=>`R$ ${(0,C.im)(t)}`,style:{colors:["#001055"]},textAnchor:"start"},xaxis:{show:!1,categories:this.labels,labels:{show:!1,formatter:(t,e)=>`R$ ${(0,C.im)(t)}`}},yaxis:{labels:{}}})}}}};xt.render=wt;const bt=xt;F()(xt,"components",{QCard:_.Z,QCardSection:q.Z});const yt=(0,o.Wm)("div",{class:"flex justify-between"},[(0,o.Wm)("span",{class:"text-h5 text-grey"}," Ranking de Vendas "),(0,o.Wm)("span",{class:"text-grey"},"Top 10")],-1),vt={class:"text-green"},Wt=(0,o.Wm)("div",{id:"grafico_ranking_de_vendas",style:{width:"100%",height:"350px"}},null,-1);function Ct(t,e,a,s,r,n){const i=(0,o.up)("q-card-section"),l=(0,o.up)("q-card");return(0,o.wg)(),(0,o.j4)(l,{class:"card flex flex-center",style:{height:"430px"}},{default:(0,o.w5)((()=>[(0,o.Wm)(i,{style:{width:"100%"}},{default:(0,o.w5)((()=>[yt,(0,o.Wm)("span",vt,(0,w.zw)(r.nomeloja),1),Wt])),_:1})])),_:1})}a(7098);const $t={name:"GraficoRankingDeVendas",data(){return{nomeloja:"...",chart:(0,nt.iH)({}),chartOptions:{chart:{type:"bar",height:350,dropShadow:{enabled:!0,top:0,left:0,blur:2,opacity:.5},xaxis:{show:!1}},series:[],labels:[]}}},mounted(){this.chart=new(rt())(document.querySelector("#grafico_ranking_de_vendas"),this.chartOptions),this.chart.render()},computed:{porValor:{get(){const t=this.$store.state.geral.rankingDeVendas.map((t=>({name:`${t.descricao} - ${this.$store.state.lojas.ls.find((e=>e.id===t.id)).nome}`,x:t.descricao,y:parseFloat(parseFloat(t.vl_total).toFixed(2))}))).sort(((t,e)=>t.y>e.y?-1:0));return t.length=t.length>10?10:t.length,t}},porQntd:{get(){const t=this.$store.state.geral.rankingDeVendas.map((t=>({name:`${t.descricao} - ${this.$store.state.lojas.ls.find((e=>e.id===t.id)).nome}`,x:t.descricao,y:parseFloat(parseFloat(t.qntd).toFixed(3))}))).sort(((t,e)=>t.y>e.y?-1:1));return t.length=t.length>10?10:t.length,t}}},watch:{porValor:{handler(){const t=this.chart;this.chart.updateOptions(innerWidth>=800?{chart:{events:{legendClick:function(e,a,o){t.showSeries(1===a?"Qtd.":"R$"),t.hideSeries(0===a?"Qtd.":"R$")}}},series:[{name:"R$",data:this.porValor,color:"#03fc6b"},{name:"Qtd.",data:this.porQntd,color:"#03a1fc"}],plotOptions:{bar:{barHeight:"100%",horizontal:!1,dataLabels:{position:"bottom"}}},dataLabels:{enabled:!1},xaxis:{labels:{show:!0,formatter:(t,e)=>(e&&e.w&&(this.nomeloja=e.w.config.series[e.seriesIndex].data[e.dataPointIndex].name),t)}},yaxis:{labels:{formatter:(t,e)=>"object"===typeof e&&1===e.seriesIndex?parseFloat(t).toFixed(3):(0,C.im)(t)}}}:{chart:{type:"bar",height:350,dropShadow:{enabled:!0,top:0,left:0,blur:2,opacity:.5},events:{legendClick:function(e,a,o){t.showSeries(1===a?"Qtd.":"R$"),t.hideSeries(0===a?"Qtd.":"R$")}}},tooltip:{enable:!1,x:{show:!0,format:"dd MMM",formatter:void 0}},plotOptions:{bar:{barHeight:"100%",horizontal:!0,dataLabels:{position:"bottom"}}},dataLabels:{enabled:!0,formatter:(t,e)=>`${e.w.config.series[e.seriesIndex].name} ${(0,C.im)(t)}`,style:{colors:["#001055"],fontSize:"10px"},textAnchor:"start"},xaxis:{labels:{show:!1,formatter:(t,e)=>(e.w&&(this.nomeloja=e.w.config.series[e.seriesIndex].data[e.dataPointIndex].name),t)}},series:[{name:"R$",data:this.porValor,color:"#03fc6b"},{name:"Qtd.",data:this.porQntd,color:"#03a1fc"}],yaxis:{show:!0}}),t.showSeries("R$"),t.hideSeries("Qtd.")}}}};$t.render=Ct;const _t=$t;F()($t,"components",{QCard:_.Z,QCardSection:q.Z});var kt=a(4459);const qt={name:"DashboardView",data(){return{tempoRefresh:0,timeInterval:null}},components:{ToggleLojas:f.Z,Totais:D,TableContasAPagar:z,GraficoCentroDeCusto:X,GraficoFaturamento:lt,GraficoFaturamentoPorCaixa:ht,GraficoVendasFormaPgto:bt,GraficoRankingDeVendas:_t},methods:{async carregaInformacoes(){await kt.b.loadDashboard(this.$store)},async recarregaInformacoes(){this.tempoRefresh=0,clearInterval(this.timeInterval),this.timeInterval=setInterval((()=>{this.tempoRefresh+=1,5===this.tempoRefresh&&(clearInterval(this.timeInterval),this.carregaInformacoes())}),100)}}};var Rt=a(4379);qt.render=g;const St=qt;F()(qt,"components",{QPage:Rt.Z})}}]);