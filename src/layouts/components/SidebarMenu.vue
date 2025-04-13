<script setup lang="ts">
  import OIcon from '@/components/o-icon'
  import { OOption, OOptionGroup, OOptionNested } from '@/components/o-menu'
  import { navArr, pageArr, setArr } from '../mock/sidebarData'
  import { loadStaticResource } from '@/assets'
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useStateStore } from '@/stores/state/useStateStore'

  withDefaults(
    defineProps<{
      sidebarWidth: number
    }>(),
    {
      sidebarWidth: 248,
    }
  )

  const isResizeDivHover = ref(false)
  const { sidebarResizeStart } = storeToRefs(useStateStore())
</script>

<template>
  <div :class="['sidebar', { 'is-resize-div-hover': isResizeDivHover }]" :style="{ width: `${sidebarWidth}px` }">
    <div class="profile">
      <OOption>
        <template #left>
          <OIcon :src="loadStaticResource('/images/profile.jpg')" />
          <div class="info">
            <label>oooKonata ppoi's reffic</label>
            <OIcon :src="loadStaticResource('/icons/sidebar-arrow.svg')" />
          </div>
        </template>
        <template #right>
          <OIcon :src="loadStaticResource('/icons/sidebar-fold.svg')" :size="24" interactive class="sidebar-fold" />
          <OIcon :src="loadStaticResource('/icons/sidebar-create.svg')" :size="24" interactive />
        </template>
      </OOption>
    </div>

    <OOptionGroup class="nav">
      <OOption v-for="(item, index) in navArr" :key="index">
        <template #left>
          <OIcon :src="item.url" />
          <label>{{ item.label }}</label>
        </template>
        <template #right>
          <OIcon :src="loadStaticResource('/icons/sidebar-option.svg')" interactive />
          <OIcon :src="loadStaticResource('/icons/sidebar-add.svg')" interactive />
        </template>
      </OOption>
    </OOptionGroup>

    <div class="scroll-view">
      <OOptionGroup class="fav">
        <template #title>
          <OOption>
            <template #left>
              <label class="title">最爱</label>
            </template>
            <template #right>
              <OIcon :src="loadStaticResource('/icons/sidebar-option.svg')" interactive />
            </template>
          </OOption>
        </template>
        <OOptionNested :data="pageArr">
          <template #default="{ optionData, level }">
            <OOption>
              <template #left>
                <OIcon
                  :src="loadStaticResource('/icons/sidebar-page.svg')"
                  :style="{ marginLeft: `${8 * level}px` }"
                  interactive />
                <label>{{ optionData.label }}</label>
              </template>
              <template #right>
                <OIcon :src="loadStaticResource('/icons/sidebar-option.svg')" interactive />
                <OIcon :src="loadStaticResource('/icons/sidebar-add.svg')" interactive />
              </template>
            </OOption>
          </template>
        </OOptionNested>
      </OOptionGroup>

      <OOptionGroup class="priv">
        <template #title>
          <OOption>
            <template #left>
              <label class="title">私人</label>
            </template>
            <template #right>
              <OIcon :src="loadStaticResource('/icons/sidebar-option.svg')" interactive />
            </template>
          </OOption>
        </template>
        <OOptionNested :data="pageArr">
          <template #default="{ optionData, level }">
            <OOption>
              <template #left>
                <OIcon
                  :src="loadStaticResource('/icons/sidebar-page.svg')"
                  :style="{ marginLeft: `${8 * level}px` }"
                  interactive />
                <label>{{ optionData.label }}</label>
              </template>
              <template #right>
                <OIcon :src="loadStaticResource('/icons/sidebar-option.svg')" interactive />
                <OIcon :src="loadStaticResource('/icons/sidebar-add.svg')" interactive />
              </template>
            </OOption>
          </template>
        </OOptionNested>
      </OOptionGroup>
    </div>

    <OOptionGroup class="set">
      <OOption v-for="(item, index) in setArr" :key="index">
        <template #left>
          <OIcon :src="item.url" />
          <label>{{ item.label }}</label>
        </template>
        <template #right>
          <OIcon :src="loadStaticResource('/icons/sidebar-option.svg')" interactive />
          <OIcon :src="loadStaticResource('/icons/sidebar-add.svg')" interactive />
        </template>
      </OOption>
    </OOptionGroup>
    <div
      class="resize"
      @mouseenter="isResizeDivHover = true"
      @mouseleave="isResizeDivHover = false"
      @mousedown="sidebarResizeStart = true"></div>
  </div>
</template>

<style scoped lang="scss">
  .sidebar {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 248px;
    max-width: 50vw;
    height: 100vh;
    background-color: $o-bg;
    box-shadow: $o-b2 -1px 0 0 0 inset;

    .scroll-view {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
      overflow-y: scroll;
    }

    .profile {
      margin: 8px;
      .info {
        display: flex;
        align-self: center;
      }
      .sidebar-fold {
        display: none;
      }

      :deep(.o-option) {
        padding-right: 4px;
      }

      :deep(.o-option .o-option__right) {
        width: 56px;
      }
    }

    &:hover .sidebar-fold {
      display: flex;
    }

    .nav {
      margin: 0 8px 8px;
    }

    .fav {
      margin: 8px 8px 0;
    }

    .priv {
      margin: 0 8px 8px;
    }

    .set {
      margin: 8px;
    }

    :deep(.o-option-group .o-option .o-option__right) {
      display: none;
    }

    :deep(.o-option-group .o-option:hover .o-option__right) {
      display: flex;
    }

    .resize {
      position: absolute;
      width: 12px;
      height: 100%;
      top: 0;
      right: -6px;
    }
  }

  .is-resize-div-hover {
    box-shadow: $o-b10 -2px 0 0 0 inset;
    cursor: col-resize;
  }
</style>
