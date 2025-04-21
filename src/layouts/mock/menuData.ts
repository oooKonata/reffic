import { loadStaticResource } from '@/assets'
import { MenuOption } from '@/components/o-menu/types'
import { MENU_TYPE } from '@/enums'
import { ref } from 'vue'

const menuData = ref<Record<MENU_TYPE, MenuOption[][]>>({
  [MENU_TYPE.FAV_TITLE]: [
    [
      {
        id: 'move-up',
        label: '向上移动',
        icon: loadStaticResource('/icons/menu-move-up.svg'),
      },
      {
        id: 'move-down',
        label: '向下移动',
        icon: loadStaticResource('/icons/menu-move-down.svg'),
        disabled: true,
      },
    ],
  ],
  [MENU_TYPE.PRIV_TITLE]: [
    [
      {
        id: 'order',
        label: '排序',
        icon: loadStaticResource('/icons/menu-order.svg'),
        children: [
          { id: 'manual', label: '手动', meta: { selected: true } },
          { id: 'last-edited', label: '上次编辑', meta: { selected: false } },
        ],
      },
      {
        id: 'display',
        label: '显示',
        icon: loadStaticResource('/icons/menu-display.svg'),
        children: [
          { id: '5', label: '5个项目', meta: { selected: false } },
          { id: '10', label: '10个项目', meta: { selected: false } },
          { id: '15', label: '15个项目', meta: { selected: false } },
          { id: '20', label: '20个项目', meta: { selected: false } },
          { id: 'all', label: '全部', meta: { selected: true } },
        ],
      },
      {
        id: 'move-up',
        label: '向上移动',
        icon: loadStaticResource('/icons/menu-move-up.svg'),
      },
      {
        id: 'move-down',
        label: '向下移动',
        icon: loadStaticResource('/icons/menu-move-down.svg'),
        disabled: true,
      },
    ],
  ],
  [MENU_TYPE.FAV_PAGE]: [
    [
      {
        id: 'remove-from-fav',
        label: '从最爱中移除',
        icon: loadStaticResource('/icons/menu-fav-remove.svg'),
      },
    ],
    [
      { id: 'copy-link', label: '拷贝链接', icon: loadStaticResource('/icons/menu-copy-link.svg') },
      {
        id: 'duplicate',
        label: '创建副本',
        icon: loadStaticResource('/icons/menu-duplicate.svg'),
        tip: '⌘D',
      },
      { id: 'rename', label: '重命名', icon: loadStaticResource('/icons/menu-rename.svg'), tip: '⌘⇧R' },
      {
        id: 'move-to',
        label: '移动到',
        icon: loadStaticResource('/icons/menu-move-to.svg'),
        tip: '⌘⇧P',
      },
      {
        id: 'move-to-trash',
        label: '移至垃圾箱',
        icon: loadStaticResource('/icons/menu-move-to-trash.svg'),
        meta: { warn: true, warnIcon: loadStaticResource('/icons/menu-move-to-trash-warn.svg') },
      },
    ],
    [
      {
        id: 'open-in-new-tab',
        label: '在新选项卡中打卡',
        icon: loadStaticResource('/icons/menu-open-in-new-tab.svg'),
        tip: '⌘⇧↵',
      },
      {
        id: 'open-in-side-preview',
        label: '在侧边预览中打开',
        icon: loadStaticResource('/icons/menu-open-in-side-preview.svg'),
        tip: '⌥Click',
      },
    ],
  ],
  [MENU_TYPE.PRIV_PAGE]: [
    [
      {
        id: 'move-to-fav',
        label: '添加到最爱',
        icon: loadStaticResource('/icons/menu-fav.svg'),
      },
    ],
    [
      { id: 'copy-link', label: '拷贝链接', icon: loadStaticResource('/icons/menu-copy-link.svg') },
      {
        id: 'duplicate',
        label: '创建副本',
        icon: loadStaticResource('/icons/menu-duplicate.svg'),
        tip: '⌘D',
      },
      { id: 'rename', label: '重命名', icon: loadStaticResource('/icons/menu-rename.svg'), tip: '⌘⇧R' },
      {
        id: 'move-to',
        label: '移动到',
        icon: loadStaticResource('/icons/menu-move-to.svg'),
        tip: '⌘⇧P',
      },
      {
        id: 'move-to-trash',
        label: '移至垃圾箱',
        icon: loadStaticResource('/icons/menu-move-to-trash.svg'),
        meta: { warn: true, warnIcon: loadStaticResource('/icons/menu-move-to-trash-warn.svg') },
      },
    ],
    [
      {
        id: 'open-in-new-tab',
        label: '在新选项卡中打卡',
        icon: loadStaticResource('/icons/menu-open-in-new-tab.svg'),
        tip: '⌘⇧↵',
      },
      {
        id: 'open-in-side-preview',
        label: '在侧边预览中打开',
        icon: loadStaticResource('/icons/menu-open-in-side-preview.svg'),
        tip: '⌥Click',
      },
    ],
  ],
})

export { menuData }
