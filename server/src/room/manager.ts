import { randomInt } from 'crypto'
import { GameMode } from '@thriving/shared'
import { Room } from '.'

function toRoomIDString(id: number): string {
    return id.toString().padStart(6, '0')
}

export namespace RoomManager {
    const rooms: Record<string, Room> = {}

    function genrateRoomID(): string {
        let roomID = ''

        while (true) {
            const high = randomInt(0, 9999) * 100
            let low = randomInt(0, 99)

            roomID = toRoomIDString(high + low)

            let cnt = 1
            while (typeof rooms[roomID] !== 'undefined') {
                if (cnt > 100) {
                    break
                }
                low = (low + 1) % 100
                cnt++
                roomID = toRoomIDString(high + low)
            }

            if (cnt <= 100) {
                break
            }
        }

        return roomID
    }

    export function createRoom({
        creator,
        gameMode,
    }: {
        creator: string
        gameMode: GameMode
    }): Room {
        const id = genrateRoomID()
        rooms[id] = new Room({ id, creator, gameMode })

        return rooms[id]
    }

    export function getRoom(id: string | number): Room | undefined {
        return rooms[typeof id === 'number' ? toRoomIDString(id) : id]
    }
}
