<script setup lang="ts">
  import { ref, computed, inject, provide, CSSProperties } from 'vue'
  import { depthKey } from '../constants/key'
  import { MenuOption } from './types'

  defineOptions({
    name: 'OOptionFlyout',
  })

  const props = defineProps<{
    source: MenuOption[]
    activeIds: string[]
    parentPath: string[]
  }>()

  const emits = defineEmits<{
    (e: 'flyout-mouseenter', path: string[]): void
    (e: 'flyout-mouseleave'): void
  }>()

  // 深度管理
  const depth = inject(depthKey, ref(0))
  const childDepth = computed(() => depth.value + 1)
  provide(depthKey, childDepth)

  const childStyles = computed((): CSSProperties => {
    return {
      top: 0,
      left: '240px',
      zIndex: 9 + childDepth.value,
      visibility: 'hidden',
    }
  })

  const handleMouseEnter = (item: MenuOption) => {
    const path = [...(props.parentPath || []), item.id]
    emits('flyout-mouseenter', path)
  }

  const handleMouseLeave = () => {
    emits('flyout-mouseleave')
  }
</script>

<template>
  <div
    v-for="(item, index) in source"
    :key="index"
    :class="['o-option-flyout', { 'is-disabled': item.disabled }]"
    @mouseenter="handleMouseEnter(item)"
    @mouseleave="handleMouseLeave">
    <slot :optionData="item" :depth="depth" />

    <template v-if="item.children?.length">
      <div :class="['children', { visible: activeIds.includes(item.id) }]" :style="childStyles">
        <OOptionFlyout
          :source="item.children"
          :activeIds="activeIds"
          :parentPath="parentPath.concat(item.id)"
          @flyout-mouseenter="path => emits('flyout-mouseenter', path)"
          @flyout-mouseleave="emits('flyout-mouseleave')">
          <template v-for="(_, slotName) in $slots" #[slotName]="scope: { optionData: MenuOption, depth: number }">
            <slot :name="slotName" v-bind="scope" />
          </template>
        </OOptionFlyout>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
  .o-option-flyout {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1px;
    position: relative;

    .children {
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    &.is-disabled {
      pointer-events: none;
      opacity: 0.5;
      cursor: auto;
    }
  }

  .children.visible {
    visibility: visible !important;
  }
</style>
