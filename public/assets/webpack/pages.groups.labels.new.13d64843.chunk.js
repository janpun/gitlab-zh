(this.webpackJsonp=this.webpackJsonp||[]).push([[204],{1237:function(e,t,n){"use strict";n.r(t);var o=n(200);document.addEventListener("DOMContentLoaded",function(){return new o.a})},1238:function(e,t,n){n(31),e.exports=n(1237)},200:function(e,t,n){"use strict";var o=n(0),r=n.n(o),i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var u=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.setSuggestedColor=this.setSuggestedColor.bind(this),this.updateColorPreview=this.updateColorPreview.bind(this),this.cleanBinding(),this.addBinding(),this.updateColorPreview()}return i(e,[{key:"addBinding",value:function(){return r()(document).on("click",".suggest-colors a",this.setSuggestedColor),r()(document).on("input","input#label_color",this.updateColorPreview)}},{key:"cleanBinding",value:function(){return r()(document).off("click",".suggest-colors a"),r()(document).off("input","input#label_color")}},{key:"updateColorPreview",value:function(){var e=r()("input#label_color").val();return r()("div.label-color-preview").css("background-color",e)}},{key:"setSuggestedColor",value:function(e){var t=r()(e.currentTarget).data("color");return r()("input#label_color").val(t),this.updateColorPreview(),r()(".label-form").trigger("keyup"),e.preventDefault()}}]),e}();t.a=u}},[[1238,0,1]]]);
//# sourceMappingURL=pages.groups.labels.new.13d64843.chunk.js.map