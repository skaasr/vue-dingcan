import layout from '@/layout'
export default {
    // 路由信息
    path:'/dish',
    component:layout,
    children:[{
        path:'', //二级路由为空时 默认一级路由地址
        component: () => import ('@/views/dish/index.vue'),
        name:'dish',
        meta:{
            //路由元信息
            icon:'setmeal',  //图标
            title:'菜品'  // 标题
        }
    }]
}