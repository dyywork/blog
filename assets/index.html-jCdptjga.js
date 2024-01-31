import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as c,o,c as h,b as a,d as e,e as r,a as t}from"./app-5kCQI8Dk.js";const l={},d=t('<h1 id="javascript-杂项" tabindex="-1"><a class="header-anchor" href="#javascript-杂项" aria-hidden="true">#</a> JavaScript 杂项</h1><h2 id="let-const" tabindex="-1"><a class="header-anchor" href="#let-const" aria-hidden="true">#</a> let,const</h2><ul><li>let 声明的变量只在let命令所在的代码块内有效</li><li>const 声明一个只读的常量，一旦声明，常量的值不能改变</li></ul><div class="hint-container info"><p class="hint-container-title">var, let</p><ul><li>使用var关键字声明的全局作用域变量属于 window对象；</li><li>使用let关键字声明的全局作用域变量不属于window 对象；</li><li>var 关键字定义的变量可以使用后声明，也就是变量可以先使用在声明（变量提升）</li><li>let 关键字定义的变量不可以在使用后声明，也就是变量需要先声明再使用</li><li>const 用于声明一个或多个常量，声明时必须进行初始化，切初始化后值不可在修改；</li></ul></div><h2 id="javascript-精确度问题" tabindex="-1"><a class="header-anchor" href="#javascript-精确度问题" aria-hidden="true">#</a> JavaScript 精确度问题</h2>',5),s=a("li",null,"JavaScript中数字是使用64位双精度浮点型来表示的， 精度问题都是由于浮点数无法精确表示引起的",-1),_={href:"https://github.com/MikeMcl/bignumber.js",target:"_blank",rel:"noopener noreferrer"},p={href:"https://github.com/MikeMcl/decimal.js",target:"_blank",rel:"noopener noreferrer"},u={href:"https://github.com/MikeMcl/big.js",target:"_blank",rel:"noopener noreferrer"},f=a("h2",{id:"变量提升",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#变量提升","aria-hidden":"true"},"#"),e(" 变量提升")],-1),b=a("code",null,"预编译",-1),v={href:"https://www.runoob.com/js/js-hoisting.html",target:"_blank",rel:"noopener noreferrer"},m=t('<div class="hint-container info"><p class="hint-container-title">变量提升</p><ul><li>javaScript中，函数及变量的声明都会被提升到函数的最顶部；</li><li>javaScript中，变量可以在使用后声明，也就是变量可以先使用在声明；</li><li>JavaScript 初始化不会提升，只有声明的变量会提升；</li><li>JavaScript中，函数声明比变量提升先，就是说，先函数提升，在变量提升。</li><li>JavaScript中，变量的搜索顺序：找变量时，先找局部变量，如果没有局部变量；再找全局变量；</li></ul></div><h2 id="防抖" tabindex="-1"><a class="header-anchor" href="#防抖" aria-hidden="true">#</a> 防抖</h2><h2 id="节流" tabindex="-1"><a class="header-anchor" href="#节流" aria-hidden="true">#</a> 节流</h2><h2 id="垃圾回收" tabindex="-1"><a class="header-anchor" href="#垃圾回收" aria-hidden="true">#</a> 垃圾回收</h2><h3 id="_1-标记清除" tabindex="-1"><a class="header-anchor" href="#_1-标记清除" aria-hidden="true">#</a> 1.标记清除</h3><p><code>“标记清除”</code> 是目前主流的垃圾收集算法，这种算法的思想就是给当前不使用的值加上标记，然后再回收其内存</p><h3 id="_2-引用计数" tabindex="-1"><a class="header-anchor" href="#_2-引用计数" aria-hidden="true">#</a> 2.引用计数</h3><p><code>“引用计数”</code>跟踪记录所有值被引用的次数 （注： <code>JavaScript</code>引擎目前都不在使用这种算法，当代码中存在循环引用现象时，<code>‘引用计数’</code>算法会导致问题）</p><h3 id="_3-优化" tabindex="-1"><a class="header-anchor" href="#_3-优化" aria-hidden="true">#</a> 3.优化</h3><p>解除变量的引用不仅有助于消除循环引用现象，而且对垃圾收集也有好处。为了确保有效地回收内存，应该 及时解除不再使用的全局对象，全局对象属性以及循环引用变量的引用。</p><h3 id="_4-小计" tabindex="-1"><a class="header-anchor" href="#_4-小计" aria-hidden="true">#</a> 4.小计</h3><p>函数内的变量在函数执行完之后，变量所占内存就会释放</p>',12);function x(j,g){const i=c("ExternalLinkIcon");return o(),h("div",null,[d,a("ul",null,[s,a("li",null,[e("目前比较成熟的库，比如 "),a("a",_,[e("bignumber.js"),r(i)]),e("，"),a("a",p,[e("decimal.js"),r(i)]),e("，以及"),a("a",u,[e("big.js"),r(i)]),e("等")])]),f,a("p",null,[e("JavaScript在执行之前会有一个 "),b,e(" 过程，变量提升和函数提升就在这时候发生。"),a("a",v,[e("具体介绍"),r(i)])]),m])}const J=n(l,[["render",x],["__file","index.html.vue"]]);export{J as default};