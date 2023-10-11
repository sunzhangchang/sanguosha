import { Component, createContext, splitProps, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { HTMLProps } from '../../style/types'

type InputGroupProps = HTMLProps<'div', object>

export type InputGroupState = {
    hasLeftElement: boolean
    hasRightElement: boolean
    hasLeftAddon: boolean
    hasRightAddon: boolean
}

export interface InputGroupContextValue {
    state: InputGroupState
    setHasLeftElement: (value: boolean) => void
    setHasRightElement: (value: boolean) => void
    setHasLeftAddon: (value: boolean) => void
    setHasRightAddon: (value: boolean) => void
}

const InputGroupContext = createContext<InputGroupContextValue>()

export function useInputGroupContext() {
    return useContext(InputGroupContext)
}

export const InputGroup: Component<InputGroupProps> = (props) => {
    const [local, others] = splitProps(props, [])

    const [state, setState] = createStore<InputGroupState>({
        hasLeftAddon: false,
        hasLeftElement: false,
        hasRightAddon: false,
        hasRightElement: false,
    })

    const context: InputGroupContextValue = {
        state,
        setHasLeftAddon: (value) => setState('hasLeftAddon', value),
        setHasLeftElement: (value) => setState('hasLeftElement', value),
        setHasRightAddon: (value) => setState('hasRightAddon', value),
        setHasRightElement: (value) => setState('hasRightElement', value),
    }

    return (
        <InputGroupContext.Provider value={context}>
            <div {...others} />
        </InputGroupContext.Provider>
    )
}

export default InputGroup
