/* eslint-disable no-undef */
import io from 'socket.io-client'

export const SOCKET_EVENT_JOIN_CODEBLOCK = 'join-codeblock'
export const SOCKET_EVENT_LEAVE_CODEBLOCK = 'leave-codeblock'
export const SOCKET_EVENT_CODE_CHANGE = 'code-change'
export const SOCKET_EVENT_CODE_UPDATE = 'code-update'
export const SOCKET_REDIRECT_TO_LOBBY = 'redirect-to-lobby'
export const SOCKET_GET_STUDENTS_COUNT = 'get-students-count'
export const SOCKET_STUDENTS_COUNT = 'students-count'
export const SOCKET_EVENT_SET_ROLE = 'set-role';

const BASE_URL = (process.env.NODE_ENV === 'production') ? '' : '//localhost:5000'

export const socketService = createSocketService()

socketService.setup()

function createSocketService() {
    var socket = null
    const socketService = {
        setup() {
            socket = io(BASE_URL)
        },
        on(eventName, cb) {
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
