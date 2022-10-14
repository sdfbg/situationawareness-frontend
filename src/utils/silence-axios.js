import axios from "axios"
import {getToken} from '@/api/store.js'
axios.defaults.baseURL = process.env.VUE_APP_SERVICE_BASE_URL
axios.interceptors.request.use(config => {

  if(config.url.indexOf('/login')==-1){
    config.headers.Authorization=getToken()
  }
  return config
  }, error => {
    return Promise.reject(error);
  })

export default axios;
