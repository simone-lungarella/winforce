import{S as qe,i as Be,s as Ve,k as s,a as S,q as L,l as u,m as T,h as f,c as D,r as W,n as o,b as ie,C as t,G as H,T as Ge,U as je,P as Le,Q as Re,B as Fe,H as We,D as Xe,u as Ke,f as ne,t as Te,d as He,W as Ce,o as Je,w as Qe,x as Ye,y as $e,z as Ze,g as xe}from"../../../chunks/index-15ec97cc.js";import{s as Ee}from"../../../chunks/index-abb26a38.js";const et={1:"Sost. Traversa",2:"Riparazione pale",3:"Sost. trafo",4:"Sost. generatore",5:"Sost. Ralla",6:"Pulizia tubolare",7:"Sost. IMS",8:"Serraggio Nose Cone",9:"Sost. Stella HUB",10:"Sost. Pala discesa rotore",11:"Sost. cuscinetto",12:"Sost. Asta Pitch",13:"Sost. Yaw Gear",14:"Sost. Gearbox",15:"Sost. Pala RJ",16:"Sost. Albero lento",17:"Ispezione RJ",18:"Sostituzione Blade Bearing",19:"Sostituzione Main Bearing",20:"Manutenzione ordinaria viabilità",21:"Attività Varie",22:"Bonifica Ambientale"};function Ae(i,e,a){const r=i.slice();return r[6]=e[a],r[7]=e,r[8]=a,r}function Ue(i,e){let a,r,l,c,n,d=e[6].name+"",h,E,y,m;function I(...O){return e[4](e[6],e[7],e[8],...O)}return{key:i,first:null,c(){a=s("div"),r=s("input"),c=S(),n=s("p"),h=L(d),E=S(),this.h()},l(O){a=u(O,"DIV",{class:!0});var v=T(a);r=u(v,"INPUT",{class:!0,type:!0}),c=D(v),n=u(v,"P",{class:!0});var w=T(n);h=W(w,d),w.forEach(f),E=D(v),v.forEach(f),this.h()},h(){o(r,"class","checkbox"),r.checked=l=e[6].isSelected,o(r,"type","checkbox"),o(n,"class","font-mono"),o(a,"class","flex flex-row gap-4"),this.first=a},m(O,v){ie(O,a,v),t(a,r),t(a,c),t(a,n),t(n,h),t(a,E),y||(m=H(r,"change",I),y=!0)},p(O,v){e=O,v&1&&l!==(l=e[6].isSelected)&&(r.checked=l),v&1&&d!==(d=e[6].name+"")&&Ke(h,d)},d(O){O&&f(a),y=!1,m()}}}function tt(i){let e,a,r=[],l=new Map,c,n,d,h,E,y,m,I,O,v,w=i[0];const J=p=>p[6].name;for(let p=0;p<w.length;p+=1){let _=Ae(i,w,p),P=J(_);l.set(P,r[p]=Ue(P,_))}return{c(){e=s("div"),a=s("div");for(let p=0;p<r.length;p+=1)r[p].c();c=S(),n=s("div"),d=s("button"),h=L("Conferma"),E=S(),y=s("button"),m=L("Chiudi"),this.h()},l(p){e=u(p,"DIV",{class:!0});var _=T(e);a=u(_,"DIV",{class:!0});var P=T(a);for(let U=0;U<r.length;U+=1)r[U].l(P);P.forEach(f),c=D(_),n=u(_,"DIV",{class:!0});var M=T(n);d=u(M,"BUTTON",{class:!0});var Q=T(d);h=W(Q,"Conferma"),Q.forEach(f),E=D(M),y=u(M,"BUTTON",{class:!0});var Y=T(y);m=W(Y,"Chiudi"),Y.forEach(f),M.forEach(f),_.forEach(f),this.h()},h(){o(a,"class","grid grid-cols-1 gap-2 h-96 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800"),o(d,"class","bg-green-500 hover:bg-green-600 py-2 px-4 rounded w-24"),o(y,"class","bg-red-500 hover:bg-red-600 py-2 px-4 rounded w-24"),o(n,"class","flex flex-row mt-5 gap-2 justify-center"),o(e,"class","bg-gray-800 rounded border-2 border-gray-800 ring-2 ring-gray-500 p-4 overflow-y-hidden w-80 md:w-96 backdrop-filter backdrop-blur-md bg-opacity-75 text-white font-mono absolute top-5 transform left-1/2 -translate-x-1/2 z-50")},m(p,_){ie(p,e,_),t(e,a);for(let P=0;P<r.length;P+=1)r[P].m(a,null);t(e,c),t(e,n),t(n,d),t(d,h),t(n,E),t(n,y),t(y,m),O||(v=[H(d,"click",i[1]),H(y,"click",i[2]),H(e,"click",i[3]),H(e,"keydown",i[3])],O=!0)},p(p,[_]){_&1&&(w=p[0],r=Ge(r,_,J,1,p,w,l,a,je,Ue,null,Ae))},i(p){I||Le(()=>{I=Re(e,Ee,{duration:300}),I.start()})},o:Fe,d(p){p&&f(e);for(let _=0;_<r.length;_+=1)r[_].d();O=!1,We(v)}}}function at(i,e,a){let{operations:r=[]}=e;const l=Xe(),c=()=>{l("confirm",r)},n=()=>{l("cancel")},d=E=>{E.stopPropagation()},h=(E,y,m,I)=>{a(0,y[m].isSelected=I.target.checked,r)};return i.$$set=E=>{"operations"in E&&a(0,r=E.operations)},[r,c,n,d,h]}class lt extends qe{constructor(e){super(),Be(this,e,at,tt,Ve,{operations:0})}}function ze(i){let e,a,r,l,c;return a=new lt({props:{operations:i[2]}}),a.$on("cancel",i[3]),a.$on("confirm",i[4]),{c(){e=s("div"),Qe(a.$$.fragment),this.h()},l(n){e=u(n,"DIV",{class:!0});var d=T(e);Ye(a.$$.fragment,d),d.forEach(f),this.h()},h(){o(e,"class","h-full w-full absolute top-0 left-0 bg-gray-800 backdrop-filter bg-opacity-75 backdrop-blur-sm")},m(n,d){ie(n,e,d),$e(a,e,null),r=!0,l||(c=[H(e,"click",i[5]),H(e,"keydown",i[6])],l=!0)},p(n,d){const h={};d&4&&(h.operations=n[2]),a.$set(h)},i(n){r||(ne(a.$$.fragment,n),r=!0)},o(n){Te(a.$$.fragment,n),r=!1},d(n){n&&f(e),Ze(a),l=!1,We(c)}}}function rt(i){let e,a,r,l,c,n,d,h,E,y,m,I,O,v,w,J,p,_,P,M,Q,Y,U,G,z,x,se,j,R,ue,F,ce,X,pe,de,q,te,fe,B,ae,he,V,le,_e,A,ee,ve,$,Z,me,K,C,ge,ke,k=i[1]&&ze(i);return{c(){e=s("div"),k&&k.c(),a=S(),r=s("form"),l=s("div"),c=s("input"),d=S(),h=s("input"),y=S(),m=s("input"),O=S(),v=s("input"),J=S(),p=s("select"),_=s("option"),P=L("MEGAWATT"),M=s("option"),Q=L("KILOWATT"),Y=S(),U=s("div"),G=s("button"),z=s("input"),se=S(),j=s("select"),R=s("option"),ue=L("In Marcia"),F=s("option"),ce=L("Limitata"),X=s("option"),pe=L("Ferma"),de=S(),q=s("input"),fe=S(),B=s("input"),he=S(),V=s("input"),_e=S(),A=s("input"),ve=S(),$=s("div"),Z=s("button"),me=L("Crea"),this.h()},l(g){e=u(g,"DIV",{class:!0});var N=T(e);k&&k.l(N),a=D(N),r=u(N,"FORM",{});var re=T(r);l=u(re,"DIV",{class:!0});var b=T(l);c=u(b,"INPUT",{class:!0,type:!0,placeholder:!0}),d=D(b),h=u(b,"INPUT",{class:!0,type:!0,placeholder:!0}),y=D(b),m=u(b,"INPUT",{class:!0,type:!0,placeholder:!0}),O=D(b),v=u(b,"INPUT",{class:!0,type:!0,placeholder:!0}),J=D(b),p=u(b,"SELECT",{class:!0});var be=T(p);_=u(be,"OPTION",{});var ye=T(_);P=W(ye,"MEGAWATT"),ye.forEach(f),M=u(be,"OPTION",{});var Ne=T(M);Q=W(Ne,"KILOWATT"),Ne.forEach(f),be.forEach(f),Y=D(b),U=u(b,"DIV",{});var Ie=T(U);G=u(Ie,"BUTTON",{type:!0,class:!0});var Oe=T(G);z=u(Oe,"INPUT",{class:!0,placeholder:!0}),Oe.forEach(f),Ie.forEach(f),se=D(b),j=u(b,"SELECT",{class:!0});var oe=T(j);R=u(oe,"OPTION",{});var Se=T(R);ue=W(Se,"In Marcia"),Se.forEach(f),F=u(oe,"OPTION",{});var De=T(F);ce=W(De,"Limitata"),De.forEach(f),X=u(oe,"OPTION",{});var we=T(X);pe=W(we,"Ferma"),we.forEach(f),oe.forEach(f),de=D(b),q=u(b,"INPUT",{class:!0,type:!0,placeholder:!0}),fe=D(b),B=u(b,"INPUT",{class:!0,type:!0,placeholder:!0}),he=D(b),V=u(b,"INPUT",{class:!0,type:!0,placeholder:!0}),_e=D(b),A=u(b,"INPUT",{class:!0,type:!0,placeholder:!0}),b.forEach(f),ve=D(re),$=u(re,"DIV",{class:!0});var Pe=T($);Z=u(Pe,"BUTTON",{class:!0});var Me=T(Z);me=W(Me,"Crea"),Me.forEach(f),Pe.forEach(f),re.forEach(f),N.forEach(f),this.h()},h(){o(c,"class","input"),o(c,"type","text"),c.value=n=i[0].turbineName,o(c,"placeholder","Aerogeneratore"),c.required=!0,o(h,"class","input"),o(h,"type","text"),h.value=E=i[0].turbineNumber,o(h,"placeholder","Numero"),h.required=!0,o(m,"class","input"),o(m,"type","text"),m.value=I=i[0].description,o(m,"placeholder","Descrizione"),m.required=!0,o(v,"class","input"),o(v,"type","number"),v.value=w=i[0].odlNumber,o(v,"placeholder","Numero ODL"),v.required=!0,_.__value="MEGAWATT",_.value=_.__value,M.__value="KILOWATT",M.value=M.__value,o(p,"class","select"),o(z,"class","w-full"),z.value=x=i[0].operation.length>0?i[0].operation.join(", "):"",z.disabled=!0,o(z,"placeholder","Operazioni"),o(G,"type","button"),o(G,"class","input hover:bg-gray-200 text-start transition ease-in-out"),R.__value="In Marcia",R.value=R.__value,F.__value="Limitata",F.value=F.__value,X.__value="Ferma",X.value=X.__value,o(j,"class","select"),o(q,"class","input"),o(q,"type","date"),q.value=te=i[0].startingDateEEMM,o(q,"placeholder","Data inizio EEMM"),q.required=!0,o(B,"class","input"),o(B,"type","date"),B.value=ae=i[0].startingDateOOCC,o(B,"placeholder","Data inizio OOCC"),B.required=!0,o(V,"class","input"),o(V,"type","date"),V.value=le=i[0].permittingDate,o(V,"placeholder","Data concessione"),V.required=!0,o(A,"class","input"),o(A,"type","text"),A.value=ee=i[0].priorNotification,o(A,"placeholder","Data notifica"),A.required=!0,o(l,"class","grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-black overflow-y-scroll md:overflow-auto p-3 h-[30rem] md:h-full scrollbar-none"),o(Z,"class","bg-green-500 hover:bg-green-600 py-2 px-4 rounded w-24"),o($,"class","flex flex-row mt-5 gap-2 justify-center"),o(e,"class","md:mt-16")},m(g,N){ie(g,e,N),k&&k.m(e,null),t(e,a),t(e,r),t(r,l),t(l,c),t(l,d),t(l,h),t(l,y),t(l,m),t(l,O),t(l,v),t(l,J),t(l,p),t(p,_),t(_,P),t(p,M),t(M,Q),t(l,Y),t(l,U),t(U,G),t(G,z),t(l,se),t(l,j),t(j,R),t(R,ue),t(j,F),t(F,ce),t(j,X),t(X,pe),t(l,de),t(l,q),t(l,fe),t(l,B),t(l,he),t(l,V),t(l,_e),t(l,A),t(r,ve),t(r,$),t($,Z),t(Z,me),C=!0,ge||(ke=H(G,"click",i[7]),ge=!0)},p(g,[N]){g[1]?k?(k.p(g,N),N&2&&ne(k,1)):(k=ze(g),k.c(),ne(k,1),k.m(e,a)):k&&(xe(),Te(k,1,1,()=>{k=null}),He()),(!C||N&1&&n!==(n=g[0].turbineName)&&c.value!==n)&&(c.value=n),(!C||N&1&&E!==(E=g[0].turbineNumber)&&h.value!==E)&&(h.value=E),(!C||N&1&&I!==(I=g[0].description)&&m.value!==I)&&(m.value=I),(!C||N&1&&w!==(w=g[0].odlNumber)&&v.value!==w)&&(v.value=w),(!C||N&1&&x!==(x=g[0].operation.length>0?g[0].operation.join(", "):"")&&z.value!==x)&&(z.value=x),(!C||N&1&&te!==(te=g[0].startingDateEEMM))&&(q.value=te),(!C||N&1&&ae!==(ae=g[0].startingDateOOCC))&&(B.value=ae),(!C||N&1&&le!==(le=g[0].permittingDate))&&(V.value=le),(!C||N&1&&ee!==(ee=g[0].priorNotification)&&A.value!==ee)&&(A.value=ee)},i(g){C||(ne(k),Le(()=>{K||(K=Ce(e,Ee,{duration:200},!0)),K.run(1)}),C=!0)},o(g){Te(k),K||(K=Ce(e,Ee,{duration:200},!1)),K.run(0),C=!1},d(g){g&&f(e),k&&k.d(),g&&K&&K.end(),ge=!1,ke()}}}function ot(i,e,a){let r={turbineName:"",turbineNumber:"XXXX",description:"",odlNumber:0,power:"MEGAWATT",operation:[],turbineState:"In marcia",startingDateEEMM:null,startingDateOOCC:null,permittingDate:null,priorNotification:null},l=!1,c=[];return Je(()=>{a(2,c=Object.values(et).map(m=>({name:m,isSelected:!1})))}),[r,l,c,()=>{a(1,l=!1)},m=>{a(2,c=m.detail),a(0,r.operation=c.filter(I=>I.isSelected).map(I=>I.name),r),a(1,l=!1)},()=>{a(1,l=!1)},()=>{a(1,l=!1)},()=>{a(1,l=!l)}]}class st extends qe{constructor(e){super(),Be(this,e,ot,rt,Ve,{})}}export{st as default};
