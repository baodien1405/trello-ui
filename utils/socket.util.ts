import { io } from 'socket.io-client'

export const socketIoInstance = io(process.env.NEXT_PUBLIC_API_ENDPOINT)
