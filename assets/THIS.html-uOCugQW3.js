import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,a as t}from"./app-4eEeyPl0.js";const p={},e=t(`<h1 id="this" tabindex="-1"><a class="header-anchor" href="#this" aria-hidden="true">#</a> this</h1><h3 id="_1-this的指向" tabindex="-1"><a class="header-anchor" href="#_1-this的指向" aria-hidden="true">#</a> 1.this的指向</h3><p>1.在函数执行的时候会在函数内部创建两个变量，arguments、this。 <br> a. arguments 储存着实参的一个类数组对象。<br> b. this 指向函数执行的上下文 （通俗点：谁调用这个函数this就指向谁）。<br></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> objA <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">a</span><span class="token operator">:</span> test<span class="token punctuation">,</span>
    <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">c</span><span class="token operator">:</span> test
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// window</span>
objA<span class="token punctuation">.</span><span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// objA</span>
objA<span class="token punctuation">.</span>b<span class="token punctuation">.</span><span class="token function">c</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// objA.b</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-call、apply" tabindex="-1"><a class="header-anchor" href="#_2-call、apply" aria-hidden="true">#</a> 2.call、apply</h3><p>1.用来动态改变this的指向</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">aaa</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> objA <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">b</span><span class="token operator">:</span> aaa<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token comment">// 第一个参数为需要this指向的对象， 后面的为参数</span>
<span class="token function">aaa</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>objA<span class="token punctuation">,</span> <span class="token string">&#39;xiaoA&#39;</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>objA<span class="token punctuation">.</span>name<span class="token punctuation">,</span> objA<span class="token punctuation">.</span>age<span class="token punctuation">)</span> <span class="token comment">// xiaoA, 23</span>

<span class="token comment">// 与call不同的是参数的传递是放在数组里面的</span>
<span class="token function">aaa</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>objA<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&#39;xiaoB&#39;</span><span class="token punctuation">,</span> <span class="token number">40</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>objA<span class="token punctuation">.</span>name<span class="token punctuation">,</span> objA<span class="token punctuation">.</span>age<span class="token punctuation">)</span> <span class="token comment">// xiaoB, 40</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),o=[e];function c(i,l){return s(),a("div",null,o)}const d=n(p,[["render",c],["__file","THIS.html.vue"]]);export{d as default};
