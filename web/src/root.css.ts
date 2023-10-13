import { globalFontFace, globalStyle } from '@vanilla-extract/css'

const LXGWWenKai = 'LXGWWenKai'

globalFontFace(LXGWWenKai, {
    src: 'url("/LXGWWenKai-Regular.ttf") format("truetype")',
})

globalStyle('*', {
    fontFamily: `${LXGWWenKai}, consolas`,
})

globalStyle('html', {
    '@media': {
        '(min-width: 1px)': {
            fontSize: '6px',
        },

        '(min-width: 576px)': {
            fontSize: '8px',
        },

        '(min-width: 768px)': {
            fontSize: '10px',
        },

        '(min-width: 1000px)': {
            fontSize: '13px',
        },

        '(min-width: 1600px)': {
            fontSize: '16px',
        },
    },
})

globalStyle('html, body, #root', {
    height: '100%',
    width: '100%',
})

globalStyle('body', {
    margin: '0',
})

globalStyle('a', {
    textDecoration: 'none',
    color: 'black',
})

globalStyle('a:active', {
    color: 'black',
})
