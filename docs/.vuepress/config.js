const { backToTopPlugin } = require('@vuepress/plugin-back-to-top')
const { defaultTheme } = require('vuepress')
const { path } = require('@vuepress/utils')
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')

module.exports = {
    plugins: [
        backToTopPlugin(),
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, '../components'),
        })
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
                text: 'js问题',
                children: [
                    {
                        text: '垃圾回收',
                        link: '/js/README.md',
                    },
                    {
                        text: '创建对象',
                        link: '/js/Object.md',
                    },
                ]
            },
        ],
        sidebar: {
            '/document/': [
                {
                    text: 'JS问题',
                    children: ['/document/js/README.md', '/document/js/Object.md'],
                },
                {
                    text: 'vue2',
                    children: ['/document/vue2/vue.md', "/document/vue2/COMPONENTS.md"],
                }
            ],
        }
    },),
    base: '/blog/'
}
