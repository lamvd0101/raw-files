!function(e){var t={};function s(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(i,n,function(t){return e[t]}.bind(null,n));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=5)}([function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(2);class n extends i.default{constructor(e){super(),this._messageQueue=[],this._wallUnlisten=null,this._isShutdown=!1,this._timeoutID=null,this._flush=()=>{if(null!==this._timeoutID&&(clearTimeout(this._timeoutID),this._timeoutID=null),this._messageQueue.length){for(let e=0;e<this._messageQueue.length;e+=2)this._wall.send(this._messageQueue[e],...this._messageQueue[e+1]);this._messageQueue.length=0,this._timeoutID=setTimeout(this._flush,100)}},this._wall=e,this._wallUnlisten=e.listen(e=>{this.emit(e.event,e.params)})||null}shutdown(){if(this._isShutdown)return void console.warn("Bridge was already shutdown.");this._isShutdown=!0,this.addListener=function(){},this.emit=function(){},this.removeAllListeners();const e=this._wallUnlisten;e&&e();do{this._flush()}while(this._messageQueue.length);null!==this._timeoutID&&(clearTimeout(this._timeoutID),this._timeoutID=null)}send(e,...t){this._isShutdown?console.warn(`Cannot send message "${e}" with payload ${JSON.stringify(t)} through a Bridge that has been shutdown.`):(this._messageQueue.push(e,t),this._timeoutID||(this._timeoutID=setTimeout(this._flush,0)))}}t.default=n},function(e,t,s){"use strict";var i=this&&this.__awaiter||function(e,t,s,i){return new(s||(s=Promise))((function(n,o){function a(e){try{l(i.next(e))}catch(e){o(e)}}function r(e){try{l(i.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?n(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(a,r)}l((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.AsyncEmitter=t.WaitUntilEvent=t.Emitter=t.Event=void 0,function(e){const t={dispose(){}};e.None=Object.assign((function(){return t}),{get maxListeners(){return 0},set maxListeners(e){}}),e.map=function(e,t){return Object.assign((s,i,n)=>e(e=>s.call(i,t(e)),void 0,n),{maxListeners:0})}}(t.Event||(t.Event={}));class n{get length(){return this._callbacks&&this._callbacks.length||0}add(e,t,s){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(t),Array.isArray(s)&&s.push({dispose:()=>this.remove(e,t)})}remove(e,t){if(!this._callbacks)return;let s=!1;for(let i=0;i<this._callbacks.length;i++)if(this._callbacks[i]===e){if(this._contexts[i]===t)return this._callbacks.splice(i,1),void this._contexts.splice(i,1);s=!0}if(s)throw new Error("When adding a listener with a context, you should remove it with the same context")}[Symbol.iterator](){if(!this._callbacks)return[][Symbol.iterator]();const e=this._callbacks.slice(0),t=this._contexts.slice(0);return e.map((e,s)=>(...i)=>e.apply(t[s],i))[Symbol.iterator]()}invoke(...e){const t=[];for(const s of this)try{t.push(s(...e))}catch(e){console.error(e)}return t}isEmpty(){return!this._callbacks||0===this._callbacks.length}dispose(){this._callbacks=void 0,this._contexts=void 0}}class o{constructor(e){this._options=e,this._disposed=!1,this._leakWarnCountdown=0}get event(){return this._event||(this._event=Object.assign((e,t,s)=>{this._callbacks||(this._callbacks=new n),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,t);const i=this.checkMaxListeners(this._event.maxListeners),a={dispose:()=>{i&&i(),a.dispose=o._noop,this._disposed||(this._callbacks.remove(e,t),a.dispose=o._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(s)&&s.push(a),a},{maxListeners:o.LEAK_WARNING_THRESHHOLD})),this._event}checkMaxListeners(e){if(0===e||!this._callbacks)return;const t=this._callbacks.length;if(t<=e)return;const s=this.pushLeakingStack();if(this._leakWarnCountdown-=1,this._leakWarnCountdown<=0){let s;this._leakWarnCountdown=.5*e;let i=0;this._leakingStacks.forEach((e,t)=>{(!s||i<e)&&(s=t,i=e)}),console.warn(`Possible Emitter memory leak detected. ${t} listeners added. Use event.maxListeners to increase the limit (${e}). MOST frequent listener (${i}):`),console.warn(s)}return s}pushLeakingStack(){this._leakingStacks||(this._leakingStacks=new Map);const e=(new Error).stack.split("\n").slice(3).join("\n"),t=this._leakingStacks.get(e)||0;return this._leakingStacks.set(e,t+1),()=>this.popLeakingStack(e)}popLeakingStack(e){if(!this._leakingStacks)return;const t=this._leakingStacks.get(e)||0;this._leakingStacks.set(e,t-1)}fire(e){this._callbacks&&this._callbacks.invoke(e)}sequence(e){return i(this,void 0,void 0,(function*(){if(this._callbacks)for(const t of this._callbacks)if(!(yield e(t)))break}))}dispose(){this._leakingStacks&&(this._leakingStacks.clear(),this._leakingStacks=void 0),this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0),this._disposed=!0}}t.Emitter=o,o.LEAK_WARNING_THRESHHOLD=175,o._noop=function(){},function(e){e.fire=function(e,t,s){return i(this,void 0,void 0,(function*(){const i=[],n=Object.assign(t,{waitUntil:e=>{if(Object.isFrozen(i))throw new Error("waitUntil cannot be called asynchronously.");i.push(e)}});try{e.fire(n),Object.freeze(i)}finally{delete n.waitUntil}i.length&&(void 0!==s?yield Promise.race([Promise.all(i),new Promise(e=>setTimeout(e,s))]):yield Promise.all(i))}))}}(t.WaitUntilEvent||(t.WaitUntilEvent={}));const a=s(4);t.AsyncEmitter=class extends o{fire(e,t=a.CancellationToken.None,s){const i=this._callbacks;if(!i)return Promise.resolve();const n=[...i];return this.deliveryQueue?this.deliveryQueue=this.deliveryQueue.then(()=>this.deliver(n,e,t,s)):this.deliveryQueue=this.deliver(n,e,t,s)}deliver(e,t,s,n){return i(this,void 0,void 0,(function*(){for(const i of e){if(s.isCancellationRequested)return;const e=[],o=Object.assign(t,{waitUntil:t=>{if(Object.isFrozen(e))throw new Error("waitUntil cannot be called asynchronously.");n&&(t=n(t,i)),e.push(t)}});try{i(t),Object.freeze(e)}catch(e){console.error(e)}finally{delete o.waitUntil}if(!e.length)return;try{yield Promise.all(e)}catch(e){console.error(e)}}}))}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(3);t.default=class{constructor(){this.addEventListener=(e,t)=>this.addListener(e,t),this.removeEventListener=(e,t)=>{this.removeListener(e,t)},this.listenersMap=new Map}addListener(e,t){const s=this.listenersMap.get(e);if(void 0===s)this.listenersMap.set(e,[t]);else{s.indexOf(t)<0&&s.push(t)}return i.Disposable.create(()=>{this.removeListener(e,t)})}emit(e,...t){const s=this.listenersMap.get(e);if(void 0!==s)if(1===s.length){s[0].apply(null,t)}else{let e=!1,i=null;const n=Array.from(s);for(let s=0;s<n.length;s++){const o=n[s];try{o.apply(null,t)}catch(t){null===i&&(e=!0,i=t)}}if(e)throw i}}removeAllListeners(){this.listenersMap.clear()}removeListener(e,t){const s=this.listenersMap.get(e);if(void 0!==s){const e=s.indexOf(t);e>=0&&s.splice(e,1)}}dispose(){this.removeAllListeners()}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DisposableCollection=t.Disposable=void 0;const i=s(1);var n;!function(e){function t(e){return{dispose:e}}e.is=function(e){return!!e&&"object"==typeof e&&"dispose"in e&&"function"==typeof e.dispose},e.create=t,e.NULL=t(()=>{})}(n=t.Disposable||(t.Disposable={}));t.DisposableCollection=class{constructor(...e){this.disposables=[],this.onDisposeEmitter=new i.Emitter,this.disposingElements=!1,e.forEach(e=>this.push(e))}get onDispose(){return this.onDisposeEmitter.event}checkDisposed(){this.disposed&&!this.disposingElements&&(this.onDisposeEmitter.fire(void 0),this.onDisposeEmitter.dispose())}get disposed(){return 0===this.disposables.length}dispose(){if(!this.disposed&&!this.disposingElements){for(this.disposingElements=!0;!this.disposed;)try{this.disposables.pop().dispose()}catch(e){console.error(e)}this.disposingElements=!1,this.checkDisposed()}}push(e){const t=this.disposables;t.push(e);const s=e.dispose.bind(e),i=n.create(()=>{const s=t.indexOf(e);-1!==s&&t.splice(s,1),this.checkDisposed()});return e.dispose=()=>{i.dispose(),s()},i}pushAll(e){return e.map(e=>this.push(e))}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.checkCancelled=t.isCancelled=t.cancelled=t.CancellationTokenSource=t.CancellationToken=void 0;const i=s(1),n=Object.freeze(Object.assign((function(e,t){const s=setTimeout(e.bind(t),0);return{dispose(){clearTimeout(s)}}}),{maxListeners:0}));var o;!function(e){e.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:i.Event.None}),e.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:n})}(o=t.CancellationToken||(t.CancellationToken={}));class a{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this._emitter=void 0))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?n:(this._emitter||(this._emitter=new i.Emitter),this._emitter.event)}}t.CancellationTokenSource=class{get token(){return this._token||(this._token=new a),this._token}cancel(){this._token?this._token!==o.Cancelled&&this._token.cancel():this._token=o.Cancelled}dispose(){this.cancel()}};function r(){return new Error("Cancelled")}t.cancelled=r,t.isCancelled=function(e){return!!e&&"Cancelled"===e.message},t.checkCancelled=function(e){if(e&&e.isCancellationRequested)throw r()}},function(e,t,s){"use strict";s.r(t);var i=s(0),n=s.n(i),o=new WeakMap;function a(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,i)}return s}function r(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?a(Object(s),!0).forEach((function(t){l(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):a(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}function l(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}var c=0;class h{constructor(){var e,t;l(this,"TFAppReady",new Promise(e=>this.TFAppResolve=e)),l(this,"bridgeReady",new Promise(e=>this.bridgeReadyResolve=e)),l(this,"onAppLifecycle",e=>{var{event:t,args:s,app:i}=e,n=++c,o="onApp".concat(t.slice(2)),a="";try{a=JSON.stringify({app:i.publicInstance,options:s[0]||{}})}catch(e){}this.bridgeReady.then(e=>{var t;e.send("AppLog.requestWillBeSent",{requestId:"".concat(o,".").concat(n),timestamp:performance.now()/1e3,type:"LifeCycle",request:{name:o,route:null===(t=i.getCurrentPage())||void 0===t?void 0:t.getPagePath(),contextData:a}})}),this.bridgeReady.then(e=>{e.send("AppLog.responseReceived",{requestId:"".concat(o,".").concat(n),timestamp:performance.now()/1e3,type:"LifeCycle",response:{name:o}})})}),l(this,"onPageLifecycle",e=>{var{event:t,args:s,page:i}=e,n=++c,o="onPage".concat(t.slice(2)),a={};"onPageLoad"===o&&(a.query=s[0]);var l="";try{l=JSON.stringify(r(r({page:i.publicInstance},a),{},{route:i.getPagePath()}))}catch(e){}this.bridgeReady.then(e=>{e.send("AppLog.requestWillBeSent",{requestId:"".concat(o,".").concat(n),timestamp:performance.now()/1e3,type:"LifeCycle",request:{name:o,route:i.getPagePath(),contextData:l}})}),this.bridgeReady.then(e=>{e.send("AppLog.responseReceived",{requestId:"".concat(o,".").concat(n),timestamp:performance.now()/1e3,type:"LifeCycle",response:{name:o}})})}),l(this,"onSetData",e=>{var{requestId:t,page:s,component:i,data:n,componentType:o}=e;this.bridgeReady.then(e=>{e.send("AppLog.requestWillBeSent",{requestId:"setData.".concat(o,".").concat(t),timestamp:performance.now()/1e3,type:"SetData",request:{name:"setData",route:"page"===o?s.getPagePath():i.is,paramsData:JSON.stringify({data:n}),contextData:JSON.stringify({isPage:"page"===o,option:{data:n},pagePath:"page"===o?s.getPagePath():i.is})}})})}),l(this,"onSetDataCallback",e=>{var{requestId:t,componentType:s}=e;this.bridgeReady.then(e=>{e.send("AppLog.responseReceived",{requestId:"setData.".concat(s,".").concat(t),timestamp:performance.now()/1e3,type:"SetData",response:{name:"setData"}})})}),(e=self,t="TFApp",new Promise(s=>{if(void 0===e[t]){if(o.has(e)){var i=o.get(e);i[t]||(i[t]=[]),i[t].push(s)}else o.set(e,{[t]:[s]});var n;Object.defineProperty(e,t,{get:()=>n,set(s){if(n=s,o.has(e)){var i=o.get(e);(i[t]||[]).forEach(e=>{e()}),delete i[t],Object.keys(i)||o.delete(e)}}})}else s(e[t])})).then(()=>{var{TFApp:e}=self.TFApp.getAppContext();this.TFAppResolve(e)})}init(e){this.bridgeReadyResolve(e),this.printSDKVersion(),this.TFAppReady.then(t=>{t.bridge.onApiAsyncCall((function(){var t,s,i,{requestId:n,name:o,params:a,context:r}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};e.send("AppLog.requestWillBeSent",{requestId:n,timestamp:performance.now()/1e3,type:"JSAPI",request:{name:o,route:null===(t=r.getPage())||void 0===t?void 0:t.getPagePath(),paramsData:JSON.stringify(a),contextData:JSON.stringify({requestId:n,apiName:o,page:{pagePath:null===(s=r.getPage())||void 0===s?void 0:s.getPagePath(),pageId:null===(i=r.getPage())||void 0===i?void 0:i.getId()}})}})})),t.bridge.onApiAsyncCallback((function(){var t,s,{requestId:i,name:n,response:o,context:a}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};e.send("AppLog.responseReceived",{requestId:i,timestamp:performance.now()/1e3,type:"JSAPI",response:{name:n,responseData:JSON.stringify(o),status:o.error||0,statusText:o.errorMessage||"",contextData:JSON.stringify({requestId:i,apiName:n,page:{pagePath:null===(t=a.getPage())||void 0===t?void 0:t.getPagePath(),pageId:null===(s=a.getPage())||void 0===s?void 0:s.getId()}})}})}))})}printSDKVersion(){this.TFAppReady.then(e=>{setTimeout(console.log.bind(console,"SDKVersion: ".concat(e.bridge.SDKVersion)))})}}try{if(self.__DEVTOOLS_URL__||self.ENABLE_DEBUG_MODE){var u=new h,d={onPageLifecycle:u.onPageLifecycle,onAppLifecycle:u.onAppLifecycle,onSetData:u.onSetData,onSetDataCallback:u.onSetDataCallback};if(self.__TINI_DEVTOOLS_GLOBAL_HOOK__=d,self.__DEVTOOLS_URL__){var p=new WebSocket("".concat(self.__DEVTOOLS_URL__,"?role=worker"));p.onopen=()=>{var e=new n.a({listen:e=>(p.onmessage=e=>{},()=>{p.onmessage=null}),send(e,t){p.send(JSON.stringify({method:e,params:t}))}});u.init(e)}}else if(self.ENABLE_DEBUG_MODE){var f=new n.a({listen(e){},send(e,t){self.kernel.onDevToolsMessage({method:e,params:t})}});u.init(f)}}}catch(e){}}]);