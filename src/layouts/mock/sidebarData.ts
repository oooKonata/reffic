import { ref } from 'vue'
import { loadStaticResource } from '@/assets'
import { v4 as uuidv4 } from 'uuid'
import { SidebarOption } from '../types'

const navArr = ref<SidebarOption[]>([
  { id: 'search', label: '搜索', icon: loadStaticResource('/icons/sidebar-search.svg') },
  { id: 'chat', label: '聊天', icon: loadStaticResource('/icons/sidebar-chat.svg') },
  { id: 'home', label: '首页', icon: loadStaticResource('/icons/sidebar-home.svg') },
  { id: 'file', label: '文件', icon: loadStaticResource('/icons/sidebar-file.svg') },
])

const setArr = ref<SidebarOption[]>([
  { id: 'set', label: '设置', icon: loadStaticResource('/icons/sidebar-set.svg') },
  { id: 'template', label: '模版', icon: loadStaticResource('/icons/sidebar-template.svg') },
  { id: 'trash', label: '垃圾箱', icon: loadStaticResource('/icons/sidebar-trash.svg') },
  { id: 'share', label: '分享', icon: loadStaticResource('/icons/sidebar-share.svg') },
])

const favArr = ref<SidebarOption[]>([])

const pageArr = ref<SidebarOption[]>([
  {
    id: uuidv4(),
    label: '新页面a0',
    icon: loadStaticResource('/icons/sidebar-page.svg'),
    collapse: false,
    meta: {
      fav: false,
      collapseFav: false,
    },
    children: [
      {
        id: uuidv4(),
        label: '新页面a1',
        icon: loadStaticResource('/icons/sidebar-page.svg'),
        collapse: false,
        meta: {
          fav: false,
          collapseFav: false,
        },
        children: [
          {
            id: uuidv4(),
            label: '新页面a2',
            icon: loadStaticResource('/icons/sidebar-page.svg'),
            collapse: false,
            meta: {
              fav: false,
              collapseFav: false,
            },
            children: [
              {
                id: uuidv4(),
                label: '新页面a3',
                icon: loadStaticResource('/icons/sidebar-page.svg'),
                collapse: false,
                meta: {
                  fav: false,
                  collapseFav: false,
                },
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    collapse: false,
    id: uuidv4(),
    label: '新页面b0',
    icon: loadStaticResource('/icons/sidebar-page.svg'),
    meta: {
      fav: false,
      collapseFav: false,
    },
    children: [
      {
        id: uuidv4(),
        label: '新页面b1',
        icon: loadStaticResource('/icons/sidebar-page.svg'),
        meta: {
          fav: false,
          collapseFav: false,
        },
        children: [
          {
            id: uuidv4(),
            label: '新页面b1',
            icon: loadStaticResource('/icons/sidebar-page.svg'),
            collapse: false,
            meta: {
              fav: false,
              collapseFav: false,
            },
            children: [
              {
                id: uuidv4(),
                label: '新页面b1',
                icon: loadStaticResource('/icons/sidebar-page.svg'),
                meta: {
                  fav: false,
                  collapseFav: false,
                },
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    label: '新页面b0',
    icon: loadStaticResource('/icons/sidebar-page.svg'),
    meta: {
      fav: false,
      collapseFav: false,
    },
    children: [
      {
        id: uuidv4(),
        label: '新页面b1',
        icon: loadStaticResource('/icons/sidebar-page.svg'),
        meta: {
          fav: false,
          collapseFav: false,
        },
        children: [],
      },
    ],
  },
])

export { navArr, setArr, favArr, pageArr }
