// import vue from 'vue/dist/vue.esm.browser'
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  // 主题增强在此文件之后执行；应用创建时再清除自动回填的作者。
  options.mixins = options.mixins || []
  options.mixins.push({
    beforeCreate() {
      siteData.pages.forEach(page => {
        if (page.frontmatter.author === false) page.author = null
      })
    }
  })
  // window.Vue = vue // 使页面中可以使用Vue构造函数 （使页面中的vue demo生效）
}
