import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLayoutStore = defineStore(
  'o-state',
  () => {
    const sidebarResizeStart = ref(false)

    const ActionMenuContext = ref('')
    const mousePisition = ref<{ x: number; y: number }>()

    const orderFav = ref(1)
    const orderPriv = ref(2)

    return {
      sidebarResizeStart,
      ActionMenuContext,
      mousePisition,
      orderFav,
      orderPriv,
    }
  }
  // { persist: true }
)
