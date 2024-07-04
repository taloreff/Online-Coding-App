import { useEffect, useState } from "react"
import { getCodeblocks } from "../services/codeblock.service"
import { Link } from "react-router-dom"

export default function Lobby() {

    const [codeblocks, setCodeblocks] = useState([])

    useEffect(() => {
        fetchCodeblocks()
    }, [])

    const fetchCodeblocks = async () => {
        const codeblocksData = await getCodeblocks()
        setCodeblocks(codeblocksData)
    }

    return (
        <main className="lobby-container">
            <h1>Choose code block</h1>
            <ul>
                {codeblocks.map(codeblock => (
                    <li key={codeblock._id}>
                        <Link to={`/${codeblock._id}`}>{codeblock.title}</Link>
                    </li>
                ))}
            </ul>
        </main>
    )
}
