import { useEffect, useState } from "react";
import { codeblockService } from "../services/codeblock.service";
import { useParams } from "react-router-dom";
import { CodeEditor } from '../cmps/codeblockdetails/CodeEditor';
import { Smiley } from '../cmps/codeblockdetails/Smiley';
import { SolutionBtn } from '../cmps/codeblockdetails/SolutionBtn';
import { SolutionModal } from '../cmps/codeblockdetails/SolutionModal';

export default function CodeblockDetails() {
    const [codeblock, setCodeblock] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showSmiley, setShowSmiley] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        fetchCodeblock();
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

    async function fetchCodeblock() {
        const codeblockData = await codeblockService.getCodeblockById(id);
        setCodeblock(codeblockData);
    }

    function handleCodeChange(ev) {
        const newCodeblock = { ...codeblock };
        newCodeblock.code = ev.target.value;
        setCodeblock(newCodeblock);
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
