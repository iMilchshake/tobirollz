(function(e){function t(t){for(var o,u,i=t[0],r=t[1],a=t[2],d=0,b=[];d<i.length;d++)u=i[d],Object.prototype.hasOwnProperty.call(c,u)&&c[u]&&b.push(c[u][0]),c[u]=0;for(o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o]);l&&l(t);while(b.length)b.shift()();return s.push.apply(s,a||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],o=!0,i=1;i<n.length;i++){var r=n[i];0!==c[r]&&(o=!1)}o&&(s.splice(t--,1),e=u(u.s=n[0]))}return e}var o={},c={app:0},s=[];function u(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.m=e,u.c=o,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)u.d(n,o,function(t){return e[t]}.bind(null,o));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/tobirollz/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],r=i.push.bind(i);i.push=t,i=i.slice();for(var a=0;a<i.length;a++)t(i[a]);var l=r;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"1d08":function(e,t,n){"use strict";n("df19")},3550:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("7a23"),c={id:"app"};function s(e,t,n,s,u,i){var r=Object(o["k"])("TobiRollz");return Object(o["f"])(),Object(o["c"])("div",c,[Object(o["d"])(r)])}var u=Object(o["q"])("data-v-4b463592");Object(o["h"])("data-v-4b463592");var i={id:"websocket_test"},r={key:0,id:"layout"},a={id:"chat_buttons"},l={id:"dicebox"},d={id:"log"},b=Object(o["d"])("thead",null,[Object(o["d"])("tr",null,[Object(o["d"])("th",null,"User"),Object(o["d"])("th",null,"Message")])],-1),f={key:1},p=Object(o["d"])("h3",null," Connecting... ",-1);Object(o["g"])();var g=u((function(e,t,n,c,s,u){return Object(o["f"])(),Object(o["c"])("div",i,[u.connected?(Object(o["f"])(),Object(o["c"])("div",r,[Object(o["d"])("div",a,[Object(o["o"])(Object(o["d"])("input",{id:"user",class:"text_input","onUpdate:modelValue":t[1]||(t[1]=function(t){return e.user=t}),placeholder:"username"},null,512),[[o["m"],e.user]]),Object(o["o"])(Object(o["d"])("input",{id:"msg",class:"text_input","onUpdate:modelValue":t[2]||(t[2]=function(t){return e.message=t}),placeholder:"message",onKeyup:t[3]||(t[3]=Object(o["p"])((function(e){return u.sendMessage()}),["enter"]))},null,544),[[o["m"],e.message]]),Object(o["d"])("input",{type:"button",id:"send",onClick:t[4]||(t[4]=function(e){return u.sendMessage()}),value:"Send"})]),Object(o["d"])("div",l,[Object(o["d"])("input",{type:"button",onClick:t[5]||(t[5]=function(e){return u.sendMessage("d4")}),value:"D4"}),Object(o["d"])("input",{type:"button",onClick:t[6]||(t[6]=function(e){return u.sendMessage("d6")}),value:"D6"}),Object(o["d"])("input",{type:"button",onClick:t[7]||(t[7]=function(e){return u.sendMessage("d8")}),value:"D8"}),Object(o["d"])("input",{type:"button",onClick:t[8]||(t[8]=function(e){return u.sendMessage("d10")}),value:"D10"}),Object(o["d"])("input",{type:"button",onClick:t[9]||(t[9]=function(e){return u.sendMessage("d12")}),value:"D12"}),Object(o["d"])("input",{type:"button",onClick:t[10]||(t[10]=function(e){return u.sendMessage("d20")}),value:"D20"})]),Object(o["d"])("table",d,[b,Object(o["d"])("tbody",null,[(Object(o["f"])(!0),Object(o["c"])(o["a"],null,Object(o["j"])(u.msgLog,(function(e){return Object(o["f"])(),Object(o["c"])("tr",{key:e.id},[Object(o["d"])("td",null,Object(o["l"])(e.user),1),Object(o["d"])("td",null,Object(o["l"])(e.message),1)])})),128))])])])):(Object(o["f"])(),Object(o["c"])("div",f,[p]))])})),O={name:"TobiRollz",data:function(){return{connection:null,message:null,user:null}},computed:{connected:function(){return this.$store.state.connected},msgLog:function(){return this.$store.state.msgLog}},methods:{sendMessage:function(e){void 0!==e&&(this.message=e),null!==this.user&&""!==this.message?this.connection.send(JSON.stringify({user:this.user,message:this.message})):alert("user or message not specified!"),this.message=""},changeConnectionStatus:function(e){this.$store.commit("changeConnectionStatus",e)},setupConnection:function(){var e=this;console.log("Starting connection to WebSocket Server","wss://flaxen-quick-leptoceratops.glitch.me"),this.connection=new WebSocket("wss://flaxen-quick-leptoceratops.glitch.me"),this.connection.onmessage=function(t){var n=JSON.parse(t.data);"log"===n.type&&e.$store.commit("setMsgLog",n.log)},this.connection.onopen=function(){e.changeConnectionStatus(!0)},this.connection.onclose=function(t){console.log("Socket is closed. Reconnect will be attempted in 1 second.",t.reason),e.changeConnectionStatus(!1),setTimeout((function(){e.setupConnection()}),1e3)},this.connection.onerror=function(t){console.error("Socket encountered error: ",t.message,"Closing socket"),e.changeConnectionStatus(!1),e.connection.close()}}},created:function(){this.setupConnection()}};n("1d08");O.render=g,O.__scopeId="data-v-4b463592";var j=O,h={name:"App",components:{TobiRollz:j}};n("6eff");h.render=s;var m=h,v=n("5502"),y=Object(v["a"])({state:{connected:!1,connection:null,msgLog:null},mutations:{addConnection:function(e,t){e.connection=t},changeConnectionStatus:function(e,t){e.connected=t,console.log("changed connection-status to",t)},setMsgLog:function(e,t){e.msgLog=t}},actions:{},modules:{}});Object(o["b"])(m).use(y).mount("#app")},"6eff":function(e,t,n){"use strict";n("3550")},df19:function(e,t,n){}});
//# sourceMappingURL=app.f8df107e.js.map