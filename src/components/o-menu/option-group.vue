<script setup lang="ts">
  defineOptions({
    name: 'OOptionGroup',
  })
</script>

<template>
  <div class="o-option-group">
    <div v-if="$slots.title" class="o-option-group__title">
      <slot name="title" />
    </div>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
  .o-option-group {
    display: flex;
    flex-direction: column;
    gap: 1px;

    &__title :deep(*) {
      color: $o-b60;
      font-size: 12px;
      font-weight: 500;
    }
  }
</style>
