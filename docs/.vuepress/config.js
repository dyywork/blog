module.exports = {
    lang: 'zh-CN',
    title: '莫名点',
    description: '这是我的第一个 VuePress 站点',

    themeConfig: {
        logo: 'https://vuejs.org/images/logo.png',
        navbar: [
            {text: '主页', link: '/'},
            {text: 'js', link: '/js/'},
        ],
        sidebar: [
            // SidebarItem
            {
                text: 'Foo',
                link: '/js/README.md',
            },
        ],
    },
    base: '/blog/'
}
