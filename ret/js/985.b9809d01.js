(self["webpackChunkbase"]=self["webpackChunkbase"]||[]).push([[985],{7985:(e,a,t)=>{"use strict";t.r(a),t.d(a,{default:()=>U});var l=t(3673);const o=(0,l.Wm)("div",{class:"q-pb-xl q-pt-xl"},[(0,l.Wm)("span",{class:"text-h3 text-blue"},"Controle Galileo Plus")],-1),r=(0,l.Wm)("br",null,null,-1),n={style:{position:"absolute",top:"0px",left:"0px","z-index":"-1"}},s=(0,l.Wm)("span",{class:"text-blue-grey text-bold"},"Gerar chave SAT",-1);function i(e,a,t,i,c,m){const d=(0,l.up)("q-separator"),p=(0,l.up)("q-icon"),u=(0,l.up)("q-btn"),h=(0,l.up)("ModalGerarSAT"),b=(0,l.up)("q-page");return(0,l.wg)(),(0,l.j4)(b,{padding:""},{default:(0,l.w5)((()=>[o,(0,l.Wm)(d),r,(0,l.Wm)(u,{flat:"",class:"bg-blue-1 q-pa-lg",style:{position:"relative"},onClick:a[1]||(a[1]=a=>e.modalGerarSat=!e.modalGerarSat)},{default:(0,l.w5)((()=>[(0,l.Wm)("div",n,[(0,l.Wm)(p,{name:"add",size:"60px",color:"blue-3"})]),s])),_:1}),(0,l.Wm)(h,{model:e.modalGerarSat,onHide:a[2]||(a[2]=a=>e.modalGerarSat=!1),onGerar:e.gerarChave},null,8,["model","onGerar"])])),_:1})}var c=t(8880),m=t(2323);const d=(0,l.HX)("data-v-3702574c");(0,l.dD)("data-v-3702574c");const p={class:"flex justify-between items-center"},u=(0,l.Wm)("span",{class:"text-bold text-h6 text-grey"}," Gerar chave SAT ",-1),h=(0,l.Wm)("br",null,null,-1),b=(0,l.Wm)("span",null,"Informe o CNPJ para gerar a chave",-1),v=(0,l.Wm)("br",null,null,-1),f=(0,l.Wm)("br",null,null,-1),g={class:"bg-grey-2 q-pa-md",style:{"word-wrap":"break-word"}},W={key:0,class:"flex justify-between"},x={class:"text-red q-pa-sm",style:{flex:"1"}},C=(0,l.Uk)(" CNPJ: "),y={class:"text-bold"};(0,l.Cn)();const S=d(((e,a,t,o,r,n)=>{const s=(0,l.up)("q-btn"),i=(0,l.up)("q-input"),S=(0,l.up)("q-card-section"),q=(0,l.up)("q-card-actions"),k=(0,l.up)("q-form"),w=(0,l.up)("q-card"),Z=(0,l.up)("q-dialog"),G=(0,l.Q2)("close-popup");return(0,l.wg)(),(0,l.j4)(Z,{modelValue:t.model,"onUpdate:modelValue":a[3]||(a[3]=e=>t.model=e),onHide:n.hide},{default:d((()=>[(0,l.Wm)(w,{style:{position:"absolute",width:"100vw","max-width":"400px",transition:"height 0.25s"}},{default:d((()=>[(0,l.Wm)(k,{onSubmit:(0,c.iM)(n.submit,["prevent","stop"])},{default:d((()=>[(0,l.Wm)(S,{class:"items-center"},{default:d((()=>[(0,l.Wm)("div",p,[u,(0,l.Wm)(s,{flat:"",round:"",color:"red",icon:"close",onClick:n.hide},null,8,["onClick"])]),h,b,v,f,(0,l.Wm)(i,{outlined:"",modelValue:o.form.cnpj,"onUpdate:modelValue":a[1]||(a[1]=e=>o.form.cnpj=e),label:"CNPJ","unmasked-value":"",mask:"##.###.###/####-##",rules:[e=>e&&e.length>0||"Campo obrigatório*"]},null,8,["modelValue","rules"]),(0,l.Wm)("div",g,(0,m.zw)(r.homeState.chave),1),r.homeState.cnpj&&r.homeState.chave?((0,l.wg)(),(0,l.j4)("div",W,[(0,l.Wm)("span",x,[C,(0,l.Wm)("span",y,(0,m.zw)(r.homeState.cnpj),1)]),(0,l.Wm)("div",null,[(0,l.Wm)(s,{icon:"close",class:"text-red bg-grey-2",unelevated:"",size:"12px",onClick:n.limparAss},null,8,["onClick"]),(0,l.Wm)(s,{icon:"content_copy",class:"bg-grey-2",unelevated:"",size:"12px",onClick:n.copyText},null,8,["onClick"])])])):(0,l.kq)("",!0)])),_:1}),(0,l.Wm)(q,{align:"right"},{default:d((()=>[(0,l.wy)((0,l.Wm)(s,{flat:"",label:"Cancelar",color:"primary",onClick:a[2]||(a[2]=e=>o.form.clean())},null,512),[[G]]),(0,l.Wm)(s,{type:"submit",label:"Cadastrar",color:"primary"})])),_:1})])),_:1},8,["onSubmit"])])),_:1})])),_:1},8,["modelValue","onHide"])}));var q=t(515),k=t.n(q),w=t(1959),Z=t(1914);const G={name:"ModalGerarSAT",props:{model:Boolean},setup(){const e=(0,w.iH)({cnpj:"",clean(){this.cnpj=""}});return{form:e}},data(){return{homeState:this.$store.state.homeStore}},methods:{submit(){this.$emit("gerar",k()({},this.form))},limparAss(){this.$store.dispatch("limparAss")},copyText(){try{(0,Z.Z)(this.homeState.chave),this.$q.notify({type:"positive",message:"Assinatura enviada para area de transferência"})}catch(e){this.$q.notify({message:"Ocorreu um erro ao tentar copiar"})}},hide(){this.$emit("hide"),this.form.clean()}}};var j=t(6778),Q=t(151),A=t(5269),_=t(5589),P=t(2165),T=t(4842),$=t(9367),z=t(677),H=t(7518),V=t.n(H);G.render=S,G.__scopeId="data-v-3702574c";const I=G;V()(G,"components",{QDialog:j.Z,QCard:Q.Z,QForm:A.Z,QCardSection:_.Z,QBtn:P.Z,QInput:T.Z,QCardActions:$.Z}),V()(G,"directives",{ClosePopup:z.Z});const M=(0,l.aZ)({name:"HomePage",components:{ModalGerarSAT:I},data(){return{modalGerarSat:!1}},methods:{gerarChave({cnpj:e}){this.$store.dispatch("gerarChave",e)}}});var B=t(4379),J=t(5869),N=t(4554);M.render=i;const U=M;V()(M,"components",{QPage:B.Z,QSeparator:J.Z,QBtn:P.Z,QIcon:N.Z})}}]);