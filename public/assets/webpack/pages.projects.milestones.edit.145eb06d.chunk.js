(this.webpackJsonp=this.webpackJsonp||[]).push([[127,4],{103:function(e,t,n){"use strict";var a=n(0),i=n.n(a),s=n(73),o=n.n(s),r=n(111),l=n.n(r),d=n(1),u=n(5),c=n(38),h=n(36),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();function p(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var v=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.$dropdown,a=t.$loading;p(this,e);var s=n.closest(".dropdown"),o=n.closest(".block");this.$loading=a,this.$dropdown=n,this.$dropdownParent=s,this.$datePicker=s.find(".js-due-date-calendar"),this.$block=o,this.$sidebarCollapsedValue=o.find(".sidebar-collapsed-icon"),this.$selectbox=n.closest(".selectbox"),this.$value=o.find(".value"),this.$valueContent=o.find(".value-content"),this.$sidebarValue=i()(".js-due-date-sidebar-value",o),this.fieldName=n.data("fieldName"),this.abilityName=n.data("abilityName"),this.issueUpdateURL=n.data("issueUpdate"),this.rawSelectedDate=null,this.displayedDate=null,this.datePayload=null,this.initGlDropdown(),this.initRemoveDueDate(),this.initDatePicker()}return f(e,[{key:"initGlDropdown",value:function(){var e=this;this.$dropdown.glDropdown({opened:function(){e.$datePicker.data("pikaday").show()},hidden:function(){e.$selectbox.hide(),e.$value.css("display","")}})}},{key:"initDatePicker",value:function(){var e=this,t=i()("input[name='"+this.fieldName+"']"),n=new o.a({field:t.get(0),theme:"gitlab-theme",format:"yyyy-mm-dd",parse:function(e){return Object(h.a)(e)},toString:function(e){return Object(h.b)(e)},onSelect:function(a){t.val(n.toString(a)),e.$dropdown.hasClass("js-issue-boards-due-date")?(gl.issueBoards.BoardsStore.detail.issue.dueDate=t.val(),e.updateIssueBoardIssue()):e.saveDueDate(!0)}});n.setDate(Object(h.a)(t.val())),this.$datePicker.append(n.el),this.$datePicker.data("pikaday",n)}},{key:"initRemoveDueDate",value:function(){var e=this;this.$block.on("click",".js-remove-due-date",function(t){var n=e.$datePicker.data("pikaday");t.preventDefault(),n.setDate(null),e.$dropdown.hasClass("js-issue-boards-due-date")?(gl.issueBoards.BoardsStore.detail.issue.dueDate="",e.updateIssueBoardIssue()):(i()("input[name='"+e.fieldName+"']").val(""),e.saveDueDate(!1))})}},{key:"saveDueDate",value:function(e){this.parseSelectedDate(),this.prepSelectedDate(),this.submitSelectedDate(e)}},{key:"parseSelectedDate",value:function(){if(this.rawSelectedDate=i()("input[name='"+this.fieldName+"']").val(),this.rawSelectedDate.length){var e=this.rawSelectedDate.split("-").map(function(e){return parseInt(e,10)}),t=new Date(e[0],e[1]-1,e[2]);this.displayedDate=l()(t,"mmm d, yyyy")}else this.displayedDate="No due date"}},{key:"prepSelectedDate",value:function(){var e={};e[this.abilityName]={},e[this.abilityName].due_date=this.rawSelectedDate,this.datePayload=e}},{key:"updateIssueBoardIssue",value:function(){var e=this;this.$loading.fadeIn(),this.$dropdown.trigger("loading.gl.dropdown"),this.$selectbox.hide(),this.$value.css("display","");var t=function(){e.$loading.fadeOut()};gl.issueBoards.BoardsStore.detail.issue.update(this.$dropdown.attr("data-issue-update")).then(t).catch(t)}},{key:"submitSelectedDate",value:function(e){var t=this,n=this.datePayload[this.abilityName].due_date,a="No due date"!==this.displayedDate,s=a?"bold":"no-value";return this.$loading.removeClass("hidden").fadeIn(),e&&(this.$dropdown.trigger("loading.gl.dropdown"),this.$selectbox.hide()),this.$value.css("display",""),this.$valueContent.html("<span class='"+s+"'>"+this.displayedDate+"</span>"),this.$sidebarValue.html(this.displayedDate),i()(".js-remove-due-date-holder").toggleClass("hidden",n.length),u.a.put(this.issueUpdateURL,this.datePayload).then(function(){var i=a?Object(d.a)("Due date")+"<br />"+n+" ("+Object(c.f)(n)+")":Object(d.a)("Due date");return e&&(t.$dropdown.trigger("loaded.gl.dropdown"),t.$dropdown.dropdown("toggle")),t.$sidebarCollapsedValue.attr("data-original-title",i),t.$loading.fadeOut()})}}]),e}(),m=function(){function e(){p(this,e),this.initMilestoneDatePicker(),this.initIssuableSelect()}return f(e,[{key:"initMilestoneDatePicker",value:function(){i()(".datepicker").each(function(){var e=i()(this),t=e.val(),n=new o.a({field:e.get(0),theme:"gitlab-theme animate-picker",format:"yyyy-mm-dd",container:e.parent().get(0),parse:function(e){return Object(h.a)(e)},toString:function(e){return Object(h.b)(e)},onSelect:function(t){e.val(n.toString(t))}});n.setDate(Object(h.a)(t)),e.data("pikaday",n)}),i()(".js-clear-due-date,.js-clear-start-date").on("click",function(e){e.preventDefault(),i()(e.target).siblings(".datepicker").data("pikaday").setDate(null)})}},{key:"initIssuableSelect",value:function(){var e=i()(".js-issuable-update .due_date").find(".block-loading").hide();i()(".js-due-date-select").each(function(t,n){var a=i()(n);new v({$dropdown:a,$loading:e})})}}]),e}();t.a=m},285:function(e,t,n){"use strict";var a=n(0),i=n.n(a),s=n(71),o=n(103),r=n(65);t.a=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];new s.a,new o.a,new r.a(i()(".milestone-form"),{emojis:!0,members:e,issues:e,mergeRequests:e,epics:e,milestones:e,labels:e})}},36:function(e,t,n){"use strict";n.d(t,"a",function(){return i}),n.d(t,"b",function(){return s});var a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return("0"+e).slice(-t)},i=function(e){var t=e.split("-"),n=parseInt(t[0],10),a=parseInt(t[1]-1,10),i=parseInt(t[2],10);return new Date(n,a,i)},s=function(e){var t=a(e.getDate()),n=a(e.getMonth()+1);return e.getFullYear()+"-"+n+"-"+t}},65:function(e,t,n){"use strict";var a=n(0),i=n.n(a),s=n(50),o=n.n(s),r=n(53),l=n(24),d=n.n(l),u=n(3),c=n.n(u),h=(n(157),n(66)),f=n(5);function p(e){var t=e.find(".button-attach-file"),n=e.find(".attaching-file-message"),a=e.find(".button-cancel-uploading-files"),s=e.find(".retry-uploading-link"),o=e.find(".uploading-progress"),r=e.find(".uploading-error-container"),l=e.find(".uploading-error-message"),u=e.find(".uploading-progress-container"),p=window.uploads_path||null,v=gon.max_file_size||10,m=e.find(".js-gfm-input"),g=void 0,b=void 0,y=void 0,D=void 0,w=void 0,k=void 0,_=void 0;m.wrap('<div class="div-dropzone"></div>'),m.on("paste",function(e){return g(e)});var x=m.closest(".md-area");e.setupMarkdownPreview();var M=e.find(".div-dropzone");if(M.parent().addClass("div-dropzone-wrapper"),M.append('<div class="div-dropzone-hover"></div>'),M.find(".div-dropzone-hover").append('<i class="fa fa-paperclip div-dropzone-icon"></i>'),p){var C=M.dropzone({url:p,dictDefaultMessage:"",clickable:!0,paramName:"file",maxFilesize:v,uploadMultiple:!1,headers:h.a.headers,previewContainer:!1,processing:function(){return i()(".div-dropzone-alert").alert("close")},dragover:function(){x.addClass("is-dropzone-hover"),e.find(".div-dropzone-hover").css("opacity",.7)},dragleave:function(){x.removeClass("is-dropzone-hover"),e.find(".div-dropzone-hover").css("opacity",0)},drop:function(){x.removeClass("is-dropzone-hover"),e.find(".div-dropzone-hover").css("opacity",0),m.focus()},success:function(e,n){var a=this.getQueuedFiles().length+this.getUploadingFiles().length,i=a>=1;b(n.link.markdown,i),a||t.removeClass("hide"),y(n.link.url)},error:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Attaching the file failed.",i=arguments[2],s=i?i.responseText:n;r.removeClass("hide"),l.html(s),t.addClass("hide"),a.addClass("hide")},totaluploadprogress:function(e){D(this.files,n),o.text(Math.round(e)+"%")},sending:function(){t.addClass("hide"),r.addClass("hide"),u.removeClass("hide"),a.removeClass("hide")},removedfile:function(){t.removeClass("hide"),a.addClass("hide"),u.addClass("hide"),r.addClass("hide")},queuecomplete:function(){i()(".dz-preview").remove(),i()(".markdown-area").trigger("input"),u.addClass("hide"),a.addClass("hide")}}),S=i()(C[0]).children("textarea");a.on("click",function(e){e.preventDefault(),e.stopPropagation(),d.a.forElement(M.get(0)).removeAllFiles(!0)}),s.on("click",function(e){var t=d.a.forElement(e.target.closest(".js-main-target-form").querySelector(".div-dropzone")),n=t.files;e.preventDefault(),t.removeAllFiles(!0),n.map(function(e){var n=e;return n.status===d.a.ERROR&&(n.status=void 0,n.accepted=void 0),t.addFile(n)})}),g=function(e){var t=e.originalEvent;if(t.clipboardData&&t.clipboardData.items){var n=w(t);if(n){e.preventDefault();var a=k(t)||"image.png";return b("{{"+a+"}}"),_(n.getAsFile(),a)}}},w=function(e){for(var t=0;t<e.clipboardData.items.length;){var n=e.clipboardData.items[t];if(-1!==n.type.indexOf("image"))return n;t+=1}return!1},b=function(e,t){var n=e;t&&(n+="\n\n");var a=S.get(0),s=a.selectionStart,o=a.selectionEnd,r=i()(S).val().length,l=i()(S).val().substring(0,s),d=i()(S).val().substring(o,r);return i()(S).val(l+n+d),a.setSelectionRange(s+n.length,o+n.length),a.style.height=a.scrollHeight+"px",m.get(0).dispatchEvent(new Event("input")),m.trigger("input")},y=function(t){i()(e).append('<input type="hidden" name="files[]" value="'+c.a.escape(t)+'">')},k=function(e){var t=void 0;return window.clipboardData&&window.clipboardData.getData?t=window.clipboardData.getData("Text"):e.clipboardData&&e.clipboardData.getData&&(t=e.clipboardData.getData("text/plain")),(t=t.split("\r"))[0]};var j=function(){return u.addClass("hide")};_=function(t,n){var a=new FormData;a.append("file",t,n),u.removeClass("hide"),e.find(".div-dropzone-alert").alert("close"),f.a.post(p,a).then(function(e){var t=e.data.link.markdown;!function(e,t){var n=i()(S);n.val(function(n,a){return a.replace("{{"+e+"}}",t)}),n.trigger("change")}(n,t),j()}).catch(function(e){var t;t=e.response.data.message,r.removeClass("hide"),l.html(t),j()})},D=function(e,t){var n=void 0,a=e.filter(function(e){return"uploading"===e.status||"queued"===e.status}).length;n=a>1?"Attaching "+a+" files -":"Attaching a file -",t.text(n)},e.find(".markdown-selector").click(function(e){e.preventDefault(),i()(this).closest(".gfm-form").find(".div-dropzone").click(),m.focus()})}else M.addClass("js-invalid-dropzone")}d.a.autoDiscover=!1;var v=n(11);function m(e,t,n,a){var s,o,r;return e=(s=i()(e)).get(0),o=function(e,t){return e.substring(t.selectionStart,t.selectionEnd)}(r=s.val(),e),s.focus(),function(e,t,n,a,i,s){var o,r,l,d,u,c,h;return d=!1,u=!1,c=!1,0===i.indexOf("\n")&&(u=!0,i=i.replace(/\n+/,"")),e.selectionEnd-e.selectionStart>i.replace(/\n$/,"").length&&(d=!0,i=i.replace(/\n$/,"")),r=i.split("\n"),s||(h=e.value.substr(0,e.selectionStart).lastIndexOf("\n"),/^\s*$/.test(e.value.substring(h,e.selectionStart))&&(c=!0)),l=!s&&!c&&e.selectionStart>0?"\n":"",o=r.length>1&&(!s||null!=a&&""!==a)?null!=a&&""!==a?function(e,t,n,a){var i=function(e,t){var n;return(n=e.substring(0,t.selectionStart).trim().split("\n"))[n.length-1]}(e,t),s=function(e,t){return e.substring(t.selectionEnd).trim().split("\n")[0]}(e,t);return i===n&&s===n?(null!=n&&(t.selectionStart=t.selectionStart-(n.length+1),t.selectionEnd=t.selectionEnd+(n.length+1)),a):n+"\n"+a+"\n"+n}(t,e,a,i):r.map(function(e){return 0===e.indexOf(n)?""+e.replace(n,""):""+n+e}).join("\n"):""+l+n+i+(s?n:" "),u&&(o="\n"+o),d&&(o+="\n"),Object(v.p)(e,o),function(e,t,n,a){var i;if(e.setSelectionRange)return e.selectionStart===e.selectionEnd?(i=n?e.selectionStart-t.length:e.selectionStart,a&&(i-=1),e.setSelectionRange(i,i)):void 0}(e,n,s,d)}(e,r,t,n,o,a)}var g=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();var b=function(){function e(t){var n=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.form=t,this.textarea=this.form.find("textarea.js-gfm-input"),this.enableGFM=Object.assign({},r.b,a);var i=gl.GfmAutoComplete&&gl.GfmAutoComplete.dataSources||{};Object.keys(this.enableGFM).forEach(function(e){"emojis"!==e&&(n.enableGFM[e]=!!i[e])}),this.destroy(),this.setupForm(),this.form.data("glForm",this)}return g(e,[{key:"destroy",value:function(){this.clearEventListeners(),this.autoComplete&&this.autoComplete.destroy(),this.form.data("glForm",null)}},{key:"setupForm",value:function(){var e,t=this.form.is(":not(.gfm-form)");this.form.removeClass("js-new-note-form"),t&&(this.form.find(".div-dropzone").remove(),this.form.addClass("gfm-form"),gl.utils.disableButtonIfEmptyField(this.form.find(".js-note-text"),this.form.find(".js-comment-button, .js-note-new-discussion")),this.autoComplete=new r.a(gl.GfmAutoComplete&&gl.GfmAutoComplete.dataSources),this.autoComplete.setup(this.form.find(".js-gfm-input"),this.enableGFM),p(this.form),o()(this.textarea)),this.addEventListeners(),e=this.form,i()(".js-md",e).off("click").on("click",function(){var e=i()(this);return m(e.closest(".md-area").find("textarea"),e.data("mdTag"),e.data("mdBlock"),!e.data("mdPrepend"))}),this.form.find(".js-note-discard").hide(),this.form.show(),this.isAutosizeable&&this.setupAutosize()}},{key:"setupAutosize",value:function(){var e=this;this.textarea.off("autosize:resized").on("autosize:resized",this.setHeightData.bind(this)),this.textarea.off("mouseup.autosize").on("mouseup.autosize",this.destroyAutosize.bind(this)),setTimeout(function(){o()(e.textarea),e.textarea.css("resize","vertical")},0)}},{key:"setHeightData",value:function(){this.textarea.data("height",this.textarea.outerHeight())}},{key:"destroyAutosize",value:function(){var e=this.textarea.outerHeight();this.textarea.data("height")!==e&&(o.a.destroy(this.textarea),this.textarea.data("height",e),this.textarea.outerHeight(e),this.textarea.css("max-height",window.outerHeight))}},{key:"clearEventListeners",value:function(){var e;this.textarea.off("focus"),this.textarea.off("blur"),e=this.form,i()(".js-md",e).off("click")}},{key:"addEventListeners",value:function(){this.textarea.on("focus",function(){i()(this).closest(".md-area").addClass("is-focused")}),this.textarea.on("blur",function(){i()(this).closest(".md-area").removeClass("is-focused")})}}]),e}();t.a=b},71:function(e,t,n){"use strict";var a=n(0),i=n.n(a),s=(n(158),n(24)),o=n.n(s),r=n(29),l=n.n(r),d=(n(99),function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}());o.a.autoDiscover=!1;var u=function(){function e(){var t;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.active_backdrop=null,this.active_textarea=null,i()(document).on("click",".js-zen-enter",function(e){return e.preventDefault(),i()(e.currentTarget).trigger("zen_mode:enter")}),i()(document).on("click",".js-zen-leave",function(e){return e.preventDefault(),i()(e.currentTarget).trigger("zen_mode:leave")}),i()(document).on("zen_mode:enter",(t=this,function(e){return t.enter(i()(e.target).closest(".md-area").find(".zen-backdrop"))})),i()(document).on("zen_mode:leave",function(e){return function(t){return e.exit()}}(this)),i()(document).on("keydown",function(e){if(27===e.keyCode)return e.preventDefault(),i()(document).trigger("zen_mode:leave")})}return d(e,[{key:"enter",value:function(e){l.a.pause(),this.active_backdrop=i()(e),this.active_backdrop.addClass("fullscreen"),this.active_textarea=this.active_backdrop.find("textarea"),this.active_textarea.removeAttr("style"),this.active_textarea.focus()}},{key:"exit",value:function(){if(this.active_textarea){l.a.unpause(),this.active_textarea.closest(".zen-backdrop").removeClass("fullscreen"),this.scrollTo(this.active_textarea),this.active_textarea=null,this.active_backdrop=null;var e=i()(".div-dropzone");e&&!e.hasClass("js-invalid-dropzone")&&o.a.forElement(".div-dropzone").enable()}}},{key:"scrollTo",value:function(e){return i.a.scrollTo(e,0,{offset:-150})}}]),e}();t.a=u},73:function(e,t,n){
/*!
 * Pikaday
 *
 * Copyright © 2014 David Bushell | BSD & MIT license | https://github.com/dbushell/Pikaday
 */
!function(t,a){"use strict";var i;try{i=n(!function(){var e=new Error("Cannot find module 'moment'");throw e.code="MODULE_NOT_FOUND",e}())}catch(e){}e.exports=function(e){var t="function"==typeof e,n=!!window.addEventListener,a=window.document,i=window.setTimeout,s=function(e,t,a,i){n?e.addEventListener(t,a,!!i):e.attachEvent("on"+t,a)},o=function(e,t,a,i){n?e.removeEventListener(t,a,!!i):e.detachEvent("on"+t,a)},r=function(e,t){return-1!==(" "+e.className+" ").indexOf(" "+t+" ")},l=function(e){return/Array/.test(Object.prototype.toString.call(e))},d=function(e){return/Date/.test(Object.prototype.toString.call(e))&&!isNaN(e.getTime())},u=function(e){var t=e.getDay();return 0===t||6===t},c=function(e,t){return[31,function(e){return e%4==0&&e%100!=0||e%400==0}(e)?29:28,31,30,31,30,31,31,30,31,30,31][t]},h=function(e){d(e)&&e.setHours(0,0,0,0)},f=function(e,t){return e.getTime()===t.getTime()},p=function(e,t,n){var a,i;for(a in t)(i=void 0!==e[a])&&"object"==typeof t[a]&&null!==t[a]&&void 0===t[a].nodeName?d(t[a])?n&&(e[a]=new Date(t[a].getTime())):l(t[a])?n&&(e[a]=t[a].slice(0)):e[a]=p({},t[a],n):!n&&i||(e[a]=t[a]);return e},v=function(e,t,n){var i;a.createEvent?((i=a.createEvent("HTMLEvents")).initEvent(t,!0,!1),i=p(i,n),e.dispatchEvent(i)):a.createEventObject&&(i=a.createEventObject(),i=p(i,n),e.fireEvent("on"+t,i))},m=function(e){return e.month<0&&(e.year-=Math.ceil(Math.abs(e.month)/12),e.month+=12),e.month>11&&(e.year+=Math.floor(Math.abs(e.month)/12),e.month-=12),e},g={field:null,bound:void 0,position:"bottom left",reposition:!0,format:"YYYY-MM-DD",toString:null,parse:null,defaultDate:null,setDefaultDate:!1,firstDay:0,formatStrict:!1,minDate:null,maxDate:null,yearRange:10,showWeekNumber:!1,pickWholeWeek:!1,minYear:0,maxYear:9999,minMonth:void 0,maxMonth:void 0,startRange:null,endRange:null,isRTL:!1,yearSuffix:"",showMonthAfterYear:!1,showDaysInNextAndPreviousMonths:!1,enableSelectionDaysInNextAndPreviousMonths:!1,numberOfMonths:1,mainCalendar:"left",container:void 0,blurFieldOnSelect:!0,i18n:{previousMonth:"Previous Month",nextMonth:"Next Month",months:["January","February","March","April","May","June","July","August","September","October","November","December"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},theme:null,events:[],onSelect:null,onOpen:null,onClose:null,onDraw:null},b=function(e,t,n){for(t+=e.firstDay;t>=7;)t-=7;return n?e.i18n.weekdaysShort[t]:e.i18n.weekdays[t]},y=function(e){var t=[],n="false";if(e.isEmpty){if(!e.showDaysInNextAndPreviousMonths)return'<td class="is-empty"></td>';t.push("is-outside-current-month"),e.enableSelectionDaysInNextAndPreviousMonths||t.push("is-selection-disabled")}return e.isDisabled&&t.push("is-disabled"),e.isToday&&t.push("is-today"),e.isSelected&&(t.push("is-selected"),n="true"),e.hasEvent&&t.push("has-event"),e.isInRange&&t.push("is-inrange"),e.isStartRange&&t.push("is-startrange"),e.isEndRange&&t.push("is-endrange"),'<td data-day="'+e.day+'" class="'+t.join(" ")+'" aria-selected="'+n+'"><button class="pika-button pika-day" type="button" data-pika-year="'+e.year+'" data-pika-month="'+e.month+'" data-pika-day="'+e.day+'">'+e.day+"</button></td>"},D=function(e,t,n,a){return'<tr class="pika-row'+(n?" pick-whole-week":"")+(a?" is-selected":"")+'">'+(t?e.reverse():e).join("")+"</tr>"},w=function(e,t,n,a,i,s){var o,r,d,u,c,h=e._o,f=n===h.minYear,p=n===h.maxYear,v='<div id="'+s+'" class="pika-title" role="heading" aria-live="assertive">',m=!0,g=!0;for(d=[],o=0;o<12;o++)d.push('<option value="'+(n===i?o-t:12+o-t)+'"'+(o===a?' selected="selected"':"")+(f&&o<h.minMonth||p&&o>h.maxMonth?'disabled="disabled"':"")+">"+h.i18n.months[o]+"</option>");for(u='<div class="pika-label">'+h.i18n.months[a]+'<select class="pika-select pika-select-month" tabindex="-1">'+d.join("")+"</select></div>",l(h.yearRange)?(o=h.yearRange[0],r=h.yearRange[1]+1):(o=n-h.yearRange,r=1+n+h.yearRange),d=[];o<r&&o<=h.maxYear;o++)o>=h.minYear&&d.push('<option value="'+o+'"'+(o===n?' selected="selected"':"")+">"+o+"</option>");return c='<div class="pika-label">'+n+h.yearSuffix+'<select class="pika-select pika-select-year" tabindex="-1">'+d.join("")+"</select></div>",h.showMonthAfterYear?v+=c+u:v+=u+c,f&&(0===a||h.minMonth>=a)&&(m=!1),p&&(11===a||h.maxMonth<=a)&&(g=!1),0===t&&(v+='<button class="pika-prev'+(m?"":" is-disabled")+'" type="button">'+h.i18n.previousMonth+"</button>"),t===e._o.numberOfMonths-1&&(v+='<button class="pika-next'+(g?"":" is-disabled")+'" type="button">'+h.i18n.nextMonth+"</button>"),v+="</div>"},k=function(o){var l=this,u=l.config(o);l._onMouseDown=function(e){if(l._v){var t=(e=e||window.event).target||e.srcElement;if(t)if(r(t,"is-disabled")||(!r(t,"pika-button")||r(t,"is-empty")||r(t.parentNode,"is-disabled")?r(t,"pika-prev")?l.prevMonth():r(t,"pika-next")&&l.nextMonth():(l.setDate(new Date(t.getAttribute("data-pika-year"),t.getAttribute("data-pika-month"),t.getAttribute("data-pika-day"))),u.bound&&i(function(){l.hide(),u.blurFieldOnSelect&&u.field&&u.field.blur()},100))),r(t,"pika-select"))l._c=!0;else{if(!e.preventDefault)return e.returnValue=!1,!1;e.preventDefault()}}},l._onChange=function(e){var t=(e=e||window.event).target||e.srcElement;t&&(r(t,"pika-select-month")?l.gotoMonth(t.value):r(t,"pika-select-year")&&l.gotoYear(t.value))},l._onKeyChange=function(e){if(e=e||window.event,l.isVisible())switch(e.keyCode){case 13:case 27:u.field&&u.field.blur();break;case 37:e.preventDefault(),l.adjustDate("subtract",1);break;case 38:l.adjustDate("subtract",7);break;case 39:l.adjustDate("add",1);break;case 40:l.adjustDate("add",7)}},l._onInputChange=function(n){var a;n.firedBy!==l&&(a=u.parse?u.parse(u.field.value,u.format):t?(a=e(u.field.value,u.format,u.formatStrict))&&a.isValid()?a.toDate():null:new Date(Date.parse(u.field.value)),d(a)&&l.setDate(a),l._v||l.show())},l._onInputFocus=function(){l.show()},l._onInputClick=function(){l.show()},l._onInputBlur=function(){var e=a.activeElement;do{if(r(e,"pika-single"))return}while(e=e.parentNode);l._c||(l._b=i(function(){l.hide()},50)),l._c=!1},l._onClick=function(e){var t=(e=e||window.event).target||e.srcElement,a=t;if(t){!n&&r(t,"pika-select")&&(t.onchange||(t.setAttribute("onchange","return;"),s(t,"change",l._onChange)));do{if(r(a,"pika-single")||a===u.trigger)return}while(a=a.parentNode);l._v&&t!==u.trigger&&a!==u.trigger&&l.hide()}},l.el=a.createElement("div"),l.el.className="pika-single"+(u.isRTL?" is-rtl":"")+(u.theme?" "+u.theme:""),s(l.el,"mousedown",l._onMouseDown,!0),s(l.el,"touchend",l._onMouseDown,!0),s(l.el,"change",l._onChange),s(a,"keydown",l._onKeyChange),u.field&&(u.container?u.container.appendChild(l.el):u.bound?a.body.appendChild(l.el):u.field.parentNode.insertBefore(l.el,u.field.nextSibling),s(u.field,"change",l._onInputChange),u.defaultDate||(t&&u.field.value?u.defaultDate=e(u.field.value,u.format).toDate():u.defaultDate=new Date(Date.parse(u.field.value)),u.setDefaultDate=!0));var c=u.defaultDate;d(c)?u.setDefaultDate?l.setDate(c,!0):l.gotoDate(c):l.gotoDate(new Date),u.bound?(this.hide(),l.el.className+=" is-bound",s(u.trigger,"click",l._onInputClick),s(u.trigger,"focus",l._onInputFocus),s(u.trigger,"blur",l._onInputBlur)):this.show()};return k.prototype={config:function(e){this._o||(this._o=p({},g,!0));var t=p(this._o,e,!0);t.isRTL=!!t.isRTL,t.field=t.field&&t.field.nodeName?t.field:null,t.theme="string"==typeof t.theme&&t.theme?t.theme:null,t.bound=!!(void 0!==t.bound?t.field&&t.bound:t.field),t.trigger=t.trigger&&t.trigger.nodeName?t.trigger:t.field,t.disableWeekends=!!t.disableWeekends,t.disableDayFn="function"==typeof t.disableDayFn?t.disableDayFn:null;var n=parseInt(t.numberOfMonths,10)||1;if(t.numberOfMonths=n>4?4:n,d(t.minDate)||(t.minDate=!1),d(t.maxDate)||(t.maxDate=!1),t.minDate&&t.maxDate&&t.maxDate<t.minDate&&(t.maxDate=t.minDate=!1),t.minDate&&this.setMinDate(t.minDate),t.maxDate&&this.setMaxDate(t.maxDate),l(t.yearRange)){var a=(new Date).getFullYear()-10;t.yearRange[0]=parseInt(t.yearRange[0],10)||a,t.yearRange[1]=parseInt(t.yearRange[1],10)||a}else t.yearRange=Math.abs(parseInt(t.yearRange,10))||g.yearRange,t.yearRange>100&&(t.yearRange=100);return t},toString:function(n){return n=n||this._o.format,d(this._d)?this._o.toString?this._o.toString(this._d,n):t?e(this._d).format(n):this._d.toDateString():""},getMoment:function(){return t?e(this._d):null},setMoment:function(n,a){t&&e.isMoment(n)&&this.setDate(n.toDate(),a)},getDate:function(){return d(this._d)?new Date(this._d.getTime()):null},setDate:function(e,t){if(!e)return this._d=null,this._o.field&&(this._o.field.value="",v(this._o.field,"change",{firedBy:this})),this.draw();if("string"==typeof e&&(e=new Date(Date.parse(e))),d(e)){var n=this._o.minDate,a=this._o.maxDate;d(n)&&e<n?e=n:d(a)&&e>a&&(e=a),this._d=new Date(e.getTime()),h(this._d),this.gotoDate(this._d),this._o.field&&(this._o.field.value=this.toString(),v(this._o.field,"change",{firedBy:this})),t||"function"!=typeof this._o.onSelect||this._o.onSelect.call(this,this.getDate())}},gotoDate:function(e){var t=!0;if(d(e)){if(this.calendars){var n=new Date(this.calendars[0].year,this.calendars[0].month,1),a=new Date(this.calendars[this.calendars.length-1].year,this.calendars[this.calendars.length-1].month,1),i=e.getTime();a.setMonth(a.getMonth()+1),a.setDate(a.getDate()-1),t=i<n.getTime()||a.getTime()<i}t&&(this.calendars=[{month:e.getMonth(),year:e.getFullYear()}],"right"===this._o.mainCalendar&&(this.calendars[0].month+=1-this._o.numberOfMonths)),this.adjustCalendars()}},adjustDate:function(e,t){var n,a=this.getDate()||new Date,i=24*parseInt(t)*60*60*1e3;"add"===e?n=new Date(a.valueOf()+i):"subtract"===e&&(n=new Date(a.valueOf()-i)),this.setDate(n)},adjustCalendars:function(){this.calendars[0]=m(this.calendars[0]);for(var e=1;e<this._o.numberOfMonths;e++)this.calendars[e]=m({month:this.calendars[0].month+e,year:this.calendars[0].year});this.draw()},gotoToday:function(){this.gotoDate(new Date)},gotoMonth:function(e){isNaN(e)||(this.calendars[0].month=parseInt(e,10),this.adjustCalendars())},nextMonth:function(){this.calendars[0].month++,this.adjustCalendars()},prevMonth:function(){this.calendars[0].month--,this.adjustCalendars()},gotoYear:function(e){isNaN(e)||(this.calendars[0].year=parseInt(e,10),this.adjustCalendars())},setMinDate:function(e){e instanceof Date?(h(e),this._o.minDate=e,this._o.minYear=e.getFullYear(),this._o.minMonth=e.getMonth()):(this._o.minDate=g.minDate,this._o.minYear=g.minYear,this._o.minMonth=g.minMonth,this._o.startRange=g.startRange),this.draw()},setMaxDate:function(e){e instanceof Date?(h(e),this._o.maxDate=e,this._o.maxYear=e.getFullYear(),this._o.maxMonth=e.getMonth()):(this._o.maxDate=g.maxDate,this._o.maxYear=g.maxYear,this._o.maxMonth=g.maxMonth,this._o.endRange=g.endRange),this.draw()},setStartRange:function(e){this._o.startRange=e},setEndRange:function(e){this._o.endRange=e},draw:function(e){if(this._v||e){var t,n=this._o,a=n.minYear,s=n.maxYear,o=n.minMonth,r=n.maxMonth,l="";this._y<=a&&(this._y=a,!isNaN(o)&&this._m<o&&(this._m=o)),this._y>=s&&(this._y=s,!isNaN(r)&&this._m>r&&(this._m=r)),t="pika-title-"+Math.random().toString(36).replace(/[^a-z]+/g,"").substr(0,2);for(var d=0;d<n.numberOfMonths;d++)l+='<div class="pika-lendar">'+w(this,d,this.calendars[d].year,this.calendars[d].month,this.calendars[0].year,t)+this.render(this.calendars[d].year,this.calendars[d].month,t)+"</div>";this.el.innerHTML=l,n.bound&&"hidden"!==n.field.type&&i(function(){n.trigger.focus()},1),"function"==typeof this._o.onDraw&&this._o.onDraw(this),n.bound&&n.field.setAttribute("aria-label","Use the arrow keys to pick a date")}},adjustPosition:function(){var e,t,n,i,s,o,r,l,d,u;if(!this._o.container){if(this.el.style.position="absolute",t=e=this._o.trigger,n=this.el.offsetWidth,i=this.el.offsetHeight,s=window.innerWidth||a.documentElement.clientWidth,o=window.innerHeight||a.documentElement.clientHeight,r=window.pageYOffset||a.body.scrollTop||a.documentElement.scrollTop,"function"==typeof e.getBoundingClientRect)l=(u=e.getBoundingClientRect()).left+window.pageXOffset,d=u.bottom+window.pageYOffset;else for(l=t.offsetLeft,d=t.offsetTop+t.offsetHeight;t=t.offsetParent;)l+=t.offsetLeft,d+=t.offsetTop;(this._o.reposition&&l+n>s||this._o.position.indexOf("right")>-1&&l-n+e.offsetWidth>0)&&(l=l-n+e.offsetWidth),(this._o.reposition&&d+i>o+r||this._o.position.indexOf("top")>-1&&d-i-e.offsetHeight>0)&&(d=d-i-e.offsetHeight),this.el.style.left=l+"px",this.el.style.top=d+"px"}},render:function(e,t,n){var a=this._o,i=new Date,s=c(e,t),o=new Date(e,t,1).getDay(),r=[],l=[];h(i),a.firstDay>0&&(o-=a.firstDay)<0&&(o+=7);for(var p=0===t?11:t-1,v=11===t?0:t+1,m=0===t?e-1:e,g=11===t?e+1:e,w=c(m,p),k=s+o,_=k;_>7;)_-=7;k+=7-_;for(var x,M,C,S,j=!1,R=0,N=0;R<k;R++){var E=new Date(e,t,R-o+1),O=!!d(this._d)&&f(E,this._d),z=f(E,i),I=-1!==a.events.indexOf(E.toDateString()),$=R<o||R>=s+o,T=R-o+1,F=t,A=e,P=a.startRange&&f(a.startRange,E),Y=a.endRange&&f(a.endRange,E),L=a.startRange&&a.endRange&&a.startRange<E&&E<a.endRange,B=a.minDate&&E<a.minDate||a.maxDate&&E>a.maxDate||a.disableWeekends&&u(E)||a.disableDayFn&&a.disableDayFn(E);$&&(R<o?(T=w+T,F=p,A=m):(T-=s,F=v,A=g));var W={day:T,month:F,year:A,hasEvent:I,isSelected:O,isToday:z,isDisabled:B,isEmpty:$,isStartRange:P,isEndRange:Y,isInRange:L,showDaysInNextAndPreviousMonths:a.showDaysInNextAndPreviousMonths,enableSelectionDaysInNextAndPreviousMonths:a.enableSelectionDaysInNextAndPreviousMonths};a.pickWholeWeek&&O&&(j=!0),l.push(y(W)),7==++N&&(a.showWeekNumber&&l.unshift((x=R-o,M=t,C=e,S=void 0,S=new Date(C,0,1),'<td class="pika-week">'+Math.ceil(((new Date(C,M,x)-S)/864e5+S.getDay()+1)/7)+"</td>")),r.push(D(l,a.isRTL,a.pickWholeWeek,j)),l=[],N=0,j=!1)}return function(e,t,n){return'<table cellpadding="0" cellspacing="0" class="pika-table" role="grid" aria-labelledby="'+n+'">'+function(e){var t,n=[];for(e.showWeekNumber&&n.push("<th></th>"),t=0;t<7;t++)n.push('<th scope="col"><abbr title="'+b(e,t)+'">'+b(e,t,!0)+"</abbr></th>");return"<thead><tr>"+(e.isRTL?n.reverse():n).join("")+"</tr></thead>"}(e)+("<tbody>"+t.join("")+"</tbody>")+"</table>"}(a,r,n)},isVisible:function(){return this._v},show:function(){var e,t,n;this.isVisible()||(this._v=!0,this.draw(),e=this.el,t="is-hidden",e.className=(n=(" "+e.className+" ").replace(" "+t+" "," ")).trim?n.trim():n.replace(/^\s+|\s+$/g,""),this._o.bound&&(s(a,"click",this._onClick),this.adjustPosition()),"function"==typeof this._o.onOpen&&this._o.onOpen.call(this))},hide:function(){var e,t,n=this._v;!1!==n&&(this._o.bound&&o(a,"click",this._onClick),this.el.style.position="static",this.el.style.left="auto",this.el.style.top="auto",e=this.el,r(e,t="is-hidden")||(e.className=""===e.className?t:e.className+" "+t),this._v=!1,void 0!==n&&"function"==typeof this._o.onClose&&this._o.onClose.call(this))},destroy:function(){this.hide(),o(this.el,"mousedown",this._onMouseDown,!0),o(this.el,"touchend",this._onMouseDown,!0),o(this.el,"change",this._onChange),o(a,"keydown",this._onKeyChange),this._o.field&&(o(this._o.field,"change",this._onInputChange),this._o.bound&&(o(this._o.trigger,"click",this._onInputClick),o(this._o.trigger,"focus",this._onInputFocus),o(this._o.trigger,"blur",this._onInputBlur))),this.el.parentNode&&this.el.parentNode.removeChild(this.el)}},k}(i)}()},951:function(e,t,n){"use strict";n.r(t);var a=n(285);document.addEventListener("DOMContentLoaded",function(){return Object(a.a)()})},952:function(e,t,n){n(31),n(57),e.exports=n(951)},99:function(e,t){Mousetrap=function(e){var t=e,n=t.stopCallback,a=!0;return t.stopCallback=function(e,t,i){return!a||n(e,t,i)},t.pause=function(){a=!1},t.unpause=function(){a=!0},t}(Mousetrap)}},[[952,0,1,2,3]]]);
//# sourceMappingURL=pages.projects.milestones.edit.145eb06d.chunk.js.map