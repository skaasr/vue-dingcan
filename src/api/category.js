import request from '@/utils/request'


/**
 * 查询菜品分类
 */
export function qeuryCateByPage(params){
    return request({
        url:'/category/page',
        params
    })
}
/**
 * 启用禁用分类
 */
export function startOrStopCate(params){
    return request({
        url:`/category/status/${params.status}`,
        method:'post',
        params
    })
}
/**
 * 添加分类
 */
export function addCategory(data){
         return request({
            url:'/category',
            method:'post',
            data
         })
}
/**
 * 删除分类
 */
export function deleteCategory(params){
  return request({
    url:'/category',
    method:'delete',
    params
  })
}
/**
 * 根据id查询分类
 */
export function qeuryCateById(id){
    return request({
        url:`/category/info/${id}`,
        
    })
}
/**
 * 修改分类
 */
export function setCategory(data){
    return request({
        url:'/category',
        method:'put',
        data
    })
}
