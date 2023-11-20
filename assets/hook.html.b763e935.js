import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o,c,a as d}from"./app.2d23223a.js";const t={},a=d(`<h1 id="hooks" tabindex="-1"><a class="header-anchor" href="#hooks" aria-hidden="true">#</a> hooks</h1><h2 id="hooks\u7684\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#hooks\u7684\u4F7F\u7528" aria-hidden="true">#</a> hooks\u7684\u4F7F\u7528</h2><h4 style="color:red;">\u4E3A\u4EC0\u4E48\u8981\u7528Hook?</h4> <br> 1.\u5728\u7EC4\u4EF6\u4E4B\u95F4\u590D\u7528\u72B6\u6001\u903B\u8F91\u5F88\u96BE <ul><li><code>Hook</code> \u4F7F\u4F60\u5728\u65E0\u9700\u4FEE\u6539\u7EC4\u4EF6\u7ED3\u6784\u7684\u60C5\u51B5\u4E0B\u590D\u7528\u72B6\u6001\u903B\u8F91\u3002</li></ul><p>2.\u590D\u6742\u7EC4\u4EF6\u53D8\u5F97\u96BE\u4EE5\u7406\u89E3</p><ul><li><code>Hook</code> \u5C06\u7EC4\u4EF6\u4E2D<code>\u76F8\u4E92\u5173\u8054</code>\u7684\u90E8\u5206<code>\u62C6\u5206</code>\u6210\u66F4\u5C0F\u7684\u51FD\u6570\uFF08\u6BD4\u5982\u8BBE\u7F6E\u8BA2\u9605\u6216\u8BF7\u6C42\u6570\u636E\uFF09\uFF0C\u800C\u5E76\u975E\u5F3A\u5236\u6309\u7167\u751F\u547D\u5468\u671F\u5212\u5206\u3002\u4F60\u8FD8\u53EF\u4EE5\u4F7F\u7528 <code>reducer</code> \u6765\u7BA1\u7406\u7EC4\u4EF6\u7684\u5185\u90E8\u72B6\u6001\uFF0C\u4F7F\u5176\u66F4\u52A0\u53EF\u9884\u6D4B\u3002</li></ul><p>3.\u96BE\u4EE5\u7406\u89E3\u7684 class</p><ul><li><code>Hook</code> \u4F7F\u4F60\u5728\u975E <code>class</code> \u7684\u60C5\u51B5\u4E0B\u53EF\u4EE5\u4F7F\u7528\u66F4\u591A\u7684 <code>React</code> \u7279\u6027</li></ul><h4 style="color:red;">\u4EC0\u4E48\u662F Hook?</h4><ul><li><code>Hook</code> \u662F\u4E00\u4E9B\u53EF\u4EE5\u8BA9\u4F60\u5728<code>\u51FD\u6570\u7EC4\u4EF6</code>\u91CC<code>\u201C\u94A9\u5165\u201D React state</code> \u53CA<code>\u751F\u547D\u5468\u671F\u7B49\u7279\u6027</code>\u7684<code>\u51FD\u6570</code>\u3002<code>Hook</code> <code>\u4E0D\u80FD</code>\u5728 <code>class \u7EC4\u4EF6</code>\u4E2D\u4F7F\u7528 \u2014\u2014 \u8FD9\u4F7F\u5F97\u4F60\u4E0D\u4F7F\u7528 <code>class</code> \u4E5F\u80FD\u4F7F\u7528 <code>React</code>\u3002</li></ul><h4 style="color:red;">\u4EC0\u4E48\u662F &quot;\u526F\u4F5C\u7528&quot;?</h4><ul><li>\u4F60\u4E4B\u524D\u53EF\u80FD\u5DF2\u7ECF\u5728 <code>React</code> \u7EC4\u4EF6\u4E2D\u6267\u884C\u8FC7\u6570\u636E<code>\u83B7\u53D6\u3001\u8BA2\u9605</code>\u6216\u8005<code>\u624B\u52A8\u4FEE\u6539</code>\u8FC7 <code>DOM</code>\u3002\u6211\u4EEC\u7EDF\u4E00\u628A\u8FD9\u4E9B\u64CD\u4F5C\u79F0\u4E3A<code>\u201C\u526F\u4F5C\u7528\u201D</code>\uFF0C\u6216\u8005\u7B80\u79F0\u4E3A<code>\u201C\u4F5C\u7528\u201D</code>\u3002</li></ul><h2 id="usestate" tabindex="-1"><a class="header-anchor" href="#usestate" aria-hidden="true">#</a> useState</h2><h4 style="color:red;">\u8C03\u7528 useState \u65B9\u6CD5\u7684\u65F6\u5019\u505A\u4E86\u4EC0\u4E48?</h4><ul><li>\u5B83\u5B9A\u4E49\u4E00\u4E2A <code>\u201Cstate \u53D8\u91CF\u201D</code>,\u4E00\u822C\u6765\u8BF4\uFF0C\u5728<code>\u51FD\u6570\u9000\u51FA</code>\u540E<code>\u53D8\u91CF</code>\u5C31<code>\u4F1A\u201D\u6D88\u5931\u201D</code>\uFF0C\u800C <code>state</code> \u4E2D\u7684\u53D8\u91CF\u4F1A\u88AB<code> React \u4FDD\u7559</code>\u3002</li></ul><h4 style="color:red;">useState \u9700\u8981\u54EA\u4E9B\u53C2\u6570\uFF1F</h4><p>-<code>useState()</code> \u65B9\u6CD5\u91CC\u9762\u552F\u4E00\u7684\u53C2\u6570\u5C31\u662F\u521D\u59CB <code>state</code>;\u60F3\u521D\u59CB\u5316\u4E24\u4E2A\u53D8\u91CF\uFF0C\u5C31\u8C03\u7528\u4E24\u6B21<code>useState()</code></p><h4 style="color:red;">useState \u65B9\u6CD5\u7684\u8FD4\u56DE\u503C\u662F\u4EC0\u4E48\uFF1F</h4><ul><li>\u8FD4\u56DE\u503C\u4E3A\uFF1A\u5F53\u524D <code>state</code> \u4EE5\u53CA<code>\u66F4\u65B0 state \u7684\u51FD\u6570</code>\u3002\u8FD9\u5C31\u662F\u6211\u4EEC\u5199 <code>const [count, setCount] = useState()</code> \u7684\u539F\u56E0; \u4F7F\u7528\u7684 <code>[]</code> \u4E2D\u62EC\u53F7</li></ul><h2 id="useeffect" tabindex="-1"><a class="header-anchor" href="#useeffect" aria-hidden="true">#</a> useEffect</h2><h3 id="_1-useeffect-\u4ECB\u7ECD" tabindex="-1"><a class="header-anchor" href="#_1-useeffect-\u4ECB\u7ECD" aria-hidden="true">#</a> 1.useEffect \u4ECB\u7ECD</h3><h4 style="color:red;">useEffect \u505A\u4E86\u4EC0\u4E48\uFF1F</h4><ul><li>\u5B83\u544A\u8BC9 <code>React \u7EC4\u4EF6</code>\u9700\u8981\u5728<code>\u6E32\u67D3\u540E</code>\u6267\u884C\u67D0\u4E9B\u64CD\u4F5C\u3002<code>React</code> \u4F1A<code>\u4FDD\u5B58</code>\u4F60<code>\u4F20\u9012\u7684\u51FD\u6570</code>\uFF08\u6211\u4EEC\u5C06\u5B83\u79F0\u4E4B\u4E3A \u201Ceffect\u201D\uFF09\uFF0C\u5E76\u4E14\u5728\u6267\u884C <code>DOM \u66F4\u65B0\u4E4B\u540E\u8C03\u7528\u5B83</code>\u3002</li></ul><h4 style="color:red;">\u4E3A\u4EC0\u4E48\u5728\u7EC4\u4EF6\u5185\u90E8\u8C03\u7528 useEffect\uFF1F</h4><p>-\u5C06 <code>useEffect</code> \u653E\u5728\u7EC4\u4EF6\u5185\u90E8\u8BA9\u6211\u4EEC\u53EF\u4EE5\u5728 <code>effect</code> \u4E2D\u76F4\u63A5\u8BBF\u95EE<code> count state</code> \u53D8\u91CF\uFF08\u6216\u5176\u4ED6 <code>props</code>\uFF09;<code>Hook</code> \u4F7F\u7528\u4E86 <code>JavaScript</code> \u7684<code>\u95ED\u5305\u673A\u5236</code>\uFF0C\u800C\u4E0D\u7528\u5728 <code>JavaScript</code> \u5DF2\u7ECF\u63D0\u4F9B\u4E86\u89E3\u51B3\u65B9\u6848\u7684\u60C5\u51B5\u4E0B\uFF0C\u8FD8\u5F15\u5165\u7279\u5B9A\u7684 <code>React API</code>\u3002</p><h4 style="color:red;">useEffect \u4F1A\u5728\u6BCF\u6B21\u6E32\u67D3\u540E\u90FD\u6267\u884C\u5417\uFF1F</h4><ul><li>\u5B83\u5728<code>\u7B2C\u4E00\u6B21\u6E32\u67D3\u4E4B\u540E</code>\u548C<code>\u6BCF\u6B21\u66F4\u65B0\u4E4B\u540E</code>\u90FD\u4F1A\u6267\u884C;<code>React</code> \u4FDD\u8BC1\u4E86\u6BCF\u6B21\u8FD0\u884C <code>effect</code> \u7684\u540C\u65F6\uFF0C<code>DOM</code> \u90FD\u5DF2\u7ECF<code>\u66F4\u65B0\u5B8C\u6BD5</code>\u3002</li></ul><h4 style="color:red;">useEffect \u662F\u4E0D\u662F\u5F02\u6B65\uFF1F</h4><ul><li><code>\u662F\u5F02\u6B65</code>\uFF1B\u5982\u679C\u9700\u8981<code>effect \u540C\u6B65</code>\u7684\u8BDD\uFF0C\u6709\u5355\u72EC\u7684 <code>useLayoutEffect Hook</code> \u4F9B\u4F60\u4F7F\u7528\uFF0C\u5176 <code>API</code> \u4E0E <code>useEffect</code> \u76F8\u540C\u3002</li></ul><h4 style="color:red;">useEffect \u7684\u4F18\u52BF\uFF1F</h4><ul><li>\u4E0E <code>componentDidMount</code> \u6216 <code>componentDidUpdate</code> \u4E0D\u540C\uFF0C\u4F7F\u7528 <code>useEffect</code> \u8C03\u5EA6\u7684 <code>effect</code> <code>\u4E0D\u4F1A\u963B\u585E\u6D4F\u89C8\u5668\u66F4\u65B0\u5C4F\u5E55</code>\uFF0C\u8FD9\u8BA9\u4F60\u7684\u5E94\u7528\u770B\u8D77\u6765<code>\u54CD\u5E94\u66F4\u5FEB\u3002</code></li></ul><h3 id="_2-\u9700\u8981\u6E05\u9664\u7684-effect" tabindex="-1"><a class="header-anchor" href="#_2-\u9700\u8981\u6E05\u9664\u7684-effect" aria-hidden="true">#</a> 2.\u9700\u8981\u6E05\u9664\u7684 effect</h3><p><code>useEffect</code> \u7684\u8BBE\u8BA1\u662F\u5728\u540C\u4E00\u4E2A\u5730\u65B9\u6267\u884C\u3002\u5982\u679C\u4F60\u7684 <code>effect</code> \u8FD4\u56DE\u4E00\u4E2A\u51FD\u6570\uFF0C<code>React</code> \u5C06\u4F1A\u5728<code>\u6267\u884C\u6E05\u9664\u64CD\u4F5C\u65F6\u8C03\u7528\u5B83</code></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u6E32\u67D3\u65F6\u6267\u884C \u76F8\u5F53\u4E8Eclas\u7EC4\u4EF6\u7684 componentDidMount componentDidUpdate </span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u7EC4\u4EF6\u5378\u8F7D\u65F6\u6267\u884C \u76F8\u5F53\u4E8Eclas\u7EC4\u4EF6\u7684</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u6CE81 \u4F8B\uFF1A[count] \u4EC5\u5728count \u66F4\u6539\u65F6\u66F4\u65B0 componentWillUnmount</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><ol><li>\u5982\u679C\u4F7F\u7528<code>\u6CE81</code>\u8FD9\u79CD\u4F18\u5316\u65B9\u5F0F\uFF0C\u8BF7\u786E\u4FDD\u6570\u7EC4\u4E2D\u5305\u542B\u4E86<code>\u6240\u6709\u5916\u90E8\u4F5C\u7528\u57DF</code>\u4E2D\u4F1A\u968F\u65F6\u95F4\u53D8\u5316\u5E76\u4E14\u5728 <code>effect</code> \u4E2D\u4F7F\u7528\u7684\u53D8\u91CF\uFF0C\u5426\u5219\u4F60\u7684\u4EE3\u7801\u4F1A\u5F15\u7528\u5230\u5148\u524D\u6E32\u67D3\u4E2D\u7684\u65E7\u53D8\u91CF;</li><li>\u5982\u679C\u60F3\u6267\u884C<code>\u53EA\u8FD0\u884C\u4E00\u6B21</code>\u7684 <code>effect</code>\uFF08\u4EC5\u5728\u7EC4\u4EF6<code>\u6302\u8F7D</code>\u548C<code>\u5378\u8F7D</code>\u65F6\u6267\u884C\uFF09\uFF0C\u53EF\u4EE5\u4F20\u9012\u4E00\u4E2A<code>\u7A7A\u6570\u7EC4\uFF08[]\uFF09</code>\u4F5C\u4E3A\u7B2C\u4E8C\u4E2A\u53C2\u6570\u3002</li></ol></div><h2 id="hook-\u89C4\u5219" tabindex="-1"><a class="header-anchor" href="#hook-\u89C4\u5219" aria-hidden="true">#</a> Hook \u89C4\u5219</h2><ol><li>\u53EA\u5728\u6700\u9876\u5C42\u4F7F\u7528 Hook</li></ol><ul><li><code>\u4E0D\u8981</code>\u5728<code>\u5FAA\u73AF\uFF0C\u6761\u4EF6\u6216\u5D4C\u5957\u51FD\u6570</code>\u4E2D\u8C03\u7528 <code>Hook</code>\uFF0C \u786E\u4FDD\u603B\u662F\u5728\u4F60\u7684 <code>React</code> <code>\u51FD\u6570\u7684\u6700\u9876\u5C42\u8C03\u7528\u4ED6\u4EEC</code>\u3002 \u9075\u5B88\u8FD9\u6761\u89C4\u5219\uFF0C\u4F60\u5C31\u80FD\u786E\u4FDD <code>Hook</code> \u5728\u6BCF\u4E00\u6B21\u6E32\u67D3\u4E2D\u90FD\u6309\u7167\u540C\u6837\u7684\u987A\u5E8F\u88AB\u8C03\u7528\u3002\u8FD9\u8BA9 <code>React</code> \u80FD\u591F\u5728\u591A\u6B21\u7684 <code>useState</code> \u548C <code>useEffect</code> \u8C03\u7528\u4E4B\u95F4\u4FDD\u6301 <code>hook</code> \u72B6\u6001\u7684\u6B63\u786E\u3002</li></ul><ol start="2"><li>\u53EA\u5728 React \u51FD\u6570\u4E2D\u8C03\u7528 Hook</li></ol><ul><li>\u4E0D\u8981\u5728\u666E\u901A\u7684 <code>JavaScript</code> \u51FD\u6570\u4E2D\u8C03\u7528 <code>Hook</code>\u3002</li><li>\u5728 <code>React</code> \u7684\u51FD\u6570\u7EC4\u4EF6\u4E2D\u8C03\u7528 <code>Hook</code></li><li>\u5728\u81EA\u5B9A\u4E49 <code>Hook</code> \u4E2D\u8C03\u7528\u5176\u4ED6 <code>Hook</code></li></ul><h2 id="\u81EA\u5B9A\u4E49hook" tabindex="-1"><a class="header-anchor" href="#\u81EA\u5B9A\u4E49hook" aria-hidden="true">#</a> \u81EA\u5B9A\u4E49Hook</h2><ul><li><code>\u81EA\u5B9A\u4E49 Hook</code> \u662F\u4E00\u4E2A<code>\u51FD\u6570</code>\uFF0C\u5176\u540D\u79F0\u4EE5 <code>\u201Cuse\u201D \u5F00\u5934</code>\uFF0C\u51FD\u6570\u5185\u90E8<code>\u53EF\u4EE5\u8C03\u7528</code>\u5176\u4ED6\u7684 <code>Hook</code>\u3002</li><li><code>\u81EA\u5B9A\u4E49 Hook</code> \u662F\u4E00\u79CD\u81EA\u7136\u9075\u5FAA <code>Hook \u8BBE\u8BA1</code>\u7684\u7EA6\u5B9A\uFF0C\u800C\u5E76<code>\u4E0D\u662F React</code> \u7684<code>\u7279\u6027</code>\u3002</li></ul><h4 style="color:red;">\u81EA\u5B9A\u4E49 Hook \u5FC5\u987B\u4EE5 \u201Cuse\u201D \u5F00\u5934\u5417\uFF1F</h4><ul><li><code>\u5FC5\u987B\u5982\u6B64\u3002</code>\u8FD9\u4E2A\u7EA6\u5B9A\u975E\u5E38\u91CD\u8981\u3002\u4E0D\u9075\u5FAA\u7684\u8BDD\uFF0C\u7531\u4E8E<code>\u65E0\u6CD5\u5224\u65AD</code>\u67D0\u4E2A\u51FD\u6570\u662F<code>\u5426\u5305\u542B\u5BF9\u5176\u5185\u90E8 Hook \u7684\u8C03\u7528</code>\uFF0C<code>React</code> \u5C06\u65E0\u6CD5\u81EA\u52A8\u68C0\u67E5\u4F60\u7684 <code>Hook</code> \u662F\u5426\u8FDD\u53CD\u4E86 <code>Hook \u7684\u89C4\u5219</code>\u3002</li></ul><h4 style="color:red;">\u5728\u4E24\u4E2A\u7EC4\u4EF6\u4E2D\u4F7F\u7528\u76F8\u540C\u7684 Hook \u4F1A\u5171\u4EAB state \u5417\uFF1F</h4><ul><li><code>\u4E0D\u4F1A\u3002</code> <code>\u81EA\u5B9A\u4E49 Hook</code> \u662F\u4E00\u79CD<code>\u91CD\u7528\u72B6\u6001\u903B\u8F91\u7684\u673A\u5236</code>(\u4F8B\u5982\u8BBE\u7F6E\u4E3A\u8BA2\u9605\u5E76\u5B58\u50A8\u5F53\u524D\u503C)\uFF0C\u6240\u4EE5\u6BCF\u6B21\u4F7F\u7528<code>\u81EA\u5B9A\u4E49 Hook </code>\u65F6\uFF0C\u5176\u4E2D\u7684\u6240\u6709 <code>state</code> \u548C<code>\u526F\u4F5C\u7528</code>\u90FD\u662F<code>\u5B8C\u5168\u9694\u79BB\u7684</code>\u3002</li></ul><h4 style="color:red;">\u81EA\u5B9A\u4E49 Hook \u5982\u4F55\u83B7\u53D6\u72EC\u7ACB\u7684 state\uFF1F</h4><ul><li>\u6BCF\u6B21\u8C03\u7528 <code>Hook</code>\uFF0C\u5B83\u90FD\u4F1A\u83B7\u53D6<code>\u72EC\u7ACB\u7684 state</code>\uFF1B\u6211\u4EEC\u53EF\u4EE5\u5728\u4E00\u4E2A\u7EC4\u4EF6\u4E2D<code>\u591A\u6B21\u8C03\u7528 useState \u548C useEffect</code>\uFF0C\u5B83\u4EEC\u662F<code>\u5B8C\u5168\u72EC\u7ACB\u7684</code>\u3002</li></ul>`,51),s=[a];function n(l,i){return o(),c("div",null,s)}const h=e(t,[["render",n],["__file","hook.html.vue"]]);export{h as default};