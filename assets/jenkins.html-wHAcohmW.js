import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,a as i}from"./app-tL3tEBxG.js";const t="/blog/assets/img_5-eNhE6cz_.png",e="/blog/assets/img_7-uYMr5bWH.png",l="/blog/assets/img_6-ZdU6p0CX.png",p="/blog/assets/img_8-ebXuRDnR.png",c="/blog/assets/img_12-rU09B1Rz.png",o="/blog/assets/img_9-Z3cNrSsQ.png",u="/blog/assets/img_10-ybCnj70M.png",r="/blog/assets/img_11-F7_3jK4T.png",d="/blog/assets/img_13-ElNatGpY.png",m="/blog/assets/img_15-cQzs9hE0.png",g="/blog/assets/img_14-mOrQkGQ2.png",v={},b=i('<h1 id="jenkins" tabindex="-1"><a class="header-anchor" href="#jenkins" aria-hidden="true">#</a> jenkins</h1><h2 id="pipeline-任务配置" tabindex="-1"><a class="header-anchor" href="#pipeline-任务配置" aria-hidden="true">#</a> PipeLine 任务配置</h2><ul><li>安装jenkins， 登录，下载所需插件</li><li>登录账号，新增Pipeline 任务 <img src="'+t+'" alt=""></li></ul><h3 id="部署node-express-应用-gitee-push-自动发布" tabindex="-1"><a class="header-anchor" href="#部署node-express-应用-gitee-push-自动发布" aria-hidden="true">#</a> 部署node express 应用 gitee push 自动发布</h3><ul><li>配置node 环境, 下载node, gitee插件 <img src="'+e+'" alt=""><img src="'+l+'" alt=""><img src="'+p+'" alt=""><img src="'+c+'" alt=""></li><li>配置系统配置 <img src="'+o+'" alt=""><img src="'+u+'" alt=""><img src="'+r+'" alt=""></li><li>项目配置 <img src="'+d+'" alt=""></li></ul><h3 id="私有项目git发布配置" tabindex="-1"><a class="header-anchor" href="#私有项目git发布配置" aria-hidden="true">#</a> 私有项目git发布配置</h3><ul><li><p>添加全局凭据</p><p><img src="'+m+'" alt=""></p></li><li><p>添加凭据id</p><p><img src="'+g+`" alt=""></p></li><li><p>流水线命令</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
pipeline <span class="token punctuation">{</span>
    agent any
    
    tools <span class="token punctuation">{</span>nodejs <span class="token string">&quot;node1617&quot;</span><span class="token punctuation">}</span>  <span class="token comment"># 这里为我们上面配置的node 的名称</span>
    
    stages <span class="token punctuation">{</span>
        stage<span class="token punctuation">(</span><span class="token string">&quot;checkout&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps<span class="token punctuation">{</span>
                 git<span class="token punctuation">(</span><span class="token punctuation">[</span>url:<span class="token string">&#39;https://gitee.com/项目地址.git&#39;</span>,branch:<span class="token string">&quot;menu&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        stage<span class="token punctuation">(</span><span class="token string">&#39;install&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          
            steps <span class="token punctuation">{</span>
                <span class="token builtin class-name">echo</span> <span class="token string">&quot;安装&quot;</span>
                bat <span class="token string">&quot;cnpm install&quot;</span> <span class="token comment"># window 用 bat ,linux 用 sh</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
         stage<span class="token punctuation">(</span><span class="token string">&#39;delete&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                <span class="token builtin class-name">echo</span> <span class="token string">&quot;删除&quot;</span>
                bat <span class="token string">&quot;npm run delete&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
         stage<span class="token punctuation">(</span><span class="token string">&#39;start&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                <span class="token builtin class-name">echo</span> <span class="token string">&quot;启动&quot;</span>
                bat <span class="token string">&quot;npm run prd&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),k=[b];function _(h,q){return s(),a("div",null,k)}const j=n(v,[["render",_],["__file","jenkins.html.vue"]]);export{j as default};
