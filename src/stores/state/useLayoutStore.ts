import { SidebarOption } from '@/layouts/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLayoutStore = defineStore(
  'o-state',
  () => {
    const isSidebarResizing = ref(false)

    const MenuContext = ref<string | SidebarOption>()
    const mousePosition = ref<{ x: number; y: number }>()

    const orderFav = ref(1)
    const orderPriv = ref(2)

    return {
      isSidebarResizing,
      MenuContext,
      mousePosition,
      orderFav,
      orderPriv,
    }
  }
  // { persist: true }
)
