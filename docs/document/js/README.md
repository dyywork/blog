
# 垃圾回收

## 1.标记清除
“标记清除” 是目前主流的垃圾收集算法，这种算法的思想就是给当前不使用的值加上标记，然后再回收其内存
## 2.引用计数
“引用计数”跟踪记录所有值被引用的次数
（注： JavaScript引擎目前都不在使用这种算法，当代码中存在循环引用现象时，‘引用计数’算法会导致问题）

## 3.优化
解除变量的引用不仅有助于消除循环引用现象，而且对垃圾收集也有好处。为了确保有效地回收内存，应该
及时解除不再使用的全局对象，全局对象属性以及循环引用变量的引用。

## 4.小计
函数内的变量在函数执行完之后，变量所占内存就会释放
