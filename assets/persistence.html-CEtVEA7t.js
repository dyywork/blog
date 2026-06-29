import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as e,o as t}from"./app-R-2brQ3B.js";const i={};function l(d,n){return t(),a("div",null,[...n[0]||(n[0]=[e(`<h1 id="持久化-主从架构" tabindex="-1"><a class="header-anchor" href="#持久化-主从架构"><span>持久化 &amp; 主从架构</span></a></h1><h2 id="一、redis-为什么快" tabindex="-1"><a class="header-anchor" href="#一、redis-为什么快"><span>一、Redis 为什么快？</span></a></h2><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>所有数据都在内存中
每个命令单线程执行（无锁竞争）
高效的数据结构（跳表、压缩列表）
IO 多路复用（类似 Node.js 的事件循环）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>前端理解</strong>：Redis 是内存数据库 ≈ JS 变量存在内存中，MySQL 存在磁盘上。所以 Redis 读写在<strong>微秒级</strong>，MySQL 在<strong>毫秒级</strong>。</p></blockquote><hr><h2 id="二、持久化——内存数据如何不丢" tabindex="-1"><a class="header-anchor" href="#二、持久化——内存数据如何不丢"><span>二、持久化——内存数据如何不丢？</span></a></h2><p>Redis 数据在内存，服务器重启会丢失。持久化就是把内存数据保存到磁盘。</p><h3 id="_1-rdb-快照" tabindex="-1"><a class="header-anchor" href="#_1-rdb-快照"><span>1. RDB（快照）</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>原理：定期把全部数据拍个快照存到 dump.rdb 文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># redis.conf 配置</span>
save <span class="token number">900</span> <span class="token number">1</span>          <span class="token comment"># 900 秒内至少 1 个 key 修改，触发快照</span>
save <span class="token number">300</span> <span class="token number">10</span>         <span class="token comment"># 300 秒内至少 10 个 key 修改，触发快照</span>
save <span class="token number">60</span> <span class="token number">10000</span>       <span class="token comment"># 60 秒内至少 10000 个 key 修改，触发快照</span>

<span class="token comment"># 手动触发</span>
redis-cli SAVE      <span class="token comment"># 同步保存（阻塞）</span>
redis-cli BGSAVE    <span class="token comment"># 后台保存（推荐，像 JS 的 setTimeout）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><thead><tr><th>优点</th><th>缺点</th></tr></thead><tbody><tr><td>文件小，适合备份</td><td>可能丢数据（2 次快照之间的数据）</td></tr><tr><td>恢复快（直接加载）</td><td>大数据库保存时卡顿（fork 进程）</td></tr><tr><td>适合灾备</td><td>-</td></tr></tbody></table><h3 id="_2-aof-追加文件" tabindex="-1"><a class="header-anchor" href="#_2-aof-追加文件"><span>2. AOF（追加文件）</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>原理：每次写命令都记录下来，重启时重放命令恢复数据
类似前端操作日志：记录每一步操作，崩溃后重新执行
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># redis.conf 配置</span>
appendonly <span class="token function">yes</span>                    <span class="token comment"># 开启 AOF</span>
appendfsync always                <span class="token comment"># 每次写都刷盘（最安全，最慢）</span>
appendfsync everysec              <span class="token comment"># 每秒刷一次（推荐）</span>
appendfsync no                    <span class="token comment"># 交给操作系统（最快，最不安全）</span>

<span class="token comment"># 文件重写（合并冗余命令）</span>
auto-aof-rewrite-percentage <span class="token number">100</span>   <span class="token comment"># 文件增长 100% 触发重写</span>
auto-aof-rewrite-min-size 64mb    <span class="token comment"># 至少 64MB 才触发</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">// AOF 原理类比</span>
<span class="token comment">// 这条命令：</span>
<span class="token constant">SET</span> <span class="token literal-property property">user</span><span class="token operator">:</span><span class="token number">1</span><span class="token operator">:</span>name <span class="token string">&quot;小明&quot;</span>
<span class="token constant">SET</span> <span class="token literal-property property">user</span><span class="token operator">:</span><span class="token number">1</span><span class="token operator">:</span>age <span class="token string">&quot;25&quot;</span>

<span class="token comment">// 重写后合并为一行（节约空间）</span>
<span class="token constant">HMSET</span> <span class="token literal-property property">user</span><span class="token operator">:</span><span class="token number">1</span> name <span class="token string">&quot;小明&quot;</span> age <span class="token string">&quot;25&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><thead><tr><th>优点</th><th>缺点</th></tr></thead><tbody><tr><td>数据完整（最多丢 1 秒数据）</td><td>文件比 RDB 大</td></tr><tr><td>可读的日志文件</td><td>恢复比 RDB 慢</td></tr></tbody></table><h3 id="_3-rdb-aof-同时用-推荐" tabindex="-1"><a class="header-anchor" href="#_3-rdb-aof-同时用-推荐"><span>3. RDB + AOF 同时用（推荐）</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 同时开启</span>
save <span class="token number">900</span> <span class="token number">1</span>
appendonly <span class="token function">yes</span>
appendfsync everysec
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>加载顺序</strong>：重启时优先用 AOF（数据更完整），没有 AOF 就用 RDB</p></blockquote><hr><h2 id="三、主从复制-读写分离" tabindex="-1"><a class="header-anchor" href="#三、主从复制-读写分离"><span>三、主从复制（读写分离）</span></a></h2><h3 id="架构" tabindex="-1"><a class="header-anchor" href="#架构"><span>架构</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>┌───────────┐（写）
│  主节点 M  │  → 写入/修改/删除
│           │
└─────┬─────┘
      │ 同步
  ┌───┴───┬───┐
  │       │   │
┌─▼──┐ ┌─▼──┐ ┌─▼──┐（读）
│ S1  │ │ S2  │ │ S3  │  → 查询/读操作
└────┘ └────┘ └────┘
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置"><span>配置</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 从节点 redis.conf</span>
replicaof <span class="token number">127.0</span>.0.1 <span class="token number">6379</span>   <span class="token comment"># 主节点的 IP 和端口</span>
<span class="token comment"># 或者命令行</span>
redis-cli<span class="token operator">&gt;</span> REPLICAOF <span class="token number">127.0</span>.0.1 <span class="token number">6379</span>

<span class="token comment"># 主节点配置（可选）</span>
masterauth yourpassword      <span class="token comment"># 如果主节点有密码</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">// Node.js 读写分离</span>
<span class="token keyword">const</span> Redis <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;ioredis&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 主节点（写）</span>
<span class="token keyword">const</span> master <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Redis</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">host</span><span class="token operator">:</span> <span class="token string">&#39;master-host&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token number">6379</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 从节点（读）</span>
<span class="token keyword">const</span> slave <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Redis</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">host</span><span class="token operator">:</span> <span class="token string">&#39;slave-host&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token number">6379</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 写操作走主库</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">createUser</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> master<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">user:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>data<span class="token punctuation">.</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 读操作走从库</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">getUser</span><span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">await</span> slave<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">user:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="主从同步原理" tabindex="-1"><a class="header-anchor" href="#主从同步原理"><span>主从同步原理</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>从节点启动 → 发 SYNC 给主节点
主节点 BGSAVE 生成 RDB → 发送给从节点
从节点加载 RDB → 追上主节点的后续操作
之后主节点持续同步增量命令
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>前端理解</strong>：主从 ≈ CDN + 源站。源站（主）负责更新，CDN 节点（从）负责读。主挂了可以选一个从升级为主。</p></blockquote><hr><h2 id="四、哨兵模式-高可用" tabindex="-1"><a class="header-anchor" href="#四、哨兵模式-高可用"><span>四、哨兵模式（高可用）</span></a></h2><h3 id="问题-主节点挂了怎么办" tabindex="-1"><a class="header-anchor" href="#问题-主节点挂了怎么办"><span>问题：主节点挂了怎么办？</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>主节点宕机 → 手动切从为主 → 改应用配置 → 重启应用
这个过程太慢了，需要自动化
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="哨兵-sentinel-解决" tabindex="-1"><a class="header-anchor" href="#哨兵-sentinel-解决"><span>哨兵（Sentinel）解决</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>┌─────────┐  ┌─────────┐  ┌─────────┐
│ 哨兵 1   │  │ 哨兵 2   │  │ 哨兵 3   │  ← 多个哨兵互相沟通
└────┬────┘  └────┬────┘  └────┬────┘
     └──────┬──────┘
            │ 监控
      ┌─────┴─────┐
      │  主节点 M   │
      │            │
      └─────┬─────┘
       ┌────┴────┐
       │         │
     ┌─▼──┐   ┌─▼──┐
     │ S1 │   │ S2 │
     └────┘   └────┘
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>哨兵自动做的事情</strong>：</p><ol><li>每隔 1 秒 ping 主节点</li><li>主节点挂了，哨兵们投票</li><li>多数哨兵同意后，从从节点中选一个当新主</li><li>把应用客户端切换到新主</li></ol><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 哨兵配置 sentinel.conf</span>
sentinel monitor mymaster <span class="token number">127.0</span>.0.1 <span class="token number">6379</span> <span class="token number">2</span>  <span class="token comment"># 2 个哨兵同意才算</span>
sentinel down-after-milliseconds <span class="token number">5000</span>        <span class="token comment"># 5 秒没响应判定为挂</span>
sentinel failover-timeout <span class="token number">60000</span>             <span class="token comment"># 故障转移超时</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="五、redis-安装与配置" tabindex="-1"><a class="header-anchor" href="#五、redis-安装与配置"><span>五、Redis 安装与配置</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># macOS 安装</span>
brew <span class="token function">install</span> redis

<span class="token comment"># 启动</span>
brew services start redis
<span class="token comment"># 或</span>
redis-server /usr/local/etc/redis.conf

<span class="token comment"># 连接</span>
redis-cli
redis-cli <span class="token function">ping</span>    <span class="token comment"># 返回 PONG 表示连接成功</span>

<span class="token comment"># 带密码连接</span>
redis-cli <span class="token parameter variable">-h</span> <span class="token number">127.0</span>.0.1 <span class="token parameter variable">-p</span> <span class="token number">6379</span> <span class="token parameter variable">-a</span> yourpassword

<span class="token comment"># 常用配置</span>
redis-cli<span class="token operator">&gt;</span> CONFIG GET requirepass   <span class="token comment"># 查看密码</span>
redis-cli<span class="token operator">&gt;</span> CONFIG SET requirepass <span class="token string">&quot;123456&quot;</span>  <span class="token comment"># 设置密码</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># redis.conf 常用配置</span>
port <span class="token number">6379</span>              <span class="token comment"># 端口</span>
daemonize <span class="token function">yes</span>          <span class="token comment"># 后台运行</span>
requirepass <span class="token number">123456</span>     <span class="token comment"># 密码</span>
maxmemory 512mb        <span class="token comment"># 最大内存</span>
maxmemory-policy allkeys-lru  <span class="token comment"># 淘汰策略</span>
<span class="token builtin class-name">bind</span> <span class="token number">0.0</span>.0.0           <span class="token comment"># 允许远程连接（生产环境注意安全）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="速查表" tabindex="-1"><a class="header-anchor" href="#速查表"><span>速查表</span></a></h2><table><thead><tr><th>概念</th><th>类比前端</th></tr></thead><tbody><tr><td>RDB 快照</td><td>Git 定期 commit</td></tr><tr><td>AOF 日志</td><td>操作录屏（可回放）</td></tr><tr><td>主从复制</td><td>CDN + 源站</td></tr><tr><td>哨兵</td><td>监控 + 自动故障转移</td></tr><tr><td>内存存储</td><td>存在变量里（快！）</td></tr><tr><td>持久化</td><td>localStorage.getItem/setItem</td></tr><tr><td>单线程</td><td>JavaScript 事件循环（避免锁问题）</td></tr></tbody></table>`,45)])])}const r=s(i,[["render",l],["__file","persistence.html.vue"]]),o=JSON.parse('{"path":"/document/redis/persistence.html","title":"持久化 & 主从架构","lang":"zh-CN","frontmatter":{"date":"2026-06-29T00:00:00.000Z","category":["redis"],"tag":["持久化","RDB","AOF","主从"],"description":"持久化 & 主从架构 一、Redis 为什么快？ 前端理解：Redis 是内存数据库 ≈ JS 变量存在内存中，MySQL 存在磁盘上。所以 Redis 读写在微秒级，MySQL 在毫秒级。 二、持久化——内存数据如何不丢？ Redis 数据在内存，服务器重启会丢失。持久化就是把内存数据保存到磁盘。 1. RDB（快照） 2. AOF（追加文件） 3....","head":[["meta",{"property":"og:url","content":"https://dyywork.github.io/blog/document/redis/persistence.html"}],["meta",{"property":"og:site_name","content":"莫名点"}],["meta",{"property":"og:title","content":"持久化 & 主从架构"}],["meta",{"property":"og:description","content":"持久化 & 主从架构 一、Redis 为什么快？ 前端理解：Redis 是内存数据库 ≈ JS 变量存在内存中，MySQL 存在磁盘上。所以 Redis 读写在微秒级，MySQL 在毫秒级。 二、持久化——内存数据如何不丢？ Redis 数据在内存，服务器重启会丢失。持久化就是把内存数据保存到磁盘。 1. RDB（快照） 2. AOF（追加文件） 3...."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-06-29T10:16:06.000Z"}],["meta",{"property":"article:author","content":"Mr.Ding"}],["meta",{"property":"article:tag","content":"持久化"}],["meta",{"property":"article:tag","content":"RDB"}],["meta",{"property":"article:tag","content":"AOF"}],["meta",{"property":"article:tag","content":"主从"}],["meta",{"property":"article:published_time","content":"2026-06-29T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2026-06-29T10:16:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"持久化 & 主从架构\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-06-29T00:00:00.000Z\\",\\"dateModified\\":\\"2026-06-29T10:16:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Ding\\"}]}"]]},"headers":[{"level":2,"title":"一、Redis 为什么快？","slug":"一、redis-为什么快","link":"#一、redis-为什么快","children":[]},{"level":2,"title":"二、持久化——内存数据如何不丢？","slug":"二、持久化——内存数据如何不丢","link":"#二、持久化——内存数据如何不丢","children":[{"level":3,"title":"1. RDB（快照）","slug":"_1-rdb-快照","link":"#_1-rdb-快照","children":[]},{"level":3,"title":"2. AOF（追加文件）","slug":"_2-aof-追加文件","link":"#_2-aof-追加文件","children":[]},{"level":3,"title":"3. RDB + AOF 同时用（推荐）","slug":"_3-rdb-aof-同时用-推荐","link":"#_3-rdb-aof-同时用-推荐","children":[]}]},{"level":2,"title":"三、主从复制（读写分离）","slug":"三、主从复制-读写分离","link":"#三、主从复制-读写分离","children":[{"level":3,"title":"架构","slug":"架构","link":"#架构","children":[]},{"level":3,"title":"配置","slug":"配置","link":"#配置","children":[]},{"level":3,"title":"主从同步原理","slug":"主从同步原理","link":"#主从同步原理","children":[]}]},{"level":2,"title":"四、哨兵模式（高可用）","slug":"四、哨兵模式-高可用","link":"#四、哨兵模式-高可用","children":[{"level":3,"title":"问题：主节点挂了怎么办？","slug":"问题-主节点挂了怎么办","link":"#问题-主节点挂了怎么办","children":[]},{"level":3,"title":"哨兵（Sentinel）解决","slug":"哨兵-sentinel-解决","link":"#哨兵-sentinel-解决","children":[]}]},{"level":2,"title":"五、Redis 安装与配置","slug":"五、redis-安装与配置","link":"#五、redis-安装与配置","children":[]},{"level":2,"title":"速查表","slug":"速查表","link":"#速查表","children":[]}],"git":{"createdTime":1782728166000,"updatedTime":1782728166000,"contributors":[{"name":"dingyongya","email":"dingyongya@mg-pen.com","commits":1}]},"readingTime":{"minutes":3.94,"words":1183},"filePathRelative":"document/redis/persistence.md","localizedDate":"2026年6月29日","excerpt":"\\n<h2>一、Redis 为什么快？</h2>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>所有数据都在内存中\\n每个命令单线程执行（无锁竞争）\\n高效的数据结构（跳表、压缩列表）\\nIO 多路复用（类似 Node.js 的事件循环）\\n</code></pre></div><blockquote>\\n<p><strong>前端理解</strong>：Redis 是内存数据库 ≈ JS 变量存在内存中，MySQL 存在磁盘上。所以 Redis 读写在<strong>微秒级</strong>，MySQL 在<strong>毫秒级</strong>。</p>\\n</blockquote>","autoDesc":true}');export{r as comp,o as data};
