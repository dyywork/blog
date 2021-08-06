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
            // SidebarItem
            {
                text: 'JS问题',
                link: '/js/README.md',
            }
        ]
    },
    base: '/blog/'
}
