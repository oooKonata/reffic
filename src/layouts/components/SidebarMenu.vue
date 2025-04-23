<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed, ref } from 'vue'
  import { useStateStore } from '@/stores/sidebar/useStateStore'
  import { MenuOption } from '@/components/o-menu/types'
  import { OMenu } from '@/components/o-menu'
  import { MENU_TYPE } from '@/enums'
  import { favArr } from '../mock/sidebarData'
  import { loadStaticResource } from '@/assets'
  import { useMenuStore } from '@/stores/sidebar/useMenuStore'
  import { SidebarOption } from '../types'

  const { sidebarMenuContext, orderFav, orderPriv } = storeToRefs(useStateStore())
  const { selectedOrder, displayCount } = storeToRefs(useMenuStore())
  const menuType = computed((): MENU_TYPE => sidebarMenuContext.value?.menuType!)
  const context = computed((): SidebarOption => sidebarMenuContext.value?.context!)
  const isFav = computed((): boolean => sidebarMenuContext.value?.context?.meta?.fav!)

  const menuData = ref<Record<MENU_TYPE, MenuOption[][]>>({
    [MENU_TYPE.FAV_TITLE]: [
      [
        {
          id: 'move-up',
          label: '向上移动',
          icon: loadStaticResource('/icons/menu-move-up.svg'),
          visible: true,
          disabled: orderFav.value < orderPriv.value ? true : false,
        },
        {
          id: 'move-down',
          label: '向下移动',
          icon: loadStaticResource('/icons/menu-move-down.svg'),
          visible: true,
          disabled: orderFav.value > orderPriv.value ? true : false,
        },
      ],
    ],
    [MENU_TYPE.PRIV_TITLE]: [
      [
        {
          id: 'order',
          label: '排序',
          icon: loadStaticResource('/icons/menu-order.svg'),
          visible: true,
          children: [
            {
              id: 'manual',
              label: '手动',
              visible: true,
              meta: { selected: computed(() => selectedOrder.value === 'manual') },
            },
            {
              id: 'last-edited',
              label: '上次编辑',
              visible: true,
              meta: { selected: computed(() => selectedOrder.value === 'last-edited') },
            },
          ],
        },
        {
          id: 'display',
          label: '显示',
          icon: loadStaticResource('/icons/menu-display.svg'),
          visible: true,
          children: [
            {
              id: '5',
              label: '5个项目',
              visible: true,
              meta: { selected: computed(() => displayCount.value === '5') },
            },
            {
              id: '10',
              label: '10个项目',
              visible: true,
              meta: { selected: computed(() => displayCount.value === '10') },
            },
            {
              id: '15',
              label: '15个项目',
              visible: true,
              meta: { selected: computed(() => displayCount.value === '15') },
            },
            {
              id: '20',
              label: '20个项目',
              visible: true,
              meta: { selected: computed(() => displayCount.value === '20') },
            },
            {
              id: 'all',
              label: '全部',
              visible: true,
              meta: { selected: computed(() => displayCount.value === 'all') },
            },
          ],
        },
        {
          id: 'move-up',
          label: '向上移动',
          icon: loadStaticResource('/icons/menu-move-up.svg'),
          visible: favArr.value.length ? true : false,
          disabled: orderPriv.value < orderFav.value ? true : false,
        },
        {
          id: 'move-down',
          label: '向下移动',
          icon: loadStaticResource('/icons/menu-move-down.svg'),
          visible: favArr.value.length ? true : false,
          disabled: orderPriv.value > orderFav.value ? true : false,
        },
      ],
    ],

    [MENU_TYPE.THE_PAGE]: [
      [
        {
          id: isFav.value ? 'remove-from-fav' : 'move-to-fav',
          label: isFav.value ? '从最爱中移除' : '添加到最爱',
          icon: isFav.value
            ? loadStaticResource('/icons/menu-fav-remove.svg')
            : loadStaticResource('/icons/menu-fav.svg'),
          visible: true,
        },
      ],
      [
        { id: 'copy-link', label: '拷贝链接', icon: loadStaticResource('/icons/menu-copy-link.svg') },
        {
          id: 'duplicate',
          label: '创建副本',
          icon: loadStaticResource('/icons/menu-duplicate.svg'),
          visible: true,
          tip: '⌘D',
        },
        { id: 'rename', label: '重命名', icon: loadStaticResource('/icons/menu-rename.svg'), tip: '⌘⇧R' },
        {
          id: 'move-to',
          label: '移动到',
          icon: loadStaticResource('/icons/menu-move-to.svg'),
          visible: true,
          tip: '⌘⇧P',
        },
        {
          id: 'move-to-trash',
          label: '移至垃圾箱',
          icon: loadStaticResource('/icons/menu-move-to-trash.svg'),
          visible: true,
          meta: { warn: true, warnIcon: loadStaticResource('/icons/menu-move-to-trash-warn.svg') },
        },
      ],
      [
        {
          id: 'open-in-new-tab',
          label: '在新选项卡中打卡',
          icon: loadStaticResource('/icons/menu-open-in-new-tab.svg'),
          visible: true,
          tip: '⌘⇧↵',
        },
        {
          id: 'open-in-side-preview',
          label: '在侧边预览中打开',
          icon: loadStaticResource('/icons/menu-open-in-side-preview.svg'),
          visible: true,
          tip: '⌥Click',
        },
      ],
    ],
  })

  const menuOptions = menuData.value[menuType.value]

  const handleSelect = (data: MenuOption, parentData: MenuOption) => {
    // 处理排序方式
    if (['manual', 'last-edited'].includes(data.id)) {
      selectedOrder.value = data.id
    }
    // 处理显示数量
    if (['5', '10', '15', '20', 'all'].includes(data.id)) {
      displayCount.value = data.id
    }
    // 分组排序
    if (data.id === 'move-up' || data.id === 'move-down') {
      ;[orderFav.value, orderPriv.value] = [orderPriv.value, orderFav.value]
    }

    if (data.id === 'move-to-fav') {
      context.value.meta!.fav = true
      context.value.meta!.collapseFav = false
      favArr.value!.unshift(context.value)
    }
    if (data.id === 'remove-from-fav') {
      context.value.meta!.fav = false
      favArr.value.splice(favArr.value.findIndex(item => item.id === context.value.id))
    }

    // 初始化上下文
    sidebarMenuContext.value = undefined
  }
</script>

<template>
  <div class="context-menu">
    <OMenu :source="menuOptions" :position="sidebarMenuContext?.position!" @option-select="handleSelect" />
  </div>
</template>

<style scoped lang="scss"></style>
