<script setup lang="ts">
  import { useLayoutStore } from '@/stores/state/useLayoutStore'
  import { storeToRefs } from 'pinia'
  import { ref } from 'vue'
  import { loadStaticResource } from '@/assets'
  import { SidebarOption } from '../types'

  const { MenuContext, mousePisition, orderFav, orderPriv } = storeToRefs(useLayoutStore())

  const menuOptions = ref<SidebarOption[][]>([
    [
      { id: 'order', label: '排序', icon: loadStaticResource('/icons/sidebar-file.svg') },
      { id: 'display', label: '显示', icon: loadStaticResource('/icons/sidebar-file.svg') },
      {
        id: 'move-up',
        label: '向上移动',
        icon: loadStaticResource('/icons/sidebar-file.svg'),
        disabled: orderFav.value === 1,
      },
      {
        id: 'move-down',
        label: '向下移动',
        icon: loadStaticResource('/icons/sidebar-file.svg'),
        disabled: orderFav.value === 2,
      },
    ],
    [
      {
        id: MenuContext.value === 'fav' ? 'remove-from-fav' : 'move-to-fav',
        label: MenuContext.value === 'fav' ? '从最爱中移除' : '添加到最爱',
        icon:
          MenuContext.value === 'fav'
            ? loadStaticResource('/icons/menu-fav-remove.svg')
            : loadStaticResource('/icons/menu-fav.svg'),
      },
    ],
    [
      { id: 'copy-link', label: '拷贝链接', icon: loadStaticResource('/icons/menu-copy-link.svg'), disabled: true },
      {
        id: 'duplicate',
        label: '创建副本',
        icon: loadStaticResource('/icons/menu-duplicate.svg'),
        tip: '⌘D',
        disabled: true,
      },
      { id: 'rename', label: '重命名', icon: loadStaticResource('/icons/menu-rename.svg'), tip: '⌘⇧R' },
      {
        id: 'move-to',
        label: '移动到',
        icon: loadStaticResource('/icons/menu-move-to.svg'),
        tip: '⌘⇧P',
        disabled: true,
      },
      {
        id: 'move-to-trash',
        label: '移至垃圾箱',
        icon: loadStaticResource('/icons/menu-move-to-trash.svg'),
      },
    ],
    [
      {
        id: 'open-in-new-tab',
        label: '在新选项卡中打卡',
        icon: loadStaticResource('/icons/menu-open-in-new-tab.svg'),
        tip: '⌘⇧↵',
        disabled: true,
      },
      {
        id: 'open-in-side-preview',
        label: '在侧边预览中打开',
        icon: loadStaticResource('/icons/menu-open-in-side-preview.svg'),
        tip: '⌥Click',
        disabled: true,
      },
    ],
  ])
</script>

<template>
  <div class="context-menu">
    <!-- <OMenu :item="" /> -->
  </div>
</template>

<style scoped lang="scss"></style>
