(this.webpackJsonp=this.webpackJsonp||[]).push([[17],{109:function(e,t,n){"use strict";var a={components:{loadingIcon:n(27).a},props:{loading:{type:Boolean,required:!1,default:!1},disabled:{type:Boolean,required:!1,default:!1},label:{type:String,required:!1},containerClass:{type:[String,Array,Object],required:!1,default:"btn btn-align-content"}},methods:{onClick:function(e){this.$emit("click",e)}}},i=n(2),r=Object(i.a)(a,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("button",{class:e.containerClass,attrs:{disabled:e.loading||e.disabled,type:"button"},on:{click:e.onClick}},[n("transition",{attrs:{name:"fade"}},[e.loading?n("loading-icon",{staticClass:"js-loading-button-icon",class:{"append-right-5":e.label},attrs:{inline:!0}}):e._e()],1),e._v(" "),n("transition",{attrs:{name:"fade"}},[e._t("default",[e.label?n("span",{staticClass:"js-loading-button-label"},[e._v("\n        "+e._s(e.label)+"\n      ")]):e._e()])],2)],1)},[],!1,null,null,null);t.a=r.exports},12:function(e,t,n){"use strict";var a=n(0),i=n.n(a);t.a={bind:function(e){i()(e).tooltip({trigger:"hover"})},componentUpdated:function(e){i()(e).tooltip("_fixTitle")},unbind:function(e){i()(e).tooltip("dispose")}}},15:function(e,t,n){"use strict";var a=[8,10,12,16,18,24,32,48,72],i={props:{name:{type:String,required:!0,validator:function(){return!0}},size:{type:Number,required:!1,default:16,validator:function(e){return a.includes(e)}},cssClasses:{type:String,required:!1,default:""},width:{type:Number,required:!1,default:null},height:{type:Number,required:!1,default:null},y:{type:Number,required:!1,default:null},x:{type:Number,required:!1,default:null},tabIndex:{type:String,required:!1,default:null}},computed:{spriteHref:function(){return gon.sprite_icons+"#"+this.name},iconTestClass:function(){return"ic-"+this.name},iconSizeClass:function(){return this.size?"s"+this.size:""}}},r=n(2),s=Object(r.a)(i,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("svg",{class:[e.iconSizeClass,e.iconTestClass,e.cssClasses],attrs:{width:e.width,height:e.height,x:e.x,y:e.y,tabindex:e.tabIndex}},[n("use",e._b({},"use",{"xlink:href":e.spriteHref},!1))])},[],!1,null,null,null);t.a=s.exports},302:function(e,t,n){"use strict";n.d(t,"a",function(){return a}),n.d(t,"b",function(){return i});var a="group",i="project"},508:function(e,t,n){"use strict";var a,i=n(8),r=n(14),s=n(7),d=n(1),o=n(95),l=n(15),c=n(27),g=n(12),u={name:"Badge",components:{Icon:l.a,LoadingIcon:c.a,Tooltip:g.a},directives:{Tooltip:g.a},props:{imageUrl:{type:String,required:!0},linkUrl:{type:String,required:!0}},data:function(){return{hasError:!1,isLoading:!0,numRetries:0}},computed:{imageUrlWithRetries:function(){return 0===this.numRetries?this.imageUrl:this.imageUrl+"#retries="+this.numRetries}},watch:{imageUrl:function(){this.hasError=!1,this.isLoading=!0,this.numRetries=0}},methods:{onError:function(){this.isLoading=!1,this.hasError=!0},onLoad:function(){this.isLoading=!1},reloadImage:function(){this.hasError=!1,this.isLoading=!0,this.numRetries+=1}}},m=n(2),b=Object(m.a)(u,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("a",{directives:[{name:"show",rawName:"v-show",value:!e.isLoading&&!e.hasError,expression:"!isLoading && !hasError"}],attrs:{href:e.linkUrl,target:"_blank",rel:"noopener noreferrer"}},[n("img",{staticClass:"project-badge",attrs:{src:e.imageUrlWithRetries,"aria-hidden":"true"},on:{load:e.onLoad,error:e.onError}})]),e._v(" "),n("loading-icon",{directives:[{name:"show",rawName:"v-show",value:e.isLoading,expression:"isLoading"}],attrs:{inline:!0}}),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.hasError,expression:"hasError"}],staticClass:"btn-group"},[n("div",{staticClass:"btn btn-default btn-sm disabled"},[n("icon",{staticClass:"prepend-left-8 append-right-8",attrs:{size:16,name:"doc-image","aria-hidden":"true"}})],1),e._v(" "),n("div",{staticClass:"btn btn-default btn-sm disabled"},[n("span",{staticClass:"prepend-left-8 append-right-8"},[e._v(e._s(e.s__("Badges|No badge image")))])])]),e._v(" "),n("button",{directives:[{name:"tooltip",rawName:"v-tooltip"},{name:"show",rawName:"v-show",value:e.hasError,expression:"hasError"}],staticClass:"btn btn-transparent btn-sm text-primary",attrs:{title:e.s__("Badges|Reload badge image"),type:"button"},on:{click:e.reloadImage}},[n("icon",{attrs:{size:16,name:"retry"}})],1)],1)},[],!1,null,null,null).exports,p=n(3),f=n.n(p),h=n(109),v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},_={name:"BadgeForm",components:{Badge:b,LoadingButton:h.a,LoadingIcon:c.a},props:{isEditing:{type:Boolean,required:!0}},computed:v({},Object(r.d)(["badgeInAddForm","badgeInEditForm","docsUrl","isRendering","isSaving","renderedBadge"]),{badge:function(){return this.isEditing?this.badgeInEditForm:this.badgeInAddForm},canSubmit:function(){return null!==this.badge&&this.badge.imageUrl&&""!==this.badge.imageUrl.trim()&&this.badge.linkUrl&&""!==this.badge.linkUrl.trim()&&!this.isSaving},helpText:function(){var e=["project_path","project_id","default_branch","commit_sha"].map(function(e){return"<code>%{"+e+"}</code>"}).join(", ");return Object(d.f)(Object(d.e)("Badges|The %{docsLinkStart}variables%{docsLinkEnd} GitLab supports: %{placeholders}"),{docsLinkEnd:"</a>",docsLinkStart:'<a href="'+f.a.escape(this.docsUrl)+'">',placeholders:e},!1)},renderedImageUrl:function(){return this.renderedBadge?this.renderedBadge.renderedImageUrl:""},renderedLinkUrl:function(){return this.renderedBadge?this.renderedBadge.renderedLinkUrl:""},imageUrl:{get:function(){return this.badge?this.badge.imageUrl:""},set:function(e){var t=this.badge||{imageUrl:"",isDeleting:!1,linkUrl:"",renderedImageUrl:"",renderedLinkUrl:""};this.updateBadgeInForm(v({},t,{imageUrl:e}))}},linkUrl:{get:function(){return this.badge?this.badge.linkUrl:""},set:function(e){var t=this.badge||{imageUrl:"",isDeleting:!1,linkUrl:"",renderedImageUrl:"",renderedLinkUrl:""};this.updateBadgeInForm(v({},t,{linkUrl:e}))}},submitButtonLabel:function(){return this.isEditing?Object(d.e)("Badges|Save changes"):Object(d.e)("Badges|Add badge")}}),methods:v({},Object(r.b)(["addBadge","renderBadge","saveBadge","stopEditing","updateBadgeInForm"]),{debouncedPreview:f.a.debounce(function(){this.renderBadge()},1500),onCancel:function(){this.stopEditing()},onSubmit:function(){return this.canSubmit?this.isEditing?this.saveBadge().then(function(){Object(s.a)(Object(d.e)("Badges|The badge was saved."),"notice")}).catch(function(e){throw Object(s.a)(Object(d.e)("Badges|Saving the badge failed, please check the entered URLs and try again.")),e}):this.addBadge().then(function(){Object(s.a)(Object(d.e)("Badges|A new badge was added."),"notice")}).catch(function(e){throw Object(s.a)(Object(d.e)("Badges|Adding the badge failed, please check the entered URLs and try again.")),e}):Promise.resolve()}}),badgeImageUrlPlaceholder:"https://example.gitlab.com/%{project_path}/badges/%{default_branch}/<badge>.svg",badgeLinkUrlPlaceholder:"https://example.gitlab.com/%{project_path}"},E=Object(m.a)(_,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("form",{staticClass:"prepend-top-default append-bottom-default",on:{submit:function(t){return t.preventDefault(),t.stopPropagation(),e.onSubmit(t)}}},[n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"badge-link-url"}},[e._v(e._s(e.s__("Badges|Link")))]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.linkUrl,expression:"linkUrl"}],staticClass:"form-control",attrs:{id:"badge-link-url",placeholder:e.$options.badgeLinkUrlPlaceholder,type:"text"},domProps:{value:e.linkUrl},on:{input:[function(t){t.target.composing||(e.linkUrl=t.target.value)},e.debouncedPreview]}}),e._v(" "),n("span",{staticClass:"form-text text-muted",domProps:{innerHTML:e._s(e.helpText)}})]),e._v(" "),n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"badge-image-url"}},[e._v(e._s(e.s__("Badges|Badge image URL")))]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.imageUrl,expression:"imageUrl"}],staticClass:"form-control",attrs:{id:"badge-image-url",placeholder:e.$options.badgeImageUrlPlaceholder,type:"text"},domProps:{value:e.imageUrl},on:{input:[function(t){t.target.composing||(e.imageUrl=t.target.value)},e.debouncedPreview]}}),e._v(" "),n("span",{staticClass:"form-text text-muted",domProps:{innerHTML:e._s(e.helpText)}})]),e._v(" "),n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"badge-preview"}},[e._v(e._s(e.s__("Badges|Badge image preview")))]),e._v(" "),n("badge",{directives:[{name:"show",rawName:"v-show",value:e.renderedBadge&&!e.isRendering,expression:"renderedBadge && !isRendering"}],attrs:{id:"badge-preview","image-url":e.renderedImageUrl,"link-url":e.renderedLinkUrl}}),e._v(" "),n("p",{directives:[{name:"show",rawName:"v-show",value:e.isRendering,expression:"isRendering"}]},[n("loading-icon",{attrs:{inline:!0}})],1),e._v(" "),n("p",{directives:[{name:"show",rawName:"v-show",value:!e.renderedBadge&&!e.isRendering,expression:"!renderedBadge && !isRendering"}],staticClass:"disabled-content"},[e._v(e._s(e.s__("Badges|No image to preview")))])],1),e._v(" "),n("div",{staticClass:"row-content-block"},[n("loading-button",{attrs:{disabled:!e.canSubmit,loading:e.isSaving,label:e.submitButtonLabel,type:"submit","container-class":"btn btn-success"}}),e._v(" "),e.isEditing?n("button",{staticClass:"btn btn-cancel",attrs:{type:"button"},on:{click:e.onCancel}},[e._v(e._s(e.__("Cancel")))]):e._e()],1)])},[],!1,null,null,null).exports,B=n(302),U=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},w={name:"BadgeListRow",components:{Badge:b,Icon:l.a,LoadingIcon:c.a},props:{badge:{type:Object,required:!0}},computed:U({},Object(r.d)(["kind"]),{badgeKindText:function(){return this.badge.kind===B.b?Object(d.e)("Badges|Project Badge"):Object(d.e)("Badges|Group Badge")},canEditBadge:function(){return this.badge.kind===this.kind}}),methods:U({},Object(r.b)(["editBadge","updateBadgeInModal"]))},O=Object(m.a)(w,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"gl-responsive-table-row-layout gl-responsive-table-row"},[n("badge",{staticClass:"table-section section-30",attrs:{"image-url":e.badge.renderedImageUrl,"link-url":e.badge.renderedLinkUrl}}),e._v(" "),n("span",{staticClass:"table-section section-50 str-truncated"},[e._v(e._s(e.badge.linkUrl))]),e._v(" "),n("div",{staticClass:"table-section section-10"},[n("span",{staticClass:"badge"},[e._v(e._s(e.badgeKindText))])]),e._v(" "),n("div",{staticClass:"table-section section-10 table-button-footer"},[e.canEditBadge?n("div",{staticClass:"table-action-buttons"},[n("button",{staticClass:"btn btn-default append-right-8",attrs:{disabled:e.badge.isDeleting,type:"button"},on:{click:function(t){e.editBadge(e.badge)}}},[n("icon",{attrs:{size:16,"aria-label":e.__("Edit"),name:"pencil"}})],1),e._v(" "),n("button",{staticClass:"btn btn-danger",attrs:{disabled:e.badge.isDeleting,type:"button","data-toggle":"modal","data-target":"#delete-badge-modal"},on:{click:function(t){e.updateBadgeInModal(e.badge)}}},[n("icon",{attrs:{size:16,"aria-label":e.__("Delete"),name:"remove"}})],1),e._v(" "),n("loading-icon",{directives:[{name:"show",rawName:"v-show",value:e.badge.isDeleting,expression:"badge.isDeleting"}],attrs:{inline:!0}})],1):e._e()])],1)},[],!1,null,null,null).exports,j=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},C={name:"BadgeList",components:{BadgeListRow:O,LoadingIcon:c.a},computed:j({},Object(r.d)(["badges","isLoading","kind"]),{hasNoBadges:function(){return!(this.isLoading||this.badges&&this.badges.length)},isGroupBadge:function(){return this.kind===B.a}})},k=Object(m.a)(C,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"card"},[n("div",{staticClass:"card-header"},[e._v("\n    "+e._s(e.s__("Badges|Your badges"))+"\n    "),n("span",{directives:[{name:"show",rawName:"v-show",value:!e.isLoading,expression:"!isLoading"}],staticClass:"badge"},[e._v(e._s(e.badges.length))])]),e._v(" "),n("loading-icon",{directives:[{name:"show",rawName:"v-show",value:e.isLoading,expression:"isLoading"}],staticClass:"card-body",attrs:{size:"2"}}),e._v(" "),e.hasNoBadges?n("div",{staticClass:"card-body"},[e.isGroupBadge?n("span",[e._v(e._s(e.s__("Badges|This group has no badges")))]):n("span",[e._v(e._s(e.s__("Badges|This project has no badges")))])]):n("div",{staticClass:"card-body"},e._l(e.badges,function(e){return n("badge-list-row",{key:e.id,attrs:{badge:e}})}))],1)},[],!1,null,null,null).exports,I=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},R={name:"BadgeSettings",components:{Badge:b,BadgeForm:E,BadgeList:k,GlModal:o.a},computed:I({},Object(r.d)(["badgeInModal","isEditing"]),{deleteModalText:function(){return Object(d.e)("Badges|You are going to delete this badge. Deleted badges <strong>cannot</strong> be restored.")}}),methods:I({},Object(r.b)(["deleteBadge"]),{onSubmitModal:function(){this.deleteBadge(this.badgeInModal).then(function(){Object(s.a)(Object(d.e)("Badges|The badge was deleted."),"notice")}).catch(function(e){throw Object(s.a)(Object(d.e)("Badges|Deleting the badge failed, please try again.")),e})}})},y=Object(m.a)(R,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"badge-settings"},[n("gl-modal",{attrs:{id:"delete-badge-modal","header-title-text":e.s__("Badges|Delete badge?"),"footer-primary-button-text":e.s__("Badges|Delete badge"),"footer-primary-button-variant":"danger"},on:{submit:e.onSubmitModal}},[n("div",{staticClass:"well"},[n("badge",{attrs:{"image-url":e.badgeInModal?e.badgeInModal.renderedImageUrl:"","link-url":e.badgeInModal?e.badgeInModal.renderedLinkUrl:""}})],1),e._v(" "),n("p",{domProps:{innerHTML:e._s(e.deleteModalText)}})]),e._v(" "),n("badge-form",{directives:[{name:"show",rawName:"v-show",value:e.isEditing,expression:"isEditing"}],attrs:{"is-editing":!0}}),e._v(" "),n("badge-form",{directives:[{name:"show",rawName:"v-show",value:!e.isEditing,expression:"!isEditing"}],attrs:{"is-editing":!1}}),e._v(" "),n("badge-list",{directives:[{name:"show",rawName:"v-show",value:!e.isEditing,expression:"!isEditing"}]})],1)},[],!1,null,null,null).exports,L=n(5),D="RECEIVE_DELETE_BADGE",x="RECEIVE_DELETE_BADGE_ERROR",S="RECEIVE_LOAD_BADGES",T="RECEIVE_LOAD_BADGES_ERROR",N="RECEIVE_NEW_BADGE",A="RECEIVE_NEW_BADGE_ERROR",P="RECEIVE_RENDERED_BADGE",q="RECEIVE_RENDERED_BADGE_ERROR",G="RECEIVE_UPDATED_BADGE",M="RECEIVE_UPDATED_BADGE_ERROR",F="REQUEST_DELETE_BADGE",$="REQUEST_LOAD_BADGES",z="REQUEST_NEW_BADGE",V="REQUEST_RENDERED_BADGE",H="REQUEST_UPDATED_BADGE",Q="START_EDITING",W="STOP_EDITING",J="UPDATE_BADGE_IN_FORM",K="UPDATE_BADGE_IN_MODAL",Y=function(e){return{id:e.id,imageUrl:e.image_url,kind:e.kind,linkUrl:e.link_url,renderedImageUrl:e.rendered_image_url,renderedLinkUrl:e.rendered_link_url,isDeleting:!1}},X={requestNewBadge:function(e){(0,e.commit)(z)},receiveNewBadge:function(e,t){(0,e.commit)(N,t)},receiveNewBadgeError:function(e){(0,e.commit)(A)},addBadge:function(e){var t=e.dispatch,n=e.state,a=n.badgeInAddForm,i=n.apiEndpointUrl;return t("requestNewBadge"),L.a.post(i,{image_url:a.imageUrl,link_url:a.linkUrl}).catch(function(e){throw t("receiveNewBadgeError"),e}).then(function(e){t("receiveNewBadge",Y(e.data))})},requestDeleteBadge:function(e,t){(0,e.commit)(F,t)},receiveDeleteBadge:function(e,t){(0,e.commit)(D,t)},receiveDeleteBadgeError:function(e,t){(0,e.commit)(x,t)},deleteBadge:function(e,t){var n=e.dispatch,a=e.state,i=t.id;n("requestDeleteBadge",i);var r=a.apiEndpointUrl+"/"+i;return L.a.delete(r).catch(function(e){throw n("receiveDeleteBadgeError",i),e}).then(function(){n("receiveDeleteBadge",i)})},editBadge:function(e,t){(0,e.commit)(Q,t)},requestLoadBadges:function(e,t){(0,e.commit)($,t)},receiveLoadBadges:function(e,t){(0,e.commit)(S,t)},receiveLoadBadgesError:function(e){(0,e.commit)(T)},loadBadges:function(e,t){var n=e.dispatch,a=e.state;n("requestLoadBadges",t);var i=a.apiEndpointUrl;return L.a.get(i).catch(function(e){throw n("receiveLoadBadgesError"),e}).then(function(e){n("receiveLoadBadges",e.data.map(Y))})},requestRenderedBadge:function(e){(0,e.commit)(V)},receiveRenderedBadge:function(e,t){(0,e.commit)(P,t)},receiveRenderedBadgeError:function(e){(0,e.commit)(q)},renderBadge:function(e){var t=e.dispatch,n=e.state,a=n.isEditing?n.badgeInEditForm:n.badgeInAddForm,i=a.linkUrl,r=a.imageUrl;if(!i||""===i.trim()||!r||""===r.trim())return Promise.resolve(a);t("requestRenderedBadge");var s=["link_url="+encodeURIComponent(i),"image_url="+encodeURIComponent(r)].join("&"),d=n.apiEndpointUrl+"/render?"+s;return L.a.get(d).catch(function(e){throw t("receiveRenderedBadgeError"),e}).then(function(e){t("receiveRenderedBadge",Y(e.data))})},requestUpdatedBadge:function(e){(0,e.commit)(H)},receiveUpdatedBadge:function(e,t){(0,e.commit)(G,t)},receiveUpdatedBadgeError:function(e){(0,e.commit)(M)},saveBadge:function(e){var t=e.dispatch,n=e.state,a=n.badgeInEditForm,i=n.apiEndpointUrl+"/"+a.id;return t("requestUpdatedBadge"),L.a.put(i,{image_url:a.imageUrl,link_url:a.linkUrl}).catch(function(e){throw t("receiveUpdatedBadgeError"),e}).then(function(e){t("receiveUpdatedBadge",Y(e.data))})},stopEditing:function(e){(0,e.commit)(W)},updateBadgeInForm:function(e,t){(0,e.commit)(J,t)},updateBadgeInModal:function(e,t){(0,e.commit)(K,t)}},Z=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e};function ee(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var te=function(e){return e.sort(function(e,t){return e.kind!==t.kind?e.kind===B.b?1:-1:e.id-t.id})},ne=(ee(a={},N,function(e,t){Object.assign(e,{badgeInAddForm:null,badges:te(e.badges.concat(t)),isSaving:!1,renderedBadge:null})}),ee(a,A,function(e){Object.assign(e,{isSaving:!1})}),ee(a,z,function(e){Object.assign(e,{isSaving:!0})}),ee(a,G,function(e,t){var n=e.badges.map(function(e){return e.id===t.id?t:e});Object.assign(e,{badgeInEditForm:null,badges:n,isEditing:!1,isSaving:!1,renderedBadge:null})}),ee(a,M,function(e){Object.assign(e,{isSaving:!1})}),ee(a,H,function(e){Object.assign(e,{isSaving:!0})}),ee(a,S,function(e,t){Object.assign(e,{badges:te(t),isLoading:!1})}),ee(a,T,function(e){Object.assign(e,{isLoading:!1})}),ee(a,$,function(e,t){Object.assign(e,{kind:t.kind,apiEndpointUrl:t.apiEndpointUrl,docsUrl:t.docsUrl,isLoading:!0})}),ee(a,D,function(e,t){var n=e.badges.filter(function(e){return e.id!==t});Object.assign(e,{badges:n})}),ee(a,x,function(e,t){var n=e.badges.map(function(e){return e.id===t?Z({},e,{isDeleting:!1}):e});Object.assign(e,{badges:n})}),ee(a,F,function(e,t){var n=e.badges.map(function(e){return e.id===t?Z({},e,{isDeleting:!0}):e});Object.assign(e,{badges:n})}),ee(a,P,function(e,t){Object.assign(e,{isRendering:!1,renderedBadge:t})}),ee(a,q,function(e){Object.assign(e,{isRendering:!1})}),ee(a,V,function(e){Object.assign(e,{isRendering:!0})}),ee(a,Q,function(e,t){Object.assign(e,{badgeInEditForm:Z({},t),isEditing:!0,renderedBadge:Z({},t)})}),ee(a,W,function(e){Object.assign(e,{badgeInEditForm:null,isEditing:!1,renderedBadge:null})}),ee(a,J,function(e,t){e.isEditing?Object.assign(e,{badgeInEditForm:t}):Object.assign(e,{badgeInAddForm:t})}),ee(a,K,function(e,t){Object.assign(e,{badgeInModal:t})}),a);i.default.use(r.a);var ae=new r.a.Store({state:{apiEndpointUrl:null,badgeInAddForm:null,badgeInEditForm:null,badgeInModal:null,badges:[],docsUrl:null,renderedBadge:null,isEditing:!1,isLoading:!1,isRendering:!1,isSaving:!1},actions:X,mutations:ne});t.a=function(e){var t=document.getElementById("badge-settings");return ae.dispatch("loadBadges",{kind:e,apiEndpointUrl:t.dataset.apiEndpointUrl,docsUrl:t.dataset.docsUrl}),new i.default({el:t,store:ae,components:{BadgeSettings:y},render:function(e){return e(y)}})}},95:function(e,t,n){"use strict";var a=n(0),i=n.n(a),r=["danger","primary","success","warning"],s=["sm","md","lg","xl"],d={name:"GlModal",props:{id:{type:String,required:!1,default:null},modalSize:{type:String,required:!1,default:"md",validator:function(e){return s.includes(e)}},headerTitleText:{type:String,required:!1,default:""},footerPrimaryButtonVariant:{type:String,required:!1,default:"primary",validator:function(e){return r.includes(e)}},footerPrimaryButtonText:{type:String,required:!1,default:""}},computed:{modalSizeClass:function(){return"md"===this.modalSize?"":"modal-"+this.modalSize}},mounted:function(){i()(this.$el).on("shown.bs.modal",this.opened).on("hidden.bs.modal",this.closed)},beforeDestroy:function(){i()(this.$el).off("shown.bs.modal",this.opened).off("hidden.bs.modal",this.closed)},methods:{emitCancel:function(e){this.$emit("cancel",e)},emitSubmit:function(e){this.$emit("submit",e)},opened:function(){this.$emit("open")},closed:function(){this.$emit("closed")}}},o=n(2),l=Object(o.a)(d,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"modal fade",attrs:{id:e.id,tabindex:"-1",role:"dialog"}},[n("div",{staticClass:"modal-dialog",class:e.modalSizeClass,attrs:{role:"document"}},[n("div",{staticClass:"modal-content"},[n("div",{staticClass:"modal-header"},[e._t("header",[n("h4",{staticClass:"modal-title"},[e._t("title",[e._v("\n              "+e._s(e.headerTitleText)+"\n            ")])],2),e._v(" "),n("button",{staticClass:"close js-modal-close-action",attrs:{"aria-label":e.s__("Modal|Close"),type:"button","data-dismiss":"modal"},on:{click:function(t){e.emitCancel(t)}}},[n("span",{attrs:{"aria-hidden":"true"}},[e._v("×")])])])],2),e._v(" "),n("div",{staticClass:"modal-body"},[e._t("default")],2),e._v(" "),n("div",{staticClass:"modal-footer"},[e._t("footer",[n("button",{staticClass:"btn js-modal-cancel-action",attrs:{type:"button","data-dismiss":"modal"},on:{click:function(t){e.emitCancel(t)}}},[e._v("\n            "+e._s(e.s__("Modal|Cancel"))+"\n          ")]),e._v(" "),n("button",{staticClass:"btn js-modal-primary-action",class:"btn-"+e.footerPrimaryButtonVariant,attrs:{type:"button","data-dismiss":"modal"},on:{click:function(t){e.emitSubmit(t)}}},[e._v("\n            "+e._s(e.footerPrimaryButtonText)+"\n          ")])])],2)])])])},[],!1,null,null,null);t.a=l.exports}}]);
//# sourceMappingURL=commons~pages.groups.settings.badges~pages.projects.settings.badges.index.557ba802.chunk.js.map