import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,a as o,o as n}from"./app-Cx3Bs-RV.js";const c="/blog/assets/img-Ci96JloL.png",s={};function d(p,e){return n(),t("div",null,e[0]||(e[0]=[o(`<h1 id="react-生命周期" tabindex="-1"><a class="header-anchor" href="#react-生命周期"><span>react 生命周期</span></a></h1><h2 id="组件-props的只读性" tabindex="-1"><a class="header-anchor" href="#组件-props的只读性"><span>组件 &amp;&amp; Props的只读性</span></a></h2><h3 id="_1-纯函数" tabindex="-1"><a class="header-anchor" href="#_1-纯函数"><span>1. 纯函数</span></a></h3><ul><li>函数<code>不会</code>尝试<code>更改入参</code>，且多次调用下相同的入参始终返回相同的结果,这样的函数称之为<code>“纯函数”</code>。</li></ul><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-props-的只读性" tabindex="-1"><a class="header-anchor" href="#_2-props-的只读性"><span>2. Props 的只读性</span></a></h3><ul><li>组件无论是使用函数声明还是通过 class 声明，都<code>决不能修改</code>自身的 <code>props</code>。</li><li>所有 React 组件都必须像<code>纯函数</code>一样保护它们的 <code>props 不被更改</code>。</li></ul><h2 id="生命周期" tabindex="-1"><a class="header-anchor" href="#生命周期"><span>生命周期</span></a></h2><h3 id="_1-加载组件时方法的调用顺序" tabindex="-1"><a class="header-anchor" href="#_1-加载组件时方法的调用顺序"><span>1.加载组件时方法的调用顺序</span></a></h3><p><img src="`+c+`" alt="Alt" title="图片标题"></p><h4 id="_1-首次加载" tabindex="-1"><a class="header-anchor" href="#_1-首次加载"><span>1. 首次加载</span></a></h4><p><code>constructor</code> ---&gt; <code>static getDerivedStateFromProps()</code> 初始化 <code>this.state</code> ---&gt; <code>render()</code> ---&gt; <code>React 更新 DOM 和 refs</code> ---&gt; <code>componentDidMount()</code></p><h4 id="_2-更新" tabindex="-1"><a class="header-anchor" href="#_2-更新"><span>2. 更新</span></a></h4><p><code>&quot;New props&quot;</code>, <code>&quot;setSate()&quot;</code>, <code>&quot;forceUpdate&quot;</code> 三种方式更新触发</p><p><code>static getDerivedStateFromProps()</code> ---&gt; <code>shouldComponentUpdate()</code> 使用 &quot;forceUpdate&quot; 不触发， 返回值false 不重新渲染 ---&gt; <code>render()</code> ---&gt; <code>getSnapshotBeforeUpdate()</code>---&gt; <code>React 更新 DOM 和 refs</code> ---&gt; <code>componentDidUpdate()</code></p><div class="hint-container tip"><p class="hint-container-title">提示</p><p><code>getSnapshotBeforeUpdate()</code> 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期方法的任何返回值将作为参数<code>snapshot</code>传递给 <code>componentDidUpdate(prevProps, prevState, snapshot)</code></p></div><h4 id="_3-卸载时" tabindex="-1"><a class="header-anchor" href="#_3-卸载时"><span>3. 卸载时</span></a></h4><p><code>组件</code> 从 <code>DOM</code> 中被移除 --&gt; <code>componentWillUnmount()</code></p><h3 id="componentdidupdate用法" tabindex="-1"><a class="header-anchor" href="#componentdidupdate用法"><span>componentDidUpdate用法</span></a></h3><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code> <span class="token function">componentDidUpdate</span><span class="token punctuation">(</span>prevProps<span class="token punctuation">,</span> prevState<span class="token punctuation">,</span> snapshot<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><ol><li><code>componentDidUpdate()</code> 会在更新后会被立即调用。首次渲染不会执行此方法。</li><li>当组件更新后，可以在此处对 DOM 进行操作</li><li>可以在其中直接调用<code>setState()</code>,但要被包裹在一个条件语句里；否则会导致死循环</li><li>如果组件实现了 <code>getSnapshotBeforeUpdate()</code> 生命周期（不常用），则它的返回值将作为 <code>componentDidUpdate()</code> 的第三个参数 <code>“snapshot”</code> 参数传递。否则此参数将为 <code>undefined</code>。</li><li>如果 <code>shouldComponentUpdate()</code> 返回值为 <code>false</code>，则不会调用 <code>componentDidUpdate()</code>。</li></ol></div><h2 id="react中的传值方式" tabindex="-1"><a class="header-anchor" href="#react中的传值方式"><span>react中的传值方式</span></a></h2><h3 id="_1-父传子" tabindex="-1"><a class="header-anchor" href="#_1-父传子"><span>1.父传子</span></a></h3><ul><li><code>props</code> 传递</li><li><code>context</code> 传递</li><li><code>redux</code> 传递</li></ul><h3 id="_2-子传父" tabindex="-1"><a class="header-anchor" href="#_2-子传父"><span>2. 子传父</span></a></h3><ul><li><code>props</code> 传递</li><li><code>redux</code> 传递</li></ul><h3 id="_3-兄弟组件传递" tabindex="-1"><a class="header-anchor" href="#_3-兄弟组件传递"><span>3. 兄弟组件传递</span></a></h3><ul><li><code>props</code> 传递</li><li><code>redux</code> 传递</li></ul><h2 id="context的使用" tabindex="-1"><a class="header-anchor" href="#context的使用"><span>context的使用</span></a></h2><p>数据是通过 <code>props</code> 属性<code>自上而下（由父及子）</code>进行传递的;<code>Context</code> 提供了一种在组件之间<code>共享此类值</code>的方式，而不必显式地通过组件树的逐层传递 <code>props</code>。</p><h3 id="_1-provider的用法" tabindex="-1"><a class="header-anchor" href="#_1-provider的用法"><span>1.provider的用法</span></a></h3><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code>&lt;MyContext.Provider value={/* 某个值 */}&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>Provider</code> 接收一个<code>value</code> 属性，传递给<code>消费组件</code>。一个 <code>Provider</code> 可以和<code>多个消费组件</code>有对应关系。多个 <code>Provider</code> 也可以嵌套使用，<code>里层的会覆盖外层</code>的数据。</p><p>当 <code>Provider</code> 的 <code>value</code> 值发生变化时，它内部的所有<code>消费组件</code>都会<code>重新渲染</code>。<code>Provider</code> 及其内部 <code>consumer</code> 组件都不受制于 <code>shouldComponentUpdate</code> 函数，因此当 <code>consumer</code> 组件在其祖先组件退出更新的情况下也能更新。</p><h3 id="_2-consumer的用法" tabindex="-1"><a class="header-anchor" href="#_2-consumer的用法"><span>2.consumer的用法</span></a></h3><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>MyContext.Consumer</span><span class="token punctuation">&gt;</span></span>
  {value =&gt; /* 基于 context 值进行渲染*/}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>MyContext.Consumer</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>函数式组件</code>中完成订阅 <code>context</code>。</p><p>这需要<code>函数作为子元素（function as a child）</code>这种做法。这个函数接收当前的 <code>context</code> 值，返回一个 <code>React</code> 节点。传递给函数的 <code>value</code> 值等同于往上组件树离 这个 <code>context</code> 最近的 <code>Provider</code> 提供的 <code>value</code> 值。如果没有对应的 <code>Provider</code>，<code>value</code> 参数等同于传递给 <code>createContext()</code> 的 <code>defaultValue</code>。</p><p>6.echarts中label文字长度的获取；点击每个柱形要怎么调用弹框 7.react中可以使用requirejs吗（一般使用ES6模块化导入，也可以用require，写法为 const component = require(&#39;./component&#39;) ） 8.中英文或主题色切换怎么实现的；切换后页面会刷新吗 9.安全性功能做过哪些 10.加载几百页的pdf时，有什么优化操作</p>`,39)]))}const l=a(s,[["render",d],["__file","interview.html.vue"]]),u=JSON.parse('{"path":"/document/react/interview.html","title":"react 生命周期","lang":"zh-CN","frontmatter":{"date":"2022-08-19T00:00:00.000Z","author":"Mr.Ding","category":["React"],"tag":["react生命周期"],"description":"react 生命周期 组件 && Props的只读性 1. 纯函数 函数不会尝试更改入参，且多次调用下相同的入参始终返回相同的结果,这样的函数称之为“纯函数”。 2. Props 的只读性 组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props。 所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。 生命...","head":[["meta",{"property":"og:url","content":"https://dyywork.github.io/blog/document/react/interview.html"}],["meta",{"property":"og:site_name","content":"莫名点"}],["meta",{"property":"og:title","content":"react 生命周期"}],["meta",{"property":"og:description","content":"react 生命周期 组件 && Props的只读性 1. 纯函数 函数不会尝试更改入参，且多次调用下相同的入参始终返回相同的结果,这样的函数称之为“纯函数”。 2. Props 的只读性 组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props。 所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。 生命..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-28T02:38:38.000Z"}],["meta",{"property":"article:author","content":"Mr.Ding"}],["meta",{"property":"article:tag","content":"react生命周期"}],["meta",{"property":"article:published_time","content":"2022-08-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-28T02:38:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"react 生命周期\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-08-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-04-28T02:38:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Ding\\"}]}"]]},"headers":[{"level":2,"title":"组件 && Props的只读性","slug":"组件-props的只读性","link":"#组件-props的只读性","children":[{"level":3,"title":"1. 纯函数","slug":"_1-纯函数","link":"#_1-纯函数","children":[]},{"level":3,"title":"2. Props 的只读性","slug":"_2-props-的只读性","link":"#_2-props-的只读性","children":[]}]},{"level":2,"title":"生命周期","slug":"生命周期","link":"#生命周期","children":[{"level":3,"title":"1.加载组件时方法的调用顺序","slug":"_1-加载组件时方法的调用顺序","link":"#_1-加载组件时方法的调用顺序","children":[]},{"level":3,"title":"componentDidUpdate用法","slug":"componentdidupdate用法","link":"#componentdidupdate用法","children":[]}]},{"level":2,"title":"react中的传值方式","slug":"react中的传值方式","link":"#react中的传值方式","children":[{"level":3,"title":"1.父传子","slug":"_1-父传子","link":"#_1-父传子","children":[]},{"level":3,"title":"2. 子传父","slug":"_2-子传父","link":"#_2-子传父","children":[]},{"level":3,"title":"3. 兄弟组件传递","slug":"_3-兄弟组件传递","link":"#_3-兄弟组件传递","children":[]}]},{"level":2,"title":"context的使用","slug":"context的使用","link":"#context的使用","children":[{"level":3,"title":"1.provider的用法","slug":"_1-provider的用法","link":"#_1-provider的用法","children":[]},{"level":3,"title":"2.consumer的用法","slug":"_2-consumer的用法","link":"#_2-consumer的用法","children":[]}]}],"git":{"createdTime":1661135465000,"updatedTime":1714271918000,"contributors":[{"name":"dingyongya","email":"yahya_dyy@163.com","commits":9}]},"readingTime":{"minutes":3.02,"words":905},"filePathRelative":"document/react/interview.md","localizedDate":"2022年8月19日","excerpt":"\\n<h2>组件 &amp;&amp; Props的只读性</h2>\\n<h3>1. 纯函数</h3>\\n<ul>\\n<li>函数<code>不会</code>尝试<code>更改入参</code>，且多次调用下相同的入参始终返回相同的结果,这样的函数称之为<code>“纯函数”</code>。</li>\\n</ul>\\n<div class=\\"language-javascript\\" data-ext=\\"js\\" data-title=\\"js\\"><pre class=\\"language-javascript\\"><code><span class=\\"token keyword\\">function</span> <span class=\\"token function\\">sum</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">a<span class=\\"token punctuation\\">,</span> b</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">return</span> a <span class=\\"token operator\\">+</span> b<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{l as comp,u as data};