import axios, { AxiosRequestConfig } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const API_URL = "http://127.0.0.1:5000";

interface ApiResponse<T> {
    data: T;
}

export default function useCallApi<T>() {
    const navigate = useNavigate();

    const callApi = useCallback(
        async (endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET', body: any = null): Promise<ApiResponse<T>> => {
            const token = localStorage.getItem('access_token');

            if (!token) {
                navigate('/signin');
                return Promise.reject('No access token found. Redirecting to sign-in.');
            }

            const finalEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
            
            const config: AxiosRequestConfig = {
                method: method,
                url: `${API_URL}/api${finalEndpoint}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                data: body ? body : null,
            };

            try {
                const response = await axios(config);
                return response.data;
            } catch (error: any) {
                if (error.response) {
                    if (error.response.status === 401) {
                        navigate('/signin');
                        return Promise.reject('Unauthorized. Redirecting to sign-in.');
                    } else {
                        console.error('API error:', error.response.data);
                        return Promise.reject(error.response.data);
                    }
                } else {
                    console.error('Network or other error:', error);
                    return Promise.reject('Network error or other issue');
                }
            }
        },
        [navigate]
    );

    return callApi;
}
