// event_emitter.js v0.0.1
// https://github.com/shokai/EventEmitter.js
// (c) 2013 Sho Hashimoto <hashimoto@shokai.org>
// The MIT License
var EventEmitter=function(){var e=this;this.apply=function(t,n){n||(n="");for(var r in e)e.hasOwnProperty(r)&&(t[n+r]=this[r])},this.events=new Array,this.on=function(t,n,r){if(typeof n!="function")return;var s=e.events.length>0?1+e.events[e.events.length-1].id:0,o={id:s,type:t,listener:n};for(i in r)o[i]||(o[i]=r[i]);return e.events.push(o),s},this.once=function(e,t){this.on(e,t,{once:!0})},this.emit=function(t,n){for(var r=0;r<e.events.length;r++){var i=e.events[r];i.type==t&&i.listener(n),i.once&&this.removeListener(i.id)}},this.removeListener=function(t){for(var n=e.events.length-1;n>=0;n--){var r=e.events[n];switch(typeof t){case"number":r.id==t&&e.events.splice(n,1);break;case"string":r.type==t&&e.events.splice(n,1)}}}};
