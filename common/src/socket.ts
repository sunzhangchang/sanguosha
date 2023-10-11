export enum Event {
    JoinRoom = 'join_room',
    CreateRoom = 'create_room',
}

export type JoinRoomData = { playerName: string; roomID: string }

export type GameMode = 'single_1v1' | 'double_1v1'

export type CreateRoomDataC = {
    creator: string
    gameMode: GameMode
}

export type RoomData = {
    creator: string
    gameMode: GameMode
    roomID: string
}

export type ServerListenEventsMap = {
    [Event.CreateRoom]: (data: CreateRoomDataC) => void
    [Event.JoinRoom]: (data: JoinRoomData) => void
}

export type ServerEmitEventsMap = {
    [Event.CreateRoom]: (data: RoomData) => void
    [Event.JoinRoom]: (data: string) => void
}
