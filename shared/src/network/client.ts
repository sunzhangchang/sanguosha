import { GameMode } from "."

export type CPacketJoinProom = {
    roomID: string
    playerName: string
}

export type CPacketCreateRoom = {
    creator: string
    gameMode: GameMode
}

export type CPacketChangeReady = {
    roomID: string
    playerName: string
    readyState: boolean
}