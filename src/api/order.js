import request from '@/utils/request'

/**
 * 用户下单
 */
export function sumbitOrder(data){
    return request({
        url:"/user/order/submit",
        method:'post',
        data
    })
}

/**
 * 获取订单
 */
export function getOrder(params){
    return request({
        url:'/user/order/historyOrders',
        method:'get',
        params
    })
}

/**
 * 查询订单详情
 */
export function queryOrderDetail(params){
    return request({
        url:`/user/order/orderDetail/${params.id}`,
        params
    })
}


/**
 * 取消订单
 */
export function cancelOrder(params){
    return request({
        url:`/user/order/cancel/${params.id}`,
        method:'put',
        params
    })
}