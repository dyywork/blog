import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as n,o as s}from"./app-Cx3Bs-RV.js";const i="/blog/assets/img-C7vEXog6.png",l="/blog/assets/img_1-DWq8sD_n.png",d={};function o(c,t){return s(),a("div",null,t[0]||(t[0]=[n('<h1 id="git-命令" tabindex="-1"><a class="header-anchor" href="#git-命令"><span>Git 命令</span></a></h1><h2 id="版本回退" tabindex="-1"><a class="header-anchor" href="#版本回退"><span>版本回退</span></a></h2><h3 id="_1-运行git-reflog-查看你的历史变更记录-如下" tabindex="-1"><a class="header-anchor" href="#_1-运行git-reflog-查看你的历史变更记录-如下"><span>1. 运行git reflog 查看你的历史变更记录， 如下</span></a></h3><p><img src="'+i+`" alt="这是图片" title="图1"></p><h3 id="_2-然后用-git-reset-hard-head-n-n是你要回退的引用位置-回退-比如上图可运行-git-reset-hard-48e3759" tabindex="-1"><a class="header-anchor" href="#_2-然后用-git-reset-hard-head-n-n是你要回退的引用位置-回退-比如上图可运行-git-reset-hard-48e3759"><span>2. 然后用 <code>git reset --hard HEAD@{n}</code> (n是你要回退的引用位置) 回退；比如上图可运行 <code>git reset --hard 48e3759</code></span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># git reset 和 git revert 的区别?</span>

<span class="token function">git</span> reset <span class="token parameter variable">--hard</span> <span class="token punctuation">{</span>commitHashId<span class="token punctuation">}</span> <span class="token comment"># 回退到某个版本 </span>
<span class="token function">git</span> revert <span class="token parameter variable">--n</span> <span class="token punctuation">{</span>commitHashId<span class="token punctuation">}</span> <span class="token comment"># 回退到某一个commit,会生成一个新的版本,反转覆盖掉原来的提交代码</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-commit-后的东西想取消" tabindex="-1"><a class="header-anchor" href="#_3-commit-后的东西想取消"><span>3. commit 后的东西想取消</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">git</span> reset <span class="token parameter variable">--soft</span> HEAD^   <span class="token comment"># 如果想把add 一起取消就把 --soft 改成 --hard</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>HEAD^</code>表示上一个版本，即上一次的commit 也可以写成HEAD~1 如果进行两次commit ，都想撤回，可以使用HEAD~2</p><p>–soft<br> 不删除工作空间的改动代码 ，撤销commit，不撤销git add file</p><p>–hard<br> 删除工作空间的改动代码，撤销commit且撤销add</p><h2 id="用户名-邮箱设置" tabindex="-1"><a class="header-anchor" href="#用户名-邮箱设置"><span>用户名，邮箱设置</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 查看用户和邮箱</span>
<span class="token function">git</span> config user.name
<span class="token function">git</span> config user.email
<span class="token comment"># 当前项目</span>
<span class="token function">git</span> config user.name <span class="token string">&quot;John Doe&quot;</span>
<span class="token function">git</span> config user.email johndoe@example.com
<span class="token comment"># 全局项目</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> user.name <span class="token string">&quot;John Doe&quot;</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> user.email johndoe@example.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">注意</p><p>如果使用了 --global 选项，那么该命令只需要运行一次，因为之后无论你在该系统上做任何事 情， Git 都会使用那些信息。 当你想针对特定项目使用不同的用户名称与邮件地址时，可以在那个项目目录下运 行没有 --global 选项的命令来配置。</p></div><h2 id="在提交-commit-后发现尚未暂存某些需要修改的文件" tabindex="-1"><a class="header-anchor" href="#在提交-commit-后发现尚未暂存某些需要修改的文件"><span>在提交（commit） 后发现尚未暂存某些需要修改的文件</span></a></h2><ul><li>例如</li></ul><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&#39;initial commit&#39;</span>
<span class="token function">git</span> <span class="token function">add</span> forgotten_file
<span class="token function">git</span> commit <span class="token parameter variable">--amend</span> <span class="token comment"># 最终你只会有一个提交——第二次提交将代替第一次提交的结果</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info"><p class="hint-container-title">修复旧提交</p><p>当你在修补最后的提交时，与其说是修复旧提交，倒不如说是完全用一个 新的提交 替换旧的 提交， 理解这一点非常重要。从效果上来说，就像是旧有的提交从未存在过一样，它并不会 出现在仓库的历史中。<br> 修补提交最明显的价值是可以稍微改进你最后的提交，而不会让“啊，忘了添加一个文件”或 者 “小修补，修正笔误”这种提交信息弄乱你的仓库历史。</p></div><h2 id="撤消对文件的修改" tabindex="-1"><a class="header-anchor" href="#撤消对文件的修改"><span>撤消对文件的修改</span></a></h2><p><img src="`+l+`" alt="Alt" title="图片标题"></p><ul><li>如上图 <span style="color:red;">Changes not staged for commit</span>（已更改）的文件</li></ul><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code> <span class="token function">git</span> checkout --  docs/document/css/layout.md <span class="token comment"># 将撤销之前所有的修改</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container info"><p class="hint-container-title">注</p><p>请务必记得 <code>git checkout -- &lt;file&gt;</code> 是一个危险的命令。 你对那个文件在本地的任何修 改都会消失——Git 会用最近提交的版本覆盖掉它。 除非你确实清楚不想要对那个文件的本地 修改了，否则请不要使用这个命令。</p></div><h2 id="从远程仓库中抓取与拉取" tabindex="-1"><a class="header-anchor" href="#从远程仓库中抓取与拉取"><span>从远程仓库中抓取与拉取</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">git</span> fetch <span class="token operator">&lt;</span>remote<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container info"><p class="hint-container-title">注</p><p>必须注意 git fetch 命令只会将数据下载到你的本地仓库——它并不会自动合并或修改你当前的工作。 当准备好时你必须手动将其合并入你的工作。<br> git pull 通常会从最初克隆的服务器上抓取数据并自动尝试合并到当前所在的分支。</p></div><h2 id="新建删除标签" tabindex="-1"><a class="header-anchor" href="#新建删除标签"><span>新建删除标签</span></a></h2><h3 id="_1-新建" tabindex="-1"><a class="header-anchor" href="#_1-新建"><span>1. 新建</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">git</span> tag <span class="token comment"># 查看标签</span>
<span class="token function">git</span> tag <span class="token operator">&lt;</span>tagName<span class="token operator">&gt;</span> <span class="token comment"># 新建轻量标签</span>
<span class="token function">git</span> tag <span class="token parameter variable">-a</span> <span class="token string">&#39;标签名&#39;</span> <span class="token comment"># 添加新标签</span>
<span class="token function">git</span> tag <span class="token parameter variable">-a</span> <span class="token string">&#39;标签名&#39;</span> <span class="token parameter variable">-m</span> <span class="token string">&#39;附注&#39;</span> <span class="token comment"># 添加附注新标签</span>
<span class="token function">git</span> tag <span class="token parameter variable">-a</span> <span class="token string">&#39;标签名&#39;</span> <span class="token variable"><span class="token variable">\`</span>commitId<span class="token variable">\`</span></span> <span class="token comment"># 添加之前版本新标签</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info"><p class="hint-container-title">标签创建成功后需要推送到远程仓库</p><ul><li><code>git push &lt;remote&gt; &lt;tagName&gt;</code></li><li><code>git push</code> 推送两种标签用 <code>git push &lt;remote&gt; --tags</code> 推送标签并不会区分轻量标签和附注标签， 没有简单的项能够让你只选择推送一种标签。</li></ul></div><h3 id="_2-删除" tabindex="-1"><a class="header-anchor" href="#_2-删除"><span>2. 删除</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code> <span class="token function">git</span> tag <span class="token parameter variable">-d</span> <span class="token operator">&lt;</span>tagname<span class="token operator">&gt;</span> <span class="token comment"># 删除一个轻量标签,删除掉本地仓库</span>
 <span class="token function">git</span> push <span class="token operator">&lt;</span>remote<span class="token operator">&gt;</span> :refs/tags/<span class="token operator">&lt;</span>tagname<span class="token operator">&gt;</span> <span class="token comment"># 来更新你的远程仓库</span>
 
 <span class="token function">git</span> push origin <span class="token parameter variable">--delete</span> <span class="token operator">&lt;</span>tagname<span class="token operator">&gt;</span> <span class="token comment"># 删除远程标签</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="命令列表" tabindex="-1"><a class="header-anchor" href="#命令列表"><span>命令列表</span></a></h2><div class="hint-container info"><p class="hint-container-title">Git</p><table><thead><tr><th style="text-align:left;">命令</th><th>介绍</th></tr></thead><tbody><tr><td style="text-align:left;"><code>git clone</code></td><td>默认是下载了所有分支的代码</td></tr><tr><td style="text-align:left;"><code>git branch</code></td><td>打印出所有的分支，以及当前所在分支</td></tr><tr><td style="text-align:left;"><code>git branch -a</code></td><td>查看项目所有分支</td></tr><tr><td style="text-align:left;"><code>git branch -r</code></td><td>查看项目所有远程分支</td></tr><tr><td style="text-align:left;"><code>git checkout &#39;分支名&#39;</code></td><td>切换分支</td></tr><tr><td style="text-align:left;"><code>git checkout -b &#39;分支名&#39;</code></td><td>新建并切换到分支</td></tr><tr><td style="text-align:left;"><code>git rm &#39;文件名&#39;</code></td><td>删除本地仓库目标文件</td></tr><tr><td style="text-align:left;"><code>git rm -f &#39;文件名&#39;</code></td><td>强制删除本地仓库目标文件</td></tr><tr><td style="text-align:left;"><code>git log</code></td><td>查看提交记录， 退出英文状态下Q</td></tr><tr><td style="text-align:left;"><code>git reflog</code></td><td>可查看修改记录，（包括git reset 的回退记录）</td></tr><tr><td style="text-align:left;"><code>git reset --hard {commit id}</code></td><td>回退版本</td></tr><tr><td style="text-align:left;"><code>git tag</code></td><td>查看标签</td></tr><tr><td style="text-align:left;"><code>git tag -a &#39;标签名&#39;</code></td><td>添加新标签</td></tr><tr><td style="text-align:left;"><code>git tag -a &#39;标签名&#39; -m &#39;附注&#39;</code></td><td>添加附注新标签</td></tr><tr><td style="text-align:left;"><code>git tag -a &#39;标签名&#39;</code>commitId\`</td><td>添加之前版本新标签</td></tr><tr><td style="text-align:left;"><code>git stash</code></td><td>代码放进暂存区（未被commit的代码）</td></tr><tr><td style="text-align:left;"><code>git stash apply</code></td><td>还原</td></tr><tr><td style="text-align:left;"><code>git stash drop</code></td><td>清除最近一次的stash记录</td></tr><tr><td style="text-align:left;"><code>git stash pop</code></td><td>还原并清除最近一次stash</td></tr><tr><td style="text-align:left;"><code>git stash list</code></td><td>查看暂存列表</td></tr><tr><td style="text-align:left;"><code>git stash clear</code></td><td>清空所有stash记录</td></tr><tr><td style="text-align:left;"><code>git remote -v</code></td><td>显示所有远程仓库</td></tr><tr><td style="text-align:left;"><code>git remote add &#39;url&#39;</code></td><td>添加一个远程仓库</td></tr><tr><td style="text-align:left;"><code>git remote rm &#39;name&#39;</code></td><td>删除一个远程仓库</td></tr><tr><td style="text-align:left;"><code>git remote rename &#39;old_name&#39; &#39;new_name&#39;</code></td><td>修改仓库名</td></tr></tbody></table></div>`,34)]))}const m=e(d,[["render",o],["__file","COMMIT.html.vue"]]),g=JSON.parse('{"path":"/document/git/COMMIT.html","title":"Git 命令","lang":"zh-CN","frontmatter":{"date":"2022-08-19T00:00:00.000Z","author":"Mr.Ding","category":["git"],"tag":["reset","tag"],"description":"Git 命令 版本回退 1. 运行git reflog 查看你的历史变更记录， 如下 这是图片 2. 然后用 git reset --hard HEAD@{n} (n是你要回退的引用位置) 回退；比如上图可运行 git reset --hard 48e3759 3. commit 后的东西想取消 HEAD^表示上一个版本，即上一次的commit 也可以...","head":[["meta",{"property":"og:url","content":"https://dyywork.github.io/blog/document/git/COMMIT.html"}],["meta",{"property":"og:site_name","content":"莫名点"}],["meta",{"property":"og:title","content":"Git 命令"}],["meta",{"property":"og:description","content":"Git 命令 版本回退 1. 运行git reflog 查看你的历史变更记录， 如下 这是图片 2. 然后用 git reset --hard HEAD@{n} (n是你要回退的引用位置) 回退；比如上图可运行 git reset --hard 48e3759 3. commit 后的东西想取消 HEAD^表示上一个版本，即上一次的commit 也可以..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-28T02:38:38.000Z"}],["meta",{"property":"article:author","content":"Mr.Ding"}],["meta",{"property":"article:tag","content":"reset"}],["meta",{"property":"article:tag","content":"tag"}],["meta",{"property":"article:published_time","content":"2022-08-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-28T02:38:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Git 命令\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-08-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-04-28T02:38:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Ding\\"}]}"]]},"headers":[{"level":2,"title":"版本回退","slug":"版本回退","link":"#版本回退","children":[{"level":3,"title":"1. 运行git reflog 查看你的历史变更记录， 如下","slug":"_1-运行git-reflog-查看你的历史变更记录-如下","link":"#_1-运行git-reflog-查看你的历史变更记录-如下","children":[]},{"level":3,"title":"2. 然后用 git reset --hard HEAD@{n} (n是你要回退的引用位置) 回退；比如上图可运行 git reset --hard 48e3759","slug":"_2-然后用-git-reset-hard-head-n-n是你要回退的引用位置-回退-比如上图可运行-git-reset-hard-48e3759","link":"#_2-然后用-git-reset-hard-head-n-n是你要回退的引用位置-回退-比如上图可运行-git-reset-hard-48e3759","children":[]},{"level":3,"title":"3. commit 后的东西想取消","slug":"_3-commit-后的东西想取消","link":"#_3-commit-后的东西想取消","children":[]}]},{"level":2,"title":"用户名，邮箱设置","slug":"用户名-邮箱设置","link":"#用户名-邮箱设置","children":[]},{"level":2,"title":"在提交（commit） 后发现尚未暂存某些需要修改的文件","slug":"在提交-commit-后发现尚未暂存某些需要修改的文件","link":"#在提交-commit-后发现尚未暂存某些需要修改的文件","children":[]},{"level":2,"title":"撤消对文件的修改","slug":"撤消对文件的修改","link":"#撤消对文件的修改","children":[]},{"level":2,"title":"从远程仓库中抓取与拉取","slug":"从远程仓库中抓取与拉取","link":"#从远程仓库中抓取与拉取","children":[]},{"level":2,"title":"新建删除标签","slug":"新建删除标签","link":"#新建删除标签","children":[{"level":3,"title":"1. 新建","slug":"_1-新建","link":"#_1-新建","children":[]},{"level":3,"title":"2. 删除","slug":"_2-删除","link":"#_2-删除","children":[]}]},{"level":2,"title":"命令列表","slug":"命令列表","link":"#命令列表","children":[]}],"git":{"createdTime":1652698109000,"updatedTime":1714271918000,"contributors":[{"name":"dingyongya","email":"yahya_dyy@163.com","commits":16}]},"readingTime":{"minutes":4.47,"words":1340},"filePathRelative":"document/git/COMMIT.md","localizedDate":"2022年8月19日","excerpt":"\\n<h2>版本回退</h2>\\n<h3>1. 运行git reflog 查看你的历史变更记录， 如下</h3>\\n<p></p>\\n<h3>2. 然后用 <code>git reset --hard HEAD@{n}</code> (n是你要回退的引用位置) 回退；比如上图可运行 <code>git reset --hard 48e3759</code></h3>\\n<div class=\\"language-bash\\" data-ext=\\"sh\\" data-title=\\"sh\\"><pre class=\\"language-bash\\"><code><span class=\\"token comment\\"># git reset 和 git revert 的区别?</span>\\n\\n<span class=\\"token function\\">git</span> reset <span class=\\"token parameter variable\\">--hard</span> <span class=\\"token punctuation\\">{</span>commitHashId<span class=\\"token punctuation\\">}</span> <span class=\\"token comment\\"># 回退到某个版本 </span>\\n<span class=\\"token function\\">git</span> revert <span class=\\"token parameter variable\\">--n</span> <span class=\\"token punctuation\\">{</span>commitHashId<span class=\\"token punctuation\\">}</span> <span class=\\"token comment\\"># 回退到某一个commit,会生成一个新的版本,反转覆盖掉原来的提交代码</span>\\n</code></pre></div>","autoDesc":true}');export{m as comp,g as data};