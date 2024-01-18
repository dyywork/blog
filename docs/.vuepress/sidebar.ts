import {sidebar} from 'vuepress-theme-hope'

export default sidebar({
    '/tool/': [
        '/',
        {
            text: "工具",
            icon: "tools-hardware",
            prefix: "/tool/",
            collapsable: true,
            children: ["nvm", "verdaccio", "vpn", 'jenkins', 'pm2'],
        },
    ],
    '/document/': [
        '/',
        {
            text: "正则表达式",
            icon: "run-in",
            prefix: "/document/regExp/",
            collapsable: true,
            children: ["regExp"],
        },{
            text: "canvas",
            icon: "canvas",
            prefix: "/document/canvas/",
            collapsable: true,
            children: ["canvasDraw"],
        },
        {
            text: "git",
            icon: "navigation",
            prefix: "/document/git/",
            collapsable: true,
            children: ["COMMIT","branch"],
        },
        {
            text: "http",
            icon: "link",
            prefix: "/document/http/",
            collapsable: true,
            children: ["http"],
        },
        {
            text: "性能优化",
            icon: "adjust",
            prefix: "/document/performance/",
            collapsable: true,
            children: ["performance"],
        },
    ],
    '/document/css/': [
        '/',
        {
            text: "CSS小记",
            icon: "smile",
            prefix: "/document/css/",
            collapsable: true,
            children: ["layout", "cssShow", "styleIssues"],
        },
    ],
    '/document/vue2/': [
        '/',
        {
            text: "vue小记",
            icon: "security",
            prefix: "/document/vue2/",
            collapsable: true,
            children: ["vue", "COMPONENTS", "vue面试题"],
        },
    ],
    '/document/react/': [
        '/',
        {
            text: "react小记",
            icon: "React",
            prefix: "/document/react/",
            collapsable: true,
            children: ["interview", "hook",  "higherComponent"],
        },
    ],
    '/document/js/': [
        '/',
        {
            text: "js问题",
            icon: "text",
            prefix: "/document/js/",
            collapsable: true,
            children: ["THIS", "Object",'README.md','designModel.md', 'jsShow.md',"eventLoop.md"],
        },
    ]
})
