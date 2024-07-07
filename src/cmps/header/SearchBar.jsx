import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { codeblockService } from '../../services/codeblock.service';

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const defaultFilter = codeblockService.getDefaultFilter();
    const [searchParams] = useSearchParams(defaultFilter);

    // Function to update search parameters and navigate to filtered results
    function onSubmitFilter() {
        const newSearchParams = codeblockService.updateSearchParams(searchParams, { key: 'title', value: searchQuery });
        navigate({ search: newSearchParams.toString() });
    }

    // Handle Enter key press to trigger the search
    function handleEnterKey(e) {
        if (e.key === 'Enter') {
            onSubmitFilter();
        }
    }

    return (
        <div className="search-container">
            <i className="fas fa-search search-icon" onClick={onSubmitFilter}></i>
            <input
                type="text"
                placeholder="Search..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleEnterKey}
            />
        </div>
    );
}
