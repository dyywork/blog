import{u as _,f as te,g as ae,h as U,i as se,P as le,t as re,j as ue,k as q,l as C,m as oe,n as Y,p as a,q as ce,R as I,s as ne,v as ie,x as ve,C as me,y as de,z as he,A as pe,B as ye,D as Ee,E as ge,F as Ae,G as P,H as M,I as Be,J as k,K as fe}from"./app-CpMH9fV-.js";const He=["/","/tool/jenkins.html","/tool/nvm.html","/tool/pm2.html","/tool/verdaccio.html","/tool/vpn.html","/weixin/xiaochengxu.html","/document/canvas/canvasDraw.html","/document/css/cssShow.html","/document/css/flex.html","/document/css/layout.html","/document/css/styleIssues.html","/document/git/COMMIT.html","/document/git/branch.html","/document/http/http.html","/document/js/Object.html","/document/js/","/document/js/THIS.html","/document/js/designModel.html","/document/js/eventLoop.html","/document/js/jsShow.html","/document/performance/performance.html","/document/react/higherComponent.html","/document/react/hook.html","/document/react/interview.html","/document/regExp/regExp.html","/document/vue2/COMPONENTS.html","/document/vue2/vue.html","/document/vue2/vue%E9%9D%A2%E8%AF%95%E9%A2%98.html","/404.html","/tool/","/weixin/","/document/canvas/","/document/","/document/css/","/document/git/","/document/http/","/document/performance/","/document/react/","/document/regExp/","/document/softExamination/","/document/vue2/","/category/","/category/jenkins/","/category/tool/","/category/pm2/","/category/verdaccio/","/category/vpn/","/category/uni-app/","/category/canvas/","/category/css/","/category/flex/","/category/git/","/category/http/","/category/javascript/","/category/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/","/category/react/","/category/hooks/","/category/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F/","/category/%E8%BD%AF%E8%80%83/","/category/vue2/","/category/vue/","/tag/","/tag/npm-%E7%A7%81%E6%9C%89%E5%BA%93/","/tag/reset/","/tag/tag/","/tag/branch/","/tag/object/","/tag/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1/","/tag/%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6/","/tag/%E5%8F%98%E9%87%8F%E6%8F%90%E5%8D%87/","/tag/this/","/tag/%E9%97%AD%E5%8C%85/","/tag/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/","/tag/%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF/","/tag/%E8%AF%BB/","/tag/usestate/","/tag/useeffect/","/tag/react%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F/","/tag/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F/","/tag/%E7%BB%84%E4%BB%B6%E5%BA%93%E6%90%AD%E5%BB%BA/","/tag/vue-%E9%97%AE%E9%A2%98%E9%9B%86%E5%90%88/","/tag/vue/","/tag/%E9%9D%A2%E8%AF%95%E9%A2%98/","/article/","/star/","/timeline/"],xe="SEARCH_PRO_QUERY_HISTORY",E=_(xe,[]),Ce=()=>{const{queryHistoryCount:s}=k,l=s>0;return{enabled:l,queryHistory:E,addQueryHistory:r=>{l&&(E.value=Array.from(new Set([r,...E.value.slice(0,s-1)])))},removeQueryHistory:r=>{E.value=[...E.value.slice(0,r),...E.value.slice(r+1)]}}},b=s=>He[s.id]+("anchor"in s?`#${s.anchor}`:""),ke="SEARCH_PRO_RESULT_HISTORY",{resultHistoryCount:$}=k,g=_(ke,[]),we=()=>{const s=$>0;return{enabled:s,resultHistory:g,addResultHistory:l=>{if(s){const r={link:b(l),display:l.display};"header"in l&&(r.header=l.header),g.value=[r,...g.value.slice(0,$-1)]}},removeResultHistory:l=>{g.value=[...g.value.slice(0,l),...g.value.slice(l+1)]}}},De=s=>{const l=me(),r=U(),w=de(),o=q(0),f=C(()=>o.value>0),h=he([]);return pe(()=>{const{search:p,terminate:D}=ye(),A=Be(i=>{const B=i.join(" "),{searchFilter:R=d=>d,splitWord:F,suggestionsFilter:L,...y}=l.value;B?(o.value+=1,p(i.join(" "),r.value,y).then(d=>R(d,B,r.value,w.value)).then(d=>{o.value-=1,h.value=d}).catch(d=>{console.warn(d),o.value-=1,o.value||(h.value=[])})):h.value=[]},k.searchDelay-k.suggestDelay);Y([s,r],([i])=>A(i),{immediate:!0}),Ee(()=>{D()})}),{isSearching:f,results:h}};var Fe=te({name:"SearchResult",props:{queries:{type:Array,required:!0},isFocusing:Boolean},emits:["close","updateQuery"],setup(s,{emit:l}){const r=ae(),w=U(),o=se(le),{enabled:f,addQueryHistory:h,queryHistory:p,removeQueryHistory:D}=Ce(),{enabled:A,resultHistory:i,addResultHistory:B,removeResultHistory:R}=we(),F=f||A,L=re(s,"queries"),{results:y,isSearching:d}=De(L),u=ue({isQuery:!0,index:0}),v=q(0),m=q(0),O=C(()=>F&&(p.value.length>0||i.value.length>0)),j=C(()=>y.value.length>0),Q=C(()=>y.value[v.value]||null),N=()=>{const{isQuery:e,index:t}=u;t===0?(u.isQuery=!e,u.index=e?i.value.length-1:p.value.length-1):u.index=t-1},z=()=>{const{isQuery:e,index:t}=u;t===(e?p.value.length-1:i.value.length-1)?(u.isQuery=!e,u.index=0):u.index=t+1},G=()=>{v.value=v.value>0?v.value-1:y.value.length-1,m.value=Q.value.contents.length-1},J=()=>{v.value=v.value<y.value.length-1?v.value+1:0,m.value=0},K=()=>{m.value<Q.value.contents.length-1?m.value+=1:J()},V=()=>{m.value>0?m.value-=1:G()},S=e=>e.map(t=>fe(t)?t:a(t[0],t[1])),W=e=>{if(e.type==="customField"){const t=ge[e.index]||"$content",[c,x=""]=Ae(t)?t[w.value].split("$content"):t.split("$content");return e.display.map(n=>a("div",S([c,...n,x])))}return e.display.map(t=>a("div",S(t)))},H=()=>{v.value=0,m.value=0,l("updateQuery",""),l("close")},X=()=>f?a("ul",{class:"search-pro-result-list"},a("li",{class:"search-pro-result-list-item"},[a("div",{class:"search-pro-result-title"},o.value.queryHistory),p.value.map((e,t)=>a("div",{class:["search-pro-result-item",{active:u.isQuery&&u.index===t}],onClick:()=>{l("updateQuery",e)}},[a(P,{class:"search-pro-result-type"}),a("div",{class:"search-pro-result-content"},e),a("button",{class:"search-pro-remove-icon",innerHTML:M,onClick:c=>{c.preventDefault(),c.stopPropagation(),D(t)}})]))])):null,Z=()=>A?a("ul",{class:"search-pro-result-list"},a("li",{class:"search-pro-result-list-item"},[a("div",{class:"search-pro-result-title"},o.value.resultHistory),i.value.map((e,t)=>a(I,{to:e.link,class:["search-pro-result-item",{active:!u.isQuery&&u.index===t}],onClick:()=>{H()}},()=>[a(P,{class:"search-pro-result-type"}),a("div",{class:"search-pro-result-content"},[e.header?a("div",{class:"content-header"},e.header):null,a("div",e.display.map(c=>S(c)).flat())]),a("button",{class:"search-pro-remove-icon",innerHTML:M,onClick:c=>{c.preventDefault(),c.stopPropagation(),R(t)}})]))])):null;return oe("keydown",e=>{if(s.isFocusing){if(j.value){if(e.key==="ArrowUp")V();else if(e.key==="ArrowDown")K();else if(e.key==="Enter"){const t=Q.value.contents[m.value];h(s.queries.join(" ")),B(t),r.push(b(t)),H()}}else if(A){if(e.key==="ArrowUp")N();else if(e.key==="ArrowDown")z();else if(e.key==="Enter"){const{index:t}=u;u.isQuery?(l("updateQuery",p.value[t]),e.preventDefault()):(r.push(i.value[t].link),H())}}}}),Y([v,m],()=>{var e;(e=document.querySelector(".search-pro-result-list-item.active .search-pro-result-item.active"))==null||e.scrollIntoView(!1)},{flush:"post"}),()=>a("div",{class:["search-pro-result-wrapper",{empty:s.queries.length?!j.value:!O.value}],id:"search-pro-results"},s.queries.length?d.value?a(ce,{hint:o.value.searching}):j.value?a("ul",{class:"search-pro-result-list"},y.value.map(({title:e,contents:t},c)=>{const x=v.value===c;return a("li",{class:["search-pro-result-list-item",{active:x}]},[a("div",{class:"search-pro-result-title"},e||o.value.defaultTitle),t.map((n,ee)=>{const T=x&&m.value===ee;return a(I,{to:b(n),class:["search-pro-result-item",{active:T,"aria-selected":T}],onClick:()=>{h(s.queries.join(" ")),B(n),H()}},()=>[n.type==="text"?null:a(n.type==="title"?ne:n.type==="heading"?ie:ve,{class:"search-pro-result-type"}),a("div",{class:"search-pro-result-content"},[n.type==="text"&&n.header?a("div",{class:"content-header"},n.header):null,a("div",W(n))])])})])})):o.value.emptyResult:F?O.value?[X(),Z()]:o.value.emptyHistory:o.value.emptyResult)}});export{Fe as default};
