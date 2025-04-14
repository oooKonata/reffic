<script setup lang="ts">
  import { useLayoutStore } from '@/stores/state/useLayoutStore'
  import { storeToRefs } from 'pinia'
  import { MenuOption } from '../type'
  import { ref } from 'vue'
  import { loadStaticResource } from '@/assets'

  const { ActionMenuContext, mousePisition, orderFav, orderPriv } = storeToRefs(useLayoutStore())

  const menuOptions = ref<MenuOption[][]>([
    [
      { id: 'order', label: '排序', url: loadStaticResource('/icons/sidebar-file.svg') },
      { id: 'display', label: '显示', url: loadStaticResource('/icons/sidebar-file.svg') },
      {
        id: 'move-up',
        label: '向上移动',
        url: loadStaticResource('/icons/sidebar-file.svg'),
        disable: orderFav.value === 1,
      },
      {
        id: 'move-down',
        label: '向下移动',
        url: loadStaticResource('/icons/sidebar-file.svg'),
        disable: orderFav.value === 2,
      },
    ],
    [
      {
        id: ActionMenuContext.value === 'fav' ? 'remove-from-fav' : 'move-to-fav',
        label: ActionMenuContext.value === 'fav' ? '从最爱中移除' : '添加到最爱',
        url:
          ActionMenuContext.value === 'fav'
            ? loadStaticResource('/icons/menu-fav-remove.svg')
            : loadStaticResource('/icons/menu-fav.svg'),
      },
    ],
    [
      { id: 'copy-link', label: '拷贝链接', url: loadStaticResource('/icons/menu-copy-link.svg'), disable: true },
      {
        id: 'duplicate',
        label: '创建副本',
        url: loadStaticResource('/icons/menu-duplicate.svg'),
        tip: '⌘D',
        disable: true,
      },
      { id: 'rename', label: '重命名', url: loadStaticResource('/icons/menu-rename.svg'), tip: '⌘⇧R' },
      {
        id: 'move-to',
        label: '移动到',
        url: loadStaticResource('/icons/menu-move-to.svg'),
        tip: '⌘⇧P',
        disable: true,
      },
      {
        id: 'move-to-trash',
        label: '移至垃圾箱',
        url: loadStaticResource('/icons/menu-move-to-trash.svg'),
      },
    ],
    [
      {
        id: 'open-in-new-tab',
        label: '在新选项卡中打卡',
        url: loadStaticResource('/icons/menu-open-in-new-tab.svg'),
        tip: '⌘⇧↵',
        disable: true,
      },
      {
        id: 'open-in-side-preview',
        label: '在侧边预览中打开',
        url: loadStaticResource('/icons/menu-open-in-side-preview.svg'),
        tip: '⌥Click',
        disable: true,
      },
    ],
  ])
</script>

<template>
  <div class="action-menu">111</div>
</template>

<style scoped lang="scss"></style>
