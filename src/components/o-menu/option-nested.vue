<script setup lang="ts">
  import { OOptionNested } from '@/components/o-menu'
  import { SidebarOption } from '@/layouts/type'

  defineOptions({
    name: 'OOptionNested',
  })

  const props = withDefaults(
    defineProps<{
      data: SidebarOption[]
      level?: number
      indent?: number
    }>(),
    {
      level: 0,
      indent: 8,
    }
  )

  props.data
</script>

<template>
  <div v-for="(item, index) in data" :key="index" class="option-nested">
    <slot :option="item" :level="level" />

    <template v-if="item.child">
      <OOptionNested v-for="(child, index) in item.child" :key="index" :data="child" :level="level + 1">
        <template
          v-for="slotName in Object.keys($slots)"
          #[slotName]="scope: { optionSource: SidebarOption, level: number }">
          <slot :name="slotName" :optionSource="scope.optionSource" :level="scope.level" />
        </template>
      </OOptionNested>
    </template>
  </div>
</template>

<style scoped lang="scss"></style>
