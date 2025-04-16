<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { MenuOption } from './types'

  defineOptions({
    name: 'OOption',
  })

  const props = defineProps<{
    source?: MenuOption
    activeId?: string
  }>()

  const emits = defineEmits<{
    (e: 'option-mouseenter', optionData?: MenuOption): void
    (e: 'option-mouseleave'): void
  }>()

  const simActive = ref(false)
  const simHover = ref(false)

  const isActive = computed(() => (props.source?.id && props.activeId ? props.activeId === props.source.id : false))

  const handleMouseEnter = () => {
    simHover.value = true
    emits('option-mouseenter', props.source)
  }
  const handleMouseLeave = () => {
    simHover.value = false
    emits('option-mouseleave')
  }
</script>

<template>
  <div
    :class="['o-option', { 'sim-active': simActive }, { 'sim-hover': simHover }, { 'is-active': isActive }]"
    @mousedown="simActive = true"
    @mouseup="simActive = false"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave">
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
    color: $o-b80;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
    user-select: none;

    // background-color: cyan;

    &__left {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;
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

    &.sim-hover {
      background-color: $o-b6;
    }

    &.sim-active {
      background-color: $o-b10 !important;
    }

    &.is-active {
      background-color: $o-b6;
      :deep(*) {
        color: $o-b80;
      }
    }
  }
</style>
