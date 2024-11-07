import axios from 'axios';

const API_URL = "http://127.0.0.1:5000";

interface LoginResponse {
    access_token: string;
}

const login = async (username_or_email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(`${API_URL}/api/auth/login`, { username_or_email, password }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.error) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
        }
    }
}

const signup = async (username: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/register`, { username, email, password }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data.message;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.error) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error("Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.");
        }
    }
}

export { login, signup }
