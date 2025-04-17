<script setup lang="ts">
  import OIcon from '@/components/o-icon'
  import { OOption, OOptionGroup, OOptionNested } from '@/components/o-menu'
  import { favArr, navArr, pageArr, setArr } from '../mock/sidebarData'
  import { loadStaticResource } from '@/assets'
  import { onMounted, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useLayoutStore } from '@/stores/state/useLayoutStore'
  import { throttle } from 'lodash-es'
  import { SidebarOption } from '../types'
  import { v4 as uuidv4 } from 'uuid'

  withDefaults(
    defineProps<{
      sidebarWidth: number
    }>(),
    {
      sidebarWidth: 248,
    }
  )

  const { isSidebarResizing, MenuContext, mousePisition, orderFav, orderPriv } = storeToRefs(useLayoutStore())

  const isResizeDivHover = ref(false)

  const showDividerTop = ref(false)
  const showDividerBottom = ref(false)

  const activeId = ref('home')
  const hoverId = ref('')

  const scrollViewContentRef = ref<HTMLElement | null>(null)
  // const navRef = ref<HTMLElement | null>(null)
  const setRef = ref<HTMLElement | null>(null)
  const handleSrcollView = throttle(
    () => {
      const { top, bottom } = scrollViewContentRef.value!.getBoundingClientRect()
      // const { top, bottom } = document.querySelector('.scroll-view__content')!.getBoundingClientRect()
      const navBottom = navRef.value!.getBoundingClientRect().bottom
      const setTop = setRef.value!.getBoundingClientRect().top
      showDividerTop.value = top < navBottom ? true : false
      showDividerBottom.value = bottom > setTop ? true : false
    },
    100,
    { leading: false, trailing: true }
  )

  const handleMore = (data: string | SidebarOption, event: MouseEvent) => {
    MenuContext.value = data
    mousePisition.value = {
      x: event.clientX,
      y: event.clientY,
    }
  }

  const handleAdd = (data?: SidebarOption) => {
    if (data) {
      data.children!.unshift({
        id: uuidv4(),
        label: '新建页面',
        icon: loadStaticResource('/icons/sidebar-page.svg'),
        collapse: false,
        meta: {
          fav: false,
        },
        children: [],
      })
    } else {
      pageArr.value.unshift({
        id: uuidv4(),
        label: '新建页面',
        icon: loadStaticResource('/icons/sidebar-page.svg'),
        collapse: false,
        meta: {
          fav: false,
        },
        children: [],
      })
    }
  }

  const handleRoute = (data: SidebarOption) => {
    activeId.value = data.id
  }

  const navRef = ref()
  onMounted(() => {
    handleSrcollView()
    console.log('navRef11111 ', navRef.value)
    console.log('scrollViewContentRef.value: ', scrollViewContentRef.value)
  })
</script>

<template>
  <div
    :class="['main-sidebar', { 'is-resizing': isResizeDivHover || isSidebarResizing }]"
    :style="{ width: `${sidebarWidth}px` }">
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
          <OIcon
            :src="loadStaticResource('/icons/sidebar-collapse.svg')"
            :size="24"
            interactive
            class="sidebar-collapse" />
          <OIcon :src="loadStaticResource('/icons/sidebar-create.svg')" :size="24" interactive />
        </template>
      </OOption>
    </div>

    <OOptionGroup ref="navRef" :class="['nav', { 'show-divider-top': showDividerTop }]">
      <OOption
        v-for="(item, index) in navArr"
        :key="index"
        :source="item"
        :activeId="activeId"
        @click="handleRoute(item)">
        <template #left>
          <OIcon :src="item.icon!" />
          <label>{{ item.label }}</label>
        </template>
      </OOption>
    </OOptionGroup>

    <div class="scroll-view" @scroll="handleSrcollView">
      <div ref="scrollViewContentRef" class="scroll-view__content">
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
          <OOptionNested :source="favArr">
            <template #default="{ optionData, depth }">
              <OOption
                :source="optionData"
                :activeId="activeId"
                @click="handleRoute(optionData)"
                @option-mouseenter="data => (hoverId = data?.id!)"
                @option-mouseleave="() => (hoverId = '')">
                <template #left>
                  <div :style="{ marginLeft: `${8 * depth}px` }">
                    <OIcon
                      v-if="hoverId === optionData.id && optionData.children!.length"
                      :class="[{ 'is-expand': !optionData.collapse }, { 'is-collapse': optionData.collapse }]"
                      :src="loadStaticResource('/icons/sidebar-arrow.svg')"
                      interactive
                      @click="optionData.collapse = !optionData.collapse" />
                    <OIcon v-else :src="loadStaticResource('/icons/sidebar-page.svg')" interactive />
                  </div>
                  <label>{{ optionData.label }}</label>
                </template>
                <template #right>
                  <OIcon
                    :src="loadStaticResource('/icons/sidebar-more.svg')"
                    interactive
                    @click="handleMore(optionData, $event)" />
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
          <OOptionNested :source="pageArr">
            <template #default="{ optionData, depth }">
              <OOption
                :source="optionData"
                :activeId="activeId"
                @click="handleRoute(optionData)"
                @option-mouseenter="data => (hoverId = data?.id!)"
                @option-mouseleave="() => (hoverId = '')">
                <template #left>
                  <div :style="{ marginLeft: `${8 * depth}px` }">
                    <OIcon
                      v-if="hoverId === optionData.id && optionData.children!.length"
                      :class="[{ 'is-expand': !optionData.collapse }, { 'is-collapse': optionData.collapse }]"
                      :src="loadStaticResource('/icons/sidebar-arrow.svg')"
                      interactive
                      @click="optionData.collapse = !optionData.collapse" />
                    <OIcon v-else :src="loadStaticResource('/icons/sidebar-page.svg')" interactive />
                  </div>
                  <label>{{ optionData.label }}</label>
                </template>
                <template #right>
                  <OIcon
                    :src="loadStaticResource('/icons/sidebar-more.svg')"
                    interactive
                    @click="handleMore(optionData, $event)" />
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

    <OOptionGroup ref="setRef" :class="['set', { 'show-divider-bottom': showDividerBottom }]">
      <OOption
        v-for="(item, index) in setArr"
        :key="index"
        :source="item"
        :activeId="activeId"
        @click="handleRoute(item)">
        <template #left>
          <OIcon :src="item.icon!" />
          <label>{{ item.label }}</label>
        </template>
      </OOption>
    </OOptionGroup>
    <div
      class="resize"
      @mouseenter="isResizeDivHover = true"
      @mouseleave="isResizeDivHover = false"
      @mousedown="isSidebarResizing = true"></div>
  </div>
</template>

<style scoped lang="scss">
  .main-sidebar {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 248px;
    max-width: 50vw;
    height: 100vh;
    background-color: $o-bg;
    box-shadow: $o-b2 -1px 0 0 0 inset;

    :deep(*) {
      color: $o-b60;
      font-weight: 500;
    }

    .profile {
      margin: 8px;
      .info {
        display: flex;
        align-self: center;
        label {
          color: $o-b80;
        }
      }
      .sidebar-collapse {
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
        .is-expand {
          :deep(img) {
            transform: rotate(0deg);
            transition: 0.1s ease-in-out;
          }
        }
        .is-collapse {
          :deep(img) {
            transform: rotate(-90deg);
            transition: 0.1s ease-in-out;
          }
        }
      }
    }

    &:hover .sidebar-collapse {
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

  .is-resizing {
    box-shadow: $o-b10 -2px 0 0 0 inset;
    cursor: col-resize;
  }
</style>
