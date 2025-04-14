import { ref } from 'vue'
import { OptionBase, SidebarOption } from '../type'
import { loadStaticResource } from '@/assets'
import { v4 as uuidv4 } from 'uuid'

const navArr = ref<OptionBase[]>([
  { id: 'search', label: '搜索', url: loadStaticResource('/icons/sidebar-search.svg') },
  { id: 'chat', label: '聊天', url: loadStaticResource('/icons/sidebar-chat.svg') },
  { id: 'home', label: '首页', url: loadStaticResource('/icons/sidebar-home.svg') },
  { id: 'file', label: '文件', url: loadStaticResource('/icons/sidebar-file.svg') },
])

const setArr = ref<OptionBase[]>([
  { id: 'set', label: '设置', url: loadStaticResource('/icons/sidebar-set.svg') },
  { id: 'template', label: '模版', url: loadStaticResource('/icons/sidebar-template.svg') },
  { id: 'trash', label: '垃圾箱', url: loadStaticResource('/icons/sidebar-trash.svg') },
  { id: 'share', label: '分享', url: loadStaticResource('/icons/sidebar-share.svg') },
])

const favArr = ref<SidebarOption[]>()

const pageArr = ref<SidebarOption[]>([
  {
    id: uuidv4(),
    label: '新页面a0',
    url: loadStaticResource('/icons/sidebar-page.svg'),
    fav: false,
    fold: false,
    child: [
      {
        id: uuidv4(),
        label: '新页面a1',
        url: loadStaticResource('/icons/sidebar-page.svg'),
        fav: false,
        fold: false,
        child: [
          {
            id: uuidv4(),
            label: '新页面a2',
            url: loadStaticResource('/icons/sidebar-page.svg'),
            fav: false,
            fold: false,
            child: [
              {
                id: uuidv4(),
                label: '新页面a3',
                url: loadStaticResource('/icons/sidebar-page.svg'),
                fav: false,
                fold: false,
                child: [
                  {
                    id: uuidv4(),
                    label: '新页面a4',
                    url: loadStaticResource('/icons/sidebar-page.svg'),
                    fav: false,
                    fold: false,
                    child: [],
                  },
                ],
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
    url: loadStaticResource('/icons/sidebar-page.svg'),
    fav: false,
    fold: false,
    child: [
      {
        id: uuidv4(),
        label: '新页面b1',
        url: loadStaticResource('/icons/sidebar-page.svg'),
        fav: false,
        fold: false,
        child: [],
      },
    ],
  },
])

export { navArr, setArr, favArr, pageArr }
