import { useEffect, useState } from "react";
import { getCodeblocks } from "../services/codeblock.service";
import CodeblockList from "../cmps/lobby/CodeblockList";

export default function Lobby() {
    const [codeblocks, setCodeblocks] = useState(null);

    useEffect(() => {
        fetchCodeblocks();
    }, []);

    const fetchCodeblocks = async () => {
        const codeblocksData = await getCodeblocks();
        setCodeblocks(codeblocksData);
    };

    // const user = {
    //     name: "John",
    //     socketid: "123",
    //     id: "1234",
    //     favorites: ["1234", "5678"],
    //     done: ["1234"], //how long it took to solve
    // };


    return (
        <main className="container" role="main">
            <h1>Choose code block</h1>
            <CodeblockList codeblocks={codeblocks} />
        </main>
    );
}
