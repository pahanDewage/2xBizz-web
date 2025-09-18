/* eslint-disable */

import api from './axios';

//? Signup APi
export const signup = async (body) => {
    try {
        const response = await api.post('/auth/signup', body);
        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.error ||
            error.message ||
            'Unknown error';

        console.error('Signup failed:', message);
        return { status: false, message };
    }
};
