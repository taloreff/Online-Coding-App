/* eslint-disable no-undef */
import io from 'socket.io-client'

export const SOCKET_EVENT_JOIN_CODEBLOCK = 'join-codeblock'
export const SOCKET_EVENT_LEAVE_CODEBLOCK = 'leave-codeblock'
export const SOCKET_EVENT_CODE_CHANGE = 'code-change'
export const SOCKET_REDIRECT_TO_LOBBY = 'redirect-to-lobby'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/codeblocks'
    : '//localhost:5000/api/codeblocks';

export const socketService = createSocketService()

socketService.setup()

function createSocketService() {
    var socket = null
    const socketService = {
        setup() {
            socket = io(baseUrl)
        },
        on(eventName, cb) {
            console.log(eventName)
            socket.on(eventName, cb)
        },
        off(eventName, cb = null) {
            if (!socket) return;
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },
        emit(eventName, data) {
            socket.emit(eventName, data)
        },
        terminate() {
            socket = null
        },

    }
    return socketService
}
