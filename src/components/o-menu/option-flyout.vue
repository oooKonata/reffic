<script setup lang="ts">
  import { ref, computed, inject, provide, CSSProperties } from 'vue'
  import { depthKey } from '../constants/key'
  import { MenuOption } from './types'

  defineOptions({
    name: 'OOptionFlyout',
  })

  defineProps<{
    source: MenuOption[]
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
      opacity: 0.5,
    }
  })
</script>

<template>
  <div v-for="(item, index) in source" :key="index" class="o-option-flyout">
    <slot :optionData="item" :depth="depth" />

    <template v-if="item.children?.length">
      <div class="children" :style="childStyles">
        <OOptionFlyout :source="item.children!">
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
    display: flex;
    flex-direction: column;
    gap: 1px;
    position: relative;

    .children {
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: 1px;
      cursor: inherit;
    }
  }

  :deep(.o-option.is-active + .children) {
    opacity: 1 !important;
  }
</style>
