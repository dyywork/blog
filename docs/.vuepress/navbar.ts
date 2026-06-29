import {navbar} from 'vuepress-theme-hope'

export default navbar([
    '/',
    {
        text: "工具",
        icon: "tools-hardware",
        prefix: "/tool/",
        children: [
            {text: "nvm", icon: "smile", link: "nvm"},
            {text: "volta", icon: "smile", link: "volta"},
            {text: "verdaccio", icon: "caps-lock", link: "verdaccio"},
            {text: "vpn", icon: "navigation", link: "vpn"},
            {text: "jenkins", icon: "layers", link: "jenkins"},
            {text: "pm2", icon: "data-view", link: "pm2"},
        ]
    },
    {
        text: "博文",
        icon: "layout-filling",
        prefix: "/document/",
        children: [
            {
                text: "工具",
                prefix: "tool/",
                children: [
                    {text: "Multirepo 与 Monorepo", icon: "tools-hardware", link: "Multirepo-与-Monorepo-简述"},
                    {text: "Claude Code Skill: blog-note", icon: "tools-hardware", link: "blog-note-skill"},
                ],
            },
            {
                text: "CANVAS",
                prefix: "canvas/",
                children: [
                    {text: "canvas", icon: "canvas", link: "canvasDraw"},
                ],
            },
            {
                text: "正则表达式",
                prefix: "regExp/",
                children: [
                    {text: "正则表达式", icon: "zhengzeshi", link: "regExp"},
                ],
            },
            {
                text: "git",
                prefix: "git/",
                children: [
                    {text: "Git 命令",icon: "git", link: "COMMIT"},
                    {text: "Branch 分支", icon: "git", link: "branch"},
                ],
            },
            {
                text: "http",
                prefix: "http/",
                children: [
                    {text: "http",icon: "sharethis", link: "http"},
                ],
            },
            {
                text: "性能优化",
                prefix: "performance/",
                children: [
                    {text: "性能优化",icon: "adjust", link: "performance"},
                ],
            },
        ]
    },
    {
        text: "js小记",
        icon: "js",
        prefix: "/document/js/",
        children: [
            {text: "this", icon: "text", link: "THIS"},
            {text: "面向对象", icon: "duixiangmoxing", link: "Object"},
            {text: "JavaScript 杂项", icon: "sharethis", link: "README.md"},
            {text: "设计模式", icon: "layers", link: "designModel"},
            {text: "js 原生小效果", icon: "huodongzhanshi", link: "jsShow"},
            {text: "事件循环", icon: "data-view", link: "eventLoop"},
        ],
    },
    {
        text: "vue小记",
        icon: "Vue",
        prefix: "/document/vue2/",
        children: [
            {text: "vue 问题集合", icon: "security", link: "vue"},
            {text: "组件库搭建", icon: "zujian",  link: "COMPONENTS"},
            {text: "vue 面试题", icon: "image-text",  link: "vue面试题"},
        ],
    },
    {
        text: "react小记",
        prefix: "/document/react/",
        icon: "React",
        children: [
            {text: "如何学习 React", icon: "bujufangshi", link: "howToLearn"},
            {text: "React vs Vue", icon: "bujufangshi", link: "diff"},
            {text: "react 生命周期", icon: "shangpinshengmingzhouqi", link: "interview"},
            {text: "Hooks", icon: "hook", link: "hook"},
            {text: "高阶组件", icon: "zujian",  link: "higherComponent"},
        ],
    },
    {
        text: "CSS小记",
        icon: 'CSS-copy',
        prefix: "/document/css/",
        children: [
            {text: "布局", icon: "bujufangshi", link: "layout"},
            {text: "CSS 效果", icon: "huodongzhanshi",  link: "cssShow"},
            {text: "样式问题", icon: 'bug',  link: "styleIssues"},
            {text: "flex布局", icon: 'bug',  link: "flex"},
        ]
    },
    {
        text: "小程序",
        icon: 'CSS-copy',
        prefix: "/weixin/",
        children: [
            {text: "小程序", icon: "bujufangshi", link: "xiaochengxu"},
        ]
    },
    {
        text: "Java小记",
        icon: 'Java',
        prefix: "/document/java/",
        children: [
            {text: "学习路线总览", icon: "bujufangshi", link: "index"},
            {text: "基础语法（对比JS）", icon: "text", link: "hello-java"},
            {text: "面向对象（对比JS）", icon: "duixiangmoxing", link: "oop"},
            {text: "集合框架", icon: "data-view", link: "collection"},
            {text: "Lambda & Stream", icon: "layers", link: "lambda-stream"},
            {text: "异常处理 & I/O", icon: "bug", link: "exception-io"},
            {text: "Maven（对比npm）", icon: "tools-hardware", link: "maven"},
            {text: "Spring Boot（对比Express）", icon: "React", link: "spring-boot"},
        ]
    },
    {
        text: "软考小记",
        icon: 'CSS-copy',
        prefix: "/document/softExamination/",
        children: [
            {text: "思维导图", icon: "bujufangshi", link: "soft"},
        ]
    },
])
