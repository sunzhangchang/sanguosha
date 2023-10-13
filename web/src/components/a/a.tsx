import { Component, mergeProps, splitProps } from 'solid-js'
import { A as SA } from 'solid-start'
import { HTMLProps } from '../../style/types'

type AProps = HTMLProps<
    'a',
    {
        href: string
    }
>

const defaultProps: AProps = {
    href: 'javascript:void()',
    style: {
        'text-decoration': 'none',
        'font-size': 'inherit',
        color: 'black',
    },
}

export const A: Component<AProps> = (props) => {
    const propsWithDefault: AProps = mergeProps(defaultProps, props)

    const [local, styles, others] = splitProps(
        propsWithDefault,
        ['h', 'w'],
        ['style', 'class', 'classList', 'className'],
    )

    return (
        <SA
            style={styles.style}
            class={styles.class || styles.className}
            classList={styles.classList}
            {...others}
        />
    )
}
