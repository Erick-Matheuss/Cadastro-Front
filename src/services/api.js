import axios from 'axios' 

const api = axios.create({
    baseURL: 'https://back-drdb.onrender.com'
})

export default api