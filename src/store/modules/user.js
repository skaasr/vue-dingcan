
import { getToken, setToken, removeToken } from '@/utils/auth'
import { getCode, userLogin, getUserInfo } from '@/api/user'
import { saveUserinfo } from '@/utils/token'
const state = {
  token:getToken(),
  userInfo:{}
}
const mutations = {
       setToken(state,token){
        state.token=token
        setToken(token)
       },
       //获取用户资料
       setUserInfo(state,data){
        state.userInfo = data
       },
       // 清楚token
       removeToken(state){
        state.token = null
        removeToken()
       }
}
const actions = {
       async userLogin(context,data){
        // todo 调用登录接口
       let result =  await userLogin(data) 
       if(result.code == 1){
        context.commit('setToken',result.data)
       }else{
        alert(result.msg)
        return Promise.reject(new Error('登录失败!'))
       }
       
      },
      async  getCode(context,data){
       let result = await getCode(data)
      },
      /**
       * 获取用户资料
       */
      async getUserInfo(context){
      let result =  await getUserInfo()
      console.log(result);
      saveUserinfo(result.data.name)
      context.commit('setUserInfo',result.data)
      },

    
      
 
}
export default{
  state,
  mutations,
  actions
}