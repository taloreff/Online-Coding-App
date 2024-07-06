import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CodeEditor } from '../cmps/codeblockdetails/CodeEditor';
import { Smiley } from '../cmps/codeblockdetails/Smiley';
import { SolutionBtn } from '../cmps/codeblockdetails/SolutionBtn';
import { SolutionModal } from '../cmps/codeblockdetails/SolutionModal';
import { RedirectModal } from '../cmps/codeblockdetails/RedirectModal';

import { codeblockService } from "../services/codeblock.service";
import { socketService, SOCKET_EVENT_JOIN_CODEBLOCK, SOCKET_EVENT_LEAVE_CODEBLOCK, SOCKET_EVENT_CODE_CHANGE, SOCKET_EVENT_CODE_UPDATE, SOCKET_REDIRECT_TO_LOBBY, SOCKET_GET_STUDENTS_COUNT, SOCKET_STUDENTS_COUNT, SOCKET_EVENT_SET_ROLE } from '../services/socket.service';

export default function CodeblockDetails() {
    const [codeblock, setCodeblock] = useState(null);
    const [showSmiley, setShowSmiley] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showRedirectModal, setShowRedirectModal] = useState(false);
    const [studentCount, setStudentCount] = useState(0);
    const [userRole, setUserRole] = useState('Student');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchCodeblock();
        socketService.emit(SOCKET_EVENT_JOIN_CODEBLOCK, id);
        socketService.emit(SOCKET_GET_STUDENTS_COUNT, id);

        const handleSetRole = (role) => setUserRole(role);
        const handleCodeUpdate = (code) => setCodeblock(prev => ({ ...prev, code }));
        const handleStudentCountUpdate = (count) => setStudentCount(count);
        const handleRedirectToLobby = () => setShowRedirectModal(true);

        socketService.on(SOCKET_EVENT_SET_ROLE, handleSetRole);
        socketService.on(SOCKET_EVENT_CODE_UPDATE, handleCodeUpdate);
        socketService.on(SOCKET_STUDENTS_COUNT, handleStudentCountUpdate);
        socketService.on(SOCKET_REDIRECT_TO_LOBBY, handleRedirectToLobby);

        return () => {
            socketService.emit(SOCKET_GET_STUDENTS_COUNT, id);
            socketService.emit(SOCKET_EVENT_LEAVE_CODEBLOCK, id);
            socketService.off(SOCKET_EVENT_SET_ROLE, handleSetRole);
            socketService.off(SOCKET_EVENT_CODE_UPDATE, handleCodeUpdate);
            socketService.off(SOCKET_STUDENTS_COUNT, handleStudentCountUpdate);
            socketService.off(SOCKET_REDIRECT_TO_LOBBY, handleRedirectToLobby);
        };
    }, [id]);

    useEffect(() => {
        document.addEventListener('click', removeSmiley);

        return () => {
            document.removeEventListener('click', removeSmiley);
        };
    }, []);

    useEffect(() => {
        if (codeblock && codeblock.code === codeblock.solution) {
            setShowSmiley(true);
        }
    }, [codeblock]);

    async function fetchCodeblock() {
        const codeblockData = await codeblockService.getCodeblockById(id);
        setCodeblock(codeblockData);
    }

    function handleCodeChange(newCode) {
        console.log('code change ' + newCode);
        const newCodeblock = { ...codeblock, code: newCode };
        setCodeblock(newCodeblock);
        socketService.emit(SOCKET_EVENT_CODE_CHANGE, { codeblockId: id, code: newCode });
    }

    function handleCloseRedirectModal() {
        setShowRedirectModal(false);
        navigate('/');
    }

    function removeSmiley() {
        setShowSmiley(false);
    }

    return (
        <main className="container-grid">
            <h1 className="codeblock-title">{codeblock ? codeblock.title : 'Loading...'}</h1>
            <div className="codeblock-details">
                <p>Students in room: {studentCount}</p>
                <p>Your role: {userRole}</p>
                <SolutionBtn onClick={() => setShowModal(true)} />
            </div>
            {codeblock && (
                <CodeEditor
                    code={codeblock.code}
                    onCodeChange={handleCodeChange}
                />
            )}
            {showSmiley && <Smiley />}
            {showModal && (
                <SolutionModal
                    solution={codeblock.solution}
                    onClose={() => setShowModal(false)}
                />
            )}
            {showRedirectModal && (
                <RedirectModal onClose={handleCloseRedirectModal} />
            )}
        </main>
    );
}
