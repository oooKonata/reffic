<script setup lang="ts">
  import OIcon from '@/components/o-icon'
  import { OOption, OOptionGroup, OOptionNested } from '@/components/o-menu'
  import { navArr, pageArr, setArr } from '../mock/sidebarData'
  import { loadStaticResource } from '@/assets'
  import NestedOption from '../../components/o-menu/option-nested.vue'
  import { SidebarOption } from '../type'
</script>

<template>
  <div class="sidebar">
    <OOptionGroup class="sidebar__group">
      <!-- 标题插槽 -->
      <template #title>
        <OOption>
          <template #left>
            <label class="title">标题</label>
          </template>
          <template #right>
            <OIcon :src="loadStaticResource('/icons/sidebar-option.svg')" interactive />
          </template>
        </OOption>
      </template>

      <!-- 默认插槽 -->
      <OOption v-for="(item, index) in navArr" :key="index">
        <template #left>
          <OIcon :src="item.url" interactive />
          <label>{{ item.label }}</label>
        </template>
        <template #right>
          <OIcon :src="loadStaticResource('/icons/sidebar-option.svg')" interactive />
          <OIcon :src="loadStaticResource('/icons/sidebar-add.svg')" interactive />
        </template>
      </OOption>
    </OOptionGroup>

    <OOptionGroup class="sidebar__group">
      <OOptionNested :data="pageArr">
        <template #default="{ option }">
          <OOption>
            <template #left>
              <OIcon :src="loadStaticResource('/icons/sidebar-page.svg')" interactive />
              <label>{{ option.label }}</label>
            </template>
            <template #right>
              <OIcon :src="loadStaticResource('/icons/sidebar-option.svg')" interactive />
              <OIcon :src="loadStaticResource('/icons/sidebar-add.svg')" interactive />
            </template>
          </OOption>
        </template>
      </OOptionNested>
    </OOptionGroup>

    <OOptionGroup class="sidebar__group">
      <!-- 默认插槽 -->
      <OOption v-for="(item, index) in setArr" :key="index">
        <template #left>
          <OIcon :src="item.url" interactive />
          <label>{{ item.label }}</label>
        </template>
        <template #right>
          <OIcon :src="loadStaticResource('/icons/sidebar-option.svg')" interactive />
          <OIcon :src="loadStaticResource('/icons/sidebar-add.svg')" interactive />
        </template>
      </OOption>
    </OOptionGroup>
  </div>
</template>

<style scoped lang="scss">
  .sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 248px;
    height: 100vh;
    background-color: beige;

    &__group {
      margin: 8px;
    }
  }
</style>
