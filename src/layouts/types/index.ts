import { MenuOption } from '@/components/o-menu/types'
export interface SidebarOption extends MenuOption {
  meta?: {
    fav?: boolean
    collapseFav?: boolean
    collapsePriv?: boolean
  }
}
