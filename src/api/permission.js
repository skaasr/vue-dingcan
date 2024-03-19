import request from '@/utils/request'

export function findPermission(){
    return request({
        url:'/menu/findNodes',
        method:'get'
    })
}

/**
 * 新增菜单
 */
export function addMenu(data){
    return request({
        url:'/menu/save',
        method:'post',
        data
    })
}

/**
 * 删除菜单
 */
export function deleteMenu(params){
    return request({
        url:'/menu/delete',
        method:'delete',
        params
    })
}

/**
 * 修改菜单
 */
export function updateMenu(data){
    return request({
        url:'/menu/update',
        method:'put',
        data
    })
}