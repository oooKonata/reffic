export const isUndefined = (val: unknown): val is undefined => typeof val === 'undefined'
export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean'
export const isNumber = (val: unknown): val is number => typeof val === 'number'
export const isString = (val: unknown): val is string => typeof val === 'string'

export const isStringNumber = (val: unknown): boolean => (isString(val) ? !Number.isNaN(Number(val)) : false)
