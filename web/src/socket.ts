import {
    RoomData,
    Event,
    ServerEmitEventsMap,
    ServerListenEventsMap,
} from '@thriving/shared'
import { Socket, io } from 'socket.io-client'

const socket = io('ws://localhost:3001', {
    extraHeaders: {
        origin: 'http://localhost:3001',
    },
}) as Socket<ServerEmitEventsMap, ServerListenEventsMap>

socket.on('connect', () => {
    console.log('connected server ws://localhost:3001')
})

const son = socket.on.bind(socket)
const semit = socket.emit.bind(socket)

socket.on = (ev, cb) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    return son(ev, ((data: any) => {
        console.log(`on(${ev}):`, data)
        cb(data)
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    }) as any)
}

socket.emit = (ev, ...data) => {
    console.log(`emit(${ev}):`, data)
    return semit(ev, ...data)
}

export default socket
