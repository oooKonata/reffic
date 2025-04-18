import { MENU_TYPE } from '@/enums'
import { SidebarOption } from '@/layouts/types'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useLayoutStore = defineStore(
  'o-state',
  () => {
    const isSidebarResizing = ref(false)

    const sidebarMenuContext = ref<{
      menuType: MENU_TYPE
      context?: SidebarOption
      position: { x: number; y: number }
    }>()
    const orderFav = ref(1)
    const orderPriv = ref(2)

    return {
      isSidebarResizing,
      sidebarMenuContext,
      orderFav,
      orderPriv,
    }
  }
  // { persist: true }
)
