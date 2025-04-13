<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useStateStore } from '@/stores/state/useStateStore'
  import SidebarMenu from './components/SidebarMenu.vue'
  import { ref } from 'vue'

  const { sidebarResizeStart } = storeToRefs(useStateStore())
  const sidebarWidth = ref(248)
</script>

<template>
  <div
    class="layout"
    @mousemove="sidebarWidth = sidebarResizeStart ? $event.clientX : sidebarWidth"
    @mouseup="sidebarResizeStart = false">
    <SidebarMenu :sidebarWidth="sidebarWidth" />
  </div>
</template>

<style scoped lang="scss">
  // .layout {
  // }
</style>
