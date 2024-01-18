import{_ as s}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as i,o as r,c as d,b as e,d as a,e as t,a as l}from"./app-4eEeyPl0.js";const c={},m=e("h1",{id:"pm2",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#pm2","aria-hidden":"true"},"#"),a(" pm2")],-1),p={href:"https://pm2.fenxianglu.cn/docs/start",target:"_blank",rel:"noopener noreferrer"},o=l(`<h2 id="安装pm2" tabindex="-1"><a class="header-anchor" href="#安装pm2" aria-hidden="true">#</a> 安装pm2</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> <span class="token parameter variable">--dev</span> pm2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="pm2-命令" tabindex="-1"><a class="header-anchor" href="#pm2-命令" aria-hidden="true">#</a> pm2 命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pm2 start app.js
pm2 restart app_name
pm2 reload app_name
pm2 stop app_name
pm2 delete app_name

pm2 list <span class="token comment"># 列表</span>
pm2 logs <span class="token comment"># 日志</span>
pm2 monit <span class="token comment"># 监控信息</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function h(v,u){const n=i("ExternalLinkIcon");return r(),d("div",null,[m,e("p",null,[a("使用pm2发布node项目 "),e("a",p,[a("pm2文档"),t(n)])]),o])}const f=s(c,[["render",h],["__file","pm2.html.vue"]]);export{f as default};
