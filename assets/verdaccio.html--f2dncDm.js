import{_ as o}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as d,o as p,c as u,e as t,w as s,b as a,d as e,a as c}from"./app-5kCQI8Dk.js";const h="/blog/assets/img-AN1jAwDt.png",m="/blog/assets/img_1-38NnCYu4.png",v="/blog/assets/img_2-3oGzc9Xk.png",b="/blog/assets/img_3-Dp9whCyW.png",g="/blog/assets/img_4-BmSn-jAS.png",_={},k=c('<h1 id="verdaccio" tabindex="-1"><a class="header-anchor" href="#verdaccio" aria-hidden="true">#</a> Verdaccio</h1><h2 id="私有npm库的特点" tabindex="-1"><a class="header-anchor" href="#私有npm库的特点" aria-hidden="true">#</a> 私有npm库的特点</h2><ul><li>私有npm仓库可以搭建在局域网内，不对外开放</li><li>对于发布和下载npm包可以进行权限管理</li><li>私有npm仓库可以管理私有包，不用上传到公共的npm仓库中</li><li>缓存下载过的npm包，再次下载的时候可以大大加快下载速度</li><li>对于私有包走私有仓库，下载过的包走缓存，为下载的包走公共仓库</li></ul><h2 id="verdaccio-是什么" tabindex="-1"><a class="header-anchor" href="#verdaccio-是什么" aria-hidden="true">#</a> verdaccio 是什么</h2><p>官网给出的简介：<code>Verdaccio</code>是一个Node.js创建的轻量级的私有<code>npm proxy registry</code></p><p>verdaccio是fork的sinopia，后者是最初的搭建私有npm的选择，不过已经好多年不维护了，而verdaccio则是从sinopia衍生出来并且一直在维护中的，所以verdaccio是更好的选择</p><ul><li>它是基于Node.js的网页应用程序</li><li>它是私有npm registry</li><li>它是本地网络proxy</li><li>它是可插入式应用程序</li><li>它相当容易安装和使用</li><li>我们提供Docker和Kubernetes支持</li><li>它与yarn, npm 和pnpm 100% 兼容</li><li>它forked于sinopia@1.4.0并且100% 向后兼容。</li></ul><h2 id="verdaccio-的搭建" tabindex="-1"><a class="header-anchor" href="#verdaccio-的搭建" aria-hidden="true">#</a> Verdaccio 的搭建</h2><h3 id="全局安装" tabindex="-1"><a class="header-anchor" href="#全局安装" aria-hidden="true">#</a> 全局安装</h3>',9),f=a("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[a("pre",{class:"language-bash"},[a("code",null,[a("span",{class:"token function"},"npm"),e(),a("span",{class:"token function"},"install"),e(),a("span",{class:"token parameter variable"},"-g"),e(` verdaccio
`)])]),a("div",{class:"line-numbers","aria-hidden":"true"},[a("div",{class:"line-number"})])],-1),x=a("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[a("pre",{class:"language-bash"},[a("code",null,[a("span",{class:"token function"},"yarn"),e(" global "),a("span",{class:"token function"},"add"),e(` verdaccio
`)])]),a("div",{class:"line-numbers","aria-hidden":"true"},[a("div",{class:"line-number"})])],-1),y=a("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[a("pre",{class:"language-bash"},[a("code",null,[a("span",{class:"token function"},"pnpm"),e(),a("span",{class:"token function"},"add"),e(),a("span",{class:"token parameter variable"},"-g"),e(` verdaccio
`)])]),a("div",{class:"line-numbers","aria-hidden":"true"},[a("div",{class:"line-number"})])],-1),A=c('<p><img src="'+h+`" alt=""></p><h3 id="docker-镜像" tabindex="-1"><a class="header-anchor" href="#docker-镜像" aria-hidden="true">#</a> Docker 镜像</h3><p>安装完成后，你只需要执行CLI命令：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>verdaccio
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>会输出如下结果：</p><p><img src="`+m+'" alt=""></p>',6),C=a("code",null,"verdaccio",-1),N={href:"https://verdaccio.org/zh-cn/docs/configuration/",target:"_blank",rel:"noopener noreferrer"},j=c(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code> C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>dingyongya<span class="token punctuation">\\</span>AppData<span class="token punctuation">\\</span>Roaming<span class="token punctuation">\\</span>verdaccio<span class="token punctuation">\\</span>config.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>http://localhost:4873 为 <code>verdaccio</code> 客户端的访问地址</p><p><img src="`+v+`" alt=""></p><h3 id="登录到私有仓库上" tabindex="-1"><a class="header-anchor" href="#登录到私有仓库上" aria-hidden="true">#</a> 登录到私有仓库上</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> adduser <span class="token parameter variable">--registry</span> http://localhost:4873
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+b+`" alt=""></p><p>然后回到浏览器登录</p><h3 id="发布-npm-包到私有仓库" tabindex="-1"><a class="header-anchor" href="#发布-npm-包到私有仓库" aria-hidden="true">#</a> 发布 npm 包到私有仓库</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> publish <span class="token parameter variable">--registry</span> http://localhost:4873
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+g+'" alt=""></p><h3 id="从私有仓库中下载私有包" tabindex="-1"><a class="header-anchor" href="#从私有仓库中下载私有包" aria-hidden="true">#</a> 从私有仓库中下载私有包</h3>',11),V=a("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[a("pre",{class:"language-bash"},[a("code",null,[a("span",{class:"token function"},"npm"),e(),a("span",{class:"token function"},"install"),e(),a("span",{class:"token parameter variable"},"--registry"),e(` http://localhost:4873
`)])]),a("div",{class:"line-numbers","aria-hidden":"true"},[a("div",{class:"line-number"})])],-1),D=a("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[a("pre",{class:"language-bash"},[a("code",null,[a("span",{class:"token assign-left variable"},"registry"),a("span",{class:"token operator"},"="),e(`http://localhost:4873
`)])]),a("div",{class:"line-numbers","aria-hidden":"true"},[a("div",{class:"line-number"})])],-1),w=a("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[a("pre",{class:"language-bash"},[a("code",null,[a("span",{class:"token punctuation"},"{"),e(`
  `),a("span",{class:"token string"},'"publishConfig"'),a("span",{class:"token builtin class-name"},":"),e(),a("span",{class:"token punctuation"},"{"),e(`
    `),a("span",{class:"token string"},'"registry"'),a("span",{class:"token builtin class-name"},":"),e(),a("span",{class:"token string"},'"http://localhost:4873"'),e(`
  `),a("span",{class:"token punctuation"},"}"),e(`
`),a("span",{class:"token punctuation"},"}"),e(`
`)])]),a("div",{class:"line-numbers","aria-hidden":"true"},[a("div",{class:"line-number"}),a("div",{class:"line-number"}),a("div",{class:"line-number"}),a("div",{class:"line-number"}),a("div",{class:"line-number"})])],-1),B={href:"https://verdaccio.org/zh-CN/docs/cli-registry",target:"_blank",rel:"noopener noreferrer"},z=c(`<h3 id="缓存-npm-公共包" tabindex="-1"><a class="header-anchor" href="#缓存-npm-公共包" aria-hidden="true">#</a> 缓存 npm 公共包</h3><p>配置好私有仓库之后，每次我们下载公共包的时候，会自动把包文件缓存在</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code> C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>dingyongya<span class="token punctuation">\\</span>AppData<span class="token punctuation">\\</span>Roaming<span class="token punctuation">\\</span>verdaccio<span class="token punctuation">\\</span>storage
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>私有包也是会存在storage这个文件夹下面的，当公共包被缓存之后，再次下载的时候，会首先在这个仓库中获取，大大的加速了包文件的下载速度，但是verdaccio官网上面显示缓存的过期时间默认是2分钟，如果想避免缓存的话可以在config.yml中设置 cache：false</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>uplinks:
  npmjs:
    url: https://registry.npmjs.org/
    cache: <span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function E(I,L){const l=d("CodeTabs"),r=d("ExternalLinkIcon");return p(),u("div",null,[k,t(l,{id:"90",data:[{id:"npm"},{id:"yarn"},{id:"pnpm"}],active:0,"tab-id":"shell"},{title0:s(({value:n,isActive:i})=>[e("npm")]),title1:s(({value:n,isActive:i})=>[e("yarn")]),title2:s(({value:n,isActive:i})=>[e("pnpm")]),tab0:s(({value:n,isActive:i})=>[f]),tab1:s(({value:n,isActive:i})=>[x]),tab2:s(({value:n,isActive:i})=>[y]),_:1}),A,a("p",null,[e("其中第一行是 "),C,e(" 配置文件的目录，相关配置都在config.yaml中进行配置，"),a("a",N,[e("verdaccio配置文件文档"),t(r)])]),j,t(l,{id:"147",data:[{id:"registry"},{id:".npmrc"},{id:"package.json"}],"tab-id":"shell"},{title0:s(({value:n,isActive:i})=>[e("registry")]),title1:s(({value:n,isActive:i})=>[e(".npmrc")]),title2:s(({value:n,isActive:i})=>[e("package.json")]),tab0:s(({value:n,isActive:i})=>[V]),tab1:s(({value:n,isActive:i})=>[D]),tab2:s(({value:n,isActive:i})=>[w]),_:1},8,["data"]),a("p",null,[e("如需其他配置，请阅读 "),a("a",B,[e("使用私有 registry "),t(r)]),e("部分。")]),z])}const R=o(_,[["render",E],["__file","verdaccio.html.vue"]]);export{R as default};