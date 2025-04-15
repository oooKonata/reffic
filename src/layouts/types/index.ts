import { MenuOption } from '@/components/o-menu/types'

// export interface MenuOption {
//   id: string
//   label: string
//   icon: string
//   tip?: string
//   fav?: boolean
//   disabled?: boolean
//   collapse?: boolean
//   children?: MenuOption[]
// }

export interface SidebarOption extends MenuOption {
  meta?: {
    fav?: boolean
  }
}
