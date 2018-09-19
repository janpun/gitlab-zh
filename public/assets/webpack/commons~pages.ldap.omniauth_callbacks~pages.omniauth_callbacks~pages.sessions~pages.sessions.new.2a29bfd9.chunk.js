(this.webpackJsonp=this.webpackJsonp||[]).push([[8],{349:function(e,t,r){"use strict";var n=r(0),o=r.n(n),s=r(3),i=r.n(s),a=r(462),u=r(461),c=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();var d=function(){function e(t,r,n,o,s){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.u2fUtils=null,this.container=t,this.renderAuthenticated=this.renderAuthenticated.bind(this),this.renderError=this.renderError.bind(this),this.renderInProgress=this.renderInProgress.bind(this),this.renderTemplate=this.renderTemplate.bind(this),this.authenticate=this.authenticate.bind(this),this.start=this.start.bind(this),this.appId=n.app_id,this.challenge=n.challenge,this.form=r,this.fallbackButton=o,this.fallbackUI=s,this.fallbackButton&&this.fallbackButton.addEventListener("click",this.switchToFallbackUI.bind(this)),this.signRequests=n.sign_requests.map(function(e){return i()(e).omit("challenge")}),this.templates={setup:"#js-authenticate-u2f-setup",inProgress:"#js-authenticate-u2f-in-progress",error:"#js-authenticate-u2f-error",authenticated:"#js-authenticate-u2f-authenticated"}}return c(e,[{key:"start",value:function(){var e=this;return Object(a.a)().then(function(t){e.u2fUtils=t,e.renderInProgress()}).catch(function(){return e.switchToFallbackUI()})}},{key:"authenticate",value:function(){var e=this;return this.u2fUtils.sign(this.appId,this.challenge,this.signRequests,function(t){if(t.errorCode){var r=new u.a(t.errorCode,"authenticate");return e.renderError(r)}return e.renderAuthenticated(JSON.stringify(t))},10)}},{key:"renderTemplate",value:function(e,t){var r=o()(this.templates[e]).html(),n=i.a.template(r);return this.container.html(n(t))}},{key:"renderInProgress",value:function(){return this.renderTemplate("inProgress"),this.authenticate()}},{key:"renderError",value:function(e){return this.renderTemplate("error",{error_message:e.message(),error_code:e.errorCode}),this.container.find("#js-u2f-try-again").on("click",this.renderInProgress)}},{key:"renderAuthenticated",value:function(e){this.renderTemplate("authenticated");var t=this.container[0];t.querySelector("#js-device-response").value=e,t.querySelector(this.form).submit(),this.fallbackButton.classList.add("hidden")}},{key:"switchToFallbackUI",value:function(){this.fallbackButton.classList.add("hidden"),this.container[0].classList.add("hidden"),this.fallbackUI.classList.remove("hidden")}}]),e}();t.a=function(){if(gon.u2f){var e=new d(o()("#js-authenticate-u2f"),"#js-login-u2f-form",gon.u2f,document.querySelector("#js-login-2fa-device"),document.querySelector(".js-2fa-form"));e.start(),gl.u2fAuthenticate=e}}},461:function(e,t,r){"use strict";var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();var o=function(){function e(t,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.errorCode=t,this.message=this.message.bind(this),this.httpsDisabled="https:"!==window.location.protocol,this.u2fFlowType=r}return n(e,[{key:"message",value:function(){if(this.errorCode===window.u2f.ErrorCodes.BAD_REQUEST&&this.httpsDisabled)return"U2F only works with HTTPS-enabled websites. Contact your administrator for more details.";if(this.errorCode===window.u2f.ErrorCodes.DEVICE_INELIGIBLE){if("authenticate"===this.u2fFlowType)return"This device has not been registered with us.";if("register"===this.u2fFlowType)return"This device has already been registered with us."}return"There was a problem communicating with your device."}}]),e}();t.a=o},462:function(e,t,r){"use strict";function n(e){return e.indexOf("Opera")>=0||e.indexOf("OPR")>=0}function o(e){var t=function(e){return e.indexOf("Chrom")>=0&&!n(e)}(e)&&function(e){var t=e.match(/Chrom(?:e|ium)\/([0-9]+)\./);return!!t&&parseInt(t[1],10)}(e)>=41,r=n(e)&&function(e){var t=e.match(/OPR[^0-9]*([0-9]+)[^0-9]+/);return!!t&&parseInt(t[1],10)}(e)>=40,o=e.indexOf("droid")>=0||e.indexOf("CriOS")>=0||/\b(iPad|iPhone|iPod)(?=;)/.test(e);return(t||r)&&!o}function s(){return window.u2f?Promise.resolve(window.u2f):o("undefined"!=typeof navigator?navigator.userAgent:"")||gon&&gon.test_env?Promise.resolve().then(r.t.bind(null,567,7)).then(function(){return window.u2f}):Promise.reject()}r.d(t,"a",function(){return s})},567:function(e,t,r){"use strict";(function(e){var t,r=r||{};r.EXTENSION_ID="kmendfapggjehodndflmmgagdbamhnfd",r.MessageTypes={U2F_REGISTER_REQUEST:"u2f_register_request",U2F_REGISTER_RESPONSE:"u2f_register_response",U2F_SIGN_REQUEST:"u2f_sign_request",U2F_SIGN_RESPONSE:"u2f_sign_response",U2F_GET_API_VERSION_REQUEST:"u2f_get_api_version_request",U2F_GET_API_VERSION_RESPONSE:"u2f_get_api_version_response"},r.ErrorCodes={OK:0,OTHER_ERROR:1,BAD_REQUEST:2,CONFIGURATION_UNSUPPORTED:3,DEVICE_INELIGIBLE:4,TIMEOUT:5},r.U2fRequest,r.U2fResponse,r.Error,r.Transport,r.Transports,r.SignRequest,r.SignResponse,r.RegisterRequest,r.RegisterResponse,r.RegisteredKey,r.GetJsApiVersionResponse,r.getMessagePort=function(e){if("undefined"!=typeof chrome&&chrome.runtime){var t={type:r.MessageTypes.U2F_SIGN_REQUEST,signRequests:[]};chrome.runtime.sendMessage(r.EXTENSION_ID,t,function(){chrome.runtime.lastError?r.getIframePort_(e):r.getChromeRuntimePort_(e)})}else r.isAndroidChrome_()?r.getAuthenticatorPort_(e):r.isIosChrome_()?r.getIosPort_(e):r.getIframePort_(e)},r.isAndroidChrome_=function(){var e=navigator.userAgent;return-1!=e.indexOf("Chrome")&&-1!=e.indexOf("Android")},r.isIosChrome_=function(){return e.inArray(navigator.platform,["iPhone","iPad","iPod"])>-1},r.getChromeRuntimePort_=function(e){var t=chrome.runtime.connect(r.EXTENSION_ID,{includeTlsChannelId:!0});setTimeout(function(){e(new r.WrappedChromeRuntimePort_(t))},0)},r.getAuthenticatorPort_=function(e){setTimeout(function(){e(new r.WrappedAuthenticatorPort_)},0)},r.getIosPort_=function(e){setTimeout(function(){e(new r.WrappedIosPort_)},0)},r.WrappedChromeRuntimePort_=function(e){this.port_=e},r.formatSignRequest_=function(e,n,o,s,i){if(void 0===t||t<1.1){for(var a=[],u=0;u<o.length;u++)a[u]={version:o[u].version,challenge:n,keyHandle:o[u].keyHandle,appId:e};return{type:r.MessageTypes.U2F_SIGN_REQUEST,signRequests:a,timeoutSeconds:s,requestId:i}}return{type:r.MessageTypes.U2F_SIGN_REQUEST,appId:e,challenge:n,registeredKeys:o,timeoutSeconds:s,requestId:i}},r.formatRegisterRequest_=function(e,n,o,s,i){if(void 0===t||t<1.1){for(var a=0;a<o.length;a++)o[a].appId=e;var u=[];for(a=0;a<n.length;a++)u[a]={version:n[a].version,challenge:o[0],keyHandle:n[a].keyHandle,appId:e};return{type:r.MessageTypes.U2F_REGISTER_REQUEST,signRequests:u,registerRequests:o,timeoutSeconds:s,requestId:i}}return{type:r.MessageTypes.U2F_REGISTER_REQUEST,appId:e,registerRequests:o,registeredKeys:n,timeoutSeconds:s,requestId:i}},r.WrappedChromeRuntimePort_.prototype.postMessage=function(e){this.port_.postMessage(e)},r.WrappedChromeRuntimePort_.prototype.addEventListener=function(e,t){var r=e.toLowerCase();"message"==r||"onmessage"==r?this.port_.onMessage.addListener(function(e){t({data:e})}):console.error("WrappedChromeRuntimePort only supports onMessage")},r.WrappedAuthenticatorPort_=function(){this.requestId_=-1,this.requestObject_=null},r.WrappedAuthenticatorPort_.prototype.postMessage=function(e){var t=r.WrappedAuthenticatorPort_.INTENT_URL_BASE_+";S.request="+encodeURIComponent(JSON.stringify(e))+";end";document.location=t},r.WrappedAuthenticatorPort_.prototype.getPortType=function(){return"WrappedAuthenticatorPort_"},r.WrappedAuthenticatorPort_.prototype.addEventListener=function(e,t){if("message"==e.toLowerCase()){window.addEventListener("message",this.onRequestUpdate_.bind(this,t),!1)}else console.error("WrappedAuthenticatorPort only supports message")},r.WrappedAuthenticatorPort_.prototype.onRequestUpdate_=function(e,t){var r=JSON.parse(t.data),n=(r.intentURL,r.errorCode,null);r.hasOwnProperty("data")&&(n=JSON.parse(r.data)),e({data:n})},r.WrappedAuthenticatorPort_.INTENT_URL_BASE_="intent:#Intent;action=com.google.android.apps.authenticator.AUTHENTICATE",r.WrappedIosPort_=function(){},r.WrappedIosPort_.prototype.postMessage=function(e){var t=JSON.stringify(e),r="u2f://auth?"+encodeURI(t);location.replace(r)},r.WrappedIosPort_.prototype.getPortType=function(){return"WrappedIosPort_"},r.WrappedIosPort_.prototype.addEventListener=function(e,t){"message"!==e.toLowerCase()&&console.error("WrappedIosPort only supports message")},r.getIframePort_=function(e){var t="chrome-extension://"+r.EXTENSION_ID,n=document.createElement("iframe");n.src=t+"/u2f-comms.html",n.setAttribute("style","display:none"),document.body.appendChild(n);var o=new MessageChannel,s=function(t){"ready"==t.data?(o.port1.removeEventListener("message",s),e(o.port1)):console.error('First event on iframe port was not "ready"')};o.port1.addEventListener("message",s),o.port1.start(),n.addEventListener("load",function(){n.contentWindow.postMessage("init",t,[o.port2])})},r.EXTENSION_TIMEOUT_SEC=30,r.port_=null,r.waitingForPort_=[],r.reqCounter_=0,r.callbackMap_={},r.getPortSingleton_=function(e){r.port_?e(r.port_):(0==r.waitingForPort_.length&&r.getMessagePort(function(e){for(r.port_=e,r.port_.addEventListener("message",r.responseHandler_);r.waitingForPort_.length;)r.waitingForPort_.shift()(r.port_)}),r.waitingForPort_.push(e))},r.responseHandler_=function(e){var t=e.data,n=t.requestId;if(n&&r.callbackMap_[n]){var o=r.callbackMap_[n];delete r.callbackMap_[n],o(t.responseData)}else console.error("Unknown or missing requestId in response.")},r.sign=function(e,n,o,s,i){void 0===t?r.getApiVersion(function(a){t=void 0===a.js_api_version?0:a.js_api_version,console.log("Extension JS API Version: ",t),r.sendSignRequest(e,n,o,s,i)}):r.sendSignRequest(e,n,o,s,i)},r.sendSignRequest=function(e,t,n,o,s){r.getPortSingleton_(function(i){var a=++r.reqCounter_;r.callbackMap_[a]=o;var u=void 0!==s?s:r.EXTENSION_TIMEOUT_SEC,c=r.formatSignRequest_(e,t,n,u,a);i.postMessage(c)})},r.register=function(e,n,o,s,i){void 0===t?r.getApiVersion(function(a){t=void 0===a.js_api_version?0:a.js_api_version,console.log("Extension JS API Version: ",t),r.sendRegisterRequest(e,n,o,s,i)}):r.sendRegisterRequest(e,n,o,s,i)},r.sendRegisterRequest=function(e,t,n,o,s){r.getPortSingleton_(function(i){var a=++r.reqCounter_;r.callbackMap_[a]=o;var u=void 0!==s?s:r.EXTENSION_TIMEOUT_SEC,c=r.formatRegisterRequest_(e,n,t,u,a);i.postMessage(c)})},r.getApiVersion=function(e,t){r.getPortSingleton_(function(n){if(n.getPortType){var o;switch(n.getPortType()){case"WrappedIosPort_":case"WrappedAuthenticatorPort_":o=1.1;break;default:o=0}e({js_api_version:o})}else{var s=++r.reqCounter_;r.callbackMap_[s]=e;var i={type:r.MessageTypes.U2F_GET_API_VERSION_REQUEST,timeoutSeconds:void 0!==t?t:r.EXTENSION_TIMEOUT_SEC,requestId:s};n.postMessage(i)}})},window.u2f||(window.u2f=r)}).call(this,r(0))}}]);
//# sourceMappingURL=commons~pages.ldap.omniauth_callbacks~pages.omniauth_callbacks~pages.sessions~pages.sessions.new.2a29bfd9.chunk.js.map