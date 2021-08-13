module.exports = {
    lang: 'zh-CN',
    title: '莫名点',
    description: '问题汇总',

    themeConfig: {
        home: '/',
        navbar: [
            {text: '主页', link: '/'},
            {text: 'js', link: '/js/'},
        ],
        sidebar: [
            {
                text: 'JS问题',
                children: [
                    {
                        text: '垃圾回收',
                        link: '/js/README.md',
                    },
                    {
                        text: '创建对象',
                        link: '/js/OBJECTREADME.md',
                    },
                ]
            }
        ]
    },
    base: '/blog/'
}
