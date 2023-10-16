import { Server, Socket } from 'socket.io'
import {
    Event,
    ServerEmitEventsMap,
    ServerListenEventsMap,
} from '@thriving/shared/src/network'
import { RoomManager } from '../room/manager'

export function setup(io: Server<ServerListenEventsMap, ServerEmitEventsMap>) {
    io.on('connection', (socket) => {
        console.log('connected client', socket.id)

        socket.on(Event.CPacketJoinRoom, (data) => {
            console.log(`on(${Event.SPacketJoinRoomData}):`, data)
            socket.join(data.roomID)

            const room = RoomManager.getRoom(data.roomID)
            if (typeof room === 'undefined') {
                return
            }

            console.log(`emit to room(${data.roomID}) (${Event.SPacketJoinRoomData}):`, {
                playerName: data.playerName,
                gameMode: room.gameMode,
                roomID: room.id,
            })

            console.log(socket.rooms)

            socket.emit(Event.SPacketJoinRoomData, {
                playerName: data.playerName,
                gameMode: room.gameMode,
                roomID: room.id,
            })

            room.playerJoinOrUnready(data.playerName)
        })

        socket.on(Event.CPacketCreateRoom, (data) => {
            console.log(`on(${Event.CPacketCreateRoom}):`, data)

            const room = RoomManager.createRoom(data)

            socket.join(room.id)

            room.sendRoomData()
        })

        socket.on(Event.CPacketChangeReady, (data) => {
            const room = RoomManager.getRoom(data.roomID)

            if (typeof room === 'undefined') {
                return
            }

            room.changePlayerReadyState(data.playerName, data.readyState)
        })

        socket.on('disconnect', (r) => {
            console.log('disconnected', socket.id, 'reason', r)
        })
    })
}
