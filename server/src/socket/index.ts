import { Server, Socket } from 'socket.io'
import {
    CreateRoomDataC,
    Event,
    JoinRoomData,
    ServerEmitEventsMap,
    ServerListenEventsMap,
} from '@punishing-killing/common'
import { RoomManager } from '../room/manager'

const handleJoinRoom = (
    socket: Socket,
    data: { roomID: string; playerName: string },
) => {
    socket.join(data.roomID)

    const room = RoomManager.getRoom(data.roomID)
    if (typeof room === 'undefined') {
        return
    }

    console.log(
        `emit to room(${data.roomID}) (${Event.JoinRoom}):`,
        data.playerName,
    )

    socket.to(data.roomID).emit(Event.JoinRoom, data.playerName)
}

export function setup(io: Server<ServerListenEventsMap, ServerEmitEventsMap>) {
    io.on('connection', (socket) => {
        console.log('connected client', socket.id)

        socket.on(Event.JoinRoom, (data) => {
            handleJoinRoom(socket, data)
        })

        socket.on(Event.CreateRoom, (data: CreateRoomDataC) => {
            console.log('on(create_room):', data)

            const room = RoomManager.createRoom(data)

            handleJoinRoom(socket, {
                playerName: data.creator,
                roomID: room.id,
            })

            console.log(`emit(${Event.CreateRoom}):`, {
                creator: room.creator,
                gameMode: room.gameMode,
                roomID: room.id,
            })

            socket.emit(Event.CreateRoom, {
                creator: room.creator,
                gameMode: room.gameMode,
                roomID: room.id,
            })
        })

        socket.on('disconnect', (r) => {
            console.log('disconnected', socket.id, 'reason', r)
        })
    })
}
