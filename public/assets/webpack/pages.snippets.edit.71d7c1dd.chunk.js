(this.webpackJsonp=this.webpackJsonp||[]).push([[91],{275:function(e,t,n){"use strict";var a=n(0),i=n.n(a);t.a=function(){var e=ace.edit("editor");i()(".snippet-form-holder form").on("submit",function(){i()(".snippet-file-content").val(e.getValue())})}},447:function(e,t,n){"use strict";var a=n(0),i=n.n(a),r=n(65),o=n(71);t.a=function(){new r.a(i()(".snippet-form"),{members:!1,issues:!1,mergeRequests:!1,epics:!1,milestones:!1,labels:!1}),new o.a}},65:function(e,t,n){"use strict";var a=n(0),i=n.n(a),r=n(50),o=n.n(r),s=n(53),l=n(24),u=n.n(l),d=n(3),c=n.n(d),f=(n(157),n(66)),v=n(5);function p(e){var t=e.find(".button-attach-file"),n=e.find(".attaching-file-message"),a=e.find(".button-cancel-uploading-files"),r=e.find(".retry-uploading-link"),o=e.find(".uploading-progress"),s=e.find(".uploading-error-container"),l=e.find(".uploading-error-message"),d=e.find(".uploading-progress-container"),p=window.uploads_path||null,h=gon.max_file_size||10,m=e.find(".js-gfm-input"),g=void 0,b=void 0,x=void 0,k=void 0,z=void 0,C=void 0,w=void 0;m.wrap('<div class="div-dropzone"></div>'),m.on("paste",function(e){return g(e)});var y=m.closest(".md-area");e.setupMarkdownPreview();var D=e.find(".div-dropzone");if(D.parent().addClass("div-dropzone-wrapper"),D.append('<div class="div-dropzone-hover"></div>'),D.find(".div-dropzone-hover").append('<i class="fa fa-paperclip div-dropzone-icon"></i>'),p){var j=D.dropzone({url:p,dictDefaultMessage:"",clickable:!0,paramName:"file",maxFilesize:h,uploadMultiple:!1,headers:f.a.headers,previewContainer:!1,processing:function(){return i()(".div-dropzone-alert").alert("close")},dragover:function(){y.addClass("is-dropzone-hover"),e.find(".div-dropzone-hover").css("opacity",.7)},dragleave:function(){y.removeClass("is-dropzone-hover"),e.find(".div-dropzone-hover").css("opacity",0)},drop:function(){y.removeClass("is-dropzone-hover"),e.find(".div-dropzone-hover").css("opacity",0),m.focus()},success:function(e,n){var a=this.getQueuedFiles().length+this.getUploadingFiles().length,i=a>=1;b(n.link.markdown,i),a||t.removeClass("hide"),x(n.link.url)},error:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Attaching the file failed.",i=arguments[2],r=i?i.responseText:n;s.removeClass("hide"),l.html(r),t.addClass("hide"),a.addClass("hide")},totaluploadprogress:function(e){k(this.files,n),o.text(Math.round(e)+"%")},sending:function(){t.addClass("hide"),s.addClass("hide"),d.removeClass("hide"),a.removeClass("hide")},removedfile:function(){t.removeClass("hide"),a.addClass("hide"),d.addClass("hide"),s.addClass("hide")},queuecomplete:function(){i()(".dz-preview").remove(),i()(".markdown-area").trigger("input"),d.addClass("hide"),a.addClass("hide")}}),E=i()(j[0]).children("textarea");a.on("click",function(e){e.preventDefault(),e.stopPropagation(),u.a.forElement(D.get(0)).removeAllFiles(!0)}),r.on("click",function(e){var t=u.a.forElement(e.target.closest(".js-main-target-form").querySelector(".div-dropzone")),n=t.files;e.preventDefault(),t.removeAllFiles(!0),n.map(function(e){var n=e;return n.status===u.a.ERROR&&(n.status=void 0,n.accepted=void 0),t.addFile(n)})}),g=function(e){var t=e.originalEvent;if(t.clipboardData&&t.clipboardData.items){var n=z(t);if(n){e.preventDefault();var a=C(t)||"image.png";return b("{{"+a+"}}"),w(n.getAsFile(),a)}}},z=function(e){for(var t=0;t<e.clipboardData.items.length;){var n=e.clipboardData.items[t];if(-1!==n.type.indexOf("image"))return n;t+=1}return!1},b=function(e,t){var n=e;t&&(n+="\n\n");var a=E.get(0),r=a.selectionStart,o=a.selectionEnd,s=i()(E).val().length,l=i()(E).val().substring(0,r),u=i()(E).val().substring(o,s);return i()(E).val(l+n+u),a.setSelectionRange(r+n.length,o+n.length),a.style.height=a.scrollHeight+"px",m.get(0).dispatchEvent(new Event("input")),m.trigger("input")},x=function(t){i()(e).append('<input type="hidden" name="files[]" value="'+c.a.escape(t)+'">')},C=function(e){var t=void 0;return window.clipboardData&&window.clipboardData.getData?t=window.clipboardData.getData("Text"):e.clipboardData&&e.clipboardData.getData&&(t=e.clipboardData.getData("text/plain")),(t=t.split("\r"))[0]};var _=function(){return d.addClass("hide")};w=function(t,n){var a=new FormData;a.append("file",t,n),d.removeClass("hide"),e.find(".div-dropzone-alert").alert("close"),v.a.post(p,a).then(function(e){var t=e.data.link.markdown;!function(e,t){var n=i()(E);n.val(function(n,a){return a.replace("{{"+e+"}}",t)}),n.trigger("change")}(n,t),_()}).catch(function(e){var t;t=e.response.data.message,s.removeClass("hide"),l.html(t),_()})},k=function(e,t){var n=void 0,a=e.filter(function(e){return"uploading"===e.status||"queued"===e.status}).length;n=a>1?"Attaching "+a+" files -":"Attaching a file -",t.text(n)},e.find(".markdown-selector").click(function(e){e.preventDefault(),i()(this).closest(".gfm-form").find(".div-dropzone").click(),m.focus()})}else D.addClass("js-invalid-dropzone")}u.a.autoDiscover=!1;var h=n(11);function m(e,t,n,a){var r,o,s;return e=(r=i()(e)).get(0),o=function(e,t){return e.substring(t.selectionStart,t.selectionEnd)}(s=r.val(),e),r.focus(),function(e,t,n,a,i,r){var o,s,l,u,d,c,f;return u=!1,d=!1,c=!1,0===i.indexOf("\n")&&(d=!0,i=i.replace(/\n+/,"")),e.selectionEnd-e.selectionStart>i.replace(/\n$/,"").length&&(u=!0,i=i.replace(/\n$/,"")),s=i.split("\n"),r||(f=e.value.substr(0,e.selectionStart).lastIndexOf("\n"),/^\s*$/.test(e.value.substring(f,e.selectionStart))&&(c=!0)),l=!r&&!c&&e.selectionStart>0?"\n":"",o=s.length>1&&(!r||null!=a&&""!==a)?null!=a&&""!==a?function(e,t,n,a){var i=function(e,t){var n;return(n=e.substring(0,t.selectionStart).trim().split("\n"))[n.length-1]}(e,t),r=function(e,t){return e.substring(t.selectionEnd).trim().split("\n")[0]}(e,t);return i===n&&r===n?(null!=n&&(t.selectionStart=t.selectionStart-(n.length+1),t.selectionEnd=t.selectionEnd+(n.length+1)),a):n+"\n"+a+"\n"+n}(t,e,a,i):s.map(function(e){return 0===e.indexOf(n)?""+e.replace(n,""):""+n+e}).join("\n"):""+l+n+i+(r?n:" "),d&&(o="\n"+o),u&&(o+="\n"),Object(h.p)(e,o),function(e,t,n,a){var i;if(e.setSelectionRange)return e.selectionStart===e.selectionEnd?(i=n?e.selectionStart-t.length:e.selectionStart,a&&(i-=1),e.setSelectionRange(i,i)):void 0}(e,n,r,u)}(e,s,t,n,o,a)}var g=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();var b=function(){function e(t){var n=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.form=t,this.textarea=this.form.find("textarea.js-gfm-input"),this.enableGFM=Object.assign({},s.b,a);var i=gl.GfmAutoComplete&&gl.GfmAutoComplete.dataSources||{};Object.keys(this.enableGFM).forEach(function(e){"emojis"!==e&&(n.enableGFM[e]=!!i[e])}),this.destroy(),this.setupForm(),this.form.data("glForm",this)}return g(e,[{key:"destroy",value:function(){this.clearEventListeners(),this.autoComplete&&this.autoComplete.destroy(),this.form.data("glForm",null)}},{key:"setupForm",value:function(){var e,t=this.form.is(":not(.gfm-form)");this.form.removeClass("js-new-note-form"),t&&(this.form.find(".div-dropzone").remove(),this.form.addClass("gfm-form"),gl.utils.disableButtonIfEmptyField(this.form.find(".js-note-text"),this.form.find(".js-comment-button, .js-note-new-discussion")),this.autoComplete=new s.a(gl.GfmAutoComplete&&gl.GfmAutoComplete.dataSources),this.autoComplete.setup(this.form.find(".js-gfm-input"),this.enableGFM),p(this.form),o()(this.textarea)),this.addEventListeners(),e=this.form,i()(".js-md",e).off("click").on("click",function(){var e=i()(this);return m(e.closest(".md-area").find("textarea"),e.data("mdTag"),e.data("mdBlock"),!e.data("mdPrepend"))}),this.form.find(".js-note-discard").hide(),this.form.show(),this.isAutosizeable&&this.setupAutosize()}},{key:"setupAutosize",value:function(){var e=this;this.textarea.off("autosize:resized").on("autosize:resized",this.setHeightData.bind(this)),this.textarea.off("mouseup.autosize").on("mouseup.autosize",this.destroyAutosize.bind(this)),setTimeout(function(){o()(e.textarea),e.textarea.css("resize","vertical")},0)}},{key:"setHeightData",value:function(){this.textarea.data("height",this.textarea.outerHeight())}},{key:"destroyAutosize",value:function(){var e=this.textarea.outerHeight();this.textarea.data("height")!==e&&(o.a.destroy(this.textarea),this.textarea.data("height",e),this.textarea.outerHeight(e),this.textarea.css("max-height",window.outerHeight))}},{key:"clearEventListeners",value:function(){var e;this.textarea.off("focus"),this.textarea.off("blur"),e=this.form,i()(".js-md",e).off("click")}},{key:"addEventListeners",value:function(){this.textarea.on("focus",function(){i()(this).closest(".md-area").addClass("is-focused")}),this.textarea.on("blur",function(){i()(this).closest(".md-area").removeClass("is-focused")})}}]),e}();t.a=b},71:function(e,t,n){"use strict";var a=n(0),i=n.n(a),r=(n(158),n(24)),o=n.n(r),s=n(29),l=n.n(s),u=(n(99),function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}());o.a.autoDiscover=!1;var d=function(){function e(){var t;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.active_backdrop=null,this.active_textarea=null,i()(document).on("click",".js-zen-enter",function(e){return e.preventDefault(),i()(e.currentTarget).trigger("zen_mode:enter")}),i()(document).on("click",".js-zen-leave",function(e){return e.preventDefault(),i()(e.currentTarget).trigger("zen_mode:leave")}),i()(document).on("zen_mode:enter",(t=this,function(e){return t.enter(i()(e.target).closest(".md-area").find(".zen-backdrop"))})),i()(document).on("zen_mode:leave",function(e){return function(t){return e.exit()}}(this)),i()(document).on("keydown",function(e){if(27===e.keyCode)return e.preventDefault(),i()(document).trigger("zen_mode:leave")})}return u(e,[{key:"enter",value:function(e){l.a.pause(),this.active_backdrop=i()(e),this.active_backdrop.addClass("fullscreen"),this.active_textarea=this.active_backdrop.find("textarea"),this.active_textarea.removeAttr("style"),this.active_textarea.focus()}},{key:"exit",value:function(){if(this.active_textarea){l.a.unpause(),this.active_textarea.closest(".zen-backdrop").removeClass("fullscreen"),this.scrollTo(this.active_textarea),this.active_textarea=null,this.active_backdrop=null;var e=i()(".div-dropzone");e&&!e.hasClass("js-invalid-dropzone")&&o.a.forElement(".div-dropzone").enable()}}},{key:"scrollTo",value:function(e){return i.a.scrollTo(e,0,{offset:-150})}}]),e}();t.a=d},893:function(e,t,n){"use strict";n.r(t);var a=n(275),i=n(447);document.addEventListener("DOMContentLoaded",function(){Object(a.a)(),Object(i.a)()})},894:function(e,t,n){n(31),e.exports=n(893)},99:function(e,t){Mousetrap=function(e){var t=e,n=t.stopCallback,a=!0;return t.stopCallback=function(e,t,i){return!a||n(e,t,i)},t.pause=function(){a=!1},t.unpause=function(){a=!0},t}(Mousetrap)}},[[894,0,1,3]]]);
//# sourceMappingURL=pages.snippets.edit.71d7c1dd.chunk.js.map