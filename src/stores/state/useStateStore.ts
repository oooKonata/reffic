import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStateStore = defineStore(
  'o-state',
  () => {
    const sidebarResizeStart = ref(false)

    return {
      sidebarResizeStart,
    }
  }
  // { persist: true }
)
