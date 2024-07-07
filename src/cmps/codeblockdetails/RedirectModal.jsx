export function RedirectModal({ onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()} role="alertdialog" aria-labelledby="redirect-title">
                <button className="close-button" onClick={onClose} aria-label="Close">✖</button>
                <h2 id="redirect-title">The mentor has left the codeblock,<br />You are being redirected to the lobby.</h2>
                <p>Your code will be deleted, so please try again later.</p>
            </div>
        </div>
    );
}
