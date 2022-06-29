<template>
  <div>
    <!-- 我的频道 -->
    <div class="channel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          plain
          type="danger"
          round
          size="mini"
          @click="isCloseShow = !isCloseShow"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in channels" :key="item.id">
          <div
            class="inner"
            @click="onClick(index)"
            :style="{ color: active === index ? 'red' : '' }"
          >
            {{ item.name }}
            <van-icon name="close" v-show="isCloseShow" v-if="index !== 0" />
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- 推荐频道 -->
    <div class="channel-container">
      <div class="title">
        <h3>频道推荐</h3>
      </div>
      <van-row>
        <van-col span="6" v-for="item in recommendChannels" :key="item.id">
          <div class="inner van-ellipsis" @click="add(item.id)">
            <van-icon name="plus" />{{ item.name }}
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getAllArticleList } from '@/api/home'
export default {
  name: 'ChannelPanel',
  props: {
    channels: { // 我的频道
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  async created () {
    try {
      const res = await getAllArticleList()
      // console.log(res)
      // 返回一个过滤值后的新数组。
      this.recommendChannels = res.data.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id))
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      recommendChannels: [],
      isCloseShow: false
    }
  },
  methods: {
    add (id) {
      // 根据id获取当前点击的索引
      const index = this.recommendChannels.findIndex(item => item.id === id)
      // 利用索引将其添加到我的频道
      this.channels.push(this.recommendChannels[index])
      // 并在推荐频道中删除当前项
      this.recommendChannels.splice(index, 1)
    },
    onClick (index) {
      if (this.isCloseShow) {
        if (index === 0) {
          return
        }
        // 删除
        // 利用索引将其添加到推荐频道
        this.recommendChannels.push(this.channels[index])
        // 并在我的频道中删除当前项
        this.channels.splice(index, 1)
        // 当前索引小于点击项对应的索引时让其减一
        if (index < this.active) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        // 切换--子向父传值
        this.$emit('change-active', index)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.channel-container {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 24px;
    padding-right: 16px;
    margin-bottom: 16px;
    h3 {
      font-size: 32px;
      font-weight: 400;
      color: #333;
    }
    .van-button {
      width: 104px;
      height: 48px;
      border-radius: 20px;
      color: #f85a5a;
    }
  }
}

.inner {
  width: 160px;
  height: 86px;
  background-color: #f4f5f6;
  border-radius: 6px;
  font-size: 28px;
  font-weight: 400;
  color: #222;
  text-align: center;
  line-height: 86px;
  margin-left: 14px;
  position: relative;
  // overflow: hidden;
  .van-icon-close {
    position: absolute;
    top: 0;
    right: 0;
    // 移动相对于自身的距离
    transform: translate(50%, -50%);
  }
}
.van-col {
  margin-bottom: 22px;
}
</style>
