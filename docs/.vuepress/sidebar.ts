import {sidebar} from 'vuepress-theme-hope'

export default sidebar({
    '/tool/': [
        '/',
        {
            text: "工具",
            icon: "tools-hardware",
            prefix: "/tool/",
            collapsible: true,
            children: ["nvm", "volta", "verdaccio", "vpn", 'jenkins', 'pm2'],
        },
    ],
    '/document/': [
        '/',
        {
            text: "工具笔记",
            icon: "tools-hardware",
            prefix: "/document/tool/",
            collapsible: true,
            children: ["Multirepo-与-Monorepo-简述", "blog-note-skill"],
        },{
            text: "正则表达式",
            icon: "run-in",
            prefix: "/document/regExp/",
            collapsible: true,
            children: ["regExp"],
        },{
            text: "canvas",
            icon: "canvas",
            prefix: "/document/canvas/",
            collapsible: true,
            children: ["canvasDraw", "prepaid-card-poster"],
        },
        {
            text: "git",
            icon: "navigation",
            prefix: "/document/git/",
            collapsible: true,
            children: ["COMMIT","branch"],
        },
        {
            text: "http",
            icon: "link",
            prefix: "/document/http/",
            collapsible: true,
            children: ["http"],
        },
        {
            text: "性能优化",
            icon: "adjust",
            prefix: "/document/performance/",
            collapsible: true,
            children: ["performance"],
        },
    ],
    '/document/css/': [
        '/',
        {
            text: "CSS小记",
            icon: "smile",
            prefix: "/document/css/",
            collapsible: true,
            children: ["layout", "cssShow", "styleIssues", "flex"],
        },
    ],
    '/document/vue2/': [
        '/',
        {
            text: "vue小记",
            icon: "security",
            prefix: "/document/vue2/",
            collapsible: true,
            children: ["vue", "COMPONENTS", "vue面试题"],
        },
    ],
    '/document/react/': [
        '/',
        {
            text: "react小记",
            icon: "React",
            prefix: "/document/react/",
            collapsible: true,
            children: ["howToLearn", "diff", "interview", "hook",  "higherComponent"],
        },
    ],
    '/document/js/': [
        '/',
        {
            text: "js问题",
            icon: "text",
            prefix: "/document/js/",
            collapsible: true,
            children: ["THIS", "Object",'README.md','designModel.md', 'jsShow.md',"eventLoop.md"],
        },
    ],
    '/document/java/': [
        '/',
        {
            text: "Java学习笔记",
            icon: "Java",
            prefix: "/document/java/",
            collapsible: true,
            children: ["index", "hello-java", "oop", "collection", "lambda-stream", "exception-io", "maven", "spring-boot"],
        },
    ],
    '/document/softExamination/': [
        '/',
        {
            text: "软考小记",
            icon: "security",
            prefix: "/document/softExamination/",
            collapsible: true,
            children: ['soft.md']
        }
    ]
})
