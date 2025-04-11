import OOption from './option.vue'
import OOptionNested from './option-nested.vue'
import OOptionGroup from './option-group.vue'
import OMenu from './menu.vue'

export type OOptionInstance = InstanceType<typeof OOption>
export type OOptionNestedInstance = InstanceType<typeof OOptionNested>
export type OOptionGroupInstance = InstanceType<typeof OOptionGroup>
export type OMenu = InstanceType<typeof OMenu>

export { OOption, OOptionNested, OOptionGroup, OMenu }
