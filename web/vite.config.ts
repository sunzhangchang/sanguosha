import { defineConfig } from 'vite'
import Solid from 'solid-start/vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export default defineConfig({
    plugins: [
        /*
        Uncomment the following line to enable solid-devtools.
        For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
        */
        // devtools(),
        Solid({
            ssr: false,
        }),
        vanillaExtractPlugin(),
    ],
    server: {
        port: 3000,
    },
    build: {
        target: 'esnext',
        outDir: '../web/dist',
    },
})
