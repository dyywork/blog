import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,a as s}from"./app-CpMH9fV-.js";const t={},o=s(`<h1 id="小程序" tabindex="-1"><a class="header-anchor" href="#小程序"><span>小程序</span></a></h1><h2 id="vue-和-nvue-不同" tabindex="-1"><a class="header-anchor" href="#vue-和-nvue-不同"><span>.vue 和 .nvue 不同</span></a></h2><p><code>.vue</code>文件会使用webview进行渲染，<code>.nvue</code>会使用原生进行渲染.</p><p>进程 ： 独立内存空间</p><p>线程： 进程里面运行的为线程</p><h2 id="tabbar-导航栏局限性" tabindex="-1"><a class="header-anchor" href="#tabbar-导航栏局限性"><span>tabBar &amp; 导航栏局限性</span></a></h2><p>tabBar 暂不支持iconfont ，目前只支持APP<br> 导航栏不支持标题居中</p><h2 id="微信小程序-css-border-radius元素-overflow-hidden失效问题-iphone-ios-苹果兼容问题" tabindex="-1"><a class="header-anchor" href="#微信小程序-css-border-radius元素-overflow-hidden失效问题-iphone-ios-苹果兼容问题"><span>微信小程序 CSS border-radius元素 overflow:hidden失效问题 iPhone ios 苹果兼容问题</span></a></h2><p>父元素使用border-radius 和 overflow：hidden；子元素使用了transform属性，父元素的overflow：hidden；会失效。</p><p>解决方法：父元素设置以下两个属性：</p><div class="language-css line-numbers-mode" data-ext="css" data-title="css"><pre class="language-css"><code><span class="token property">-webkit-backface-visibility</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token property">-webkit-transform</span><span class="token punctuation">:</span> <span class="token function">translate3d</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="文字超出显示省略号" tabindex="-1"><a class="header-anchor" href="#文字超出显示省略号"><span>文字超出显示省略号</span></a></h2><div class="hint-container tip"><p class="hint-container-title">注释</p><p>注意 <code>height</code> 属性，<code>line-height</code> 属性，必须设置，不然可能会把需要隐藏的展示出来</p></div><div class="language-css line-numbers-mode" data-ext="css" data-title="css"><pre class="language-css"><code><span class="token property">display</span><span class="token punctuation">:</span> -webkit-box<span class="token punctuation">;</span>
<span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token property">text-overflow</span><span class="token punctuation">:</span> ellipsis<span class="token punctuation">;</span>
<span class="token property">word-break</span><span class="token punctuation">:</span> break-all<span class="token punctuation">;</span>
<span class="token property">-webkit-box-orient</span><span class="token punctuation">:</span> vertical<span class="token punctuation">;</span>
<span class="token property">-webkit-line-clamp</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span> <span class="token comment">/*显示行数*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ios-下载视频失败" tabindex="-1"><a class="header-anchor" href="#ios-下载视频失败"><span>IOS 下载视频失败</span></a></h2><div class="hint-container tip"><p class="hint-container-title">解决方式</p><p>压缩后下载即可</p></div>`,16),i=[o];function r(p,c){return n(),a("div",null,i)}const u=e(t,[["render",r],["__file","xiaochengxu.html.vue"]]),h=JSON.parse('{"path":"/weixin/xiaochengxu.html","title":"小程序","lang":"zh-CN","frontmatter":{"date":"2022-09-28T00:00:00.000Z","category":["uni-app"],"description":"小程序 .vue 和 .nvue 不同 .vue文件会使用webview进行渲染，.nvue会使用原生进行渲染. 进程 ： 独立内存空间 线程： 进程里面运行的为线程 tabBar & 导航栏局限性 tabBar 暂不支持iconfont ，目前只支持APP 导航栏不支持标题居中 微信小程序 CSS border-radius元素 overflow:h...","head":[["meta",{"property":"og:url","content":"https://dyywork.github.io/blog/weixin/xiaochengxu.html"}],["meta",{"property":"og:site_name","content":"莫名点"}],["meta",{"property":"og:title","content":"小程序"}],["meta",{"property":"og:description","content":"小程序 .vue 和 .nvue 不同 .vue文件会使用webview进行渲染，.nvue会使用原生进行渲染. 进程 ： 独立内存空间 线程： 进程里面运行的为线程 tabBar & 导航栏局限性 tabBar 暂不支持iconfont ，目前只支持APP 导航栏不支持标题居中 微信小程序 CSS border-radius元素 overflow:h..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-02T01:55:40.000Z"}],["meta",{"property":"article:author","content":"Mr.Ding"}],["meta",{"property":"article:published_time","content":"2022-09-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-02T01:55:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"小程序\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-09-28T00:00:00.000Z\\",\\"dateModified\\":\\"2024-02-02T01:55:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Ding\\"}]}"]]},"headers":[{"level":2,"title":".vue 和 .nvue 不同","slug":"vue-和-nvue-不同","link":"#vue-和-nvue-不同","children":[]},{"level":2,"title":"tabBar & 导航栏局限性","slug":"tabbar-导航栏局限性","link":"#tabbar-导航栏局限性","children":[]},{"level":2,"title":"微信小程序 CSS border-radius元素 overflow:hidden失效问题 iPhone ios 苹果兼容问题","slug":"微信小程序-css-border-radius元素-overflow-hidden失效问题-iphone-ios-苹果兼容问题","link":"#微信小程序-css-border-radius元素-overflow-hidden失效问题-iphone-ios-苹果兼容问题","children":[]},{"level":2,"title":"文字超出显示省略号","slug":"文字超出显示省略号","link":"#文字超出显示省略号","children":[]},{"level":2,"title":"IOS 下载视频失败","slug":"ios-下载视频失败","link":"#ios-下载视频失败","children":[]}],"git":{"createdTime":1681466710000,"updatedTime":1706838940000,"contributors":[{"name":"dingyongya","email":"yahya_dyy@163.com","commits":3}]},"readingTime":{"minutes":0.83,"words":250},"filePathRelative":"weixin/xiaochengxu.md","localizedDate":"2022年9月28日","excerpt":"\\n<h2>.vue 和 .nvue 不同</h2>\\n<p><code>.vue</code>文件会使用webview进行渲染，<code>.nvue</code>会使用原生进行渲染.</p>\\n<p>进程 ： 独立内存空间</p>\\n<p>线程： 进程里面运行的为线程</p>\\n<h2>tabBar &amp; 导航栏局限性</h2>\\n<p>tabBar 暂不支持iconfont ，目前只支持APP<br>\\n导航栏不支持标题居中</p>\\n<h2>微信小程序 CSS border-radius元素 overflow:hidden失效问题 iPhone ios 苹果兼容问题</h2>\\n<p>父元素使用border-radius 和 overflow：hidden；子元素使用了transform属性，父元素的overflow：hidden；会失效。</p>","autoDesc":true}');export{u as comp,h as data};
