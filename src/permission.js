import router from "./router";
import nProgress from "nprogress";
import 'nprogress/nprogress.css'
import store from "./store";
/**
 * 前置守卫
 */
router.beforeEach(async (to,from,next) => {
  nProgress.start()

  const whiteList = ['/login', '/404']
  if(store.getters.token ){
    if(to.path === '/login'){
      next('/')
      nProgress.done()
    }else{
      if(!store.getters.userId){
     let result  = await  store.dispatch('getUserInfo')
    
      }
        next()
    }
  }else{
    if(whiteList.includes(to.path)){
      next()
    }else{
      next('/login')
      nProgress.done()
    }
  }
  next()
})

/**
 * 后置守卫
 */
router.afterEach(() =>{
 nProgress.done()
})