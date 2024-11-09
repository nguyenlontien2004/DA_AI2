import axios, { AxiosRequestConfig } from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://127.0.0.1:5000";

interface ApiResponse<T> {
    data: T;
}

export default function useCallApi<T>() {
    const navigate = useNavigate();

    return async function callApi(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET', body: any = null): Promise<ApiResponse<T>> {
        const token = localStorage.getItem('access_token');

        if (!token) {
            // navigate('/signin');
            throw new Error('No access token found, redirecting to sign-in');
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
                } else {
                    console.error('API error:', error.response.data);
                }
            } else {
                console.error('Network or other error:', error);
            }
            throw error;
        }
    };
}
