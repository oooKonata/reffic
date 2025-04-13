<script setup lang="ts">
  import { ref } from 'vue'

  defineOptions({
    name: 'OOption',
  })

  // simulate active state
  const simActive = ref(false)
</script>

<template>
  <div :class="['o-option', { 'sim-active': simActive }]" @mousedown="simActive = true" @mouseup="simActive = false">
    <div v-if="$slots.left" class="o-option__left">
      <slot name="left" />
    </div>
    <div v-if="$slots.right" class="o-option__right">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .o-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    width: 100%;
    height: 32px;
    padding-left: 8px;
    padding: 0 8px;
    border-radius: 6px;
    color: $o-b60;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    cursor: pointer;
    user-select: none;

    &__left {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;
      // min-width: 0;
    }

    &__right {
      display: flex;
      justify-content: end;
      gap: 4px;
    }

    :deep(*) {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: inherit;
    }

    &:hover {
      background-color: $o-b6;
    }

    &.sim-active {
      background-color: $o-b10 !important;
    }
  }
</style>
