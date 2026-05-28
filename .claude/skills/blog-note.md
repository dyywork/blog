---
name: blog-note
description: 在任意项目中记录技术笔记到 blog 项目
triggers:
  - "记录笔记"
  - "记知识点"
  - "添加到博客"
  - "记个笔记"
  - "blog note"
  - "写篇笔记"
---

# Blog Note

将技术笔记记录到 blog 项目（`C:\dev\vue\blog`）的知识库中。

## 用法

```
记录笔记 <分类> <标题>，内容：<正文>
```

支持的三类输入方式：

### 方式一：一句话描述（正文简短时）

```
记录笔记 http 跨域解决方案 跨域是指浏览器同源策略限制，解决方案有 CORS、代理、JSONP 等
```

### 方式二：多段正文（用「内容：」标记正文开始）

```
记录笔记 vue 响应式原理
内容：Vue 2 使用 Object.defineProperty 实现响应式，Vue 3 改用 Proxy。
Proxy 可以直接代理整个对象，不需要递归遍历属性。
```

### 方式三：打开编辑器写内容

```
记录笔记 react 状态管理
```

（不提供正文时会自动打开编辑器）

## 执行流程

1. **解析输入**：从用户消息中提取 category、title、content
   - category：第一个参数，对应 blog 项目中的分类目录（http/vue/react/css/js/git/performance/canvas/regExp/softExamination/tool/weixin）
   - title：第二个参数，用作文件名和文档标题
   - content：剩余内容（如有），用作正文

2. **创建文件**：
   - 路径：`C:\dev\vue\blog\docs\document\{category}\{title-kebab-case}.md`
   - 自动生成 frontmatter（date、category）
   - 写入正文内容

3. **更新配置**（询问用户是否需要）：
   - 如果是新的分类，询问是否添加到 sidebar 和 navbar
   - 如果是已有分类的新文章，询问是否添加到 sidebar children

4. **提交**（询问用户是否需要）：
   - 询问是否 git add + commit
