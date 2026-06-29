import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,a,o as t}from"./app-R-2brQ3B.js";const i={};function l(d,n){return t(),e("div",null,[...n[0]||(n[0]=[a(`<h1 id="常用命令-机制-对比-js-api" tabindex="-1"><a class="header-anchor" href="#常用命令-机制-对比-js-api"><span>常用命令 &amp; 机制（对比 JS API）</span></a></h1><h2 id="_1-过期时间-ttl-—-≈-settimeout-自动删除" tabindex="-1"><a class="header-anchor" href="#_1-过期时间-ttl-—-≈-settimeout-自动删除"><span>1. 过期时间（TTL）— ≈ setTimeout 自动删除</span></a></h2><div class="language-redis line-numbers-mode" data-ext="redis" data-title="redis"><pre class="language-redis"><code># 设置 key 的同时指定过期时间
SET code &quot;9527&quot; EX 300        # 300 秒后自动删除

# 单独设置过期
SET code &quot;9527&quot;
EXPIRE code 300               # 300 秒后过期

# 查看剩余时间
TTL code                     # → 267（还有 267 秒）
TTL code                     # → -1 表示永不过期
TTL code                     # → -2 表示 key 已不存在

# 移除过期时间
PERSIST code

# 设置过期时间（毫秒）
SET code &quot;9527&quot; PX 300000    # 300 秒（毫秒为单位）

# 更精准：过期时间戳
EXPIREAT code 1800000000     # 在指定时间戳过期
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">// JS 类比（手动实现）</span>
<span class="token keyword">const</span> cache <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">setWithTTL</span><span class="token punctuation">(</span><span class="token parameter">key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> seconds</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    cache<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> cache<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">,</span> seconds <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>实战场景</strong>：</p><ul><li>验证码：5 分钟过期</li><li>Session：30 分钟无操作自动过期</li><li>限流：1 秒内只允许 10 次请求（用 TTL 做滑动窗口）</li><li>缓存：热点数据 1 小时失效</li></ul><hr><h2 id="_2-key-命名规范与操作" tabindex="-1"><a class="header-anchor" href="#_2-key-命名规范与操作"><span>2. Key 命名规范与操作</span></a></h2><div class="language-redis line-numbers-mode" data-ext="redis" data-title="redis"><pre class="language-redis"><code># 命名惯例：对象类型:ID:字段
# 像 URL 路径一样组织

SET user:1:name &quot;小明&quot;         # 用户 ID 1 的名字
SET article:42:title &quot;标题&quot;    # 文章 ID 42 的标题

# 键空间操作（≈ Object.keys / Map.keys）
KEYS *                         # 查看所有 key（生产环境禁用！会卡死）
KEYS user:*                    # 查所有 user 前缀的 key

# 改用 SCAN（安全版本，分批遍历）
SCAN 0 MATCH user:* COUNT 100  # 分批扫描，不阻塞 Redis

# 判断 key 是否存在
EXISTS user:1:name             # → 1（存在）
EXISTS notexist                # → 0（不存在）

# 删除
DEL user:1:name

# 查看类型
TYPE user:1:name               # → string
TYPE user:1                    # → hash

# 查看剩余过期时间
TTL user:1:name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>⚠️ <strong>生产环境禁止用 KEYS *</strong>：会遍历所有 key，如果 key 数量很大（百万级）会阻塞 Redis 几秒钟！</p></blockquote><hr><h2 id="_3-事务-对比-js-promise-all-回滚" tabindex="-1"><a class="header-anchor" href="#_3-事务-对比-js-promise-all-回滚"><span>3. 事务（对比 JS Promise.all + 回滚）</span></a></h2><div class="language-redis line-numbers-mode" data-ext="redis" data-title="redis"><pre class="language-redis"><code># Redis 事务：命令按顺序执行，不会被其他客户端打断
MULTI                         # 开始事务（类似 START TRANSACTION）
SET stock:1 10
DECR stock:1                  # 减少库存
EXEC                          # 执行（类似 COMMIT）

# 放弃事务
DISCARD                       # 类似 ROLLBACK

# 带条件的事务（乐观锁，类似前端 CAS 乐观更新）
WATCH stock:1                 # 监视 key
GET stock:1                   # 检查库存
# ... 如果 stock:1 被别的客户端改了，EXEC 会失败
MULTI
DECR stock:1
EXEC
# 如果执行期间 stock:1 被修改，EXEC 返回 nil（失败）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">// JS 类比</span>
<span class="token comment">// 普通事务 ≈ Promise.all（按顺序、互不打扰）</span>
<span class="token keyword">await</span> Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span>cmd1<span class="token punctuation">,</span> cmd2<span class="token punctuation">,</span> cmd3<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// WATCH ≈ 乐观锁（git push 前发现冲突）</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">decrStock</span><span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> version <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getVersion</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 如果别人改了 version，下面的 update 会失败</span>
    <span class="token keyword">await</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">{</span> id<span class="token punctuation">,</span> <span class="token literal-property property">version</span><span class="token operator">:</span> version <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>对比 MySQL 事务</strong>：</p><table><thead><tr><th>特性</th><th>MySQL</th><th>Redis</th></tr></thead><tbody><tr><td>原子性</td><td>✅ 全做或全不做</td><td>❌ 某条失败，前面不自动回滚</td></tr><tr><td>隔离性</td><td>多种隔离级别</td><td>串行执行命令</td></tr><tr><td>回滚</td><td>ROLLBACK</td><td>DISCARD 仅放弃未执行的</td></tr><tr><td>复杂度</td><td>高</td><td>简单</td></tr></tbody></table><blockquote><p><strong>Redis 事务的特性</strong>：命令排着队按顺序执行，中间不插队。但不像 MySQL 那样某条失败就自动回滚。</p></blockquote><hr><h2 id="_4-pipeline-—-批量发送-≈-promise-all-批量请求" tabindex="-1"><a class="header-anchor" href="#_4-pipeline-—-批量发送-≈-promise-all-批量请求"><span>4. Pipeline — 批量发送（≈ Promise.all 批量请求）</span></a></h2><div class="language-redis line-numbers-mode" data-ext="redis" data-title="redis"><pre class="language-redis"><code># 普通模式：发 3 条命令需要 3 次网络往返
SET a 1
GET a
INCR a

# Pipeline：一次性发送，一次性接收结果
# （N 条命令只需要 1 次网络往返）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">// Node.js Pipeline 示例</span>
<span class="token keyword">const</span> pipeline <span class="token operator">=</span> redis<span class="token punctuation">.</span><span class="token function">pipeline</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
pipeline<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
pipeline<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
pipeline<span class="token punctuation">.</span><span class="token function">incr</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> results <span class="token operator">=</span> <span class="token keyword">await</span> pipeline<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// results → [[null, &#39;OK&#39;], [null, &#39;1&#39;], [null, &#39;2&#39;]]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>前端理解</strong>：Pipeline ≈ HTTP/2 的多路复用，一次连接发多个请求，减少网络开销。批量操作性能提升 5~10 倍。</p></blockquote><hr><h2 id="_5-分布式锁-前端没有的机制" tabindex="-1"><a class="header-anchor" href="#_5-分布式锁-前端没有的机制"><span>5. 分布式锁（前端没有的机制）</span></a></h2><div class="language-redis line-numbers-mode" data-ext="redis" data-title="redis"><pre class="language-redis"><code># 用 SETNX + 过期时间实现分布式锁
# SETNX = SET if Not eXists

# 加锁
SETNX lock:order:123 &quot;server-A&quot;   # 成功返回 1，失败返回 0
EXPIRE lock:order:123 10          # 避免死锁：10 秒自动释放

# Redis 2.8+ 一行搞定（加锁 + 过期原子操作）
SET lock:order:123 &quot;server-A&quot; NX EX 10

# 解锁
if GET lock:order:123 == &quot;server-A&quot;
    DEL lock:order:123
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">// JS 类比：用唯一 key 加锁</span>
<span class="token comment">// 多人同时操作同一条数据时，只有第一个人能拿到锁</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>场景</strong>：秒杀库存、定时任务防重复执行、分布式系统资源互斥</p><hr><h2 id="_6-消息队列-list-实现" tabindex="-1"><a class="header-anchor" href="#_6-消息队列-list-实现"><span>6. 消息队列（List 实现）</span></a></h2><div class="language-redis line-numbers-mode" data-ext="redis" data-title="redis"><pre class="language-redis"><code># 生产者（≈ postMessage）
LPUSH msg:queue &quot;任务1&quot;        # 发消息

# 消费者（≈ 轮询接收）
BRPOP msg:queue 0             # 阻塞直到有消息（0 = 永远等待）
BRPOP msg:queue 30            # 阻塞最多 30 秒

# 多个消费者：一条消息只能被一个消费者取走
# 天然实现任务分发
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">// JS 类比</span>
<span class="token comment">// 生产者</span>
messageQueue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">&#39;任务1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 消费者（阻塞式等待）</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> task <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">waitForTask</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 类似 BRPOP</span>
    <span class="token function">process</span><span class="token punctuation">(</span>task<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="命令速查表" tabindex="-1"><a class="header-anchor" href="#命令速查表"><span>命令速查表</span></a></h2><table><thead><tr><th>场景</th><th>命令</th><th>说明</th></tr></thead><tbody><tr><td>设置</td><td><code>SET key val [EX/NX/XX]</code></td><td>存值，可设过期、仅在不存在时设</td></tr><tr><td>读取</td><td><code>GET key</code></td><td>取值</td></tr><tr><td>删除</td><td><code>DEL key</code></td><td>删键</td></tr><tr><td>过期</td><td><code>EXPIRE key sec</code></td><td>设秒级过期</td></tr><tr><td>过期</td><td><code>TTL key</code></td><td>查剩余秒数</td></tr><tr><td>判断</td><td><code>EXISTS key</code></td><td>是否存在</td></tr><tr><td>类型</td><td><code>TYPE key</code></td><td>值类型</td></tr><tr><td>事务</td><td><code>MULTI / EXEC</code></td><td>开启/执行事务</td></tr><tr><td>批量</td><td>Pipeline</td><td>一次性发送多条（客户端功能）</td></tr><tr><td>锁</td><td><code>SET NX EX</code></td><td>原子性分布式锁</td></tr><tr><td>遍历</td><td><code>SCAN cursor</code></td><td>安全遍历所有 key</td></tr></tbody></table>`,34)])])}const p=s(i,[["render",l],["__file","commands.html.vue"]]),r=JSON.parse('{"path":"/document/redis/commands.html","title":"常用命令 & 机制（对比 JS API）","lang":"zh-CN","frontmatter":{"date":"2026-06-29T00:00:00.000Z","category":["redis"],"tag":["命令","过期","事务","前端转后端"],"description":"常用命令 & 机制（对比 JS API） 1. 过期时间（TTL）— ≈ setTimeout 自动删除 实战场景： 验证码：5 分钟过期 Session：30 分钟无操作自动过期 限流：1 秒内只允许 10 次请求（用 TTL 做滑动窗口） 缓存：热点数据 1 小时失效 2. Key 命名规范与操作 ⚠️ 生产环境禁止用 KEYS *：会遍历所有 k...","head":[["meta",{"property":"og:url","content":"https://dyywork.github.io/blog/document/redis/commands.html"}],["meta",{"property":"og:site_name","content":"莫名点"}],["meta",{"property":"og:title","content":"常用命令 & 机制（对比 JS API）"}],["meta",{"property":"og:description","content":"常用命令 & 机制（对比 JS API） 1. 过期时间（TTL）— ≈ setTimeout 自动删除 实战场景： 验证码：5 分钟过期 Session：30 分钟无操作自动过期 限流：1 秒内只允许 10 次请求（用 TTL 做滑动窗口） 缓存：热点数据 1 小时失效 2. Key 命名规范与操作 ⚠️ 生产环境禁止用 KEYS *：会遍历所有 k..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-06-29T10:16:06.000Z"}],["meta",{"property":"article:author","content":"Mr.Ding"}],["meta",{"property":"article:tag","content":"命令"}],["meta",{"property":"article:tag","content":"过期"}],["meta",{"property":"article:tag","content":"事务"}],["meta",{"property":"article:tag","content":"前端转后端"}],["meta",{"property":"article:published_time","content":"2026-06-29T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2026-06-29T10:16:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"常用命令 & 机制（对比 JS API）\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-06-29T00:00:00.000Z\\",\\"dateModified\\":\\"2026-06-29T10:16:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Ding\\"}]}"]]},"headers":[{"level":2,"title":"1. 过期时间（TTL）— ≈ setTimeout 自动删除","slug":"_1-过期时间-ttl-—-≈-settimeout-自动删除","link":"#_1-过期时间-ttl-—-≈-settimeout-自动删除","children":[]},{"level":2,"title":"2. Key 命名规范与操作","slug":"_2-key-命名规范与操作","link":"#_2-key-命名规范与操作","children":[]},{"level":2,"title":"3. 事务（对比 JS Promise.all + 回滚）","slug":"_3-事务-对比-js-promise-all-回滚","link":"#_3-事务-对比-js-promise-all-回滚","children":[]},{"level":2,"title":"4. Pipeline — 批量发送（≈ Promise.all 批量请求）","slug":"_4-pipeline-—-批量发送-≈-promise-all-批量请求","link":"#_4-pipeline-—-批量发送-≈-promise-all-批量请求","children":[]},{"level":2,"title":"5. 分布式锁（前端没有的机制）","slug":"_5-分布式锁-前端没有的机制","link":"#_5-分布式锁-前端没有的机制","children":[]},{"level":2,"title":"6. 消息队列（List 实现）","slug":"_6-消息队列-list-实现","link":"#_6-消息队列-list-实现","children":[]},{"level":2,"title":"命令速查表","slug":"命令速查表","link":"#命令速查表","children":[]}],"git":{"createdTime":1782728166000,"updatedTime":1782728166000,"contributors":[{"name":"dingyongya","email":"dingyongya@mg-pen.com","commits":1}]},"readingTime":{"minutes":4.18,"words":1255},"filePathRelative":"document/redis/commands.md","localizedDate":"2026年6月29日","excerpt":"\\n<h2>1. 过期时间（TTL）— ≈ setTimeout 自动删除</h2>\\n<div class=\\"language-redis\\" data-ext=\\"redis\\" data-title=\\"redis\\"><pre class=\\"language-redis\\"><code># 设置 key 的同时指定过期时间\\nSET code \\"9527\\" EX 300        # 300 秒后自动删除\\n\\n# 单独设置过期\\nSET code \\"9527\\"\\nEXPIRE code 300               # 300 秒后过期\\n\\n# 查看剩余时间\\nTTL code                     # → 267（还有 267 秒）\\nTTL code                     # → -1 表示永不过期\\nTTL code                     # → -2 表示 key 已不存在\\n\\n# 移除过期时间\\nPERSIST code\\n\\n# 设置过期时间（毫秒）\\nSET code \\"9527\\" PX 300000    # 300 秒（毫秒为单位）\\n\\n# 更精准：过期时间戳\\nEXPIREAT code 1800000000     # 在指定时间戳过期\\n</code></pre></div>","autoDesc":true}');export{p as comp,r as data};
