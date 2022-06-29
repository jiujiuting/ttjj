<template>
  <div>
    <van-cell-group>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="到底了呢~更多请登录 www.4399.com"
          @load="onLoad"
        >
          <van-cell
            v-for="(item, index) in articleList"
            :key="index"
            :title="item.title"
            value="内容"
            :label="item.aut_name"
          />
        </van-list>
      </van-pull-refresh>
    </van-cell-group>
  </div>
</template>

<script>
import { getArticleList } from '@/api/home'
export default {
  name: 'ArticleList',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getArticleList()
  },
  data () {
    return {
      // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
      timestamp: Date.now(), // 时间戳
      articleList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getArticleList () {
      if (this.refreshing) { // 下拉刷新
        this.articleList = [] // 重置列表
        this.refreshing = false // 刷新后停止
      }
      try {
        const res = await getArticleList({ channel_id: this.id, timestamp: this.timestamp }) // 向请求传入数据
        // console.log(res)
        this.timestamp = res.data.data.pre_timestamp // 获取以前的时间戳
        // 若数据已全部加载完毕，则直接将 finished 设置成 true
        // pre_timestamp 为 null 则证明数据已全部加载完毕
        if (this.timestamp === null) {
          this.finished = true
        }
        this.articleList.push(...res.data.data.results) // 数据放在列表下方避免直接覆盖
        // ，数据更新完毕后，将 loading 设置成 false
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      // console.log('上拉加载')
      this.getArticleList() // 重新获取列表
    },
    onRefresh () {
      // console.log('下拉刷新')
      this.finished = false // 防止列表数据全部加载完毕
      this.loading = true // 处于加载状态
      this.timestamp = Date.now() // 条件重置
      this.getArticleList() // 重新获取列表
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-cell-group {
  margin-top: 174px;
}
</style>
