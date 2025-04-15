<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useLayoutStore } from '@/stores/state/useLayoutStore'
  import MainSidebar from './components/MainSidebar.vue'
  import { ref } from 'vue'
  import ContextMenu from './components/ContextMenu.vue'

  const { isSidebarResizing } = storeToRefs(useLayoutStore())
  const sidebarWidth = ref(248)
</script>

<template>
  <div
    class="layout"
    @mousemove="sidebarWidth = isSidebarResizing ? $event.clientX : sidebarWidth"
    @mouseup="isSidebarResizing = false">
    <MainSidebar :sidebarWidth="sidebarWidth" />
  </div>
  <div class="overlay">
    <ContextMenu />
  </div>
</template>

<style scoped lang="scss">
  // .layout {
  // }
</style>
