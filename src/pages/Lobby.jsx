import { useEffect, useState } from "react";
import { getCodeblocks } from "../services/codeblock.service";
import { Link } from "react-router-dom";

export default function Lobby() {
    const [codeblocks, setCodeblocks] = useState([]);

    useEffect(() => {
        fetchCodeblocks();
    }, []);

    const fetchCodeblocks = async () => {
        const codeblocksData = await getCodeblocks();
        setCodeblocks(codeblocksData);
    };

    return (
        <main className="lobby-container">
            <h1>Choose code block</h1>
            <ul className="lobby-list">
                {codeblocks.map(codeblock => (
                    <Link to={`/codeBlock/${codeblock._id}`} key={codeblock._id} className="lobby-link">
                        {codeblock.title}
                    </Link>
                ))}
            </ul>
        </main>
    );
}
