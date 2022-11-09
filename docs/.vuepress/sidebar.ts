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
            text: "react",
            icon: "security",
            prefix: "/document/react/",
            collapsable: true,
            children: ["interview", "hook",  "higherComponent"],
        },
        {
            text: "vue",
            icon: "security",
            prefix: "/document/vue2/",
            collapsable: true,
            children: ["vue", "COMPONENTS"],
        },
        {
            text: "js问题",
            icon: "text",
            prefix: "/document/js/",
            collapsable: true,
            children: ["THIS", "Object",'README.md'],
        },
        {
            text: "css",
            icon: "run-in",
            prefix: "/document/css/",
            collapsable: true,
            children: ["layout", "cssShow", "styleIssues"],
        },
        {
            text: "正则表达式",
            icon: "run-in",
            prefix: "/document/regExp/",
            collapsable: true,
            children: ["regExp"],
        },
        {
            text: "git",
            icon: "navigation",
            prefix: "/document/git/",
            collapsable: true,
            children: ["COMMIT"],
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
    ]
})
