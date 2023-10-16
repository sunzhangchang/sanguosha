import { GameMode, RoomData } from "."

export type SPacketJoinRoomData = {
    roomID: string
    playerName: string
    gameMode: GameMode
}

export type SPacketRoomData = {
    data: RoomData
}
