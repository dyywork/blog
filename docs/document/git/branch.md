---
date: 2022-08-19
author: Mr.Ding
category:
- git
tag:
  - branch
---
  
# Branch 分支

## 分支创建

```shell
git branch <branchName>
```

## 分支切换

```shell
git checkout <branchName>
```

## 分支创建并切换

```shell
git checkout -b <newbranchname>
```

## 分支合并

现在分支存在这种关系，我们需要将 `hotfix`, `iss53` 分支合并到主分支 `master` 中。
![分支图片](./img/img_2.png '分支图片1')

你可以简单地使用 git log 命令查看分叉历史。 运行 git log --oneline --decorate --graph
--all

我们先将 `hotfix` 分支合并到 `master`

```shell
$ git checkout master
$ git marge hotfix
Updating f42c576..3a0874c
Fast-forward
 index.html | 2 ++
 1 file changed, 2 insertions(+)
```

::: info 快进（fast-forward）
在合并的时候，你应该注意到了“快进（fast-forward）”这个词。 由于你想要合并的分支 hotfix 所指向的提
交 C4 是你所在的提交 C2 的直接后继， 因此 Git 会直接将指针向前移动。换句话说，当你试图合并两个分支
时， 如果顺着一个分支走下去能够到达另一个分支，那么 Git 在合并两者的时候， 只会简单的将指针向前推进
（指针右移），因为这种情况下的合并操作没有需要解决的分歧——这就叫做 “快进（fast-forward）”。
:::

合并 `hotfix` 后，`iss53` 分支又提交了一次，现在分支情况是这样的；
![分支图片](./img/img_3.png '分支图片2')
现在将 `iss53` 合并到 `master`

```shell
$ git checkout master
Switched to branch 'master'
$ git merge iss53
Merge made by the 'recursive' strategy.
index.html | 1 +
1 file changed, 1 insertion(+)
```

`iss53` 合并到 `master` 和 `hotfix` 分支合并到 `master`有些差别，因为，`master` 分支所在提交并不是 `iss53` 分支所在提交的直接祖先，Git 不得不
做一些额外的工作。 出现这种情况的时候，Git 会使用两个分支的末端所指的快照（C4 和 C5 ）以及这两个分支的公共祖先（C2），做一个简单的三方合并。
![分支图片](./img/img_4.png '分支图片3')  

和之前将分支指针向前推进所不同的是，Git 将此次三方合并的结果做了一个新的快照并且自动创建一个新的提
交指向它。 这个被称作一次合并提交，它的特别之处在于他有不止一个父提交。
![分支图片](./img/img_5.png '分支图片4')

### 遇到冲突时的分支合并

如果我们在不同分支修改了相同文件的同一处，在它们合并的时候就会产生合并冲突。

```shell
$ git merge iss53
Auto-merging index.html
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.
```

此时 Git 做了合并，但是没有自动地创建一个新的合并提交。 Git 会暂停下来，等待你去解决合并产生的冲突。
你可以在合并冲突后的任意时刻使用 `git status` 命令来查看那些因包含合并冲突而处于未合并
`（unmerged）未合并`状态的文件：

```shell
$ git status
On branch master
You have unmerged paths.
  (fix conflicts and run "git commit")
Unmerged paths:
  (use "git add <file>..." to mark resolution)
  both modified: index.html
no changes added to commit (use "git add" and/or "git commit -a")
```

任何因包含合并冲突而有待解决的文件，都会以未合并状态标识出来.打开冲突文件文件中会有一些特殊区段，就像下面

```html
<div id="footer">contact : email.support@github.com</div>
```

这表示 HEAD 所指示的版本（也就是你的 master 分支所在的位置，因为你在运行 merge 命令的时候已经检出
到了这个分支）在这个区段的上半部分（======= 的上半部分），而 iss53 分支所指示的版本在 ======= 的
下半部分。 为了解决冲突，你必须选择使用由 ======= 分割的两部分中的一个，或者你也可以自行合并这些内
容。 例如，你可以通过把这段内容换成下面的样子来解决冲突：

```html
<div id="footer">
please contact us at email.support@github.com
</div>
```

冲突文件，处理完后运行 `git status` 结果满意 `git commit` 然后推到远程分支 `git push`

```shell
$ git status
On branch master
All conflicts fixed but you are still merging.
  (use "git commit" to conclude merge)
Changes to be committed:
  modified: index.html
  
$ git commit 
Merge branch 'iss53'
Conflicts:
  index.html
#
# It looks like you may be committing a merge.
# If this is not correct, please remove the file
# .git/MERGE_HEAD
# and try again.
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
# On branch master
# All conflicts fixed but you are still merging.
#
# Changes to be committed:
# modified: index.html
#
```

## 远程分支

地获得远程引用的完整列表或远程分支的更多信息

```shell
git ls-remote <remote> # 地获得远程引用的完整列表
git remote show <remote> # 远程分支的更多信息
```

远程分支 `git clone` 之后服务器与本地仓库如下图；

 ![分支图片](./img/img_6.png '分支图片5')

如果你在本地`master` 分支上做了一些工作，同一时间，有人跟新了他的`master`分支到`master`, 即便这样，只要你保持不与`origin`服务器链接（并拉去数据），你的`origin/master`指针就不会移动

![分支图片](./img/img_7.png '分支图片7')

### 拉取

```shell
git fetch <remote> # 远程仓库同步数据
git pull <remote> # 在大多数情况下它的含义是一个 `git fetch` 紧接着一个 `git merge` 命令
```

::: info 拉取
当 git fetch 命令从服务器上抓取本地没有的数据时，它并不会修改工作目录中的内容。 它只会获取数据然
后让你自己合并。 然而，有一个命令叫作 git pull 在大多数情况下它的含义是一个 git fetch 紧接着一个
git merge 命令。 如果有一个像之前章节中演示的设置好的跟踪分支，不管它是显式地设置还是通过 clone
或 checkout 命令为你创建的，git pull 都会查找当前分支所跟踪的服务器与分支， 从服务器上抓取数据然
后尝试合并入那个远程分支。
由于 git pull 的魔法经常令人困惑所以通常单独显式地使用 fetch 与 merge 命令会更好一些。
:::

### 删除远程分支

```shell
$ git push origin --delete serverfix
To https://github.com/schacon/simplegit
 - [deleted] serverfix
```

## 变基

![分支图片](./img/img_8.png '分支图片')

```shell
$ git checkout experiment
$ git rebase master
First, rewinding head to replay your work on top of it...
Applying: added staged command
```

![分支图片](./img/img_9.png '分支图片')

```shell
git checkout master
git merge experiment
```

![分支图片](./img/img_10.png '分支图片')

### 变基的风险

::: info 注
呃，奇妙的变基也并非完美无缺，要用它得遵守一条准则：  
**如果提交存在于你的仓库之外，而别人可能基于这些提交进行开发，那么不要执行变基。**
如果你遵循这条金科玉律，就不会出差错。 否则，人民群众会仇恨你，你的朋友和家人也会嘲笑你，唾弃你。
变基操作的实质是丢弃一些现有的提交，然后相应地新建一些内容一样但实际上不同的提交。 如果你已经将提
交推送至某个仓库，而其他人也已经从该仓库拉取提交并进行了后续工作，此时，如果你用 git rebase 命令
重新整理了提交并再次推送，你的同伴因此将不得不再次将他们手头的工作与你的提交进行整合，如果接下来你
还要拉取并整合他们修改过的提交，事情就会变得一团糟
:::

## 提交工作流钩子

`pre-commit` 钩子在键入提交信息前运行。 它用于检查即将提交的快照，例如，检查是否有所遗漏，确保测试
运行，以及核查代码。 如果该钩子以非零值退出，Git 将放弃此次提交，不过你可以用 `git commit --no
-verify` 来绕过这个环节。 你可以利用该钩子，来检查代码风格是否一致（运行类似 lint 的程序）、尾随空
白字符是否存在（自带的钩子就是这么做的），或新方法的文档是否适当。  

`prepare-commit-msg` 钩子在启动提交信息编辑器之前，默认信息被创建之后运行。 它允许你编辑提交者所
看到的默认信息。 该钩子接收一些选项：存有当前提交信息的文件的路径、提交类型和修补提交的提交的 `SHA1` 校验。 它对一般的提交来说并没有什么用；然而对那些会自动产生默认信息的提交，如提交信息模板、合并提
交、压缩提交和修订提交等非常实用。 你可以结合提交模板来使用它，动态地插入信息。  

`commit-msg` 钩子接收一个参数，此参数即上文提到的，存有当前提交信息的临时文件的路径。 如果该钩子脚
本以非零值退出，Git 将放弃提交，因此，可以用来在提交通过前验证项目状态或提交信息。 在本章的最后一
节，我们将展示如何使用该钩子来核对提交信息是否遵循指定的模板。  

`post-commit` 钩子在整个提交过程完成后运行。 它不接收任何参数，但你可以很容易地通过运行 `git log
-1 HEAD` 来获得最后一次的提交信息。 该钩子一般用于通知之类的事情。
