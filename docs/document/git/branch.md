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
<<<<<<< HEAD:index.html
<div id="footer">contact : email.support@github.com</div>
=======
<div id="footer">
 please contact us at support@github.com
</div>
>>>>>>> iss53:index.html
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
