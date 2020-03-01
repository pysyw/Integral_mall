<template>
  <div class="contanier">
    <nav-bar title="收货地址" @onClickLeft="handleBack" />
    <van-address-list
      v-model="chosenAddressId"
      :list="tableData"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>
<script>
import { getList } from '@/api/address'
import navBar from '@/components/navBar'
import store from '@/store'
export default {
  components: {
    navBar
  },
  data() {
    return {
      tableData: [],
      chosenAddressId: ''
    }
  },
  computed: {
    consumerId() {
      return store.state.consumerId
    }
  },
  mounted() {
    this.getLists()
  },
  methods: {
    getLists() {
      getList(this.consumerId).then(res => {
        const data = res.data
        this.tableData = data.map(item => {
          return {
            id: item._id,
            name: item.name,
            tel: item.phoneNumber,
            address: item.addressDetail,
            isDefault: item.isDefault
          }
        })
        const result = this.tableData.filter(item => item.isDefault === true)
        this.chosenAddressId = result[0].id
      })
    },
    handleBack() {
      console.log(111)
    },
    onAdd() {
      this.$router.push('/editAddress')
    },
    onEdit(item) {
      const addressId = item.id
      this.$router.push(`/editAddress/${addressId}`)
    }
  }
}
</script>
<style scoped>
  .contanier{
    margin-top: 92px
  }
</style>
