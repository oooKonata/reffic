import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMenuStore = defineStore(
  'o-menu',
  () => {
    // 排序方式
    const selectedOrder = ref('manual')
    // 显示数量
    const displayCount = ref('all')

    return { selectedOrder, displayCount }
  },
  {
    persist: true,
  }
)
