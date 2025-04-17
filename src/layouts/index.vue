<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useLayoutStore } from '@/stores/state/useLayoutStore'
  import MainSidebar from './components/MainSidebar.vue'
  import { ref } from 'vue'
  import { OMenu } from '@/components/o-menu'

  const { isSidebarResizing } = storeToRefs(useLayoutStore())
  const sidebarWidth = ref(248)
</script>

<template>
  <div
    class="layout"
    @mousemove="sidebarWidth = isSidebarResizing ? $event.clientX : sidebarWidth"
    @mouseup="isSidebarResizing = false">
    <MainSidebar :sidebarWidth="sidebarWidth" />
    <div class="content"></div>
    <!-- <div class="overlay">
      <OMenu />
    </div> -->
  </div>
</template>

<style scoped lang="scss">
  .layout {
    display: flex;
    position: relative;
    overflow: hidden;

    .content {
      flex: 1;
      overflow: hidden;
      background-color: #fff;
    }

    .overlay {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
</style>
