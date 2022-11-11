import{_ as s}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as n,c as a,e}from"./app.e903ed3f.js";const t="/blog/assets/img_2.20ec9813.png",i="/blog/assets/img_3.f5ee39e8.png",c="/blog/assets/img_4.5c8630e6.png",o="/blog/assets/img_5.9c8310cc.png",l="/blog/assets/img_6.d733e60c.png",d="/blog/assets/img_7.c98555cf.png",p="/blog/assets/img_8.740a4d99.png",r="/blog/assets/img_9.4210a7ab.png",u="/blog/assets/img_10.3bb58caa.png",m={},g=e(`<h1 id="branch-\u5206\u652F" tabindex="-1"><a class="header-anchor" href="#branch-\u5206\u652F" aria-hidden="true">#</a> Branch \u5206\u652F</h1><h2 id="\u5206\u652F\u521B\u5EFA" tabindex="-1"><a class="header-anchor" href="#\u5206\u652F\u521B\u5EFA" aria-hidden="true">#</a> \u5206\u652F\u521B\u5EFA</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> branch <span class="token operator">&lt;</span>branchName<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u5206\u652F\u5207\u6362" tabindex="-1"><a class="header-anchor" href="#\u5206\u652F\u5207\u6362" aria-hidden="true">#</a> \u5206\u652F\u5207\u6362</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> checkout <span class="token operator">&lt;</span>branchName<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u5206\u652F\u521B\u5EFA\u5E76\u5207\u6362" tabindex="-1"><a class="header-anchor" href="#\u5206\u652F\u521B\u5EFA\u5E76\u5207\u6362" aria-hidden="true">#</a> \u5206\u652F\u521B\u5EFA\u5E76\u5207\u6362</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> <span class="token operator">&lt;</span>newbranchname<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u5206\u652F\u5408\u5E76" tabindex="-1"><a class="header-anchor" href="#\u5206\u652F\u5408\u5E76" aria-hidden="true">#</a> \u5206\u652F\u5408\u5E76</h2><p>\u73B0\u5728\u5206\u652F\u5B58\u5728\u8FD9\u79CD\u5173\u7CFB\uFF0C\u6211\u4EEC\u9700\u8981\u5C06 <code>hotfix</code>, <code>iss53</code> \u5206\u652F\u5408\u5E76\u5230\u4E3B\u5206\u652F <code>master</code> \u4E2D\u3002 <img src="`+t+`" alt="\u5206\u652F\u56FE\u7247" title="\u5206\u652F\u56FE\u72471"></p><p>\u4F60\u53EF\u4EE5\u7B80\u5355\u5730\u4F7F\u7528 git log \u547D\u4EE4\u67E5\u770B\u5206\u53C9\u5386\u53F2\u3002 \u8FD0\u884C git log --oneline --decorate --graph --all</p><p>\u6211\u4EEC\u5148\u5C06 <code>hotfix</code> \u5206\u652F\u5408\u5E76\u5230 <code>master</code></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">git</span> checkout master
$ <span class="token function">git</span> marge hotfix
Updating f42c576<span class="token punctuation">..</span>3a0874c
Fast-forward
 index.html <span class="token operator">|</span> <span class="token number">2</span> ++
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">2</span> insertions<span class="token punctuation">(</span>+<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container info"><p class="custom-container-title">\u5FEB\u8FDB\uFF08fast-forward\uFF09</p><p>\u5728\u5408\u5E76\u7684\u65F6\u5019\uFF0C\u4F60\u5E94\u8BE5\u6CE8\u610F\u5230\u4E86\u201C\u5FEB\u8FDB\uFF08fast-forward\uFF09\u201D\u8FD9\u4E2A\u8BCD\u3002 \u7531\u4E8E\u4F60\u60F3\u8981\u5408\u5E76\u7684\u5206\u652F hotfix \u6240\u6307\u5411\u7684\u63D0 \u4EA4 C4 \u662F\u4F60\u6240\u5728\u7684\u63D0\u4EA4 C2 \u7684\u76F4\u63A5\u540E\u7EE7\uFF0C \u56E0\u6B64 Git \u4F1A\u76F4\u63A5\u5C06\u6307\u9488\u5411\u524D\u79FB\u52A8\u3002\u6362\u53E5\u8BDD\u8BF4\uFF0C\u5F53\u4F60\u8BD5\u56FE\u5408\u5E76\u4E24\u4E2A\u5206\u652F \u65F6\uFF0C \u5982\u679C\u987A\u7740\u4E00\u4E2A\u5206\u652F\u8D70\u4E0B\u53BB\u80FD\u591F\u5230\u8FBE\u53E6\u4E00\u4E2A\u5206\u652F\uFF0C\u90A3\u4E48 Git \u5728\u5408\u5E76\u4E24\u8005\u7684\u65F6\u5019\uFF0C \u53EA\u4F1A\u7B80\u5355\u7684\u5C06\u6307\u9488\u5411\u524D\u63A8\u8FDB \uFF08\u6307\u9488\u53F3\u79FB\uFF09\uFF0C\u56E0\u4E3A\u8FD9\u79CD\u60C5\u51B5\u4E0B\u7684\u5408\u5E76\u64CD\u4F5C\u6CA1\u6709\u9700\u8981\u89E3\u51B3\u7684\u5206\u6B67\u2014\u2014\u8FD9\u5C31\u53EB\u505A \u201C\u5FEB\u8FDB\uFF08fast-forward\uFF09\u201D\u3002</p></div><p>\u5408\u5E76 <code>hotfix</code> \u540E\uFF0C<code>iss53</code> \u5206\u652F\u53C8\u63D0\u4EA4\u4E86\u4E00\u6B21\uFF0C\u73B0\u5728\u5206\u652F\u60C5\u51B5\u662F\u8FD9\u6837\u7684\uFF1B <img src="`+i+`" alt="\u5206\u652F\u56FE\u7247" title="\u5206\u652F\u56FE\u72472"> \u73B0\u5728\u5C06 <code>iss53</code> \u5408\u5E76\u5230 <code>master</code></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">git</span> checkout master
Switched to branch <span class="token string">&#39;master&#39;</span>
$ <span class="token function">git</span> merge iss53
Merge made by the <span class="token string">&#39;recursive&#39;</span> strategy.
index.html <span class="token operator">|</span> <span class="token number">1</span> +
<span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">1</span> insertion<span class="token punctuation">(</span>+<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>iss53</code> \u5408\u5E76\u5230 <code>master</code> \u548C <code>hotfix</code> \u5206\u652F\u5408\u5E76\u5230 <code>master</code>\u6709\u4E9B\u5DEE\u522B\uFF0C\u56E0\u4E3A\uFF0C<code>master</code> \u5206\u652F\u6240\u5728\u63D0\u4EA4\u5E76\u4E0D\u662F <code>iss53</code> \u5206\u652F\u6240\u5728\u63D0\u4EA4\u7684\u76F4\u63A5\u7956\u5148\uFF0CGit \u4E0D\u5F97\u4E0D \u505A\u4E00\u4E9B\u989D\u5916\u7684\u5DE5\u4F5C\u3002 \u51FA\u73B0\u8FD9\u79CD\u60C5\u51B5\u7684\u65F6\u5019\uFF0CGit \u4F1A\u4F7F\u7528\u4E24\u4E2A\u5206\u652F\u7684\u672B\u7AEF\u6240\u6307\u7684\u5FEB\u7167\uFF08C4 \u548C C5 \uFF09\u4EE5\u53CA\u8FD9\u4E24\u4E2A\u5206\u652F\u7684\u516C\u5171\u7956\u5148\uFF08C2\uFF09\uFF0C\u505A\u4E00\u4E2A\u7B80\u5355\u7684\u4E09\u65B9\u5408\u5E76\u3002 <img src="`+c+'" alt="\u5206\u652F\u56FE\u7247" title="\u5206\u652F\u56FE\u72473"></p><p>\u548C\u4E4B\u524D\u5C06\u5206\u652F\u6307\u9488\u5411\u524D\u63A8\u8FDB\u6240\u4E0D\u540C\u7684\u662F\uFF0CGit \u5C06\u6B64\u6B21\u4E09\u65B9\u5408\u5E76\u7684\u7ED3\u679C\u505A\u4E86\u4E00\u4E2A\u65B0\u7684\u5FEB\u7167\u5E76\u4E14\u81EA\u52A8\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\u63D0 \u4EA4\u6307\u5411\u5B83\u3002 \u8FD9\u4E2A\u88AB\u79F0\u4F5C\u4E00\u6B21\u5408\u5E76\u63D0\u4EA4\uFF0C\u5B83\u7684\u7279\u522B\u4E4B\u5904\u5728\u4E8E\u4ED6\u6709\u4E0D\u6B62\u4E00\u4E2A\u7236\u63D0\u4EA4\u3002 <img src="'+o+`" alt="\u5206\u652F\u56FE\u7247" title="\u5206\u652F\u56FE\u72474"></p><h3 id="\u9047\u5230\u51B2\u7A81\u65F6\u7684\u5206\u652F\u5408\u5E76" tabindex="-1"><a class="header-anchor" href="#\u9047\u5230\u51B2\u7A81\u65F6\u7684\u5206\u652F\u5408\u5E76" aria-hidden="true">#</a> \u9047\u5230\u51B2\u7A81\u65F6\u7684\u5206\u652F\u5408\u5E76</h3><p>\u5982\u679C\u6211\u4EEC\u5728\u4E0D\u540C\u5206\u652F\u4FEE\u6539\u4E86\u76F8\u540C\u6587\u4EF6\u7684\u540C\u4E00\u5904\uFF0C\u5728\u5B83\u4EEC\u5408\u5E76\u7684\u65F6\u5019\u5C31\u4F1A\u4EA7\u751F\u5408\u5E76\u51B2\u7A81\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">git</span> merge iss53
Auto-merging index.html
CONFLICT <span class="token punctuation">(</span>content<span class="token punctuation">)</span>: Merge conflict <span class="token keyword">in</span> index.html
Automatic merge failed<span class="token punctuation">;</span> fix conflicts and <span class="token keyword">then</span> commit the result.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B64\u65F6 Git \u505A\u4E86\u5408\u5E76\uFF0C\u4F46\u662F\u6CA1\u6709\u81EA\u52A8\u5730\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\u5408\u5E76\u63D0\u4EA4\u3002 Git \u4F1A\u6682\u505C\u4E0B\u6765\uFF0C\u7B49\u5F85\u4F60\u53BB\u89E3\u51B3\u5408\u5E76\u4EA7\u751F\u7684\u51B2\u7A81\u3002 \u4F60\u53EF\u4EE5\u5728\u5408\u5E76\u51B2\u7A81\u540E\u7684\u4EFB\u610F\u65F6\u523B\u4F7F\u7528 <code>git status</code> \u547D\u4EE4\u6765\u67E5\u770B\u90A3\u4E9B\u56E0\u5305\u542B\u5408\u5E76\u51B2\u7A81\u800C\u5904\u4E8E\u672A\u5408\u5E76 <code>\uFF08unmerged\uFF09\u672A\u5408\u5E76</code>\u72B6\u6001\u7684\u6587\u4EF6\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">git</span> status
On branch master
You have unmerged paths.
  <span class="token punctuation">(</span>fix conflicts and run <span class="token string">&quot;git commit&quot;</span><span class="token punctuation">)</span>
Unmerged paths:
  <span class="token punctuation">(</span>use <span class="token string">&quot;git add &lt;file&gt;...&quot;</span> to mark resolution<span class="token punctuation">)</span>
  both modified: index.html
no changes added to commit <span class="token punctuation">(</span>use <span class="token string">&quot;git add&quot;</span> and/or <span class="token string">&quot;git commit -a&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4EFB\u4F55\u56E0\u5305\u542B\u5408\u5E76\u51B2\u7A81\u800C\u6709\u5F85\u89E3\u51B3\u7684\u6587\u4EF6\uFF0C\u90FD\u4F1A\u4EE5\u672A\u5408\u5E76\u72B6\u6001\u6807\u8BC6\u51FA\u6765.\u6253\u5F00\u51B2\u7A81\u6587\u4EF6\u6587\u4EF6\u4E2D\u4F1A\u6709\u4E00\u4E9B\u7279\u6B8A\u533A\u6BB5\uFF0C\u5C31\u50CF\u4E0B\u9762</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD:index.html
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>footer<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>contact : email.support@github.com<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
=======
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>footer<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
 please contact us at support@github.com
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
&gt;&gt;&gt;&gt;&gt;&gt;&gt; iss53:index.html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u8868\u793A HEAD \u6240\u6307\u793A\u7684\u7248\u672C\uFF08\u4E5F\u5C31\u662F\u4F60\u7684 master \u5206\u652F\u6240\u5728\u7684\u4F4D\u7F6E\uFF0C\u56E0\u4E3A\u4F60\u5728\u8FD0\u884C merge \u547D\u4EE4\u7684\u65F6\u5019\u5DF2\u7ECF\u68C0\u51FA \u5230\u4E86\u8FD9\u4E2A\u5206\u652F\uFF09\u5728\u8FD9\u4E2A\u533A\u6BB5\u7684\u4E0A\u534A\u90E8\u5206\uFF08======= \u7684\u4E0A\u534A\u90E8\u5206\uFF09\uFF0C\u800C iss53 \u5206\u652F\u6240\u6307\u793A\u7684\u7248\u672C\u5728 ======= \u7684 \u4E0B\u534A\u90E8\u5206\u3002 \u4E3A\u4E86\u89E3\u51B3\u51B2\u7A81\uFF0C\u4F60\u5FC5\u987B\u9009\u62E9\u4F7F\u7528\u7531 ======= \u5206\u5272\u7684\u4E24\u90E8\u5206\u4E2D\u7684\u4E00\u4E2A\uFF0C\u6216\u8005\u4F60\u4E5F\u53EF\u4EE5\u81EA\u884C\u5408\u5E76\u8FD9\u4E9B\u5185 \u5BB9\u3002 \u4F8B\u5982\uFF0C\u4F60\u53EF\u4EE5\u901A\u8FC7\u628A\u8FD9\u6BB5\u5185\u5BB9\u6362\u6210\u4E0B\u9762\u7684\u6837\u5B50\u6765\u89E3\u51B3\u51B2\u7A81\uFF1A</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>footer<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
please contact us at email.support@github.com
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u51B2\u7A81\u6587\u4EF6\uFF0C\u5904\u7406\u5B8C\u540E\u8FD0\u884C <code>git status</code> \u7ED3\u679C\u6EE1\u610F <code>git commit</code> \u7136\u540E\u63A8\u5230\u8FDC\u7A0B\u5206\u652F <code>git push</code></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">git</span> status
On branch master
All conflicts fixed but you are still merging.
  <span class="token punctuation">(</span>use <span class="token string">&quot;git commit&quot;</span> to conclude merge<span class="token punctuation">)</span>
Changes to be committed:
  modified: index.html
  
$ <span class="token function">git</span> commit 
Merge branch <span class="token string">&#39;iss53&#39;</span>
Conflicts:
  index.html
<span class="token comment">#</span>
<span class="token comment"># It looks like you may be committing a merge.</span>
<span class="token comment"># If this is not correct, please remove the file</span>
<span class="token comment"># .git/MERGE_HEAD</span>
<span class="token comment"># and try again.</span>
<span class="token comment"># Please enter the commit message for your changes. Lines starting</span>
<span class="token comment"># with &#39;#&#39; will be ignored, and an empty message aborts the commit.</span>
<span class="token comment"># On branch master</span>
<span class="token comment"># All conflicts fixed but you are still merging.</span>
<span class="token comment">#</span>
<span class="token comment"># Changes to be committed:</span>
<span class="token comment"># modified: index.html</span>
<span class="token comment">#</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u8FDC\u7A0B\u5206\u652F" tabindex="-1"><a class="header-anchor" href="#\u8FDC\u7A0B\u5206\u652F" aria-hidden="true">#</a> \u8FDC\u7A0B\u5206\u652F</h2><p>\u5730\u83B7\u5F97\u8FDC\u7A0B\u5F15\u7528\u7684\u5B8C\u6574\u5217\u8868\u6216\u8FDC\u7A0B\u5206\u652F\u7684\u66F4\u591A\u4FE1\u606F</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> ls-remote <span class="token operator">&lt;</span>remote<span class="token operator">&gt;</span> <span class="token comment"># \u5730\u83B7\u5F97\u8FDC\u7A0B\u5F15\u7528\u7684\u5B8C\u6574\u5217\u8868</span>
<span class="token function">git</span> remote show <span class="token operator">&lt;</span>remote<span class="token operator">&gt;</span> <span class="token comment"># \u8FDC\u7A0B\u5206\u652F\u7684\u66F4\u591A\u4FE1\u606F</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FDC\u7A0B\u5206\u652F <code>git clone</code> \u4E4B\u540E\u670D\u52A1\u5668\u4E0E\u672C\u5730\u4ED3\u5E93\u5982\u4E0B\u56FE\uFF1B</p><p><img src="`+l+'" alt="\u5206\u652F\u56FE\u7247" title="\u5206\u652F\u56FE\u72475"></p><p>\u5982\u679C\u4F60\u5728\u672C\u5730<code>master</code> \u5206\u652F\u4E0A\u505A\u4E86\u4E00\u4E9B\u5DE5\u4F5C\uFF0C\u540C\u4E00\u65F6\u95F4\uFF0C\u6709\u4EBA\u8DDF\u65B0\u4E86\u4ED6\u7684<code>master</code>\u5206\u652F\u5230<code>master</code>, \u5373\u4FBF\u8FD9\u6837\uFF0C\u53EA\u8981\u4F60\u4FDD\u6301\u4E0D\u4E0E<code>origin</code>\u670D\u52A1\u5668\u94FE\u63A5\uFF08\u5E76\u62C9\u53BB\u6570\u636E\uFF09\uFF0C\u4F60\u7684<code>origin/master</code>\u6307\u9488\u5C31\u4E0D\u4F1A\u79FB\u52A8</p><p><img src="'+d+`" alt="\u5206\u652F\u56FE\u7247" title="\u5206\u652F\u56FE\u72477"></p><h3 id="\u62C9\u53D6" tabindex="-1"><a class="header-anchor" href="#\u62C9\u53D6" aria-hidden="true">#</a> \u62C9\u53D6</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> fetch <span class="token operator">&lt;</span>remote<span class="token operator">&gt;</span> <span class="token comment"># \u8FDC\u7A0B\u4ED3\u5E93\u540C\u6B65\u6570\u636E</span>
<span class="token function">git</span> pull <span class="token operator">&lt;</span>remote<span class="token operator">&gt;</span> <span class="token comment"># \u5728\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u5B83\u7684\u542B\u4E49\u662F\u4E00\u4E2A \`git fetch\` \u7D27\u63A5\u7740\u4E00\u4E2A \`git merge\` \u547D\u4EE4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container info"><p class="custom-container-title">\u62C9\u53D6</p><p>\u5F53 git fetch \u547D\u4EE4\u4ECE\u670D\u52A1\u5668\u4E0A\u6293\u53D6\u672C\u5730\u6CA1\u6709\u7684\u6570\u636E\u65F6\uFF0C\u5B83\u5E76\u4E0D\u4F1A\u4FEE\u6539\u5DE5\u4F5C\u76EE\u5F55\u4E2D\u7684\u5185\u5BB9\u3002 \u5B83\u53EA\u4F1A\u83B7\u53D6\u6570\u636E\u7136 \u540E\u8BA9\u4F60\u81EA\u5DF1\u5408\u5E76\u3002 \u7136\u800C\uFF0C\u6709\u4E00\u4E2A\u547D\u4EE4\u53EB\u4F5C git pull \u5728\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u5B83\u7684\u542B\u4E49\u662F\u4E00\u4E2A git fetch \u7D27\u63A5\u7740\u4E00\u4E2A git merge \u547D\u4EE4\u3002 \u5982\u679C\u6709\u4E00\u4E2A\u50CF\u4E4B\u524D\u7AE0\u8282\u4E2D\u6F14\u793A\u7684\u8BBE\u7F6E\u597D\u7684\u8DDF\u8E2A\u5206\u652F\uFF0C\u4E0D\u7BA1\u5B83\u662F\u663E\u5F0F\u5730\u8BBE\u7F6E\u8FD8\u662F\u901A\u8FC7 clone \u6216 checkout \u547D\u4EE4\u4E3A\u4F60\u521B\u5EFA\u7684\uFF0Cgit pull \u90FD\u4F1A\u67E5\u627E\u5F53\u524D\u5206\u652F\u6240\u8DDF\u8E2A\u7684\u670D\u52A1\u5668\u4E0E\u5206\u652F\uFF0C \u4ECE\u670D\u52A1\u5668\u4E0A\u6293\u53D6\u6570\u636E\u7136 \u540E\u5C1D\u8BD5\u5408\u5E76\u5165\u90A3\u4E2A\u8FDC\u7A0B\u5206\u652F\u3002 \u7531\u4E8E git pull \u7684\u9B54\u6CD5\u7ECF\u5E38\u4EE4\u4EBA\u56F0\u60D1\u6240\u4EE5\u901A\u5E38\u5355\u72EC\u663E\u5F0F\u5730\u4F7F\u7528 fetch \u4E0E merge \u547D\u4EE4\u4F1A\u66F4\u597D\u4E00\u4E9B\u3002</p></div><h3 id="\u5220\u9664\u8FDC\u7A0B\u5206\u652F" tabindex="-1"><a class="header-anchor" href="#\u5220\u9664\u8FDC\u7A0B\u5206\u652F" aria-hidden="true">#</a> \u5220\u9664\u8FDC\u7A0B\u5206\u652F</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">git</span> push origin <span class="token parameter variable">--delete</span> serverfix
To https://github.com/schacon/simplegit
 - <span class="token punctuation">[</span>deleted<span class="token punctuation">]</span> serverfix
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53D8\u57FA" tabindex="-1"><a class="header-anchor" href="#\u53D8\u57FA" aria-hidden="true">#</a> \u53D8\u57FA</h2><p><img src="`+p+`" alt="\u5206\u652F\u56FE\u7247" title="\u5206\u652F\u56FE\u7247"></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">git</span> checkout experiment
$ <span class="token function">git</span> rebase master
First, rewinding <span class="token function">head</span> to replay your work on <span class="token function">top</span> of it<span class="token punctuation">..</span>.
Applying: added staged <span class="token builtin class-name">command</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+r+`" alt="\u5206\u652F\u56FE\u7247" title="\u5206\u652F\u56FE\u7247"></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">git</span> checkout master
$ <span class="token function">git</span> merge experiment
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+u+'" alt="\u5206\u652F\u56FE\u7247" title="\u5206\u652F\u56FE\u7247"></p><h3 id="\u53D8\u57FA\u7684\u98CE\u9669" tabindex="-1"><a class="header-anchor" href="#\u53D8\u57FA\u7684\u98CE\u9669" aria-hidden="true">#</a> \u53D8\u57FA\u7684\u98CE\u9669</h3><div class="custom-container info"><p class="custom-container-title">\u6CE8</p><p>\u5443\uFF0C\u5947\u5999\u7684\u53D8\u57FA\u4E5F\u5E76\u975E\u5B8C\u7F8E\u65E0\u7F3A\uFF0C\u8981\u7528\u5B83\u5F97\u9075\u5B88\u4E00\u6761\u51C6\u5219\uFF1A<br><strong>\u5982\u679C\u63D0\u4EA4\u5B58\u5728\u4E8E\u4F60\u7684\u4ED3\u5E93\u4E4B\u5916\uFF0C\u800C\u522B\u4EBA\u53EF\u80FD\u57FA\u4E8E\u8FD9\u4E9B\u63D0\u4EA4\u8FDB\u884C\u5F00\u53D1\uFF0C\u90A3\u4E48\u4E0D\u8981\u6267\u884C\u53D8\u57FA\u3002</strong><br> \u5982\u679C\u4F60\u9075\u5FAA\u8FD9\u6761\u91D1\u79D1\u7389\u5F8B\uFF0C\u5C31\u4E0D\u4F1A\u51FA\u5DEE\u9519\u3002 \u5426\u5219\uFF0C\u4EBA\u6C11\u7FA4\u4F17\u4F1A\u4EC7\u6068\u4F60\uFF0C\u4F60\u7684\u670B\u53CB\u548C\u5BB6\u4EBA\u4E5F\u4F1A\u5632\u7B11\u4F60\uFF0C\u553E\u5F03\u4F60\u3002 \u53D8\u57FA\u64CD\u4F5C\u7684\u5B9E\u8D28\u662F\u4E22\u5F03\u4E00\u4E9B\u73B0\u6709\u7684\u63D0\u4EA4\uFF0C\u7136\u540E\u76F8\u5E94\u5730\u65B0\u5EFA\u4E00\u4E9B\u5185\u5BB9\u4E00\u6837\u4F46\u5B9E\u9645\u4E0A\u4E0D\u540C\u7684\u63D0\u4EA4\u3002 \u5982\u679C\u4F60\u5DF2\u7ECF\u5C06\u63D0 \u4EA4\u63A8\u9001\u81F3\u67D0\u4E2A\u4ED3\u5E93\uFF0C\u800C\u5176\u4ED6\u4EBA\u4E5F\u5DF2\u7ECF\u4ECE\u8BE5\u4ED3\u5E93\u62C9\u53D6\u63D0\u4EA4\u5E76\u8FDB\u884C\u4E86\u540E\u7EED\u5DE5\u4F5C\uFF0C\u6B64\u65F6\uFF0C\u5982\u679C\u4F60\u7528 git rebase \u547D\u4EE4 \u91CD\u65B0\u6574\u7406\u4E86\u63D0\u4EA4\u5E76\u518D\u6B21\u63A8\u9001\uFF0C\u4F60\u7684\u540C\u4F34\u56E0\u6B64\u5C06\u4E0D\u5F97\u4E0D\u518D\u6B21\u5C06\u4ED6\u4EEC\u624B\u5934\u7684\u5DE5\u4F5C\u4E0E\u4F60\u7684\u63D0\u4EA4\u8FDB\u884C\u6574\u5408\uFF0C\u5982\u679C\u63A5\u4E0B\u6765\u4F60 \u8FD8\u8981\u62C9\u53D6\u5E76\u6574\u5408\u4ED6\u4EEC\u4FEE\u6539\u8FC7\u7684\u63D0\u4EA4\uFF0C\u4E8B\u60C5\u5C31\u4F1A\u53D8\u5F97\u4E00\u56E2\u7CDF</p></div>',48),v=[g];function h(b,k){return n(),a("div",null,v)}const _=s(m,[["render",h],["__file","branch.html.vue"]]);export{_ as default};
