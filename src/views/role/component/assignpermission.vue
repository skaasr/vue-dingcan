<template>
  <div class="container">
    <div class="app-container">
        <div><h2>角色用户:{{ this.name }}</h2></div>
        <el-tree
        ref="permData"
  :data="treeData"
  show-checkbox
  node-key="id"
  default-expand-all
  check-strictly
  :default-checked-keys="permId"
  :props="{label:'name'}">
</el-tree>
<div style="margin-top: 15px;"><el-button size="mini" type="primary" @click="btnOk">确定</el-button>
<el-button size="mini" @click="$router.push('/role')">取消</el-button></div>
    </div>
  </div>
</template>

<script>
import { findAllPermission, assignPermission } from '@/api/role'
export default {
         name:'assignPermission',
         data(){
            return{
                id:this.$route.query.id,
                name:this.$route.query.name,
                treeData:[],
                permId:[], // 记录权限id的数组
            }
         },

         created(){
           this.findAllPermission()
         },
         methods:{
            /**
             * 为角色分配权限
             */
             async  btnOk(){
              const result = await  assignPermission({roleId:this.$route.query.id,menuIdList:this.$refs.permData.getCheckedKeys()})
              if(result.code == 1){
                this.$message.success('分配权限成功!')
                this.$router.push('/role')
              }
                
             },
            /**
             * 查询所有权限和当前角色的权限
             */
             async findAllPermission(){
             let result  =  await  findAllPermission(this.$route.query.id)
             console.log(result);
             this.treeData = result.data
             let arr = []
             this.treeData.forEach(item => {
                    if(item.select ===  true){
                        arr.push(item.id)
                    }
                    item.children.forEach(chitem =>{
                        if(chitem.select == true){
                            arr.push(chitem.id)                        
                        }
                    })
                  })
                    this.permId = arr
             }
         }
}
</script>

<style>

</style>