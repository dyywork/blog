import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,a as t}from"./app.d07675a6.js";const p={},e=t(`<h1 id="\u9762\u5411\u5BF9\u8C61" tabindex="-1"><a class="header-anchor" href="#\u9762\u5411\u5BF9\u8C61" aria-hidden="true">#</a> \u9762\u5411\u5BF9\u8C61</h1><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><ul><li>\u9762\u5411\u5BF9\u8C61\u6CE8\u91CD\u4E8E\u62BD\u8C61\u4E8B\u7269\uFF0C\u800C\u9762\u5411\u8FC7\u7A0B\u6CE8\u91CD\u4E8E\u53D9\u8FF0\u4E8B\u7269\u3002</li><li>\u9762\u5411\u5BF9\u8C61\u903B\u8F91\u6E05\u6670\u6709\u6761\u7406\uFF0C\u800C\u9762\u5411\u8FC7\u7A0B\u6BD4\u8F83\u65B9\u9762\u3002</li><li>JS \u901A\u8FC7\u51FD\u6570\u548C\u539F\u578B\uFF0C\u6A21\u62DF\u4E86\u4F20\u7EDF\u9762\u5411\u5BF9\u8C61\u7F16\u7A0B\u4E2D\u7C7B\u7684\u6982\u5FF5\u5B9E\u73B0\u4E86\u9762\u5411\u5BF9\u8C61\u7684\u7F16\u7A0B\u6A21\u5F0F\u3002</li><li>\u9762\u5411\u5BF9\u8C61\u7684\u53D8\u6210\u601D\u60F3\uFF0C\u4E3B\u8981\u4E3A\u4E86\u5B9E\u73B03\u4EF6\u4E8B\uFF0C \u5C01\u88C5\u3001\u7EE7\u627F\u3001\u591A\u6001\u3002</li></ul></div><h2 id="_1-\u5C01\u88C5" tabindex="-1"><a class="header-anchor" href="#_1-\u5C01\u88C5" aria-hidden="true">#</a> 1.\u5C01\u88C5</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// \u4E00\u4E2A\u4F8B\u5B50</span>
<span class="token keyword">function</span> <span class="token function">CreateObject</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// CreateObject \u4E3A\u6784\u9020\u51FD\u6570</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">eat</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">&#39; eat something&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> objA <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CreateObject</span><span class="token punctuation">(</span><span class="token string">&#39;A&#39;</span><span class="token punctuation">)</span> <span class="token comment">// \u4E3A\u6784\u9020\u51FD\u6570\u7684\u5B9E\u4F8B</span>
<span class="token keyword">let</span> objB <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CreateObject</span><span class="token punctuation">(</span><span class="token string">&#39;B&#39;</span><span class="token punctuation">)</span> <span class="token comment">// \u4E3A\u6784\u9020\u51FD\u6570\u7684\u5B9E\u4F8B</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-new-\u505A\u4E86\u90A3\u4E9B\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#_1-new-\u505A\u4E86\u90A3\u4E9B\u64CD\u4F5C" aria-hidden="true">#</a> 1.new \u505A\u4E86\u90A3\u4E9B\u64CD\u4F5C</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">/*
 1. \u521B\u5EFA\u4E00\u4E2A\u7A7A\u5BF9\u8C61
 2. \u5C06\u6784\u9020\u51FD\u6570\u7684prototype\u5C5E\u6027\u8D4B\u503C\u7ED9\u65B0\u5BF9\u8C61\u7684__proto__\u5C5E\u6027
 3. \u5C06\u6784\u9020\u51FD\u6570\u7684this\u6307\u5411\u65B0\u5BF9\u8C61
 4. \u6267\u884C\u6784\u9020\u51FD\u6570\u7684\u4EE3\u7801
 5. \u5C06\u65B0\u5BF9\u8C61\u8FD4\u56DE
*/</span>

<span class="token keyword">function</span> <span class="token function">ObjectTest</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
<span class="token punctuation">}</span>

<span class="token keyword">let</span> objectA <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectTest</span><span class="token punctuation">(</span><span class="token string">&#39;A&#39;</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>objectA<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// A</span>

<span class="token keyword">let</span> objectB <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    obj<span class="token punctuation">.</span>__proto__ <span class="token operator">=</span> <span class="token class-name">ObjectTest</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span>
    <span class="token function">ObjectTest</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">&#39;B&#39;</span><span class="token punctuation">)</span> <span class="token comment">// \u8FD9\u91CC\u540C\u65F6\u6267\u884C\u4E86\u7B2C3\u30014\u6B65</span>
    <span class="token keyword">return</span> obj
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>objectB<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// B</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-\u7EE7\u627F" tabindex="-1"><a class="header-anchor" href="#_2-\u7EE7\u627F" aria-hidden="true">#</a> 2.\u7EE7\u627F</h2><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><ul><li>\u5728\u58F0\u660E\u51FD\u6570\u7684\u65F6\u5019\uFF0C\u4F1A\u81EA\u52A8\u521B\u5EFA\u4E00\u4E2Aprototype\u5C5E\u6027\uFF0C\u6211\u4EEC\u7BA1\u4ED6\u53EB\u505A\u539F\u578B\uFF1B\uFF08\u4E00\u822C\u7528\u6765\u5B58\u653E\u5B9E\u4F8B\u516C\u7528\u7684\u65B9\u6CD5\uFF09</li><li>\u5728js\u91CC\u89C4\u5B9A\uFF0C\u8BBF\u95EE\u5BF9\u8C61\u5C5E\u6027\u7684\u65F6\u5019\uFF0C\u5982\u679C\u5BF9\u8C61\u4E0B\u9762\u6CA1\u6709\u8FD9\u4E2A\u5C5E\u6027\uFF0C\u5219\u53BB\u4ED6\u4E0B\u9762\u7684__proto__\u53BB\u5BFB\u627E\uFF0C\u5982\u679C\u8FD8\u6CA1\u6709\u5C31\u4E00\u76F4\u5411\u4E0B\u5BFB\u627E\u76F4\u5230\u6CA1\u6709__proto__\u4E3A\u6B62</li></ul></div><h3 id="_1-\u7C7B\u5F0F\u7EE7\u627F" tabindex="-1"><a class="header-anchor" href="#_1-\u7C7B\u5F0F\u7EE7\u627F" aria-hidden="true">#</a> 1.\u7C7B\u5F0F\u7EE7\u627F</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token constant">A</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">A</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">getName</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">SubA</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>subName <span class="token operator">=</span> <span class="token string">&#39;sub&#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">SubA</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> sa1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SubA</span><span class="token punctuation">(</span><span class="token string">&#39;sa1&#39;</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sa1<span class="token punctuation">.</span>list<span class="token punctuation">,</span> sal<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// [1,2,3] undefined</span>

<span class="token comment">/*
* SubA.prototype = new A()  -&gt;  {
*           name: undefined,
*           list: [1,2,3],
*           __porto__: {
*               getName: functiong() {}
*           }
*       }
* 
*   sa1 = new SubA(&#39;sa1&#39;) -&gt; {
*           subName: subsa1,
*           __proto__: {
*               name: undefined,
*               list: [1,2,3],
*               __porto__: {
*                   getName: functiong() {}
*               }
*           }
*       }
* 
* */</span>

<span class="token comment">// \u7C7B\u5F0F\u7EE7\u627F\u7684\u95EE\u9898</span>
<span class="token comment">// 1. \u8FD9\u79CD\u65B9\u5F0F\u4E0D\u652F\u6301\u7236\u6784\u9020\u51FD\u6570\u5E26\u53C2\u6570</span>
<span class="token comment">// 2. \u7236\u6784\u9020\u51FD\u6570\u7684\u6240\u6709\u5C5E\u6027\u548C\u65B9\u6CD5\u90FD\u53D8\u6210\u4E86\u4E00\u4E2A\u5171\u6709\u5C5E\u6027</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-\u6784\u9020\u51FD\u6570\u7EE7\u627F" tabindex="-1"><a class="header-anchor" href="#_2-\u6784\u9020\u51FD\u6570\u7EE7\u627F" aria-hidden="true">#</a> 2.\u6784\u9020\u51FD\u6570\u7EE7\u627F</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token constant">A</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">A</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">getName</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">SubA</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token constant">A</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>subName <span class="token operator">=</span> <span class="token string">&#39;sub&#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> sa1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SubA</span><span class="token punctuation">(</span><span class="token string">&#39;xiaoA&#39;</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sa1<span class="token punctuation">.</span>name<span class="token punctuation">,</span> sa1<span class="token punctuation">.</span>subName<span class="token punctuation">)</span>
sa1<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// \u62A5\u9519</span>

<span class="token comment">/*
* sa1 = new SubA(&#39;xiaoA&#39;) -&gt; {
*       __proto: SubA.prototype,
*       subName: &#39;sub xiaoA&#39;,
*       name: &#39;xiaoA&#39;,
*       list: [1,2,3]
*   }
*   
* */</span>
<span class="token comment">// \u6784\u9020\u51FD\u6570\u7EE7\u627F\u95EE\u9898</span>
<span class="token comment">// 1. \u4E0D\u80FD\u7EE7\u627F\u7236\u6784\u9020\u51FD\u6570\u7684\u539F\u578B\u65B9\u6CD5</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-\u7EC4\u5408\u5F0F\u7EE7\u627F" tabindex="-1"><a class="header-anchor" href="#_3-\u7EC4\u5408\u5F0F\u7EE7\u627F" aria-hidden="true">#</a> 3.\u7EC4\u5408\u5F0F\u7EE7\u627F</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token constant">A</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">A</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">getName</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">SubA</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token constant">A</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>subName <span class="token operator">=</span> <span class="token string">&#39;sub&#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">SubA</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> sa1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SubA</span><span class="token punctuation">(</span><span class="token string">&#39;xiaoA&#39;</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sa1<span class="token punctuation">.</span>name<span class="token punctuation">,</span> sa1<span class="token punctuation">.</span>subName<span class="token punctuation">)</span>
sa1<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">/*
*   new A() -&gt; {
*       name: undefined,
*       list: [1,2,3],
*       __proto__: {
*           getName: fn
*       }
*   }
* 
*   new SubA(&#39;xiaoA&#39;) -&gt; {
*       subName: &#39;sub xiaoA&#39;,
*       name: &#39;xiaoA&#39;,
*       list: [1,2,3]
*       __proto__: {
*           name: undefined,
*           list: [1,2,3],
*           __proto__: {
*               getName: fn
*           }
*       }
*   }
* 
* 
* */</span>

<span class="token comment">// \u5C0F\u95EE\u9898</span>
<span class="token comment">// 1. __proto__\u5C5E\u6027\u6CA1\u6709\u7528</span>
<span class="token comment">// 2. \u7236\u6784\u9020\u51FD\u6570\u6267\u884C\u4E86\u4E24\u6B21</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-\u5BC4\u751F\u7EC4\u5408\u5F0F\u7EE7\u627F" tabindex="-1"><a class="header-anchor" href="#_4-\u5BC4\u751F\u7EC4\u5408\u5F0F\u7EE7\u627F" aria-hidden="true">#</a> 4.\u5BC4\u751F\u7EC4\u5408\u5F0F\u7EE7\u627F</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token constant">A</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">A</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">getName</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">SubA</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token constant">A</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>subName <span class="token operator">=</span> <span class="token string">&#39;sub&#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// SubA.prototype = new A();</span>
<span class="token keyword">function</span> <span class="token function">inheritPrototype</span><span class="token punctuation">(</span><span class="token parameter">subClass<span class="token punctuation">,</span> superClass</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">function</span> <span class="token constant">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token class-name">F</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> superClass<span class="token punctuation">.</span>prototype<span class="token punctuation">;</span>
    subClass<span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    subClass<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">=</span> subClass<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">inheritPrototype</span><span class="token punctuation">(</span>subA<span class="token punctuation">,</span> <span class="token constant">A</span><span class="token punctuation">)</span>

<span class="token keyword">let</span> sa1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SubA</span><span class="token punctuation">(</span><span class="token string">&#39;xiaoA&#39;</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sa1<span class="token punctuation">.</span>name<span class="token punctuation">,</span> sa1<span class="token punctuation">.</span>subName<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-\u591A\u6001" tabindex="-1"><a class="header-anchor" href="#_3-\u591A\u6001" aria-hidden="true">#</a> 3.\u591A\u6001</h2><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><ul><li>\u8868\u793A\u4E0D\u540C\u5BF9\u8C61\u8C03\u7528\u76F8\u540C\u65B9\u6CD5\u4F1A\u4EA7\u751F\u4E0D\u540C\u7ED3\u679C</li></ul></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Base</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token class-name">Base</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">initial</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">SubA</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">init</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;SubA init&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">SubB</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">init</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;SubB init&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token class-name">SubA</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Base</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">SubB</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Base</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> subA <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SubA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> subB <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SubB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

subA<span class="token punctuation">.</span><span class="token function">initial</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// &#39;SubA init&#39;</span>
subB<span class="token punctuation">.</span><span class="token function">initial</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// &#39;SubB init&#39;</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,19),c=[e];function o(i,l){return s(),a("div",null,c)}const d=n(p,[["render",o],["__file","Object.html.vue"]]);export{d as default};
