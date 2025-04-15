import { InjectionKey, Ref } from 'vue'

export const depthKey: InjectionKey<Ref<number>> = Symbol('nested-depth')
