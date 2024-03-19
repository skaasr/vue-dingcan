export function saveUserinfo(data){
   return localStorage.setItem('userInfo',data)
}

export function getUserInfo(){
  return  localStorage.getItem('userInfo')
}
/**
 * 移除缓存中的用户资料
 */
export function removeUserInfo(){
    return localStorag.setItem('userInfo',null)
}