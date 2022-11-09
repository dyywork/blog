import {navbar} from 'vuepress-theme-hope'

export default navbar([
    '/',
    {
        text: "工具",
        icon: "work-filling",
        prefix: "/tool/",
        children: [
            {text: "nvm", icon: "smile", link: "nvm"},
        ]
    },
    {
        text: "博文",
        icon: "layout-filling",
        prefix: "/document/",
        children: [
            {
                text: "react",
                prefix: "react/",
                children: [
                    {text: "react 生命周期", icon: "smile", link: "interview"},
                    {text: "Hooks", link: "hook"},
                    {text: "高阶组件",  link: "higherComponent"},
                ],
            },
            {
                text: "vue",
                prefix: "vue2/",
                children: [
                    {text: "vue 问题集合", icon: "security", link: "vue"},
                    {text: "组件库搭建",  link: "COMPONENTS"},
                ],
            },
            {
                text: "js问题",
                prefix: "js/",
                children: [
                    {text: "this",icon: "text",link: "THIS"},
                    {text: "面向对象",  link: "Object"},
                    {text: "Javascript 杂项",  link: "README.md"},
                ],
            },
            {
                text: "css",
                prefix: "css/",
                children: [
                    {text: "布局", icon: "run-in", link: "layout"},
                    {text: "样式问题",  link: "styleIssues"},
                ],
            },
            {
                text: "正则表达式",
                prefix: "regExp/",
                children: [
                    {text: "正则表达式", icon: "run-in", link: "regExp"},
                ],
            },
            {
                text: "git",
                prefix: "git/",
                children: [
                    {text: "Git 命令",icon: "navigation", link: "COMMIT"},
                ],
            },
            {
                text: "http",
                prefix: "http/",
                children: [
                    {text: "http",icon: "link", link: "http"},
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
    }
])