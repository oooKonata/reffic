<script setup lang="ts">
  import OIcon from '@/components/o-icon'
  import { OOption, OOptionGroup, OOptionNested } from '@/components/o-menu'
  import { favArr, navArr, pageArr, setArr } from '../mock/sidebarData'
  import { loadStaticResource } from '@/assets'
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useLayoutStore } from '@/stores/state/useLayoutStore'
  import { throttle } from 'lodash-es'
  import { SidebarOption } from '../type'
  import { v4 as uuidv4 } from 'uuid'

  withDefaults(
    defineProps<{
      sidebarWidth: number
    }>(),
    {
      sidebarWidth: 248,
    }
  )

  const { sidebarResizeStart, ActionMenuContext, mousePisition, orderFav, orderPriv } = storeToRefs(useLayoutStore())

  const isResizeDivHover = ref(false)
  const showDividerTop = ref(false)
  const showDividerBottom = ref(false)

  const optionActiveId = ref('home')
  const optionHoverId = ref('')

  const handleSrcollView = throttle(
    () => {
      const { top, bottom } = document.querySelector('.scroll-view__content')!.getBoundingClientRect()
      const navBottom = document.querySelector('.nav')!.getBoundingClientRect().bottom
      const setTop = document.querySelector('.set')!.getBoundingClientRect().top
      showDividerTop.value = top < navBottom ? true : false
      showDividerBottom.value = bottom > setTop ? true : false
    },
    100,
    { leading: false, trailing: true }
  )

  const handleMore = (id: string, event: MouseEvent) => {
    ActionMenuContext.value = id
    mousePisition.value = {
      x: event.clientX,
      y: event.clientY,
    }
  }

  const handleAdd = (data?: SidebarOption) => {
    if (data) {
      data.child.unshift({
        id: uuidv4(),
        label: '新建页面',
        url: loadStaticResource('/icons/sidebar-page.svg'),
        fav: false,
        fold: false,
        child: [],
      })
    } else {
      pageArr.value.unshift({
        id: uuidv4(),
        label: '新建页面',
        url: loadStaticResource('/icons/sidebar-page.svg'),
        fav: false,
        fold: false,
        child: [],
      })
    }
  }

  const handleRoute = (id: string) => {
    optionActiveId.value = id
  }
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

    <OOptionGroup :class="['nav', { 'show-divider-top': showDividerTop }]">
      <OOption
        v-for="(item, index) in navArr"
        :id="item.id"
        :key="index"
        :activeId="optionActiveId"
        @click="handleRoute(item.id)">
        <template #left>
          <OIcon :src="item.url" />
          <label>{{ item.label }}</label>
        </template>
      </OOption>
    </OOptionGroup>

    <div class="scroll-view" @scroll="handleSrcollView">
      <div class="scroll-view__content">
        <OOptionGroup v-if="favArr" class="fav" :style="{ order: orderFav }">
          <template #title>
            <OOption>
              <template #left>
                <label class="title">最爱</label>
              </template>
              <template #right>
                <OIcon
                  :src="loadStaticResource('/icons/sidebar-more.svg')"
                  interactive
                  @click="handleMore('fav', $event)" />
              </template>
            </OOption>
          </template>
          <OOptionNested :data="favArr">
            <template #default="{ optionData, level }">
              <OOption
                :id="optionData.id"
                :activeId="optionActiveId"
                @click="handleRoute(optionData.id)"
                @option-mouseenter="id => (optionHoverId = id!)"
                @option-mouseleave="id => (optionHoverId = '')">
                <template #left>
                  <div :style="{ marginLeft: `${8 * level}px` }">
                    <OIcon
                      v-if="optionHoverId === optionData.id && optionData.child.length"
                      :class="[{ 'is-unfold': !optionData.fold }, { 'is-fold': optionData.fold }]"
                      :src="loadStaticResource('/icons/sidebar-arrow.svg')"
                      interactive
                      @click="optionData.fold = !optionData.fold" />
                    <OIcon v-else :src="loadStaticResource('/icons/sidebar-page.svg')" interactive />
                  </div>
                  <label>{{ optionData.label }}</label>
                </template>
                <template #right>
                  <OIcon
                    :src="loadStaticResource('/icons/sidebar-more.svg')"
                    interactive
                    @click="handleMore(optionData.id, $event)" />
                  <OIcon
                    :src="loadStaticResource('/icons/sidebar-add.svg')"
                    interactive
                    @click="handleAdd(optionData)" />
                </template>
              </OOption>
            </template>
          </OOptionNested>
        </OOptionGroup>

        <OOptionGroup class="priv" :style="{ order: orderPriv }">
          <template #title>
            <OOption>
              <template #left>
                <label class="title">私人</label>
              </template>
              <template #right>
                <OIcon
                  :src="loadStaticResource('/icons/sidebar-more.svg')"
                  interactive
                  @click="handleMore('priv', $event)" />
                <OIcon :src="loadStaticResource('/icons/sidebar-add.svg')" interactive @click="handleAdd()" />
              </template>
            </OOption>
          </template>
          <OOptionNested :data="pageArr">
            <template #default="{ optionData, level }">
              <OOption
                :id="optionData.id"
                :activeId="optionActiveId"
                @click="handleRoute(optionData.id)"
                @option-mouseenter="id => (optionHoverId = id!)"
                @option-mouseleave="id => (optionHoverId = '')">
                <template #left>
                  <div :style="{ marginLeft: `${8 * level}px` }">
                    <OIcon
                      v-if="optionHoverId === optionData.id && optionData.child.length"
                      :class="[{ 'is-unfold': !optionData.fold }, { 'is-fold': optionData.fold }]"
                      :src="loadStaticResource('/icons/sidebar-arrow.svg')"
                      interactive
                      @click="optionData.fold = !optionData.fold" />
                    <OIcon v-else :src="loadStaticResource('/icons/sidebar-page.svg')" interactive />
                  </div>
                  <label>{{ optionData.label }}</label>
                </template>
                <template #right>
                  <OIcon
                    :src="loadStaticResource('/icons/sidebar-more.svg')"
                    interactive
                    @click="handleMore(optionData.id, $event)" />
                  <OIcon
                    :src="loadStaticResource('/icons/sidebar-add.svg')"
                    interactive
                    @click="handleAdd(optionData)" />
                </template>
              </OOption>
            </template>
          </OOptionNested>
        </OOptionGroup>
      </div>
    </div>

    <OOptionGroup :class="['set', { 'show-divider-bottom': showDividerBottom }]">
      <OOption
        v-for="(item, index) in setArr"
        :id="item.id"
        :key="index"
        :activeId="optionActiveId"
        @click="handleRoute(item.id)">
        <template #left>
          <OIcon :src="item.url" />
          <label>{{ item.label }}</label>
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

    .profile {
      margin: 8px;
      .info {
        display: flex;
        align-self: center;
      }
      .sidebar-fold {
        display: none;
        opacity: 0.5;
        &:hover {
          opacity: 1;
        }
      }

      :deep(.o-option) {
        padding-right: 4px;
      }

      :deep(.o-option .o-option__right) {
        width: 56px;
      }
    }

    .scroll-view {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      &__content {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 8px;
        .is-unfold {
          :deep(img) {
            transform: rotate(0deg);
            transition: 0.2s ease-in-out;
          }
        }
        .is-fold {
          :deep(img) {
            transform: rotate(-90deg);
            transition: 0.2s ease-in-out;
          }
        }
      }
    }

    &:hover .sidebar-fold {
      display: flex;
    }

    .nav {
      padding: 0 8px 8px;
      cursor: pointer;
    }

    .fav {
      cursor: pointer;
    }

    .priv {
      cursor: pointer;
    }

    .set {
      padding: 8px;
      cursor: pointer;
    }

    .show-divider-top {
      box-shadow: $o-b6 0px -1px 0px 0px inset;
    }

    .show-divider-bottom {
      box-shadow: $o-b6 0px 1px 0px 0px inset;
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
