<script setup lang="ts">
  import { MenuOption } from '@/layouts/types'
  import { ref, computed, inject, provide } from 'vue'
  import { depthKey } from '../constants/key'

  defineOptions({
    name: 'OOptionNested',
  })

  defineProps<{
    source: MenuOption[]
  }>()

  // 自动获取上级深度
  const internalDepth = inject(depthKey, ref(0))
  const childDepth = computed(() => internalDepth.value + 1)

  // 为子组件提供深度上下文
  provide(depthKey, childDepth)
</script>

<template>
  <div v-for="(item, index) in source" :key="index" class="option-nested">
    <slot :optionData="item" :depth="internalDepth" />

    <template v-if="item.children!.length && !item.collapse">
      <OOptionNested :source="item.children!">
        <template
          v-for="slotName in Object.keys($slots)"
          #[slotName]="scope: { optionData: MenuOption, depth: number }">
          <slot :name="slotName" v-bind="scope" />
        </template>
      </OOptionNested>
    </template>
  </div>
</template>

<style scoped lang="scss">
  .option-nested {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  :deep(.option-nested) {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
</style>
