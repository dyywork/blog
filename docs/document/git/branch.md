---
date: 2022-08-19
author: Mr.Ding
category:
- git
tag:
  - branch
  - merge
  - rebase
---

# Branch 分支

分支让你从主线（如 `main` / `master`）分叉出去独立开发，完成后再合并回来。Git 的分支创建、切换、合并都非常轻量。

## 分支查看

```shell
git branch              # 本地分支，当前分支前有 *
git branch -v           # 附带最后一次提交信息
git branch -a           # 本地 + 远程分支
git branch -r           # 仅远程分支
git log --oneline --decorate --graph --all  # 图形化查看分叉历史
```

## 分支创建

```shell
git branch <branchName>           # 基于当前 HEAD 创建分支
git branch <branchName> <commit>  # 基于指定提交创建
```

## 分支切换

```shell
git checkout <branchName>   # 传统写法
git switch <branchName>     # Git 2.23+ 推荐，语义更清晰
```

## 分支创建并切换

```shell
git checkout -b <newBranchName>              # 传统写法
git switch -c <newBranchName>                # 推荐
git switch -c <newBranchName> <startPoint>   # 基于指定提交/分支创建并切换
```

## 分支删除与重命名

```shell
git branch -d <branchName>   # 删除已合并的分支
git branch -D <branchName>   # 强制删除（未合并也会删）
git branch -m <oldName> <newName>  # 重命名分支
git branch -m <newName>            # 重命名当前分支
```

::: warning 注意
`-d` 删除未合并分支时会提示拒绝；确认不需要该分支改动时用 `-D`。
:::

## 分支合并

现在分支存在这种关系，我们需要将 `hotfix`、`iss53` 分支合并到主分支 `master` 中。

![分支图片](./img/img_2.png '分支图片1')

我们先将 `hotfix` 分支合并到 `master`：

```shell
$ git checkout master
$ git merge hotfix
Updating f42c576..3a0874c
Fast-forward
 index.html | 2 ++
 1 file changed, 2 insertions(+)
```

::: info 快进（fast-forward）
在合并的时候，你应该注意到了「快进（fast-forward）」这个词。由于 hotfix 所指向的提交 C4 是你所在提交 C2 的**直接后继**，Git 会直接将指针向前移动，不会新建合并提交——这就是快进合并。
:::

合并 `hotfix` 后，`iss53` 分支又提交了一次，现在分支情况是这样的：

![分支图片](./img/img_3.png '分支图片2')

现在将 `iss53` 合并到 `master`：

```shell
$ git checkout master
Switched to branch 'master'
$ git merge iss53
Merge made by the 'recursive' strategy.
index.html | 1 +
1 file changed, 1 insertion(+)
```

这次与快进不同：`master` 并不是 `iss53` 的直接祖先，Git 会取两个分支末端快照（C4、C5）和公共祖先（C2）做**三方合并**，并自动创建一个**合并提交**（有两个父提交）。

![分支图片](./img/img_4.png '分支图片3')

![分支图片](./img/img_5.png '分支图片4')

### 其他合并方式

```shell
git merge --no-ff <branch>   # 禁用快进，始终生成合并提交（保留分支拓扑）
git merge --squash <branch>  # 将分支所有改动压成一次提交，不保留分支历史
git merge --abort            # 放弃进行中的合并
```

### 遇到冲突时的分支合并

不同分支修改了同一文件的同一处，合并时会产生冲突：

```shell
$ git merge iss53
Auto-merging index.html
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.
```

此时 Git 暂停合并，等待你手动解决。用 `git status` 查看未合并文件：

```shell
$ git status
On branch master
You have unmerged paths.
  (fix conflicts and run "git commit")
Unmerged paths:
  (use "git add <file>..." to mark resolution)
  both modified: index.html
```

冲突文件中会出现标记区段：

```html
<<<<<<< HEAD
<div id="footer">contact : email.support@github.com</div>
=======
<div id="footer">
please contact us at email.support@github.com
</div>
>>>>>>> iss53
```

- `<<<<<<< HEAD` 到 `=======` 之间：当前分支（master）的内容
- `=======` 到 `>>>>>>> iss53` 之间：被合并分支（iss53）的内容

删掉标记符号，保留或合并两边内容即可。例如：

```html
<div id="footer">
please contact us at email.support@github.com
</div>
```

处理完后标记已解决并完成合并：

```shell
git add index.html
git commit   # 完成合并提交；放弃合并用 git merge --abort
git push
```

## 远程分支

获取远程引用的完整列表或远程分支的更多信息：

```shell
git ls-remote <remote>    # 获取远程引用的完整列表
git remote show <remote>  # 远程分支及跟踪关系详情
```

远程分支 `git clone` 之后，服务器与本地仓库关系如下图：

![分支图片](./img/img_6.png '分支图片5')

如果你在本地 `master` 分支上做了一些工作，同一时间有人更新了他的 `master` 并推送到 `origin`，只要你保持不与 `origin` 连接（并拉取数据），你的 `origin/master` 指针就不会移动。

![分支图片](./img/img_7.png '分支图片7')

### 推送与跟踪分支

```shell
git push -u origin <branch>   # 首次推送并设置上游跟踪
git push                      # 之后可直接 push（已设置 upstream）
git branch -vv                # 查看本地分支跟踪的远程分支
git branch --set-upstream-to=origin/<branch>  # 手动设置跟踪
```

`-u`（`--set-upstream`）让本地分支关联远程分支，之后 `git pull` / `git push` 无需再写远程名和分支名。

### 拉取

```shell
git fetch <remote>                  # 仅下载远程数据，不修改工作区
git pull <remote> <branch>          # fetch + merge
git pull --rebase <remote> <branch> # fetch + rebase，历史更线性
```

::: info 拉取
`git fetch` 只更新远程跟踪分支（如 `origin/main`），不会自动合并到当前分支。`git pull` = `fetch` + `merge`（或 `rebase`）。由于 `pull` 的默认行为有时令人困惑，很多团队习惯显式 `fetch` 再 `merge` / `rebase`。
:::

### 删除远程分支

```shell
git push origin --delete serverfix
# 或
git push origin :serverfix
```

## 变基（rebase）

变基把当前分支的提交「挪到」目标分支最新提交之后，历史呈一条直线。

![分支图片](./img/img_8.png '分支图片')

```shell
$ git checkout experiment
$ git rebase master
First, rewinding head to replay your work on top of it...
Applying: added staged command
```

![分支图片](./img/img_9.png '分支图片')

变基后切回主分支做快进合并（或直接推送，视团队规范而定）：

```shell
git checkout master
git merge experiment   # 此时通常是 fast-forward
```

![分支图片](./img/img_10.png '分支图片')

变基过程中若有冲突，解决后：

```shell
git add <file>
git rebase --continue   # 继续
git rebase --abort      # 放弃变基，回到变基前状态
git rebase --skip       # 跳过当前提交
```

### merge 与 rebase 怎么选

| | merge | rebase |
|---|-------|--------|
| 历史形态 | 保留分叉与合并节点 | 线性历史，无多余合并提交 |
| 适用场景 | 公共分支、已推送的协作分支 | 本地 feature 整理提交、同步 main 最新代码 |
| 风险 | 冲突一次性在合并提交解决 | 逐 commit 可能多次冲突 |

::: info 变基的黄金法则
**如果提交已推送到远程，且别人可能基于这些提交开发，不要对已共享的分支做 rebase。**

变基会丢弃旧提交、生成内容相同但 hash 不同的新提交。对已推送分支 rebase 后再 force push，会让协作者的本地历史与远程不一致，造成混乱。
:::

## 常见分支策略

| 分支名 | 用途 |
|--------|------|
| `main` / `master` | 生产就绪代码 |
| `develop` | 集成分支（Git Flow） |
| `feature/*` | 新功能开发 |
| `hotfix/*` | 紧急线上修复 |
| `release/*` | 发版准备 |

## 命令速查

| 命令 | 介绍 |
|:-----|------|
| `git branch` | 列出本地分支 |
| `git branch -a` | 列出所有分支（含远程） |
| `git switch <branch>` | 切换分支（推荐） |
| `git switch -c <branch>` | 创建并切换 |
| `git merge <branch>` | 合并指定分支到当前分支 |
| `git merge --no-ff <branch>` | 禁用快进合并 |
| `git merge --abort` | 放弃进行中的合并 |
| `git rebase <branch>` | 将当前分支变基到目标分支 |
| `git rebase --continue` | 解决冲突后继续变基 |
| `git push -u origin <branch>` | 推送并设置上游 |
| `git push origin --delete <branch>` | 删除远程分支 |
| `git fetch` | 拉取远程更新（不合并） |
| `git pull --rebase` | 拉取并以 rebase 方式整合 |
