import React from 'react'
import { Link } from 'react-router-dom'

export default function CodeblockPreview({ codeblock }) {
    return (
        <Link
            to={`/codeBlock/${codeblock._id}`}
            className="lobby-link"
            aria-label={`Code block: ${codeblock.title}`}
        >
            {codeblock.title}
        </Link>
    )
}
