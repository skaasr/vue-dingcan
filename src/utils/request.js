import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";
const service = axios.create({
  baseURL:'/api',
  timeout:10000
})
service.interceptors.request.use( (config) => {
  if (store.getters.token) {
    config.headers.Authorization = `${store.getters.token}`
  }
  return config
}, (error) => {
   return Promise.reject(error)
})
service.interceptors.response.use((response) =>{

      if(response.status == 200){
        return response.data
      } else {
        Message({ type: 'error', message})
        return Promise.reject(new Error(message))
      }
    }, (error) => {
  Message({ type: 'error', msg: error.msg})

  return Promise.reject(error)
})
export default service