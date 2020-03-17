<template>
  <div>
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: 'auto' }"
    >
      <van-address-list
        v-model="chosenAddressId"
        :list="addressList"
        add-button-text="确定"
        default-tag-text="默认"
        @add="handleSelect"
        @select="handleChoose"
      />
    </van-popup>
  </div>
</template>
<script>
import { getList } from '@/api/address'
export default {
  name: 'Popup',
  data() {
    return {
      show: false,
      addressList: [],
      chosenAddressId: '',
      chosenItem: {}
    }
  },
  methods: {
    getLists() {
      getList().then(res => {
        const data = res.data.map(item => {
          return {
            id: item._id,
            name: item.name,
            tel: item.phoneNumber,
            address: item.addressDetail,
            isDefault: item.isDefault
          }
        })
        this.addressList = data || []
        this.chosenItem = this.addressList.filter(item => item.id === this.chosenAddressId)[0]
      })
    },
    showPop(chosenAddressId) {
      this.chosenAddressId = chosenAddressId
      this.getLists()
      this.show = true
    },
    handleSelect() {
      this.$emit('handleSelectAddress', this.chosenItem)
      this.show = false
    },
    handleChoose(item) {
      this.chosenItem = item
    }

  }
}
</script>
<style lang="scss" scoped>
  .van-icon-edit {
    display: none;
  }
</style>
