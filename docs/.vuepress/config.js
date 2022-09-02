const { defaultTheme }= require('vuepress')
const container = require('markdown-it-container')
module.exports = {
    lang: 'zh-CN',
    title: '莫名点',
    description: '问题汇总',
    base: '/blog/',
    theme: defaultTheme({
        home: '/',
        navbar: [
            {
                text: '主页',
                link: '/'
            },
            {
                text: 'js备忘录',
                children: [
                    {
                        text: '面向对象',
                        link: '/document/js/Object.md',
                    },
                ]
            },
            {
                text: 'vue备忘录',
                children: [
                    {
                        text: '组件库搭建',
                        link: '/document/vue2/COMPONENTS.md',
                    },
                ]
            },
            {
                text: 'react备忘录',
                children: [
                    {
                        text: 'react生命周期',
                        link: '/document/react/interview.md',
                    },{
                        text: 'hooks',
                        link: '/document/react/hook.md',
                    },
                ]
            },
            {
                text: 'css备忘录',
                children: [
                    {
                        text: 'css',
                        link: '/document/css/styleIssues.md',
                    },
                ]
            },
            {
                text: 'git备忘录',
                children: [
                    {
                        text: 'git操作',
                        link: '/document/git/COMMIT.md',
                    },
                ]
            },
        ],
        sidebar: {
            '/document/': [
                {
                    text: 'JS问题',
                    children: ['/document/js/Object.md', '/document/js/THIS.md','/document/js/README.md', ],
                },
                {
                    text: 'vue2',
                    children: ['/document/vue2/vue.md', "/document/vue2/COMPONENTS.md"],
                },
                {
                    text: 'react',
                    children: ['/document/react/interview.md', '/document/react/hook.md', '/document/react/higherComponent.md'],
                },
                {
                    text: 'css',
                    children: ['/document/css/layout.md','/document/css/styleIssues.md'],
                },
                {
                    text: 'git',
                    children: ['/document/git/COMMIT.md'],
                },
                {
                    text: '网络协议',
                    children: ['/document/http/http.md'],
                }
            ],
        }
    },),
    extendsMarkdown: (md) => {
        md.use(container, 'dome', {
            validate: function(params) {
                return params.trim().match(/^dome\s+(.*)$/);
            },
            render: function (tokens, idx) {
                console.log(tokens);
                // 通过 tokens[idx].info.trim() 取出 'click me' 字符串
                var m = tokens[idx].info.trim().match(/^dome\s+(.*)$/);

                // 开始标签的 nesting 为 1，结束标签的 nesting 为 -1
                if (tokens[idx].nesting === 1) {
                    // 开始标签
                    return '<details><summary>' + md.utils.escapeHtml(m[1]) + '</summary>\n';
                } else {
                    // 结束标签
                    return '</details>\n';
                }
            }
        })
        md.linkify.set({ fuzzyEmail: false });
    }

}
