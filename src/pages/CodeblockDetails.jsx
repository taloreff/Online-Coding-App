import { useEffect, useState } from "react";
import { codeblockService } from "../services/codeblock.service";
import { useNavigate, useParams } from "react-router-dom";
import { CodeEditor } from '../cmps/codeblockdetails/CodeEditor';
import { Smiley } from '../cmps/codeblockdetails/Smiley';
import { SolutionBtn } from '../cmps/codeblockdetails/SolutionBtn';
import { SolutionModal } from '../cmps/codeblockdetails/SolutionModal';
import { RedirectModal } from '../cmps/codeblockdetails/RedirectModal';
import { socketService, SOCKET_EVENT_JOIN_CODEBLOCK, SOCKET_EVENT_LEAVE_CODEBLOCK, SOCKET_EVENT_CODE_CHANGE, SOCKET_EVENT_CODE_UPDATE, SOCKET_REDIRECT_TO_LOBBY, SOCKET_GET_STUDENTS_COUNT, SOCKET_STUDENTS_COUNT } from '../services/socket.service';

export default function CodeblockDetails() {
    const [codeblock, setCodeblock] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
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
        socketService.on('set-role', (role) => {
            setUserRole(role);
        });

        return () => {
            socketService.emit(SOCKET_GET_STUDENTS_COUNT, id);
            socketService.emit(SOCKET_EVENT_LEAVE_CODEBLOCK, id);
            socketService.off('set-role');
        };
    }, [id]);

    useEffect(() => {
        const handleClick = () => setShowSmiley(false);
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    useEffect(() => {
        if (codeblock && codeblock.code === codeblock.solution) {
            setShowSmiley(true);
        }
    }, [codeblock]);

    useEffect(() => {
        socketService.on(SOCKET_REDIRECT_TO_LOBBY, () => {
            setShowRedirectModal(true);
        });
        return () => {
            socketService.off(SOCKET_REDIRECT_TO_LOBBY);
        };
    }, []);

    useEffect(() => {
        socketService.on(SOCKET_EVENT_CODE_UPDATE, (code) => {
            setCodeblock(prev => ({ ...prev, code }));
        });
        return () => {
            socketService.off(SOCKET_EVENT_CODE_UPDATE);
        };
    }, []);

    useEffect(() => {
        socketService.on(SOCKET_STUDENTS_COUNT, (count) => {
            setStudentCount(count);
        });
        return () => {
            socketService.off(SOCKET_STUDENTS_COUNT);
        };
    }, []);

    async function fetchCodeblock() {
        const codeblockData = await codeblockService.getCodeblockById(id);
        setCodeblock(codeblockData);
    }

    function handleCodeChange(ev) {
        const newCodeblock = { ...codeblock };
        newCodeblock.code = ev.target.value;
        setCodeblock(newCodeblock);
        socketService.emit(SOCKET_EVENT_CODE_CHANGE, { codeblockId: id, code: newCodeblock.code });
    }

    function handleCloseRedirectModal() {
        setShowRedirectModal(false);
        navigate('/');
    }

    return (
        <main className="container">
            <SolutionBtn onClick={() => setShowModal(true)} />
            <h1>{codeblock ? codeblock.title : 'Loading...'}</h1>
            <p>Students in room: {studentCount}</p>
            <p>Your role: {userRole}</p>
            {codeblock && (
                <CodeEditor
                    code={codeblock.code}
                    isEditing={isEditing}
                    onCodeChange={handleCodeChange}
                    onToggleEditing={() => setIsEditing(!isEditing)}
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
