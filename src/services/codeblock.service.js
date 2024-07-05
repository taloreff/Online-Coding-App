import axios from 'axios';

// eslint-disable-next-line no-undef
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/codeblocks'
    : '//localhost:5000/api/codeblocks'

export const getCodeblocks = async () => {
    try {
        const response = await axios.get(BASE_URL);
        console.log('response.data:', response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching codeblocks:', error);
        throw error;
    }
};

export const getCodeblockById = async (codeblockId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${codeblockId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching codeblock:', error);
        throw error;
    }
};

export const codeblockService = {
    getCodeblocks,
    getCodeblockById
};
