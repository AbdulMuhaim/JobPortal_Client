import axios from 'axios'
import {store} from '../redux/store/store'


export const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL
})


// Request interceptor
axiosInstance.interceptors.request.use(
    config => {
        // const employerState = store.getState().Employer
        const userState = store.getState().User;
        const adminState = store.getState().Admin;

        const role = config.url.split("/")[1]
     

        // if (role==='employer') {
        //     config.headers['Authorization'] = `Bearer ${employerState.token}`;
        // }
        if (role==='admin') {
            config.headers['Authorization'] = `Bearer ${adminState.token}`;
        }
        else{
            config.headers['Authorization'] = `Bearer ${userState.token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;

