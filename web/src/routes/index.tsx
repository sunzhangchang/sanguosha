// import './index.css'

import { createSignal, type Component } from 'solid-js'
import socket from '../socket'
import { Event } from '@punishing-killing/common'
import { Button } from '../components/button'
import { Input } from '../components/input'
import { useNavigate } from 'solid-start'
import { button, gameTitle, home, item } from './index.css'

const Home: Component = () => {
    const navigate = useNavigate()

    const [playerName, setPlayerName] = createSignal('')

    const createRoom = () => {
        console.log(playerName().trim())
        if (playerName().trim().length > 0) {
            socket.emit(Event.CreateRoom, {
                creator: playerName(),
                gameMode: 'single_1v1',
            })
        }
    }

    socket.on(Event.CreateRoom, (data) => {
        navigate(`/room/${data.roomID}`, {
            state: {
                playerName: playerName(),
                roomData: data,
            },
        })
    })

    return (
        <div class={home}>
            <div class={gameTitle}>Punishing Killing</div>
            <div class={item}>
                <span style={{ 'user-select': 'none' }}>游戏名</span>
                <Input
                    h="4vh"
                    w="18vw"
                    style={{
                        'min-height': '18px',
                        'min-width': '100px',
                    }}
                    onInput={(e) => setPlayerName(e.currentTarget.value)}
                />
            </div>
            <div class={item}>
                <Button class={button} onClick={createRoom}>
                    创建房间
                </Button>
            </div>
            <div class={item}>
                <Button class={button}>加入房间</Button>
            </div>
        </div>
    )
}

export default Home
