(this.webpackJsonp=this.webpackJsonp||[]).push([[141,18],{201:function(e,t,n){"use strict";var r=n(3),a=n.n(r),i=n(11),s=n(21),o=n(7),c=n(104),l=n(249),u=n(8),h=new u.default,d=n(147),p={name:"RecentSearchesDropdownContent",props:{items:{type:Array,required:!0},isLocalStorageAvailable:{type:Boolean,required:!1,default:!0},allowedKeys:{type:Array,required:!0}},computed:{processedItems:function(){var e=this;return this.items.map(function(t){var n=d.a.processTokens(t,e.allowedKeys),r=n.tokens,a=n.searchToken;return{text:t,tokens:r.map(function(e){return{prefix:e.key+":",suffix:""+e.symbol+e.value}}),searchToken:a}})},hasItems:function(){return this.items.length>0}},methods:{onItemActivated:function(e){h.$emit("recentSearchesItemSelected",e)},onRequestClearRecentSearches:function(e){e.stopPropagation(),h.$emit("requestClearRecentSearches")}}},f=n(2),v=Object(f.a)(p,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.isLocalStorageAvailable?e.hasItems?n("ul",[e._l(e.processedItems,function(t,r){return n("li",{key:"processed-items-"+r},[n("button",{staticClass:"filtered-search-history-dropdown-item",attrs:{type:"button"},on:{click:function(n){e.onItemActivated(t.text)}}},[n("span",e._l(t.tokens,function(t,r){return n("span",{key:"dropdown-token-"+r,staticClass:"filtered-search-history-dropdown-token"},[n("span",{staticClass:"name"},[e._v(e._s(t.prefix))]),e._v(" "),n("span",{staticClass:"value"},[e._v(e._s(t.suffix))])])})),e._v(" "),n("span",{staticClass:"filtered-search-history-dropdown-search-token"},[e._v("\n          "+e._s(t.searchToken)+"\n        ")])])])}),e._v(" "),n("li",{staticClass:"divider"}),e._v(" "),n("li",[n("button",{staticClass:"filtered-search-history-clear-button",attrs:{type:"button"},on:{click:function(t){e.onRequestClearRecentSearches(t)}}},[e._v("\n        Clear recent searches\n      ")])])],2):n("div",{staticClass:"dropdown-info-note"},[e._v("\n    You don't have any recent searches\n  ")]):n("div",{staticClass:"dropdown-info-note"},[e._v("\n    This feature requires local storage to be enabled\n  ")])])},[],!1,null,null,null).exports,k=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var S=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.store=t,this.service=n,this.wrapperElement=r}return k(e,[{key:"init",value:function(){this.bindEvents(),this.render()}},{key:"bindEvents",value:function(){this.onRequestClearRecentSearchesWrapper=this.onRequestClearRecentSearches.bind(this),h.$on("requestClearRecentSearches",this.onRequestClearRecentSearchesWrapper)}},{key:"unbindEvents",value:function(){h.$off("requestClearRecentSearches",this.onRequestClearRecentSearchesWrapper)}},{key:"render",value:function(){var e=this.store.state;this.vm=new u.default({el:this.wrapperElement,components:{RecentSearchesDropdownContent:v},data:function(){return e},template:'\n        <recent-searches-dropdown-content\n          :items="recentSearches"\n          :is-local-storage-available="isLocalStorageAvailable"\n          :allowed-keys="allowedKeys"\n          />\n      '})}},{key:"onRequestClearRecentSearches",value:function(){var e=this.store.setRecentSearches([]);this.service.save(e)}},{key:"destroy",value:function(){this.unbindEvents(),this.vm&&this.vm.$destroy()}}]),e}(),m=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var g=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments[1];!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.state=Object.assign({isLocalStorageAvailable:!0,recentSearches:[],allowedKeys:n},t)}return m(e,[{key:"addRecentSearch",value:function(e){return this.setRecentSearches([e].concat(this.state.recentSearches)),this.state.recentSearches}},{key:"setRecentSearches",value:function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).map(function(e){return e.trim()});return this.state.recentSearches=a.a.uniq(e).slice(0,5),this.state.recentSearches}}]),e}();var y=function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.name="RecentSearchesServiceError",this.message=t||"Recent Searches Service is unavailable"};y.prototype=Error.prototype;var b=y,E=n(76),w=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var I=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"issuable-recent-searches";!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.localStorageKey=t}return w(e,[{key:"fetch",value:function(){if(!e.isAvailable()){var t=new b;return Promise.reject(t)}var n=window.localStorage.getItem(this.localStorageKey),r=[];if(n&&n.length>0)try{r=JSON.parse(n)}catch(e){return Promise.reject(e)}return Promise.resolve(r)}},{key:"save",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];e.isAvailable()&&window.localStorage.setItem(this.localStorageKey,JSON.stringify(t))}}],[{key:"isAvailable",value:function(){return E.a.isLocalStorageAccessSafe()}}]),e}(),C=n(181),T=n(267),L=n(54),D=n(64),F=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var W=function(){function e(t){var n=t.page,r=t.isGroup,a=void 0!==r&&r,i=t.isGroupAncestor,s=void 0===i||i,o=t.isGroupDecendent,u=void 0!==o&&o,h=t.filteredSearchTokenKeys,d=void 0===h?l.a:h,p=t.stateFiltersSelector,f=void 0===p?".issues-state-filters":p;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.isGroup=a,this.isGroupAncestor=s,this.isGroupDecendent=u,this.states=["opened","closed","merged","all"],this.page=n,this.container=c.a.container,this.filteredSearchInput=this.container.querySelector(".filtered-search"),this.filteredSearchInputForm=this.filteredSearchInput.form,this.clearSearchButton=this.container.querySelector(".clear-search"),this.tokensContainer=this.container.querySelector(".tokens-container"),this.filteredSearchTokenKeys=d,this.stateFiltersSelector=f,this.recentsStorageKeyNames={issues:"issue-recent-searches",merge_requests:"merge-request-recent-searches"},this.recentSearchesStore=new g({isLocalStorageAvailable:I.isAvailable(),allowedKeys:this.filteredSearchTokenKeys.getKeys()}),this.searchHistoryDropdownElement=document.querySelector(".js-filtered-search-history-dropdown");var v=(this.searchHistoryDropdownElement?this.searchHistoryDropdownElement.dataset.fullPath:"project")+"-"+this.recentsStorageKeyNames[this.page];this.recentSearchesService=new I(v)}return F(e,[{key:"setup",value:function(){var e=this;this.fetchingRecentSearchesPromise=this.recentSearchesService.fetch().catch(function(e){if("RecentSearchesServiceError"!==e.name)return new o.a("An error occurred while parsing recent searches"),[]}).then(function(t){if(t){var n=e.recentSearchesStore.setRecentSearches(e.recentSearchesStore.state.recentSearches.concat(t));e.recentSearchesService.save(n)}}),this.filteredSearchInput&&(this.tokenizer=d.a,this.dropdownManager=new T.a({baseEndpoint:this.filteredSearchInput.getAttribute("data-base-endpoint")||"",tokenizer:this.tokenizer,page:this.page,isGroup:this.isGroup,isGroupAncestor:this.isGroupAncestor,isGroupDecendent:this.isGroupDecendent,filteredSearchTokenKeys:this.filteredSearchTokenKeys}),this.recentSearchesRoot=new S(this.recentSearchesStore,this.recentSearchesService,this.searchHistoryDropdownElement),this.recentSearchesRoot.init(),this.bindEvents(),this.loadSearchParamsFromURL(),this.dropdownManager.setDropdown(),this.cleanupWrapper=this.cleanup.bind(this),document.addEventListener("beforeunload",this.cleanupWrapper))}},{key:"cleanup",value:function(){this.unbindEvents(),document.removeEventListener("beforeunload",this.cleanupWrapper),this.recentSearchesRoot&&this.recentSearchesRoot.destroy()}},{key:"bindStateEvents",value:function(){var e=this;this.stateFilters=document.querySelector(".container-fluid "+this.stateFiltersSelector),this.stateFilters&&(this.searchStateWrapper=this.searchState.bind(this),this.applyToStateFilters(function(t){t.addEventListener("click",e.searchStateWrapper)}))}},{key:"unbindStateEvents",value:function(){var e=this;this.stateFilters&&this.applyToStateFilters(function(t){t.removeEventListener("click",e.searchStateWrapper)})}},{key:"applyToStateFilters",value:function(e){var t=this;this.stateFilters.querySelectorAll("a[data-state]").forEach(function(n){t.states.indexOf(n.dataset.state)>-1&&e(n)})}},{key:"bindEvents",value:function(){this.handleFormSubmit=this.handleFormSubmit.bind(this),this.setDropdownWrapper=this.dropdownManager.setDropdown.bind(this.dropdownManager),this.toggleClearSearchButtonWrapper=this.toggleClearSearchButton.bind(this),this.handleInputPlaceholderWrapper=this.handleInputPlaceholder.bind(this),this.handleInputVisualTokenWrapper=this.handleInputVisualToken.bind(this),this.checkForEnterWrapper=this.checkForEnter.bind(this),this.onClearSearchWrapper=this.onClearSearch.bind(this),this.checkForBackspaceWrapper=this.checkForBackspace.call(this),this.removeSelectedTokenKeydownWrapper=this.removeSelectedTokenKeydown.bind(this),this.unselectEditTokensWrapper=this.unselectEditTokens.bind(this),this.editTokenWrapper=this.editToken.bind(this),this.tokenChange=this.tokenChange.bind(this),this.addInputContainerFocusWrapper=this.addInputContainerFocus.bind(this),this.removeInputContainerFocusWrapper=this.removeInputContainerFocus.bind(this),this.onrecentSearchesItemSelectedWrapper=this.onrecentSearchesItemSelected.bind(this),this.removeTokenWrapper=this.removeToken.bind(this),this.filteredSearchInputForm.addEventListener("submit",this.handleFormSubmit),this.filteredSearchInput.addEventListener("input",this.setDropdownWrapper),this.filteredSearchInput.addEventListener("input",this.toggleClearSearchButtonWrapper),this.filteredSearchInput.addEventListener("input",this.handleInputPlaceholderWrapper),this.filteredSearchInput.addEventListener("input",this.handleInputVisualTokenWrapper),this.filteredSearchInput.addEventListener("keydown",this.checkForEnterWrapper),this.filteredSearchInput.addEventListener("keyup",this.checkForBackspaceWrapper),this.filteredSearchInput.addEventListener("click",this.tokenChange),this.filteredSearchInput.addEventListener("keyup",this.tokenChange),this.filteredSearchInput.addEventListener("focus",this.addInputContainerFocusWrapper),this.tokensContainer.addEventListener("click",this.removeTokenWrapper),this.tokensContainer.addEventListener("click",this.editTokenWrapper),this.clearSearchButton.addEventListener("click",this.onClearSearchWrapper),document.addEventListener("click",this.unselectEditTokensWrapper),document.addEventListener("click",this.removeInputContainerFocusWrapper),document.addEventListener("keydown",this.removeSelectedTokenKeydownWrapper),h.$on("recentSearchesItemSelected",this.onrecentSearchesItemSelectedWrapper),this.bindStateEvents()}},{key:"unbindEvents",value:function(){this.filteredSearchInputForm.removeEventListener("submit",this.handleFormSubmit),this.filteredSearchInput.removeEventListener("input",this.setDropdownWrapper),this.filteredSearchInput.removeEventListener("input",this.toggleClearSearchButtonWrapper),this.filteredSearchInput.removeEventListener("input",this.handleInputPlaceholderWrapper),this.filteredSearchInput.removeEventListener("input",this.handleInputVisualTokenWrapper),this.filteredSearchInput.removeEventListener("keydown",this.checkForEnterWrapper),this.filteredSearchInput.removeEventListener("keyup",this.checkForBackspaceWrapper),this.filteredSearchInput.removeEventListener("click",this.tokenChange),this.filteredSearchInput.removeEventListener("keyup",this.tokenChange),this.filteredSearchInput.removeEventListener("focus",this.addInputContainerFocusWrapper),this.tokensContainer.removeEventListener("click",this.removeTokenWrapper),this.tokensContainer.removeEventListener("click",this.editTokenWrapper),this.clearSearchButton.removeEventListener("click",this.onClearSearchWrapper),document.removeEventListener("click",this.unselectEditTokensWrapper),document.removeEventListener("click",this.removeInputContainerFocusWrapper),document.removeEventListener("keydown",this.removeSelectedTokenKeydownWrapper),h.$off("recentSearchesItemSelected",this.onrecentSearchesItemSelectedWrapper),this.unbindStateEvents()}},{key:"checkForBackspace",value:function(){var e=this,t=0;return function(n){if(8===n.keyCode||46===n.keyCode){var r=L.a.getLastVisualTokenBeforeInput().lastVisualToken,a=D.a.getVisualTokenValues(r),i=a.tokenName,s=a.tokenValue,o=i&&e.canEdit&&e.canEdit(i,s);""===e.filteredSearchInput.value&&r&&o&&2===(t+=1)&&(t=0,e.filteredSearchInput.value=L.a.getLastTokenPartial(),L.a.removeLastTokenPartial()),e.dropdownManager.updateCurrentDropdownOffset()}else t=0}}},{key:"checkForEnter",value:function(e){if(38===e.keyCode||40===e.keyCode){var t=this.filteredSearchInput.selectionStart;e.preventDefault(),this.filteredSearchInput.setSelectionRange(t,t)}if(13===e.keyCode){var n=this.dropdownManager.mapping[this.dropdownManager.currentDropdown].element.querySelectorAll(".droplab-item-active");e.preventDefault(),n.length||(this.isHandledAsync?(e.stopImmediatePropagation(),this.filteredSearchInput.blur(),this.dropdownManager.resetDropdowns()):this.dropdownManager.destroyDroplab(),this.search())}}},{key:"addInputContainerFocus",value:function(){Object(C.a)(this.filteredSearchInput.closest(".filtered-search-box"),"focus")}},{key:"removeInputContainerFocus",value:function(e){var t=this.filteredSearchInput.closest(".filtered-search-box"),n=t&&t.contains(e.target),r=null!==e.target.closest(".filter-dropdown"),a=null!==e.target.closest("ul[data-dropdown]");n||r||a||!t||t.classList.remove("focus")}},{key:"removeToken",value:function(e){if(e.target.closest(".remove-token")){e.preventDefault(),e.stopImmediatePropagation();var t=e.target.closest(".selectable");L.a.selectToken(t,!0),this.removeSelectedToken()}}},{key:"unselectEditTokens",value:function(e){var t=this.container.querySelector(".filtered-search-box"),n=t&&t.contains(e.target),r=null!==e.target.closest(".filter-dropdown"),a=e.target.classList.contains("tokens-container");(!n&&!r||a)&&(L.a.moveInputToTheRight(),this.dropdownManager.resetDropdowns())}},{key:"editToken",value:function(e){var t=e.target.closest(".js-visual-token"),n=t&&t.querySelector(".name").textContent.trim(),r=this.canEdit&&this.canEdit(n);t&&r&&(e.preventDefault(),e.stopPropagation(),L.a.editToken(t),this.tokenChange())}},{key:"toggleClearSearchButton",value:function(){var e=D.a.getSearchQuery(),t=this.clearSearchButton.classList.contains("hidden");0!==e.length||t?e.length&&t&&this.clearSearchButton.classList.remove("hidden"):this.clearSearchButton.classList.add("hidden")}},{key:"handleInputPlaceholder",value:function(){var e=D.a.getSearchQuery(),t=this.filteredSearchInput.placeholder;0===e.length&&"Search or filter results..."!==t?this.filteredSearchInput.placeholder="Search or filter results...":e.length>0&&""!==t&&(this.filteredSearchInput.placeholder="")}},{key:"removeSelectedTokenKeydown",value:function(e){8!==e.keyCode&&46!==e.keyCode||this.removeSelectedToken()}},{key:"removeSelectedToken",value:function(){L.a.removeSelectedToken(),this.handleInputPlaceholder(),this.toggleClearSearchButton(),this.dropdownManager.updateCurrentDropdownOffset()}},{key:"onClearSearch",value:function(e){e.preventDefault(),this.clearSearch()}},{key:"clearSearch",value:function(){var e=this;this.filteredSearchInput.value="";var t=[];[].forEach.call(this.tokensContainer.children,function(n){var r=n.classList.contains("js-visual-token");if(r){var a=D.a.getVisualTokenValues(n),i=a.tokenName,s=a.tokenValue;r=e.canEdit&&e.canEdit(i,s)}r&&t.push(n)}),t.forEach(function(e){e.parentElement.removeChild(e)}),this.clearSearchButton.classList.add("hidden"),this.handleInputPlaceholder(),this.dropdownManager.resetDropdowns(),this.isHandledAsync&&this.search()}},{key:"handleInputVisualToken",value:function(){var e=this.filteredSearchInput,t=this.tokenizer.processTokens(e.value,this.filteredSearchTokenKeys.getKeys()),n=t.tokens,r=t.searchToken;if(L.a.getLastVisualTokenBeforeInput().isLastVisualTokenValid){n.forEach(function(t){e.value=e.value.replace(t.key+":"+t.symbol+t.value,""),L.a.addFilterVisualToken(t.key,""+t.symbol+t.value)});var i=r.split(":");if(i.length>1){var s=i[0].split(" "),o=a.a.last(s);if(s.length>1){s.pop();var c=s.join(" ");e.value=e.value.replace(c,""),L.a.addSearchVisualToken(c)}L.a.addFilterVisualToken(o),e.value=e.value.replace(o+":","")}}else{r.match(/([~%@]{0,1}".+")|([~%@]{0,1}'.+')|^((?![~%@]')(?![~%@]")(?!')(?!")).*/g)&&" "===e.value[e.value.length-1]&&(L.a.addFilterVisualToken(r),e.value=e.value.replace(r,"").trim())}}},{key:"handleFormSubmit",value:function(e){e.preventDefault(),this.search()}},{key:"saveCurrentSearchQuery",value:function(){var e=this;this.fetchingRecentSearchesPromise.then(function(){var t=D.a.getSearchQuery();if(t.length>0){var n=e.recentSearchesStore.addRecentSearch(t);e.recentSearchesService.save(n)}}).catch(function(){})}},{key:"getAllParams",value:function(e){return this.modifyUrlParams?this.modifyUrlParams(e):e}},{key:"loadSearchParamsFromURL",value:function(){var e=this,t=Object(i.m)(),n=this.getAllParams(t),r=this.getUsernameParams(),a=!1;n.forEach(function(t){var n=t.split("="),i=decodeURIComponent(n[0]),s=n[1],o=e.filteredSearchTokenKeys.searchByConditionUrl(t);if(o){a=!0;var c=e.canEdit&&e.canEdit(o.tokenKey);L.a.addFilterVisualToken(o.tokenKey,o.value,c)}else{var l=s?decodeURIComponent(s.replace(/\+/g," ")):s,u=e.filteredSearchTokenKeys.searchByKeyParam(i);if(u){var h=i.lastIndexOf("_"),d=-1!==h?i.slice(0,h):i;d=d.replace("_","-");var p=u.symbol,f="";-1!==l.indexOf(" ")&&(f=-1===l.indexOf('"')?'"':"'"),a=!0;var v=e.canEdit&&e.canEdit(d,l);L.a.addFilterVisualToken(d,""+p+f+l+f,v)}else if(u||"assignee_id"!==i)if(u||"author_id"!==i)u||"search"!==i||(a=!0,e.filteredSearchInput.value=l);else{var k=parseInt(s,10);if(r[k]){a=!0;var S=e.canEdit&&e.canEdit("author");L.a.addFilterVisualToken("author","@"+r[k],S)}}else{var m=parseInt(s,10);if(r[m]){a=!0;var g=e.canEdit&&e.canEdit("assignee");L.a.addFilterVisualToken("assignee","@"+r[m],g)}}}}),this.saveCurrentSearchQuery(),a&&(this.clearSearchButton.classList.remove("hidden"),this.handleInputPlaceholder())}},{key:"searchState",value:function(e){e.preventDefault();var t=e.currentTarget;t.blur();var n=t.dataset&&t.dataset.state;n&&this.search(n)}},{key:"search",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=[],r=D.a.getSearchQuery();this.saveCurrentSearchQuery();var a=this.tokenizer.processTokens(r,this.filteredSearchTokenKeys.getKeys()),o=a.tokens,c=a.searchToken,l=t||Object(i.j)("state")||"opened";if(n.push("state="+l),o.forEach(function(t){var r=e.filteredSearchTokenKeys.searchByConditionKeyValue(t.key,t.value.toLowerCase()),a=(e.filteredSearchTokenKeys.searchByKey(t.key)||{}).param,i=t.key.replace("-","_"),s=a?i+"_"+a:i,o="";if(r)o=r.url;else{var c=t.value;("'"===c[0]&&"'"===c[c.length-1]||'"'===c[0]&&'"'===c[c.length-1])&&(c=c.slice(1,c.length-1)),o=s+"="+encodeURIComponent(c)}n.push(o)}),c){var u=c.split(" ").map(function(e){return encodeURIComponent(e)}).join("+");n.push("search="+u)}var h="?scope=all&utf8=%E2%9C%93&"+n.join("&");this.updateObject?this.updateObject(h):Object(s.g)(h)}},{key:"getUsernameParams",value:function(){var e={};try{var t=this.filteredSearchInput.getAttribute("data-username-params");JSON.parse(t).forEach(function(t){e[t.id]=t.username})}catch(e){}return e}},{key:"tokenChange",value:function(){var e=this.dropdownManager.mapping[this.dropdownManager.currentDropdown];if(e){var t=e.reference;this.setDropdownWrapper(),t.dispatchInputEvent()}}},{key:"onrecentSearchesItemSelected",value:function(e){this.clearSearch(),this.filteredSearchInput.value=e,this.filteredSearchInput.dispatchEvent(new CustomEvent("input")),this.search()}},{key:"canEdit",value:function(){return!0}}]),e}();t.a=W},286:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var r=n(0),a=n.n(r);function i(){a()(".js-issue-status").each(function(e,t){var n=a()(t).data("fieldName");return a()(t).glDropdown({selectable:!0,fieldName:n,toggleLabel:function(e,t,n){var r="Author",a=n.dropdown.find(".is-active");return a.length&&(r=a.text()),r},clicked:function(e){return e.e.preventDefault()},id:function(e,t){return a()(t).data("id")}})})}},287:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var r=n(0),a=n.n(r);function i(){a()(".js-subscription-event").each(function(e,t){var n=a()(t).data("fieldName");return a()(t).glDropdown({selectable:!0,fieldName:n,toggleLabel:function(e,t,n){var r="Subscription",a=n.dropdown.find(".is-active");return a.length&&(r=a.text()),r},clicked:function(e){return e.e.preventDefault()},id:function(e,t){return a()(t).data("id")}})})}},299:function(e,t,n){"use strict";n.d(t,"a",function(){return r});var r={MERGE_REQUESTS:"merge_requests",ISSUES:"issues"}},300:function(e,t,n){"use strict";var r=n(201);t.a=function(e){var t=e.page,n=e.filteredSearchTokenKeys,a=e.isGroup,i=e.isGroupAncestor,s=e.isGroupDecendent,o=e.stateFiltersSelector;r.a&&document.querySelector(".filtered-search")&&new r.a({page:t,isGroup:a,isGroupAncestor:i,isGroupDecendent:s,filteredSearchTokenKeys:n,stateFiltersSelector:o}).setup()}},437:function(e,t,n){"use strict";var r=n(0),a=n.n(r),i=n(5),s=n(7),o=n(1),c=n(79),l=n(132),u=n(286),h=n(287),d=n(107),p=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var f=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.initDomElements(),this.bindEvents(),this.initDropdowns(),this.setupBulkUpdateActions()}return p(e,[{key:"initDomElements",value:function(){this.$page=a()(".layout-page"),this.$sidebar=a()(".right-sidebar"),this.$sidebarInnerContainer=this.$sidebar.find(".issuable-sidebar"),this.$bulkEditCancelBtn=a()(".js-bulk-update-menu-hide"),this.$bulkEditSubmitBtn=a()(".update-selected-issues"),this.$bulkUpdateEnableBtn=a()(".js-bulk-update-toggle"),this.$otherFilters=a()(".issues-other-filters"),this.$checkAllContainer=a()(".check-all-holder"),this.$issueChecks=a()(".issue-check"),this.$issuesList=a()(".selected_issue"),this.$issuableIdsInput=a()("#update_issuable_ids")}},{key:"bindEvents",value:function(){var e=this;this.$bulkUpdateEnableBtn.on("click",function(t){return e.toggleBulkEdit(t,!0)}),this.$bulkEditCancelBtn.on("click",function(t){return e.toggleBulkEdit(t,!1)}),this.$checkAllContainer.on("click",function(t){return e.selectAll(t)}),this.$issuesList.on("change",function(){return e.updateFormState()}),this.$bulkEditSubmitBtn.on("click",function(){return e.prepForSubmit()}),this.$checkAllContainer.on("click",function(){return e.updateFormState()})}},{key:"initDropdowns",value:function(){new d.a,new l.a,Object(u.a)(),Object(h.a)()}},{key:"setupBulkUpdateActions",value:function(){c.a.setOriginalDropdownData()}},{key:"updateFormState",value:function(){var e=!a()(".selected_issue:checked").length;this.toggleSubmitButtonDisabled(e),this.updateSelectedIssuableIds(),c.a.setOriginalDropdownData()}},{key:"prepForSubmit",value:function(){var e=this;setTimeout(function(){return e.$bulkEditSubmitBtn.disable()}),this.updateSelectedIssuableIds()}},{key:"toggleBulkEdit",value:function(e,t){e.preventDefault(),this.toggleSidebarDisplay(t),this.toggleBulkEditButtonDisabled(t),this.toggleOtherFiltersDisabled(t),this.toggleCheckboxDisplay(t)}},{key:"updateSelectedIssuableIds",value:function(){this.$issuableIdsInput.val(e.getCheckedIssueIds())}},{key:"selectAll",value:function(){var e=this.$checkAllContainer.find("input").prop("checked");this.$issuesList.prop("checked",e)}},{key:"toggleSidebarDisplay",value:function(e){this.$page.toggleClass("right-sidebar-expanded issuable-bulk-update-sidebar",e),this.$page.toggleClass("right-sidebar-collapsed issuable-bulk-update-sidebar",!e),this.$sidebarInnerContainer.toggleClass("hidden",!e),this.$sidebar.toggleClass("right-sidebar-expanded issuable-bulk-update-sidebar",e),this.$sidebar.toggleClass("right-sidebar-collapsed issuable-bulk-update-sidebar",!e)}},{key:"toggleBulkEditButtonDisabled",value:function(e){e?this.$bulkUpdateEnableBtn.disable():this.$bulkUpdateEnableBtn.enable()}},{key:"toggleCheckboxDisplay",value:function(e){this.$checkAllContainer.toggleClass("hidden",!e),this.$issueChecks.toggleClass("hidden",!e)}},{key:"toggleOtherFiltersDisabled",value:function(e){this.$otherFilters.toggleClass("disabled-content",e)}},{key:"toggleSubmitButtonDisabled",value:function(e){e?this.$bulkEditSubmitBtn.disable():this.$bulkEditSubmitBtn.enable()}}],[{key:"getCheckedIssueIds",value:function(){var e=a()(".selected_issue:checked");return e.length>0?a.a.map(e,function(e){return a()(e).data("id")}):[]}}]),e}(),v=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var k=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.initBulkUpdate(t),e.resetIncomingEmailToken()}return v(e,[{key:"initBulkUpdate",value:function(e){var t=a()(".issues-bulk-update").length>0,n=!!this.bulkUpdateSidebar;t&&!n&&(c.a.init({prefixId:e}),this.bulkUpdateSidebar=new f)}}],[{key:"resetIncomingEmailToken",value:function(){var e=a()(".incoming-email-token-reset");e.on("click",function(t){t.preventDefault(),e.text("resetting..."),i.a.put(e.attr("href")).then(function(t){var n=t.data;a()("#issuable_email").val(n.new_address).focus(),e.text("reset it")}).catch(function(){Object(s.a)(Object(o.a)("There was an error when reseting email token.")),e.text("reset it")})})}}]),e}();t.a=k},455:function(e,t,n){"use strict";n.d(t,"a",function(){return r});var r={MERGE_REQUEST:"merge_request_",ISSUE:"issue_"}},972:function(e,t,n){"use strict";n.r(t);var r=n(437),a=n(87),i=n(81),s=n(300),o=n(299),c=n(455);document.addEventListener("DOMContentLoaded",function(){Object(s.a)({page:o.a.ISSUES}),new r.a(c.a.ISSUE),new a.a,new i.a})},973:function(e,t,n){n(31),n(57),e.exports=n(972)}},[[973,0,1,2,7]]]);
//# sourceMappingURL=pages.projects.issues.index.5715fbd5.chunk.js.map