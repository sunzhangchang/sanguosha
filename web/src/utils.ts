import { createInputMask } from '@solid-primitives/input-mask'

export function entries<K extends string | number | symbol, V>(
    obj: Record<K, V> | Partial<Record<K, V>>,
) {
    return Object.entries(obj) as [K, V][]
}

export const playerNameMask = createInputMask([
    /([\da-zA-Z]|[^\x00-\xff]){0,16}/,
])
