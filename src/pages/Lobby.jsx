import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { codeblockService } from "../services/codeblock.service";
import CodeblockList from "../cmps/lobby/CodeblockList";

export default function Lobby() {
    const [codeblocks, setCodeblocks] = useState(null);
    const [searchParams] = useSearchParams();
    const filterBy = codeblockService.getFilterFromParams(searchParams);

    useEffect(() => {
        loadCodeblocks();
    }, [searchParams]);

    const loadCodeblocks = async () => {
        const codeblocksData = await codeblockService.getCodeblocks(filterBy);
        setCodeblocks(codeblocksData);
    };

    return (
        <main className="container" role="main">
            <h1>Choose code block</h1>
            <CodeblockList codeblocks={codeblocks} />
        </main>
    );
}
