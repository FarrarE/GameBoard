(this.webpackJsonpgameboard=this.webpackJsonpgameboard||[]).push([[0],[,,,,,,,,,,,,,,function(e,a,t){e.exports=t(26)},,,,,function(e,a,t){},function(e,a,t){e.exports=t.p+"static/media/logo.5d5d9eef.svg"},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){"use strict";t.r(a);var n=t(1),r=t.n(n),l=t(7),c=t.n(l),o=(t(19),t(4)),i=(t(20),t(21),t(8)),d=t(2),s=t(10),m=t(9),u=t(11),E=t(12),v=t(13),w=t(3);t(22);var p=function(e){return r.a.createElement("div",{className:"tray"},r.a.createElement("div",null,r.a.createElement(i.a,{className:"edit-icon"})),r.a.createElement("div",null,r.a.createElement(d.b,{className:"edit-icon"})),r.a.createElement("div",null,r.a.createElement(w.a,{className:"edit-icon"})),r.a.createElement("div",null,r.a.createElement(d.a,{className:"edit-icon"})),r.a.createElement("div",null,r.a.createElement(m.a,{className:"edit-icon"})),r.a.createElement("div",null,r.a.createElement(s.a,{className:"edit-icon"})),r.a.createElement("div",null,r.a.createElement(u.a,{onClick:e.toggleTokens,className:"edit-icon"})),r.a.createElement("div",null,r.a.createElement(E.a,{onClick:e.toggleMaps,className:"edit-icon"})),r.a.createElement("div",null,r.a.createElement(w.b,{onClick:e.close,className:"edit-icon"})),r.a.createElement("div",null,r.a.createElement(v.a,{onClick:e.toggleOptions,className:"edit-icon"})))};t(23);var g=function(e){var a="token-drawer";return a="drawerDocked"===e.state?"token-drawer docked":"token-drawer",r.a.createElement("div",{className:a},"tokens will be able to be added here and dragged onto the",r.a.createElement("div",{className:"token-options"}))};t(24);var f=function(e){var a="map-drawer";return a="drawerOpen"===e.state?"map-drawer open":"map-drawer",r.a.createElement("div",{className:a},"Maps will go here.")},k=t(5);t(25);var b=function(e){return r.a.createElement("div",{className:"options"},r.a.createElement("div",null,"Grid Size"),r.a.createElement("div",null,r.a.createElement("input",{type:"range",min:"1",max:"100",class:"slider"})),r.a.createElement("div",null,"Mode"),r.a.createElement("div",null,r.a.createElement(k.a,null)))};var N=function(){var e=Object(n.useState)("drawerClosed"),a=Object(o.a)(e,2),t=a[0],l=a[1],c=Object(n.useState)("drawerClosed"),i=Object(o.a)(c,2),d=i[0],s=i[1],m=Object(n.useState)(!1),u=Object(o.a)(m,2),E=u[0],v=u[1];function w(){"drawerOpen"===d&&k(),l("drawerClosed"===t?"drawerDocked":"drawerClosed")}function k(){"drawerDocked"===t&&w(),s("drawerClosed"===d?"drawerOpen":"drawerClosed")}return Object(n.useEffect)((function(){}),E),r.a.createElement("div",{className:"App"},r.a.createElement(p,{toggleTokens:w,toggleMaps:k,toggleOptions:function(){v(!E)},close:function(){v(!1),l("drawerClosed"),s("drawerClosed")}}),E&&r.a.createElement(b,null),r.a.createElement(g,{state:t}),r.a.createElement(f,{state:d}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(N,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[14,1,2]]]);
//# sourceMappingURL=main.cc280fff.chunk.js.map