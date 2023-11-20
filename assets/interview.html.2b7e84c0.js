import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o,c as a,a as d}from"./app.2d23223a.js";const c="/blog/assets/img.2ca8a8b8.png",n={},t=d(`<h1 id="react-\u751F\u547D\u5468\u671F" tabindex="-1"><a class="header-anchor" href="#react-\u751F\u547D\u5468\u671F" aria-hidden="true">#</a> react \u751F\u547D\u5468\u671F</h1><h2 id="\u7EC4\u4EF6-props\u7684\u53EA\u8BFB\u6027" tabindex="-1"><a class="header-anchor" href="#\u7EC4\u4EF6-props\u7684\u53EA\u8BFB\u6027" aria-hidden="true">#</a> \u7EC4\u4EF6 &amp;&amp; Props\u7684\u53EA\u8BFB\u6027</h2><h3 id="_1-\u7EAF\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#_1-\u7EAF\u51FD\u6570" aria-hidden="true">#</a> 1. \u7EAF\u51FD\u6570</h3><ul><li>\u51FD\u6570<code>\u4E0D\u4F1A</code>\u5C1D\u8BD5<code>\u66F4\u6539\u5165\u53C2</code>\uFF0C\u4E14\u591A\u6B21\u8C03\u7528\u4E0B\u76F8\u540C\u7684\u5165\u53C2\u59CB\u7EC8\u8FD4\u56DE\u76F8\u540C\u7684\u7ED3\u679C,\u8FD9\u6837\u7684\u51FD\u6570\u79F0\u4E4B\u4E3A<code>\u201C\u7EAF\u51FD\u6570\u201D</code>\u3002</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-props-\u7684\u53EA\u8BFB\u6027" tabindex="-1"><a class="header-anchor" href="#_2-props-\u7684\u53EA\u8BFB\u6027" aria-hidden="true">#</a> 2. Props \u7684\u53EA\u8BFB\u6027</h3><ul><li>\u7EC4\u4EF6\u65E0\u8BBA\u662F\u4F7F\u7528\u51FD\u6570\u58F0\u660E\u8FD8\u662F\u901A\u8FC7 class \u58F0\u660E\uFF0C\u90FD<code>\u51B3\u4E0D\u80FD\u4FEE\u6539</code>\u81EA\u8EAB\u7684 <code>props</code>\u3002</li><li>\u6240\u6709 React \u7EC4\u4EF6\u90FD\u5FC5\u987B\u50CF<code>\u7EAF\u51FD\u6570</code>\u4E00\u6837\u4FDD\u62A4\u5B83\u4EEC\u7684 <code>props \u4E0D\u88AB\u66F4\u6539</code>\u3002</li></ul><h2 id="\u751F\u547D\u5468\u671F" tabindex="-1"><a class="header-anchor" href="#\u751F\u547D\u5468\u671F" aria-hidden="true">#</a> \u751F\u547D\u5468\u671F</h2><h3 id="_1-\u52A0\u8F7D\u7EC4\u4EF6\u65F6\u65B9\u6CD5\u7684\u8C03\u7528\u987A\u5E8F" tabindex="-1"><a class="header-anchor" href="#_1-\u52A0\u8F7D\u7EC4\u4EF6\u65F6\u65B9\u6CD5\u7684\u8C03\u7528\u987A\u5E8F" aria-hidden="true">#</a> 1.\u52A0\u8F7D\u7EC4\u4EF6\u65F6\u65B9\u6CD5\u7684\u8C03\u7528\u987A\u5E8F</h3><p><img src="`+c+`" alt="Alt" title="\u56FE\u7247\u6807\u9898"></p><h4 id="_1-\u9996\u6B21\u52A0\u8F7D" tabindex="-1"><a class="header-anchor" href="#_1-\u9996\u6B21\u52A0\u8F7D" aria-hidden="true">#</a> 1. \u9996\u6B21\u52A0\u8F7D</h4><p><code>constructor</code> ---&gt; <code>static getDerivedStateFromProps()</code> \u521D\u59CB\u5316 <code>this.state</code> ---&gt; <code>render()</code> ---&gt; <code>React \u66F4\u65B0 DOM \u548C refs</code> ---&gt; <code>componentDidMount()</code></p><h4 id="_2-\u66F4\u65B0" tabindex="-1"><a class="header-anchor" href="#_2-\u66F4\u65B0" aria-hidden="true">#</a> 2. \u66F4\u65B0</h4><p><code>&quot;New props&quot;</code>, <code>&quot;setSate()&quot;</code>, <code>&quot;forceUpdate&quot;</code> \u4E09\u79CD\u65B9\u5F0F\u66F4\u65B0\u89E6\u53D1</p><p><code>static getDerivedStateFromProps()</code> ---&gt; <code>shouldComponentUpdate()</code> \u4F7F\u7528 &quot;forceUpdate&quot; \u4E0D\u89E6\u53D1\uFF0C \u8FD4\u56DE\u503Cfalse \u4E0D\u91CD\u65B0\u6E32\u67D3 ---&gt; <code>render()</code> ---&gt; <code>getSnapshotBeforeUpdate()</code>---&gt; <code>React \u66F4\u65B0 DOM \u548C refs</code> ---&gt; <code>componentDidUpdate()</code></p><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p><code>getSnapshotBeforeUpdate()</code> \u5728\u6700\u8FD1\u4E00\u6B21\u6E32\u67D3\u8F93\u51FA\uFF08\u63D0\u4EA4\u5230 DOM \u8282\u70B9\uFF09\u4E4B\u524D\u8C03\u7528\u3002\u5B83\u4F7F\u5F97\u7EC4\u4EF6\u80FD\u5728\u53D1\u751F\u66F4\u6539\u4E4B\u524D\u4ECE DOM \u4E2D\u6355\u83B7\u4E00\u4E9B\u4FE1\u606F\uFF08\u4F8B\u5982\uFF0C\u6EDA\u52A8\u4F4D\u7F6E\uFF09\u3002\u6B64\u751F\u547D\u5468\u671F\u65B9\u6CD5\u7684\u4EFB\u4F55\u8FD4\u56DE\u503C\u5C06\u4F5C\u4E3A\u53C2\u6570<code>snapshot</code>\u4F20\u9012\u7ED9 <code>componentDidUpdate(prevProps, prevState, snapshot)</code></p></div><h4 id="_3-\u5378\u8F7D\u65F6" tabindex="-1"><a class="header-anchor" href="#_3-\u5378\u8F7D\u65F6" aria-hidden="true">#</a> 3. \u5378\u8F7D\u65F6</h4><p><code>\u7EC4\u4EF6</code> \u4ECE <code>DOM</code> \u4E2D\u88AB\u79FB\u9664 --&gt; <code>componentWillUnmount()</code></p><h3 id="componentdidupdate\u7528\u6CD5" tabindex="-1"><a class="header-anchor" href="#componentdidupdate\u7528\u6CD5" aria-hidden="true">#</a> componentDidUpdate\u7528\u6CD5</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>	<span class="token function">componentDidUpdate</span><span class="token punctuation">(</span>prevProps<span class="token punctuation">,</span> prevState<span class="token punctuation">,</span> snapshot<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><ol><li><code>componentDidUpdate()</code> \u4F1A\u5728\u66F4\u65B0\u540E\u4F1A\u88AB\u7ACB\u5373\u8C03\u7528\u3002\u9996\u6B21\u6E32\u67D3\u4E0D\u4F1A\u6267\u884C\u6B64\u65B9\u6CD5\u3002</li><li>\u5F53\u7EC4\u4EF6\u66F4\u65B0\u540E\uFF0C\u53EF\u4EE5\u5728\u6B64\u5904\u5BF9 DOM \u8FDB\u884C\u64CD\u4F5C</li><li>\u53EF\u4EE5\u5728\u5176\u4E2D\u76F4\u63A5\u8C03\u7528<code>setState()</code>,\u4F46\u8981\u88AB\u5305\u88F9\u5728\u4E00\u4E2A\u6761\u4EF6\u8BED\u53E5\u91CC\uFF1B\u5426\u5219\u4F1A\u5BFC\u81F4\u6B7B\u5FAA\u73AF</li><li>\u5982\u679C\u7EC4\u4EF6\u5B9E\u73B0\u4E86 <code>getSnapshotBeforeUpdate()</code> \u751F\u547D\u5468\u671F\uFF08\u4E0D\u5E38\u7528\uFF09\uFF0C\u5219\u5B83\u7684\u8FD4\u56DE\u503C\u5C06\u4F5C\u4E3A <code>componentDidUpdate()</code> \u7684\u7B2C\u4E09\u4E2A\u53C2\u6570 <code>\u201Csnapshot\u201D</code> \u53C2\u6570\u4F20\u9012\u3002\u5426\u5219\u6B64\u53C2\u6570\u5C06\u4E3A <code>undefined</code>\u3002</li><li>\u5982\u679C <code>shouldComponentUpdate()</code> \u8FD4\u56DE\u503C\u4E3A <code>false</code>\uFF0C\u5219\u4E0D\u4F1A\u8C03\u7528 <code>componentDidUpdate()</code>\u3002</li></ol></div><h2 id="react\u4E2D\u7684\u4F20\u503C\u65B9\u5F0F" tabindex="-1"><a class="header-anchor" href="#react\u4E2D\u7684\u4F20\u503C\u65B9\u5F0F" aria-hidden="true">#</a> react\u4E2D\u7684\u4F20\u503C\u65B9\u5F0F</h2><h3 id="_1-\u7236\u4F20\u5B50" tabindex="-1"><a class="header-anchor" href="#_1-\u7236\u4F20\u5B50" aria-hidden="true">#</a> 1.\u7236\u4F20\u5B50</h3><ul><li><code>props</code> \u4F20\u9012</li><li><code>context</code> \u4F20\u9012</li><li><code>redux</code> \u4F20\u9012</li></ul><h3 id="_2-\u5B50\u4F20\u7236" tabindex="-1"><a class="header-anchor" href="#_2-\u5B50\u4F20\u7236" aria-hidden="true">#</a> 2. \u5B50\u4F20\u7236</h3><ul><li><code>props</code> \u4F20\u9012</li><li><code>redux</code> \u4F20\u9012</li></ul><h3 id="_3-\u5144\u5F1F\u7EC4\u4EF6\u4F20\u9012" tabindex="-1"><a class="header-anchor" href="#_3-\u5144\u5F1F\u7EC4\u4EF6\u4F20\u9012" aria-hidden="true">#</a> 3. \u5144\u5F1F\u7EC4\u4EF6\u4F20\u9012</h3><ul><li><code>props</code> \u4F20\u9012</li><li><code>redux</code> \u4F20\u9012</li></ul><h2 id="context\u7684\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#context\u7684\u4F7F\u7528" aria-hidden="true">#</a> context\u7684\u4F7F\u7528</h2><p>\u6570\u636E\u662F\u901A\u8FC7 <code>props</code> \u5C5E\u6027<code>\u81EA\u4E0A\u800C\u4E0B\uFF08\u7531\u7236\u53CA\u5B50\uFF09</code>\u8FDB\u884C\u4F20\u9012\u7684;<code>Context</code> \u63D0\u4F9B\u4E86\u4E00\u79CD\u5728\u7EC4\u4EF6\u4E4B\u95F4<code>\u5171\u4EAB\u6B64\u7C7B\u503C</code>\u7684\u65B9\u5F0F\uFF0C\u800C\u4E0D\u5FC5\u663E\u5F0F\u5730\u901A\u8FC7\u7EC4\u4EF6\u6811\u7684\u9010\u5C42\u4F20\u9012 <code>props</code>\u3002</p><h3 id="_1-provider\u7684\u7528\u6CD5" tabindex="-1"><a class="header-anchor" href="#_1-provider\u7684\u7528\u6CD5" aria-hidden="true">#</a> 1.provider\u7684\u7528\u6CD5</h3><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>&lt;MyContext.Provider value={/* \u67D0\u4E2A\u503C */}&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>Provider</code> \u63A5\u6536\u4E00\u4E2A<code>value</code> \u5C5E\u6027\uFF0C\u4F20\u9012\u7ED9<code>\u6D88\u8D39\u7EC4\u4EF6</code>\u3002\u4E00\u4E2A <code>Provider</code> \u53EF\u4EE5\u548C<code>\u591A\u4E2A\u6D88\u8D39\u7EC4\u4EF6</code>\u6709\u5BF9\u5E94\u5173\u7CFB\u3002\u591A\u4E2A <code>Provider</code> \u4E5F\u53EF\u4EE5\u5D4C\u5957\u4F7F\u7528\uFF0C<code>\u91CC\u5C42\u7684\u4F1A\u8986\u76D6\u5916\u5C42</code>\u7684\u6570\u636E\u3002</p><p>\u5F53 <code>Provider</code> \u7684 <code>value</code> \u503C\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u5B83\u5185\u90E8\u7684\u6240\u6709<code>\u6D88\u8D39\u7EC4\u4EF6</code>\u90FD\u4F1A<code>\u91CD\u65B0\u6E32\u67D3</code>\u3002<code>Provider</code> \u53CA\u5176\u5185\u90E8 <code>consumer</code> \u7EC4\u4EF6\u90FD\u4E0D\u53D7\u5236\u4E8E <code>shouldComponentUpdate</code> \u51FD\u6570\uFF0C\u56E0\u6B64\u5F53 <code>consumer</code> \u7EC4\u4EF6\u5728\u5176\u7956\u5148\u7EC4\u4EF6\u9000\u51FA\u66F4\u65B0\u7684\u60C5\u51B5\u4E0B\u4E5F\u80FD\u66F4\u65B0\u3002</p><h3 id="_2-consumer\u7684\u7528\u6CD5" tabindex="-1"><a class="header-anchor" href="#_2-consumer\u7684\u7528\u6CD5" aria-hidden="true">#</a> 2.consumer\u7684\u7528\u6CD5</h3><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>MyContext.Consumer</span><span class="token punctuation">&gt;</span></span>
  {value =&gt; /* \u57FA\u4E8E context \u503C\u8FDB\u884C\u6E32\u67D3*/}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>MyContext.Consumer</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>\u51FD\u6570\u5F0F\u7EC4\u4EF6</code>\u4E2D\u5B8C\u6210\u8BA2\u9605 <code>context</code>\u3002</p><p>\u8FD9\u9700\u8981<code>\u51FD\u6570\u4F5C\u4E3A\u5B50\u5143\u7D20\uFF08function as a child\uFF09</code>\u8FD9\u79CD\u505A\u6CD5\u3002\u8FD9\u4E2A\u51FD\u6570\u63A5\u6536\u5F53\u524D\u7684 <code>context</code> \u503C\uFF0C\u8FD4\u56DE\u4E00\u4E2A <code>React</code> \u8282\u70B9\u3002\u4F20\u9012\u7ED9\u51FD\u6570\u7684 <code>value</code> \u503C\u7B49\u540C\u4E8E\u5F80\u4E0A\u7EC4\u4EF6\u6811\u79BB \u8FD9\u4E2A <code>context</code> \u6700\u8FD1\u7684 <code>Provider</code> \u63D0\u4F9B\u7684 <code>value</code> \u503C\u3002\u5982\u679C\u6CA1\u6709\u5BF9\u5E94\u7684 <code>Provider</code>\uFF0C<code>value</code> \u53C2\u6570\u7B49\u540C\u4E8E\u4F20\u9012\u7ED9 <code>createContext()</code> \u7684 <code>defaultValue</code>\u3002</p><ol start="6"><li>echarts\u4E2Dlabel\u6587\u5B57\u957F\u5EA6\u7684\u83B7\u53D6\uFF1B\u70B9\u51FB\u6BCF\u4E2A\u67F1\u5F62\u8981\u600E\u4E48\u8C03\u7528\u5F39\u6846</li><li>react\u4E2D\u53EF\u4EE5\u4F7F\u7528requirejs\u5417\uFF08\u4E00\u822C\u4F7F\u7528ES6\u6A21\u5757\u5316\u5BFC\u5165\uFF0C\u4E5F\u53EF\u4EE5\u7528require\uFF0C\u5199\u6CD5\u4E3A const component = require(&#39;./component&#39;) \uFF09</li><li>\u4E2D\u82F1\u6587\u6216\u4E3B\u9898\u8272\u5207\u6362\u600E\u4E48\u5B9E\u73B0\u7684\uFF1B\u5207\u6362\u540E\u9875\u9762\u4F1A\u5237\u65B0\u5417</li><li>\u5B89\u5168\u6027\u529F\u80FD\u505A\u8FC7\u54EA\u4E9B</li><li>\u52A0\u8F7D\u51E0\u767E\u9875\u7684pdf\u65F6\uFF0C\u6709\u4EC0\u4E48\u4F18\u5316\u64CD\u4F5C</li></ol>`,39),s=[t];function i(r,p){return o(),a("div",null,s)}const h=e(n,[["render",i],["__file","interview.html.vue"]]);export{h as default};