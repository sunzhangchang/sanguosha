import { style } from '@vanilla-extract/css'

export const home = style({
    display: 'flex',
    flexDirection: 'column',
})

export const gameTitle = style({
    alignItems: 'center',
    margin: '18vh auto 10vh auto',
    fontSize: '1.8rem',
    userSelect: 'none',
})

export const item = style({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    padding: '2px',
    margin: '5vh',

    fontSize: '1.4rem',
})

export const button = style({
    height: '5vh',
    width: '10vw',

    minHeight: '30px',
    minWidth: '80px',
})
