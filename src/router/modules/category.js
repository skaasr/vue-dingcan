import layout from '@/layout'
export default {
    // 路由信息
    path:'/category',
    component:layout,
    children:[{
        path:'', //二级路由为空时 默认一级路由地址
        component: () => import ('@/views/category/index.vue'),
        name:'category',
        meta:{
            //路由元信息
            icon:'category',  //图标
            title:'分类'  // 标题
        }
    },
    {
        path:'/addcategory', //二级路由为空时 默认一级路由地址
        component: () => import ('@/views/category/component/addCategory.vue'),
        name:'addcategory',  
        hidden: true  
    },
]
}