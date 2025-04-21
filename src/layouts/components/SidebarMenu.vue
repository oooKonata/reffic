<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed, ref } from 'vue'
  import { useStateStore } from '@/stores/sidebar/useStateStore'
  import { useMenuStore } from '@/stores/sidebar/useMenuStore'
  import { MenuOption } from '@/components/o-menu/types'
  import { OMenu } from '@/components/o-menu'
  import { MENU_TYPE } from '@/enums'

  const { sidebarMenuContext } = storeToRefs(useStateStore())
  const { menuData } = storeToRefs(useMenuStore())
  const isFav = computed(() => sidebarMenuContext.value?.context?.meta?.fav)
  const menuType = computed((): MENU_TYPE => sidebarMenuContext.value?.menuType!)

  const menuOptions = ref<MenuOption[][]>([])
  menuOptions.value = menuData.value[menuType.value]

  const handleSelect = (data: MenuOption, parentData: MenuOption) => {}
</script>

<template>
  <div class="context-menu">
    <OMenu :source="menuOptions" :position="sidebarMenuContext?.position!" @option-select="handleSelect" />
  </div>
</template>

<style scoped lang="scss"></style>
