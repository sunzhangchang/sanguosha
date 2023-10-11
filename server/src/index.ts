import { createServer } from 'http'
import Koa from 'koa'
import { Server } from 'socket.io'
import { setup } from './socket'
import cors from '@koa/cors'

const app = new Koa()

const httpServer = createServer(app.callback())

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
})

console.log('server listening at http://localhost:3001')

app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
    }),
)

setup(io)

httpServer.listen(3001)
