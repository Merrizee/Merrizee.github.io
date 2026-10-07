<script>
import ArticleInfo from 'vuepress-theme-vdoing/components/ArticleInfo.vue'

export default {
  extends: ArticleInfo,
  methods: {
    getPageInfo() {
      ArticleInfo.methods.getPageInfo.call(this)
      if (this.$frontmatter.author === false) this.author = null
    }
  }
}
</script>
