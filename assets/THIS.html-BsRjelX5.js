const n=JSON.parse('{"key":"v-07560ed0","path":"/document/js/THIS.html","title":"this","lang":"zh-CN","frontmatter":{"date":"2024-01-31T00:00:00.000Z","category":["javascript"],"tag":["this"],"sticky":2,"star":2,"description":"this 1.this的指向 1.在函数执行的时候会在函数内部创建两个变量，arguments、this a. arguments 储存着实参的一个类数组对象。 b. this 指向函数执行的上下文 （通俗点：谁调用这个函数this就指向谁） function test() { console.log(this) } const objA = { a: test, b: { c: test } } test() // window objA.a() // objA objA.b.c() // objA.b","head":[["meta",{"property":"og:url","content":"https://dyywork.github.io/blog/document/js/THIS.html"}],["meta",{"property":"og:site_name","content":"莫名点"}],["meta",{"property":"og:title","content":"this"}],["meta",{"property":"og:description","content":"this 1.this的指向 1.在函数执行的时候会在函数内部创建两个变量，arguments、this a. arguments 储存着实参的一个类数组对象。 b. this 指向函数执行的上下文 （通俗点：谁调用这个函数this就指向谁） function test() { console.log(this) } const objA = { a: test, b: { c: test } } test() // window objA.a() // objA objA.b.c() // objA.b"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-31T05:28:13.000Z"}],["meta",{"property":"article:author","content":"Mr.Ding"}],["meta",{"property":"article:tag","content":"this"}],["meta",{"property":"article:published_time","content":"2024-01-31T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-01-31T05:28:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"this\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-01-31T00:00:00.000Z\\",\\"dateModified\\":\\"2024-01-31T05:28:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Ding\\"}]}"]]},"headers":[{"level":2,"title":"1.this的指向","slug":"_1-this的指向","link":"#_1-this的指向","children":[]},{"level":2,"title":"2.call、apply","slug":"_2-call、apply","link":"#_2-call、apply","children":[]}],"git":{"createdTime":1652183639000,"updatedTime":1706678893000,"contributors":[{"name":"dingyongya","email":"yahya_dyy@163.com","commits":6}]},"readingTime":{"minutes":0.63,"words":190},"filePathRelative":"document/js/THIS.md","localizedDate":"2024年1月31日","excerpt":"<h1> this</h1>\\n<h2> 1.this的指向</h2>\\n<p>1.在函数执行的时候会在函数内部创建两个变量，arguments、this<br>\\na. arguments 储存着实参的一个类数组对象。<br>\\nb. this 指向函数执行的上下文 （通俗点：谁调用这个函数this就指向谁）</p>\\n<div class=\\"language-javascript line-numbers-mode\\" data-ext=\\"js\\"><pre class=\\"language-javascript\\"><code><span class=\\"token keyword\\">function</span> <span class=\\"token function\\">test</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">const</span> objA <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token literal-property property\\">a</span><span class=\\"token operator\\">:</span> test<span class=\\"token punctuation\\">,</span>\\n    <span class=\\"token literal-property property\\">b</span><span class=\\"token operator\\">:</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token literal-property property\\">c</span><span class=\\"token operator\\">:</span> test\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token function\\">test</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token comment\\">// window</span>\\nobjA<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">a</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token comment\\">// objA</span>\\nobjA<span class=\\"token punctuation\\">.</span>b<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">c</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token comment\\">// objA.b</span>\\n\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
