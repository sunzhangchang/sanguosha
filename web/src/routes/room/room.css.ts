import { style } from '@vanilla-extract/css'

export const room = style({
    display: 'flex',
    flexDirection: 'column',
})

export const infoContainer = style({
    display: 'flex',
    justifyContent: 'center',

    margin: '4px',
    padding: '2px',

    fontSize: '2.4vh',

    alignItems: 'center',
    height: '15vh',
})

export const infoItem = style({
    margin: '8px',
    padding: '2px',
})

export const actionItem = style({
    display: 'flex',
    justifyContent: 'center',

    margin: '4px',
    padding: '2px',

    fontSize: '2.8vh',

    alignItems: 'center',
    height: '15vh',
})

export const actionButton = style({
    height: '5vh',
    width: '10vw',

    minHeight: '30px',
    minWidth: '80px',
})

export const readyList = style({
    display: 'flex',

    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
})
