(function(n){n(["jquery"],function(n){return function(){function u(r){return(r||(r=i()),container=n("#"+r.containerId),container.children().length)?container:(container=n("<div/>").attr("id",r.containerId).addClass(r.positionClass),container.appendTo(n(r.target)),t=container,container)}function i(){return n.extend({},o,f.options)}function e(n){(t||(t=u()),n.is(":visible"))||(n.remove(),n=null,t.children().length===0&&t.remove())}var t,o={tapToDismiss:!0,toastClass:"toast",containerId:"toast-container",debug:!1,fadeIn:300,fadeOut:1e3,extendedTimeOut:1e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},iconClass:"toast-info",positionClass:"toast-top-right",timeOut:5e3,titleClass:"toast-title",messageClass:"toast-message",target:"body"},s=function(n,t,u){return r({iconClass:i().iconClasses.error,message:n,optionsOverride:u,title:t})},h=function(n,t,u){return r({iconClass:i().iconClasses.info,message:n,optionsOverride:u,title:t})},r=function(t){function o(){if(!(n(":focus",f).length>0))return f.fadeOut(r.fadeOut,function(){e(f)})}function y(){(r.timeOut>0||r.extendedTimeOut>0)&&(h=setTimeout(o,r.extendedTimeOut))}function p(){clearTimeout(h),f.stop(!0,!0).fadeIn(r.fadeIn)}var r=i(),s=t.iconClass||r.iconClass;typeof t.optionsOverride!="undefined"&&(r=n.extend(r,t.optionsOverride),s=t.optionsOverride.iconClass||s);var h=null,a=u(r),f=n("<div/>"),c=n("<div/>"),l=n("<div/>"),v={options:r,map:t};return t.iconClass&&f.addClass(r.toastClass).addClass(s),t.title&&(c.append(t.title).addClass(r.titleClass),f.append(c)),t.message&&(l.append(t.message).addClass(r.messageClass),f.append(l)),f.hide(),a.prepend(f),f.fadeIn(r.fadeIn),r.timeOut>0&&(h=setTimeout(o,r.timeOut)),f.hover(p,y),!r.onclick&&r.tapToDismiss&&f.click(o),r.onclick&&f.click(function(){r.onclick()&&o()}),r.debug&&console&&console.log(v),f},c=function(n,t,u){return r({iconClass:i().iconClasses.success,message:n,optionsOverride:u,title:t})},l=function(n,t,u){return r({iconClass:i().iconClasses.warning,message:n,optionsOverride:u,title:t})},a=function(r){var f=i();if(t||u(f),r&&n(":focus",r).length===0){r.fadeOut(f.fadeOut,function(){e(r)});return}t.children().length&&t.fadeOut(f.fadeOut,function(){t.remove()})},f={clear:a,error:s,getContainer:u,info:h,options:{},success:c,version:"1.2.2",warning:l};return f}()})})(typeof define=="function"&&define.amd?define:function(n,t){typeof module!="undefined"&&module.exports?module.exports=t(require(n[0])):window.toastr=t(window.jQuery)});
toastr.options.fadeIn = 200;
toastr.options.fadeOut = 300;
toastr.options.timeOut = 1750;