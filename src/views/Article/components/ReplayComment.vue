<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar :title="title" left-arrow @click-left="$emit('close')" fixed>
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- 当前的评论 -->
    <CommentItem :item="comment" class="comment"></CommentItem>
    <van-cell title="全部评论" />
    <!-- 对评论的回复的评论 -->
    <CommentItem
      :item="item"
      v-for="item in list"
      :key="item.com_id"
    ></CommentItem>
    <!-- 防止底部定位覆盖评论内容 -->
    <div class="comment1"></div>
    <div class="bottom">
      <van-button
        type="primary"
        block
        round
        plain
        @click="isAddCommentSohw = true"
        >评论</van-button
      >
    </div>
    <!-- 新添加回复 -->
    <van-popup v-model="isAddCommentSohw" position="bottom">
      <AddComment
        :target="this.comment.com_id"
        :art_id="$route.params.article_id"
        v-if="isAddCommentSohw"
        @add-comment="
          list.unshift($event);
          isAddCommentSohw = false;
          comment.reply_count++;
        "
      ></AddComment>
    </van-popup>
  </div>
</template>

<script>
import AddComment from './AddComment'
import { getCommentList } from '@/api/comment'
import CommentItem from './CommentItem.vue'
export default {
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      offset: null,
      limit: 9999,
      list: [],
      isAddCommentSohw: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList({ type: 'c', source: this.comment.com_id, offset: this.offset, limit: this.limit })
        console.log(res)
        this.list = res.data.data.results
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    title () {
      if (this.comment.reply_count === 0) {
        return '暂无回复'
      } else {
        return `${this.comment.reply_count}条回复`
      }
    }
  },
  watch: {},
  filters: {},
  components: {
    CommentItem,
    AddComment
  }
}
</script>

<style scoped lang='less'>
.comment {
  margin-top: 92px;
}
.comment1 {
  margin-bottom: 110px;
}
.bottom {
  position: fixed;
  bottom: 0;
  height: 110px;
  width: 753px;
  padding: 10px 30px;
  box-sizing: border-box;
  background-color: #ff69b4;
  .van-button {
    border: none;
  }
}
</style>
