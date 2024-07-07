export function SolutionModal({ solution, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()} role="dialog" aria-labelledby="solution-title">
                <button className="close-button" onClick={onClose} aria-label="Close">✖</button>
                <h2 id="solution-title">Solution</h2>
                <pre>
                    <code className="javascript">
                        {solution}
                    </code>
                </pre>
            </div>
        </div>
    );
}
