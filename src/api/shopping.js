import request from '@/utils/request'

/**
 * 查询购物车
 */
export function queryShopping(){
    return request({
        url:'/user/shoppingCart/list'
    })
}
/**
 * 删除购物车单个商品
 */
export function deleteSingleShopping(data){
    return request({
        url:'/user/shoppingCart/sub',
        method:'post',
        data
    })
}

/*
 * 清空购物车
 */
export function cleanShoppingCart(){
    return request({
        url:'/user/shoppingCart/clean',
        method:'delete'
    })
}
/**
 * 添加购物车
 */
export function addShoppingCart(data){
    return request({
        url:'/user/shoppingCart/add',
        method:'post',
        data
    })
}