import axios from 'axios'
const axiosInstance = axios.create({
    baseURL: 'https://task-management-server-one-gamma.vercel.app'
})

const useAxios = () => {
  return axiosInstance
}

export default useAxios