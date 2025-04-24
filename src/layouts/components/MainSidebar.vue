<script setup lang="ts">
  import OIcon from '@/components/o-icon'
  import { OOption, OOptionGroup, OOptionGroupInstance, OOptionNested } from '@/components/o-menu'
  import { favArr, navArr, pageArr, setArr } from '../mock/sidebarData'
  import { loadStaticResource } from '@/assets'
  import { onMounted, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useStateStore } from '@/stores/sidebar/useStateStore'
  import { throttle } from 'lodash-es'
  import { SidebarOption } from '../types'
  import { v4 as uuidv4 } from 'uuid'
  import { MENU_TYPE } from '@/enums'
  import { useRouter } from 'vue-router'

  withDefaults(
    defineProps<{
      sidebarWidth: number
    }>(),
    {
      sidebarWidth: 248,
    }
  )

  const { isSidebarResizing, sidebarMenuContext, orderFav, orderPriv } = storeToRefs(useStateStore())

  const favToggle = ref(true)
  const privToggle = ref(true)

  const isOnFav = ref(false)
  const isOnPriv = ref(false)

  const isResizeDivHover = ref(false)

  const showDividerTop = ref(false)
  const showDividerBottom = ref(false)

  const activeId = ref('home')
  const hoverId = ref('')

  const scrollViewContentRef = ref<HTMLElement | null>(null)
  const navRef = ref<OOptionGroupInstance | null>(null)
  const setRef = ref<OOptionGroupInstance | null>(null)

  const handleScroll = throttle(
    () => {
      if (!scrollViewContentRef.value || !navRef.value || !setRef.value) return
      const { top, bottom } = scrollViewContentRef.value!.getBoundingClientRect()
      const navBottom = navRef.value?.$el.getBoundingClientRect().bottom
      const setTop = setRef.value?.$el.getBoundingClientRect().top
      showDividerTop.value = top < navBottom ? true : false
      showDividerBottom.value = bottom > setTop ? true : false
    },
    100,
    { leading: false, trailing: true }
  )

  const handleMore = (context: { menuType: MENU_TYPE; context?: SidebarOption }, event: MouseEvent) => {
    sidebarMenuContext.value = {
      ...context,
      position: {
        x: event.clientX,
        y: event.clientY,
      },
    }
  }

  const handleAdd = (data?: SidebarOption) => {
    if (data) {
      data.children!.unshift({
        id: uuidv4(),
        label: '新页面',
        icon: loadStaticResource('/icons/sidebar-page.svg'),
        collapse: false,
        meta: {
          fav: false,
          collapseFav: false,
        },
        children: [],
      })
    } else {
      pageArr.value.unshift({
        id: uuidv4(),
        label: '新页面',
        icon: loadStaticResource('/icons/sidebar-page.svg'),
        collapse: false,
        meta: {
          fav: false,
          collapseFav: false,
        },
        children: [],
      })
    }
  }

  const router = useRouter()
  const handleRoute = (sidebarOptionData: SidebarOption) => {
    activeId.value = sidebarOptionData.id
    if (sidebarOptionData.id.startsWith('page')) {
      router.push({ name: 'page', params: { id: sidebarOptionData.id } })
    } else {
      router.push({ name: sidebarOptionData.id })
    }
  }

  onMounted(() => {
    handleScroll()
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

    <div class="scroll-view" @scroll="handleScroll">
      <div ref="scrollViewContentRef" class="scroll-view__content">
        <OOptionGroup
          v-if="favArr.length"
          class="fav"
          :style="{ order: orderFav }"
          @mouseenter="isOnFav = true"
          @mouseleave="isOnFav = false">
          <template #title>
            <OOption @click="favToggle = !favToggle">
              <template #left>
                <label class="title">最爱</label>
              </template>
              <template #right>
                <OIcon
                  :src="loadStaticResource('/icons/sidebar-more.svg')"
                  interactive
                  @click="handleMore({ menuType: MENU_TYPE.FAV_TITLE }, $event)" />
              </template>
            </OOption>
          </template>
          <OOptionNested v-if="favToggle" :source="favArr" mark>
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
                      v-if="hoverId === optionData.id && optionData.children!.length && isOnFav"
                      :class="[
                        { 'is-expand': isOnFav && !optionData.meta?.collapseFav },
                        { 'is-collapse': isOnFav && optionData.meta?.collapseFav },
                      ]"
                      :src="loadStaticResource('/icons/sidebar-arrow.svg')"
                      interactive
                      @click="optionData.meta!.collapseFav = !optionData.meta!.collapseFav" />
                    <OIcon v-else :src="loadStaticResource('/icons/sidebar-page-empty.svg')" />
                  </div>
                  <label>{{ optionData.label }}</label>
                </template>
                <template #right>
                  <OIcon
                    :src="loadStaticResource('/icons/sidebar-more.svg')"
                    interactive
                    @click="handleMore({ menuType: MENU_TYPE.THE_PAGE, context: optionData }, $event)" />
                  <OIcon
                    :src="loadStaticResource('/icons/sidebar-add.svg')"
                    interactive
                    @click="handleAdd(optionData)" />
                </template>
              </OOption>
            </template>
          </OOptionNested>
        </OOptionGroup>

        <OOptionGroup
          class="priv"
          :style="{ order: orderPriv }"
          @mouseenter="isOnPriv = true"
          @mouseleave="isOnPriv = false">
          <template #title>
            <OOption @click="privToggle = !privToggle">
              <template #left>
                <label class="title">私人</label>
              </template>
              <template #right>
                <OIcon
                  :src="loadStaticResource('/icons/sidebar-more.svg')"
                  interactive
                  @click="handleMore({ menuType: MENU_TYPE.PRIV_TITLE }, $event)" />
                <OIcon :src="loadStaticResource('/icons/sidebar-add.svg')" interactive @click="handleAdd()" />
              </template>
            </OOption>
          </template>
          <OOptionNested v-if="privToggle" :source="pageArr">
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
                      v-if="hoverId === optionData.id && optionData.children!.length && isOnPriv"
                      :class="[
                        { 'is-expand': isOnPriv && !optionData.collapse },
                        { 'is-collapse': isOnPriv && optionData.collapse },
                      ]"
                      :src="loadStaticResource('/icons/sidebar-arrow.svg')"
                      interactive
                      @click="optionData.collapse = !optionData.collapse" />
                    <OIcon v-else :src="loadStaticResource('/icons/sidebar-page-empty.svg')" />
                  </div>
                  <label>{{ optionData.label }}</label>
                </template>
                <template #right>
                  <OIcon
                    :src="loadStaticResource('/icons/sidebar-more.svg')"
                    interactive
                    @click="handleMore({ menuType: MENU_TYPE.THE_PAGE, context: optionData }, $event)" />
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

    :deep(.o-option__left) {
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
