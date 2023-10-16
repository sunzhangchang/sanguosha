// import './index.css'

import { createSignal, type Component, Show, createMemo } from 'solid-js'
import socket from '../socket'
import { Event } from '@thriving/shared'
import { Button } from '../components/button'
import { Input } from '../components/input'
import { useNavigate } from 'solid-start'
import { button, gameTitle, home, item } from './index.css'
import { createInputMask } from '@solid-primitives/input-mask'
import { playerData, roomData, setPlayerData, setRoomData } from '../store'
import { playerNameMask } from '../utils'

const Home: Component = () => {
    const navigate = useNavigate()

    const playerName = createMemo(() => playerData.playerName)

    const createRoom = () => {
        console.log(playerName().trim())
        if (playerName().trim().length > 0) {
            socket.emit(Event.CreateRoom, {
                creator: playerName(),
                gameMode: '5p_identity',
            })
        }
    }

    const roomIDMask = createInputMask('999999')

    const [roomID, setRoomID] = createSignal('')

    const joinRoom = () => {
        console.log(playerName().trim())
        if (playerName().trim().length > 0 && /[\d]{6}/.test(roomID())) {
            socket.emit(Event.JoinRoom, {
                playerName: playerName(),
                roomID: roomID(),
            })
        }
    }

    socket.on(Event.JoinRoom, (data) => {
        navigate(`/room/${roomID()}`, {
            state: data,
        })
    })

    socket.on(Event.RoomData, (data) => {
        if (roomData.roomID.length === 0) {
            setRoomData(data)
            navigate(`/room/${data.roomID}`, {
                state: {
                    playerName: playerName(),
                },
            })
        } else {
            setRoomData(data)
        }
    })

    return (
        <div class={home}>
            <div class={gameTitle}>蒸蒸日上</div>
            <div class={item}>
                <span style={{ 'user-select': 'none' }}>游戏名</span>
                <Input
                    h="4vh"
                    w="18vw"
                    style={{
                        'min-height': '18px',
                        'min-width': '100px',
                    }}
                    onInput={(e) => {
                        setPlayerData('playerName', playerNameMask(e))
                    }}
                />
            </div>
            <div class={item}>
                <Button
                    class={button}
                    disabled={() => playerName().length === 0}
                    onClick={createRoom}
                >
                    创建房间
                </Button>
            </div>
            <div class={item}>
                <span style={{ 'user-select': 'none' }}>房间号</span>
                <Input
                    h="4vh"
                    w="18vw"
                    style={{
                        'min-height': '18px',
                        'min-width': '100px',
                    }}
                    onInput={(e) => setRoomID(roomIDMask(e))}
                    onPaste={(e) => setRoomID(roomIDMask(e))}
                />
            </div>
            <div class={item}>
                <Button
                    disabled={() =>
                        playerName().length === 0 || roomID().length < 6
                    }
                    class={button}
                    onClick={joinRoom}
                >
                    加入房间
                </Button>
            </div>
        </div>
    )
}

export default Home
