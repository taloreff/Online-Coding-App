import { useEffect, useState } from "react";
import { codeblockService } from "../services/codeblock.service";
import { useParams } from "react-router-dom";
import { CodeEditor } from '../cmps/codeblockdetails/CodeEditor';
import { Smiley } from '../cmps/codeblockdetails/Smiley';
import { SolutionBtn } from '../cmps/codeblockdetails/SolutionBtn';
import { SolutionModal } from '../cmps/codeblockdetails/SolutionModal';
import { socketService, SOCKET_EVENT_JOIN_CODEBLOCK, SOCKET_EVENT_LEAVE_CODEBLOCK, SOCKET_EVENT_CODE_CHANGE, SOCKET_EVENT_CODE_UPDATE, SOCKET_REDIRECT_TO_LOBBY } from '../services/socket.service';

export default function CodeblockDetails() {
    const [codeblock, setCodeblock] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showSmiley, setShowSmiley] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        fetchCodeblock();
        socketService.emit(SOCKET_EVENT_JOIN_CODEBLOCK, id);
        return () => {
            socketService.emit(SOCKET_EVENT_LEAVE_CODEBLOCK, id);
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
            alert('redirecting to lobby...')
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

    return (
        <main className="container">
            <SolutionBtn onClick={() => setShowModal(true)} />
            <h1>{codeblock ? codeblock.title : 'Loading...'}</h1>
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
        </main>
    );
}
