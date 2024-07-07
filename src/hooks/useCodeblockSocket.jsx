import { useEffect, useState } from 'react';
import { socketService, SOCKET_EVENT_JOIN_CODEBLOCK, SOCKET_EVENT_LEAVE_CODEBLOCK, SOCKET_EVENT_CODE_CHANGE, SOCKET_EVENT_CODE_UPDATE, SOCKET_REDIRECT_TO_LOBBY, SOCKET_GET_STUDENTS_COUNT, SOCKET_STUDENTS_COUNT, SOCKET_EVENT_SET_ROLE } from '../services/socket.service';

export function useCodeblockSocket(codeblockId) {
    const [userRole, setUserRole] = useState('Student');
    const [studentCount, setStudentCount] = useState(0);
    const [showRedirectModal, setShowRedirectModal] = useState(false);

    useEffect(() => {
        socketService.emit(SOCKET_EVENT_JOIN_CODEBLOCK, codeblockId);
        socketService.emit(SOCKET_GET_STUDENTS_COUNT, codeblockId);

        const handleSetRole = (role) => setUserRole(role);
        const handleStudentCountUpdate = (count) => setStudentCount(count);
        const handleRedirectToLobby = () => setShowRedirectModal(true);

        socketService.on(SOCKET_EVENT_SET_ROLE, handleSetRole);
        socketService.on(SOCKET_STUDENTS_COUNT, handleStudentCountUpdate);
        socketService.on(SOCKET_REDIRECT_TO_LOBBY, handleRedirectToLobby);

        return () => {
            socketService.emit(SOCKET_GET_STUDENTS_COUNT, codeblockId);
            socketService.emit(SOCKET_EVENT_LEAVE_CODEBLOCK, codeblockId);
            socketService.off(SOCKET_EVENT_SET_ROLE, handleSetRole);
            socketService.off(SOCKET_STUDENTS_COUNT, handleStudentCountUpdate);
            socketService.off(SOCKET_REDIRECT_TO_LOBBY, handleRedirectToLobby);
        };
    }, [codeblockId]);

    const emitCodeChange = (code) => {
        socketService.emit(SOCKET_EVENT_CODE_CHANGE, { codeblockId, code });
    };

    return {
        userRole,
        studentCount,
        showRedirectModal,
        emitCodeChange,
        setShowRedirectModal
    };
}