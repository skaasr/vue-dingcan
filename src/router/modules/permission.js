import layout from '@/layout'
export default {
    // 路由信息
    path:'/permission',
    component:layout,
    children:[{
        path:'', //二级路由为空时 默认一级路由地址
        component: () => import ('@/views/permission/index.vue'),
        name:'permission',
        meta:{
            //路由元信息
            icon:'permission',  //图标
            title:'权限'  // 标题
        }
    }]
}