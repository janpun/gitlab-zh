(this.webpackJsonp=this.webpackJsonp||[]).push([[225],{1273:function(e,n,t){"use strict";t.r(n);var o=t(200);document.addEventListener("DOMContentLoaded",function(){return new o.a})},1274:function(e,n,t){t(31),t(139),e.exports=t(1273)},139:function(e,n,t){"use strict";t.r(n);var o=t(0),i=t.n(o),r=t(21);function l(){"file"===i()('input[name="blacklist_type"]:checked').val()?(i()(".blacklist-file").show(),i()(".blacklist-raw").hide()):(i()(".blacklist-file").hide(),i()(".blacklist-raw").show())}document.addEventListener("DOMContentLoaded",function(){var e=i()(".change-owner-holder");i()("input#user_force_random_password").on("change",function(){var e=i()("#user_password, #user_password_confirmation");i()(this).attr("checked")?e.val("").prop("disabled",!0):e.prop("disabled",!1)}),i()("body").on("click",".js-toggle-colors-link",function(e){e.preventDefault(),i()(".js-toggle-colors-container").toggleClass("hide")}),i()(".log-tabs a").on("click",function(e){e.preventDefault(),i()(this).tab("show")}),i()(".log-bottom").on("click",function(e){e.preventDefault();var n=i()(".file-content:visible");n.animate({scrollTop:n.find("ol").height()},"fast")}),i()(".change-owner-link").on("click",function(n){n.preventDefault(),i()(this).hide(),e.show()}),i()(".change-owner-cancel-link").on("click",function(n){n.preventDefault(),e.hide(),i()(".change-owner-link").show()}),i()("li.project_member, li.group_member").on("ajax:success",r.e),i()("input[name='blacklist_type']").on("click",l),l()})},200:function(e,n,t){"use strict";var o=t(0),i=t.n(o),r=function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}();var l=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.setSuggestedColor=this.setSuggestedColor.bind(this),this.updateColorPreview=this.updateColorPreview.bind(this),this.cleanBinding(),this.addBinding(),this.updateColorPreview()}return r(e,[{key:"addBinding",value:function(){return i()(document).on("click",".suggest-colors a",this.setSuggestedColor),i()(document).on("input","input#label_color",this.updateColorPreview)}},{key:"cleanBinding",value:function(){return i()(document).off("click",".suggest-colors a"),i()(document).off("input","input#label_color")}},{key:"updateColorPreview",value:function(){var e=i()("input#label_color").val();return i()("div.label-color-preview").css("background-color",e)}},{key:"setSuggestedColor",value:function(e){var n=i()(e.currentTarget).data("color");return i()("input#label_color").val(n),this.updateColorPreview(),i()(".label-form").trigger("keyup"),e.preventDefault()}}]),e}();n.a=l}},[[1274,0,1]]]);
//# sourceMappingURL=pages.admin.labels.new.223dbcee.chunk.js.map