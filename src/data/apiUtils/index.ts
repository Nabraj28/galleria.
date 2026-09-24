import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

const getData = async <T>(endpoint: string): Promise<T> => {
    const response = await axiosInstance.get<T>(endpoint);
    return response.data;
}

export {
    getData,
}