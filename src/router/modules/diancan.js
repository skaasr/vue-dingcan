import layout from '@/layout'
export default {
    // 路由信息
    path:'/buy',
    component:layout,
    children:[{
        path:'', //二级路由为空时 默认一级路由地址
        component: () => import ('@/views/diancan/index.vue'),
        name:'buy',
        meta:{
            //路由元信息
            icon:'diancan',  //图标
            title:'点餐'  // 标题
        }
    },
       {
        path:'/buy/dishdetail',
        component: () => import('@/views/diancan/component/dishdetail.vue'),
        name:'dishDetail',
        hidden:true
       }
]
}