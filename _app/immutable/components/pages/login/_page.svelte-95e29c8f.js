import{S as G,i as R,s as H,k as i,q as D,a as I,l as d,m as h,r as V,h as c,c as L,n as t,b as F,C as r,G as J,O as K,B as M,u as Q}from"../../../chunks/index-7b8e0e3c.js";import{a as W}from"../../../chunks/axios-67252f11.js";function z(p){let a,n;return{c(){a=i("div"),n=D(p[0]),this.h()},l(e){a=d(e,"DIV",{class:!0});var s=h(a);n=V(s,p[0]),s.forEach(c),this.h()},h(){t(a,"class","text-red-500")},m(e,s){F(e,a,s),r(a,n)},p(e,s){s&1&&Q(n,e[0])},d(e){e&&c(a)}}}function X(p){let a,n,e,s,w,v,x,u,y,l,f,E,B,_,$,U,g,j,C,N,o=p[0]&&z(p);return{c(){a=i("div"),n=i("div"),e=i("form"),s=i("div"),w=i("label"),v=D("Username"),x=I(),u=i("input"),y=I(),l=i("div"),f=i("label"),E=D("Password"),B=I(),_=i("input"),$=I(),o&&o.c(),U=I(),g=i("button"),j=D("Login"),this.h()},l(m){a=d(m,"DIV",{class:!0});var k=h(a);n=d(k,"DIV",{class:!0});var O=h(n);e=d(O,"FORM",{class:!0});var b=h(e);s=d(b,"DIV",{class:!0});var P=h(s);w=d(P,"LABEL",{for:!0});var S=h(w);v=V(S,"Username"),S.forEach(c),x=L(P),u=d(P,"INPUT",{type:!0,name:!0,id:!0,placeholder:!0,class:!0}),P.forEach(c),y=L(b),l=d(b,"DIV",{class:!0});var T=h(l);f=d(T,"LABEL",{for:!0});var q=h(f);E=V(q,"Password"),q.forEach(c),B=L(T),_=d(T,"INPUT",{type:!0,name:!0,id:!0,placeholder:!0,class:!0}),T.forEach(c),$=L(b),o&&o.l(b),U=L(b),g=d(b,"BUTTON",{type:!0,class:!0});var A=h(g);j=V(A,"Login"),A.forEach(c),b.forEach(c),O.forEach(c),k.forEach(c),this.h()},h(){t(w,"for","username"),t(u,"type","username"),t(u,"name","username"),t(u,"id","username"),t(u,"placeholder","Username"),t(u,"class","ring-2 ring-gray-300 rounded-md p-2 text-black"),t(s,"class","flex flex-col"),t(f,"for","password"),t(_,"type","password"),t(_,"name","password"),t(_,"id","password"),t(_,"placeholder","Password"),t(_,"class","ring-2 ring-gray-300 rounded-md p-2 text-black"),t(l,"class","flex flex-col"),t(g,"type","submit"),t(g,"class","bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-200"),t(e,"class","w-11/12 md:w-1/3 flex flex-col gap-3 p-5 rounded font-mono"),t(n,"class","flex flex-col items-center justify-center h-3/4"),t(a,"class","h-screen")},m(m,k){F(m,a,k),r(a,n),r(n,e),r(e,s),r(s,w),r(w,v),r(s,x),r(s,u),r(e,y),r(e,l),r(l,f),r(f,E),r(l,B),r(l,_),r(e,$),o&&o.m(e,null),r(e,U),r(e,g),r(g,j),C||(N=J(g,"click",K(p[2])),C=!0)},p(m,[k]){m[0]?o?o.p(m,k):(o=z(m),o.c(),o.m(e,U)):o&&(o.d(1),o=null)},i:M,o:M,d(m){m&&c(a),o&&o.d(),C=!1,N()}}}function Y(p,a,n){let e="";function s(v){const x="https://dockyard-handler.herokuapp.com/login",u=v.target.form.username.value,y=v.target.form.password.value;W.get(x+"?username="+u+"&password="+y).then(l=>{var f;if(l.status===200&&l.data.jwtToken){const E=(f=l==null?void 0:l.data)==null?void 0:f.jwtToken;localStorage.setItem("token",E),window.location.href="./windfarms"}else n(0,e="Credenziali errate")}).catch(l=>{console.log(l)})}return[e,s,v=>{s(v)}]}class te extends G{constructor(a){super(),R(this,a,Y,X,H,{})}}export{te as default};
