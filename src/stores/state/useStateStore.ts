import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStateStore = defineStore(
  'o-state',
  () => {
    // state resize
    const sidebarResizeStart = ref(false)

    return {
      sidebarResizeStart,
    }
  }
  // { persist: true }
)
