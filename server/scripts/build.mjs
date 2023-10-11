// @ts-check

import { spawn } from 'child_process'
import { build, context } from 'esbuild'
import { readFileSync, writeFileSync } from 'fs'
import { kill } from 'process'

let minify = false

const dev = process.argv[2]

if (dev === 'dev') {
    minify = false
}

let serverProcess

/**
 * @type {import('esbuild').Plugin}
 */
const onEndPlugin = {
    name: 'on-end',
    setup: (build) => {
        console.log('rebuilding...')

        build.onEnd((results) => {
            // console.log(results)
            console.log('rebuilt')

            if (results.errors.length === 0) {
                if (serverProcess) {
                    const pid = serverProcess.pid
                    kill(pid)
                    console.log('killed process', pid)
                }
                serverProcess = spawn('node', ['./dist/server/index.js'], {
                    cwd: '../',
                    stdio: 'inherit',
                })
                console.log('create process', serverProcess.pid)
            }
        })
    },
}

const ctx = await context({
    entryPoints: ['./src/index.ts'],
    bundle: true,
    platform: 'node',
    minify,
    outdir: '../dist/server',
    plugins: [onEndPlugin],
})

console.log('watching')

await ctx.watch()
