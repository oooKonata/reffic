<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useLayoutStore } from '@/stores/state/useLayoutStore'
  import MainSidebar from './components/MainSidebar.vue'
  import { ref, watch } from 'vue'
  import SidebarMenu from './components/SidebarMenu.vue'

  const { isSidebarResizing, sidebarMenuContext } = storeToRefs(useLayoutStore())

  const sidebarWidth = ref(248)
  const isOnSidebarMenu = ref(false)
</script>

<template>
  <div
    class="layout"
    @mousemove="sidebarWidth = isSidebarResizing ? $event.clientX : sidebarWidth"
    @mouseup="isSidebarResizing = false">
    <MainSidebar :sidebarWidth="sidebarWidth" />
    <div class="content"></div>
    <div
      v-if="sidebarMenuContext"
      class="overlay"
      @click="sidebarMenuContext = isOnSidebarMenu ? sidebarMenuContext : undefined">
      <SidebarMenu @mouseenter="isOnSidebarMenu = true" @mouseleave="isOnSidebarMenu = false" />
    </div>
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
      background-color: $o-b8;
    }
  }
</style>
