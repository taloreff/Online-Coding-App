import React from 'react';

export function CodeEditor({ code, isEditing, onCodeChange, onSetIsEditing }) {

    return (
        <section className={`codeblock ${isEditing ? 'focused' : ''}`} onClick={onSetIsEditing}>
            {isEditing ? (
                <textarea
                    value={code}
                    onChange={onCodeChange}
                    className="code-textarea"
                />
            ) : (
                <pre>
                    <code className="javascript">
                        {code}
                    </code>
                </pre>
            )}
        </section>
    );
}
