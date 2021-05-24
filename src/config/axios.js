import axios from 'axios'



const localStorage = JSON.parse(window.localStorage.getItem('neomedy')) || ''


axios.defaults.baseURL = 'http://api.neomedy.com/api'
axios.defaults.headers.common['Authorization'] = localStorage.token

// const config = {
//   baseURL: 'http://api.neomedy.com/api',
//   headers: {}
// }

// if (localStorage) {
//   config.headers.Authorization = localStorage.token
// }

// const axiosInstance = axios.create(config)

// axiosInstance.interceptors.request.use(config => {

//   return config
// })

export default axios