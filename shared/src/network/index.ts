import { CPacketChangeReady, CPacketCreateRoom, CPacketJoinProom } from "./client"
import { SPacketJoinRoomData, SPacketRoomData } from "./server"

export enum Event {
    SPacketJoinRoomData = 's_join_room_data',
    SPacketRoomData = 's_room_data',
    SPacketGameState = 's_game_state',

    CPacketJoinRoom = 'c_join_room',
    CPacketCreateRoom = 'c_create_room',
    CPacketChangeReady = 'c_change_ready',
    // GameStart = 'game_start',
}

export type PlayerReadyStates = Record<string, boolean>

export type GameMode = '5p_identity'

export type RoomData = {
    creator: string
    gameMode: GameMode
    roomID: string
    readyStates: PlayerReadyStates
}

export type ServerEmitEventsMap = {
    [Event.SPacketJoinRoomData]: (data: SPacketJoinRoomData) => void
    [Event.SPacketRoomData]: (data: SPacketRoomData) => void
    // [Event.GameStart]: (data: SRoomData) => void
}

export type ServerListenEventsMap = {
    [Event.CPacketCreateRoom]: (data: CPacketCreateRoom) => void
    [Event.CPacketJoinRoom]: (data: CPacketJoinProom) => void
    [Event.CPacketChangeReady]: (data: CPacketChangeReady) => void
}