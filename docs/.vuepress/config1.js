
const { defaultTheme }= require('vuepress')
const container = require('markdown-it-container')

const path = require('path')
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
    }),
    plugins: [
        [
            '@vuepress/plugin-register-components',
            {
                componentsDir: path.resolve(__dirname, './components')
            }
        ]
    ],
    extendsMarkdown: (md) => {
        md.use(container, 'title', {
            validate: function(params) {
                return params.trim().match(/^title\s+(.*)$/);
            },
            render: function (tokens, idx) {
                // 通过 tokens[idx].info.trim() 取出 'click me' 字符串
                var m = tokens[idx].info.trim().match(/^title\s+(.*)$/);

                // 开始标签的 nesting 为 1，结束标签的 nesting 为 -1
                if (tokens[idx].nesting === 1) {
                    // 开始标签
                    return '<h4 style="color: red">' + md.utils.escapeHtml(m[1]);
                } else {
                    // 结束标签
                    return '</h4>';
                }
            }
        })
        md.linkify.set({ fuzzyEmail: false });
    }

}
