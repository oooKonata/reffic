<script setup lang="ts">
  import { ref, computed, inject, provide, markRaw } from 'vue'
  import { depthKey } from '../constants/key'
  import { MenuOption } from './types'

  defineOptions({
    name: 'OOptionNested',
  })

  defineProps<{
    source: MenuOption[]
    mark?: boolean // 标记 fav 分组的折叠（collapseFav）与 priv 分组折叠（collapse）区分开
  }>()

  // 深度管理
  const depth = inject(depthKey, ref(0))
  const childDepth = computed(() => depth.value + 1)
  provide(depthKey, childDepth)
</script>

<template>
  <div v-for="(item, index) in source" :key="index" class="o-option-nested">
    <slot :optionData="item" :depth="depth" />

    <template v-if="item.children?.length && (!mark ? !item.collapse : !item.meta?.collapseFav)">
      <OOptionNested :source="item.children!" :mark="mark">
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
  .o-option-nested {
    display: flex;
    flex-direction: column;
    gap: 1px;
    position: relative;
  }
  :deep(.option-nested) {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
</style>
