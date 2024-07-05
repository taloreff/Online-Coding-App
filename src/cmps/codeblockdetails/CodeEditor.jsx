import React from 'react';

export function CodeEditor({ code, isEditing, onCodeChange, onToggleEditing }) {
    return (
        <section className="codeblock" onClick={onToggleEditing}>
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
