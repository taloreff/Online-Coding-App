import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { codeblockService } from '../../services/codeblock.service';

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const defaultFilter = codeblockService.getDefaultFilter();
    const [searchParams] = useSearchParams(defaultFilter);

    // Function to update search parameters and navigate to filtered results
    function onSubmitFilter(e) {
        e.preventDefault();
        const newSearchParams = codeblockService.updateSearchParams(searchParams, { key: 'title', value: searchQuery });
        navigate({ search: newSearchParams.toString() });
        setSearchQuery("");
    }

    return (
        <div className="search-container">
            <form onSubmit={(e) => onSubmitFilter(e)}>
                <button className='search-btn'><i className="fas fa-search search-icon" ></i></button>
                <input
                    type="search"
                    placeholder="Search..."
                    autoComplete='true'
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>
        </div>
    );
}
