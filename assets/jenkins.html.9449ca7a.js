import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,a as i}from"./app.9de92c76.js";const t="/blog/assets/img_5.20911a18.png",e="/blog/assets/img_7.da3a7b2c.png",l="/blog/assets/img_6.9c3dea0d.png",p="/blog/assets/img_8.4d9927d4.png",c="/blog/assets/img_12.10fc2130.png",o="/blog/assets/img_9.e21ebf2d.png",u="/blog/assets/img_10.99c69c2b.png",d="/blog/assets/img_11.95fbdf79.png",r="/blog/assets/img_13.9d4d792e.png",m="/blog/assets/img_15.69ed7dc5.png",g="/blog/assets/img_14.47642992.png",v={},b=i('<h1 id="jenkins" tabindex="-1"><a class="header-anchor" href="#jenkins" aria-hidden="true">#</a> jenkins</h1><h2 id="pipeline-\u4EFB\u52A1\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#pipeline-\u4EFB\u52A1\u914D\u7F6E" aria-hidden="true">#</a> PipeLine \u4EFB\u52A1\u914D\u7F6E</h2><ul><li>\u5B89\u88C5jenkins\uFF0C \u767B\u5F55\uFF0C\u4E0B\u8F7D\u6240\u9700\u63D2\u4EF6</li><li>\u767B\u5F55\u8D26\u53F7\uFF0C\u65B0\u589EPipeline \u4EFB\u52A1 <img src="'+t+'" alt=""></li></ul><h3 id="\u90E8\u7F72node-express-\u5E94\u7528-gitee-push-\u81EA\u52A8\u53D1\u5E03" tabindex="-1"><a class="header-anchor" href="#\u90E8\u7F72node-express-\u5E94\u7528-gitee-push-\u81EA\u52A8\u53D1\u5E03" aria-hidden="true">#</a> \u90E8\u7F72node express \u5E94\u7528 gitee push \u81EA\u52A8\u53D1\u5E03</h3><ul><li>\u914D\u7F6Enode \u73AF\u5883, \u4E0B\u8F7Dnode, gitee\u63D2\u4EF6 <img src="'+e+'" alt=""><img src="'+l+'" alt=""><img src="'+p+'" alt=""><img src="'+c+'" alt=""></li><li>\u914D\u7F6E\u7CFB\u7EDF\u914D\u7F6E <img src="'+o+'" alt=""><img src="'+u+'" alt=""><img src="'+d+'" alt=""></li><li>\u9879\u76EE\u914D\u7F6E <img src="'+r+'" alt=""></li></ul><h3 id="\u79C1\u6709\u9879\u76EEgit\u53D1\u5E03\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u79C1\u6709\u9879\u76EEgit\u53D1\u5E03\u914D\u7F6E" aria-hidden="true">#</a> \u79C1\u6709\u9879\u76EEgit\u53D1\u5E03\u914D\u7F6E</h3><ul><li><p>\u6DFB\u52A0\u5168\u5C40\u51ED\u636E</p><p><img src="'+m+'" alt=""></p></li><li><p>\u6DFB\u52A0\u51ED\u636Eid</p><p><img src="'+g+`" alt=""></p></li><li><p>\u6D41\u6C34\u7EBF\u547D\u4EE4</p></li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>
pipeline <span class="token punctuation">{</span>
    agent any
    
    tools <span class="token punctuation">{</span>nodejs <span class="token string">&quot;node1617&quot;</span><span class="token punctuation">}</span>  <span class="token comment"># \u8FD9\u91CC\u4E3A\u6211\u4EEC\u4E0A\u9762\u914D\u7F6E\u7684node \u7684\u540D\u79F0</span>
    
    stages <span class="token punctuation">{</span>
        stage<span class="token punctuation">(</span><span class="token string">&quot;checkout&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps<span class="token punctuation">{</span>
                 git<span class="token punctuation">(</span><span class="token punctuation">[</span>url:<span class="token string">&#39;https://gitee.com/\u9879\u76EE\u5730\u5740.git&#39;</span>,branch:<span class="token string">&quot;menu&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        stage<span class="token punctuation">(</span><span class="token string">&#39;install&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          
            steps <span class="token punctuation">{</span>
                <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u5B89\u88C5&quot;</span>
                bat <span class="token string">&quot;cnpm install&quot;</span> <span class="token comment"># window \u7528 bat ,linux \u7528 sh</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
         stage<span class="token punctuation">(</span><span class="token string">&#39;delete&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u5220\u9664&quot;</span>
                bat <span class="token string">&quot;npm run delete&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
         stage<span class="token punctuation">(</span><span class="token string">&#39;start&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u542F\u52A8&quot;</span>
                bat <span class="token string">&quot;npm run prd&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),k=[b];function _(h,q){return s(),a("div",null,k)}const j=n(v,[["render",_],["__file","jenkins.html.vue"]]);export{j as default};
