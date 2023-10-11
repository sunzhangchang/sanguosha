import { Component, mergeProps, splitProps } from 'solid-js'

import './input.css'
import { HTMLProps } from '../../style/types'
import { makeStyle } from '../../style/utils'

type InputProps = HTMLProps<
    'input',
    {
        disabled?: boolean
    }
>

const defaultProps: InputProps = {}

export const Input: Component<InputProps> = (props) => {
    const propsWithDefault = mergeProps(defaultProps, props)

    const [local, contentProps, others] = splitProps(
        propsWithDefault,
        ['disabled', 'h', 'w', 'style'],
        [],
    )

    const disabled = () => local.disabled

    return (
        <input
            class="input"
            style={makeStyle({ height: local.h, width: local.w }, local.style)}
            disabled={disabled()}
            {...others}
        />
    )
}

export default Input
