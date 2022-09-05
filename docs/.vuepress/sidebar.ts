import {sidebar} from 'vuepress-theme-hope'

export default sidebar([
    "/",
    {
        text: "react",
        icon: "note",
        prefix: "/document/react/",
        collapsable: true,
        children: ["interview", "hook",  "higherComponent"],
    },
    {
        text: "vue",
        icon: "note",
        prefix: "/document/vue2/",
        collapsable: true,
        children: ["vue", "COMPONENTS"],
    },
    {
        text: "js问题",
        icon: "note",
        prefix: "/document/js/",
        collapsable: true,
        children: ["THIS", "Object",'README.md'],
    },
    {
        text: "css",
        icon: "note",
        prefix: "/document/css/",
        collapsable: true,
        children: ["layout", "styleIssues"],
    },
    {
        text: "git",
        icon: "note",
        prefix: "/document/git/",
        collapsable: true,
        children: ["COMMIT"],
    },
    {
        text: "http",
        icon: "note",
        prefix: "/document/http/",
        collapsable: true,
        children: ["http"],
    }
])