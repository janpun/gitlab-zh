(this.webpackJsonp=this.webpackJsonp||[]).push([[235],{1290:function(e,t,n){n(31),n(139),e.exports=n(838)},139:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),i=n(21);function c(){"file"===o()('input[name="blacklist_type"]:checked').val()?(o()(".blacklist-file").show(),o()(".blacklist-raw").hide()):(o()(".blacklist-file").hide(),o()(".blacklist-raw").show())}document.addEventListener("DOMContentLoaded",function(){var e=o()(".change-owner-holder");o()("input#user_force_random_password").on("change",function(){var e=o()("#user_password, #user_password_confirmation");o()(this).attr("checked")?e.val("").prop("disabled",!0):e.prop("disabled",!1)}),o()("body").on("click",".js-toggle-colors-link",function(e){e.preventDefault(),o()(".js-toggle-colors-container").toggleClass("hide")}),o()(".log-tabs a").on("click",function(e){e.preventDefault(),o()(this).tab("show")}),o()(".log-bottom").on("click",function(e){e.preventDefault();var t=o()(".file-content:visible");t.animate({scrollTop:t.find("ol").height()},"fast")}),o()(".change-owner-link").on("click",function(t){t.preventDefault(),o()(this).hide(),e.show()}),o()(".change-owner-cancel-link").on("click",function(t){t.preventDefault(),e.hide(),o()(".change-owner-link").show()}),o()("li.project_member, li.group_member").on("ajax:success",i.e),o()("input[name='blacklist_type']").on("click",c),c()})},838:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),i=n(45),c=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();var s=".abuse-reports .message",r=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),o()(s).each(this.truncateLongMessage),o()(document).off("click",s).on("click",s,this.toggleMessageTruncation)}return c(e,[{key:"truncateLongMessage",value:function(){var e=o()(this),t=e.text();t.length>500&&(e.data("originalMessage",t),e.data("messageTruncated","true"),e.text(Object(i.m)(t,500)))}},{key:"toggleMessageTruncation",value:function(){var e=o()(this),t=e.data("originalMessage");t&&("true"===e.data("messageTruncated")?(e.data("messageTruncated","false"),e.text(t)):(e.data("messageTruncated","true"),e.text(t.substr(0,497)+"...")))}}]),e}();document.addEventListener("DOMContentLoaded",function(){return new r})}},[[1290,0,1]]]);
//# sourceMappingURL=pages.admin.abuse_reports.d9ad789a.chunk.js.map