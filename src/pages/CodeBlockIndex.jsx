import { useEffect, useState } from "react";
import { getCodeblockById } from "../services/codeblock.service";
import { useParams } from "react-router-dom";
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/vs2015.css';
import smiley from '../assets/imgs/smiley.png';

hljs.registerLanguage('javascript', javascript);

export default function CodeBlockIndex() {
    const [codeblock, setCodeblock] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const { id } = useParams();


    useEffect(() => {
        fetchCodeblock();
    }, [id]);

    async function fetchCodeblock() {
        const codeblockData = await getCodeblockById(id)
        setCodeblock(codeblockData);
    }

    function handleCodeChange(ev) {
        const newCodeblock = { ...codeblock };
        newCodeblock.code = ev.target.value;
        setCodeblock(newCodeblock);
    }

    function stripCommentsAndWhitespace(code) {
        return code
            .replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '') // Remove single-line and multi-line comments
            .replace(/\s+/g, ' ') // Replace multiple whitespace characters with a single space
            .trim(); // Trim leading and trailing whitespace
    }

    const isCodeCorrect = () => {
        if (!codeblock) return false;
        const strippedCode = stripCommentsAndWhitespace(codeblock.code);
        const strippedSolution = stripCommentsAndWhitespace(codeblock.solution);
        return strippedCode === strippedSolution;
    }

    return (
        <main className="container">
            <h1>{codeblock ? codeblock.title : 'Loading...'}</h1>
            {codeblock &&
                <section className="codeblock" onClick={() => setIsEditing(true)}>
                    {isEditing ? (
                        <>
                            <textarea
                                value={codeblock.code}
                                onChange={handleCodeChange}
                                className="code-textarea"
                            >
                            </textarea>
                        </>
                    ) : (
                        <pre>
                            <code className="javascript">
                                {codeblock.code}
                            </code>
                        </pre>
                    )}
                </section>}
            {isCodeCorrect() && <div className="smiley" ><img src={smiley} /><h1>Well done!</h1></div>}
        </main>
    )
}
