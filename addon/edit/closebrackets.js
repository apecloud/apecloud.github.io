(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(e){var d={pairs:"()[]{}''\"\"",closeBefore:")]}'\":;>",triples:"",explode:"[]{}"};var l=e.Pos;e.defineOption("autoCloseBrackets",false,function(p,r,q){if(q&&q!=e.Init){p.removeKeyMap(j);p.state.closeBrackets=null}if(r){h(a(r,"pairs"));p.state.closeBrackets=r;p.addKeyMap(j)}});function a(q,p){if(p=="pairs"&&typeof q=="string"){return q}if(typeof q=="object"&&q[p]!=null){return q[p]}return d[p]}var j={Backspace:c,Enter:b};function h(s){for(var q=0;q<s.length;q++){var r=s.charAt(q),p="'"+r+"'";if(!j[p]){j[p]=o(r)}}}h(d.pairs+"`");function o(p){return function(q){return n(q,p)}}function m(p){var r=p.state.closeBrackets;if(!r||r.override){return r}var q=p.getModeAt(p.getCursor());return q.closeBrackets||r}function c(p){var r=m(p);if(!r||p.getOption("disableInput")){return e.Pass}var u=a(r,"pairs");var q=p.listSelections();for(var s=0;s<q.length;s++){if(!q[s].empty()){return e.Pass}var t=g(p,q[s].head);if(!t||u.indexOf(t)%2!=0){return e.Pass}}for(var s=q.length-1;s>=0;s--){var v=q[s].head;p.replaceRange("",l(v.line,v.ch-1),l(v.line,v.ch+1),"+delete")}}function b(p){var r=m(p);var t=r&&a(r,"explode");if(!t||p.getOption("disableInput")){return e.Pass}var q=p.listSelections();for(var s=0;s<q.length;s++){if(!q[s].empty()){return e.Pass}var u=g(p,q[s].head);if(!u||t.indexOf(u)%2!=0){return e.Pass}}p.operation(function(){var w=p.lineSeparator()||"\n";p.replaceSelection(w+w,null);k(p,-1);q=p.listSelections();for(var x=0;x<q.length;x++){var v=q[x].head.line;p.indentLine(v,null,true);p.indentLine(v+1,null,true)}})}function k(p,t){var s=[],q=p.listSelections(),v=0;for(var u=0;u<q.length;u++){var r=q[u];if(r.head==p.getCursor()){v=u}var w=r.head.ch||t>0?{line:r.head.line,ch:r.head.ch+t}:{line:r.head.line-1};s.push({anchor:w,head:w})}p.setSelections(s,v)}function f(q){var p=e.cmpPos(q.anchor,q.head)>0;return{anchor:new l(q.anchor.line,q.anchor.ch+(p?-1:1)),head:new l(q.head.line,q.head.ch+(p?1:-1))}}function n(w,y){var x=m(w);if(!x||w.getOption("disableInput")){return e.Pass}var H=a(x,"pairs");var v=H.indexOf(y);if(v==-1){return e.Pass}var A=a(x,"closeBefore");var E=a(x,"triples");var p=H.charAt(v+1)==y;var q=w.listSelections();var C=v%2==0;var s;for(var F=0;F<q.length;F++){var z=q[F],r=z.head,u;var D=w.getRange(r,l(r.line,r.ch+1));if(C&&!z.empty()){u="surround"}else{if((p||!C)&&D==y){if(p&&i(w,r)){u="both"}else{if(E.indexOf(y)>=0&&w.getRange(r,l(r.line,r.ch+3))==y+y+y){u="skipThree"}else{u="skip"}}}else{if(p&&r.ch>1&&E.indexOf(y)>=0&&w.getRange(l(r.line,r.ch-2),r)==y+y){if(r.ch>2&&/\bstring/.test(w.getTokenTypeAt(l(r.line,r.ch-2)))){return e.Pass}u="addFour"}else{if(p){var B=r.ch==0?" ":w.getRange(l(r.line,r.ch-1),r);if(!e.isWordChar(D)&&B!=y&&!e.isWordChar(B)){u="both"}else{return e.Pass}}else{if(C&&(D.length===0||/\s/.test(D)||A.indexOf(D)>-1)){u="both"}else{return e.Pass}}}}}if(!s){s=u}else{if(s!=u){return e.Pass}}}var t=v%2?H.charAt(v-1):y;var G=v%2?y:H.charAt(v+1);w.operation(function(){if(s=="skip"){k(w,1)}else{if(s=="skipThree"){k(w,3)}else{if(s=="surround"){var I=w.getSelections();for(var J=0;J<I.length;J++){I[J]=t+I[J]+G}w.replaceSelections(I,"around");I=w.listSelections().slice();for(var J=0;J<I.length;J++){I[J]=f(I[J])}w.setSelections(I)}else{if(s=="both"){w.replaceSelection(t+G,null);w.triggerElectric(t+G);k(w,-1)}else{if(s=="addFour"){w.replaceSelection(t+t+t+t,"before");k(w,1)}}}}}})}function g(p,r){var q=p.getRange(l(r.line,r.ch-1),l(r.line,r.ch+1));return q.length==2?q:null}function i(p,r){var q=p.getTokenAt(l(r.line,r.ch+1));return/\bstring/.test(q.type)&&q.start==r.ch&&(r.ch==0||!/\bstring/.test(p.getTokenTypeAt(r)))}});