export enum Event {
    JoinRoom = 'join_room',
    CreateRoom = 'create_room',
    RoomData = 'room_data',
    ChangeReady = 'change_ready',
    GameStart = 'game_start',
}

export type JoinRoomDataC = {
    roomID: string
    playerName: string
}

export type JoinRoomDataS = {
    roomID: string
    playerName: string
    gameMode: GameMode
}

export type GameMode = '5p_identity'

export type CreateRoomDataC = {
    creator: string
    gameMode: GameMode
}

export type PlayerReadyStates = Record<string, boolean>

export type RoomData = {
    creator: string
    gameMode: GameMode
    roomID: string
    readyStates: PlayerReadyStates
}

export type ServerListenEventsMap = {
    [Event.CreateRoom]: (data: CreateRoomDataC) => void
    [Event.JoinRoom]: (data: JoinRoomDataC) => void
    [Event.ChangeReady]: (data: {
        roomID: string
        playerName: string
        readyState: boolean
    }) => void
}

export type GameStartData = {}

export type ServerEmitEventsMap = {
    [Event.JoinRoom]: (data: JoinRoomDataS) => void
    [Event.RoomData]: (data: RoomData) => void
    [Event.GameStart]: (data: GameStartData) => void
}
