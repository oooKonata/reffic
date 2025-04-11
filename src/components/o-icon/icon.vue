<script setup lang="ts">
  import { loadStaticResource } from '@/assets'
  import { addUnit } from '@/utils/addUnit'

  defineOptions({
    name: 'OIcon',
  })

  withDefaults(
    defineProps<{
      src: string
      size?: number | string
      hotArea?: (number | string)[]
      borderRadius?: number | string
      interactive?: boolean
    }>(),
    {
      size: 20,
      borderRadius: 4,
    }
  )
</script>

<template>
  <div
    class="o-icon"
    :data-interactive="interactive"
    :style="{
      width: addUnit(hotArea ? hotArea[0] : size),
      height: addUnit(hotArea ? hotArea[1] : size),
      borderRadius: addUnit(borderRadius),
    }"
    @mousedown.stop
    @click.stop>
    <img :src="src" :style="{ width: addUnit(size), height: addUnit(size) }" />
  </div>
</template>

<style scoped lang="scss">
  .o-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    &[data-interactive='true'] {
      cursor: pointer;
    }
    &[data-interactive='true']:hover {
      background-color: $o-b6;
    }
    &[data-interactive='true']:active {
      background-color: $o-b10;
    }
  }
</style>
