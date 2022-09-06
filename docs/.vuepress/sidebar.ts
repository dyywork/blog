import {sidebar} from 'vuepress-theme-hope'

export default sidebar([
    "/",
    {
        text: "react",
        icon: "smile",
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
        children: ["layout", "styleIssues"],
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
    }
])