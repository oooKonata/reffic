<script setup lang="ts">
  import { useLayoutStore } from '@/stores/state/useLayoutStore'
  import { storeToRefs } from 'pinia'
  import { ref } from 'vue'
  import { loadStaticResource } from '@/assets'
  import { MenuOption } from '@/components/o-menu/types'
  import { OMenu } from '@/components/o-menu'

  // const { MenuContext, mousePosition, orderFav, orderPriv } = storeToRefs(useLayoutStore())

  const menuOptions = ref<MenuOption[][]>([
    [
      {
        id: 'order',
        label: '排序',
        icon: loadStaticResource('/icons/menu-order.svg'),
        children: [
          { id: 'manual', label: '手动', meta: { selected: true } },
          { id: 'last-edited', label: '上次编辑', meta: { selected: false } },
        ],
      },
      { id: 'display', label: '显示', icon: loadStaticResource('/icons/menu-display.svg') },
    ],
    [
      {
        id: 'move-up',
        label: '向上移动',
        icon: loadStaticResource('/icons/menu-move-up.svg'),
      },
      {
        id: 'move-down',
        label: '向下移动',
        icon: loadStaticResource('/icons/menu-move-down.svg'),
        disabled: true,
      },
    ],
    [
      {
        id: 'move-to-fav',
        label: '添加到最爱',
        icon: loadStaticResource('/icons/menu-fav.svg'),
      },
    ],
    [
      { id: 'copy-link', label: '拷贝链接', icon: loadStaticResource('/icons/menu-copy-link.svg') },
      {
        id: 'duplicate',
        label: '创建副本',
        icon: loadStaticResource('/icons/menu-duplicate.svg'),
        tip: '⌘D',
      },
      { id: 'rename', label: '重命名', icon: loadStaticResource('/icons/menu-rename.svg'), tip: '⌘⇧R' },
      {
        id: 'move-to',
        label: '移动到',
        icon: loadStaticResource('/icons/menu-move-to.svg'),
        tip: '⌘⇧P',
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
      },
      {
        id: 'open-in-side-preview',
        label: '在侧边预览中打开',
        icon: loadStaticResource('/icons/menu-open-in-side-preview.svg'),
        tip: '⌥Click',
      },
    ],
  ])
</script>

<template>
  <div class="context-menu">
    <OMenu :source="menuOptions" />
  </div>
</template>

<style scoped lang="scss"></style>
