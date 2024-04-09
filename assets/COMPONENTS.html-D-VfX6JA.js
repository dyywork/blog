import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as t,o as p,c as o,b as n,d as s,e as l,a as i}from"./app-CC1QM69O.js";const c={},u=n("h1",{id:"组件库搭建",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#组件库搭建","aria-hidden":"true"},"#"),s(" 组件库搭建")],-1),r={href:"https://dyywork.github.io/vue-components/",target:"_blank",rel:"noopener noreferrer"},d=i(`<h2 id="使用vuecli3搭建组件库" tabindex="-1"><a class="header-anchor" href="#使用vuecli3搭建组件库" aria-hidden="true">#</a> 使用vueCli3搭建组件库</h2><ol><li>首先使用vueCli 创建一个初始化项目</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vue create my-components
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>创建一个vue组件的文件夹，目录结构如下</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    |component
    |---oneComponent
    |---|---oneComponent.vue
    |---|---index.js
    |---index.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>oneComponent.vue 如下</li></ol><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>oneComponent{{count}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
    
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;oneComponent&quot;</span><span class="token punctuation">,</span>
			<span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">scoped</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
    
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>oneComponent.vue同级目录下创建index.js</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> oneComponent <span class="token keyword">from</span> <span class="token string">&quot;./oneComponent&quot;</span><span class="token punctuation">;</span>

mgSearchForm<span class="token punctuation">.</span><span class="token function-variable function">install</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span>oneComponent<span class="token punctuation">.</span>name<span class="token punctuation">,</span> oneComponent<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> oneComponent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li>component 文件夹下的index.js</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> oneComponent <span class="token keyword">from</span> <span class="token string">&quot;./oneComponent&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> components <span class="token operator">=</span> <span class="token punctuation">[</span>
    oneComponent<span class="token punctuation">,</span>
<span class="token punctuation">]</span>

<span class="token keyword">const</span> <span class="token function-variable function">install</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>install<span class="token punctuation">.</span>installed<span class="token punctuation">)</span> <span class="token keyword">return</span>
    components<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">component</span> <span class="token operator">=&gt;</span> Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span>component<span class="token punctuation">.</span>name<span class="token punctuation">,</span> component<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> window <span class="token operator">!==</span> <span class="token string">&#39;undefined&#39;</span> <span class="token operator">&amp;&amp;</span> window<span class="token punctuation">.</span>Vue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">install</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>Vue<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    install<span class="token punctuation">,</span>
    <span class="token comment">// 以下是具体的组件列表</span>
    oneComponent<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6"><li>打包</li></ol><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code> <span class="token punctuation">{</span>
    <span class="token property">&quot;lib&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vue-cli-service build --target lib --name vueComponents --dest lib components/index.js&quot;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="7"><li>发布 发布时可通过.npmignore 来配置不想提交的文件文件夹，和.gitignore 配置一样</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>npm login
// 登录成功后
npm publish
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="处理组件文档md" tabindex="-1"><a class="header-anchor" href="#处理组件文档md" aria-hidden="true">#</a> 处理组件文档md</h2><ol><li>主要用到的插件</li></ol><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>    <span class="token punctuation">{</span>
        <span class="token property">&quot;github-markdown-css&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^5.1.0&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;highlight.js&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^11.5.1&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;dingyongya-vue-markdown-loader&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^2.5.6&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;vue-loader&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^14.0.0&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;vue-template-compiler&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^2.6.14&quot;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>vue.config.js的配置</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">publicPath</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">&#39;production&#39;</span>
        <span class="token operator">?</span> <span class="token string">&#39;./&#39;</span>
        <span class="token operator">:</span> <span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">configureWebpack</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">alias</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token string-property property">&quot;@docs&quot;</span><span class="token operator">:</span>  path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;docs&#39;</span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">chainWebpack</span><span class="token operator">:</span> <span class="token parameter">config</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        config<span class="token punctuation">.</span>module<span class="token punctuation">.</span><span class="token function">rule</span><span class="token punctuation">(</span><span class="token string">&#39;md&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.md</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">&#39;vue-loader&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">loader</span><span class="token punctuation">(</span><span class="token string">&#39;vue-loader&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">&#39;dingyongya-vue-markdown-loader&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">loader</span><span class="token punctuation">(</span><span class="token string">&#39;dingyongya-vue-markdown-loader/lib/markdown-compiler&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">options</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">raw</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token literal-property property">script</span><span class="token operator">:</span> <span class="token boolean">true</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20);function k(v,m){const a=t("ExternalLinkIcon");return p(),o("div",null,[u,n("p",null,[n("a",r,[s("线上Dome vue-components"),l(a)])]),d])}const y=e(c,[["render",k],["__file","COMPONENTS.html.vue"]]);export{y as default};
