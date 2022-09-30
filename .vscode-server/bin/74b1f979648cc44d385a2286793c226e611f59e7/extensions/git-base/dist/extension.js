(()=>{"use strict";var e={800:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.config=t.loadMessageBundle=t.localize=t.format=t.setPseudo=t.isPseudo=t.isString=t.isNumber=t.isDefined=t.BundleFormat=t.MessageFormat=void 0;var o,n,i,a=r(926);function s(e){return void 0!==e}(i=t.MessageFormat||(t.MessageFormat={})).file="file",i.bundle="bundle",i.both="both",(n=t.BundleFormat||(t.BundleFormat={})).standalone="standalone",n.languagePack="languagePack",function(e){e.is=function(e){var t=e;return t&&s(t.key)&&s(t.comment)}}(o||(o={})),t.isDefined=s;var l=Object.prototype.toString;function c(e,r){return t.isPseudo&&(e="［"+e.replace(/[aouei]/g,"$&$&")+"］"),0===r.length?e:e.replace(/\{(\d+)\}/g,(function(e,t){var o=t[0],n=r[o],i=e;return"string"==typeof n?i=n:"number"!=typeof n&&"boolean"!=typeof n&&null!=n||(i=String(n)),i}))}t.isNumber=function(e){return"[object Number]"===l.call(e)},t.isString=function(e){return"[object String]"===l.call(e)},t.isPseudo=!1,t.setPseudo=function(e){t.isPseudo=e},t.format=c,t.localize=function(e,t){for(var r=[],o=2;o<arguments.length;o++)r[o-2]=arguments[o];return c(t,r)},t.loadMessageBundle=function(e){return(0,a.default)().loadMessageBundle(e)},t.config=function(e){return(0,a.default)().config(e)}},926:(e,t)=>{var r;function o(){if(void 0===r)throw new Error("No runtime abstraction layer installed");return r}Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.install=function(e){if(void 0===e)throw new Error("No runtime abstraction layer provided");r=e}}(o||(o={})),t.default=o},472:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.config=t.loadMessageBundle=t.BundleFormat=t.MessageFormat=void 0;var o,n,i=r(622),a=r(747),s=r(926),l=r(800),c=r(800);function u(e){return JSON.parse(a.readFileSync(e,"utf8"))}function d(e){return function(t,r){for(var o=[],n=2;n<arguments.length;n++)o[n-2]=arguments[n];return(0,l.isNumber)(t)?t>=e.length?void console.error("Broken localize call found. Index out of bounds. Stacktrace is\n: ".concat(new Error("").stack)):(0,l.format)(e[t],o):(0,l.isString)(r)?(console.warn("Message ".concat(r," didn't get externalized correctly.")),(0,l.format)(r,o)):void console.error("Broken localize call found. Stacktrace is\n: ".concat(new Error("").stack))}}function f(e,t){return o[e]=t,t}function g(e){try{return function(e){var t=u(i.join(e,"nls.metadata.json")),r=Object.create(null);for(var o in t){var n=t[o];r[o]=n.messages}return r}(e)}catch(e){return void console.log("Generating default bundle from meta data failed.",e)}}function p(e,t){var r;if(!0===n.languagePackSupport&&void 0!==n.cacheRoot&&void 0!==n.languagePackId&&void 0!==n.translationsConfigFile&&void 0!==n.translationsConfig)try{r=function(e,t){var r,o,s,c=i.join(n.cacheRoot,"".concat(e.id,"-").concat(e.hash,".json")),d=!1,f=!1;try{return r=JSON.parse(a.readFileSync(c,{encoding:"utf8",flag:"r"})),o=c,s=new Date,a.utimes(o,s,s,(function(){})),r}catch(e){if("ENOENT"===e.code)f=!0;else{if(!(e instanceof SyntaxError))throw e;console.log("Syntax error parsing message bundle: ".concat(e.message,".")),a.unlink(c,(function(e){e&&console.error("Deleting corrupted bundle ".concat(c," failed."))})),d=!0}}if(!(r=function(e,t){var r=n.translationsConfig[e.id];if(r){var o=u(r).contents,a=u(i.join(t,"nls.metadata.json")),s=Object.create(null);for(var c in a){var d=a[c],f=o["".concat(e.outDir,"/").concat(c)];if(f){for(var g=[],p=0;p<d.keys.length;p++){var m=d.keys[p],h=f[(0,l.isString)(m)?m:m.key];void 0===h&&(h=d.messages[p]),g.push(h)}s[c]=g}else s[c]=d.messages}return s}}(e,t))||d)return r;if(f)try{a.writeFileSync(c,JSON.stringify(r),{encoding:"utf8",flag:"wx"})}catch(e){if("EEXIST"===e.code)return r;throw e}return r}(e,t)}catch(e){console.log("Load or create bundle failed ",e)}if(!r){if(n.languagePackSupport)return g(t);var o=function(e){for(var t=n.language;t;){var r=i.join(e,"nls.bundle.".concat(t,".json"));if(a.existsSync(r))return r;var o=t.lastIndexOf("-");t=o>0?t.substring(0,o):void 0}if(void 0===t&&(r=i.join(e,"nls.bundle.json"),a.existsSync(r)))return r}(t);if(o)try{return u(o)}catch(e){console.log("Loading in the box message bundle failed.",e)}r=g(t)}return r}function m(e){if(!e)return l.localize;var t=i.extname(e);if(t&&(e=e.substr(0,e.length-t.length)),n.messageFormat===l.MessageFormat.both||n.messageFormat===l.MessageFormat.bundle){var r=function(e){for(var t,r=i.dirname(e);t=i.join(r,"nls.metadata.header.json"),!a.existsSync(t);){var o=i.dirname(r);if(o===r){t=void 0;break}r=o}return t}(e);if(r){var s=i.dirname(r),c=o[s];if(void 0===c)try{var g=JSON.parse(a.readFileSync(r,"utf8"));try{var m=p(g,s);c=f(s,m?{header:g,nlsBundle:m}:null)}catch(e){console.error("Failed to load nls bundle",e),c=f(s,null)}}catch(e){console.error("Failed to read header file",e),c=f(s,null)}if(c){var h=e.substr(s.length+1).replace(/\\/g,"/"),v=c.nlsBundle[h];return void 0===v?(console.error("Messages for file ".concat(e," not found. See console for details.")),function(){return"Messages not found."}):d(v)}}}if(n.messageFormat===l.MessageFormat.both||n.messageFormat===l.MessageFormat.file)try{var b=u(function(e){var t;if(n.cacheLanguageResolution&&t)t=t;else{if(l.isPseudo||!n.language)t=".nls.json";else for(var r=n.language;r;){var o=".nls."+r+".json";if(a.existsSync(e+o)){t=o;break}var i=r.lastIndexOf("-");i>0?r=r.substring(0,i):(t=".nls.json",r=null)}n.cacheLanguageResolution&&(t=t)}return e+t}(e));return Array.isArray(b)?d(b):(0,l.isDefined)(b.messages)&&(0,l.isDefined)(b.keys)?d(b.messages):(console.error("String bundle '".concat(e,"' uses an unsupported format.")),function(){return"File bundle has unsupported format. See console for details"})}catch(e){"ENOENT"!==e.code&&console.error("Failed to load single file bundle",e)}return console.error("Failed to load message bundle for file ".concat(e)),function(){return"Failed to load message bundle. See console for details."}}function h(e){return e&&((0,l.isString)(e.locale)&&(n.locale=e.locale.toLowerCase(),n.language=n.locale,o=Object.create(null)),void 0!==e.messageFormat&&(n.messageFormat=e.messageFormat),e.bundleFormat===l.BundleFormat.standalone&&!0===n.languagePackSupport&&(n.languagePackSupport=!1)),(0,l.setPseudo)("pseudo"===n.locale),m}Object.defineProperty(t,"MessageFormat",{enumerable:!0,get:function(){return c.MessageFormat}}),Object.defineProperty(t,"BundleFormat",{enumerable:!0,get:function(){return c.BundleFormat}}),function(){if(n={locale:void 0,language:void 0,languagePackSupport:!1,cacheLanguageResolution:!0,messageFormat:l.MessageFormat.bundle},(0,l.isString)(process.env.VSCODE_NLS_CONFIG))try{var e=JSON.parse(process.env.VSCODE_NLS_CONFIG),t=void 0;if(e.availableLanguages){var r=e.availableLanguages["*"];(0,l.isString)(r)&&(t=r)}if((0,l.isString)(e.locale)&&(n.locale=e.locale.toLowerCase()),void 0===t?n.language=n.locale:"en"!==t&&(n.language=t),function(e){return!0===e||!1===e}(e._languagePackSupport)&&(n.languagePackSupport=e._languagePackSupport),(0,l.isString)(e._cacheRoot)&&(n.cacheRoot=e._cacheRoot),(0,l.isString)(e._languagePackId)&&(n.languagePackId=e._languagePackId),(0,l.isString)(e._translationsConfigFile)){n.translationsConfigFile=e._translationsConfigFile;try{n.translationsConfig=u(n.translationsConfigFile)}catch(t){if(e._corruptedFile){var s=i.dirname(e._corruptedFile);a.exists(s,(function(t){t&&a.writeFile(e._corruptedFile,"corrupted","utf8",(function(e){console.error(e)}))}))}}}}catch(e){}(0,l.setPseudo)("pseudo"===n.locale),o=Object.create(null)}(),t.loadMessageBundle=m,t.config=h,s.default.install(Object.freeze({loadMessageBundle:m,config:h}))},61:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.registerAPICommands=t.ApiImpl=void 0;const o=r(549),n=r(462);t.ApiImpl=class{constructor(e){this._model=e}pickRemoteSource(e){return(0,n.pickRemoteSource)(this._model,e)}registerRemoteSourceProvider(e){return this._model.registerRemoteSourceProvider(e)}},t.registerAPICommands=function(e){const t=[];return t.push(o.commands.registerCommand("git-base.api.getRemoteSources",(t=>{if(e.model)return(0,n.pickRemoteSource)(e.model,t)}))),o.Disposable.from(...t)}},463:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GitBaseExtensionImpl=void 0;const o=r(549),n=r(61);t.GitBaseExtensionImpl=class{constructor(e){this.enabled=!1,this._onDidChangeEnablement=new o.EventEmitter,this.onDidChangeEnablement=this._onDidChangeEnablement.event,this._model=void 0,e&&(this.enabled=!0,this._model=e)}set model(e){this._model=e;const t=!!e;this.enabled!==t&&(this.enabled=t,this._onDidChangeEnablement.fire(this.enabled))}get model(){return this._model}getAPI(e){if(!this._model)throw new Error("Git model not found");if(1!==e)throw new Error(`No API version ${e} found.`);return new n.ApiImpl(this._model)}}},183:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.throttle=t.debounce=void 0;const o=r(56);function n(e){return(t,r,o)=>{let n=null,i=null;if("function"==typeof o.value?(n="value",i=o.value):"function"==typeof o.get&&(n="get",i=o.get),!i||!n)throw new Error("not supported");o[n]=e(i,r)}}t.debounce=function(e){return n(((t,r)=>{const o=`$debounce$${r}`;return function(...r){clearTimeout(this[o]),this[o]=setTimeout((()=>t.apply(this,r)),e)}}))},t.throttle=n((function(e,t){const r=`$throttle$current$${t}`,n=`$throttle$next$${t}`,i=function(...t){if(this[n])return this[n];if(this[r])return this[n]=(0,o.done)(this[r]).then((()=>(this[n]=void 0,i.apply(this,t)))),this[n];this[r]=e.apply(this,t);const a=()=>this[r]=void 0;return(0,o.done)(this[r]).then(a,a),this[r]};return i}))},194:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Model=void 0;const o=r(549),n=r(56);t.Model=class{constructor(){this.remoteSourceProviders=new Set,this._onDidAddRemoteSourceProvider=new o.EventEmitter,this.onDidAddRemoteSourceProvider=this._onDidAddRemoteSourceProvider.event,this._onDidRemoveRemoteSourceProvider=new o.EventEmitter,this.onDidRemoveRemoteSourceProvider=this._onDidRemoveRemoteSourceProvider.event}registerRemoteSourceProvider(e){return this.remoteSourceProviders.add(e),this._onDidAddRemoteSourceProvider.fire(e),(0,n.toDisposable)((()=>{this.remoteSourceProviders.delete(e),this._onDidRemoveRemoteSourceProvider.fire(e)}))}getRemoteProviders(){return[...this.remoteSourceProviders.values()]}}},462:function(e,t,r){var o=this&&this.__decorate||function(e,t,r,o){var n,i=arguments.length,a=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(i<3?n(a):i>3?n(t,r,a):n(t,r))||a);return i>3&&a&&Object.defineProperty(t,r,a),a};Object.defineProperty(t,"__esModule",{value:!0}),t.pickRemoteSource=void 0;const n=r(549),i=r(472),a=r(183),s=i.loadMessageBundle(r(622).join(__dirname,"remoteSource.ts"));async function l(e){const t=await new Promise((t=>{e.onDidAccept((()=>t(e.selectedItems[0]))),e.onDidHide((()=>t(void 0))),e.show()}));return e.hide(),t}class c{constructor(e){this.provider=e}ensureQuickPick(){this.quickpick||(this.quickpick=n.window.createQuickPick(),this.quickpick.ignoreFocusOut=!0,this.provider.supportsQuery?(this.quickpick.placeholder=this.provider.placeholder??s(0,null),this.quickpick.onDidChangeValue(this.onDidChangeValue,this)):this.quickpick.placeholder=this.provider.placeholder??s(1,null))}onDidChangeValue(){this.query()}async query(){try{this.ensureQuickPick(),this.quickpick.busy=!0,this.quickpick.show();const e=await this.provider.getRemoteSources(this.quickpick?.value)||[];0===e.length?this.quickpick.items=[{label:s(2,null),alwaysShow:!0}]:this.quickpick.items=e.map((e=>({label:e.icon?`$(${e.icon}) ${e.name}`:e.name,description:e.description||("string"==typeof e.url?e.url:e.url[0]),detail:e.detail,remoteSource:e,alwaysShow:!0})))}catch(e){this.quickpick.items=[{label:s(3,null,"$(error)",e.message),alwaysShow:!0}],console.error(e)}finally{this.quickpick.busy=!1}}async pick(){return await this.query(),(await l(this.quickpick))?.remoteSource}}async function u(e,t={}){const r=new c(e),o=await r.pick();let i;if(o&&("string"==typeof o.url?i=o.url:o.url.length>0&&(i=await n.window.showQuickPick(o.url,{ignoreFocusOut:!0,placeHolder:s(9,null)}))),!i||!t.branch)return i;if(!e.getBranches)return{url:i};const a=await e.getBranches(i);if(!a)return{url:i};const l=await n.window.showQuickPick(a,{placeHolder:s(10,null)});return l?{url:i,branch:l}:{url:i}}o([(0,a.debounce)(300)],c.prototype,"onDidChangeValue",null),o([a.throttle],c.prototype,"query",null),t.pickRemoteSource=async function(e,t={}){const r=n.window.createQuickPick();if(r.ignoreFocusOut=!0,r.title=t.title,t.providerName){const r=e.getRemoteProviders().filter((e=>e.name===t.providerName))[0];if(r)return await u(r,t)}const o=e.getRemoteProviders().map((e=>({label:(e.icon?`$(${e.icon}) `:"")+(t.providerLabel?t.providerLabel(e):e.name),alwaysShow:!0,provider:e}))),i=[];if(t.showRecentSources)for(const{provider:e}of o){const t=(await(e.getRecentRemoteSources?.())??[]).map((e=>({...e,label:(e.icon?`$(${e.icon}) `:"")+e.name,url:"string"==typeof e.url?e.url:e.url[0]})));i.push(...t)}const a=[{kind:n.QuickPickItemKind.Separator,label:s(4,null)},...o,{kind:n.QuickPickItemKind.Separator,label:s(5,null)},...i.sort(((e,t)=>t.timestamp-e.timestamp))];r.placeholder=t.placeholder??(0===o.length?s(6,null):s(7,null));const c=e=>{if(e){const o=("string"==typeof t.urlLabel?t.urlLabel:t.urlLabel?.(e))??s(8,null);r.items=[{label:o,description:e,alwaysShow:!0,url:e},...a]}else r.items=a};r.onDidChangeValue(c),c();const d=await l(r);if(d){if(d.url)return d.url;if(d.provider)return await u(d.provider,t)}}},56:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Versions=t.done=t.toDisposable=void 0,t.toDisposable=function(e){return{dispose:e}},t.done=function(e){return e.then((()=>{}))},function(e){function t(e,t,r,o){return{major:"string"==typeof e?parseInt(e,10):e,minor:"string"==typeof t?parseInt(t,10):t,patch:null==r?0:"string"==typeof r?parseInt(r,10):r,pre:o}}function r(e){const[r,o]=e.split("-"),[n,i,a]=r.split(".");return t(n,i,a,o)}e.compare=function(e,t){return"string"==typeof e&&(e=r(e)),"string"==typeof t&&(t=r(t)),e.major>t.major?1:e.major<t.major?-1:e.minor>t.minor?1:e.minor<t.minor?-1:e.patch>t.patch?1:e.patch<t.patch?-1:void 0===e.pre&&void 0!==t.pre?1:void 0!==e.pre&&void 0===t.pre?-1:void 0!==e.pre&&void 0!==t.pre?e.pre.localeCompare(t.pre):0},e.from=t,e.fromString=r}(t.Versions||(t.Versions={}))},747:e=>{e.exports=require("fs")},622:e=>{e.exports=require("path")},549:e=>{e.exports=require("vscode")}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var i=t[o]={exports:{}};return e[o].call(i.exports,i,i.exports,r),i.exports}var o={};(()=>{var e=o;Object.defineProperty(e,"__esModule",{value:!0}),e.activate=void 0;const t=r(61),n=r(463),i=r(194);e.activate=function(e){const r=new n.GitBaseExtensionImpl(new i.Model);return e.subscriptions.push((0,t.registerAPICommands)(r)),r}})();var n=exports;for(var i in o)n[i]=o[i];o.__esModule&&Object.defineProperty(n,"__esModule",{value:!0})})();
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/74b1f979648cc44d385a2286793c226e611f59e7/extensions/git-base/dist/extension.js.map