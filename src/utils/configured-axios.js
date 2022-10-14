import axios from "axios"
import {getToken} from '@/api/store.js'
import router from '../router'
import event from '@/event'

let processingUrls = []

function processStart(url) {
  if (processingUrls.indexOf(url)==-1) {
    processingUrls.push(url)
    event.$emit("turn-on-universal-spin")
  }
}
function processEnd(url) {
  setTimeout(() => {
    processingUrls.splice(processingUrls.indexOf(url), 1)
  }, 2000);
  event.$emit("turn-off-universal-spin")
}
axios.defaults.baseURL = process.env.VUE_APP_SERVICE_BASE_URL
axios.interceptors.request.use(config => {

  if(config.url.indexOf('/login')==-1){
    config.headers.Authorization=getToken()
  }
  let {method, url} = config
  if(method=="post"||method=="put"||method=="delete"){
    let cancel
    config.cancelToken = new axios.CancelToken(function(c) {
      cancel = c
    })
    processStart(url,cancel)
  }

  return config
  }, error => {
    return Promise.reject(error);
  })
axios.interceptors.response.use( response => {
  let {method, url} = response.config
  if(method=="post"||method=="put"||method=="delete"){
    processEnd(url)
  }
  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    if( response.data.msg){
      axios.handleError(response)
    }
    return Promise.reject(response);
  }
},error=>{
  if (!axios.isCancel(error)) {
    let {method, url} = error.response.config
    if(method=="post"||method=="put"||method=="delete"){
      processEnd(url)
    }
    if (error && error.response){
      if(error.response.status === 403 && error.response.data.code === 10001 && process.env.VUE_APP_PUBLIC_AUTH){
        router.push("login")
        return Promise.reject(error)
      }
      if( error.response.data&&error.response.data.msg){
        axios.handleError(error.response)
      }
      return Promise.reject(error.response)
    }else{
      return Promise.reject(error)
    }
  }
  return Promise.reject(error)
})

export default axios;
