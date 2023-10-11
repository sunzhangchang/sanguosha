import './room.css'

import { Event, RoomData } from '@punishing-killing/common'
import { Component, Show } from 'solid-js'
import { Button } from '../../components/button'
import { createStore } from 'solid-js/store'
import socket from '../../socket'
import { useLocation, useParams } from 'solid-start'
import { A, Location } from '@solidjs/router'
import { actionItem, infoContainer, infoItem, room } from './room.css'

const Room: Component = () => {
    const params = useParams<{ room: string }>()
    console.log(params)

    const location = useLocation() as Location<{
        playerName: string
        roomData: RoomData
    }>

    console.log(location)

    const playerName = location.state?.playerName
    const roomData = location.state?.roomData

    const [isReady, setIsReady] = createStore<Record<string, boolean>>({})

    if (typeof playerName !== 'undefined') {
        setIsReady(playerName, true)
    }

    socket.on(Event.JoinRoom, (joiningPlayer) => {
        setIsReady(joiningPlayer, joiningPlayer === playerName)
    })

    return (
        <div class={room}>
            <Show
                when={
                    typeof playerName !== 'undefined' &&
                    typeof roomData !== 'undefined'
                }
                fallback={
                    <div>
                        <div class="error">似乎出现了一点问题</div>
                        <A href="/">返回主界面</A>
                    </div>
                }
            >
                <div class={infoContainer}>
                    <div class={infoItem}>
                        <span>游戏名：</span>
                        {playerName}
                    </div>
                    <div class={infoItem}>
                        <span>房主：</span>
                        {roomData?.creator}
                    </div>
                    <div class={infoItem}>
                        <span>房间号：</span>
                        {roomData?.roomID}
                    </div>
                </div>
                <div class={actionItem}>
                    <Show
                        when={playerName === roomData?.creator}
                        fallback={
                            <Button>
                                {isReady[playerName ?? '']
                                    ? '准备'
                                    : '取消准备'}
                            </Button>
                        }
                    >
                        <Button
                            h="5vh"
                            w="10vw"
                            disabled={() =>
                                !Object.entries(isReady).every(([k, v]) => v)
                            }
                        >
                            开始游戏
                        </Button>
                    </Show>
                </div>
                <div class={actionItem}>
                    <Button h="5vh" w="10vw">
                        <A href="/">返回主界面</A>
                    </Button>
                </div>
            </Show>
        </div>
    )
}

export default Room
