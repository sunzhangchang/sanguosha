import { JSX } from "solid-js";
import { entries } from "../utils";

export function makeStyle(...args: (string | JSX.CSSProperties | undefined)[]): string {
    let res = ''

    for (const i of args) {
        if (typeof i === 'undefined') {
            continue
        }
        if (typeof i === 'string') {
            res += i.trim()
        } else {
            res += entries(i).map(([k, v]) => `${k}:${v};`).join('')
        }
        if (!res.endsWith(';')) {
            res += ';'
        }
    }
    return res
}
