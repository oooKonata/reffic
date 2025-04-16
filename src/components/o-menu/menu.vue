<script setup lang="ts">
  import { MenuOption } from './types'
  import { ref } from 'vue'
  import { loadStaticResource } from '@/assets'
  import { OOptionNested, OOption } from '.'
  import OIcon from '../o-icon'

  defineOptions({
    name: 'OMenu',
  })

  defineProps<{
    source?: MenuOption[][]
  }>()

  const emits = defineEmits<{
    (e: 'select', item: MenuOption): void
  }>()

  const handleSelect = (item: MenuOption) => {
    if (!item.disabled) {
      emits('select', item)
    }
  }

  const sourceData = ref<MenuOption[][]>([
    [
      {
        id: 'order',
        label: '排序',
        icon: loadStaticResource('/icons/sidebar-file.svg'),
        children: [
          { id: 'sort-by-name', label: '按名称排序', icon: loadStaticResource('/icons/sidebar-file.svg') },
          { id: 'sort-by-date', label: '按日期排序', icon: loadStaticResource('/icons/sidebar-file.svg') },
        ],
      },
      { id: 'display', label: '显示', icon: loadStaticResource('/icons/sidebar-file.svg') },
    ],
    [
      {
        id: 'move-up',
        label: '向上移动',
        icon: loadStaticResource('/icons/sidebar-file.svg'),
      },
      {
        id: 'move-down',
        label: '向下移动',
        icon: loadStaticResource('/icons/sidebar-file.svg'),
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
  <div class="o-menu">
    <div v-for="(group, index) in sourceData" :key="index" class="o-menu__group">
      <OOptionNested :source="group">
        <template #default="{ optionData, depth }">
          <OOption>
            <template #left>
              <OIcon :src="optionData.icon!" />
              <label>{{ optionData.label }}</label>
            </template>
            <template #right>
              <label>{{ optionData.tip }}</label>
            </template>
          </OOption>
        </template>
      </OOptionNested>
      <div v-if="index < sourceData.length - 1" class="divider"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .o-menu {
    display: flex;
    flex-direction: column;
    gap: 1px;
    position: absolute;
    top: 30px;
    left: 264px;
    width: 264px;
    max-height: 70vh;
    overflow: hidden auto;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: $o-b10 0px 14px 28px -6px, $o-b6 0px 2px 4px -1px, $o-b8 0px 0px 0px 1px;
    &__group {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 1px;
      padding: 4px;
      .divider {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        padding: 0 12px;
        background-color: $o-b8;
        background-clip: content-box;
      }
    }
  }
</style>
