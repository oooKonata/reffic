<script setup lang="ts">
  import { MenuOption } from '@/layouts/types'
  import { OOptionNested } from '.'

  defineOptions({
    name: 'OMenu',
  })

  defineProps<{
    items: MenuOption[]
  }>()

  const emits = defineEmits<{
    (e: 'select', item: MenuOption): void
  }>()

  const handleSelect = (item: MenuOption) => {
    if (!item.disabled) {
      emits('select', item)
    }
  }
</script>

<template>
  <div class="o-menu">
    <!-- <OOptionNested></OOptionNested> -->
  </div>
</template>

<style scoped lang="scss"></style>
