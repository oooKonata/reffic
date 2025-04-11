<script setup lang="ts">
  import { SidebarOption } from '@/layouts/type'

  defineOptions({
    name: 'OOptionNested',
  })

  withDefaults(
    defineProps<{
      data: SidebarOption[]
      level?: number
    }>(),
    {
      level: 0,
    }
  )
</script>

<template>
  <div v-for="(item, index) in data" :key="index" class="option-nested">
    <slot :optionData="item" :level="level" />

    <template v-if="item.child.length">
      <OOptionNested :data="item.child" :level="level + 1">
        <template
          v-for="slotName in Object.keys($slots)"
          #[slotName]="scope: { optionData: SidebarOption, level: number }">
          <slot :name="slotName" :optionData="scope.optionData" :level="scope.level" />
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
