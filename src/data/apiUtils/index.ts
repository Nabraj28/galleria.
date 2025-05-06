import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_API_VERSION}`,
});

const getData = async <T>(endpoint: string): Promise<T> => {
    const response = await axiosInstance.get<T>(endpoint);
    return response.data;
}

export {
    getData,
}