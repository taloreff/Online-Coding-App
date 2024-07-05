import { useEffect, useState } from "react";
import { getCodeblockById } from "../services/codeblock.service";
import { useParams } from "react-router-dom";
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/vs2015.css';

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

    function submitCode() {
        setIsEditing(false);
        alert("Code submitted!")
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
                            <button onClick={submitCode}>Submit</button>
                        </>
                    ) : (
                        <pre>
                            <code className="javascript">
                                {codeblock.code}
                            </code>
                        </pre>
                    )}
                </section>}
        </main>
    )
}
