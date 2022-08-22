const { defaultTheme } = require('vuepress')
// const { path } = require('@vuepress/utils')
// const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')

module.exports = {
    plugins: [
        // registerComponentsPlugin({
        //     componentsDir: path.resolve(__dirname, '../components'),
        // })
    ],
    lang: 'zh-CN',
    title: '莫名点',
    description: '问题汇总',
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
                        text: '组件库搭建',
                        link: '/document/react/interview.md',
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
                    children: ['/document/js/README.md', '/document/js/Object.md', '/document/js/THIS.md'],
                },
                {
                    text: 'vue2',
                    children: ['/document/vue2/vue.md', "/document/vue2/COMPONENTS.md"],
                },
                {
                    text: 'react',
                    children: ['/document/react/interview.md'],
                },
                {
                    text: 'git',
                    children: ['/document/git/COMMIT.md'],
                }
            ],
        }
    },),
    base: '/blog/'
}
