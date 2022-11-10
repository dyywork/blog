import {sidebar} from 'vuepress-theme-hope'

export default sidebar({
    '/tool/': [
        '/',
        {
            text: "nvm",
            icon: "smile",
            prefix: "/tool/",
            collapsable: true,
            children: ["nvm"],
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
        }
    ],
    '/document/css/': [
        '/',
        {
            text: "CSS",
            icon: "smile",
            prefix: "/document/css/",
            collapsable: true,
            children: ["layout", "cssShow", "styleIssues"],
        },
    ],
    '/document/vue2/': [
        '/',
        {
            text: "vue",
            icon: "security",
            prefix: "/document/vue2/",
            collapsable: true,
            children: ["vue", "COMPONENTS"],
        },
    ],
    '/document/react/': [
        '/',
        {
            text: "react",
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
            children: ["THIS", "Object",'README.md'],
        },
    ]
})
