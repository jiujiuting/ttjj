<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <van-cell title="头像" is-link @click="showInput">
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="profile.photo"
        width="0.9rem"
        height="0.9rem"
      />
    </van-cell>
    <van-cell
      title="昵称"
      @click="isNamrShow = true"
      :value="profile.name"
      is-link
    />
    <van-cell
      title="性别"
      :value="profile.gender === 0 ? '男' : '女'"
      is-link
    />
    <van-cell
      title="生日"
      @click="isBirthdayShow = true"
      :value="profile.birthday"
      is-link
    />
    <!-- 更改昵称 -->
    <van-popup position="bottom" style="height: 100%" v-model="isNamrShow">
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        @click-left="onNameCancel"
        @click-right="onNameSave"
      />
      <!-- 昵称的统计输入框 -->
      <!-- :value不让其双向绑定 -->
      <!-- @input获取组件输入框内容 -->
      <van-field
        :value="profile.name"
        @input="name = $event"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
    </van-popup>
    <!-- 更改生日 -->
    <van-popup position="bottom" v-model="isBirthdayShow">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- 更新头像功能 -->
    <!-- 选择图片 -->
    <input
      type="file"
      style="display: none"
      ref="file"
      accept="image/png,image/jpeg,image/gif,image/jpg"
      @change="onChange"
    />
    <!-- 更换头像 -->
    <van-popup position="bottom" style="height: 100%" v-model="isAvatarShow">
      <!-- 将图片地址传入组件 -->
      <UpdateAvatar
        :img-src.sync="imgSrc"
        @close="isAvatarShow = $event"
      ></UpdateAvatar>
    </van-popup>
  </div>
</template>

<script>
// 更换头像组件
import UpdateAvatar from './components/UpdateAvatar.vue'
import { getUserProfile, updateUserProfile } from '@/api/user'
export default {
  // 获取个人信息
  async created () {
    try {
      const res = await getUserProfile()
      this.profile = res.data.data
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      profile: {},
      isNamrShow: false,
      name: '',
      isBirthdayShow: false,
      // 开始日期
      minDate: new Date(1950, 0, 1),
      // 结束日期
      maxDate: new Date(2022, 10, 1),
      // 资料日期
      birthday1: '',
      isAvatarShow: false,
      imgSrc: ''
    }
  },
  methods: {
    onNameCancel () {
      this.isNamrShow = false
    },
    // 更新请求
    async save () {
      try {
        await updateUserProfile(this.profile)
      } catch (err) {
        console.log(err)
      }
    },
    // 更新昵称
    async onNameSave () {
      this.profile.name = this.name
      await this.save()
      this.isNamrShow = false
    },
    // 更新生日
    onConfirm () {
      this.profile.birthday = this.birthday1
      this.save()
      this.isBirthdayShow = false
    },
    // 显示选择图片
    showInput () {
      // js模拟点击
      this.$refs.file.click()
    },
    // input文件选择框内有值时
    onChange () {
      // 获取临时图片地址
      const url = window.URL.createObjectURL(this.$refs.file.files[0])
      this.imgSrc = url
      // 显示更换头像弹出层
      this.isAvatarShow = true
    }
  },
  computed: {
    // 计算属性作用 日期格式与字符串格式不能通用
    currentDate: {
      get () {
        return new Date(this.profile.birthday)
      },
      set (newValse) {
        this.birthday1 = newValse.getFullYear() + '-' + (newValse.getMonth() + 1) + '-' + newValse.getDate()
      }
    }
  },
  watch: {
    imgSrc () {
      this.profile.photo = this.imgSrc
      this.save()
    }

  },
  filters: {},
  components: {
    UpdateAvatar
  }
}
</script>

<style scoped lang='less'>
/deep/ .van-nav-bar__text {
  color: #fff;
}
</style>
