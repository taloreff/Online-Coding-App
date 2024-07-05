import { useEffect, useState } from "react";
import { getCodeblockById } from "../services/codeblock.service";
import { useParams } from "react-router-dom";
import smiley from '../assets/imgs/smiley.png';
import { SolutionModal } from '../cmps/SolutionModal';

export default function CodeBlockIndex() {
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
        const codeblockData = await getCodeblockById(id);
        setCodeblock(codeblockData);
    }

    function handleCodeChange(ev) {
        const newCodeblock = { ...codeblock };
        newCodeblock.code = ev.target.value;
        setCodeblock(newCodeblock);
    }

    return (
        <main className="container">
            <div className="button-container">
                <button className="solution-button" onClick={() => setShowModal(true)}>Solution</button>
            </div>
            <h1>{codeblock ? codeblock.title : 'Loading...'}</h1>
            {codeblock && (
                <section className="codeblock" onClick={() => setIsEditing(true)}>
                    {isEditing ? (
                        <>
                            <textarea
                                value={codeblock.code}
                                onChange={handleCodeChange}
                                className="code-textarea"
                            />
                        </>
                    ) : (
                        <pre>
                            <code className="javascript">
                                {codeblock.code}
                            </code>
                        </pre>
                    )}
                </section>
            )}
            {showSmiley && (
                <div className="smiley">
                    <img src={smiley} alt="Smiley" />
                    <h1>Well done!</h1>
                </div>
            )}
            {showModal && (
                <SolutionModal
                    solution={codeblock.solution}
                    onClose={() => setShowModal(false)}
                />
            )}
        </main>
    );
}
