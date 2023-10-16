import {
    Event,
    GameMode,
    PlayerReadyStates,
    ServerEmitEventsMap,
} from '@thriving/shared/src/network'
import { Player } from '../game/player'
import { Game } from '../game'
import io from '..'

type ExtractTail<T extends unknown[]> = T extends [infer _, ...infer Tail]
    ? Tail
    : never

export class Room {
    readonly id: string
    readonly creator: string
    readonly gameMode: GameMode

    players: Player[] = []

    #game: Game

    #playerReadyStates: PlayerReadyStates = {}

    get playerReadyStates() {
        return this.#playerReadyStates
    }

    constructor({
        id,
        creator,
        gameMode,
    }: {
        id: string
        creator: string
        gameMode: GameMode
    }) {
        this.id = id
        this.creator = creator
        this.gameMode = gameMode

        this.playerJoinOrReady(creator)

        this.#game = new Game()
    }

    #ioEmit<Ev extends Parameters<typeof io.emit>[0]>(
        ev: Ev,
        ...args: Parameters<ServerEmitEventsMap[Ev]>
    ) {
        console.log(`emit(${ev}):`, ...args)
        io.to(this.id).emit(ev, ...args)
    }

    sendRoomData() {
        this.#ioEmit(Event.SPacketRoomData, {
            data: {
                creator: this.creator,
                gameMode: this.gameMode,
                readyStates: this.playerReadyStates,
                roomID: this.id,
            }
        })
    }

    changePlayerReadyState(name: string, state: boolean) {
        this.#playerReadyStates[name] = state
        this.sendRoomData()
    }

    playerJoinOrUnready(name: string) {
        this.changePlayerReadyState(name, false)
    }

    playerJoinOrReady(name: string) {
        this.changePlayerReadyState(name, true)
    }
}
