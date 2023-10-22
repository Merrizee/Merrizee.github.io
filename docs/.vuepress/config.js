module.exports = {
    title: 'malize的笔记',
    description: 'YYY',
    themeConfig: {
        nav: [
            { text: "首页", link: "/" },
            {
                text: "malize的笔记",
                items: [
                    { text: "掘金", link: "www.malize" },
                    { text: "Github", link: "https://github.com/xxxx" }
                ]
            }
        ],
        sidebar: [
            {
                title: "欢迎学习",
                path: "/",
                collapsable: false,  // 是否折叠
                children: [{ title: "博客简介", path: "/" }],
            },
            {
                title: "基础篇",
                path: "/blogs/1",
                collapsable: true,
                children: [
                    { title: "第一篇", path: "/blogs/本地同时配置github和gitee" },
                    { title: "第二篇", path: "/blogs/2" },
                ]
            }
        ]
    }
}
