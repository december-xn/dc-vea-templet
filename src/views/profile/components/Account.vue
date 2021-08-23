<template>
  <el-form>
    <el-form-item label="姓名">
      <el-input v-model.trim="user.name" />
    </el-form-item>

    <el-form-item label="昵称">
      <el-input v-model.trim="user.nickname" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import * as UserApi from '@/api/personnel/user'
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          _id: '',
          name: '',
          nickname: '',
          positions_name: []
        }
      }
    }
  },
  data() {
    return {
      url: '',
      temp: {
        _id: '',
        nickname: '',
        name: '',
        positions_name: []
      }
    }
  },
  created() {
    this.temp = this.user
  },
  methods: {
    async submit() {
      const tempData = {
        _id: this.temp._id,
        name: this.temp.name,
        nickname: this.temp.nickname
      }
      const response = await UserApi.updateMethod(tempData)
      if (response.code !== 0) return this.$message.error(response.desc)
      await this.$store.dispatch('user/getRoles')
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>

<style></style>
