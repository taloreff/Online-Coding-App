import React from 'react';
import smiley from '../../assets/imgs/smiley.png';

export function Smiley() {
    return (
        <div className="smiley">
            <img src={smiley} alt="Smiley" />
            <h1>Well done!</h1>
        </div>
    );
}
