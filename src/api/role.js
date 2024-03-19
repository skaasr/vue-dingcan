import request from '@/utils/request'

/**
 * 查询角色
 */
export function queryRole(params){
    return request({
        url:"/role/page",
        method:'get',
        params

    })
}
/**
 * 新增角色
 */
export  function addRole(data){
    return request({
        url:'/role/add',
        method:'post',
        data
    })
}
/**
 * 根据id查询角色
 */
export function queryRoleById(params){
    return request({
        url:`/role/${params.id}`,
        method:'get',
        params
    })
}
/**
 * 删除角色
 */
export function deleteRoleById(params){
    return request({
        url:'/role',
        method:'delete',
        params
    })
}

/**
 * 修改角色
 */
export function updateRole(data){
    return request({
        url:'/role/update',
        method:'put',
        data
    })
}

/**
 * 为角色分配权限
 */
export function assignPermission(data){
    return request({
        url:'/menu/doAssign',
        method:'post',
        data
    })
}


/**
 * 查询所有权限和为角色分配的权限
 */
export function findAllPermission(id){
    return request({
        url:`/menu/toAssign/${id}`,
        method:'get',
    })
}