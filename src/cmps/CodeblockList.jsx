import React from 'react'
import CodeblockPreview from './CodeblockPreview'

export default function CodeblockList({ codeblocks }) {
    return (
        <ul className="lobby-list" role="list">
            {codeblocks?.map(codeblock => (
                <li key={codeblock._id} role="listitem">
                    <CodeblockPreview codeblock={codeblock} />
                </li>
            ))}
        </ul>
    )
}
