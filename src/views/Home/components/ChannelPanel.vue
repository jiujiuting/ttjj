<template>
  <div>
    <div class="channel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button plain type="danger" round size="mini">编辑</van-button>
      </div>
      <van-row>
        <van-col span="6" v-for="item in channels" :key="item.id">
          <div class="inner">{{item.name}}</div>
        </van-col>
      </van-row>
    </div>
    <div class="channel-container">
      <div class="title">
        <h3>频道推荐</h3>
      </div>
      <van-row>
        <van-col span="6">
          <div class="inner"><van-icon name="plus" />123</div>
        </van-col>
        <van-col span="6">
          <div class="inner"><van-icon name="plus" />123</div>
        </van-col>
        <van-col span="6">
          <div class="inner"><van-icon name="plus" />123</div>
        </van-col>
        <van-col span="6">
          <div class="inner"><van-icon name="plus" />123</div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    channels: {
      type: Array,
      required: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {},
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
}
.van-col{
  margin-bottom: 22px;
}
</style>
