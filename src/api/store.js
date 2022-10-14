var store=window.localStorage;

export function setToken(value){
  store.setItem("token", value)
}

export function deleteKey(key){
  store.removeItem(key)
}

export function getToken(){
  return store.getItem("token")
}
