import request from '@/utils/request'

/**
 * 分页查询菜品
 */
export function queryDishByPage(params){
    return request({
        url:'/dish/page',
        method:'get',
        params
    })
}
/**
 * 新增菜品
 */
export function addDish(data){
    return request({
        url:'/dish',
        method:'post',
        data
    })
}
/**
 * 删除菜品
 */
export function deleteDish(params){
    return request({
        url:'/dish',
        method:'delete',
        params
    })
}
/**
 * 修改菜品
 */
export function setDish(data){
    return request({
        url:'/dish',
        method:'put',
        data
    })
}
/**
 * 根据id查询菜品
 *
 */
export function queryDishById(id){
    return request({
        url:`/dish/${id}`,
        method:'get'
    })
}