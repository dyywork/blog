import { defineUserConfig } from 'vuepress'

import { hopeTheme} from "vuepress-theme-hope";
import sidebar from './sidebar'
import navbar from './navbar'

export default defineUserConfig({
    lang: 'zh-CN',
    title: '莫名点',
    description: '问题汇总',
    base: '/blog/',
    port: 8888,
    theme: hopeTheme({
        hostname: 'https://dyywork.github.io',
        iconAssets: "//at.alicdn.com/t/c/font_3631218_w2at0p33tq.css",
        fullscreen: true,
        repo: "https://github.com/dyywork/blog",
        repoLabel: "GitHub",
        // 是否在导航栏内显示仓库链接，默认为 `true`
        repoDisplay: true,
        docsDir: "blog",
        logo: "/logo.png",
        favicon: '/favicon.ico',
        footer: "一个个人问题集锦收录！！！",
        author: 'Mr.Ding',
        lastUpdated: true,
        editLink: false,
        displayFooter: true,
        sidebar: sidebar,
        navbar: navbar,
        pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime","Word","PageView"],
        encrypt: {
            config: {
                '/document/softExamination/soft.html': 'ding123456'
            }
        },
        plugins: {
            searchPro:true,
            blog: {
                excerptLength: 300,
            },
            
            // 如果你不需要评论，可以直接删除 comment 配置，
            // 以下配置仅供体验，如果你需要评论，请自行配置并使用自己的环境，详见文档。
            // 为了避免打扰主题开发者以及消耗他的资源，请不要在你的正式环境中直接使用下列配置!!!!!
            comment: {
                /**
                 * Using Giscus
                 */
                provider: "Giscus",
                repo: "dyywork/blog",
                repoId: "MDEwOlJlcG9zaXRvcnkzOTQxNzc3NTM=",
                category: "Announcements",
                categoryId: "DIC_kwDOF36s2c4CRO9a",

                /**
                 * Using Twikoo
                 */
                // provider: "Twikoo",
                // envId: "https://twikoo.ccknbc.vercel.app",

                /**
                     * Using Waline
                 */
                // provider: "Waline",
                // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
            },
            mdEnhance: {
                mermaid: true,
                demo: true,
                mark: true,
                flowchart: true,
                tasklist: true,
                tabs: true,
                codetabs: true,
                // 启用图片标记
                imgMark: true,
                // 启用图片大小
                imgSize: true,
            },
        
        },
    }),
})
