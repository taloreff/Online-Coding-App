import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCodeblockSocket } from '../hooks/useCodeblockSocket';

import { CodeEditor } from '../cmps/codeblockdetails/CodeEditor';
import { Smiley } from '../cmps/codeblockdetails/Smiley';
import { SolutionBtn } from '../cmps/codeblockdetails/SolutionBtn';
import { SolutionModal } from '../cmps/codeblockdetails/SolutionModal';
import { RedirectModal } from '../cmps/codeblockdetails/RedirectModal';

import { codeblockService } from "../services/codeblock.service";
import { socketService } from "../services/socket.service";
import { SOCKET_EVENT_CODE_UPDATE } from '../services/socket.service';

export default function CodeblockDetails() {
    const [codeblock, setCodeblock] = useState(null);
    const [showSmiley, setShowSmiley] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    // Custom hook for handling socket events
    const { userRole, studentCount, showRedirectModal, emitCodeChange, setShowRedirectModal } = useCodeblockSocket(id);

    useEffect(() => {
        loadCodeblock();

        // Subscribe to code update events
        const handleCodeUpdate = (code) => setCodeblock(prev => ({ ...prev, code }));
        socketService.on(SOCKET_EVENT_CODE_UPDATE, handleCodeUpdate);

        // Cleanup subscription on component unmount
        return () => {
            socketService.off(SOCKET_EVENT_CODE_UPDATE, handleCodeUpdate);
        };
    }, [id]);

    useEffect(() => {
        // Event listener to remove smiley on document click
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

    async function loadCodeblock() {
        const codeblockData = await codeblockService.getById(id);
        setCodeblock(codeblockData);
    }

    function handleCodeChange(newCode) {
        const newCodeblock = { ...codeblock, code: newCode };
        setCodeblock(newCodeblock);
        emitCodeChange(newCode);
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
            {codeblock && (
                <>
                    <h1 className="codeblock-title" aria-live="polite">{codeblock?.title}</h1>
                    <div className="codeblock-details">
                        <p aria-live="polite">Students in room: {studentCount}</p>
                        <p aria-live="polite">Your role: {userRole}</p>
                        <SolutionBtn onClick={() => setShowModal(true)} />
                    </div>
                    <CodeEditor
                        code={codeblock.code}
                        onCodeChange={handleCodeChange}
                        role={userRole}
                    />
                </>
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
