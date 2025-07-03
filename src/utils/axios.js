import axios from 'axios'
const { API } = require('./config')

const axiosStandart = axios.create({
	baseURL: API,
})
const axiosRequest = axios.create({
	baseURL: API,
	headers: {
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	},
})
export {axiosStandart,axiosRequest}