import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:`${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_API_VERSION}`,
});

const getData = async<T>(endpoint: string)=>{
    const response =  await axiosInstance.get<{data: T}>(endpoint);
    return response.data.data;
}

export {
    getData,
}