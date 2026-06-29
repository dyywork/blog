import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as e,o as t}from"./app-R-2brQ3B.js";const i={};function o(l,n){return t(),a("div",null,[...n[0]||(n[0]=[e(`<h1 id="五种基础数据类型-对比-js-数据结构" tabindex="-1"><a class="header-anchor" href="#五种基础数据类型-对比-js-数据结构"><span>五种基础数据类型（对比 JS 数据结构）</span></a></h1><h2 id="redis-数据结构总览" tabindex="-1"><a class="header-anchor" href="#redis-数据结构总览"><span>Redis 数据结构总览</span></a></h2><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>┌────────────────────────────────────────────────────────┐
│                    Redis 数据类型                         │
├──────────┬──────────────────┬──────────────────────────┤
│ 类型     │ 底层结构          │ 前端类比                  │
├──────────┼──────────────────┼──────────────────────────┤
│ String   │ 动态字符串        │ string + number           │
│ List     │ 双向链表/压缩列表  │ Array（push/pop）        │
│ Hash     │ 哈希表            │ Map&lt;string, string&gt;      │
│ Set      │ 哈希表            │ Set                      │
│ Zset     │ 跳表 + 哈希表     │ 有序 Set（自动排序）      │
└──────────┴──────────────────┴──────────────────────────┘
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="_1-string-—-字符串-最基础" tabindex="-1"><a class="header-anchor" href="#_1-string-—-字符串-最基础"><span>1. String — 字符串（最基础）</span></a></h2><div class="language-redis line-numbers-mode" data-ext="redis" data-title="redis"><pre class="language-redis"><code># 存/取（≈ map.set / map.get）
SET name &quot;小明&quot;              # 存入
GET name                     # → &quot;小明&quot;

# 数值操作（原子性！没有并发问题）
SET count 0
INCR count                   # → 1（原子 +1）
INCRBY count 5              # → 6（原子 +5）
DECR count                   # → 5（原子 -1）

# 设置过期时间（≈ setTimeout + 自动删除）
SET code &quot;1234&quot; EX 60        # 60秒后自动删除
SETEX code 60 &quot;1234&quot;        # 同上，另一种写法
TTL code                     # 查看剩余秒数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">// JS 类比</span>
<span class="token keyword">const</span> redis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
redis<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;小明&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
redis<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>          <span class="token comment">// &#39;小明&#39;</span>

<span class="token comment">// 但 JS 没有原生的过期机制和原子递增</span>
<span class="token comment">// Redis 是单线程处理命令，天然原子</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>适用场景</strong>：缓存 HTML、存 Session、计数器、验证码、分布式锁</p><hr><h2 id="_2-list-—-列表-≈-js-array-的双向链表版" tabindex="-1"><a class="header-anchor" href="#_2-list-—-列表-≈-js-array-的双向链表版"><span>2. List — 列表（≈ JS Array 的双向链表版）</span></a></h2><div class="language-redis line-numbers-mode" data-ext="redis" data-title="redis"><pre class="language-redis"><code># 右入/左出（队列 FIFO）
RPUSH queue &quot;任务1&quot;          # 右边入队
RPUSH queue &quot;任务2&quot;
LPOP queue                   # 左边出队 → &quot;任务1&quot;

# 左入/右出（栈 LIFO）
LPUSH stack &quot;A&quot;              # 左边入栈
LPUSH stack &quot;B&quot;
RPOP stack                   # 右边出栈 → &quot;B&quot;

# 范围查询（≈ arr.slice）
LRANGE list 0 -1            # 全部元素
LRANGE list 0 2             # 前3个

# 长度
LLEN list                    # ≈ arr.length
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">// JS 类比</span>
<span class="token keyword">const</span> queue <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">&#39;任务1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>          <span class="token comment">// RPUSH</span>
queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">&#39;任务2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
queue<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                <span class="token comment">// LPOP → &#39;任务1&#39;</span>

<span class="token keyword">const</span> stack <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
stack<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">(</span><span class="token string">&#39;A&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>           <span class="token comment">// LPUSH</span>
stack<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">(</span><span class="token string">&#39;B&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                  <span class="token comment">// RPOP → &#39;B&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>适用场景</strong>：消息队列、最新消息列表（取前 N 条）、时间线</p><hr><h2 id="_3-hash-—-哈希-≈-js-map" tabindex="-1"><a class="header-anchor" href="#_3-hash-—-哈希-≈-js-map"><span>3. Hash — 哈希（≈ JS Map）</span></a></h2><div class="language-redis line-numbers-mode" data-ext="redis" data-title="redis"><pre class="language-redis"><code># 存储对象（比 String 存 JSON 更灵活）
HSET user:1 name &quot;小明&quot; age &quot;25&quot; city &quot;北京&quot;
HGET user:1 name             # → &quot;小明&quot;
HGETALL user:1                # → {name: &quot;小明&quot;, age: &quot;25&quot;, city: &quot;北京&quot;}

# 批量操作
HMSET user:2 name &quot;小红&quot; age &quot;23&quot;
HMGET user:2 name age        # → [&quot;小红&quot;, &quot;23&quot;]

# 递增某个字段
HINCRBY user:1 age 1        # 年龄 +1

# 获取所有字段或值
HKEYS user:1                  # → [&quot;name&quot;, &quot;age&quot;, &quot;city&quot;]
HVALS user:1                 # → [&quot;小明&quot;, &quot;25&quot;, &quot;北京&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">// JS 类比</span>
<span class="token keyword">const</span> user1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
user1<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;小明&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
user1<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&#39;age&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;25&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
user1<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>           <span class="token comment">// &#39;小明&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>适用场景</strong>：存储用户信息/商品信息/配置等对象数据（比 String 存取部分字段更高效）</p><hr><h2 id="_4-set-—-集合-≈-js-set" tabindex="-1"><a class="header-anchor" href="#_4-set-—-集合-≈-js-set"><span>4. Set — 集合（≈ JS Set）</span></a></h2><div class="language-redis line-numbers-mode" data-ext="redis" data-title="redis"><pre class="language-redis"><code># 添加/移除
SADD tags &quot;前端&quot; &quot;后端&quot; &quot;数据库&quot;
SREM tags &quot;后端&quot;

# 判断是否存在（≈ set.has）
SISMEMBER tags &quot;前端&quot;        # → 1（存在）
SISMEMBER tags &quot;后端&quot;        # → 0（已移除）

# 集合操作
SMEMBERS tags                 # → [&quot;前端&quot;, &quot;数据库&quot;]
SCARD tags                   # → 2（元素个数）

# 集合运算（Redis 特产）
SADD setA &quot;a&quot; &quot;b&quot; &quot;c&quot;
SADD setB &quot;b&quot; &quot;c&quot; &quot;d&quot;

SINTER setA setB             # 交集 → [&quot;b&quot;, &quot;c&quot;]
SUNION setA setB             # 并集 → [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, &quot;d&quot;]
SDIFF setA setB              # 差集 → [&quot;a&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">// JS 类比</span>
<span class="token keyword">const</span> tags <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;前端&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;后端&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;数据库&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
tags<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">&#39;后端&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
tags<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span><span class="token string">&#39;前端&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>             <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>适用场景</strong>：标签系统、共同好友（交集）、每日签到（去重）</p><hr><h2 id="_5-zset-—-有序集合-js-没有直接对应-redis-独有" tabindex="-1"><a class="header-anchor" href="#_5-zset-—-有序集合-js-没有直接对应-redis-独有"><span>5. Zset — 有序集合（JS 没有直接对应，Redis 独有）</span></a></h2><div class="language-redis line-numbers-mode" data-ext="redis" data-title="redis"><pre class="language-redis"><code># 加分的成员（score 自动排序）
ZADD leaderboard 100 &quot;小明&quot;    # 100 分
ZADD leaderboard 80 &quot;小红&quot;     # 80 分
ZADD leaderboard 95 &quot;小刚&quot;     # 95 分

# 查看排名（升序：从低到高）
ZRANGE leaderboard 0 -1 WITHSCORES
# → [&quot;小红&quot;, 80, &quot;小刚&quot;, 95, &quot;小明&quot;, 100]

# 查看排名（降序：谁分数最高排第一）
ZREVRANGE leaderboard 0 -1 WITHSCORES
# → [&quot;小明&quot;, 100, &quot;小刚&quot;, 95, &quot;小红&quot;, 80]

# 获取分数
ZSCORE leaderboard &quot;小明&quot;     # → 100

# 增加分数
ZINCRBY leaderboard 10 &quot;小明&quot; # 小明 +10 分 → 110

# 排名（从 0 开始）
ZRANK leaderboard &quot;小明&quot;      # 排名第几（升序排位）
ZREVRANK leaderboard &quot;小明&quot;   # 排名第几（降序排位 ≈ 排行榜）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">// JS 没有内置有序集合，实现类似功能需要：</span>
<span class="token keyword">const</span> leaderboard <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;小明&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">score</span><span class="token operator">:</span> <span class="token number">100</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;小红&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">score</span><span class="token operator">:</span> <span class="token number">80</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;小刚&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">score</span><span class="token operator">:</span> <span class="token number">95</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
leaderboard<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> b<span class="token punctuation">.</span>score <span class="token operator">-</span> a<span class="token punctuation">.</span>score<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 每次都要全排序，Redis Zset 是 O(log N)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>适用场景</strong>：排行榜、延时队列（用时间戳做 score）、点赞排序、商品评分</p><hr><h2 id="速查表" tabindex="-1"><a class="header-anchor" href="#速查表"><span>速查表</span></a></h2><table><thead><tr><th>操作</th><th>Redis</th><th>JS 类比</th><th>复杂度</th></tr></thead><tbody><tr><td>存单个值</td><td><code>SET key val</code></td><td><code>map.set(key, val)</code></td><td>O(1)</td></tr><tr><td>取单个值</td><td><code>GET key</code></td><td><code>map.get(key)</code></td><td>O(1)</td></tr><tr><td>队列入队</td><td><code>RPUSH list el</code></td><td><code>arr.push(el)</code></td><td>O(1)</td></tr><tr><td>队列出队</td><td><code>LPOP list</code></td><td><code>arr.shift()</code></td><td>O(1)</td></tr><tr><td>存对象</td><td><code>HSET obj key val</code></td><td><code>map.set(key, val)</code></td><td>O(1)</td></tr><tr><td>集合添加</td><td><code>SADD set el</code></td><td><code>set.add(el)</code></td><td>O(1)</td></tr><tr><td>集合判断</td><td><code>SISMEMBER set el</code></td><td><code>set.has(el)</code></td><td>O(1)</td></tr><tr><td>有序集合加</td><td><code>ZADD zset score mem</code></td><td>无原生</td><td>O(log N)</td></tr><tr><td>排行榜</td><td><code>ZREVRANGE zset 0 9</code></td><td><code>sort + slice</code></td><td>O(log N+M)</td></tr><tr><td>设置过期</td><td><code>EXPIRE key 60</code></td><td>无原生</td><td>O(1)</td></tr></tbody></table>`,31)])])}const p=s(i,[["render",o],["__file","data-types.html.vue"]]),u=JSON.parse('{"path":"/document/redis/data-types.html","title":"五种基础数据类型（对比 JS 数据结构）","lang":"zh-CN","frontmatter":{"date":"2026-06-29T00:00:00.000Z","category":["redis"],"tag":["基础","数据结构","前端转后端"],"description":"五种基础数据类型（对比 JS 数据结构） Redis 数据结构总览 1. String — 字符串（最基础） 适用场景：缓存 HTML、存 Session、计数器、验证码、分布式锁 2. List — 列表（≈ JS Array 的双向链表版） 适用场景：消息队列、最新消息列表（取前 N 条）、时间线 3. Hash — 哈希（≈ JS Map） 适用...","head":[["meta",{"property":"og:url","content":"https://dyywork.github.io/blog/document/redis/data-types.html"}],["meta",{"property":"og:site_name","content":"莫名点"}],["meta",{"property":"og:title","content":"五种基础数据类型（对比 JS 数据结构）"}],["meta",{"property":"og:description","content":"五种基础数据类型（对比 JS 数据结构） Redis 数据结构总览 1. String — 字符串（最基础） 适用场景：缓存 HTML、存 Session、计数器、验证码、分布式锁 2. List — 列表（≈ JS Array 的双向链表版） 适用场景：消息队列、最新消息列表（取前 N 条）、时间线 3. Hash — 哈希（≈ JS Map） 适用..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-06-29T10:16:06.000Z"}],["meta",{"property":"article:author","content":"Mr.Ding"}],["meta",{"property":"article:tag","content":"基础"}],["meta",{"property":"article:tag","content":"数据结构"}],["meta",{"property":"article:tag","content":"前端转后端"}],["meta",{"property":"article:published_time","content":"2026-06-29T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2026-06-29T10:16:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"五种基础数据类型（对比 JS 数据结构）\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-06-29T00:00:00.000Z\\",\\"dateModified\\":\\"2026-06-29T10:16:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Ding\\"}]}"]]},"headers":[{"level":2,"title":"Redis 数据结构总览","slug":"redis-数据结构总览","link":"#redis-数据结构总览","children":[]},{"level":2,"title":"1. String — 字符串（最基础）","slug":"_1-string-—-字符串-最基础","link":"#_1-string-—-字符串-最基础","children":[]},{"level":2,"title":"2. List — 列表（≈ JS Array 的双向链表版）","slug":"_2-list-—-列表-≈-js-array-的双向链表版","link":"#_2-list-—-列表-≈-js-array-的双向链表版","children":[]},{"level":2,"title":"3. Hash — 哈希（≈ JS Map）","slug":"_3-hash-—-哈希-≈-js-map","link":"#_3-hash-—-哈希-≈-js-map","children":[]},{"level":2,"title":"4. Set — 集合（≈ JS Set）","slug":"_4-set-—-集合-≈-js-set","link":"#_4-set-—-集合-≈-js-set","children":[]},{"level":2,"title":"5. Zset — 有序集合（JS 没有直接对应，Redis 独有）","slug":"_5-zset-—-有序集合-js-没有直接对应-redis-独有","link":"#_5-zset-—-有序集合-js-没有直接对应-redis-独有","children":[]},{"level":2,"title":"速查表","slug":"速查表","link":"#速查表","children":[]}],"git":{"createdTime":1782728166000,"updatedTime":1782728166000,"contributors":[{"name":"dingyongya","email":"dingyongya@mg-pen.com","commits":1}]},"readingTime":{"minutes":3.63,"words":1088},"filePathRelative":"document/redis/data-types.md","localizedDate":"2026年6月29日","excerpt":"\\n<h2>Redis 数据结构总览</h2>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>┌────────────────────────────────────────────────────────┐\\n│                    Redis 数据类型                         │\\n├──────────┬──────────────────┬──────────────────────────┤\\n│ 类型     │ 底层结构          │ 前端类比                  │\\n├──────────┼──────────────────┼──────────────────────────┤\\n│ String   │ 动态字符串        │ string + number           │\\n│ List     │ 双向链表/压缩列表  │ Array（push/pop）        │\\n│ Hash     │ 哈希表            │ Map&lt;string, string&gt;      │\\n│ Set      │ 哈希表            │ Set                      │\\n│ Zset     │ 跳表 + 哈希表     │ 有序 Set（自动排序）      │\\n└──────────┴──────────────────┴──────────────────────────┘\\n</code></pre></div>","autoDesc":true}');export{p as comp,u as data};
