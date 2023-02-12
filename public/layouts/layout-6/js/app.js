"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_createClass=function(){function a(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(t,e,n){return e&&a(t.prototype,e),n&&a(t,n),t}}();function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}window.formatMoney=function(t){return parseInt(t).formatMoney()},Number.prototype.formatMoney=function(t){var e=this,n=isNaN(n=Math.abs(n))?0:n,a=null==a?".":a,i=(t=null==t?",":t,e<0?"-":""),o=String(parseInt(e=Math.abs(Number(e)||0).toFixed(n))),s=3<(s=o.length)?s%3:0;return i+(s?o.substr(0,s)+t:"")+o.substr(s).replace(/(\d{3})(?=\d)/g,"$1"+t)+(n?a+Math.abs(e-o).toFixed(n).slice(2):"")},Number.prototype.num=function(){return this.formatMoney(",")},String.prototype.unNum=function(t){var e;return void 0!==t&&(e=parseFloat(this.replace(t,""))),e=parseFloat(this.replace(/,/g,"")),isNaN(e)&&(e=0),e},window.getConfig=function(t,e){var n={};for(var a in void 0===t&&(t={}),e)n[a]=e[a],void 0!==t[a]&&(n[a]=t[a]);return n},window.copyToClipboard=function(t){var e,n=!0,a=document.createRange();if(window.clipboardData)window.clipboardData.setData("Text",t);else{var i=$("<div>");i.css({position:"absolute",left:"-1000px",top:"-1000px"}),i.text(t),$("body").append(i),a.selectNodeContents(i.get(0)),(e=window.getSelection()).removeAllRanges(),e.addRange(a);try{n=document.execCommand("copy",!1,null)}catch(t){}n&&i.remove()}},$(".input-datepicker").datepicker({autoclose:!0,templates:{leftArrow:'<i class="fas fa-angle-left"></i>',rightArrow:'<i class="fas fa-angle-right"></i>'},format:"yyyy-mm-dd"}),$(".input-timepicker").clockpicker(),$(".clockpicker").clockpicker(),$(".date-timepicker .input-datepicker").on("change",function(t){$(this).closest(".date-timepicker").find(".input-timepicker").focus()}),$(".input-datetimepicker").each(function(t){var e=$(this).val(),n="",a="";1<e.split(" ").length&&(n=e.split(" ")[0],a=e.split(" ")[1]);var i=$(this).data("placement")||"bottom",o=$(this).data("align")||"left";$(this).parent().append('\n\t\t<input type="text" class="form-control input-datetimepicker-date" value="'+n+'">\n\t\t<input type="text" class="form-control input-datetimepicker-time" data-placement="'+i+'" data-align="'+o+'" data-autoclose="true" value="'+a+'">\n\t');var s=$(this).parent().find(".input-datetimepicker-date"),r=$(this).parent().find(".input-datetimepicker-time");s.datepicker({autoclose:!0,templates:{leftArrow:'<i class="fas fa-angle-left"></i>',rightArrow:'<i class="fas fa-angle-right"></i>'},format:s.data("format")||"yyyy-mm-dd"}),r.clockpicker()}),$(".input-datetimepicker").each(function(t){var e=$(this),i=e.parent().find(".input-datetimepicker-date"),o=e.parent().find(".input-datetimepicker-time");i.on("change",function(){e.val(i.val()+" "+o.val()),o.clockpicker("show")}),o.on("change",function(){e.val(i.val()+" "+o.val())}),e.on("focus",function(t){i.datepicker("show")}),e.on("change",function(t){var e=$(this).val(),n="",a="";1<e.split(" ").length&&(n=e.split(" ")[0],a=e.split(" ")[1],o.val(a),i.val(n).datepicker("setDate",n))})});var PRETTY_SELECTORS=[],PrettySelector=function(){function a(t,e,n){_classCallCheck(this,a),this.el=t,this.original_el=this.el.prev(),this.original_options=e,this.options=this.setOptions(this.original_el,e),this.triggerChangeAtInit=!1,this.instanceNumber=n,this.selectedItems={},this.original_el.hide(),this.prepareOriginalSelectBox(),this.build(),this.setEventListeners(),this.update()}return _createClass(a,[{key:"setOptions",value:function(i,t){return $.extend({el:i,template:!1,name:i.attr("name")||"selector",items:function(){for(var t=i.find("option"),e=[],n=0;n<t.length;n++){var a=$(t[n]);e.push({originalOption:a,value:a.attr("value")?a.attr("value"):a.text().trim(),label:a.text().trim(),isSelected:!(!a.prop("selected")&&!a.attr("selected")),isDisabled:a.prop("disabled"),image:a.attr("image"),icon:a.attr("icon")})}return e}(),separator:i.attr("separator")||", ",placeholder:i.attr("placeholder")||"Select one",color:i.data("color")||"light",multiple:void 0!==i.attr("multiple")},t)}},{key:"prepareOriginalSelectBox",value:function(){this.original_el.find("option").each(function(){var t=$(this);t.attr("value")||t.attr("value",t.text()),t.attr("selected")&&t.removeAttr("selected").prop("selected",!0)})}},{key:"build",value:function(){var t=void 0;t=this.buildOptions();var e='\n\t\t\t<div class="dropdown dropdown-select dropdown-select-'+this.options.color+' btn-block p-0">\n\t\t\t\t<button class="btn btn-'+this.options.color+' dropdown-toggle" id="customSelectorDropdown-'+this.instanceNumber+"-"+this.options.name+'" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n\t\t\t\t\t'+this.options.placeholder+'\n\t\t\t\t</button>\n\t\t\t\t<div class="dropdown-menu" aria-labelledby="customSelectorDropdown-'+this.options.name+'">\n\t\t\t\t\t'+t.join("\n")+"\n\t\t\t\t</div>\n\t\t\t</div>";this.el.html(e)}},{key:"buildOptions",value:function(){for(var t=[],e=0;e<this.options.items.length;e++){var n=this.options.items[e];t.push(this.template(n))}return t}},{key:"template",value:function(t){return this.options.template?this.options.template(t):'\n\t\t<div class="dropdown-item">\n\t\t\t<button type="button" data-value="'+t.value+'" data-label="'+t.label+'" '+(t.isDisabled?"disabled":"")+' class="button btn btn-block'+(t.isSelected&&!t.isDisabled?" active":"")+'">\n\t\t\t\t'+this.image(t)+"\n\t\t\t\t"+this.icon(t)+'\n\t\t\t\t<span class="content">'+t.label+"</span>\n\t\t\t</button>\n\t\t</div>"}},{key:"image",value:function(t){return void 0!==t.image?'\n\t\t\t\t\t\t<div class="avatar-group select-thumbnail">\n\t\t\t\t\t\t\t<a href="#" class="avatar avatar-sm">\n\t\t\t\t\t\t\t\t<img alt="Option image" src="'+t.image+'" class="rounded-circle">\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</div>':""}},{key:"icon",value:function(t){return void 0!==t.icon?'<i class="'+t.icon+'"></i>':""}},{key:"update",value:function(){var a=this,t=this.original_el.find("option:selected, option[selected]");this.el.find(".dropdown-item .button.active").removeClass("active"),this.selectedItems={},a.options.multiple||(t=this.original_el.find("option:selected, option[selected]").prop("selected",!1).last().prop("selected",!0)),t.each(function(){var t=$(this),e=t.attr("value"),n=t.text().trim();a.el.find('.dropdown-item .button[data-value="'+e+'"]').addClass("active"),a.options.multiple||(a.el.find('.dropdown-item .button[data-value="'+e+'"]').addClass("active"),a.selectedItems={}),a.selectedItems[e]=n});var e=[],n=[];for(var i in this.selectedItems){var o=this.selectedItems[i];!1!==o&&(e.push(o.trim()),n.push(i))}this.el.find(".dropdown-toggle").text(0==e.length?this.options.placeholder:e.join(this.options.separator)),this.original_el.trigger("change.customselect",[this.options.multiple?n:n[0]])}},{key:"setEventListeners",value:function(){var i=this;this.original_el.on("change",function(t){i.update()}),this.el.find(".dropdown-select .dropdown-item>.button").on("click",function(t){var e=$(this),n=e.data("value"),a=i.original_el.find("option[value='"+n+"']");i.options.multiple?e.hasClass("active")?a.prop("selected",!1):a.prop("selected",!0):(i.original_el.find("option:selected").prop("selected",!1),a.prop("selected",!0)),i.original_el.trigger("change"),i.update()}),i.options.multiple&&this.el.find(".dropdown-menu").on("click",function(t){return t.stopPropagation()}),this.triggerChangeAtInit&&this.original_el.trigger("change")}},{key:"dispose",value:function(){this.original_el.show(),PRETTY_SELECTORS[this.original_el.data("instance-index")]=void 0,PRETTY_SELECTORS=PRETTY_SELECTORS.filter(function(t){return void 0!==t}),this.el.detach()}},{key:"reset",value:function(){var t=this.original_el.data("instance-index");this.el.detach(),this.original_el.after('<div class="pretty-selector-el"></div>'),PRETTY_SELECTORS[t]=new a(this.original_el.next(),this.original_options||{},t)}}],[{key:"init",value:function(t,e){t.after('<div class="pretty-selector-el"></div>'),t.data("instance-index",PRETTY_SELECTORS.length);var n=new a(t.next(),e||{},PRETTY_SELECTORS.length);PRETTY_SELECTORS.push(n)}}]),a}(),prettySelectorElements=$("[data-toggle='selector']");!function(l){var c={update:!0,dispose:!0,reset:!0};l.fn.selector=function(o,s){var r=this;return this.each(function(t,e){var n=l(e);if(c[o]){var a=o,i=PRETTY_SELECTORS[n.data("instance-index")];return i&&i[a](s),r}if("object"!==(void 0===o?"undefined":_typeof(o))&&o)throw new TypeError('Method named "'+o+'" does not exist on jQuery.prettySelector');return PrettySelector.init(n,o),r})}}(jQuery),$(document).ready(function(){$("[data-toggle='class']").on("click",function(t){t.preventDefault();var e=$(this).data("target")||$(this).attr("href");(e=e&&"self"!=e?"parent"==e?$(this).parent():$($(this).data("target")||$(this).attr("href")):$(this)).toggleClass($(this).data("class")),e.trigger("toggled.class",[$(this).data("class")])})}),$(document).ready(function(){$(".table-checkbox-all").on("change",function(t){var e=$(this).closest("table").find("td .custom-checkbox");$(this).is(":checked")?e.checkboxes("check"):e.checkboxes("uncheck"),e.find("input").trigger("change")}),$(".table-checklist-toggler>tbody>tr").on("click",function(t){t.preventDefault();var e=$(this).find("input[type='checkbox']");e.is(":checked")?e.prop("checked",!1):e.prop("checked",!0),e.trigger("change")}),$(".table-checklist-toggler>tbody>tr input[type='checkbox']").on("change",function(t){$(this).is(":checked")?$(this).closest("tr").addClass("row-selected"):$(this).closest("tr").removeClass("row-selected")}),$("[data-toggle='checkbox']").on("click",function(t){$(this).is("input")||t.preventDefault();var e=$($(this).data("target")),n=$(this).data("value");"toggle"==n?e.checkboxes("toggle"):(n=void 0===n?$(this).is(":checked"):n,e.find("input").prop("checked",n)),e.find("input").trigger("change")})}),$(document).ready(function(){$(".table-accordion .accordian-body").on("show.bs.collapse",function(t){$(this).closest("table").find(".collapse.show").not(this).collapse("toggle")})}),$(document).ready(function(){$(".smooth-link").on("click",function(t){var e=$($(this).attr("href"));$("html, body").animate({scrollTop:e.offset().top},500)})}),$(document).ready(function(){$(".input-group-password-toggle .btn-password-toggle").on("click",function(t){var e=$(this).closest(".input-group-password-toggle");$(this).hasClass("seeing")?(e.find("input").attr("type","password"),$(this).removeClass("seeing")):(e.find("input").attr("type","text"),$(this).addClass("seeing"))})}),$(document).ready(function(){$(".form-group-material .form-control").on("blur",function(t){var e=$(this).closest(".form-group-material");0<$(this).val().length?e.addClass("filled"):e.hasClass("filled")&&e.removeClass("filled")}).trigger("blur")});var LineChart=function(){function i(t,e,n){for(var a in _classCallCheck(this,i),this.options={height:"200px",width:"100%",circle_fill:"red",stroke_color:"rgb(255, 0, 0)",stroke_width:"2px",circle_radius:"3px"},this.el=t,this.data=e,this.builtData=[],this.svgData=[],this.options)void 0!==n[a]&&(this.options[a]=n[a]);this.buildData(),this.buildSvg()}return _createClass(i,[{key:"buildData",value:function(){for(var t=Math.max.apply(Math,this.data),e=.8*Math.min.apply(Math,this.data),n=e-.05*(t-e),a=(100/(t+.05*(t-e)-n)).toFixed(2),i=(100/(this.data.length-1)).toFixed(2),o=0;o<this.data.length;o++){var s=this.data[o]-n,r={x:(o*i).toFixed(2),y:(s*a).toFixed(2)};this.builtData.push(r)}}},{key:"buildSvg",value:function(){this.lines=[],this.circles=[];for(var t={},e=0;e<this.builtData.length-1;e++){var n=this.builtData[e];t={cx:n.x,cy:n.y,x1:n.x,y1:n.y,x2:this.builtData[e+1].x,y2:this.builtData[e+1].y},this.svgData.push(t),this.lines.push(['<line x1="'+t.x1+'%" y1="'+t.y1+'%" x2="'+t.x2+'%" y2="'+t.y2+'%" style="stroke: '+this.options.stroke_color+" ; stroke-width: "+this.options.stroke_width+' ;" />']),this.circles.push(['<circle cx="'+t.cx+'%" cy="'+t.cy+'%" r="'+this.options.circle_radius+'" fill="'+this.options.circle_fill+'"/>\n\t\t\t\t <circle cx="'+t.cx+'%" cy="'+t.cy+'%" r="15px" fill="transparent" title="'+this.data[e]+'"/>'])}this.circles.push(['<circle cx="'+t.x2+'%" cy="'+t.y2+'%" r="'+this.options.circle_radius+'" fill="'+this.options.circle_fill+'"/>\n\t\t\t <circle cx="'+t.cx+'%" cy="'+t.cy+'%" r="15px" fill="transparent" title="'+this.data[this.builtData.length-1]+'"/>']),this.svg=this.lines.concat(this.circles)}},{key:"build",value:function(){this.el.html('\n\t\t<svg height="'+this.options.height+'" width="'+this.options.width+'" style="transform: scaleY(-1);">\n\t\t\t'+this.svg.join("")+"\n\t\t</svg>\n\t\t"),this.el.find("circle,line").tooltip()}}]),i}();window.setRadialProgreeBarValue=function(t){t.each(function(){var t=$(this),e=t.find("svg path:last-child"),n=e[0].getTotalLength(),a=parseFloat(t.attr("data-value")),i=n*((100-(a=isNaN(a)||100<a||a<0?0:a))/100);e[0].getBoundingClientRect(),e.css({strokeDashoffset:i})})},function(){function a(t){t.removeClass("show dropdown-menu-start dropdown-menu-right").find(".dropdown-menu").removeClass("dropdown-menu-start dropdown-menu-right")}$(".navbar .navbar-toggler").is(":visible")?$(".navbar-bottom .dropdown-menu").parent().find(">a").on("click",function(t){t.preventDefault(),t.stopPropagation(),a($(this).closest(".dropdown-menu").find(".dropdown-menu").not($(this).parent().find(".dropdown-menu"))),$(this).parent().find(">.dropdown-menu").toggleClass("show")}):$(".navbar-bottom .navbar-nav>.nav-item.dropdown>.dropdown-menu .dropdown-menu").parent().hover(function(t){var e,n;t.preventDefault(),t.stopPropagation(),e=$(this),n=e.find(">.dropdown-menu"),a(e.siblings(".navbar-dropdown").find(".dropdown-menu.show")),new Popper(e.find(".dropdown-toggle")[0],n[0],{placement:"right-start"}),n.toggleClass("show"),n.hasClass("show")&&$(document).one("click",function(t){return a(n)})},function(t){a($(this).find(".dropdown-menu"))})}();var el=$(".custom-range");window.listenForChangeInHelperInput=function(o,s){var r=parseInt(o.val());o.on("input",function(t){t.stopPropagation();var e=o.val(),n=e,a=s.attr("max"),i=s.attr("min");n=parseInt(e),isNaN(n)?n=0:a<n?n=a:n<i&&(n=i),n!==r&&(s.val(n),o.parent().trigger("input")),r=n})},el.each(function(){var t=$(this),e=t.parent().find(".range-value>input");t.on("input",function(t){e.val($(this).val())}),listenForChangeInHelperInput(e,t)}),window.showHeaderSearchResults=function(){var n=$(".navbar-search .input-group"),t=n.find(".live-search-results");t.addClass("is-loading"),n.addClass("editing has-results"),setTimeout(function(){t.removeClass("is-loading")},700);$("body").on("click",function t(e){$(e.target).hasClass("navbar-search")||$(e.target).closest(".navbar-search").length||($("body").off("click",t),n.removeClass("has-results"))})},$(".input-close-btn").on("click",function(t){$(this).closest(".form-group").removeClass("navbar-search-active").find("input").val("").focus().trigger("input")}),$(".navbar-search .input-group input").on("focus",function(t){var e=$(this).parent();0<$(this).val().length&&!e.hasClass("editing")&&showHeaderSearchResults()}),$(".navbar-search .bind-to-edit-indicator").on("input",function(t){var e=$(this).parent();0==$(this).val().length?e.removeClass("editing").removeClass("has-results"):showHeaderSearchResults()}),$(".alert-dismissible[data-animation]").on("close.bs.alert",function(t){t.preventDefault(),"slideUp"==$(this).data("animation")?$(this).slideUp(300):animateCSS($(this),$(this).data("animation"),function(t){t.detach()})}),$(".modal[data-animation]").on("shown.bs.modal",function(t){t.preventDefault();var e=$(this),n=e.data("animation");e.css({display:"block"}),animateCSS(e,n,function(){e.addClass("show")})}),$(".modal[data-animation-out]").on("hide.bs.modal",function(t){if($(this).data("force-hide"))return $(this).data("force-hide",!1),!0;t.preventDefault();var e=$(this),n=e.data("animation-out");animateCSS(e,n,function(){e.data("force-hide",!0),e.modal("hide")})}),$(".modal[data-effect]").on("show.bs.modal",function(t){$("body").addClass("body-"+$(this).data("effect"))}),$(".modal[data-effect]").on("hide.bs.modal",function(t){$("body").removeClass("body-"+$(this).data("effect"))}),$(".btn-panel-minimize").on("click",function(t){var e=$(this).closest(".panel"),n=e.find(">.panel-body");0==n.length&&(n=e.find(">.panel-minimizable")),e.hasClass("panel-collapsed")?(e.removeClass("panel-collapsed"),n.slideDown(300)):(e.addClass("panel-collapsing"),n.slideUp(300,function(){e.addClass("panel-collapsed"),e.removeClass("panel-collapsing")}))}),$(".btn-panel-close").on("click",function(t){var e=$(this).closest(".panel");$(this).hasClass("panel-fade")?e.fadeOut(400,function(){e.detach()}):e.detach()}),$(".btn-panel-print").on("click",function(t){window.print()}),window.animateTabFloorToPosition=function(t){var e=t.width(),n=t.height(),a=t.position(),i=t.closest(".nav-tabs-animated").find(".nav-floor"),o=i.data("position"),s={};s.left=a.left,s.width=e,i.data("full-height")&&(s.height=n),s.top="top"==o?a.top:a.top+n-3,i.addClass("moving").css(s).one("transitionend",function(t){$(this).removeClass("moving")})},$(".nav-tabs-animated").length&&($(".nav-tabs-animated:not(.nav-tabs-bg-animated) a").on("click",function(){animateTabFloorToPosition($(this).parent())}),$(".nav-tabs-animated:not(.nav-tabs-bg-animated)").each(function(){animateTabFloorToPosition($(this).find(".active").parent()),$(this).find(".active").parent().on("resize",function(){animateTabFloorToPosition($(this).parent())})})),window.animateTabBGToPosition=function(t){var e=t.width(),n=t.height(),a=t.position(),i=t.closest(".nav-tabs-animated").find(".nav-floor"),o={};o.left=a.left,o.width=e,o.height=n,o.top=a.top,i.addClass("moving").css(o).one("transitionend",function(t){$(this).removeClass("moving")})},$(".nav-tabs-bg-animated").length&&($(".nav-tabs-bg-animated a").on("click",function(){animateTabBGToPosition($(this).parent())}),$(".nav-tabs-bg-animated").each(function(){animateTabBGToPosition($(this).find(".active").parent()),$(this).find(".active").parent().on("resize",function(){animateTabBGToPosition($(this).parent())})})),window.animateTabWallToPosition=function(t){var e=t.height(),n=t.position();t.closest(".nav-vertical-tabs-animated").find(".nav-wall").addClass("moving").css({top:+n.top,height:e}).one("transitionend",function(t){$(this).removeClass("moving")})},$(".nav-vertical-tabs-animated").length&&($(".nav-vertical-tabs-animated a").on("click",function(){animateTabWallToPosition($(this).parent())}),$(".nav-vertical-tabs-animated").each(function(){animateTabWallToPosition($(this).find(".active").parent()),$(this).find(".active").parent().on("resize",function(){animateTabWallToPosition($(this).parent())})})),$(".toast[data-animation-out]").on("hide.bs.toast",function(t){if($(this).data("force-hide"))return $(this).data("force-hide",!1),!0;t.preventDefault();var e=$(this),n=e.data("animation-out");animateCSS(e,n,function(){e.data("force-hide",!0),e.toast("hide")})}),window.showDropdown=function(t){var e=t.find(">.dropdown-menu");new Popper(t[0],e[0],{placement:"right-start"}),e.toggleClass("show"),e.hasClass("show")&&$(document).one("click",function(t){return hideDropdown(e)})},window.hideDropdown=function(t){t.removeClass("show dropdown-menu-start dropdown-menu-end").find(".dropdown-menu").removeClass("dropdown-menu-start dropdown-menu-end")},$(".navbar .navbar-toggler:not(.sidebar-toggler)").is(":visible")?$(".navbar-top .dropdown .dropdown-item.dropdown>.dropdown-toggle").on("click",function(t){t.preventDefault(),t.stopPropagation(),hideDropdown($(this).closest(".dropdown-menu").find(".dropdown-menu").not($(this).parent().find(".dropdown-menu"))),$(this).parent().find(">.dropdown-menu").toggleClass("show")}):$(".navbar-top .dropdown .dropdown-item.dropdown").hover(function(t){t.preventDefault(),t.stopPropagation(),showDropdown($(this))},function(t){hideDropdown($(this).find(".dropdown-menu"))}),$(document).ready(function(){var o=!1;$("[data-toggle='off-canvas']").on("click",function(t){t.preventDefault();var a=this,i=$(this).data("target");if(!(i=i?$(i):$($(this).attr("href"))).hasClass("active")){var e=$.Event("show.off-canvas");if(i.trigger(e),!e.isDefaultPrevented()){i.addClass("active"),$("body").addClass("off-canvas-open"),i.hasClass("has-overlay")&&$("body").append('<div class="modal-backdrop show"></div>'),i.hasClass("no-animation")?i.trigger("shown.off-canvas"):i.one("transitionend",function(t){i.trigger("shown.off-canvas"),o=!0});i.hasClass("off-canvas-static")||$("body").on("click",function t(e){if(!$(e.target).hasClass("off-canvas")&&!$(e.target).closest(".off-canvas").length&&!$(e.target).is($(a))){$("body").off("click",t);var n=$.Event("hide.off-canvas");if(i.trigger(n),n.isDefaultPrevented())return;i.removeClass("active"),i.hasClass("has-overlay")&&$("body").find(".modal-backdrop").last().detach(),o&&!i.hasClass("no-animation")?i.one("transitionend",function(t){o&&(i.trigger("hidden.off-canvas"),$("body").removeClass("off-canvas-open")),o=!1}):(i.trigger("hidden.off-canvas"),$("body").removeClass("off-canvas-open"),o=!1)}})}}}),$("[data-dismiss='off-canvas']").on("click",function(t){var e=$(this).closest(".off-canvas"),n=$.Event("hide.off-canvas");e.trigger(n),n.isDefaultPrevented()||(e.removeClass("active"),e.hasClass("has-overlay")&&$("body").find(".modal-backdrop").last().detach(),$("body").removeClass("off-canvas-open"),e.trigger("hidden.off-canvas"))}),$(".off-canvas[data-effect]").on("show.off-canvas",function(t){for(var e=$(this).data("effect").split(" "),n=0;n<e.length;n++){var a=e[n];$("body").addClass("body-"+a)}}),$(".off-canvas[data-effect]").on("hidden.off-canvas",function(t){for(var e=$(this).data("effect").split(" "),n=0;n<e.length;n++){var a=e[n];$("body").removeClass("body-"+a)}})}),$(document).ready(function(){$(".custom-file").length&&bsCustomFileInput.init()}),$(document).ready(function(){$('[data-toggle="tooltip"]').each(function(){var t=$(this),e={};t.data("position")&&(e.placement=t.data("position")),t.data("type")&&(e.template='<div class="tooltip tooltip-'+t.data("type")+'" role="tooltip"><div class="arrow"></div><div class="tooltip-inner bg-'+t.data("type")+'"></div></div>'),t.tooltip(e)});for(var t=["top","bottom","left","right"],e=0;e<t.length;e++){var n=t[e];$(".tooltip-"+n).length&&$(".tooltip-"+n).tooltip({placement:n})}}),$(document).ready(function(){$('[data-toggle="popover"]').each(function(){var t=$(this),e={};t.data("type")&&(e.template='<div class="popover bg-'+t.data("type")+'" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'),t.popover(e)})}),$(document).ready(function(){$(".toast").length&&$(".toast").toast()}),window.animateCSS=function(t,e,n){t[0].classList.add("animated",e),t[0].addEventListener("animationend",function t(){this.classList.remove("animated",e),this.removeEventListener("animationend",t),"function"==typeof n&&n($(this))})},jQuery.fn.extend({tinymce:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(t){return t.target=this[0],tinymce.init(t)})}),window.exonNotify=function(t,e,n){var a=getConfig(n,{type:"primary",icon:"fas fa-exclamation",title:t,message:e,allow_dismiss:"on",mouse_over:"on",newest_on_top:!1,progressbar:!1,spacing:10,"offset-x":20,"offset-y":20,delay:1e4,"z-index":1031,position:"top-right"});$.notify({icon:a.icon,title:a.title,message:a.message,url:"",target:"_blank"},{type:a.type,allow_dismiss:"on"==a.allow_dismiss,newest_on_top:"on"==a.newest_on_top,placement:{from:a.position.split("-")[0],align:a.position.split("-")[1]},offset:{x:a["offset-x"],y:a["offset-y"]},animate:{enter:"animated fadeInDown",exit:"animated fadeOutUp"},showProgressbar:"on"==a.progressbar,spacing:a.spacing,z_index:a.z_index,delay:a.delay,mouse_over:!1!==["on","pause"].indexOf(a.mouse_over)?"pause":null,icon_type:"class",template:'<div data-notify="container" class="col-xs-12 col-sm-8 alert alert-{0} animated fadeInDown" role="alert"> \n\t<div class="row no-gutters"> \n \n\t\t<div class="col col-icon"> \n\t\t\t<span class="notification-icon"> \n\t\t\t\t<i data-notify="icon"></i> \n\t\t\t</span> \n\t\t</div> \n \n\t\t<div class="col col-content"> \n\t\t\t<button type="button" aria-hidden="true" class="close" data-notify="dismiss"> \n\t\t\t\t<svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"></path></svg> \n\t\t\t</button> \n\t\t\t<h5 data-notify="title">{1}</h5> \n\t\t\t<p data-notify="message">{2}</p> \n\t\t\t<a href="{3}" target="{4}" data-notify="url"></a> \n\t\t\t<div class="progress squared" data-notify="progressbar"> \n\t\t\t\t<div class="progress-bar bg-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div> \n\t\t\t</div> \n\t\t</div> \n \n\t</div> \n\t\t \n</div> \n'})},$(document).ready(function(){var t=$("notification"),h=["type","icon","title","message","allow_dismiss","mouse_over","newest_on_top","progressbar","spacing","offset-x","offset-y","delay","z-index","position"];t.each(function(t,e){var n=$(e),a=n.find("title"),i=n.find("message"),o=n.find("i"),s={};0<a.length&&(s.title=a.text()),0<i.length&&(s.message=i.text()),0<o.length&&(s.icon=o.attr("class"));var r=n.attr("type");void 0!==r&&(s.type=r);for(var l=0;l<h.length;l++){var c=h[l],d=n.data(c);void 0!==d&&(s[c]=d)}exonNotify("","",s),n.detach()})}),$(document).ready(function(){$(".switchery").each(function(){new Switchery(this,{color:"#64bd63",secondaryColor:"#dfdfdf",className:$(this).attr("class"),jackColor:"#fff",speed:"0.5s"})}),$(".switchery-small").each(function(){new Switchery(this,{color:"#64bd63",secondaryColor:"#dfdfdf",jackColor:"#fff",size:"small"})}),$(".switchery-large").each(function(){new Switchery(this,{color:"#64bd63",secondaryColor:"#dfdfdf",jackColor:"#fff",size:"large"})})}),$(document).ready(function(){$(".switchery-primary").each(function(){new Switchery(this,{color:"#5780f7",secondaryColor:"#dfdfdf",className:$(this).attr("class")+" switchery",jackColor:"#fff",speed:"0.5s"})}),$(".switchery-secondary").each(function(){new Switchery(this,{color:"#efefef",secondaryColor:"#dfdfdf",className:$(this).attr("class")+" switchery",jackColor:"#fff",speed:"0.5s"})}),$(".switchery-success").each(function(){new Switchery(this,{color:"#06c48c",secondaryColor:"#dfdfdf",className:$(this).attr("class")+" switchery",jackColor:"#fff",speed:"0.5s"})}),$(".switchery-danger").each(function(){new Switchery(this,{color:"#ed3472",secondaryColor:"#dfdfdf",className:$(this).attr("class")+" switchery",jackColor:"#fff",speed:"0.5s"})}),$(".switchery-warning").each(function(){new Switchery(this,{color:"#fab72b",secondaryColor:"#dfdfdf",className:$(this).attr("class")+" switchery",jackColor:"#fff",speed:"0.5s"})}),$(".switchery-info").each(function(){new Switchery(this,{color:"#4cacff",secondaryColor:"#dfdfdf",className:$(this).attr("class")+" switchery",jackColor:"#fff",speed:"0.5s"})}),$(".switchery-light").each(function(){new Switchery(this,{color:"#fafafa",secondaryColor:"#dfdfdf",className:$(this).attr("class")+" switchery",jackColor:"#fff",speed:"0.5s"})}),$(".switchery-dark").each(function(){new Switchery(this,{color:"#393b51",secondaryColor:"#dfdfdf",className:$(this).attr("class")+" switchery",jackColor:"#fff",speed:"0.5s"})})}),$(document).ready(function(){$("input.input-spinner").length&&$("input.input-spinner").inputSpinner()}),$(document).ready(function(){$("[data-toggle='selector']").length&&$("[data-toggle='selector']").selector()}),$(document).ready(function(t){t(".counter").length&&t(".counter").counterUp({delay:10,time:1e3})}),$(document).ready(function(){if($(".colorpicker-sliders").length){var a=document.querySelector(".colorpicker-sliders .result"),t=document.querySelectorAll(".colorpicker-sliders .red,.colorpicker-sliders .blue,.colorpicker-sliders .green"),i=[0,0,0];[].slice.call(t).forEach(function(e,n){noUiSlider.create(e,{start:127,connect:[!0,!1],orientation:"vertical",range:{min:0,max:255}}),e.noUiSlider.on("update",function(){i[n]=e.noUiSlider.get();var t="rgb("+i.join(",")+")";a.style.background=t,a.style.color=t})})}}),$(document).ready(function(){if($(".colorpicker-sliders-hor").length){var a=document.querySelector(".colorpicker-sliders-hor .result"),t=document.querySelectorAll(".colorpicker-sliders-hor .red,.colorpicker-sliders-hor .blue,.colorpicker-sliders-hor .green"),i=[0,0,0];[].slice.call(t).forEach(function(e,n){noUiSlider.create(e,{start:127,connect:[!0,!1],range:{min:0,max:255}}),e.noUiSlider.on("update",function(){i[n]=e.noUiSlider.get();var t="rgb("+i.join(",")+")";a.style.background=t,a.style.color=t})})}});