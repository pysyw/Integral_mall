<template>
  <div class="contanier">
    <nav-bar :title="title" />
    <van-form label-width="110px" @submit="onSubmit">
      <van-field
        v-model="tableData.name"
        name="name"
        label="收货人姓名"
        placeholder="请输入收货人姓名"
        :rules="[{ required: true, message: '请填写收货人姓名' }]"
      />
      <van-field
        v-model="tableData.phoneNumber"
        type="number"
        name="phoneNumber"
        label="电话"
        placeholder="收货人电话"
        :rules="[{ required: true, message: '请填写收货人电话' }]"
      />
      <van-field
        v-model="tableData.addressDetail"
        name="phoneNumber"
        rows="1"
        autosize
        type="textarea"
        label="收货地址"
        placeholder="请填写收获地址"
        :rules="[{ required: true, message: '请填写收货地址' }]"
      />
      <van-field
        v-model="tableData.postal"
        name="postal"
        label="邮政编码"
        placeholder="请填写邮政编码"
        :rules="[{ required: true, message: '请填写邮政编码' }]"
      />
      <van-field name="isDefault" label="设为默认收货地址">
        <template #input>
          <van-switch v-model="tableData.isDefault" size="20" />
        </template>
      </van-field>
      <div v-if="addressId" style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
        <van-button round block type="danger" class="mg-tp-30" @click="handleDelete">
          删除
        </van-button>
      </div>
      <div v-else style="margin:16px">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import store from '@/store'
import navBar from '@/components/navBar'
import { getListById, edit, add, deleteById } from '@/api/address'
import { Toast } from 'vant'
export default {
  components: {
    navBar
  },
  data() {
    return {
      areaList: {},
      searchResult: [],
      tableData: {}
    }
  },
  computed: {
    addressId() {
      return this.$route.params.addressId
    },
    consumerId() {
      return store.state.consumerId
    },
    title() {
      if (this.addressId) {
        return '修改地址'
      } else {
        return '新增地址'
      }
    }
  },
  mounted() {
    if (this.addressId) {
      this.getLists()
    }
  },
  methods: {
    getLists() {
      getListById(this.addressId).then(res => {
        const data = res.data
        this.tableData = {
          isDefault: data.isDefault,
          name: data.name,
          addressDetail: data.addressDetail,
          phoneNumber: data.phoneNumber,
          postal: data.postal,
          _id: data._id
        }
      })
    },
    handleEdit() {
      edit(this.tableData).then(res => {
        Toast({
          type: 'success',
          message: res.message,
          duration: 1000
        })
        this.$router.replace('/address')
      })
    },
    handleAdd() {
      const params = Object.assign({ consumerId: this.consumerId }, this.tableData)
      add(params).then(res => {
        Toast({
          type: 'success',
          message: res.message,
          duration: 1000
        })
        this.$router.replace('/address')
      })
    },
    handleDelete() {
      deleteById(this.tableData._id).then(res => {
        Toast({
          type: 'success',
          message: res.message,
          duration: 1000
        })
        this.$router.replace('/address')
      })
    },
    onSubmit(form) {
      if (this.addressId) { // 编辑
        this.handleEdit()
      } else { // 新增
        this.handleAdd()
      }
    }
  }
}
</script>
<style scoped>
  .contanier{
    margin-top: 92px
  }
</style>
