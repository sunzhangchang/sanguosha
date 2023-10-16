import { RoomData } from '@thriving/shared'
import { createStore } from 'solid-js/store'

export const [playerData, setPlayerData] = createStore<{
    playerName: string
}>({
    playerName: '',
})

export const [roomData, setRoomData] = createStore<RoomData>({
    creator: '',
    gameMode: '5p_identity',
    roomID: '',
    readyStates: {},
})
