import request from '@/utils/request'

/**
 * 获取菜单数据
 */
export function getMenudata(){
    return request({
        url:'/menu/findNodes',
        method:'get'
    })
}