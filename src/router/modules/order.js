import layout from '@/layout'
export default {
    // 路由信息
    path:'/order',
    component:layout,
    children:[{
        path:'', //二级路由为空时 默认一级路由地址
        component: () => import ('@/views/order/index.vue'),
        name:'order',
        meta:{
            //路由元信息
            icon:'order',  //图标
            title:'订单'  // 标题
        }
    }]
}