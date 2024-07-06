import axios from 'axios';

// eslint-disable-next-line no-undef
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/codeblocks'
    : '//localhost:5000/api/codeblocks';

async function getCodeblocks(filterBy) {
    try {
        const response = await axios.get(BASE_URL, { params: filterBy });
        return response.data;
    } catch (error) {
        console.error('Error fetching codeblocks:', error);
        throw error;
    }
}

async function getCodeblockById(codeblockId) {
    try {
        const response = await axios.get(`${BASE_URL}/${codeblockId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching codeblock:', error);
        throw error;
    }
}

function getDefaultFilter() {
    return {
        title: '',
    };
}

function getFilterFromParams(searchParams) {
    const defaultFilter = getDefaultFilter();
    const filterBy = {};
    for (const field in defaultFilter) {
        if (Array.isArray(defaultFilter[field])) {
            filterBy[field] = searchParams.getAll(field) || defaultFilter[field];
        } else {
            filterBy[field] = searchParams.get(field) || defaultFilter[field];
        }
    }
    return filterBy;
}

function updateSearchParams(searchParams, paramToAppend) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(paramToAppend.key, paramToAppend.value);
    for (const [key, value] of newSearchParams.entries()) {
        if (!value) {
            newSearchParams.delete(key);
        }
    }
    return newSearchParams;

}

export const codeblockService = {
    getCodeblocks,
    getCodeblockById,
    getDefaultFilter,
    getFilterFromParams,
    updateSearchParams
};
