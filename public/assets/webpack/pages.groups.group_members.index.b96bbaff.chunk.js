(this.webpackJsonp=this.webpackJsonp||[]).push([[208],{1245:function(e,t,a){"use strict";a.r(t);var n=a(407),r=a(465),s=a(81);document.addEventListener("DOMContentLoaded",function(){Object(n.a)(),new r.a,new s.a})},1246:function(e,t,a){a(31),e.exports=a(1245)},407:function(e,t,a){"use strict";a.d(t,"a",function(){return u});var n=a(0),r=a.n(n),s=a(73),i=a.n(s),l=a(36);function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:".js-access-expiration-date";function t(){r()(this).closest(".clearable-input").toggleClass("has-value",""!==r()(this).val())}var a=r()(e);a.each(function(e,a){var n=r()(a),s=new i.a({field:n.get(0),theme:"gitlab-theme animate-picker",format:"yyyy-mm-dd",minDate:new Date,container:n.parent().get(0),parse:function(e){return Object(l.a)(e)},toString:function(e){return Object(l.b)(e)},onSelect:function(e){n.val(s.toString(e)),n.trigger("change"),t.call(n)}});s.setDate(Object(l.a)(n.val())),n.data("pikaday",s)}),a.next(".js-clear-input").on("click",function(a){a.preventDefault();var n=r()(this).closest(".clearable-input").find(e);n.data("pikaday").setDate(null),n.trigger("change"),t.call(n)}),a.on("blur",t),a.each(t)}},465:function(e,t,a){"use strict";var n=a(0),r=a.n(n),s=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}();var i=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.addListeners(),this.initGLDropdown()}return s(e,[{key:"addListeners",value:function(){r()(".js-member-update-control").off("change").on("change",this.formSubmit.bind(this)),r()(".js-edit-member-form").off("ajax:success").on("ajax:success",this.formSuccess.bind(this)),gl.utils.disableButtonIfEmptyField("#user_ids","input[name=commit]","change")}},{key:"initGLDropdown",value:function(){var e=this;r()(".js-member-permissions-dropdown").each(function(t,a){var n=r()(a);n.glDropdown({selectable:!0,isSelectable:function(e,t){return!t.hasClass("is-active")},fieldName:n.data("fieldName"),id:function(e,t){return t.data("id")},toggleLabel:function(e,t){return t.text()},clicked:function(t){e.formSubmit(null,t.$el)}})})}},{key:"formSubmit",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,a=e?r()(e.currentTarget):t,n=this.getMemberListItems(a),s=n.$toggle,i=n.$dateInput;a.closest("form").trigger("submit.rails"),s.disable(),i.disable()}},{key:"formSuccess",value:function(e){var t=this.getMemberListItems(r()(e.currentTarget).closest(".member")),a=t.$toggle,n=t.$dateInput;a.enable(),n.enable()}},{key:"getMemberListItems",value:function(e){var t=e.is(".member")?e:r()("#"+e.data("elId"));return{$memberListItem:t,$toggle:t.find(".dropdown-menu-toggle"),$dateInput:t.find(".js-access-expiration-date")}}}]),e}();t.a=i},81:function(e,t,a){"use strict";var n=a(0),r=a.n(n),s=a(3),i=a.n(s),l=a(5),u=a(1),o=a(47),d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function c(e,t){var a,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this.users=this.users.bind(this),this.user=this.user.bind(this),this.usersPath="/autocomplete/users.json",this.userPath="/autocomplete/users/:id.json",null!=e&&("object"===(void 0===e?"undefined":d(e))?this.currentUser=e:this.currentUser=JSON.parse(e));var s,c=n.handleClick;a=r()(t),t||(a=r()(".js-user-search")),a.each((s=this,function(e,t){var a,n,d,f,m,v,p,h,g,b,w,y,j,k,S,I,_,C,U,x={};d=r()(t),x.projectId=d.data("projectId"),x.groupId=d.data("groupId"),x.showCurrentUser=d.data("currentUser"),x.todoFilter=d.data("todoFilter"),x.todoStateFilter=d.data("todoStateFilter"),C=d.data("nullUser"),y=d.data("nullUserDefault"),U=d.data("showMenuAbove"),_=d.data("anyUser"),j=d.data("firstUser"),x.authorId=d.data("authorId"),w=d.data("defaultLabel"),k=d.data("issueUpdate"),m=d.closest(".selectbox"),a=m.closest(".block"),p=d.data("abilityName"),v=a.find(".value"),n=a.find(".sidebar-collapsed-user"),f=a.find(".block-loading").fadeOut(),I=y&&C?0:null,void 0===(S=d.data("selected"))&&(S=I);var D=function(){var e=d.closest(".selectbox").find("input[name='"+d.data("fieldName")+"'][value=0]");e&&e.remove();var t=document.createElement("input");t.type="hidden",t.name=d.data("fieldName");var a=d.data("currentUserInfo");a?(t.value=a.id,t.dataset.meta=i.a.escape(a.name)):s.currentUser&&(t.value=s.currentUser.id),m?d.parent().before(t):d.after(t)};a[0]&&a[0].addEventListener("assignYourself",D);var L=function(){return m.find('input[name="'+d.data("fieldName")+'"]')},N=function(){return L().map(function(e,t){return parseInt(t.value,10)}).get()},E=function(){var e=d.data("maxSelect");if(e){var t=N();if(t.length>e){var a=t[0];d.closest(".selectbox").find("input[name='"+d.data("fieldName")+"'][value="+a+"]").remove(),emitSidebarEvent("sidebar.removeAssignee",{id:a})}}},O=function(e,t){var a=N().filter(function(e){return 0!==e}),n=L().map(function(e,t){return{name:t.dataset.meta,value:parseInt(t.value,10)}}).filter(function(e){return 0!==e.id}).get(0);if(0===a.length)return"Unassigned";if(1===a.length)return n.name;if(t){var r=a.filter(function(t){return t!==e.id});return e.name+" + "+r.length+" more"}return n.name+" + "+(a.length-1)+" more"};return r()(".assign-to-me-link").on("click",function(e){if(e.preventDefault(),r()(e.currentTarget).hide(),d.data("multiSelect")){D(),E();var t=d.data("currentUserInfo");d.find(".dropdown-toggle-text").text(O(t)).removeClass("is-default")}else{var a=r()('input[name="'+d.data("fieldName")+'"]');a.val(gon.current_user_id),S=a.val(),d.find(".dropdown-toggle-text").text(gon.current_user_fullname).removeClass("is-default")}}),a.on("click",".js-assign-yourself",function(e){return e.preventDefault(),h(s.currentUser.id)}),h=function(e){var t;return(t={})[p]={},t[p].assignee_id=null!=e?e:null,f.removeClass("hidden").fadeIn(),d.trigger("loading.gl.dropdown"),l.a.put(k,t).then(function(e){var t,a,r=e.data;return d.trigger("loaded.gl.dropdown"),f.fadeOut(),r.assignee?(t={name:r.assignee.name,username:r.assignee.username,avatar:r.assignee.avatar_url},a=i.a.escape(t.name)):(t={name:"Unassigned",username:"",avatar:""},a=Object(u.a)("Assignee")),v.html(g(t)),n.attr("title",a).tooltip("_fixTitle"),n.html(b(t))})},b=i.a.template('<% if( avatar ) { %> <a class="author-link" href="/<%- username %>"> <img width="24" class="avatar avatar-inline s24" alt="" src="<%- avatar %>"> </a> <% } else { %> <i class="fa fa-user"></i> <% } %>'),g=i.a.template('<% if (username) { %> <a class="author-link bold" href="/<%- username %>"> <% if( avatar ) { %> <img width="32" class="avatar avatar-inline s32" alt="" src="<%- avatar %>"> <% } %> <span class="author"><%- name %></span> <span class="username"> @<%- username %> </span> </a> <% } else { %> <span class="no-value assign-yourself"> No assignee - <a href="#" class="js-assign-yourself"> assign yourself </a> </span> <% } %>'),d.glDropdown({showMenuAbove:U,data:function(e,t){return s.users(e,x,function(a){(this.instance||this.options.instance).options.processData(e,a,t)}.bind(this))},processData:function(e,t,a){var n=t;if(d.hasClass("js-multiselect")&&0===e.length){var r=L(),s=i.a.uniq(r,!1,function(e){return e.value}).filter(function(e){var t=parseInt(e.value,10);return!n.find(function(e){return e.id===t})&&0!==t}).map(function(e){var t=parseInt(e.value,10),a=e.dataset,n=a.avatarUrl,r=a.avatar_url,s=a.name,i=a.username;return{avatar_url:n||r,id:t,name:s,username:i}});n=t.concat(s)}var l=void 0,u=void 0,o=void 0,c=void 0,f=void 0,m=void 0;if(0===e.length){if(m=0,j)for(u=0,o=n.length;u<o;u+=1)if((f=n[u]).username===j){n.splice(u,1),n.unshift(f);break}if(C&&(m+=1,n.unshift({beforeDivider:!0,name:"Unassigned",id:0})),_&&(m+=1,!0===(c=_)&&(c="Any User"),l={beforeDivider:!0,name:c,id:null},n.unshift(l)),m&&n.splice(m,0,"divider"),d.hasClass("js-multiselect")){var v=N().filter(function(e){return 0!==e});if(v.length>0){d.data("dropdownHeader")&&(m+=1,n.splice(m,0,{header:d.data("dropdownHeader")}));var p=n.filter(function(e){return-1!==v.indexOf(e.id)}).sort(function(e,t){return e.name>t.name});n=n.filter(function(e){return-1===v.indexOf(e.id)}),p.forEach(function(e){m+=1,n.splice(m,0,e)}),n.splice(m+1,0,"divider")}}}a(n),U&&d.data("glDropdown").positionMenuAbove()},filterable:!0,filterRemote:!0,search:{fields:["name","username"]},selectable:!0,fieldName:d.data("fieldName"),toggleLabel:function(e,t,a){var n=a.filterInput.val();if(this.multiSelect&&""===n){var s=a.filteredFullData(),i=a.parseData.bind(a);this.processData(n,s,i)}return this.multiSelect?O(e,r()(t).hasClass("is-active")):e&&"id"in e&&r()(t).hasClass("is-active")?(d.find(".dropdown-toggle-text").removeClass("is-default"),e.text?e.text:e.name):(d.find(".dropdown-toggle-text").addClass("is-default"),w)},defaultLabel:w,hidden:function(e){d.hasClass("js-multiselect")&&emitSidebarEvent("sidebar.saveAssignees"),d.data("alwaysShowSelectbox")||(m.hide(),a=m.closest(".block"),(v=a.find(".value")).css("display",""))},multiSelect:d.hasClass("js-multiselect"),inputMeta:d.data("inputMeta"),clicked:function(e){var t,a,n,s,i=e.$el,l=e.e,u=e.isMarking,f=e.selectedObj;if(d.hasClass("js-multiselect")){var m=i.hasClass("is-active"),v=d.closest(".selectbox").find("input[name='"+d.data("fieldName")+"'][value!=0]");if(E(),f.beforeDivider&&"unassigned"===f.name.toLowerCase())v.each(function(e,t){parseInt(t.value,10),t.remove()}),emitSidebarEvent("sidebar.removeAllAssignees");else if(m){emitSidebarEvent("sidebar.addAssignee",f);var p=d.closest(".selectbox").find("input[name='"+d.data("fieldName")+"'][value=0]");p&&p.remove()}else 0===v.length&&this.addInput(d.data("fieldName"),0,{}),emitSidebarEvent("sidebar.removeAssignee",f);N().find(function(e){return e===gon.current_user_id})?r()(".assign-to-me-link").hide():r()(".assign-to-me-link").show()}if(t="projects:issues:index"===(n=r()("body").attr("data-page")),a=n==n&&"projects:merge_requests:index"===n,d.hasClass("js-filter-bulk-update")||d.hasClass("js-issuable-form-dropdown")){l.preventDefault();var g=f.id!==S;(S=g?f.id:I)===gon.current_user_id?r()(".assign-to-me-link").hide():r()(".assign-to-me-link").show()}else{if(i.closest(".add-issues-modal").length)o.a.store.filter[d.data("fieldName")]=f.id;else if(c)l.preventDefault(),c(f,u);else{if(d.hasClass("js-filter-submit")&&(t||a))return Issuable.filterResults(d.closest("form"));if(d.hasClass("js-filter-submit"))return d.closest("form").submit();if(!d.hasClass("js-multiselect"))return s=d.closest(".selectbox").find("input[name='"+d.data("fieldName")+"']").val(),h(s)}d.data("maxSelect")&&N().length===d.data("maxSelect")&&d.dropdown("toggle")}},id:function(e){return e.id},opened:function(e){var t=r()(e.currentTarget),a=N();function n(e){t.find('li[data-user-id="'+e+'"] .dropdown-menu-user-link').addClass("is-active")}d.hasClass("js-issue-board-sidebar")&&0===a.length&&this.addInput(d.data("fieldName"),0,{}),t.find(".is-active").removeClass("is-active"),a.length>0?N().forEach(function(e){return n(e)}):d.hasClass("js-issue-board-sidebar")?n(0):n(S)},updateLabel:d.data("dropdownTitle"),renderRow:function(e){var t,a,n;n=e.username?"@"+e.username:"",t=e.avatar_url?e.avatar_url:gon.default_avatar_url;var r=!1;if(this.multiSelect){r=N().find(function(t){return e.id===t});var s=this.fieldName;d.closest(".selectbox").find("input[name='"+s+"'][value='"+e.id+"']").length&&(r=!0)}else r=e.id===S;return a="",null!=e.beforeDivider?i.a.escape(e.name):a="<img src='"+t+"' class='avatar avatar-inline' width='32' />","\n            <li data-user-id="+e.id+">\n              <a href='#' class='dropdown-menu-user-link "+(!0===r?"is-active":"")+"'>\n                "+a+"\n                <strong class='dropdown-menu-user-full-name'>\n                  "+i.a.escape(e.name)+"\n                </strong>\n                "+(n?"<span class='dropdown-menu-user-username'>"+n+"</span>":"")+"\n              </a>\n            </li>\n          "}})})),r()(".ajax-users-select").each(function(e){return function(t,a){var n,s,i,l,u={};return u.skipLdap=r()(a).hasClass("skip_ldap"),u.projectId=r()(a).data("projectId"),u.groupId=r()(a).data("groupId"),u.showCurrentUser=r()(a).data("currentUser"),u.authorId=r()(a).data("authorId"),u.skipUsers=r()(a).data("skipUsers"),l=r()(a).data("nullUser"),s=r()(a).data("anyUser"),i=r()(a).data("emailUser"),n=r()(a).data("firstUser"),r()(a).select2({placeholder:"Search for a user",multiple:r()(a).hasClass("multiselect"),minimumInputLength:0,query:function(t){return e.users(t.term,u,function(e){var a,r,u,o,d,c,f,m,v;if(r={results:e},0===t.term.length){if(n)for(o=0,d=(v=r.results).length;o<d;o+=1)if((m=v[o]).username===n){r.results.splice(o,1),r.results.unshift(m);break}l&&(f={name:"Unassigned",id:0},r.results.unshift(f)),s&&(!0===(c=s)&&(c="Any User"),a={name:c,id:null},r.results.unshift(a))}if(i&&0===r.results.length&&t.term.match(/^[^@]+@[^@]+$/)){var p=t.term.trim();u={name:'Invite "'+t.term+'" by email',username:p,id:p,invite:!0},r.results.unshift(u)}return t.callback(r)})},initSelection:function(){var t;return t=1<=arguments.length?[].slice.call(arguments,0):[],e.initSelection.apply(e,t)},formatResult:function(){var t;return t=1<=arguments.length?[].slice.call(arguments,0):[],e.formatResult.apply(e,t)},formatSelection:function(){var t;return t=1<=arguments.length?[].slice.call(arguments,0):[],e.formatSelection.apply(e,t)},dropdownCssClass:"ajax-users-dropdown",escapeMarkup:function(e){return e}})}}(this))}window.emitSidebarEvent=window.emitSidebarEvent||r.a.noop,c.prototype.initSelection=function(e,t){var a;return"0"===(a=r()(e).val())?t({name:"Unassigned"}):""!==a?this.user(a,t):void 0},c.prototype.formatResult=function(e){var t;return t=e.avatar_url?e.avatar_url:gon.default_avatar_url,"<div class='user-result "+(e.username?void 0:"no-username")+"'> <div class='user-image'><img class='avatar avatar-inline s32' src='"+t+"'></div> <div class='user-name dropdown-menu-user-full-name'>"+i.a.escape(e.name)+"</div> <div class='user-username dropdown-menu-user-username'>"+(e.invite?"":"@"+i.a.escape(e.username))+"</div> </div>"},c.prototype.formatSelection=function(e){return i.a.escape(e.name)},c.prototype.user=function(e,t){return!!/^\d+$/.test(e)&&(a=(a=this.buildUrl(this.userPath)).replace(":id",e),l.a.get(a).then(function(e){var a=e.data;t(a)}));var a},c.prototype.users=function(e,t,a){var n=this.buildUrl(this.usersPath),r={search:e,active:!0,project_id:t.projectId||null,group_id:t.groupId||null,skip_ldap:t.skipLdap||null,todo_filter:t.todoFilter||null,todo_state_filter:t.todoStateFilter||null,current_user:t.showCurrentUser||null,author_id:t.authorId||null,skip_users:t.skipUsers||null};return l.a.get(n,{params:r}).then(function(e){var t=e.data;a(t)})},c.prototype.buildUrl=function(e){return null!=gon.relative_url_root&&(e=gon.relative_url_root.replace(/\/$/,"")+e),e},t.a=c}},[[1246,0,1,4]]]);
//# sourceMappingURL=pages.groups.group_members.index.b96bbaff.chunk.js.map