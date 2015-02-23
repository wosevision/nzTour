var module=angular.module("nzTour",[]);module.factory("nzTour",function(t,e,r,o){function n(t){if(!t)throw"No Tour Specified!";if(!t.steps.length)throw"No steps were found in that tour!";return w.current?i().then(function(){return a(t)}):a(t)}function i(){return f(!1)}function s(){w.current&&T()}function u(){return w.current||w.current.reject(),v().then(g).then(m).then(l)}function c(){var e=t.defer();return w.current.step>0?(w.current.step--,l()):(e.reject(),e.promise)}function p(e){var r=t.defer();return e>0&&e<=w.current.tour.steps.length?(w.current.step=e-2,l(!0)):(r.reject(),r.promise)}function a(e){return e.config=angular.extendDeep({},w.config,e.config),console.log(e),w.current={tour:e,step:0,promise:t.defer()},f(!0,e),l(),w.current.promise.promise}function f(e,n){var i=t.defer();return e?(w.box=angular.element(r('<nz-tour class="hidden"></nz-tour>')(w)),angular.element(n.config.container).append(w.box),o(function(){w.box.removeClass("hidden")},10),i.resolve()):(w.box.addClass("hidden"),o(function(){w.box.remove(),w.$broadcast("remove"),i.resolve()},w.current.tour.config.animationDuration)),i.promise}function l(){return d().then(h)}function d(){var e=t.defer();return w.current.tour.steps[w.current.step].before?w.current.tour.steps[w.current.step].before():(e.resolve(),e.promise)}function h(){var e=t.defer();return w.$broadcast("step",w.current.step),e.resolve(),e.promise}function v(){var e=t.defer();return w.current.tour.steps[w.current.step].after?w.current.tour.steps[w.current.step].after():(e.resolve(),e.promise)}function g(){var e=t.defer();return w.current.step==w.current.tour.steps.length-1?(e.reject(),x(),e.promise):(e.resolve(),e.promise)}function m(){var e=t.defer();return w.current.step++,e.resolve(),e.promise}function x(){return i().then(function(){return w.current.promise.resolve(),w.current=!1,!0})}function T(){}function b(t,e,r){var n;return function(){var i=this,s=arguments,u=function(){n=null,r||t.apply(i,s)},c=r&&!n;o.cancel(n),n=o(u,e),c&&t.apply(i,s)}}var w=e.$new();return angular.extend(w,{config:{mask:{visible:!0,clickThrough:!1,clickExit:!1,color:"rgba(0,0,0,.7)"},container:"body",scrollBox:"body",previousText:"Previous",nextText:"Next",finishText:"Finish",animationDuration:400},current:!1,container:!1,box:!1,start:n,stop:i,pause:s,next:u,previous:c,gotoStep:p,debounce:b}),window.nzTour=w,w}),module.directive("nzTour",function(t,e,r){return{template:['<div id="nzTour-box-wrap">','   <div id="nzTour-box">','        <div id="nzTour-tip" class="top center"></div>','        <div id="nzTour-step">{{view.step + 1}}</div>','        <div id="nzTour-length">{{view.length}}</div>','        <div id="nzTour-close" ng-click="stop()">&#10005</div>','        <div id="nzTour-content">','           <div id="nzTour-inner-content">{{view.content}}</div>',"        </div>",'        <div id="nzTour-actions">','            <button id="nzTour-previous" ng-show="view.step > 0" ng-click="previous()" class="ng-hide">{{view.previousText}}</button>','            <button id="nzTour-next" ng-show="view.step >= 0" ng-click="next()" class="success" class="ng-hide">{{view.nextText}}</button>',"        </div>","    </div>","</div>",'<div class="nzTour-masks" ng-show="current.tour.config.mask.visible" ng-click="tryStop()>','    <div class="mask top"></div>','    <div class="mask right"></div>','    <div class="mask bottom"></div>','    <div class="mask left"></div>',"</div>"].join(" "),link:function(o,n){function i(){x||o.view&&s(null,o.view.step)}function s(t,e){return o.view={step:e,length:o.current.tour.steps.length,content:o.current.tour.steps[e].content,previousText:o.current.tour.steps[e].previousText?o.current.tour.steps[e].previousText:o.current.tour.config.previousText,nextText:e==o.current.tour.steps.length?o.current.tour.steps[e].finishText:o.current.tour.steps[e].nextText?o.current.tour.steps[e].nextText:o.current.tour.config.nextText},u(o.current.tour.steps[e].target).then(c).then(p)}function u(e){var r=t.defer(),o=angular.element(e);return r.resolve(o.length?angular.element(o[0]):!1),r.promise}function c(e){function r(t){var e=d.height(),r=d.scrollTop(),o=r+e,n=t.offset().top-d.offset().top+r,i=n+t.height();return t.height()>e?i>=o||r>=n:o>=i&&n>=r}function n(e){var r=t.defer();return x=!0,angular.element(d).animate({scrollTop:e.offset().top-d.offset().top+d.scrollTop()-T},o.current.tour.config.animationDuration,function(){r.resolve(e),x=!1}),r.promise}var i=t.defer();return e?r(e)?(i.resolve(e),i.resolve(e),i.promise):n(e):(i.resolve(),i.promise)}function p(r){var n=t.defer();if(!r)return f(),void l();var i=a(r);return f(i),l(i),e(function(){n.resolve()},o.current.tour.config.animationDuration),n.promise}function a(t){var e=angular.element(o.current.tour.config.container),r={pos:t.offset(),width:t.width(),height:t.height()},n={pos:e.offset(),width:e.width(),height:e.height()};return{width:r.width,height:r.height,top:r.pos.top-n.pos.top,left:r.pos.left-n.pos.left,bottom:n.height-r.pos.top-r.height,right:n.width-r.pos.left-r.width}}function f(t){function e(e,r){var o,n,i,s,u;"top"==e?(o=t.top-T,u="bottom",s="-100%"):(o=t.top+t.height+T,u="top",s="0"),"right"==r?(n=t.left+t.width,i="-100%"):"center"==r?(n=t.left+t.width/2,i="-50%"):(n=t.left,i="0"),v.css({left:n+"px",top:o+"px",transform:"translate("+i+","+s+")"}),m.attr("class",u+" "+r)}function r(e,r){var o,n,i,s,u;"right"==e?(n=t.left+t.width+T,u="left",i="0"):(n=t.left-T,u="right",i="-100%"),"top"==r?(o=t.top,s="0"):"center"==r?(o=t.top+t.height/2,s="-50%"):(o=t.top+t.height,s="-100%"),v.css({left:n+"px",top:o+"px",transform:"translate("+i+","+s+")"}),m.attr("class","side "+u+" "+r)}function o(e,r){var o,n,i,s;"top"==e?(o=t.top+T,i="0"):(o=t.top+t.height-T-(t.bottom<0?-t.bottom:0),i="-100%"),"right"==r?(n=t.left+t.width-T,s="-100%"):"center"==r?(n=t.left+t.width/2,s="-50%"):(n=t.left+T,s="0"),v.css({left:n+"px",top:o+"px",transform:"translate("+s+","+i+")"}),m.attr("class","hidden")}function n(){v.css({left:"50%",top:"50%",transform:"translate(-50%, -50%)",margin:"0"}),m.attr("class","hidden")}return t?t.bottom>135?t.width>250?void e("bottom","center"):t.right+t.width>250?void e("bottom","left"):void e("bottom","right"):t.right>250?t.height>135?void r("right","center"):t.bottom+t.height>135?void r("right","top"):void r("right","bottom"):t.left>250?t.height>135?void r("left","center"):t.bottom+t.height>135?void r("left","top"):void r("left","bottom"):t.top>135?t.width>250?void e("top","center"):t.right+t.width>250?void e("top","left"):void e("top","right"):void o("bottom","center"):void n()}function l(t){return t?(h.top.css({height:t.top+"px"}),h.bottom.css({height:t.bottom+"px"}),h.left.css({top:t.top+"px",height:t.height+"px",width:t.left+"px"}),void h.right.css({top:t.top+"px",height:t.height+"px",width:t.right+"px"})):(h.top.css({height:"0px"}),h.bottom.css({height:"0px"}),h.left.css({top:"0px",height:"100%",width:"0px"}),void h.right.css({top:"0px",height:"100%",width:"0px"}))}var d=(angular.element(o.current.tour.config.container),angular.element(o.current.tour.config.scrollBox)),h={all:n.find(".nzTour-masks"),top:n.find(".nzTour-masks .top"),right:n.find(".nzTour-masks .right"),bottom:n.find(".nzTour-masks .bottom"),left:n.find(".nzTour-masks .left")},v=n.find("#nzTour-box-wrap"),g=n.find("#nzTour-box"),m=n.find("#nzTour-tip"),x=(n.find("#nzTour-step"),n.find("#nzTour-close"),n.find("#nzTour-content"),n.find("#nzTour-actions"),n.find("#nzTour-previous"),n.find("#nzTour-next"),!1),T=15;h.all.css("pointer-events",o.current.tour.config.mask.clickThrough?"none":"all"),v.add(g).add(m).css("transition","all "+o.current.tour.config.animationDuration+"ms ease"),h.top.add(h.right).add(h.bottom).add(h.left).css({transition:"all "+o.current.tour.config.animationDuration+"ms ease","background-color":o.current.tour.config.mask.color}),o.$on("step",s);var b=o.debounce(i,100);o.$on("remove",function(){angular.element(r).off("resize",b),d.off("scroll",b)}),angular.element(r).on("resize",b),d.on("scroll",b),o.tryStop=function(){o.current.tour.config.mask.clickExit&&o.stop()}}}});