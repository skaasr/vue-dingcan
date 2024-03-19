import layout from '@/layout'
export default {
    // 路由信息
    path:'/shopping',
    component:layout,
    children:[{
        path:'', //二级路由为空时 默认一级路由地址
        component: () => import ('@/views/shopping/index.vue'),
        name:'shopping',
        meta:{
            //路由元信息
            icon:'shopping',  //图标
            title:'购物车'  // 标题
        }
    }]
}