import axios from 'axios'
import { API } from './config'


const axiosStandart = axios.create({
	baseURL: API,
})


const axiosRequest = axios.create({
	baseURL: API,
	headers: {
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	},
})
// axiosRequest.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('tokenForAdmin')
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`
//         }
//         return config
//     },

//     (error) => {
//         return Promise.reject(error)
//     }
// )

export {axiosStandart,axiosRequest}

