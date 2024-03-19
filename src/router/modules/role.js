import layout from '@/layout'
export default {
    // 路由信息
    path:'/role',
    component:layout,
    children:[{
        path:'', //二级路由为空时 默认一级路由地址
        component: () => import ('@/views/role/index.vue'),
        name:'role',
        meta:{
            //路由元信息
            icon:'role',  //图标
            title:'角色'  // 标题
        }
    },
    {
        path:'/role/assignpermission', //二级路由为空时 默认一级路由地址
        component: () => import ('@/views/role/component/assignpermission'),
        name:'assignPermission',
       hidden:true
    }
]
}