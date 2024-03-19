import request from '@/utils/request'
/**
 * 手机号获得验证码
 */
export function getCode(data){
  return request({
     url:`/user/code?phone=${data.phone}`,
     method:'post',
  })
}

/**
 * 用户登录功能
 */
 export function userLogin(data){
    return request({
      url:'/user/login',
      method:'post',
      data
    })
  }
  /**
   * 用户退出登录操作 // Todo
   */
  export function userLogout(){

  }
  /**
   * 获取当前登录用户
   */
  
export function getUserInfo(){
  return request({
    url:'/user/me',
    method:'get'
  })
}
/**
 * 根据id查询员工信息
 */
export function queryEmpById(id){
  return request({
    url:`/user/info/${id}`
  })
}

/**
 * 分页查询员工
 */
export function queryEmpByPage(params){
  return request({
    url:'/user/page',
    method:'get',
    params
  })
}
/**
 * 新增员工接口
 */
export function addEmployee(data){
  return request({
    url:'/user/add',
    method:'post',
    data
  })
}
/**
 * 修改员工信息
 */
export function updateEmp(data){
  return request({
    url:'/user',
    method:'put',
    data
  })
}
/**
 * 批量删除员工
 */
export function deleteEmp(ids){
  return request({
    url:`/user/${ids}`,
    method:'delete',
    
  })
}

 /**
 * 查询所有角色 和当前用户所属角色
 */
export function queryRole(params){
  return request({
    url:`/user/toAssign/${params.userId}`,
    params
  })
}
/**
 * 为用户分配角色
 */
export function assignRole(data){
  return request({
    url:'/user/addRole',
    method:'put',
    data
  })
}
/**
 * 密码登录
 */
export function LoginByPassword(data){
  return request({
    url:'/login/password',
    method:'post',
    data
  })
}