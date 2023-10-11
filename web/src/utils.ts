export function entries<K extends string | number | symbol, V>(
    obj: Record<K, V> | Partial<Record<K, V>>,
) {
    return Object.entries(obj) as [K, V][]
}
