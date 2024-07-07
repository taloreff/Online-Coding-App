import React from 'react';

export function SolutionBtn({ onClick }) {
    return (
        <div className="button-container">
            <button className="solution-button" onClick={onClick} aria-label="View Solution">Solution</button>
        </div>
    );
}
