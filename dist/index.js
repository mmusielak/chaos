!function(t){var r={};function s(i){if(r[i])return r[i].exports;var e=r[i]={i:i,l:!1,exports:{}};return t[i].call(e.exports,e,e.exports,s),e.l=!0,e.exports}s.m=t,s.c=r,s.d=function(t,r,i){s.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,r){if(1&r&&(t=s(t)),8&r)return t;if(4&r&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&r&&"string"!=typeof t)for(var e in t)s.d(i,e,function(r){return t[r]}.bind(null,e));return i},s.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(r,"a",r),r},s.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},s.p="",s(s.s=0)}([function(t,r,s){"use strict";function i(t,r,s,i,e,h){this.a=t,this.b=r,this.c=s,this.d=i,this.e=e,this.f=h}s.r(r),i.prototype.apply=function(t){return{x:t.x*this.a+t.y*this.c+this.e,y:t.x*this.b+t.y*this.d+this.f}};var e={id:"fern",init:function(t,r){this.cursor={x:0,y:0},this.chances=[1,85,7,7],this.total=this.chances.reduce((t,r)=>t+r),this.matrices=[new i(0,0,0,.16,0,0),new i(.85,-.04,.04,.85,0,1.6),new i(.2,.23,-.26,.22,0,1.6),new i(-.15,.26,.28,.24,0,.44)]},iterate:function(t,r){for(var s=Math.random()*this.total|0,i=0,e=0;e<this.chances.length&&!((i+=this.chances[e])>=s);e++);var h=this.matrices[e];return this.cursor=h.apply(this.cursor),{x:t/2+this.cursor.x*t/5.5|0,y:r-this.cursor.y*r/10|0}}},h={id:"fern (simplified)",init:function(t,r){this.cursor={x:0,y:0}},iterate:function(t,r){var s,i,e=Math.random();return e<=.01?(s=0,i=.16*this.cursor.y):e<=.86?(s=.85*this.cursor.x+.04*this.cursor.y+0,i=-.04*this.cursor.x+.85*this.cursor.y+1.6):e<=.94?(s=.2*this.cursor.x-.26*this.cursor.y+0,i=.23*this.cursor.x+.22*this.cursor.y+1.6):(s=-.15*this.cursor.x+.28*this.cursor.y+0,i=.26*this.cursor.x+.24*this.cursor.y+.44),this.cursor.x=s,this.cursor.y=i,{x:t/2+this.cursor.x*t/5.5|0,y:r-this.cursor.y*r/10|0}}},c=function(t,r,s,i){for(var e=[],h=Math.min(t,r)/2,c=0;c<s;c++)e[c]={x:h*Math.cos(2*Math.PI*c/s+i)+t/2,y:h*Math.sin(2*Math.PI*c/s+i)+r/2};return e},o={id:"square",init:function(t,r){this.cursor={x:0,y:0},this.vertices=[{x:20,y:20},{x:t/2,y:20},{x:t-20,y:20},{x:t-20,y:r/2},{x:t-20,y:r-20},{x:t/2,y:r-20},{x:20,y:r-20},{x:20,y:r/2}]},iterate:function(t,r){var s=Math.random()*this.vertices.length|0,i=this.vertices[s];return this.cursor.x+=.6666666*(i.x-this.cursor.x),this.cursor.y+=.6666666*(i.y-this.cursor.y),{x:0|this.cursor.x,y:0|this.cursor.y}}},n={id:"hexagon",init:function(t,r){this.cursor={x:0,y:0},this.vertices=c(t,r,6,-Math.PI/2)},iterate:function(t,r){var s=Math.random()*this.vertices.length|0,i=this.vertices[s];return this.cursor.x+=.6666666*(i.x-this.cursor.x),this.cursor.y+=.6666666*(i.y-this.cursor.y),{x:0|this.cursor.x,y:0|this.cursor.y}}},u={id:"square -1",init:function(t,r){this.cursor={x:0,y:0},this.vertices=c(t,r,4,-Math.PI/4)},iterate:function(t,r){do{var s=Math.random()*this.vertices.length|0}while((s-1+this.vertices.length)%this.vertices.length==this.last);var i=this.vertices[this.last=s];return this.cursor.x+=(i.x-this.cursor.x)/2,this.cursor.y+=(i.y-this.cursor.y)/2,{x:0|this.cursor.x,y:0|this.cursor.y}}},a={id:"square diff",init:function(t,r){this.cursor={x:0,y:0},this.vertices=c(t,r,4,-Math.PI/4)},iterate:function(t,r){do{var s=Math.random()*this.vertices.length|0}while(s==this.last);var i=this.vertices[this.last=s];return this.cursor.x+=(i.x-this.cursor.x)/2,this.cursor.y+=(i.y-this.cursor.y)/2,{x:0|this.cursor.x,y:0|this.cursor.y}}},y={id:"even-square",init:function(t,r){this.cursor={x:0,y:0},this.vertices=c(t,r,4,Math.PI/4)},iterate:function(t,r){do{var s=Math.random()*this.vertices.length|0}while((s-2+this.vertices.length)%this.vertices.length==this.last||(s+2+this.vertices.length)%this.vertices.length==this.last);var i=this.vertices[this.last=s];return this.cursor.x+=(i.x-this.cursor.x)/2,this.cursor.y+=(i.y-this.cursor.y)/2,{x:0|this.cursor.x,y:0|this.cursor.y}}},x={id:"pentagon, next vertex has to be different",init:function(t,r){this.cursor={x:0,y:0},this.vertices=c(t,r,5,-Math.PI/2)},iterate:function(t,r){do{var s=Math.random()*this.vertices.length|0}while(s==this.last);var i=this.vertices[this.last=s];return this.cursor.x+=(i.x-this.cursor.x)/2,this.cursor.y+=(i.y-this.cursor.y)/2,{x:0|this.cursor.x,y:0|this.cursor.y}}},l={id:"nonagon",init:function(t,r){this.cursor={x:0,y:0},this.vertices=c(t,r,9,-Math.PI/2)},iterate:function(t,r){var s=Math.random()*this.vertices.length|0,i=this.vertices[s];return this.cursor.x+=.6666666*(i.x-this.cursor.x),this.cursor.y+=.6666666*(i.y-this.cursor.y),{x:0|this.cursor.x,y:0|this.cursor.y}}},f={id:"ngon",init:function(t,r){this.cursor={x:0,y:0},this.vertices=c(t,r,9,-Math.PI/2)},iterate:function(t,r){do{var s=Math.random()*this.vertices.length|0}while((s+2+this.vertices.length)%this.vertices.length==this.last||(s-2+this.vertices.length)%this.vertices.length==this.last||s==this.last);var i=this.vertices[this.last=s];return this.cursor.x+=(i.x-this.cursor.x)/2,this.cursor.y+=(i.y-this.cursor.y)/2,{x:0|this.cursor.x,y:0|this.cursor.y}}},v={id:"triangle",init:function(t,r){this.cursor={x:0,y:0},this.vertices=c(t,r,3,-Math.PI/2)},iterate:function(t,r){var s=Math.random()*this.vertices.length|0,i=this.vertices[s];return this.cursor.x+=(i.x-this.cursor.x)/2,this.cursor.y+=(i.y-this.cursor.y)/2,{x:0|this.cursor.x,y:0|this.cursor.y}}},d={id:"triangle (ifs)",init:function(t,r){this.cursor={x:0,y:0},this.matrices=[new i(.5,0,0,.5,0,0),new i(.5,0,0,.5,.5,0),new i(.5,0,0,.5,.25,Math.sqrt(3)/4)]},iterate:function(t,r){var s=Math.random()*this.matrices.length|0,i=this.matrices[s];return this.cursor=i.apply(this.cursor),{x:this.cursor.x*t|0,y:this.cursor.y*r|0}}},g={id:"thomas",init:function(t,r){this.b=.208186,this.cursor={x:1,y:0,z:1}},iterate:function(t,r){var s=Math.sin(this.cursor.y)-this.b*this.cursor.x,i=Math.sin(this.cursor.z)-this.b*this.cursor.y,e=Math.sin(this.cursor.x)-this.b*this.cursor.z;this.cursor.x+=.008*s,this.cursor.y+=.008*i,this.cursor.z+=.008*e;return{x:t/2+200*this.cursor.x+200*this.cursor.z|0,y:r/2+200*this.cursor.y+200*this.cursor.z|0}}},m=0,M=1e6,w=5e4,p=document.querySelector("canvas"),b=document.querySelector("footer"),z=0,P=[e,h,n,l,f,x,o,u,a,y,v,d,{id:"lorenz",init:function(t,r){this.cursor={x:1,y:1,z:1}},iterate:function(t,r){this.a=10,this.b=28,this.c=8/3;var s=this.a*(this.cursor.y-this.cursor.x),i=this.cursor.x*(this.b-this.cursor.z)-this.cursor.y,e=this.cursor.x*this.cursor.y-this.c*this.cursor.z;return this.cursor.x+=.008*s,this.cursor.y+=.008*i,this.cursor.z+=.008*e,{x:t/2+20*this.cursor.x+20*this.cursor.z|0,y:r/2+20*this.cursor.y+20*this.cursor.z|0}}},{id:"roessler",init:function(t,r){this.a=.2,this.b=.2,this.c=5.7,this.cursor={x:1,y:0,z:1}},iterate:function(t,r){var s=-(this.cursor.y+this.cursor.z),i=this.cursor.x+this.a*this.cursor.y,e=this.b+this.cursor.x*this.cursor.z-this.c*this.cursor.z;return this.cursor.x+=.008*s,this.cursor.y+=.008*i,this.cursor.z+=.008*e,{x:t/2+40*this.cursor.x+40*this.cursor.z|0,y:r/2+40*this.cursor.y+40*this.cursor.z|0}}},g];function I(t){var r=P[z=t];r.init(p.width,p.height),b.innerHTML=r.id.toString(),m=0;for(var s=0;s<_.length;s++)_[s]=4278190080;requestAnimationFrame(A)}P.forEach(t=>t.init(p.width,p.height));var q=p.getContext("2d");p.width=3600,p.height=2400,q.imageSmoothingEnabled=!0;var S=q.getImageData(0,0,p.width,p.height),j=new ArrayBuffer(S.data.length),O=new Uint8Array(j),_=new Uint32Array(j);function A(){for(var t=P[z],r=0;r<w;r++){var s=t.iterate(p.width,p.height),i=k(s.x/p.width,s.y/p.height,1);_[s.x+s.y*p.width]=i}S.data.set(O),q.putImageData(S,0,0),(m+=w)<M?requestAnimationFrame(A):console.info(`${m} pixels were drawn.`)}function k(t,r,s){var i=6*t|0,e=6*t-i,h=s*(1-r),c=s*(1-e*r),o=s*(1-(1-e)*r);switch(i%6){case 0:return 255<<24|255*s<<16|255*o<<8|255*h;case 1:return 255<<24|255*c<<16|255*s<<8|255*h;case 2:return 255<<24|255*h<<16|255*s<<8|255*o;case 3:return 255<<24|255*h<<16|255*c<<8|255*s;case 4:return 255<<24|255*o<<16|255*h<<8|255*s;case 5:return 255<<24|255*s<<16|255*h<<8|255*c}}window.addEventListener("keydown",t=>{37==event.keyCode&&I((z-1+P.length)%P.length),39==event.keyCode&&I((z+1+P.length)%P.length)}),I(0)}]);