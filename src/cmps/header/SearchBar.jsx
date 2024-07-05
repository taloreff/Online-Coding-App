import React from 'react';

export default function SearchBar() {
    return (
        <div className="search-container">
            <i className="fas fa-search search-icon"></i>
            <input type="text" placeholder="Search..." className="search-input" />
        </div>
    );
}
