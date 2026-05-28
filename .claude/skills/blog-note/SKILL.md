---
name: blog-note
description: 在任意项目中记录技术笔记到 blog 项目。自动创建 markdown 文件并更新导航配置。
allowed-tools: Bash(ls:*) Bash(mkdir:*) Bash(git:*)
---

# Blog Note

将技术笔记记录到 blog 项目（`C:\dev\vue\blog`）的知识库中。

## 用法

```
/blog-note <分类> <标题> [内容]
```

支持三种输入方式：

### 方式一：一句话说完

```
/blog-note http 跨域解决方案 跨域是指浏览器同源策略限制，解决方案有 CORS、代理、JSONP 等
```

### 方式二：分多次说

```
/blog-note vue 响应式原理
内容：Vue 2 使用 Object.defineProperty，Vue 3 改用 Proxy
```

### 方式三：长篇笔记

直接说 `/blog-note`，Claude 会引导你逐步提供分类、标题和正文。

## 执行流程

1. **解析输入**：提取 category、title、content
   - category：对应 blog 的分类目录（http/vue/react/css/js/git/performance/canvas/regExp/softExamination/tool/weixin）
   - title：用作文件名和文档标题
   - content：笔记正文（markdown 格式）

2. **创建文件**：
   - 路径：`C:\dev\vue\blog\docs\document\{category}\{title-kebab-case}.md`
   - 自动生成 frontmatter（date、category）
   - 写入正文内容

3. **更新配置**（询问用户）：
   - 新分类 → 询问是否添加到 sidebar 和 navbar
   - 已有分类 → 询问是否添加到 sidebar children

4. **提交**（询问用户）：
   - 是否 git add + commit
   - 是否推送到远程
