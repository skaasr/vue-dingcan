import layout from '@/layout'
export default {
    // 路由信息
    path:'/employee',
    component:layout,
    children:[{
        path:'', //二级路由为空时 默认一级路由地址
        component: () => import ('@/views/employee/index.vue'),
        name:'employee',
        meta:{
            //路由元信息
            icon:'employee',  //图标
            title:'员工'  // 标题
        }
    }]
}