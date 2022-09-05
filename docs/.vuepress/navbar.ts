import {navbar} from 'vuepress-theme-hope'

export default navbar([
    '/',
    {
        text: "博文",
        icon: "edit",
        prefix: "/document/",
        children: [
            {
                text: "react",
                icon: "edit",
                prefix: "react/",
                children: [
                    {text: "react 生命周期", icon: "edit", link: "interview"},
                    {text: "Hooks", icon: "edit", link: "hook"},
                    {text: "高阶组件", icon: "edit", link: "higherComponent"},
                ],
            },
            {
                text: "vue",
                icon: "edit",
                prefix: "vue/",
                children: [
                    {text: "vue 问题集合", icon: "edit", link: "vue"},
                    {text: "组件库搭建", icon: "edit", link: "COMPONENTS"},
                ],
            },
            {
                text: "js问题",
                icon: "edit",
                prefix: "js/",
                children: [
                    {text: "this", icon: "edit", link: "THIS"},
                    {text: "面向对象", icon: "edit", link: "Object"},
                    {text: "垃圾回收", icon: "edit", link: "README.md"},
                ],
            },
            {
                text: "css",
                icon: "edit",
                prefix: "css/",
                children: [
                    {text: "布局", icon: "edit", link: "layout"},
                    {text: "样式问题", icon: "edit", link: "styleIssues"},
                ],
            },
            {
                text: "git",
                icon: "edit",
                prefix: "git/",
                children: [
                    {text: "规范git commit 格式", icon: "edit", link: "COMMIT"},
                ],
            },
            {
                text: "http",
                icon: "edit",
                prefix: "git/",
                children: [
                    {text: "http", icon: "edit", link: "http"},
                ],
            },
        ]
    }
])