import { Component, mergeProps, splitProps } from 'solid-js'

import './button.css'
import { ElementType, HTMLProps } from '../../style/types'
import { makeStyle } from '../../style/utils'

type ButtonProps = HTMLProps<
    'button',
    {
        disabled?: () => boolean
    }
>

const defaultProps: ButtonProps = {
    type: 'button',
}

export const Button: Component<ButtonProps> = (props) => {
    const propsWithDefault: ButtonProps = mergeProps(defaultProps, props)

    const [local, contentProps, others] = splitProps(
        propsWithDefault,
        ['disabled', 'h', 'w', 'style', 'class'],
        ['children'],
    )

    const disabled = () => (local.disabled ? local.disabled() : undefined)

    return (
        <button
            class={`btn ${local.class}`}
            style={makeStyle({ height: local.h, width: local.w }, local.style)}
            type="button"
            disabled={disabled()}
            // data-disabled={disabled() ? '' : undefined}
            {...others}
        >
            {contentProps.children}
        </button>
    )
}

export default Button
