export interface MenuOption {
  id: string
  label: string
  icon?: string
  url?: string
  order?: boolean
  external?: boolean
  target?: '_blank' | '_self' | '_parent' | '_top'
  tip?: string
  visible?: boolean
  disabled?: boolean
  collapse?: boolean
  meta?: Record<string, any>
  children?: MenuOption[]
}
