import { Component, ComponentProps, JSX, ParentProps } from 'solid-js'

export type ElementType<Props = object> =
    | keyof JSX.IntrinsicElements
    | Component<Props>

export type OverrideProps<Source = object, Override = object> = Omit<
    Source,
    keyof Override
> &
    Override

type SizeProps = Partial<{
    h: string
    w: string
}>

export type StyleProps = SizeProps

export type ClassProps = {
    class?: string
    className?: string
    classList?: Record<string, boolean>
}

export type HTMLProps<C extends ElementType, Additon = object> = OverrideProps<
    ParentProps<ComponentProps<C>>,
    StyleProps & ClassProps & Additon & { as?: C }
>
