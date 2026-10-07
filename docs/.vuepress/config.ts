/**
 * 提示：如您想使用JS版本的配置文件可参考：https://github.com/xugaoyi/vuepress-theme-vdoing/tree/a2f03e993dd2f2a3afdc57cf72adfc6f1b6b0c32/docs/.vuepress
 */
import { resolve } from 'path'
import webpack from 'webpack'
import { defineConfig4CustomTheme, UserPlugins } from 'vuepress/config'
import { VdoingThemeConfig } from 'vuepress-theme-vdoing/types'
import dayjs from 'dayjs'
import baiduCode from './config/baiduCode' // 百度统计hm码
import htmlModules from './config/htmlModules' // 自定义插入的html块

const DOMAIN_NAME = 'malize.cn' // 域名 (不带https)
const WEB_SITE = `https://${DOMAIN_NAME}` // 网址

export default defineConfig4CustomTheme<VdoingThemeConfig>({
  theme: 'vdoing', // 使用npm主题包
  configureWebpack: {
    plugins: [
      new webpack.NormalModuleReplacementPlugin(
        /^\.\/ArticleInfo\.vue$/,
        resolve(__dirname, './components/ArticleInfo.vue')
      ),
    ],
  },
  // theme: resolve(__dirname, '../../vdoing'), // 使用本地主题包

  locales: {
    '/': {
      lang: 'zh-CN',
      title: "Malize's blog",
      description: '技术博客，专注后端、架构设计、通用技术学习与总结。Java、设计模式、并发编程、Git、架构设计思想等技术文章。',
    }
  },
  // base: '/', // 默认'/'。如果你想将你的网站部署到如 https://foo.github.io/bar/，那么 base 应该被设置成 "/bar/",（否则页面将失去样式等文件）

  // 主题配置
  themeConfig: {
    // 导航配置
    nav: [
      { text: '首页', link: '/' },
      {
        text: '通用技术',
        link: '/general-technology/',
        items: [
          {
            text: '设计模式',
            items: [
              { text: '设计模式总览', link: '/note/design/' },
              { text: '工作中用到的设计模式', link: '/pages/14abe5/' },
            ],
          },
          {
            text: '并发编程',
            items: [
              { text: '死锁', link: '/general-technology/concurrent-programming/deadlock/' },
            ],
          },
          {
            text: '技术文档',
            items: [
              { text: 'Docker 核心命令大全', link: '/pages/docker-commands/' },
              { text: 'Markdown 使用教程', link: '/pages/ad247c4332211551/' },
              { text: 'npm 常用命令', link: '/pages/61f2f95fd7da14fd/' },
              { text: 'yaml 语言教程', link: '/pages/4e8444e2d534d14f/' },
              { text: 'Nodejs 递归读文件', link: '/pages/117708e0af7f0bd9/' },
            ],
          },
          {
            text: 'DDD 领域驱动（基础）',
            items: [
              { text: 'DDD 是什么', link: '/pages/ddd-why/' },
              { text: '领域、子域与限界上下文', link: '/pages/ddd-domain-context/' },
              { text: '实体、值对象与聚合', link: '/pages/ddd-entity-aggregate/' },
              { text: '领域事件', link: '/pages/ddd-domain-event/' },
              { text: '分层架构与架构模型', link: '/pages/ddd-layered-arch/' },
            ],
          },
          {
            text: 'DDD 领域驱动（实战）',
            items: [
              { text: 'DDD、中台与微服务', link: '/pages/ddd-zhongtai/' },
              { text: '事件风暴与中台建模', link: '/pages/ddd-event-storming/' },
              { text: '微服务代码模型', link: '/pages/ddd-code-model/' },
              { text: '边界、视图与微前端', link: '/pages/ddd-boundary-view/' },
              { text: '设计实例与拆分原则', link: '/pages/ddd-split-principle/' },
              { text: '分布式架构关键设计10问', link: '/pages/ddd-distributed-10/' },
            ],
          },
        ],
      },
      {
        text: 'Elasticsearch',
        link: '/elasticsearch/',
        items: [
          { text: '学习笔记总览', link: '/elasticsearch/' },
          { text: '入门', link: '/elasticsearch/start/' },
          { text: '部署', link: '/elasticsearch/deploy/' },
          { text: '进阶', link: '/elasticsearch/advanced/' },
          { text: '集成', link: '/elasticsearch/integrated/' },
          { text: '优化', link: '/elasticsearch/optimization/' },
          { text: '面试', link: '/elasticsearch/interview/' },
        ],
      },
      {
        text: '大模型',
        link: '/llm/',
        items: [
          {
            text: '构造问答系统',
            items: [
              { text: '项目背景', link: '/llm/qa/background/' },
              { text: '构建答疑机器人', link: '/llm/qa/build-bot/' },
              { text: '扩展知识范围', link: '/llm/qa/expand-knowledge/' },
              { text: '优化提示词', link: '/llm/qa/optimize-prompt/' },
              { text: '自动化评测', link: '/llm/qa/auto-evaluate/' },
              { text: '优化 RAG 应用', link: '/llm/qa/optimize-rag/' },
            ],
          },
          {
            text: '构建 Agent 系统',
            items: [
              { text: 'Agent 基础与工具调用', link: '/llm/agent/basics/' },
              { text: '规划与执行', link: '/llm/agent/plan-execute/' },
              { text: '多 Agent 团队协作', link: '/llm/agent/multi-agent/' },
              { text: 'Memory 积累经验', link: '/llm/agent/memory/' },
              { text: 'Skill 可复用流程', link: '/llm/agent/skill/' },
              { text: 'Qwen Code 实践', link: '/llm/agent/qwen-code/' },
            ],
          },
          {
            text: '交付上线',
            items: [
              { text: '走向生产环境', link: '/llm/deploy/production/' },
              { text: '模型蒸馏', link: '/llm/deploy/distillation/' },
              { text: '部署模型', link: '/llm/deploy/deployment/' },
              { text: '生产实践', link: '/llm/deploy/production-practice/' },
              { text: '安全合规', link: '/llm/deploy/security/' },
            ],
          },
          {
            text: '工具手册',
            items: [
              { text: 'OpenClaw 命令速查', link: '/llm/tools/openclaw/' },
            ],
          },
        ],
      },
      {
        text: '业务积累',
        link: '/dev-tools/',
        items: [
          {
            text: '规范 & 实践',
            items: [
              { text: '代码规范', link: '/pages/code-standards/' },
              { text: 'sharding-jdbc', link: '/pages/8aec48/' },
              { text: 'CIM 半导体行业', link: '/technology/cim/semiconductor-process/' },
              { text: 'HTML 常用 meta', link: '/pages/html/' },
              { text: 'CSS 技巧收藏', link: '/pages/css/' },
            ],
          },
          {
            text: '微服务',
            items: [
              { text: 'feign原理', link: '/pages/feign-principle/' },
            ],
          },
        ],
      },
      {
        text: '工具',
        link: '/dev-tools/',
        items: [
          {
            text: 'Git',
            items: [
              { text: 'Git 笔记总览', link: '/note/git/' },
              { text: 'Git 使用手册', link: '/pages/9a7ee40fc232253e/' },
              { text: 'Git 修改分支名', link: '/pages/922650/' },
              { text: '团队 Git 分支规范', link: '/pages/git-team-standard/' },
            ],
          },
          {
            text: 'GitHub & 博客',
            items: [
              { text: 'GitHub 高级搜索技巧', link: '/pages/4c778760be26d8b3/' },
              { text: 'GitHub Actions 自动部署', link: '/pages/6b9d359ec5aa5019/' },
              { text: '博客搭建 - 百度收录', link: '/pages/41f87d890d0a02af/' },
            ],
          },
        ],
      },
      {
        text: '收藏',
        link: '/favorites/',
        items: [
          { text: '优质网站', link: '/pages/beb6c0bd8a66cea6/' },
          { text: '前端库推荐', link: '/pages/47cf96/' },
        ],
      },
      {
        text: '更多',
        link: '/more/',
        items: [
          {
            text: '成长学习',
            items: [
              { text: '学习方法', link: '/pages/f2a556/' },
              { text: '敏捷开发实战', link: '/pages/aea6571b7a8bae86/' },
              { text: '提示词工程', link: '/pages/831e6f/' },
            ],
          },
          {
            text: '生活',
            items: [
              { text: '实用技巧', link: '/pages/baaa02/' },
              { text: '心情杂货', link: '/pages/2d615df9a36a98ed/' },
              { text: '梦境与灵感', link: '/pages/dream-notes/' },
            ],
          },
          {
            text: '技术问题',
            items: [
              { text: '面试问题备忘', link: '/pages/interview-notes/' },
            ],
          },
          {
            text: '索引',
            items: [
              { text: '分类', link: '/categories/' },
              { text: '标签', link: '/tags/' },
              { text: '按年归档', link: '/archives/' },
            ],
          },
        ],
      },
    ],
    sidebarDepth: 2, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
    logo: '/img/网站logo.png', // 导航栏logo
    repo: 'Merrizee', // 导航栏右侧生成Github链接
    searchMaxSuggestions: 10, // 搜索结果显示最大数
    lastUpdated: '上次更新', // 开启更新时间，并配置前缀文字   string | boolean (取值为git提交时间)
    docsDir: 'docs', // 编辑的文件夹
    // docsBranch: 'master', // 编辑的文件所在分支，默认master。 注意：如果你的分支是main则修改为main
    editLinks: true, // 启用编辑
    editLinkText: '编辑',

    //*** 以下是Vdoing主题相关配置，文档：https://doc.xugaoyi.com/pages/a20ce8/ ***//

    // category: false, // 是否打开分类功能，默认true
    // tag: false, // 是否打开标签功能，默认true
    // archive: false, // 是否打开归档功能，默认true
    // categoryText: '随笔', // 碎片化文章（_posts文件夹的文章）预设生成的分类值，默认'随笔'

    // pageStyle: 'line', // 页面风格，可选值：'card'卡片 | 'line' 线（未设置bodyBgImg时才生效）， 默认'card'。 说明：card时背景显示灰色衬托出卡片样式，line时背景显示纯色，并且部分模块带线条边框

    // bodyBgImg: [
    //   'https://jsd.cdn.zzko.cn/gh/xugaoyi/image_store/blog/20200507175828.jpeg',
    //   'https://jsd.cdn.zzko.cn/gh/xugaoyi/image_store/blog/20200507175845.jpeg',
    //   'https://jsd.cdn.zzko.cn/gh/xugaoyi/image_store/blog/20200507175846.jpeg'
    // ], // body背景大图，默认无。 单张图片 String | 多张图片 Array, 多张图片时隔bodyBgImgInterval切换一张。
    // bodyBgImgOpacity: 0.5, // body背景图透明度，选值 0.1~1.0, 默认0.5
    // bodyBgImgInterval: 15, // body多张背景图时的切换间隔, 默认15，单位s
    // titleBadge: false, // 文章标题前的图标是否显示，默认true
    // titleBadgeIcons: [ // 文章标题前图标的地址，默认主题内置图标
    //   '图标地址1',
    //   '图标地址2'
    // ],
    // contentBgStyle: 1, // 文章内容块的背景风格，默认无. 1 方格 | 2 横线 | 3 竖线 | 4 左斜线 | 5 右斜线 | 6 点状

    // updateBar: { // 最近更新栏
    //   showToArticle: true, // 显示到文章页底部，默认true
    //   moreArticle: '/archives' // “更多文章”跳转的页面，默认'/archives'
    // },
    // rightMenuBar: false, // 是否显示右侧文章大纲栏，默认true (屏宽小于1300px下无论如何都不显示)
    // sidebarOpen: false, // 初始状态是否打开左侧边栏，默认true
    // pageButton: false, // 是否显示快捷翻页按钮，默认true

    // 默认外观模式（用户未在页面手动修改过模式时才生效，否则以用户设置的模式为准），可选：'auto' | 'light' | 'dark' | 'read'，默认'auto'。
    // defaultMode: 'auto',

    // 侧边栏  'structuring' | { mode: 'structuring', collapsable: Boolean} | 'auto' | <自定义>    温馨提示：目录页数据依赖于结构化的侧边栏数据，如果你不设置为'structuring',将无法使用目录页
    sidebar: 'structuring',

    // 文章默认的作者信息，(可在md文件中单独配置此信息) string | {name: string, link?: string}
    author: {
      name: 'malize', // 必需
      link: 'https://github.com/Merrizee', // 可选的
    },

    // 博主信息 (显示在首页侧边栏)
    blogger: {
      avatar: '/img/网站logo.png',
      name: 'Malize',
      slogan: '持续学习，持续成长',
    },

    // 社交图标 (显示于博主信息栏和页脚栏。内置图标：https://doc.xugaoyi.com/pages/a20ce8/#social)
    social: {
      icons: [
        {
          iconClass: 'icon-youjian',
          title: '发邮件',
          link: 'mailto:malize175@gmail.com',
        },
        {
          iconClass: 'icon-github',
          title: 'GitHub',
          link: 'https://github.com/Merrizee',
        },
      ],
    },

    // 页脚信息
    footer: {
      createYear: 2023, // 博客创建年份
      copyrightInfo:
        'Malize | <a href="https://github.com/Merrizee" target="_blank">GitHub</a> | <a href="http://beian.miit.gov.cn/" target="_blank">桂ICP备2024034950号</a> | <a href="https://beian.mps.gov.cn/#/query/webSearch?code=45142202000030" rel="noreferrer" target="_blank">桂公网安备45142202000030</a>',
    },

    // 扩展自动生成frontmatter。（当md文件的frontmatter不存在相应的字段时将自动添加。不会覆盖已有的数据。）
    extendFrontmatter: {
      author: {
        name: 'malize',
        link: 'https://github.com/Merrizee'
      }
    },

    // 自定义hmtl(广告)模块
    htmlModules
  },

  // 注入到页面<head>中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
  head: [
    ['link', { rel: 'icon', href: '/img/网站logo.png' }], //favicons，资源放在public文件夹
    [
      'meta',
      {
        name: 'keywords',
        content: '技术博客,个人博客,Java,设计模式,并发编程,架构设计,Git,敏捷开发,学习方法,提示词工程,CIM,半导体',
      },
    ],
    ['meta', { name: 'baidu-site-verification', content: '7F55weZDDc' }], // 百度统计的站长验证（你可以去掉）
    ['meta', { name: 'theme-color', content: '#11a8cd' }], // 移动浏览器主题颜色
    // [
    //   'script',
    //   {
    //     'data-ad-client': 'ca-pub-7828333725993554',
    //     async: 'async',
    //     src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
    //   },
    // ], // 网站关联Google AdSense 与 html格式广告支持（你可以去掉）
  ],


  // 插件配置
  plugins: <UserPlugins>[
    [
      "sitemap", // 网站地图
      {
        hostname: WEB_SITE,
      },
    ],

    'vuepress-plugin-baidu-autopush', // 百度自动推送

    [
      'vuepress-plugin-baidu-tongji', // 百度统计
      {
        hm: baiduCode,
      },
    ],

    // 全文搜索。 ⚠️注意：此插件会在打开网站时多加载部分js文件用于搜索，导致初次访问网站变慢。如在意初次访问速度的话可以不使用此插件！（推荐：vuepress-plugin-thirdparty-search）
    // 'fulltext-search',

    // 可以添加第三方搜索链接的搜索框（继承原官方搜索框的配置参数）
    [
      'thirdparty-search',
      {
        thirdparty: [
          {
            title: '在MDN中搜索',
            frontUrl: 'https://developer.mozilla.org/zh-CN/search?q=', // 搜索链接的前面部分
            behindUrl: '', // 搜索链接的后面部分，可选，默认 ''
          },
          {
            title: '在Runoob中搜索',
            frontUrl: 'https://www.runoob.com/?s=',
          },
          {
            title: '在Vue API中搜索',
            frontUrl: 'https://cn.vuejs.org/v2/api/#',
          },
          {
            title: '在Bing中搜索',
            frontUrl: 'https://cn.bing.com/search?q=',
          },
          {
            title: '通过百度搜索本站的',
            frontUrl: `https://www.baidu.com/s?wd=site%3A${DOMAIN_NAME}%20`,
          },
        ],
      }
    ],

    [
      'one-click-copy', // 代码块复制按钮
      {
        copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
        copyMessage: '复制成功', // default is 'Copy successfully and then paste it for use.'
        duration: 1000, // prompt message display time.
        showInMobile: false, // whether to display on the mobile side, default: false.
      },
    ],

    [
      'demo-block', // demo演示模块 https://github.com/xiguaxigua/vuepress-plugin-demo-block
      {
        settings: {
          // jsLib: ['http://xxx'], // 在线示例(jsfiddle, codepen)中的js依赖
          // cssLib: ['http://xxx'], // 在线示例中的css依赖
          // vue: 'https://jsd.cdn.zzko.cn/npm/vue/dist/vue.min.js', // 在线示例中的vue依赖
          jsfiddle: false, // 是否显示 jsfiddle 链接
          codepen: true, // 是否显示 codepen 链接
          horizontal: false, // 是否展示为横向样式
        },
      },
    ],
    [
      'vuepress-plugin-zooming', // 放大图片
      {
        selector: '.theme-vdoing-content img:not(.no-zoom)', // 排除class是no-zoom的图片
        options: {
          bgColor: 'rgba(0,0,0,0.6)',
        },
      },
    ],
    [
      'vuepress-plugin-comment', // 评论
      {
        choosen: 'gitalk',
        options: {
          clientID: 'a6e1355287947096b88b',
          clientSecret: 'f0e77d070fabfcd5af95bebb82b2d574d7248d71',
          repo: 'blog-gitalk-comment', // GitHub 仓库
          owner: 'Merrizee', // GitHub仓库所有者
          admin: ['Merrizee'], // 对仓库有写权限的人
          // distractionFreeMode: true,
          pagerDirection: 'last', // 'first'正序 | 'last'倒序
          id: '<%- (frontmatter.permalink || frontmatter.to.path).slice(-16) %>', //  页面的唯一标识,长度不能超过50
          title: '「评论」<%- frontmatter.title %>', // GitHub issue 的标题
          labels: ['Gitalk', 'Comment'], // GitHub issue 的标签
          body:
            '页面：<%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>', // GitHub issue 的内容
        },
      },
    ],
    [
      '@vuepress/last-updated', // "上次更新"时间格式
      {
        transformer: (timestamp, lang) => {
          return dayjs(timestamp).format('YYYY/MM/DD, HH:mm:ss')
        },
      },
    ],
    'vuepress-plugin-mermaidjs', // mermaid 流程图支持

    [resolve(__dirname, './plugins/drawio-converter'), {}], // draw.io 文件构建时转换为 SVG
  ],

  markdown: {
    lineNumbers: true,
    extractHeaders: ['h2', 'h3', 'h4', 'h5', 'h6'], // 提取标题到侧边栏的级别，默认['h2', 'h3']
  },

  // 监听文件变化并重新构建
  extraWatchFiles: [
    '.vuepress/config.ts',
    '.vuepress/config/htmlModules.ts',
  ]
})
