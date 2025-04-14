export interface OptionBase {
  id: string
  label: string
  url: string
}
export interface SidebarOption extends OptionBase {
  fav: boolean
  fold: boolean
  child: SidebarOption[]
}

export interface MenuOption extends OptionBase {
  tip?: string
  disable?: boolean
}
