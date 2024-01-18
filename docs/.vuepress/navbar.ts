import {navbar} from 'vuepress-theme-hope'

export default navbar([
    '/',
    {
        text: "工具",
        icon: "tools-hardware",
        prefix: "/tool/",
        children: [
            {text: "nvm", icon: "smile", link: "nvm"},
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
            {text: "this",icon: "text",link: "THIS"},
            {text: "面向对象",icon:"duixiangmoxing",  link: "Object"},
            {text: "Javascript 杂项", icon:"sharethis",  link: "README.md"},
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

])
