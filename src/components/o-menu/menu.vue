<script setup lang="ts">
  import { MenuOption } from './types'
  import { onMounted, ref } from 'vue'
  import { loadStaticResource } from '@/assets'
  import { OOption, OOptionFlyout } from '.'
  import OIcon from '../o-icon'

  defineOptions({
    name: 'OMenu',
  })

  const props = withDefaults(
    defineProps<{
      source: MenuOption[][]
      position: {
        x: number
        y: number
      }
    }>(),
    {
      position: () => ({ x: 0, y: 0 }),
    }
  )

  const emits = defineEmits<{
    (e: 'option-select', data: MenuOption, parentData: MenuOption): void
  }>()

  const activeIds = ref<string[]>([])

  const initSelectedOptions = (source: MenuOption[][]) => {
    source.forEach(group => {
      group.forEach(item => {
        if (item.children) {
          // 初始化，父级 tip 为子级选中项的 label
          const selectedChild = item.children.find(child => child.meta?.selected)
          item.tip = selectedChild?.label ?? item.tip
        }
      })
    })
  }

  const handleClick = (optionData: MenuOption, parentData: MenuOption) => {
    if (parentData) {
      // parentData.children?.forEach(item => {
      //   item.meta!.selected = item.id !== optionData.id ? false : true
      // })
      parentData.tip = optionData.label
    }
    emits('option-select', optionData, parentData)
  }

  onMounted(() => {
    initSelectedOptions(props.source)
  })
</script>

<template>
  <div class="o-menu" :style="{ left: `${position.x}px`, top: `${position.y}px` }">
    <div v-for="(group, index) in source" :key="index" class="o-menu__group">
      <OOptionFlyout
        :source="group"
        :activeIds="activeIds"
        :parentPath="[]"
        @flyout-mouseenter="path => (activeIds = path)">
        <template #default="{ optionData, parentData }">
          <OOption
            v-if="optionData.visible"
            :source="optionData"
            :isDisabled="optionData.disabled"
            :isFlyoutActive="activeIds.includes(optionData.id) && !optionData.disabled"
            @click="handleClick(optionData, parentData!)">
            <template #left>
              <OIcon
                v-if="optionData.icon"
                :src="activeIds.includes(optionData.id) && optionData.meta?.warn  ? optionData.meta.warnIcon : optionData.icon!" />
              <label :class="{ 'is-warn': activeIds.includes(optionData.id) && optionData.meta?.warn }">{{
                optionData.label
              }}</label>
            </template>
            <template #right>
              <label>{{ optionData.tip }}</label>
              <OIcon v-if="optionData.children" :src="loadStaticResource('/icons/menu-more.svg')" :size="16" />
              <OIcon v-if="optionData.meta?.selected" :src="loadStaticResource('/icons/menu-select.svg')" :size="16" />
            </template>
          </OOption>
        </template>
      </OOptionFlyout>
      <div v-if="index < source.length - 1" class="divider"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .o-menu {
    display: flex;
    flex-direction: column;
    gap: 1px;
    position: absolute;
    width: 248px;
    max-height: 70vh;
    overflow-x: visible;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: $o-b10 0px 14px 28px -6px, $o-b6 0px 2px 4px -1px, $o-b8 0px 0px 0px 1px;

    &__group {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 1px;
      margin: 4px;

      :deep(.o-option__right) {
        font-size: 12px;
        color: $o-b40;
      }

      .divider {
        position: absolute;
        left: 0;
        bottom: -5px;
        width: 100%;
        height: 1px;
        padding: 0 12px;
        background-color: $o-b8;
        background-clip: content-box;
      }

      :deep(.children) {
        width: 248px;
        padding: 4px;
        border-radius: 8px;
        background-color: #fff;
        box-shadow: $o-b10 0px 14px 28px -6px, $o-b6 0px 2px 4px -1px, $o-b8 0px 0px 0px 1px;
      }

      :deep(.is-warn) {
        color: $o-warn;
      }
    }
  }
</style>
