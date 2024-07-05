export function SolutionModal({ solution, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>✖</button>
                <h2>Solution</h2>
                <pre>
                    <code className="javascript">
                        {solution}
                    </code>
                </pre>
            </div>
        </div>
    );
}
